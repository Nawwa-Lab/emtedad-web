'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field'
import { cn } from 'cn'
import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  DefaultValues,
  FieldErrors,
  FieldPath,
  FieldValues,
  Mode,
  Resolver,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'

export type FormStepConfig<TFieldValues extends FieldValues> = {
  id: string
  title: string
  description?: string
  fields: Array<FieldPath<TFieldValues>>
}

type Step = Omit<FormStepConfig<FieldValues>, 'fields'> & { fields: string[] }

export type FormStepper = {
  currentStep: Step
  currentStepIndex: number
  totalSteps: number
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  next: () => Promise<void>
  previous: () => void
  goToStep: (id: string) => Promise<void>
}

type FormStepperContextValue = FormStepper & { steps: Step[] }

const FormStepperContext = createContext<FormStepperContextValue | null>(null)

function stepLabel(current: number, total: number) {
  return `الخطوة ${current} من ${total}`
}

export function useFormStepper() {
  const stepper = useContext(FormStepperContext)

  if (!stepper) throw new Error('useFormStepper must be used inside a multi-step Form.')

  return {
    currentStep: stepper.currentStep,
    currentStepIndex: stepper.currentStepIndex,
    totalSteps: stepper.totalSteps,
    isFirstStep: stepper.isFirstStep,
    isLastStep: stepper.isLastStep,
    isSubmitting: stepper.isSubmitting,
    next: stepper.next,
    previous: stepper.previous,
    goToStep: stepper.goToStep,
  }
}

function useFormStepperContext() {
  const stepper = useContext(FormStepperContext)

  if (!stepper) throw new Error('Form.Step, and Form.Progress require a multi-step Form.')

  return stepper
}

function hasErrorAtPath(errors: FieldErrors, path: string) {
  return (
    path
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .filter(Boolean)
      .reduce<unknown>((value, key) => {
        if (value && typeof value === 'object' && key in value) {
          return (value as Record<string, unknown>)[key]
        }

        return undefined
      }, errors) !== undefined
  )
}

function FormRoot<TFieldValues extends FieldValues>({
  resolver,
  defaultValues,
  mode,
  variant = 'default',
  steps = [],
  onSubmit,
  children,
  ...formProps
}: {
  resolver: Resolver<TFieldValues>
  defaultValues: DefaultValues<TFieldValues>
  mode?: Mode
  variant?: 'default' | 'multi-step'
  steps?: Array<FormStepConfig<TFieldValues>>
  onSubmit: (data: TFieldValues) => void | Promise<void>
  children: ReactNode
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  const methods = useForm<TFieldValues>({ resolver, defaultValues, mode, shouldUnregister: false })
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigationLock = useRef(false)
  const submissionLock = useRef(false)

  if (variant === 'multi-step') {
    if (!steps.length) throw new Error('A multi-step Form requires at least one step.')
    if (new Set(steps.map((step) => step.id)).size !== steps.length) {
      throw new Error('Each multi-step Form step must have a unique id.')
    }
  }

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  const next = async () => {
    if (variant !== 'multi-step' || !currentStep || isLastStep || navigationLock.current) return

    navigationLock.current = true
    setIsNavigating(true)
    try {
      if (await methods.trigger(currentStep.fields, { shouldFocus: true })) {
        setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1))
      }
    } finally {
      navigationLock.current = false
      setIsNavigating(false)
    }
  }

  const previous = () => {
    if (variant === 'multi-step' && !navigationLock.current) {
      setCurrentStepIndex((index) => Math.max(index - 1, 0))
    }
  }

  const goToStep = async (id: string) => {
    const index = steps.findIndex((step) => step.id === id)

    if (index < 0 || index === currentStepIndex || navigationLock.current) return
    if (index < currentStepIndex) {
      setCurrentStepIndex(index)
      return
    }
    if (index === currentStepIndex + 1) await next()
  }

  const onInvalid: SubmitErrorHandler<TFieldValues> = (errors) => {
    if (variant !== 'multi-step') return

    const firstInvalidStep = steps.findIndex((step) =>
      step.fields.some((field) => hasErrorAtPath(errors, field)),
    )

    if (firstInvalidStep >= 0) setCurrentStepIndex(firstInvalidStep)
  }

  const onValid: SubmitHandler<TFieldValues> = async (data) => {
    if (submissionLock.current) return

    submissionLock.current = true
    try {
      await onSubmit(data)
    } finally {
      submissionLock.current = false
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (variant === 'multi-step' && !isLastStep) {
      event.preventDefault()
      void next()
      return
    }

    void methods.handleSubmit(onValid, onInvalid)(event)
  }

  const stepper =
    variant === 'multi-step' && currentStep
      ? {
          steps,
          currentStep,
          currentStepIndex,
          totalSteps: steps.length,
          isFirstStep: currentStepIndex === 0,
          isLastStep,
          isSubmitting: methods.formState.isSubmitting || isNavigating,
          next,
          previous,
          goToStep,
        }
      : null

  return (
    <FormProvider {...methods}>
      <FormStepperContext.Provider value={stepper}>
        <form noValidate onSubmit={handleFormSubmit} {...formProps}>
          {children}
        </form>
      </FormStepperContext.Provider>
    </FormProvider>
  )
}

function Control<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  labelFor,
  className,
  children,
}: {
  name: FieldPath<TFieldValues>
  label: string
  labelFor?: string
  className?: string
  required?: boolean
  children: (
    field: ControllerRenderProps<TFieldValues>,
    fieldState: ControllerFieldState,
  ) => ReactNode
}) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <Controller<TFieldValues>
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldContent>
            <FieldLabel htmlFor={labelFor}>
              <span className="flex items-center gap-2">
                <span>{label}</span>
              </span>
            </FieldLabel>
            {children(field, fieldState)}
          </FieldContent>
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  )
}

function Step({ id, children }: { id: string; children: ReactNode }) {
  const { currentStep, steps } = useFormStepperContext()

  if (!steps.some((step) => step.id === id)) {
    throw new Error(`Unknown multi-step Form step: ${id}`)
  }

  return currentStep.id === id ? <>{children}</> : null
}

type StepperButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'disabled' | 'loading' | 'onClick' | 'type' | 'variant'
> & {
  disabled?: boolean
}

function Next({ children, disabled, ...props }: StepperButtonProps) {
  const stepper = useFormStepper()

  return (
    <Button
      {...props}
      type={stepper.isLastStep ? 'submit' : 'button'}
      onClick={stepper.isLastStep ? undefined : stepper.next}
      loading={stepper.isSubmitting}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

function Back({ children, disabled, ...props }: StepperButtonProps) {
  const stepper = useFormStepper()

  if (stepper.isFirstStep) return null

  return (
    <Button
      {...props}
      type="button"
      variant="outline"
      onClick={stepper.previous}
      disabled={stepper.isSubmitting || disabled}
    >
      {children}
    </Button>
  )
}

function Progress({ className }: { className?: string }) {
  const { currentStep, currentStepIndex, steps, totalSteps } = useFormStepperContext()
  const currentStepLabel = stepLabel(currentStepIndex + 1, totalSteps)

  return (
    <div className={cn('mb-6 flex w-full justify-center', className)} aria-label={currentStepLabel}>
      <p className="sr-only" aria-live="polite">
        {currentStepLabel}: {currentStep.title}
      </p>
      <ol className="flex items-center justify-center gap-2" aria-label="تقدم النموذج">
        {steps.map((step, index) => {
          const isComplete = index <= currentStepIndex
          return (
            <li
              key={step.id}
              aria-label={`${stepLabel(index + 1, totalSteps)}: ${step.title}`}
              aria-current={index === currentStepIndex ? 'step' : undefined}
            >
              <span
                className={cn(
                  'block h-1.5 w-10 rounded-full border-2 border-ink',
                  isComplete ? 'bg-red' : 'bg-paper',
                )}
                aria-hidden="true"
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const Form = Object.assign(FormRoot, { Control, Step, Next, Back, Progress })

export { Form }

'use client'

import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field'
import { useTranslations } from 'next-intl'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  DefaultValues,
  FieldPath,
  FieldValues,
  Mode,
  Resolver,
} from 'react-hook-form'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'

function Form<TFieldValues extends FieldValues>({
  resolver,
  defaultValues,
  mode,
  onSubmit,
  children,
  ...formProps
}: {
  resolver: Resolver<TFieldValues>
  defaultValues: DefaultValues<TFieldValues>
  mode?: Mode
  onSubmit: (data: TFieldValues) => void | Promise<void>
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  const methods = useForm<TFieldValues>({ resolver, defaultValues, mode })
  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
        {children}
      </form>
    </FormProvider>
  )
}

function FormControl<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  labelFor,
  className,
  required = true,
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
  ) => React.ReactNode
}) {
  const { control } = useFormContext<TFieldValues>()
  const tForm = useTranslations('public.form')

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
                {!required && (
                  <span className="font-cairo text-xs font-normal text-ink-soft">
                    ({tForm('optional')})
                  </span>
                )}
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

export { Form, FormControl }

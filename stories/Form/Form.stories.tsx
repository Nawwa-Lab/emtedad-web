'use client'

import { Form, useFormStepper } from '@/components/Form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { z } from 'zod'

type ExampleValues = {
  firstName: string
  email: string
  password: string
  confirmPassword: string
}

function StepActions() {
  const { currentStep, isFirstStep, isLastStep } = useFormStepper()

  return (
    <div className="flex flex-wrap gap-3">
      <Form.Next className={isFirstStep ? 'w-full' : undefined}>
        {isLastStep ? 'أنشئ الحساب' : currentStep.id === 'personal' ? 'كمّل' : 'التالي'}
      </Form.Next>
      <Form.Back>السابق</Form.Back>
    </div>
  )
}

function ExampleForm() {
  const schema = z
    .object({
      firstName: z.string().min(1, 'الاسم الأول مطلوب'),
      email: z.email('أدخل بريدًا إلكترونيًا صالحًا'),
      password: z.string().min(8, 'استخدم ٨ أحرف على الأقل'),
      confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: 'كلمتا السر غير متطابقتين',
      path: ['confirmPassword'],
    })

  return (
    <div className="max-w-xl p-6">
      <Form<ExampleValues>
        variant="multi-step"
        steps={[
          { id: 'personal', title: 'البيانات الشخصية', fields: ['firstName', 'email'] },
          { id: 'security', title: 'الأمان', fields: ['password', 'confirmPassword'] },
          { id: 'review', title: 'مراجعة', fields: [] },
        ]}
        resolver={zodResolver(schema)}
        defaultValues={{ firstName: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={() => undefined}
        className="space-y-6"
      >
        <Form.Progress />
        <Form.Step id="personal">
          <Form.Control name="firstName" label="الاسم الأول" labelFor="first-name">
            {(field, fieldState) => (
              <Input id="first-name" aria-invalid={fieldState.invalid} {...field} />
            )}
          </Form.Control>
          <Form.Control name="email" label="البريد الإلكتروني" labelFor="email">
            {(field, fieldState) => (
              <Input id="email" type="email" aria-invalid={fieldState.invalid} {...field} />
            )}
          </Form.Control>
        </Form.Step>
        <Form.Step id="security">
          <Form.Control name="password" label="كلمة السر" labelFor="password">
            {(field, fieldState) => (
              <Input id="password" type="password" aria-invalid={fieldState.invalid} {...field} />
            )}
          </Form.Control>
          <Form.Control name="confirmPassword" label="تأكيد كلمة السر" labelFor="confirm-password">
            {(field, fieldState) => (
              <Input
                id="confirm-password"
                type="password"
                aria-invalid={fieldState.invalid}
                {...field}
              />
            )}
          </Form.Control>
        </Form.Step>
        <Form.Step id="review">
          <p className="text-sm font-semibold text-ink">راجع بياناتك، ثم أنشئ حسابك.</p>
        </Form.Step>
        <StepActions />
      </Form>
    </div>
  )
}

function TwoStepExample() {
  return (
    <div lang="ar" dir="rtl">
      <ExampleForm />
    </div>
  )
}

const meta = {
  title: 'Components/Form',
  component: TwoStepExample,
  tags: ['autodocs'],
} satisfies Meta<typeof TwoStepExample>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const MultiStep: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const continueButton = canvas.getByRole('button', { name: 'كمّل' })
    await expect(continueButton).toHaveAttribute('type', 'button')
    await userEvent.click(continueButton)
    await expect(canvas.getByText('الاسم الأول مطلوب')).toBeVisible()

    await userEvent.type(canvas.getByLabelText('الاسم الأول'), 'Ada')
    await userEvent.type(canvas.getByLabelText('البريد الإلكتروني'), 'ada@example.com')
    await userEvent.click(canvas.getByRole('button', { name: 'كمّل' }))
    await expect(canvas.getByLabelText('كلمة السر')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'التالي' })).toHaveAttribute('type', 'button')

    await userEvent.click(canvas.getByRole('button', { name: 'السابق' }))
    await expect(canvas.getByLabelText('الاسم الأول')).toHaveValue('Ada')

    await userEvent.click(canvas.getByRole('button', { name: 'كمّل' }))
    await userEvent.type(canvas.getByLabelText('كلمة السر'), 'password1')
    await userEvent.type(canvas.getByLabelText('تأكيد كلمة السر'), 'password1')
    await userEvent.click(canvas.getByRole('button', { name: 'التالي' }))
    await expect(canvas.getByText('راجع بياناتك، ثم أنشئ حسابك.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'أنشئ الحساب' })).toHaveAttribute(
      'type',
      'submit',
    )
  },
}

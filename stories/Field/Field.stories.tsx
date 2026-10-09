import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../../components/ui/field'
import { Input } from '../../components/ui/input'

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  render: () => (
    <Field className="max-w-md">
      <FieldLabel htmlFor="field-name">الاسم المعروض</FieldLabel>
      <Input id="field-name" placeholder="آدا لوفلايس" />
      <FieldDescription>هكذا يظهر اسمك للأعضاء الآخرين.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }: PlayContext) => {
    await expect(canvas.getByLabelText('الاسم المعروض')).toHaveAttribute(
      'placeholder',
      'آدا لوفلايس',
    )
  },
}

export const Invalid: Story = {
  render: () => (
    <Field className="max-w-md" data-invalid="true">
      <FieldLabel htmlFor="field-email">البريد الإلكتروني</FieldLabel>
      <Input id="field-email" aria-invalid="true" defaultValue="قيمة غير صالحة" />
      <FieldError errors={[{ message: 'أدخل عنوان بريد إلكتروني صحيحًا.' }]} />
    </Field>
  ),
}

export const Fieldset: Story = {
  render: () => (
    <FieldSet className="min-w-1/3">
      <FieldLegend>بيانات التواصل</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldset-email">البريد الإلكتروني</FieldLabel>
          <Input id="fieldset-email" type="email" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldset-phone">رقم الهاتف</FieldLabel>
          <Input id="fieldset-phone" type="tel" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

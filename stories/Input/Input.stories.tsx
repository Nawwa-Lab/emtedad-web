import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Input } from '../../components/ui/input'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  args: {
    'aria-label': 'البريد الإلكتروني',
    placeholder: 'الاسم@مثال.مصر',
    type: 'email',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true, value: 'الاسم@مثال.مصر' },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true, value: 'بريد غير صالح' },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Textarea } from '../../components/ui/textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  args: {
    'aria-label': 'الرسالة',
    placeholder: 'اكتب رسالتك…',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  args: { defaultValue: 'يمكنك كتابة رسالة أطول هنا.' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'لا يمكن تعديل هذه الرسالة.' },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'النص قصير جدًا' },
}

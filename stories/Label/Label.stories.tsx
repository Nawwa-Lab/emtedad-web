import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  args: {
    children: 'البريد الإلكتروني',
    htmlFor: 'label-story-email',
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {}

export const WithControl: Story = {
  render: (args: React.ComponentProps<typeof Label>) => (
    <div className="flex max-w-md flex-col gap-2">
      <Label {...args} />
      <Input id="label-story-email" type="email" placeholder="الاسم@مثال.مصر" />
    </div>
  ),
  play: async ({ canvas }: PlayContext) => {
    await expect(canvas.getByLabelText('البريد الإلكتروني')).toHaveAttribute('type', 'email')
  },
}

export const ForDisabledControl: Story = {
  render: (args: React.ComponentProps<typeof Label>) => (
    <div className="group flex max-w-md flex-col gap-2" data-disabled="true">
      <Label {...args} />
      <Input id="label-story-email" disabled value="الاسم@مثال.مصر" />
    </div>
  ),
}

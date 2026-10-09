import { Toggle } from '@/components/ui/toggle'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'تفعيل الإشعارات',
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const toggle = canvas.getByRole('button', { name: 'تفعيل الإشعارات' })

    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  },
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} size="sm">
        صغير
      </Toggle>
      <Toggle {...args} size="default">
        افتراضي
      </Toggle>
      <Toggle {...args} size="lg">
        كبير
      </Toggle>
    </div>
  ),
}

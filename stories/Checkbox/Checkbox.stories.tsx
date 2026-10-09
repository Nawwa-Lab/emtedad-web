import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  render: (args: React.ComponentProps<typeof Checkbox>) => (
    <div
      className="group flex min-w-1/2 items-start gap-2.5"
      data-disabled={args.disabled || undefined}
    >
      <Checkbox id="storybook-checkbox" {...args} />
      <Label htmlFor="storybook-checkbox" className="leading-relaxed">
        أوافق على الشروط والأحكام
      </Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'أوافق على الشروط والأحكام' })

    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
}

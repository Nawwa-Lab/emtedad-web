import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

const meta = {
  title: 'UI/Toggle Group',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'outline'],
    },
    spacing: {
      control: 'number',
      options: [0, 1, 2, 3, 4],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'icon'],
    },
    shape: {
      control: 'radio',
      options: ['round', 'square'],
    },
    effect: {
      control: 'radio',
      options: ['flat', '3d'],
    },
  },
  render: (args) => (
    <ToggleGroup aria-label="اختيار المحاذاة" {...args}>
      <ToggleGroupItem value="right">يمين</ToggleGroupItem>
      <ToggleGroupItem value="center">وسط</ToggleGroupItem>
      <ToggleGroupItem value="left">يسار</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  args: {
    defaultValue: ['center'],
  },
  play: async ({ canvas, userEvent }: PlayContext) => {
    const right = canvas.getByRole('button', { name: 'يمين' })
    const center = canvas.getByRole('button', { name: 'وسط' })

    await expect(center).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(right)
    await expect(right).toHaveAttribute('aria-pressed', 'true')
    await expect(center).toHaveAttribute('aria-pressed', 'false')
  },
}

export const Connected: Story = {
  args: {
    defaultValue: ['right'],
    spacing: 0,
  },
}

export const Outline: Story = {
  args: {
    defaultValue: ['center'],
    variant: 'outline',
  },
}

export const Flat: Story = {
  args: {
    defaultValue: ['center'],
    effect: 'flat',
  },
}

export const WithCounts: Story = {
  render: (args) => (
    <ToggleGroup aria-label="فلاتر النتائج" {...args}>
      <ToggleGroupItem value="all" count={12}>
        الكل
      </ToggleGroupItem>
      <ToggleGroupItem value="open" count={3}>
        مفتوح
      </ToggleGroupItem>
      <ToggleGroupItem value="closed" count={0}>
        مغلق
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  args: {
    defaultValue: ['right', 'left'],
    multiple: true,
  },
}

export const Vertical: Story = {
  args: {
    defaultValue: ['center'],
    orientation: 'vertical',
  },
}

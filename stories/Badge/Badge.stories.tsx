import { Badge } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'blue', 'gold', 'tint', 'paper', 'surface'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
  args: {
    children: 'شارة',
    color: 'gold',
    size: 'default',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} color="red">
        أحمر
      </Badge>
      <Badge {...args} color="blue">
        أزرق
      </Badge>
      <Badge {...args} color="gold">
        ذهبي
      </Badge>
      <Badge {...args} color="tint">
        وردي فاتح
      </Badge>
      <Badge {...args} color="paper">
        ورقي
      </Badge>
      <Badge {...args} color="surface">
        سطحي
      </Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} size="sm">
        صغير
      </Badge>
      <Badge {...args} size="default">
        افتراضي
      </Badge>
      <Badge {...args} size="lg">
        كبير
      </Badge>
    </div>
  ),
}

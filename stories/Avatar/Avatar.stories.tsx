import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['gold', 'red', 'blue', 'tint'],
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
  },
  args: {
    shape: 'round',
    size: 'default',
    color: 'gold',
  },
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <Avatar {...args}>
      <AvatarFallback>م</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar {...args} color="gold">
        <AvatarFallback>ذ</AvatarFallback>
      </Avatar>
      <Avatar {...args} color="red">
        <AvatarFallback>ح</AvatarFallback>
      </Avatar>
      <Avatar {...args} color="blue">
        <AvatarFallback>س</AvatarFallback>
      </Avatar>
      <Avatar {...args} color="tint">
        <AvatarFallback>ن</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Shapes: Story = {
  args: {
    color: 'gold',
  },

  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar {...args} shape="round">
        <AvatarFallback>د</AvatarFallback>
      </Avatar>
      <Avatar {...args} shape="square">
        <AvatarFallback>د</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    color: 'gold',
  },

  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar {...args} size="sm">
        <AvatarFallback>ص</AvatarFallback>
      </Avatar>
      <Avatar {...args} size="default">
        <AvatarFallback>ص</AvatarFallback>
      </Avatar>
      <Avatar {...args} size="lg">
        <AvatarFallback>ص</AvatarFallback>
      </Avatar>
      <Avatar {...args} size="xl">
        <AvatarFallback>ص</AvatarFallback>
      </Avatar>
    </div>
  ),
}

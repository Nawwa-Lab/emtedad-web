import { StatusBadge } from '@/components/StatusBadge'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'pill'],
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
    label: {
      control: 'text',
    },
  },
  args: {
    shape: 'circle',
    size: 'default',
    label: 'عامر',
  },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <StatusBadge {...args} shape="circle" label="عامر" />
      <StatusBadge {...args} shape="pill" label="عامر" />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <StatusBadge {...args} size="default" label="عامر" />
      <StatusBadge {...args} size="small" label="عامر" />
    </div>
  ),
}

export const Labels: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <StatusBadge {...args} label="عامر" />
      <StatusBadge {...args} label="كريم" />
      <StatusBadge {...args} label="أحسن عندك" />
      <StatusBadge {...args} label={null} />
    </div>
  ),
}

export const PillLabels: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <StatusBadge {...args} shape="pill" label="عامر" />
      <StatusBadge {...args} shape="pill" label="كريم" />
      <StatusBadge {...args} shape="pill" label="أحسن عندك" />
      <StatusBadge {...args} shape="pill" label={null} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <StatusBadge {...args} shape="circle" size="default" label="عامر" />
        <StatusBadge {...args} shape="pill" size="default" label="عامر" />
        <StatusBadge {...args} shape="circle" size="small" label="عامر" />
        <StatusBadge {...args} shape="pill" size="small" label="عامر" />
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge {...args} shape="circle" size="default" label={null} />
        <StatusBadge {...args} shape="pill" size="default" label={null} />
        <StatusBadge {...args} shape="circle" size="small" label={null} />
        <StatusBadge {...args} shape="pill" size="small" label={null} />
      </div>
    </div>
  ),
}

import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeartIcon } from 'lucide-react'
import { fn } from 'storybook/test'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'icon'],
    },
    shape: {
      control: 'select',
      options: ['round', 'square'],
    },
    effect: {
      control: 'radio',
      options: ['flat', '3d'],
    },
    count: {
      control: 'number',
    },
  },
  args: {
    children: 'زر',
    onClick: fn(),
    shape: 'round',
    size: 'default',
    variant: 'primary',
    effect: '3d',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCount: Story = {
  args: {
    count: 3,
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        زر أساسي
      </Button>
      <Button {...args} variant="outline">
        زر بإطار
      </Button>
      <Button {...args} variant="destructive">
        حذف
      </Button>
      <Button {...args} variant="link" effect="flat">
        رابط
      </Button>
    </div>
  ),
}

export const Effects: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} effect="flat">
        مسطح
      </Button>
      <Button {...args} effect="3d">
        ثلاثي الأبعاد
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        صغير
      </Button>
      <Button {...args} size="default">
        افتراضي
      </Button>
      <Button {...args} size="icon" aria-label="إضافة إلى المفضلة">
        <HeartIcon />
      </Button>
    </div>
  ),
}

export const IconShapes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="icon" shape="round" variant="primary" aria-label="إضافة إلى المفضلة">
        <HeartIcon />
      </Button>
      <Button
        {...args}
        size="icon"
        shape="round"
        variant="outline"
        aria-label="إضافة إلى المفضلة بإطار دائري"
      >
        <HeartIcon />
      </Button>
      <Button
        {...args}
        size="icon"
        shape="square"
        variant="outline"
        aria-label="إضافة إلى المفضلة بإطار مربع"
      >
        <HeartIcon />
      </Button>
    </div>
  ),
}

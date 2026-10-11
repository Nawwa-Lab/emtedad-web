import { Toggle } from '@/components/ui/toggle'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeartIcon } from 'lucide-react'
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
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'outline'],
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
    count: {
      control: 'number',
    },
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

export const WithCount: Story = {
  args: {
    count: 3,
  },
  play: async ({ canvas, userEvent }: PlayContext) => {
    const toggle = canvas.getByRole('button', { name: 'تفعيل الإشعارات 3' })

    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
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

export const Effects: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} effect="flat">
        مسطح
      </Toggle>
      <Toggle {...args} effect="3d">
        ثلاثي الأبعاد
      </Toggle>
    </div>
  ),
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
      <Toggle {...args} size="icon" aria-label="إضافة إلى المفضلة">
        <HeartIcon />
      </Toggle>
    </div>
  ),
}

export const IconShapes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} size="icon" shape="round" aria-label="إضافة إلى المفضلة">
        <HeartIcon />
      </Toggle>
      <Toggle {...args} size="icon" shape="square" aria-label="إضافة إلى المفضلة بمربع">
        <HeartIcon />
      </Toggle>
    </div>
  ),
}

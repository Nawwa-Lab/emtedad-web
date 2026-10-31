import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args: React.ComponentProps<typeof Switch>) => (
    <div className="flex items-center gap-3">
      <Switch id="storybook-switch" {...args} />
      <Label
        htmlFor="storybook-switch"
        className="text-[15px] font-semibold font-body cursor-pointer"
      >
        تفعيل الإشراف
      </Label>
    </div>
  ),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const switchEl = canvas.getByRole('switch', { name: 'تفعيل الإشراف' })

    await expect(switchEl).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(switchEl)
    await expect(switchEl).toHaveAttribute('aria-checked', 'true')
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

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  render: (args) => <Switch id="storybook-switch-no-label" aria-label="تبديل الوضع" {...args} />,
}

export const InContext: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 bg-paper border-[2.5px] border-ink rounded-[16px] p-4 sm:p-4.5 flex-wrap w-full max-w-md">
      <div className="flex-1 min-w-45">
        <b className="font-display text-[20px] leading-[1.3] block">تأمين نقدي</b>
        <span className="font-body font-medium text-[14.5px] text-soft leading-[1.8] block mt-0.75">
          مبلغ بيتدفع نقدًا وقت الاستلام وبيترد كامل بعد الفحص المشترك.
        </span>
      </div>
      <Switch id="storybook-switch-ctx" aria-label="تأمين نقدي" {...args} />
    </div>
  ),
}

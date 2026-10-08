import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  decorators: [
    (Story: React.ComponentType<React.ComponentProps<typeof Card>>) => (
      <div className="max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Card>) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>ورشة مجتمعية</CardTitle>
        <CardDescription>شارك مهاراتك وتعلّم مع جيرانك.</CardDescription>
      </CardHeader>
      <CardContent>السبت، ١٠:٠٠ صباحًا</CardContent>
      <CardFooter className="mt-6 font-semibold">١٢ مقعدًا متاحًا</CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: (args: React.ComponentProps<typeof Card>) => (
    <Card {...args}>
      <CardHeader className="grid grid-cols-[1fr_auto]">
        <div>
          <CardTitle>عرض مورد</CardTitle>
          <CardDescription>أثاث مكتبي جاهز للاستلام.</CardDescription>
        </div>
        <CardAction>
          <Button>
            عرض
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>متاح هذا الأسبوع</CardContent>
    </Card>
  ),
}

export const Animated: Story = {
  args: { animated: true },
  render: (args: React.ComponentProps<typeof Card>) => (
    <Card {...args}>
      <CardTitle>بطاقة تفاعلية</CardTitle>
      <CardDescription>مرّر المؤشر لرؤية تأثير ارتفاع البطاقة.</CardDescription>
    </Card>
  ),
}

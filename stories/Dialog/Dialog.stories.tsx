import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor, within } from 'storybook/test'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args: React.ComponentProps<typeof Dialog>) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>فتح النافذة</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تأكيد الإجراء</DialogTitle>
          <DialogDescription>
            راجع التفاصيل جيدًا قبل المتابعة. يمكنك الرجوع إذا لم تكن مستعدًا بعد.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" effect="3d" />}>إلغاء</DialogClose>
          <Button>تأكيد</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }: PlayContext) => {
    await userEvent.click(canvas.getByRole('button', { name: 'فتح النافذة' }))

    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole('dialog', { name: 'تأكيد الإجراء' })
    await expect(dialog).toBeVisible()

    await userEvent.click(body.getByRole('button', { name: 'إلغاء' }))
    await waitFor(() => {
      expect(body.queryByRole('dialog', { name: 'تأكيد الإجراء' })).not.toBeInTheDocument()
    })
  },
}

export const WithoutHeaderClose: Story = {
  render: (args: React.ComponentProps<typeof Dialog>) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" effect="3d" />}>عرض التفاصيل</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>تفاصيل الطلب</DialogTitle>
          <DialogDescription>ستظهر هنا المعلومات الكاملة المرتبطة بالطلب المحدد.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>إغلاق</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

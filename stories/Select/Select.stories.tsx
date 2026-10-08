import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

const services = [
  { value: 'mentoring', label: 'إرشاد' },
  { value: 'translation', label: 'ترجمة' },
  { value: 'transport', label: 'نقل' },
]

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  render: (args: React.ComponentProps<typeof Select>) => (
    <div className="max-w-sm">
      <Select items={services} {...args}>
        <SelectTrigger aria-label="اختر خدمة">
          <SelectValue placeholder="اختر خدمة" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>الخدمات</SelectLabel>
            <SelectItem value="mentoring">إرشاد</SelectItem>
            <SelectItem value="translation">ترجمة</SelectItem>
            <SelectSeparator />
            <SelectItem value="transport">نقل</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }: PlayContext) => {
    const trigger = canvas.getByRole('combobox', { name: 'اختر خدمة' })
    await userEvent.click(trigger)
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole('option', { name: 'ترجمة' }))
    await expect(trigger).toHaveTextContent('ترجمة')
  },
}

export const WithSelection: Story = {
  args: { defaultValue: 'mentoring' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

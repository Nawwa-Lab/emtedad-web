import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

const items = [
  { value: 'first', question: 'هل يمكن فتح أكثر من إجابة؟', answer: 'نعم، كل إجابة مستقلة.' },
  {
    value: 'second',
    question: 'هل تعمل بلوحة المفاتيح؟',
    answer: 'نعم، الأزرار قابلة للوصول بالكامل.',
  },
]

function AccordionDemo({
  multiple = true,
  defaultValue,
}: {
  multiple?: boolean
  defaultValue?: string[]
}) {
  return (
    <Accordion multiple={multiple} defaultValue={defaultValue} className="w-full space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="rounded-card border-[2.5px] border-ink bg-surface shadow-ink shadow-[4px_4px_0]"
        >
          <AccordionHeader>
            <AccordionTrigger className="w-full px-5 py-4 text-start font-display text-xl text-ink">
              {item.question}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="px-5 pb-5 text-soft">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <AccordionDemo />
    </div>
  ),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const first = canvas.getByRole('button', { name: items[0].question })
    const second = canvas.getByRole('button', { name: items[1].question })

    await expect(first).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(first)
    await userEvent.click(second)
    await expect(first).toHaveAttribute('aria-expanded', 'true')
    await expect(second).toHaveAttribute('aria-expanded', 'true')
  },
}

export const InitiallyOpen: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <AccordionDemo defaultValue={['first']} />
    </div>
  ),
}

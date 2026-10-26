import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Dialog } from '@/components/ui/dialog'
import { CardDetails, type ServiceDetail } from '@/components/CardDetail'
import { NextIntlClientProvider } from 'next-intl'

const detail: ServiceDetail = {
  type: 'إنتاج · خدمة بشرية',
  title: 'تصوير وتوثيق فعاليات بالفيديو',
  desc: 'تغطية كاملة لفعاليتكم من التحضير للقطة الأخيرة — تصوير بكاميرتين وصوت نظيف من المنصة والجمهور.',
  cards: {
    firstCard: { title: 'القيمة', price: '٣٥', currency: 'شهمهم' },
    restCards: [
      { header: 'الإتاحة', description: 'متاح أي مدة' },
      { header: 'التسليم', description: 'خلال ٤٨ ساعة' },
    ],
  },
  info: 'إيه اللي هتستلمه',
  data: ['مادة خام منظمة في مجلدات', 'مقطع ملخّص ٩٠ ثانية', 'ملف صوت منفصل من المنصة'],
  providerName: 'مشكاة .',
  providerRate: 'عامر',
  request: 'اطلب الخدمة',
  save: 'احفظ في المحفوظات',
  close: 'اقفل',
}

const meta = {
  title: 'Components/CardDetails',
  component: CardDetails,
  parameters: { layout: 'fullscreen' },
  args: { detail, badgeVariant: 'gold' },
  argTypes: {
    badgeVariant: { control: 'inline-radio', options: ['gold', 'blue'] },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="ar" messages={{}}>
        <div className="min-h-screen">
          <Dialog defaultOpen>
            <Story />
          </Dialog>
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof CardDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Gold: Story = {}

export const Blue: Story = {
  args: { badgeVariant: 'blue' },
}

export const LongContent: Story = {
  args: {
    detail: {
      ...detail,
      title: 'تصوير وتوثيق فعاليات ومؤتمرات ثقافية كبرى بالفيديو والصوت',
      data: [...detail.data, 'لقطات تفاصيل بتحكي جوّ الليلة', 'تسليم نسخة احتياطية على قرص خارجي'],
      cards: {
        ...detail.cards,
        restCards: [...detail.cards.restCards, { header: 'المدة', description: 'يوم كامل' }],
      },
    },
  },
}

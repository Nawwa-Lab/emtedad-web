import { ServiceCard } from '@/components/ServicesCard'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import { fn } from 'storybook/test'

// Adjust this path to wherever your translation files live
import messages from '@/i18n/dictionary/ar'

const meta = {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/namliya/service-offers',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NextIntlClientProvider
        locale="ar"
        messages={messages}
        timeZone="Africa/Cairo"
        onError={(error) => {
          // Don't crash stories on missing translation keys
          if (error.code !== 'MISSING_MESSAGE') console.error(error)
        }}
        getMessageFallback={({ namespace, key }) => [namespace, key].filter(Boolean).join('.')}
      >
        <div dir="rtl" lang="ar" className="w-90">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    badgeVariant: {
      control: 'radio',
      options: ['blue', 'gold'],
    },
  },
  args: {
    category: 'تصميم جرافيك',
    title: 'تصميم هوية بصرية',
    desc: 'نقدم لك هوية بصرية متكاملة تشمل الشعار والألوان والخطوط التي تعبر عن علامتك التجارية.',
    providerName: 'أحمد الشريف',
    providerRate: 'عامر',
    price: '٢٥٠',
    currency: 'ر.س',
    request: 'اطلب الآن',
    spotsLeft: '٣ أماكن متبقية',
    ctaHref: '#',
    onRequest: undefined,
    showSaveButton: false,
    defaultSaved: false,
    showStatusBadge: true,
    badgeVariant: 'blue',
  },
} satisfies Meta<typeof ServiceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSaveButton: Story = {
  args: {
    showSaveButton: true,
  },
}

export const Saved: Story = {
  args: {
    showSaveButton: true,
    saved: true,
    onSaveChange: fn(),
  },
}

export const WithCallback: Story = {
  name: 'With onRequest callback',
  args: {
    onRequest: fn(),
  },
}

export const NoSpots: Story = {
  name: 'Without spots left',
  args: {
    spotsLeft: undefined,
  },
}

export const GoldBadge: Story = {
  name: 'Gold badge variant',
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/en/home',
      },
    },
  },
  args: {
    badgeVariant: 'gold',
    category: 'استشارات',
    title: 'استشارة أعمال',
    desc: 'جلسة استشارية لمساعدتك في تطوير خطة عملك التجارية وتحقيق أهدافك.',
    providerName: 'سارة المنصور',
    providerRate: 'كريم',
    price: '١٥٠',
    showSaveButton: true,
  },
}

export const LowRating: Story = {
  name: 'Provider with acceptable rating',
  args: {
    providerName: 'خالد نبيل',
    providerRate: 'أحسن عندك',
    showStatusBadge: true,
    category: 'برمجة',
    title: 'تطوير موقع إلكتروني',
    desc: 'تطوير موقع إلكتروني احترافي باستخدام أحدث التقنيات مع ضمان السرعة والأداء.',
    price: '٥٠٠',
  },
}

import { SubLinks } from '@/components/SubLinks'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

const sampleLinks = [
  { href: '/dashboard/overview', label: 'نظرة عامة' },
  { href: '/dashboard/services', label: 'الخدمات' },
  { href: '/dashboard/requests', label: 'الطلبات' },
  { href: '/dashboard/settings', label: 'الإعدادات' },
]

const meta = {
  title: 'Components/SubLinks',
  component: SubLinks,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard/overview',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const locale = (context.globals?.locale as string) || 'ar'

      return (
        <NextIntlClientProvider locale={locale} messages={{}}>
          <Story />
        </NextIntlClientProvider>
      )
    },
  ],
  argTypes: {
    separatorAfter: {
      control: 'number',
      description: 'Index of the link after which a separator is rendered',
    },
    className: {
      control: 'text',
      description: 'Custom class name for the container',
    },
    linkClassName: {
      control: 'text',
      description: 'Custom class name for individual links',
    },
  },
  args: {
    links: sampleLinks,
  },
} satisfies Meta<typeof SubLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSeparator: Story = {
  args: {
    separatorAfter: 1,
  },
}

export const ActiveSecondTab: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard/services',
      },
    },
  },
}

export const MultipleLinks: Story = {
  args: {
    links: [
      { href: '/dashboard/overview', label: 'نظرة عامة' },
      { href: '/dashboard/services', label: 'الخدمات' },
      { href: '/dashboard/offers', label: 'العروض' },
      { href: '/dashboard/requests', label: 'الطلبات' },
      { href: '/dashboard/clients', label: 'العملاء' },
      { href: '/dashboard/reports', label: 'التقارير' },
      { href: '/dashboard/settings', label: 'الإعدادات' },
    ],
    separatorAfter: 2,
  },
}

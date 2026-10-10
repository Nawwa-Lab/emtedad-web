import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemDescription,
  RadioGroupItemIcon,
  RadioGroupItemTitle,
} from '@/components/ui/radio-group'
import ar from '@/i18n/dictionary/ar.json'
import en from '@/i18n/dictionary/en.json'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Building2Icon, UsersRoundIcon } from 'lucide-react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import * as React from 'react'
import { expect } from 'storybook/test'

function RadioGroupDemo({
  initialValue = 'organization',
  disabled = false,
}: {
  initialValue?: 'organization' | 'community'
  disabled?: boolean
}) {
  const [value, setValue] = React.useState(initialValue)
  const t = useTranslations('contextSelection')

  return (
    <RadioGroup value={value} onValueChange={setValue} aria-label={t('title')}>
      <RadioGroupItem value="organization" aria-label={t('orgTitle')}>
        <RadioGroupItemIcon>
          <Building2Icon aria-hidden="true" />
        </RadioGroupItemIcon>
        <RadioGroupItemTitle>{t('orgTitle')}</RadioGroupItemTitle>
        <RadioGroupItemDescription>{t('orgDesc')}</RadioGroupItemDescription>
      </RadioGroupItem>
      <RadioGroupItem value="community" aria-label={t('pubTitle')} disabled={disabled}>
        <RadioGroupItemIcon>
          <UsersRoundIcon aria-hidden="true" />
        </RadioGroupItemIcon>
        <RadioGroupItemTitle>{t('pubTitle')}</RadioGroupItemTitle>
        <RadioGroupItemDescription>{t('pubDesc')}</RadioGroupItemDescription>
      </RadioGroupItem>
    </RadioGroup>
  )
}

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale === 'en' ? 'en' : 'ar'

      return (
        <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : ar}>
          <Story />
        </NextIntlClientProvider>
      )
    },
  ],
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <RadioGroupDemo />
    </div>
  ),
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

export const Default: Story = {
  play: async ({ canvas, userEvent }: PlayContext) => {
    const organization = canvas.getByRole('radio', { name: 'أنا مؤسسة' })
    const community = canvas.getByRole('radio', { name: 'أنا جمهور' })

    await expect(organization).toBeChecked()
    await userEvent.click(community)
    await expect(community).toBeChecked()
    await expect(organization).not.toBeChecked()
  },
}

export const CommunitySelected: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <RadioGroupDemo initialValue="community" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <RadioGroupDemo disabled />
    </div>
  ),
}

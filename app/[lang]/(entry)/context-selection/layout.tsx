import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { pick } from 'lodash'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.contextSelection.metaTitle,
    description: dict.contextSelection.metaDescription,
  }
}

export default async function ContextSelectionLayout({ children }: LayoutProps<'/[lang]'>) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={pick(messages, ['contextSelection'])}>
      {children}
    </NextIntlClientProvider>
  )
}

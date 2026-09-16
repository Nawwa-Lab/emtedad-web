import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Locale } from '@/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'
import { pick } from 'lodash'

export default async function GennyLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const messages = await getMessages()
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const genny = dict.genny.browse

  return (
    <NextIntlClientProvider messages={pick(messages, ['genny'])}>
      <h1 className="font-display font-bold text-[26px]/[1.5]">{genny.title}</h1>
      <p className="font-cairo font-semibold text-sm text-ink-soft mt-0.5">{genny.description}</p>
      <SubLinks
        className="mt-4 mb-1.5"
        links={[
          { href: '/genny/browse', label: genny.chips.browse },
          { href: '/genny/add-wish', label: genny.chips.addNew },
          { href: '/genny/my-wishes', label: genny.chips.myWishes },
        ]}
      />
      {children}
    </NextIntlClientProvider>
  )
}

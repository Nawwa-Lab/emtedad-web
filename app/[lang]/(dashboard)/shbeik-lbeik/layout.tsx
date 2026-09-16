import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Locale } from '@/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'
import { pick } from 'lodash'

export default async function ShbeikLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const messages = await getMessages()
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const shbeik = dict.shbeik.browse

  return (
    <NextIntlClientProvider messages={pick(messages, ['shbeik'])}>
      <h1 className="font-display font-bold text-[26px]/[1.5]">{shbeik.title}</h1>
      <p className="font-cairo font-semibold text-sm text-ink-soft mt-0.5">{shbeik.description}</p>
      <SubLinks
        className="mt-4 mb-1.5"
        links={[
          { href: '/shbeik-lbeik/browse', label: shbeik.chips.browse },
          { href: '/shbeik-lbeik/add-wish', label: shbeik.chips.addNew },
          { href: '/shbeik-lbeik/my-wishes', label: shbeik.chips.myWishes },
        ]}
      />
      {children}
    </NextIntlClientProvider>
  )
}

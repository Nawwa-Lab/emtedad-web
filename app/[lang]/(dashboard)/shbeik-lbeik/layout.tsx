import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

export default async function ShbeikLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const shbeik = dict.shbeik

  return (
    <NextIntlClientProvider messages={pick(messages, ['shbeik'])}>
      <RouteHeader
        routes={[
          {
            path: '/shbeik-lbeik/browse',
            description: shbeik.browse.description,
          },
          {
            path: '/shbeik-lbeik/my-wishes',
            description: shbeik.myWishes.description,
          },
        ]}
        title={shbeik.browse.title}
      >
        <SubLinks
          links={[
            { href: '/shbeik-lbeik/browse', label: shbeik.browse.chips.browse },
            { href: '/shbeik-lbeik/my-wishes', label: shbeik.browse.chips.myWishes },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

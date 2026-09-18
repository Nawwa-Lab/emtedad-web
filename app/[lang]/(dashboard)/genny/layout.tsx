import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

export default async function GennyLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const genny = dict.genny

  return (
    <NextIntlClientProvider messages={pick(messages, ['genny'])}>
      <RouteHeader
        routes={[
          {
            path: '/genny/browse',
            config: { title: genny.browse.title, description: genny.browse.description },
          },
          {
            path: '/genny/my-wishes',
            config: { title: genny.myWishes.title, description: genny.myWishes.description },
          },
        ]}
      >
        <SubLinks
          className="mt-4 mb-1.5"
          links={[
            { href: '/genny/browse', label: genny.browse.chips.browse },
            { href: '/genny/wish/create', label: genny.browse.chips.addNew },
            { href: '/genny/my-wishes', label: genny.browse.chips.myWishes },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

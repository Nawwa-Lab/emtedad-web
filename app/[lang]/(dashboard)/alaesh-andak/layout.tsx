import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

export default async function AlaeshLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const alaesh = dict.alaesh

  return (
    <NextIntlClientProvider messages={pick(messages, ['alaesh', 'public'])}>
      <RouteHeader
        routes={[
          {
            path: '/alaesh-andak/browse',
            config: { title: alaesh.browse.title, description: alaesh.browse.description },
          },
          {
            path: '/alaesh-andak/my-posts',
            config: { title: alaesh.myPosts.title, description: alaesh.myPosts.description },
          },
        ]}
      >
        <SubLinks
          className="mt-4 mb-1.5"
          links={[
            { href: '/alaesh-andak/browse', label: alaesh.browse.chips.browse },
            { href: '/alaesh-andak/request/create', label: alaesh.browse.chips.addNew },
            { href: '/alaesh-andak/my-posts', label: alaesh.browse.chips.myPosts },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

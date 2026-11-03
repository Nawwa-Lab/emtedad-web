import { RouteHeader } from '@/components/RouteHeader'
import { SubLinks } from '@/components/SubLinks'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function KhalliKhalesLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const browse = dict.khalliKhalesBrowse

  return (
    <NextIntlClientProvider messages={messages}>
      <RouteHeader
        routes={[{ pattern: '/khalli-khales/browse$', description: browse.description }]}
        title={browse.title}
      >
        <SubLinks
          linkClassName="relative py-3 px-6.5 text-[21px] h-12"
          separatorAfter={0}
          links={[
            { href: '/khalli-khales/browse', label: browse.link1 },
            { href: '/community/my-offers/organizations', label: browse.link2 },
            { href: '/community/my-asks/organizations', label: browse.link3 },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

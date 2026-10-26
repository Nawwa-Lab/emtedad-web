import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

export default async function NamliyaLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const namliya = dict.namliyaBrowse

  return (
    <NextIntlClientProvider messages={messages}>
      <RouteHeader
        routes={[
          {
            pattern: '/namliya/.*-offers$',
            description: namliya.description,
          },
        ]}
        title={namliya.title}
      >
        <SubLinks
          linkClassName="relative py-3 px-6.5 text-[21px] h-12"
          separatorAfter={0}
          links={[
            { href: '/namliya/service-offers', label: namliya.link1 },
            { href: '/namliya/my-requests', label: namliya.link2 },
            { href: '/namliya/my-asks', label: namliya.link3 },
            { href: '/namliya/drafts', label: namliya.link4 },
          ]}
        />
        <SubLinks
          linkClassName="relative py-[10px] px-[22px] text-[17px]"
          links={[
            { href: '/namliya/service-offers', label: namliya.serviceLink },
            { href: '/namliya/resource-offers', label: namliya.resourceLink },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

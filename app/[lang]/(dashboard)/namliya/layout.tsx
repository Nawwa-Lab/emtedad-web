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

import { QuickAction } from '@/components/QuickAction'
import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

export default async function NamliyaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const messages = await getMessages()
  const { lang } = await params
  const dict = await getDictionary(lang as 'ar' | 'en')
  const namliya = dict.namliyaBrowse
  return (
    <NextIntlClientProvider messages={messages}>
      <RouteHeader
        routes={[
          {
            pattern: '/namliya/.*-offers$',
            config: {
              title: namliya.title,
              description: namliya.description,
              action: <QuickAction />,
            },
          },
        ]}
        className="mb-1.5"
        titleClassName="text-[20px] sm:text-[23px] md:text-[26px] leading-normal"
        descriptionClassName="text-[12.5px] sm:text-[13px] md:text-[13.5px] mt-1"
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

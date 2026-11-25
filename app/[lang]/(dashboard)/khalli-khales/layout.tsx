import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { KhalliKhalesNav } from './components'

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
        <KhalliKhalesNav labels={browse} />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}

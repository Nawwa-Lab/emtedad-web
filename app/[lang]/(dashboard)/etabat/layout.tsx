import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function EtabatLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={{ etabat: messages.etabat, global: messages.global }}>
      {children}
    </NextIntlClientProvider>
  )
}

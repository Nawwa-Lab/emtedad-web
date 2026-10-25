import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function AlaeshLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={pick(messages, ['alaesh', 'global', 'dialog'])}>
      {children}
    </NextIntlClientProvider>
  )
}

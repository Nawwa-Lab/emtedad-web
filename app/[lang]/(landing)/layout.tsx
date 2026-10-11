import { LandingNav } from '@/components/landing/LandingPage'
import { SidebarNavMenu } from '@/components/SidebarNavMenu'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dictionary = await getDictionary()
  const copy = dictionary.landing
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen w-full flex-col bg-paper text-ink min-[821px]:flex-row">
        <SidebarNavMenu requireUser />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <LandingNav copy={copy} />
          <main className="min-w-0 flex-1 overflow-y-auto p-8 max-[820px]:p-4">
            <div className="m-auto max-w-300">{children}</div>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  )
}

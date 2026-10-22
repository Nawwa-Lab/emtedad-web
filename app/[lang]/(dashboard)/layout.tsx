import { Header } from '@/components/Header'
import { SidebarNavMenu } from '@/components/SidebarNavMenu'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen min-w-0 flex-1 flex-col min-[821px]:flex-row">
        <SidebarNavMenu />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header />
          <main className="min-w-0 flex-1 overflow-y-auto p-8 max-[820px]:p-4 dot-grid-bg">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  )
}

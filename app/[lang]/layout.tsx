import { UserProvider } from '@/contexts/UserContext'
import { alexandriaFont, cairoFont, lalezarFont, rubikFont } from '@/lib/fonts'
import { QueryProvider } from '@/services/query'
import { Toaster } from '@/components/ui/toast'
import type { Locale } from '@/types'
import type { Metadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'
import './globals.css'
import { DirectionProvider } from '@base-ui/react'

export const metadata: Metadata = {
  title: 'Shahamham',
  description: 'Shahamham',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
  themeColor: '#F1E7CF',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dir = (lang as Locale) === 'ar' ? 'rtl' : 'ltr'
  const [toastT, loaderT] = await Promise.all([
    getTranslations({ locale: lang, namespace: 'systemStates.toast' }),
    getTranslations({ locale: lang, namespace: 'global.loading' }),
  ])
  const sessionWsUrl = process.env.SESSION_WS_URL ?? ''
  return (
    <html lang={lang} dir={dir}>
      <body
        className={`flex flex-col relative ${rubikFont.variable} ${lalezarFont.variable} ${cairoFont.variable} ${alexandriaFont.variable} bg-paper`}
      >
        <QueryProvider>
          <DirectionProvider direction={dir}>
            <UserProvider
              loaderDescription={loaderT('description')}
              locale={lang}
              sessionWsUrl={sessionWsUrl}
            >
              {children}
            </UserProvider>
          </DirectionProvider>
        </QueryProvider>
        <Toaster dismissLabel={toastT('dismiss')} />
      </body>
    </html>
  )
}

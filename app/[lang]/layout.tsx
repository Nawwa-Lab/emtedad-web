import { UserProvider } from '@/contexts/UserContext'
import { alexandriaFont, cairoFont, lalezarFont, rubikFont } from '@/lib/fonts'
import type { Locale } from '@/types'
import type { Metadata, Viewport } from 'next'
import './globals.css'

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
  return (
    <html lang={lang} dir={dir}>
      <body
        className={`h-screen flex flex-col relative ${rubikFont.variable} ${lalezarFont.variable} ${cairoFont.variable} ${alexandriaFont.variable} bg-paper`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

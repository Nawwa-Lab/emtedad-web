import Logo from '@/app/star.svg'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Image from 'next/image'

export default async function EntryLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="relative min-h-screen flex flex-col items-center justify-center py-12 px-5 gap-6 dot-grid-bg">
        <div className="text-center">
          <Image src={Logo} alt="Shahamham Logo" className="mx-auto mb-2.5" />
          <div className="font-display font-bold text-[40px]/[1.3] text-green-deep">شهمهم</div>
        </div>
        {children}
      </main>
    </NextIntlClientProvider>
  )
}

import Logo from '@/app/star.svg'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Image from 'next/image'

export default async function EntryLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="relative min-h-screen flex flex-col items-center justify-center py-12 px-5 gap-6 dot-grid-bg dot-grid-bg-mask">
        <div className="flex flex-row items-center justify-center text-center">
          <Image src={Logo} alt="Shahamham Logo" className="mx-auto mb-2.5 animate-spin" />
          <div className="font-display font-bold text-[40px]/[1.3] text-red">شهمهم</div>
        </div>
        {children}
      </main>
    </NextIntlClientProvider>
  )
}

import Logo from '@/icons/star.svg'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Image from 'next/image'

export default async function EntryLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="relative min-h-screen flex flex-col items-center justify-center py-12 px-5 gap-6 dot-grid-bg dot-grid-bg-mask">
        <div className="flex flex-row gap-4 items-center justify-center text-center mb-8">
          <Image src={Logo} alt="Shahamham Logo" className="mx-auto mb-2.5 animate-spin size-20" />
          <div className="font-display font-bold text-[58px]/[1] text-red">شهمهم</div>
        </div>
        {children}
      </main>
    </NextIntlClientProvider>
  )
}

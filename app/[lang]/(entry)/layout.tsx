import Logo from '@/icons/star.svg'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Image from 'next/image'

export default async function EntryLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="relative min-h-screen flex flex-col items-center justify-start pt-14 pb-12 px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 dot-grid-bg dot-grid-bg-mask"
        />
        <div className="relative z-10 mb-[22px] inline-flex h-[132px] flex-row items-center justify-center gap-3 text-center leading-none max-[520px]:h-[108px]">
          <Image
            src={Logo}
            width={55}
            height={55}
            alt="Shahamham Logo"
            loading="eager"
            className="animate-[spin_40s_linear_infinite]"
          />
          <div className="font-display font-bold text-[58px]/[1] text-red">شهمهم</div>
        </div>
        <div className="relative z-10 flex w-full flex-col items-center">{children}</div>
      </main>
    </NextIntlClientProvider>
  )
}

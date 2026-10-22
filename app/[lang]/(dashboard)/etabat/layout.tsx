import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function EtabatLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()

  return (
    <NextIntlClientProvider messages={{ etabat: messages.etabat, global: messages.global }}>
      <div className="mx-auto mb-2 flex max-w-245 flex-row flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] font-normal max-[520px]:text-[40px]">
          {dict.etabat.home.title}
        </h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">
          {dict.etabat.home.description}
        </p>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}

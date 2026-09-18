import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'
import { Locale } from '@/types'

export default async function WishFormLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  return (
    <>
      <Link
        href="/genny"
        className="inline-block font-bold font-cairo text-xs mb-3.5 text-green-deep"
      >
        {dict.genny.addWish.backToGenny}
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">{children}</div>
    </>
  )
}

import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'

export default async function WishFormLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary()
  return (
    <>
      <Link
        href="/shbeik-lbeik"
        className="inline-block font-bold font-cairo text-xs mb-3.5 text-green-deep"
      >
        {dict.shbeik.addWish.backToShbeik}
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">{children}</div>
    </>
  )
}

import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'

export default async function AlaeshRequestLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary()
  return (
    <>
      <Link
        href="/alaesh-andak/browse"
        className="inline-block font-bold font-cairo text-[12.5px] mb-3.5 text-green-deep hover:underline"
      >
        {dict.alaesh.addRequest.backToBoard}
      </Link>
      {children}
    </>
  )
}

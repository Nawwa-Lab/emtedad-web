import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'
import { ChevronLeft } from 'lucide-react'

export default async function AlaeshRequestLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary()
  return (
    <>
      <Link
        href="/alaesh-andak/browse"
        className="mb-4 inline-flex items-center gap-2 font-body text-[14px] font-extrabold text-ink hover:text-red"
      >
        <span className="grid size-8 place-items-center rounded-full border-[2.5px] border-ink bg-gold shadow-[2px_2px_0] shadow-ink">
          <ChevronLeft className="size-4.5 rtl:rotate-180" strokeWidth={3.2} />
        </span>
        {dict.alaesh.header.backToBoard}
      </Link>
      {children}
    </>
  )
}

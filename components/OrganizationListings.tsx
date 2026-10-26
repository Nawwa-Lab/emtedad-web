import type { OrganizationListing } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import CirclesIcon from '@/icons/circles.svg'
import PlantIcon from '@/icons/plant.svg'
import TargetIcon from '@/icons/target.svg'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { OrganizationOfferCard } from './OrganizationOfferCard'

const markets = [
  { key: 'namliya', labelKey: 'onNamliya', icon: CirclesIcon },
  { key: 'khalli', labelKey: 'onKhalli', icon: PlantIcon },
  { key: 'alaesh', labelKey: 'onAlaesh', icon: TargetIcon },
] as const

export async function OrganizationListings({
  listings,
  variant,
}: {
  listings: OrganizationListing[]
  variant: 'human' | 'material'
}) {
  const t = await getTranslations('organizationProfile')
  return (
    <div className="space-y-8">
      {markets.map((market) => {
        const items = listings.filter((listing) => listing.market === market.key)
        if (!items.length) return null
        return (
          <section key={market.key} aria-labelledby={market.key} className="mt-9 scroll-mt-25">
            <div className="mb-4 flex items-center gap-3 border-b-4 border-ink pb-3">
              <Image src={market.icon} alt="" className="size-11 shrink-0" />
              <h2
                id={market.key}
                className="font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-none"
              >
                {t(`markets.${market.labelKey}`)}
              </h2>
              <span className="ms-auto font-body text-sm font-semibold text-soft">
                {t(`marketCounts.${variant}.${market.key}`)}
              </span>
            </div>
            <p className="-mt-2 mb-4 max-w-195 font-body text-base font-medium leading-8 text-soft">
              {t(`marketNotes.${variant}.${market.key}`)}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((item) => (
                <OrganizationOfferCard key={item.title} listing={item} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

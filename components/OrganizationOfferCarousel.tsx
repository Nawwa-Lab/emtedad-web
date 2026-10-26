'use client'

import type { OrganizationListing } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { Link } from '@/i18n/navigation'
import { ChevronLeft } from 'lucide-react'
import { OrganizationOfferCard } from './OrganizationOfferCard'
import { Button } from './ui/button'
import { Carousel } from './ui/carousel'

type Props = { title: string; countLabel: string; href: string; listings: OrganizationListing[] }

export function OrganizationOfferCarousel({
  title,
  countLabel,
  href,
  listings,
  showActions = true,
}: Props & { showActions?: boolean }) {
  return (
    <section className="mt-9">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <Link href={href} className="inline-flex items-center gap-3 text-ink hover:text-red">
          <h2 className="border-b-4 border-red pb-1 font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-none">
            {title}
          </h2>
          <Button variant="primary" size="icon">
            <ChevronLeft className={'size-6 ltr:rotate-180'}></ChevronLeft>
          </Button>
        </Link>
        <span className="font-body text-sm font-bold text-soft">{countLabel}</span>
      </div>
      <Carousel
        ariaLabel={title}
        previousLabel="السابق"
        nextLabel="التالي"
        itemClassName="w-[min(86vw,380px)]"
      >
        {listings.map((listing) => (
          <OrganizationOfferCard key={listing.title} listing={listing} showAction={showActions} />
        ))}
      </Carousel>
    </section>
  )
}

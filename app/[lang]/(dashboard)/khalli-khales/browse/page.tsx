'use client'

import { ServiceCard } from '@/components/ServicesCard'
import { Carousel } from '@/components/ui/carousel'
import { Link } from '@/i18n/navigation'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import PlantIcon from '@/icons/plant.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { giftShop, publicToMembers, publicToOrganizations, type KhalliKhalesOffer } from './data'

type SectionKey = 'section1' | 'section2' | 'section3'

function OfferSection({
  sectionKey,
  icon,
  href,
  offers,
  actions,
  expandAriaLabel,
  viewOnly,
}: {
  sectionKey: SectionKey
  icon: import('next/image').ImageProps['src']
  href: string
  offers: KhalliKhalesOffer[]
  actions: import('@/components/ServicesCard').ServiceCardAction[]
  expandAriaLabel?: string
  viewOnly?: string
}) {
  const t = useTranslations('khalliKhalesBrowse')
  const locale = useLocale()
  const count = formatNumber(offers.length, { locale })
  const title = t(
    sectionKey === 'section1'
      ? 'section1Title'
      : sectionKey === 'section2'
        ? 'section2Title'
        : 'section3Title',
  )
  const note = t.rich(
    sectionKey === 'section1'
      ? 'section1Note'
      : sectionKey === 'section2'
        ? 'section2Note'
        : 'section3Note',
    {
      b: (chunks) => <b className="font-extrabold text-ink">{chunks}</b>,
    },
  )

  return (
    <section className="mt-8.5">
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <Link
          href={href}
          className="group inline-flex items-center gap-3.5 text-ink hover:text-red"
        >
          <Image src={icon} alt="" className="size-10 shrink-0" />
          <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15]">
            {title}
          </h2>
          <span className="grid size-10.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-red p-2.5 text-surface shadow-[3px_3px_0] shadow-ink transition group-hover:translate-x-px group-hover:translate-y-px group-hover:shadow-[1px_1px_0] shadow-ink">
            <ChevronLeft size={20} strokeWidth={3} className="ltr:rotate-180" />
          </span>
        </Link>
        <span className="font-body text-[15px] font-bold text-soft">
          {t('offersCount', { count })}
        </span>
      </div>

      {viewOnly && (
        <span className="mb-3.5 inline-flex items-center gap-2.25 rounded-full border-[2.5px] border-ink bg-gold px-4 py-1.5 font-body text-[13.5px] font-extrabold text-ink">
          <Image src={TargetIcon} alt="" className="size-5 shrink-0" />
          {viewOnly}
        </span>
      )}

      <p className="mb-3.5 max-w-205 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
        {note}
      </p>

      <Carousel
        ariaLabel={title}
        previousLabel={t('previous')}
        nextLabel={t('next')}
        itemClassName="w-[clamp(300px,31%,380px)] max-[560px]:w-[86%]"
      >
        {offers.map((offer) => (
          <ServiceCard
            key={offer.id}
            category={offer.category}
            title={offer.title}
            desc={offer.desc}
            providerName={offer.providerName}
            providerRate={offer.providerRate}
            price={offer.price}
            detail={offer.detail}
            badgeVariant={offer.badgeVariant ?? 'blue'}
            actions={actions}
            expandAriaLabel={expandAriaLabel}
            hideCurrency={offer.free}
            hidePriceNote={offer.free}
          />
        ))}
      </Carousel>
    </section>
  )
}

export default function KhalliKhalesBrowsePage() {
  const t = useTranslations('khalliKhalesBrowse')

  return (
    <>
      <OfferSection
        sectionKey="section1"
        icon={CirclesIcon}
        href="/khalli-khales/public-to-organizations"
        offers={publicToOrganizations}
        actions={[
          { label: t('actionRequest'), variant: 'primary' },
          { label: t('actionSave'), variant: 'outline' },
        ]}
        expandAriaLabel={t('expandAria')}
      />
      <OfferSection
        sectionKey="section2"
        icon={HandIcon}
        href="/khalli-khales/public-to-members"
        offers={publicToMembers}
        actions={[{ label: t('actionShare'), variant: 'outline' }]}
        expandAriaLabel={t('expandAria')}
        viewOnly={t('section2ViewOnly')}
      />
      <OfferSection
        sectionKey="section3"
        icon={PlantIcon}
        href="/khalli-khales/gift-shop"
        offers={giftShop}
        actions={[{ label: t('actionDetails'), variant: 'outline' }]}
        expandAriaLabel={t('expandAria')}
        viewOnly={t('section3ViewOnly')}
      />

      <div className="mt-10 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-13 shrink-0 place-items-center rounded-field border-[2.5px] border-ink bg-surface p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={PlantIcon} alt="" className="size-full" />
        </span>
        <p className="min-w-57.5 flex-1 font-body text-base font-semibold leading-[1.9]">
          <b className="block font-display text-[19px] font-normal">{t('capTitle')}</b>
          {t('capBody')}
        </p>
      </div>
    </>
  )
}

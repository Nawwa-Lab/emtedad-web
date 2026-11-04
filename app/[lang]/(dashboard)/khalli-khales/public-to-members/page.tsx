'use client'

import { useState } from 'react'
import { ServiceCard } from '@/components/ServicesCard'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import HandIcon from '@/icons/hand.svg'
import PlantIcon from '@/icons/plant.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { publicToMembersOffers, totalOffers } from './data'

export default function PublicToMembersPage() {
  const t = useTranslations('khalliKhalesPublicToMembers')
  const locale = useLocale()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filteredOffers = publicToMembersOffers.filter((offer) =>
    [offer.title, offer.desc, offer.category, offer.providerName]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )

  return (
    <>
      <Link
        href="/khalli-khales/browse"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('back')}</span>
      </Link>

      <div className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] font-normal">{t('title')}</h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </div>

      <div className="mt-5.5 mb-3.5 flex flex-wrap items-center gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-surface p-1.5 shadow-[2px_2px_0] shadow-ink">
          <Image src={HandIcon} alt="" className="size-full" />
        </span>
        <h2 className="font-display text-[clamp(26px,3.2vw,34px)]/[1.2] font-normal">
          {t('sectionTitle')}
        </h2>
        <span className="ms-auto font-body text-[15px] font-bold text-soft">
          {t('offersCount', { count: formatNumber(totalOffers, { locale }) })}
        </span>
      </div>

      <span className="mb-3 inline-flex items-center gap-2.25 rounded-full border-[2.5px] border-ink bg-gold px-4 py-1.5 font-body text-[13.5px] font-extrabold text-ink">
        <Image src={TargetIcon} alt="" className="size-5 shrink-0" />
        {t('viewOnly')}
      </span>

      <p className="mb-4.5 max-w-210 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
        {t.rich('note', {
          b: (chunks) => <b className="font-extrabold text-ink">{chunks}</b>,
        })}
      </p>

      <div className="mb-5 flex flex-wrap gap-3">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchAria')}
          className="min-w-55 flex-1 rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-3.25 font-body text-[16px] font-semibold text-ink shadow-[3px_3px_0] shadow-ink"
        />
      </div>

      {filteredOffers.length === 0 ? (
        <p className="py-10 text-center font-body font-bold text-ink">{t('noResults')}</p>
      ) : (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {filteredOffers.map((offer) => (
            <ServiceCard
              key={offer.id}
              category={offer.category}
              title={offer.title}
              desc={offer.desc}
              providerName={offer.providerName}
              providerRate={offer.providerRate}
              price={offer.price}
              detail={offer.detail}
              badgeVariant="blue"
              actions={[{ label: t('actionShare'), variant: 'outline' }]}
              expandAriaLabel={t('expandAria')}
              hideCurrency={offer.free}
              hidePriceNote={offer.free}
            />
          ))}
        </div>
      )}

      <div className="mt-5.5 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-blue px-5.5 py-4.5 text-surface shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-12 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-surface p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={PlantIcon} alt="" className="size-full" />
        </span>
        <p className="min-w-57.5 flex-1 font-body text-[15.5px] font-semibold leading-[1.9]">
          <b className="block font-display text-[18px] font-normal">{t('capTitle')}</b>
          {t('capBody')}
        </p>
      </div>
    </>
  )
}

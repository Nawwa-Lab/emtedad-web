'use client'

import { useState } from 'react'
import { ServiceCard } from '@/components/ServicesCard'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import CirclesIcon from '@/icons/circles.svg'
import { formatNumber } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { publicToOrganizationsOffers, totalOffers } from './data'

export default function PublicToOrganizationsPage() {
  const t = useTranslations('khalliKhalesPublicToOrganizations')
  const locale = useLocale()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filteredOffers = publicToOrganizationsOffers.filter((offer) =>
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
          <Image src={CirclesIcon} alt="" className="size-full" />
        </span>
        <h2 className="font-display text-[clamp(26px,3.2vw,34px)]/[1.2] font-normal">
          {t('sectionTitle')}
        </h2>
        <span className="ms-auto font-body text-[15px] font-bold text-soft">
          {t('offersCount', { count: formatNumber(totalOffers, { locale }) })}
        </span>
      </div>

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
              actions={[
                { label: t('actionRequest'), variant: 'primary' },
                { label: t('actionSave'), variant: 'outline' },
              ]}
              expandAriaLabel={t('expandAria')}
              hideCurrency={offer.free}
              hidePriceNote={offer.free}
            />
          ))}
        </div>
      )}
    </>
  )
}

'use client'

import { ServiceCard } from '@/components/ServicesCard'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import {
  EmptyState,
  FilterBar,
  PageHead,
  ResLine,
  SubTabs,
  reslineBold,
  useCardActionLabels,
} from '../components'
import { type CommunityAudience, type CommunityOfferStatus, myOffersCommunity } from '../data'

const statuses: CommunityOfferStatus[] = ['none', 'ask', 'doing', 'done']

export function CommunityOffersView() {
  const t = useTranslations('khalliKhalesMyOffers')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const locale = useLocale()
  const actionLabels = useCardActionLabels()

  const [audience, setAudience] = useState<CommunityAudience>('org')
  const [status, setStatus] = useState<CommunityOfferStatus>('none')

  const audienceLabels: Record<CommunityAudience, string> = {
    org: t('typeOrgs'),
    mem: t('typeMembers'),
  }
  const statusLabels: Record<CommunityOfferStatus, string> = {
    none: shared('statusNone'),
    ask: shared('statusAsk'),
    doing: shared('statusDoing'),
    done: shared('statusDone'),
  }

  const displayedOffers = myOffersCommunity.filter(
    (offer) => offer.audience === audience && offer.status === status,
  )
  const statusLabel = statusLabels[status]
  const audienceLabel = audienceLabels[audience]
  const count = formatNumber(displayedOffers.length, { locale })

  return (
    <>
      <PageHead title={browse('title')} subtitle={t('subtitle')} />
      <SubTabs
        links={[
          { href: '/khalli-khales/browse', label: browse('link1') },
          { href: '/khalli-khales/my-offers', label: browse('link2') },
          { href: '/khalli-khales/my-asks', label: browse('link3') },
          { href: '/khalli-khales/my-registrations', label: browse('link4') },
          { href: '/khalli-khales/history', label: browse('link5') },
        ]}
      />

      <FilterBar
        rows={[
          {
            label: t('filterAudience'),
            options: (Object.keys(audienceLabels) as CommunityAudience[]).map((key) => ({
              key,
              label: audienceLabels[key],
            })),
            value: audience,
            onChange: (key) => setAudience(key as CommunityAudience),
          },
          {
            label: shared('filterStatus'),
            options: statuses.map((key) => ({ key, label: statusLabels[key] })),
            value: status,
            onChange: (key) => setStatus(key as CommunityOfferStatus),
          },
        ]}
      />

      <ResLine icon={PlantIcon}>
        {displayedOffers.length > 0
          ? shared.rich('reslineCountType', {
              b: reslineBold,
              count,
              label: statusLabel,
              type: audienceLabel,
            })
          : shared('reslineNoneType', { label: statusLabel, type: audienceLabel })}
      </ResLine>

      {displayedOffers.length > 0 ? (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {displayedOffers.map((offer) => (
            <ServiceCard
              key={offer.id}
              category={offer.category}
              title={offer.title}
              desc={offer.desc}
              providerName={offer.detail.providerName}
              price={offer.price}
              detail={offer.detail}
              badgeVariant={offer.badgeVariant ?? 'blue'}
              expandAriaLabel={shared('expandAria')}
              hideCurrency={offer.free}
              hidePriceNote={offer.free}
              infoRows={offer.infoRows}
              actions={offer.actions.map((action) => ({
                label: actionLabels[action.key],
                variant: action.variant,
                href: action.href,
              }))}
            />
          ))}
        </div>
      ) : (
        <EmptyState title={t('emptyTitle', { label: statusLabel })} />
      )}
    </>
  )
}

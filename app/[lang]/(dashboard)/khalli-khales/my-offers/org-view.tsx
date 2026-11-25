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
import { type OrgOfferStatus, type OrgOfferType, myOffersOrg } from '../data'

/** Design panel-38: the status options each offer type can be in. */
const statusSets: Record<OrgOfferType, OrgOfferStatus[]> = {
  act: ['open', 'closed', 'done'],
  svc: ['none', 'ask', 'doing', 'done'],
  res: ['none', 'ask', 'doing', 'done'],
}

export function OrgOffersView() {
  const t = useTranslations('khalliKhalesMyOffersOrg')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const locale = useLocale()
  const actionLabels = useCardActionLabels()

  const [type, setType] = useState<OrgOfferType>('act')
  const [status, setStatus] = useState<OrgOfferStatus>('open')

  const typeLabels: Record<OrgOfferType, string> = {
    act: t('typeActivities'),
    svc: t('typeServices'),
    res: t('typeResources'),
  }
  const statusLabels: Record<OrgOfferStatus, string> = {
    open: t('statusOpen'),
    closed: t('statusClosed'),
    done: t('statusFinished'),
    none: shared('statusNone'),
    ask: shared('statusAsk'),
    doing: shared('statusDoing'),
  }

  const displayedOffers = myOffersOrg.filter(
    (offer) => offer.type === type && offer.status === status,
  )
  const statusLabel = statusLabels[status]
  const typeLabel = typeLabels[type]
  const count = formatNumber(displayedOffers.length, { locale })

  const changeType = (nextType: OrgOfferType) => {
    setType(nextType)
    setStatus(statusSets[nextType][0])
  }

  return (
    <>
      <PageHead title={browse('title')} subtitle={t('subtitle')} />
      <SubTabs
        links={[
          { href: '/khalli-khales/browse', label: browse('link1') },
          { href: '/khalli-khales/my-offers', label: browse('link2') },
          { href: '/khalli-khales/my-asks', label: browse('link3') },
        ]}
      />

      <FilterBar
        rows={[
          {
            label: shared('filterType'),
            options: (Object.keys(typeLabels) as OrgOfferType[]).map((key) => ({
              key,
              label: typeLabels[key],
            })),
            value: type,
            onChange: (key) => changeType(key as OrgOfferType),
          },
          {
            label: shared('filterStatus'),
            options: statusSets[type].map((key) => ({ key, label: statusLabels[key] })),
            value: status,
            onChange: (key) => setStatus(key as OrgOfferStatus),
          },
        ]}
      />

      <ResLine icon={PlantIcon}>
        {displayedOffers.length > 0
          ? shared.rich('reslineCountType', {
              b: reslineBold,
              count,
              label: statusLabel,
              type: typeLabel,
            })
          : shared('reslineNoneType', { label: statusLabel, type: typeLabel })}
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
        <EmptyState title={t('emptyTitle', { type: typeLabel, label: statusLabel })} />
      )}
    </>
  )
}

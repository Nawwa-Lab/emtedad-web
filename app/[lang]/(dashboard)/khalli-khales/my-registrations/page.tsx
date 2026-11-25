'use client'

import { CommunityRouteGuard } from '@/components/CommunityRouteGuard'
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
import { type RegistrationStatus, myRegistrations } from '../data'

export default function MyRegistrationsPage() {
  const t = useTranslations('khalliKhalesMyRegistrations')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const locale = useLocale()
  const actionLabels = useCardActionLabels()

  const [status, setStatus] = useState<RegistrationStatus>('reg')

  const statusLabels: Record<RegistrationStatus, string> = {
    reg: t('statusRegistered'),
    wait: t('statusWaitlist'),
    att: t('statusAttended'),
    cx: t('statusCancelled'),
  }

  const displayedOffers = myRegistrations.filter((offer) => offer.status === status)
  const statusLabel = statusLabels[status]
  const count = formatNumber(displayedOffers.length, { locale })

  return (
    <CommunityRouteGuard>
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
              label: shared('filterStatus'),
              options: (Object.keys(statusLabels) as RegistrationStatus[]).map((key) => ({
                key,
                label: statusLabels[key],
              })),
              value: status,
              onChange: (key) => setStatus(key as RegistrationStatus),
            },
          ]}
        />

        <ResLine icon={PlantIcon}>
          {displayedOffers.length > 0
            ? shared.rich('reslineCount', { b: reslineBold, count, label: statusLabel })
            : shared('reslineNone', { label: statusLabel })}
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
                statePill={{
                  label: statusLabel,
                  variant: status === 'wait' || status === 'cx' ? 'off' : 'ok',
                }}
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
    </CommunityRouteGuard>
  )
}

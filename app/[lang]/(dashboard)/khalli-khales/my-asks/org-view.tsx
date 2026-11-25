'use client'

import { ServiceCard } from '@/components/ServicesCard'
import CirclesIcon from '@/icons/circles.svg'
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
import { type AskStatus, myAsksOrg } from '../data'

const statuses: AskStatus[] = ['ask', 'doing', 'done']

export function OrgAsksView() {
  const t = useTranslations('khalliKhalesMyAsksOrg')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const locale = useLocale()
  const actionLabels = useCardActionLabels()

  const [status, setStatus] = useState<AskStatus>('ask')

  const statusLabels: Record<AskStatus, string> = {
    ask: shared('statusAsk'),
    doing: shared('statusDoing'),
    done: shared('statusDone'),
  }

  const displayedAsks = myAsksOrg.filter((ask) => ask.status === status)
  const statusLabel = statusLabels[status]
  const count = formatNumber(displayedAsks.length, { locale })

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
            label: shared('filterStatus'),
            options: statuses.map((key) => ({ key, label: statusLabels[key] })),
            value: status,
            onChange: (key) => setStatus(key as AskStatus),
          },
        ]}
      />

      <ResLine icon={CirclesIcon}>
        {displayedAsks.length > 0
          ? shared.rich('reslineCount', {
              b: reslineBold,
              count,
              label: statusLabel,
            })
          : shared('reslineNone', { label: statusLabel })}
      </ResLine>

      {displayedAsks.length > 0 ? (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {displayedAsks.map((ask) => (
            <ServiceCard
              key={ask.id}
              category={ask.category}
              title={ask.title}
              desc={ask.desc}
              providerName={ask.detail.providerName}
              price={ask.price}
              detail={ask.detail}
              badgeVariant={ask.badgeVariant ?? 'blue'}
              expandAriaLabel={shared('expandAria')}
              infoRows={ask.infoRows}
              actions={ask.actions.map((action) => ({
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

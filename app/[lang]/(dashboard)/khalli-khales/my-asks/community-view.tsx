'use client'

import { ServiceCard } from '@/components/ServicesCard'
import CirclesIcon from '@/icons/circles.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
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
import { type AskStatus, type AskType, myAsksCommunity } from '../data'

const types: AskType[] = ['svc', 'res']
const statuses: AskStatus[] = ['ask', 'doing', 'done']

export function CommunityAsksView() {
  const t = useTranslations('khalliKhalesMyAsks')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const locale = useLocale()
  const actionLabels = useCardActionLabels()

  const [type, setType] = useState<AskType>('svc')
  const [status, setStatus] = useState<AskStatus>('ask')

  const fmt = (value: number | string) => formatNumber(value, { locale })

  const typeLabels: Record<AskType, string> = {
    svc: t('typeServices'),
    res: t('typeResources'),
  }
  const statusLabels: Record<AskStatus, string> = {
    ask: shared('statusAsk'),
    doing: shared('statusDoing'),
    done: shared('statusDone'),
  }

  const displayedAsks = myAsksCommunity.filter((ask) => ask.type === type && ask.status === status)
  const typeLabel = typeLabels[type]
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
          { href: '/khalli-khales/my-registrations', label: browse('link4') },
          { href: '/khalli-khales/history', label: browse('link5') },
        ]}
      />

      <div className="mb-5.5 flex flex-wrap items-center gap-4 rounded-panel border-3 border-ink bg-surface px-5.5 py-4.5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-12 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-gold p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={PlantIcon} alt="" className="size-full" />
        </span>
        <span className="min-w-50 flex-1">
          <b className="block font-display text-[20px] leading-[1.3]">{t('allowTitle')}</b>
          <span className="mt-[3px] block font-body text-[14.5px] font-semibold text-soft">
            {t('allowBody', { count: fmt(10), total: fmt(25) })}
          </span>
        </span>
        <span className="block h-4 min-w-37.5 flex-1 overflow-hidden rounded-full border-[2.5px] border-ink bg-paper">
          <i className="block h-full w-[40%] bg-gold" />
        </span>
      </div>

      <FilterBar
        rows={[
          {
            label: shared('filterType'),
            options: types.map((key) => ({ key, label: typeLabels[key] })),
            value: type,
            onChange: (key) => setType(key as AskType),
          },
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
          ? shared.rich('reslineCountType', {
              b: reslineBold,
              count,
              label: statusLabel,
              type: typeLabel,
            })
          : shared('reslineNoneType', { label: statusLabel, type: typeLabel })}
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
        <EmptyState title={shared('reslineNone', { label: statusLabel })} />
      )}
    </>
  )
}

'use client'

import { AlaeshHeader } from '@/components/AlaeshHeader'
import {
  AlaeshRequestCard,
  AlaeshRequestDialog,
  type AlaeshRequestCardData,
} from '@/components/AlaeshRequestCard'
import { toast } from '@/components/ui/toast'
import LanternIcon from '@/icons/lantern.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { myRequests, type AlaeshMarket } from '../data'

type RequestView = 'open' | 'history'
type MarketFilter = Exclude<AlaeshMarket, 'public'> | 'all'

export default function AlaeshMyPostsPage() {
  const t = useTranslations('alaesh')
  const locale = useLocale()
  const [view, setView] = useState<RequestView>('open')
  const [market, setMarket] = useState<MarketFilter>('all')
  const [selected, setSelected] = useState<AlaeshRequestCardData | null>(null)
  const n = (value: number) => formatNumber(value, { locale })
  const results = myRequests.filter(
    (request) =>
      (view === 'open' ? request.state === 'open' : request.state !== 'open') &&
      (market === 'all' || request.market === market),
  )

  const mockAction = (action: string) => {
    toast.add({ title: t(`feedback.${action}`) })
  }

  return (
    <>
      <AlaeshHeader page="myPosts" />

      <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 shadow-[6px_6px_0] shadow-ink">
        <FilterRow
          label={t('myPosts.status')}
          options={['open', 'history']}
          value={view}
          getLabel={(option) => t(`myPosts.states.${option}`)}
          onChange={(option) => setView(option as RequestView)}
        />
        <FilterRow
          label={t('myPosts.market')}
          options={['all', 'namliya', 'khalis']}
          value={market}
          getLabel={(option) => t(`myPosts.markets.${option}`)}
          onChange={(option) => setMarket(option as MarketFilter)}
          divided
        />
      </section>

      <div className="mb-4.5 flex flex-wrap items-center gap-3 font-body text-base font-semibold text-soft">
        <Image src={TargetIcon} alt="" className="size-7.5" />
        <span>
          <strong className="font-display text-[22px] font-normal text-ink">
            {n(results.length)}
          </strong>{' '}
          {t(`myPosts.resultSummary.${view}`)}
          {market !== 'all' && ` — ${t(`myPosts.markets.${market}`)}`}
        </span>
      </div>

      {results.length ? (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {results.map((request) => (
            <AlaeshRequestCard
              key={`${request.id}-${request.state}`}
              request={request}
              mode="mine"
              onExpand={setSelected}
              onMockAction={mockAction}
            />
          ))}
        </div>
      ) : (
        <section className="rounded-panel border-[3px] border-dashed border-ink bg-surface px-6 py-11 text-center">
          <Image src={LanternIcon} alt="" className="mx-auto mb-3.5 h-20 w-auto" />
          <h2 className="font-display text-[26px]">{t('myPosts.emptyTitle')}</h2>
          <p className="mt-2 font-body text-base/[1.9] font-medium text-soft">
            {t('myPosts.emptyBody')}
          </p>
        </section>
      )}

      <AlaeshRequestDialog
        request={selected}
        mode="mine"
        onOpenChange={(open) => !open && setSelected(null)}
        onPrimaryAction={() => mockAction('replies')}
      />
    </>
  )
}

function FilterRow({
  label,
  options,
  value,
  getLabel,
  onChange,
  divided = false,
}: {
  label: string
  options: string[]
  value: string
  getLabel: (option: string) => string
  onChange: (option: string) => void
  divided?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3',
        divided && 'mt-3.5 border-t-[2.5px] border-dashed border-ink/25 pt-3.5',
      )}
    >
      <span className="w-19 shrink-0 font-display text-lg text-soft">{label}</span>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              'rounded-full border-[2.5px] border-ink bg-paper px-5 py-2.25 font-body text-[15px] font-extrabold text-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
              value === option && 'bg-ink text-surface hover:bg-ink',
            )}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>
    </div>
  )
}

'use client'

import { AlaeshHeader } from '@/components/AlaeshHeader'
import {
  AlaeshRequestCard,
  AlaeshRequestDialog,
  type AlaeshRequestCardData,
  type AlaeshMarket,
} from '@/components/AlaeshRequestCard'
import { toast } from '@/components/ui/toast'
import CirclesIcon from '@/icons/circles.svg'
import LanternIcon from '@/icons/lantern.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useDeferredValue, useState } from 'react'
import { browseRequests } from '../data'

const markets: AlaeshMarket[] = ['namliya', 'khalis', 'public']

export default function AlaeshBrowsePage() {
  const t = useTranslations('alaesh')
  const locale = useLocale()
  const [market, setMarket] = useState<AlaeshMarket>('namliya')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase(locale))
  const [selected, setSelected] = useState<AlaeshRequestCardData | null>(null)
  const n = (value: number) => formatNumber(value, { locale })
  const results = browseRequests.filter((request) => {
    if (request.market !== market) return false
    if (!deferredQuery) return true

    const index = [
      t(`requests.${request.id}.category`),
      t(`requests.${request.id}.title`),
      t(`requests.${request.id}.description`),
    ]
      .join(' ')
      .toLocaleLowerCase(locale)

    return index.includes(deferredQuery)
  })

  return (
    <>
      <AlaeshHeader page="browse" />

      <section className="mb-5.5 flex flex-wrap items-center gap-4.5 rounded-panel border-[3px] border-ink bg-surface px-6.5 py-5.5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-13.5 shrink-0 place-items-center rounded-field border-[2.5px] border-ink bg-gold p-2 shadow-[2px_2px_0] shadow-ink">
          <Image src={TargetIcon} alt="" className="size-full" />
        </span>
        <p className="min-w-60 flex-1 font-body text-[16.5px]/[1.95] font-medium text-soft">
          <strong className="block font-display text-[21px]/[1.4] font-normal text-ink">
            {t('browse.leadTitle')}
          </strong>
          {t('browse.leadBody')}
        </p>
      </section>

      <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 shadow-[6px_6px_0] shadow-ink">
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-19 shrink-0 font-display text-lg text-soft">{t('browse.market')}</span>
          <div className="flex flex-wrap gap-3">
            {markets.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={market === item}
                onClick={() => setMarket(item)}
                className={cn(
                  'rounded-full border-[2.5px] border-ink bg-paper px-5 py-2.25 font-body text-[15px] font-extrabold text-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
                  market === item && 'bg-ink text-surface hover:bg-ink',
                )}
              >
                {t(`browse.markets.${item}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5 flex">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('browse.searchPlaceholder')}
          aria-label={t('browse.searchLabel')}
          className="min-w-55 flex-1 rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-3.25 font-body text-base font-semibold text-ink shadow-[3px_3px_0] shadow-ink focus:outline-3 focus:outline-offset-2 focus:outline-blue"
        />
      </div>

      <div className="mb-4.5 flex flex-wrap items-center gap-3 font-body text-base font-semibold text-soft">
        <Image src={CirclesIcon} alt="" className="size-7.5" />
        <span>
          <strong className="font-display text-[22px] font-normal text-ink">
            {n(results.length)}
          </strong>{' '}
          {t('browse.resultSummary', { market: t(`browse.markets.${market}`) })}
        </span>
      </div>

      {results.length ? (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {results.map((request) => (
            <AlaeshRequestCard
              key={request.id}
              request={request}
              mode="browse"
              onExpand={setSelected}
            />
          ))}
        </div>
      ) : (
        <section className="rounded-panel border-[3px] border-dashed border-ink bg-surface px-6 py-11 text-center">
          <Image src={LanternIcon} alt="" className="mx-auto mb-3.5 h-20 w-auto" />
          <h2 className="font-display text-[26px]">{t('browse.emptyTitle')}</h2>
          <p className="mt-2 font-body text-base/[1.9] font-medium text-soft">
            {t('browse.emptyBody')}
          </p>
        </section>
      )}

      <AlaeshRequestDialog
        request={selected}
        mode="browse"
        onOpenChange={(open) => !open && setSelected(null)}
        onPrimaryAction={() => toast.add({ title: t('feedback.replySaved') })}
        onSecondaryAction={() => toast.add({ title: t('feedback.questionSent') })}
      />
    </>
  )
}

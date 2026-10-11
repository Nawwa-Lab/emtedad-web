'use client'

import { AlaeshRequestCard } from '@/components/AlaeshRequestCard'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { filterButtons, khalisRequests, namliyaRequests } from './data'

export default function AlaeshBrowsePage() {
  const t = useTranslations('alaesh.browse')
  const locale = useLocale()
  const [filterBy, setFilterBy] = useState<string[]>(['all'])
  const active = filterBy[0] ?? 'all'

  const showNamliya = active === 'all' || active === 'namliya'
  const showKhalis = active === 'all' || active === 'khalis'

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-1.5">
        <ToggleGroup
          value={filterBy}
          onValueChange={(value) => {
            if (value.length) setFilterBy(value)
          }}
          className="flex-wrap"
        >
          {filterButtons.map((button) => (
            <ToggleGroupItem value={button.id} key={button.id}>
              {t(button.labelKey, { count: formatNumber(button.count, { locale }) })}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {showNamliya && (
        <section className="mt-5.5">
          <div className="flex items-center gap-2.5 mb-2.5">
            <h2 className="font-display font-bold text-base text-green-deep">
              {t('sections.namliya')}
            </h2>
            <span className="font-cairo font-extrabold text-xs text-ink-soft tabular-nums">
              {t('sections.namliyaCount')}
            </span>
          </div>
          {namliyaRequests.map((request) => (
            <AlaeshRequestCard key={request.id} {...request} mode="browse" />
          ))}
        </section>
      )}

      {showKhalis && (
        <section className="mt-5.5">
          <div className="flex items-center gap-2.5 mb-2.5">
            <h2 className="font-display font-bold text-base text-green-deep">
              {t('sections.khalis')}
            </h2>
            <span className="font-cairo font-extrabold text-xs text-ink-soft tabular-nums">
              {t('sections.khalisCount')}
            </span>
          </div>
          {khalisRequests.map((request) => (
            <AlaeshRequestCard key={request.id} {...request} mode="browse" />
          ))}
        </section>
      )}
    </>
  )
}

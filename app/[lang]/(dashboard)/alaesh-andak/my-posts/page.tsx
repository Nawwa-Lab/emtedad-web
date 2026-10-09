'use client'

import { AlaeshRequestCard } from '@/components/AlaeshRequestCard'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { filterButtons, myPosts } from './data'
import { formatNumber } from '@/lib/utils'

export default function AlaeshMyPostsPage() {
  const t = useTranslations('alaesh.myPosts')
  const locale = useLocale()
  const [filterBy, setFilterBy] = useState<string[]>(['namliya'])
  const active = filterBy[0] ?? 'namliya'

  const filtered = myPosts.filter((post) => post.market === active)
  const published = filtered.filter((p) => p.section === 'published')
  const history = filtered.filter((p) => p.section === 'history')

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

      <section className="mt-5.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <h2 className="font-display font-bold text-base text-green-deep">
            {t('sections.published')}
          </h2>
          <span className="font-extrabold text-xs text-ink-soft tabular-nums">
            {formatNumber(published.length, { locale })}
          </span>
        </div>
        {published.map((post) => (
          <AlaeshRequestCard key={post.id} {...post} mode="mine" />
        ))}
      </section>

      <section className="mt-5.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <h2 className="font-display font-bold text-base text-green-deep">
            {t('sections.history')}
          </h2>
          <span className="font-extrabold text-xs text-ink-soft tabular-nums">
            {formatNumber(history.length, { locale })}
          </span>
        </div>
        {history.map((post) => (
          <AlaeshRequestCard key={post.id} {...post} mode="history" />
        ))}
      </section>
    </>
  )
}

'use client'

import { WishCard } from '@/components/WishCard'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { filterButtons, wishes } from './data'

const categoryButtons = filterButtons.filter((b) => b.id !== 'sort' && b.id !== 'latest')
const sortButtons = filterButtons.filter((b) => b.id === 'sort' || b.id === 'latest')

const chipClass = (id: string, active: readonly string[]) =>
  `inline-block font-cairo border rounded-[999px] font-bold text-[11.5px] sm:text-[12px] py-1.5 sm:py-1.75 px-3 sm:px-3.75 cursor-pointer hover:border-green-deep ${
    active.includes(id)
      ? 'bg-green text-ink border-green hover:border-green-deep'
      : 'bg-surface border-line text-ink-soft'
  }`

export default function ShbeikBrowsePage() {
  const t = useTranslations('shbeik.browse')
  const [filterBy, setFilterBy] = useState<string[]>([filterButtons[0].id])
  const [sortBy, setSortBy] = useState<string[]>([filterButtons[0].id])

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3.5 mb-4">
        <ToggleGroup
          value={filterBy}
          onValueChange={(value) => setFilterBy(value)}
          className="flex-wrap"
        >
          {sortButtons.map((button) => (
            <ToggleGroupItem
              value={button.id}
              key={button.id}
              className={chipClass(button.id, filterBy)}
            >
              {t(button.labelKey)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Separator orientation="vertical" className="gap-0  bg-line" aria-hidden />
        <ToggleGroup
          value={sortBy}
          onValueChange={(value) => setSortBy(value)}
          className="flex-wrap"
        >
          {categoryButtons.map((button) => (
            <ToggleGroupItem
              value={button.id}
              key={button.id}
              className={chipClass(button.id, sortBy)}
            >
              {t(button.labelKey)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="mt-4">
        {wishes.map((wish, index) => (
          <WishCard key={index} ns="shbeik" {...wish} />
        ))}
      </div>
      <p className="font-cairo font-semibold text-xs text-ink-soft bg-sage border-line-soft border rounded-2xl py-3.5 px-4.5 mt-3.5">
        {t('note')} <b>{t('noteBold')}</b>
      </p>
    </>
  )
}

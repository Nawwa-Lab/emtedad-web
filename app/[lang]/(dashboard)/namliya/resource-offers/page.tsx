'use client'
import { useState } from 'react'
import { ServiceCard } from '@/components/ServicesCard'
import { resourcesCard } from './data'
import { Input } from '@/components/ui/input'

export default function NamliyaServiceOffersPage() {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()

  const filteredCards = resourcesCard.filter((card) =>
    [card.title, card.desc, card.category, card.providerName].join(' ').toLowerCase().includes(q),
  )

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-4.5">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الخدمات البشريه…"
          className="flex-1 min-w-55 bg-surface rounded-full border-[2.5px] border-ink py-3.25 px-6.5 font-body font-semibold text-[16px] text-ink shadow-ink shadow-[3px_3px_0_var(--ink)]"
        />
      </div>

      {filteredCards.length === 0 ? (
        <p className="text-center font-body font-bold text-ink py-10">لا توجد نتائج</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {filteredCards.map((card) => (
            <ServiceCard
              key={card.categoryId}
              category={card.category}
              title={card.title}
              desc={card.desc}
              providerName={card.providerName}
              providerRate={card.providerRate}
              price={card.price}
              detail={card.detail}
              showStatusBadge={true}
              showSaveButton
              ctaHref="#"
            />
          ))}
        </div>
      )}
    </>
  )
}

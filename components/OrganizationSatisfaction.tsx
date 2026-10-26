'use client'

import { satisfactionSections } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { StatusBadge, getVariantFromLabel } from '@/components/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils/formatter'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export function OrganizationSatisfaction() {
  const [activeIndex, setActiveIndex] = useState(0)
  const locale = useLocale()
  const t = useTranslations('organizationProfile')
  const section = satisfactionSections[activeIndex]

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2.5" role="tablist" aria-label={t('ratingSections')}>
        {satisfactionSections.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className="rounded-full border-[2.5px] border-ink bg-surface px-6 py-3 font-display text-xl leading-none shadow-[4px_4px_0_#1A1714] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#1A1714] aria-selected:bg-red aria-selected:text-surface"
          >
            {item.title}
          </button>
        ))}
      </div>

      <section aria-labelledby={`satisfaction-${activeIndex}`}>
        <Card className="mb-6 px-7.5 py-7 shadow-[6px_6px_0_#1A1714]">
          <div className="mb-5 flex flex-wrap items-baseline gap-3">
            <CardHeader id={`satisfaction-${activeIndex}`} className="mb-0 text-3xl">
              {section.title}
            </CardHeader>
            <p className="font-body text-sm font-semibold text-soft">{section.subtitle}</p>
          </div>
          <div>
            {section.counts.map(([label, count]) => (
              <div
                key={label}
                className="flex items-center border-b-[2.5px] border-dashed border-ink/30 py-3.5 last:border-0"
              >
                <StatusBadge variant={getVariantFromLabel(label)} label={label} shape="pill" />
                <span className="mx-4 mb-2 min-w-8 flex-1 border-b-4 border-dotted border-ink/35" />
                <strong className="min-w-15 text-end font-display text-[42px] leading-none">
                  {formatNumber(count, { locale })}
                </strong>
              </div>
            ))}
          </div>
        </Card>

        <div className="mb-4 mt-8 flex items-baseline gap-3">
          <h2 className="font-display text-3xl">{t('reviews')}</h2>
          <span className="font-body text-sm font-semibold text-soft">
            {t('reviewsCount', {
              shown: formatNumber(section.reviews.length, { locale }),
              total: formatNumber(section.totalReviews, { locale }),
            })}
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {section.reviews.map((review) => (
            <Card key={`${review.name}-${review.context}`} className="p-6">
              <CardContent className="flex flex-wrap items-center gap-3 px-0">
                <Avatar className="size-11 bg-gold">
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <strong className="min-w-30 flex-1 font-display text-xl">{review.name}</strong>
                <StatusBadge
                  variant={getVariantFromLabel(review.rating)}
                  label={review.rating}
                  shape="pill"
                />
                <p className="w-full font-body text-[13.5px] font-semibold text-soft">
                  {review.context}
                </p>
              </CardContent>
              <CardDescription className="mb-0 mt-3 text-[16.5px] leading-8 text-ink">
                {review.text}
              </CardDescription>
              <p className="mt-3 border-t-[2.5px] border-dashed border-ink/30 pt-3 font-body text-sm font-semibold text-soft">
                {review.source}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

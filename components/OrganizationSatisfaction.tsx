'use client'

import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils/formatter'
import type { BadgeCounts } from '@/services/members/types'
import type { OrganizationSatisfactionDetails } from '@/services/organizations/types'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

type Section = {
  title: string
  subtitle: string
  counts: BadgeCounts
}

export function OrganizationSatisfaction({
  satisfaction,
}: {
  satisfaction: OrganizationSatisfactionDetails
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const locale = useLocale()
  const t = useTranslations('organizationProfile')
  const global = useTranslations('global')
  const reviews = satisfaction.reviews.items

  const sections: Section[] = [
    {
      title: t('satisfactionOverall'),
      subtitle: t('satisfactionOverallSubtitle', {
        count: formatNumber(satisfaction.all.evaluationCount, { locale }),
      }),
      counts: satisfaction.all.counts,
    },
    {
      title: t('humanServices'),
      subtitle: t('satisfactionHumanServicesSubtitle', {
        count: formatNumber(satisfaction.humanServices.evaluationCount, { locale }),
      }),
      counts: satisfaction.humanServices.counts,
    },
    {
      title: t('materialResources'),
      subtitle: t('satisfactionMaterialResourcesSubtitle', {
        count: formatNumber(satisfaction.materialResources.evaluationCount, { locale }),
      }),
      counts: satisfaction.materialResources.counts,
    },
    {
      title: t('satisfactionCommunity'),
      subtitle: t('satisfactionCommunitySubtitle', {
        count: formatNumber(satisfaction.community.evaluationCount, { locale }),
      }),
      counts: satisfaction.community.counts,
    },
  ]
  const section = sections[activeIndex]

  const formatReviewDate = (value: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(value))

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2.5" role="tablist" aria-label={t('ratingSections')}>
        {sections.map((item, index) => (
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
            {(['basic', 'pro', 'elite'] as const).map((badge) => (
              <div
                key={badge}
                className="flex items-center border-b-[2.5px] border-dashed border-ink/30 py-3.5 last:border-0"
              >
                <StatusBadge badge={badge} label={global(`badges.${badge}`)} shape="pill" />
                <span className="mx-4 mb-2 min-w-8 flex-1 border-b-4 border-dotted border-ink/35" />
                <strong className="min-w-15 text-end font-display text-[42px] leading-none">
                  {formatNumber(section.counts[badge], { locale })}
                </strong>
              </div>
            ))}
          </div>
        </Card>

        <div className="mb-4 mt-8 flex items-baseline gap-3">
          <h2 className="font-display text-3xl">{t('reviews')}</h2>
          <span className="font-body text-sm font-semibold text-soft">
            {t('reviewsCount', {
              shown: formatNumber(reviews.length, { locale }),
              total: formatNumber(satisfaction.reviews.total, { locale }),
            })}
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.reviewId} className="p-6">
              <CardContent className="flex flex-wrap items-center gap-3 px-0">
                <Avatar className="size-11 bg-gold">
                  <AvatarImage
                    src={review.profilePhotoUrl ?? review.logoUrl ?? ''}
                    alt={review.evaluatorName}
                  />
                  <AvatarFallback>{review.evaluatorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <strong className="min-w-30 flex-1 font-display text-xl">
                  {review.evaluatorName}
                </strong>
                <StatusBadge
                  badge={review.badge}
                  label={global(`badges.${review.badge}`)}
                  shape="pill"
                />
                <p className="w-full font-body text-[13.5px] font-semibold text-soft">
                  {formatReviewDate(review.createdAt)}
                </p>
              </CardContent>
              <CardDescription className="mb-0 mt-3 text-[16.5px] leading-8 text-ink">
                {review.content}
              </CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

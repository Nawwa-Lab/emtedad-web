'use client'

import { ProviderRequestCard } from '@/components/ProviderRequestCard'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { use } from 'react'
import { findOffer } from './data'

const factKeys = ['value', 'hours', 'hourlyRate', 'availability', 'delivery', 'category'] as const

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations('khalliKhalesOffer')
  const global = useTranslations('global')
  const offer = findOffer(id)

  const factValues: Record<(typeof factKeys)[number], string> = {
    value: `${offer.price} ${global('currency')}`,
    hours: offer.facts.hours,
    hourlyRate: offer.facts.hourlyRate,
    availability: offer.facts.availability,
    delivery: offer.facts.delivery,
    category: offer.category,
  }

  return (
    <>
      <Link
        href="/khalli-khales/public-to-organizations"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('back')}</span>
      </Link>

      <div className="grid grid-cols-1 items-start gap-6 min-[981px]:grid-cols-[1.6fr_1fr]">
        <Card className="px-5 py-7 shadow-[6px_6px_0] sm:px-7.5">
          <div className="mb-3.5 flex flex-wrap items-center gap-3.25">
            <span className="font-body text-[18px] font-normal text-ink">{offer.category}</span>
            <Badge
              color="surface"
              effect="flat"
              className="border-dashed px-3.5 py-1.25 font-body text-[13.5px] font-extrabold text-soft"
            >
              {t('sourceTag')}
            </Badge>
          </div>

          <h1 className="font-display text-[clamp(30px,4.2vw,44px)]/[1.2] font-normal">
            {offer.title}
          </h1>
          <p className="mt-3 font-body text-[17.5px] font-medium leading-loose text-soft">
            {offer.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-3">
            {factKeys.map((key) => (
              <Card
                key={key}
                effect="flat"
                className={cn(
                  'rounded-card border-[2.5px] border-ink px-4.5 py-4',
                  key === 'value' ? 'bg-gold' : 'bg-paper',
                )}
              >
                <span className="block font-body text-[13px] font-bold text-soft">
                  {t(`facts.${key}`)}
                </span>
                <span className="mt-1.25 block font-display text-[22px] leading-[1.3]">
                  {factValues[key]}
                </span>
              </Card>
            ))}
          </div>

          <div className="mt-6.5">
            <h2 className="mb-2.5 font-display text-[24px] text-red">{t('deliverablesTitle')}</h2>
            <ul>
              {offer.deliverables.map((item) => (
                <li
                  key={item}
                  className="relative mb-1.75 list-none ps-6 font-body text-[16.5px] font-medium leading-loose text-soft before:absolute before:inset-s-0.5 before:top-3.25 before:size-2.5 before:rounded-full before:border-[2.5px] before:border-ink before:bg-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.75 font-body text-[15px] font-semibold leading-[1.9] text-soft">
            <b className="mb-1 block font-display text-[17px] font-normal text-ink">
              {t('formulaTitle')}
            </b>
            {offer.formula}
          </div>
        </Card>

        <aside>
          <Card className="mb-5.5 bg-red px-6.5 py-6 text-center text-surface shadow-[6px_6px_0]">
            <span className="block font-body text-[15px] font-bold text-surface/88">
              {t('priceLabel')}
            </span>
            <span className="mt-1 block font-display text-[58px] leading-[1.05] font-features-['tnum']">
              {offer.price}
              <small className="ms-1.5 text-[20px] text-gold">{global('currency')}</small>
            </span>
            <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-surface/85">
              {t('vatNote')}
            </span>
          </Card>

          <ProviderRequestCard
            className="px-6 py-5.5 shadow-[6px_6px_0] sm:px-7.5 sm:py-7"
            provider={{
              name: offer.provider.name,
              initial: offer.provider.name.charAt(0),
              profileHref: offer.provider.profileHref,
              profileLabel: t('profileLink'),
            }}
            satisfaction={{
              title: t('ratingTitle'),
              subtitle: t('ratingSubtitle', { count: offer.ratingCount }),
              badge: global('badges.amer'),
              dialog: null,
              badgeClassName: 'text-ink!',
            }}
            note={{
              title: t('sourceTitle'),
              subtitle: t('sourceSubtitle'),
            }}
            request={{
              label: t('request'),
              href: offer.requestHref,
            }}
            save={{
              label: t('save'),
              savedLabel: t('saved'),
              showIcon: false,
              className: 'min-w-30 px-5 text-[16px]',
            }}
            actionsClassName="mt-4.5 border-t-0 pt-0"
          />
        </aside>
      </div>
    </>
  )
}

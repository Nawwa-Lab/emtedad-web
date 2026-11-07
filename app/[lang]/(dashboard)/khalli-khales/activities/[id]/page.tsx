'use client'

import { ProviderRequestCard } from '@/components/ProviderRequestCard'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from '@/i18n/navigation'
import PlantIcon from '@/icons/plant.svg'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { use } from 'react'
import { findActivity } from './data'

const factLabels = ['price', 'seats', 'date', 'time', 'place', 'deadline'] as const

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations('khalliKhalesActivity')
  const global = useTranslations('global')
  const activity = findActivity(id)
  const providerName = global(`organizations.${activity.provider.nameKey}`)

  const factValues: Record<(typeof factLabels)[number], string> = {
    price: `${activity.price} ${global('currency')}`,
    seats: activity.facts.seats,
    date: activity.facts.date,
    time: activity.facts.time,
    place: activity.facts.place,
    deadline: activity.facts.deadline,
  }

  return (
    <>
      <Link
        href="/khalli-khales/gift-shop"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('back')}</span>
      </Link>

      <div className="grid grid-cols-1 items-start gap-6 min-[981px]:grid-cols-[1.6fr_1fr]">
        <Card className="p-5 shadow-[6px_6px_0] sm:px-7.5 sm:py-7">
          <div className="mb-3.5 flex flex-wrap items-center gap-3.25">
            <span className="font-body text-[18px] font-normal text-ink">{activity.category}</span>
            <Badge
              color="surface"
              effect="flat"
              className="border-dashed px-3.5 py-1.25 text-[13.5px] font-extrabold text-soft"
            >
              {t('sourceTag')}
            </Badge>
            <Badge
              color="red"
              effect="flat"
              className="px-3.5 py-1.25 text-[13.5px] font-extrabold"
            >
              {t('seatsLeft', { count: activity.seatsLeft })}
            </Badge>
          </div>

          <h1 className="font-display text-[clamp(30px,4.2vw,44px)]/[1.2] font-normal">
            {activity.title}
          </h1>
          <p className="mt-3 font-body text-[17.5px] font-medium leading-loose text-soft">
            {activity.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-3">
            {factLabels.map((key) => {
              const variant = key === 'price' ? 'hi' : key === 'deadline' ? 'warn' : 'default'
              return (
                <Card
                  key={key}
                  effect="flat"
                  className={cn(
                    'rounded-card border-[2.5px] border-ink px-4.5 py-4',
                    variant === 'hi' && 'bg-gold',
                    variant === 'warn' && 'bg-red text-surface',
                    variant === 'default' && 'bg-paper',
                  )}
                >
                  <span
                    className={cn(
                      'block font-body text-[13px] font-bold',
                      variant === 'warn' ? 'text-surface/85' : 'text-soft',
                    )}
                  >
                    {t(`facts.${key}`)}
                  </span>
                  <span className="mt-1.25 block font-display text-[22px] leading-[1.3]">
                    {factValues[key]}
                  </span>
                </Card>
              )
            })}
          </div>

          <div className="mt-6.5">
            <h2 className="mb-2.5 font-display text-[24px] text-red">{t('program')}</h2>
            <ul>
              {activity.program.map((item) => (
                <li
                  key={item}
                  className="relative mb-1.75 list-none ps-6 font-body text-[16.5px] font-medium leading-loose text-soft before:absolute before:inset-s-0.5 before:top-3.25 before:size-2.5 before:rounded-full before:border-[2.5px] before:border-ink before:bg-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6.5">
            <h2 className="mb-2.5 font-display text-[24px] text-red">{t('audience')}</h2>
            <ul>
              {activity.audience.map((item) => (
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
            {activity.formula}
          </div>
        </Card>

        <aside>
          <Card className="mb-5.5 bg-red px-6.5 py-6 text-center text-surface shadow-[6px_6px_0]">
            <span className="block font-body text-[15px] font-bold text-surface/85">
              {t('priceLabel')}
            </span>
            <span className="mt-1 block font-display text-[58px] leading-[1.05] font-features-['tnum']">
              {activity.price}
              <small className="ms-1.5 text-[20px] text-gold">{global('currency')}</small>
            </span>
            <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-surface/85">
              {t('vatNote')}
            </span>
          </Card>

          <ProviderRequestCard
            className="mb-5.5 px-7.5 pt-7 pb-7 shadow-[6px_6px_0]"
            provider={{
              name: providerName,
              initial: Array.from(providerName)[0],
              profileHref: activity.provider.profileHref,
              profileLabel: t('profileLink'),
            }}
            satisfaction={{
              title: t('ratingTitle'),
              subtitle: t('ratingSubtitle', { count: activity.ratingCount }),
              badge: global('badges.amer'),
              href: `${activity.provider.profileHref}/satisfaction`,
              badgeClassName: 'text-ink!',
            }}
            request={{
              label: t('register'),
              href: `/khalli-khales/activities/${activity.id}/registration-confirmation`,
            }}
            save={{
              label: t('save'),
              savedLabel: t('saved'),
              showIcon: false,
              className: 'min-w-30 sm:min-w-30 px-5 text-[16px] sm:text-[16px]',
            }}
            actionsClassName="mt-0.5 border-t-0 pt-0"
          />

          <Card className="px-6 py-5.5 shadow-[6px_6px_0]">
            <h3 className="flex items-center gap-2.75 font-display text-[21px]">
              <span className="block size-7.5 shrink-0">
                <Image src={PlantIcon} alt="" className="size-full" />
              </span>
              {t('allowanceTitle')}
            </h3>
            <Progress
              value={activity.allowance.usedPercent}
              className="mt-3.5 mb-2.5 h-4.5 **:data-[slot=progress-track]:bg-paper"
            />
            <p className="font-body text-[14.5px] font-semibold leading-[1.9] text-soft">
              {t.rich('allowanceBody', {
                remaining: activity.allowance.remaining,
                total: activity.allowance.total,
                price: activity.allowance.price,
                over: activity.allowance.over,
                currency: global('currency'),
                b: (chunks) => <b className="font-bold text-ink">{chunks}</b>,
              })}
            </p>
          </Card>
        </aside>
      </div>
    </>
  )
}

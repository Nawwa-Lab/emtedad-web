'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from '@/i18n/navigation'
import DnaIcon from '@/icons/dna.svg'
import HandIcon from '@/icons/hand.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useState } from 'react'
import { findActivity } from '../data'
import { findRegistration } from './data'

const ghostStyles =
  'inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-surface px-6 py-3.5 font-body text-[16px] font-bold text-ink hover:bg-gold'
const primaryLinkStyles =
  'inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-7 py-3.5 font-body text-[17px] font-extrabold text-surface shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow] duration-100 hover:translate-[1px_1px] hover:shadow-[2px_2px_0]'
const boldChunks = (chunks: React.ReactNode) => <b className="font-extrabold text-ink">{chunks}</b>

export default function RegistrationConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const t = useTranslations('khalliKhalesRegistration')
  const global = useTranslations('global')
  const locale = useLocale()
  const activity = findActivity(id)
  const registration = findRegistration(activity.id)
  const providerName = global(`organizations.${activity.provider.nameKey}`)
  const currency = global('currency')
  const [confirmed, setConfirmed] = useState(false)

  const n = (value: number) => formatNumber(value, { locale })

  const confirmRegistration = () => {
    setConfirmed(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-190">
      <Link
        href={`/khalli-khales/activities/${activity.id}`}
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('back')}</span>
      </Link>

      {confirmed ? (
        <div className="text-center">
          <Card className="px-7.5 py-9 shadow-[8px_8px_0]">
            <span className="mx-auto mb-4.5 block w-24">
              <Image src={HandIcon} alt="" className="h-auto w-full" />
            </span>
            <h1 className="font-display text-[34px] leading-[1.3] font-normal">{t('doneTitle')}</h1>
            <p className="mt-2.5 font-body text-[16.5px] font-medium leading-[1.95] text-soft">
              {registration.kind === 'advance'
                ? t.rich('doneBody', {
                    title: activity.title,
                    schedule: `${activity.facts.date}، ${activity.facts.time}`,
                    place: activity.facts.place,
                    price: n(registration.price),
                    currency,
                    b: boldChunks,
                  })
                : t.rich('doneBodyWithin', {
                    title: activity.title,
                    schedule: `${activity.facts.date}، ${activity.facts.time}`,
                    place: activity.facts.place,
                    price: n(registration.price),
                    currency,
                    remaining: n(registration.remainingAfter),
                    b: boldChunks,
                  })}
            </p>
            <p className="mt-2.5 font-body text-[16.5px] font-medium leading-[1.95] text-soft">
              {t('doneReminder', { provider: providerName })}
            </p>
            <div className="mt-4.5 flex flex-wrap justify-center gap-3">
              <Link href="/messages/1" className={primaryLinkStyles}>
                {t('openConversation')}
              </Link>
              <Link href="/khalli-khales/gift-shop" className={ghostStyles}>
                {t('backToGiftShop')}
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] font-normal">
              {t('title')}
            </h1>
          </div>

          <Card className="mb-5.5 flex flex-wrap items-start gap-4 px-6 py-5.5 shadow-[6px_6px_0]">
            <span className="grid size-14.5 shrink-0 place-items-center rounded-[15px] border-[2.5px] border-ink bg-gold font-display text-[25px] shadow-[3px_3px_0] shadow-ink">
              {Array.from(providerName)[0]}
            </span>
            <span className="min-w-50 flex-1">
              <b className="block font-display text-[25px] leading-tight font-normal">
                {activity.title}
              </b>
              <span className="mt-1 block font-body text-[14.5px] font-semibold text-soft">
                <Link
                  href={activity.provider.profileHref}
                  className="font-bold text-blue hover:text-red"
                >
                  {providerName}
                </Link>
                {' · '}
                {activity.facts.date}
                {' · '}
                {activity.facts.time}
              </span>
            </span>
            <span className="font-display text-[34px] font-features-['tnum']">
              {n(registration.price)}
              <small className="ms-1.25 text-[15px] text-red">{currency}</small>
            </span>
          </Card>

          {registration.kind === 'advance' ? (
            <>
              <Card className="mb-5.5 flex items-start gap-4 border-3 border-ink bg-gold px-6 py-5.5 shadow-[6px_6px_0]">
                <span className="block h-12.5 w-11.5 shrink-0">
                  <Image src={PlantIcon} alt="" className="h-full w-auto" />
                </span>
                <span>
                  <b className="block font-display text-[23px] leading-[1.3] font-normal">
                    {t('alertTitle')}
                  </b>
                  <p className="mt-1.5 font-body text-[15.5px] font-semibold leading-[1.9]">
                    {t('alertBody', {
                      price: n(registration.price),
                      currency,
                      total: n(registration.monthlyAllowance),
                      remaining: n(registration.remainingThisMonth),
                      over: n(registration.over),
                    })}
                  </p>
                </span>
              </Card>

              <Card className="mb-5.5 px-7 py-6.5 shadow-[6px_6px_0]">
                <h2 className="mb-1.5 flex items-center gap-3 font-display text-[25px] font-normal">
                  <span className="block size-8 shrink-0">
                    <Image src={DnaIcon} alt="" className="size-full" />
                  </span>
                  {t('breakdownTitle')}
                </h2>
                <p className="mb-4.5 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
                  {t('breakdownSubtitle', {
                    price: n(registration.price),
                    currency,
                  })}
                </p>

                {registration.months.map((month) => (
                  <div
                    key={month.id}
                    className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-ink/25 py-3.5 last:border-b-0"
                  >
                    <span className="w-30 shrink-0 font-display text-[20px]">
                      {t(`months.${month.id}`)}
                    </span>
                    <Progress
                      value={month.percent}
                      className="mt-0 min-w-30 flex-1 **:data-[slot=progress-track]:bg-paper"
                      indicatorClassName={cn(month.tone === 'used' && 'bg-red')}
                    />
                    <span className="w-30 shrink-0 text-left font-body text-[15px] font-bold text-soft">
                      <b className="font-display text-[20px] font-normal text-ink">
                        {n(month.used)}
                      </b>{' '}
                      {month.id === 'september'
                        ? t('monthValueRemaining', { total: n(month.total) })
                        : t('monthValue', { total: n(month.total) })}
                    </span>
                  </div>
                ))}

                <div className="mt-4.5 flex flex-wrap items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4">
                  <span className="min-w-37.5 flex-1 font-display text-[20px]">
                    {t('totalLabel')}
                  </span>
                  <span className="font-display text-[32px] font-features-['tnum']">
                    {n(registration.price)}
                    <small className="ms-1.25 text-[15px] text-red">{currency}</small>
                  </span>
                </div>

                <p className="mt-3.5 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
                  {t.rich('breakdownFooter', {
                    remaining: n(registration.novemberRemaining),
                    currency,
                    b: (chunks) => <b className="font-bold text-ink">{chunks}</b>,
                  })}
                </p>
              </Card>
            </>
          ) : (
            <>
              <Card className="mb-5.5 flex items-start gap-4 px-6 py-5.5 shadow-[6px_6px_0]">
                <span className="block h-12.5 w-11.5 shrink-0">
                  <Image src={HandIcon} alt="" className="h-full w-auto" />
                </span>
                <span>
                  <b className="block font-display text-[23px] leading-[1.3] font-normal">
                    {t('okTitle')}
                  </b>
                  <p className="mt-1.5 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
                    {t.rich('okBody', {
                      price: n(registration.price),
                      currency,
                      total: n(registration.monthlyAllowance),
                      remaining: n(registration.remainingThisMonth),
                      b: (chunks) => <b className="font-extrabold text-ink">{chunks}</b>,
                    })}
                  </p>
                </span>
              </Card>

              <Card className="mb-5.5 px-7 py-6.5 shadow-[6px_6px_0]">
                <h2 className="mb-1.5 flex items-center gap-3 font-display text-[25px] font-normal">
                  <span className="block size-8 shrink-0">
                    <Image src={PlantIcon} alt="" className="size-full" />
                  </span>
                  {t('septemberTitle')}
                </h2>
                <p className="mb-4.5 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
                  {t('septemberSubtitle')}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-ink/25 py-3.75">
                  <span className="min-w-42.5 flex-1 font-body text-[16px] font-bold text-soft">
                    {t('ledgerCurrent')}
                  </span>
                  <span className="font-display text-[26px] font-features-['tnum']">
                    {n(registration.remainingThisMonth)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-ink/25 py-3.75">
                  <span className="min-w-42.5 flex-1 font-body text-[16px] font-bold text-soft">
                    {t('ledgerPrice')}
                  </span>
                  <span className="font-display text-[26px] font-features-['tnum'] text-red">
                    −{n(registration.price)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4">
                  <span className="min-w-42.5 flex-1 font-display text-[20px] text-ink">
                    {t('ledgerTotal')}
                  </span>
                  <span className="font-display text-[32px] font-features-['tnum']">
                    {n(registration.remainingAfter)}
                  </span>
                </div>

                <Progress
                  value={registration.meterPercent}
                  className="mt-4.5 h-4.5 **:data-[slot=progress-track]:bg-paper"
                />
                <p className="mt-0 font-body text-[15.5px] font-medium leading-[1.9] text-soft">
                  {t('ledgerMeter', {
                    remaining: n(registration.remainingAfter),
                    total: n(registration.monthlyAllowance),
                  })}
                </p>
              </Card>
            </>
          )}

          <div className="mt-2 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={confirmRegistration}
              className="h-auto px-7 py-3.5 text-[17px]"
            >
              {t('confirm')}
            </Button>
            <Link href={`/khalli-khales/activities/${activity.id}`} className={ghostStyles}>
              {t('cancel')}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

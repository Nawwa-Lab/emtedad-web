'use client'

import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import KeyIcon from '@/icons/key.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { FahsHeader, FahsNav } from '../components'
import { appealListDetails, appeals } from '../data'

export default function AppealsPage() {
  const t = useTranslations('fahsMahs')
  const global = useTranslations('global')
  const locale = useLocale()
  const titles = t.raw('cases') as Record<string, string>

  const number = (value: number) => formatNumber(value, { locale })
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(`${value}T12:00:00`))
  const deadline = (key: 'decisionDaysLeft' | 'reviewDaysLeft', days: number) =>
    t.rich(`lists.${key}`, {
      days: number(days),
      count: (chunks: ReactNode) => (
        <strong className="font-display text-[19px] font-normal tabular-nums">{chunks}</strong>
      ),
    })

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader title={t('nav.appeals')} subtitle={t('lists.appealsSubtitle')} />
      <FahsNav />

      <div className="mb-6 flex items-start gap-[13px] rounded-panel border-[3px] border-ink bg-blue px-[22px] py-[19px] text-surface shadow-[6px_6px_0] shadow-ink">
        <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
          <Image src={BalanceIcon} alt="" className="max-h-full w-auto max-w-full" />
        </span>
        <p className="font-body text-[15px]/[1.9] font-semibold">
          {t.rich('lists.appealsPrivacy', {
            strong: (chunks) => (
              <strong className="font-display text-[17.5px] font-normal">{chunks}</strong>
            ),
          })}
        </p>
      </div>

      {appeals.map((item) => {
        const details = appealListDetails[item.id as keyof typeof appealListDetails]
        const isPending = item.status === 'pendingDecision'
        const isReview = item.status === 'review'

        return (
          <Link
            key={item.id}
            href={`/fahs-mahs/arbitrations/${item.id}`}
            className="mb-[18px] block rounded-panel border-[3px] border-ink bg-surface px-6 py-[22px] text-ink shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[9px_10px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue max-sm:px-[18px]"
          >
            <div className="flex flex-wrap items-start gap-3">
              <h2 className="min-w-45 flex-1 font-display text-[23px]/[1.3]">
                {titles[item.caseKey]}
              </h2>
              <span
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold ${isPending ? 'bg-red text-surface' : isReview ? 'bg-gold' : 'bg-[#9CC49B]'}`}
              >
                {t(`status.${item.status}`)}
              </span>
              <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold">
                {t('lists.arbitratorSeat', {
                  seat: number(details.seat),
                  total: number(item.panelSize),
                })}
              </span>
            </div>

            <div className="mt-[11px] flex flex-wrap items-center gap-[9px]">
              {(['hiddenOne', 'hiddenTwo'] as const).map((party) => (
                <span
                  key={party}
                  className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-dashed border-ink bg-paper px-[14px] py-1 font-body text-[13px] font-bold text-soft"
                >
                  <i className="grid size-[22px] place-items-center rounded-full bg-ink font-display text-xs/[1] not-italic text-surface">
                    ؟
                  </i>
                  {t(`invitations.${party}`)} {t('invitations.hidden')}
                </span>
              ))}
              <span className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border-[2.5px] border-ink bg-blue px-[15px] py-1 font-body text-[13px] font-extrabold text-surface">
                {t.rich('lists.appealPanel', {
                  round: number(details.round),
                  total: number(item.panelSize),
                  number: (chunks: ReactNode) => (
                    <strong className="font-display text-lg font-normal tabular-nums">
                      {chunks}
                    </strong>
                  ),
                })}
              </span>
            </div>

            <div className="mt-[11px] flex flex-wrap items-center gap-2.5 font-body text-sm font-semibold text-soft">
              <span>
                {isPending
                  ? t('lists.acceptedOn', { date: date(item.date) })
                  : isReview
                    ? t('lists.generalComplaint')
                    : t('lists.matchedSchelling')}
              </span>
              <span aria-hidden="true" className="h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20" />
              <span>
                {isPending || isReview
                  ? t('lists.lockedDeposit', {
                      amount: number(10),
                      currency: global('currency'),
                    })
                  : t('lists.issuedOn', { date: date(item.date) })}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-[15px]">
              {isPending || isReview ? (
                <span
                  className={`inline-flex items-baseline gap-2 rounded-full border-[2.5px] border-ink px-4 py-[5px] font-body text-[13px] font-extrabold ${isPending ? 'bg-red text-surface' : 'bg-surface'}`}
                >
                  {deadline(isPending ? 'decisionDaysLeft' : 'reviewDaysLeft', item.remainingDays)}
                </span>
              ) : (
                <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-[#9CC49B] px-[13px] py-1 font-body text-[12.5px] font-extrabold">
                  {t('lists.firstPanelReversed')}
                </span>
              )}

              {isPending || isReview ? (
                <span className="inline-flex items-center gap-[9px] font-body text-[14.5px] font-extrabold text-red">
                  <span className="grid size-[30px] place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl/[1] text-ink rtl:rotate-180">
                    ›
                  </span>
                  {t(isPending ? 'lists.openFile' : 'lists.reviewPenalty')}
                </span>
              ) : (
                <span className="ms-auto inline-flex items-baseline gap-[7px] rounded-full border-[2.5px] border-ink bg-gold px-[15px] py-1 font-body text-[13px] font-extrabold">
                  {t('lists.rewardReceived')}
                  <strong className="font-display text-lg font-normal tabular-nums">
                    +{number(10)}
                  </strong>
                  {global('currency')}
                </span>
              )}
            </div>
          </Link>
        )
      })}

      <div className="mt-4 flex items-start gap-[13px] rounded-card border-[2.5px] border-dashed border-ink bg-paper px-[18px] py-[15px]">
        <Image src={KeyIcon} alt="" className="h-[30px] w-7 shrink-0" />
        <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
          {t.rich('lists.appealsNote', {
            amount: number(20),
            currency: global('currency'),
            strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
          })}
        </p>
      </div>
    </div>
  )
}

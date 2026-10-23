'use client'

import { Link } from '@/i18n/navigation'
import KeyIcon from '@/icons/key.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { FahsHeader, FahsNav } from '../components'
import { arbitrationListDetails, arbitrations } from '../data'

export default function MyArbitrationsPage() {
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
  const deadline = (key: 'decisionDaysLeft' | 'reviewDaysLeft' | 'appealDaysLeft', days: number) =>
    t.rich(`lists.${key}`, {
      days: number(days),
      count: (chunks: ReactNode) => (
        <strong className="font-display text-[19px] font-normal tabular-nums">{chunks}</strong>
      ),
    })

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader title={t('nav.myArbitrations')} subtitle={t('lists.myArbitrationsSubtitle')} />
      <FahsNav />

      <div className="mb-6 flex items-start gap-[15px] rounded-panel border-[3px] border-ink bg-red px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
        <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
          <Image src={KeyIcon} alt="" className="max-h-full w-auto max-w-full" />
        </span>
        <div>
          <strong className="block font-display text-[21px]/[1.3] font-normal">
            {t('lists.myArbitrationsAlert')}
          </strong>
          <p className="mt-1.5 font-body text-[14.5px]/[1.85] font-semibold">
            {t('lists.myArbitrationsAlertBody', {
              days: number(6),
              deposit: number(10),
              penalty: number(10),
              currency: global('currency'),
            })}
          </p>
        </div>
      </div>

      {arbitrations.map((item) => {
        const details = arbitrationListDetails[item.id as keyof typeof arbitrationListDetails]
        const isPending = item.status === 'pendingDecision'
        const isReview = item.status === 'review'
        const isIssued = item.status === 'issued'

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
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold ${isPending ? 'bg-red text-surface' : isReview ? 'bg-gold' : isIssued ? 'bg-[#9CC49B]' : 'bg-paper text-soft'}`}
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

            {details.showParties && (
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
              </div>
            )}

            <div className="mt-[11px] flex flex-wrap items-center gap-2.5 font-body text-sm font-semibold text-soft">
              <span>
                {isPending
                  ? t('lists.firstRound')
                  : isReview
                    ? t('lists.generalPanel', { total: number(item.panelSize) })
                    : isIssued
                      ? t('lists.matchedSchelling')
                      : t('lists.differedMajority')}
              </span>
              <span aria-hidden="true" className="h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20" />
              <span>
                {isPending
                  ? t('lists.acceptedOn', { date: date(item.date) })
                  : isReview
                    ? t('lists.schellingOn', { date: date(item.date) })
                    : isIssued
                      ? t('lists.issuedOn', { date: date(item.date) })
                      : t('lists.closedOn', { date: date(item.date) })}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-[15px]">
              {isPending || isReview || isIssued ? (
                <span
                  className={`inline-flex items-baseline gap-2 rounded-full border-[2.5px] border-ink px-4 py-[5px] font-body text-[13px] font-extrabold ${isPending ? 'bg-red text-surface' : 'bg-surface'}`}
                >
                  {deadline(
                    isPending ? 'decisionDaysLeft' : isReview ? 'reviewDaysLeft' : 'appealDaysLeft',
                    item.remainingDays,
                  )}
                </span>
              ) : (
                <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold text-soft">
                  {t('lists.securityReturned')}
                </span>
              )}

              {isIssued ? (
                <span className="ms-auto inline-flex items-baseline gap-[7px] rounded-full border-[2.5px] border-ink bg-gold px-[15px] py-1 font-body text-[13px] font-extrabold">
                  {t('lists.rewardPending')}
                  <strong className="font-display text-lg font-normal tabular-nums">
                    +{number(10)}
                  </strong>
                  {global('currency')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-[9px] font-body text-[14.5px] font-extrabold text-red">
                  <span className="grid size-[30px] place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl/[1] text-ink rtl:rotate-180">
                    ›
                  </span>
                  {t(
                    isPending
                      ? 'lists.issueDecision'
                      : isReview
                        ? 'lists.reviewPenalty'
                        : 'lists.viewDecision',
                  )}
                </span>
              )}
            </div>
          </Link>
        )
      })}

      <div className="mt-4 flex items-start gap-[13px] rounded-card border-[2.5px] border-dashed border-ink bg-paper px-[18px] py-[15px]">
        <Image src={KeyIcon} alt="" className="h-[30px] w-7 shrink-0" />
        <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
          {t.rich('lists.myArbitrationsNote', {
            link: (chunks) => (
              <Link
                href="/fahs-mahs"
                className="border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </div>
  )
}

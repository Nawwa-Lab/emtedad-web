'use client'

import { Link } from '@/i18n/navigation'
import KeyIcon from '@/icons/key.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { FahsHeader, FahsNav } from '../components'
import { participation, participationListDetails } from '../data'

type Filter = 'all' | 'mediation' | 'arbitration'

export default function ParticipationLogPage() {
  const t = useTranslations('fahsMahs')
  const locale = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const titles = t.raw('cases') as Record<string, string>
  const filtered = participation.filter(
    (item) =>
      filter === 'all' ||
      (filter === 'mediation' ? item.kind === 'mediation' : item.kind !== 'mediation'),
  )

  const number = (value: number) => formatNumber(value, { locale })

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader back title={t('nav.log')} subtitle={t('lists.logSubtitle')} />
      <FahsNav />

      <div
        className="mt-[22px] mb-6 flex flex-wrap gap-2.5 pb-1"
        role="tablist"
        aria-label={t('nav.log')}
      >
        {(['all', 'mediation', 'arbitration'] as const).map((key) => (
          <button
            type="button"
            role="tab"
            key={key}
            onClick={() => setFilter(key)}
            aria-selected={filter === key}
            className={`rounded-full border-[2.5px] border-ink px-[22px] py-2.5 font-body text-[15px] font-extrabold shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue ${filter === key ? 'bg-ink text-surface' : 'bg-surface text-ink'}`}
          >
            {t(`lists.${key}`)}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div>
          {filtered.map((item) => {
            const details =
              participationListDetails[item.id as keyof typeof participationListDetails]
            const itemDate = new Date(`${item.date}T12:00:00`)
            const month = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
              month: 'long',
            }).format(itemDate)
            const isMediation = item.kind === 'mediation'
            const hasReward = 'reward' in item && item.reward

            return (
              <div
                key={item.id}
                className="mb-[15px] flex items-start gap-4 rounded-panel border-[3px] border-ink bg-surface px-[22px] py-[19px] shadow-[5px_5px_0] shadow-ink max-[560px]:flex-wrap"
              >
                <span className="grid w-[52px] shrink-0 place-items-center self-stretch border-e-[3px] border-dashed border-ink/30 pe-[14px] max-[560px]:flex max-[560px]:w-auto max-[560px]:gap-[7px] max-[560px]:self-auto max-[560px]:border-e-0 max-[560px]:pe-0">
                  <strong className="block font-display text-[22px]/[1] font-normal tabular-nums">
                    {number(itemDate.getDate())}
                  </strong>
                  <span className="mt-[3px] block text-center font-body text-[11.5px] font-bold text-soft max-[560px]:mt-0">
                    {month}
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl/[1.35]">
                    {titles[item.caseKey]}
                    {'appeal' in details && details.appeal
                      ? ` — ${t('lists.logAppealSuffix')}`
                      : ''}
                  </h2>
                  <div className="mt-[9px] flex flex-wrap items-center gap-[9px]">
                    <span
                      className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-3 py-[3px] font-body text-[11.5px] font-extrabold ${isMediation ? 'bg-gold' : 'bg-blue text-surface'}`}
                    >
                      {t(isMediation ? 'lists.mediatorSeat' : 'lists.arbitratorSeat', {
                        seat: number(details.seat),
                        total: number(details.total),
                      })}
                    </span>
                    <span
                      className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-3 py-[3px] font-body text-[11.5px] font-extrabold ${details.tone === 'ok' ? 'bg-[#9CC49B]' : details.tone === 'no' ? 'bg-tint' : 'bg-paper text-soft'}`}
                    >
                      {t(`lists.${details.outcomeKey}`)}
                    </span>
                  </div>
                </div>

                <span
                  className={`shrink-0 self-center whitespace-nowrap font-display tabular-nums ${hasReward ? 'text-[21px]' : 'text-base text-soft'} max-[560px]:self-start`}
                >
                  {hasReward ? `+${number(10)}` : '—'}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-panel border-[3px] border-dashed border-ink bg-paper px-[26px] py-10 text-center font-body text-[16.5px]/[1.95] font-semibold text-soft">
          {t('lists.noLogResults')}
        </div>
      )}

      <div className="mt-4 flex items-start gap-[13px] rounded-card border-[2.5px] border-dashed border-ink bg-paper px-[18px] py-[15px]">
        <Image src={KeyIcon} alt="" className="h-[30px] w-7 shrink-0" />
        <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
          {t.rich('lists.logNote', {
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

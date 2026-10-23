'use client'

import { Link } from '@/i18n/navigation'
import LanternIcon from '@/icons/lantern.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { FahsHeader, FahsNav } from '../components'
import { closedMediationListDetails, closedMediations } from '../data'

type Filter = 'all' | 'successful' | 'failed'

export default function ClosedMediationsPage() {
  const t = useTranslations('fahsMahs')
  const global = useTranslations('global')
  const locale = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const titles = t.raw('cases') as Record<string, string>
  const filtered =
    filter === 'all' ? closedMediations : closedMediations.filter((item) => item.status === filter)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(`${date}T12:00:00`))

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader
        title={t('nav.closedMediations')}
        subtitle={t('lists.closedMediationsSubtitle')}
      />
      <FahsNav />

      <div className="mb-6 flex items-start gap-[15px] rounded-panel border-[3px] border-ink bg-red px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
        <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
          <Image src={LanternIcon} alt="" className="max-h-full w-auto max-w-full" />
        </span>
        <div>
          <strong className="block font-display text-[21px]/[1.3] font-normal">
            {t('lists.closedMediationsAlert')}
          </strong>
          <p className="mt-1.5 font-body text-[14.5px]/[1.85] font-semibold">
            {t('lists.closedMediationsAlertBody')}
          </p>
        </div>
      </div>

      <div
        className="mt-[22px] mb-6 flex flex-wrap gap-2.5 pb-1"
        role="tablist"
        aria-label={t('nav.closedMediations')}
      >
        {(['all', 'successful', 'failed'] as const).map((key) => (
          <button
            type="button"
            role="tab"
            key={key}
            onClick={() => setFilter(key)}
            aria-selected={filter === key}
            className={`rounded-full border-[2.5px] border-ink px-[22px] py-2.5 font-body text-[15px] font-extrabold shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue ${filter === key ? 'bg-ink text-surface' : 'bg-surface text-ink'}`}
          >
            {t(
              `lists.${key === 'all' ? 'all' : key === 'successful' ? 'filterSuccessful' : 'filterFailed'}`,
            )}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        filtered.map((item) => {
          const details =
            closedMediationListDetails[item.id as keyof typeof closedMediationListDetails]

          return (
            <Link
              key={item.id}
              href={`/fahs-mahs/mediations/${item.id}`}
              className="mb-[18px] block rounded-panel border-[3px] border-ink bg-surface px-6 py-[22px] text-ink shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[9px_10px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue max-sm:px-[18px]"
            >
              <div className="flex flex-wrap items-start gap-3">
                <h2 className="min-w-45 flex-1 font-display text-[23px]/[1.3]">
                  {titles[item.caseKey]}
                </h2>
                {item.reportDue && (
                  <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-red px-[13px] py-1 font-body text-[12.5px] font-extrabold text-surface">
                    {t('lists.reportStillMissing')}
                  </span>
                )}
                <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold">
                  {t('lists.mediatorSeat', {
                    seat: formatNumber(details.seat, { locale }),
                    total: formatNumber(details.seatsTotal, { locale }),
                  })}
                </span>
              </div>

              <div className="mt-[11px] flex flex-wrap items-center gap-2.5 font-body text-sm font-semibold text-soft">
                <span>
                  {t(item.status === 'successful' ? 'lists.succeededOn' : 'lists.failedOn', {
                    date: formatDate(item.date),
                  })}
                </span>
                <span
                  aria-hidden="true"
                  className="h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20"
                />
                <span>{t(`lists.${details.detailKey}`)}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-[15px]">
                <span
                  className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold ${details.footerTone === 'successful' ? 'bg-[#9CC49B]' : 'bg-tint'}`}
                >
                  {t(`lists.${details.footerKey}`)}
                </span>

                {item.reportDue ? (
                  <span className="inline-flex items-center gap-[9px] font-body text-[14.5px] font-extrabold text-red">
                    <span className="grid size-[30px] place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl/[1] text-ink rtl:rotate-180">
                      ›
                    </span>
                    {t('lists.writeReport')}
                  </span>
                ) : item.reward ? (
                  <span className="ms-auto inline-flex items-baseline gap-[7px] rounded-full border-[2.5px] border-ink bg-gold px-[15px] py-1 font-body text-[13px] font-extrabold">
                    {t('lists.rewardLabel')}
                    <strong className="font-display text-lg font-normal tabular-nums">
                      +{formatNumber(10, { locale })}
                    </strong>
                    {global('currency')}
                  </span>
                ) : (
                  <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold text-soft">
                    {t('lists.reportReceived')}
                  </span>
                )}
              </div>
            </Link>
          )
        })
      ) : (
        <div className="rounded-panel border-[3px] border-dashed border-ink bg-paper px-[26px] py-10 text-center font-body text-[16.5px]/[1.95] font-semibold text-soft">
          {t('lists.noClosedResults')}
        </div>
      )}
    </div>
  )
}

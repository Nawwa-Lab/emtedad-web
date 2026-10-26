'use client'

import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { FahsHeader, FahsNav, FahsNote } from '../components'
import { mediationListDetails, mediations } from '../data'

export default function MyMediationsPage() {
  const t = useTranslations('fahsMahs')
  const locale = useLocale()
  const titles = t.raw('cases') as Record<string, string>

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader title={t('nav.myMediations')} subtitle={t('lists.myMediationsSubtitle')} />
      <FahsNav />

      {mediations.map((item) => {
        const details = mediationListDetails[item.id as keyof typeof mediationListDetails]
        const acceptedDate = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
          day: 'numeric',
          month: 'long',
        }).format(new Date(`${item.date}T12:00:00`))

        return (
          <article
            key={item.id}
            className="relative mb-[18px] rounded-panel border-[3px] border-ink bg-surface px-6 py-[22px] shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[9px_10px_0] max-sm:px-[18px]"
          >
            <Link
              href={`/fahs-mahs/mediations/${item.id}`}
              aria-label={`${t('lists.openWorkspace')}: ${titles[item.caseKey]}`}
              className="absolute inset-0 rounded-panel focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            />

            <div className="pointer-events-none relative flex flex-wrap items-start gap-3">
              <h2 className="min-w-45 flex-1 font-display text-[23px]/[1.3]">
                {titles[item.caseKey]}
              </h2>
              <span
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold ${item.status === 'needsAction' ? 'bg-red text-surface' : 'bg-gold text-ink'}`}
              >
                {t(`status.${item.status}`)}
              </span>
              <span className="whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold">
                {t(`lists.${details.seatKey}`)}
              </span>
            </div>

            <div className="pointer-events-none relative mt-[11px] flex flex-wrap items-center gap-[10px] font-body text-sm font-semibold text-soft">
              <span>
                {t('lists.between')}{' '}
                {details.parties.map((party, index) => (
                  <span key={party.nameKey}>
                    {index > 0 && <> {t('lists.and')} </>}
                    <Link
                      href={party.href}
                      className="pointer-events-auto relative z-10 border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
                    >
                      {t(`lists.${party.nameKey}`)}
                    </Link>
                  </span>
                ))}
              </span>
              <span aria-hidden="true" className="h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20" />
              <span>{t('lists.accepted', { date: acceptedDate })}</span>
            </div>

            <div className="pointer-events-none relative mt-4 flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-[15px]">
              <span
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold ${details.progressTone === 'wait' ? 'bg-gold' : 'bg-surface'}`}
              >
                {t(`lists.${details.progressKey}`)}
              </span>
              <span className="inline-flex items-center gap-[9px] font-body text-[14.5px] font-extrabold text-red">
                <span className="grid size-[30px] place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl/[1] text-ink rtl:rotate-180">
                  ›
                </span>
                {t('lists.openWorkspace')}
              </span>
            </div>
          </article>
        )
      })}

      <FahsNote>
        <span className="text-soft [&_strong]:text-ink">
          {t.rich('lists.myMediationsNote', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </span>
      </FahsNote>
    </div>
  )
}

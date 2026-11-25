'use client'

import DnaIcon from '@/icons/dna.svg'
import CirclesIcon from '@/icons/circles.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { BackLink, PageHead } from '../components'
import { participantsRoster, participantsStats } from '../data'

const tagOk =
  'inline-block shrink-0 rounded-full border-[2.5px] border-ink bg-gold px-3.5 py-1.25 font-body text-[13.5px] font-extrabold text-ink'
const tagOff =
  'inline-block shrink-0 rounded-full border-[2.5px] border-dashed border-ink bg-surface px-3.5 py-1.25 font-body text-[13.5px] font-extrabold text-soft'

const attendanceInput =
  "relative m-0 size-6.5 shrink-0 cursor-pointer appearance-none rounded-[8px] border-[2.5px] border-ink bg-surface text-[13.333px] leading-[normal] font-normal shadow-[2px_2px_0] shadow-ink transition-[background-color] duration-[160ms] checked:bg-gold checked:after:absolute checked:after:inset-x-[7px] checked:after:top-[5px] checked:after:bottom-[8px] checked:after:border-b-[3px] checked:after:border-l-[3px] checked:after:border-solid checked:after:border-ink checked:after:content-[''] checked:after:-rotate-45 focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3"

export default function ParticipantsAttendancePage() {
  const t = useTranslations('khalliKhalesParticipants')
  const locale = useLocale()
  const fmt = (value: number | string) => formatNumber(value, { locale })

  return (
    <div className="font-body text-ink">
      <BackLink href="/khalli-khales/my-offers" label={t('back')} />
      <PageHead title={t('title')} spaced={false} />

      <div className="mb-5.5 flex flex-wrap items-center gap-4.5 rounded-panel border-3 border-ink bg-surface px-6 py-5.5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-15.5 shrink-0 place-items-center rounded-[16px] border-[2.5px] border-ink bg-gold font-display text-[27px] shadow-[3px_3px_0] shadow-ink">
          م
        </span>
        <span className="min-w-[220px] flex-1">
          <b className="block font-display text-[27px] leading-[1.25]">{t('activityName')}</b>
          <span className="mt-1 block font-semibold text-[14.5px] text-soft">
            {t('activityWhen')}
          </span>
        </span>
        <span className={tagOk}>{t('activityTag')}</span>
      </div>

      <div className="mb-5.5 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
        <span className="rounded-panel border-3 border-ink bg-gold px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
          <span className="block text-[13.5px] font-bold text-soft">{t('statRegistered')}</span>
          <span className="mt-[5px] block font-display text-[40px] leading-[1.05] font-features-['tnum']">
            {fmt(participantsStats.registered)}
            <small className="ms-1.25 text-[17px] text-soft">
              {t('statOf', { count: fmt(participantsStats.total) })}
            </small>
          </span>
        </span>
        <span className="rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
          <span className="block text-[13.5px] font-bold text-soft">{t('statLeft')}</span>
          <span className="mt-[5px] block font-display text-[40px] leading-[1.05] font-features-['tnum']">
            {fmt(participantsStats.seatsLeft)}
            <small className="ms-1.25 text-[17px] text-soft">{t('statSeats')}</small>
          </span>
        </span>
        <span className="rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
          <span className="block text-[13.5px] font-bold text-soft">{t('statWaitlist')}</span>
          <span className="mt-[5px] block font-display text-[40px] leading-[1.05] font-features-['tnum']">
            {fmt(participantsStats.waitlist)}
          </span>
        </span>
        <span className="rounded-panel border-3 border-ink bg-red px-5.5 py-5 text-surface shadow-[5px_5px_0] shadow-ink">
          <span className="block text-[13.5px] font-bold text-surface/85">{t('statDeadline')}</span>
          <span className="mt-[5px] block font-display text-[26px] leading-[1.05] font-features-['tnum']">
            {t('statDeadlineDate')}
          </span>
        </span>
      </div>

      <section className="rounded-panel border-3 border-ink bg-surface px-7 py-6.5 shadow-[6px_6px_0] shadow-ink">
        <h2 className="mb-1.5 flex items-center gap-3.25 font-display text-[27px] font-normal">
          <span className="block size-8.5 shrink-0">
            <Image src={CirclesIcon} alt="" className="h-full w-full" />
          </span>
          {t('rosterTitle')}
        </h2>
        <p className="mb-4.5 text-[15.5px] font-medium leading-[1.9] text-soft">{t('rosterSub')}</p>

        {participantsRoster.map((row) => (
          <div
            key={row.id}
            className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-[rgba(26,23,20,0.26)] py-3.75 last:border-b-0"
          >
            <span className="flex min-w-[210px] flex-1 items-center gap-3">
              <span className="grid size-11.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-display text-[20px] shadow-[2px_2px_0] shadow-ink">
                {row.initial}
              </span>
              <span className="min-w-0">
                <b className="block font-display text-[20px] leading-[1.2]">{row.name}</b>
                <span className="block font-semibold text-[13.5px] text-soft">
                  {t(row.whenKey)}
                </span>
              </span>
            </span>
            <span className={row.secondTagKey ? tagOff : tagOk}>{t(row.tagKey)}</span>
            {row.secondTagKey && <span className={tagOff}>{t(row.secondTagKey)}</span>}
            {row.attended !== undefined && (
              <label className="inline-flex shrink-0 cursor-pointer items-center gap-2.75 text-[14.5px] font-extrabold">
                <input type="checkbox" defaultChecked={row.attended} className={attendanceInput} />
                <span>{t('attended')}</span>
              </label>
            )}
          </div>
        ))}
      </section>

      <div className="mt-5.5 flex flex-wrap items-center gap-4 rounded-panel border-3 border-ink bg-gold px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <span className="flex h-[46px] w-[42px] shrink-0 items-center justify-center">
          <Image src={DnaIcon} alt="" className="h-auto max-h-full w-auto max-w-full" />
        </span>
        <p className="min-w-[210px] flex-1 text-base font-semibold leading-[1.9]">
          <b className="font-display text-[18px]">{t('closeTitle')}</b> {t('closeBody')}
        </p>
        <button
          type="button"
          className="inline-block cursor-pointer rounded-full border-[2.5px] border-ink bg-red px-6.5 py-2.75 font-body text-base leading-[normal] font-extrabold text-surface shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow] duration-100 hover:translate-[1px_1px] hover:shadow-[2px_2px_0] active:translate-[4px_4px] active:shadow-none focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3 max-[520px]:px-5 max-[520px]:py-2.5 max-[520px]:text-[15px]"
        >
          {t('closeRegistration')}
        </button>
      </div>
    </div>
  )
}

'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { GroupHeading } from '../components'
import { candidates, membershipVote, submitMembershipVote, type MembershipVote } from './data'

export default function HakimaMembershipPage() {
  const t = useTranslations('hakima.membership')
  const global = useTranslations('global')
  const locale = useLocale()
  const [vote, setVote] = useState<MembershipVote | null>(null)
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  const chooseVote = (choice: MembershipVote) => {
    setVote(choice)
    void submitMembershipVote(choice)
  }

  return (
    <>
      <Link
        href="/hakima/voting"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink hover:text-red"
      >
        <span
          className={cn(
            buttonVariants({ variant: 'outline', size: 'icon', shape: 'round' }),
            'grid bg-surface',
          )}
        >
          <span className="rtl:rotate-180">›</span>
        </span>
        {t('back')}
      </Link>

      <header className="mb-6.5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.25] text-ink max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </header>

      <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-blue px-7 py-6.5 text-surface shadow-[7px_7px_0] shadow-ink max-sm:px-5">
        <h2 className="font-display text-[28px]/[1.25]">{t('vote.title')}</h2>
        <p className="mt-2 font-body text-[15.5px]/[1.9] font-semibold text-surface/90">
          {t.rich('vote.description', {
            yes: (chunks) => <strong>{chunks}</strong>,
            no: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <div className="mt-4 rounded-card border-[2.5px] border-ink bg-surface px-4.5 py-4 text-ink">
          <p className="font-display text-xl/[1.3]">
            {t.rich('vote.required', {
              amount: n(membershipVote.threshold),
              strong: (chunks) => <strong className="text-2xl font-normal">{chunks}</strong>,
            })}
            <span className="mt-1 block font-body text-[13px] font-semibold text-soft">
              {t('vote.threshold', {
                percent: n(membershipVote.thresholdPercent),
                total: n(membershipVote.networkTokens),
              })}
            </span>
          </p>
          <p className="mt-2.5 font-body text-[14.5px] font-bold">
            {t.rich('vote.qualified', {
              amount: n(membershipVote.support),
              strong: (chunks) => (
                <strong className="font-display text-lg font-normal">{chunks}</strong>
              ),
            })}
          </p>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          {(['yes', 'no'] as const).map((choice) => (
            <Button
              key={choice}
              type="button"
              effect="flat"
              aria-pressed={vote === choice}
              onClick={() => chooseVote(choice)}
              className={cn(
                'h-auto min-w-27.5 flex-1 rounded-full border-[2.5px] border-ink bg-surface px-4.5 py-2.75 font-display text-[19px]/[1] font-normal text-ink shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]',
                vote === choice && (choice === 'yes' ? 'bg-gold' : 'bg-red text-surface'),
              )}
            >
              {t(`vote.${choice}`)}
            </Button>
          ))}
          <p className="mt-2.5 w-full font-body text-[13.5px]/[1.8] font-bold text-surface/90">
            {vote
              ? t.rich('vote.selected', {
                  choice: t(`vote.${vote}`),
                  strong: (chunks) => <strong className="text-surface">{chunks}</strong>,
                })
              : t.rich('vote.pending', {
                  amount: n(membershipVote.organizationTokens),
                  strong: (chunks) => <strong className="text-surface">{chunks}</strong>,
                })}
          </p>
        </div>
      </section>

      <GroupHeading count={candidates.length}>{t('candidates')}</GroupHeading>
      {candidates.map((candidate) => (
        <article
          key={candidate.id}
          className="mb-4.5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6.5 shadow-[6px_6px_0] shadow-ink max-sm:px-5"
        >
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid size-16.5 shrink-0 place-items-center rounded-[17px] border-[2.5px] border-ink bg-gold font-display text-[28px] shadow-[3px_3px_0] shadow-ink">
              {candidate.initial}
            </span>
            <span className="min-w-52.5 flex-1">
              <strong className="block font-display text-[27px]/[1.25] font-normal">
                {t(`items.${candidate.id}.name`)}
              </strong>
              <span className="mt-1 block font-body text-[14.5px] font-semibold text-soft">
                {t(`items.${candidate.id}.meta`)}
              </span>
            </span>
            {candidate.warning && (
              <span className="ms-auto rounded-full border-[2.5px] border-ink bg-red px-3.5 py-1 font-body text-[12.5px] font-bold text-surface">
                {t('removalPending')}
              </span>
            )}
          </div>
          <p className="mt-3.5 font-body text-[16.5px]/[1.95] font-medium text-soft">
            {t(`items.${candidate.id}.about`)}
          </p>
          <div className="mt-4 rounded-card border-[2.5px] border-ink bg-gold px-4.75 py-4">
            <strong className="mb-1.5 block font-display text-lg font-normal">
              {t('whyTitle', { team: global('team') })}
            </strong>
            <p className="font-body text-[15.5px]/[1.9] font-medium">
              {t(`items.${candidate.id}.why`)}
            </p>
          </div>
          <div className="mt-4 grid gap-3 min-[621px]:grid-cols-2">
            {candidate.files.map((file) => (
              <a
                key={file.id}
                href="#"
                onClick={(event) => event.preventDefault()}
                className="flex min-w-0 items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-3.75 py-3 text-ink hover:bg-gold"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border-[2.5px] border-ink bg-red font-body text-[11.5px] font-extrabold text-surface">
                  PDF
                </span>
                <span className="min-w-0">
                  <strong className="block wrap-anywhere font-body text-[14.5px] font-extrabold">
                    {t(`items.${candidate.id}.files.${file.id}`)}
                  </strong>
                  <span className="block font-body text-[12.5px] font-semibold text-soft">
                    {t(`fileUnits.${file.unit}`, { size: n(file.size) })}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5 border-t-[2.5px] border-dashed border-ink/25 pt-4">
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="rounded-full border-[2.5px] border-ink bg-surface px-4.25 py-2.25 font-body text-sm font-bold text-ink hover:bg-gold"
            >
              {t('viewProfile')}
            </a>
            <Link
              href="/hakima/proposals/create"
              className="rounded-full border-[2.5px] border-red bg-surface px-4.25 py-2.25 font-body text-sm font-bold text-red hover:border-ink hover:bg-red hover:text-surface"
            >
              {t('remove')}
            </Link>
          </div>
        </article>
      ))}

      <section className="mt-5.5 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-surface px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-11.5 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-gold p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={CirclesIcon} alt="" className="size-full" />
        </span>
        <p className="min-w-57.5 flex-1 font-body text-[15px]/[1.85] font-semibold text-soft">
          <strong className="mb-1 block font-display text-[19px] font-normal text-ink">
            {t('add.title')}
          </strong>
          {t('add.text', { amount: n(2310), percent: n(5) })}
        </p>
        <Link
          href="/hakima/proposals/create"
          className={buttonVariants({ variant: 'primary', shape: 'round' })}
        >
          {t('add.action')}
        </Link>
      </section>

      <section className="mt-5.5 flex items-start gap-3.5 rounded-panel border-[2.5px] border-dashed border-ink bg-paper px-5.5 py-4.5">
        <Image src={HandIcon} alt="" className="h-9 w-8.5 shrink-0" />
        <p className="font-body text-[15px]/[1.9] font-semibold text-soft">
          {t.rich('etabat', {
            strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
            link: (chunks) => (
              <Link href="/etabat" className="font-bold text-ink underline underline-offset-2">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>
    </>
  )
}

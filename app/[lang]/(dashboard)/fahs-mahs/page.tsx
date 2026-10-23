'use client'

import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import DNAIcon from '@/icons/dna.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import StarTwoIcon from '@/icons/star-2.svg'
import StarIcon from '@/icons/star.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { FahsHeader, FahsNav } from './components'
import { earnings } from './data'
import { useInvitations } from './invitations/data'

export default function FahsMahsPage() {
  const t = useTranslations('fahsMahs')
  const global = useTranslations('global')
  const locale = useLocale()
  const breakdown = t.raw('home.earningsBreakdown') as string[]
  const { remaining } = useInvitations()
  const invitationSummary =
    remaining.length === 2
      ? t('home.invitationSummaryTwo')
      : remaining[0] === 'mediation'
        ? t('home.invitationSummaryMediation')
        : remaining[0] === 'arbitration'
          ? t('home.invitationSummaryArbitration')
          : null

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader title={t('name')} subtitle={t('home.subtitle')} />
      <FahsNav />

      <section className="mb-[26px] rounded-panel border-[3px] border-ink bg-gold px-[30px] py-[26px] shadow-[8px_8px_0] shadow-ink max-[700px]:px-5 max-[700px]:py-[22px]">
        <div className="flex flex-wrap items-start gap-4">
          <Image src={StarIcon} alt="" className="h-[42px] w-10 shrink-0" />
          <div className="min-w-45 flex-1">
            <h2 className="font-display text-[23px]/[1.25]">{t('home.earningsTitle')}</h2>
            <p className="mt-1 font-body text-sm/[1.7] font-semibold text-ink/70">
              {t('home.earningsIntro')}
            </p>
          </div>
          <strong className="whitespace-nowrap font-display text-[clamp(52px,8vw,74px)]/[.9] font-normal tabular-nums">
            {formatNumber(earnings.total, { locale })}
            <small className="ms-[9px] font-body text-[19px] font-extrabold">
              {global('currency')}
            </small>
          </strong>
        </div>

        <div className="mt-[22px] grid gap-[13px] min-[701px]:grid-cols-3">
          {breakdown.map((label, index) => (
            <div
              key={label}
              className="min-w-0 rounded-card border-[2.5px] border-ink bg-surface px-4 py-[14px]"
            >
              <strong className="block font-display text-[27px]/[1.1] font-normal tabular-nums">
                {formatNumber(earnings.breakdown[index], { locale })}
              </strong>
              <span className="mt-[5px] block font-body text-[12.5px]/[1.6] font-bold text-soft">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-card bg-ink px-[18px] py-[15px] text-surface">
          <Image
            src={KeyIcon}
            alt=""
            className="h-7 w-[26px] shrink-0 [filter:brightness(0)_saturate(100%)_invert(83%)_sepia(55%)_saturate(1511%)_hue-rotate(345deg)_brightness(97%)_contrast(91%)]"
          />
          <p className="font-body text-sm/[1.85] font-semibold">
            {t.rich('home.earningsNote', {
              currency: global('currency'),
              strong: (chunks) => (
                <strong className="font-display text-[17px] font-normal text-gold">{chunks}</strong>
              ),
            })}
          </p>
        </div>
      </section>

      <section className="mb-[26px] rounded-panel border-[3px] border-ink bg-surface px-[30px] py-[26px] shadow-[6px_6px_0] shadow-ink max-sm:px-[18px] max-sm:py-[22px]">
        <h2 className="flex items-center gap-[13px] font-display text-[25px]/[1.25]">
          <Image src={StarTwoIcon} alt="" className="size-[34px] shrink-0" />
          {t('home.aboutTitle')}
        </h2>
        <p className="mt-[10px] font-body text-base/[1.95] font-medium text-soft">
          {t('home.aboutIntro')}
        </p>

        <div className="mt-[22px] grid gap-4 min-[701px]:grid-cols-2">
          <div className="min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-5 py-[18px]">
            <div className="flex flex-wrap items-center gap-[11px]">
              <Image src={DNAIcon} alt="" className="h-[30px] w-7 shrink-0" />
              <h3 className="font-display text-[21px]/[1.3]">{t('home.mediatorTitle')}</h3>
              <span className="rounded-full border-2 border-ink bg-surface px-[11px] py-0.5 font-body text-[11.5px] font-extrabold">
                {t('home.mediatorCount')}
              </span>
            </div>
            <p className="mt-[10px] font-body text-[14.5px]/[1.85] font-semibold text-soft">
              {t('home.mediatorText')}
            </p>
          </div>
          <div className="min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-5 py-[18px]">
            <div className="flex flex-wrap items-center gap-[11px]">
              <Image src={BalanceIcon} alt="" className="h-[30px] w-7 shrink-0" />
              <h3 className="font-display text-[21px]/[1.3]">{t('home.arbitratorTitle')}</h3>
              <span className="rounded-full border-2 border-ink bg-surface px-[11px] py-0.5 font-body text-[11.5px] font-extrabold">
                {t('home.arbitratorCount')}
              </span>
            </div>
            <p className="mt-[10px] font-body text-[14.5px]/[1.85] font-semibold text-soft">
              {t('home.arbitratorText', { currency: global('currency') })}
            </p>
          </div>
        </div>

        <div className="mt-[22px] flex items-start gap-[13px] rounded-card bg-blue px-[19px] py-4 text-surface">
          <Image src={HandIcon} alt="" className="h-[30px] w-7 shrink-0" />
          <p className="font-body text-[14.5px]/[1.9] font-semibold">
            {t.rich('home.neutrality', {
              strong: (chunks) => (
                <strong className="font-display text-[17px] font-normal">{chunks}</strong>
              ),
              link: (chunks) => (
                <Link href="/etabat" className="border-b border-gold text-gold">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        <div className="mt-[22px] flex flex-wrap items-center gap-4 border-t-[3px] border-dashed border-ink pt-5">
          <div className="min-w-45 flex-1">
            <h3 className="font-display text-[21px]/[1.3]">
              {remaining.length
                ? t('home.openInvitations', { count: remaining.length })
                : t('home.noInvitations')}
            </h3>
            {invitationSummary && (
              <p className="mt-1 font-body text-sm font-semibold text-soft">{invitationSummary}</p>
            )}
          </div>
          <Link
            href="/fahs-mahs/invitations"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-5 py-2 font-body text-[15px] font-extrabold text-surface shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]"
          >
            {t('home.viewInvitations')}
          </Link>
        </div>
      </section>
    </div>
  )
}

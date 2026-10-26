'use client'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import StarIcon from '@/icons/star.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import {
  governanceCycles,
  governanceProposals,
  governanceStats,
  membershipFacts,
  membershipOrganizations,
  participationFacts,
  type GovernanceLogTab,
} from './data'

const statIcons = {
  circles: CirclesIcon,
  wave: WaveIcon,
  star: StarIcon,
  balance: BalanceIcon,
} as const

export default function HakimaGovernanceLogPage() {
  const t = useTranslations('hakima.log')
  const global = useTranslations('global')
  const locale = useLocale()
  const [cycle, setCycle] = useState(3)
  const [tab, setTab] = useState<GovernanceLogTab>('proposals')
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  return (
    <div className="mx-auto max-w-245">
      <Link
        href="/hakima/browse"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink hover:text-red"
      >
        <span className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'bg-surface')}>
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

      <section className="mb-6 flex items-start gap-4 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <Image src={BalanceIcon} alt="" className="mt-0.5 h-9 w-8.5 shrink-0" />
        <p className="font-body text-[15.5px]/[1.9] font-semibold text-surface">
          {t.rich('intro', {
            strong: (chunks) => (
              <strong className="font-display text-lg font-normal">{chunks}</strong>
            ),
          })}
        </p>
      </section>

      <div
        className="mb-1.5 flex gap-3 overflow-x-auto px-0.5 pt-1 pb-3.5 scrollbar-none"
        role="tablist"
        aria-label={t('cycles.label')}
      >
        {governanceCycles.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={cycle === item.id}
            onClick={() => setCycle(item.id)}
            className={cn(
              'min-w-37.5 shrink-0 rounded-card border-[3px] border-ink bg-surface px-5 py-3.5 text-start font-body shadow-[4px_4px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0]',
              cycle === item.id && 'bg-ink text-surface',
            )}
          >
            <strong className="block font-display text-[23px]/[1.2] font-normal">
              {t('cycles.number', { number: n(item.id) })}
            </strong>
            <span
              className={cn(
                'mt-0.5 block text-[12.5px] font-semibold text-soft',
                item.live && 'text-red',
                cycle === item.id && 'text-surface/80',
                cycle === item.id && item.live && 'text-gold',
              )}
            >
              {t(`cycles.${item.id}`)}
            </span>
          </button>
        ))}
      </div>

      <section className="mb-2.5 grid gap-4 min-[461px]:grid-cols-2 min-[901px]:grid-cols-4">
        {governanceStats.map((stat) => (
          <article
            key={stat.id}
            className={cn(
              'flex min-w-0 flex-col rounded-panel border-[3px] border-ink bg-surface px-5.5 pt-5 pb-4.5 shadow-[5px_5px_0] shadow-ink',
              'highlighted' in stat && stat.highlighted && 'bg-gold',
            )}
          >
            <Image src={statIcons[stat.icon]} alt="" className="mb-3 h-8.5 w-8 opacity-55" />
            <strong className="font-display text-[46px]/[0.95] font-normal">
              {n(stat.value)}
              {'total' in stat && stat.total && (
                <small className="ms-1.25 text-xl text-red">
                  {t('stats.of', { total: n(stat.total) })}
                </small>
              )}
              {'suffix' in stat && stat.suffix === 'percent' && (
                <small className="ms-1.25 text-xl text-red">٪</small>
              )}
            </strong>
            <span className="mt-2 block font-body text-sm font-extrabold">
              {t(`stats.${stat.id}.label`)}
            </span>
            <span className="mt-auto border-t-[2.5px] border-dashed border-ink/30 pt-2.25 font-body text-[12.5px]/[1.65] font-semibold text-soft">
              {t(`stats.${stat.id}.note`, {
                voted: n(36036),
                total: n(46200),
              })}
              {'progress' in stat && stat.progress && (
                <span className="mt-2.75 block h-2.25 overflow-hidden rounded-full border-[2.5px] border-ink bg-paper">
                  <i className="block h-full bg-blue" style={{ width: `${stat.progress}%` }} />
                </span>
              )}
            </span>
          </article>
        ))}
      </section>

      <div
        className="my-5.5 flex flex-wrap gap-2.5 pb-1"
        role="tablist"
        aria-label={t('tabs.label')}
      >
        {(['proposals', 'membership', 'participation'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            className={cn(
              'rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-2.5 font-body text-[15px] font-extrabold text-ink shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]',
              tab === item && 'bg-ink text-surface',
            )}
          >
            {t(`tabs.${item}`)}
          </button>
        ))}
      </div>

      {tab === 'proposals' && (
        <div>
          {governanceProposals.map((proposal) => {
            const yesWidth = (proposal.yes / 46200) * 100
            const noWidth = (proposal.no / 46200) * 100
            return (
              <Link
                key={proposal.id}
                href="/hakima/proposals/small-business-cap"
                className="mb-4 block rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 text-ink shadow-[5px_5px_0] shadow-ink hover:-translate-x-0.5 hover:-translate-y-0.75 hover:shadow-[8px_9px_0]"
              >
                <div className="flex flex-wrap items-start gap-3">
                  <h3 className="min-w-47.5 flex-1 font-display text-[23px]/[1.3]">
                    {t(`proposals.${proposal.id}.title`)}
                  </h3>
                  <span
                    className={cn(
                      'rounded-full border-[2.5px] border-ink px-3.25 py-1 font-body text-[12.5px] font-bold',
                      proposal.category === 'protocol'
                        ? 'bg-blue text-surface'
                        : 'bg-tint text-ink',
                    )}
                  >
                    {t(`categories.${proposal.category}`)}
                  </span>
                  <span
                    className={cn(
                      'rounded-full border-[2.5px] border-ink px-3.75 py-0.75 font-display text-base',
                      proposal.result === 'approved'
                        ? 'bg-[#9cc49b]'
                        : proposal.result === 'rejected'
                          ? 'bg-red text-surface'
                          : 'bg-paper text-soft',
                    )}
                  >
                    {t(`results.${proposal.result}`)}
                  </span>
                </div>
                <div className="mt-3.75">
                  <span className="relative flex h-6.5 overflow-hidden rounded-full border-[2.5px] border-ink bg-paper">
                    <i className="h-full bg-blue" style={{ width: `${yesWidth}%` }} />
                    <i className="h-full bg-tint" style={{ width: `${noWidth}%` }} />
                    <u
                      className="absolute -inset-y-1.5 block w-1.25 rounded-[3px] bg-red no-underline"
                      style={{ insetInlineStart: `${proposal.thresholdPercent}%` }}
                    />
                  </span>
                  <div className="mt-2.75 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
                    {(
                      [
                        ['yes', proposal.yes, 'bg-blue'],
                        ['no', proposal.no, 'bg-tint'],
                        ['threshold', proposal.threshold, 'w-1.25 rounded-[3px] bg-red'],
                        ['absent', proposal.absent, 'bg-paper'],
                      ] as const
                    ).map(([id, value, tone]) => (
                      <span key={id} className="flex min-w-0 items-center gap-2.25">
                        <i
                          className={cn(
                            'block size-3.75 shrink-0 rounded-sm border-[2.5px] border-ink',
                            tone,
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block font-body text-[12.5px]/[1.4] font-bold text-soft">
                            {id === 'threshold'
                              ? t('tally.threshold', { percent: n(proposal.thresholdPercent) })
                              : t(`tally.${id}`)}
                          </span>
                          <strong className="block font-display text-[19px]/[1.2] font-normal">
                            {n(value)}
                          </strong>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mt-3.25 inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-surface px-3.5 py-1 font-body text-[13px] font-extrabold">
                  <i
                    className={cn(
                      'block size-3 rounded-full border-2 border-ink',
                      proposal.vote === 'yes'
                        ? 'bg-blue'
                        : proposal.vote === 'no'
                          ? 'bg-red'
                          : 'bg-paper',
                    )}
                  />
                  {t(`votes.${proposal.vote}`)}
                </span>
              </Link>
            )
          })}
        </div>
      )}

      {tab === 'membership' && (
        <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6.5 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
          <h2 className="flex flex-wrap items-center gap-3.25 font-display text-[26px]/[1.25]">
            <Image src={HandIcon} alt="" className="size-8.5 shrink-0" />
            {t('membership.title')}
          </h2>
          <p className="mt-2.25 font-body text-base/[1.95] font-medium text-soft">
            {t('membership.description', { support: n(11840), percent: n(20) })}
          </p>
          <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
            {membershipFacts.map((fact) => (
              <div
                key={fact.id}
                className="rounded-card border-[2.5px] border-ink bg-paper px-4.25 py-3.75"
              >
                <span className="block font-body text-[12.5px] font-bold text-soft">
                  {t(`membership.facts.${fact.id}`)}
                </span>
                <strong className="mt-1 block font-display text-[22px]/[1.3] font-normal">
                  {n(fact.value)}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-5">
            {membershipOrganizations.map((organization) => (
              <div
                key={organization.id}
                className={cn(
                  'mb-2.75 flex items-center gap-3.25 rounded-card border-[2.5px] border-ink bg-paper px-4 py-3.25',
                  organization.removed && 'opacity-60',
                )}
              >
                <Image
                  src={organization.removed ? KeyIcon : StarIcon}
                  alt=""
                  className="size-6.5 shrink-0 opacity-70"
                />
                {organization.removed ? (
                  <strong className="min-w-0 flex-1 font-body text-[15px] font-extrabold">
                    {t(`membership.organizations.${organization.id}`)}
                  </strong>
                ) : (
                  <Link
                    href={`/organization/${organization.id}`}
                    className="min-w-0 flex-1 font-body text-[15px] font-extrabold underline decoration-[2.5px] underline-offset-3 hover:text-red"
                  >
                    {t(`membership.organizations.${organization.id}`)}
                  </Link>
                )}
                <span className="rounded-full border-2 border-ink bg-surface px-2.75 py-0.5 font-body text-xs font-extrabold text-soft">
                  {t(organization.removed ? 'membership.removed' : 'membership.joined')}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3.25 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.75">
            <Image src={KeyIcon} alt="" className="h-7.5 w-7 shrink-0" />
            <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
              {t.rich('membership.note', {
                strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                link: (chunks) => (
                  <Link href="/etabat" className="font-bold text-ink underline underline-offset-2">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </section>
      )}

      {tab === 'participation' && (
        <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6.5 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
          <h2 className="flex flex-wrap items-center gap-3.25 font-display text-[26px]/[1.25]">
            <Image src={CirclesIcon} alt="" className="size-8.5 shrink-0" />
            {t('participation.title')}
          </h2>
          <p className="mt-2.25 font-body text-base/[1.95] font-medium text-soft">
            {t('participation.description', {
              tokens: n(1485),
              percent: n(3.2),
            })}
          </p>
          <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
            {participationFacts.map((fact) => (
              <div
                key={fact.id}
                className="rounded-card border-[2.5px] border-ink bg-paper px-4.25 py-3.75"
              >
                <span className="block font-body text-[12.5px] font-bold text-soft">
                  {t(`participation.facts.${fact.id}`)}
                </span>
                <strong className="mt-1 block font-display text-[22px]/[1.3] font-normal">
                  {n(fact.value)}
                  {'total' in fact && fact.total
                    ? ` ${t('stats.of', { total: n(fact.total) })}`
                    : ''}
                  {'currency' in fact && fact.currency && (
                    <small className="ms-1 text-sm text-red">{global('currency')}</small>
                  )}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3.25 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.75">
            <Image src={KeyIcon} alt="" className="h-7.5 w-7 shrink-0" />
            <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
              {t.rich('participation.note', {
                reward: n(30),
                currency: global('currency'),
                strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                link: (chunks) => (
                  <Link
                    href="/hakima/annual-review"
                    className="font-bold text-ink underline underline-offset-5 decoration-red hover:text-red"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

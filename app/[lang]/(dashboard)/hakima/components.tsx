'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { networkTokens, organizationTokens, type Proposal } from './data'

const navLinks = [
  ['/hakima/browse', 'browse'],
  ['/hakima/support', 'support'],
  ['/hakima/voting', 'voting'],
  ['/hakima/my-proposals', 'mine'],
  ['/governance/annual-review', 'annualReview'],
  ['/governance/log', 'log'],
] as const

const primaryLink =
  'inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-5 py-[9px] font-body text-[14.5px] font-extrabold text-surface shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3'
const secondaryLink =
  'inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-surface px-[17px] py-[9px] font-body text-sm font-bold text-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3'

export function HakimaHeader({ subtitle, back = false }: { subtitle: string; back?: boolean }) {
  const t = useTranslations('hakima')
  return (
    <>
      {back && (
        <Link
          href="/hakima/browse"
          className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-extrabold text-ink hover:text-red"
        >
          <Button
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon', shape: 'round' }),
              'grid bg-surface',
            )}
          >
            <span className=" rtl:rotate-180">›</span>
          </Button>
          {t('back')}
        </Link>
      )}
      <header className="mb-6.5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.25] text-ink max-[520px]:text-[40px]">
          {t('name')}
        </h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">{subtitle}</p>
      </header>
    </>
  )
}

export function HakimaNav() {
  const t = useTranslations('hakima.nav')
  const pathname = usePathname()
  return (
    <nav className="mb-5.5 flex flex-wrap items-center gap-2.5" aria-label={t('label')}>
      {navLinks.map(([href, key], index) => (
        <span key={href} className="contents">
          {index === 1 && (
            <span className="mx-1 h-7.5 w-0.75 rounded-sm bg-ink/20" aria-hidden="true" />
          )}
          <Link
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'font-display bg-surface',
              pathname === href && 'bg-red text-surface',
            )}
          >
            {t(key)}
          </Link>
        </span>
      ))}
    </nav>
  )
}

export function PhaseBanner({
  phase,
  days,
  children,
}: {
  phase: 'support' | 'voting'
  days: number
  children: ReactNode
}) {
  const t = useTranslations('hakima')
  const locale = useLocale()
  return (
    <div
      className={cn(
        'mb-6 flex flex-wrap items-center gap-4.5 rounded-panel border-[3px] border-ink px-6.5 py-5.5 shadow-[7px_7px_0] shadow-ink',
        phase === 'support' ? 'bg-gold text-ink' : 'bg-blue text-surface',
      )}
    >
      <span className="grid size-13.5 shrink-0 place-items-center rounded-[14px] border-[2.5px] border-ink bg-surface p-2 shadow-[2px_2px_0] shadow-ink">
        <Image src={BalanceIcon} alt="" className="size-full" />
      </span>
      <span className="min-w-57.5 flex-1">
        <strong className="block font-display text-[26px]/[1.2] font-normal">
          {t(`phase.${phase}.title`)}
        </strong>
        <span className="mt-1.5 block font-body text-[15px]/[1.85] font-semibold">{children}</span>
      </span>
      <span className="shrink-0 text-center">
        <strong className="block font-display text-[42px]/[1] font-normal tabular-nums">
          {formatNumber(days, { locale })}
        </strong>
        <span className="mt-1 block font-body text-[13px] font-bold">{t('phase.daysLeft')}</span>
      </span>
    </div>
  )
}

export function Stats({
  items,
}: {
  items: Array<{
    label: string
    value?: ReactNode
    note: ReactNode
    color?: 'red' | 'gold' | 'default'
    highlighted?: boolean
  }>
}) {
  return (
    <div className="mb-6 grid gap-3.5 min-[761px]:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink',
            item.color === 'red' && 'bg-red',
            item.color === 'gold' && 'bg-gold',
            item.color === 'default' && 'bg-surface',
            item.highlighted && 'bg-gold',
          )}
        >
          <span
            className={cn(
              'block font-body text-[13.5px] font-bold text-soft',
              item.color === 'red' && 'text-surface/80',
            )}
          >
            {item.label}
          </span>
          {item.value && (
            <strong
              className={cn(
                'mt-1 block font-display text-[36px]/[1.08] font-normal tabular-nums',
                item.color === 'red' && 'text-surface',
              )}
            >
              {item.value}
            </strong>
          )}
          <span
            className={cn(
              'mt-1.5 block font-body text-[13px]/[1.7] font-semibold text-soft',
              item.color === 'red' && 'text-surface/80',
            )}
          >
            {item.note}
          </span>
        </div>
      ))}
    </div>
  )
}

export function GroupHeading({ children, count }: { children: ReactNode; count: number }) {
  const locale = useLocale()
  return (
    <h2 className="mt-8 mb-4 flex items-center gap-3.5 font-display text-[26px] text-red after:h-0.75 after:flex-1 after:rounded-sm after:bg-red/20">
      {children}
      <span className="rounded-full bg-ink px-3.25 py-1 font-body text-sm font-extrabold text-surface">
        {formatNumber(count, { locale })}
      </span>
    </h2>
  )
}

export function Threshold({
  proposal,
  voting = false,
  supportPhase = false,
  className,
}: {
  proposal: Proposal
  voting?: boolean
  supportPhase?: boolean
  className?: string
}) {
  const t = useTranslations('hakima')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })
  const passed = proposal.support >= proposal.threshold
  const difference = Math.abs(proposal.support - proposal.threshold)
  const progress = Math.min(100, Math.round((proposal.support / proposal.threshold) * 100))
  const approval = voting || proposal.status !== 'support'

  return (
    <div
      className={cn('mt-4 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-4', className)}
    >
      <p className="font-display text-xl/[1.3]">
        {t.rich(approval ? 'card.requiredApproval' : 'card.requiredQualification', {
          amount: n(proposal.threshold),
          amountTag: (chunks) => <strong className="text-2xl font-normal">{chunks}</strong>,
        })}
        <span className="mt-1 block font-body text-[13px]/[1.5] font-semibold text-soft">
          {t(
            voting
              ? proposal.category === 'protocol'
                ? 'card.votingThresholdProtocol'
                : 'card.votingThresholdOther'
              : 'card.thresholdDetail',
            { percent: n(proposal.thresholdPercent), total: n(networkTokens) },
          )}
        </span>
      </p>
      {!voting && (
        <span className="relative my-3 block h-4.25 overflow-hidden rounded-full border-[2.5px] border-ink bg-surface">
          <i
            className={cn('block h-full bg-gold', passed && 'bg-blue')}
            style={{ width: `${progress}%` }}
          />
          {proposal.thresholdMarker && (
            <i
              className="absolute inset-y-0 w-0.75 bg-red"
              style={{ insetInlineStart: `${proposal.thresholdMarker}%` }}
            />
          )}
        </span>
      )}
      <p className="font-body text-[14.5px]/[1.7] font-bold">
        {t.rich(voting ? 'card.qualifiedWith' : 'card.supportedWith', {
          amount: n(proposal.support),
          amountTag: (chunks) => (
            <strong className="font-display text-lg font-normal">{chunks}</strong>
          ),
        })}
        {!voting && (
          <span
            className={cn(
              'mt-1 block text-[13.5px] font-bold text-soft',
              passed && 'font-extrabold text-blue',
            )}
          >
            {t(
              passed
                ? supportPhase
                  ? 'card.overThresholdSupport'
                  : 'card.overThreshold'
                : 'card.remainingThreshold',
              { amount: n(difference) },
            )}
          </span>
        )}
      </p>
    </div>
  )
}

export function ProposalCard({
  proposal,
  mode = 'browse',
}: {
  proposal: Proposal
  mode?: 'browse' | 'support' | 'voting' | 'mine'
}) {
  const t = useTranslations('hakima')
  const global = useTranslations('global')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })
  const [supported, setSupported] = useState(Boolean(proposal.supportedByUser))
  const [vote, setVote] = useState<'yes' | 'no' | null>(proposal.vote ?? null)
  const passed = proposal.support >= proposal.threshold
  const done = proposal.status === 'done'
  const status = mode === 'support' && passed ? 'qualified' : proposal.status
  const stripTone =
    status === 'support'
      ? 'bg-gold text-ink'
      : status === 'done'
        ? 'bg-paper text-soft'
        : 'bg-blue text-surface'
  const icon = status === 'done' || status === 'qualified' ? '✓' : status === 'support' ? 'د' : 'ت'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-panel border-[3px] border-ink bg-surface shadow-[6px_6px_0] shadow-ink">
      <div
        className={cn(
          'flex flex-wrap items-center gap-2.75 border-b-[3px] border-ink px-5 py-2.75 font-display text-[19px]/[1.3]',
          stripTone,
        )}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-surface text-sm text-ink">
          {icon}
        </span>
        {t(`status.${status}`)}
        <span className="ms-auto font-body text-[13.5px] font-bold">
          {mode === 'support'
            ? t('card.supporters', { count: n(proposal.supporters ?? 0) })
            : done
              ? t(
                  mode === 'browse' && proposal.id === 'digital-resources'
                    ? 'proposals.digital-resources.browseWhen'
                    : `proposals.${proposal.id}.when`,
                )
              : mode === 'voting'
                ? t('card.votingCloses')
                : t('card.closesAfter', { days: n(proposal.remainingDays ?? 0) })}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5.5">
        <span className="mb-2.75 self-start rounded-full border-2 border-ink bg-paper px-3 py-1 font-body text-xs font-extrabold">
          {t(`category.${proposal.category}`)}
        </span>
        <h3 className="font-display text-[25px]/[1.3]">{t(`proposals.${proposal.id}.title`)}</h3>
        <p className="mt-2.25 line-clamp-3 font-body text-[15.5px]/[1.9] font-medium text-soft">
          {t(
            mode === 'browse' && proposal.id === 'digital-resources'
              ? 'proposals.digital-resources.browseDescription'
              : `proposals.${proposal.id}.description`,
            { currency: global('currency') },
          )}
        </p>

        {done && mode === 'mine' ? (
          <div
            className={cn(
              'mt-4 flex flex-wrap items-center gap-3 rounded-card border-[2.5px] border-ink px-4.5 py-4',
              proposal.result === 'passed' ? 'bg-gold' : 'border-dashed bg-surface text-soft',
            )}
          >
            <strong className="font-display text-[22px] font-normal">
              {t(`card.result.${proposal.result}`)}
            </strong>
            <span className="font-body text-[14.5px] font-bold">
              {t('card.resultAmount', {
                support: n(proposal.support),
                threshold: n(proposal.threshold),
              })}
            </span>
            <span className="ms-auto font-body text-[13.5px] font-semibold text-soft">
              {t(`proposals.${proposal.id}.resultNote`)}
            </span>
          </div>
        ) : (
          <Threshold
            proposal={proposal}
            voting={mode === 'voting'}
            supportPhase={mode === 'support'}
          />
        )}

        {mode === 'support' && !passed && (
          <div className="mt-3 flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4 py-3.5 font-body text-sm/[1.8] font-semibold text-soft">
            <span className="font-display text-xl text-red">≈</span>
            <p>
              {t.rich('card.carry', {
                strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
              })}
            </p>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2.5 font-body text-sm font-bold text-soft">
          {mode === 'voting'
            ? t('card.votingBalance', { amount: n(organizationTokens) })
            : t.rich(`proposals.${proposal.id}.mine`, {
                amount: n(organizationTokens),
                amountTag: (chunks) => (
                  <strong className="font-display text-[17px] font-normal text-ink">
                    {chunks}
                  </strong>
                ),
                result: (chunks) => (
                  <strong className="font-display text-[17px] font-normal text-ink">
                    {chunks}
                  </strong>
                ),
              })}
        </div>

        <div className={cn('mt-4 flex flex-wrap gap-2.5', mode === 'voting' && 'mt-3.5')}>
          {mode === 'voting' ? (
            <>
              {(['yes', 'no'] as const).map((choice) => (
                <Button
                  key={choice}
                  aria-pressed={vote === choice}
                  onClick={() => setVote(choice)}
                  effect="flat"
                  className={cn(
                    'h-auto min-w-27.5 text-ink flex-1 rounded-full border-[2.5px] border-ink bg-surface px-4.5 py-2.75 font-display text-[19px]/[1] font-normal shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow,background-color] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3',
                    vote === choice && (choice === 'yes' ? 'bg-gold' : 'bg-red text-surface'),
                  )}
                >
                  {t(`vote.${choice}`)}
                </Button>
              ))}
              <Link
                href={`/hakima/proposals/${proposal.id}`}
                className="inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-surface px-4.5 py-2.75 font-body text-sm font-bold text-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3"
              >
                {t('actions.detailsDocuments')}
              </Link>
              <p className="mt-2.5 w-full font-body text-[13.5px]/[1.8] font-bold text-soft">
                {vote
                  ? t.rich('vote.selected', {
                      choice: t(`vote.${vote}`),
                      strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                    })
                  : t.rich('vote.notSelected', {
                      strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                    })}
              </p>
            </>
          ) : (
            <>
              <Link
                href={
                  mode === 'browse' && proposal.id === 'membership-list'
                    ? '/governance/membership'
                    : `/hakima/proposals/${proposal.id}`
                }
                className={done ? secondaryLink : primaryLink}
              >
                {t(
                  done
                    ? 'actions.viewResult'
                    : mode === 'browse' && proposal.id === 'membership-list'
                      ? 'actions.viewListVote'
                      : mode === 'browse' && proposal.status === 'voting'
                        ? 'actions.viewVote'
                        : mode === 'browse'
                          ? 'actions.viewSupport'
                          : 'actions.viewProposal',
                )}
              </Link>
              {mode === 'support' && (
                <Button
                  aria-pressed={supported}
                  onClick={() => setSupported((value) => !value)}
                  effect="flat"
                  className={cn(
                    'h-auto rounded-full border-[2.5px] border-ink bg-surface px-5 py-2.5 font-body text-[14.5px] font-extrabold text-ink shadow-[3px_3px_0] shadow-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3',
                    supported && 'bg-red text-surface hover:bg-red',
                  )}
                >
                  {t(supported ? 'actions.removeSupport' : 'actions.support')}
                </Button>
              )}
              {(mode === 'browse' || mode === 'support') && !done && (
                <Link
                  href={`/hakima/proposals/${proposal.id}#discussion`}
                  className={secondaryLink}
                >
                  {t('actions.discussion')}
                </Link>
              )}
              {mode === 'mine' && !done && (
                <>
                  <Button
                    effect="flat"
                    disabled={proposal.status === 'voting'}
                    className={secondaryLink}
                  >
                    {t('actions.edit')}
                  </Button>
                  <Button
                    variant="destructive"
                    effect="flat"
                    disabled={proposal.status === 'voting'}
                    className="rounded-full border-[2.5px] border-red px-5 py-2 font-body text-sm font-extrabold text-red hover:bg-red hover:text-surface disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t('actions.withdraw')}
                  </Button>
                  <p className="mt-2 w-full font-body text-[13px]/[1.8] font-semibold text-soft">
                    {t.rich(proposal.status === 'support' ? 'my.supportLock' : 'my.voteLock', {
                      strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                    })}
                  </p>
                </>
              )}
              {mode === 'mine' && done && (
                <Link
                  href={
                    proposal.result === 'passed' ? '/governance/log' : '/hakima/proposals/create'
                  }
                  className={secondaryLink}
                >
                  {t(proposal.result === 'passed' ? 'actions.viewLog' : 'actions.resubmit')}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}

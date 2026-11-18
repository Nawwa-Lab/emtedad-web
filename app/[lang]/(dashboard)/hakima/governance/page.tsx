'use client'

import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import KeyIcon from '@/icons/key.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'
import { Note } from '../components'
import { supportThreshold } from '../data'
import {
  closedCycles,
  cyclePhases,
  draftSurveyDaysLeft,
  governanceTabs,
  pastSurvey,
  teamTokens,
  teamVoteProposals,
  type GovernanceTab,
} from './data'

const tabClass =
  'inline-flex cursor-pointer items-center rounded-full border-[2.5px] border-ink bg-surface px-[19px] py-[9px] font-body text-[14.5px] font-extrabold text-ink shadow-[3px_3px_0] shadow-ink transition hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue'

const row2Class =
  'mb-4 block rounded-panel border-[3px] border-ink bg-surface px-[22px] py-5 text-ink shadow-[5px_5px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[8px_9px_0]'

const barClass =
  'mt-[15px] flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/[0.28] pt-[14px]'

const tagClass = (tone?: 'blue' | 'wait' | 'ok' | 'off') =>
  cn(
    'rounded-full font-body border-[2.5px] border-ink bg-paper px-[13px] py-1 text-[12.5px] font-extrabold whitespace-nowrap',
    tone === 'blue' && 'bg-blue text-surface',
    tone === 'wait' && 'bg-gold',
    tone === 'ok' && 'bg-[#9cc49b]',
    tone === 'off' && 'text-soft',
  )

function Meta({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[14px] font-semibold text-soft">
      {children}
    </div>
  )
}

function Sep() {
  return <span className="block h-[22px] w-[3px] shrink-0 rounded-[2px] bg-ink/[0.22]" />
}

function Go2({ children }: { children: ReactNode }) {
  return (
    <span className="ms-auto  font-body inline-flex items-center gap-[9px] text-[14.5px] font-extrabold text-red">
      <span className="grid size-[30px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-[7px] text-ink">
        <ChevronRight className="size-[11px]" strokeWidth={3.2} />
      </span>
      {children}
    </span>
  )
}

export default function GovernancePage() {
  const t = useTranslations('hakima.governance')
  const shared = useTranslations('hakima')
  const global = useTranslations('global')
  const locale = useLocale()
  const [tab, setTab] = useState<GovernanceTab>('cyc')
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  useEffect(() => {
    const syncHash = () => {
      const hash = location.hash.slice(1)
      if ((governanceTabs as readonly string[]).includes(hash)) setTab(hash as GovernanceTab)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const selectTab = (value: GovernanceTab) => {
    setTab(value)
    window.history.replaceState(null, '', `#${value}`)
  }

  return (
    <div className="mx-auto max-w-[980px]">
      <header className="mb-[26px] flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-1.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </header>

      <nav aria-label={t('tabsLabel')} className="mb-[26px] flex flex-wrap gap-2.5" role="tablist">
        {governanceTabs.map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => selectTab(value)}
            className={cn(tabClass, tab === value && 'bg-ink text-surface')}
          >
            {t(`tabs.${value}`)}
          </button>
        ))}
      </nav>

      {tab === 'cyc' && (
        <div>
          <div className="mb-6 flex items-start gap-[15px] rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
            <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
              <Image src={BalanceIcon} alt="" className="max-h-full max-w-full object-contain" />
            </span>
            <div>
              <b className="block font-display text-[21px]/[1.3] font-normal">
                {t('autobox.title')}
              </b>
              <p className="mt-1.5 text-[14.5px]/[1.9] font-semibold">
                {t.rich('autobox.text', { b: (chunks) => <b>{chunks}</b> })}
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-panel border-[3px] border-ink bg-surface px-7 py-[26px] shadow-[6px_6px_0] shadow-ink">
            <div className="flex flex-wrap items-baseline gap-3.5">
              <h2 className="font-display text-[26px]/[1.25]">{t('cycle.title')}</h2>
              <span className="text-[14px] font-bold text-soft">{t('cycle.dates')}</span>
            </div>
            <div className="mt-[22px] grid grid-cols-4 gap-[13px] max-[860px]:grid-cols-2 max-[460px]:grid-cols-1">
              {cyclePhases.map((phase, index) => (
                <div
                  key={phase.key}
                  className={cn(
                    'min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-4 py-[15px]',
                    phase.state === 'now' && 'bg-gold shadow-[4px_4px_0] shadow-ink',
                    phase.state === 'done' && 'border-dashed opacity-60',
                  )}
                >
                  <span className="mb-2.5 grid size-[25px] place-items-center rounded-full bg-ink font-display text-[13px]/[1] text-surface">
                    {n(index + 1)}
                  </span>
                  <b className="block font-display text-[17.5px]/[1.3] font-normal">
                    {t(`phases.${phase.key}.name`)}
                  </b>
                  <span
                    className={cn(
                      'mt-[5px] block text-[12px] font-bold text-soft',
                      phase.state === 'now' && 'text-ink/75',
                    )}
                  >
                    {t(`phases.${phase.key}.meta`)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[22px] flex flex-wrap items-center gap-3.5 rounded-card bg-ink px-5 py-4 text-surface">
              <span className="min-w-[170px] flex-1 text-[14.5px] font-bold">
                {t('cycle.tokensLabel')}
              </span>
              <b className="font-display text-[28px] font-normal tabular-nums text-gold">
                {n(teamTokens)}
                <small className="ms-1.5 font-body text-[14px] font-extrabold text-surface">
                  {t('cycle.tokensSuffix')}
                </small>
              </b>
            </div>
          </div>

          <Note icon={KeyIcon} className="mt-0">
            {t.rich('pauseNote', { b: (chunks) => <b className="text-ink">{chunks}</b> })}
          </Note>
        </div>
      )}

      {tab === 'vote' && (
        <div>
          <Note icon={CirclesIcon} className="mt-0 mb-5">
            {t.rich('voteNote', {
              amount: n(teamTokens),
              b: (chunks) => <b className="text-ink">{chunks}</b>,
            })}
          </Note>
          {teamVoteProposals.map((proposal) => (
            <Link key={proposal.id} href={`/hakima/proposals/${proposal.id}`} className={row2Class}>
              <div className="flex flex-wrap items-start gap-3">
                <h3 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
                  {t(`voteRows.${proposal.rowKey}.title`)}
                </h3>
                <span className={tagClass(proposal.category === 'protocol' ? 'blue' : undefined)}>
                  {shared(`category.${proposal.category}`)}
                </span>
                <span className={tagClass('wait')}>{t('tags.supportPhase')}</span>
              </div>
              <Meta>
                <span className="font-body">
                  {t('approvalThreshold', { percent: n(proposal.thresholdPercent) })}
                </span>
                <Sep />
                <span className="font-body">
                  {proposal.supported
                    ? t('teamSupported', { amount: n(teamTokens) })
                    : t('teamNotSupported')}
                </span>
              </Meta>
              <div className={barClass}>
                {proposal.qualified ? (
                  <span className={tagClass('ok')}>{t('tags.qualified')}</span>
                ) : (
                  <span className={tagClass('off')}>
                    {t('needsTokens', { amount: n(supportThreshold) })}
                  </span>
                )}
                <Go2>
                  {proposal.supported ? shared('actions.viewProposal') : t('supportAction')}
                </Go2>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === 'srv' && (
        <div>
          <div className={cn(row2Class, 'bg-gold')}>
            <div className="flex flex-wrap items-start gap-3">
              <h3 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
                {t('survey.title')}
              </h3>
              <span className={tagClass()}>{t('tags.draft')}</span>
            </div>
            <Meta>
              <span>{t('survey.meta')}</span>
              <Sep />
              <span>{t('survey.daysLeft', { days: n(draftSurveyDaysLeft) })}</span>
            </Meta>
            <div className={barClass}>
              <span className={tagClass('off')}>{t('tags.noQuestions')}</span>
              <span className="ms-auto flex flex-wrap gap-2.5">
                <Link
                  href="/hakima/surveys/create"
                  className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-red px-[15px] py-[6px] font-body text-[13px] font-extrabold text-surface shadow-[2px_2px_0] shadow-ink hover:bg-ink"
                >
                  {t('survey.build')}
                </Link>
              </span>
            </div>
          </div>

          <Note icon={PlantIcon} className="mt-5">
            {t.rich('indexNote', {
              currency: global('currency'),
              b: (chunks) => <b className="text-ink">{chunks}</b>,
              nlink: (chunks) => (
                <Link
                  href="/hakima/annual-review"
                  className="border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
                >
                  {chunks}
                </Link>
              ),
            })}
          </Note>

          <h2 className="mt-7 mb-[15px] font-display text-[22px]">{t('previousTitle')}</h2>

          <Link href="/hakima/annual-review" className={row2Class}>
            <div className="flex flex-wrap items-start gap-3">
              <h3 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
                {t('previous.title')}
              </h3>
              <span className={tagClass('ok')}>{t('tags.closed')}</span>
            </div>
            <Meta>
              <span className="font-body">
                {t('previous.answered', {
                  answered: n(pastSurvey.answered),
                  members: n(pastSurvey.members),
                })}
              </span>
              <Sep />
              <span className="font-body">
                {t('previous.index', { percent: n(pastSurvey.index) })}
              </span>
            </Meta>
          </Link>
        </div>
      )}

      {tab === 'res' && (
        <div>
          {closedCycles.map((cycle) => (
            <Link key={cycle.key} href="/hakima/log" className={row2Class}>
              <div className="flex flex-wrap items-start gap-3">
                <h3 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
                  {t(`results.${cycle.key}.title`)}
                </h3>
                <span className={tagClass('ok')}>{t('tags.closedCycle')}</span>
              </div>
              <Meta>
                <span className="font-body">
                  {t(`results.${cycle.key}.meta`, {
                    submitted: n(cycle.submitted),
                    voting: n(cycle.voting),
                    approved: n(cycle.approved),
                  })}
                </span>
                <Sep />
                <span className="font-body">
                  {t(`results.${cycle.key}.participation`, { percent: n(cycle.participation) })}
                </span>
              </Meta>
              <div className={barClass}>
                <Go2>{t('results.openLog')}</Go2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

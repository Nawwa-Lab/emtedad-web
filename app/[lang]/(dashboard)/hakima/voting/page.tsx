'use client'

import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  GroupHeading,
  HakimaHeader,
  HakimaNav,
  PhaseBanner,
  ProposalCard,
  Stats,
} from '../components'
import { organizationTokens, participationReward, proposals, votingProposalIds } from '../data'

export default function HakimaVotingPage() {
  const t = useTranslations('hakima')
  const global = useTranslations('global')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  return (
    <>
      <HakimaHeader subtitle={t('phase.voting.subtitle')} />
      <HakimaNav />
      <PhaseBanner phase="voting" days={3}>
        {t('phase.voting.text')}
      </PhaseBanner>
      <div className="mb-6 flex items-start gap-3.5 rounded-panel border-[2.5px] border-dashed border-ink bg-paper px-5.5 py-4.5">
        <Image src={TargetIcon} alt="" className="h-9 w-8.5 shrink-0" />
        <p className="font-body text-[15.5px]/[1.9] font-semibold text-soft">
          {t.rich('hiddenVotes', {
            strong: (chunks) => (
              <strong className="font-display text-[17px] font-normal text-ink">{chunks}</strong>
            ),
          })}
        </p>
      </div>
      <Stats
        items={[
          {
            label: t('stats.voted'),
            value: n(2),
            note: t('stats.votedNote', {
              reward: n(participationReward),
              currency: global('currency'),
            }),
            highlighted: true,
          },
          {
            label: t('stats.votingBalance'),
            value: n(organizationTokens),
            note: t('stats.votingBalanceNote'),
          },
          {
            label: t('stats.cycleThresholds'),
            note: (
              <span className="mt-2 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2.25 rounded-card border-[2.5px] border-ink bg-surface px-4 py-2.75 text-ink">
                  <strong className="font-display text-[19px] font-normal">{n(27720)}</strong>
                  <span className="text-[12.5px] text-soft">{t('stats.protocolThreshold')}</span>
                </span>
                <span className="inline-flex items-center gap-2.25 rounded-card border-[2.5px] border-ink bg-surface px-4 py-2.75 text-ink">
                  <strong className="font-display text-[19px] font-normal">{n(9240)}</strong>
                  <span className="text-[12.5px] text-soft">{t('stats.otherThreshold')}</span>
                </span>
              </span>
            ),
          },
        ]}
      />
      <GroupHeading count={votingProposalIds.length}>{t('groups.voting')}</GroupHeading>
      <div className="grid gap-5 min-[981px]:grid-cols-2">
        {votingProposalIds.map((id) => (
          <ProposalCard key={id} proposal={proposals[id]} mode="voting" />
        ))}
      </div>
    </>
  )
}

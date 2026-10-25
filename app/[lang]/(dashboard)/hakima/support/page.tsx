'use client'

import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import {
  GroupHeading,
  HakimaHeader,
  HakimaNav,
  PhaseBanner,
  ProposalCard,
  Stats,
} from '../components'
import {
  networkTokens,
  organizationTokens,
  proposals,
  supportProposalIds,
  supportThreshold,
} from '../data'

export default function HakimaSupportPage() {
  const t = useTranslations('hakima')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  return (
    <div>
      <HakimaHeader subtitle={t('phase.support.subtitle')} />
      <HakimaNav />
      <PhaseBanner phase="support" days={4}>
        {t.rich('phase.support.text', {
          threshold: n(supportThreshold),
          strong: (chunks) => (
            <>
              <br /> <strong className="font-display text-[26px]">{chunks}</strong> <br />{' '}
            </>
          ),
        })}
      </PhaseBanner>
      <Stats
        items={[
          {
            label: t('stats.qualified'),
            value: n(2),
            note: t('stats.qualifiedNote'),
            highlighted: true,
          },
          {
            label: t('stats.supported'),
            value: n(2),
            note: t('stats.supportedNote', { amount: n(organizationTokens) }),
          },
          {
            label: t('stats.supportThreshold'),
            value: n(supportThreshold),
            note: t('stats.supportThresholdNote', { total: n(networkTokens) }),
          },
        ]}
      />
      <GroupHeading count={supportProposalIds.length}>{t('groups.support')}</GroupHeading>
      <div className="grid gap-5 min-[981px]:grid-cols-2">
        {supportProposalIds.map((id) => (
          <ProposalCard key={id} proposal={proposals[id]} mode="support" />
        ))}
      </div>
    </div>
  )
}

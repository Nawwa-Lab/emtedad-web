'use client'

import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { HakimaHeader, HakimaNav, ProposalCard, Stats } from '../components'
import { myProposalIds, proposals } from '../data'

export default function MyHakimaProposalsPage() {
  const t = useTranslations('hakima')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale })

  return (
    <>
      <HakimaHeader subtitle={t('my.subtitle')} />
      <HakimaNav />
      <Stats
        items={[
          {
            label: t('my.submitted'),
            value: n(4),
            note: t('my.submittedNote'),
            highlighted: true,
          },
          { label: t('my.approved'), value: n(1), note: t('my.approvedNote') },
          { label: t('my.next'), value: t('my.available'), note: t('my.nextNote') },
        ]}
      />
      <div className="grid gap-5 min-[981px]:grid-cols-2">
        {myProposalIds.map((id) => (
          <ProposalCard key={id} proposal={proposals[id]} mode="mine" />
        ))}
      </div>
    </>
  )
}

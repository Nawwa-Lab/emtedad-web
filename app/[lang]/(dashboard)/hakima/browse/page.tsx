'use client'

import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { GroupHeading, HakimaHeader, HakimaNav, ProposalCard } from '../components'
import { browseGroups, organizationTokens, proposals } from '../data'
import { Input } from '@/components/ui/input'

export default function HakimaBrowsePage() {
  const t = useTranslations('hakima')
  const global = useTranslations('global')
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  return (
    <>
      <HakimaHeader subtitle={t('browseSubtitle')} />
      <HakimaNav />

      <section className="mb-5.5 flex flex-wrap items-center gap-4.5 rounded-panel border-[3px] border-ink bg-surface px-6.5 py-5.5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-13.5 shrink-0  rounded-[14px] border-[2.5px] border-ink bg-gold p-2 shadow-[2px_2px_0] shadow-ink">
          <Image src={BalanceIcon} alt="" className="size-full" />
        </span>
        <div className="min-w-60 flex-1 font-body text-[16.5px]/[1.95] font-medium text-soft">
          <ul>
            {t.rich('intro', {
              currency: global('currency'),
              title: (chunks) => (
                <strong className="mb-1 block font-display text-[21px] font-normal text-ink">
                  {chunks}
                </strong>
              ),
              strong: (chunks) => (
                <li>
                  <strong className="font-extrabold text-ink">{chunks}</strong>
                </li>
              ),
            })}
          </ul>
        </div>
      </section>

      <section className="mb-5.5 grid overflow-hidden rounded-panel border-[3px] border-ink bg-surface shadow-[7px_7px_0] shadow-ink min-[481px]:grid-cols-2 min-[901px]:grid-cols-4">
        {[
          [t('cycle.number'), n(12), 'bg-surface'],
          [t('cycle.phase'), t('cycle.voting'), 'bg-blue text-surface'],
          [
            t('cycle.remaining'),
            <>
              {n(3)}
              <small className="ms-1.25 font-display text-[15px] text-surface/85">
                {t('cycle.days')}
              </small>
            </>,
            'bg-red text-surface',
          ],
          [t('cycle.balance'), n(organizationTokens), 'bg-gold'],
        ].map(([label, value, tone], index) => (
          <div
            key={String(label)}
            className={`${tone} border-b-[3px] border-ink px-5.5 py-5 last:border-b-0 min-[481px]:border-e-[3px] min-[481px]:even:border-e-0 min-[901px]:border-b-0 min-[901px]:border-e-[3px] min-[901px]:even:border-e-[3px] min-[901px]:last:border-e-0 ${index === 1 || index === 2 ? '[&_span]:text-surface/85' : ''}`}
          >
            <span className="block font-body text-[13px] font-bold text-soft">{label}</span>
            <strong className="mt-1 block font-display text-3xl/[1.1] font-normal tabular-nums">
              {value}
            </strong>
          </div>
        ))}
      </section>

      <section className="mb-5.5 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-gold px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-12 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-surface p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={CirclesIcon} alt="" className="size-full" />
        </span>
        <span className="min-w-55 flex-1 font-body text-[15.5px]/[1.85] font-semibold">
          <strong className="mb-1 block font-display text-xl font-normal">
            {t('newProposal.title')}
          </strong>
          {t('newProposal.text')}
        </span>
        <Link
          href="/hakima/proposals/create"
          className="rounded-full border-[2.5px] border-ink bg-red px-5 py-3 font-body font-extrabold text-surface shadow-[4px_4px_0] shadow-ink"
        >
          {t('newProposal.action')}
        </Link>
      </section>

      <div className="mb-5 flex">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search')}
          aria-label={t('searchLabel')}
          className="min-w-55 flex-1 rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-3.25 font-body text-base font-semibold shadow-[3px_3px_0] shadow-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
        />
      </div>

      {browseGroups.map((group) => {
        const visible = group.ids
          .map((id) => proposals[id])
          .filter((proposal) =>
            t(`proposals.${proposal.id}.title`)
              .toLocaleLowerCase(locale)
              .includes(query.toLocaleLowerCase(locale)),
          )
        if (!visible.length) return null
        return (
          <section key={group.category}>
            <GroupHeading count={visible.length}>{t(`groups.${group.category}`)}</GroupHeading>
            <div className="grid gap-5 lg:grid-cols-2">
              {visible.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

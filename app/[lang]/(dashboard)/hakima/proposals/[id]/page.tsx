'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import StarIcon from '@/icons/star-2.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useState } from 'react'
import { Threshold } from '../../components'
import {
  organizationTokens,
  proposalCommentOrganizationIds,
  proposals,
  type ProposalId,
} from '../../data'
import { cn } from 'cn'
import { Input } from '@/components/ui/input'

export default function HakimaProposalDetailPage({
  params,
}: PageProps<'/[lang]/hakima/proposals/[id]'>) {
  const { id } = use(params)
  const t = useTranslations('hakima')
  const global = useTranslations('global')
  const locale = useLocale()
  const proposal = proposals[id as ProposalId] ?? proposals['small-business-cap']
  const [vote, setVote] = useState<'yes' | 'no'>('vote' in proposal ? proposal.vote : 'yes')
  const [voteChanged, setVoteChanged] = useState(false)
  const [comment, setComment] = useState('')
  const [extraComments, setExtraComments] = useState<string[]>([])
  const comments = t.raw('detail.comments') as Array<{ author: string; date: string; text: string }>
  const impactItems = t.raw('detail.impactItems') as string[]
  const files = t.raw('detail.files') as string[]
  const fileSizes = t.raw('detail.fileSizes') as string[]
  const infoLabels = t.raw('detail.infoLabels') as string[]
  const infoValues = t.raw('detail.infoValues') as string[]
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  const sendComment = () => {
    const value = comment.trim()
    if (!value) return
    setExtraComments((current) => [...current, value])
    setComment('')
  }

  return (
    <>
      <Link
        href="/hakima/browse"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink hover:text-red"
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
      <div className="grid items-start gap-6 min-[981px]:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <section className="mb-5.5 overflow-hidden rounded-panel border-[3px] border-ink bg-surface shadow-[6px_6px_0] shadow-ink">
            <div className="flex min-w-0 flex-wrap items-center gap-2.75 border-b-[3px] border-ink bg-blue px-5 py-2.75 font-display text-[19px]/[1.3] text-surface">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface font-body text-[13px] font-extrabold text-ink">
                ت
              </span>
              {t('status.voting')}
              <span className="ms-auto font-body text-[13.5px] font-bold">
                {t('card.closesAfter', { days: n(3) })} — {t('detail.closesAt')}
              </span>
            </div>
            <div className="px-7.5 py-7 max-sm:px-4.5">
              <div className="mb-3.5 flex flex-wrap items-center gap-3.25">
                <span className="font-body text-base font-medium">
                  {t(`category.${proposal.category}`)}
                </span>
                <span className="rounded-full border-[2.5px] border-dashed border-ink bg-surface px-3.5 py-1 font-body text-[13.5px] font-extrabold text-soft">
                  {t('detail.cycle')}
                </span>
              </div>
              <h1 className="font-display text-[clamp(28px,4vw,42px)]/[1.22]">
                {t(`proposals.${proposal.id}.title`)}
              </h1>
              <div className="mt-4.5 mb-3.5 flex flex-wrap items-center gap-3.5">
                <span className="grid size-13.5 shrink-0 place-items-center rounded-[15px] border-[2.5px] border-ink bg-gold font-display text-2xl shadow-[3px_3px_0] shadow-ink">
                  ح
                </span>
                <span className="font-body text-[13.5px] font-semibold text-soft">
                  <Link
                    href="/organization/halqa"
                    className="block font-display text-[22px]/[1.2] font-normal text-ink hover:text-red"
                  >
                    {t('detail.proposer')}
                  </Link>
                  <span className="mt-0.75 block">{t('detail.proposedMeta')}</span>
                </span>
              </div>

              {[
                [t('detail.proposal'), t('detail.proposalText', { currency: global('currency') })],
                [t('detail.why'), t('detail.whyText')],
              ].map(([heading, text]) => (
                <section key={heading} className="mt-6.5">
                  <h2 className="mb-2.5 font-display text-2xl text-red">{heading}</h2>
                  <p className="font-body text-[16.5px]/[2] font-medium text-soft">{text}</p>
                </section>
              ))}
              <section className="mt-6.5">
                <h2 className="mb-2.5 font-display text-2xl text-red">{t('detail.impact')}</h2>
                <ul className="font-body text-[16.5px]/[2] font-medium text-soft">
                  {impactItems.map((item) => (
                    <li
                      key={item}
                      className="relative mb-1.75 ps-6 before:absolute before:top-3.25 before:inset-s-0.5 before:size-2.5 before:rounded-full before:border-[2.5px] before:border-ink before:bg-gold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="mt-6.5">
                <h2 className="mb-2.5 font-display text-2xl text-red">{t('detail.documents')}</h2>
                <div className="mt-3 grid gap-3 min-[621px]:grid-cols-2">
                  {files.map((file, index) => (
                    <Button
                      key={file}
                      type="button"
                      className="flex min-w-0 items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-3.75 py-3 text-start hover:bg-gold"
                    >
                      <span className="grid size-10.5 shrink-0 place-items-center rounded-[10px] border-[2.5px] border-ink bg-red font-body text-xs font-extrabold text-surface">
                        {index ? 'XLS' : 'PDF'}
                      </span>
                      <span className="min-w-0 font-body">
                        <span className="block text-[15px] font-extrabold wrap-anywhere">
                          {file}
                        </span>
                        <span className="block text-[13px] font-semibold text-soft wrap-anywhere">
                          {fileSizes[index]}
                        </span>
                      </span>
                    </Button>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section
            id="discussion"
            className="rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5"
          >
            <h2 className="flex items-center gap-3 font-display text-[25px]">
              <Image src={StarIcon} alt="" className="size-8" />
              {t('detail.discussion')}
              <span className="ms-auto rounded-full border-[2.5px] border-dashed border-ink bg-surface px-3.5 py-1 font-body text-[13.5px] font-extrabold text-soft">
                {t('detail.entries')}
              </span>
            </h2>
            <div className="mt-3.5">
              {[
                ...comments,
                ...extraComments.map((text) => ({ author: t('detail.proposer'), date: '', text })),
              ].map((entry, index) => (
                <div
                  key={`${entry.author}-${index}`}
                  className="border-b-[2.5px] border-dashed border-ink/25 py-4.5 last:border-b-0"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2.75">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-display text-lg shadow-[2px_2px_0] shadow-ink">
                      {entry.author[0]}
                    </span>
                    <Link
                      href={`/organization/${proposalCommentOrganizationIds[index] ?? 'halqa'}`}
                      className="font-display text-[19px]/[1] hover:text-red"
                    >
                      {entry.author}
                    </Link>
                    <span className="ms-auto font-body text-[13px] font-semibold text-soft">
                      {entry.date}
                    </span>
                  </div>
                  <p className="font-body text-base/[1.95] font-medium text-soft">{entry.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4.5 flex items-center gap-3 border-t-[3px] border-dashed border-ink/25 pt-4.5">
              <Input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={t('detail.commentPlaceholder')}
                aria-label={t('detail.commentLabel')}
                className="min-w-0 flex-1 rounded-full border-[2.5px] border-ink bg-paper px-5 py-3.25 font-body text-base font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
              />
              <Button
                type="button"
                onClick={sendComment}
                className="rounded-full border-[2.5px] border-ink bg-red px-5 py-2.5 font-body text-[15px] font-extrabold text-surface shadow-[4px_4px_0] shadow-ink"
              >
                {t('detail.send')}
              </Button>
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-5.5">
          <div className="rounded-panel border-[3px] border-ink bg-blue px-6.5 py-6 text-surface shadow-[6px_6px_0] shadow-ink">
            <span className="block font-body text-sm font-bold text-surface/90">
              {t('detail.votingBalance')}
            </span>
            <strong className="mt-1 block font-display text-[40px]/[1.1] font-normal tabular-nums">
              {n(organizationTokens)}{' '}
              <small className="ms-1.5 text-base text-gold">{t('detail.token')}</small>
            </strong>
            <div className="mt-4.5 flex flex-wrap gap-3">
              {(['yes', 'no'] as const).map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  data-choice={choice}
                  aria-pressed={vote === choice}
                  onClick={() => {
                    setVote(choice)
                    setVoteChanged(true)
                  }}
                  className="min-w-32.5 flex-1 rounded-full border-[2.5px] border-ink bg-surface px-5 py-3.25 font-display text-[21px]/[1] text-ink shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] data-[choice=no]:aria-pressed:bg-red data-[choice=no]:aria-pressed:text-surface data-[choice=yes]:aria-pressed:bg-gold"
                >
                  {t(`vote.${choice}`)}
                </Button>
              ))}
            </div>
            <p className="mt-3.5 font-body text-[14.5px]/[1.8] font-bold text-surface/90">
              {t.rich(voteChanged ? 'detail.voteChanged' : 'detail.voteState', {
                choice: t(`vote.${vote}`),
                strong: (chunks) => <strong className="text-surface">{chunks}</strong>,
              })}
            </p>
          </div>

          <section className="rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <Threshold proposal={proposal} className="mt-0" />
            <div className="mt-4 flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4 py-3.5">
              <Image src={TargetIcon} alt="" className="h-7 w-6.5 shrink-0" />
              <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
                {t.rich('detail.hidden', {
                  strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                })}
              </p>
            </div>
          </section>

          <section className="rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <h2 className="font-display text-[22px]">{t('detail.info')}</h2>
            <dl className="mt-3">
              {infoLabels.map((label, index) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 border-b-[2.5px] border-dashed border-ink/25 py-3 font-body text-[15px] last:border-0"
                >
                  <dt className="font-semibold text-soft">{label}</dt>
                  <dd className="text-end font-bold">{infoValues[index]}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </>
  )
}

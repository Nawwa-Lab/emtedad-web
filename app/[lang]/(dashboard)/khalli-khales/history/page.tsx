'use client'

import { Button } from '@/components/ui/button'
import { CommunityRouteGuard } from '@/components/CommunityRouteGuard'
import StarIcon from '@/icons/star.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { PageHead, SubTabs } from '../components'
import { type HistoryRating, historyGroups, historyStats } from '../data'

function RatingBox({
  label,
  emptyLabel,
  rating,
  noComment,
}: {
  label: string
  emptyLabel: string
  rating: HistoryRating | null
  noComment: string
}) {
  return (
    <div className="rounded-[16px] border-[2.5px] border-ink bg-paper px-4 py-3.5">
      <span className="mb-2 block text-[12.5px] font-extrabold text-soft">{label}</span>
      {rating ? (
        <>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border-2 border-ink py-[3px] pe-3.25 ps-2 font-display text-[15px]',
              rating.tone === 'surface' ? 'bg-surface' : 'bg-gold',
            )}
          >
            <Image src={StarIcon} alt="" className="size-[19px]" />
            {rating.value}
          </span>
          <p className="mt-[9px] text-[15px] font-medium leading-[1.85] text-soft">
            {rating.comment}
          </p>
        </>
      ) : (
        <>
          <span className="inline-block rounded-full border-[2.5px] border-dashed border-ink bg-surface px-3.5 py-1.25 font-body text-[13.5px] font-extrabold text-soft">
            {emptyLabel}
          </span>
          <p className="mt-[9px] text-[15px] font-medium leading-[1.85] text-soft opacity-70">
            {noComment}
          </p>
        </>
      )}
    </div>
  )
}

export default function HistoryPage() {
  const t = useTranslations('khalliKhalesHistory')
  const browse = useTranslations('khalliKhalesBrowse')
  const shared = useTranslations('khalliKhalesShared')
  const global = useTranslations('global')
  const locale = useLocale()
  const fmt = (value: number | string) => formatNumber(value, { locale })

  const kindLabels = {
    served: t('kindServed'),
    requested: t('kindRequested'),
    attended: t('kindAttended'),
    borrowed: t('kindBorrowed'),
  }

  return (
    <CommunityRouteGuard>
      <>
        <PageHead title={browse('title')} subtitle={t('subtitle')} />
        <SubTabs
          links={[
            { href: '/khalli-khales/browse', label: browse('link1') },
            { href: '/khalli-khales/my-offers', label: browse('link2') },
            { href: '/khalli-khales/my-asks', label: browse('link3') },
            { href: '/khalli-khales/my-registrations', label: browse('link4') },
            { href: '/khalli-khales/history', label: browse('link5') },
          ]}
        />

        <div className="mb-6 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          <span className="rounded-panel border-3 border-ink bg-gold px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
            <span className="block text-[13.5px] font-bold text-soft">{t('statDone')}</span>
            <span className="mt-[5px] block font-display text-[38px] leading-[1.05] font-features-['tnum']">
              {fmt(historyStats.done)}
            </span>
          </span>
          <span className="rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
            <span className="block text-[13.5px] font-bold text-soft">{t('statEarned')}</span>
            <span className="mt-[5px] block font-display text-[38px] leading-[1.05] font-features-['tnum']">
              {fmt(historyStats.earned)}
            </span>
          </span>
          <span className="rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
            <span className="block text-[13.5px] font-bold text-soft">{t('statSpent')}</span>
            <span className="mt-[5px] block font-display text-[38px] leading-[1.05] font-features-['tnum']">
              {fmt(historyStats.spent)}
            </span>
          </span>
          <span className="rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink">
            <span className="block text-[13.5px] font-bold text-soft">{t('statRating')}</span>
            <span className="mt-[5px] inline-flex items-center gap-2.5 font-display text-[29px] font-features-['tnum']">
              <Image src={StarIcon} alt="" className="size-[31px]" />
              {historyStats.rating}
            </span>
          </span>
        </div>

        {historyGroups.map((group) => (
          <div key={group.label}>
            <div className="mt-7.5 mb-3.5 flex items-center gap-3.5 font-display text-[24px] text-red after:h-[3px] after:flex-1 after:rounded-[2px] after:bg-red after:opacity-[0.22] after:content-['']">
              {group.label}
            </div>
            {group.items.map((item) => (
              <article
                key={item.id}
                className="mb-4 rounded-panel border-3 border-ink bg-surface px-6.5 py-6 shadow-[5px_5px_0] shadow-ink"
              >
                <div className="mb-2.5 flex flex-wrap items-start gap-3.5">
                  <span className="grid size-12.5 shrink-0 place-items-center rounded-[14px] border-[2.5px] border-ink bg-gold font-display text-[22px] shadow-[2px_2px_0] shadow-ink">
                    {Array.from(item.provider)[0]}
                  </span>
                  <span className="min-w-50 flex-1">
                    <b className="block font-display text-[23px] leading-[1.25]">{item.title}</b>
                    <span className="mt-[3px] block font-semibold text-[14px] text-soft">
                      {kindLabels[item.kind]} · {t('withLabel')} {item.provider} · {item.date}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap font-display text-[26px] font-features-['tnum']",
                      item.out && 'text-red',
                    )}
                  >
                    {item.amount}
                    <small className="ms-1 text-[13px] text-soft">{global('currency')}</small>
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-3.5 border-t-[2.5px] border-dashed border-[rgba(26,23,20,0.26)] pt-3.5 max-[700px]:grid-cols-1">
                  <RatingBox
                    label={t('ratingMine')}
                    emptyLabel={t('notRatedMine')}
                    rating={item.mine}
                    noComment={t('noComment')}
                  />
                  <RatingBox
                    label={t('ratingTheirs')}
                    emptyLabel={t('notRatedTheirs')}
                    rating={item.theirs}
                    noComment={t('noComment')}
                  />
                </div>

                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    effect="flat"
                    className="h-auto px-4 py-2 text-[14px]"
                  >
                    {shared('actionAgreement')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    effect="flat"
                    className="h-auto px-4 py-2 text-[14px]"
                  >
                    {shared('actionConversation')}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ))}
      </>
    </CommunityRouteGuard>
  )
}

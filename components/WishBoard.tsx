'use client'

import { Link } from '@/i18n/navigation'
import GennyIcon from '@/icons/genny.svg'
import LanternIcon from '@/icons/lantern.svg'
import PlantIcon from '@/icons/plant.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { EmptyState } from './ui/empty-state'
import { WishCard, type WishCardData, type WishFamily } from './WishCard'

export function WishBoard({
  family,
  wishes,
  mode = 'browse',
}: {
  family: WishFamily
  wishes: WishCardData[]
  mode?: 'browse' | 'mine'
}) {
  const locale = useLocale()
  const t = useTranslations(`${family}.browse`)
  const my = useTranslations(`${family}.myWishes`)
  const data = useTranslations(`${family}.data`)
  const [filterOpen, setFilterOpen] = useState(false)
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<'top' | 'latest'>('top')

  const categories = useMemo(
    () => Array.from(new Set(wishes.map((wish) => wish.categoryKey))),
    [wishes],
  )
  const visibleWishes = useMemo(
    () =>
      wishes
        .filter((wish) => category === 'all' || wish.categoryKey === category)
        .toSorted((a, b) => (sort === 'top' ? b.count - a.count : b.createdRank - a.createdRank)),
    [category, sort, wishes],
  )

  return (
    <div>
      <header className={cn(family === 'genny' ? 'mb-5.5' : 'mb-6.5')}>
        <div className="flex flex-wrap items-end gap-3.5">
          <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1]">
            {mode === 'mine' ? my('title') : t('title')}
          </h1>
          <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
            {mode === 'mine' ? my('subtitle') : t('subtitle')}
          </p>
        </div>
        {family === 'genny' && (
          <nav className="mt-2 flex flex-wrap items-center gap-2.5" aria-label={t('sectionNav')}>
            <WishNavLink href="/genny/browse" active={mode === 'browse'}>
              {t('browseTab')}
            </WishNavLink>
            <span className="mx-1 h-7.5 w-[3px] rounded-sm bg-ink/20" aria-hidden />
            <WishNavLink href="/genny/my-wishes" active={mode === 'mine'}>
              {t('myWishesTab')}
            </WishNavLink>
            <WishNavLink href="/genny/wish/create">{t('addWish')}</WishNavLink>
          </nav>
        )}
      </header>

      {mode === 'browse' ? (
        <>
          <section className="mb-5.5 flex flex-wrap items-center gap-4.5 rounded-panel border-[3px] border-ink bg-surface px-6.5 py-5.5 shadow-[6px_6px_0] shadow-ink">
            <span className="grid size-13.5 shrink-0 place-items-center rounded-[14px] border-[2.5px] border-ink bg-gold p-2 shadow-[2px_2px_0] shadow-ink">
              <Image src={GennyIcon} alt="" className="size-full" />
            </span>
            <p className="min-w-60 flex-1 font-body text-[16.5px]/[1.95] font-medium text-soft">
              <b className="mb-1 block font-display text-[21px] font-normal text-ink">
                {t('introTitle')}
              </b>
              {t('intro')}
            </p>
          </section>

          {family === 'shbeik' && (
            <section className="mb-5.5 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-surface px-5.5 py-4.5 shadow-[6px_6px_0] shadow-ink">
              <p className="min-w-52.5 flex-1 font-body text-[15.5px]/[1.85] font-semibold text-soft">
                <b className="mb-0.75 block font-display text-xl font-normal text-ink">
                  {t('newWishTitle')}
                </b>
                {t('newWishDescription')}
              </p>
              <Link
                href="/shbeik-lbeik/wish/create"
                className={cn(buttonVariants({ variant: 'primary' }))}
              >
                {t('addWish')}
              </Link>
            </section>
          )}

          <div className="mb-4.5 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              aria-expanded={filterOpen}
              className={cn('px-5.5', filterOpen && 'bg-ink text-surface hover:bg-ink')}
              onClick={() => setFilterOpen((current) => !current)}
            >
              <Image src={TargetIcon} alt="" className="size-5" />
              {t('filter')}
            </Button>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as 'top' | 'latest')}
              aria-label={t('sortLabel')}
              className="h-12 cursor-pointer rounded-full border-[2.5px] border-ink bg-paper px-5 font-body text-[15px] font-extrabold text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <option value="top">{t('mostEndorsed')}</option>
              <option value="latest">{t('latest')}</option>
            </select>
            <span className="font-body text-base font-semibold text-soft">
              {visibleWishes.length
                ? t.rich(visibleWishes.length === 1 ? 'resultSingle' : 'results', {
                    count: formatNumber(visibleWishes.length, { locale }),
                    category: category === 'all' ? '' : ` — ${data(`categories.${category}`)}`,
                    strong: (chunks) => (
                      <b className="font-display text-[22px] font-normal text-ink">{chunks}</b>
                    ),
                  })
                : t('emptyTitle')}
            </span>
          </div>

          {filterOpen && (
            <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 shadow-[6px_6px_0] shadow-ink">
              <p className="mb-2.5 font-display text-[17px] text-soft">
                {t('filterLabel')}{' '}
                <small className="font-body text-[13.5px] font-medium">{t('optional')}</small>
              </p>
              <div className="flex flex-wrap gap-2.25">
                {['all', ...categories].map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={category === key}
                    onClick={() => setCategory(key)}
                    className="rounded-full border-[2.5px] border-ink bg-paper px-4.5 py-2 font-body text-[14.5px] font-extrabold aria-pressed:bg-ink aria-pressed:text-surface"
                  >
                    {key === 'all' ? t('all') : data(`categories.${key}`)}
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label={my('proposed')} value={wishes.length} locale={locale} highlighted />
          <Stat
            label={my('endorsements')}
            value={wishes.reduce((total, wish) => total + wish.count, 0)}
            locale={locale}
          />
          <Stat label={my('fulfilled')} value={1} locale={locale} />
        </div>
      )}

      {visibleWishes.length ? (
        <div className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
          {visibleWishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} family={family} mode={mode} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={LanternIcon}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          className="bg-surface px-6 py-11 [&_h2]:text-[26px] [&_img]:mb-3.5 [&_img]:h-auto [&_img]:w-17.5 [&_p]:text-base"
        />
      )}

      {mode === 'browse' && family === 'shbeik' && (
        <section className="mt-8.5 flex items-start gap-3.5 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
          <span className="grid size-12 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-surface p-1.75 shadow-[2px_2px_0] shadow-ink">
            <Image src={PlantIcon} alt="" className="size-full" />
          </span>
          <p className="min-w-0 flex-1 font-body text-[15.5px]/[1.9] font-semibold">
            <b className="block font-display text-[19px] font-normal">{t('orgViewTitle')}</b>
            {t('orgViewDescription')}
          </p>
        </section>
      )}
    </div>
  )
}

function WishNavLink({
  href,
  active = false,
  children,
}: {
  href: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-full border-[2.5px] border-ink bg-surface px-6.5 py-3 font-display text-[21px]/[1] shadow-[4px_4px_0] shadow-ink transition hover:translate-[1px_1px] hover:bg-gold hover:shadow-[2px_2px_0]',
        active && 'bg-red text-surface hover:bg-red',
      )}
    >
      {children}
    </Link>
  )
}

function Stat({
  label,
  value,
  locale,
  highlighted = false,
}: {
  label: string
  value: number
  locale: string
  highlighted?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-panel border-[3px] border-ink bg-surface px-5.5 py-5 shadow-[5px_5px_0] shadow-ink',
        highlighted && 'bg-gold',
      )}
    >
      <span className="block font-body text-[13.5px] font-bold text-soft">{label}</span>
      <b className="mt-1.25 block font-display text-[38px]/[1.05] font-normal">
        {formatNumber(value, { locale })}
      </b>
    </div>
  )
}

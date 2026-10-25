'use client'

import { EmptyState } from '@/components/ui/empty-state'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Link } from '@/i18n/navigation'
import StarIcon from '@/icons/star.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { Maximize2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useState } from 'react'
import {
  countSearchResults,
  isSearchFilter,
  searchFilters,
  searchMockResults,
  type SearchOffer,
  type SearchResult,
} from './data'

function decodeTerm(term: string) {
  try {
    return decodeURIComponent(term)
  } catch {
    return term
  }
}

function SearchEntityResult({ result }: { result: Exclude<SearchResult, SearchOffer> }) {
  const t = useTranslations('search')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })
  const name =
    result.type === 'members'
      ? t(`members.${result.member}`)
      : result.type === 'proposals'
        ? t(`items.${result.id}.title`)
        : t(`providers.${result.provider}`)

  return (
    <article className="flex min-h-57.5 flex-col rounded-panel border-[3px] border-ink bg-surface p-6 shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-1 hover:-rotate-[0.3deg] hover:shadow-[9px_11px_0] max-[520px]:min-h-0 max-[520px]:p-5">
      <span className="mb-3.5 w-fit rounded-full border-[2.5px] border-ink bg-gold px-[15px] py-1.25 font-body text-[13px] font-bold text-ink">
        {t(`categories.${result.category}`)}
      </span>
      <h2 className="font-display text-[27px]/[1.3]">{t(`items.${result.id}.title`)}</h2>
      <p className="mt-2.5 font-body text-[15.5px]/[1.85] font-medium text-soft">
        {t(`items.${result.id}.description`)}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2.25 pt-4 font-body text-[14px] font-semibold text-soft">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-paper font-display text-sm/[1] text-ink">
          {name.charAt(0)}
        </span>
        <span className="flex-1">
          {result.type === 'requests'
            ? t('requestMeta', {
                provider: t(`providers.${result.provider}`),
                days: n(result.ageDays),
                responses: n(result.responses),
              })
            : result.type === 'members'
              ? t('memberMeta', {
                  provider: t(`providers.${result.provider}`),
                  rating: t(`ratings.${result.rating}`),
                })
              : result.type === 'organizations'
                ? t('organizationMeta', { rating: t(`ratings.${result.rating}`) })
                : t('proposalMeta', { support: n(result.support) })}
        </span>
      </div>

      <div className="mt-3.5 flex justify-end border-t-[2.5px] border-dashed border-ink pt-3.75">
        <Link
          href={result.href}
          className={buttonVariants({
            variant:
              result.type === 'requests' || result.type === 'proposals' ? 'primary' : 'outline',
            size: 'sm',
          })}
        >
          {t(
            `actions.${
              result.type === 'requests'
                ? 'iHave'
                : result.type === 'proposals'
                  ? 'viewProposal'
                  : 'viewProfile'
            }`,
          )}
        </Link>
      </div>
    </article>
  )
}

export default function SearchPage({
  params,
}: {
  params: Promise<{ term: string; filter: string }>
}) {
  const { term, filter: rawFilter } = use(params)
  const decodedTerm = decodeTerm(term)
  const filter = isSearchFilter(rawFilter) ? rawFilter : 'all'
  const t = useTranslations('search')
  const global = useTranslations('global')
  const dialog = useTranslations('dialog')
  const locale = useLocale()
  const [selectedOffer, setSelectedOffer] = useState<SearchOffer | null>(null)
  const [savedOffers, setSavedOffers] = useState<Set<SearchOffer['id']>>(new Set())
  const matchedResults = searchMockResults(decodedTerm)
  const counts = countSearchResults(matchedResults)
  const visibleResults =
    filter === 'all' ? matchedResults : matchedResults.filter((result) => result.type === filter)
  const hasResults = matchedResults.length > 0
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  const toggleSaved = (id: SearchOffer['id']) => {
    setSavedOffers((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-300">
      <header className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] font-normal max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {t('summary', {
            term: decodedTerm,
            count: n(counts.all),
          })}
        </p>
      </header>

      <nav className="my-5 flex flex-wrap gap-2.25" aria-label={t('filtersLabel')}>
        {searchFilters.map((item) => (
          <Link
            key={item}
            href={`/search/${encodeURIComponent(decodedTerm)}/${item}`}
            aria-current={filter === item ? 'page' : undefined}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-surface px-4.5 py-2.25 font-body text-[14.5px] font-bold text-ink transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-0.5 hover:shadow-[3px_3px_0] hover:shadow-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
              filter === item && 'bg-ink text-surface',
            )}
          >
            {t(`filters.${item}`)}
            <span
              className={cn(
                'grid min-w-5.5 place-items-center rounded-full bg-red px-1.5 py-0.5 text-[11px]/[1.4] text-surface',
                filter === item && 'bg-gold text-ink',
              )}
            >
              {n(counts[item])}
            </span>
          </Link>
        ))}
      </nav>

      {visibleResults.length ? (
        <div className="grid gap-5 min-[761px]:grid-cols-2">
          {visibleResults.map((result) =>
            result.type === 'offers' ? (
              <article
                key={result.id}
                className="relative flex min-h-75 flex-col rounded-panel border-[3px] border-ink bg-surface p-6 shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-1 hover:-rotate-[0.3deg] hover:shadow-[9px_11px_0] max-[520px]:min-h-0 max-[520px]:p-5"
              >
                <button
                  type="button"
                  onClick={() => result.factKeys && result.sections && setSelectedOffer(result)}
                  aria-label={t('openDetails')}
                  className={cn(
                    'absolute top-3.5 inset-e-3.5 z-10 grid size-10.5 place-items-center rounded-field border-[2.5px] border-ink bg-paper shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
                    !result.factKeys && 'hidden',
                  )}
                >
                  <Maximize2 className="size-5" strokeWidth={2.6} />
                </button>

                <span
                  className={cn(
                    'mb-3.5 w-fit rounded-full border-[2.5px] border-ink bg-blue px-[15px] py-1.25 font-body text-[13px] font-bold text-surface',
                    result.kind === 'resource' && 'bg-gold text-ink',
                  )}
                >
                  {t(`categories.${result.category}`)}
                </span>
                <h2 className="pe-11 font-display text-[28px]/[1.3] max-[520px]:text-2xl">
                  {t(`items.${result.id}.title`)}
                </h2>
                <p className="mt-2.5 line-clamp-2 font-body text-base/[1.85] font-medium text-soft">
                  {t(`items.${result.id}.description`)}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-2.25 pt-4 font-body text-[14.5px] font-semibold text-soft">
                  <span className="grid size-7.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-paper font-display text-sm/[1] text-ink">
                    {t(`providers.${result.provider}`).charAt(0)}
                  </span>
                  {t(`providers.${result.provider}`)} ·
                  <span className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink bg-gold px-2.5 py-0.5 font-body text-[12px] font-extrabold text-ink">
                    <Image src={StarIcon} alt="" className="size-4" />
                    {t(`ratings.${result.rating}`)}
                  </span>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-2.5 border-t-[2.5px] border-dashed border-ink pt-3.75">
                  <span className="me-auto font-display text-[34px]/[1]">
                    {n(result.price)}
                    <small className="ms-1.25 text-base text-red">{global('currency')}</small>
                    <span className="mt-1 block font-body text-[11px] font-bold text-soft">
                      {t('tax', { percent: n(result.taxPercent) })}
                    </span>
                  </span>
                  <Link href={result.href} className={buttonVariants({ size: 'sm' })}>
                    {t('actions.order')}
                  </Link>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    effect="flat"
                    aria-pressed={savedOffers.has(result.id)}
                    onClick={() => toggleSaved(result.id)}
                  >
                    {t(savedOffers.has(result.id) ? 'actions.saved' : 'actions.save')}
                  </Button>
                </div>
              </article>
            ) : (
              <SearchEntityResult key={result.id} result={result} />
            ),
          )}
        </div>
      ) : (
        <EmptyState
          icon={TargetIcon}
          title={hasResults ? t('filterEmpty.title') : t('empty.title', { term: decodedTerm })}
          description={hasResults ? t('filterEmpty.description') : t('empty.description')}
          action={
            hasResults ? (
              <Link
                href={`/search/${encodeURIComponent(decodedTerm)}/all`}
                className={buttonVariants()}
              >
                {t('filterEmpty.action')}
              </Link>
            ) : (
              <Link href="/alaesh-andak/request/create" className={buttonVariants()}>
                {t('empty.action')}
              </Link>
            )
          }
        />
      )}

      <Dialog
        open={selectedOffer !== null}
        onOpenChange={(open) => !open && setSelectedOffer(null)}
      >
        {selectedOffer?.factKeys && selectedOffer.sections && (
          <DialogContent closeLabel={dialog('close')} className="sm:w-[min(760px,94vw)]">
            <span className="mb-3 w-fit rounded-full border-[2.5px] border-ink bg-blue px-[15px] py-1.25 font-body text-[13px] font-bold text-surface">
              {t(`categories.${selectedOffer.category}`)} · {t(`kinds.${selectedOffer.kind}`)}
            </span>
            <DialogTitle>{t(`items.${selectedOffer.id}.title`)}</DialogTitle>
            <DialogDescription className="mb-0 text-[17px]/[2]">
              {t(`items.${selectedOffer.id}.details`)}
            </DialogDescription>

            <div className="mt-5.5 grid gap-3.5 min-[601px]:grid-cols-3">
              {selectedOffer.factKeys.map((fact) => (
                <div key={fact} className="rounded-card border-[2.5px] border-ink bg-paper p-4">
                  <span className="block font-body text-[13px] font-bold text-soft">
                    {t(`facts.${fact}`)}
                  </span>
                  <strong className="mt-1 block font-display text-[22px]/[1.3] font-normal">
                    {fact === 'value'
                      ? t('price', {
                          value: n(selectedOffer.price),
                          currency: global('currency'),
                        })
                      : t(`items.${selectedOffer.id}.facts.${fact}`)}
                  </strong>
                </div>
              ))}
            </div>

            {selectedOffer.sections.map((section) => (
              <section key={section.key} className="mt-6">
                <h3 className="font-display text-[22px] text-red">
                  {t(`sections.${section.key}`)}
                </h3>
                <ul className="mt-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="relative mb-1.5 ps-5.5 font-body text-base/[1.95] font-medium text-soft before:absolute before:top-3 before:start-0.5 before:size-2.25 before:rounded-full before:border-2 before:border-ink before:bg-gold"
                    >
                      {t(`items.${selectedOffer.id}.sections.${item}`, {
                        value: n(10),
                        currency: global('currency'),
                      })}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="mt-6">
              <h3 className="font-display text-[22px] text-red">{t('providerTitle')}</h3>
              <div className="mt-1 flex items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-3.5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-display text-[21px]/[1] shadow-[2px_2px_0] shadow-ink">
                  {t(`providers.${selectedOffer.provider}`).charAt(0)}
                </span>
                <strong className="flex-1 font-display text-[22px]/[1] font-normal">
                  {t(`providers.${selectedOffer.provider}`)}
                </strong>
                <span className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink bg-gold px-2.5 py-0.5 font-body text-[12px] font-extrabold">
                  <Image src={StarIcon} alt="" className="size-4" />
                  {t(`ratings.${selectedOffer.rating}`)}
                </span>
              </div>
            </section>

            <div className="mt-6.5 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-5">
              <Link href={selectedOffer.href} className={buttonVariants()}>
                {t('actions.orderFull')}
              </Link>
              <Button
                type="button"
                variant="outline"
                effect="flat"
                onClick={() => toggleSaved(selectedOffer.id)}
              >
                {t(savedOffers.has(selectedOffer.id) ? 'actions.saved' : 'actions.saveFull')}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

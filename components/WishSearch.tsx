'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { WishFamily, WishSuggestion } from './WishCard'
import { wishApi } from '@/services/wishes'

export function WishSearch({
  family,
  suggestions,
}: {
  family: WishFamily
  suggestions: WishSuggestion[]
}) {
  const locale = useLocale()
  const t = useTranslations(`${family}.addWish`)
  const data = useTranslations(`${family}.data`)
  const { control } = useFormContext()
  const query = useWatch({ control, name: 'query' }) as string
  const [available, setAvailable] = useState(suggestions)
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(available.map((suggestion) => [suggestion.id, suggestion.isEndorsed])),
  )
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(available.map((suggestion) => [suggestion.id, suggestion.count])),
  )

  useEffect(() => {
    if (!query.trim()) return
    const timer = window.setTimeout(async () => {
      const result = await wishApi.list(family === 'genny' ? 'network' : 'community', {
        q: query.trim(),
        sort: 'most_endorsed',
      })
      setAvailable(
        result.items.map((wish) => ({
          id: wish.id,
          title: wish.title,
          category: wish.category,
          description: wish.description,
          impact: wish.impact,
          count: wish.endorsementCount,
          isEndorsed: wish.endorsedByMe,
          ownerId: wish.ownerUserId ?? wish.ownerOrgId ?? undefined,
        })),
      )
      setEndorsed(Object.fromEntries(result.items.map((wish) => [wish.id, wish.endorsedByMe])))
      setCounts(Object.fromEntries(result.items.map((wish) => [wish.id, wish.endorsementCount])))
    }, 300)
    return () => window.clearTimeout(timer)
  }, [family, query])

  const normalizedQuery = query.trim().toLocaleLowerCase(locale)
  const results = available.filter((suggestion) => {
    if (!normalizedQuery) return true
    const copy = [
      suggestion.title ?? data(`wishes.${suggestion.copyKey}.title`),
      suggestion.description ?? data(`wishes.${suggestion.copyKey}.description`),
      ...(suggestion.category ?? [data(`categories.${suggestion.categoryKey}`)]),
    ].join(' ')
    return copy.toLocaleLowerCase(locale).includes(normalizedQuery)
  })

  return (
    <>
      <Form.Control
        name="query"
        label=""
        labelFor="wish-query"
        className="mb-5 [&_[data-slot=field-label]]:hidden"
      >
        {(field, fieldState) => (
          <Input
            {...field}
            id="wish-query"
            type="search"
            aria-label={t('searchAria')}
            aria-invalid={fieldState.invalid}
            placeholder={t('searchPlaceholder')}
          />
        )}
      </Form.Control>

      <div aria-live="polite">
        {results.length ? (
          results.map((suggestion) => {
            const isEndorsed = endorsed[suggestion.id]
            const count = counts[suggestion.id]
            return (
              <article
                key={suggestion.id}
                className="mb-3.5 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4.5"
              >
                <div className="flex flex-wrap items-start gap-3">
                  <h3 className="min-w-47.5 flex-1 font-display text-[21px]/[1.3]">
                    {suggestion.title ?? data(`wishes.${suggestion.copyKey}.title`)}
                  </h3>
                  <span className="font-body text-lg">
                    {(suggestion.category ?? [data(`categories.${suggestion.categoryKey}`)]).join(
                      ' · ',
                    )}
                  </span>
                </div>
                <p className="mt-2 font-body text-[15px]/[1.85] font-medium text-soft">
                  {suggestion.description ?? data(`wishes.${suggestion.copyKey}.description`)}
                </p>
                {suggestion.authorKey && (
                  <p className="mt-2.5 flex items-center gap-2.25 font-body text-[13.5px] font-semibold text-soft">
                    <span className="grid size-6.5 place-items-center rounded-full border-2 border-ink bg-gold text-xs font-extrabold text-ink">
                      {data(`authors.${suggestion.authorKey}.initial`)}
                    </span>
                    {data(`authors.${suggestion.authorKey}.name`)} ·{' '}
                    {data(`wishes.${suggestion.copyKey}.createdAt`)}
                  </p>
                )}
                <div className="mt-3.5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-gold py-1 pe-1.5 ps-[15px] font-body text-sm font-extrabold">
                    <b className="grid h-7 min-w-7 place-items-center rounded-full bg-ink px-1.5 font-display text-base font-normal text-surface">
                      {formatNumber(count, { locale })}
                    </b>
                    {t('supportCount')}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    aria-pressed={isEndorsed}
                    className={cn(
                      'ms-auto h-auto px-5 py-2 text-[14.5px] shadow-[3px_3px_0]',
                      isEndorsed && 'bg-red text-surface hover:bg-red',
                    )}
                    onClick={async () => {
                      setCounts((current) => ({
                        ...current,
                        [suggestion.id]: current[suggestion.id] + (isEndorsed ? -1 : 1),
                      }))
                      setEndorsed((current) => ({
                        ...current,
                        [suggestion.id]: !current[suggestion.id],
                      }))
                      await (isEndorsed ? wishApi.unendorse : wishApi.endorse)(
                        family === 'genny' ? 'network' : 'community',
                        suggestion.id,
                      )
                    }}
                  >
                    {isEndorsed ? t('endorsedInstead') : t('endorseInstead')}
                  </Button>
                </div>
              </article>
            )
          })
        ) : (
          <p className="rounded-card border-[2.5px] border-dashed border-ink bg-paper p-6 text-center font-body text-base/[1.9] font-semibold text-soft">
            {t('noSearchResults')}
          </p>
        )}
      </div>
    </>
  )
}

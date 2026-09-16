'use client'

import { Form, FormControl } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchWishSchema } from '@/types/schemas'
import { formatNumber } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'lodash/debounce'
import { useLocale } from 'next-intl'
import { useCallback, useMemo } from 'react'

interface WishSearchProps {
  label: string
  searchAriaLabel: string
  queryRequired: string
  endorsedCountLabel: (count: string) => string
  endorseLabel: string
  suggestion?: {
    name: string
    count: number
  } | null
}

export function WishSearch({
  label,
  searchAriaLabel,
  queryRequired,
  endorsedCountLabel,
  endorseLabel,
  suggestion,
}: WishSearchProps) {
  const locale = useLocale()

  const onSubmit = useCallback((data: { query: string }) => {
    if (data.query.trim() === '') return
    console.log('Search query:', data)
  }, [])

  const debouncedSearch = useMemo(() => debounce(onSubmit, 1000), [onSubmit])

  return (
    <div className="bg-sage border border-line-soft rounded-2xl p-4.5 mb-5.5">
      <Form
        resolver={zodResolver(searchWishSchema({ queryRequired }))}
        defaultValues={{ query: '' }}
        onSubmit={onSubmit}
      >
        <FormControl name="query" label={label} className="mb-0">
          {(field, fieldState) => (
            <Input
              type="search"
              aria-label={searchAriaLabel}
              aria-invalid={fieldState.invalid}
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value)
                debouncedSearch({ query: e.target.value })
              }}
            />
          )}
        </FormControl>
      </Form>
      {suggestion && (
        <div className="mt-4 flex items-center gap-3 flex-wrap bg-surface border border-line-soft rounded-xl py-3 px-3.5">
          <p className="font-cairo font-bold text-xs/[1.9] text-ink-soft flex-1 min-w-50">
            {suggestion.name}
            <small className="block font-semibold text-[11px] text-ink-soft mt-0.5 font-feature-[tnum]">
              {endorsedCountLabel(formatNumber(suggestion.count, { locale }))}
            </small>
          </p>
          <Button className="bg-green text-ink rounded-full font-extrabold text-[12px] px-4.5 py-2 cursor-default">
            {endorseLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

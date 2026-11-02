import { describe, expect, it } from 'vitest'

import { formatRelativeDate } from './formatter'

const now = new Date('2026-10-29T12:00:00.000Z')
const formatAr = (value: string) => formatRelativeDate(value, { locale: 'ar', now })
const formatEn = (value: string) => formatRelativeDate(value, { locale: 'en', now })

describe('formatRelativeDate', () => {
  it.each([
    ['2026-10-29T01:00:00.000Z', 'النهارده'],
    ['2026-10-28T12:00:00.000Z', 'إمبارح'],
    ['2026-10-27T12:00:00.000Z', 'من يومين'],
    ['2026-10-26T12:00:00.000Z', 'من ٣ أيام'],
    ['2026-10-22T12:00:00.000Z', 'من أسبوع'],
    ['2026-10-15T12:00:00.000Z', 'من أسبوعين'],
    ['2026-10-08T12:00:00.000Z', 'من ٣ أسابيع'],
    ['2026-09-29T12:00:00.000Z', 'من شهر'],
    ['2026-08-30T12:00:00.000Z', 'من شهرين'],
    ['2026-07-31T12:00:00.000Z', 'من ٣ شهور'],
  ])('formats %s in Egyptian Arabic', (value, expected) => {
    expect(formatAr(value)).toBe(expected)
  })

  it('formats relative English dates', () => {
    expect(formatEn('2026-10-28T12:00:00.000Z')).toBe('yesterday')
    expect(formatEn('2026-10-15T12:00:00.000Z')).toBe('2 weeks ago')
    expect(formatEn('2026-07-31T12:00:00.000Z')).toBe('3 months ago')
  })

  it('uses an absolute localized date after one year', () => {
    expect(formatAr('2025-10-29T12:00:00.000Z')).toBe('٢٩ أكتوبر ٢٠٢٥')
    expect(formatEn('2025-10-29T12:00:00.000Z')).toBe('October 29, 2025')
  })

  it('handles future and invalid dates', () => {
    expect(formatAr('2026-10-30T12:00:00.000Z')).toBe('النهارده')
    expect(formatAr('not-a-date')).toBe('')
  })
})

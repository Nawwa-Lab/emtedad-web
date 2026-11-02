import { DEFAULT_LOCALE } from '@/types/constants'

type FormatNumberOptions = Intl.NumberFormatOptions & { locale?: string }
type FormatRelativeDateOptions = { locale: string; now: Date }

const DAY_IN_MS = 86_400_000

export const formatNumber = (
  value: number | string,
  { locale = DEFAULT_LOCALE, useGrouping = false, ...options }: FormatNumberOptions,
): string => {
  return Number(value).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    minimumIntegerDigits: 1,
    useGrouping,
    ...options,
  })
}

export const formatRelativeDate = (
  value: Date | string | number,
  { locale, now }: FormatRelativeDateOptions,
): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const startOfUtcDay = (current: Date) =>
    Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate())
  const days = Math.max(0, Math.floor((startOfUtcDay(now) - startOfUtcDay(date)) / DAY_IN_MS))

  if (days >= 365) {
    return new Intl.DateTimeFormat(locale.startsWith('ar') ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date)
  }

  const [amount, unit] =
    days < 7
      ? [days, 'day' as const]
      : days < 28
        ? [Math.floor(days / 7), 'week' as const]
        : [Math.max(1, Math.floor(days / 30)), 'month' as const]

  if (!locale.startsWith('ar')) {
    return new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' }).format(-amount, unit)
  }

  if (unit === 'day') {
    if (amount === 0) return 'النهارده'
    if (amount === 1) return 'إمبارح'
    if (amount === 2) return 'من يومين'
    return `من ${formatNumber(amount, { locale })} أيام`
  }

  if (unit === 'week') {
    if (amount === 1) return 'من أسبوع'
    if (amount === 2) return 'من أسبوعين'
    return `من ${formatNumber(amount, { locale })} أسابيع`
  }

  if (amount === 1) return 'من شهر'
  if (amount === 2) return 'من شهرين'
  return `من ${formatNumber(amount, { locale })} شهور`
}

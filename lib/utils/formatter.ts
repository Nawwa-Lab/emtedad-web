import { DEFAULT_LOCALE } from '@/types/constants'

type FormatNumberOptions = Intl.NumberFormatOptions & { locale?: string }

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

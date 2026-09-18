import type { Locale } from '@/types'

import ar from '@/i18n/dictionary/ar.json'
import en from '@/i18n/dictionary/en.json'
import { getLocale } from 'next-intl/server'

const dictionaries = { ar, en } as const

export type Dictionary = (typeof dictionaries)[Locale]

export const getDictionary = async (): Promise<Dictionary> => {
  const locale = (await getLocale()) as Locale

  return dictionaries[locale] ?? dictionaries.en
}

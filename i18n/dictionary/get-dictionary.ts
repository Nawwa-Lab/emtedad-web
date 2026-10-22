import type { Locale } from '@/types'

import { getLocale } from 'next-intl/server'

import { dictionaries } from '.'

export type Dictionary = (typeof dictionaries)[Locale]

export const getDictionary = async (): Promise<Dictionary> => {
  const locale = (await getLocale()) as Locale

  return dictionaries[locale] ?? dictionaries.en
}

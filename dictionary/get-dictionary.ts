import type { Locale } from "@/types";

import ar from "@/dictionary/ar.json";
import en from "@/dictionary/en.json";

const dictionaries = { ar, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	return dictionaries[locale] ?? dictionaries.en;
};

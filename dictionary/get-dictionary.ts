import type { Locale } from "@/types";

const dictionaries = {
	en: () => import("@/dictionary/en.json").then((module) => module.default),
	ar: () => import("@/dictionary/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
	const loadDictionary = dictionaries[locale] ?? dictionaries.en;
	return await loadDictionary();
};

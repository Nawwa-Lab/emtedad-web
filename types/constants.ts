export const LANGUAGES_READONLY = [
	{ label: "English", code: "en" },
	{ label: "العربية", code: "ar", rtl: true },
] as const;

export const LANGUAGES = [...LANGUAGES_READONLY];
export const DEFAULT_LOCALE = "ar";

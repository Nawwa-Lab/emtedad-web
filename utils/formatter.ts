import { DEFAULT_LOCALE } from "@/types/constants";

export const formatNumber = (
	value: number | string,
	{ locale = DEFAULT_LOCALE }: { locale?: string },
): string => {
	return Number(value).toLocaleString(locale === "ar" ? "ar-SA" : "en-US", {
		minimumIntegerDigits: 1,
	});
};

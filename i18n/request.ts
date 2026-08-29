import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async () => {
	const paramValue = await rootParams.lang();
	const locale =
		paramValue && hasLocale(routing.locales, paramValue)
			? paramValue
			: routing.defaultLocale;

	return {
		locale,
		messages: (await import(`./dictionary/${locale}.json`)).default,
	};
});

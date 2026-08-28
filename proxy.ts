import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { flagKeys } from "./lib/flags";
import { getOpenFeatureClient } from "./lib/openfeature";
import type { Locale } from "./types";

const locales = routing.locales as readonly string[];
const defaultLocale = routing.defaultLocale;

function hasLocalePrefix(pathname: string): Locale | undefined {
	const first = pathname.split("/")[1];
	if (locales.includes(first)) return first as Locale;
	return undefined;
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const locale = hasLocalePrefix(pathname);

	let multiLanguage = true;
	try {
		const client = await getOpenFeatureClient();
		multiLanguage = await client.getBooleanValue("multi-language", false, {
			targetingKey: "session",
		});
	} catch {
		// flagd unreachable → default to multi-language on
	}

	if (!multiLanguage && locale && locale !== defaultLocale) {
		const rest = pathname.slice(`/${locale}`.length);
		const url = request.nextUrl.clone();
		url.pathname = `/${defaultLocale}${rest}`;
		return NextResponse.redirect(url);
	}

	const intlMiddleware = createMiddleware(routing);
	const response = await intlMiddleware(request);

	for (const key of flagKeys) {
		if (key === "multi-language") {
			response.headers.set(`x-flag-${key}`, String(multiLanguage));
		}
	}
	return response;
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

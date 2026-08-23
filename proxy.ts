import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LANGUAGES } from "./types/constants";
import { NextRequest } from "next/server";

const locales = LANGUAGES.map((lang) => lang.code);

export function proxy(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	//   const locale = getLocale(request)

	request.nextUrl.pathname = `/${DEFAULT_LOCALE}/${pathname.split("/").slice(1).join("/")}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

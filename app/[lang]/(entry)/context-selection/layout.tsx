import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import { Locale } from "@/types";
import { pick } from "lodash";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.contextSelection.metaTitle,
		description: dict.contextSelection.metaDescription,
	};
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
	const messages = await getMessages();
	
	return (
		<NextIntlClientProvider messages={pick(messages, ["contextSelection"])}>
			{children}
		</NextIntlClientProvider>
	);
}

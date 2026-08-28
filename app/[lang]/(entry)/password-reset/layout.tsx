import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import { Locale } from "@/types";
import type { Metadata } from "next";

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.passwordReset.metaTitle,
		description: dict.passwordReset.metaDescription,
	};
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
	return children;
}

import { getDictionary } from "@/dictionary/get-dictionary";
import type { Locale } from "@/types";

export async function generateStaticParams() {
	return [{ lang: "ar" }, { lang: "en" }];
}

export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<div>
			<h1>home</h1>
		</div>
	);
}

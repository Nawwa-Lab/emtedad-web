import type { Locale } from "@/types";
import ContextSelectionClient from "./context-selection-client";
import { getDictionary } from "@/i18n/dictionary/get-dictionary";

export default async function ContextSelectionPage({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const name = "عمر";

	return (
		<div className='relative w-[min(680px,94vw)] text-center'>
			<h1 className='font-display font-bold text-[27px]/[1.6]'>
				{dict.contextSelection.title.replace("{name}", name)}
			</h1>
			<p className='font-cairo font-semibold text-[15px] text-ink-soft mt-1.5 mb-7'>
				{dict.contextSelection.subtitle}
			</p>
			<ContextSelectionClient />

			<p className='font-cairo font-semibold text-[12.5px]/[1.9] text-ink-soft mt-4'>
				{dict.contextSelection.note}
			</p>
		</div>
	);
}

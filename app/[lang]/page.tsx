import { getDictionary } from "@/dictionary/get-dictionary";
import type { Locale } from "@/types";



export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return <div>
		<h1 className="text-3xl font-bold underline text-gold">Hello world!</h1>
		<h2 className="font-cairo">hello from cairo</h2>
		<h3 className="font-alex">hello from بيس</h3>
		</div>;
}

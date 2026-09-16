import { redirect } from "@/i18n/navigation";

export default async function GennyPage({ params }: { params: { lang: string } }) {
    const { lang } = await params;

    redirect(
        {
            locale: lang,
            href: "/genny/browse",
        }
    )

}
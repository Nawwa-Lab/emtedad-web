import { redirect } from "@/i18n/navigation";

export default async function NamliyaBrowsePage({ params }: { params: { lang: string } }) {
    const { lang } = await params;

    redirect(
        {
            locale: lang,
            href: "/namliya/service-offers",
        }
    )

}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import { QuickAction } from "@/components/QuickAction"
import { SupLinks } from "../../../../components/SupLinks";


export default async function NamliyaLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const messages = await getMessages();
    const { lang } = await params;
    const dict = await getDictionary(lang as "ar" | "en");
    const namliya = dict.namliyaBrowse;
    return (
        <NextIntlClientProvider messages={messages}>
            <div className="flex items-baseline gap-2 sm:gap-3.5 flex-wrap mb-1.5">
                <h1 className="font-display font-bold text-[20px] sm:text-[23px] md:text-[26px] leading-normal">
                    {namliya.title}
                </h1>
                <span className="ms-auto">
                    <QuickAction />
                </span>
            </div>
            <p className="font-semibold text-[12.5px] sm:text-[13px] md:text-[13.5px] text-ink-soft mt-1 font-cairo">
                {namliya.description}
            </p>
            <SupLinks
                links={[
                    { href: "/namliya/service-offers", label: namliya.serviceLink },
                    { href: "/namliya/resource-offers", label: namliya.resourceLink },
                ]}
            />
            {children}
        </NextIntlClientProvider>
    );
}

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge, getVariantFromLabel } from "@/components/StatusBadge";
import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import type { Locale } from "@/types";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function SatisfactionIndex({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    // dict.statusBadge is a Record<string, string>, NOT an array.
    // Filter out the "empty" placeholder before rendering.
    const rateEntries = Object.entries(dict.statusBadge).filter(([key]) => key !== "empty");

    return (
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-lg max-h-[85vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5.5">
                    <StatusBadge
                        variant={getVariantFromLabel(dict.statusBadge.veryGood)}
                        label={dict.statusBadge.veryGood}
                        labels={dict.statusBadge}
                        className="w-14 h-14 sm:w-16 sm:h-16 text-[17px] sm:text-[19px] shrink-0"
                    />
                    <DialogTitle className="min-w-0">
                        <span className="font-display font-bold text-[18px] sm:text-[21px] text-ink">
                            {dict.satisfactionIndex.title}
                        </span>
                        <p className="font-semibold text-[12.5px] text-ink-soft mt-2 font-cairo">
                            {dict.satisfactionIndex.rate}
                        </p>
                    </DialogTitle>
                </div>
            </DialogHeader>
            {dict.satisfactionIndex.dialog.map((card, index) => (
                <Card key={index} className="bg-paper py-4 px-3.5 sm:px-4.5 mb-3">
                    <CardHeader className="text-[15px] mb-2.5">
                        {card.header}
                    </CardHeader>
                    {"provider" in card && card.provider && (
                        <CardContent className="flex items-center gap-2.5 py-1.75 px-0 flex-wrap">
                            <span className="font-bold text-[12.5px] text-ink-soft min-w-24 sm:min-w-30 font-cairo">
                                {card.provider}
                            </span>
                            <div className="flex-wrap flex gap-2">
                                {rateEntries.map(([variant, label]) => (
                                    <StatusBadge
                                        key={variant}
                                        variant={getVariantFromLabel(label)}
                                        label={label}
                                        labels={dict.statusBadge}
                                        shape="pill"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    )}
                    {"client" in card && card.client && (
                        <CardContent className="flex items-center gap-2.5 py-1.75 px-0 flex-wrap">
                            <span className="font-bold text-[12.5px] text-ink-soft min-w-24 sm:min-w-30 font-cairo">
                                {card.client}
                            </span>
                            <div className="flex-wrap flex gap-2">
                                {rateEntries.map(([variant, label]) => (
                                    <StatusBadge
                                        key={variant}
                                        variant={getVariantFromLabel(label)}
                                        label={label}
                                        labels={dict.statusBadge}
                                        shape="pill"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    )}
                    {"activities" in card && card.activities && (
                        <CardContent className="flex items-center gap-2.5 py-1.75 px-0 flex-wrap">
                            <span className="font-bold text-[12.5px] text-ink-soft min-w-24 sm:min-w-30 font-cairo">
                                {card.activities}
                            </span>
                            <div className="flex-wrap flex gap-2">
                                {rateEntries.map(([variant, label]) => (
                                    <StatusBadge
                                        key={variant}
                                        variant={getVariantFromLabel(label)}
                                        label={label}
                                        labels={dict.statusBadge}
                                        shape="pill"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    )}
                </Card>
            ))}
            <Card className="bg-paper py-4 px-3.5 sm:px-4.5 mb-3">
                <CardHeader className="text-[15px] mb-2.5">
                    {dict.satisfactionIndex.reviewHeader}
                </CardHeader>
                {dict.satisfactionIndex.reviewContent.map((r, index) => (
                    <CardContent key={index} className="border-b border-b-line-soft py-3.5 px-0">
                        <CardTitle className="flex items-center gap-2.5 gap-y-1.5 mb-1.5 flex-wrap">
                            <Avatar className="w-7.5 h-7.5 bg-sage shrink-0">
                                <AvatarImage src="" />
                                <AvatarFallback className="font-semibold text-[11px] text-ink-soft">
                                    {r.reviewerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-extrabold text-[12.5px] truncate max-w-[45%] sm:max-w-none">
                                {r.reviewerName}
                            </span>
                            <span className="font-semibold text-[11px] text-ink-soft truncate max-w-[35%] sm:max-w-none">
                                {r.exchangeText}
                            </span>
                            <StatusBadge
                                variant={getVariantFromLabel(r.badge)}
                                label={r.badge}
                                labels={dict.statusBadge}
                                shape="pill"
                            />
                        </CardTitle>
                        <CardDescription className="font-medium text-[13px] leading[1.95] text-ink-soft" >
                            {r.reviewText}
                        </CardDescription>
                    </CardContent>
                ))}
            </Card>
        </DialogContent>
    );
}
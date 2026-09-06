import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import type { Locale } from "@/types";
import Link from "next/link";
import { StatusBadge, getVariantFromLabel } from "@/components/rates";


export default async function MemberProfileClient({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const profile = dict["member-profile"];
    const profileOwner = profile.firstCard.name;
    const firstLetter = profileOwner.charAt(0);
    const orgFirstLetter = profile.firstCard.organization.charAt(0);
    const reviewerFirstLetters = profile.thirdCard.review.map(
        (item) => item.reviewerName.charAt(0)
    );


    return (
        <div className="relative w-full max-w-7xl mx-auto flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto m-0">
            <div className="w-full mx-auto box-border m-0 p-0 ">
                {/* first card */}
                <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 px-6.5 sm:px-6.5 py-7 sm:py-7">
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0 w-full sm:w-auto">
                        <Avatar className="text-green-deep  bg-sage w-16 h-16 sm:w-23 sm:h-23  shrink-0">
                            <AvatarImage src='https://github.com/shadcn.pngg' />
                            <AvatarFallback className="font-bold text-[24px] sm:text-[34px]">{firstLetter}</AvatarFallback>
                        </Avatar>
                        <CardContent className="flex-1 min-w-0 box-border p-0 m-0">
                            <span className="font-display font-bold text-[20px] sm:text-[26px] leading-tight block truncate">
                                {profileOwner}
                            </span>
                            <p className="font-semibold font-cairo text-[12px] sm:text-[13.5px] text-ink-soft mt-0.75">
                                {profile.firstCard.role} · <Link href="" className="font-extrabold font-cairo hover:underline text-green-deep">{profile.firstCard.organization}</Link>
                            </p>
                        </CardContent>
                    </div>
                    <Card className="font-bold text-[12px] text-ink-soft bg-paper border border-ink-soft rounded-[999px] py-1.75 px-4 font-cairo self-start sm:self-center shrink-0">
                        {profile.firstCard.completedServices}
                    </Card>
                </Card>

                {/* second card layout wrapper */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-5 items-start">
                    <div className="box-border m-0 p-0 w-full min-w-0">
                        {/* Bio / Skills Card */}
                        <Card className="text-green-deep text-[18px] mb-3 p-4 sm:p-6">
                            <CardTitle className="text-green-deep text-[18px] mb-3">
                                {profile.secondCard.bioTitle}
                            </CardTitle>
                            <CardDescription className="font-medium text-[14px] leading-relaxed text-ink-soft">
                                {profile.secondCard.bioText}
                            </CardDescription>
                            <CardContent className="p-0 mt-4">
                                <Label className="font-extrabold font-cairo text-[13px] text-ink-soft mb-2.5 block">
                                    {profile.secondCard.skillsTitle}
                                </Label>
                                <div className="flex-wrap flex gap-2 box-border">
                                    {profile.secondCard.skills.map((skill, index) => (
                                        <Badge key={index} variant="default">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews Card */}
                        <Card className="p-4 sm:p-6 mb-5 bg-surface border border-line rounded-[22px]">
                            <CardTitle className="text-green-deep text-[18px] mb-3">
                                {profile.thirdCard.reviewsTitle}
                            </CardTitle>
                            {profile.thirdCard.review.map((t, index) => (
                                <CardContent key={index} className="border-b border-line-soft pt-3.5 pb-3 px-0 last:border-b-0">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                            <Avatar className="text-ink-soft w-7.5 h-7.5 rounded-full bg-sage shrink-0">
                                                <AvatarImage src='https://github.com/shadcn.pngg' />
                                                <AvatarFallback className="font-semibold text-[11px]">{reviewerFirstLetters[index]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-extrabold text-[12.5px] font-cairo">
                                                {t.reviewerName}
                                            </span>
                                            <span className="font-semibold text-[11px] text-ink-soft font-cairo">
                                                {t.exchangeText}
                                            </span>
                                            <StatusBadge variant={getVariantFromLabel(t.badge)} label={t.badge} size="pill" labels={dict.statusBadge} />
                                        </div>
                                        <CardDescription className="font-medium text-[13px] text-ink-soft leading-relaxed font-cairo">
                                            {t.reviewText}
                                        </CardDescription>
                                    </div>
                                </CardContent>
                            ))}
                        </Card>
                    </div>

                    {/* Sidebar section */}
                    <aside className="box-border m-0 p-0 w-full">
                        {/* Fourth Card */}
                        <Card className="p-4 sm:p-6 mb-5 bg-surface border border-line rounded-[22px]">
                            <CardHeader className="font-display font-bold text-lg text-green-deep mb-3 p-0">
                                {profile.fourthCard.title}
                            </CardHeader>
                            {profile.fourthCard.overall.map((t, index) => (
                                <CardContent key={index} className="flex items-center gap-3.5 border-b border-line-soft py-3.25 px-0 last:border-b-0">
                                    <StatusBadge variant={getVariantFromLabel(t.rate)} label={t.rate} labels={dict.statusBadge} />
                                    <div>
                                        <span className="block font-extrabold text-[13.5px] font-cairo">
                                            {t.about}
                                        </span>
                                        <span className="font-semibold text-[11.5px] text-ink-soft font-cairo">
                                            {t.totalReviews}
                                        </span>
                                    </div>
                                </CardContent>
                            ))}
                        </Card>

                        {/* Fifth Card */}
                        <Card className="p-4 sm:p-6 bg-surface border border-line rounded-[22px]">
                            <CardHeader className="font-display font-bold text-lg text-green-deep mb-0 p-0">
                                {profile.fifthCard.title}
                            </CardHeader>
                            <CardContent className="flex items-center gap-3.5 py-3.25 px-0 pb-0">
                                <Avatar className="bg-green text-ink w-11 h-11 shrink-0">
                                    <AvatarImage src='https://github.com/shadcn.pngg' />
                                    <AvatarFallback className="font-bold text-[17px]">{orgFirstLetter}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <span className="block font-extrabold text-[13.5px] font-cairo">
                                        {profile.firstCard.organization}
                                    </span>
                                    <Link href="" className="font-bold text-[11.5px] font-cairo hover:underline text-green-deep">
                                        {profile.fifthCard.viewProfile}
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}

import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import type { Locale } from "@/types";
import Image from "next/image";
import orgCover from "@/app/org-cover.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle, CardHeader, CardAction } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InfoCardList } from "@/components/InfoCard";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, getVariantFromLabel } from "@/components/StatusBadge";
import { ServiceListingsCard } from "@/app/[lang]/(dashboard)/organization/[id]/data";
import { SatisfactionIndex } from "@/components/Satisfaction Index";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default async function MemberProfileClient({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const profile = dict["org-profile"];
    const { humanServiceCard, materialResourceCard } = dict.serviceCard;

    return (
        <div className="relative w-full max-w-7xl mx-auto flex-1 overflow-x-hidden overflow-y-auto m-0">
            <div className="w-full mx-auto box-border m-0 p-0">
                {/* first card */}
                <Card className="relative h-32 sm:h-40 lg:h-47.5 bg-green rounded-[22px] overflow-hidden border-none">
                    <Image src={orgCover} alt={"hero"} fill className="absolute inset-0 w-full h-full object-cover" />
                </Card>

                {/* avatar / name / rating row — stacks on mobile, inline from sm up */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-5 -mt-8 sm:-mt-11.5 py-0 px-4 sm:px-7 relative">
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0 w-full sm:w-auto">
                        <Avatar className="text-green-deep bg-sage w-14 h-14 sm:w-16 sm:h-16 lg:w-23 lg:h-23 shrink-0">
                            <AvatarImage src="#" />
                            <AvatarFallback className="font-bold text-[26px] sm:text-[34px]">
                                {profile.firstCard.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <CardContent className="flex-1 min-w-0 box-border p-1.5">
                            <span className="font-display font-bold text-[20px] sm:text-[28px] lg:text-[34px] leading-[1.4] block truncate">
                                {profile.firstCard.name}
                            </span>
                            <p className="font-semibold font-cairo text-[13.5px] text-ink-soft mt-0.5 truncate">
                                {profile.firstCard.role}
                            </p>
                        </CardContent>
                    </div>

                    <Dialog>
                        <DialogTrigger className="w-full sm:w-auto sm:ms-auto">
                            <Card className="bg-surface border-none border-ink rounded-[999px] pr-2.5 pb-2 pl-4.5 gap-2.5 pt-2 flex items-center justify-between sm:justify-start shrink-0 cursor-pointer w-full sm:w-auto">
                                <StatusBadge
                                    variant={getVariantFromLabel(dict.statusBadge.veryGood)}
                                    label={dict.statusBadge.veryGood}
                                    labels={dict.statusBadge}
                                />
                                <CardContent className="block text-start font-semibold text-[11px] text-ink-soft">
                                    <span className="font-extrabold text-[13px] text-ink font-cairo">
                                        {profile.firstCard.rate}
                                    </span>
                                    <span className="block font-semibold text-[11px] text-ink-soft font-cairo">
                                        {profile.firstCard.rateDes}
                                    </span>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <SatisfactionIndex params={params} />
                    </Dialog>
                </div>

                {/* second card layout wrapper */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-5 items-start">
                    <div className="box-border m-0 p-0 w-full min-w-0">
                        <Card className="mb-5 p-4 sm:p-6">
                            <CardTitle className="text-green-deep text-[16px] sm:text-[18px] mb-3">
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
                                        <Badge key={index} variant="outline">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <ServiceListingsCard
                            title={profile.thirdCard.title}
                            link1Label={profile.thirdCard.link1}
                            link2Label={profile.thirdCard.link2}
                            firstHeader={profile.thirdCard.firstHeader}
                            secondHeader={profile.thirdCard.secondHeader}
                            humanServiceCard={humanServiceCard}
                            materialResourceCard={materialResourceCard}
                        />
                    </div>

                    {/* Sidebar section */}
                    <aside className="box-border m-0 p-0 w-full min-w-0">
                        <Card className="p-4 sm:p-6 mb-5 bg-surface border border-line rounded-[22px]">
                            <CardHeader>{profile.fourthCard.title}</CardHeader>
                            <InfoCardList />
                        </Card>

                        <Card className="p-4 sm:p-6 bg-surface border border-line rounded-[22px]">
                            <CardHeader>{profile.fifthCard.title}</CardHeader>
                            {profile.fifthCard.overall.map((t, index) => (
                                <CardContent
                                    key={index}
                                    className="flex items-center gap-3 border-b border-line-soft py-3.25 px-0"
                                >
                                    <Avatar className="text-green-deep bg-sage w-9.5 h-9.5 shrink-0">
                                        <AvatarImage src="#" />
                                        <AvatarFallback className="font-bold text-[14px]">
                                            {t.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <span className="block font-extrabold text-[13px] font-cairo truncate">
                                            {t.name}
                                        </span>
                                        <span className="block font-semibold text-[11px] text-ink-soft font-cairo truncate">
                                            {t.about}
                                        </span>
                                    </div>
                                    <StatusBadge
                                        variant={getVariantFromLabel(t.rate)}
                                        label={t.rate}
                                        labels={dict.statusBadge}
                                        shape="pill"
                                    />
                                </CardContent>
                            ))}
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
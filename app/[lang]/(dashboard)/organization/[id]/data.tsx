'use client'
import { useState, useEffect } from "react";
import { Card, CardHeader, CardAction } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServicesCard";

interface ServiceCardData {
    category: string;
    title: string;
    providerName: string;
    providerRate: string;
    availability: string;
    price: number | string;
    currency: string;
    request: string;
    spotsLeft?: string;
}

interface ServiceListingsCardProps {
    title: string;
    link1Label: string;
    link2Label: string;
    onLink1Click?: () => void;
    onLink2Click?: () => void;
    firstHeader: string;
    secondHeader: string;
    humanServiceCard: ServiceCardData[];
    materialResourceCard: ServiceCardData[];
}

export function ServiceListingsCard({
    title,
    link1Label,
    link2Label,
    onLink1Click,
    onLink2Click,
    firstHeader,
    secondHeader,
    humanServiceCard,
    materialResourceCard,
}: ServiceListingsCardProps) {
    const [activeLink, setActiveLink] = useState<"link1" | "link2">("link1");

    useEffect(() => {
    }, [activeLink]);

    const handleLink1Click = () => {
        setActiveLink("link1");
        onLink1Click?.();
    };

    const handleLink2Click = () => {
        setActiveLink("link2");
        onLink2Click?.();
    };

    const isLink2 = activeLink === "link2";

    const activeClasses =
        "bg-green border-transparent text-ink font-cairo inline-block rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 text-center cursor-pointer";
    const inactiveClasses =
        "bg-surface border border-line text-ink font-cairo inline-block rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 text-center cursor-pointer hover:border-green-deep";

    return (
        <Card className="p-4 sm:p-6 mb-5 bg-surface border border-line rounded-[22px]">
            <CardHeader className="flex flex-col gap-3">
                <span>{title}</span>
                <CardAction className="flex flex-wrap gap-2">
                    <button
                        onClick={handleLink1Click}
                        className={!isLink2 ? activeClasses : inactiveClasses}
                    >
                        {link1Label}
                    </button>
                    <button
                        onClick={handleLink2Click}
                        className={isLink2 ? activeClasses : inactiveClasses}
                    >
                        {link2Label}
                    </button>
                </CardAction>
            </CardHeader>

            <h2 className="font-extrabold text-[13px] text-ink-soft font-cairo mt-4.5 my-0 mb-2.5">
                {firstHeader}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {humanServiceCard.map((card, index) => (
                    <ServiceCard
                        key={index}
                        category={card.category}
                        title={card.title}
                        providerName={card.providerName}
                        providerRate={card.providerRate}
                        availability={card.availability}
                        price={card.price}
                        currency={card.currency}
                        request={card.request}
                        ctaHref="#"
                        {...(isLink2 ? { spotsLeft: card.spotsLeft } : {})}
                    />
                ))}
            </div>

            <h2 className="font-extrabold text-[13px] text-ink-soft font-cairo mt-4.5 my-0 mb-2.5">
                {secondHeader}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materialResourceCard.map((card, index) => (
                    <ServiceCard
                        key={index}
                        category={card.category}
                        title={card.title}
                        providerName={card.providerName}
                        providerRate={card.providerRate}
                        availability={card.availability}
                        price={card.price}
                        currency={card.currency}
                        request={card.request}
                        ctaHref="#"
                        {...(isLink2 ? { spotsLeft: card.spotsLeft } : {})}
                    />
                ))}
            </div>
        </Card>
    );
}
'use client'
import { ServiceCard } from "@/components/ServicesCard";
import { serviceCard, filterButtons } from "./data";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

const ALL_ID = filterButtons.find((b) => b.label === "الكل")?.id ?? "1";
const categoryButtons = filterButtons.filter((b) => b.label !== "الأحدث أولا");
const sortButtons = filterButtons.filter((b) => b.label === "الأحدث أولا");

export default function NamliyaBrowsePage() {
    const [active, setActive] = useState<readonly string[]>([ALL_ID]);

    const handleChange = (values: string[]) => {
        if (values.length === 0) {
            setActive([ALL_ID]);
            return;
        }
        const withoutAll = values.filter((v) => v !== ALL_ID);
        if (values.includes(ALL_ID) && withoutAll.length < values.length) {
            setActive([ALL_ID]);
            return;
        }
        setActive(withoutAll.length > 0 ? withoutAll : [ALL_ID]);
    };

    const filteredServices = serviceCard.filter((card) => {
        if (active.includes(ALL_ID)) return true;
        return active.includes(card.categoryId);
    });

    const chipClass = (id: string) =>
        `inline-block font-cairo border rounded-[999px] font-bold text-[11.5px] sm:text-[12px] py-1.5 sm:py-1.75 px-3 sm:px-3.75 cursor-pointer hover:border-green-deep ${
            active.includes(id)
                ? "bg-green text-ink border-green hover:border-green-deep"
                : "bg-surface border-line text-ink-soft"
        }`;

    return (
        <>
            <div className="mb-3.5 sm:mb-4.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Category filter chips */}
                <ToggleGroup
                    value={active}
                    onValueChange={handleChange}
                    className="flex-wrap"
                >
                    {categoryButtons.map((button) => (
                        <ToggleGroupItem
                            value={button.id}
                            key={button.id}
                            className={chipClass(button.id)}
                        >
                            {button.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>

                {/* Vertical separator */}
                {sortButtons.length > 0 && (
                    <span className="self-stretch w-px bg-line mx-0.5" aria-hidden />
                )}

                {/* Sorting chip(s) */}
                {sortButtons.length > 0 && (
                    <ToggleGroup
                        value={active}
                        onValueChange={handleChange}
                        className="flex-wrap"
                    >
                        {sortButtons.map((button) => (
                            <ToggleGroupItem
                                value={button.id}
                                key={button.id}
                                className={chipClass(button.id)}
                            >
                                {button.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {filteredServices.map((card) => (
                    <ServiceCard
                        key={card.categoryId}
                        category={card.category}
                        title={card.title}
                        providerName={card.providerName}
                        providerRate={card.providerRate}
                        availability={card.availability}
                        price={card.price}
                        currency={card.currency}
                        request={card.request}
                        showStatusBadge={true}
                        showSaveButton
                        ctaHref="#"
                    />
                ))}
            </div>
        </>
    );
}
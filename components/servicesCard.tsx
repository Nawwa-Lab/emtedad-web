'use client'
import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { Heart } from "lucide-react";

const cardStyles = cva("card", {
    variants: {
        variant: {
            default:
                "p-4 flex flex-col gap-[8px] bg-surface border border-line rounded-2xl relative",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type ServiceCardProps = VariantProps<typeof cardStyles> & {
    category: string;
    title: string;
    providerName: string;
    providerRate?: string;
    availability: string;
    price: number | string;
    currency: string;
    request: string;
    spotsLeft?: string;
    ctaHref?: string;
    onRequest?: () => void;
    showSaveButton?: boolean;
    saved?: boolean;
    defaultSaved?: boolean;
    onSaveChange?: (saved: boolean) => void;
};

export function ServiceCard({
    category,
    title,
    providerName,
    providerRate,
    availability,
    price,
    currency,
    request,
    spotsLeft,
    ctaHref = "#",
    onRequest,
    variant,
    showSaveButton = false,
    saved,
    defaultSaved = false,
    onSaveChange,
}: ServiceCardProps) {
    const [internalSaved, setInternalSaved] = useState(defaultSaved);
    const isControlled = saved !== undefined;
    const isSaved = isControlled ? saved : internalSaved;

    const handleSaveClick = () => {
        const next = !isSaved;
        if (!isControlled) setInternalSaved(next);
        onSaveChange?.(next);
    };

    return (
        <div className={cardStyles({ variant })}>
            {showSaveButton && (
                <button
                    type="button"
                    onClick={handleSaveClick}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? "Remove from saved" : "Save"}
                    className="absolute top-3.5 left-3.5 w-8 h-8 rounded-[50%] border border-line bg-paper grid items-center justify-center cursor-pointer"
                >
                    <Heart
                        size={15}
                        strokeWidth={2}
                        fill={isSaved ? "currentColor" : "none"}
                        className={isSaved ? "fill-green-deep stroke-0" : "text-ink-soft"}
                    />
                </button>
            )}

            <span className="self-start font-bold text-[10.5px] text-green-deep bg-green rounded-[999px] py-0.75 px-2.5 font-cairo">
                {category}
            </span>
            <h3 className="font-extrabold text-[14px] leading-[1.65] font-cairo text-ink">
                {title}
            </h3>
            <div className="font-semibold text-[11.5px] text-ink-soft leading-[1.8] font-cairo">
                {providerName}
                {providerRate && ` · ${providerRate}`}
                {availability && ` · ${availability}`}
            </div>
            <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-t-line-soft text-ink font-cairo">
                <span className="font-extrabold text-[15px] font-features-['tnum'] font-cairo text-ink">
                    {price}
                    <small className="font-display font-semibold text-[10.5px] text-gold-deep scroll-ms-0.75 ms-1">
                        {currency}
                    </small>
                </span>
                {spotsLeft && (
                    <span className="font-semibold text-[10.5px] text-ink-soft font-cairo">{spotsLeft}</span>
                )}
                {onRequest ? (
                    <button
                        className="inline-block text-green-deep border border-green-deep bg-transparent rounded-[999px] font-cairo font-bold text-[12.5px] py-2 px-4.5 cursor-pointer hover:bg-green"
                        onClick={onRequest}
                    >
                        {request}
                    </button>
                ) : (
                    <a
                        className="inline-block text-green-deep border border-green-deep bg-transparent rounded-[999px] font-cairo font-bold text-[12.5px] py-2 px-4.5 cursor-pointer hover:bg-green"
                        href={ctaHref}
                    >
                        {request}
                    </a>
                )}
            </div>
        </div >
    );
}
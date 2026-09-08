import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const statusBadgeVariants = cva(
  "rounded-full border inline-flex items-center justify-center font-display shrink-0",
  {
    variants: {
      variant: {
        veryGood: "bg-green border-transparent",
        good: "bg-gold border-transparent",
        acceptable: "bg-transparent border-dashed border-line",
        empty: "bg-transparent border-dashed border-line",
      },
      shape: {
        circle: "",
        pill: "",
      },
      size: {
        default: "",
        small: "",
      },
    },
    compoundVariants: [
      { shape: "circle", variant: ["veryGood", "good", "acceptable", "empty"], class: "text-ink" },
      { shape: "pill", class: "text-ink-soft" },
      { shape: "circle", size: "default", class: "w-13 h-13 font-bold text-[14px]" },
      { shape: "pill", size: "default", class: "gap-1.5 py-1 px-3 font-semibold text-[11px]" },
      { shape: "circle", size: "small", class: "w-5 h-5 font-bold text-[9px]" },
      { shape: "pill", size: "small", class: "gap-1 py-0.5 px-2 font-semibold text-[9px]" },
    ],
    defaultVariants: {
      variant: "empty",
      shape: "circle",
      size: "default",
    },
  }
);

type StatusVariant = NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]>;
type StatusShape = NonNullable<VariantProps<typeof statusBadgeVariants>["shape"]>;
type StatusSize = NonNullable<VariantProps<typeof statusBadgeVariants>["size"]>;

const labels: Record<StatusVariant, string> = {
  veryGood: "عامر",
  good: "كريم",
  acceptable: "أحسن عندك",
  empty: "-",
};

const variantFromLabel: Record<string, StatusVariant> = {
  "كريم": "good",
  "عامر": "veryGood",
  "أحسن عندك": "acceptable",
  "Epic": "veryGood",
  "Good": "good",
  "Fair": "acceptable",
  "Kareem": "good",
  "Amer": "veryGood",
  "veryGood": "veryGood",
  "good": "good",
  "acceptable": "acceptable",
  "empty": "empty",
};

export function getVariantFromLabel(label?: string | null): StatusVariant {
  if (!label) return "empty";
  return variantFromLabel[label] ?? variantFromLabel[label.trim()] ?? "empty";
}

interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof statusBadgeVariants> {
  variant?: StatusVariant;
  shape?: StatusShape;
  size?: StatusSize;
  /** Override the default label for this variant */
  label?: string;
  /** Pass localized labels from the dictionary */
  labels?: Record<StatusVariant, string>;
}

export function StatusBadge({
  variant = "empty",
  shape = "circle",
  size = "default",
  label,
  labels: labelsProp,
  className,
  ...props
}: StatusBadgeProps) {
  const badgeLabels = labelsProp ?? labels;
  const fullLabel = label ?? badgeLabels[variant];

  // "small" is too tight for the full label — show just the first
  // character (Array.from so Arabic/multi-byte chars aren't cut mid-glyph).
  const displayLabel =
    size === "small" ? Array.from(fullLabel ?? "").slice(0, 1).join("") : fullLabel;

  return (
    <div
      className={statusBadgeVariants({ variant, shape, size, className })}
      {...props}
    >
      {displayLabel}
    </div>
  );
}
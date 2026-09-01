import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const statusBadgeVariants = cva(
  "rounded-full border inline-flex items-center justify-center font-display shrink-0",
  {
    variants: {
      variant: {
        veryGood: "bg-green border-transparent",
        good: "bg-gold border-transparent",
        acceptable: "bg-transparent border-line",
        empty: "bg-transparent border-dashed border-line",
      },
      size: {
        circle: "w-13 h-13 font-bold text-[14px]",
        pill: "gap-1.5 py-1 px-3 font-semibold text-[11px]",
      },
    },
    compoundVariants: [
      { size: "circle", variant: ["veryGood", "good", "acceptable"], class: "text-ink" },
      { size: "circle", variant: "empty", class: "text-line" },
      { size: "pill", class: "text-ink-soft" },
    ],
    defaultVariants: {
      variant: "empty",
      size: "circle",
    },
  }
);

type StatusVariant = NonNullable<VariantProps<typeof statusBadgeVariants>["variant"]>;
type StatusSize = NonNullable<VariantProps<typeof statusBadgeVariants>["size"]>;

const labels: Record<StatusVariant, string> = {
  veryGood: "عامر",
  good: "كريم",
  acceptable: "أحسن عندك",
  empty: "-",
};

const variantFromLabel: Record<string, StatusVariant> = {
  // Arabic values
  "كريم": "good",
  "عامر": "veryGood",
  "أحسن عندك": "acceptable",
  // English values
  "Kareem": "good",
  "Amer": "veryGood",
  "Fair": "acceptable",
  "Good": "good",
  "Excellent": "veryGood",
};

export function getVariantFromLabel(label?: string | null): StatusVariant {
  if (!label) return "empty";
  return variantFromLabel[label] ?? "empty";
}

interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof statusBadgeVariants> {
  variant?: StatusVariant;
  size?: StatusSize;
  /** Override the default label for this variant */
  label?: string;
  /** Pass localized labels from the dictionary */
  labels?: Record<StatusVariant, string>;
}

export function StatusBadge({
  variant = "empty",
  size = "circle",
  label,
  labels: labelsProp,
  className,
  ...props
}: StatusBadgeProps) {
  const badgeLabels = labelsProp ?? labels;
  return (
    <div
      className={statusBadgeVariants({ variant, size, className })}
      {...props}
    >
      {label ?? badgeLabels[variant]}
    </div>
  );
}


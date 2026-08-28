import type { Locale } from "@/types";

export const flagKeys = ["multi-language"] as const;
export type FlagKey = (typeof flagKeys)[number];

export const flagDefaults: Record<FlagKey, boolean> = {
  "multi-language": true,
};

export type FlagEvaluationContext = {
  targetingKey: string;
  locale: Locale;
};

import { cache } from "react";
import { headers } from "next/headers";
import { flagDefaults, type FlagKey } from "./flags";

export const getFlags = cache(async (): Promise<Record<FlagKey, boolean>> => {
  const h = await headers();
  const result = { ...flagDefaults };

  for (const key of Object.keys(flagDefaults) as FlagKey[]) {
    const raw = h.get(`x-flag-${key}`);
    if (raw === "true") result[key] = true;
    else if (raw === "false") result[key] = false;
  }

  return result;
});

export async function getFlag(key: FlagKey): Promise<boolean> {
  const flags = await getFlags();
  return flags[key];
}

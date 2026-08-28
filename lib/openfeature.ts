import { OpenFeature } from "@openfeature/server-sdk";
import { FlagdProvider } from "@openfeature/flagd-provider";

let initialized = false;

async function init() {
  if (initialized) return;

  const provider = new FlagdProvider({
    host: process.env.FLAGD_HOST ?? "localhost",
    port: Number(process.env.FLAGD_PORT ?? 8013),
  });

  await OpenFeature.setProviderAndWait(provider);
  initialized = true;
}

export async function getOpenFeatureClient() {
  await init();
  return OpenFeature.getClient();
}

import { LANGUAGES_READONLY } from "./constants";

export type Locale = (typeof LANGUAGES_READONLY)[number]["code"];

import { activeLocales, defaultLocale } from "@/i18n/config.js";

export function getActiveLocale(locale) {
  return activeLocales.includes(locale) ? locale : defaultLocale;
}

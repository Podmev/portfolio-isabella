import { activeLocales, defaultLocale } from "@/i18n/config.js";

export function getActiveLocale(locale) {
  return activeLocales.includes(locale) ? locale : defaultLocale;
}

export function withActiveLocalePath(path = "/", locale = defaultLocale) {
  const activeLocale = getActiveLocale(locale);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (activeLocale === defaultLocale) {
    return normalizedPath;
  }

  return `/${activeLocale}${normalizedPath}`;
}

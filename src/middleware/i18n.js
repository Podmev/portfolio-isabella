import createMiddleware from "next-intl/middleware";

import { activeLocales, defaultLocale } from "@/i18n/config.js";

const intlMiddleware = createMiddleware({
  locales: activeLocales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export function handleI18n(request) {
  return intlMiddleware(request);
}

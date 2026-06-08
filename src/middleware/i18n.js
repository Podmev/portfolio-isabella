import createMiddleware from "next-intl/middleware";

import { defaultLocale, supportedLocales } from "@/i18n/config.js";

const intlMiddleware = createMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export function handleI18n(request) {
  return intlMiddleware(request);
}

import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { activeLocales, defaultLocale, supportedLocales } from "@/i18n/config.js";

const intlMiddleware = createMiddleware({
  locales: activeLocales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});

export function handleI18n(request) {
  const { pathname } = request.nextUrl;
  const [, firstSegment = "", ...restSegments] = pathname.split("/");

  if (supportedLocales.includes(firstSegment) && !activeLocales.includes(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${restSegments.filter(Boolean).join("/")}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

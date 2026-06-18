"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { activeLocales, localeNames } from "@/i18n/config.js";

export default function FooterLocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (activeLocales.length <= 1) return null;

  function changeLocale(nextLocale) {
    if (!nextLocale || nextLocale === locale) return;
    const segments = (pathname || `/${locale}`).split("/");
    if (activeLocales.includes(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    const query = searchParams?.toString?.();
    router.push(`${segments.join("/") || `/${nextLocale}`}${query ? `?${query}` : ""}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{t("footerLanguageLabel")}</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value)}
        className="h-9 rounded-full border border-border bg-card px-3 text-sm text-foreground outline-none transition hover:bg-secondary"
      >
        {activeLocales.map((item) => (
          <option key={item} value={item}>{localeNames[item] || item.toUpperCase()}</option>
        ))}
      </select>
    </label>
  );
}

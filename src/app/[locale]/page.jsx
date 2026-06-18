import { notFound } from "next/navigation";

import { activeLocales, defaultLocale } from "@/i18n/config.js";
import { createTranslator } from "@/i18n/messages.js";
import { getPortfolioData } from "@/lib/copyVortexClient.js";
import PortfolioHome from "@/components/sections/PortfolioHome.jsx";

export const dynamic = "force-dynamic";

function resolveSupportedLocale(value) {
  const locale = value || defaultLocale;
  return activeLocales.includes(locale) ? locale : null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);
  const t = createTranslator(locale || defaultLocale);

  if (!locale) {
    return {
      title: t("portfolioFallbackTitle"),
      description: t("portfolioFallbackDescription"),
    };
  }

  const portfolio = await getPortfolioData({ locale });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || t("writerFallbackName");

  return {
    title: `${name} | ${t("portfolioMetaSuffix")}`,
    description: profile.headline || t("portfolioMetaDescription"),
  };
}

export default async function LocaleHomePage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) notFound();

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });

  return <PortfolioHome portfolio={portfolio} />;
}

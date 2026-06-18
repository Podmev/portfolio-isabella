import { notFound } from "next/navigation";

import { activeLocales, defaultLocale } from "@/i18n/config.js";
import { createTranslator } from "@/i18n/messages.js";
import { getPortfolioData } from "@/lib/copyVortexClient.js";
import PortfolioNichePage from "@/components/sections/PortfolioNichePage.jsx";

export const dynamic = "force-dynamic";

function resolveSupportedLocale(value) {
  const locale = value || defaultLocale;
  return activeLocales.includes(locale) ? locale : null;
}

function getFilterValue(searchParams = {}) {
  const value = searchParams.industry || searchParams.niche || "";
  return Array.isArray(value) ? value[0] : value;
}

function getNicheLabel(portfolio, slug, t) {
  if (!slug) return t("portfolioWorksMetaTitle");
  const niches = portfolio?.niches || portfolio?.tags?.niches || [];
  const match = niches.find((niche) => niche?.slug === slug);
  return match?.label || slug.replace(/[-_]+/g, " ");
}

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);
  const t = createTranslator(locale || defaultLocale);

  if (!locale) {
    return {
      title: t("portfolioWorksFallbackTitle"),
      description: t("portfolioWorksFallbackDescription"),
    };
  }

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || t("writerFallbackName");
  const filter = getFilterValue(resolvedSearchParams);
  const label = getNicheLabel(portfolio, filter, t);

  return {
    title: filter ? `${t("portfolioWorksFilteredMetaTitle", { label })} | ${name}` : `${t("portfolioWorksMetaTitle")} | ${name}`,
    description: filter
      ? t("portfolioWorksFilteredMetaDescription", { label, name })
      : profile.headline || t("portfolioWorksMetaDescription", { name }),
  };
}

export default async function PortfolioRoute({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) notFound();

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });

  return <PortfolioNichePage portfolio={portfolio} searchParams={resolvedSearchParams} />;
}

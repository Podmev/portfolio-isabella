import { notFound } from "next/navigation";
import PortfolioNichePage from "@/components/sections/PortfolioNichePage.jsx";
import { defaultLocale, getPortfolioData, supportedLocales } from "@/lib/copyVortexClient.js";

export const dynamic = "force-dynamic";

function resolveSupportedLocale(value) {
  const locale = value || defaultLocale;
  return supportedLocales.includes(locale) ? locale : null;
}

function getFilterValue(searchParams = {}) {
  const value = searchParams.industry || searchParams.niche || "";
  return Array.isArray(value) ? value[0] : value;
}

function getNicheLabel(portfolio, slug) {
  if (!slug) return "Portfolio works";
  const niches = portfolio?.niches || portfolio?.tags?.niches || [];
  const match = niches.find((niche) => niche?.slug === slug);
  return match?.label || slug.replace(/[-_]+/g, " ");
}

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) {
    return {
      title: "Portfolio works",
      description: "Selected public portfolio works.",
    };
  }

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || "Writer";
  const filter = getFilterValue(resolvedSearchParams);
  const label = getNicheLabel(portfolio, filter);

  return {
    title: filter ? `${label} works | ${name}` : `Portfolio works | ${name}`,
    description: filter
      ? `Selected public ${label} works by ${name}.`
      : profile.headline || `Selected public portfolio works by ${name}.`,
  };
}

export default async function PortfolioRoute({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) notFound();

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });

  return <PortfolioNichePage portfolio={portfolio} locale={locale} searchParams={resolvedSearchParams} />;
}

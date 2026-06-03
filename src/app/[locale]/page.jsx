import { notFound } from "next/navigation";
import PortfolioHome from "@/components/sections/PortfolioHome.jsx";
import { defaultLocale, getPortfolioData, supportedLocales } from "@/lib/copyVortexClient.js";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

function resolveSupportedLocale(value) {
  const locale = value || defaultLocale;
  return supportedLocales.includes(locale) ? locale : null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) {
    return {
      title: "Portfolio",
      description: "Writer portfolio.",
    };
  }

  const portfolio = await getPortfolioData({ locale });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || "Writer";

  return {
    title: `${name} | Portfolio`,
    description: profile.headline || "Copywriting, editing, translation, and selected portfolio works.",
  };
}

export default async function LocaleHomePage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) notFound();

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });

  return <PortfolioHome portfolio={portfolio} locale={locale} />;
}

import { notFound } from "next/navigation";
import PortfolioHome from "@/components/sections/PortfolioHome.jsx";
import { defaultLocale, getPortfolioData, supportedLocales } from "@/lib/copyVortexClient.js";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || defaultLocale;
  const portfolio = await getPortfolioData({ locale });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || "Isabella Camardella";

  return {
    title: `${name} | Portfolio`,
    description: profile.headline || "Copywriting, editing, translation, and selected portfolio works.",
  };
}

export default async function LocaleHomePage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || defaultLocale;

  if (!supportedLocales.includes(locale)) notFound();

  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale, searchParams: resolvedSearchParams });

  return <PortfolioHome portfolio={portfolio} locale={locale} />;
}

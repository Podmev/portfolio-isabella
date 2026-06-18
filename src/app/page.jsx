import { NextIntlClientProvider } from "next-intl";

import { defaultLocale } from "@/i18n/config.js";
import { createTranslator, getMessages } from "@/i18n/messages.js";
import { getPortfolioData } from "@/lib/copyVortexClient.js";
import LocaleDocumentSync from "@/components/LocaleDocumentSync.jsx";
import PortfolioHome from "@/components/sections/PortfolioHome.jsx";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = createTranslator(defaultLocale);
  const portfolio = await getPortfolioData({ locale: defaultLocale });
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || t("writerFallbackName");

  return {
    title: `${name} | ${t("portfolioMetaSuffix")}`,
    description: profile.headline || t("portfolioMetaDescription"),
  };
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const portfolio = await getPortfolioData({ locale: defaultLocale, searchParams: resolvedSearchParams });

  return (
    <NextIntlClientProvider locale={defaultLocale} messages={getMessages(defaultLocale)}>
      <LocaleDocumentSync />
      <PortfolioHome portfolio={portfolio} />
    </NextIntlClientProvider>
  );
}

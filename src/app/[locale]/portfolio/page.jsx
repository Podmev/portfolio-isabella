import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LayoutGrid } from "lucide-react";

import { activeLocales, defaultLocale } from "@/i18n/config.js";
import { createTranslator } from "@/i18n/messages.js";
import { withActiveLocalePath } from "@/i18n/publicLocale.js";
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

function formatSlugLabel(value = "") {
  return String(value || "")
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function SkeletonPill({ className = "" }) {
  return <div className={`rounded-full bg-muted ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
      <div className="aspect-[1.35/1] bg-muted" />
      <div className="flex flex-1 flex-col p-5">
        <SkeletonPill className="h-3 w-24" />
        <div className="mt-4 space-y-2">
          <SkeletonPill className="h-5 w-11/12" />
          <SkeletonPill className="h-5 w-3/4" />
        </div>
        <div className="mt-5 space-y-2">
          <SkeletonPill className="h-3 w-full" />
          <SkeletonPill className="h-3 w-5/6" />
        </div>
        <div className="mt-auto flex gap-2 pt-6">
          <SkeletonPill className="h-7 w-20" />
          <SkeletonPill className="h-7 w-24" />
        </div>
      </div>
    </div>
  );
}

function PortfolioResultsFallback() {
  return (
    <section id="works" className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            Loading works
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonPill key={item} className="h-10 w-24" />
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioHeader({ locale, filter, t }) {
  const label = filter ? formatSlugLabel(filter) : "";
  const title = filter ? t("portfolioPageFilteredTitle", { label }) : t("portfolioPageSelectedTitle");

  return (
    <section className="border-b border-border bg-surface-alt py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Link
            href={withActiveLocalePath("/", locale)}
            className="inline-flex items-center gap-1.5 transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("portfolioPageBack")}
          </Link>
          {filter ? (
            <Link
              href={withActiveLocalePath("/portfolio", locale)}
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <LayoutGrid className="h-4 w-4" />
              {t("portfolioPageAllWorks")}
            </Link>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
            {t("portfolioPageEyebrow")}
          </p>
          <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{title}</h1>
        </div>
      </div>
    </section>
  );
}

async function PortfolioResults({ locale, searchParams }) {
  const portfolio = await getPortfolioData({ locale, searchParams });
  return <PortfolioNichePage portfolio={portfolio} searchParams={searchParams} />;
}

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);
  const t = createTranslator(locale || defaultLocale);
  const resolvedSearchParams = await searchParams;
  const filter = getFilterValue(resolvedSearchParams);
  const label = formatSlugLabel(filter);

  return {
    title: filter ? t("portfolioWorksFilteredMetaTitle", { label }) : t("portfolioWorksMetaTitle"),
    description: filter
      ? t("portfolioWorksFilteredMetaDescription", { label, name: t("writerFallbackName") })
      : t("portfolioWorksMetaDescription", { name: t("writerFallbackName") }),
  };
}

export default async function PortfolioRoute({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolveSupportedLocale(resolvedParams?.locale);

  if (!locale) notFound();

  const resolvedSearchParams = await searchParams;
  const filter = getFilterValue(resolvedSearchParams);
  const t = createTranslator(locale);

  return (
    <>
      <PortfolioHeader locale={locale} filter={filter} t={t} />
      <Suspense fallback={<PortfolioResultsFallback />}>
        <PortfolioResults locale={locale} searchParams={resolvedSearchParams} />
      </Suspense>
    </>
  );
}

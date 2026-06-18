"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import Footer from "@/components/Footer.jsx";
import Section from "@/components/sections/Section.jsx";
import { WorkCard } from "@/components/sections/WorksSection.jsx";
import { getActiveLocale, withActiveLocalePath } from "@/i18n/publicLocale.js";

function getNiches(portfolio) {
  return portfolio?.niches || portfolio?.tags?.niches || [];
}

function getNicheSlug(searchParams = {}) {
  const value = searchParams.industry || searchParams.niche || "";
  return Array.isArray(value) ? value[0] : value;
}

export default function PortfolioNichePage({ portfolio, searchParams = {} }) {
  const locale = getActiveLocale(useLocale());
  const t = useTranslations();
  const [pendingSlug, setPendingSlug] = useState("");
  const works = portfolio?.works || [];
  const niches = getNiches(portfolio).filter((niche) => niche?.slug);
  const activeSlug = getNicheSlug(searchParams);
  const isLoadingNiche = Boolean(pendingSlug && pendingSlug !== activeSlug);

  useEffect(() => {
    setPendingSlug("");
  }, [activeSlug]);

  return (
    <>
      <Section id="works" sectionClassName="py-12 md:py-16">
        {niches.length ? (
          <div className="mb-8 flex flex-col items-center gap-5">
            {isLoadingNiche ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
                Loading works
              </div>
            ) : null}

            <div className="flex flex-wrap justify-center gap-2">
              {niches.slice(0, 18).map((niche) => {
                const isActive = niche.slug === activeSlug;
                const isPending = niche.slug === pendingSlug && pendingSlug !== activeSlug;

                return (
                  <Link
                    key={niche.slug}
                    href={withActiveLocalePath(`/portfolio?industry=${encodeURIComponent(niche.slug)}`, locale)}
                    onClick={() => {
                      if (!isActive) setPendingSlug(niche.slug);
                    }}
                    aria-busy={isPending}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    } ${isPending ? "pointer-events-none opacity-85" : ""}`}
                  >
                    {isPending ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
                    ) : null}
                    {niche.label || niche.slug}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {works.length ? (
          <div className={`grid gap-6 transition duration-200 sm:grid-cols-2 lg:grid-cols-3 ${isLoadingNiche ? "pointer-events-none opacity-45 blur-[1px]" : ""}`}>
            {works.map((work) => <WorkCard key={work.id || work.slug} work={work} />)}
          </div>
        ) : (
          <div className="rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">
            {t("portfolioPageEmpty")}
          </div>
        )}
      </Section>
      <Footer portfolio={portfolio} />
    </>
  );
}

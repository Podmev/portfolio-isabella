"use client";

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

function getNicheLabel(niches, slug, t) {
  if (!slug) return t("portfolioWorksMetaTitle");
  const match = niches.find((niche) => niche?.slug === slug);
  return match?.label || slug.replace(/[-_]+/g, " ");
}

function getName(portfolio, fallback) {
  return portfolio?.profile?.publicName || portfolio?.user?.name || fallback;
}

export default function PortfolioNichePage({ portfolio, searchParams = {} }) {
  const locale = getActiveLocale(useLocale());
  const t = useTranslations();
  const works = portfolio?.works || [];
  const niches = getNiches(portfolio).filter((niche) => niche?.slug);
  const activeSlug = getNicheSlug(searchParams);
  const activeLabel = getNicheLabel(niches, activeSlug, t);
  const name = getName(portfolio, t("writerFallbackName"));
  const title = activeSlug ? t("portfolioPageFilteredTitle", { label: activeLabel }) : t("portfolioPageSelectedTitle");
  const subtitle = activeSlug ? "" : t("portfolioPageSelectedSubtitle", { name });

  return (
    <>
      <Section className="border-b border-border bg-surface-alt" sectionClassName="py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
            {t("portfolioPageEyebrow")}
          </p>
          <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{title}</h1>
          {subtitle ? (
            <p className="mt-5 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">{subtitle}</p>
          ) : null}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <a
              href={withActiveLocalePath("/", locale)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
            >
              {t("portfolioPageBack")}
            </a>
            {activeSlug ? (
              <a
                href={withActiveLocalePath("/portfolio", locale)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
              >
                {t("portfolioPageAllWorks")}
              </a>
            ) : null}
          </div>
        </div>
      </Section>

      <Section id="works" sectionClassName="py-12 md:py-16">
        {niches.length ? (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {niches.slice(0, 18).map((niche) => {
              const isActive = niche.slug === activeSlug;
              return (
                <a
                  key={niche.slug}
                  href={withActiveLocalePath(`/portfolio?industry=${encodeURIComponent(niche.slug)}`, locale)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {niche.label || niche.slug}
                </a>
              );
            })}
          </div>
        ) : null}

        {works.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

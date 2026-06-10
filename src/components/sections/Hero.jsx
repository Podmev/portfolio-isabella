"use client";

import { useTranslations } from "next-intl";
import { Dancing_Script, Forum } from "next/font/google";

import Section from "@/components/sections/Section.jsx";
import PortfolioPortrait from "@/components/sections/PortfolioPortrait.jsx";
import { formatWorkLocation } from "@/lib/profileWorkLocation.js";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const forum = Forum({
  subsets: ["latin"],
  weight: ["400"],
});

function getHeroImage(portfolio) {
  const profile = portfolio?.profile || {};
  return profile.showcaseImages?.[0]?.url || profile.bannerImage || portfolio?.user?.image || "";
}

function getLanguageCode(language) {
  if (!language) return "";
  if (typeof language === "string") return language;
  return language.code || language.locale || language.value || language.slug || "";
}

function getLanguageBase(language) {
  const code = getLanguageCode(language).trim().toLowerCase();
  if (!code) return "";
  return code.split(/[-_]/)[0];
}

function countLanguageGroups(languages = []) {
  return new Set(languages.map(getLanguageBase).filter(Boolean)).size;
}

export default function Hero({ portfolio }) {
  const t = useTranslations();
  const profile = portfolio?.profile || {};
  const user = portfolio?.user || {};
  const name = profile.publicName || user.name || t("writerFallbackName");
  const headline = profile.headline || t("heroFallbackHeadline");
  const bio = profile.bio || profile.portfolioIntro || t("heroFallbackBio");
  const worksCount = portfolio?.summary?.totalPublicWorks || portfolio?.works?.length || 0;
  const nichesCount = portfolio?.summary?.totalPublicNiches || portfolio?.niches?.length || 0;
  const languageCount = countLanguageGroups(profile.languages) || countLanguageGroups(portfolio?.tags?.languages) || 0;
  const workLocation = formatWorkLocation(profile.workLocation, t);

  return (
    <Section sectionClassName="pt-10 pb-10 md:pb-16" className="section-soft-gradient">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-7">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
            {headline}
          </p>

          <h1 className={`${dancingScript.className} max-w-3xl text-center text-4xl leading-[0.92] sm:text-5xl md:text-6xl lg:text-7xl`}>
            {name}
          </h1>

          <p className={`${forum.className} max-w-xl text-justify text-sm leading-5 text-muted-foreground sm:text-base sm:leading-6 md:text-lg md:leading-7`}>
            {bio}
          </p>

          <div className="grid gap-3 text-center sm:grid-cols-3 sm:text-left">
            <div className="rounded-[18px] border border-border bg-card/70 px-4 py-3">
              <p className="text-2xl font-semibold">{worksCount}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("heroWorks")}</p>
            </div>
            <div className="rounded-[18px] border border-border bg-card/70 px-4 py-3">
              <p className="text-2xl font-semibold">{nichesCount}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("heroNiches")}</p>
            </div>
            <div className="rounded-[18px] border border-border bg-card/70 px-4 py-3">
              <p className="text-2xl font-semibold">{languageCount}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("heroLanguages")}</p>
            </div>
          </div>

          {workLocation ? (
            <div className="rounded-[18px] border border-border bg-card/70 px-4 py-3 text-center sm:text-left">
              <p className="text-sm font-semibold">{workLocation}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("heroWorkLocation")}</p>
            </div>
          ) : null}

          <div className="flex gap-5 md:pt-1">
            <a href="#portfolio" className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:flex-none sm:px-6">
              {t("heroViewPortfolio")}
            </a>
            <a href="#contact" className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition hover:bg-secondary sm:flex-none sm:px-6">
              {t("heroContactMe")}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-sm md:max-w-md">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-accent/55 md:translate-x-4 md:translate-y-4" />
          <PortfolioPortrait src={getHeroImage(portfolio)} alt={t("portraitAlt", { name })} priority />
        </div>
      </div>
    </Section>
  );
}

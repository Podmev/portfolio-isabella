import Section from "@/components/sections/Section.jsx";
import { WorkCard } from "@/components/sections/WorksSection.jsx";

function getNiches(portfolio) {
  return portfolio?.niches || portfolio?.tags?.niches || [];
}

function getNicheSlug(searchParams = {}) {
  const value = searchParams.industry || searchParams.niche || "";
  return Array.isArray(value) ? value[0] : value;
}

function getNicheLabel(niches, slug) {
  if (!slug) return "Portfolio works";
  const match = niches.find((niche) => niche?.slug === slug);
  return match?.label || slug.replace(/[-_]+/g, " ");
}

function getName(portfolio) {
  return portfolio?.profile?.publicName || portfolio?.user?.name || "Writer";
}

export default function PortfolioNichePage({ portfolio, locale, searchParams = {} }) {
  const works = portfolio?.works || [];
  const niches = getNiches(portfolio).filter((niche) => niche?.slug);
  const activeSlug = getNicheSlug(searchParams);
  const activeLabel = getNicheLabel(niches, activeSlug);
  const name = getName(portfolio);
  const title = activeSlug ? `${activeLabel} works` : "Selected portfolio works";
  const subtitle = activeSlug
    ? `A focused selection of ${name}'s public work in ${activeLabel}.`
    : `A focused index of ${name}'s public works from Copy Vortex.`;

  return (
    <>
      <Section className="border-b border-border bg-surface-alt" sectionClassName="py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
            Portfolio
          </p>
          <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{title}</h1>
          <p className="mt-5 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">{subtitle}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <a
              href={`/${locale}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
            >
              Back to portfolio
            </a>
            {activeSlug ? (
              <a
                href={`/${locale}/portfolio`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
              >
                All works
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
                  href={`/${locale}/portfolio?industry=${encodeURIComponent(niche.slug)}`}
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
            {works.map((work) => <WorkCard key={work.id || work.slug} work={work} locale={locale} />)}
          </div>
        ) : (
          <div className="rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">
            No public works are available for this focus area yet.
          </div>
        )}
      </Section>
    </>
  );
}

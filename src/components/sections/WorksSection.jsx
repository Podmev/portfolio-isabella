import Section from "@/components/sections/Section.jsx";
import SectionTitle from "@/components/sections/SectionTitle.jsx";

function getTagLabel(tag) {
  return typeof tag === "string" ? tag : tag?.label || tag?.slug || "";
}

function getDateLabel(work, locale) {
  const value = work.publishedAt || work.deliveredAt || work.endDate || work.createdAt;
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(value));
  } catch {
    return "";
  }
}

export function WorkCard({ work, locale }) {
  const tags = [...(work.industries || []), ...(work.formats || []), ...(work.activities || [])]
    .map(getTagLabel)
    .filter(Boolean)
    .slice(0, 4);
  const context = [work.company?.name, work.project?.name].filter(Boolean).join(" / ");
  const image = work.coverImage || work.company?.coverImage || work.project?.coverImage || "";
  const href = work.publishedUrl || work.proofUrl || `/${locale}/portfolio/${work.slug}`;

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group block overflow-hidden rounded-[24px] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {image ? (
        <div className="overflow-hidden bg-surface-soft">
          <img src={image} alt={work.title} className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-52" />
        </div>
      ) : (
        <div className="flex h-36 items-end bg-surface-soft p-5 sm:h-52">
          <p className="max-w-[90%] text-xl leading-tight">{work.title}</p>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{getDateLabel(work, locale) || context || "Selected work"}</p>
        <h3 className="mt-2 line-clamp-2 text-lg sm:text-xl">{work.title}</h3>
        {context ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{context}</p> : null}
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function WorksSection({ portfolio, locale }) {
  const works = portfolio?.works || [];

  return (
    <Section id="portfolio">
      <SectionTitle eyebrow="Portfolio" title="Selected works" subtitle="Live public works from Copy Vortex, presented in the same soft editorial style as the original portfolio." />

      {works.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 9).map((work) => <WorkCard key={work.id || work.slug} work={work} locale={locale} />)}
        </div>
      ) : (
        <div className="rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">
          Connect Copy Vortex to load Isabella&apos;s public works.
        </div>
      )}
    </Section>
  );
}



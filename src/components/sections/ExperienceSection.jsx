import Section from "@/components/sections/Section.jsx";
import SectionTitle from "@/components/sections/SectionTitle.jsx";
import PortfolioPortrait from "@/components/sections/PortfolioPortrait.jsx";

function formatPeriod(item) {
  const start = item.startDate || "";
  const end = item.isCurrent ? "Present" : item.endDate || "";
  return [start, end].filter(Boolean).join(" - ");
}

export default function ExperienceSection({ portfolio }) {
  const items = (portfolio?.profile?.careerItems || []).filter((item) => item?.isRelevantExperience !== false).slice(0, 5);
  const image = portfolio?.profile?.showcaseImages?.[1]?.url || portfolio?.user?.image || "";
  const name = portfolio?.profile?.publicName || portfolio?.user?.name || "Writer";

  if (!items.length) return null;

  return (
    <Section className="section-soft-gradient py-14 md:py-16">
      <SectionTitle eyebrow="Experience" title="Where I've worked" subtitle="A curated view of the roles and client chapters behind the portfolio." />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="divide-y divide-border/70">
          {items.map((item) => (
            <div key={item.id || `${item.title}-${item.companyName}`} className="py-5 first:pt-0 last:pb-0">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{formatPeriod(item) || item.location}</p>
              <h3 className="mt-2 text-lg leading-snug md:text-xl">
                {item.title}{" "}
                {item.companyName ? <span className="text-muted-foreground">at {item.companyName}</span> : null}
              </h3>
              {item.summary ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-[15px]">{item.summary}</p> : null}
            </div>
          ))}
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <PortfolioPortrait src={image} alt={`Portrait of ${name}`} />
        </div>
      </div>
    </Section>
  );
}


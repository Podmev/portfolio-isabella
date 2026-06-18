"use client";

import { useLocale, useTranslations } from "next-intl";

import { getActiveLocale, withActiveLocalePath } from "@/i18n/publicLocale.js";
import Section from "@/components/sections/Section.jsx";
import SectionTitle from "@/components/sections/SectionTitle.jsx";

const GENERATED_COVER_TEMPLATE_COUNT = 36;

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

export function WorkCard({ work }) {
  const locale = getActiveLocale(useLocale());
  const t = useTranslations();
  const tags = [...(work.industries || []), ...(work.formats || []), ...(work.activities || [])]
    .map(getTagLabel)
    .filter(Boolean)
    .slice(0, 4);
  const context = [work.company?.name, work.project?.name].filter(Boolean).join(" / ");
  const generatedCover = getGeneratedCover(work);
  const href = work.publishedUrl || work.proofUrl || withActiveLocalePath(`/portfolio/${work.slug}`, locale);

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {work.coverImage ? (
        <div className="overflow-hidden bg-surface-soft">
          <img src={work.coverImage} alt={work.title} className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-52" />
        </div>
      ) : (
        <div className="relative flex h-36 overflow-hidden bg-surface-soft p-5 text-white sm:h-52" style={generatedCover.style}>
          {generatedCover.layers.map((layer, index) => (
            <div key={index} className={layer.className} style={layer.style} />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.3),transparent_32%),linear-gradient(0deg,rgba(15,23,42,0.44),rgba(15,23,42,0.1)_44%,transparent_72%)]" />
          <p className="relative mt-auto max-w-[90%] text-xl leading-tight drop-shadow-sm">{work.title}</p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{getDateLabel(work, locale) || context || t("workCardFallbackLabel")}</p>
        <h3 className="mt-2 line-clamp-2 text-lg sm:text-xl">{work.title}</h3>
        <div className="flex-1">
          {context ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{context}</p> : null}
        </div>
        {tags.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function WorksSection({ portfolio }) {
  const t = useTranslations();
  const works = portfolio?.works || [];

  return (
    <Section id="portfolio">
      <SectionTitle eyebrow={t("worksEyebrow")} title={t("worksTitle")} subtitle={t("worksSubtitle")} />

      {works.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 9).map((work) => <WorkCard key={work.id || work.slug} work={work} />)}
        </div>
      ) : (
        <div className="rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">
          {t("worksEmpty")}
        </div>
      )}
    </Section>
  );
}

function getGeneratedCover(work) {
  const companyKey = work.company?.slug || work.company?.name || "";
  const projectKey = work.project?.slug || work.project?.name || "";
  const tagKey = [...(work.industries || []), ...(work.formats || []), ...(work.activities || [])]
    .map((tag) => typeof tag === "string" ? tag : tag?.slug || tag?.label || "")
    .filter(Boolean)
    .join("|");
  const seed = [
    work.id || work.slug || "",
    work.title || "",
    companyKey,
    projectKey,
    tagKey
  ].filter(Boolean).join("::") || "work";
  const hash = hashString(seed);
  const hue = hashString(`${seed}:hue`) % 360;
  const hue2 = (hue + 34 + (hashString(`${seed}:hue-2`) % 92)) % 360;
  const accentHue = (hue + 145 + (hashString(`${seed}:accent`) % 82)) % 360;
  const templateIndex = hashString(`${seed}:template`) % GENERATED_COVER_TEMPLATE_COUNT;
  const colorA = `hsl(${hue} 70% 72%)`;
  const colorB = `hsl(${hue2} 72% 86%)`;
  const accent = `hsl(${accentHue} 78% 80% / 0.62)`;
  const ink = `hsl(${hue} 44% 30% / 0.2)`;

  return {
    style: {
      background: `linear-gradient(${118 + (hash % 54)}deg, ${colorA}, ${colorB})`
    },
    layers: getCoverTemplateLayers(templateIndex, { accent, ink })
  };
}

function getCoverTemplateLayers(templateIndex, colors) {
  const base = "pointer-events-none absolute inset-0";
  const soft = "mix-blend-soft-light";
  const waveA = makeWaveSvg(colors.accent, "rgba(255,255,255,0.42)", colors.ink, "M0 64 C80 34 132 92 220 54 C310 16 378 42 480 10 L480 180 L0 180 Z");
  const waveB = makeWaveSvg("rgba(255,255,255,0.5)", colors.accent, colors.ink, "M0 36 C78 88 148 2 230 46 C310 88 374 22 480 58 L480 180 L0 180 Z");
  const waveC = makeWaveSvg(colors.ink, "rgba(255,255,255,0.44)", colors.accent, "M0 92 C96 48 150 126 246 80 C324 42 394 78 480 34 L480 180 L0 180 Z");
  const waveD = makeWaveSvg(colors.accent, colors.ink, "rgba(255,255,255,0.4)", "M0 20 C74 72 142 18 226 68 C314 120 386 42 480 86 L480 180 L0 180 Z");
  const waveE = makeWaveSvg("rgba(255,255,255,0.48)", colors.ink, colors.accent, "M0 112 C88 70 150 128 232 96 C320 62 386 110 480 74 L480 180 L0 180 Z");
  const templates = [
    [
      { className: `${base} opacity-70`, style: { background: "linear-gradient(128deg, transparent 0 15%, rgba(255,255,255,0.42) 15% 28%, transparent 28% 100%)" } },
      { className: `${base} opacity-55`, style: { background: colors.accent, clipPath: "polygon(62% 0, 100% 0, 82% 100%, 44% 100%)" } }
    ],
    [
      { className: `${base} opacity-65`, style: { background: `linear-gradient(90deg, ${colors.ink} 0 18%, transparent 18% 100%)`, clipPath: "polygon(0 0, 56% 0, 24% 100%, 0 100%)" } },
      { className: `${base} ${soft} opacity-70`, style: { background: "linear-gradient(120deg, transparent 0 42%, rgba(255,255,255,0.42) 42% 52%, transparent 52% 100%)", clipPath: "polygon(36% 0, 100% 0, 72% 100%, 12% 100%)" } }
    ],
    [
      { className: `${base} opacity-70`, style: { backgroundImage: `url("${waveA}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" } },
      { className: `${base} opacity-42`, style: { background: "linear-gradient(155deg, transparent 0 50%, rgba(255,255,255,0.42) 50% 58%, transparent 58% 100%)" } }
    ],
    [
      { className: `${base} opacity-50`, style: { background: `linear-gradient(0deg, rgba(255,255,255,0.42) 0 18%, transparent 18% 100%), linear-gradient(90deg, transparent 0 70%, ${colors.ink} 70% 86%, transparent 86% 100%)` } },
      { className: `${base} opacity-55`, style: { background: "linear-gradient(145deg, transparent 0 12%, rgba(255,255,255,0.36) 12% 25%, transparent 25% 100%)", clipPath: "polygon(0 0, 72% 0, 44% 100%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-70`, style: { background: `linear-gradient(150deg, transparent 0 14%, rgba(255,255,255,0.34) 14% 25%, transparent 25% 46%, ${colors.ink} 46% 55%, transparent 55% 100%)` } },
      { className: `${base} opacity-55`, style: { background: colors.accent, clipPath: "polygon(0 0, 30% 0, 12% 58%, 0 72%)" } }
    ],
    [
      { className: `${base} opacity-65`, style: { background: `linear-gradient(60deg, transparent 0 42%, rgba(255,255,255,0.42) 42% 48%, transparent 48%), linear-gradient(120deg, transparent 0 62%, ${colors.ink} 62% 68%, transparent 68%)` } },
      { className: `${base} opacity-50`, style: { background: colors.accent, clipPath: "polygon(70% 42%, 100% 58%, 100% 100%, 48% 100%)" } }
    ],
    [
      { className: `${base} opacity-72`, style: { backgroundImage: `url("${waveB}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" } },
      { className: `${base} opacity-32`, style: { background: `linear-gradient(120deg, transparent 0 18%, ${colors.ink} 18% 30%, transparent 30% 100%)`, clipPath: "polygon(12% 0, 100% 0, 84% 100%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-55`, style: { background: colors.accent, clipPath: "polygon(74% 0, 100% 0, 100% 82%, 62% 58%)" } },
      { className: `${base} opacity-25`, style: { background: "linear-gradient(90deg, transparent 0 36%, rgba(255,255,255,0.65) 36% 38%, transparent 38% 60%, rgba(255,255,255,0.45) 60% 62%, transparent 62%)" } }
    ],
    [
      { className: `${base} opacity-65`, style: { background: "linear-gradient(135deg, transparent 0 58%, rgba(255,255,255,0.36) 58% 72%, transparent 72%)" } },
      { className: `${base} opacity-45`, style: { background: colors.ink, clipPath: "polygon(0 0, 38% 0, 18% 44%, 0 60%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: "linear-gradient(110deg, rgba(255,255,255,0.5) 0 16%, transparent 16% 100%)", clipPath: "polygon(0 0, 52% 0, 20% 100%, 0 100%)" } },
      { className: `${base} opacity-45`, style: { background: colors.accent, clipPath: "polygon(74% 12%, 100% 28%, 100% 74%, 66% 54%)" } }
    ],
    [
      { className: `${base} opacity-68`, style: { backgroundImage: `url("${waveC}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" } },
      { className: `${base} opacity-35`, style: { background: `linear-gradient(90deg, transparent 0 12%, ${colors.accent} 12% 24%, transparent 24% 100%)` } }
    ],
    [
      { className: `${base} opacity-60`, style: { background: `linear-gradient(35deg, transparent 0 26%, rgba(255,255,255,0.48) 26% 34%, transparent 34% 100%), linear-gradient(145deg, transparent 0 64%, ${colors.ink} 64% 82%, transparent 82% 100%)` } },
      { className: `${base} opacity-45`, style: { background: colors.accent, clipPath: "polygon(0 58%, 42% 76%, 20% 100%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: `radial-gradient(circle at 78% 20%, rgba(255,255,255,0.5) 0 14%, transparent 15%), radial-gradient(circle at 18% 74%, ${colors.ink} 0 18%, transparent 19%)` } },
      { className: `${base} opacity-46`, style: { background: colors.accent, clipPath: "polygon(42% 0, 100% 0, 100% 24%, 58% 42%)" } }
    ],
    [
      { className: `${base} opacity-54`, style: { background: `linear-gradient(90deg, transparent 0 16%, rgba(255,255,255,0.36) 16% 26%, transparent 26% 44%, ${colors.ink} 44% 52%, transparent 52% 100%)` } },
      { className: `${base} opacity-52`, style: { background: colors.accent, clipPath: "polygon(0 24%, 38% 0, 64% 0, 18% 68%, 0 82%)" } }
    ],
    [
      { className: `${base} opacity-64`, style: { backgroundImage: `url("${waveD}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" } },
      { className: `${base} opacity-32`, style: { background: "linear-gradient(45deg, rgba(255,255,255,0.52) 0 10%, transparent 10% 100%)", clipPath: "polygon(0 0, 44% 0, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-50`, style: { background: `repeating-linear-gradient(135deg, transparent 0 18px, rgba(255,255,255,0.28) 18px 26px), linear-gradient(90deg, transparent 0 70%, ${colors.ink} 70% 78%, transparent 78%)` } },
      { className: `${base} opacity-44`, style: { background: colors.accent, clipPath: "polygon(62% 18%, 100% 0, 100% 100%, 82% 100%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: `linear-gradient(160deg, ${colors.ink} 0 18%, transparent 18% 100%)`, clipPath: "polygon(0 0, 100% 0, 78% 100%, 0 100%)" } },
      { className: `${base} ${soft} opacity-62`, style: { background: "radial-gradient(circle at 72% 54%, rgba(255,255,255,0.54) 0 24%, transparent 25%)" } }
    ],
    [
      { className: `${base} opacity-60`, style: { background: "linear-gradient(24deg, transparent 0 55%, rgba(255,255,255,0.4) 55% 64%, transparent 64%)" } },
      { className: `${base} opacity-48`, style: { background: colors.accent, clipPath: "polygon(0 0, 100% 0, 68% 34%, 0 18%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: `radial-gradient(ellipse at 82% 76%, ${colors.accent} 0 24%, transparent 25%), radial-gradient(ellipse at 22% 18%, rgba(255,255,255,0.48) 0 18%, transparent 19%)` } },
      { className: `${base} opacity-28`, style: { background: colors.ink, clipPath: "polygon(28% 0, 44% 0, 18% 100%, 2% 100%)" } }
    ],
    [
      { className: `${base} opacity-62`, style: { backgroundImage: `url("${waveE}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" } },
      { className: `${base} opacity-36`, style: { background: "linear-gradient(100deg, transparent 0 66%, rgba(255,255,255,0.58) 66% 78%, transparent 78%)" } }
    ],
    [
      { className: `${base} opacity-54`, style: { background: `linear-gradient(90deg, transparent 0 48%, ${colors.ink} 48% 56%, transparent 56%), linear-gradient(0deg, rgba(255,255,255,0.38) 0 22%, transparent 22%)` } },
      { className: `${base} opacity-46`, style: { background: colors.accent, clipPath: "polygon(72% 0, 100% 0, 100% 44%, 54% 18%)" } }
    ],
    [
      { className: `${base} opacity-50`, style: { background: "linear-gradient(135deg, rgba(255,255,255,0.44) 0 20%, transparent 20% 42%, rgba(255,255,255,0.26) 42% 52%, transparent 52%)" } },
      { className: `${base} opacity-48`, style: { background: colors.ink, clipPath: "polygon(0 48%, 34% 68%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-62`, style: { background: `linear-gradient(125deg, transparent 0 16%, ${colors.accent} 16% 28%, transparent 28% 100%)` } },
      { className: `${base} opacity-32`, style: { background: "radial-gradient(circle at 84% 38%, rgba(255,255,255,0.62) 0 16%, transparent 17%)" } }
    ],
    [
      { className: `${base} opacity-56`, style: { background: `linear-gradient(70deg, transparent 0 54%, ${colors.ink} 54% 66%, transparent 66%), linear-gradient(150deg, rgba(255,255,255,0.42) 0 12%, transparent 12%)` } },
      { className: `${base} opacity-46`, style: { background: colors.accent, clipPath: "polygon(38% 72%, 100% 48%, 100% 100%, 26% 100%)" } }
    ],
    [
      { className: `${base} opacity-52`, style: { background: "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.46) 0 18%, transparent 19%), radial-gradient(circle at 90% 72%, rgba(255,255,255,0.32) 0 20%, transparent 21%)" } },
      { className: `${base} opacity-46`, style: { background: colors.ink, clipPath: "polygon(50% 0, 64% 0, 34% 100%, 18% 100%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: `linear-gradient(180deg, transparent 0 38%, ${colors.accent} 38% 54%, transparent 54%)`, clipPath: "polygon(0 0, 100% 18%, 100% 100%, 0 82%)" } },
      { className: `${base} opacity-30`, style: { background: "linear-gradient(100deg, rgba(255,255,255,0.5) 0 8%, transparent 8% 100%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: `repeating-linear-gradient(90deg, transparent 0 34px, rgba(255,255,255,0.28) 34px 42px), radial-gradient(circle at 74% 28%, ${colors.ink} 0 14%, transparent 15%)` } },
      { className: `${base} opacity-40`, style: { background: colors.accent, clipPath: "polygon(0 0, 26% 0, 54% 100%, 26% 100%)" } }
    ],
    [
      { className: `${base} opacity-60`, style: { background: `linear-gradient(145deg, transparent 0 28%, rgba(255,255,255,0.44) 28% 40%, transparent 40%), linear-gradient(35deg, transparent 0 68%, ${colors.ink} 68% 76%, transparent 76%)` } },
      { className: `${base} opacity-42`, style: { background: colors.accent, clipPath: "polygon(62% 0, 100% 22%, 100% 58%, 78% 44%)" } }
    ],
    [
      { className: `${base} opacity-56`, style: { background: "linear-gradient(105deg, rgba(255,255,255,0.42) 0 12%, transparent 12% 34%, rgba(255,255,255,0.28) 34% 42%, transparent 42%)" } },
      { className: `${base} opacity-50`, style: { background: colors.ink, clipPath: "polygon(0 74%, 48% 56%, 70% 100%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-62`, style: { backgroundImage: `url("${waveA}")`, backgroundPosition: "center 30%", backgroundRepeat: "no-repeat", backgroundSize: "125% 115%", transform: "scaleX(-1)" } },
      { className: `${base} opacity-36`, style: { background: colors.accent, clipPath: "polygon(0 0, 20% 0, 0 46%)" } }
    ],
    [
      { className: `${base} opacity-54`, style: { background: `linear-gradient(90deg, ${colors.accent} 0 20%, transparent 20% 100%)`, clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" } },
      { className: `${base} ${soft} opacity-70`, style: { background: "linear-gradient(140deg, transparent 0 64%, rgba(255,255,255,0.5) 64% 74%, transparent 74%)" } }
    ],
    [
      { className: `${base} opacity-52`, style: { background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.5) 0 24%, transparent 25%), linear-gradient(120deg, transparent 0 58%, ${colors.ink} 58% 66%, transparent 66%)` } },
      { className: `${base} opacity-44`, style: { background: colors.accent, clipPath: "polygon(76% 62%, 100% 40%, 100% 100%, 48% 100%)" } }
    ],
    [
      { className: `${base} opacity-58`, style: { background: "linear-gradient(0deg, transparent 0 54%, rgba(255,255,255,0.42) 54% 66%, transparent 66%)", clipPath: "polygon(0 0, 100% 16%, 100% 100%, 0 84%)" } },
      { className: `${base} opacity-44`, style: { background: colors.ink, clipPath: "polygon(0 0, 36% 0, 0 34%)" } }
    ],
    [
      { className: `${base} opacity-62`, style: { background: `linear-gradient(32deg, transparent 0 24%, ${colors.accent} 24% 36%, transparent 36%), linear-gradient(148deg, transparent 0 72%, rgba(255,255,255,0.42) 72% 82%, transparent 82%)` } },
      { className: `${base} opacity-34`, style: { background: colors.ink, clipPath: "polygon(82% 0, 100% 0, 100% 100%, 94% 100%)" } }
    ],
    [
      { className: `${base} opacity-54`, style: { background: "radial-gradient(circle at 20% 82%, rgba(255,255,255,0.48) 0 18%, transparent 19%), linear-gradient(90deg, transparent 0 78%, rgba(255,255,255,0.3) 78% 88%, transparent 88%)" } },
      { className: `${base} opacity-46`, style: { background: colors.accent, clipPath: "polygon(0 18%, 28% 34%, 16% 100%, 0 100%)" } }
    ],
    [
      { className: `${base} opacity-62`, style: { backgroundImage: `url("${waveB}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "120% 130%", transform: "scaleY(-1)" } },
      { className: `${base} opacity-34`, style: { background: "linear-gradient(90deg, rgba(255,255,255,0.44) 0 12%, transparent 12%)" } }
    ],
    [
      { className: `${base} opacity-56`, style: { background: `linear-gradient(115deg, transparent 0 30%, ${colors.ink} 30% 44%, transparent 44%), linear-gradient(65deg, transparent 0 58%, rgba(255,255,255,0.44) 58% 70%, transparent 70%)` } },
      { className: `${base} opacity-46`, style: { background: colors.accent, clipPath: "polygon(54% 0, 78% 0, 100% 100%, 72% 100%)" } }
    ]
  ];

  return templates[templateIndex] || templates[0];
}

function makeWaveSvg(fillOne, fillTwo, fillThree, path) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" preserveAspectRatio="none"><path fill="${fillOne}" d="${path}"/><path fill="${fillTwo}" d="M0 104 C92 62 170 138 256 96 C338 56 400 92 480 62 L480 180 L0 180 Z"/><path fill="${fillThree}" d="M0 136 C104 98 178 162 274 126 C354 96 420 122 480 96 L480 180 L0 180 Z"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}



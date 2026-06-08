import { useLocale, useTranslations } from "next-intl";

import { getCopyVortexWriterUrl } from "@/lib/copyVortexWriterUrl.js";

function getWriterName(portfolio, fallback) {
  return portfolio?.profile?.publicName || portfolio?.user?.name || portfolio?.writer?.profile?.publicName || fallback;
}

export default function CopyVortexProfileCta({ portfolio }) {
  const locale = useLocale();
  const t = useTranslations();
  const href = getCopyVortexWriterUrl(portfolio, locale);
  if (!href) return null;

  const name = getWriterName(portfolio, t("copyVortexWriterFallback"));

  return (
    <section className="border-t border-border bg-surface-alt px-6 py-10 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 rounded-[24px] border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center md:p-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">{t("copyVortexEyebrow")}</p>
          <h2 className="mt-2 text-2xl leading-tight md:text-3xl">{t("copyVortexTitle")}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            {t("copyVortexDescription", { name })}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          {t("copyVortexButton")}
        </a>
      </div>
    </section>
  );
}

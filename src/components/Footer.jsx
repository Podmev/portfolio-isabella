import { useTranslations } from "next-intl";

import FooterLocaleSwitcher from "@/components/FooterLocaleSwitcher.jsx";

function getWriterName(portfolio, fallback) {
  return portfolio?.profile?.publicName || portfolio?.user?.name || portfolio?.writer?.profile?.publicName || fallback;
}

export default function Footer({ portfolio }) {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const name = getWriterName(portfolio, t("writerFallbackName"));

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>&copy; {year} {name}. {t("footerRights")}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <FooterLocaleSwitcher />
          <p>{t("footerDevelopedBy")}</p>
        </div>
      </div>
    </footer>
  );
}

import { NextIntlClientProvider } from "next-intl";

import { activeLocales, defaultLocale } from "@/i18n/config.js";
import { getMessages } from "@/i18n/messages.js";
import LocaleDocumentSync from "@/components/LocaleDocumentSync.jsx";

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const resolvedParams = await params;
  const locale = activeLocales.includes(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;

  return (
    <NextIntlClientProvider locale={locale} messages={getMessages(locale)}>
      <LocaleDocumentSync />
      {children}
    </NextIntlClientProvider>
  );
}

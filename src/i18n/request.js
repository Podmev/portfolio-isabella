import { getRequestConfig } from "next-intl/server";

import { defaultLocale, supportedLocales } from "@/i18n/config.js";
import { getMessages } from "@/i18n/messages.js";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = supportedLocales.includes(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: getMessages(locale),
    timeZone: "UTC",
    now: new Date(),
  };
});

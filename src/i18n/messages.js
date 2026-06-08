import { defaultLocale } from "@/i18n/config.js";

import en from "../../messages/en.json";
import pt from "../../messages/pt.json";
import es from "../../messages/es.json";
import ru from "../../messages/ru.json";

const dictionaries = { en, pt, es, ru };

function interpolate(value, params = {}) {
  return String(value || "").replace(/\{(\w+)\}/g, (_, key) => {
    const replacement = params[key];
    return replacement === undefined || replacement === null ? "" : String(replacement);
  });
}

export function getMessages(locale = defaultLocale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function createTranslator(locale = defaultLocale) {
  const messages = getMessages(locale);
  const fallback = dictionaries[defaultLocale];

  return function t(key, params) {
    return interpolate(messages[key] || fallback[key] || key, params);
  };
}

function normalizeBaseUrl(value = "") {
  return String(value || "").trim().replace(/\/+$/, "");
}

export function getCopyVortexWriterUrl(portfolio, locale = "en") {
  const slug = portfolio?.externalSite?.writerSlug || portfolio?.writer?.canonicalSlug || portfolio?.profile?.customSlug || portfolio?.user?.username || "";
  if (!slug) return "";

  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_COPY_VORTEX_URL || "https://copyvortex.com");
  return `${baseUrl}/${locale}/writers/${encodeURIComponent(slug)}`;
}

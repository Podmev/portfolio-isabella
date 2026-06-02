export const supportedLocales = ["en", "ru", "pt", "it", "es", "fr", "de"];
export const defaultLocale = "en";

function searchParamsToQuery(searchParams = {}) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams || {})) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else {
      query.set(key, value);
    }
  }

  return query;
}

export async function getPortfolioData({ locale = defaultLocale, searchParams = {} } = {}) {
  const baseUrl = process.env.COPY_VORTEX_API_BASE_URL;
  const token = process.env.EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_PORTFOLIO_TOKEN;
  const siteUrl = process.env.EXTERNAL_PORTFOLIO_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!baseUrl || !token) return null;

  const query = searchParamsToQuery(searchParams);
  query.set("locale", locale);

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/external/portfolio?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(siteUrl ? { "X-External-Portfolio-Origin": siteUrl } : {}),
    },
    next: {
      revalidate: Number(process.env.COPY_VORTEX_REVALIDATE_SECONDS || 120),
    },
  });

  if (!response.ok) {
    console.error("Copy Vortex portfolio request failed", response.status, await response.text());
    return null;
  }

  const payload = await response.json();
  return payload?.data?.document || null;
}

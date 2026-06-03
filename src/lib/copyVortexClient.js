import { randomUUID } from "crypto";

export const supportedLocales = ["en", "ru", "pt", "it", "es", "fr", "de"];
export const defaultLocale = "en";

const TOKEN_PREVIEW_LENGTH = 6;

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

function getTokenPreview(token = "") {
  if (!token) return "missing";
  const value = String(token);
  if (value.length <= TOKEN_PREVIEW_LENGTH * 2) return `${value.length} chars`;
  return `${value.slice(0, TOKEN_PREVIEW_LENGTH)}...${value.slice(-TOKEN_PREVIEW_LENGTH)} (${value.length} chars)`;
}

function normalizeBaseUrl(value = "") {
  return String(value || "").trim().replace(/\/+$/, "");
}

async function readResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text) {
    return { contentType, text: "", json: null };
  }

  if (contentType.includes("application/json")) {
    try {
      return { contentType, text, json: JSON.parse(text) };
    } catch {
      return { contentType, text, json: null };
    }
  }

  return { contentType, text, json: null };
}

function buildRequestDebug({ url, locale, query, baseUrl, siteUrl, token, requestId }) {
  return {
    url,
    locale,
    query: Object.fromEntries(query.entries()),
    baseUrl: baseUrl || "missing",
    originHeader: siteUrl || "missing",
    token: getTokenPreview(token),
    requestId,
  };
}

function logPortfolioError(message, details = {}) {
  console.error(`[copy-vortex] ${message}`, JSON.stringify(details, null, 2));
}

export async function getPortfolioData({ locale = defaultLocale, searchParams = {} } = {}) {
  const baseUrl = normalizeBaseUrl(process.env.COPY_VORTEX_API_BASE_URL || "https://copyvortex.com");
  const token = process.env.EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_PORTFOLIO_TOKEN;
  const siteUrl = process.env.EXTERNAL_PORTFOLIO_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!token) {
    logPortfolioError("Portfolio request skipped: missing token", {
      baseUrl,
      locale,
      originHeader: siteUrl || "missing",
      expectedEnv: ["EXTERNAL_PORTFOLIO_TOKEN", "COPY_VORTEX_EXTERNAL_PORTFOLIO_TOKEN", "COPY_VORTEX_PORTFOLIO_TOKEN"],
    });
    return null;
  }

  const query = searchParamsToQuery(searchParams);
  query.set("locale", locale);

  const url = `${baseUrl}/api/v1/external/portfolio?${query.toString()}`;
  const requestId = randomUUID();
  const requestDebug = buildRequestDebug({ url, locale, query, baseUrl, siteUrl, token, requestId });

  let response;

  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Request-Id": requestId,
        ...(siteUrl ? { "X-External-Portfolio-Origin": siteUrl } : {}),
      },
      next: {
        revalidate: Number(process.env.COPY_VORTEX_REVALIDATE_SECONDS || 120),
      },
    });
  } catch (error) {
    logPortfolioError("Portfolio request network failure", {
      ...requestDebug,
      error: {
        name: error?.name || "Error",
        message: error?.message || String(error),
      },
    });
    return null;
  }

  const body = await readResponseBody(response);

  if (!response.ok) {
    logPortfolioError("Portfolio request failed", {
      ...requestDebug,
      status: response.status,
      statusText: response.statusText,
      contentType: body.contentType || "unknown",
      copyVortexError: body.json?.error || null,
      responsePreview: body.text ? body.text.slice(0, 2000) : "empty response",
    });
    return null;
  }

  const payload = body.json || (body.text ? JSON.parse(body.text) : null);
  const document = payload?.data?.document || null;

  if (!document) {
    logPortfolioError("Portfolio request returned no document", {
      ...requestDebug,
      status: response.status,
      type: payload?.type || "missing",
      topLevelKeys: payload ? Object.keys(payload) : [],
    });
  } else if (process.env.COPY_VORTEX_DEBUG === "1") {
    console.info("[copy-vortex] Portfolio request succeeded", JSON.stringify({
      ...requestDebug,
      status: response.status,
      works: Array.isArray(document.works) ? document.works.length : 0,
      projects: Array.isArray(document.projects) ? document.projects.length : 0,
      companies: Array.isArray(document.companies) ? document.companies.length : 0,
      summary: document.summary || {},
    }, null, 2));
  }

  return document;
}

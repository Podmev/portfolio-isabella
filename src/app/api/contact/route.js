import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

function normalizeBaseUrl(value = "") {
  return String(value || "").trim().replace(/\/+$/, "");
}

async function readResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text) return { contentType, text: "", json: null };

  if (contentType.includes("application/json")) {
    try {
      return { contentType, text, json: JSON.parse(text) };
    } catch {
      return { contentType, text, json: null };
    }
  }

  return { contentType, text, json: null };
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  return forwardedFor.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
}

export async function POST(request) {
  const baseUrl = normalizeBaseUrl(process.env.COPY_VORTEX_API_BASE_URL || "https://copyvortex.com");
  const token = process.env.EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_EXTERNAL_PORTFOLIO_TOKEN || process.env.COPY_VORTEX_PORTFOLIO_TOKEN;
  const siteUrl = process.env.EXTERNAL_PORTFOLIO_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "CONTACT_NOT_CONFIGURED", message: "Contact form is not configured." } },
      { status: 503 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const requestId = randomUUID();
  const response = await fetch(`${baseUrl}/api/v1/external/portfolio/contact`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Request-Id": requestId,
      ...(siteUrl ? { "X-External-Portfolio-Origin": siteUrl } : {}),
      ...(getClientIp(request) ? { "X-Forwarded-For": getClientIp(request) } : {})
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  const body = await readResponseBody(response);

  if (body.json) {
    return NextResponse.json(body.json, { status: response.status });
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "CONTACT_REQUEST_FAILED",
        message: response.ok ? "Contact request returned an invalid response." : "Contact request failed."
      }
    },
    { status: response.ok ? 502 : response.status }
  );
}

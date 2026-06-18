"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import Section from "@/components/sections/Section.jsx";
import SectionTitle from "@/components/sections/SectionTitle.jsx";
import { getActiveLocale } from "@/i18n/publicLocale.js";
import { getCopyVortexWriterUrl } from "@/lib/copyVortexWriterUrl.js";
import { formatBasedLocation, formatWorkLocation } from "@/lib/profileWorkLocation.js";

function normalizeTelegram(value = "") {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://t.me/${value.replace(/^@/, "")}`;
}

function normalizeWhatsapp(value = "") {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/[^\d+]/g, "").replace(/^\+/, "")}`;
}

export default function ContactSection({ portfolio }) {
  const locale = getActiveLocale(useLocale());
  const t = useTranslations();
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const profile = portfolio?.profile || {};
  const contact = profile.contact || {};
  const social = profile.socialLinks || {};
  const email = contact.email || "";
  const location = formatBasedLocation(profile.location);
  const workLocation = formatWorkLocation(profile.workLocation, t);
  const copyVortexUrl = getCopyVortexWriterUrl(portfolio, locale);
  const isSending = status === "sending";

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      locale,
      pageUrl: typeof window === "undefined" ? "" : window.location.href
    };

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error?.message || t("contactSendError"));
      }

      form.reset();
      setStatus("sent");
      setStatusMessage(t("contactSendSuccess"));
    } catch (error) {
      setStatus("error");
      setStatusMessage(error?.message || t("contactSendError"));
    }
  }

  return (
    <Section id="contact">
      <SectionTitle eyebrow={t("contactEyebrow")} title={t("contactTitle")} subtitle={t("contactSubtitle")} />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[24px] border border-border bg-surface-soft p-8">
          <div className="space-y-6">
            {email ? <ContactLink label={t("contactEmail")} href={`mailto:${email}`} value={email} /> : null}
            {contact.whatsapp ? <ContactLink label={t("contactWhatsapp")} href={normalizeWhatsapp(contact.whatsapp)} value={contact.whatsapp} /> : null}
            {contact.telegram ? <ContactLink label={t("contactTelegram")} href={normalizeTelegram(contact.telegram)} value={contact.telegram} /> : null}
            {location ? <ContactText label={t("contactLocation")} value={location} /> : null}
            {workLocation ? <ContactText label={t("contactWorkLocation")} value={workLocation} /> : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {social.instagram ? <SocialLink href={social.instagram} label={t("contactInstagram")} /> : null}
            {social.linkedin ? <SocialLink href={social.linkedin} label={t("contactLinkedin")} /> : null}
            {copyVortexUrl ? <SocialLink href={copyVortexUrl} label={t("contactCopyVortex")} /> : null}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[24px] border border-border bg-card p-8">
          <div className="grid gap-5">
            <Field id="name" label={t("contactName")} placeholder={t("contactName")} required />
            <Field id="email" label={t("contactEmail")} type="email" placeholder={t("contactEmail")} required />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">{t("contactMessage")}</label>
              <textarea id="message" name="message" rows={6} placeholder={t("contactMessagePlaceholder")} required className="w-full resize-none px-4 py-3" />
            </div>
            {statusMessage ? (
              <p className={`rounded-2xl px-4 py-3 text-sm ${status === "sent" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`} role="status">
                {statusMessage}
              </p>
            ) : null}
            <button type="submit" disabled={isSending} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              {isSending ? t("contactSending") : t("contactSendMessage")}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({ id, label, type = "text", placeholder, required = false }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} className="h-12 w-full px-4" />
    </div>
  );
}

function ContactLink({ label, href, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <a href={href} target={href?.startsWith("mailto:") ? undefined : "_blank"} rel={href?.startsWith("mailto:") ? undefined : "noreferrer"} className="mt-2 block break-words text-lg text-foreground transition hover:opacity-70">{value}</a>
    </div>
  );
}

function ContactText({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg text-foreground">{value}</p>
    </div>
  );
}

function SocialLink({ href, label }) {
  const finalHref = href.startsWith("http") ? href : `https://${href}`;
  return (
    <a href={finalHref} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {label}
    </a>
  );
}

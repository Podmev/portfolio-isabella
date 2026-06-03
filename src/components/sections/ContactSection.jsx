import Section from "@/components/sections/Section.jsx";
import SectionTitle from "@/components/sections/SectionTitle.jsx";

function normalizeTelegram(value = "") {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://t.me/${value.replace(/^@/, "")}`;
}

function normalizeWhatsapp(value = "") {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/[^\d+]/g, "").replace(/^\+/, "")}`;
}

function normalizeBaseUrl(value = "") {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getCopyVortexWriterUrl(portfolio, locale) {
  const slug = portfolio?.externalSite?.writerSlug || portfolio?.writer?.canonicalSlug || portfolio?.profile?.customSlug || portfolio?.user?.username || "";
  if (!slug) return "";

  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_COPY_VORTEX_URL || "https://copyvortex.com");
  return `${baseUrl}/${locale}/writers/${encodeURIComponent(slug)}`;
}

export default function ContactSection({ portfolio, locale = "en" }) {
  const profile = portfolio?.profile || {};
  const contact = profile.contact || {};
  const social = profile.socialLinks || {};
  const email = contact.email || "";
  const location = [profile.location?.city, profile.location?.country].filter(Boolean).join(", ");
  const copyVortexUrl = getCopyVortexWriterUrl(portfolio, locale);

  return (
    <Section id="contact">
      <SectionTitle eyebrow="Contact" title="Let's talk about your project" subtitle="For copywriting, editing, translation, or content collaboration." />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[24px] border border-border bg-surface-soft p-8">
          <div className="space-y-6">
            {email ? <ContactLink label="Email" href={`mailto:${email}`} value={email} /> : null}
            {contact.whatsapp ? <ContactLink label="WhatsApp" href={normalizeWhatsapp(contact.whatsapp)} value={contact.whatsapp} /> : null}
            {contact.telegram ? <ContactLink label="Telegram" href={normalizeTelegram(contact.telegram)} value={contact.telegram} /> : null}
            {location ? <ContactText label="Location" value={location} /> : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {social.instagram ? <SocialLink href={social.instagram} label="Instagram" /> : null}
            {social.linkedin ? <SocialLink href={social.linkedin} label="LinkedIn" /> : null}
            {copyVortexUrl ? <SocialLink href={copyVortexUrl} label="Copy Vortex" /> : null}
          </div>
        </div>

        <form action={email ? `mailto:${email}` : undefined} method="post" encType="text/plain" className="rounded-[24px] border border-border bg-card p-8">
          <div className="grid gap-5">
            <Field id="name" label="Name" placeholder="Name" />
            <Field id="email" label="Email" type="email" placeholder="Email" />
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={6} placeholder="Tell me a bit about your project" className="w-full resize-none px-4 py-3" />
            </div>
            <button type="submit" disabled={!email} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              Send message
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({ id, label, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} className="h-12 w-full px-4" />
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

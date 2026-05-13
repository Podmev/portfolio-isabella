# Dynamic Copy Vortex Portfolio Questions

Use this document as the discussion checklist before implementation. The goal is to make the standalone Isabella portfolio flexible and beautiful without accidentally building the wrong data contract, exposing private data, or painting the design into a corner.

## Product Scope

1. Is this site only Isabella's portfolio, or should the architecture support future standalone portfolios for other Copy Vortex writers too?
2. Should `portfolio-isabella` be a fully independent brand/site, or should visitors clearly see that it is powered by Copy Vortex?
3. Should the portfolio feel like a personal editorial website, a professional CV, a searchable case-study archive, or a hybrid?
4. What is the primary visitor action: hire/contact Isabella, browse proof, read case studies, download/view CV, or visit published work?
5. Should the homepage prioritize Isabella's identity or the work archive?
6. Should the site include only portfolio work, or also writing about process, services, testimonials, and availability?
7. Should the first release preserve the structure of `portfolio-isabella-v1`, or is this a good moment for a bigger redesign?

## Data Visibility

1. Should the external portfolio receive only `public` data?
2. Should the external portfolio token allow `unlisted` profile/works data for Isabella?
3. Should private works ever be available to the external portfolio if explicitly selected?
4. Should unlisted data require a special route, preview mode, or extra secret?
5. Should client/company names be hidden for some works even when the work itself is public?
6. Should proof links be public by default, manually approved, or hidden unless marked safe?
7. Should source document links, working document links, or assets ever be exposed?
8. Should contributor names/roles be shown?
9. Should hidden contributors always remain hidden?
10. Should metrics, revenue, payout, deadlines, and commercial data always be excluded?
11. Should contact info come from Copy Vortex profile data, local site config, or both?
12. Should visitor-facing data be sanitized separately from Copy Vortex public pages?

## Authentication And Token Model

1. Should Phase 1 use a simple environment token or start with a database-backed token model?
2. Should each token map to exactly one writer?
3. Should tokens have scopes such as `portfolio:read` and `portfolio:analytics:read`?
4. Should tokens expire?
5. Should tokens be revocable from the Copy Vortex UI?
6. Should token creation/revocation be admin-only, writer-owned, or both?
7. Should raw tokens be shown only once?
8. Should tokens be stored hashed in the database?
9. Should failed token attempts be audit logged?
10. Should successful token use update `lastUsedAt`?
11. Should rate limits be per token, per IP, or both?
12. Should the token allow writes later, for example contact form submission or portfolio view tracking?

## API Shape

1. Should we build one aggregate endpoint: `GET /api/v1/external/portfolio`?
2. Should we reuse existing public endpoints instead?
3. Should the external endpoint return profile, works, projects, companies, facets, analytics, and summary in one response?
4. Should detail pages use the same endpoint with `workSlug`, or a separate endpoint like `/api/v1/external/portfolio/works/[slug]`?
5. Should companies/projects be filtered to only those linked to Isabella's works?
6. Should companies/projects include full descriptions or only enough data for filters/cards?
7. Should the API return all works for local filtering, or paginated filtered results?
8. Should facets reflect all Isabella works or only the current filtered result set?
9. Should the API support `featuredOnly`?
10. Should the API support curated sections such as `featured`, `recent`, `caseStudies`, and `byService`?
11. Should the API return localized field labels and translated content?
12. Should the API response be versioned from day one?
13. Should the response include a `schemaVersion` field?
14. Should API errors include user-safe messages for portfolio fallback UI?

## Filtering And Search

1. Which filters are required for v1 of the dynamic portfolio?
2. Should filters include format, activity, topic, industry, language, company, project, credit type, and date?
3. Should there be service-oriented filters such as copywriting, editing, translation, localization, content strategy?
4. Should tags map directly from Copy Vortex categories, or should the portfolio have a friendlier display grouping?
5. Should search include only title/summary, or also excerpt, long description, company, project, tags, and highlights?
6. Should search be simple substring matching, Mongo text search, or a richer search index later?
7. Should the site support saved/shareable filtered URLs?
8. Should active filters be shown as removable chips?
9. Should filter counts update after each filter is applied?
10. Should users be able to combine multiple tags in the same category with OR or AND behavior?
11. Should filters hide empty options or show disabled zero-count options?
12. Should there be date presets like last year, this year, recent publications?
13. Should sorting include recent, published date, title, company, project, featured, and reading length?

## Content Modeling

1. Do we need a `featured` flag for works?
2. Do we need a manual featured order?
3. Do we need a separate `caseStudy` flag?
4. Should works have a portfolio-specific short title or display title?
5. Should works have portfolio-specific excerpts independent from Copy Vortex summaries?
6. Should there be a hero work or pinned work?
7. Should projects have curated descriptions for the standalone site?
8. Should companies have curated relationship notes, such as "launch campaign", "ongoing editorial support", or "translation partner"?
9. Should profile data include a standalone-site intro separate from Copy Vortex public profile intro?
10. Should testimonials live in Copy Vortex or locally in `portfolio-isabella`?
11. Should service descriptions live in Copy Vortex or locally?
12. Should site navigation labels and copy live locally or in Copy Vortex?

## Design Direction

1. Should the new dynamic site closely follow `portfolio-isabella-v1` visually?
2. Which parts of v1 should be preserved: hero, portfolio cards, experience section, contact section, imagery, colors, typography?
3. Should the design become more editorial, more premium/minimal, or more data-rich?
4. Should the portfolio browser feel like a polished creative archive or a dense professional tool?
5. Should cards be image-led, text-led, or mixed depending on work type?
6. Should the homepage include analytics-style proof, or would that feel too dashboard-like?
7. Should the design include view modes: grid, list, timeline?
8. Should work detail pages be compact proof pages or rich case studies?
9. Should the site support dark mode?
10. Should the design use Copy Vortex theme/appearance settings from the writer profile?
11. Should Isabella be able to change colors/fonts from Copy Vortex later?
12. What should the mobile browsing experience prioritize: quick scanning, filters, or storytelling?

## Pages And Navigation

1. Which pages are needed for the first dynamic release?
2. Should `/` include all major content, or should portfolio browsing live mostly at `/portfolio`?
3. Should `/portfolio/[slug]` exist for every work?
4. Should there be `/projects` and `/projects/[slug]` pages?
5. Should there be `/companies` and `/companies/[slug]` pages?
6. Should there be `/about`, `/cv`, `/services`, `/contact`, or `/testimonials`?
7. Should old routes in `portfolio-isabella` be removed, redirected, or kept temporarily?
8. Should the site include a sitemap and SEO metadata for every dynamic page?
9. Should filtered portfolio URLs be indexable by search engines or marked noindex?
10. Should detail pages canonicalize to the standalone site or Copy Vortex public pages?

## Localization

1. Should the standalone portfolio be English-only at launch?
2. Should it support the same locales as Copy Vortex?
3. Should visitor language be detected automatically?
4. Should content translations come from Copy Vortex `Translation` records?
5. Should UI labels live in `portfolio-isabella` or be returned by Copy Vortex?
6. Should filters use localized tag labels?
7. Should date, language, and country formatting follow visitor locale?
8. Should slugs be locale-specific or canonical across locales?

## Performance And Caching

1. How fresh does portfolio data need to be?
2. Is a 60-300 second revalidation window acceptable?
3. Should Copy Vortex provide cache tags or revalidation hooks?
4. Should Copy Vortex send a webhook to revalidate `portfolio-isabella` after portfolio changes?
5. Should the portfolio cache the full payload at build time, request time, or both?
6. Should the portfolio gracefully degrade if Copy Vortex is down?
7. Should there be local fallback content for the homepage?
8. Should images be delivered directly from Cloudinary/Copy Vortex, or proxied/optimized by Next?
9. Should large payloads be split for initial page speed?
10. Should analytics data be fetched separately after the main page loads?

## SEO And Sharing

1. Which pages should be indexed?
2. Should work detail pages have unique meta titles/descriptions?
3. Should the portfolio use structured data for Person, CreativeWork, Organization, or Article?
4. Should Open Graph images come from work covers, writer cover image, or generated branded images?
5. Should tag/filter pages produce SEO-friendly landing pages?
6. Should proof URLs link out with normal links, nofollow, or tracking?
7. Should Copy Vortex public writer pages link to the standalone Isabella portfolio?
8. Should the standalone portfolio link back to Copy Vortex?

## Analytics And Tracking

1. Should standalone portfolio views increment Copy Vortex profile views?
2. Should work detail views be tracked?
3. Should filter/search usage be tracked?
4. Should outbound proof/publication clicks be tracked?
5. Should contact CTA clicks be tracked?
6. Should analytics be stored in Copy Vortex, Vercel analytics, another analytics tool, or not at all initially?
7. Should self-views be excluded somehow?
8. Should tracking respect privacy/cookie requirements?

## Contact And Conversion

1. Should the contact form live in `portfolio-isabella` or submit into Copy Vortex?
2. Should contact submissions create messages/leads in Copy Vortex?
3. Should the site expose Isabella's email directly?
4. Should there be a booking/scheduling link?
5. Should CTAs vary by page and filter context?
6. Should contact messages include the work/project page where the visitor clicked?
7. Should spam protection be added from day one?
8. Should contact form success/failure copy be local or managed from Copy Vortex?

## Admin And Editing Workflow

1. Where should Isabella choose featured works?
2. Where should she edit standalone portfolio intro text?
3. Where should she decide whether a work appears on the standalone portfolio?
4. Does Copy Vortex need a "standalone portfolio preview" mode?
5. Should Copy Vortex show whether the external site last synced successfully?
6. Should there be a button in Copy Vortex to regenerate/revalidate the external portfolio?
7. Should Copy Vortex warn when a work is public but missing a cover/summary/proof URL?
8. Should we add a portfolio readiness checklist for works?

## Migration From Current Portfolio

1. Which content from `portfolio-isabella-v1` should become Copy Vortex data?
2. Which content should remain local static copy?
3. Are there old article/company models in `portfolio-isabella` that can be deleted later?
4. Should current `portfolio-isabella` routes be replaced all at once or gradually?
5. Should static project images from v1 be moved to Copy Vortex/Cloudinary?
6. Should existing slugs be preserved for SEO/bookmarks?
7. Should the old site be kept as a fallback deployment?

## Testing And Quality

1. What backend tests are required for the external portfolio endpoint?
2. What frontend tests are worth adding in `portfolio-isabella`?
3. Should we snapshot the API contract with fixtures?
4. Should we test token security and private-data exclusion explicitly?
5. Should we add visual regression screenshots for desktop/mobile?
6. Should we run accessibility checks on the filter UI?
7. Should empty states be designed for no works, no filter results, and API failure?
8. Should loading states be visible or should pages rely mostly on server rendering?

## Deployment And Operations

1. Where will `portfolio-isabella` be deployed?
2. What will the production Copy Vortex API base URL be?
3. Which environment variables are required in production and preview?
4. Should preview deployments use production Copy Vortex data or staging data?
5. How do we rotate the token without downtime?
6. Should CORS be configured, or will all token requests stay server-side?
7. Should the Copy Vortex endpoint allow requests only from known hosts, in addition to token auth?
8. Should errors notify us somewhere?

## Recommended Defaults

These are initial recommendations, not final decisions:

- Use one aggregate endpoint: `GET /api/v1/external/portfolio`.
- Keep the token server-only in `portfolio-isabella`.
- Start with public data only.
- Add a `featured` flag and manual order for works.
- Let Copy Vortex perform filtering and return facets.
- Keep testimonials/services local at first unless Copy Vortex already has clean fields for them.
- Preserve the best visual ideas from `portfolio-isabella-v1`, but redesign the portfolio browser around richer dynamic data.
- Add token hashing/revocation soon, even if Phase 1 starts with an environment token.


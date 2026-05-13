# Dynamic Copy Vortex Portfolio Plan

## Goal

Turn `portfolio-isabella` into a dynamic, writer-specific portfolio site powered by Copy Vortex data.

`portfolio-isabella-v1` stays unchanged and acts as the visual/content reference for the first version. The new `portfolio-isabella` should become the flexible production site: beautiful, filter-rich, fast, and able to update whenever Isabella updates her Copy Vortex profile, works, projects, companies, tags, or public metadata.

## Current Situation

- `copy-vortex` already has public portfolio infrastructure:
  - public works: `/api/v1/public/works`
  - public projects: `/api/v1/public/projects`
  - public companies: `/api/v1/public/companies`
  - public writer pages inside the app: `/writers/[username]`, `/writers/[username]/works`, `/writers/[username]/stats`, `/writers/[username]/cv`
- Copy Vortex already models:
  - writer profile data
  - portfolio visibility
  - public/unlisted/private works
  - companies, projects, tags, languages, credits, images, published/proof URLs
  - public writer analytics
- `portfolio-isabella-v1` is a clean static Next portfolio with sections for hero, portfolio preview, experience, showcase image, and contact.
- `portfolio-isabella` is an older Next project with local article/company models and internal API routes. For the dynamic version, it should stop owning portfolio content and become a frontend client for Copy Vortex.

## Product Direction

The portfolio should feel like a dedicated writer site, not a generic directory page.

The first screen should clearly establish Isabella as the writer and show:

- name / public name
- headline
- short positioning statement
- portrait or branded visual
- strongest proof signals
- primary calls to action, such as contact, browse work, view CV, or open selected publication

The portfolio area should be powerful and pleasant to explore:

- filter by format, activity, topic, industry, language, company, project, credit type, and date
- search across titles, summaries, excerpts, and possibly company/project names
- sort by recent, published date, title, featured, or project/company grouping
- switch views: editorial grid, compact list, timeline, case-study view
- show facets with counts
- support deep links for filters so a specific collection can be shared
- support curated/featured sections on the home page

## Proposed Architecture

Use Copy Vortex as the source of truth.

`portfolio-isabella` should make server-side requests to Copy Vortex API routes using an environment token:

```txt
COPY_VORTEX_API_BASE_URL=https://copy-vortex.example.com
COPY_VORTEX_PORTFOLIO_TOKEN=...
COPY_VORTEX_WRITER_SLUG=isabella
```

The token must never be exposed to the browser. Requests should happen from Next server components, route handlers, or server-side data functions.

### Recommended API Shape

Add a dedicated Copy Vortex endpoint for external portfolio clients:

```txt
GET /api/v1/external/portfolio
Authorization: Bearer <portfolio token>
```

Optional query params:

```txt
locale=en
q=translation
format=article
activity=copywriting
topic=travel
industry=publishing
language=en
originLanguage=pt
targetLanguage=en
company=acme
project=launch-campaign
creditType=author
publishedFrom=2025-01-01
publishedTo=2026-12-31
sort=published
page=1
limit=24
```

Response should be a single portfolio payload:

```js
{
  writer: { ...public profile fields },
  works: [...],
  projects: [...],
  companies: [...],
  analytics: { ...public writer analytics },
  facets: {
    formats: [],
    activities: [],
    topics: [],
    industries: [],
    languages: [],
    originLanguages: [],
    targetLanguages: [],
    companies: [],
    projects: [],
    creditTypes: []
  },
  summary: {
    totalPublicWorks: 0,
    linkedCompanies: 0,
    linkedProjects: 0
  },
  pagination: {
    page: 1,
    limit: 24,
    total: 0
  }
}
```

Why a single endpoint:

- simpler client code in `portfolio-isabella`
- one token validation point
- fewer network round trips
- stable contract for a dedicated external site
- Copy Vortex can safely shape/sanitize exactly what this portfolio should receive

### Alternative API Shape

Reuse existing public routes:

```txt
GET /api/v1/public/works?writer=isabella
GET /api/v1/public/projects?writer=isabella
GET /api/v1/public/companies?writer=isabella
```

This is faster to start, but it is less ideal because:

- writer-scoped project/company filtering may need extension
- the frontend must merge multiple payloads
- external portfolio auth/rate limits are harder to isolate
- the API contract is more directory-oriented than portfolio-site-oriented

## Token Strategy

Use a writer-scoped portfolio token in Copy Vortex.

Recommended model:

- token is generated in Copy Vortex admin/writer settings
- token maps to exactly one writer/user/profile
- token has scopes, for example:
  - `portfolio:read`
  - `portfolio:analytics:read`
- token can be revoked and rotated
- token is stored hashed in the database
- raw token is shown only once at creation time
- requests are logged without storing the raw token

Minimum viable version:

- environment variable in Copy Vortex maps one static token to Isabella's user/profile ID
- endpoint checks `Authorization: Bearer ...`
- no browser exposure
- rate limit later

Better production version:

- `PortfolioAccessToken` model
- hashed token
- `userId`
- `label`
- `scopes`
- `lastUsedAt`
- `revokedAt`
- `expiresAt`
- audit log entries for create/revoke/use failures

## Copy Vortex Backend Work

1. Add external portfolio token validation.
2. Add writer-scoped portfolio service that reuses existing public portfolio/profile/analytics services.
3. Add `GET /api/v1/external/portfolio`.
4. Sanitize all returned fields for public portfolio usage.
5. Include filters and facets compatible with the existing public works directory.
6. Add tests for:
   - missing token returns 401
   - invalid/revoked token returns 403
   - token only returns its writer's data
   - private works are never returned
   - unlisted/private profile behavior is intentional
   - filters and facets match existing public directory behavior

## Portfolio Frontend Work

Refactor `portfolio-isabella` toward a clean external client:

- remove or ignore old local Mongo/article/company data paths
- add `src/lib/copyVortexClient.js`
- add server-side data functions:
  - `getPortfolioOverview()`
  - `getPortfolioWorks(searchParams)`
  - `getPortfolioWork(slug)`
  - possibly `getPortfolioFacets()`
- keep token reads server-only
- design components around the v1 visual direction, but with dynamic data

Suggested pages:

- `/` - immersive writer homepage with featured works and live stats
- `/portfolio` - full filterable work browser
- `/portfolio/[slug]` - work detail / case study page
- `/projects` - grouped project stories
- `/companies` - brand/company index
- `/about` - dynamic profile, CV, skills, languages
- `/contact` - static or dynamic contact CTA

## UI And Experience Ideas

### Homepage

- hero with Isabella's name, headline, portrait/cover visual, and a concise positioning line
- featured works carousel or editorial grid
- "proof bar" with counts: works, industries, languages, companies, projects
- specialty chips from Copy Vortex tags
- recent publications
- selected company/project strip
- contact CTA

### Portfolio Browser

Controls:

- search input
- segmented view switch: Grid / List / Timeline
- sort menu
- filter drawer on mobile
- sticky filter rail on desktop
- active filter chips
- clear all filters

Filters:

- content type / format
- activity
- industry
- topic
- source language
- target language
- company
- project
- credit type
- publication date range
- featured only, if we add a featured flag

Cards:

- title
- summary/excerpt
- cover image or company/project visual
- tags
- language pair
- company/project
- published/proof link
- date
- role/credit

### Detail Pages

- title and proof links
- summary and long description
- role, scope, languages, tags
- linked company/project
- related works
- optional assets
- optional metrics if Copy Vortex marks them public

## Data Contract Notes

Fields that are probably safe:

- public profile fields
- public name, headline, intro, bio, location if public
- avatar/cover images
- public tags and specialties
- public works only
- work title, summary, excerpt, long description, highlights
- public/proof URLs
- cover image/assets marked public
- company/project references marked public
- public analytics summaries

Fields that should stay private unless explicitly marked public:

- revenue
- payout plans
- deadlines
- private internal status
- client email/contact details
- private messages/collaborations
- hidden contributors
- internal notes
- draft/private works

## Caching Strategy

Start simple:

- server-side fetch with short revalidation, for example 60-300 seconds
- manual refresh by redeploy or cache invalidation later

Better later:

- Copy Vortex webhook triggers portfolio revalidation
- cache tags per writer
- stale-while-revalidate behavior

## Deployment Notes

`portfolio-isabella` needs these production environment variables:

```txt
COPY_VORTEX_API_BASE_URL=
COPY_VORTEX_PORTFOLIO_TOKEN=
COPY_VORTEX_WRITER_SLUG=isabella
NEXT_PUBLIC_SITE_URL=
```

Copy Vortex needs either:

```txt
EXTERNAL_PORTFOLIO_TOKENS=...
```

or a database-backed token model.

## Suggested Implementation Phases

### Phase 1 - Contract And Token

- Decide endpoint shape.
- Add Copy Vortex external portfolio endpoint.
- Add minimal token validation.
- Return writer profile, works, facets, summary.
- Write focused backend tests.

### Phase 2 - Portfolio Client Skeleton

- Add Copy Vortex client to `portfolio-isabella`.
- Replace local/static content sources with API data.
- Build homepage from live writer/profile/featured work data.
- Keep a graceful fallback if Copy Vortex is unavailable.

### Phase 3 - Filterable Portfolio

- Build `/portfolio` with search, filters, sort, pagination, and active filter chips.
- Make URL params the source of truth.
- Add mobile filter drawer and desktop filter rail.

### Phase 4 - Detail Pages And Rich Presentation

- Build `/portfolio/[slug]`.
- Add project/company grouping.
- Add related works.
- Add visual polish and responsive QA.

### Phase 5 - Production Hardening

- Add proper token model and rotation.
- Add rate limits.
- Add audit logs.
- Add revalidation/webhook strategy.
- Add tests around the external client data adapter.

## Decisions To Discuss

1. Should the portfolio show only `public` profile/data, or should the token allow `unlisted` Isabella data too?
2. Do we want one aggregate endpoint or multiple public endpoints?
3. Should filtering happen entirely in Copy Vortex, or should the portfolio fetch a full writer dataset and filter locally?
4. Does Isabella need multilingual portfolio pages?
5. Which fields should be editable in Copy Vortex specifically for this standalone site?
6. Do we need a "featured" flag/order for works, projects, and companies?
7. Should `portfolio-isabella` visually follow v1 closely, or should we redesign more boldly now that the data is rich?

## Recommendation

Build a dedicated `GET /api/v1/external/portfolio` endpoint in Copy Vortex with a writer-scoped bearer token. Keep `portfolio-isabella` as a server-rendered Next frontend that never exposes the token and treats Copy Vortex as the only content source.

For the first dynamic release, prioritize:

- live hero/profile data
- featured/recent works
- a strong `/portfolio` browser with filters
- stable URLs for filtered views
- a polished responsive layout based on the best parts of v1


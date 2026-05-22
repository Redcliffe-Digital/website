# Editing content

Where to change the words, contact details and credentials. Most copy lives in a
small number of files so you rarely need to touch the components.

## Global details (used everywhere)

**`src/lib/site.ts`** — the single source of truth for:

- Company name, legal name, description, tagline
- Contact email, press email, careers email, phone
- Office address
- Company number (currently `17197703`)
- Canonical site URL (`site.url`) — used for metadata, sitemap and Open Graph
- The primary nav and the footer "Services" links

Change a phone number or email here and it updates the footer, contact page,
metadata and structured data at once.

## Page copy

| Page                               | File                                                                                   |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| Home                               | `src/app/page.tsx` (hero, "why a small firm", CTAs, JSON-LD)                           |
| What we do                         | `src/content/practices.ts` (the four practice areas + procurement vehicles)            |
| Case studies                       | `src/content/case-studies.ts` (all three studies; cards + detail pages read from here) |
| About                              | `src/app/about/page.tsx` (lead, "how we work", team, company facts)                    |
| Contact                            | `src/app/contact/page.tsx` (form fields, contact details)                              |
| Accessibility                      | `src/app/legal/accessibility/page.tsx` (real statement)                                |
| Privacy / Cookies / Modern Slavery | `src/app/legal/**/page.tsx` (placeholders — see the `TODO: drafted by legal` markers)  |

### Adding or reordering case studies

Edit `src/content/case-studies.ts`. Each study has an `order` field controlling its
position on the index and home pages. Add an object to the `caseStudies` array and a
new detail page is generated automatically at `/case-studies/<slug>/`.

## Credentials / trust badges

**`src/components/Badges.tsx`** holds the three credentials currently shown
(AWS Certified Solutions Architect – Professional, Microsoft Certified: Azure
Solutions Architect Expert, Cyber Essentials). The emblems are monochrome
placeholders — see the `TODO` at the top of the file for how to swap in the
official issued artwork (Credly / IASME) with verification links. The same
credentials are listed as `hasCredential` in the home-page JSON-LD
(`src/app/page.tsx`).

## Header / footer chrome

- Logo wordmark: `src/components/Logo.tsx`
- Header nav: edit `nav` in `src/lib/site.ts`
- Footer columns (Company, Legal): `src/components/Footer.tsx`

## Design tokens

Colours, fonts and the content width live in the `@theme` block at the top of
`src/app/globals.css`. Fonts are configured in `src/app/layout.tsx`.

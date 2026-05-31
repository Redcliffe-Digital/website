# Next steps before launch

A checklist of what to replace, how to host, what it costs, and a few decisions to
revisit. Items are roughly in priority order within each section.

## 1. Placeholders to replace

Most placeholders are marked in the UI as `(placeholder)` or in code with a `TODO`
comment. Search the repo for `TODO` and `placeholder` to find them all.

### Facts and identifiers

- [ ] **Phone number** — `site.phone` / `site.phoneHref` in `src/lib/site.ts` (currently `+44 (0)117 374 9120`).
- [ ] **VAT number, ICO registration** — `companyFacts` in `src/app/about/page.tsx`. (Registered office address is set.)
- [ ] **Phone number area code** — the placeholder number uses `0117` (Bristol); the office is now Newcastle (`01782`). Update `site.phone`.
- [ ] **Supplier ID** `RDC-2026-008` — `src/app/contact/page.tsx`.
- [ ] **Company number** is set to `17197703`. Confirm this is correct (it appears in the footer, About page and JSON-LD).
- [ ] **Canonical site URL** — `site.url` in `src/lib/site.ts` assumes `https://www.redcliffedigital.co.uk`.

### Claims to verify (these are statements to procurement — make sure they are true)

- [ ] **Framework listings** — the What we do page and Contact page state we are on
      **G-Cloud 14, Digital Outcomes 6, Cyber Security Services 3 and Spark DPS**. Only
      keep the ones we are actually listed on. Edit `procurementVehicles` in
      `src/content/practices.ts` and the Procurement block in `src/app/contact/page.tsx`.
- [ ] **Team members** — names, roles and "Previously:" histories in
      `src/app/about/page.tsx` are illustrative. Replace with real people (and consider
      whether to name former employers).
- [ ] **Case studies** — `src/content/case-studies.ts` contains plausible but invented
      engagements. Replace with real, cleared work (see §4).

### Credentials / official badge artwork

- [ ] Swap the placeholder emblems in `src/components/Badges.tsx` for the **official
      issued artwork**, each linked to its verification page:
  - AWS Certified Solutions Architect – Professional → Credly badge image + verify URL.
  - Microsoft Certified: Azure Solutions Architect Expert → Credly / Microsoft Learn badge + verify URL.
  - Cyber Essentials → IASME-issued badge (carries the certificate number) + the entry on the IASME/NCSC register.
  - ISO 27001 → the UKAS-accredited certification body's mark + certificate reference.
  - Crown Commercial Service — G-Cloud 14 Supplier → the CCS supplier badge + Digital Marketplace listing link.
  - Disability Confident → the DWP-issued badge at the correct level (Committed / Employer / Leader).
- [ ] Decide whether to keep the **monochrome treatment** (consistent with the design)
      or use the awarding bodies' **full-colour** badges. Full-colour will break the
      "single calm row" look — if you go that way, give the trust strip more breathing room.
- [ ] Confirm the **Disability Confident level** — the badge is currently labelled
      "Committed" (level 1). Update the label in `src/components/Badges.tsx` if you are
      Employer or Leader.

### Wiring and integrations

- [ ] **Contact form Formspree ID** — the form (`src/components/ContactForm.tsx`) now
      submits to **Formspree** via fetch, with in-page success/error states and a `_gotcha`
      honeypot Formspree filters automatically. Create a free form at https://formspree.io
      and replace `YOUR_FORM_ID` in `site.formspreeEndpoint` (`src/lib/site.ts`). Until then,
      submissions will fail and the form points visitors at the direct email address.
- [ ] **GitHub "View source" link** — footer points at a placeholder repo URL
      (`src/components/Footer.tsx`). Update once the repo is public, or remove the link.
- [ ] **`security@` inbox** — confirm it is monitored, and review the `Expires` date in
      `public/.well-known/security.txt` (set to 2027-05-22; refresh annually).
- [ ] **Accessibility statement** — confirm the test dates, tools and any audit reference
      in `src/app/legal/accessibility/page.tsx`, and set a real review cadence.

## 2. Analytics decision

There is **no analytics by default** (no cookies → no cookie banner). A commented-out,
cookieless **Plausible** tag is in `src/app/layout.tsx`. To enable it, uncomment the
tag and set `data-domain`. If you add anything that sets cookies, draft the cookie
notice (`src/app/legal/cookies/page.tsx`) and add a banner first.

## 3. AWS hosting (S3 + CloudFront + ACM + Route 53)

The site is a static export, so hosting is simple and cheap.

1. **S3 bucket** — create a private bucket (e.g. `redcliffedigital-co-uk-site`). Do **not**
   enable public access; serve it only through CloudFront.
2. **Upload** — `aws s3 sync ./out s3://<bucket> --delete`.
   - The OG image is served at the extension-less path `/opengraph-image`. Set its
     content type explicitly so social scrapers accept it:
     `aws s3 cp ./out/opengraph-image s3://<bucket>/opengraph-image --content-type image/png --metadata-directive REPLACE`.
3. **ACM certificate** — request a public cert for `redcliffedigital.co.uk` and
   `www.redcliffedigital.co.uk` in **us-east-1** (CloudFront requires that region).
4. **CloudFront distribution** — origin = the S3 bucket via **Origin Access Control
   (OAC)**; attach the ACM cert; set the alternate domain names; default root object
   `index.html`; redirect HTTP→HTTPS.
   - Because `trailingSlash` is enabled, requests like `/about/` map to
     `/about/index.html`. Add a small **CloudFront Function** (viewer-request) that
     appends `index.html` to URIs ending in `/` so deep links resolve cleanly.
   - Point the 403/404 responses at `/404.html`.
5. **Route 53** — A/AAAA alias records for the apex and `www` pointing at the
   distribution.
6. **Cache invalidation on deploy** — `aws cloudfront create-invalidation --paths "/*"`
   (or invalidate only changed paths). Consider wiring this into the CI workflow on
   pushes to `main`.

## 4. Suggested case study ordering (once real ones exist)

Order on impact and relevance to the public-sector buyer. A sensible default:

1. **The most public-sector, most measurable one** — lead with a central-government
   result expressed as a hard number (the kind of "MTTR down 90%" framing already used).
2. **A credibility-by-association one** — the regulated/finance engagement that proves
   the "trading-grade" claim.
3. **A breadth one** — local government / assurance, showing range and plain-English
   delivery.

Keep the home page to three "Selected work" cards; surface the rest on
`/case-studies`. Re-order by setting the `order` field in
`src/content/case-studies.ts`.

## 5. Rough monthly hosting cost

For a small marketing site with low-to-moderate traffic, hosted on S3 + CloudFront:

| Item                                                         | Estimate (GBP/month) |
| ------------------------------------------------------------ | -------------------- |
| S3 storage (a few MB) + requests                             | < £0.50              |
| CloudFront (low traffic, well within the free-tier-ish band) | £0–£2                |
| Route 53 hosted zone                                         | ~£0.40               |
| ACM certificate                                              | £0 (free)            |
| **Typical total**                                            | **≈ £1–£5 / month**  |

A traffic spike (e.g. a tender announcement or press coverage) might push CloudFront
to a few pounds for the month, but data egress for a text-and-SVG site is tiny. The
dominant fixed cost is the Route 53 hosted zone. Domain registration/renewal is
separate (typically ~£10–£20/year for a `.co.uk`).

```

```

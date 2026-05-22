# Redcliffe Digital

Marketing website for Redcliffe Digital Ltd — a UK technology consultancy. A small,
statically-exported Next.js site designed to be calm, credible and government-friendly.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **lucide-react** for icons
- **next/font** — Fraunces (display) and Inter (body/UI)
- Output is a fully static site (`output: 'export'`) — no server runtime needed
- No client-side JavaScript for content: every page is a server component

## Prerequisites

- **Node 20** (pinned in `.nvmrc`). With nvm: `nvm use`.
- **pnpm 9** — enable via Corepack (bundled with Node):
  ```bash
  corepack enable pnpm
  ```

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build and export

```bash
pnpm build        # builds and writes the static site to ./out
pnpm export       # alias for build (kept for muscle memory)
pnpm serve        # serve the built ./out locally on :3000 to sanity-check
```

`pnpm build` produces a complete static site in `out/`, including `robots.txt`,
`sitemap.xml`, the generated Open Graph image and `.well-known/security.txt`.

## Quality checks

```bash
pnpm lint         # ESLint (next/core-web-vitals + next/typescript)
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier (write)
pnpm format:check # Prettier (check only)
```

CI runs `lint`, `typecheck` and `build` on every push (`.github/workflows/ci.yml`),
plus a non-blocking axe-core accessibility pass against the built site.

## Project structure

```
src/
  app/                 App Router routes
    layout.tsx         Root layout: fonts, metadata, header/footer, skip link
    globals.css        Tailwind import + design tokens + print styles
    page.tsx           Home
    what-we-do/        Services
    case-studies/      Index + [slug] detail template
    about/  contact/   About, Contact
    legal/             Privacy, Cookies, Modern Slavery (stubs), Accessibility (real)
    opengraph-image.tsx  Build-time OG image
    robots.ts  sitemap.ts
  components/          Header, Footer, Badges, Logo, Button, Section, etc.
  content/             Editable copy: case-studies.ts, practices.ts
  lib/                 site.ts — site-wide constants and nav
public/
  .well-known/security.txt
```

## Editing content

See **CONTENT.md** for where to change copy, contact details and credentials.

## Deployment

See **NEXT_STEPS.md** for the recommended AWS hosting setup (S3 + CloudFront + ACM +
Route 53), a cost estimate, and the list of placeholders to replace before launch.

## Accessibility and privacy

- Targets WCAG 2.2 AA: semantic landmarks, keyboard navigation, visible focus rings,
  `prefers-reduced-motion` respected, AA colour contrast. See `/legal/accessibility`.
- No cookies, no third-party scripts, no analytics by default — so no cookie banner.

```

```

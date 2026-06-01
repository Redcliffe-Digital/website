/*
 * Credential badges — the accreditations Redcliffe Digital holds.
 *
 * Each badge renders a colour logo image from /public/badges/<id>.svg, sat on a
 * white tile so the colour marks read on both the light trust strip and the
 * dark footer.
 *
 * NOTE: these emblems are tasteful REPRESENTATIONS in each body's brand colours,
 * not the official issued artwork. Before launch, swap each file in
 * public/badges/ for the real asset and link it to its verification page,
 * used within the awarding body's brand guidelines —
 *   - AWS Certified Developer – Associate: the holder's Credly badge image +
 *     verification URL (https://www.credly.com/badges/<id>).
 *   - Microsoft Certified: Azure Fundamentals: the holder's Credly /
 *     Microsoft Learn badge image + verification URL.
 *   - Cyber Essentials: the IASME-issued badge (carries the certificate
 *     number) + the entry on the NCSC/IASME certificate register.
 *   - ISO 27001: the UKAS-accredited certification body's mark + certificate
 *     reference.
 *   - Disability Confident: the DWP-issued badge at the correct level
 *     (Committed / Employer / Leader).
 */

interface BadgeDef {
  id: string
  /** Full credential name, used for the caption and the accessible label. */
  label: string
  /** Logo image, relative to the site root (served from /public). */
  src: string
}

const BADGES: BadgeDef[] = [
  {
    id: 'aws-developer-associate',
    label: 'AWS Certified Developer – Associate',
    src: '/badges/aws-developer-associate.svg',
  },
  {
    id: 'azure-fundamentals',
    label: 'Microsoft Certified: Azure Fundamentals',
    src: '/badges/azure-fundamentals.svg',
  },
  {
    id: 'cyber-essentials',
    label: 'Cyber Essentials',
    src: '/badges/cyber-essentials.svg',
  },
  {
    id: 'iso-27001',
    label: 'ISO 27001',
    src: '/badges/iso-27001.svg',
  },
  {
    id: 'disability-confident',
    label: 'Disability Confident Committed',
    src: '/badges/disability-confident.svg',
  },
]

interface BadgesProps {
  /** 'dark' for light backgrounds (trust strip); 'light' for the dark footer. */
  variant?: 'dark' | 'light'
  /** Logo height in px (the white tile is sized around it). */
  size?: number
  /** Show the full credential caption beneath each emblem. */
  showLabels?: boolean
  /** Restrict to a subset of badges, in order. */
  ids?: string[]
  className?: string
}

export function Badges({
  variant = 'dark',
  size = 48,
  showLabels = true,
  ids,
  className = '',
}: BadgesProps) {
  const items = ids
    ? ids.map((id) => BADGES.find((b) => b.id === id)).filter((b): b is BadgeDef => Boolean(b))
    : BADGES

  const caption = variant === 'light' ? 'text-white/65' : 'text-muted'
  const tilePad = 12
  const tileSize = size + tilePad * 2

  return (
    <ul
      className={`flex flex-wrap items-start ${showLabels ? 'justify-center gap-x-8 gap-y-8 sm:justify-between' : 'gap-4'} ${className}`}
    >
      {items.map((badge) => (
        <li key={badge.id} className="flex flex-col items-center text-center">
          <span
            className="flex items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5"
            style={{ height: tileSize, width: tileSize }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.src}
              alt={showLabels ? '' : badge.label}
              height={size}
              width={size}
              style={{ height: size, width: size }}
              loading="lazy"
              decoding="async"
            />
          </span>
          {showLabels ? (
            <span
              className={`mt-3 max-w-[16ch] text-[11px] leading-snug font-medium tracking-wide uppercase ${caption}`}
            >
              {badge.label}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

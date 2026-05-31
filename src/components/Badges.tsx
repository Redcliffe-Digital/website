import type { ReactNode } from 'react'

/*
 * Credential badges — the accreditations Redcliffe Digital holds.
 *
 * These monochrome emblems are accurate REPRESENTATIONS that match the site's
 * restrained palette. They are not the awarding bodies' colour artwork.
 *
 * TODO: swap for the official issued assets before launch, each linked to its
 * verification page and used within the awarding body's brand guidelines —
 *   - AWS Certified Developer – Associate: the holder's Credly
 *     badge image + verification URL (https://www.credly.com/badges/<id>).
 *   - AWS Certified Cloud Practitioner: the holder's Credly
 *     badge image + verification URL.
 *   - Cyber Essentials: the IASME-issued badge (carries the certificate
 *     number) + the entry on the NCSC/IASME certificate register.
 *   - ISO 27001: the UKAS-accredited certification body's mark + certificate
 *     reference (use the body's logo, not a generic "ISO" mark).
 *   - Disability Confident: the DWP-issued badge at the correct level
 *     (Committed / Employer / Leader).
 */

interface BadgeDef {
  id: string
  /** Full credential name, used for the caption and the accessible label. */
  label: string
  /** Inner SVG shapes, drawn in a 48×48 viewBox using currentColor. */
  art: ReactNode
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}

const BADGES: BadgeDef[] = [
  {
    id: 'aws-developer-associate',
    label: 'AWS Certified Developer – Associate',
    art: (
      <g>
        {/* Hexagonal "gem" — the shape of the AWS Certified badge family. */}
        <polygon points="24 5 40 14 40 34 24 43 8 34 8 14" {...stroke} />
        {/* Cloud, for AWS. */}
        <g fill="currentColor">
          <circle cx="21" cy="27" r="4.5" />
          <circle cx="28" cy="25" r="6" />
          <rect x="17" y="27" width="15" height="6" rx="3" />
        </g>
      </g>
    ),
  },
  {
    id: 'aws-cloud-practitioner',
    label: 'AWS Certified Cloud Practitioner',
    art: (
      <g>
        {/* Hexagonal "gem" — the shape of the AWS Certified badge family. */}
        <polygon points="24 5 40 14 40 34 24 43 8 34 8 14" {...stroke} />
        {/* Cloud, for AWS. */}
        <g fill="currentColor">
          <circle cx="21" cy="27" r="4.5" />
          <circle cx="28" cy="25" r="6" />
          <rect x="17" y="27" width="15" height="6" rx="3" />
        </g>
      </g>
    ),
  },
  {
    id: 'cyber-essentials',
    label: 'Cyber Essentials',
    art: (
      <g>
        <path d="M24 6 L40 11 V23 C40 33 32 39 24 42 C16 39 8 33 8 23 V11 Z" {...stroke} />
        <path d="M16 23 L21.5 29 L33 16" {...stroke} strokeWidth={2.6} />
      </g>
    ),
  },
  {
    id: 'iso-27001',
    label: 'ISO 27001',
    art: (
      // A medal/seal — concentric rings with ribbon tails.
      <g>
        <path d="M18 30 L14 41 L19.5 38 L21 41 L24 31 Z" fill="currentColor" />
        <path d="M30 30 L34 41 L28.5 38 L27 41 L24 31 Z" fill="currentColor" />
        <circle cx="24" cy="22" r="12" {...stroke} />
        <circle cx="24" cy="22" r="5.5" {...stroke} />
      </g>
    ),
  },
  {
    id: 'disability-confident',
    label: 'Disability Confident Committed',
    art: (
      <g>
        <circle cx="24" cy="24" r="14" {...stroke} />
        <path d="M16 24.5 L21.5 30 L33 17.5" {...stroke} strokeWidth={2.6} />
      </g>
    ),
  },
]

interface BadgesProps {
  /** 'dark' for light backgrounds (trust strip); 'light' for the dark footer. */
  variant?: 'dark' | 'light'
  /** Emblem height in px. */
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

  const tone = variant === 'light' ? 'text-white' : 'text-body'
  const caption = variant === 'light' ? 'text-white/65' : 'text-muted'

  return (
    <ul
      className={`flex flex-wrap items-start ${showLabels ? 'justify-center gap-x-8 gap-y-8 sm:justify-between' : 'gap-5'} ${tone} ${className}`}
    >
      {items.map((badge) => (
        <li key={badge.id} className="flex flex-col items-center text-center">
          <svg
            viewBox="0 0 48 48"
            height={size}
            width={size}
            role="img"
            aria-label={showLabels ? undefined : badge.label}
            aria-hidden={showLabels ? true : undefined}
          >
            {badge.art}
          </svg>
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

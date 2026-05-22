import type { ReactNode } from 'react'

/*
 * Credential badges — the three Redcliffe Digital actually holds.
 *
 * These monochrome emblems are accurate REPRESENTATIONS that match the site's
 * restrained palette. They are not the awarding bodies' colour artwork.
 *
 * TODO: swap for the official issued assets before launch —
 *   - AWS Certified Solutions Architect – Professional: the holder's Credly
 *     badge image + verification URL (https://www.credly.com/badges/<id>).
 *   - Microsoft Certified: Azure Solutions Architect Expert: the holder's
 *     Credly/Microsoft Learn badge image + verification URL.
 *   - Cyber Essentials: the IASME-issued badge (carries the certificate
 *     number) + the entry on the NCSC/IASME certificate register.
 * Each official badge must be linked to its verification page and used within
 * the awarding body's brand guidelines.
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
    id: 'aws-sa-pro',
    label: 'AWS Certified Solutions Architect – Professional',
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
    id: 'azure-sa-expert',
    label: 'Microsoft Certified: Azure Solutions Architect Expert',
    art: (
      // The Microsoft four-square mark.
      <g fill="currentColor">
        <rect x="9" y="9" width="13" height="13" />
        <rect x="26" y="9" width="13" height="13" />
        <rect x="9" y="26" width="13" height="13" />
        <rect x="26" y="26" width="13" height="13" />
      </g>
    ),
  },
  {
    id: 'cyber-essentials',
    label: 'Cyber Essentials',
    art: (
      <g>
        <path
          d="M24 6 L40 11 V23 C40 33 32 39 24 42 C16 39 8 33 8 23 V11 Z"
          {...stroke}
        />
        <path d="M16 23 L21.5 29 L33 16" {...stroke} strokeWidth={2.6} />
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
      className={`flex flex-wrap items-start ${showLabels ? 'justify-center gap-x-12 gap-y-8 sm:gap-x-16' : 'gap-5'} ${tone} ${className}`}
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
              className={`mt-3 max-w-[16ch] text-[11px] font-medium uppercase leading-snug tracking-wide ${caption}`}
            >
              {badge.label}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

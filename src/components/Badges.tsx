import type { ReactNode } from 'react'

/*
 * TODO: replace with official partner artwork once accreditation confirmed.
 *
 * These are placeholder emblems drawn in-house. They are NOT the official
 * AWS, Microsoft Azure, IASME (Cyber Essentials), ISO, Crown Commercial
 * Service or Disability Confident marks. Using the real logos requires the
 * awarding body's permission and adherence to their brand guidelines, so do
 * not ship these to production as-is. They exist only to establish layout and
 * the monochrome "row of credentials" treatment.
 */

interface BadgeDef {
  id: string
  /** Full accreditation name, used for the caption and the accessible label. */
  label: string
  /** Inner SVG shapes, drawn in a 48×48 viewBox using currentColor. */
  art: ReactNode
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}

const BADGES: BadgeDef[] = [
  {
    id: 'aws',
    label: 'AWS Advanced Tier Services Partner',
    art: (
      <g fill="currentColor">
        <circle cx="19" cy="26" r="8" />
        <circle cx="30" cy="23" r="10" />
        <rect x="13" y="26" width="24" height="10" rx="5" />
      </g>
    ),
  },
  {
    id: 'azure',
    label: 'Microsoft Azure Solutions Partner',
    art: (
      <g>
        <path d="M24 11 L39 37 H9 Z" {...stroke} />
        <path d="M24 22 L31 37 H17 Z" fill="currentColor" />
      </g>
    ),
  },
  {
    id: 'ce-plus',
    label: 'Cyber Essentials Plus',
    art: (
      <g>
        <path d="M24 10 L37 14.5 V24 C37 31.5 31.4 36.6 24 39 C16.6 36.6 11 31.5 11 24 V14.5 Z" {...stroke} />
        <path d="M24 18 V28 M19 23 H29" {...stroke} />
      </g>
    ),
  },
  {
    id: 'iso',
    label: 'ISO 27001',
    art: (
      <g>
        <path d="M18 30 L14 41 L19.5 38 L21 41 L24 31 Z" fill="currentColor" />
        <path d="M30 30 L34 41 L28.5 38 L27 41 L24 31 Z" fill="currentColor" />
        <circle cx="24" cy="22" r="12" {...stroke} />
        <circle cx="24" cy="22" r="5.5" {...stroke} />
      </g>
    ),
  },
  {
    id: 'g-cloud',
    label: 'Crown Commercial Service — G-Cloud 14 Supplier',
    art: (
      <g fill="currentColor">
        <path d="M10 33 L12 18 L19 25 L24 15 L29 25 L36 18 L38 33 Z" />
        <rect x="10" y="33" width="28" height="5" rx="1" />
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
  /** Show the full accreditation caption beneath each emblem. */
  showLabels?: boolean
  /** Restrict to a subset of badges, in order (footer shows five). */
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
              className={`mt-3 max-w-[12ch] text-[11px] font-medium uppercase leading-snug tracking-wide ${caption}`}
            >
              {badge.label}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

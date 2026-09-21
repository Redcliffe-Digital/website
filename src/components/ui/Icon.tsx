import type { ReactNode } from 'react'

/**
 * Hairline icon set. Replaces the decorative 01/02/03 rails that used to sit in
 * front of section headings and list items: the numbers implied an order the
 * content does not have, and they read as template furniture.
 *
 * Icons are always decorative here. The adjacent heading or paragraph carries
 * the meaning, so every glyph is aria-hidden and never contributes an
 * accessible name.
 *
 * `name` is a plain string because it comes out of the CMS field of the same
 * name. An unknown value degrades to a neutral mark rather than a blank gap.
 */
const PATHS: Record<string, ReactNode> = {
  // Practice areas
  layers: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
    </>
  ),
  cloud: <path d="M17.5 19H7a4.5 4.5 0 0 1-.9-8.9 6 6 0 0 1 11.6 1.4 3.75 3.75 0 0 1-.2 7.5Z" />,
  pulse: <path d="M2 12h4l3 8 6-16 3 8h4" />,
  shield: (
    <>
      <path d="M12 21s7-3.6 7-9V5.6L12 3 5 5.6V12c0 5.4 7 9 7 9Z" />
      <path d="m9.2 11.8 2 2 3.6-3.6" />
    </>
  ),

  // Operating principles
  team: (
    <>
      <path d="M15.5 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20" />
      <circle cx="9.25" cy="8" r="3.4" />
      <path d="M21 20v-1.6a3.4 3.4 0 0 0-2.6-3.3" />
      <path d="M15.5 4.9a3.4 3.4 0 0 1 0 6.2" />
    </>
  ),
  merge: (
    <>
      <circle cx="6.5" cy="6.5" r="2.6" />
      <circle cx="17.5" cy="17.5" r="2.6" />
      <path d="M6.5 20.5V9.1a8.4 8.4 0 0 0 8.4 8.4" />
    </>
  ),
  unlock: (
    <>
      <rect x="4" y="10.5" width="16" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 7.7-1.5" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v3M12 17.5v3M20.5 12h-3M6.5 12h-3" />
    </>
  ),
  wave: <path d="M3 12c1.8-4.2 3.6-4.2 5.4 0s3.6 4.2 5.4 0 3.6-4.2 5.4 0" />,

  // List markers and affordances
  arrow: <path d="M4 12h14.5M13 6.5 18.5 12 13 17.5" />,
  check: <path d="M20 6.5 9.5 17 4 11.5" />,
  chevron: <path d="m9 5.5 6.5 6.5L9 18.5" />,
  dot: <circle cx="12" cy="12" r="3.25" />,
}

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.5,
}: {
  name: string
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name] ?? PATHS.dot}
    </svg>
  )
}

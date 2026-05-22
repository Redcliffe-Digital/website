interface LogoProps {
  /** 'default' for light backgrounds, 'inverse' for the dark footer/CTA band. */
  variant?: 'default' | 'inverse'
  className?: string
}

/**
 * Wordmark: a small oxblood square glyph, "Redcliffe" in Fraunces, then
 * "Digital" in Inter muted grey. The glyph is inline SVG; the wordmark is real
 * text (no image file) so it stays sharp, selectable and screen-reader friendly.
 */
export function Logo({ variant = 'default', className = '' }: LogoProps) {
  const word = variant === 'inverse' ? 'text-white' : 'text-ink'
  const sub = variant === 'inverse' ? 'text-white/65' : 'text-muted'

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden="true"
        focusable="false"
        className="shrink-0 translate-y-[1px]"
      >
        <rect width="14" height="14" fill="#8B1E2D" />
      </svg>
      <span className="text-[1.35rem] leading-none tracking-tight">
        <span className={`font-display font-medium ${word}`}>Redcliffe</span>{' '}
        <span className={`font-sans font-medium ${sub}`}>Digital</span>
      </span>
    </span>
  )
}

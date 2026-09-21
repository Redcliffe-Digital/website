import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const base =
  'group inline-flex min-h-11 items-center gap-2.5 rounded-brand px-5 py-3 font-mono text-label-sm sm:text-label uppercase tracking-[0.08em] transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-spring-subtle)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:bg-[#f08965] hover:scale-[1.02]',
  secondary:
    'border border-line-strong text-fg hover:border-accent-deep hover:bg-surface-high hover:scale-[1.02]',
}

/** Arrow doubles as the direction cue, so it is decorative to assistive tech. */
function Arrow({ idle = false }: { idle?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-200 ease-[var(--ease-spring-subtle)] group-hover:translate-x-1 ${
        idle ? 'cta-idle-arrow' : ''
      }`}
    >
      &rarr;
    </span>
  )
}

export function CtaLink({
  href,
  children,
  variant = 'primary',
  idle = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: Variant
  /** Pro tier: at most one idle-loop affordance per page. */
  idle?: boolean
  className?: string
}) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const content = (
    <>
      {children}
      <Arrow idle={idle} />
    </>
  )
  const classes = `${base} ${variants[variant]} ${className}`

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

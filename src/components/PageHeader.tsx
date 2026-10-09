import type { ReactNode } from 'react'
import { PageHero } from './PageHero'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  intro?: ReactNode
}

/**
 * Standard page-level header: H1 plus an optional intro line, on the same
 * waveform band as the rest of the site. Kept as a thin wrapper so the legal
 * pages keep their existing call signature.
 */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <PageHero>
      {eyebrow ? (
        <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">{eyebrow}</span>
        </p>
      ) : null}
      <h1
        className={`text-h1-sm md:text-h1 max-w-[20ch] font-bold tracking-[-0.03em] text-balance ${
          eyebrow ? 'mt-6' : ''
        }`}
      >
        {title}
      </h1>
      {intro ? (
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[62ch] border-l pl-5 md:pl-6">
          {intro}
        </p>
      ) : null}
    </PageHero>
  )
}

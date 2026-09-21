import Link from 'next/link'
import type { CaseStudy } from '@/content/case-studies'

export function CaseStudyCard({
  study,
  /** Heading level, so the card fits whatever section it is dropped into. */
  as: Title = 'h3',
}: {
  study: CaseStudy
  as?: 'h2' | 'h3'
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/case-studies/${study.slug}`}
        className="rounded-brand border-line bg-surface hover:border-accent-deep flex h-full flex-col border p-6 transition-[border-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-1 md:p-8"
      >
        <p className="text-label-sm text-fg-muted font-mono tracking-[0.08em] uppercase">
          {study.sector}
        </p>
        <Title className="text-h3-sm md:text-h3 mt-4 font-semibold tracking-[-0.02em] text-balance">
          {study.title}
        </Title>
        <p className="text-body-sm text-fg-muted mt-4 max-w-[58ch]">{study.excerpt}</p>
        <p className="text-label-sm text-accent mt-auto pt-8 font-mono tracking-[0.08em] uppercase">
          Read case study{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </p>
      </Link>
    </article>
  )
}

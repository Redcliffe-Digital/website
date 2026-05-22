import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/content/case-studies'

/**
 * Card linking to a case study detail page. Hairline border, no shadow,
 * 32px padding. The whole card is the link; the oxblood affordance signals it.
 *
 * `titleAs` sets the card title's heading level so the document outline stays
 * valid: h3 on the home page (under the "Selected work" h2), h2 on the
 * case-studies index (directly under the page h1).
 */
export function CaseStudyCard({
  study,
  titleAs: Title = 'h3',
}: {
  study: CaseStudy
  titleAs?: 'h2' | 'h3'
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group border-hairline bg-card hover:border-ink/30 flex h-full flex-col border p-8 transition-colors"
    >
      <p className="eyebrow">{study.sector}</p>
      <Title className="font-display text-ink mt-4 text-xl leading-snug font-medium">
        {study.title}
      </Title>
      <p className="text-muted mt-3 flex-1 text-[0.95rem] leading-relaxed">{study.excerpt}</p>
      <span className="text-oxblood mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
        Read case study
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}

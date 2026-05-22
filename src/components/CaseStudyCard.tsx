import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/content/case-studies'

/**
 * Card linking to a case study detail page. Hairline border, no shadow,
 * 32px padding. The whole card is the link; the oxblood affordance signals it.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group border-hairline bg-card hover:border-ink/30 flex h-full flex-col border p-8 transition-colors"
    >
      <p className="eyebrow">{study.sector}</p>
      <h3 className="font-display text-ink mt-4 text-xl leading-snug font-medium">{study.title}</h3>
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

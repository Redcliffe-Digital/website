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
      className="group flex h-full flex-col border border-hairline bg-card p-8 transition-colors hover:border-ink/30"
    >
      <p className="eyebrow">{study.sector}</p>
      <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink">
        {study.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{study.excerpt}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-oxblood">
        Read case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

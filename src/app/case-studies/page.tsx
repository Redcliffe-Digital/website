import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { sortedCaseStudies } from '@/content/case-studies'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Recent work in central government, the Lloyd’s insurance market and local government. Some clients ask not to be named — we honour that.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        title="Case studies"
        intro="A small selection of recent work. Some clients ask us not to name them — we honour that."
      />

      <section className="pb-20 pt-6 sm:pb-24 lg:pb-28" aria-label="Case studies">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedCaseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            <span aria-hidden="true">* </span>Client names changed where confidentiality applies.
          </p>
        </Container>
      </section>
    </>
  )
}

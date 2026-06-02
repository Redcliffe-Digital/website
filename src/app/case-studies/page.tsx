import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { sortedCaseStudiesBefore, sortedCaseStudiesDb, type CaseStudy } from '@/content/case-studies'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Recent work in cyber security, applied AI and quantitative trading. Some clients ask not to be named, we honour that.',
  alternates: { canonical: '/case-studies' },
}

function Grid({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} titleAs="h2" />
      ))}
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        title="Case studies"
        intro="A small selection of recent work. Some clients ask us not to name them, we honour that."
      />

      <section className="pt-6 pb-20 sm:pb-24 lg:pb-28" aria-label="Case studies">
        <Container>
          <div data-v="before">
            <Grid studies={sortedCaseStudiesBefore} />
          </div>
          <div data-v="db">
            <Grid studies={sortedCaseStudiesDb} />
          </div>
          <p className="text-muted mt-10 max-w-2xl text-sm leading-relaxed">
            <span aria-hidden="true">* </span>Client names changed where confidentiality applies.
          </p>
        </Container>
      </section>
    </>
  )
}

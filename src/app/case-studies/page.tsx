import type { Metadata } from 'next'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { sortedCaseStudiesBefore } from '@/content/case-studies'
import { stagger } from '@/lib/motion'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Recent work in cyber security, applied AI and quantitative trading. Some clients ask not to be named. We honour that.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero>
        <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">Selected work</span>
        </p>
        <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[16ch] font-bold tracking-[-0.03em] text-balance">
          Case studies
        </h1>
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[62ch] border-l pl-5 md:pl-6">
          A small selection of recent work. Some clients ask us not to name them. We honour that.
        </p>
      </PageHero>

      <section className="border-line border-b py-20 md:py-28" aria-label="Case studies">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {sortedCaseStudiesBefore.map((study, i) => (
              <Reveal as="li" key={study.slug} delay={stagger(i)}>
                <CaseStudyCard study={study} as="h2" />
              </Reveal>
            ))}
          </ul>
          <p className="text-label text-fg-muted mt-10 max-w-[62ch]">
            <span aria-hidden="true">* </span>Client names changed where confidentiality applies.
          </p>
        </Container>
      </section>

      <CtaBand
        headline="Working on a programme where failure is not an option?"
        text="Tell us what you’re trying to deliver. We’ll tell you honestly whether we can help."
        email={site.email}
      />
    </>
  )
}

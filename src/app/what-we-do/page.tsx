import type { Metadata } from 'next'
import { Accreditations } from '@/components/Accreditations'
import { CtaBand } from '@/components/CtaBand'
import { LineageDiagram } from '@/components/LineageDiagram'
import { PageHero } from '@/components/PageHero'
import { PracticeSection } from '@/components/PracticeSection'
import { accreditations } from '@/content/accreditations'
import { practicesBefore } from '@/content/practices'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Four practice areas (cloud platform engineering, resilience and SRE, data and analytics engineering, and security and assurance), delivered by one senior team.',
  alternates: { canonical: '/what-we-do' },
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero>
        <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">Practice areas</span>
        </p>
        <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[16ch] font-bold tracking-[-0.03em] text-balance">
          What we do
        </h1>
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[62ch] border-l pl-5 md:pl-6">
          Four practice areas. Delivered by the same people, working as one team.
        </p>
      </PageHero>

      {practicesBefore.map((practice) => (
        <PracticeSection key={practice.id} practice={practice}>
          {practice.id === 'data-and-analytics' ? (
            <div>
              <h3 className="text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
                From source row to published figure
              </h3>
              <div className="mt-8">
                <LineageDiagram />
              </div>
            </div>
          ) : undefined}
        </PracticeSection>
      ))}

      <Accreditations items={accreditations} />

      <CtaBand
        headline="Working on a programme where failure is not an option?"
        text="Tell us what you’re trying to deliver. We’ll tell you honestly whether we can help."
        email={site.email}
      />
    </>
  )
}

import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { practicesBefore, practicesDb, type Practice } from '@/content/practices'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Four practice areas (cloud platform engineering, resilience and SRE, data and analytics engineering, and security and assurance), delivered by one senior team.',
  alternates: { canonical: '/what-we-do' },
}

function PracticeSections({ practices }: { practices: Practice[] }) {
  return (
    <div className="border-hairline border-t">
      {practices.map((practice, index) => {
        const Icon = practice.icon
        const iconFirst = index % 2 === 1
        return (
          <section
            key={practice.id}
            id={practice.id}
            aria-labelledby={`${practice.id}-title`}
            className={`border-hairline scroll-mt-28 border-b py-16 sm:py-20 lg:py-28 ${
              index % 2 === 1 ? 'bg-stripe' : ''
            }`}
          >
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Graphic hint */}
                <div
                  className={`lg:col-span-3 ${iconFirst ? 'lg:order-1' : 'lg:order-2'}`}
                  aria-hidden="true"
                >
                  <Icon className="text-muted/60 h-20 w-20 lg:h-28 lg:w-28" strokeWidth={1} />
                </div>

                {/* Copy */}
                <div className={`lg:col-span-9 ${iconFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  <p className="eyebrow mb-3">Practice {String(index + 1).padStart(2, '0')}</p>
                  <h2 id={`${practice.id}-title`} className="text-3xl sm:text-4xl">
                    {practice.title}
                  </h2>
                  <p className="text-ink mt-5 max-w-3xl text-lg leading-relaxed">{practice.lead}</p>
                  <div className="text-body mt-6 max-w-3xl space-y-4 leading-relaxed">
                    {practice.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )
      })}
    </div>
  )
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        title="What we do"
        intro="Four practice areas. Delivered by the same people, working as one team."
      />

      <div data-v="before">
        <PracticeSections practices={practicesBefore} />
      </div>
      <div data-v="db">
        <PracticeSections practices={practicesDb} />
      </div>
    </>
  )
}

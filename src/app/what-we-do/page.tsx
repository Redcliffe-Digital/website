import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { practices, procurementVehicles } from '@/content/practices'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Four practice areas — cloud platform engineering, resilience and SRE, data and analytics engineering, and security and assurance — delivered by one senior team.',
  alternates: { canonical: '/what-we-do' },
}

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        title="What we do"
        intro="Four practice areas. Delivered by the same people, working as one team."
      />

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
                    <p className="text-ink mt-5 max-w-3xl text-lg leading-relaxed">
                      {practice.lead}
                    </p>
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

      {/* Procurement routes */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="procurement-heading">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Procurement</p>
            <h2 id="procurement-heading" className="text-2xl sm:text-3xl">
              Frameworks we can be engaged through
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              We are listed on the public sector frameworks below. If the route you need is not
              here, ask — we may be able to join, or work with a partner who already has.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {procurementVehicles.map((v) => (
              <li key={v.name} className="border-hairline flex items-start gap-3 border-t pt-5">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2f7d4f]"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>
                  <span className="text-ink font-medium">{v.name}</span>
                  <span className="text-muted mt-1 block text-sm leading-relaxed">{v.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

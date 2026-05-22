import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { caseStudies, getCaseStudy } from '@/content/case-studies'
import { site } from '@/lib/site'

interface Params {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.excerpt,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${site.name}`,
      description: study.excerpt,
      type: 'article',
    },
  }
}

function GlanceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline py-3 first:border-t-0 first:pt-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-body">{children}</dd>
    </div>
  )
}

function Block({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="mt-12 first:mt-0">
      <h2 id={id} className="text-2xl sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-body">{children}</div>
    </section>
  )
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return (
    <article className="pb-20 pt-12 sm:pt-16 lg:pb-28">
      <Container>
        <Link
          href="/case-studies"
          className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-oxblood"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All case studies
        </Link>

        <div className="fade-up mt-8 max-w-3xl">
          <p className="eyebrow">
            {study.sector} · {study.duration}
          </p>
          <h1 className="mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[3rem]">
            {study.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{study.client}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="at-a-glance border border-hairline bg-card p-7 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-medium text-ink">At a glance</h2>
              <dl className="mt-5">
                <GlanceRow label="Sector">{study.sector}</GlanceRow>
                <GlanceRow label="Duration">{study.duration}</GlanceRow>
                <GlanceRow label="Team">{study.teamSize}</GlanceRow>
                <GlanceRow label="Technologies">
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border border-hairline px-2 py-0.5 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </GlanceRow>
              </dl>
            </div>
          </aside>

          {/* Body */}
          <div className="lg:col-span-8 lg:order-1">
            <Block id="challenge" title="The challenge">
              {study.challenge.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Block>

            <Block id="approach" title="Our approach">
              {study.approach.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Block>

            <Block id="delivered" title="What we delivered">
              <ul className="space-y-3">
                {study.delivered.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-oxblood" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            {/* Pull quote */}
            <figure className="my-12 border-l-2 border-oxblood pl-6 sm:pl-8">
              <blockquote className="font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
                {study.quote.text}
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                — {study.quote.attribution}
              </figcaption>
            </figure>

            <Block id="outcome" title="Outcome">
              {study.outcome.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Block>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="no-print mt-16 border-t border-hairline pt-10">
          <p className="text-lg text-ink">Working on something similar?</p>
          <div className="mt-5">
            <Button href="/contact" variant="secondary">
              Discuss a programme
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </article>
  )
}

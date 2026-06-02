import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { allCaseStudySlugs, getCaseStudy, type CaseStudy } from '@/content/case-studies'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { site } from '@/lib/site'

interface Params {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allCaseStudySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug, 'before') ?? getCaseStudy(slug, 'db')
  if (!study) return {}
  return {
    title: study.title,
    description: study.excerpt,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title}, ${site.name}`,
      description: study.excerpt,
      type: 'article',
    },
  }
}

function GlanceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-hairline border-t py-3 first:border-t-0 first:pt-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-body mt-1 text-sm leading-relaxed">{children}</dd>
    </div>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12 first:mt-0">
      <h2 id={id} className="text-2xl sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="text-body mt-4 space-y-4 leading-relaxed">{children}</div>
    </section>
  )
}

function StudyBody({ study }: { study: CaseStudy }) {
  return (
    <>
      <div className="fade-up mt-8 max-w-3xl">
        <p className="eyebrow">
          {study.sector} · {study.duration}
        </p>
        <h1 className="mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[3rem]">{study.title}</h1>
        <p className="text-muted mt-5 text-lg leading-relaxed">{study.client}</p>
      </div>

      {study.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.image}
          alt=""
          width={1600}
          height={686}
          className="border-hairline no-print mt-10 aspect-[21/9] w-full rounded-sm border object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <ImagePlaceholder ratio="aspect-[21/9]" label="Case study image" className="no-print mt-10" />
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sidebar */}
        <aside className="lg:order-2 lg:col-span-4">
          <div className="at-a-glance border-hairline bg-card border p-7 lg:sticky lg:top-24">
            <h2 className="font-display text-ink text-lg font-medium">At a glance</h2>
            <dl className="mt-5">
              <GlanceRow label="Sector">{study.sector}</GlanceRow>
              <GlanceRow label="Duration">{study.duration}</GlanceRow>
              <GlanceRow label="Team">{study.teamSize}</GlanceRow>
              <GlanceRow label="Technologies">
                <ul className="mt-1 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <li key={tech} className="border-hairline text-muted border px-2 py-0.5 text-xs">
                      {tech}
                    </li>
                  ))}
                </ul>
              </GlanceRow>
            </dl>
          </div>
        </aside>

        {/* Body */}
        <div className="lg:order-1 lg:col-span-8">
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
                  <span aria-hidden="true" className="bg-oxblood mt-2 h-1.5 w-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* Pull quote */}
          <figure className="border-oxblood my-12 border-l-2 pl-6 sm:pl-8">
            <blockquote className="font-display text-ink text-2xl leading-snug sm:text-[1.75rem]">
              {study.quote.text}
            </blockquote>
            <figcaption className="text-muted mt-4 text-sm">{study.quote.attribution}</figcaption>
          </figure>

          <Block id="outcome" title="Outcome">
            {study.outcome.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Block>
        </div>
      </div>
    </>
  )
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const before = getCaseStudy(slug, 'before')
  const db = getCaseStudy(slug, 'db')
  if (!before && !db) notFound()

  return (
    <article className="pt-12 pb-20 sm:pt-16 lg:pb-28">
      <Container>
        <Link
          href="/case-studies"
          className="no-print text-muted hover:text-oxblood inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All case studies
        </Link>

        {before ? (
          <div data-v="before">
            <StudyBody study={before} />
          </div>
        ) : null}
        {db ? (
          <div data-v="db">
            <StudyBody study={db} />
          </div>
        ) : null}

        {/* Closing CTA */}
        <div className="no-print border-hairline mt-16 border-t pt-10">
          <p className="text-ink text-lg">Working on something similar?</p>
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

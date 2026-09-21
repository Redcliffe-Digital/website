import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { allCaseStudySlugs, getCaseStudy, type CaseStudy } from '@/content/case-studies'
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
    <div className="border-line border-t py-3 first:border-t-0 first:pt-0">
      <dt className="text-label-sm text-fg-muted font-mono tracking-[0.08em] uppercase">{label}</dt>
      <dd className="text-body-sm mt-1.5">{children}</dd>
    </div>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14 first:mt-0">
      <h2
        id={id}
        className="text-h2-sm md:text-h2 max-w-[20ch] font-bold tracking-[-0.03em] text-balance"
      >
        {title}
      </h2>
      <div className="text-body-sm md:text-body mt-5 max-w-[68ch] space-y-5">{children}</div>
    </section>
  )
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const study: CaseStudy | undefined = getCaseStudy(slug, 'before') ?? getCaseStudy(slug, 'db')
  if (!study) notFound()

  return (
    <article>
      <PageHero>
        <Link
          href="/case-studies"
          className="no-print text-label-sm text-fg-muted hover:text-accent inline-flex min-h-11 items-center gap-2 font-mono tracking-[0.08em] uppercase transition-colors duration-200"
        >
          <span aria-hidden="true">&larr;</span>
          All case studies
        </Link>
        <p className="text-label-sm sm:text-label text-fg-muted mt-4 font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">{study.sector}</span>
          <span aria-hidden="true" className="text-line-strong mx-3">
            /
          </span>
          {study.duration}
        </p>
        <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[22ch] font-bold tracking-[-0.03em] text-balance">
          {study.title}
        </h1>
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[62ch] border-l pl-5 md:pl-6">
          {study.client}
        </p>
      </PageHero>

      <section className="border-line border-b py-16 md:py-24">
        <Container>
          {study.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={study.image}
              alt=""
              width={1600}
              height={686}
              className="rounded-brand border-line no-print mb-14 aspect-[21/9] w-full border object-cover md:mb-20"
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <aside className="lg:order-2 lg:col-span-4">
              <div className="at-a-glance rounded-brand border-line bg-surface border p-6 lg:sticky lg:top-24">
                <h2 className="text-label text-accent font-mono tracking-[0.08em] uppercase">
                  At a glance
                </h2>
                <dl className="mt-5">
                  <GlanceRow label="Sector">{study.sector}</GlanceRow>
                  <GlanceRow label="Duration">{study.duration}</GlanceRow>
                  <GlanceRow label="Team">{study.teamSize}</GlanceRow>
                  <GlanceRow label="Technologies">
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-brand border-line text-label-sm text-fg-muted border px-2 py-1 font-mono"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </GlanceRow>
                </dl>
              </div>
            </aside>

            <div className="lg:order-1 lg:col-span-7">
              <Reveal>
                <Block id="challenge" title="The challenge">
                  {study.challenge.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </Block>
              </Reveal>

              <Reveal>
                <Block id="approach" title="Our approach">
                  {study.approach.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </Block>
              </Reveal>

              <Reveal>
                <Block id="delivered" title="What we delivered">
                  <ul className="space-y-3">
                    {study.delivered.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span aria-hidden="true" className="bg-accent mt-2.5 h-1 w-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              </Reveal>

              <Reveal>
                <figure className="border-accent-deep my-14 border-l-2 pl-6 md:pl-8">
                  <blockquote className="text-h3 md:text-h2-sm font-semibold tracking-[-0.02em] text-balance">
                    {study.quote.text}
                  </blockquote>
                  <figcaption className="text-label text-fg-muted mt-4 font-mono tracking-[0.08em] uppercase">
                    {study.quote.attribution}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal>
                <Block id="outcome" title="Outcome">
                  {study.outcome.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </Block>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Working on something similar?"
        text="Tell us what you’re trying to deliver. We’ll tell you honestly whether we can help."
        email={site.email}
      />
    </article>
  )
}

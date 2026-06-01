import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cpu, Database, GitBranch, GitMerge, Layers, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/Button'
import { Badges } from '@/components/Badges'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { sortedCaseStudiesBefore, sortedCaseStudiesDb } from '@/content/case-studies'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: '/' },
}

const practicesBefore = [
  {
    icon: Cpu,
    title: 'Platform engineering',
    body: 'Cloud-native systems on AWS and Azure, built to the GDS Service Standard and the Technology Code of Practice. We do the unglamorous parts well — observability, infrastructure as code, incident response runbooks.',
  },
  {
    icon: ShieldCheck,
    title: 'Trading-grade resilience',
    body: 'We design for the long tail. Disaster recovery, chaos testing, capacity planning, and the kind of pre-mortems that surface the failure mode no-one wanted to talk about.',
  },
  {
    icon: GitBranch,
    title: 'Delivery in the open',
    body: 'Small, embedded teams that work in the open alongside civil servants. We leave you with running software, documentation, and a team that no longer needs us.',
  },
]

const practicesDb = [
  {
    icon: Database,
    title: 'Data warehouse engineering',
    body: 'Warehouses and lakehouses on Snowflake, BigQuery, Redshift and Databricks — modelled for correctness, partitioned for scale, and governed for regulated and sensitive data. Every published figure traces back to its source row.',
  },
  {
    icon: Cpu,
    title: 'Platform engineering',
    body: 'Cloud-native systems on AWS and Azure, built to the GDS Service Standard and the Technology Code of Practice. We do the unglamorous parts well — observability, infrastructure as code, incident response runbooks.',
  },
  {
    icon: ShieldCheck,
    title: 'Trading-grade resilience',
    body: 'We design for the long tail. Disaster recovery, chaos testing, capacity planning, and the kind of pre-mortems that surface the failure mode no-one wanted to talk about.',
  },
]

// Capability tiles for the data-warehouse section — written to mirror what a
// data & analytics procurement actually evaluates.
const warehouseCapabilities = [
  {
    icon: GitMerge,
    title: 'Ingestion that does not lie',
    body: 'Log-based change-data-capture for freshness, idempotent batch loads where nightly is right. Every load is replayable, so a bad transformation is a redeploy — not a data-loss incident.',
  },
  {
    icon: Layers,
    title: 'Modelling for one answer',
    body: 'Conformed dimensions and facts in the Kimball tradition, layered raw → core → marts. Two analysts asking the same question get the same number, every time.',
  },
  {
    icon: GitBranch,
    title: 'Lineage end to end',
    body: 'Version-controlled, tested dbt transformations and automatic lineage. Any published figure traces back through the model to the exact source row that produced it.',
  },
  {
    icon: Cpu,
    title: 'Scale and cost held flat',
    body: 'Partitioning and clustering that keep tens-of-terabytes queries fast, with cost attribution so a per-query bill never becomes a nasty surprise.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance by design',
    body: 'Classification at ingestion, least-privilege auditable access, and retention and erasure enforced by the pipeline — so a deletion request provably reaches every derived table. Built for regulated and sensitive data from the first sprint.',
  },
  {
    icon: Database,
    title: 'Schema evolution, not breakage',
    body: 'Explicit data contracts, backward- and forward-compatible encodings, and migrations tested against real historic data. Sources change; the warehouse bends rather than breaks.',
  },
]

const whyBullets = [
  'Senior-only delivery teams. No pyramid.',
  'Decisions made in the room, not escalated.',
  'Day rates 30–40% below tier-one consultancies.',
  'We turn down work we cannot do well.',
]

// JSON-LD Organization schema. Credentials are listed as hasCredential so the
// AWS / Azure / Cyber Essentials Plus / ISO 27001 accreditations are machine-readable.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  areaServed: 'GB',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'AWS Certified Developer – Associate',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Microsoft Certified: Azure Fundamentals',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Cyber Essentials',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'ISO/IEC 27001',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Safe: static, author-controlled content serialised to JSON.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero — default variant */}
      <section className="flex min-h-[60vh] items-center py-20 sm:py-24" data-v="before">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
            <div className="fade-up max-w-3xl">
              <p className="eyebrow">UK-based technology consultancy</p>
              <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[4rem]">
                Engineering systems where the cost of failure is measured in millions.
              </h1>
              <p className="text-muted mt-7 max-w-[56ch] text-lg leading-relaxed sm:text-xl">
                Redcliffe Digital is a small team of senior engineers, architects and SREs. We
                learned our craft building trading systems where a five-second outage is a
                board-level incident. We now apply that discipline to public sector technology.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/what-we-do" variant="primary">
                  See how we work
                </Button>
                <Button href="/contact" variant="secondary">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className="fade-up hidden lg:block" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-team.jpg"
                alt=""
                width={900}
                height={1125}
                className="border-hairline aspect-[4/5] w-full rounded-sm border object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Hero — data-warehouse variant */}
      <section className="flex min-h-[60vh] items-center py-20 sm:py-24" data-v="db">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-16">
            <div className="fade-up max-w-3xl">
              <p className="eyebrow">Data platform &amp; warehouse engineering</p>
              <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[4rem]">
                Data platforms engineered for when the numbers have to be right.
              </h1>
              <p className="text-muted mt-7 max-w-[56ch] text-lg leading-relaxed sm:text-xl">
                Redcliffe Digital is a small team of senior engineers building the warehouses,
                pipelines and data systems organisations depend on — modelled for correctness and
                built to scale. We learned the craft moving sub-millisecond market data, where a
                wrong number costs millions, and we bring that discipline to everything we build.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/what-we-do" variant="primary">
                  See how we work
                </Button>
                <Button href="/contact" variant="secondary">
                  Get in touch
                </Button>
              </div>
            </div>
            <div className="fade-up hidden lg:block" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-data.jpg"
                alt=""
                width={900}
                height={1125}
                className="border-hairline aspect-[4/5] w-full rounded-sm border object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <div className="border-hairline bg-stripe border-y">
        <Container className="py-8">
          <h2 className="sr-only">Accreditations and partnerships</h2>
          <Badges variant="dark" size={48} />
        </Container>
      </div>

      {/* What we do preview */}
      <Section ariaLabelledby="what-we-do-heading">
        <SectionHeading as="h2" id="what-we-do-heading" title="What we do" className="max-w-2xl" />
        <div data-v="before" className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-12">
          {practicesBefore.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="text-oxblood h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-display text-ink mt-5 text-xl font-medium">{title}</h3>
              <p className="text-body mt-3 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div data-v="db" className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-12">
          {practicesDb.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="text-oxblood h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-display text-ink mt-5 text-xl font-medium">{title}</h3>
              <p className="text-body mt-3 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/what-we-do"
          className="link-accent mt-12 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          See all services
        </Link>
      </Section>

      {/* Data warehouse capability — data-warehouse variant only */}
      <div data-v="db">
        <Section stripe ariaLabelledby="warehouse-heading">
        <SectionHeading
          as="h2"
          id="warehouse-heading"
          eyebrow="Our core practice"
          title="How we build a data warehouse"
          className="max-w-2xl"
        />
        <p className="text-body mt-6 max-w-2xl text-lg leading-relaxed">
          A warehouse is judged on three things, and we engineer each as a first-class requirement:
          that it stays <span className="text-ink">reliable</span> when a source misbehaves, that it
          stays <span className="text-ink">scalable</span> as volume grows, and that it stays{' '}
          <span className="text-ink">maintainable</span> for the team that inherits it. Most we are
          asked to rescue failed on the last one long before the others.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {warehouseCapabilities.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="text-oxblood h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-display text-ink mt-5 text-lg font-medium">{title}</h3>
              <p className="text-body mt-3 text-[0.95rem] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/what-we-do#data-and-analytics"
          className="link-accent mt-12 inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          Read the full data practice
        </Link>
        </Section>
      </div>

      {/* Why a small firm */}
      <Section stripe ariaLabelledby="why-small-firm-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              as="h2"
              id="why-small-firm-heading"
              title="Why a small firm beats a big one"
            />
            <p className="text-body mt-7 text-lg leading-relaxed">
              The Big Four can field a hundred consultants by Monday. We can&rsquo;t. What we can do
              is put two principal engineers in a room with your team on day one — the same people
              who will still be there in month nine. There is no offshore handover, no rotating
              bench, no upward delegation. The person you meet at the kick-off is the person writing
              the code.
            </p>
          </div>
          <div className="lg:pt-16">
            <ul className="divide-hairline border-hairline divide-y border-y">
              {whyBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 py-4">
                  <span aria-hidden="true" className="bg-oxblood mt-2 h-1.5 w-1.5 shrink-0" />
                  <span className="text-body">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Selected work */}
      <Section ariaLabelledby="selected-work-heading">
        <SectionHeading
          as="h2"
          id="selected-work-heading"
          eyebrow="Case studies"
          title="Selected work"
        />
        <div data-v="before" className="mt-12 grid gap-6 md:grid-cols-3">
          {sortedCaseStudiesBefore.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div data-v="db" className="mt-12 grid gap-6 md:grid-cols-3">
          {sortedCaseStudiesDb.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      {/* Closing CTA band */}
      <section className="bg-ink">
        <Container className="py-20 lg:py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Working on a programme where failure is not an option?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Tell us what you&rsquo;re trying to deliver. We&rsquo;ll tell you honestly whether we
              can help.
            </p>
            <div className="mt-8">
              <Button href={`mailto:${site.email}`} variant="inverse">
                {site.email}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

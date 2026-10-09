import type { Metadata } from 'next'
import Link from 'next/link'
import { Accreditations } from '@/components/Accreditations'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { Hero } from '@/components/Hero'
import { PracticeIndex } from '@/components/PracticeIndex'
import { WhySmallFirm } from '@/components/WhySmallFirm'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { accreditations } from '@/content/accreditations'
import { sortedCaseStudiesBefore } from '@/content/case-studies'
import { practicesBefore } from '@/content/practices'
import { stagger } from '@/lib/motion'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: '/' },
}

const whyBullets = [
  'Senior-only delivery teams. No pyramid.',
  'Decisions made in the room, not escalated.',
  'Day rates 30–40% below tier-one consultancies.',
  'We turn down work we cannot do well.',
]

// JSON-LD Organization schema. Credentials are listed as hasCredential so the
// AWS / Azure / Cyber Essentials / ISO 27001 accreditations are machine-readable.
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
  const featured = sortedCaseStudiesBefore.slice(0, 2)

  return (
    <>
      <script
        type="application/ld+json"
        // Safe: static, author-controlled content serialised to JSON.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero
        headline="Engineering systems where the cost of failure is measured in millions."
        intro="Redcliffe Digital is a small team of senior engineers, architects and SREs. We learned our craft building trading systems where a five-second outage is a board-level incident. We now apply that discipline to public sector technology."
      />

      <Accreditations items={accreditations} />

      <PracticeIndex practices={practicesBefore} />

      <WhySmallFirm
        headline="Why a small firm beats a big one"
        text="The Big Four can field a hundred consultants by Monday. We can’t. What we can do is put two principal engineers in a room with your team on day one, the same people who will still be there in month nine. There is no offshore handover, no rotating bench, no upward delegation. The person you meet at the kick-off is the person writing the code."
        points={whyBullets}
      />

      <section className="border-line border-b py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Case studies">
                Some clients ask us not to name them. We honour that.
              </SectionHeading>
              <Link
                href="/case-studies"
                className="text-label text-accent hover:text-fg inline-flex min-h-11 items-center font-mono tracking-[0.08em] uppercase transition-colors duration-200"
              >
                All case studies
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {featured.map((study, i) => (
              <Reveal as="li" key={study.slug} delay={stagger(i)}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </ul>
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

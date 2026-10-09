import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { stagger } from '@/lib/motion'
import { formattedAddress, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'A small, senior team of engineers, architects and SREs. Most of us came up through London trading shops. Here is how we work and who we are.',
  alternates: { canonical: '/about' },
}

const principles: { title: string; body: string }[] = [
  {
    title: 'Small teams, senior people.',
    body: 'No pyramid. A typical engagement is two to five people, all of whom have done the work before. You are not paying for a layer of management that sits between you and the people writing the code.',
  },
  {
    title: 'One team with you.',
    body: 'We embed with your team rather than working at arm’s length, sharing your tools, attending your standups, and being accountable to the same goals. We are at our best as part of your team, not adjacent to it.',
  },
  {
    title: 'In the open.',
    body: 'We write everything in your repository, your wiki and your ticket system. There is no private store of knowledge that leaves with us at the end. The work is yours from the first commit.',
  },
  {
    title: 'Honest about scope.',
    body: 'We will tell you if we think the work does not need us, or does not need to happen at all. Turning down or scoping down a piece of work has cost us revenue and earned us the next three engagements.',
  },
  {
    title: 'Sustainable pace.',
    body: 'We do not do weekend heroics. Crunch masks deeper problems (a plan that was wrong, or a system that is too fragile to change calmly), and we would rather fix those than paper over them with overtime.',
  },
]

// Team section hidden for now — restore this data and a "The team" section
// when the real team details are ready.
// const team: { initials: string; name: string; role: string; previously: string }[] = [
//   { initials: 'ER', name: 'Eleanor Roper', role: 'Founding Partner, Engineering', previously: 'Goldman Sachs SLT, Maven Securities' },
//   { initials: 'JO', name: 'James Okafor', role: 'Founding Partner, Architecture', previously: 'Citadel Securities, JP Morgan' },
//   { initials: 'PS', name: 'Priya Shah', role: 'Head of SRE', previously: 'Jump Trading, Monzo' },
//   { initials: 'TW', name: 'Tom Whitfield', role: 'Principal Engineer', previously: 'G-Research, GDS' },
// ]

const companyFacts: { label: string; value: string; placeholder?: boolean }[] = [
  { label: 'Registered name', value: 'Redcliffe Digital Ltd, England and Wales' },
  { label: 'Company number', value: site.companyNumber },
  { label: 'Registered office', value: formattedAddress },
  // Hidden for now — restore once confirmed:
  // { label: 'VAT number', value: 'GB 432 8821 09', placeholder: true },
  // { label: 'ICO registration', value: 'ZB123456', placeholder: true },
]

export default function AboutPage() {
  return (
    <>
      <PageHero>
        <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">About</span>
        </p>
        <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[18ch] font-bold tracking-[-0.03em] text-balance">
          About Redcliffe Digital
        </h1>
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[72ch] border-l pl-5 md:pl-6">
          We’re a small, senior team of engineers, architects and SREs based in the UK. Most of us
          came up through London trading shops, a few from the high-pressure proprietary firms in
          Mayfair and the City, others from the platform teams at the big investment banks. We
          started Redcliffe Digital because we kept meeting public sector technologists who were
          trying to solve the same problems we’d already solved, and being sold an army of juniors
          when what they needed was two people who’d done it before.
        </p>
      </PageHero>

      <section className="border-line border-b py-20 md:py-28" aria-labelledby="how-we-work">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How we work" id="how-we-work">
              Five habits, held to when they cost us something.
            </SectionHeading>
          </Reveal>

          <ul className="border-line mt-12 grid gap-px border md:mt-16 md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal
                as="li"
                key={principle.title}
                delay={stagger(i)}
                className="bg-surface p-6 md:p-8"
              >
                <h3 className="text-label text-accent font-mono tracking-[0.08em] uppercase">
                  {principle.title}
                </h3>
                <p className="text-body-sm text-fg-muted mt-3 max-w-[58ch]">{principle.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-line border-b py-20 md:py-28" aria-labelledby="company">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading eyebrow="Company" id="company">
                  The dull but essential facts.
                </SectionHeading>
                <p className="text-body-sm text-fg-muted mt-6 max-w-[46ch]">
                  For the procurement and due-diligence teams who need them.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <dl className="grid gap-x-12 sm:grid-cols-2">
                  {companyFacts.map((fact) => (
                    <div key={fact.label} className="border-line border-t py-4">
                      <dt className="text-label-sm text-fg-muted font-mono tracking-[0.08em] uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-body-sm mt-1.5">
                        {fact.value}
                        {fact.placeholder ? (
                          <span className="text-fg-muted text-label ml-2">(placeholder)</span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-body-sm text-fg-muted mt-6">
                  Contact us at{' '}
                  <a href={`mailto:${site.email}`} className="link-accent">
                    {site.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
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

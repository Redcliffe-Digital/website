import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
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

// Team section hidden for now — restore this data and the "The team" section
// in the JSX below when the real team details are ready.
// const team: { initials: string; name: string; role: string; previously: string }[] = [
//   {
//     initials: 'ER',
//     name: 'Eleanor Roper',
//     role: 'Founding Partner, Engineering',
//     previously: 'Goldman Sachs SLT, Maven Securities',
//   },
//   {
//     initials: 'JO',
//     name: 'James Okafor',
//     role: 'Founding Partner, Architecture',
//     previously: 'Citadel Securities, JP Morgan',
//   },
//   {
//     initials: 'PS',
//     name: 'Priya Shah',
//     role: 'Head of SRE',
//     previously: 'Jump Trading, Monzo',
//   },
//   {
//     initials: 'TW',
//     name: 'Tom Whitfield',
//     role: 'Principal Engineer',
//     previously: 'G-Research, GDS',
//   },
// ]

const companyFacts: { label: string; value: string; placeholder?: boolean }[] = [
  { label: 'Registered name', value: 'Redcliffe Digital Ltd, England and Wales' },
  { label: 'Company number', value: '17197703' },
  { label: 'Registered office', value: formattedAddress },
  // Hidden for now — restore once confirmed:
  // { label: 'VAT number', value: 'GB 432 8821 09', placeholder: true },
  // { label: 'ICO registration', value: 'ZB123456', placeholder: true },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Redcliffe Digital"
        intro="We’re a small, senior team of engineers, architects and SREs based in the UK. Most of us came up through London trading shops, a few from the high-pressure proprietary firms in Mayfair and the City, others from the platform teams at the big investment banks. We started Redcliffe Digital because we kept meeting public sector technologists who were trying to solve the same problems we’d already solved, and being sold an army of juniors when what they needed was two people who’d done it before."
      />

      {/* How we work */}
      <section
        className="border-hairline border-t py-16 sm:py-20 lg:py-24"
        aria-labelledby="how-we-work"
      >
        <Container>
          <h2 id="how-we-work" className="text-2xl sm:text-3xl">
            How we work
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="border-hairline border-t pt-5">
                <p className="text-body leading-relaxed">
                  <span className="text-ink font-medium">{p.title}</span> {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The team — hidden for now, restore when real team details are ready.
      <section className="bg-stripe py-16 sm:py-20 lg:py-24" aria-labelledby="the-team">
        <Container>
          <h2 id="the-team" className="text-2xl sm:text-3xl">
            The team
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            The people you meet at the kick-off are the people who do the work. No bench, no
            handover.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.name}>
                <div
                  className="border-hairline bg-card flex aspect-square w-full items-center justify-center border"
                  aria-hidden="true"
                >
                  <span className="font-display text-oxblood/80 text-4xl font-medium sm:text-5xl">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display text-ink mt-4 text-lg font-medium">{member.name}</h3>
                <p className="text-body mt-0.5 text-sm">{member.role}</p>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  Previously: {member.previously}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      */}

      {/* Company */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="company">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 id="company" className="text-2xl sm:text-3xl">
                Company
              </h2>
              <p className="text-muted mt-4 leading-relaxed">
                The dull-but-essential facts, for the procurement and due-diligence teams who need
                them.
              </p>
            </div>
            <div className="lg:col-span-8">
              <dl className="grid gap-x-12 sm:grid-cols-2">
                {companyFacts.map((fact) => (
                  <div key={fact.label} className="border-hairline border-t py-4">
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="text-body mt-1">
                      {fact.value}
                      {fact.placeholder ? (
                        <span className="text-muted ml-2 text-xs">(placeholder)</span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted mt-6 text-sm">
                Contact us at{' '}
                <a href={`mailto:${site.email}`} className="link-accent">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import Link from 'next/link'
import type { Practice } from '@/content/practices'
import { Container } from './Container'
import { Reveal } from './ui/Reveal'
import { stagger } from '@/lib/motion'
import { Icon } from './ui/Icon'
import { SectionHeading } from './ui/SectionHeading'

export function PracticeIndex({ practices }: { practices: Practice[] }) {
  return (
    <section className="border-line border-b py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="What we do">
            Four practice areas, delivered by the same people.
          </SectionHeading>
        </Reveal>

        <ul className="border-line mt-12 border-t md:mt-16">
          {practices.map((practice, i) => {
            const PracticeIcon = practice.icon
            return (
              <Reveal as="li" key={practice.id} delay={stagger(i)}>
                <Link
                  href={`/what-we-do#${practice.id}`}
                  className="group border-line hover:bg-surface relative grid gap-4 border-b py-8 transition-colors duration-200 ease-[var(--ease-out-soft)] md:grid-cols-12 md:gap-8 md:py-10"
                >
                  {/* Row wide affordance: the rail and the fill respond to a hover
                      anywhere on the link, not only over the arrow. */}
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute inset-y-0 -left-3 w-0.5 origin-top scale-y-0 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:scale-y-100 lg:-left-5"
                  />
                  <span className="text-accent md:col-span-1">
                    <PracticeIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="text-h3-sm md:text-h3 font-semibold tracking-[-0.02em] md:col-span-4">
                    {practice.title}
                  </h3>
                  <p className="text-body-sm text-fg-muted max-w-[62ch] md:col-span-6">
                    {practice.lead}
                  </p>
                  <span className="text-accent-deep group-hover:text-accent transition-[transform,color] duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1.5 md:col-span-1 md:self-center md:justify-self-end md:pr-6">
                    <Icon name="arrow" className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

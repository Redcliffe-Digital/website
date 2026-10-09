import { Container } from './Container'
import { Reveal } from './ui/Reveal'
import { stagger } from '@/lib/motion'
import { SectionHeading } from './ui/SectionHeading'

export function WhySmallFirm({
  headline,
  text,
  points,
}: {
  headline: string
  text: string
  points: string[]
}) {
  return (
    <section className="border-line border-b py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow="How we work">{headline}</SectionHeading>
              <p className="text-body-sm md:text-body text-fg-muted mt-6 max-w-[58ch]">{text}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="rounded-brand border-line bg-line grid gap-px overflow-hidden border sm:grid-cols-2">
              {points.map((point, i) => (
                <Reveal as="li" key={point} delay={stagger(i)} className="bg-surface p-6">
                  <p className="text-body-sm text-fg flex items-start gap-3">
                    <span aria-hidden="true" className="bg-accent mt-2.5 h-1 w-1 shrink-0" />
                    <span>{point}</span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

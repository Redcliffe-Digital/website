import type { Practice } from '@/content/practices'
import { Container } from './Container'
import { Reveal } from './ui/Reveal'

export function PracticeSection({
  practice,
  children,
}: {
  practice: Practice
  /** Optional supporting graphic rendered below the prose. */
  children?: React.ReactNode
}) {
  const PracticeIcon = practice.icon

  return (
    <section
      id={practice.id}
      aria-labelledby={`${practice.id}-title`}
      className="border-line scroll-mt-24 border-b py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-accent">
                <PracticeIcon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              </p>
              <h2
                id={`${practice.id}-title`}
                className="text-h2-sm md:text-h2 mt-4 max-w-[18ch] font-bold tracking-[-0.03em] text-balance"
              >
                {practice.title}
              </h2>
              <p className="text-body-sm text-fg-muted mt-5 max-w-[46ch]">{practice.lead}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <div className="space-y-5">
                {practice.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-body-sm md:text-body max-w-[68ch]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {children ? (
          <Reveal className="rounded-brand border-line bg-surface mt-14 border p-6 md:mt-16 md:p-10">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}

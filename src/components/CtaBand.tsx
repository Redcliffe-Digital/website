import { Container } from './Container'
import { CtaLink } from './ui/CtaLink'
import { Reveal } from './ui/Reveal'

export function CtaBand({
  headline,
  text,
  email,
}: {
  headline: string
  text: string
  email: string
}) {
  return (
    <section className="border-line bg-surface relative overflow-hidden border-b py-20 md:py-28">
      <div
        aria-hidden="true"
        className="grid-rule pointer-events-none absolute inset-0 opacity-40"
      />
      <Container className="relative">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <h2 className="text-h2-sm md:text-h2 max-w-[20ch] font-bold tracking-[-0.03em] text-balance">
                {headline}
              </h2>
              <p className="text-body-sm md:text-body text-fg-muted mt-5 max-w-[58ch]">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <CtaLink href="/contact">Start a conversation</CtaLink>
              <CtaLink href={`mailto:${email}`} variant="secondary">
                {email}
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

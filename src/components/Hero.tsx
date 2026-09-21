import { Container } from './Container'
import { CtaLink } from './ui/CtaLink'
import { SonicWaveform } from './ui/SonicWaveform'

export function Hero({ headline, intro }: { headline: string; intro: string }) {
  return (
    <section className="border-line relative isolate overflow-hidden border-b">
      <SonicWaveform />
      {/* Dims the waveform behind the copy. Sits under the grid so the hairlines stay crisp. */}
      <div
        aria-hidden="true"
        className="from-bg via-bg/20 to-bg pointer-events-none absolute inset-0 z-10 bg-gradient-to-b"
      />
      <div
        aria-hidden="true"
        className="grid-rule grid-rule-fade pointer-events-none absolute inset-0 z-20 opacity-50"
      />
      <Container className="relative z-30 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
              <span className="text-accent">Redcliffe Digital</span>
              <span aria-hidden="true" className="text-line-strong mx-3">
                /
              </span>
              UK technology consultancy
            </p>
            <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[16ch] font-bold tracking-[-0.03em] text-balance">
              {headline}
            </h1>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <p className="border-accent-deep text-body-sm md:text-body text-fg-muted max-w-[62ch] border-l pl-5 md:pl-6">
              {intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {/* No idle prop here: the waveform is now the page's one
                  continuous animation (animation-system skill, section 10). */}
              <CtaLink href="/what-we-do">See how we work</CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Get in touch
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

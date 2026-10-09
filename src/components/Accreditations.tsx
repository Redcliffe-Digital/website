import type { Accreditation } from '@/content/accreditations'
import { Container } from './Container'
import { Reveal } from './ui/Reveal'
import { stagger } from '@/lib/motion'

/**
 * Credential strip. The client's own site leads with this directly under the
 * hero, so it sits in the same place here: it answers the procurement question
 * ("are these people assured?") before the visitor has scrolled once.
 *
 * The badge artwork is the client's, carried over unaltered. It was drawn for a
 * light page, and two of the five (AWS, Disability Confident) put dark ink
 * straight onto the background, so each badge sits on a light tile rather than
 * on our dark surface. Recolouring a certification mark is not an option.
 *
 * Plain <img> rather than next/image: these are fixed 40px vector marks, and
 * routing SVG through the optimiser would mean turning on dangerouslyAllowSVG
 * for no gain.
 */
export function Accreditations({ items }: { items: Accreditation[] }) {
  return (
    <section aria-labelledby="accreditations-title" className="border-line border-b py-10 md:py-14">
      <Container>
        <Reveal>
          <h2
            id="accreditations-title"
            className="text-label-sm sm:text-label text-fg-muted flex items-center gap-3 font-mono tracking-[0.08em] uppercase"
          >
            <span aria-hidden="true" className="bg-accent-deep h-px w-8" />
            Accreditations and partnerships
          </h2>
        </Reveal>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={stagger(i)}
              className="rounded-brand border-line bg-surface flex items-center gap-4 border px-4 py-3.5"
            >
              <span className="rounded-brand bg-fg flex h-12 w-12 shrink-0 items-center justify-center">
                {/* Decorative: the credential and its issuer are spelled out alongside. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.badge} alt="" width={40} height={40} className="h-10 w-10" />
              </span>
              <span className="flex flex-col">
                <span className="text-body-sm text-fg leading-snug font-semibold">{item.name}</span>
                <span className="text-label-sm text-fg-muted mt-1 font-mono tracking-[0.08em] uppercase">
                  {item.issuer}
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

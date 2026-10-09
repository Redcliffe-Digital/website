import type { ReactNode } from 'react'
import { Container } from './Container'
import { SonicWaveform } from './ui/SonicWaveform'

/**
 * Hero band for the inner pages. It carries the same oscilloscope backdrop as
 * the home page so the sub pages read as part of the same site rather than as
 * plain document headers.
 *
 * Layer order matters: waveform, then the gradient that dims it under the copy,
 * then the hairline grid, then the content. The grid stays above the gradient so
 * its rules do not get washed out.
 */
export function PageHero({
  children,
  as: As = 'section',
}: {
  children: ReactNode
  as?: 'section' | 'header'
}) {
  return (
    <As className="border-line relative isolate overflow-hidden border-b">
      <SonicWaveform />
      {/* Inner hero bands are shorter than the home page one, so the copy sits
          right on top of the wave. This scrim is heavier than the home page
          version to keep body text at full contrast over the traces. */}
      <div
        aria-hidden="true"
        className="from-bg via-bg/70 to-bg/85 pointer-events-none absolute inset-0 z-10 bg-gradient-to-b"
      />
      <div
        aria-hidden="true"
        className="grid-rule grid-rule-fade pointer-events-none absolute inset-0 z-20 opacity-50"
      />
      <Container className="relative z-30 py-16 md:py-24">{children}</Container>
    </As>
  )
}

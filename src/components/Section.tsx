import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  id?: string
  /** Apply the subtle stripe background (#F4F2EC). */
  stripe?: boolean
  /** Constrain inner content to the central column. Set false to manage width yourself. */
  contained?: boolean
  className?: string
  ariaLabelledby?: string
}

/** A page section with generous, consistent vertical rhythm (96–128px desktop). */
export function Section({
  children,
  id,
  stripe = false,
  contained = true,
  className = '',
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`py-20 sm:py-24 lg:py-32 ${stripe ? 'bg-stripe' : ''} ${className}`}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}

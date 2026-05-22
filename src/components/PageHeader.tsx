import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  intro?: ReactNode
}

/** Standard page-level header: H1 plus an optional intro line. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="pt-16 pb-6 sm:pt-20 lg:pt-24">
      <Container>
        <div className="fade-up max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          {intro ? (
            <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{intro}</p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

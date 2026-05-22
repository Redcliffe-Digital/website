import type { ReactNode } from 'react'
import { Container } from './Container'
import { PageHeader } from './PageHeader'

/**
 * Placeholder shell for legal pages still with legal counsel. Real content
 * replaces the body; the heading and route stay the same.
 */
export function LegalStub({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <>
      {/* TODO: drafted by legal */}
      <PageHeader
        title={title}
        intro="This page is a placeholder. The full statement is being drafted and will appear here before launch."
      />
      <section className="pt-4 pb-20 lg:pb-28">
        <Container>
          <div className="text-body max-w-2xl space-y-4 leading-relaxed">
            {children ?? (
              <p className="text-muted">
                Content to follow. In the meantime, email{' '}
                <a href="mailto:hello@redcliffedigital.co.uk" className="link-accent">
                  hello@redcliffedigital.co.uk
                </a>{' '}
                with any questions.
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}

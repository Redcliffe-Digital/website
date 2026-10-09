import { Container } from '@/components/Container'
import { CtaLink } from '@/components/ui/CtaLink'

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="text-label text-accent font-mono tracking-[0.08em] uppercase">Error 404</p>
      <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[18ch] font-bold tracking-[-0.03em] text-balance">
        That page is not here.
      </h1>
      <p className="text-body-sm md:text-body text-fg-muted mt-6 max-w-[52ch]">
        The address may have changed, or the link that brought you here may be out of date. The
        practice areas and case studies are the best place to pick the thread back up.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink href="/what-we-do">What we do</CtaLink>
        <CtaLink href="/case-studies" variant="secondary">
          Case studies
        </CtaLink>
      </div>
    </Container>
  )
}

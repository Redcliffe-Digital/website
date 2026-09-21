import type { ReactNode } from 'react'

/**
 * Eyebrow rail plus display heading. The rail used to carry a decorative 01/02
 * counter; it now carries an optional icon, because numbering sections implied
 * a sequence the content never had.
 */
export function SectionHeading({
  eyebrow,
  children,
  id,
  as: As = 'h2',
}: {
  eyebrow?: string
  children: ReactNode
  id?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && (
        <p className="text-label-sm sm:text-label text-fg-muted flex items-center gap-3 font-mono tracking-[0.08em] uppercase">
          <span aria-hidden="true" className="bg-accent-deep h-px w-8" />
          {eyebrow}
        </p>
      )}
      <As
        id={id}
        className="text-h2-sm md:text-h2 max-w-[24ch] font-bold tracking-[-0.03em] text-balance"
      >
        {children}
      </As>
    </div>
  )
}

import type { ElementType } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  /** Heading level for correct document outline. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3'
  /** id applied to the heading element, for aria-labelledby on the section. */
  id?: string
  className?: string
  /** Larger display sizing for page-level (h1) headings. */
  size?: 'default' | 'display'
}

/**
 * Eyebrow label above a heading. The block fades up once on first paint
 * (disabled under prefers-reduced-motion via the .fade-up rule in globals.css).
 */
export function SectionHeading({
  eyebrow,
  title,
  as = 'h2',
  id,
  size = 'default',
  className = '',
}: SectionHeadingProps) {
  const Heading = as as ElementType
  const headingSize =
    size === 'display'
      ? 'text-4xl sm:text-5xl lg:text-[3.5rem]'
      : 'text-2xl sm:text-3xl lg:text-[2.25rem]'

  return (
    <div className={`fade-up ${className}`}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Heading id={id} className={`${headingSize} leading-[1.15]`}>
        {title}
      </Heading>
    </div>
  )
}

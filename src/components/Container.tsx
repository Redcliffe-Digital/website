import type { ReactNode } from 'react'

/**
 * Page gutter. Content inside is laid out on a 12 column grid and deliberately
 * does not sit in a single centred column.
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

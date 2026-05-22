import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Central content column, capped at ~1200px with consistent gutters. */
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`max-w-content mx-auto w-full px-6 sm:px-8 ${className}`}>{children}</div>
}

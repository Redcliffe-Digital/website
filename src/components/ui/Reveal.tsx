'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Section reveal: fade + 16px rise, duration-slow, ease-out-soft, fired once at
 * 18% visibility. With prefers-reduced-motion the content renders in place.
 * (animation-system skill, section 4.)
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

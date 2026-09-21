'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

const STAGES = [
  { label: 'source', caption: 'order row' },
  { label: 'ingest', caption: 'CDC, replayable' },
  { label: 'raw', caption: 'immutable landing' },
  { label: 'core', caption: 'conformed' },
  { label: 'marts', caption: 'analyst facing' },
  { label: 'figure', caption: 'published number' },
]

const DESCRIPTION =
  'Data lineage: a single source row travels through ingest, a raw landing zone, a conformed core and analyst facing marts before it becomes a published figure. Every step is reversible, so any figure can be traced back to the row that produced it.'

/** Node opacity ramps as the drawn line reaches it. */
function useNodeOpacity(progress: MotionValue<number>, index: number, reduced: boolean) {
  const at = index / (STAGES.length - 1)
  const value = useTransform(progress, [Math.max(at - 0.12, 0), at], [0, 1])
  return reduced ? 1 : value
}

function Node({
  x,
  y,
  opacity,
  vertical,
  stage,
}: {
  x: number
  y: number
  opacity: MotionValue<number> | number
  vertical: boolean
  stage: (typeof STAGES)[number]
}) {
  const labelX = vertical ? x + 28 : x
  const labelY = vertical ? y + 1 : y + 34
  const captionY = vertical ? y + 19 : y + 52
  const anchor = vertical ? 'start' : 'middle'

  return (
    <g>
      <circle cx={x} cy={y} r={8} className="fill-surface stroke-line-strong" strokeWidth={1.5} />
      <motion.circle cx={x} cy={y} r={4} className="fill-accent" style={{ opacity }} />
      <text
        x={labelX}
        y={labelY}
        textAnchor={anchor}
        className="fill-fg font-mono"
        fontSize={13}
        letterSpacing={1}
      >
        {stage.label}
      </text>
      <text
        x={labelX}
        y={captionY}
        textAnchor={anchor}
        className="fill-fg-muted font-mono"
        fontSize={11}
      >
        {stage.caption}
      </text>
    </g>
  )
}

export function LineageDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.45'],
  })

  const opacities = [
    useNodeOpacity(scrollYProgress, 0, !!reduced),
    useNodeOpacity(scrollYProgress, 1, !!reduced),
    useNodeOpacity(scrollYProgress, 2, !!reduced),
    useNodeOpacity(scrollYProgress, 3, !!reduced),
    useNodeOpacity(scrollYProgress, 4, !!reduced),
    useNodeOpacity(scrollYProgress, 5, !!reduced),
  ]

  const pathLength = reduced ? 1 : scrollYProgress

  // Horizontal: 6 nodes across a 1000 unit canvas.
  const hx = STAGES.map((_, i) => 70 + i * 172)
  const hy = 72

  // Vertical: same stages stacked for narrow viewports.
  const vx = 34
  const vy = STAGES.map((_, i) => 32 + i * 104)

  return (
    <div ref={ref} role="img" aria-label={DESCRIPTION} className="w-full">
      <svg
        viewBox="0 0 1000 150"
        className="hidden w-full md:block"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1={hx[0]}
          y1={hy}
          x2={hx[hx.length - 1]}
          y2={hy}
          className="stroke-line-strong"
          strokeWidth={1.5}
        />
        <motion.line
          x1={hx[0]}
          y1={hy}
          x2={hx[hx.length - 1]}
          y2={hy}
          className="stroke-accent"
          strokeWidth={1.5}
          style={{ pathLength }}
        />
        {STAGES.map((stage, i) => (
          <Node
            key={stage.label}
            x={hx[i] ?? 0}
            y={hy}
            opacity={opacities[i] ?? 1}
            vertical={false}
            stage={stage}
          />
        ))}
      </svg>

      <svg viewBox="0 0 300 580" className="w-full md:hidden" aria-hidden="true" focusable="false">
        <line
          x1={vx}
          y1={vy[0]}
          x2={vx}
          y2={vy[vy.length - 1]}
          className="stroke-line-strong"
          strokeWidth={1.5}
        />
        <motion.line
          x1={vx}
          y1={vy[0]}
          x2={vx}
          y2={vy[vy.length - 1]}
          className="stroke-accent"
          strokeWidth={1.5}
          style={{ pathLength }}
        />
        {STAGES.map((stage, i) => (
          <Node
            key={stage.label}
            x={vx}
            y={vy[i] ?? 0}
            opacity={opacities[i] ?? 1}
            vertical
            stage={stage}
          />
        ))}
      </svg>
    </div>
  )
}

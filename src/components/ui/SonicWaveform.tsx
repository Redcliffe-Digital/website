'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

const LINE_COUNT = 34
const SEGMENT_COUNT = 56
const MAX_DPR = 2

/**
 * Three stroke roles per line. Accent carries the signal, hairline carries the
 * bulk, and a handful of pale strokes break the comb pattern so the band reads
 * as an instrument trace rather than a gradient.
 */
const ACCENT = 1
const PALE = 2
const HAIRLINE = 0
const roleFor = (i: number) => (i % 3 === 0 ? ACCENT : i % 8 === 5 ? PALE : HAIRLINE)

type Rgb = [number, number, number]

/** Colours come from the design tokens, so the canvas never holds its own palette. */
function readToken(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const hex = raw.replace('#', '')
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
  if (full.length !== 6) return fallback
  const parsed: Rgb = [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
  return parsed.some(Number.isNaN) ? fallback : parsed
}

const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`

/**
 * Oscilloscope style backdrop for the hero. It echoes the market data work the
 * firm came out of, so it carries meaning rather than decoration.
 *
 * Cost control: sized to its parent rather than the viewport, device pixel ratio
 * capped at 2, the loop stops whenever the hero leaves the viewport, and
 * prefers-reduced-motion gets one static frame with no animation frame ever
 * requested.
 */
export function SonicWaveform() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bg = readToken('--color-bg', [18, 22, 28])
    const accent = readToken('--color-accent', [232, 115, 79])
    const line = readToken('--color-line-strong', [51, 60, 72])
    const pale = readToken('--color-fg', [232, 228, 220])

    let width = 0
    let height = 0
    let frame = 0
    let time = 0
    let bounds = wrap.getBoundingClientRect()
    const pointer = { x: 0, y: 0, active: false }

    const paint = (trailAlpha: number) => {
      ctx.fillStyle = rgba(bg, trailAlpha)
      ctx.fillRect(0, 0, width, height)

      // Sits in the open band below the copy and reaches up into the space the
      // headline leaves free, which is why mid sits above the lower quarter.
      const mid = height * 0.8
      const amp = Math.min(height * 0.32, 165)

      for (let i = 0; i < LINE_COUNT; i++) {
        const progress = i / (LINE_COUNT - 1)
        const swell = Math.sin(progress * Math.PI)
        const role = roleFor(i)

        ctx.beginPath()
        if (role === ACCENT) {
          ctx.strokeStyle = rgba(accent, swell * 0.5)
          ctx.lineWidth = 1.2
        } else if (role === PALE) {
          ctx.strokeStyle = rgba(pale, swell * 0.2)
          ctx.lineWidth = 1
        } else {
          ctx.strokeStyle = rgba(line, swell * 0.26)
          ctx.lineWidth = 1
        }

        // Detunes each line so the stack reads as separate traces, not a comb.
        const phase = i * 0.37

        for (let j = 0; j <= SEGMENT_COUNT; j++) {
          const x = (j / SEGMENT_COUNT) * width

          let boost = 0
          if (pointer.active) {
            const distance = Math.hypot(x - pointer.x, mid - pointer.y)
            boost = Math.max(0, 1 - distance / 380)
          }

          const noise = Math.sin(j * 0.28 + time + phase) * amp * 0.18
          const spike =
            Math.cos(j * 0.16 + time * 0.8 + i * 0.1) * Math.sin(j * 0.06 + time * 0.6) * amp * 0.5
          const ripple = Math.sin(j * 0.42 - time * 1.3 + phase) * amp * 0.09
          const y = mid + noise + ripple + spike * (1 + boost * 1.4)

          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const resize = () => {
      bounds = wrap.getBoundingClientRect()
      if (bounds.width === 0 || bounds.height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paint(1)
    }

    const loop = () => {
      bounds = wrap.getBoundingClientRect()
      time += 0.014
      paint(0.16)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduced || frame) return
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)

    // Nothing is drawn while the hero is off screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    visibility.observe(wrap)

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (finePointer && !reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('pointerleave', onPointerLeave)
    }

    resize()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibility.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_38%,black_92%,transparent_100%)]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

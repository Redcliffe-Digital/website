'use client'

import { useEffect, useRef } from 'react'

/**
 * Decorative, interactive force-directed network. A small graph laid out by a
 * live force simulation (repulsion + link springs + centring), drawn on a
 * <canvas> in the brand palette. Nodes carry a depth (z) that gently bobs and
 * parallax-sways so the cloud reads as a slowly turning 3D shape, and the
 * cursor both highlights the nearest node (lighting its links) and pushes the
 * surrounding nodes away.
 *
 * No third-party dependency: ~12 nodes, O(n^2) per frame, negligible cost.
 * Purely decorative, so always aria-hidden. Honours prefers-reduced-motion by
 * rendering a single settled frame with no animation.
 */
interface GraphNode {
  x: number
  y: number
  vx: number
  vy: number
  z: number // depth target, roughly [-1, 1]
  phase: number // per-node bob phase
  r: number // base radius in px (at unit depth)
  kind: 'ink' | 'hub' | 'accent'
  // per-frame projected screen-space values
  px: number
  py: number
  pr: number
  pa: number // alpha by depth, ~0.5..1
}

interface LinkSpec {
  a: number
  b: number
  accent?: boolean
}

interface LinkRef {
  a: GraphNode
  b: GraphNode
  accent: boolean
  lit: boolean
}

// Fixed topology so the network keeps a consistent character between loads.
// Initial positions are randomised; the simulation settles them.
const NODE_KINDS: GraphNode['kind'][] = [
  'hub', // 0
  'accent', // 1
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
  'ink',
]

const LINKS: LinkSpec[] = [
  { a: 0, b: 1, accent: true },
  { a: 0, b: 2, accent: true },
  { a: 0, b: 3 },
  { a: 0, b: 4 },
  { a: 0, b: 5 },
  { a: 1, b: 6 },
  { a: 1, b: 8 },
  { a: 2, b: 6 },
  { a: 2, b: 7 },
  { a: 3, b: 7 },
  { a: 3, b: 9 },
  { a: 4, b: 9 },
  { a: 4, b: 10 },
  { a: 5, b: 8 },
  { a: 5, b: 11 },
  { a: 6, b: 11 },
  { a: 7, b: 12 },
  { a: 9, b: 12 },
  { a: 10, b: 11 },
  { a: 8, b: 10 },
]

function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function ForceGraph({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = {
      ink: readVar('--color-ink', '#0f1419'),
      muted: readVar('--color-muted', '#5c6470'),
      oxblood: readVar('--color-oxblood', '#8b1e2d'),
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    // --- graph state -------------------------------------------------------
    const nodes: GraphNode[] = NODE_KINDS.map((kind, i) => {
      const a = (i / NODE_KINDS.length) * Math.PI * 2
      return {
        x: Math.cos(a) * 0.6 + (Math.random() - 0.5) * 0.2,
        y: Math.sin(a) * 0.6 + (Math.random() - 0.5) * 0.2,
        vx: 0,
        vy: 0,
        z: (Math.random() - 0.5) * 1.6,
        phase: Math.random() * Math.PI * 2,
        r: kind === 'hub' ? 7.5 : kind === 'accent' ? 5 : 4.2,
        kind,
        px: 0,
        py: 0,
        pr: 0,
        pa: 1,
      }
    })

    // resolve link endpoints to node references once (avoids per-frame indexing)
    const links: LinkRef[] = LINKS.flatMap((l) => {
      const a = nodes[l.a]
      const b = nodes[l.b]
      return a && b ? [{ a, b, accent: !!l.accent, lit: false }] : []
    })

    // --- sizing ------------------------------------------------------------
    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let span = 1
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = wrap!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      if (w === 0 || h === 0) return
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h / 2
      span = (Math.min(w, h) / 2) * 0.88
    }

    // --- pointer -----------------------------------------------------------
    const pointer = { active: false, px: 0, py: 0, mx: 0, my: 0 }

    function toModel() {
      // approximate inverse of the projection (ignores parallax; good enough)
      pointer.mx = (pointer.px - cx) / span
      pointer.my = (pointer.py - cy) / span
    }
    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.px = e.clientX - rect.left
      pointer.py = e.clientY - rect.top
      pointer.active = true
      toModel()
    }
    function onLeave() {
      pointer.active = false
    }
    if (!reduced) {
      canvas.addEventListener('pointermove', onMove)
      canvas.addEventListener('pointerleave', onLeave)
    }

    // --- simulation --------------------------------------------------------
    const REST = 0.47
    const SPRING = 1.2
    const REP = 0.057
    const CENTER = 0.22
    const DAMP = 0.86
    const VMAX = 2

    function step(dt: number) {
      // pairwise repulsion
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i]
        if (!ni) continue
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j]
          if (!nj) continue
          const dx = ni.x - nj.x
          const dy = ni.y - nj.y
          let d2 = dx * dx + dy * dy
          if (d2 < 0.0064) d2 = 0.0064 // clamp min distance
          const d = Math.sqrt(d2)
          let f = REP / d2
          if (f > 2) f = 2
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          ni.vx += fx * dt
          ni.vy += fy * dt
          nj.vx -= fx * dt
          nj.vy -= fy * dt
        }
      }
      // link springs
      for (const l of links) {
        const dx = l.b.x - l.a.x
        const dy = l.b.y - l.a.y
        const d = Math.hypot(dx, dy) || 0.0001
        const f = SPRING * (d - REST)
        const fx = (dx / d) * f
        const fy = (dy / d) * f
        l.a.vx += fx * dt
        l.a.vy += fy * dt
        l.b.vx -= fx * dt
        l.b.vy -= fy * dt
      }
      // centring + cursor repulsion + integrate
      for (const n of nodes) {
        n.vx -= CENTER * n.x * dt
        n.vy -= CENTER * n.y * dt

        if (pointer.active) {
          const dx = n.x - pointer.mx
          const dy = n.y - pointer.my
          const d2 = dx * dx + dy * dy
          if (d2 < 0.25) {
            const d = Math.sqrt(d2) || 0.0001
            const f = (0.045 * (1 - d / 0.5)) / d
            n.vx += dx * f
            n.vy += dy * f
          }
        }

        n.vx *= DAMP
        n.vy *= DAMP
        const sp = Math.hypot(n.vx, n.vy)
        if (sp > VMAX) {
          n.vx = (n.vx / sp) * VMAX
          n.vy = (n.vy / sp) * VMAX
        }
        n.x += n.vx * dt
        n.y += n.vy * dt
        // soft bounds
        n.x = Math.max(-1.4, Math.min(1.4, n.x))
        n.y = Math.max(-1.4, Math.min(1.4, n.y))
      }
    }

    // --- projection + render ----------------------------------------------
    function project(t: number, swayAngle: number) {
      const cosA = Math.cos(swayAngle)
      const sinA = Math.sin(swayAngle)
      for (const n of nodes) {
        const z = reduced ? n.z : n.z + 0.18 * Math.sin(t * 0.0009 + n.phase)
        const par = z * 0.16
        const px = n.x + par * cosA
        const py = n.y + par * sinA * 0.45
        n.px = cx + px * span
        n.py = cy + py * span
        const depth = (z + 1.2) / 2.4 // ~0..1, near = 1
        n.pr = n.r * (0.78 + depth * 0.5)
        n.pa = 0.5 + depth * 0.5
      }
    }

    function nearestToCursor(): GraphNode | null {
      if (!pointer.active) return null
      let best: GraphNode | null = null
      let bestD = 26 * 26
      for (const n of nodes) {
        const dx = n.px - pointer.px
        const dy = n.py - pointer.py
        const d2 = dx * dx + dy * dy
        if (d2 < bestD) {
          bestD = d2
          best = n
        }
      }
      return best
    }

    const order = [...nodes]

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)
      const hovered = nearestToCursor()

      // edges
      for (const l of links) {
        l.lit = hovered != null && (l.a === hovered || l.b === hovered)
        const depth = (l.a.pa + l.b.pa) / 2
        ctx!.beginPath()
        ctx!.moveTo(l.a.px, l.a.py)
        ctx!.lineTo(l.b.px, l.b.py)
        if (l.lit) {
          ctx!.strokeStyle = colors.oxblood
          ctx!.globalAlpha = 0.8
          ctx!.lineWidth = 1.8
        } else if (l.accent) {
          ctx!.strokeStyle = colors.oxblood
          ctx!.globalAlpha = 0.5 * depth
          ctx!.lineWidth = 1.4
        } else {
          ctx!.strokeStyle = colors.muted
          ctx!.globalAlpha = 0.38 * depth
          ctx!.lineWidth = 1.2
        }
        ctx!.stroke()
      }

      // nodes, far to near
      order.sort((p, q) => p.pa - q.pa)
      for (const n of order) {
        const isHover = n === hovered
        const r = n.pr * (isHover ? 1.5 : 1)

        // hub gets a faint pulsing ring
        if (n.kind === 'hub') {
          const ring = r + 5 + (reduced ? 0 : Math.sin(t * 0.0022) * 1.6)
          ctx!.beginPath()
          ctx!.arc(n.px, n.py, ring, 0, Math.PI * 2)
          ctx!.strokeStyle = colors.oxblood
          ctx!.globalAlpha = 0.4
          ctx!.lineWidth = 1.4
          ctx!.stroke()
        }

        ctx!.beginPath()
        ctx!.arc(n.px, n.py, r, 0, Math.PI * 2)
        if (n.kind === 'hub' || n.kind === 'accent') {
          ctx!.fillStyle = colors.oxblood
          ctx!.globalAlpha = isHover ? 1 : n.kind === 'hub' ? 1 : 0.85
        } else {
          ctx!.fillStyle = colors.ink
          ctx!.globalAlpha = (isHover ? 1 : 0.72) * n.pa
        }
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    // --- loop --------------------------------------------------------------
    let raf = 0
    let last = 0
    let sway = 0

    function frame(now: number) {
      if (!last) last = now
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.032) dt = 0.032
      sway += dt * 0.18
      step(dt)
      project(now, sway)
      draw(now)
      raf = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) {
        project(0, 0)
        draw(0)
      }
    })
    ro.observe(wrap)

    if (reduced) {
      // settle the layout, then draw one static frame
      for (let i = 0; i < 400; i++) step(0.02)
      project(0, 0)
      draw(0)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ aspectRatio: '420 / 460' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

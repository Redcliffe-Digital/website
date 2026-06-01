/**
 * Decorative, abstract data motif: ingestion streams feeding a layered store
 * (raw → core → marts) with a query path out, the top plane in oxblood. Drawn
 * in the brand palette via the theme CSS variables. Purely decorative —
 * always rendered aria-hidden.
 */
export function DataMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="10 100 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* ingestion streams */}
      <g stroke="var(--color-muted)" strokeWidth="1.6" opacity="0.55">
        <path d="M18 120 C 80 120, 100 168, 150 168" />
        <path d="M18 175 C 80 175, 110 188, 150 188" />
        <path d="M18 235 C 90 235, 110 208, 150 208" />
      </g>
      <g fill="var(--color-muted)" opacity="0.7">
        <circle cx="18" cy="120" r="3.6" />
        <circle cx="18" cy="175" r="3.6" />
        <circle cx="18" cy="235" r="3.6" />
      </g>

      {/* bounding prism edges */}
      <g stroke="var(--color-muted)" strokeWidth="1.4" opacity="0.35">
        <line x1="155" y1="170" x2="155" y2="300" />
        <line x1="345" y1="170" x2="345" y2="300" />
        <line x1="250" y1="204" x2="250" y2="334" />
      </g>

      {/* layer planes: core and base */}
      <g stroke="var(--color-ink)" strokeWidth="1.7" opacity="0.85">
        <polygon points="250,236 345,270 250,304 155,270" />
        <polygon points="250,203 345,237 250,271 155,237" />
      </g>

      {/* top plane — oxblood accent */}
      <polygon
        points="250,170 345,204 250,238 155,204"
        fill="var(--color-oxblood)"
        fillOpacity="0.07"
        stroke="var(--color-oxblood)"
        strokeWidth="1.9"
      />

      {/* query path out */}
      <path
        d="M345 204 C 380 204, 388 250, 402 250"
        stroke="var(--color-muted)"
        strokeWidth="1.6"
        opacity="0.55"
      />
      <circle cx="402" cy="250" r="3.6" fill="var(--color-oxblood)" opacity="0.8" />
    </svg>
  )
}

/**
 * Decorative, abstract network motif: nodes connected by edges, with an oxblood
 * hub. Drawn in the brand palette via the theme CSS variables. Purely
 * decorative — always rendered aria-hidden.
 */
export function NetworkMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* edges */}
      <g stroke="var(--color-muted)" strokeWidth="1.3" opacity="0.4">
        <line x1="70" y1="90" x2="190" y2="60" />
        <line x1="190" y1="60" x2="320" y2="110" />
        <line x1="70" y1="90" x2="110" y2="200" />
        <line x1="190" y1="60" x2="110" y2="200" />
        <line x1="320" y1="110" x2="360" y2="235" />
        <line x1="110" y1="200" x2="250" y2="185" />
        <line x1="250" y1="185" x2="360" y2="235" />
        <line x1="110" y1="200" x2="70" y2="320" />
        <line x1="250" y1="185" x2="180" y2="305" />
        <line x1="360" y1="235" x2="300" y2="335" />
        <line x1="70" y1="320" x2="180" y2="305" />
        <line x1="180" y1="305" x2="300" y2="335" />
        <line x1="70" y1="320" x2="135" y2="415" />
        <line x1="180" y1="305" x2="255" y2="420" />
        <line x1="300" y1="335" x2="370" y2="385" />
        <line x1="135" y1="415" x2="255" y2="420" />
        <line x1="255" y1="420" x2="370" y2="385" />
        <line x1="250" y1="185" x2="300" y2="335" />
      </g>

      {/* edges from the hub — oxblood accent */}
      <g stroke="var(--color-oxblood)" strokeWidth="1.5" opacity="0.55">
        <line x1="250" y1="185" x2="190" y2="60" />
        <line x1="250" y1="185" x2="180" y2="305" />
      </g>

      {/* nodes */}
      <g fill="var(--color-ink)" opacity="0.72">
        <circle cx="70" cy="90" r="4.5" />
        <circle cx="190" cy="60" r="5" />
        <circle cx="320" cy="110" r="4.5" />
        <circle cx="110" cy="200" r="5" />
        <circle cx="360" cy="235" r="4.5" />
        <circle cx="70" cy="320" r="4.5" />
        <circle cx="300" cy="335" r="5" />
        <circle cx="135" cy="415" r="4" />
        <circle cx="255" cy="420" r="4.5" />
        <circle cx="370" cy="385" r="4" />
      </g>

      {/* accent nodes */}
      <circle cx="180" cy="305" r="5.5" fill="var(--color-oxblood)" opacity="0.8" />
      <circle cx="250" cy="185" r="8" fill="var(--color-oxblood)" />
      <circle
        cx="250"
        cy="185"
        r="13"
        fill="none"
        stroke="var(--color-oxblood)"
        strokeWidth="1.4"
        opacity="0.45"
      />
    </svg>
  )
}

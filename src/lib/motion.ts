/**
 * Stagger step for grouped children. Lives outside the client Reveal module so
 * Server Components can call it directly.
 * animation-system skill: 60 to 100ms per item, capped at 6 visible steps.
 */
export const stagger = (i: number) => Math.min(i, 5) * 0.08

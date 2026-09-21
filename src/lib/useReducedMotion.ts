'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(listener: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', listener)
  return () => mql.removeEventListener('change', listener)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/**
 * Reads the preference synchronously on the client. framer-motion's own hook
 * settles a tick later, which left scroll-linked graphics stuck at their start
 * value for users who had asked for reduced motion.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

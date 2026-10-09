'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      data-site-header
      className="border-line bg-bg/92 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-sm"
    >
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-body-sm flex min-h-14 items-center gap-2 py-3 font-bold tracking-[-0.03em] lg:min-h-16"
        >
          Redcliffe
          <span className="text-label-sm text-fg-muted font-mono font-medium tracking-[0.08em] uppercase">
            Digital
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-brand text-label hover:bg-surface-high hover:text-fg flex min-h-11 items-center px-3 font-mono tracking-[0.08em] uppercase transition-colors duration-200 ease-[var(--ease-out-soft)] ${
                      active ? 'text-accent' : 'text-fg-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-brand text-fg hover:bg-surface-high -mr-2 flex size-11 items-center justify-center transition-colors duration-200 lg:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-200 ease-[var(--ease-in-out-smooth)] ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute top-2 left-0 block h-px w-5 bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-200 ease-[var(--ease-in-out-smooth)] ${
                open ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-line bg-bg border-t lg:hidden"
      >
        <nav aria-label="Main">
          <ul className="flex flex-col px-5 py-2 sm:px-8">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href} className="border-line border-b last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-label flex min-h-14 items-center font-mono tracking-[0.08em] uppercase transition-colors duration-200 ${
                      active ? 'text-accent' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

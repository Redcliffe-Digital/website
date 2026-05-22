import Link from 'next/link'
import { Container } from './Container'
import { Logo } from './Logo'
import { nav } from '@/lib/site'

/**
 * Sticky site header: white, hairline bottom border. Pure server component —
 * no client JS. On narrow screens the nav wraps onto its own row beneath the
 * logo rather than hiding behind a toggle, so it stays keyboard-reachable.
 */
export function Header() {
  return (
    <header
      data-site-header
      className="border-hairline sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="Redcliffe Digital — home" className="shrink-0 py-2">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink hover:text-oxblood text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
      {/* Narrow-screen nav row */}
      <nav aria-label="Primary" className="border-hairline border-t sm:hidden">
        <Container>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink hover:text-oxblood text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  )
}

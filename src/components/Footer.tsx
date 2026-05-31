import Link from 'next/link'
import { Container } from './Container'
import { Logo } from './Logo'
import { Badges } from './Badges'
import { services, site } from '@/lib/site'

const company = [
  { label: 'About', href: '/about' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: `mailto:${site.careersEmail}` },
]

const legal = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Cookies', href: '/legal/cookies' },
  { label: 'Accessibility statement', href: '/legal/accessibility' },
  { label: 'Modern Slavery statement', href: '/legal/modern-slavery' },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('mailto:') || href.startsWith('http')
  const className = 'text-sm text-white/70 transition-colors hover:text-white'
  return external ? (
    <a href={href} className={className}>
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

function Column({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-medium tracking-[0.12em] text-white/50 uppercase">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer data-site-footer className="bg-ink text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Logo variant="inverse" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Senior engineers, architects and SREs applying trading-grade discipline to UK public
              sector technology.
            </p>
            <Badges
              variant="light"
              size={32}
              showLabels={false}
              ids={[
                'aws-developer-associate',
                'azure-fundamentals',
                'cyber-essentials',
                'iso-27001',
              ]}
              className="mt-7"
            />
          </div>
          <Column heading="Services" links={services} />
          <Column heading="Company" links={company} />
          <Column heading="Legal" links={legal} />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName}. Registered in England and Wales, {site.companyNumber}.
          </p>
          {/* TODO: add GitHub URL once the source repository is public. */}
          <a
            href="https://github.com/redcliffe-digital/website"
            className="transition-colors hover:text-white"
          >
            Built in the open · View source
          </a>
        </Container>
      </div>
    </footer>
  )
}

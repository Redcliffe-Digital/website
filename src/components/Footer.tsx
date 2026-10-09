import Link from 'next/link'
import { Container } from './Container'
import { accreditations } from '@/content/accreditations'
import { formattedAddress, services, site } from '@/lib/site'

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
  const className =
    'text-body-sm text-fg-muted hover:text-fg inline-flex min-h-11 items-center transition-colors duration-200'
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
      <h2 className="text-label-sm text-fg-muted font-mono tracking-[0.08em] uppercase">
        {heading}
      </h2>
      <ul className="mt-4 space-y-1">
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
  const year = new Date().getFullYear()

  return (
    <footer data-site-footer className="border-line bg-surface mt-24 border-t md:mt-32">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-h3-sm md:text-h3 font-bold tracking-[-0.03em]">
              {site.name.split(' ')[0]}
              <span className="text-label-sm text-fg-muted ml-2 font-mono font-medium tracking-[0.08em] uppercase">
                Digital
              </span>
            </p>
            <p className="text-body-sm text-fg-muted mt-3 max-w-[36ch]">{site.description}</p>
            <ul className="text-label-sm mt-6 space-y-1 font-mono">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent hover:text-fg inline-flex min-h-11 items-center transition-colors duration-200"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-fg-muted hover:text-fg inline-flex min-h-11 items-center transition-colors duration-200"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {accreditations.slice(0, 4).map((item) => (
                <li
                  key={item.name}
                  className="rounded-brand bg-fg flex h-10 w-10 items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.badge} alt={item.name} width={28} height={28} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Column heading="Services" links={services} />
          </div>
          <div className="lg:col-span-2">
            <Column heading="Company" links={company} />
          </div>
          <div className="lg:col-span-3">
            <Column heading="Legal" links={legal} />
          </div>
        </div>

        <div className="border-line mt-14 flex flex-col gap-6 border-t pt-8 lg:flex-row lg:items-end lg:justify-between">
          <address className="text-label-sm text-fg-muted font-mono leading-relaxed not-italic">
            {formattedAddress}
          </address>
          <div className="text-label-sm text-fg-muted font-mono lg:text-right">
            <p>
              &copy; {year} {site.legalName}. Registered in England and Wales, {site.companyNumber}.
            </p>
            <p className="mt-2">
              <a
                href="https://github.com/Redcliffe-Digital/website"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg underline underline-offset-4 transition-colors duration-200"
              >
                Built in the open · View source
              </a>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              Built by{' '}
              <a
                href="https://onovo.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-accent underline underline-offset-4 transition-colors duration-200"
              >
                onovo.at
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

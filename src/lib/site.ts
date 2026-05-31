/**
 * Site-wide constants. Edit copy and contact details here (and in CONTENT.md's
 * referenced files) rather than hunting through components.
 */
export const site = {
  name: 'Redcliffe Digital',
  legalName: 'Redcliffe Digital Ltd',
  // Used for canonical URLs, sitemap, Open Graph and JSON-LD. Update before launch.
  url: 'https://www.redcliffedigital.co.uk',
  description:
    'A small team of senior engineers, architects and SREs applying trading-grade engineering discipline to UK public sector technology.',
  tagline: 'UK-based technology consultancy',
  email: 'hello@redcliffedigital.co.uk',
  pressEmail: 'press@redcliffedigital.co.uk',
  careersEmail: 'careers@redcliffedigital.co.uk',
  // Formspree contact-form endpoint. Create a (free) form at https://formspree.io,
  // then replace YOUR_FORM_ID with the ID from your form's integration tab.
  // The endpoint is public by design — safe to commit. TODO: set before launch.
  formspreeEndpoint: 'https://formspree.io/f/mojboaew',
  phone: '+44 (0)117 374 9120', // TODO: confirm before launch
  phoneHref: '+441173749120',
  address: {
    line1: 'Flat 14 Hanover Court',
    line2: 'Hanover Street',
    city: 'Newcastle',
    postcode: 'ST5 1HE',
    country: 'GB',
  },
  companyNumber: '17197703',
} as const

/** Single-line postal address for display. */
export const formattedAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postcode}`

export const nav: { label: string; href: string }[] = [
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const services: { label: string; href: string }[] = [
  { label: 'Cloud platform engineering', href: '/what-we-do#cloud-platform-engineering' },
  { label: 'Resilience and SRE', href: '/what-we-do#resilience-and-sre' },
  { label: 'Data and analytics engineering', href: '/what-we-do#data-and-analytics' },
  { label: 'Security and assurance', href: '/what-we-do#security-and-assurance' },
]

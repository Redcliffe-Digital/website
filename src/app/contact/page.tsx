import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { ContactForm } from '@/components/ContactForm'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { formattedAddress, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get in touch',
  description: 'Tell us what you’re working on. We come back within one working day.',
  alternates: { canonical: '/contact' },
}

const details = [
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: MapPin, label: 'Office', value: formattedAddress, href: undefined },
]

export default function ContactPage() {
  return (
    <>
      <PageHero>
        <p className="text-label-sm sm:text-label text-fg-muted font-mono tracking-[0.08em] uppercase">
          <span className="text-accent">Contact</span>
        </p>
        <h1 className="text-h1-sm md:text-h1 mt-6 max-w-[16ch] font-bold tracking-[-0.03em] text-balance">
          Get in touch
        </h1>
        <p className="text-body-sm md:text-body text-fg-muted border-accent-deep mt-6 max-w-[62ch] border-l pl-5 md:pl-6">
          Tell us what you’re working on. We’ll come back to you within one working day.
        </p>
      </PageHero>

      <section className="border-line border-b py-20 md:py-28" aria-label="Contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <ul className="border-line grid gap-px">
                {details.map(({ icon: DetailIcon, label, value, href }) => (
                  <li key={label} className="border-line flex gap-4 border-t py-5 first:border-t-0">
                    <DetailIcon
                      className="text-accent mt-0.5 h-5 w-5 shrink-0"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-label-sm text-fg-muted font-mono tracking-[0.08em] uppercase">
                        {label}
                      </p>
                      <p className="text-body-sm mt-1.5">
                        {href ? (
                          <a href={href} className="link-accent">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Reveal className="rounded-brand border-line bg-surface mt-10 border p-6">
                <p className="text-body-sm text-fg-muted">
                  For media enquiries, email{' '}
                  <a href={`mailto:${site.pressEmail}`} className="link-accent">
                    {site.pressEmail}
                  </a>
                  . For security disclosures, see our{' '}
                  <a href="/.well-known/security.txt" className="link-accent">
                    security.txt
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Phone, FileText } from 'lucide-react'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { ContactForm } from '@/components/ContactForm'
import { formattedAddress, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get in touch',
  description:
    'Tell us what you’re working on. We come back within one working day. Listed on G-Cloud 14 and Digital Outcomes 6.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        intro="Tell us what you’re working on. We’ll come back to you within one working day."
      />

      <section className="pt-6 pb-16 sm:pb-20 lg:pb-24" aria-label="Contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Direct details */}
            <div className="lg:col-span-5">
              <ul
                role="list"
                className="border-hairline space-y-8 border-t pt-8 lg:border-t-0 lg:pt-0"
              >
                <li className="flex gap-4">
                  <Mail
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="eyebrow">Email</p>
                    <p className="mt-1">
                      <a href={`mailto:${site.email}`} className="link-accent">
                        {site.email}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="eyebrow">Phone</p>
                    <p className="text-body mt-1">
                      <a href={`tel:${site.phoneHref}`} className="hover:text-oxblood">
                        {site.phone}
                      </a>{' '}
                      <span className="text-muted text-xs">(placeholder)</span>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="eyebrow">Office</p>
                    <p className="text-body mt-1">{formattedAddress}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <FileText
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="eyebrow">Procurement</p>
                    <p className="text-body mt-1 leading-relaxed">
                      We’re listed on G-Cloud 14 and Digital Outcomes 6. Our supplier ID is{' '}
                      <span className="font-medium whitespace-nowrap">RDC-2026-008</span>{' '}
                      <span className="text-muted text-xs">(placeholder)</span>.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Media / security band */}
      <div className="border-hairline bg-stripe border-t">
        <Container className="py-6">
          <p className="text-muted text-sm leading-relaxed">
            For media enquiries, please email{' '}
            <a href={`mailto:${site.pressEmail}`} className="link-accent">
              {site.pressEmail}
            </a>
            . For security disclosures, see our{' '}
            <Link href="/.well-known/security.txt" className="link-accent">
              security.txt
            </Link>
            .
          </p>
        </Container>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Phone, FileText } from 'lucide-react'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get in touch',
  description:
    'Tell us what you’re working on. We come back within one working day. Listed on G-Cloud 14 and Digital Outcomes 6.',
  alternates: { canonical: '/contact' },
}

const fieldClass =
  'mt-2 w-full border border-hairline bg-card px-4 py-3 text-body placeholder:text-muted/60 focus:border-oxblood'
const labelClass = 'block text-sm font-medium text-ink'

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
              {/*
                Static-export note: this form posts to a mailto: fallback so it
                works without a backend. Before launch, wire it to a Formspree
                form or an SES-backed Lambda (see NEXT_STEPS.md) and validate the
                honeypot field server-side.
              */}
              <form
                action={`mailto:${site.email}`}
                method="post"
                encType="text/plain"
                className="max-w-xl"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="organisation" className={labelClass}>
                      Organisation
                    </label>
                    <input
                      id="organisation"
                      name="organisation"
                      type="text"
                      autoComplete="organization"
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from people, tempting to bots. Validated server-side once wired up. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company-website">Leave this field empty</label>
                  <input
                    id="company-website"
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button type="submit" variant="primary" className="mt-8">
                  Send message
                </Button>
              </form>
            </div>

            {/* Direct details */}
            <div className="lg:col-span-5">
              <dl className="border-hairline space-y-8 border-t pt-8 lg:border-t-0 lg:pt-0">
                <div className="flex gap-4">
                  <Mail
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="eyebrow">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${site.email}`} className="link-accent">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="eyebrow">Phone</dt>
                    <dd className="text-body mt-1">
                      <a href={`tel:${site.phoneHref}`} className="hover:text-oxblood">
                        {site.phone}
                      </a>{' '}
                      <span className="text-muted text-xs">(placeholder)</span>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="eyebrow">Office</dt>
                    <dd className="text-body mt-1">
                      {site.address.line1}, {site.address.city} {site.address.postcode}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText
                    className="text-oxblood mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="eyebrow">Procurement</dt>
                    <dd className="text-body mt-1 leading-relaxed">
                      We’re listed on G-Cloud 14 and Digital Outcomes 6. Our supplier ID is{' '}
                      <span className="font-medium whitespace-nowrap">RDC-2026-008</span>{' '}
                      <span className="text-muted text-xs">(placeholder)</span>.
                    </dd>
                  </div>
                </div>
              </dl>
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

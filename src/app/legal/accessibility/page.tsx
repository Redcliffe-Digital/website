import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Accessibility statement',
  description:
    'Accessibility statement for the Redcliffe Digital website, prepared against WCAG 2.2 level AA.',
  alternates: { canonical: '/legal/accessibility' },
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 text-xl font-medium sm:text-2xl">
      {children}
    </h2>
  )
}

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility statement"
        intro="This statement applies to the website at www.redcliffedigital.co.uk."
      />

      <section className="pb-20 pt-4 lg:pb-28">
        <Container>
          <div className="max-w-2xl leading-relaxed text-body">
            <p>
              This website is run by {site.legalName}. We want as many people as possible to be able
              to use it. For example, that means you should be able to:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                'navigate the entire site using a keyboard',
                'change colours, contrast levels and fonts using browser settings',
                'zoom in up to 400% without text spilling off the screen',
                'read the site with a screen reader, in a logical reading order',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-oxblood" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              We have also tried to make the content plain and the layout simple. AbilityNet has{' '}
              <a
                href="https://mcmw.abilitynet.org.uk/"
                className="link-accent"
                rel="noopener noreferrer"
                target="_blank"
              >
                advice on making your device easier to use
              </a>{' '}
              if you have a disability.
            </p>

            <H2 id="how-accessible">How accessible this website is</H2>
            <p className="mt-4">
              We believe this website is fully compliant with the{' '}
              <a
                href="https://www.w3.org/TR/WCAG22/"
                className="link-accent"
                rel="noopener noreferrer"
                target="_blank"
              >
                Web Content Accessibility Guidelines version 2.2
              </a>{' '}
              AA standard. The site is a static, content-only website with no carousels, no
              auto-playing media and no cookie banners. Motion is limited to a single subtle fade on
              first paint, which is disabled for anyone who has asked their device to reduce motion.
            </p>
            <p className="mt-4">
              We are not aware of any parts of the website that fail the AA standard. If you find
              something that does, please tell us — see the next section.
            </p>

            <H2 id="report">Reporting accessibility problems</H2>
            <p className="mt-4">
              We are always looking to improve the accessibility of this website. If you find a
              problem that is not listed here, or you think we are not meeting accessibility
              requirements, email{' '}
              <a href={`mailto:${site.email}`} className="link-accent">
                {site.email}
              </a>
              . We aim to respond within five working days.
            </p>

            <H2 id="enforcement">Enforcement procedure</H2>
            <p className="mt-4">
              The Equality and Human Rights Commission (EHRC) is responsible for enforcing the
              accessibility regulations. If you are not happy with how we respond to your complaint,
              contact the{' '}
              <a
                href="https://www.equalityadvisoryservice.com/"
                className="link-accent"
                rel="noopener noreferrer"
                target="_blank"
              >
                Equality Advisory and Support Service (EASS)
              </a>
              .
            </p>

            <H2 id="technical">Technical information about this website&rsquo;s accessibility</H2>
            <p className="mt-4">
              {site.legalName} is committed to making its website accessible, in accordance with the
              Web Content Accessibility Guidelines version 2.2 AA standard. This website is fully
              compliant with those guidelines.
            </p>

            <H2 id="preparation">Preparation of this statement</H2>
            <p className="mt-4">
              This statement was prepared on 22 May 2026 and last reviewed on 22 May 2026. The
              website was tested against WCAG 2.2 AA. Testing was carried out internally using a
              combination of automated checks (axe-core), full keyboard-only navigation, screen
              reader spot checks (VoiceOver and NVDA), and manual review of colour contrast and
              text resizing.
            </p>
            <p className="mt-4 text-sm text-muted">
              {/* TODO: confirm test dates, tools and any audit reference with whoever signs this off before launch. */}
              Review this statement at least once a year, and again after any significant change to
              the website.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}

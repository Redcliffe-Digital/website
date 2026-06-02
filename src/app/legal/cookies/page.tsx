import type { Metadata } from 'next'
import { LegalStub } from '@/components/LegalStub'

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Cookie notice for the Redcliffe Digital website.',
  alternates: { canonical: '/legal/cookies' },
  robots: { index: false, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalStub title="Cookies">
      {/* TODO: drafted by legal */}
      <p>
        This website sets no cookies and runs no third-party analytics or tracking scripts. There is
        therefore nothing to consent to, and no cookie banner. If that changes, for example if we
        add privacy-respecting analytics, this notice will be updated first.
      </p>
    </LegalStub>
  )
}

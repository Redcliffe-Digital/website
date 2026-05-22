import type { Metadata } from 'next'
import { LegalStub } from '@/components/LegalStub'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy notice for Redcliffe Digital Ltd.',
  alternates: { canonical: '/legal/privacy' },
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return <LegalStub title="Privacy" />
}

import type { Metadata } from 'next'
import { LegalStub } from '@/components/LegalStub'

export const metadata: Metadata = {
  title: 'Modern Slavery statement',
  description: 'Modern Slavery and Human Trafficking statement for Redcliffe Digital Ltd.',
  alternates: { canonical: '/legal/modern-slavery' },
  robots: { index: false, follow: true },
}

export default function ModernSlaveryPage() {
  return <LegalStub title="Modern Slavery statement" />
}

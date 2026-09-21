import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { site } from '@/lib/site'

// Workhorse UI and body face.
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

// Carries the labels, eyebrows and navigation, where the fixed rhythm reads as
// instrumentation rather than decoration.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, UK technology consultancy`,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: site.url,
    siteName: site.name,
    title: `${site.name}, UK technology consultancy`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, UK technology consultancy`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#12161c',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable}`}
      // Next 16 no longer overrides scroll-behavior on navigation; this opts
      // back in, so route changes stay instant while in-page anchors glide.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/*
        Analytics: none by default — no cookies, no third-party scripts, so no
        cookie banner is required. To enable privacy-respecting, cookieless
        Plausible analytics, decide on it (see NEXT_STEPS.md) and add the tag
        below to <head>:

        <script
          defer
          data-domain="redcliffedigital.co.uk"
          src="https://plausible.io/js/script.js"
        />
        TODO: confirm the analytics decision before launch.
      */}
      <body className="bg-bg text-fg flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="rounded-brand focus:bg-accent focus:text-bg focus:text-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:font-mono focus:tracking-[0.08em] focus:uppercase"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-14 lg:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { site } from '@/lib/site'

// Editorial display face for headings; optical sizing axis requested so large
// headings get the FT-feature-piece feel.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
})

// Workhorse UI/body face.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
  themeColor: '#FAFAF7',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${inter.variable}`}
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
      <body className="flex min-h-screen flex-col">
        {/*
          Variant toggle. ?v=db shows the data-warehouse variant and sticks for
          the session (so click-throughs stay on it); any other ?v value (e.g.
          ?v=default) clears it back to the standard site; with no ?v param the
          last sticky choice is used. Runs before paint to avoid a flash; the
          gating itself is pure CSS (see globals.css).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=new URLSearchParams(window.location.search);var v=p.get('v');if(v!==null){if(v==='db'){try{sessionStorage.setItem('site-variant','db')}catch(e){}}else{try{sessionStorage.removeItem('site-variant')}catch(e){}v='before'}}else{try{v=sessionStorage.getItem('site-variant')}catch(e){}}var c=document.documentElement.classList;if(v==='db'){c.add('v-db')}else{c.remove('v-db')}}catch(e){}})();",
          }}
        />
        <a
          href="#main-content"
          className="focus:bg-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

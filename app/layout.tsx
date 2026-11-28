import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import { EntryPopup } from '@/components/entry-popup'
import { SiteConfigProvider, type SiteConfig } from '@/components/site-config'
import { cmsGetOr } from '@/lib/server/cms'
import './fonts/fonts.css'
import './globals.css'

// Fonts are files in app/fonts, not downloaded from Google during the build. See app/fonts/fonts.css.
const manrope = localFont({
  src: './fonts/manrope-latin.woff2',
  weight: '400 800',
  variable: '--font-manrope-latin',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
})

export const metadata: Metadata = {
  // Canonical links, Open Graph images and the sitemap use this address (NEXT_PUBLIC_SITE_URL).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shreevarahi.com'),
  title: 'Shree Varahi | 3 Decades of Trust. One Powerful Platform.',
  description: 'Trade stocks, F&O, mutual funds, IPOs, and US equities with Shree Varahi by Lakshmishree Investment & Securities Ltd. Flat ₹17 brokerage on delivery, intraday & F&O. SEBI registered since 1993.',
  keywords: ['trading platform', 'stocks', 'F&O', 'mutual funds', 'IPO', 'demat account', 'Lakshmishree', 'SEBI registered'],
  icons: {
    icon: '/favicon.jpg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Shree Varahi | 3 Decades of Trust. One Powerful Platform.',
    description: 'Trade with confidence. SEBI registered since 1993. Flat ₹17 brokerage. 1 Lakh+ active investors trust us.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Shree Varahi | 3 Decades of Trust. One Powerful Platform.',
    description: 'Trade with confidence. SEBI registered since 1993. Flat ₹17 brokerage. 1 Lakh+ active investors trust us.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Published Masters (navbar, footer, legal text, risk popup). Cached under the site-config tag and
  // refreshed when something is published in the panel. Without it the site uses its own values.
  const config = await cmsGetOr<{ sections: SiteConfig }>('/site-config', { sections: {} }, { tags: ['site-config'] })
  return (
    <html lang="en" className={`${manrope.variable} bg-background overflow-x-clip`}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body>; don't warn about those. */}
      <body className="font-sans antialiased bg-background text-foreground overflow-x-clip" suppressHydrationWarning>
        <SiteConfigProvider value={config.sections ?? {}}>
          <ScrollProgress />
          {children}
          <EntryPopup />
        </SiteConfigProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

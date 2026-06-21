import type { Metadata } from 'next'
import { Manrope, DM_Sans, DM_Mono, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shree Varahi | 31 Years of Trust. One Powerful Platform.',
  description: 'Trade stocks, F&O, mutual funds, IPOs, and US equities with Shree Varahi by Lakshmishree Investment & Securities Ltd. ₹0 delivery, ₹17 flat brokerage. SEBI registered since 1993.',
  keywords: ['trading platform', 'stocks', 'F&O', 'mutual funds', 'IPO', 'demat account', 'Lakshmishree', 'SEBI registered'],
  icons: {
    icon: '/favicon.jpg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Shree Varahi | 31 Years of Trust. One Powerful Platform.',
    description: 'Trade with confidence. SEBI registered since 1993. 60,000+ active investors trust us.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${dmMono.variable} ${cormorant.variable} bg-background overflow-x-hidden`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <ScrollProgress />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

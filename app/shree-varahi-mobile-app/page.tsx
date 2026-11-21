"use client"

// Products → Shree Varahi Mobile App. Content and images from lakshmishree.com/shree-varahi-mobile-app (supplied by the client). UI only.

import { motion } from "framer-motion"
import { Bell, ClipboardList, LineChart, PieChart, ShieldCheck, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  EYEBROW, FaqSection, HeroSection, InvestmentAccountBanner, OpenAccountButton, ReviewsSection, SiteImage,
  VARAHI_WEB_FAQS, fadeUp, type SiteImageSrc,
} from "@/components/varahi-product"

const IMAGES: Record<"appInterface" | "placeOrder", SiteImageSrc> = {
  appInterface: { src: "/products/mobile-app.png",         alt: "Shree Varahi Mobile App interface" },
  placeOrder:   { src: "/products/mobile-place-order.png", alt: "Placing an order on the Shree Varahi Mobile App" },
}

const FEATURES = [
  {
    no: "01", icon: ShieldCheck, title: "On the Mark Security",
    desc: "We admire the faith you have in us and so we have designed Shree Varahi App based on SPT (Secure, Protected, and Trusted). You can store your data with full security in Shree Varahi App. We have added authentication procedure for extra layer of your security on a trusted platform which is SEBI registered.",
  },
  {
    no: "02", icon: ClipboardList, title: "Trade Conveniently",
    desc: "Get a \"Comprehensive Scrip Overview\" with real time market charts, bids, and 52-week highs and lows across all exchanges. In addition, you can sight quick search and comfortable navigation that helps you to trade within several clicks. Customization is also highly considered by allowing you to set personalized watchlist and track the scrips you are captivated to.",
  },
  {
    no: "03", icon: Zap, title: "Trade on Time",
    desc: "You can quickly buy or sell from either Orderbook, Portfolio, Watchlist, or Scrip Overview. See the notifications on your phone for any holding updates or price alerts.",
  },
  {
    no: "04", icon: LineChart, title: "Smart Market Inspection",
    desc: "Pick and identify the charts on your selection and decide for your actions.",
  },
]

const MORE_FEATURES = [
  {
    icon: Bell, title: "IPO Alerts",
    desc: "Catch up the notifications for top, upcoming, or ongoing IPOs through Shree Varahi App and plan your action accordingly.",
  },
  {
    icon: PieChart, title: "Invest in Mutual Funds",
    desc: "Also prioritizing the Mutual Funds which is considered as an ultimate investment these days, you can fetch all mutual fund data from every sector under this app of Shree Varahi. This will additionally help you to invest better.",
  },
]

export default function ShreeVarahiMobileAppPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <HeroSection>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={`${EYEBROW} mb-5`}>Shree Varahi Mobile App</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-6">
              Shree Varahi <span className="text-burgundy">Mobile App</span>
            </h1>
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
              {FEATURES.map((f) => (
                <a
                  key={f.no}
                  href={`#feature-${f.no}`}
                  className="flex items-center gap-2.5 bg-white border border-border/70 rounded-[10px] px-3.5 py-3 hover:border-burgundy/40 transition-colors"
                >
                  <span className="text-xs font-black text-burgundy/40">{f.no}</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">{f.title}</span>
                </a>
              ))}
            </div>
            <OpenAccountButton label="Open an Account" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <SiteImage image={IMAGES.appInterface} className="max-w-[500px] mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]" />
          </motion.div>
        </div>
      </HeroSection>

      {/* ── 01–04 FEATURES ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.no} id={`feature-${f.no}`} {...fadeUp} transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
              className="scroll-mt-28 bg-white border border-border/70 rounded-[12px] p-6 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-[10px] bg-burgundy/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-burgundy" />
                </div>
                <span className="text-3xl font-black text-burgundy/20">{f.no}</span>
              </div>
              <h3 className="text-base font-black text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MORE FEATURES ── */}
      <section className="bg-cream py-16 lg:py-24 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className={`${EYEBROW} mb-4`}>More Features</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              More From The <span className="text-burgundy">Shree Varahi App</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp}>
              <SiteImage image={IMAGES.placeOrder} className="max-w-[460px] mx-auto" />
            </motion.div>
            <div className="space-y-4">
              {MORE_FEATURES.map((f, i) => (
                <motion.div
                  key={f.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white border border-border/70 rounded-[12px] p-6 flex gap-4"
                >
                  <div className="w-11 h-11 rounded-[10px] bg-burgundy/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground mb-1.5">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pt-16 lg:pt-24" />
      <InvestmentAccountBanner />
      <FaqSection faqs={VARAHI_WEB_FAQS} label="FAQs · Varahi Web" />
      <ReviewsSection />

      <Footer />
    </main>
  )
}

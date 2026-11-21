"use client"

// Products → Shree Varahi Web. Content from lakshmishree.com/shree-varahi-web (supplied by the client). UI only.

import { motion } from "framer-motion"
import {
  ArrowLeftRight, Bell, Building2, Chrome, Layers, LineChart, MousePointerClick, Radar, Scissors, SearchCheck, ShieldCheck,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  EYEBROW, FaqSection, HeroSection, InvestmentAccountBanner, OpenAccountButton, ReviewsSection, SiteImage,
  VARAHI_WEB_FAQS, fadeUp, type SiteImageSrc,
} from "@/components/varahi-product"

const IMAGES: Record<"dashboard" | "exchange", SiteImageSrc> = {
  dashboard: { src: "https://lakshmishree.com/images/varahi-web.png", alt: "Shree Varahi Web dashboard" },
  exchange:  { src: "https://lakshmishree.com/images/exchange.png",   alt: "Exchange messages on Shree Varahi Web" },
}

const TOOLS = [
  { no: "01", icon: Layers,            title: "All-In-One",    desc: "Access your portfolio holdings, positions, and information across every product." },
  { no: "02", icon: Chrome,            title: "Compatible",    desc: "Whether Chrome or Firefox, the choice of picking browser for your stock trading is yours." },
  { no: "03", icon: MousePointerClick, title: "User-Friendly", desc: "Comfortable navigation for the users to experience intuitive trading." },
  { no: "04", icon: SearchCheck,       title: "Easy Analyze",  desc: "One can simply analyze scrips with regard to all the market, charts related information." },
]

const MORE_FEATURES = [
  { icon: ShieldCheck,    title: "Leverage Cover Order", desc: "To consider targeted positions." },
  { icon: ArrowLeftRight, title: "Conversion",           desc: "Of intraday position to delivery and the other way round." },
  { icon: LineChart,      title: "Advanced Charts",      desc: "To analyze stocks." },
  { icon: Scissors,       title: "Order Slicing",        desc: "To book large orders in a single tap." },
]

export default function ShreeVarahiWebPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO: Shree Varahi Web ── */}
      <HeroSection>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={`${EYEBROW} mb-5`}>Shree Varahi Web</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-8">
              Tools that Ease up <span className="text-burgundy">your Trading Tasks</span>
            </h1>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {TOOLS.map((t) => (
                <div key={t.no} className="bg-white border border-border/70 rounded-[12px] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-[10px] bg-burgundy/10 flex items-center justify-center">
                      <t.icon className="w-5 h-5 text-burgundy" />
                    </div>
                    <span className="text-2xl font-black text-burgundy/20">{t.no}</span>
                  </div>
                  <h3 className="text-sm font-black text-foreground mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <OpenAccountButton label="Open an Account" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <SiteImage image={IMAGES.dashboard} />
          </motion.div>
        </div>
      </HeroSection>

      {/* ── MORE FEATURES ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className={`${EYEBROW} mb-4`}>More Features</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Adding Upgraded Technologies <span className="text-burgundy">For Your Better Experience</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MORE_FEATURES.map((f, i) => (
              <motion.div
                key={f.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-border/70 rounded-[12px] p-6 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
              >
                <div className="w-11 h-11 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-burgundy" />
                </div>
                <h3 className="text-base font-black text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFORMATION BY EXCHANGE ── */}
      <section className="bg-cream py-16 lg:py-24 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <div className="w-12 h-12 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6 text-burgundy" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-4">
              Information <span className="text-burgundy">by Exchange</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              You being trader or investor, Varahi Web based Trading lets you access all the information flown from Exchanges.
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <SiteImage image={IMAGES.exchange} />
          </motion.div>
        </div>
      </section>

      {/* ── NEWS / NOTIFICATIONS + LIVE SCANNERS ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <motion.div {...fadeUp} className="bg-white border border-border/70 rounded-[14px] p-8">
            <div className="w-12 h-12 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-5">
              <Bell className="w-6 h-6 text-burgundy" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">News / Notifications</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A bell notification pops out on your Web based Trading platform to keep you updated with the news and corporate action going around.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.08 }} className="bg-white border border-border/70 rounded-[14px] p-8">
            <div className="w-12 h-12 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-5">
              <Radar className="w-6 h-6 text-burgundy" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">Accurate Trading With Live Scanners</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Filter out the most enticing market moves through the live scanners and trade confidently with a clear vision through powerful
              proprietary algorithms. This will help you save your time and focus more on your actions.
            </p>
          </motion.div>
        </div>
      </section>

      <InvestmentAccountBanner />
      <FaqSection faqs={VARAHI_WEB_FAQS} label="FAQs · Varahi Web" />
      <ReviewsSection />

      <Footer />
    </main>
  )
}

"use client"

// Products → Shree Varahi Desktop App. Content from lakshmishree.com/shree-varahi-desktop-app (supplied by the client). UI only.

import { motion } from "framer-motion"
import {
  BarChart3, CalendarDays, Check, FileText, GitBranch, LayoutGrid, LineChart, Link2, Repeat, ShieldCheck, Wallet,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  EYEBROW, FaqSection, HeroSection, InvestmentAccountBanner, OpenAccountButton, ReviewsSection, SiteImage,
  VARAHI_WEB_FAQS, fadeUp, type SiteImageSrc,
} from "@/components/varahi-product"

const IMAGES: Record<"tradeScreen" | "stockMarket", SiteImageSrc> = {
  tradeScreen: { src: "https://lakshmishree.com/images/trade-screen.jpg", alt: "Shree Varahi Desktop App trading screen" },
  stockMarket: { src: "https://lakshmishree.com/images/stock-markt.jpg",  alt: "Stock market analysis" },
}

const FEATURES = [
  {
    no: "01", icon: BarChart3, title: "Comprehensive Stock Market Information",
    desc: "Get extensive analysis of Stock Market areas comprising of Commodity, Derivatives, Equity, and Forex. In addition, you being a part of Lakshmishree Investment & Securities Ltd get to analyse every detail that concludes to be a part of your Trading time. Trends in FII and DII Flow, Top Gainers & Losers, Sector Performance, Open Interest Analysis are a few from the advantages list. You can also look into our detailed stock quote page to exercise more precise decisions.",
  },
  {
    no: "02", icon: LineChart, title: "User Friendly Charting",
    desc: "To grab the highly technical analysis, your software seeks advanced charting tool. Here at Shree Varahi Desktop App you get to create, save, and re-use the templates as per your customization that are designed clutter-free. You can directly place orders from the Charts when you are on your Shree Varahi Desktop App.",
  },
  {
    no: "03", icon: Wallet, title: "Live Portfolio and Reports",
    desc: "Allowing the user to access the investment performance in real time with live portfolio will further help you to take quick trading decisions at a go. The desktop based app also permits you to download your reports on Ledger, Profit & Loss, or Transaction history with utmost ease with just a few clicks.",
  },
  {
    no: "04", icon: FileText, title: "Research Driven Section",
    desc: "Access the screen of dedicated research section that will guide you with the clear stock recommendations which has come all the way from our committed research analyst. You can also learn and download the whole research reports on a comprehensive basis.",
  },
  {
    no: "05", icon: CalendarDays, title: "See your Event Calendar & Option Calculator Handy",
    desc: "With the Option Calculator & Event Calendar on your desktop app screen, you can analyze the upcoming activities, predict the market trend and accordingly build your strategy to unfold your perfect decisions.",
  },
  {
    no: "06", icon: LayoutGrid, title: "Design your Work Screen",
    desc: "When you log in to Shree Varahi Desktop App, it is your trading terminal with your customized views. Allowing you to drag and drop the widget sized boxes to watch with one screen or multiple screens, you can keep your requirements on your screen all at one go.",
  },
]

const MORE_FEATURES = [
  {
    icon: ShieldCheck, title: "Get Familiar with Cover Order",
    desc: "A Cover Order is a synonym to let you compulsory place your Stop Loss Order. Lakshmishree Investment & Securities Ltd permits you to punch cover orders for NSE (Equity, F&O and Currency) and MCX (Commodity).",
  },
  {
    icon: Link2, title: "You are Exchange Connected",
    desc: "Considering the concerns of the traders and investors while executing the trades and punching your orders, we have also added the respective links of the exchanges if you feel to visit them for any requirements.",
  },
  {
    icon: GitBranch, title: "Multi-legged Order Entry",
    desc: "If you are trading in Options, then Shree Varahi gives you an option to facilitate multi-legged order to trade and further helping you to strategise effortlessly.",
  },
  {
    icon: Repeat, title: "Access Equity SIP",
    desc: "Equity SIP is freshly introduced to you through Varahi platform that will let you book your orders for a prespecified quantity and amount in scrips that are hand-picked by you within the regular intervals.",
  },
]

export default function ShreeVarahiDesktopAppPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <HeroSection>
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={`${EYEBROW} mb-5`}>Shree Varahi Desktop App</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-6">
              Shree Varahi <span className="text-burgundy">Desktop App</span>
            </h1>
            <ul className="space-y-2.5 mb-8">
              {FEATURES.map((f) => (
                <li key={f.no} className="flex items-start gap-2.5 text-sm font-semibold text-foreground">
                  <Check className="w-4 h-4 text-gold-deep mt-0.5 shrink-0" strokeWidth={3} /> {f.title}
                </li>
              ))}
            </ul>
            <OpenAccountButton label="Open an Account" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <SiteImage image={IMAGES.tradeScreen} className="rounded-[14px] shadow-[0_30px_70px_rgba(0,0,0,0.15)]" />
          </motion.div>
        </div>
      </HeroSection>

      {/* ── 01–06 FEATURES ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.no} {...fadeUp} transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="bg-white border border-border/70 rounded-[12px] p-6 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className={`${EYEBROW} mb-4`}>More Features</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              More Ways to <span className="text-burgundy">Trade Smarter</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp}>
              <SiteImage image={IMAGES.stockMarket} className="rounded-[14px]" />
            </motion.div>
            <div className="space-y-4">
              {MORE_FEATURES.map((f, i) => (
                <motion.div
                  key={f.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white border border-border/70 rounded-[12px] p-5 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-[10px] bg-burgundy/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-foreground mb-1">{f.title}</h3>
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

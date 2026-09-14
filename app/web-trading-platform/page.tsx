"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check, Plus, X, ArrowRight, LineChart, ListTree, PinOff, Zap,
  ShieldAlert, Keyboard, LayoutGrid, Percent, MousePointerClick,
  Clock3, GitBranch, ShoppingBasket,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// ─── Data ───────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Top Gainers",       href: "/stock-market-live/top-gainers-today" },
  { label: "Top Losers",        href: "/stock-market-live/top-losers-today" },
  { label: "52 Week High",      href: "/stock-market-live/52-week-high-stocks" },
  { label: "52 Week Low",       href: "/stock-market-live/52-week-low-stocks" },
  { label: "Nifty 50 Stocks",   href: "/nifty-stocks-list/nifty-50" },
  { label: "Bank Nifty Stocks", href: "/nifty-stocks-list/nifty-bank" },
]

const SEGMENTS = [
  { label: "Stocks",       badge: null },
  { label: "Options",      badge: null },
  { label: "Futures",      badge: null },
  { label: "Commodity",    badge: null },
  { label: "ETFs",         badge: null },
  { label: "IPOs",         badge: "New" },
  { label: "Mutual Funds", badge: "New" },
  { label: "Bonds",        badge: null },
]

const FEATURES = [
  {
    icon: LineChart, tag: "Realtime", title: "TradingView Charts",
    desc: "Trade in Options, Futures, Stocks & Commodity directly from charts on our TradingView-powered terminal! Access 100+ indicators, drawing tools, and customize charts as you wish. Analyze scrips using Renko, Kagi, and more.",
  },
  {
    icon: ListTree, tag: "Realtime", title: "Advanced Option Chain",
    desc: "Designed so you can trade from where you analyze. Check all important Greeks while evaluating OI, Volume, and more. Place orders for calls & puts right from the Option Chain to move swiftly in the market.",
  },
  {
    icon: PinOff, tag: "Realtime", title: "Sticky Order Window",
    desc: "Trade directly from charts across all segments, powered by TradingView's charting engine combined with Shree Varahi Web's own order execution flow — keep your order window pinned wherever you are on screen.",
  },
  {
    icon: Zap, tag: "Realtime", title: "Flash Trade",
    desc: "Made for swift execution during intense markets! Flash Trade lets you identify option contracts based on your outlook. Analyze ATM contracts, top trades, and more during busy markets — execute in a flash.",
  },
  {
    icon: ShieldAlert, tag: null, title: "Trader's Control",
    desc: "A feature for every trader who wants to manage risk better. Use Trader's Controls to set alerts for loss and prevent overtrading. Switch segments on/off based on your preference.",
  },
  {
    icon: Keyboard, tag: "Realtime", title: "Fast Keyboard Shortcuts",
    desc: "Specially built for enhancing speed while navigating our desktop trading platform. Use shortcuts to open charts, place buy/sell orders, move between watchlists, or reach special order types instantly.",
  },
  {
    icon: LayoutGrid, tag: "Realtime", title: "Manage Positions",
    desc: "One of the best web platform features we have. Manage positions seamlessly — add more quantity, reverse or exit trades in a single tap. Add a stop loss and view everything on a single screen.",
  },
  {
    icon: Percent, tag: null, title: "Margin Trading Facility",
    desc: "Buy more with less! Get up to 4× leverage for swing trading and BTST on 1,700+ stocks. Check margin benefits for each scrip with the MTF Estimator — with an unlimited holding period on your MTF positions.",
  },
]

const PRICING = [
  { title: "Account Opening, AMC & Platform Fees", value: "₹0", desc: "Open a free account with zero AMC or platform fees." },
  { title: "Equity Delivery, ETFs, IPO & Mutual Funds", value: "₹0", desc: "Absolutely free! No hidden charges ever." },
  { title: "Equity & ETFs Intraday and MTF", value: "₹20", desc: "or 0.03% of trade value per executed order, whichever is lower." },
  { title: "All Segment Options & Futures", value: "₹20", desc: "per executed order for equity & commodity F&O." },
]

const TV_FEATURES = [
  { icon: MousePointerClick, label: "Drag & Drop Orders" },
  { icon: Clock3, label: "Seconds Chart Timeframe" },
  { icon: GitBranch, label: "Options & Futures Chain" },
  { icon: ShoppingBasket, label: "Basket Order from Charts" },
]

const FAQS = [
  { q: "Is Shree Varahi Web trading platform safe?", a: "Yes, Shree Varahi Web is a safe web trading platform regulated by SEBI. As a SEBI-registered broker, we use state-of-the-art technology to ensure your data stays safe and secure at all times." },
  { q: "Is Shree Varahi Web trading platform free?", a: "Yes, you can open a demat account on Shree Varahi Web online for free — and we don't charge AMC or platform fees either." },
  { q: "What are the brokerage charges on Shree Varahi Web?", a: "Shree Varahi Web enables you to trade in the securities market, especially derivatives like Futures and Options. There's a flat ₹20 brokerage for Equity Intraday & All Segment Futures, and ₹20 per order for All Segment Options. We remain transparent about our pricing, always." },
  { q: "How long does it take to open a demat and trading account?", a: "Opening a demat account on Shree Varahi takes less than 10 minutes. Click \"Start Now\", verify your mobile number and email, upload the required documents, and complete e-Sign — you'll receive your account details and can start investing right away." },
  { q: "How do I transfer my portfolio from my current broker to Shree Varahi?", a: "Register and log in on CDSL Easiest, click Transaction → Setup, select Bulk Setup → Transaction, enter the execution date and Beneficiary Owner ID (BOID), choose the stock(s) under Account ISINs, submit, verify, and confirm with your CDSL Easiest PIN." },
  { q: "Does Shree Varahi Web support algo trading?", a: "Yes, Shree Varahi Web is built for algo traders too. Using our Trading APIs, you can automate buy/sell orders with liberal rate limits, a dedicated SDK, and clear documentation — no coding experience required." },
]

function CheckPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground bg-white border border-border/70 rounded-full px-3 py-1.5">
      <Check className="w-3 h-3 text-gold-deep shrink-0" strokeWidth={3} />
      {label}
    </span>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WebTradingPlatformPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black 40%, transparent 90%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-5">
                Trade From <span className="text-burgundy">The Big Screen</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                Get the complete trading experience on our web trading platform, built with awesome features that every trader wants!
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/signup/register">
                  <Button size="lg" className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-13 text-sm font-bold rounded-[5px]">
                    Start Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map(q => (
                  <Link key={q.label} href={q.href}>
                    <CheckPill label={q.label} />
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <Image
                src="/web-image.png"
                alt="Shree Varahi Web trading platform"
                width={1310}
                height={1201}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ONE PLATFORM, ALL SEGMENTS ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
            One Web Trading Platform for <span className="text-burgundy">All Segments</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Our trading platform is built to help you unlock the full potential of web trading on the big screen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SEGMENTS.map(s => (
              <div key={s.label} className="relative bg-white border border-border/70 rounded-[10px] py-6 px-3">
                {s.badge && (
                  <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black px-2 py-0.5 rounded-full ${s.badge === "New" ? "bg-emerald-500 text-white" : "bg-gold text-white"}`}>
                    {s.badge}
                  </span>
                )}
                <span className="text-sm font-bold text-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES IN ACTION ── */}
      <section className="bg-cream py-16 lg:py-24 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider mb-4">
              In Action
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Our Web Trading Platform in Action!
            </h2>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Feature list */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: "none" }}>
              {FEATURES.map((f, i) => (
                <button
                  key={f.title}
                  onClick={() => setActiveFeature(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[8px] text-left transition-all shrink-0 lg:shrink w-auto lg:w-full whitespace-nowrap lg:whitespace-normal ${
                    activeFeature === i ? "bg-burgundy text-white shadow-md" : "bg-white text-foreground border border-border/70 hover:border-burgundy/40"
                  }`}
                >
                  <f.icon className={`w-4 h-4 shrink-0 ${activeFeature === i ? "text-white" : "text-burgundy"}`} />
                  <span className="text-xs font-bold">{f.title}</span>
                </button>
              ))}
            </div>

            {/* Feature detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="bg-white border border-border/70 rounded-[14px] p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-[10px] bg-burgundy/10 flex items-center justify-center">
                    {(() => { const Icon = FEATURES[activeFeature].icon; return <Icon className="w-6 h-6 text-burgundy" /> })()}
                  </div>
                  {FEATURES[activeFeature].tag && (
                    <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-[4px] uppercase tracking-wider">
                      {FEATURES[activeFeature].tag}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{FEATURES[activeFeature].title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">{FEATURES[activeFeature].desc}</p>
                <Link href="/signup/register">
                  <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 px-6 text-sm font-bold">
                    Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
              Experience More at <span className="text-burgundy">Industry Standard Prices</span>
            </h2>
            <p className="text-sm text-muted-foreground">No hidden charges, ever!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING.map(p => (
              <div key={p.title} className="bg-white border border-border/70 rounded-[10px] p-6">
                <p className="text-3xl font-black text-burgundy mb-3">{p.value}</p>
                <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm font-bold text-burgundy hover:text-burgundy-deep inline-flex items-center gap-1.5">
              View Pricing In Detail <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRADINGVIEW ── */}
      <section className="bg-cream py-16 lg:py-24 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-4">
                Shree Varahi + <span className="text-burgundy">TradingView Charts</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Trade directly from charts in all segments, powered by the world's preferred charting platform TradingView, combined with our own Shree Varahi Web trading platform.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {TV_FEATURES.map(f => (
                  <div key={f.label} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[8px] bg-burgundy/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-burgundy" />
                    </div>
                    <span className="text-xs font-bold text-foreground">{f.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup/register">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-11 px-7 text-sm font-bold">
                  Explore More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-[14px] border border-border/70 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border/60 bg-secondary/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-foreground">NIFTY 50</span>
                  <span className="text-[11px] font-bold text-red-500">24,013.10 −0.64%</span>
                </div>
                <div className="flex gap-1">
                  {["1D", "5D", "1M", "1Y"].map((tf, i) => (
                    <span key={tf} className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] ${i === 0 ? "bg-burgundy text-white" : "text-muted-foreground"}`}>{tf}</span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <svg viewBox="0 0 400 180" className="w-full h-[180px]">
                  <defs>
                    <linearGradient id="tvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>
                  {[30, 65, 100, 135].map(y => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  <path
                    d="M0,90 L20,84 L40,96 L60,80 L80,88 L100,70 L120,78 L140,60 L160,72 L180,55 L200,66 L220,50 L240,62 L260,45 L280,58 L300,40 L320,52 L340,35 L360,48 L380,38 L400,44 L400,180 L0,180 Z"
                    fill="url(#tvg)"
                  />
                  <polyline
                    points="0,90 20,84 40,96 60,80 80,88 100,70 120,78 140,60 160,72 180,55 200,66 220,50 240,62 260,45 280,58 300,40 320,52 340,35 360,48 380,38 400,44"
                    fill="none" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                  />
                  {[60, 140, 220, 300, 380].map((x, i) => {
                    const up = i % 2 === 0
                    return (
                      <rect key={x} x={x - 5} y={up ? 150 : 158} width="10" height={up ? 20 : 12} fill={up ? "#059669" : "#DC2626"} opacity="0.7" rx="1" />
                    )
                  })}
                </svg>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="text-[10px] text-muted-foreground font-semibold">Volume</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">100+ indicators · Drawing tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions on your mind? Don't worry, we have the answers!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div
                  key={index}
                  className="bg-cream border border-border/80 rounded-[12px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-secondary/40 transition-colors"
                  >
                    <span className="font-extrabold text-foreground text-sm tracking-wide">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                      {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed border-t border-border/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[14px] p-8 sm:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 relative z-10">
            Invest &amp; Trade with a Platform That's #MadeForTrade
          </h2>
          <p className="text-sm text-white/80 mb-7 relative z-10 max-w-lg mx-auto">
            Open your Shree Varahi account in minutes and start trading from the big screen.
          </p>
          <Link href="/signup/register">
            <Button className="relative z-10 bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-12 px-9 text-sm font-black">
              Open Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

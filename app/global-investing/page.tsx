"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, CheckCircle2, ArrowRight, Plus, X,
  ShieldCheck, Globe2, TrendingDown, Cpu, Layers, Landmark, BadgeCheck, Lock,
  UserCheck, FileCheck2, Send, LineChart, Users, Search, MonitorSmartphone,
  AlertTriangle, MapPin, Coins, Sparkles,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// ─── Content ────────────────────────────────────────────────────────────────

const HERO_POINTS = [
  "Diversification beyond India",
  "Access to global leaders",
  "Simple funding process",
  "Research-backed investing",
]

const INVESTMENT_GOALS = [
  "Portfolio Diversification",
  "Long-term Wealth Creation",
  "Exposure to Global Tech",
  "Currency Hedging (INR vs USD)",
]

type Company = { name: string; desc: string }

const ROW_1: Company[] = [
  { name: "Amazon",    desc: "E-commerce & Cloud" },
  { name: "Tesla",     desc: "Electric Vehicles" },
  { name: "Apple",     desc: "Consumer Tech" },
  { name: "Microsoft", desc: "Software" },
  { name: "Nvidia",    desc: "Semiconductors" },
  { name: "Alphabet",  desc: "Search & AI" },
  { name: "Meta",      desc: "Social Media" },
  { name: "Netflix",   desc: "Entertainment" },
]

const ROW_2: Company[] = [
  { name: "Spotify", desc: "Audio Streaming" },
  { name: "AMD",     desc: "Processors" },
  { name: "Intel",   desc: "Manufacturing" },
  { name: "Shopify", desc: "E-commerce" },
  { name: "Uber",    desc: "Ride-hailing" },
  { name: "Airbnb",  desc: "Travel" },
  { name: "Zoom",    desc: "Communications" },
  { name: "PayPal",  desc: "Digital Payments" },
]

const PILLARS = [
  {
    icon: Users,
    title: "Advisory-Led Approach",
    points: ["Personalized portfolio planning", "Risk-managed allocation strategy", "Ongoing review & guidance", "Relationship manager support"],
  },
  {
    icon: Search,
    title: "Research & Strategy Depth",
    points: ["Global stock & ETF research", "Tech + Fundamental screening", "Strategy notes & alerts"],
  },
  {
    icon: MonitorSmartphone,
    title: "Platform Experience",
    points: ["Real-time global tracking", "Advanced portfolio analytics", "Secure, fractional execution", "Web & Mobile access"],
  },
]

const INDIA_ONLY = [
  { icon: MapPin,       title: "Single-Country Risk",      desc: "Exposed entirely to domestic economic cycles and local market volatility." },
  { icon: TrendingDown, title: "INR Depreciation Risk",    desc: "Purchasing power vulnerable to historical currency depreciation against the dollar." },
  { icon: Cpu,          title: "Limited Innovation Focus", desc: "Misses out on the world's leading tech and consumer megatrends." },
  { icon: Layers,       title: "Domestic Sectors Only",    desc: "Restricted to local equities, missing global monopolies and niche sectors." },
]

const GLOBAL_PORTFOLIO = [
  { icon: Globe2,      title: "Diversification Benefits",  desc: "Reduce single-country risk by spreading your investments across global economies and cycles." },
  { icon: ShieldCheck, title: "Hedge Against Depreciation", desc: "Protect your purchasing power by holding dollar-denominated assets against INR depreciation." },
  { icon: Sparkles,    title: "Global Innovation",         desc: "Gain direct exposure to the world's leading tech, AI, healthcare, and consumer megatrends." },
  { icon: Coins,       title: "New Sectors",               desc: "Access niche sectors and global monopolies that are not available in the Indian equity markets." },
]

const OPTIONS = [
  {
    id: "stocks",
    numeral: "I",
    title: "Global Stocks",
    desc: "Invest in leading international companies including large-cap stocks, technology leaders, and dividend-paying businesses.",
    items: [
      { name: "Apple",       tag: "United States" },
      { name: "Amazon",      tag: "United States" },
      { name: "Toyota",      tag: "Japan" },
      { name: "Unilever",    tag: "United Kingdom" },
      { name: "Sony",        tag: "Japan" },
      { name: "AstraZeneca", tag: "United Kingdom" },
    ],
  },
  {
    id: "etfs",
    numeral: "II",
    title: "ETFs",
    desc: "Invest in global index ETFs, sector ETFs, and thematic funds to build a diversified and balanced portfolio.",
    items: [
      { name: "Vanguard S&P 500",      tag: "Top 500 US Cos." },
      { name: "Invesco QQQ",           tag: "Top 100 Tech Cos." },
      { name: "iShares MSCI Emerging", tag: "Global Emerging Markets" },
    ],
  },
  {
    id: "themes",
    numeral: "III",
    title: "Curated Themes",
    desc: "Invest in focused global themes such as AI, healthcare, clean energy, and innovation-driven sectors.",
    items: [
      { name: "Global Clean Energy",     tag: "Sustainability Sector" },
      { name: "Artificial Intelligence", tag: "High Growth" },
      { name: "Genomics & Healthcare",   tag: "Future Innovation" },
      { name: "Cloud Computing",         tag: "Tech Infrastructure" },
      { name: "Cybersecurity",           tag: "Global Defense" },
    ],
  },
]

const STEPS = [
  { icon: UserCheck,  title: "Open Account",    desc: "Register online and open your global investment account in just a few minutes." },
  { icon: FileCheck2, title: "Complete KYC",    desc: "Finish the digital KYC process securely to activate your global investment account." },
  { icon: Send,       title: "Fund via LRS",    desc: "Transfer funds abroad securely under RBI guidelines using the Liberalised Remittance Scheme (LRS)." },
  { icon: LineChart,  title: "Start Investing", desc: "Buy global stocks and ETFs and track your investments from one platform." },
]

const COMPLIANCE = [
  { icon: Landmark,   title: "RBI Guidelines",   desc: "Remittances strictly follow the LRS limit of $250,000 per financial year." },
  { icon: BadgeCheck, title: "SEBI Registered",  desc: "Advisory and execution handled by fully registered regulated entities." },
  { icon: Lock,       title: "Secure Custodian", desc: "Your assets are held securely with top-tier US regulated clearing partners." },
]

const FAQS = [
  { q: "What is the minimum investment?", a: "With fractional investing, you can start with as little as $1. However, to see meaningful returns, we recommend a starting portfolio of at least $500." },
  { q: "How do I send money abroad?", a: "You can seamlessly fund your account via net banking using the Liberalised Remittance Scheme (LRS). We partner with major Indian banks to ensure a smooth transfer process." },
  { q: "Is investing in US stocks legal for Indians?", a: "Yes, absolutely. Under the RBI's Liberalised Remittance Scheme (LRS), resident Indians can legally remit up to $250,000 per financial year for overseas investments." },
  { q: "What is LRS?", a: "The Liberalised Remittance Scheme (LRS) is an RBI facility that allows resident individuals to remit up to $250,000 per financial year for permissible current or capital account transactions." },
  { q: "What taxes apply?", a: "Capital gains are taxed in India based on the holding period (24 months for Long Term). Dividends are taxed in the US at a flat 25% for Indians, though you can claim a foreign tax credit in India under the DTAA." },
  { q: "Can I buy fractional shares?", a: "Yes, you don't need to buy a whole share. For example, you can invest $100 in Amazon, regardless of its actual share price." },
  { q: "What happens to dividends?", a: "Dividends paid by US companies are automatically credited to your US brokerage account. You can choose to reinvest them or withdraw them based on your preference." },
  { q: "How is currency risk managed?", a: "While investing in USD exposes you to currency fluctuations, historically the INR has depreciated against the USD. Therefore, USD exposure generally acts as a natural hedge, adding to your overall INR returns." },
  { q: "How do I withdraw funds?", a: "You can withdraw funds from your US brokerage account straight back to your Indian bank account at any time. Processing usually takes 2-4 business days." },
  { q: "Is my investment safe?", a: "Yes. Your US brokerage account is usually protected by SIPC (Securities Investor Protection Corporation) up to $500,000, ensuring safety against broker failure." },
]

const PHONE_HREF = "tel:02240808080"

// ─── Shared bits ────────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">{title}</h2>
      {desc && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{desc}</p>}
    </div>
  )
}

function MarqueeRow({ companies, reverse }: { companies: Company[]; reverse?: boolean }) {
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 32, repeat: Infinity }}
        className="flex gap-4 shrink-0 pr-4"
      >
        {[...companies, ...companies].map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="w-[170px] sm:w-[210px] bg-white border border-border/50 rounded-[6px] px-5 py-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-gold-deep/30 transition-colors shrink-0"
          >
            <h4 className="font-extrabold text-foreground text-sm sm:text-base mb-1 tracking-tight">{c.name}</h4>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-tight">{c.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const inputClass =
  "w-full h-10 px-3 rounded-[5px] border border-border bg-cream/50 text-sm text-foreground placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"

// UI only for now: the form isn't connected to a backend yet.
function LeadForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full lg:w-[380px] rounded-[12px] bg-white border border-border shadow-xl p-6"
    >
      {submitted ? (
        <div className="py-10 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-profit mx-auto" />
          <h3 className="text-lg font-black text-foreground">Thank you!</h3>
          <p className="text-sm text-muted-foreground">Our advisor will get in touch with you shortly.</p>
          <button onClick={() => setSubmitted(false)} className="text-xs font-bold text-burgundy hover:underline">
            Submit another request
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-black text-foreground">Start Your Global Journey</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-5">Share your details and our advisor will guide you step-by-step.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="space-y-3"
          >
            <div>
              <label htmlFor="gi-name" className="block text-[11px] font-bold text-foreground mb-1">Full Name</label>
              <input id="gi-name" name="name" required autoComplete="name" placeholder="Enter your full name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="gi-email" className="block text-[11px] font-bold text-foreground mb-1">Email Address</label>
              <input id="gi-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="gi-phone" className="block text-[11px] font-bold text-foreground mb-1">Phone Number</label>
              <input id="gi-phone" name="phone" type="tel" required autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" placeholder="10-digit mobile number" className={inputClass} />
            </div>
            <div>
              <label htmlFor="gi-goal" className="block text-[11px] font-bold text-foreground mb-1">Primary Investment Goal</label>
              <select id="gi-goal" name="goal" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select an option</option>
                {INVESTMENT_GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <Button type="submit" className="w-full bg-burgundy hover:bg-burgundy-deep text-white h-11 font-bold rounded-[5px] mt-2">
              Talk to Advisor
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function GlobalInvestingPage() {
  const [optionId, setOptionId] = useState(OPTIONS[0].id)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0)
  const option = OPTIONS.find((o) => o.id === optionId) ?? OPTIONS[0]

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Global Investing</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-extrabold text-gold-deep uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> SEBI Registered · Since 1993
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Take Your Portfolio<br />
                <span className="text-burgundy">Beyond Borders</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Invest in top US stocks and global themes securely from India. Expert advisory meets a premium platform for long-term wealth creation.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 max-w-md">
                {HERO_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0D19] shrink-0" />
                    <span className="text-[13px] font-semibold text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button asChild className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  <Link href="/signup/register">Open Account</Link>
                </Button>
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── GLOBAL STOCKS MARQUEE + PILLARS ── */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Global Exposure"
            title={<>Invest in Global Stocks with <span className="text-burgundy">Shree Varahi</span></>}
            desc="Access top global companies across technology, finance, consumer, and innovation sectors to build a diversified portfolio beyond India."
          />
        </div>

        <div className="relative w-full space-y-4 py-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,white_12%,white_88%,transparent_100%)]">
          <MarqueeRow companies={ROW_1} />
          <MarqueeRow companies={ROW_2} reverse />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-[10px] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-4" style={{ background: "#8B0D1914", border: "1px solid #8B0D1922" }}>
                    <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-lg mb-3">{p.title}</h3>
                  <ul className="space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B0D19] shrink-0" />
                        <span className="text-[13px] text-muted-foreground">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY GLOBAL INVESTING ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Opportunity"
            title="Why Global Investing Is Important?"
            desc="A globally diversified portfolio helps reduce single-country risk, protects against currency depreciation, and provides access to broader growth opportunities."
          />

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
            {/* India-only */}
            <div className="bg-white border border-border rounded-[12px] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-loss" />
                <h3 className="font-black text-foreground text-lg sm:text-xl">India-Only Portfolio</h3>
              </div>
              <div className="space-y-4">
                {INDIA_ONLY.map((r) => {
                  const Icon = r.icon
                  return (
                    <div key={r.title} className="flex gap-3">
                      <div className="w-9 h-9 rounded-[7px] bg-secondary/70 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-foreground">{r.title}</h4>
                        <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{r.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* VS */}
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-sm font-black text-gold-deep">
                VS
              </div>
            </div>

            {/* Global */}
            <div className="bg-white rounded-[12px] p-6 sm:p-7 relative overflow-hidden border border-burgundy/25 shadow-[0_10px_40px_rgba(139,13,25,0.08)]">
              <div className="absolute inset-0 pointer-events-none bg-burgundy/[0.04]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <Globe2 className="w-5 h-5 text-burgundy" />
                  <h3 className="font-black text-lg sm:text-xl text-burgundy">Global Diversified Portfolio</h3>
                </div>
                <div className="space-y-4">
                  {GLOBAL_PORTFOLIO.map((r) => {
                    const Icon = r.icon
                    return (
                      <div key={r.title} className="flex gap-3">
                        <div className="w-9 h-9 rounded-[7px] bg-burgundy text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-foreground">{r.title}</h4>
                          <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{r.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT OPTIONS ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What You Can Invest In"
            title="Global Investment Options Available to You"
            desc="Build a diversified global portfolio with access to international stocks, ETFs, and thematic investment opportunities."
          />

          <div className="grid lg:grid-cols-[360px_1fr] gap-6">
            <div className="space-y-3" role="tablist" aria-label="Global investment options">
              {OPTIONS.map((o) => {
                const active = o.id === optionId
                return (
                  <motion.button
                    key={o.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setOptionId(o.id)}
                    whileHover={{ y: active ? 0 : -2 }}
                    className={`group w-full text-left rounded-[12px] p-5 flex items-center justify-between gap-4 transition-all duration-200 ${
                      active
                        ? "bg-burgundy/[0.04] border border-burgundy/25 shadow-sm"
                        : "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    }`}
                  >
                    <span className="flex items-start gap-4">
                      <span className={`w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 text-sm font-black transition-colors ${
                        active ? "bg-burgundy text-white" : "bg-slate-50 text-slate-400 group-hover:bg-burgundy/8 group-hover:text-burgundy"
                      }`}>
                        {o.numeral}
                      </span>
                      <span className="space-y-1">
                        <span className={`block text-base sm:text-lg font-bold transition-colors ${active ? "text-burgundy" : "text-slate-800 group-hover:text-burgundy"}`}>{o.title}</span>
                        <span className="block text-[13px] text-slate-500 leading-relaxed">{o.desc}</span>
                      </span>
                    </span>
                    <ChevronRight className={`h-5 w-5 shrink-0 transition-all duration-200 ${
                      active ? "text-burgundy translate-x-0.5" : "text-slate-300 group-hover:text-burgundy group-hover:translate-x-0.5"
                    }`} />
                  </motion.button>
                )
              })}
            </div>

            <div role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3"
                >
                  {option.items.map((item) => (
                    <div key={item.name} className="bg-white border border-border rounded-[8px] p-4 hover:border-gold/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all">
                      <div className="w-9 h-9 rounded-[6px] bg-burgundy/[0.06] border border-burgundy/10 flex items-center justify-center text-[11px] font-black text-[#8B0D19] mb-3">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <h4 className="font-extrabold text-sm text-foreground">{item.name}</h4>
                      <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">{item.tag}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO START ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Started"
            title={<>How to Start Global Investing with <span className="text-burgundy">Shree Varahi?</span></>}
            desc="Follow a simple step-by-step process to open your account, fund it, and start investing in global markets."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative bg-white border border-border rounded-[10px] p-6"
                >
                  <span className="absolute top-4 right-5 text-4xl font-black text-gold/30 leading-none">{i + 1}</span>
                  <div className="w-11 h-11 rounded-[8px] flex items-center justify-center mb-4" style={{ background: "#8B0D1914", border: "1px solid #8B0D1922" }}>
                    <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">{s.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECURE & REGULATED ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Safety First"
            title="Secure and Regulated Global Investing"
            desc="Global investing made secure with full compliance to Indian regulations and trusted international partners."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {COMPLIANCE.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.title} className="bg-white border border-border rounded-[10px] p-6 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 bg-gold/15 border border-gold/30">
                    <Icon className="w-5 h-5 text-gold-deep" strokeWidth={1.9} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">{c.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 rounded-[8px] border border-gold/30 bg-gold/[0.07] px-5 py-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Risk Disclosure: </span>
              Global investing involves currency risk, geopolitical risks, and market volatility. Please read all scheme-related documents and terms of service carefully before investing. Historical performance is not indicative of future results.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about investing globally? Here are answers to the most common queries from investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div key={faq.q} className="bg-white border border-border/80 rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.015)]">
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-foreground text-sm tracking-wide">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                      {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed border-t border-slate-50">
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

      {/* ── CLOSING CTA ── */}
      <section className="py-12 lg:py-16 bg-background px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl rounded-[20px] overflow-hidden bg-burgundy text-white shadow-[0_20px_60px_rgba(139,13,25,0.25)]"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.18) 0%, transparent 65%)" }} />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 text-center p-8 sm:p-12 lg:p-14 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-balance">
              Build Your Global Portfolio with Shree Varahi
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl">
                <Link href="/signup/register">Open Account <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-bold h-12 px-7 text-sm rounded-[5px]">
                <a href={PHONE_HREF}>Speak to Advisor</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

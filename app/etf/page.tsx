"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Plus, X, Layers, Repeat, Eye, LayoutDashboard, FileSearch, Zap,
  Activity, PieChart, Coins, CircleDollarSign, Landmark, Globe, Boxes,
  LineChart, Percent, ListChecks, TrendingUp, Target, BarChart3,
  ArrowUpRight, Star,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Data ───────────────────────────────────────────────────────────────────

const TOOLS = [
  { icon: Layers,           color: "#8B0D19", title: "Invest In ETFs",        desc: "Invest in ETFs across different markets, industries, and asset types like gold and global stocks, helping you diversify your investments with ease." },
  { icon: Repeat,           color: "#8B0D19", title: "ETF SIP",               desc: "Start a daily, weekly, or monthly ETF SIP and grow your investments step by step with regular investing and long-term market opportunities." },
  { icon: Eye,              color: "#8B0D19", title: "ETF Watchlists",        desc: "Create personalized ETF watchlists to monitor your preferred funds, track price movements, and identify investment opportunities in real time." },
  { icon: LayoutDashboard,  color: "#8B0D19", title: "ETF Dashboard",         desc: "See all your ETF investments in one place and easily monitor your holdings, portfolio value, investment distribution, and growth over time." },
  { icon: FileSearch,       color: "#8B0D19", title: "ETF Research",          desc: "Check an ETF's performance history, invested companies, sector distribution, costs, and comparison with market benchmarks before investing." },
  { icon: Zap,              color: "#8B0D19", title: "MTF For Eligible ETFs", desc: "Use MTF to invest in eligible ETFs with extra funding support, helping you increase your buying power and maximize investment opportunities." },
  { icon: Activity,         color: "#8B0D19", title: "Market Tracking",       desc: "Track ETF price movements, market trends, and trading activity in real time to stay informed about your investments." },
  { icon: PieChart,         color: "#8B0D19", title: "Portfolio Monitoring",  desc: "See how your ETF investments are performing by tracking returns, portfolio growth, profits, losses, and investment distribution in one dashboard." },
]

type Category = "Index" | "Gold" | "Silver" | "Debt" | "Global" | "Sector"

const CATEGORIES: { id: Category; label: string; icon: React.ElementType; color: string; desc: string }[] = [
  { id: "Index",  label: "Index ETFs",  icon: BarChart3,        color: "#8B0D19", desc: "Track benchmark indices and gain exposure to a diversified range of market investments." },
  { id: "Gold",   label: "Gold ETFs",   icon: Coins,            color: "#8B0D19", desc: "Invest in gold digitally through easy-to-access Gold ETFs." },
  { id: "Silver", label: "Silver ETFs", icon: CircleDollarSign, color: "#8B0D19", desc: "Invest in silver and benefit from its price movements with ease." },
  { id: "Debt",   label: "Debt ETFs",   icon: Landmark,         color: "#8B0D19", desc: "Invest in bonds and debt securities to earn stable returns and diversify your portfolio." },
  { id: "Global", label: "Global ETFs", icon: Globe,            color: "#8B0D19", desc: "Get exposure to companies and economies around the world through a single investment." },
  { id: "Sector", label: "Sector ETFs", icon: Boxes,            color: "#8B0D19", desc: "Invest in specific industries and market sectors based on your investment goals." },
]

const ETFS: Record<Category, { name: string; price: string; change: number }[]> = {
  Index: [
    { name: "Nifty 50 ETF",      price: "243.50",  change: 0.62 },
    { name: "Nifty Bank ETF",    price: "512.80",  change: 0.34 },
    { name: "Nifty Next 50 ETF", price: "68.90",   change: 0.48 },
    { name: "Sensex ETF",        price: "812.40",  change: 0.55 },
  ],
  Gold: [
    { name: "Nippon Gold BeES",     price: "68.20", change: 0.21 },
    { name: "SBI Gold ETF",         price: "71.10", change: 0.18 },
    { name: "HDFC Gold ETF",        price: "70.45", change: 0.24 },
    { name: "ICICI Pru Gold ETF",   price: "69.85", change: 0.20 },
  ],
  Silver: [
    { name: "ICICI Pru Silver ETF",      price: "98.40", change: 0.45 },
    { name: "Aditya Birla SL Silver ETF",price: "97.10", change: 0.42 },
    { name: "Nippon Silver ETF",         price: "99.20", change: 0.50 },
    { name: "Kotak Silver ETF",          price: "96.80", change: 0.38 },
  ],
  Debt: [
    { name: "Bharat Bond ETF Apr 2030", price: "1,142.50", change: 0.05 },
    { name: "Bharat Bond ETF Apr 2033", price: "1,098.20", change: 0.06 },
    { name: "Edelweiss Bharat Bond FOF",price: "24.80",    change: 0.04 },
    { name: "Nippon Liquid BeES",       price: "1,002.10", change: 0.02 },
  ],
  Global: [
    { name: "Motilal Oswal Nasdaq 100 ETF", price: "142.60", change: 0.88 },
    { name: "ICICI Pru Nasdaq 100 ETF",     price: "98.40",  change: 0.85 },
    { name: "Mirae Asset NYSE FANG+ ETF",   price: "84.20",  change: 1.05 },
    { name: "Motilal Oswal S&P 500 ETF",    price: "38.60",  change: 0.62 },
  ],
  Sector: [
    { name: "Nifty IT ETF",       price: "38.40", change: 0.72 },
    { name: "Nifty PSU Bank ETF", price: "86.20", change: 0.58 },
    { name: "Nifty Pharma ETF",   price: "24.98", change: 0.41 },
    { name: "Nifty Auto ETF",     price: "26.97", change: 0.36 },
  ],
}

const RESEARCH_PARAMS = [
  { icon: LineChart,   title: "ETF Price",            desc: "Track real-time ETF prices and market movements to stay updated on current valuations and trading activity." },
  { icon: Landmark,    title: "AUM",                   desc: "Analyze Assets Under Management (AUM) to understand the size, scale, and investor participation within an ETF." },
  { icon: Percent,     title: "Expense Ratio",         desc: "Compare expense ratios across ETFs to evaluate fund costs and their potential impact on long-term investment returns." },
  { icon: ListChecks,  title: "Holdings",              desc: "Review the underlying securities held within an ETF to understand portfolio composition and investment exposure." },
  { icon: TrendingUp,  title: "Returns",               desc: "Evaluate historical returns across different time periods to assess past performance and investment consistency." },
  { icon: Target,      title: "Tracking Index",        desc: "Identify the benchmark index tracked by the ETF and understand how the fund seeks to replicate index performance." },
  { icon: PieChart,    title: "Sector Allocation",     desc: "Examine sector-wise distribution to understand which industries contribute most to the ETF's overall portfolio." },
  { icon: Layers,      title: "Asset Allocation",      desc: "Review the allocation of assets across equities, commodities, debt instruments, or other investment categories depending on the ETF type." },
  { icon: BarChart3,   title: "Historical Performance", desc: "Study long-term performance trends, return patterns, and historical data to support research-driven investment decisions." },
]

const FAQS = [
  { q: "What are ETFs?", a: "Exchange Traded Funds (ETFs) are investment instruments that track an index, commodity, sector, or basket of assets and trade on stock exchanges like regular stocks. ETFs offer diversification, transparency, and flexibility while allowing investors to buy and sell units during market hours." },
  { q: "Which ETF categories are available?", a: "Shree Varahi provides access to multiple ETF categories, including Index ETFs, Gold ETFs, Silver ETFs, Debt ETFs, Global ETFs, and Sector ETFs. Investors can choose categories based on their financial goals, risk appetite, and investment preferences." },
  { q: "Can I start ETF SIPs?", a: "Yes. You can invest in selected ETFs through Systematic Investment Plans (SIPs) with daily, weekly, or monthly investment frequencies. ETF SIPs help build wealth through disciplined and consistent investing over the long term." },
  { q: "Is MTF available for ETFs?", a: "Yes. Margin Trading Facility (MTF) is available on eligible ETFs, allowing investors to enhance buying power and utilize capital more efficiently, subject to applicable terms and eligibility criteria." },
  { q: "What are ETF brokerage charges?", a: "ETF transactions are generally charged as per the applicable brokerage plan for exchange-traded products. Brokerage, taxes, exchange charges, and other statutory levies may apply as per the prevailing tariff structure." },
  { q: "How can I start investing?", a: "Getting started is simple. Open a Demat and Trading Account with Shree Varahi, complete the KYC process, add funds to your account, explore available ETFs, and begin investing based on your financial goals." },
  { q: "Can I track my ETF investments separately?", a: "Yes. A dedicated ETF dashboard allows you to monitor ETF holdings, portfolio allocation, returns, and overall investment performance separately from other investments." },
  { q: "How do I choose the right ETF?", a: "You can evaluate ETFs using key research parameters such as ETF price, AUM, expense ratio, holdings, historical returns, tracking index, sector allocation, and asset allocation to make informed investment decisions." },
  { q: "Are ETFs suitable for long-term investing?", a: "Yes. ETFs are widely used for long-term wealth creation because they offer diversification, lower costs, transparency, and exposure to various asset classes through a single investment." },
  { q: "Why invest in ETFs through Shree Varahi?", a: "Shree Varahi combines ETF SIPs, dedicated ETF tracking, comprehensive research tools, portfolio monitoring, multiple ETF categories, and transparent pricing to create a seamless ETF investing experience." },
]

// Deterministic candlestick mockup data — uptrend pattern, no live feed
const CANDLES = Array.from({ length: 26 }, (_, i) => {
  const trend   = (i / 25) * 30
  const wobble  = Math.sin(i * 1.7) * 18 + Math.sin(i * 0.6) * 10
  const close   = 50 + trend + wobble
  const open    = close - (Math.cos(i * 1.3) * 12)
  const up      = close >= open
  const top     = Math.min(open, close)
  const bodyH   = Math.max(Math.abs(close - open), 4)
  const wickPad = 6 + Math.abs(Math.sin(i * 2.1)) * 8
  return {
    up,
    bodyTop: Math.max(2, Math.min(94, top)),
    bodyH: Math.min(bodyH, 96 - top),
    wickTop: Math.max(0, top - wickPad / 2),
    wickH: Math.min(bodyH + wickPad, 100),
  }
})

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ETFPage() {
  const [activeCat, setActiveCat]     = useState<Category>("Index")
  const [mobile, setMobile]           = useState("")
  const [activeParam, setActiveParam] = useState(0)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const activeCatMeta = CATEGORIES.find((c) => c.id === activeCat)!

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
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
            <span className="text-foreground font-semibold">ETF</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Exchange Traded Funds
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Invest In ETFs With<br />
                <span className="text-burgundy">Simplicity &amp; Flexibility</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Access a wide range of ETFs through Shree Varahi and diversify your investments more easily and flexibly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Start Trading
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Open Account
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <div>
                  <div className="text-lg font-black text-foreground">31+</div>
                  <div className="text-[10px] text-muted-foreground font-semibold">Years of Trust</div>
                </div>
                <div>
                  <div className="text-lg font-black text-foreground flex items-center gap-1">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                  <div className="text-[10px] text-muted-foreground font-semibold">App Rating</div>
                </div>
              </div>
            </div>

            {/* Hero visual — ETF performance card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Top ETFs Today</span>
                  <span className="text-[9px] font-bold text-muted-foreground">LTP</span>
                </div>
                {ETFS.Index.slice(0, 3).map((etf) => (
                  <div key={etf.name} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{etf.name}</span>
                    <div className="text-right shrink-0">
                      <div className="text-[12px] font-black text-foreground">₹{etf.price}</div>
                      <div className="text-[10px] font-bold text-profit">+{etf.change}%</div>
                    </div>
                  </div>
                ))}
                <div className="pt-1 border-t border-border/40">
                  <Button size="sm" className="w-full bg-burgundy hover:bg-burgundy-deep text-white text-[11px] font-bold rounded-[5px] h-8">
                    Invest Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN DO ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What You Can Do</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Every tool you need to invest in ETFs.</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Browse, analyse, and invest in ETFs across indices, sectors, and asset classes — all from one platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-4"
                    style={{ background: t.color + "14", border: `1px solid ${t.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: t.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{t.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{t.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── EXPLORE ETF CATEGORIES ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">EXPLORE ETF CATEGORIES</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Invest Across Multiple ETF Categories</h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((c) => {
              const Icon = c.icon
              const active = activeCat === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-[6px] text-[12px] font-bold border transition-all duration-200 ${
                    active
                      ? "bg-burgundy text-white border-burgundy shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: active ? "#fff" : c.color }} />
                  {c.label}
                </button>
              )
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-8 -mt-2">
            {activeCatMeta.desc}
          </p>

          {/* ETF grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {ETFS[activeCat].map((etf) => (
                <div
                  key={etf.name}
                  className="bg-white border border-border rounded-[8px] p-4 hover:border-gold/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-[6px] flex items-center justify-center mb-3 text-[10px] font-black"
                    style={{ background: activeCatMeta.color + "14", color: activeCatMeta.color, border: `1px solid ${activeCatMeta.color}22` }}
                  >
                    {etf.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <div className="font-extrabold text-[12px] text-foreground leading-tight mb-2 line-clamp-2 min-h-[28px]">
                    {etf.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-foreground">₹{etf.price}</span>
                    <span className="text-[11px] font-bold text-profit flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />{etf.change}%
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>


        </div>
      </section>

      {/* ── ETF DATA & RESEARCH ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left — scrollable feature list */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">ETF Research</p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1] mb-4">
                Research<br />Before You Invest
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                Automate your investments with Shree Varahi, track performance effortlessly, and stay focused on achieving your long-term financial goals.
              </p>

              <div className="space-y-1 lg:max-h-[540px] lg:overflow-y-auto lg:pr-3 lg:-mr-3">
                {RESEARCH_PARAMS.map((p, i) => {
                  const Icon = p.icon
                  const active = activeParam === i
                  return (
                    <motion.button
                      key={p.title}
                      type="button"
                      onClick={() => setActiveParam(i)}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className={`w-full text-left border-l-4 pl-4 pr-3 py-3 rounded-r-[6px] transition-all duration-200 ${
                        active
                          ? "border-burgundy bg-cream"
                          : "border-border/50 hover:border-gold/40 hover:bg-cream/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-3.5 h-3.5 ${active ? "text-burgundy" : "text-muted-foreground"}`} strokeWidth={1.8} />
                        <h3 className="font-extrabold text-foreground text-[13px]">{p.title}</h3>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Right — centered terminal + phone mockup */}
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Browser/terminal card */}
                <div className="rounded-[10px] border border-border bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-cream/50">
                    <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-[5px] px-2.5 py-1.5">
                      <Activity className="w-3 h-3 text-muted-foreground/60" />
                      <span className="text-[10px] text-muted-foreground truncate">{RESEARCH_PARAMS[activeParam].title} · {ETFS.Index[0].name}</span>
                    </div>
                    <div className="hidden sm:flex gap-1.5">
                      {["ORDERS", "POSITIONS", "BUY", "SELL"].map((label, i) => (
                        <span
                          key={label}
                          className={`text-[9px] font-bold px-2 py-1 rounded-[4px] border ${
                            i >= 2
                              ? i === 2
                                ? "bg-profit/10 text-profit border-profit/30"
                                : "bg-loss/10 text-loss border-loss/30"
                              : "bg-white text-muted-foreground border-border"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ticker header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
                    <span className="text-[13px] font-extrabold text-foreground">
                      {ETFS.Index[0].name} <span className="text-muted-foreground font-semibold">· NSE</span>
                    </span>
                    <span className="text-[12px] font-black text-profit">
                      ₹{ETFS.Index[0].price} <span className="text-[10px] font-bold">(+{ETFS.Index[0].change}%)</span>
                    </span>
                  </div>

                  {/* Candlestick mockup */}
                  <div className="px-3 py-7 h-80 flex items-center gap-[3px]">
                    {CANDLES.map((c, i) => (
                      <div key={i} className="flex-1 h-full relative">
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-px bg-border"
                          style={{ top: `${c.wickTop}%`, height: `${c.wickH}%` }}
                        />
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-[5px] rounded-[1px]"
                          style={{
                            top: `${c.bodyTop}%`,
                            height: `${c.bodyH}%`,
                            background: c.up ? "#059669" : "#DC2626",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone mockup overlay */}
                <div className="hidden sm:block absolute -bottom-8 -right-5 w-36 rounded-[16px] border-[5px] border-foreground bg-white shadow-2xl overflow-hidden">
                  <div className="px-3 py-3 space-y-2.5">
                    <div>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">{ETFS.Index[0].name}</p>
                      <p className="text-[13px] font-black text-foreground">
                        ₹{ETFS.Index[0].price} <span className="text-profit text-[9px]">+{ETFS.Index[0].change}%</span>
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-border/50">
                      {[
                        { l: "AUM", v: "₹8,240 Cr" },
                        { l: "Expense", v: "0.05%" },
                        { l: "Tracking", v: "Nifty 50" },
                      ].map((s) => (
                        <div key={s.l} className="flex items-center justify-between">
                          <span className="text-[8px] text-muted-foreground font-semibold">{s.l}</span>
                          <span className="text-[9px] font-bold text-foreground">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (2-column accordion grid — matches /futures-options) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about investing in ETFs at Shree Varahi? Review answers to our most popular inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div
                  key={index}
                  className="bg-white border border-border/80 rounded-[12px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
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

      {/* ── CTA — floating banner card, detached from footer ── */}
      <section className="py-12 lg:py-16 bg-background px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl rounded-[20px] overflow-hidden bg-burgundy text-white shadow-[0_20px_60px_rgba(139,13,25,0.25)]"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.18) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12 lg:p-14">
            {/* Left — copy + form */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Start Building Wealth<br className="hidden sm:inline" /> Through ETFs
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm font-bold text-white/85">
                4.5 <Star className="w-4 h-4 fill-gold-champagne text-gold-champagne" /> App Rating
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button type="submit" className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0">
                  Get Started
                </Button>
              </form>

              {/* QR + store badges */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <div className="hidden sm:flex w-16 h-16 rounded-[8px] bg-white p-1.5 shrink-0">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px), repeating-linear-gradient(-45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-white/60">Scan to download</p>
                  <div className="flex gap-2.5">
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">App Store</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — phone mockup w/ ETF dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My ETFs</span>
                  <Layers className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Portfolio Value</p>
                  <p className="text-base font-black text-foreground">₹2,84,650</p>
                  <p className="text-[10px] font-bold text-profit">+₹18,240 (6.8%)</p>
                </div>
                {ETFS.Index.slice(0, 3).map((etf) => (
                  <div key={etf.name} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{etf.name}</span>
                    <span className="text-[9px] font-bold text-profit shrink-0">+{etf.change}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

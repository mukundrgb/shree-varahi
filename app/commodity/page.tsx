"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, ChevronDown, Plus, X, Layers, ListChecks, LayoutDashboard, Zap,
  Activity, PieChart, Coins, CircleDollarSign, Flame, Boxes, Box, Gauge,
  TrendingUp, Target, BarChart3, ShieldCheck, RotateCcw,
  ArrowUpRight, Star, Check, Eye, Layers3, SplitSquareHorizontal, CalendarClock,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Data ───────────────────────────────────────────────────────────────────

const TOOLS = [
  { icon: TrendingUp,       color: "#8B0D19", title: "Commodity Futures",   desc: "Trade major commodity futures contracts across key markets and capture opportunities in global price movements." },
  { icon: Layers,           color: "#8B0D19", title: "Commodity Options",   desc: "Trade commodity options on eligible contracts and implement trading and hedging strategies based on market outlook." },
  { icon: ListChecks,       color: "#8B0D19", title: "Option Chain",        desc: "Track OI, volume, IV, and strike data for eligible commodity contracts in a single dedicated view." },
  { icon: Gauge,            color: "#8B0D19", title: "Greeks Analysis",     desc: "Evaluate key option Greeks like Delta, Theta, Vega, and Gamma to manage risk and improve decision-making." },
  { icon: Activity,         color: "#8B0D19", title: "TradingView Charts",  desc: "Advanced charts with indicators and multiple timeframes, integrated directly into your trading workflow." },
  { icon: ShieldCheck,      color: "#8B0D19", title: "Pledge Margin",       desc: "Access extra trading margin using approved holdings as collateral and keep your long-term investments invested." },
  { icon: LayoutDashboard,  color: "#8B0D19", title: "Commodity Dashboard", desc: "Monitor your trades, available margin, and overall performance live so you always know how your positions are performing." },
  { icon: RotateCcw,        color: "#8B0D19", title: "Position Management", desc: "Manage your trades with ease by updating orders, monitoring positions, and exiting when needed as conditions change." },
]

const KEY_BENEFITS_1 = [
  "Commodity Futures & Options Trading", "Advanced Option Chain Analysis", "Real-Time Greeks Monitoring",
  "TradingView Chart Integration", "Efficient Margin Utilization", "Dedicated Commodity Dashboard",
  "Fast Position Management", "Professional Trading Experience",
]

type Category = "Gold" | "Silver" | "Crude Oil" | "Natural Gas" | "Copper" | "Zinc" | "Aluminium" | "Nickel"

const CATEGORIES: { id: Category; icon: React.ElementType; color: string; price: string; change: number }[] = [
  { id: "Gold",         icon: Coins,            color: "#8B0D19", price: "72,450",  change: 0.42 },
  { id: "Silver",       icon: CircleDollarSign, color: "#8B0D19", price: "87,420",  change: 0.65 },
  { id: "Crude Oil",    icon: Flame,            color: "#8B0D19", price: "6,450",   change: -0.74 },
  { id: "Natural Gas",  icon: Zap,              color: "#8B0D19", price: "296.80",  change: -1.59 },
  { id: "Copper",       icon: Box,              color: "#8B0D19", price: "812.35",  change: -0.51 },
  { id: "Zinc",         icon: Boxes,            color: "#8B0D19", price: "362.95",  change: -0.70 },
  { id: "Aluminium",    icon: Layers3,          color: "#8B0D19", price: "238.40",  change: 0.28 },
  { id: "Nickel",       icon: Gauge,            color: "#8B0D19", price: "1,736.40",change: -1.21 },
]

type Group = "Bullion" | "Base Metal" | "Energy"

const GROUPS: { id: Group; icon: React.ElementType; desc: string }[] = [
  { id: "Bullion",    icon: Coins, desc: "Precious metals traded for value preservation, hedging, and long-term wealth storage." },
  { id: "Base Metal", icon: Boxes, desc: "Industrial metals driven by manufacturing demand, infrastructure, and global trade activity." },
  { id: "Energy",     icon: Flame, desc: "Energy commodities driven by global supply, demand, and geopolitical market activity." },
]

const GROUP_MEMBERS: Record<Group, Category[]> = {
  "Bullion":    ["Gold", "Silver"],
  "Base Metal": ["Copper", "Zinc", "Aluminium", "Nickel"],
  "Energy":     ["Crude Oil", "Natural Gas"],
}

type Contract = { name: string; expiry: string }

const CONTRACTS: Record<Category, Contract[]> = {
  "Gold":        [{ name: "Gold", expiry: "5, Aug 2027" }, { name: "Gold Mini", expiry: "29, Jul 2027" }, { name: "Gold Guinea", expiry: "31, Jul 2027" }, { name: "Gold Petal", expiry: "31, Jul 2027" }],
  "Silver":      [{ name: "Silver", expiry: "5, Sep 2027" }, { name: "Silver Mini", expiry: "30, Jul 2027" }, { name: "Silver Micro", expiry: "30, Jul 2027" }],
  "Crude Oil":   [{ name: "Crude Oil", expiry: "19, Jul 2027" }, { name: "Crude Oil Mini", expiry: "19, Jul 2027" }],
  "Natural Gas": [{ name: "Natural Gas", expiry: "24, Jul 2027" }, { name: "Natural Gas Mini", expiry: "24, Jul 2027" }],
  "Copper":      [{ name: "Copper", expiry: "30, Jul 2027" }, { name: "Copper Mini", expiry: "30, Jul 2027" }],
  "Zinc":        [{ name: "Zinc", expiry: "29, Jul 2027" }, { name: "Zinc Mini", expiry: "29, Jul 2027" }],
  "Aluminium":   [{ name: "Aluminium", expiry: "30, Jul 2027" }, { name: "Aluminium Mini", expiry: "30, Jul 2027" }],
  "Nickel":      [{ name: "Nickel", expiry: "30, Jul 2027" }, { name: "Nickel Mini", expiry: "30, Jul 2027" }],
}

const WHY_MULTIPLE = [
  "Precious Metals Exposure", "Energy Market Opportunities", "Industrial Metals Trading",
  "Multiple Contract Variants", "Diversified Commodity Portfolio", "Access Through One Trading Platform",
]

const ADVANCED_TOOLS = [
  { icon: ListChecks, title: "Advanced Option Chain",   desc: "Track OI, volume, premiums, and strike-wise market activity.", color: "#8B0D19" },
  { icon: Gauge,      title: "Greeks Tracking",          desc: "Analyze Delta, Theta, Vega, and Gamma for risk management.",  color: "#8B0D19" },
  { icon: Activity,   title: "TradingView Integration",  desc: "Advanced charts, indicators, and real-time market analysis.", color: "#8B0D19" },
  { icon: LayoutDashboard, title: "Commodity Dashboard",  desc: "Monitor positions, margins, P&L, and market exposure.",       color: "#8B0D19" },
]

const WHY_TOOLS_MATTER = [
  "Advanced Market Analysis", "Real-Time Options Insights", "Better Risk Assessment", "Faster Trading Decisions",
  "Professional Charting Experience", "Dedicated Commodity Monitoring", "Improved Position Management", "Enhanced Trading Efficiency",
]

const MARGIN_CARDS = [
  { icon: ShieldCheck, title: "Pledge Margin Benefit", desc: "Continue holding your investments while using approved stocks as collateral to unlock additional trading margin without selling your portfolio." },
  { icon: SplitSquareHorizontal, title: "Cross-Segment Margin Utilization", desc: "Deploy your capital more efficiently across eligible segments and stay ready to capture trading opportunities as they arise." },
]

const MARGIN_BENEFITS = [
  "Better Capital Efficiency", "Additional Trading Flexibility", "Retain Ownership Of Investments",
  "Enhanced Margin Availability", "Efficient Resource Utilization", "Seamless Trading Experience",
]

const STRATEGY_CARDS = [
  { icon: Layers,    title: "Basket Orders",          desc: "Trade commodities efficiently by placing multiple positions together for spreads, hedging, and advanced strategies.", color: "#8B0D19" },
  { icon: Target,    title: "Strategy Builder",        desc: "Create, analyze, and compare commodity options strategies with clear risk-reward evaluation to support smarter decisions.", color: "#8B0D19" },
  { icon: Zap,       title: "Quick Order Execution",   desc: "React faster to market movements by placing, adjusting, and closing trades seamlessly when conditions change.", color: "#8B0D19" },
  { icon: Eye,       title: "Position Monitoring",     desc: "Get real-time visibility into positions, P&L, margins, contracts, and market exposure from a single dashboard.", color: "#8B0D19" },
]

const STRATEGY_WHY = [
  "Faster Strategy Execution", "Efficient Multi-Leg Trading", "Real-Time Position Monitoring", "Improved Risk Management",
  "Reduced Manual Effort", "Professional Trading Workflow", "Better Capital Utilization", "Active Trader-Focused Experience",
]

const WHY_VARAHI = [
  { icon: Target,           title: "Commodity Focused", desc: "Specialized tools and workflows designed for commodity market participants." },
  { icon: BarChart3,        title: "Advanced Analytics", desc: "Option Chain, Greeks, charts, and real-time market insights." },
  { icon: ShieldCheck,      title: "Margin Benefits",    desc: "Use approved holdings as collateral for additional trading flexibility." },
  { icon: Zap,              title: "Faster Execution",   desc: "Execute trades quickly with Basket Orders and position management tools." },
]

const WHY_TRADERS_CHOOSE = [
  "Commodity Futures & Options Trading", "Advanced Option Chain & Greeks Analysis", "TradingView-Powered Charting",
  "Dedicated Commodity Dashboard", "Efficient Margin Utilization", "Real-Time Market Insights",
  "Fast Order Execution", "Built For Active Traders",
]

const FAQS = [
  { q: "Can I trade Commodity Futures?", a: "Yes. Shree Varahi provides access to Commodity Futures trading across major commodity segments, allowing traders to participate in price movements of precious metals, energy products, and industrial metals through exchange-traded contracts." },
  { q: "Are Commodity Options available?", a: "Yes. Traders can access Commodity Options on eligible commodity contracts and implement various trading and hedging strategies based on market outlook, volatility expectations, and risk preferences." },
  { q: "Do I get Option Chain with Greeks?", a: "Yes. The platform offers an advanced Commodity Option Chain with detailed strike-wise data, Open Interest (OI), volume, premiums, and options analytics. Traders can also monitor key Greeks such as Delta, Theta, Vega, and Gamma." },
  { q: "Can I pledge stocks for commodity margin?", a: "Yes. Approved stock holdings can be pledged and used as collateral for eligible margin benefits, helping traders optimize capital utilization while continuing to hold their long-term investments." },
  { q: "Which commodities can I trade?", a: "Shree Varahi provides access to multiple commodity segments, including Gold, Gold Mini, Gold Guinea, Gold Petal, Silver, Silver Mini, Silver Micro, Crude Oil, Crude Oil Mini, Natural Gas, Natural Gas Mini, Copper, Copper Mini, Zinc, Zinc Mini, Aluminium, Aluminium Mini, Nickel, and Nickel Mini. Availability may vary based on exchange offerings and regulatory guidelines." },
  { q: "What are the brokerage charges?", a: "Commodity Futures and Options trades are charged as per the applicable brokerage plan. Brokerage, exchange transaction charges, GST, SEBI charges, stamp duty, and other statutory levies may apply as per prevailing regulations." },
  { q: "Can I trade directly from charts?", a: "Yes. With TradingView integration, traders can analyze commodity markets using advanced charting tools and execute trades efficiently from a unified trading interface." },
  { q: "Is a dedicated Commodity Dashboard available?", a: "Yes. The platform includes a dedicated Commodity Dashboard where traders can monitor positions, profit and loss, margin utilization, active contracts, and overall commodity exposure." },
  { q: "Can I create commodity options strategies?", a: "Yes. The Strategy Builder allows traders to create, evaluate, and analyze commodity options strategies before execution, helping them understand potential risk-reward scenarios." },
  { q: "Is the platform suitable for active commodity traders?", a: "Absolutely. Shree Varahi is designed for active traders and offers advanced tools such as Commodity Futures & Options, Option Chain, Greeks Analysis, TradingView Charts, Basket Orders, Strategy Builder, and real-time position management." },
]

// Deterministic candlestick mockup — uptrend pattern, no live feed
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

function CheckPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground bg-white border border-border/70 rounded-full px-3 py-1.5">
      <Check className="w-3 h-3 text-gold-deep shrink-0" strokeWidth={3} />
      {label}
    </span>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CommodityPage() {
  const [activeGroup, setActiveGroup] = useState<Group>("Bullion")
  const [activeCat, setActiveCat] = useState<Category>("Gold")
  const [mobile, setMobile] = useState("")
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const activeCatMeta = CATEGORIES.find((c) => c.id === activeCat)!
  const activeGroupMeta = GROUPS.find((g) => g.id === activeGroup)!

  const selectGroup = (g: Group) => {
    setActiveGroup(g)
    setActiveCat(GROUP_MEMBERS[g][0])
  }

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
            <span className="text-foreground font-semibold">Commodity</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Commodity Trading · MCX
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Trade Commodities With<br />
                <span className="text-burgundy">Advanced Trading Tools</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Trade Precious Metals, Energy &amp; More With Confidence — backed by option chain analytics, Greeks, pledge margin benefits, and TradingView charts.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Open Account
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Explore Markets
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

            {/* Hero visual — commodity performance card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Top Commodities Today</span>
                  <span className="text-[9px] font-bold text-muted-foreground">LTP</span>
                </div>
                {CATEGORIES.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{c.id}</span>
                    <div className="text-right shrink-0">
                      <div className="text-[12px] font-black text-foreground">₹{c.price}</div>
                      <div className={`text-[10px] font-bold ${c.change >= 0 ? "text-profit" : "text-loss"}`}>{c.change >= 0 ? "+" : ""}{c.change}%</div>
                    </div>
                  </div>
                ))}
                <div className="pt-1 border-t border-border/40">
                  <Button size="sm" className="w-full bg-burgundy hover:bg-burgundy-deep text-white text-[11px] font-bold rounded-[5px] h-8">
                    Trade Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ── ACCESS MAJOR COMMODITY MARKETS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Trade Multiple Commodities</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">Access Major Commodity Markets</h2>
          </div>

          {/* Group tabs — Bullion / Base Metal / Energy */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {GROUPS.map((g) => {
              const Icon = g.icon
              const active = activeGroup === g.id
              return (
                <button
                  key={g.id}
                  onClick={() => selectGroup(g.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-bold border transition-all duration-200 ${
                    active
                      ? "bg-burgundy text-white border-burgundy shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: active ? "#fff" : "#8B0D19" }} />
                  {g.id}
                </button>
              )
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            {activeGroupMeta.desc}
          </p>

          {/* Commodity tree — contracts nest directly under their parent commodity */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto space-y-3"
            >
              {GROUP_MEMBERS[activeGroup].map((catId) => {
                const cat = CATEGORIES.find((c) => c.id === catId)!
                const Icon = cat.icon
                const active = activeCat === cat.id
                return (
                  <div
                    key={cat.id}
                    className={`bg-white border rounded-[10px] transition-all duration-200 ${
                      active ? "border-burgundy shadow-sm" : "border-border hover:border-gold/40"
                    }`}
                  >
                    <button
                      onClick={() => setActiveCat(active ? cat.id : cat.id)}
                      className="w-full flex items-center gap-3 p-4 text-left"
                    >
                      <div
                        className="w-9 h-9 rounded-[6px] flex items-center justify-center shrink-0"
                        style={{ background: cat.color + "14", border: `1px solid ${cat.color}22` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: cat.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-extrabold text-[13px] text-foreground leading-tight">{cat.id}</div>
                        <div className="text-[11px] text-muted-foreground font-semibold">{CONTRACTS[cat.id].length} contracts</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-foreground block">₹{cat.price}</span>
                        <span className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${cat.change >= 0 ? "text-profit" : "text-loss"}`}>
                          <ArrowUpRight className={`w-3 h-3 ${cat.change < 0 ? "rotate-90" : ""}`} />{cat.change}%
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${active ? "rotate-180 text-burgundy" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {/* Nested contracts — indented + connected with a left rail to show they belong to the commodity above */}
                          <div className="pl-6 pr-4 pb-4 ml-[34px] border-l-2 border-burgundy/20 space-y-2">
                            {CONTRACTS[cat.id].map((contract) => (
                              <div
                                key={contract.name}
                                className="flex items-center justify-between gap-3 bg-cream/50 border border-border/60 rounded-[6px] px-3 py-2.5 hover:border-gold/40 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className="w-6 h-6 rounded-[5px] flex items-center justify-center text-[8px] font-black shrink-0"
                                    style={{ background: cat.color + "14", color: cat.color }}
                                  >
                                    {contract.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                                  </div>
                                  <span className="font-bold text-[12px] text-foreground truncate">{contract.name}</span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                                    <CalendarClock className="w-3 h-3" />
                                    Exp {contract.expiry}
                                  </span>
                                  <span className="text-[12px] font-black text-foreground">₹{cat.price}</span>
                                  <span className={`hidden sm:flex text-[11px] font-bold items-center gap-0.5 ${cat.change >= 0 ? "text-profit" : "text-loss"}`}>
                                    <ArrowUpRight className={`w-3 h-3 ${cat.change < 0 ? "rotate-90" : ""}`} />{cat.change}%
                                  </span>
                                  <Button size="sm" className="bg-burgundy hover:bg-burgundy-deep text-white text-[10px] font-bold h-7 px-3 rounded-[5px]">
                                    Trade
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

            {/* ── WHAT YOU CAN DO ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What You Can Do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Everything You Need For Commodity Trading.</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Analyze market trends, execute commodity trades, and manage positions seamlessly through Shree Varahi&apos;s integrated trading platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      {/* ── ADVANCED COMMODITY TOOLS ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left — feature cards */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">Advanced Tools</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4">
                Built For Active<br />Commodity Traders
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                Leverage Shree Varahi&apos;s advanced commodity trading tools for deeper analysis, effective risk management, and seamless trade execution.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {ADVANCED_TOOLS.map((t, i) => {
                  const Icon = t.icon
                  return (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="bg-white border border-border/70 rounded-[8px] p-4 hover:border-gold/30 hover:shadow-sm transition-all"
                    >
                      <div
                        className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-3"
                        style={{ background: t.color + "10" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: t.color }} strokeWidth={2} />
                      </div>
                      <h4 className="font-extrabold text-foreground text-[12px] mb-1">{t.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{t.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right — terminal + phone mockup */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-[10px] border border-border bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-cream/50">
                    <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-[5px] px-2.5 py-1.5">
                      <Activity className="w-3 h-3 text-muted-foreground/60" />
                      <span className="text-[10px] text-muted-foreground truncate">Option Chain · {activeCat}</span>
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

                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
                    <span className="text-[13px] font-extrabold text-foreground">
                      {activeCat} <span className="text-muted-foreground font-semibold">· MCX</span>
                    </span>
                    <span className={`text-[12px] font-black ${activeCatMeta.change >= 0 ? "text-profit" : "text-loss"}`}>
                      ₹{activeCatMeta.price} <span className="text-[10px] font-bold">({activeCatMeta.change >= 0 ? "+" : ""}{activeCatMeta.change}%)</span>
                    </span>
                  </div>

                  {/* Greeks strip */}
                  <div className="grid grid-cols-4 gap-px bg-border/40 border-b border-border/40">
                    {[
                      { l: "Delta", v: "0.50" }, { l: "Theta", v: "-16.5" }, { l: "Vega", v: "8.2" }, { l: "Gamma", v: "0.04" },
                    ].map((g) => (
                      <div key={g.l} className="bg-white px-2 py-2 text-center">
                        <div className="text-[8px] font-bold text-muted-foreground uppercase">{g.l}</div>
                        <div className="text-[11px] font-black text-foreground">{g.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Candlestick mockup */}
                  <div className="px-3 py-7 h-72 flex items-center gap-[3px]">
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
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">{activeCat}</p>
                      <p className="text-[13px] font-black text-foreground">
                        ₹{activeCatMeta.price} <span className={`text-[9px] ${activeCatMeta.change >= 0 ? "text-profit" : "text-loss"}`}>{activeCatMeta.change >= 0 ? "+" : ""}{activeCatMeta.change}%</span>
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-border/50">
                      {[
                        { l: "Margin", v: "12%" },
                        { l: "Lot Size", v: "100" },
                        { l: "Expiry", v: "28 JUN" },
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

      {/* ── MORE MARGIN. MORE OPPORTUNITIES ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Trade With More Flexibility</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">More Margin. More Opportunities.</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Unlock greater trading flexibility with Shree Varahi&apos;s margin solutions, designed to optimize capital utilization and maximize market opportunities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-8 max-w-4xl mx-auto">
            {MARGIN_CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white border border-border rounded-[10px] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-[8px] bg-burgundy/10 border border-burgundy/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{c.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── STRATEGY & EXECUTION ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Strategy &amp; Execution</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Execute Commodity Strategies Efficiently</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Execute trading strategies, place orders quickly, and manage commodity positions efficiently with Shree Varahi&apos;s advanced trading platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STRATEGY_CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-4"
                    style={{ background: c.color + "14", border: `1px solid ${c.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: c.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{c.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>


        </div>
      </section>

      {/* ── FAQ (2-column accordion grid — matches /etf, /futures-options) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about commodity trading at Shree Varahi? Review answers to our most popular inquiries.
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
                Trade Commodity Markets<br className="hidden sm:inline" /> With Better Control
              </h2>
              <p className="text-sm font-semibold text-white/85">
                Analyze Better. Execute Faster. Trade Commodities With Confidence Through Shree Varahi.
              </p>
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
                  Open Account
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

            {/* Right — phone mockup w/ commodity dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My Commodities</span>
                  <PieChart className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Margin Used</p>
                  <p className="text-base font-black text-foreground">₹1,84,650</p>
                  <p className="text-[10px] font-bold text-profit">+₹6,240 (3.5%)</p>
                </div>
                {CATEGORIES.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{c.id}</span>
                    <span className={`text-[9px] font-bold shrink-0 ${c.change >= 0 ? "text-profit" : "text-loss"}`}>{c.change >= 0 ? "+" : ""}{c.change}%</span>
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

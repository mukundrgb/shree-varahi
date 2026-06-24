"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, ChevronDown, Layers, Eye, FileSearch, GitCompare, MonitorSmartphone,
  Bookmark, LineChart, Lightbulb, TrendingUp, Landmark, Scale, Globe2, BarChart3,
  Target, UserCheck, Gauge, CalendarRange, Wallet, PieChart, ListChecks,
  Star, Check, LayoutDashboard, Bell, Activity,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Data ───────────────────────────────────────────────────────────────────

const TOOLS = [
  { icon: TrendingUp,        color: "#FF0000", title: "Active NFOs",       desc: "Explore and invest in currently open New Fund Offers (NFOs) to discover fresh opportunities for portfolio growth." },
  { icon: CalendarRange,     color: "#FF0000", title: "Upcoming NFOs",     desc: "Stay updated on upcoming fund launches and subscription schedules so you never miss new investment opportunities." },
  { icon: FileSearch,        color: "#FF0000", title: "NFO Research",      desc: "Review fund objectives, strategy, risk profile, and key details to make more informed investment decisions." },
  { icon: GitCompare,        color: "#FF0000", title: "Fund Comparison",   desc: "Compare NFOs based on category, risk level, and investment strategy to choose the one that best fits your goals." },
  { icon: MonitorSmartphone, color: "#FF0000", title: "Online Investment", desc: "Invest digitally through a simple, secure, and seamless process designed for a smooth investing experience." },
  { icon: Bookmark,          color: "#FF0000", title: "Watchlists",        desc: "Save and monitor NFOs before investing to stay organized and never miss a promising opportunity." },
  { icon: LineChart,         color: "#FF0000", title: "Fund Tracking",     desc: "Track your subscribed NFOs and investment status in real time to stay fully updated on your portfolio." },
  { icon: Lightbulb,         color: "#FF0000", title: "Investment Insights", desc: "Access fund information, market trends, and research insights to make smarter and more confident investment decisions." },
]

const KEY_BENEFITS_1 = [
  "Discover Active & Upcoming NFOs", "Research Before Investing", "Easy NFO Comparison Tools",
  "Fully Digital Investment Process", "Personalized Watchlists", "Centralized Fund Tracking",
  "Research-Driven Decision Making", "Seamless Investment Experience",
]

type Category = "Equity" | "Debt" | "Hybrid" | "Index" | "Sector" | "International"

const CATEGORIES: { id: Category; icon: React.ElementType; color: string; desc: string }[] = [
  { id: "Equity",        icon: TrendingUp, color: "#FF0000", desc: "Growth-focused funds investing primarily in equity markets to help you capture long-term wealth creation opportunities." },
  { id: "Debt",          icon: Landmark,   color: "#FF0000", desc: "Fixed-income funds focused on stability and steady income generation for predictable financial growth." },
  { id: "Hybrid",        icon: Scale,      color: "#FF0000", desc: "A balanced mix of equity and debt investments designed to deliver growth with stability and controlled risk." },
  { id: "Index",         icon: BarChart3,  color: "#FF0000", desc: "Passive funds tracking benchmark market indices to deliver simple, low-cost, market-matching returns." },
  { id: "Sector",        icon: Target,     color: "#FF0000", desc: "Focused exposure to specific sectors and investment themes to capture targeted growth opportunities in the market." },
  { id: "International", icon: Globe2,     color: "#FF0000", desc: "Invest in global markets and international opportunities to diversify your portfolio and capture worldwide growth potential." },
]

const NFOS: Record<Category, { name: string; status: "Open" | "Upcoming"; closes: string; min: string }[]> = {
  Equity: [
    { name: "Varahi Flexicap Growth Fund",     status: "Open",     closes: "28 Jun", min: "₹500" },
    { name: "Varahi Midcap Opportunities Fund", status: "Open",     closes: "30 Jun", min: "₹1,000" },
    { name: "Varahi Smallcap Discovery Fund",  status: "Upcoming", closes: "05 Jul", min: "₹500" },
    { name: "Varahi Focused Equity Fund",      status: "Upcoming", closes: "08 Jul", min: "₹1,000" },
  ],
  Debt: [
    { name: "Varahi Corporate Bond Fund",      status: "Open",     closes: "27 Jun", min: "₹1,000" },
    { name: "Varahi Banking & PSU Debt Fund",  status: "Open",     closes: "29 Jun", min: "₹500" },
    { name: "Varahi Short Duration Fund",      status: "Upcoming", closes: "04 Jul", min: "₹1,000" },
    { name: "Varahi Gilt Fund",                status: "Upcoming", closes: "10 Jul", min: "₹500" },
  ],
  Hybrid: [
    { name: "Varahi Balanced Advantage Fund",  status: "Open",     closes: "28 Jun", min: "₹1,000" },
    { name: "Varahi Equity Savings Fund",      status: "Open",     closes: "01 Jul", min: "₹500" },
    { name: "Varahi Multi Asset Allocation Fund", status: "Upcoming", closes: "06 Jul", min: "₹1,000" },
    { name: "Varahi Conservative Hybrid Fund", status: "Upcoming", closes: "09 Jul", min: "₹500" },
  ],
  Index: [
    { name: "Varahi Nifty 50 Index Fund",      status: "Open",     closes: "27 Jun", min: "₹100" },
    { name: "Varahi Nifty Next 50 Index Fund", status: "Open",     closes: "30 Jun", min: "₹100" },
    { name: "Varahi Sensex Index Fund",        status: "Upcoming", closes: "05 Jul", min: "₹100" },
    { name: "Varahi Nifty Midcap 150 Index Fund", status: "Upcoming", closes: "11 Jul", min: "₹100" },
  ],
  Sector: [
    { name: "Varahi Banking & Financial Services Fund", status: "Open", closes: "28 Jun", min: "₹500" },
    { name: "Varahi Technology Fund",          status: "Open",     closes: "01 Jul", min: "₹500" },
    { name: "Varahi Pharma & Healthcare Fund", status: "Upcoming", closes: "07 Jul", min: "₹500" },
    { name: "Varahi Infrastructure Fund",      status: "Upcoming", closes: "12 Jul", min: "₹500" },
  ],
  International: [
    { name: "Varahi US Equity Opportunities Fund", status: "Open",     closes: "29 Jun", min: "₹1,000" },
    { name: "Varahi Global Innovation Fund",   status: "Open",     closes: "02 Jul", min: "₹1,000" },
    { name: "Varahi Emerging Markets Fund",    status: "Upcoming", closes: "08 Jul", min: "₹1,000" },
    { name: "Varahi China Opportunities Fund", status: "Upcoming", closes: "13 Jul", min: "₹1,000" },
  ],
}

const WHY_EXPLORE = [
  "Discover New Investment Themes", "Access Multiple Fund Categories", "Diversify Across Asset Classes",
  "Explore Domestic & Global Opportunities", "Align Investments With Financial Goals", "Identify Funds Matching Your Risk Profile",
]

const RESEARCH_PARAMS = [
  { icon: Target,         title: "Fund Objective",      desc: "Review the fund's purpose and investment approach to ensure it aligns with your financial objectives." },
  { icon: Lightbulb,      title: "Investment Theme",    desc: "Review the fund's sector exposure and investment theme to ensure it aligns with your financial strategy." },
  { icon: Layers,         title: "Fund Category",       desc: "Identify the NFO category and investment type to understand its structure and suitability before investing." },
  { icon: UserCheck,      title: "Fund Manager",        desc: "View fund manager details and experience to better understand their expertise and investment approach." },
  { icon: Gauge,          title: "Risk Profile",        desc: "Assess potential risk and volatility levels to understand how your investments may behave in different market conditions." },
  { icon: BarChart3,      title: "Benchmark Index",     desc: "Compare performance against a relevant benchmark to evaluate how well your investment is truly performing." },
  { icon: CalendarRange,  title: "Subscription Dates",  desc: "Track NFO opening and closing dates to ensure you never miss an investment opportunity." },
  { icon: Wallet,         title: "Minimum Investment",  desc: "Check the minimum investment amount required to start investing and plan your entry accordingly." },
  { icon: PieChart,       title: "Asset Allocation",    desc: "Review proposed allocation across asset classes to understand how your investment is diversified." },
  { icon: ListChecks,     title: "Investment Strategy", desc: "Understand the fund's investment approach and methodology to see how it aims to generate returns." },
]

const RESEARCH_ADVANTAGES = [
  "Transparent Fund Information", "Easy Fund Evaluation", "Better Investment Understanding", "Quick Access To Key Data",
  "Improved Decision Making", "Research-Driven Investing", "Fund Comparison Readiness", "Investor-Friendly Insights",
]

const TRACK_CARDS = [
  { icon: LayoutDashboard, title: "Investment Dashboard", desc: "View subscribed NFOs, allocations, and investment status in one place for complete portfolio clarity.", color: "#8B0D19" },
  { icon: Bell,            title: "Fund Monitoring",       desc: "Track fund updates, announcements, and performance to stay informed and make better investment decisions.", color: "#D97706" },
  { icon: PieChart,        title: "Portfolio Tracking",    desc: "Monitor NFO allocations within your overall portfolio to maintain a clear view of your investment distribution.", color: "#1D4ED8" },
  { icon: Activity,        title: "Investment Insights",   desc: "Analyze portfolio exposure, allocation, and performance trends to gain a clear view of your overall investment health.", color: "#059669" },
]

const WHY_TRACKING = [
  "Centralized Investment Visibility", "Easy Portfolio Monitoring", "Track Fund Performance",
  "Understand Portfolio Allocation", "Stay Updated On Fund Developments", "Better Long-Term Investment Management",
]

const WHY_VARAHI = [
  { icon: Eye,             title: "Opportunity Discovery", desc: "Track active and upcoming NFOs across multiple fund categories." },
  { icon: FileSearch,      title: "Research Driven",       desc: "Access fund objectives, risk profiles, strategies, and key insights." },
  { icon: MonitorSmartphone, title: "Simple Investing",    desc: "Invest digitally through a secure and paperless process." },
  { icon: LineChart,       title: "Investment Tracking",   desc: "Monitor investments, allocations, and fund updates easily." },
]

const WHY_INVESTORS_CHOOSE = [
  "Active & Upcoming NFO Tracking", "Comprehensive Fund Research", "Digital Investment Experience", "Easy Fund Comparison",
  "Centralized Investment Dashboard", "Portfolio Monitoring Tools", "Research-Backed Decision Making", "Investor-Friendly Experience",
]

const FAQS = [
  { q: "What is an NFO?", a: "A New Fund Offer (NFO) is the initial subscription period of a new mutual fund scheme launched by an Asset Management Company (AMC). During this period, investors can invest in the fund before it becomes available for regular purchase and redemption." },
  { q: "How can I invest in an NFO?", a: "Investing in an NFO is simple. Browse available NFOs on the platform, review the fund details and investment objectives, choose the amount you wish to invest, and complete the investment process through a secure digital application." },
  { q: "Can I track upcoming NFOs?", a: "Yes. Shree Varahi provides access to upcoming and active NFOs, helping investors stay informed about new fund launches, subscription timelines, and investment opportunities across various fund categories." },
  { q: "How do I compare NFOs?", a: "You can compare NFOs using important parameters such as fund category, investment objective, risk profile, asset allocation, benchmark index, fund manager details, investment strategy, and minimum investment requirements." },
  { q: "What fund information is available?", a: "Investors can access comprehensive NFO information including fund objectives, investment themes, fund category, risk profile, benchmark index, fund manager details, asset allocation, subscription dates, minimum investment amounts, and investment strategies." },
  { q: "What are the investment charges?", a: "Investment-related charges, if applicable, are governed by the respective mutual fund scheme and regulatory guidelines. Investors can review relevant fund documents and disclosures before making an investment decision." },
  { q: "Can I invest in NFOs completely online?", a: "Yes. Shree Varahi offers a simple and paperless digital investment process, allowing investors to explore, compare, and invest in NFOs conveniently through a single platform." },
  { q: "Which types of NFOs can I explore?", a: "You can discover multiple NFO categories including Equity NFOs, Debt NFOs, Hybrid NFOs, Index NFOs, Sector NFOs, and International NFOs, depending on currently available fund launches." },
  { q: "Can I track my NFO investments after investing?", a: "Yes. The platform provides investment dashboards, portfolio tracking tools, fund monitoring features, and investment insights that help investors stay updated even after the NFO subscription period ends." },
  { q: "Why invest in NFOs through Shree Varahi?", a: "Shree Varahi combines NFO discovery, fund research, comparison tools, digital investing, portfolio tracking, and investment monitoring into one seamless experience, helping investors make informed decisions with confidence." },
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

export default function NFOPage() {
  const [activeCat, setActiveCat] = useState<Category>("Equity")
  const [activeParam, setActiveParam] = useState(0)
  const [mobile, setMobile] = useState("")
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
            <span className="text-foreground font-semibold">NFO</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                New Fund Offers
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Discover &amp; Invest In<br />
                <span className="text-burgundy">New Fund Offers</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Discover New Opportunities. Invest Early. Build Your Portfolio With Confidence — with live NFO tracking, research, and a unified fund dashboard.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Explore NFOs
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

            {/* Hero visual — active NFOs card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Live NFOs Today</span>
                  <span className="text-[9px] font-bold text-muted-foreground">CLOSES</span>
                </div>
                {NFOS.Equity.slice(0, 3).map((f) => (
                  <div key={f.name} className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{f.name}</span>
                    <div className="text-right shrink-0">
                      <div className={`text-[10px] font-bold ${f.status === "Open" ? "text-profit" : "text-gold-deep"}`}>{f.status}</div>
                      <div className="text-[9px] text-muted-foreground font-semibold">{f.closes}</div>
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
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Everything You Need For NFO Investing.</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Discover and explore new fund offers, compare available options, invest with ease, and track your investments from one convenient platform.
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

          <div className="flex flex-wrap justify-center gap-2.5">
            {KEY_BENEFITS_1.map((b) => <CheckPill key={b} label={b} />)}
          </div>
        </div>
      </section>

      {/* ── EXPLORE NFO OPPORTUNITIES ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Explore NFO Opportunities</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Track New Investment Opportunities</h2>
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
                  {c.id} NFOs
                </button>
              )
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-8 -mt-2">
            {activeCatMeta.desc}
          </p>

          {/* NFO grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {NFOS[activeCat].map((f) => (
                <div
                  key={f.name}
                  className="bg-white border border-border rounded-[8px] p-4 hover:border-gold/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[10px] font-black"
                      style={{ background: activeCatMeta.color + "14", color: activeCatMeta.color, border: `1px solid ${activeCatMeta.color}22` }}
                    >
                      {f.name.split(" ").slice(1, 3).map((w) => w[0]).join("")}
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${f.status === "Open" ? "bg-profit/10 text-profit" : "bg-gold/15 text-gold-deep"}`}>
                      {f.status}
                    </span>
                  </div>
                  <div className="font-extrabold text-[12px] text-foreground leading-tight mb-2 line-clamp-2 min-h-[28px]">
                    {f.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground font-semibold">Min {f.min}</span>
                    <span className="text-[11px] font-bold text-foreground">Closes {f.closes}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-2.5">
            {WHY_EXPLORE.map((b) => <CheckPill key={b} label={b} />)}
          </div>
        </div>
      </section>

      {/* ── NFO RESEARCH & FUND DATA ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left — scrollable feature list */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">NFO Research</p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1] mb-4">
                Research<br />Before You Invest
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                Access essential fund details, compare offerings, and evaluate NFO opportunities with greater confidence and clarity.
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

            {/* Right — fund detail card */}
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
                      <span className="text-[10px] text-muted-foreground truncate">{RESEARCH_PARAMS[activeParam].title} · Varahi Flexicap Growth Fund</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
                    <span className="text-[13px] font-extrabold text-foreground">
                      Varahi Flexicap Growth Fund <span className="text-muted-foreground font-semibold">· Equity</span>
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-profit/10 text-profit">Open</span>
                  </div>

                  {/* Fund detail rows driven by activeParam */}
                  <div className="p-5 space-y-3.5">
                    {[
                      { l: "Fund Category",      v: "Equity · Flexicap" },
                      { l: "Risk Profile",       v: "Very High" },
                      { l: "Benchmark Index",    v: "Nifty 500 TRI" },
                      { l: "Fund Manager",       v: "A. Sharma, 14 Yrs" },
                      { l: "Subscription Dates", v: "18 Jun – 28 Jun" },
                      { l: "Minimum Investment", v: "₹500" },
                    ].map((row) => (
                      <div key={row.l} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0">
                        <span className="text-[11px] text-muted-foreground font-semibold">{row.l}</span>
                        <span className="text-[12px] font-bold text-foreground">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Asset allocation bar */}
                  <div className="px-5 pb-5 space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Asset Allocation</span>
                    <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-border/40">
                      <div className="bg-burgundy h-full" style={{ width: "80%" }} />
                      <div className="bg-gold h-full" style={{ width: "15%" }} />
                      <div className="bg-muted-foreground/40 h-full" style={{ width: "5%" }} />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-semibold text-muted-foreground">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-burgundy inline-block" />Equity 80%</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold inline-block" />Debt 15%</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" />Cash 5%</span>
                    </div>
                  </div>
                </div>

                {/* Phone mockup overlay */}
                <div className="hidden sm:block absolute -bottom-8 -right-5 w-36 rounded-[16px] border-[5px] border-foreground bg-white shadow-2xl overflow-hidden">
                  <div className="px-3 py-3 space-y-2.5">
                    <div>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Varahi Flexicap</p>
                      <p className="text-[13px] font-black text-foreground">
                        Min ₹500 <span className="text-profit text-[9px]">Open</span>
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-border/50">
                      {[
                        { l: "Category", v: "Equity" },
                        { l: "Risk", v: "Very High" },
                        { l: "Closes", v: "28 Jun" },
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

          <div className="flex flex-wrap justify-center gap-2.5 mt-12">
            {RESEARCH_ADVANTAGES.map((b) => <CheckPill key={b} label={b} />)}
          </div>
        </div>
      </section>

      {/* ── TRACK YOUR NFO INVESTMENTS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Track Your NFO Investments</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Monitor Investments Efficiently</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Track, monitor, and manage your NFO investments effortlessly through Shree Varahi&apos;s unified investment dashboard.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {TRACK_CARDS.map((c, i) => {
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

          <div className="flex flex-wrap justify-center gap-2.5">
            {WHY_TRACKING.map((b) => <CheckPill key={b} label={b} />)}
          </div>
        </div>
      </section>

      {/* ── WHY SHREE VARAHI ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Why Shree Varahi</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Built For Smarter NFO Investing</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Discover promising NFOs, access detailed research, invest seamlessly, and track progress through Shree Varahi&apos;s integrated platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {WHY_VARAHI.map((c, i) => {
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
                  <div className="w-10 h-10 rounded-[7px] bg-burgundy/10 border border-burgundy/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-burgundy" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{c.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {WHY_INVESTORS_CHOOSE.map((b) => <CheckPill key={b} label={b} />)}
          </div>

          <div className="max-w-3xl mx-auto bg-cream border border-gold/30 rounded-[12px] p-6 sm:p-8 text-center">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">The Shree Varahi Advantage</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you&apos;re exploring your first New Fund Offer or actively evaluating multiple opportunities, Shree Varahi provides the tools, information, and visibility needed to invest with confidence and stay informed throughout your investment journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ (2-column accordion grid — matches /etf, /commodity, /futures-options) ── */}
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
              Have questions about investing in NFOs at Shree Varahi? Review answers to our most popular inquiries.
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
                    <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
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
                Start Building Long-Term<br className="hidden sm:inline" /> Wealth Through Mutual Funds
              </h2>
              <p className="text-sm font-semibold text-white/85">
                Discover New Opportunities. Invest Early. Build Your Portfolio With Confidence Through Shree Varahi NFOs.
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

            {/* Right — phone mockup w/ NFO dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My NFOs</span>
                  <LayoutDashboard className="w-3.5 h-3.5 text-burgundy" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Total Invested</p>
                  <p className="text-base font-black text-foreground">₹1,25,000</p>
                  <p className="text-[10px] font-bold text-profit">4 Active Subscriptions</p>
                </div>
                {NFOS.Equity.slice(0, 3).map((f) => (
                  <div key={f.name} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{f.name}</span>
                    <span className={`text-[9px] font-bold shrink-0 ${f.status === "Open" ? "text-profit" : "text-gold-deep"}`}>{f.status}</span>
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

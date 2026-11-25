"use client"

import { useState } from "react"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Plus, X, Layers, Eye, FileSearch, GitCompare, MonitorSmartphone,
  Bookmark, LineChart, Lightbulb, TrendingUp, Landmark, Scale, Globe2, BarChart3,
  Target, UserCheck, Gauge, CalendarRange, Wallet, PieChart, ListChecks,
  Star, Check, LayoutDashboard, Bell, Activity, ArrowRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MobileInput } from "@/components/form-inputs"
import Link from "next/link"
import { CardGridSkeleton } from "@/components/skeletons"
import { useNfos } from "@/hooks/use-mutual-funds"
import type { NfoApi } from "@/lib/mutual-funds/api-client"

// ─── Data ───────────────────────────────────────────────────────────────────

const TOOLS = [
  { icon: TrendingUp,        color: "#8B0D19", title: "Active NFOs",       desc: "Explore and invest in currently open New Fund Offers (NFOs) to discover fresh opportunities for portfolio growth." },
  { icon: CalendarRange,     color: "#8B0D19", title: "Upcoming NFOs",     desc: "Stay updated on upcoming fund launches and subscription schedules so you never miss new investment opportunities." },
  { icon: FileSearch,        color: "#8B0D19", title: "NFO Research",      desc: "Review fund objectives, strategy, risk profile, and key details to make more informed investment decisions." },
  { icon: GitCompare,        color: "#8B0D19", title: "Fund Comparison",   desc: "Compare NFOs based on category, risk level, and investment strategy to choose the one that best fits your goals." },
  { icon: MonitorSmartphone, color: "#8B0D19", title: "Online Investment", desc: "Invest digitally through a simple, secure, and seamless process designed for a smooth investing experience." },
  { icon: Bookmark,          color: "#8B0D19", title: "Watchlists",        desc: "Save and monitor NFOs before investing to stay organized and never miss a promising opportunity." },
  { icon: LineChart,         color: "#8B0D19", title: "Fund Tracking",     desc: "Track your subscribed NFOs and investment status in real time to stay fully updated on your portfolio." },
  { icon: Lightbulb,         color: "#8B0D19", title: "Investment Insights", desc: "Access fund information, market trends, and research insights to make smarter and more confident investment decisions." },
]

const KEY_BENEFITS_1 = [
  "Discover Active & Upcoming NFOs", "Research Before Investing", "Easy NFO Comparison Tools",
  "Fully Digital Investment Process", "Personalized Watchlists", "Centralized Fund Tracking",
  "Research-Driven Decision Making", "Seamless Investment Experience",
]

const ALL = "All"

/** Icon for a Reedos NFO category (names are used as Reedos sends them). */
function categoryIcon(name: string): React.ElementType {
  const n = name.toLowerCase()
  if (/index/.test(n)) return BarChart3
  if (/etf/.test(n)) return LineChart
  if (/fof|overseas|international|global/.test(n)) return Globe2
  if (/hybrid|balanced|arbitrage|multi asset/.test(n)) return Scale
  if (/fmp|debt|bond|gilt|liquid|duration|money market|credit|income/.test(n)) return Landmark
  if (/sector|thematic/.test(n)) return Target
  return TrendingUp
}

const shortDate = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—"

const rupees = (v: number | null) => (v === null ? "—" : `₹${v.toLocaleString("en-IN")}`)

/** "Closes 17 Nov" for open offers, "Opens 20 Nov" for upcoming ones. */
const keyDate = (f: NfoApi) =>
  f.status === "Open" ? `Closes ${shortDate(f.closingDate)}` : `Opens ${shortDate(f.launchDate)}`

function AmcLogo({ nfo, size = "w-8 h-8" }: { nfo: NfoApi; size?: string }) {
  const [failed, setFailed] = useState(false)
  if (nfo.amcLogoUrl && !failed) {
    return (
      <div className={`${size} rounded-[6px] bg-white border border-border/60 flex items-center justify-center overflow-hidden shrink-0`}>
        <img src={nfo.amcLogoUrl} alt="" loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-contain p-0.5" />
      </div>
    )
  }
  return (
    <div className={`${size} rounded-[6px] flex items-center justify-center text-[10px] font-black bg-burgundy/10 text-burgundy border border-burgundy/15 shrink-0`}>
      {(nfo.amcName ?? nfo.name).slice(0, 2).toUpperCase()}
    </div>
  )
}

const statusClass = (s: NfoApi["status"]) => (s === "Open" ? "text-profit" : "text-gold-deep")

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
  const [activeCat, setActiveCat] = useState<string>(ALL)
  const [activeParam, setActiveParam] = useState(0)
  const [mobile, setMobile] = useState("")
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

  const nfoData = useNfos()
  const nfos = nfoData.data?.nfos ?? []
  const tabs = [{ name: ALL, count: nfos.length }, ...(nfoData.data?.categories ?? [])]
  const shown = activeCat === ALL ? nfos : nfos.filter((f) => (f.category ?? "Other") === activeCat)
  const featured = nfos[0] ?? null
  const nfoLoading = nfoData.loading && !nfoData.data
  const nfoStatus = nfoData.loading && !nfoData.data
    ? "Loading NFOs…"
    : nfoData.error && !nfoData.data
      ? <>Unable to load NFOs. <button onClick={nfoData.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : nfos.length === 0
        ? "No NFOs are open or upcoming right now. Please check back soon."
        : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO (compact) ── */}
      <section className="relative bg-cream border-b border-border/40 pt-24 pb-6 lg:pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[520px] h-[360px] bg-gold/10 rounded-full blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">NFO</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-5 lg:gap-12 items-center">
            <div className="space-y-3">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">New Fund Offers</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Discover &amp; Invest In <span className="text-burgundy lg:block">New Fund Offers</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Discover New Opportunities. Invest Early. Build Your Portfolio With Confidence, with live NFO tracking, research, and a unified fund dashboard.
              </p>
            </div>
            {/* Actions + trust stats on the right, so the hero stays short */}
            <div className="flex flex-wrap items-center lg:justify-end gap-3">
              <Button asChild className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px]">
                <a href="#explore-nfos">Explore NFOs</a>
              </Button>
              <Button asChild variant="outline" className="border-border bg-white px-6 h-10 font-bold rounded-[5px] hover:bg-secondary">
                <Link href={OPEN_ACCOUNT_URL}>Open Account</Link>
              </Button>
              <div className="flex items-center gap-4 sm:ml-3 sm:pl-5 sm:border-l border-border">
                <div>
                  <div className="text-base font-black text-foreground leading-none">31+</div>
                  <div className="text-[10px] text-muted-foreground font-semibold mt-1">Years of Trust</div>
                </div>
                <div>
                  <div className="text-base font-black text-foreground flex items-center gap-1 leading-none">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                  <div className="text-[10px] text-muted-foreground font-semibold mt-1">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE NFO OPPORTUNITIES ── */}
      <section id="explore-nfos" className="py-12 lg:py-16 bg-background border-t border-border/40 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Explore NFO Opportunities</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">Track New Investment Opportunities</h2>
            {nfoData.data && nfos.length > 0 && (
              <p className="text-sm text-muted-foreground mt-3">
                {nfoData.data.stats.open} open · {nfoData.data.stats.upcoming} upcoming
              </p>
            )}
          </div>

          {nfoLoading ? (
            <CardGridSkeleton count={6} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" cardClassName="h-44" />
          ) : nfoStatus ? (
            <div className="bg-white border border-border rounded-[8px] py-14 text-center text-sm text-muted-foreground mb-8">
              {nfoStatus}
            </div>
          ) : (
            <>
              {/* Category tabs — Reedos category names as sent */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tabs.map((c) => {
                  const Icon = c.name === ALL ? Layers : categoryIcon(c.name)
                  const active = activeCat === c.name
                  return (
                    <button
                      key={c.name}
                      onClick={() => setActiveCat(c.name)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-[6px] text-[12px] font-bold border transition-all duration-200 ${
                        active
                          ? "bg-burgundy text-white border-burgundy shadow-sm"
                          : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: active ? "#fff" : "#8B0D19" }} />
                      {c.name === ALL ? "All NFOs" : c.name}
                      <span className={`text-[10px] font-black ${active ? "text-white/80" : "text-muted-foreground/70"}`}>{c.count}</span>
                    </button>
                  )
                })}
              </div>

              {/* NFO grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
                >
                  {shown.map((f) => (
                    <div
                      key={f.schemeCode}
                      className="bg-white border border-border rounded-[8px] p-4 hover:border-gold/40 hover:shadow-sm transition-all duration-200 flex flex-col"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <AmcLogo nfo={f} />
                        <span className="text-[11px] font-bold text-foreground">Launch {shortDate(f.launchDate)}</span>
                      </div>
                      <div className="font-extrabold text-[12px] text-foreground leading-tight mb-1 line-clamp-2 min-h-[28px]" title={f.name}>
                        {f.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-semibold mb-3">
                        Face Value <span className="font-bold text-foreground">{rupees(f.faceValue)}</span>
                      </div>
                      <div className="mt-auto">
                      <div className="pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
                        <div className="min-w-0">
                          <div className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Min Invest</div>
                          <div className="text-[11px] font-bold text-foreground tabular-nums">{rupees(f.minInvestment)}</div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Min SIP</div>
                          <div className="text-[11px] font-bold text-foreground tabular-nums">{rupees(f.minSip)}</div>
                        </div>
                        <div className="min-w-0 text-right">
                          <div className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Closes</div>
                          <div className="text-[11px] font-bold text-foreground">{shortDate(f.closingDate)}</div>
                        </div>
                      </div>
                      {/* Invest Now */}
                      <Link
                        href={OPEN_ACCOUNT_URL}
                        aria-label={`Invest now in ${f.name}`}
                        className="mt-3 py-2 flex items-center justify-center gap-1.5 rounded-[6px] bg-burgundy text-white text-xs font-black transition-all duration-200 hover:bg-burgundy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                      >
                        Invest Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}

        </div>
      </section>

      {/* ── WHAT YOU CAN DO ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What You Can Do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Everything You Need For NFO Investing.</h2>
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


        </div>
      </section>

      {/* ── NFO RESEARCH & FUND DATA ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center [&>*]:min-w-0">
            {/* Left — scrollable feature list */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">NFO Research</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4">
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
                      <span className="text-[10px] text-muted-foreground truncate">
                        {RESEARCH_PARAMS[activeParam].title}{featured ? ` · ${featured.name}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border/40">
                    {featured ? (
                      <span className="flex items-center gap-2 min-w-0">
                        <AmcLogo nfo={featured} size="w-7 h-7" />
                        <span className="text-[13px] font-extrabold text-foreground truncate" title={featured.name}>{featured.name}</span>
                      </span>
                    ) : (
                      <span className="text-[13px] font-extrabold text-muted-foreground">{nfoStatus ?? "—"}</span>
                    )}
                    {featured && (
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${featured.status === "Open" ? "bg-profit/10 text-profit" : "bg-gold/15 text-gold-deep"}`}>
                        {featured.status}
                      </span>
                    )}
                  </div>

                  {/* Live details of the NFO closing soonest */}
                  <div className="p-5 space-y-3.5">
                    {[
                      { l: "Fund Category",      v: featured?.category ?? "—" },
                      { l: "Fund House",         v: featured?.amcName ?? "—" },
                      { l: "Subscription Dates", v: featured ? `${shortDate(featured.launchDate)} to ${shortDate(featured.closingDate)}` : "—" },
                      { l: "Face Value",         v: featured?.faceValue != null ? rupees(featured.faceValue) : "—" },
                      { l: "Minimum Investment", v: rupees(featured?.minInvestment ?? null) },
                      { l: "Minimum SIP",        v: featured ? (featured.minSip !== null ? rupees(featured.minSip) : "Not available") : "—" },
                    ].map((row) => (
                      <div key={row.l} className="flex items-center justify-between gap-4 border-b border-border/30 pb-3 last:border-0 last:pb-0">
                        <span className="text-[11px] text-muted-foreground font-semibold shrink-0">{row.l}</span>
                        <span className="text-[12px] font-bold text-foreground text-right">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone mockup overlay */}
                <div className="hidden sm:block absolute -bottom-8 -right-5 w-36 rounded-[16px] border-[5px] border-foreground bg-white shadow-2xl overflow-hidden">
                  <div className="px-3 py-3 space-y-2.5">
                    <div>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide truncate">{featured?.amcName ?? "NFO"}</p>
                      <p className="text-[13px] font-black text-foreground">
                        Min {rupees(featured?.minInvestment ?? null)}{" "}
                        {featured && <span className={`${statusClass(featured.status)} text-[9px]`}>{featured.status}</span>}
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-border/50">
                      {[
                        { l: "Category", v: featured?.category ?? "—" },
                        { l: "Opens", v: shortDate(featured?.launchDate ?? null) },
                        { l: "Closes", v: shortDate(featured?.closingDate ?? null) },
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

      {/* ── TRACK YOUR NFO INVESTMENTS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Track Your NFO Investments</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Monitor Investments Efficiently</h2>
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


        </div>
      </section>

      {/* ── WHY SHREE VARAHI ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Why Shree Varahi</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Built For Smarter NFO Investing</h2>
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
                    <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{c.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
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
                <MobileInput
                  required
                  aria-label="Mobile number"
                  value={mobile}
                  onValueChange={setMobile}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button type="submit" className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0">
                  Get Started
                </Button>
              </form>

              {/* Store badges */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
                <a
                  href="https://apps.apple.com/in/app/shree-varahi/id1475075572"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/35 border border-white/50 hover:bg-white/45 backdrop-blur-sm rounded-[8px] px-3.5 py-2 flex items-center gap-2 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                  </svg>
                  <span className="text-xs font-bold text-white">App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/search?q=shree%20varahi&c=apps&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/35 border border-white/50 hover:bg-white/45 backdrop-blur-sm rounded-[8px] px-3.5 py-2 flex items-center gap-2 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                  </svg>
                  <span className="text-xs font-bold text-white">Google Play</span>
                </a>
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] select-none items-center justify-center">
              <img
                src="/mobile-trading-app.png"
                alt="Shree Varahi Mobile App"
                className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                draggable={false}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

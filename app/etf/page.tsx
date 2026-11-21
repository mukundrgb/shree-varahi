"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft, ChevronRight, TrendingDown, Plus, X, Layers, Repeat, Eye, LayoutDashboard, FileSearch, Zap,
  Activity, PieChart, Coins, Landmark, Globe,
  LineChart, Percent, ListChecks, TrendingUp, BarChart3,
  Star, ArrowUp, ArrowDown, ArrowUpDown, ArrowUpRight, Search,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEtfList } from "@/hooks/etf/use-etf"
import type { EtfListRow } from "@/lib/etf/types"
import { formatPrice } from "@/lib/stocks/format"
import { TableRowsSkeleton } from "@/components/skeletons"

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

type Category = "Equity" | "Commodity" | "Debt" | "Global"

const CATEGORIES: { id: Category; label: string; icon: React.ElementType; color: string; desc: string }[] = [
  { id: "Equity",    label: "Equity ETFs",    icon: BarChart3, color: "#8B0D19", desc: "Track benchmark indices and market sectors to gain diversified exposure to Indian equities." },
  { id: "Commodity", label: "Commodity ETFs", icon: Coins,     color: "#8B0D19", desc: "Invest in gold and silver digitally through easy-to-access Commodity ETFs." },
  { id: "Debt",      label: "Debt ETFs",      icon: Landmark,  color: "#8B0D19", desc: "Invest in bonds and debt securities to earn stable returns and diversify your portfolio." },
  { id: "Global",    label: "Global ETFs",    icon: Globe,     color: "#8B0D19", desc: "Get exposure to companies and economies around the world through a single investment." },
]

// ETF rows come from the backend (/api/v1/etfs), grouped by category tab.
type EtfCard = {
  slug: string; symbol: string; name: string
  /** Formatted for display */
  price: string
  /** Raw price, for sorting */
  priceValue: number | null
  changeAmt: number | null; change: number | null
}

/** Sortable columns of the category table; arrow up = highest → lowest. */
type EtfSortCol = "priceValue" | "changeAmt" | "change"
const ETF_SORT_COLS: { key: EtfSortCol; label: string }[] = [
  { key: "priceValue", label: "Price (₹)" },
  { key: "changeAmt",  label: "Change" },
  { key: "change",     label: "% Change" },
]
/** Default: highest price first. */
const DEFAULT_ETF_SORT = { key: "priceValue" as EtfSortCol, order: "desc" as "asc" | "desc" }

const CARD_CATEGORIES = ["Equity", "Commodity", "Debt", "Global"] as const

/** Rows per page in the category table. */
const ETFS_PER_PAGE = 10

function toCards(rows: EtfListRow[]): Record<Category, EtfCard[]> {
  const cards = Object.fromEntries(CARD_CATEGORIES.map((c) => [c, [] as EtfCard[]])) as Record<Category, EtfCard[]>
  for (const etf of rows) {
    cards[etf.category as Category]?.push({
      slug: etf.slug,
      symbol: etf.symbol,
      name: etf.name,
      price: formatPrice(etf.price),
      priceValue: etf.price,
      changeAmt: etf.changeAmt,
      change: etf.changePct,
    })
  }
  return cards
}

/** Shown in the decorative previews until the ETF list has loaded. */
const PLACEHOLDER_CARD: EtfCard = { slug: "", symbol: "", name: "Nifty 50 ETF", price: "—", priceValue: null, changeAmt: null, change: null }

const changeText = (value: number | null) => (value === null ? "—" : `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`)
const changeClass = (value: number | null) =>
  value === null ? "text-muted-foreground" : value >= 0 ? "text-profit" : "text-loss"

// Items with an href open that research page; the rest only switch the preview on the right.
const RESEARCH_PARAMS: { icon: React.ElementType; title: string; desc: string; href?: string }[] = [
  { icon: LineChart,   title: "ETF Price",            href: "/etf/compare?sort=price",    desc: "Track real-time ETF prices and market movements to stay updated on current valuations and trading activity." },
  { icon: Landmark,    title: "AUM",                   href: "/etf/compare?sort=aum",      desc: "Analyze Assets Under Management (AUM) to understand the size, scale, and investor participation within an ETF." },
  { icon: Percent,     title: "Expense Ratio",         href: "/etf/compare?sort=expense",  desc: "Compare expense ratios across ETFs to evaluate fund costs and their potential impact on long-term investment returns." },
  { icon: ListChecks,  title: "Holdings",              href: "/etf/holdings",              desc: "Review the underlying securities held within an ETF to understand portfolio composition and investment exposure." },
  { icon: TrendingUp,  title: "Returns",               href: "/etf/compare?sort=return1Y", desc: "Evaluate historical returns across different time periods to assess past performance and investment consistency." },
  { icon: PieChart,    title: "Sector Allocation",     href: "/etf/sector-allocation",     desc: "Examine sector-wise distribution to understand which industries contribute most to the ETF's overall portfolio." },
  { icon: Layers,      title: "Asset Allocation",      href: "/etf/asset-allocation",      desc: "Review the allocation of assets across equities, commodities, debt instruments, or other investment categories depending on the ETF type." },
]

const FAQS = [
  { q: "What are ETFs?", a: "Exchange Traded Funds (ETFs) are investment instruments that track an index, commodity, sector, or basket of assets and trade on stock exchanges like regular stocks. ETFs offer diversification, transparency, and flexibility while allowing investors to buy and sell units during market hours." },
  { q: "Which ETF categories are available?", a: "Shree Varahi provides access to multiple ETF categories, including Equity ETFs, Commodity ETFs, Debt ETFs, and Global ETFs. Investors can choose categories based on their financial goals, risk appetite, and investment preferences." },
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
  const router = useRouter()
  /** "All" = every category together. */
  const [activeCat, setActiveCat]     = useState<Category | "All">("All")
  const [etfSearch, setEtfSearch]     = useState("")
  const [mobile, setMobile]           = useState("")
  const [activeParam, setActiveParam] = useState(0)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const activeCatMeta = CATEGORIES.find((c) => c.id === activeCat) ?? null

  const etfList = useEtfList()
  const ETFS = useMemo(() => toCards(etfList.data?.items ?? []), [etfList.data])
  const allEtfs = useMemo(() => CARD_CATEGORIES.flatMap((c) => ETFS[c]), [ETFS])
  const lead = ETFS.Equity[0] ?? PLACEHOLDER_CARD

  // Category table: 10 rows per page; switching category goes back to page 1.
  const [etfPage, setEtfPage] = useState(1)
  const [etfSort, setEtfSort] = useState(DEFAULT_ETF_SORT)
  // Rows with no value always go last, whichever way the column is sorted.
  const catRows = useMemo(() => {
    const dir = etfSort.order === "desc" ? -1 : 1
    const q = etfSearch.trim().toLowerCase()
    const source = activeCat === "All" ? allEtfs : ETFS[activeCat]
    const matches = q ? source.filter((e) => e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q)) : source
    return [...matches].sort((a, b) => {
      const x = a[etfSort.key], y = b[etfSort.key]
      if (x === null) return y === null ? 0 : 1
      if (y === null) return -1
      return dir * (x - y)
    })
  }, [ETFS, allEtfs, activeCat, etfSort, etfSearch])
  // First click on a column: highest first (arrow up); next click: lowest first (arrow down).
  const sortEtfs = (key: EtfSortCol) => {
    setEtfSort((s) => (s.key === key ? { key, order: s.order === "desc" ? "asc" : "desc" } : { key, order: "desc" }))
    setEtfPage(1)
  }
  const etfTotalPages = Math.max(1, Math.ceil(catRows.length / ETFS_PER_PAGE))
  const etfPageRows = catRows.slice((etfPage - 1) * ETFS_PER_PAGE, etfPage * ETFS_PER_PAGE)
  const pickCategory = (c: Category | "All") => { setActiveCat(c); setEtfPage(1) }
  /** Hero shortcuts: pick the category, then jump to the table. */
  const browseCategory = (c: Category) => {
    pickCategory(c)
    document.getElementById("etf-table")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO (compact: pitch on the left, browse-by-category on the right) ── */}
      <section className="relative bg-cream border-b border-border/40 pt-24 pb-8 lg:pb-10 overflow-hidden">
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
            <span className="text-foreground font-semibold">ETF</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-12 items-center">
            <div className="space-y-4">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Exchange Traded Funds</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Invest In ETFs With <span className="text-burgundy lg:block">Simplicity &amp; Flexibility</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Access a wide range of ETFs through Shree Varahi and diversify your investments more easily and flexibly.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px]">
                  Start Trading
                </Button>
                <Button variant="outline" className="border-border bg-white px-6 h-10 font-bold rounded-[5px] hover:bg-secondary">
                  Open Account
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

            {/* Browse by category: each opens the table below on that category */}
            <div className="rounded-[10px] bg-white border border-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-2.5">Browse by category</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon
                  return (
                    <button
                      key={c.id}
                      onClick={() => browseCategory(c.id)}
                      className="group text-left rounded-[6px] border border-border bg-cream/50 px-3 py-2.5 hover:border-burgundy/30 hover:bg-white transition-all flex items-center gap-2.5"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-burgundy" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-extrabold text-foreground truncate">{c.label}</span>
                        <span className="block text-[10px] font-semibold text-muted-foreground tabular-nums">
                          {etfList.data ? `${ETFS[c.id].length} ETFs` : "—"}
                        </span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 shrink-0 text-muted-foreground group-hover:text-burgundy transition-colors" />
                    </button>
                  )
                })}
              </div>
              <Link
                href="/etf/compare"
                className="mt-3 flex items-center gap-3 rounded-[6px] bg-burgundy/[0.06] border border-burgundy/15 px-3 py-2.5 hover:bg-burgundy/10 transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-burgundy shrink-0" />
                <span className="text-[11px] text-foreground font-extrabold">Compare ETFs by cost, AUM &amp; returns</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-burgundy ml-auto shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE ETF CATEGORIES: filter sidebar + table ── (navbar "ETF Screener" links here) */}
      <section id="etf-table" className="py-6 lg:py-8 bg-background scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5 lg:gap-6 items-start">

          {/* Filters */}
          <aside className="lg:sticky lg:top-20 rounded-[8px] border border-border bg-white p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                aria-label="Search ETFs"
                placeholder="Search ETFs..."
                value={etfSearch}
                onChange={(e) => { setEtfSearch(e.target.value); setEtfPage(1) }}
                className="w-full pl-9 pr-8 py-2 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
              />
              {etfSearch && (
                <button onClick={() => { setEtfSearch(""); setEtfPage(1) }} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Category</p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                {[{ id: "All" as const, label: "All ETFs", icon: Layers }, ...CATEGORIES].map((c) => {
                  const Icon = c.icon
                  const active = activeCat === c.id
                  const count = c.id === "All" ? allEtfs.length : ETFS[c.id].length
                  return (
                    <button
                      key={c.id}
                      onClick={() => pickCategory(c.id)}
                      aria-pressed={active}
                      className={`w-full text-left px-2.5 py-2 rounded-[5px] text-[12px] font-semibold transition-colors flex items-center gap-2 ${
                        active ? "bg-burgundy/[0.07] text-burgundy font-bold" : "text-muted-foreground hover:bg-cream hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="flex-1 truncate">{c.label}</span>
                      {etfList.data && <span className={`text-[10px] tabular-nums ${active ? "text-burgundy/70" : "text-muted-foreground/70"}`}>{count}</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {activeCatMeta && (
              <p className="hidden lg:block text-[11px] text-muted-foreground leading-relaxed pt-3 border-t border-border/60">
                {activeCatMeta.desc}
              </p>
            )}
          </aside>

          {/* Results */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">
                  {activeCatMeta ? activeCatMeta.label : "All ETFs"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5">
                  <span className="font-bold text-foreground">{etfList.data ? catRows.length : "—"}</span> ETFs
                  {etfSearch.trim() && <> matching <span className="font-semibold text-foreground">“{etfSearch.trim()}”</span></>}
                </p>
              </div>
              {(activeCat !== "All" || etfSearch) && (
                <button
                  onClick={() => { pickCategory("All"); setEtfSearch("") }}
                  className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>

          {/* ETF table — same style as the All Stocks table, 10 rows per page */}
          <div>
            <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1fr)_84px_64px_72px] sm:grid-cols-[minmax(0,1fr)_120px_110px_100px] gap-x-2 px-4 py-2.5 border-b border-border bg-cream/70">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Name</div>
                {ETF_SORT_COLS.map((c) => {
                  const active = etfSort.key === c.key
                  const Icon = !active ? ArrowUpDown : etfSort.order === "desc" ? ArrowUp : ArrowDown
                  return (
                    <button key={c.key} type="button" onClick={() => sortEtfs(c.key)}
                      aria-label={`Sort by ${c.label}${active ? (etfSort.order === "desc" ? ", highest first" : ", lowest first") : ""}`}
                      className={`flex items-center justify-end gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${active ? "text-burgundy" : "text-muted-foreground hover:text-foreground"}`}>
                      <span className="truncate">{c.label}</span> <Icon className={`w-3 h-3 shrink-0 ${active ? "" : "opacity-50"}`} />
                    </button>
                  )
                })}
              </div>

              {/* Rows */}
              {etfList.error && !etfList.data ? (
                <div className="py-16 text-center text-sm">
                  <p className="font-black text-foreground">Unable to load ETFs</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{etfList.error.message}</p>
                  <button onClick={etfList.retry} className="mt-3 text-xs font-bold text-burgundy hover:underline">Try again</button>
                </div>
              ) : !etfList.data ? (
                <TableRowsSkeleton rows={ETFS_PER_PAGE} columns="minmax(0,1fr) 84px 64px 72px" avatar label="Loading ETFs" />
              ) : etfPageRows.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground text-sm">No ETFs in this category yet.</div>
              ) : (
                etfPageRows.map((etf, idx) => {
                  const up = (etf.change ?? 0) >= 0
                  const sign = etf.change !== null && up ? "+" : ""
                  return (
                    <motion.div
                      key={`${activeCat}-${etf.slug}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.14, delay: idx * 0.018 }}
                      className="border-b border-border/40 last:border-0"
                    >
                      <Link
                        href={`/etf/${etf.slug}`}
                        className="grid grid-cols-[minmax(0,1fr)_84px_64px_72px] sm:grid-cols-[minmax(0,1fr)_120px_110px_100px] gap-x-2 px-4 py-3 hover:bg-cream/30 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="hidden sm:flex w-8 h-8 shrink-0 rounded-[6px] items-center justify-center text-[10px] font-black"
                            style={{ background: "#8B0D1914", color: "#8B0D19", border: "1px solid #8B0D1922" }}
                          >
                            {etf.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold text-sm text-foreground truncate">{etf.name}</div>
                            {etf.symbol && etf.symbol !== etf.name && (
                              <div className="text-[11px] text-muted-foreground truncate">{etf.symbol}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-end text-sm font-extrabold text-foreground tabular-nums">
                          {etf.price}
                        </div>
                        <div className={`flex items-center justify-end text-xs font-black tabular-nums ${changeClass(etf.change)}`}>
                          {etf.changeAmt === null ? "—" : `${sign}${etf.changeAmt.toFixed(2)}`}
                        </div>
                        <div className={`flex items-center justify-end gap-0.5 text-xs font-black tabular-nums ${changeClass(etf.change)}`}>
                          {etf.change !== null && (up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />)}
                          {changeText(etf.change)}
                        </div>
                      </Link>
                    </motion.div>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {etfTotalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">
                  Page {etfPage} of {etfTotalPages}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEtfPage((p) => Math.max(1, p - 1))}
                    disabled={etfPage === 1}
                    aria-label="Previous page"
                    className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, etfTotalPages) }, (_, i) => {
                    const pg = Math.max(1, Math.min(etfTotalPages - 4, etfPage - 2)) + i
                    return (
                      <button
                        key={pg}
                        onClick={() => setEtfPage(pg)}
                        className={`w-8 h-8 rounded-[5px] border text-xs font-bold transition-all ${
                          pg === etfPage
                            ? "bg-burgundy text-white border-burgundy"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                        }`}
                      >
                        {pg}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setEtfPage((p) => Math.min(etfTotalPages, p + 1))}
                    disabled={etfPage === etfTotalPages}
                    aria-label="Next page"
                    className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>


          </div>
          </div>
        </div>
      </section>

      {/* ── ETF DATA & RESEARCH ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left — scrollable feature list */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-3">ETF Research</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4">
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
                      onClick={() => { setActiveParam(i); if (p.href) router.push(p.href) }}
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
                      <span className="text-[10px] text-muted-foreground truncate">{RESEARCH_PARAMS[activeParam].title} · {lead.name}</span>
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
                      {lead.name} <span className="text-muted-foreground font-semibold">· NSE</span>
                    </span>
                    <span className={`text-[12px] font-black ${changeClass(lead.change)}`}>
                      ₹{lead.price} <span className="text-[10px] font-bold">({changeText(lead.change)})</span>
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
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">{lead.name}</p>
                      <p className="text-[13px] font-black text-foreground">
                        ₹{lead.price} <span className={`text-[9px] ${changeClass(lead.change)}`}>{changeText(lead.change)}</span>
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

      {/* ── WHAT YOU CAN DO ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What You Can Do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Every tool you need to invest in ETFs.</h2>
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

      {/* ── FAQ (2-column accordion grid — matches /futures-options) ── */}
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
                    <a
                      href="https://apps.apple.com/in/app/shree-varahi/id1475075572"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">App Store</span>
                    </a>
                    <a
                      href="https://play.google.com/store/search?q=shree%20varahi&c=apps&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all"
                    >
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
                {ETFS.Equity.slice(0, 3).map((etf) => (
                  <div key={etf.name} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{etf.name}</span>
                    <span className={`text-[9px] font-bold shrink-0 ${changeClass(etf.change)}`}>{changeText(etf.change)}</span>
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

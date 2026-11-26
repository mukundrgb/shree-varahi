"use client"

import { useState, useEffect } from "react"
import { LOGIN_URL, OPEN_ACCOUNT_URL } from "@/lib/external-links"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TableRowsSkeleton } from "@/components/skeletons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmartSearch } from "@/components/smart-controls"
import { Button } from "@/components/ui/button"
import { MobileInput } from "@/components/form-inputs"
import { useFnoCards } from "@/hooks/use-fno"
import { fnoDetailHref, type FnoCategory } from "@/lib/fno/api-client"
import { 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Plus,
  X,
  Percent,
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  LineChart, 
  Layers, 
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Check,
  Search,
  Activity,
  Smartphone,
  Sparkles,
  Star,
  ArrowUpRight
} from "lucide-react"

const MotionLink = motion.create(Link)

type MarketsTabKey = "Index Future" | "Stocks Future" | "Index Option" | "Stock Option"

/** The four F&O segments: hero shortcuts, sidebar list and table title. */
const MARKET_SEGMENTS: { tab: MarketsTabKey; label: string; unit: string; icon: React.ElementType }[] = [
  { tab: "Index Future",  label: "Index Futures",  unit: "indices", icon: Activity   },
  { tab: "Stocks Future", label: "Stock Futures",  unit: "stocks",  icon: TrendingUp },
  { tab: "Index Option",  label: "Index Options",  unit: "indices", icon: Layers     },
  { tab: "Stock Option",  label: "Stock Options",  unit: "stocks",  icon: LineChart  },
]

// ── CUSTOM BG GLOW GRAPHICS ──
function ElegantBgGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.05]">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #B8924A 1px, transparent 1px), linear-gradient(to bottom, #B8924A 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
    </div>
  )
}

export default function FuturesOptionsPage() {
  // ── 3. BENTO INTERACTIVE PAYOFF STRATEGY ──
  const [bentoPayoffStrategy, setBentoPayoffStrategy] = useState<"call" | "spread">("call")

  // ── 4. BENTO LEVERAGE ──
  const [bentoLeverage, setBentoLeverage] = useState(3)

  // ── 5. OPTIONS vs FUTURES WORKSPACE ──
  const [workspaceTab, setWorkspaceTab] = useState<"options" | "futures">("options")
  const [hoveredGreekStrike, setHoveredGreekStrike] = useState<number | null>(23400)
  
  const strikePivot = hoveredGreekStrike || 23400

  // Futures Calculator State
  const [futuresLots, setFuturesLots] = useState(3)
  const [futuresPriceInput, setFuturesPriceInput] = useState(23400)
  const [selectedAsset, setSelectedAsset] = useState<"NIFTY" | "GOLD" | "RELIANCE">("NIFTY")

  const getLotDetails = () => {
    switch (selectedAsset) {
      case "GOLD": return { size: 100 }
      case "RELIANCE": return { size: 250 }
      default: return { size: 50 }
    }
  }

  const lotDetails = getLotDetails()
  const futuresContractVal = futuresLots * lotDetails.size * futuresPriceInput
  const initialMargin = Math.round(futuresContractVal * 0.12)
  const exposureMargin = Math.round(futuresContractVal * 0.02)
  const totalMargin = initialMargin + exposureMargin

  // Risk Needle Angle Math (-90 to +90 degrees)
  const maxRiskCapital = 2500000
  const riskFraction = Math.min(totalMargin / maxRiskCapital, 1)
  const needleRotation = -90 + (riskFraction * 180)

  // ── 6. TIMELINE STEP STATE ──
  const [activeStep, setActiveStep] = useState(0)

  // ── 7. PRICING & SAVINGS CALCULATOR STATE ──
  const [tradesPerMonth, setTradesPerMonth] = useState(60)
  const traditionalCost = tradesPerMonth * 12 * 20
  const varahiCost = tradesPerMonth * 12 * 17
  const annualSavings = traditionalCost - varahiCost

  // ── 8. FAQ STATE ──
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

  // ── 10. MARKETS TAB STATE ──
  const [marketsTab, setMarketsTab] = useState<MarketsTabKey>("Index Future")
  const [marketsPage, setMarketsPage] = useState(1)
  const MARKETS_PER_PAGE = 10

  const MARKET_CATEGORY: Record<MarketsTabKey, FnoCategory> = {
    "Index Future": "index-futures",
    "Stocks Future": "stock-futures",
    "Index Option": "index-options",
    "Stock Option": "stock-options",
  }
  const marketCategory = MARKET_CATEGORY[marketsTab]
  // Sidebar search: sent to the backend (?search=) once typing pauses.
  const [marketsSearch, setMarketsSearch] = useState("")
  const [marketsQuery, setMarketsQuery] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => { setMarketsQuery(marketsSearch.trim()); setMarketsPage(1) }, 300)
    return () => clearTimeout(timer)
  }, [marketsSearch])
  const markets = useFnoCards(marketCategory, { page: marketsPage, limit: MARKETS_PER_PAGE, search: marketsQuery || undefined })
  // Contract count per segment for the hero tiles and the sidebar (one 1-row request each).
  const segmentCounts: Record<MarketsTabKey, number | null> = {
    "Index Future":  useFnoCards("index-futures", { limit: 1 }).data?.total ?? null,
    "Stocks Future": useFnoCards("stock-futures", { limit: 1 }).data?.total ?? null,
    "Index Option":  useFnoCards("index-options", { limit: 1 }).data?.total ?? null,
    "Stock Option":  useFnoCards("stock-options", { limit: 1 }).data?.total ?? null,
  }
  // Ignore a response left over from the previous tab or page while the new one loads.
  const marketsData =
    markets.data?.category === marketCategory && markets.data.page === marketsPage ? markets.data : null
  const marketRows = marketsData?.items ?? []
  // Keep the page count from the same tab so the pagination doesn't flicker while a page loads.
  const marketsTotalPages = markets.data?.category === marketCategory ? markets.data.totalPages : 1
  const pickMarketsTab = (tab: MarketsTabKey) => { setMarketsTab(tab); setMarketsPage(1) }

  // ── 9. SMS CTA STATE ──
  const [smsNum, setSmsNum] = useState("")
  const [smsStatus, setSmsStatus] = useState<"idle" | "sending" | "sent">("idle")

  const triggerSms = (e: React.FormEvent) => {
    e.preventDefault()
    if (!smsNum || smsStatus !== "idle") return
    setSmsStatus("sending")
    setTimeout(() => {
      setSmsStatus("sent")
      setTimeout(() => {
        setSmsStatus("idle")
        setSmsNum("")
      }, 4000)
    }, 1000)
  }


  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── SECTION 1: HERO (compact: pitch on the left, actions + trust stats on the right) ── */}
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
            <span className="text-foreground font-semibold">Futures &amp; Options</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-5 lg:gap-12 items-center">
            <div className="space-y-3">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Derivatives Trading</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Trade Futures &amp; Options <span className="text-burgundy lg:block">With Advanced F&amp;O Tools</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Trade Futures &amp; Options confidently with Shree Varahi’s advanced platform, featuring strategy tools, real-time monitoring, market analysis, and effective risk management capabilities.
              </p>
            </div>
            {/* Actions + trust stats on the right (the old browse card is gone, so the hero is shorter) */}
            <div className="flex flex-wrap items-center lg:justify-end gap-3">
              <Button asChild className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px]">
                <Link href={OPEN_ACCOUNT_URL}>Start Trading <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-border bg-white px-6 h-10 font-bold rounded-[5px] hover:bg-secondary">
                <Link href={LOGIN_URL}>Login</Link>
              </Button>
              <div className="flex items-center gap-4 sm:ml-3 sm:pl-5 sm:border-l border-border">
                <div>
                  <div className="text-base font-black text-foreground leading-none">3</div>
                  <div className="text-[10px] text-muted-foreground font-semibold mt-1">Decades of Trust</div>
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

      {/* ── SECTION 3: MARKETS — filter sidebar + table ── (navbar "F&O Screener" links here) */}
      <section id="fno-markets" className="bg-background py-6 lg:py-8 border-b border-border/50 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5 lg:gap-6 items-start">

          {/* Filters */}
          {/* Desktop sidebar; phones get search + a swipeable segment row above the table */}
          <aside className="hidden lg:block lg:sticky lg:top-20 rounded-[8px] border border-border bg-white p-4 space-y-4">
            <SmartSearch value={marketsSearch} onChange={setMarketsSearch} placeholder="Search NIFTY, RELIANCE…" ariaLabel="Search contracts" shortcut />

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Segment</p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                {MARKET_SEGMENTS.map((seg) => {
                  const Icon = seg.icon
                  const active = marketsTab === seg.tab
                  const count = segmentCounts[seg.tab]
                  return (
                    <button
                      key={seg.tab}
                      onClick={() => pickMarketsTab(seg.tab)}
                      aria-pressed={active}
                      className={`w-full text-left px-2.5 py-2 rounded-[5px] text-[12px] font-semibold transition-colors flex items-center gap-2 ${
                        active ? "bg-burgundy/[0.07] text-burgundy font-bold" : "text-muted-foreground hover:bg-cream hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="flex-1 truncate">{seg.label}</span>
                      {count !== null && <span className={`text-[10px] tabular-nums ${active ? "text-burgundy/70" : "text-muted-foreground/70"}`}>{count}</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0">
          <div className="lg:hidden space-y-3 mb-4">
            <SmartSearch value={marketsSearch} onChange={setMarketsSearch} placeholder="Search NIFTY, RELIANCE…" ariaLabel="Search contracts" />
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1" style={{ scrollbarWidth: "none" }} role="tablist" aria-label="Segment">
              {MARKET_SEGMENTS.map((seg) => {
                const count = segmentCounts[seg.tab]
                return (
                  <button key={seg.tab} role="tab" aria-selected={marketsTab === seg.tab} onClick={() => pickMarketsTab(seg.tab)}
                  className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-bold whitespace-nowrap transition-colors ${
                    marketsTab === seg.tab ? "bg-burgundy text-white border-burgundy" : "bg-white text-foreground border-border"
                  }`}>
                    {seg.label}
                    {count !== null && <span className="text-[10px] opacity-70 tabular-nums">{count}</span>}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">
                {MARKET_SEGMENTS.find((s) => s.tab === marketsTab)?.label}
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                <span className="font-bold text-foreground">{marketsData ? marketsData.total : "—"}</span> underlyings
                {marketsQuery && <> matching <span className="font-semibold text-foreground">“{marketsQuery}”</span></>}
              </p>
            </div>
            {marketsSearch && (
              <button
                onClick={() => setMarketsSearch("")}
                className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear search
              </button>
            )}
          </div>

          {/* Markets table — same style as the All Stocks table; each row opens its detail page. */}
          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div
              className="grid grid-cols-[minmax(0,1fr)_88px_78px] sm:grid-cols-[minmax(0,1fr)_120px_110px_100px] gap-x-2 px-4 py-2.5 border-b border-border bg-cream/70"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Name</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Price (₹)</div>
              <div className="hidden sm:block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Change</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">% Change</div>
            </div>

            {/* Rows */}
            {markets.error && !marketsData ? (
              <div className="py-16 text-center text-sm">
                <p className="font-black text-foreground">Unable to load prices</p>
                <p className="text-xs text-muted-foreground mt-1.5">{markets.error.message}</p>
                <button onClick={markets.retry} className="mt-3 text-xs font-bold text-burgundy hover:underline">Try again</button>
              </div>
            ) : !marketsData ? (
              <TableRowsSkeleton rows={MARKETS_PER_PAGE} columns="minmax(0,1fr) 88px 78px" label="Loading prices" />
            ) : marketRows.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground text-sm">No contracts available.</div>
            ) : (
              marketRows.map((row, idx) => {
                const hasChange = row.change !== null && row.changePct !== null
                const up = (row.change ?? 0) >= 0
                const tone = !hasChange ? "text-muted-foreground" : up ? "text-profit" : "text-loss"
                const sign = hasChange && up ? "+" : ""
                return (
                  <MotionLink
                    href={fnoDetailHref(marketCategory, row.slug)}
                    key={`${marketCategory}-${row.symbol}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.14, delay: idx * 0.018 }}
                    className="grid grid-cols-[minmax(0,1fr)_88px_78px] sm:grid-cols-[minmax(0,1fr)_120px_110px_100px] gap-x-2 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {row.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.logoUrl} alt="" className="hidden sm:block w-8 h-8 shrink-0 rounded-[6px] object-contain bg-white" loading="lazy" />
                      ) : (
                        <div className="hidden sm:flex w-8 h-8 shrink-0 rounded-[6px] bg-burgundy/10 text-burgundy items-center justify-center text-[10px] font-black">
                          {row.symbol.slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-extrabold text-[13px] sm:text-sm text-foreground leading-snug line-clamp-2 sm:line-clamp-none sm:truncate">{row.name}</div>
                        {row.symbol !== row.name && (
                          <div className="text-[11px] text-muted-foreground truncate">{row.symbol}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end text-sm font-extrabold text-foreground tabular-nums">
                      {row.ltp === null ? "—" : row.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`hidden sm:flex items-center justify-end text-xs font-black tabular-nums ${tone}`}>
                      {row.change === null ? "—" : `${sign}${row.change.toFixed(2)}`}
                    </div>
                    <div className={`flex items-center justify-end gap-0.5 text-xs font-black tabular-nums ${tone}`}>
                      {hasChange && (up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />)}
                      {row.changePct === null ? "—" : `${sign}${row.changePct.toFixed(2)}%`}
                    </div>
                  </MotionLink>
                )
              })
            )}
          </div>

          {/* Pagination */}
          {marketsTotalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Page {marketsPage} of {marketsTotalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMarketsPage((p) => Math.max(1, p - 1))}
                  disabled={marketsPage === 1}
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, marketsTotalPages) }, (_, i) => {
                  const pg = Math.max(1, Math.min(marketsTotalPages - 4, marketsPage - 2)) + i
                  return (
                    <button
                      key={pg}
                      onClick={() => setMarketsPage(pg)}
                      className={`w-8 h-8 rounded-[5px] border text-xs font-bold transition-all ${
                        pg === marketsPage
                          ? "bg-burgundy text-white border-burgundy"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      {pg}
                    </button>
                  )
                })}
                <button
                  onClick={() => setMarketsPage((p) => Math.min(marketsTotalPages, p + 1))}
                  disabled={marketsPage === marketsTotalPages}
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
      </section>



      {/* ── SECTION 2: BENTO GRID FEATURE SHOWCASE ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Trading Suite
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Built for the F&amp;O trader who <span className="text-burgundy">analyse, strategise, and execute.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Trade with confidence using simple F&amp;O tools designed for market analysis, strategy creation, quick execution, and easy position tracking
            </p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            
            {/* Card 1: Options Trading (Large Bento) */}
            <div className="col-span-12 lg:col-span-8 bg-cream border border-border/80 rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-8 hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-burgundy/10 flex items-center justify-center mb-5 border border-burgundy/10">
                    <Layers className="h-5 w-5 text-[#8B0D19]" />
                  </div>
                  <h3 className="font-extrabold text-xl text-foreground tracking-tight mb-2">Options Trading</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Buy and sell Call and Put options on supported stocks and indices, and trade quickly and confidently as the market moves up or down.
                  </p>
                </div>
                {/* Toggles */}
                <div className="flex bg-white/80 p-1 border border-border/80 rounded-[6px] w-fit font-sans">
                  <button 
                    onClick={() => setBentoPayoffStrategy("call")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all ${bentoPayoffStrategy === "call" ? "bg-burgundy text-white" : "text-muted-foreground"}`}
                  >
                    Long Call
                  </button>
                  <button 
                    onClick={() => setBentoPayoffStrategy("spread")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all ${bentoPayoffStrategy === "spread" ? "bg-burgundy text-white" : "text-muted-foreground"}`}
                  >
                    Bull Spread
                  </button>
                </div>
              </div>

              {/* Graphic payload preview */}
              <div className="flex-1 bg-white border border-border/85 rounded-xl p-4 flex flex-col justify-between font-mono text-[10px] text-slate-500 min-h-[190px]">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider">Strategy Payoff Visual</span>
                  <span className="font-bold text-profit">Max Profit: Unlimited</span>
                </div>
                <div className="h-28 w-full relative flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    <line x1="0" y1="40" x2="200" y2="40" stroke="#CCCCCC" strokeDasharray="3 3" strokeWidth="1" />
                    
                    {bentoPayoffStrategy === "call" ? (
                      <>
                        <path d="M 0 60 L 100 60 L 100 40 L 0 40 Z" fill="#DC2626" opacity="0.08" />
                        <path d="M 100 40 L 200 10 L 200 40 Z" fill="#059669" opacity="0.08" />
                        <path d="M 0 60 L 100 60 L 180 15" fill="none" stroke="#8B0D19" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        <path d="M 0 60 L 80 60 L 80 40 L 0 40 Z" fill="#DC2626" opacity="0.08" />
                        <path d="M 120 20 L 200 20 L 200 40 L 120 40 Z" fill="#059669" opacity="0.08" />
                        <path d="M 0 60 L 80 60 L 120 20 L 200 20" fill="none" stroke="#B8924A" strokeWidth="2" />
                      </>
                    )}
                    <circle cx={bentoPayoffStrategy === "call" ? 100 : 80} cy="60" r="3" fill="#8B0D19" />
                    <text x={bentoPayoffStrategy === "call" ? 85 : 60} y="72" fontSize="7" fill="#888">Breakeven Strike</text>
                  </svg>
                </div>
                <div className="text-[9px] text-center text-slate-400">
                  * Live payoffs react dynamically to adjustments in target strikes.
                </div>
              </div>
            </div>

            {/* Card 2: Futures Trading (Large Bento) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-border/80 rounded-[20px] p-6 lg:p-8 flex flex-col justify-between hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-[8px] bg-burgundy/10 flex items-center justify-center mb-5 border border-burgundy/10">
                  <LineChart className="h-5 w-5 text-[#8B0D19]" />
                </div>
                <h3 className="font-extrabold text-xl text-foreground tracking-tight mb-2">Futures Trading</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access futures trading across indices, stocks, and commodities with real-time execution and tools designed to support your trading decisions every day.
                </p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-border/50">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase">Leverage Multiplier:</span>
                  <span className="text-burgundy font-black text-sm">{bentoLeverage}X Power</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={bentoLeverage}
                  onChange={(e) => setBentoLeverage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-burgundy"
                />
                <div className="flex justify-between text-[11px] bg-cream p-2.5 rounded-[5px] border border-border/60">
                  <span className="text-slate-500 font-semibold">Min Margin Required:</span>
                  <span className="font-mono font-bold text-slate-800">₹{(36000 / bentoLeverage).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Cards 3-8: Bento standard blocks */}
            {[
              {
                icon: Layers,
                title: "Real-Time Option Chain Analysis",
                desc: "Analyze open interest, volume, option prices, and strike-level activity to better understand market movement and spot potential trading opportunities.",
                accent: "#8B0D19",
              },
              {
                icon: Zap,
                title: "Integrated Strategy Building Tools",
                desc: "Create and evaluate options strategies with detailed risk-reward analysis, helping you compare potential outcomes before making trading decisions.",
                accent: "#8B0D19",
              },
              {
                icon: CheckCircle2,
                title: "Basket Orders Execution",
                desc: "Open and manage multiple positions simultaneously to execute trading strategies faster and control all orders efficiently from a single platform.",
                accent: "#8B0D19",
              },
              {
                icon: ShieldCheck,
                title: "Pledge Margin Benefits",
                desc: "Pledge your approved holdings to unlock extra trading margin and increase the buying power of your existing portfolio.",
                accent: "#8B0D19",
              },
              {
                icon: Play,
                title: "TradingView Charts Integration",
                desc: "Trade smoothly from advanced charts with integrated analysis tools designed to support faster and more informed decisions.",
                accent: "#8B0D19",
              },
              {
                icon: RotateCcw,
                title: "Fast Position Management",
                desc: "Stay in control of your trades by monitoring, modifying, reversing, or exiting positions whenever market conditions change.",
                accent: "#8B0D19",
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx}
                  className="col-span-12 md:col-span-3 lg:col-span-4 bg-white border border-border/70 rounded-[16px] p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                >
                  <div className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-4" style={{ background: `${item.accent}08` }}>
                    <Icon className="h-4 w-4" style={{ color: item.accent }} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </section>

      {/* ── SECTIONS 4 & 5: DYNAMIC OPTIONS vs FUTURES ADVANCED WORKSPACES ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Advanced Toolsets
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Master the Derivatives Market.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto">
              Simulate option strategies and calculate margin exposure live. Toggle workspaces below to explore how our pro dashboard models trading structures.
            </p>
          </div>

          {/* Interactive Workspaces Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#FAF8F5] border border-border p-1 rounded-full flex items-center gap-1 shadow-inner relative">
              <button
                onClick={() => setWorkspaceTab("options")}
                className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all relative z-10 ${
                  workspaceTab === "options" ? "bg-burgundy text-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Options Workspace
              </button>
              <button
                onClick={() => setWorkspaceTab("futures")}
                className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all relative z-10 ${
                  workspaceTab === "futures" ? "bg-burgundy text-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Futures Workspace
              </button>
            </div>
          </div>

          {/* Tab Panel Render */}
          <AnimatePresence mode="wait">
            {workspaceTab === "options" ? (
              <motion.div
                key="options-workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Options left features */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-burgundy tracking-widest uppercase block mb-1">Options</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                      Every tool a serious options trader needs.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: "Live Option Chain", d: "Full strike-by-strike view with OI, volume, LTP, IV, and bid-ask in real time." },
                      { t: "Greeks Dashboard", d: "Delta, Theta, Gamma, Vega live on every strike. Know your risk before you enter." },
                      { t: "Max Pain & PCR", d: "Spot where the market is likely to gravitate before expiry." },
                      { t: "IV Percentile", d: "Understand if options are cheap or expensive relative to historical volatility." },
                      { t: "Option Strategy Builder", d: "Build Bull Call Spread, Iron Condor, Straddle, and more. See payoff before placing." },
                      { t: "Flash Trade", d: "Buy or sell options in one tap. No screens to navigate when speed matters." },
                      { t: "OI Change Tracker", d: "Watch open interest build and unwind in real time across strikes." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-cream/70 border border-border/60 p-4 rounded-[10px] space-y-1">
                        <h4 className="font-extrabold text-foreground text-xs tracking-tight">{item.t}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Options Right: visual */}
                <div className="lg:col-span-7 relative">
                  <Image
                    src="/fando.jpeg"
                    alt="F&O trading on the Shree Varahi app"
                    width={1424}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="futures-workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Futures Left features */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-gold-deep tracking-widest uppercase block mb-1">Futures</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                      Futures trading built for speed and clarity.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: "Futures Charts", d: "See all expiries side by side with live price, OI, and basis." },
                      { t: "Live Margin Display", d: "Know your required margin before placing the order. No surprises." },
                      { t: "Rollover Tracker", d: "Monitor rollover activity and cost of carry across expiries." },
                      { t: "Spread Orders", d: "Execute calendar spreads efficiently from a single order window." },
                      { t: "Position Management", d: "Modify, reverse, or exit any position directly from your dashboard." },
                      { t: "Intraday Leverage", d: "Get up to 5× leverage on futures positions. Settle same day." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-cream/70 border border-border/60 p-4 rounded-[10px] space-y-1">
                        <h4 className="font-extrabold text-foreground text-xs tracking-tight">{item.t}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Futures Right: visual */}
                <div className="lg:col-span-7 relative">
                  <Image
                    src="/fando.jpeg"
                    alt="Futures trading on the Shree Varahi app"
                    width={1424}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ── SECTION 6: HOW TO BEGIN TIMELINE (TIMELINE STEP GUIDE) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Getting Started
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              New to F&amp;O? Here&apos;s how to begin.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto">
              Follow four simple steps to execute your first derivatives position on the Shree Varahi App. Hover over steps below to preview screens.
            </p>
          </div>

          {/* Interactive Split Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Timeline Steps Left (Hover triggers) */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  title: "Open & Activate",
                  desc: "Complete Aadhaar e-KYC in under 15 minutes and activate F&O trading from your account settings in one tap."
                },
                {
                  title: "Pick Your Instrument",
                  desc: "Choose index, stock, or commodity F&O. Select your expiry and strike price."
                },
                {
                  title: "Analyse Before You Trade",
                  desc: "Use the live option chain, Greeks dashboard, and strategy builder to plan your entry and risk."
                },
                {
                  title: "Execute & Manage",
                  desc: "Place your order in under 80ms. Monitor live P&L, modify, or exit positions from one screen."
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-[16px] border transition-all duration-300 cursor-pointer ${
                    activeStep === idx 
                      ? "bg-white border-gold-deep shadow-md translate-x-2" 
                      : "bg-[#FAF8F5] border-border/60 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                      activeStep === idx ? "bg-burgundy text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-foreground text-sm tracking-wide">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Phone screen preview Right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[260px] h-[500px] border-[8px] border-slate-900 bg-slate-950 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col font-sans select-none">
                
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                  <div className="w-12 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Status Bar */}
                <div className="bg-slate-900 px-5 pt-6 pb-2 text-[8px] text-slate-400 font-mono flex justify-between items-center shrink-0">
                  <span>12:40 PM</span>
                  <span>5G IIII</span>
                </div>

                {/* Display Area */}
                <div className="flex-1 p-4 bg-slate-950 text-white flex flex-col justify-between overflow-hidden relative">
                  
                  {activeStep === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-6"
                    >
                      <div className="space-y-4 text-center">
                        <Smartphone className="h-10 w-10 text-gold mx-auto animate-bounce" />
                        <h5 className="font-bold text-sm">Open &amp; Activate</h5>
                        <p className="text-[9px] text-slate-400 leading-relaxed px-2">Complete Aadhaar e-KYC in under 15 minutes and activate F&amp;O trading from your settings.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-8 bg-slate-900 border border-slate-800 rounded-[5px] flex items-center justify-center text-[10px] text-slate-350">
                          XXXX - XXXX - 4821
                        </div>
                        <div className="w-full h-8 bg-burgundy rounded-[5px] flex items-center justify-center text-[10px] font-black uppercase text-white shadow">
                          Submit Aadhaar KYC
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-4"
                    >
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
                          <input 
                            type="text" 
                            value="Nifty 50" 
                            disabled 
                            className="w-full bg-slate-900 border border-slate-800 rounded-[5px] py-1.5 pl-8 text-[10px] text-white font-bold"
                          />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide block">Contract Options Expiries</span>
                        <div className="grid grid-cols-3 gap-1.5 font-mono text-[8px] text-center">
                          <span className="py-1 bg-burgundy rounded font-bold">18 JUN</span>
                          <span className="py-1 bg-slate-900 rounded">25 JUN</span>
                          <span className="py-1 bg-slate-900 rounded">02 JUL</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 space-y-2 text-[9px]">
                        <div className="flex justify-between font-bold">
                          <span>NIFTY 23500 CE</span>
                          <span className="text-emerald-400 font-mono">₹145.20</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Delta: 0.50</span>
                          <span>IV: 12.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-4"
                    >
                      <div className="space-y-3 text-center">
                        <Activity className="h-8 w-8 text-gold mx-auto animate-pulse" />
                        <h5 className="font-bold text-xs text-slate-100">Analyse Before You Trade</h5>
                      </div>
                      <div className="h-24 w-full bg-slate-900 rounded border border-slate-800 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          <line x1="0" y1="20" x2="100" y2="20" stroke="#475569" strokeDasharray="2" />
                          <path d="M 0 30 L 50 30 L 85 10" fill="none" stroke="#D9B27C" strokeWidth="1.5" />
                          <circle cx="50" cy="30" r="2" fill="#D9B27C" />
                        </svg>
                      </div>
                      <div className="text-[9px] text-slate-400 text-center font-medium leading-relaxed px-2">
                        Use option chains and strategy builders to plan targets and risks.
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-6"
                    >
                      <div className="space-y-4 text-center">
                        <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                          <Check className="h-5 w-5" />
                        </div>
                        <h5 className="font-bold text-sm">Execute &amp; Manage</h5>
                        <p className="text-[9px] text-slate-400 px-2 leading-relaxed">Place order in under 80ms and monitor live P&amp;L modification limits.</p>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-[8px] font-mono text-slate-400">
                        <div className="flex justify-between"><span className="font-sans">LTP:</span><span className="text-white font-bold">₹145.20</span></div>
                        <div className="flex justify-between"><span className="font-sans">Order ID:</span><span className="text-white">#SV-87109275</span></div>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Bottom line */}
                <div className="h-6 shrink-0 flex items-center justify-center bg-slate-900 border-t border-slate-850">
                  <div className="w-20 h-1 bg-slate-700 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 7: FLAT ₹17 PRICING & SAVINGS CALCULATOR (AWARD WINNING THEMED BANNER) ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-white via-cream to-[#FAF8F5] border border-gold/30 rounded-[32px] shadow-[0_20px_50px_rgba(139,13,25,0.02)] p-8 sm:p-14 text-center overflow-hidden"
          >
            {/* Ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-gold/15 pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-gold/15 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Simple Pricing
              </p>

              {/* Giant pricing counter */}
              <div className="flex items-start justify-center text-burgundy select-none">
                <span className="text-4xl sm:text-5xl font-black mt-3.5 leading-none">₹</span>
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none">17</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                flat. Every F&amp;O order.
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                At Shree Varahi, every futures and options order is charged a flat ₹17, no percentage, no slabs, no hidden fees.
              </p>

              {/* Savings Calculator Interactive Area */}
              <div className="bg-white border border-border/80 rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto space-y-6 text-left my-8 shadow-sm">
                <h3 className="font-extrabold text-sm tracking-wide text-foreground border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Interactive Savings Calculator</span>
                  <span className="text-xs text-muted-foreground font-mono font-normal">Calculate benefits instantly</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-bold uppercase">Estimated Trades Per Month:</span>
                    <span className="text-burgundy font-black text-sm">{tradesPerMonth} Trades</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={tradesPerMonth}
                    onChange={(e) => setTradesPerMonth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-center">
                  <div className="p-4 bg-cream rounded-xl border border-border/60 text-center space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard Broker (₹20/Order)</span>
                    <span className="font-mono text-sm text-slate-800 font-bold">₹{traditionalCost.toLocaleString("en-IN")} / yr</span>
                  </div>
                  <div className="p-4 bg-cream rounded-xl border border-border/60 text-center space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Shree Varahi (₹17/Order)</span>
                    <span className="font-mono text-sm text-burgundy font-bold">₹{varahiCost.toLocaleString("en-IN")} / yr</span>
                  </div>
                  <div className="p-5 bg-gold/15 rounded-xl border border-gold/30 text-center space-y-1">
                    <span className="text-[10px] text-gold-deep font-extrabold uppercase tracking-wider block">Total Annual Savings</span>
                    <span className="font-mono text-xl text-gold-deep font-black gold-shimmer block">₹{annualSavings.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Additional free list table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wide border-t border-slate-100">
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> Account Opening: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> AMC AMC: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> API Access: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> Mutual Funds: ₹0</div>
                </div>
              </div>

              <Button asChild 
                size="lg" 
                className="bg-burgundy hover:bg-burgundy-deep text-white px-10 h-14 text-base font-bold rounded-[5px] shadow-lg shadow-burgundy/25 transition-transform hover:scale-[1.01]"
              >
                <a href={OPEN_ACCOUNT_URL}>Open Free Account</a>
              </Button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 10: FAQ (PREMIUM TWO-COLUMN ACCORDION GRID) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about derivatives trading at Shree Varahi? Review answers to our most popular inquiries.
            </p>
          </div>

          {/* 2-Column Accordion layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {[
              {
                q: "Can I trade both Futures and Options?",
                a: "Yes. Shree Varahi provides access to both Futures and Options trading through a single trading account, allowing traders to participate in various derivatives segments and implement diverse trading strategies."
              },
              {
                q: "Do I get an Option Chain?",
                a: "Yes. The platform offers an advanced Option Chain that provides real-time data on Open Interest (OI), volume, premiums, implied volatility, option Greeks, and strike-wise market activity to support informed trading decisions."
              },
              {
                q: "Is Strategy Builder available?",
                a: "Yes. Traders can use the Strategy Builder to create, evaluate, and compare multiple options strategies. The tool helps analyze potential profit, loss, breakeven points, and risk-reward scenarios before executing trades."
              },
              {
                q: "Can I use pledged stocks as margin?",
                a: "Yes. Approved stocks held in your Demat account can be pledged and used as collateral for eligible margin benefits, helping you utilize capital more efficiently while retaining ownership of your investments."
              },
              {
                q: "What are the F&O brokerage charges?",
                a: "Futures and Options trades are charged at a flat ₹17 per executed order. Statutory charges, taxes, and exchange-related fees may apply separately as per regulations."
              },
              {
                q: "Which contracts are supported?",
                a: "Shree Varahi supports eligible Index Options, Stock Options, Index Futures, Stock Futures, and selected Commodity Futures & Options contracts, subject to exchange availability and regulatory guidelines."
              },
              {
                q: "Can I execute multi-leg options strategies?",
                a: "Yes. Multi-leg strategies can be created and executed efficiently using Basket Orders and Strategy Builder tools available on the platform."
              },
              {
                q: "Do I get access to TradingView charts?",
                a: "Yes. Advanced TradingView-powered charts are available with technical indicators, drawing tools, multiple timeframes, and direct trading capabilities."
              },
              {
                q: "Can I monitor my open positions in real time?",
                a: "Yes. The platform provides real-time position monitoring, profit and loss tracking, contract management, and quick position modification features."
              },
              {
                q: "Is the platform suitable for active traders?",
                a: "Absolutely. Shree Varahi is designed for active traders with advanced F&O tools including Option Chain analysis, Greeks tracking, Strategy Builder, Basket Orders, live charts, and efficient order execution capabilities."
              }
            ].map((faq, index) => {
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
                Trade Futures &amp; Options<br className="hidden sm:inline" /> With Better Control
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm font-bold text-white/85">
                4.5 <Star className="w-4 h-4 fill-gold-champagne text-gold-champagne" /> App Rating
              </div>

              <form
                onSubmit={triggerSms}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <MobileInput
                  required
                  aria-label="Mobile number"
                  value={smsNum}
                  onValueChange={setSmsNum}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button
                  type="submit"
                  disabled={smsStatus !== "idle"}
                  className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0"
                >
                  {smsStatus === "sending" && "Sending..."}
                  {smsStatus === "sent" && "✓ Sent"}
                  {smsStatus === "idle" && "Get Started"}
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

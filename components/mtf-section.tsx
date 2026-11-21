"use client"

// MTF calculator (home page and /mtf). Stocks and margins come from the broker's MTF
// margin list (/api/v1/mtf); the search only finds stocks in that list.
//   margin used = max(listed margin, 33.3%) (applied by the backend)
//   multiplier = 100 ÷ margin used, funding = min(capital × (multiplier − 1), ₹1 crore), buying power = capital + funding
// Share prices are not shown for now (CMOTS token expired) — the price line appears only when a price exists.

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight, CheckCircle2, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMtfStocks, useMtfSummary } from "@/hooks/use-mtf"
import { formatMultiplier, mtfMultiplier, type MtfStockApi } from "@/lib/mtf/api-client"
import { Bone, ChipsSkeleton, SkeletonGroup } from "@/components/skeletons"

/* ─── Types & Data ─── */

type Stock = MtfStockApi & {
  /** ₹ per share — not available yet; the price line is hidden while null */
  price?: number | null
}

const SEARCH_DEBOUNCE_MS = 250

/** Varahi funds at most ₹1 crore per position. */
const MAX_FUNDING = 1_00_00_000
const MIN_CAPITAL = 5_000
/** Capital slider / input top end (funding stays capped at ₹1 crore). */
const MAX_CAPITAL = 5_00_00_000
const SLIDER_STEPS = 1000

/**
 * The slider is logarithmic: ₹5K→₹50K, ₹50K→₹5L, ₹5L→₹50L and ₹50L→₹5Cr each take the same share
 * of the track (a straight ₹5K–₹5Cr scale would squeeze everything under ₹5 lakh into 1% of it).
 * Values snap to round amounts.
 */
const niceStep = (v: number) =>
  v < 1_00_000 ? 5_000 : v < 10_00_000 ? 10_000 : v < 50_00_000 ? 50_000 : v < 1_00_00_000 ? 1_00_000 : 5_00_000
function sliderToCapital(pos: number) {
  const raw = MIN_CAPITAL * Math.pow(MAX_CAPITAL / MIN_CAPITAL, pos / SLIDER_STEPS)
  const step = niceStep(raw)
  return Math.min(MAX_CAPITAL, Math.max(MIN_CAPITAL, Math.round(raw / step) * step))
}
function capitalToSlider(capital: number) {
  const c = Math.min(MAX_CAPITAL, Math.max(MIN_CAPITAL, capital))
  return Math.round((SLIDER_STEPS * Math.log(c / MIN_CAPITAL)) / Math.log(MAX_CAPITAL / MIN_CAPITAL))
}
const SEARCH_RESULTS = 7

/* ─── Helpers ─── */

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN")
const times = formatMultiplier

const AVATAR_COLORS = ["#F97316", "#6366F1", "#2563EB", "#7C3AED", "#0891B2", "#D97706", "#0D9488", "#DB2777", "#059669", "#78716C", "#EF4444"]
function colorFor(symbol: string) {
  let hash = 0
  for (const char of symbol) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function StockAvatar({ stock, size = 32 }: { stock: Stock; size?: number }) {
  const initials = stock.symbol.replace(/[^A-Z]/g, "").slice(0, 2) || stock.symbol.slice(0, 2)
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0 font-black text-white select-none"
      style={{ width: size, height: size, background: colorFor(stock.symbol), fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

function RatioBadge({ stock }: { stock: Stock }) {
  const m = mtfMultiplier(stock)
  // Multipliers run 1.92x–3.00x (33.3% minimum margin): full 3x, mid, low.
  const styles =
    m >= 2.99 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
      m >= 2.4 ? "bg-blue-50 text-blue-700 border-blue-200" :
        "bg-amber-50 text-amber-700 border-amber-200"
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] border ${styles} whitespace-nowrap`}>
      {times(m)} MTF
    </span>
  )
}

/* ─── Main Component ─── */

export function MTFSection() {
  const [capital, setCapital] = useState(100000)
  const [picked, setPicked] = useState<Stock | null>(null)
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const summary = useMtfSummary()
  const info = summary.data
  const popularStocks: Stock[] = info?.popular ?? []
  /** Reliance until the user picks another stock. */
  const selected: Stock | null = picked ?? info?.defaultStock ?? null
  const totalStocks = info ? info.totalStocks.toLocaleString("en-IN") : null

  // Ask the server once the user stops typing.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])
  const searchResult = useMtfStocks(search ? { q: search, limit: SEARCH_RESULTS } : null)
  const results: Stock[] = query.trim() && search ? searchResult.data?.items ?? [] : []
  const searching = !!query.trim() && (query.trim() !== search || searchResult.loading)

  const multiplier = selected ? mtfMultiplier(selected) : null
  const m = multiplier ?? 1
  // Varahi funds at most ₹1 crore; beyond that, buying power = capital + ₹1 crore.
  const fullFunding = capital * (m - 1)
  const fundingCapped = fullFunding > MAX_FUNDING
  const funding = Math.min(fullFunding, MAX_FUNDING)
  const buyingPower = capital + funding
  /** Buying power ÷ capital after the cap (equals the stock's multiplier when not capped). */
  const effective = capital > 0 ? buyingPower / capital : m
  const capitalShare = buyingPower > 0 ? (capital / buyingPower) * 100 : 0

  /* Donut math */
  const C = 219.9
  const ratio = Math.min(capital, MAX_CAPITAL) / MAX_CAPITAL
  const capArc = (C * ratio) / effective
  const fundArc = (C * ratio * (effective - 1)) / effective
  const g = capital > 0 ? 1.5 : 0
  const capDash = `${Math.max(0, capArc - g)} ${C}`
  const fundDash = `${Math.max(0, fundArc - g)} ${C}`

  /* Click-outside to close dropdown */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const handleSelect = (stock: Stock) => {
    setPicked(stock)
    setQuery("")
    setSearch("")
    setOpen(false)
  }

  const handleCapitalChange = (raw: string) => {
    const n = parseInt(raw.replace(/[^0-9]/g, ""), 10)
    if (!isNaN(n)) setCapital(Math.min(n, MAX_CAPITAL))
    else if (raw === "" || raw === "₹") setCapital(0)
  }

  const showDropdown = open && !!query.trim()

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            Margin Trading Facility
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Search any stock.{" "}
            <span className="text-burgundy">See your MTF power.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Different stocks qualify for different MTF limits. Pick a stock below and instantly see how much buying power Shree Varahi unlocks for you.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white border border-border rounded-[8px] shadow-sm">

            {/* Card header */}
            <div className="bg-cream/40 px-4 sm:px-6 py-3 sm:py-4 border-b border-border/60 rounded-t-[8px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-bold text-xl text-foreground">MTF Calculator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a stock to see the exact margin trading facility available — different stocks have different MTF limits.
                </p>
              </div>

            </div>

            {/* Two-column layout — scrolls horizontally on mobile */}
            <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <div className="grid grid-cols-2 divide-x divide-border" style={{ minWidth: "640px" }}>

                {/* ── LEFT: Capital + Stock Selector ── */}
                <div className="p-6 space-y-6">

                  {/* Capital input */}
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                      Your Capital
                    </span>
                    <div className="relative border border-border/80 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/20 transition-all rounded-[6px] flex items-center h-[72px] bg-white">
                      <div className="w-12 h-full flex items-center justify-center border-r border-border/50 text-foreground/50 text-lg font-bold bg-secondary/10 rounded-l-[6px]">
                        ₹
                      </div>
                      <input
                        type="text"
                        value={capital === 0 ? "" : capital.toLocaleString("en-IN")}
                        onChange={(e) => handleCapitalChange(e.target.value)}
                        className="flex-1 text-2xl font-bold text-foreground text-center focus:outline-none bg-transparent px-3"
                        placeholder="0"
                      />
                    </div>

                    {/* Slider */}
                    <div className="mt-4">
                      <div className="px-2.5">
                        <Slider
                          value={[capitalToSlider(capital)]}
                          onValueChange={(v) => setCapital(sliderToCapital(v[0]))}
                          min={0}
                          max={SLIDER_STEPS}
                          step={1}
                          aria-label="Your capital"
                          aria-valuetext={fmt(capital)}
                          className="[&_[role=slider]]:bg-burgundy [&_[role=slider]]:border-burgundy [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                        />
                        {/* Tick labels sit where those amounts fall on the (logarithmic) track */}
                        <div className="relative h-4 text-xs text-muted-foreground font-medium mt-2">
                          {[
                            { v: MIN_CAPITAL, label: "₹5K" },
                            { v: 50_000, label: "₹50K" },
                            { v: 5_00_000, label: "₹5L" },
                            { v: 50_00_000, label: "₹50L" },
                            { v: MAX_CAPITAL, label: "₹5Cr" },
                          ].map((t, i, all) => (
                            <span key={t.label} className="absolute top-0 whitespace-nowrap"
                              style={{
                                left: `${(capitalToSlider(t.v) / SLIDER_STEPS) * 100}%`,
                                transform: i === 0 ? "none" : i === all.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
                              }}>
                              {t.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Selector */}
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                      Select Stock to Check MTF
                    </span>

                    {/* Search box + dropdown */}
                    <div className="relative mb-3" ref={searchRef}>
                      <div className={`flex items-center gap-2 border rounded-[6px] px-3 h-10 bg-white transition-all ${open || query ? "border-burgundy ring-1 ring-burgundy/20" : "border-border/80"}`}>
                        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
                          onFocus={() => setOpen(true)}
                          placeholder="Search stock e.g. INFY, HDFCBANK..."
                          className="flex-1 text-[13px] focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground/50"
                        />
                        {searching && <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />}
                        {query && (
                          <button onClick={() => { setQuery(""); setSearch(""); setOpen(false) }} className="text-muted-foreground hover:text-foreground" aria-label="Clear search">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Search dropdown */}
                      <AnimatePresence>
                        {showDropdown && (results.length > 0 || !searching) && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 top-[calc(100%+4px)] left-0 right-0 bg-white border border-border rounded-[6px] shadow-lg overflow-hidden"
                          >
                            {results.length === 0 ? (
                              <p className="px-3 py-3 text-[12px] text-muted-foreground">
                                {searchResult.error ? "Unable to search right now." : "No MTF eligible stock matches your search."}
                              </p>
                            ) : results.map((stock) => (
                              <button
                                key={stock.symbol}
                                onMouseDown={() => handleSelect(stock)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/40 transition-colors text-left ${selected?.symbol === stock.symbol ? "bg-burgundy/5" : ""}`}
                              >
                                <StockAvatar stock={stock} size={28} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold text-foreground leading-none">{stock.symbol}</p>
                                  {stock.name && <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{stock.name}</p>}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {stock.price != null && <span className="text-[12px] font-semibold text-foreground">{fmt(stock.price)}</span>}
                                  <RatioBadge stock={stock} />
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Popular chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {popularStocks.map((stock) => (
                        <button
                          key={stock.symbol}
                          onClick={() => handleSelect(stock)}
                          className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-[4px] border transition-all ${selected?.symbol === stock.symbol
                              ? "bg-burgundy text-white border-burgundy shadow-sm"
                              : "bg-secondary/30 text-foreground/70 border-border hover:border-burgundy/40 hover:bg-secondary/60"
                            }`}
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: selected?.symbol === stock.symbol ? "rgba(255,255,255,0.7)" : colorFor(stock.symbol) }}
                          />
                          {stock.symbol}
                        </button>
                      ))}
                      {!info && !summary.error && <ChipsSkeleton count={8} />}
                      {summary.error && !info && (
                        <p className="text-[11px] text-muted-foreground">
                          Unable to load MTF stocks.{" "}
                          <button onClick={summary.retry} className="text-burgundy font-bold hover:underline">Retry</button>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Selected Stock + Result ── */}
                <div className="p-6 flex flex-col gap-5">

                  {/* Selected stock card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected?.symbol ?? "loading"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-[6px] border border-border bg-secondary/10 p-3 flex items-center gap-3 min-h-[62px]"
                    >
                      {selected ? (
                        <>
                          <StockAvatar stock={selected} size={36} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="font-black text-[14px] text-foreground leading-none">{selected.symbol}</p>
                              <RatioBadge stock={selected} />
                            </div>
                            {selected.name && <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{selected.name}</p>}
                            {selected.price != null && <p className="text-[11px] font-semibold text-foreground mt-0.5">{fmt(selected.price)} / share</p>}
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Margin required: <span className="font-semibold text-foreground">{selected.marginPct.toFixed(2)}%</span>
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <p className="text-[9px] text-emerald-600 font-bold mt-0.5 uppercase tracking-wide">MTF Eligible</p>
                          </div>
                        </>
                      ) : summary.error ? (
                        <p className="text-[12px] text-muted-foreground">MTF stocks are unavailable right now.</p>
                      ) : (
                        <SkeletonGroup label="Loading stock" className="flex items-center gap-3 w-full">
                          <Bone className="w-9 h-9 rounded-full shrink-0" />
                          <div className="flex-1 space-y-1.5"><Bone className="h-3.5 w-32" /><Bone className="h-2.5 w-44" /></div>
                        </SkeletonGroup>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Donut + Legend — always side-by-side */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-28 h-28 flex-shrink-0">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                        <circle cx="50" cy="50" r="35" fill="transparent" stroke="#E5E5E5" strokeWidth="16" />
                        {multiplier !== null && (
                          <>
                            <circle
                              cx="50" cy="50" r="35" fill="transparent"
                              stroke="var(--color-burgundy)" strokeWidth="16"
                              strokeDasharray={fundDash}
                              strokeDashoffset={-capArc}
                              className="transition-all duration-500 ease-out"
                            />
                            <circle
                              cx="50" cy="50" r="35" fill="transparent"
                              stroke="var(--color-gold)" strokeWidth="16"
                              strokeDasharray={capDash}
                              strokeDashoffset="0"
                              className="transition-all duration-500 ease-out"
                            />
                          </>
                        )}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-foreground leading-none">{multiplier !== null ? times(effective) : "—"}</span>
                        <span className="text-[9px] text-muted-foreground font-semibold mt-0.5">buying power</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                      <div className="border-l-[3px] border-gold pl-3">
                        <span className="text-[10px] text-muted-foreground block font-medium leading-snug">
                          Your Capital
                          {selected && <span className="text-muted-foreground/60 ml-1">({capitalShare.toFixed(2)}%)</span>}
                        </span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={capital}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-black text-foreground block mt-0.5"
                          >
                            {fmt(capital)}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <div className="border-l-[3px] border-burgundy pl-3">
                        <span className="text-[10px] text-muted-foreground block font-medium leading-snug">
                          Varahi Funding
                          {selected && <span className="text-muted-foreground/60 ml-1">({(100 - capitalShare).toFixed(2)}%)</span>}
                        </span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${capital}-${multiplier}`}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-black text-burgundy block mt-0.5"
                          >
                            {multiplier !== null ? fmt(funding) : "—"}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Total buying power highlight */}
                  <div className="rounded-[6px] p-4 flex items-center justify-between gap-2" style={{ background: "linear-gradient(135deg, rgba(255,0,0,0.06) 0%, rgba(217,178,124,0.08) 100%)", border: "1px solid rgba(255,0,0,0.12)" }}>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Total Buying Power</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${capital}-${multiplier}-bp`}
                          initial={{ opacity: 0.4, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="text-2xl sm:text-3xl font-black text-burgundy mt-0.5"
                        >
                          {multiplier !== null ? fmt(buyingPower) : "—"}
                        </motion.p>
                      </AnimatePresence>
                      {selected && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          on {fmt(capital)} in <span className="font-semibold text-foreground">{selected.symbol}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-3xl sm:text-4xl font-black" style={{ color: "#FF0000", opacity: 0.15 }}>{multiplier !== null ? times(effective) : ""}</div>
                    </div>
                  </div>

                  {/* Funding cap: shown once ₹1 crore is reached */}
                  {selected && fundingCapped && (
                    <div role="status" className="rounded-[6px] border border-amber-200 bg-amber-50 px-3 py-2.5 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-px" aria-hidden />
                      <p className="text-[11px] leading-snug text-amber-800">
                        <span className="font-bold">Maximum funding provided by Varahi is ₹1 crore.</span>{" "}
                        At {times(multiplier ?? 1)} your funding would be {fmt(fullFunding)}, so buying power is capped at {fmt(capital)} + ₹1,00,00,000.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>{/* end overflow-x-auto */}

            {/* Bottom CTA */}
            <div className="bg-cream/50 border-t border-border rounded-b-[8px] flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex items-center border border-border rounded-[5px] bg-white h-11 px-3 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/20 transition-all flex-1">
                  <span className="text-sm font-semibold text-muted-foreground mr-2 border-r border-border/80 pr-2 flex-shrink-0">+91</span>
                  <input type="tel" placeholder="Enter Mobile No." className="bg-transparent text-sm font-medium w-full focus:outline-none placeholder:text-muted-foreground/60" />
                </div>
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white font-semibold rounded-[5px] h-11 px-6 whitespace-nowrap">
                  Start Trading
                </Button>
              </div>
            </div>

          </div>

          {/* View all link */}
          <p className="text-center mt-6">
            <Link href="/mtf/eligible-stocks" className="text-sm text-burgundy hover:underline inline-flex items-center gap-1 font-semibold">
              View all{totalStocks ? ` ${totalStocks}` : ""} MTF eligible stocks
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

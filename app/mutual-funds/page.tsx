"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, ChevronLeft, ChevronRight,
  Calculator, Star, Check,
  Zap, BarChart2, Users, Award, X, ArrowUpDown, ArrowUp, ArrowDown, ArrowUpRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFundSearch, useMutualFundsPage } from "@/hooks/use-mutual-funds"
import { fundHref, type FundSort, type MutualFundApi } from "@/lib/mutual-funds/api-client"
import { FundCategoryFilter, SelectedCategoryChips, NO_CATEGORY, categoryQuery, hasCategory, type CategoryPick } from "@/components/fund-category-filter"
import { FundHouseFilter } from "@/components/fund-house-filter"
import { CardGridSkeleton, TableRowsSkeleton } from "@/components/skeletons"

// ─── Constants ──────────────────────────────────────────────────────────────
// All fund data comes from the backend (/api/v1/mutual-funds, sourced from Reedos).

const EXPLORER_TABS: Array<{ id: string; label: string; sort: FundSort; index?: boolean }> = [
  { id: "all",       label: "All Funds",    sort: "aum" },
  // Min SIP is not available yet (needs GetFundOverview per fund) — re-enable when it is
  // { id: "sip100",    label: "SIP ₹100"     },
  // { id: "sip500",    label: "SIP ₹500"     },
  { id: "highret",   label: "High Returns", sort: "3y"  },
  { id: "index",     label: "Index Funds",  sort: "aum", index: true },
]

const AMC_PREVIEW = 17
const PER_PAGE = 10
const SEARCH_DEBOUNCE_MS = 300
/** Logo · Fund · Category · Fund Manager · Risk · Rating · AUM · 1Y · 3Y · 5Y */
const TABLE_COLUMNS = "40px minmax(0,1fr) 140px 140px 100px 56px 104px 66px 66px 66px"

type SortOrder = "asc" | "desc"
interface TableSort { key: FundSort; order: SortOrder }
/** Default order of the table: biggest funds (AUM) first. */
const DEFAULT_SORT: TableSort = { key: "aum", order: "desc" }
/** Rating chips: any, 5★ … 1★, not rated (0). */
const RATING_FILTERS: { label: string; value: number | null }[] = [
  { label: "All Ratings", value: null },
  { label: "5", value: 5 }, { label: "4", value: 4 }, { label: "3", value: 3 }, { label: "2", value: 2 }, { label: "1", value: 1 },
  { label: "Not Rated", value: 0 },
]
/** Columns with sort arrows. */
const SORT_COLUMNS: { key: FundSort; label: string }[] = [
  { key: "aum", label: "AUM" },
  { key: "1y",  label: "1Y" },
  { key: "3y",  label: "3Y" },
  { key: "5y",  label: "5Y" },
]

const AMC_COLORS = ["#1D4ED8", "#DC2626", "#D97706", "#16A34A", "#7C3AED", "#0891B2", "#B91C1C", "#15803D", "#B45309", "#0369A1", "#6D28D9"]
const colorFor = (id: number | null) => AMC_COLORS[Math.abs(id ?? 0) % AMC_COLORS.length]

/** "₹10,774 Cr" */
const formatAum = (cr: number | null) => (cr === null ? "—" : `₹${Math.round(cr).toLocaleString("en-IN")} Cr`)
const formatCount = (n: number | undefined) => (n === undefined ? "—" : n.toLocaleString("en-IN"))

const initialsOf = (name: string) =>
  name.replace(/\b(AMC|MF|Mutual Fund)\b/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()

// ─── Sub-components ─────────────────────────────────────────────────────────

function AmcLogo({ name, logoUrl, colorId, size = "md" }: { name: string; logoUrl: string | null; colorId: number | null; size?: "sm" | "md" | "lg" }) {
  const [failed, setFailed] = useState(false)
  const color = colorFor(colorId)
  const box = size === "lg" ? "w-12 h-12 text-sm" : size === "sm" ? "w-7 h-7 text-[9px]" : "w-10 h-10 text-[11px]"
  if (logoUrl && !failed) {
    return (
      <div className={`${box} rounded-[8px] bg-white border border-border/60 flex items-center justify-center overflow-hidden shrink-0`}>
        <img src={logoUrl} alt={name} loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-contain p-1" />
      </div>
    )
  }
  return (
    <div
      className={`${box} rounded-[8px] flex items-center justify-center font-black shrink-0`}
      style={{ background: color + "18", color, border: `1px solid ${color}28` }}
    >
      {initialsOf(name)}
    </div>
  )
}

function AssetClassBadge({ assetClass }: { assetClass: string | null }) {
  if (!assetClass) return null
  const label = assetClass.replace(/\s*Schemes$/i, "")
  const style =
    /equity/i.test(label) ? "bg-burgundy/8 text-burgundy border-burgundy/20" :
    /hybrid/i.test(label) ? "bg-amber-500/10 text-amber-600 border-amber-200" :
    /debt/i.test(label)   ? "bg-blue-500/10 text-blue-600 border-blue-200" :
                            "bg-emerald-500/10 text-emerald-700 border-emerald-200"
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] border whitespace-nowrap ${style}`}>
      {label}
    </span>
  )
}

function RiskBadge({ level }: { level: string | null }) {
  if (!level) return <span className="text-xs text-muted-foreground">—</span>
  const style =
    level === "Very High" ? "bg-red-50 text-red-600 border-red-200" :
    level === "High" || level === "Moderately High" ? "bg-orange-50 text-orange-600 border-orange-200" :
    level === "Moderate"  ? "bg-amber-50 text-amber-600 border-amber-200" :
                            "bg-emerald-50 text-emerald-700 border-emerald-200"
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] border leading-tight ${style}`}>
      {level}
    </span>
  )
}

function ReturnCell({ val }: { val: number | null }) {
  if (val === null) return <span className="text-sm font-semibold text-muted-foreground">—</span>
  const up = val >= 0
  return (
    <span className={`text-sm font-extrabold tabular-nums ${up ? "text-profit" : "text-loss"}`}>
      {up ? "+" : ""}{val.toFixed(1)}%
    </span>
  )
}

/** Rating number; blank when the fund is not rated (0). */
function RatingCell({ rating }: { rating: number }) {
  if (!rating) return null
  return (
    <span className="inline-flex items-center gap-0.5 text-sm font-extrabold text-foreground tabular-nums" title={`${rating} star rating`}>
      {rating}
      <Star className="w-3 h-3 fill-gold-deep text-gold-deep" aria-hidden />
    </span>
  )
}

/**
 * Sortable column header. Arrow up = highest → lowest, arrow down = lowest → highest;
 * the first click on a column sorts highest first.
 */
function SortHeader({ label, k, sort, onSort }: { label: string; k: FundSort; sort: TableSort; onSort: (k: FundSort) => void }) {
  const active = sort.key === k
  const Icon = !active ? ArrowUpDown : sort.order === "desc" ? ArrowUp : ArrowDown
  return (
    <button
      type="button"
      onClick={() => onSort(k)}
      aria-label={`Sort by ${label}${active ? (sort.order === "desc" ? ", highest first" : ", lowest first") : ""}`}
      title={active && sort.order === "desc" ? "Highest to lowest" : active ? "Lowest to highest" : `Sort by ${label}`}
      className={`ml-auto flex items-center justify-end gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${
        active ? "text-burgundy" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label} <Icon className={`w-3 h-3 ${active ? "" : "opacity-50"}`} />
    </button>
  )
}

/**
 * Applies ?category=<main category>&sub=<sub-category> (links from the navbar's Markets menu),
 * also when the link is clicked while this page is already open.
 */
function CategoryFromUrl({ onPick }: { onPick: (pick: CategoryPick) => void }) {
  const params = useSearchParams()
  const main = params.get("category")
  const sub = params.get("sub")
  const pickRef = useRef(onPick)
  pickRef.current = onPick
  useEffect(() => {
    if (main) pickRef.current({ [main]: sub ? [sub] : [] })
  }, [main, sub])
  return null
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function MutualFundsPage() {
  const [activeTab, setActiveTab]     = useState("all")
  const [category, setCategory]       = useState<CategoryPick>(NO_CATEGORY)
  const [risk, setRisk]               = useState("")
  /** Star rating filter; null = any rating, 0 = not rated */
  const [rating, setRating]           = useState<number | null>(null)
  /** Fund house (AMC id) filter; empty = all fund houses */
  const [amcIds, setAmcIds]           = useState<number[]>([])
  const [search, setSearch]           = useState("")
  const [query, setQuery]             = useState("")
  const [page, setPage]               = useState(1)
  const [showAllAmcs, setShowAllAmcs] = useState(false)
  /** Table order: AUM high → low by default; column headers and the name button change it. */
  const [sort, setSort]               = useState<TableSort>(DEFAULT_SORT)

  // Links from the Markets menu (see CategoryFromUrl below).
  const pickFromUrl = (pick: CategoryPick) => {
    setCategory(pick)
    setPage(1)
    document.getElementById("find-your-fund")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Search waits for the user to stop typing before asking the server.
  useEffect(() => {
    const timer = setTimeout(() => { setQuery(search.trim()); setPage(1) }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [search])

  const pageData = useMutualFundsPage()
  const info = pageData.data

  const tab = EXPLORER_TABS.find((t) => t.id === activeTab) ?? EXPLORER_TABS[0]
  const fundQuery = useMemo(
    () => ({
      q: query || undefined,
      ...categoryQuery(category),
      risk: risk || undefined,
      rating: rating ?? undefined,
      amc: amcIds,
      index: tab.index,
      sort: sort.key,
      order: sort.order,
      page,
      limit: PER_PAGE,
    }),
    [query, category, risk, rating, amcIds, tab, sort, page],
  )
  const fundsResult = useFundSearch(fundQuery)
  const funds       = fundsResult.data
  const rows        = funds?.items ?? []
  const totalPages  = funds?.totalPages ?? 1

  // A tab brings its own order (e.g. High Returns = 3Y return, highest first).
  const tabSort = (t: (typeof EXPLORER_TABS)[number]): TableSort => ({ key: t.sort, order: "desc" })
  const switchTab = (id: string) => {
    setActiveTab(id)
    setSort(tabSort(EXPLORER_TABS.find((t) => t.id === id) ?? EXPLORER_TABS[0]))
    setPage(1)
  }
  // Numeric columns: first click = highest → lowest (arrow up), next click = lowest → highest (arrow down).
  const sortBy = (key: FundSort) => {
    setSort((prev) => (prev.key === key ? { key, order: prev.order === "desc" ? "asc" : "desc" } : { key, order: "desc" }))
    setPage(1)
  }
  // Name: first click sorts A→Z; the next click reverses it.
  const toggleNameSort = () => {
    setSort((prev) => ({ key: "name", order: prev.key === "name" && prev.order === "asc" ? "desc" : "asc" }))
    setPage(1)
  }
  const pickCategory = (v: CategoryPick) => { setCategory(v); setPage(1) }
  const pickRisk  = (v: string)  => { setRisk(v); setPage(1) }
  const pickRating = (v: number | null) => { setRating(v); setPage(1) }
  const pickAmcs = (v: number[]) => { setAmcIds(v); setPage(1) }
  // Hero shortcuts: set the filter, then jump to the table.
  const scrollToExplorer = () => document.getElementById("find-your-fund")?.scrollIntoView({ behavior: "smooth", block: "start" })
  const browseCategory = (main: string) => { pickCategory({ [main]: [] }); scrollToExplorer() }
  const browseIndexFunds = () => { switchTab("index"); scrollToExplorer() }
  // Like the stocks page: resets search, categories, risk and sort (the tab stays).
  const clearAll = () => {
    setCategory(NO_CATEGORY); setRisk(""); setRating(null); setAmcIds([]); setSearch(""); setQuery(""); setSort(tabSort(tab)); setPage(1)
  }
  const sortChanged = sort.key !== tab.sort || sort.order !== "desc"
  const mobileReturn =
    sort.key === "1y" ? { label: "1Y", value: (f: MutualFundApi) => f.returns.oneYear } :
    sort.key === "5y" ? { label: "5Y", value: (f: MutualFundApi) => f.returns.fiveYear } :
                        { label: "3Y", value: (f: MutualFundApi) => f.returns.threeYear }
  const hasFilter = !!(search || risk || rating !== null || amcIds.length > 0 || sortChanged || hasCategory(category))

  const totalFunds = formatCount(info?.stats.totalFunds)
  const totalAmcs  = formatCount(info?.stats.totalAmcs)
  const amcs       = info?.amcs ?? []
  const visibleAmcs = showAllAmcs ? amcs : amcs.slice(0, AMC_PREVIEW)

  const tableStatus = fundsResult.loading && !funds
    ? "Loading funds…"
    : fundsResult.error && !funds
      ? <>Unable to load funds. <button onClick={fundsResult.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : null

  const sectionStatus = pageData.loading && !info
    ? "Loading…"
    : pageData.error && !info
      ? <>Unable to load data. <button onClick={pageData.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* useSearchParams needs a Suspense boundary in the App Router */}
      <Suspense fallback={null}><CategoryFromUrl onPick={pickFromUrl} /></Suspense>

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
            <span className="text-foreground font-semibold">Mutual Funds</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-12 items-center">
            <div className="space-y-4">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Wealth Creation</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Invest in <span className="text-burgundy">Mutual Funds</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {info ? `${totalFunds} funds` : "Funds"} across equity, debt, and hybrid from {info ? `${totalAmcs} AMCs` : "leading AMCs"}. Invest with zero commission and research-backed recommendations.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px]">
                  Start SIP Now
                </Button>
                <Button
                  variant="outline"
                  className="border-border bg-white px-6 h-10 font-bold rounded-[5px] hover:bg-secondary"
                  onClick={() => document.getElementById("find-your-fund")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Funds
                </Button>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                {[
                  { v: "₹0",       l: "Commission"      },
                  { v: totalFunds, l: "Funds Available" },
                  { v: formatCount(info?.stats.totalCategories), l: "Categories" },
                  { v: totalAmcs,  l: "AMC Partners"    },
                ].map((stat) => (
                  <div key={stat.l}>
                    <div className="text-base font-black text-foreground leading-none">{stat.v}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold mt-1">{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse by category: the main categories from the API, each opens the table filtered */}
            <div className="rounded-[10px] bg-white border border-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-2.5">Browse by category</p>
              {info ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {info.assetClasses.slice(0, 6).map((m) => (
                    <button
                      key={m.name}
                      onClick={() => browseCategory(m.name)}
                      className="group text-left rounded-[6px] border border-border bg-cream/50 px-3 py-2.5 hover:border-burgundy/30 hover:bg-white transition-all"
                    >
                      <div className="text-xs font-extrabold text-foreground flex items-center justify-between gap-1">
                        <span className="truncate">{m.label}</span>
                        <ArrowUpRight className="w-3 h-3 shrink-0 text-muted-foreground group-hover:text-burgundy transition-colors" />
                      </div>
                      <div className="text-[10px] font-semibold text-muted-foreground tabular-nums mt-0.5">{m.count.toLocaleString("en-IN")} funds</div>
                    </button>
                  ))}
                </div>
              ) : pageData.error ? (
                <p className="text-[11px] text-muted-foreground py-4 text-center">{sectionStatus}</p>
              ) : (
                <div className="grid grid-cols-3 gap-2" aria-busy="true" aria-label="Loading categories">
                  {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-[52px] rounded-[6px] bg-skeleton skeleton-pulse" />)}
                </div>
              )}
              <button
                onClick={browseIndexFunds}
                className="mt-3 w-full flex items-center gap-3 rounded-[6px] bg-burgundy/[0.06] border border-burgundy/15 px-3 py-2.5 hover:bg-burgundy/10 transition-colors text-left"
              >
                <Zap className="w-4 h-4 text-burgundy shrink-0" />
                <span className="text-[11px] text-foreground font-extrabold">Explore Index Funds</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-burgundy ml-auto shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUND EXPLORER ── */}
      <section id="find-your-fund" className="bg-background py-6 lg:py-8 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title + count on the left, tabs on the right */}
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">Find Your Fund</h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                <span className="font-bold text-foreground">{funds ? funds.total.toLocaleString("en-IN") : "—"}</span> funds
                {fundsResult.loading && funds && <span className="ml-2 text-muted-foreground/60">Updating…</span>}
              </p>
            </div>
            <div className="flex gap-0.5 p-0.5 rounded-[6px] bg-secondary overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {EXPLORER_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id)}
                  aria-pressed={activeTab === t.id}
                  className={`px-3.5 py-1.5 rounded-[5px] text-[12px] font-bold whitespace-nowrap transition-all ${
                    activeTab === t.id ? "bg-white text-burgundy shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters: one card — search + dropdowns in a row, categories below */}
          <div className="rounded-[8px] border border-border bg-white p-3 sm:p-4 mb-3 space-y-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search funds, AMCs, fund managers..."
                  aria-label="Search by fund name, fund house or fund manager"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-[34px] pl-9 pr-8 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  aria-label="Risk"
                  value={risk}
                  onChange={(e) => pickRisk(e.target.value)}
                  className={`h-[34px] px-2.5 rounded-[5px] text-[11px] font-bold border focus:outline-none focus:ring-2 focus:ring-gold/30 ${
                    risk ? "bg-burgundy/5 text-burgundy border-burgundy/35" : "bg-white text-muted-foreground border-border"
                  }`}
                >
                  <option value="">All Risk Levels</option>
                  {(info?.risks ?? []).map((r) => <option key={r.name} value={r.name}>{r.name} Risk</option>)}
                </select>
                <FundHouseFilter amcs={info?.amcs ?? []} value={amcIds} onChange={pickAmcs} />
                <select
                  aria-label="Rating"
                  value={rating === null ? "" : String(rating)}
                  onChange={(e) => pickRating(e.target.value === "" ? null : Number(e.target.value))}
                  className={`h-[34px] px-2.5 rounded-[5px] text-[11px] font-bold border focus:outline-none focus:ring-2 focus:ring-gold/30 ${
                    rating !== null ? "bg-burgundy/5 text-burgundy border-burgundy/35" : "bg-white text-muted-foreground border-border"
                  }`}
                >
                  {RATING_FILTERS.map((f) => (
                    <option key={f.label} value={f.value === null ? "" : String(f.value)}>
                      {f.value === null ? "All Ratings" : f.value === 0 ? "Not Rated" : `${f.label} ★`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categories: main categories, then the picked ones' sub-categories (auto-scrolling row) */}
            <div className="pt-3 border-t border-border/60">
              <FundCategoryFilter mains={info?.assetClasses ?? []} value={category} onChange={pickCategory} />
            </div>
          </div>

          {/* Sort + active filters */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mr-0.5">Sort</span>
              <button
                onClick={toggleNameSort}
                aria-pressed={sort.key === "name"}
                title="Sort by fund name"
                className={`px-2.5 py-1 rounded-[5px] text-[11px] font-bold whitespace-nowrap border flex items-center gap-1 transition-all duration-200 ${
                  sort.key === "name"
                    ? "bg-burgundy text-white border-burgundy"
                    : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                }`}
              >
                <ArrowUpDown className="w-3 h-3" /> {sort.key === "name" && sort.order === "desc" ? "Z → A" : "A → Z"}
              </button>
              {/* Phones have no column headers, so the column sorts live here */}
              <div className="lg:hidden flex items-center gap-2.5 ml-1">
                {SORT_COLUMNS.map((c) => <SortHeader key={c.key} label={c.label} k={c.key} sort={sort} onSort={sortBy} />)}
              </div>
            </div>
            {/* Picked categories, each removable, just before Clear filters */}
            <SelectedCategoryChips mains={info?.assetClasses ?? []} value={category} onChange={pickCategory} />
            {hasFilter && (
              <button
                onClick={clearAll}
                className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Fund Table */}
          <div className="rounded-[8px] border border-border bg-white overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div
              className="hidden lg:grid items-center px-4 py-2.5 border-b border-border bg-cream/60"
              style={{ gridTemplateColumns: TABLE_COLUMNS }}
            >
              <div />
              <div className="pl-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Fund</div>
              <div className="pr-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Category</div>
              <div className="pr-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Fund Manager</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Risk</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-center">Rating</div>
              {SORT_COLUMNS.map((c) => <SortHeader key={c.key} label={c.label} k={c.key} sort={sort} onSort={sortBy} />)}
              {/* Min SIP column disabled for now (needs GetFundOverview per fund)
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Min SIP</div>
              */}
            </div>

            {/* Rows */}
            <AnimatePresence mode="popLayout">
              {fundsResult.loading && !funds ? (
                <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="hidden lg:block"><TableRowsSkeleton rows={PER_PAGE} columns={TABLE_COLUMNS} cells={9} label="Loading funds" /></div>
                  <div className="lg:hidden"><TableRowsSkeleton rows={PER_PAGE} columns="minmax(0,1fr) 64px" avatar label="Loading funds" /></div>
                </motion.div>
              ) : tableStatus ? (
                <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-14 text-center text-muted-foreground text-sm">
                  {tableStatus}
                </motion.div>
              ) : rows.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-14 text-center text-muted-foreground text-sm">
                  No funds match your filters.
                </motion.div>
              ) : (
                rows.map((fund, idx) => (
                  <motion.div
                    key={fund.schemeCode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.13, delay: idx * 0.016 }}
                    className="border-b border-border/40 last:border-0 hover:bg-cream/25 transition-colors duration-150 cursor-pointer group"
                  >
                    <Link href={fundHref(fund)} className="block" aria-label={`${fund.name} details`}>
                    {/* Mobile */}
                    <div className="lg:hidden flex items-center justify-between px-4 py-3.5 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <AmcLogo name={fund.amcName ?? fund.name} logoUrl={fund.amcLogoUrl} colorId={fund.amcId} />
                        <div className="min-w-0">
                          <div className="font-extrabold text-sm text-foreground leading-tight truncate">{fund.name}</div>
                          <div className="flex items-center gap-1.5 mt-1 min-w-0">
                            <AssetClassBadge assetClass={fund.assetClass} />
                            <span className="text-[9px] text-muted-foreground/85 truncate">{fund.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 space-y-0.5">
                        {/* The column being sorted (3Y unless a return column is picked) */}
                        <div className="text-[10px] font-semibold text-muted-foreground">{mobileReturn.label}</div>
                        <ReturnCell val={mobileReturn.value(fund)} />
                      </div>
                    </div>

                    {/* Desktop */}
                    <div
                      className="hidden lg:grid px-4 py-3"
                      style={{ gridTemplateColumns: TABLE_COLUMNS }}
                    >
                      <AmcLogo name={fund.amcName ?? fund.name} logoUrl={fund.amcLogoUrl} colorId={fund.amcId} />

                      <div className="pl-3 pr-3 min-w-0 flex flex-col justify-center gap-0.5">
                        <div className="font-extrabold text-sm text-foreground group-hover:text-burgundy transition-colors leading-tight line-clamp-2" title={fund.name}>{fund.name}</div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <AssetClassBadge assetClass={fund.assetClass} />
                        </div>
                      </div>

                      <div className="flex items-center pr-3 min-w-0">
                        <span className="text-xs font-semibold text-foreground/80 leading-snug line-clamp-2" title={fund.category ?? undefined}>{fund.category ?? "—"}</span>
                      </div>

                      {/* Fund manager(s): first name, then "+N more"; hover shows everyone */}
                      <div className="flex items-center pr-3 min-w-0">
                        {fund.fundManagers && fund.fundManagers.length > 0 ? (
                          <span className="min-w-0 text-xs text-foreground/80 leading-snug" title={fund.fundManagers.join(", ")}>
                            <span className="block font-semibold truncate">{fund.fundManagers[0]}</span>
                            {fund.fundManagers.length > 1 && (
                              <span className="block text-[10px] text-muted-foreground">+{fund.fundManagers.length - 1} more</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>

                      <div className="flex items-center pr-2">
                        <RiskBadge level={fund.risk} />
                      </div>

                      <div className="flex items-center justify-center">
                        <RatingCell rating={fund.rating} />
                      </div>

                      <div className="flex items-center justify-end">
                        <span className="text-xs font-semibold text-muted-foreground">{formatAum(fund.aumCr)}</span>
                      </div>

                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns.oneYear} /></div>
                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns.threeYear} /></div>
                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns.fiveYear} /></div>

                      {/* Min SIP column disabled for now
                      <div className="flex items-center justify-end">
                        <span className="text-xs font-semibold text-muted-foreground">
                          ₹{fund.minSIP.toLocaleString("en-IN")}
                        </span>
                      </div>
                      */}
                    </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Page {page} of {totalPages.toLocaleString("en-IN")}</p>
              <div className="flex gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`min-w-8 h-8 px-1.5 rounded-[5px] border text-xs font-bold transition-all ${
                        pg === page ? "bg-burgundy text-white border-burgundy" : "border-border text-muted-foreground hover:text-foreground"
                      }`}>
                      {pg}
                    </button>
                  )
                })}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Why Shree Varahi</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">The smarter way to invest in mutual funds.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Award,
                color: "#8B0D19",
                title: "0% Commission",
                desc: "Invest directly in regular & direct mutual funds with zero hidden charges or commission.",
                points: ["No entry load", "No exit penalties", "Transparent pricing"],
              },
              {
                icon: BarChart2,
                color: "#8B0D19",
                title: "Research Backed",
                desc: "Fund recommendations powered by SEBI-registered research analysts and quant models.",
                points: ["Expert analysis", "Quant screener", "Risk scoring"],
              },
              {
                icon: Zap,
                color: "#8B0D19",
                title: "Seamless Investing",
                desc: "Start, pause, or switch SIPs in seconds via app or web. Real-time portfolio tracking.",
                points: ["One-click SIP", "Instant switch", "Live NAV tracking"],
              },
              {
                icon: Users,
                color: "#8B0D19",
                title: "Trusted by Millions",
                desc: `31+ years of experience. Backed by 5 lakh+ active investors and ${info ? `${totalAmcs} AMC partners` : "leading AMC partners"}.`,
                points: ["31 years legacy", info ? `${totalAmcs} AMC partners` : "AMC partners", "Secure & regulated"],
              },
            ].map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/20 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-4"
                    style={{ background: b.color + "14", border: `1px solid ${b.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: b.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">{b.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{b.desc}</p>
                  <ul className="space-y-1.5">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-profit shrink-0" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold text-foreground/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AMC PARTNERS ── */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Fund Houses</p>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">AMC Partners</h2>
          </div>

          {!info && (pageData.error ? <p className="py-10 text-center text-sm text-muted-foreground">{sectionStatus}</p> : <CardGridSkeleton count={12} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3" cardClassName="h-28 flex flex-col items-center" />)}

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {visibleAmcs.map((amc) => (
              <motion.div key={amc.id} whileHover={{ scale: 1.04 }} transition={{ duration: 0.15 }}>
                <Link
                  href={`/mutual-funds/amc/${amc.slug}`}
                  className="h-full bg-white border border-border/60 rounded-[8px] p-3 flex flex-col items-center gap-2 hover:border-gold/25 hover:shadow-sm transition-all"
                >
                  <AmcLogo name={amc.name} logoUrl={amc.logoUrl} colorId={amc.id} size="lg" />
                  <span className="text-[11px] font-bold text-muted-foreground text-center leading-tight">{amc.name}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground/85">{amc.fundCount} funds</span>
                </Link>
              </motion.div>
            ))}

            {/* Show the rest */}
            {amcs.length > AMC_PREVIEW && (
              <motion.button
                type="button"
                onClick={() => setShowAllAmcs((v) => !v)}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.15 }}
                className="bg-cream border border-border/50 rounded-[8px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold/30"
              >
                <div className="w-12 h-12 rounded-[8px] bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold-deep font-black text-base">
                    {showAllAmcs ? "−" : `+${amcs.length - AMC_PREVIEW}`}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground text-center">{showAllAmcs ? "Show Less" : "More AMCs"}</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Getting Started</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Start investing in 4 easy steps.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Open Account",      desc: "Complete KYC digitally in under 5 minutes with Aadhaar & PAN.",          icon: Users    },
              { step: "02", title: "Browse Funds",      desc: `Search from ${info ? `${totalFunds} funds` : "our fund list"} filtered by category, risk, and returns.`, icon: Search   },
              { step: "03", title: "Choose SIP/Lumpsum",desc: "Pick monthly SIP or one-time lumpsum. Start from just ₹100.",           icon: Calculator},
              { step: "04", title: "Track Portfolio",   desc: "Monitor NAV, returns, and portfolio health in real time on app or web.", icon: BarChart2 },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  {/* connector line */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-0 h-px bg-border/60 z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-burgundy/8 border-2 border-burgundy/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[9px] font-extrabold text-burgundy/60 tracking-widest">{step.step}</span>
                    <h3 className="font-extrabold text-sm text-foreground">{step.title}</h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-burgundy text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.13) 0%, transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Start your SIP today. Watch it grow.
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
            Open a free account and invest in {info ? `${totalFunds} mutual funds` : "mutual funds"} with zero commission, expert research, and real-time tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-white hover:bg-gold-champagne text-burgundy font-black px-8 h-11 text-sm rounded-[5px] shadow-xl">
              Start SIP Now →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-11 text-sm rounded-[5px]"
              onClick={() => document.getElementById("find-your-fund")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Funds
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

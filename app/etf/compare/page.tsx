"use client"

import { Suspense, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronLeft, ArrowUp, ArrowDown, ArrowUpDown, Search, X } from "lucide-react"
import { TableRowsSkeleton } from "@/components/skeletons"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmartSearch } from "@/components/smart-controls"
import { StockAvatar } from "@/components/stock-avatar"
import { useEtfList } from "@/hooks/etf/use-etf"
import type { EtfCategory, EtfListRow } from "@/lib/etf/types"
import { NO_VALUE, formatPercent, formatPrice, formatRupees } from "@/lib/stocks/format"

// Every ETF is loaded once from the backend (/api/v1/etfs); search, filter, sort and paging run here.

const CATEGORIES: ("All" | EtfCategory)[] = ["All", "Equity", "Commodity", "Debt", "Global"]
const PER_PAGE = 10

type SortKey = "name" | "price" | "change" | "aum" | "expense" | "return1Y" | "return3Y" | "return5Y"
type SortDir = "asc" | "desc"

const COLUMNS: { key: SortKey; label: string; value: (row: EtfListRow) => number | string | null }[] = [
  { key: "name",     label: "ETF name",      value: (r) => r.name },
  { key: "price",    label: "Current price", value: (r) => r.price },
  { key: "change",   label: "Change",        value: (r) => r.changePct },
  { key: "aum",      label: "AUM",           value: (r) => r.aumCr },
  { key: "expense",  label: "Expense ratio", value: (r) => r.expenseRatio },
  { key: "return1Y", label: "1Y return",     value: (r) => r.return1Y },
  { key: "return3Y", label: "3Y return",     value: (r) => r.return3Y },
  { key: "return5Y", label: "5Y return",     value: (r) => r.return5Y },
]

/** Default direction when a column is first sorted: cheapest first for costs, highest first for the rest. */
const FIRST_DIR: Record<SortKey, SortDir> = {
  name: "asc", price: "desc", change: "desc", aum: "desc", expense: "asc", return1Y: "desc", return3Y: "desc", return5Y: "desc",
}

const isSortKey = (value: string | null): value is SortKey => COLUMNS.some((c) => c.key === value)

const changeColor = (value: number | null) =>
  value === null ? "text-muted-foreground" : value >= 0 ? "text-profit" : "text-loss"

const formatAum = (value: number | null) => (value === null ? NO_VALUE : `₹${value.toLocaleString("en-IN")} Cr`)
const formatPlainPct = (value: number | null) => (value === null ? NO_VALUE : `${value.toFixed(2)}%`)

export default function EtfComparePage() {
  // useSearchParams needs a Suspense boundary in the App Router.
  return (
    <Suspense>
      <EtfCompare />
    </Suspense>
  )
}

function EtfCompare() {
  const router = useRouter()
  const params = useSearchParams()
  const initialSort = params.get("sort")
  // Default: highest current price first.
  const startKey: SortKey = isSortKey(initialSort) ? initialSort : "price"

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<"All" | EtfCategory>("All")
  const [sortKey, setSortKey] = useState<SortKey>(startKey)
  const [sortDir, setSortDir] = useState<SortDir>(FIRST_DIR[startKey])
  const [page, setPage] = useState(1)

  const list = useEtfList()
  const all = useMemo(() => list.data?.items ?? [], [list.data])

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase()
    const column = COLUMNS.find((c) => c.key === sortKey)!
    return all
      .filter((r) => category === "All" || r.category === category)
      .filter((r) => !query || r.name.toLowerCase().includes(query) || r.symbol.toLowerCase().includes(query))
      .sort((a, b) => {
        const x = column.value(a)
        const y = column.value(b)
        // Missing values always go last.
        if (x === null || y === null) return (x === null ? 1 : 0) - (y === null ? 1 : 0)
        const order = typeof x === "string" ? x.localeCompare(y as string) : x - (y as number)
        return sortDir === "asc" ? order : -order
      })
  }, [all, search, category, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = rows.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const sortBy = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir(FIRST_DIR[key]) }
    setPage(1)
  }

  const hasFilter = search !== "" || category !== "All"
  const grid = "minmax(220px,1.6fr) repeat(7, minmax(92px,1fr))"

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/etf" className="hover:text-foreground transition-colors">ETFs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Compare ETFs</span>
          </nav>
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">ETF Research</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">All ETFs</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Compare ETFs by price, fund size, cost and returns. Click any column heading to sort.
          </p>
        </div>
      </section>

      {/* ── FILTERS + TABLE ── */}
      <section className="bg-background py-6 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2.5 mb-4">
            <SmartSearch value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search ETFs…" ariaLabel="Search ETFs" shortcut className="w-full sm:w-80" />
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setPage(1) }}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold whitespace-nowrap border transition-all duration-200 ${
                    category === c
                      ? "bg-burgundy text-white border-burgundy"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-bold text-foreground">{rows.length}</span>{" "}ETFs
              {category !== "All" && <span className="ml-1.5 font-semibold text-foreground">· {category}</span>}
            </p>
            {hasFilter && (
              <button
                onClick={() => { setSearch(""); setCategory("All"); setPage(1) }}
                className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                {/* Header */}
                <div className="grid px-4 py-2.5 border-b border-border bg-cream/70" style={{ gridTemplateColumns: grid }}>
                  {COLUMNS.map((c, i) => {
                    const active = c.key === sortKey
                    // Every column shows it can be sorted. Arrow up = highest → lowest (Z → A for names),
                    // arrow down = lowest → highest (A → Z).
                    const Icon = !active ? ArrowUpDown : sortDir === "desc" ? ArrowUp : ArrowDown
                    return (
                      <button
                        key={c.key}
                        onClick={() => sortBy(c.key)}
                        aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                        title={active ? (sortDir === "desc" ? "Highest to lowest" : "Lowest to highest") : `Sort by ${c.label}`}
                        className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${
                          i === 0 ? "justify-start" : "justify-end"
                        } ${active ? "text-burgundy" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {c.label}
                        <Icon className={`w-3 h-3 shrink-0 ${active ? "" : "opacity-50"}`} />
                      </button>
                    )
                  })}
                </div>

                {/* Rows */}
                {list.loading && !list.data ? (
                  <TableRowsSkeleton rows={PER_PAGE} columns={grid} cells={7} avatar label="Loading ETFs" />
                ) : pageRows.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    {list.error ? (
                      <>Unable to load ETFs. <button onClick={list.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
                    ) : "No ETFs match your filters."}
                  </div>
                ) : (
                  pageRows.map((r) => (
                    <div
                      key={r.slug}
                      onClick={() => router.push(`/etf/${r.slug}`)}
                      className="grid px-4 py-3 border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors cursor-pointer items-center"
                      style={{ gridTemplateColumns: grid }}
                    >
                      <Link href={`/etf/${r.slug}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 min-w-0">
                        <StockAvatar symbol={r.symbol} name={r.name} logoUrl={null} className="w-9 h-9 text-[11px]" />
                        <span className="min-w-0">
                          <span className="block font-extrabold text-sm text-foreground truncate">{r.name}</span>
                          <span className="block text-[10px] text-muted-foreground/80 mt-0.5">{r.category}</span>
                        </span>
                      </Link>
                      <span className="text-right text-sm font-extrabold text-foreground tabular-nums">{formatRupees(r.price)}</span>
                      <span className={`text-right text-xs font-black tabular-nums ${changeColor(r.changePct)}`}>{formatPercent(r.changePct)}</span>
                      <span className="text-right text-[12px] font-semibold text-foreground tabular-nums">{formatAum(r.aumCr)}</span>
                      <span className="text-right text-[12px] font-semibold text-foreground tabular-nums">{formatPlainPct(r.expenseRatio)}</span>
                      <span className={`text-right text-xs font-black tabular-nums ${changeColor(r.return1Y)}`}>{formatPercent(r.return1Y)}</span>
                      <span className={`text-right text-xs font-black tabular-nums ${changeColor(r.return3Y)}`}>{formatPercent(r.return3Y)}</span>
                      <span className={`text-right text-xs font-black tabular-nums ${changeColor(r.return5Y)}`}>{formatPercent(r.return5Y)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground mt-2">3Y and 5Y returns are annualised. &quot;{NO_VALUE}&quot; means the ETF is younger than the period.</p>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Page {currentPage} of {totalPages}</p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-8 h-8 rounded-[5px] border text-xs font-bold transition-all ${
                      pg === currentPage
                        ? "bg-burgundy text-white border-burgundy"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

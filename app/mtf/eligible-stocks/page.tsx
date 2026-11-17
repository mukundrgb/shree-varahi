"use client"

// All MTF eligible stocks with their margin % and MTF multiplier (/api/v1/mtf/stocks).

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useMtfStocks } from "@/hooks/use-mtf"
import type { MtfSort } from "@/lib/mtf/api-client"

const PER_PAGE = 25
const SEARCH_DEBOUNCE_MS = 300
const TABLE_COLUMNS = "56px 1fr 150px 140px 140px"

const longDate = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null

function multiplierStyle(m: number) {
  if (m >= 4) return "bg-emerald-50 text-emerald-700 border-emerald-200"
  if (m >= 3) return "bg-blue-50 text-blue-700 border-blue-200"
  return "bg-amber-50 text-amber-700 border-amber-200"
}

export default function MtfEligibleStocksPage() {
  const [search, setSearch] = useState("")
  const [query, setQuery]   = useState("")
  const [sort, setSort]     = useState<MtfSort>("symbol")
  const [order, setOrder]   = useState<"asc" | "desc">("asc")
  const [page, setPage]     = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => { setQuery(search.trim()); setPage(1) }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [search])

  const stockQuery = useMemo(
    () => ({ q: query || undefined, sort, order, page, limit: PER_PAGE }),
    [query, sort, order, page],
  )
  const result = useMtfStocks(stockQuery)
  const data = result.data
  const rows = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const effective = longDate(data?.effectiveDate ?? null)

  // First click on a column sorts it (highest multiplier / margin first); the next click reverses it.
  const sortBy = (key: MtfSort) => {
    if (sort === key) setOrder((o) => (o === "asc" ? "desc" : "asc"))
    else { setSort(key); setOrder(key === "symbol" ? "asc" : "desc") }
    setPage(1)
  }

  const SortIcon = ({ k }: { k: MtfSort }) =>
    sort !== k ? <ArrowUpDown className="w-3 h-3 opacity-50" /> : order === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />

  const header = (k: MtfSort, label: string, align: "left" | "right") => (
    <button type="button" onClick={() => sortBy(k)}
      className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${align === "right" ? "justify-end ml-auto" : ""} ${sort === k ? "text-burgundy" : "text-muted-foreground hover:text-foreground"}`}>
      {label} <SortIcon k={k} />
    </button>
  )

  const status = result.loading && !data
    ? "Loading stocks…"
    : result.error && !data
      ? <>Unable to load MTF stocks. <button onClick={result.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-cream border-b border-border/40 pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mtf" className="hover:text-foreground transition-colors">MTF</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Eligible Stocks</span>
          </nav>
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">Margin Trading Facility</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            MTF <span className="text-burgundy">Eligible Stocks</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            {data ? `${data.totalStocks.toLocaleString("en-IN")} stocks` : "Stocks"} you can buy with Shree Varahi&apos;s Margin Trading Facility,
            with the margin you pay and the buying power you get on each. MTF multiplier = 100 ÷ margin %.
            {effective && <> Margin list effective {effective}.</>}
          </p>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search stock e.g. RELIANCE"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search MTF stocks"
                className="pl-9 pr-8 py-2 text-sm rounded-[5px] border border-border bg-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 w-64 max-w-full"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-bold text-foreground">{data ? data.total.toLocaleString("en-IN") : "—"}</span> stocks
              {result.loading && data && <span className="ml-2 text-muted-foreground/60">Updating…</span>}
            </p>
          </div>

          <div className="rounded-[8px] border border-border bg-white overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Desktop header */}
            <div className="hidden md:grid items-center px-4 py-2.5 border-b border-border bg-cream/60" style={{ gridTemplateColumns: TABLE_COLUMNS }}>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">#</div>
              {header("symbol", "Stock", "left")}
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">ISIN</div>
              {header("margin", "Margin Required", "right")}
              {header("multiplier", "MTF Multiplier", "right")}
            </div>

            {/* Mobile sort */}
            <div className="md:hidden flex items-center gap-3 px-4 py-2.5 border-b border-border bg-cream/60">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Sort</span>
              {header("symbol", "Stock", "left")}
              {header("margin", "Margin", "left")}
              {header("multiplier", "Multiplier", "left")}
            </div>

            {status ? (
              <div className="py-14 text-center text-muted-foreground text-sm">{status}</div>
            ) : rows.length === 0 ? (
              <div className="py-14 text-center text-muted-foreground text-sm">No MTF eligible stock matches your search.</div>
            ) : (
              rows.map((s, i) => (
                <div key={s.symbol} className="border-b border-border/40 last:border-0 hover:bg-cream/25 transition-colors">
                  {/* Mobile */}
                  <div className="md:hidden flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-foreground truncate">{s.symbol}</div>
                      {s.name && <div className="text-[11px] text-muted-foreground truncate">{s.name}</div>}
                      <div className="text-[11px] text-muted-foreground mt-0.5">Margin {s.marginPct.toFixed(2)}%</div>
                    </div>
                    <span className={`text-[12px] font-black px-2 py-0.5 rounded-[4px] border tabular-nums shrink-0 ${multiplierStyle(s.multiplier)}`}>
                      {s.multiplier.toFixed(2)}x
                    </span>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:grid items-center px-4 py-3" style={{ gridTemplateColumns: TABLE_COLUMNS }}>
                    <div className="text-xs text-muted-foreground tabular-nums">{((data?.page ?? 1) - 1) * PER_PAGE + i + 1}</div>
                    <div className="min-w-0 pr-3">
                      <div className="font-extrabold text-sm text-foreground truncate">{s.symbol}</div>
                      {s.name && <div className="text-[11px] text-muted-foreground truncate">{s.name}</div>}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono tracking-wide">{s.isin ?? "—"}</div>
                    <div className="text-sm font-bold text-foreground text-right tabular-nums">{s.marginPct.toFixed(2)}%</div>
                    <div className="text-right">
                      <span className={`text-[12px] font-black px-2 py-0.5 rounded-[4px] border tabular-nums ${multiplierStyle(s.multiplier)}`}>
                        {s.multiplier.toFixed(2)}x
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Page {data?.page ?? page} of {totalPages.toLocaleString("en-IN")}</p>
              <div className="flex gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page"
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
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page"
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
            Margins are as per the broker&apos;s MTF margin list and may change. Buying power = your capital × MTF multiplier.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

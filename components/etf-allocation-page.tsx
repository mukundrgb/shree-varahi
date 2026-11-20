"use client"

// Shared layout for the ETF allocation research pages (Sector Allocation, Asset Allocation):
// header, "Select ETF" picker, search box, and a Name · Holding % · Total Shares table.
// Each page passes a hook that turns the picked ETF into allocation rows.

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronRight, ChevronDown, ArrowUpRight, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StockAvatar } from "@/components/stock-avatar"
import { TableRowsSkeleton } from "@/components/skeletons"
import { useEtfList } from "@/hooks/etf/use-etf"
import { ALL_ETFS, type EtfListParams } from "@/lib/etf/api-client"
import type { EtfCategory } from "@/lib/etf/types"
import { NO_VALUE, formatDate } from "@/lib/stocks/format"

/** One row of an allocation table: a sector, an asset class, … */
export interface AllocationRow {
  name: string
  /** Share of the ETF's assets, in percent */
  weight: number
  /** Number of shares/units in this row; null until the data is available */
  totalShares: number | null
}

export interface AllocationResult {
  rows: AllocationRow[]
  loading: boolean
  error: boolean
  retry: () => void
  /** YYYY-MM-DD */
  asOf: string | null
  /** Shown when the ETF has no rows (and nothing failed) */
  emptyText?: string
}

const CATEGORY_ORDER: EtfCategory[] = ["Equity", "Commodity", "Debt", "Global"]
const GRID = "minmax(200px,1fr) minmax(160px,220px) minmax(120px,160px)"

const formatShares = (value: number | null) => (value === null ? NO_VALUE : value.toLocaleString("en-IN"))

export function EtfAllocationPage({
  title,
  breadcrumb,
  description,
  category,
  rowLabel,
  searchPlaceholder,
  useAllocation,
}: {
  title: string
  breadcrumb: string
  description: ReactNode
  /** Only ETFs of this category in the picker; omitted = every category, grouped */
  category?: EtfCategory
  /** What a row is, plural, e.g. "sectors" */
  rowLabel: string
  searchPlaceholder: string
  /** Must be a stable, module-level hook. `search` is the search box text, sent to the API as ?search= */
  useAllocation: (slug: string, isin: string | null, search: string) => AllocationResult
}) {
  const params = useSearchParams()
  // Dropdown list: GET /etfs?category=<category>&limit=500, or GET /etfs?limit=500 for every category.
  const listParams: EtfListParams = category ? { category, limit: ALL_ETFS } : { limit: ALL_ETFS }
  const etfList = useEtfList(listParams)
  const etfs = useMemo(() => etfList.data?.items ?? [], [etfList.data])
  const requested = params.get("etf")

  const [picked, setPicked] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  // Picked ETF, else the one in ?etf= (slug or ISIN), else the first in the list.
  const fromUrl = requested ? etfs.find((e) => e.slug === requested || e.isin?.toUpperCase() === requested.toUpperCase()) : undefined
  const slug = picked ?? fromUrl?.slug ?? etfs[0]?.slug ?? ""
  const etf = etfs.find((e) => e.slug === slug) ?? null
  // The search box is sent to the API as ?search=, a moment after the user stops typing.
  const [query, setQuery] = useState("")
  useEffect(() => {
    const next = search.trim()
    const timer = setTimeout(() => setQuery(next), next ? 300 : 0)
    return () => clearTimeout(timer)
  }, [search])
  const result = useAllocation(slug, etf?.isin ?? null, query)

  const rows = result.rows
  const maxWeight = Math.max(...rows.map((r) => r.weight), 1)
  const loading = !etfList.error && !result.error && (etfList.loading || (!!slug && result.loading))
  const failed = etfList.error || result.error

  // Every category: group the picker by category (Equity, Commodity, Debt, Global).
  const groups = category
    ? null
    : CATEGORY_ORDER.map((c) => ({ category: c, items: etfs.filter((e) => e.category === c) })).filter((g) => g.items.length)

  const pickEtf = (next: string) => { setPicked(next); setSearch(""); setQuery("") }

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
            <span className="text-foreground font-semibold">{breadcrumb}</span>
          </nav>
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">ETF Research</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{description}</p>
        </div>
      </section>

      <section className="bg-background py-6 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ETF picker + search */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-5">
            <div className="w-full sm:w-80">
              <label htmlFor="etf-picker" className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
                Select {category ? `${category} ` : ""}ETF
              </label>
              <div className="relative">
                <select
                  id="etf-picker"
                  value={slug}
                  onChange={(e) => pickEtf(e.target.value)}
                  className="w-full appearance-none pl-3 pr-9 py-2 text-sm font-semibold rounded-[5px] border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                >
                  {groups
                    ? groups.map((g) => (
                        <optgroup key={g.category} label={g.category}>
                          {g.items.map((e) => <option key={e.slug} value={e.slug}>{e.name}</option>)}
                        </optgroup>
                      ))
                    : etfs.map((e) => <option key={e.slug} value={e.slug}>{e.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="w-full sm:w-80">
              <label htmlFor="allocation-search" className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
                Search {rowLabel}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <input
                  id="allocation-search"
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {etf && (
              <Link href={`/etf/${etf.slug}`} className="lg:ml-auto lg:pb-2 text-[12px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors">
                View {etf.name} details <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {etf && (
            <div className="flex items-center gap-3 mb-3">
              <StockAvatar symbol={etf.symbol} name={etf.name} logoUrl={null} className="w-9 h-9 text-[11px]" />
              <div>
                <p className="text-sm font-black text-foreground flex items-center gap-2">
                  {etf.name}
                  <span className="text-[10px] font-black px-2 py-0.5 bg-gold/15 text-gold-deep rounded-[4px]">{etf.category}</span>
                </p>
                {rows.length > 0 && <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{rows.length}</span> {rows.length === 1 ? rowLabel.replace(/s$/, "") : rowLabel}
                  {query && <> matching &ldquo;{query}&rdquo;</>}
                  {result.asOf && <> · as of {formatDate(result.asOf)}</>}
                </p>}
              </div>
            </div>
          )}

          {/* Table: Name · Holding % · Total Shares */}
          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="grid px-4 py-2.5 border-b border-border bg-cream/70" style={{ gridTemplateColumns: GRID }}>
                  {["Name", "Holding %", "Total Shares"].map((h, i) => (
                    <div key={h} className={`text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground ${i === 0 ? "text-left" : "text-right"}`}>{h}</div>
                  ))}
                </div>

                {rows.length === 0 && loading ? (
                  <TableRowsSkeleton rows={8} columns={GRID} label={`Loading ${rowLabel}`} />
                ) : rows.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    {failed ? (
                      <>Unable to load {rowLabel}. <button onClick={() => { etfList.retry(); result.retry() }} className="text-burgundy font-bold hover:underline">Retry</button></>
                    ) : query ? `No ${rowLabel} match your search.`
                      : result.emptyText ?? `No ${rowLabel} data for this ETF.`}
                  </div>
                ) : (
                  rows.map((r) => (
                    <div key={r.name} className="grid px-4 py-3 border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors items-center" style={{ gridTemplateColumns: GRID }}>
                      <div className="min-w-0 pr-3 text-sm font-extrabold text-foreground truncate" title={r.name}>{r.name}</div>
                      <span className="flex items-center justify-end gap-2">
                        <span className="hidden sm:block w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <span className="block h-full bg-gold rounded-full" style={{ width: `${Math.max(0, r.weight / maxWeight) * 100}%` }} />
                        </span>
                        <span className="text-[13px] font-black text-foreground tabular-nums w-14 text-right">{r.weight.toFixed(2)}%</span>
                      </span>
                      <span className="text-right text-[13px] font-bold text-foreground tabular-nums">{formatShares(r.totalShares)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

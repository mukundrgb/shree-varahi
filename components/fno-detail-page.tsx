"use client"

// Detail page of one underlying from the F&O Markets tabs (Index Future, Stocks Future, Index Option, Stock Option):
// header with name, price, change and % change, then the "All Indices" table of its contracts.
// The header comes from the tab's card list; the table's API isn't connected yet, so it's ready but empty.
// To plug the data in: return FnoDetailRow[] from useFnoContracts below.

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, X, TrendingUp, TrendingDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StockAvatar } from "@/components/stock-avatar"
import { Bone, TableRowsSkeleton } from "@/components/skeletons"
import { useFnoCard } from "@/hooks/use-fno"
import { isOptionsCategory, type FnoCategory, type FnoDetailRow } from "@/lib/fno/api-client"
import { NO_VALUE, formatDate, formatQuoteTime } from "@/lib/stocks/format"

const CATEGORY_LABEL: Record<FnoCategory, string> = {
  "index-futures": "Index Future",
  "stock-futures": "Stocks Future",
  "index-options": "Index Option",
  "stock-options": "Stock Option",
}

interface Column {
  label: string
  width: string
  align?: "left" | "right"
  render: (row: FnoDetailRow) => React.ReactNode
}

const num = (v: number | null | undefined, digits = 2) =>
  v === null || v === undefined ? NO_VALUE : v.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits })
const tone = (v: number | null) => (v === null ? "text-muted-foreground" : v >= 0 ? "text-profit" : "text-loss")
const signed = (v: number | null, suffix = "") => (v === null ? NO_VALUE : `${v >= 0 ? "+" : ""}${num(v)}${suffix}`)

const NAME: Column = { label: "Name", width: "minmax(180px,1.6fr)", align: "left", render: (r) => <span className="text-sm font-extrabold text-foreground truncate block" title={r.name}>{r.name}</span> }
const EXPIRY: Column = { label: "Expiry Date", width: "104px", render: (r) => formatDate(r.expiry) }
const PREV_LTP: Column = { label: "Prev. LTP", width: "96px", render: (r) => num(r.prevLtp) }
const LTP: Column = { label: "LTP", width: "96px", render: (r) => <span className="font-black text-foreground">{num(r.ltp)}</span> }
const FAO_DIFF: Column = { label: "FAO Diff", width: "92px", render: (r) => <span className={`font-black ${tone(r.faoDiff)}`}>{signed(r.faoDiff)}</span> }
const FAO_CHANGE: Column = { label: "FAO Change", width: "100px", render: (r) => <span className={`font-black ${tone(r.faoChange)}`}>{signed(r.faoChange, "%")}</span> }
const STRIKE: Column = { label: "Strike Price", width: "104px", render: (r) => num(r.strike) }
const OPTION_TYPE: Column = {
  label: "Option Type", width: "96px",
  render: (r) => r.optionType
    ? <span className={`text-[10px] font-black px-2 py-0.5 rounded-[4px] ${r.optionType === "CE" ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>{r.optionType}</span>
    : NO_VALUE,
}
const OI: Column = { label: "Open Interest", width: "116px", render: (r) => num(r.openInterest, 0) }
const PREV_OI: Column = { label: "Prev. Open Interest", width: "140px", render: (r) => num(r.prevOpenInterest, 0) }
const UPDATED: Column = { label: "Updation Time", width: "150px", render: (r) => <span className="text-xs text-muted-foreground">{formatQuoteTime(r.updatedAt)}</span> }

const FUTURES_COLUMNS = [NAME, EXPIRY, PREV_LTP, LTP, FAO_DIFF, FAO_CHANGE, OI, PREV_OI, UPDATED]
const OPTIONS_COLUMNS = [NAME, EXPIRY, PREV_LTP, LTP, FAO_DIFF, FAO_CHANGE, STRIKE, OPTION_TYPE, OI, PREV_OI, UPDATED]

/** Contracts of the underlying for the table. Not connected yet. */
function useFnoContracts(_category: FnoCategory, _slug: string) {
  return {
    rows: [] as FnoDetailRow[],
    loading: false,
    error: false,
    retry: () => {},
    emptyText: "Contract data for this underlying will be available soon.",
  }
}

export function FnoDetailPage({ category, slug }: { category: FnoCategory; slug: string }) {
  const options = isOptionsCategory(category)
  const columns = options ? OPTIONS_COLUMNS : FUTURES_COLUMNS
  const grid = columns.map((c) => c.width).join(" ")
  const minWidth = options ? 1360 : 1150

  const header = useFnoCard(category, slug)
  const card = header.data?.card ?? null
  const contracts = useFnoContracts(category, slug)
  const [search, setSearch] = useState("")

  const query = search.trim().toLowerCase()
  const rows = query ? contracts.rows.filter((r) => r.name.toLowerCase().includes(query)) : contracts.rows

  const headerLoading = !header.data && !header.error
  const notFound = header.data && !card
  const up = (card?.change ?? 0) >= 0
  const hasChange = card?.change != null && card?.changePct != null
  const changeTone = !hasChange ? "text-muted-foreground" : up ? "text-profit" : "text-loss"

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HEADER: name · price · change · % change ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/futures-options" className="hover:text-foreground transition-colors">Futures &amp; Options</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/futures-options#fno-markets" className="hover:text-foreground transition-colors">{CATEGORY_LABEL[category]}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold truncate">{card?.name ?? slug.toUpperCase()}</span>
          </nav>

          {headerLoading ? (
            <div className="flex items-center gap-4" aria-busy="true" aria-label="Loading">
              <Bone className="w-14 h-14 rounded-[8px]" />
              <div className="space-y-2">
                <Bone className="h-7 w-56" />
                <Bone className="h-5 w-40" />
              </div>
            </div>
          ) : header.error && !header.data ? (
            <div className="text-sm">
              <p className="font-black text-foreground">Unable to load this contract</p>
              <button onClick={header.retry} className="mt-2 text-xs font-bold text-burgundy hover:underline">Try again</button>
            </div>
          ) : notFound ? (
            <div className="text-sm">
              <p className="text-2xl font-black text-foreground">{slug.toUpperCase()}</p>
              <p className="text-muted-foreground mt-1">This underlying isn&apos;t in the {CATEGORY_LABEL[category]} list right now.</p>
            </div>
          ) : card && (
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <StockAvatar symbol={card.symbol} name={card.name} logoUrl={card.logoUrl} className="w-14 h-14 text-sm" />
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-1">{CATEGORY_LABEL[category]}</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight truncate">{card.name}</h1>
                  {card.contract && <p className="text-xs text-muted-foreground mt-1">{card.contract.label}</p>}
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-3xl sm:text-4xl font-black text-foreground tabular-nums">
                  {card.ltp === null ? NO_VALUE : `₹${num(card.ltp)}`}
                </p>
                <p className={`flex sm:justify-end items-center gap-1.5 text-sm font-black tabular-nums mt-1 ${changeTone}`}>
                  {hasChange && (up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />)}
                  <span>{signed(card.change)}</span>
                  <span>({signed(card.changePct, "%")})</span>
                </p>
                {card.updatedAt && <p className="text-[11px] text-muted-foreground mt-1">As of {formatQuoteTime(card.updatedAt)}</p>}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── ALL INDICES ── */}
      <section className="bg-background py-8 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">All Indices</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {contracts.rows.length > 0
                  ? query ? `Showing ${rows.length} of ${contracts.rows.length} contracts` : `${contracts.rows.length} contracts`
                  : `Every ${options ? "option" : "futures"} contract for this underlying.`}
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                aria-label="Search contracts"
                placeholder="Search contracts..."
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

          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <div style={{ minWidth }}>
                <div className="grid gap-x-3 px-4 py-2.5 border-b border-border bg-cream/70" style={{ gridTemplateColumns: grid }}>
                  {columns.map((c) => (
                    <div key={c.label} className={`text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${c.align === "left" ? "text-left" : "text-right"}`}>
                      {c.label}
                    </div>
                  ))}
                </div>

                {rows.length === 0 && contracts.loading ? (
                  <TableRowsSkeleton rows={8} columns={grid} label="Loading contracts" />
                ) : rows.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    {contracts.error ? (
                      <>Unable to load contracts. <button onClick={contracts.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
                    ) : query ? "No contracts match your search." : contracts.emptyText}
                  </div>
                ) : (
                  rows.map((r, i) => (
                    <div key={`${r.name}-${i}`} className="grid gap-x-3 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors items-center" style={{ gridTemplateColumns: grid }}>
                      {columns.map((c) => (
                        <div key={c.label} className={`min-w-0 text-[13px] font-bold text-foreground tabular-nums ${c.align === "left" ? "text-left" : "text-right"}`}>
                          {c.render(r)}
                        </div>
                      ))}
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

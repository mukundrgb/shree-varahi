"use client"

// Market movers pages: /stock-market-live/<slug> (Top Gainers, Top Losers, Most Active, 52W High/Low).
//   MarketMoversPage  breadcrumb, title and description around a table
//   MoversTable       gainers / losers: rows mapped with toMarketMover (lib/market-movers/types.ts)
//   Week52Table       52-week high / low: rows mapped with toWeek52Row (lib/market-movers/week52.ts)
//   MoversPagination  page bar under a table
// Top Gainers and 52W High / Low load from the backend; losers and most active have no API yet.

import Link from "next/link"
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { formatDate, formatPercent, formatPrice } from "@/lib/stocks/format"
import { MOVER_LISTS, type MarketMover, type MoverSlug } from "@/lib/market-movers/types"
import type { Week52Row } from "@/lib/market-movers/week52"

const DESCRIPTIONS: Record<MoverSlug, string> = {
  "top-gainers-today": "NSE stocks with the biggest price rise today, compared with yesterday's close.",
  "top-losers-today": "NSE stocks with the biggest price fall today, compared with yesterday's close.",
  "most-active-by-value": "NSE stocks with the highest traded value today.",
  "most-active-by-volume": "NSE stocks with the most shares traded today.",
  "52-week-high-stocks": "Stocks trading at or near their highest price of the last 52 weeks.",
  "52-week-low-stocks": "Stocks trading at or near their lowest price of the last 52 weeks.",
}

const tone = (v: number | null) => (v === null ? "text-muted-foreground" : v >= 0 ? "text-profit" : "text-loss")

const TH = "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground px-3 py-3 whitespace-nowrap"
const TD = "px-3 py-3 text-[13px] tabular-nums whitespace-nowrap"
const TH_COMPANY = `${TH} text-left sticky left-0 z-10 bg-cream min-w-[220px]`
const TD_COMPANY = "sticky left-0 z-10 bg-white group-hover:bg-cream/40 transition-colors px-3 py-3"
const TR = "group border-b border-border/50 last:border-0 hover:bg-cream/40 transition-colors"

// ── Shared cells ─────────────────────────────────────────────────────────────

/** Name, symbol and badges. Not a link for now: there are no detail pages for these lists yet (`href` is kept for when there are). */
function CompanyCell({ name, title, symbol, badges }: { href: string; name: string; title?: string | null; symbol: string; badges: (string | null)[] }) {
  return (
    <div className="min-w-0">
      <span className="block text-sm font-extrabold text-foreground truncate max-w-[220px]" title={title ?? name}>{name}</span>
      <span className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
        {symbol}
        {badges.filter(Boolean).map((b) => (
          <span key={b} className="text-[9px] font-bold px-1 py-px rounded-[3px] bg-secondary">{b}</span>
        ))}
      </span>
    </div>
  )
}

function ChangeCell({ value }: { value: number | null }) {
  return (
    <span className={`inline-flex items-center gap-0.5 font-black ${tone(value)}`}>
      {value !== null && (value >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />)}
      {formatPercent(value)}
    </span>
  )
}

/** A price with the date it was reached underneath. */
function PriceOnDate({ price, date }: { price: number | null; date: string | null }) {
  return (
    <>
      <span className="block font-semibold text-foreground">{formatPrice(price)}</span>
      {date && <span className="block text-[10px] text-muted-foreground">{formatDate(date)}</span>}
    </>
  )
}

/** Shown instead of rows: `status` (loading / error) when set, otherwise the empty message. */
function EmptyRow({ cols, status }: { cols: number; status?: React.ReactNode }) {
  return <tr><td colSpan={cols} className="py-16 text-center text-sm text-muted-foreground">{status ?? "No stocks in this list right now."}</td></tr>
}

/** `offset` numbers rows on later pages; `status` replaces the rows while loading or on error. */
interface TableProps { offset?: number; status?: React.ReactNode }


function TableFrame({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-border bg-white overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
        <table className="w-full border-collapse" style={{ minWidth }}>{children}</table>
      </div>
    </div>
  )
}

// ── Gainers / losers / most active ───────────────────────────────────────────

export function MoversTable({ rows, offset = 0, status }: { rows: MarketMover[] } & TableProps) {
  return (
    <TableFrame minWidth={1180}>
      <thead>
        <tr className="border-b border-border bg-cream/70">
          <th className={`${TH} text-left w-10`}>#</th>
          <th className={TH_COMPANY}>Company</th>
          <th className={`${TH} text-right`}>LTP (₹)</th>
          <th className={`${TH} text-right`}>Change %</th>
          <th className={`${TH} text-right`}>Open</th>
          <th className={`${TH} text-right`}>High</th>
          <th className={`${TH} text-right`}>Low</th>
          <th className={`${TH} text-right`}>Prev Close</th>
          <th className={`${TH} text-right`}>Volume</th>
          <th className={`${TH} text-right`}>Value (₹ Cr)</th>
          <th className={`${TH} text-right`}>52W Low</th>
          <th className={`${TH} text-right`}>52W High</th>
        </tr>
      </thead>
      <tbody>
        {status || rows.length === 0 ? <EmptyRow cols={12} status={status} /> : rows.map((r, i) => (
          <tr key={`${r.exchange}-${r.symbol}-${i}`} className={TR}>
            <td className={`${TD} text-muted-foreground`}>{offset + i + 1}</td>
            <td className={TD_COMPANY}>
              <CompanyCell href={r.href} name={r.name} symbol={r.symbol} badges={[r.exchange]} />
            </td>
            <td className={`${TD} text-right font-black text-foreground`}>{formatPrice(r.ltp)}</td>
            <td className={`${TD} text-right`}><ChangeCell value={r.changePct} /></td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.open)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.high)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.low)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.prevClose)}</td>
            <td className={`${TD} text-right font-semibold text-foreground`}>{rawVolume(r.volume)}</td>
            <td className={`${TD} text-right font-semibold text-foreground`}>{formatPrice(r.valueCr)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.low52)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.high52)}</td>
          </tr>
        ))}
      </tbody>
    </TableFrame>
  )
}

// ── Most active by value / volume ────────────────────────────────────────────

/** Shares traded exactly as the API sends them (Indian digit grouping, no Cr / L). */
const rawVolume = (v: number | null) => (v === null ? "—" : v.toLocaleString("en-IN"))

/**
 * by "value": ranked by traded value; value columns only.
 * by "volume": ranked by shares traded; volume columns only.
 */
export function MostActiveTable({ rows, by, offset = 0, status }: { rows: MarketMover[]; by: "value" | "volume" } & TableProps) {
  const cols = 11
  const value = (r: MarketMover) => [
    <td key="v" className={`${TD} text-right font-bold text-foreground ${by === "value" ? "bg-cream/30" : ""}`}>{formatPrice(r.valueCr)}</td>,
    <td key="pv" className={`${TD} text-right text-foreground/70`}>{formatPrice(r.prevValueCr)}</td>,
  ]
  const volume = (r: MarketMover) => [
    <td key="q" className={`${TD} text-right font-bold text-foreground ${by === "volume" ? "bg-cream/30" : ""}`}>{rawVolume(r.volume)}</td>,
    <td key="pq" className={`${TD} text-right text-foreground/70`}>{rawVolume(r.prevVolume)}</td>,
  ]
  const valueHeads = [
    <th key="v" className={`${TH} text-right ${by === "value" ? "text-burgundy" : ""}`}>Value (₹ Cr)</th>,
    <th key="pv" className={`${TH} text-right`}>Prev Day Value</th>,
  ]
  const volumeHeads = [
    <th key="q" className={`${TH} text-right ${by === "volume" ? "text-burgundy" : ""}`}>Volume</th>,
    <th key="pq" className={`${TH} text-right`}>Prev Day Volume</th>,
  ]

  return (
    <TableFrame minWidth={1180}>
      <thead>
        <tr className="border-b border-border bg-cream/70">
          <th className={`${TH} text-left w-10`}>#</th>
          <th className={TH_COMPANY}>Company</th>
          <th className={`${TH} text-right`}>LTP (₹)</th>
          <th className={`${TH} text-right`}>Change %</th>
          {by === "value" ? valueHeads : volumeHeads}
          <th className={`${TH} text-right`}>Open</th>
          <th className={`${TH} text-right`}>Low</th>
          <th className={`${TH} text-right`}>High</th>
          <th className={`${TH} text-right`}>52W Low</th>
          <th className={`${TH} text-right`}>52W High</th>
        </tr>
      </thead>
      <tbody>
        {status || rows.length === 0 ? <EmptyRow cols={cols} status={status} /> : rows.map((r, i) => (
          <tr key={`${r.exchange}-${r.symbol}-${i}`} className={TR}>
            <td className={`${TD} text-muted-foreground`}>{offset + i + 1}</td>
            <td className={TD_COMPANY}>
              <CompanyCell href={r.href} name={r.name} symbol={r.symbol} badges={[r.exchange]} />
            </td>
            <td className={`${TD} text-right font-black text-foreground`}>{formatPrice(r.ltp)}</td>
            <td className={`${TD} text-right`}><ChangeCell value={r.changePct} /></td>
            {by === "value" ? value(r) : volume(r)}
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.open)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.low)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.high)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.low52)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.high52)}</td>
          </tr>
        ))}
      </tbody>
    </TableFrame>
  )
}

// ── 52-week high / low ───────────────────────────────────────────────────────

/** Both kinds show the same columns, ending with the all-time high and all-time low. */
export function Week52Table({ rows, offset = 0, status }: { rows: Week52Row[]; kind: "high" | "low" } & TableProps) {
  const cols = 10
  return (
    <TableFrame minWidth={1180}>
      <thead>
        <tr className="border-b border-border bg-cream/70">
          <th className={`${TH} text-left w-10`}>#</th>
          <th className={TH_COMPANY}>Company</th>
          <th className={`${TH} text-right`}>LTP (₹)</th>
          <th className={`${TH} text-right`}>Change %</th>
          <th className={`${TH} text-right`}>52W High</th>
          <th className={`${TH} text-right`}>52W Low</th>
          <th className={`${TH} text-right`}>Market Cap (₹ Cr)</th>
          <th className={`${TH} text-right`}>Volume</th>
          <th className={`${TH} text-right`}>All-Time High</th>
          <th className={`${TH} text-right`}>All-Time Low</th>
        </tr>
      </thead>
      <tbody>
        {status || rows.length === 0 ? <EmptyRow cols={cols} status={status} /> : rows.map((r, i) => {
          return (
            <tr key={`${r.exchange}-${r.symbol}-${i}`} className={TR}>
              <td className={`${TD} text-muted-foreground`}>{offset + i + 1}</td>
              <td className={TD_COMPANY}>
                <CompanyCell href={r.href} name={r.name} title={r.fullName} symbol={r.symbol} badges={[r.exchange]} />
              </td>
              <td className={`${TD} text-right font-black text-foreground`}>{formatPrice(r.ltp)}</td>
              <td className={`${TD} text-right`}><ChangeCell value={r.changePct} /></td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.high52} date={r.high52Date} /></td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.low52} date={r.low52Date} /></td>
              <td className={`${TD} text-right font-semibold text-foreground`}>{formatPrice(r.marketCapCr)}</td>
              <td className={`${TD} text-right font-semibold text-foreground`}>{rawVolume(r.volume)}</td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.allTimeHigh} date={r.allTimeHighDate} /></td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.allTimeLow} date={r.allTimeLowDate} /></td>
            </tr>
          )
        })}
      </tbody>
    </TableFrame>
  )
}

// ── Pagination ───────────────────────────────────────────────────────────────

export function MoversPagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null
  const first = Math.max(1, Math.min(totalPages - 4, page - 2))
  const arrow = "w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  return (
    <div className="flex items-center justify-between gap-3 mt-4">
      <p className="text-xs text-muted-foreground">Page {page} of {totalPages.toLocaleString("en-IN")}</p>
      <div className="flex gap-1.5">
        <button onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page" className={arrow}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => first + i).map((pg) => (
          <button key={pg} onClick={() => onChange(pg)} aria-current={pg === page ? "page" : undefined}
            className={`min-w-8 h-8 px-1.5 rounded-[5px] border text-xs font-bold transition-all ${
              pg === page ? "bg-burgundy text-white border-burgundy" : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {pg}
          </button>
        ))}
        <button onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page" className={arrow}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function MarketMoversPage({ slug, count, children }: { slug: MoverSlug; count: number; children: React.ReactNode }) {
  const list = MOVER_LISTS.find((l) => l.slug === slug)!

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 pb-16">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground flex-wrap mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/stocks" className="hover:text-foreground transition-colors">Stocks</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Market Movers</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{list.title}</span>
          </nav>

          <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight mb-1">{list.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">{DESCRIPTIONS[slug]}</p>

          {children}

          {count > 0 && (
            <p className="text-[11px] text-muted-foreground mt-3">{count} stocks · Scroll the table sideways for more columns</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

"use client"

// Market movers pages: /stock-market-live/<slug> (Top Gainers, Top Losers, Most Active, 52W High/Low).
//   MarketMoversPage  breadcrumb, title and description around a table
//   MoversTable       gainers / losers / most active: columns follow the CMOTS movers response (lib/market-movers/types.ts)
//   Week52Table       52-week high / low: columns follow the CMOTS 52-week response (lib/market-movers/week52.ts)
// No data source yet: to connect an API, map its rows (toMarketMover / toWeek52Row) and pass them as `rows`.

import Link from "next/link"
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { formatDate, formatPercent, formatPrice, formatVolume } from "@/lib/stocks/format"
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

function CompanyCell({ href, name, title, symbol, badges }: { href: string; name: string; title?: string | null; symbol: string; badges: (string | null)[] }) {
  return (
    <Link href={href} className="block min-w-0">
      <span className="block text-sm font-extrabold text-foreground group-hover:text-burgundy transition-colors truncate max-w-[220px]" title={title ?? name}>{name}</span>
      <span className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
        {symbol}
        {badges.filter(Boolean).map((b) => (
          <span key={b} className="text-[9px] font-bold px-1 py-px rounded-[3px] bg-secondary">{b}</span>
        ))}
      </span>
    </Link>
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

function EmptyRow({ cols }: { cols: number }) {
  return <tr><td colSpan={cols} className="py-16 text-center text-sm text-muted-foreground">No stocks in this list right now.</td></tr>
}


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

export function MoversTable({ rows }: { rows: MarketMover[] }) {
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
        {rows.length === 0 ? <EmptyRow cols={12} /> : rows.map((r, i) => (
          <tr key={`${r.exchange}-${r.symbol}`} className={TR}>
            <td className={`${TD} text-muted-foreground`}>{i + 1}</td>
            <td className={TD_COMPANY}>
              <CompanyCell href={r.href} name={r.name} symbol={r.symbol} badges={[r.exchange, r.group && `Grp ${r.group}`]} />
            </td>
            <td className={`${TD} text-right font-black text-foreground`}>{formatPrice(r.ltp)}</td>
            <td className={`${TD} text-right`}><ChangeCell value={r.changePct} /></td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.open)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.high)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.low)}</td>
            <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.prevClose)}</td>
            <td className={`${TD} text-right`}>
              <span className="block font-semibold text-foreground">{formatVolume(r.volume)}</span>
              {r.volumeChangePct !== null && (
                <span className={`block text-[10px] font-bold ${tone(r.volumeChangePct)}`} title="Volume change vs previous day">
                  {formatPercent(r.volumeChangePct)} vs prev
                </span>
              )}
            </td>
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

/** Today's figure with its change vs the previous day underneath. */
function TodayVsPrev({ text, changePct }: { text: string; changePct: number | null }) {
  return (
    <>
      <span className="block font-bold text-foreground">{text}</span>
      {changePct !== null && (
        <span className={`block text-[10px] font-bold ${tone(changePct)}`}>{formatPercent(changePct)} vs prev</span>
      )}
    </>
  )
}

/**
 * by "value": ranked by traded value; value columns only.
 * by "volume": ranked by shares traded; volume columns only.
 */
export function MostActiveTable({ rows, by }: { rows: MarketMover[]; by: "value" | "volume" }) {
  const cols = 11
  const value = (r: MarketMover) => [
    <td key="v" className={`${TD} text-right ${by === "value" ? "bg-cream/30" : ""}`}><TodayVsPrev text={formatPrice(r.valueCr)} changePct={r.valueChangePct} /></td>,
    <td key="pv" className={`${TD} text-right text-foreground/70`}>{formatPrice(r.prevValueCr)}</td>,
  ]
  const volume = (r: MarketMover) => [
    <td key="q" className={`${TD} text-right ${by === "volume" ? "bg-cream/30" : ""}`}><TodayVsPrev text={formatVolume(r.volume)} changePct={r.volumeChangePct} /></td>,
    <td key="pq" className={`${TD} text-right text-foreground/70`}>{formatVolume(r.prevVolume)}</td>,
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
        {rows.length === 0 ? <EmptyRow cols={cols} /> : rows.map((r, i) => (
          <tr key={`${r.exchange}-${r.symbol}`} className={TR}>
            <td className={`${TD} text-muted-foreground`}>{i + 1}</td>
            <td className={TD_COMPANY}>
              <CompanyCell href={r.href} name={r.name} symbol={r.symbol} badges={[r.exchange, r.group && `Grp ${r.group}`]} />
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

/** kind "high" shows the all-time high in the last column, "low" the all-time low. */
export function Week52Table({ rows, kind }: { rows: Week52Row[]; kind: "high" | "low" }) {
  const high = kind === "high"
  return (
    <TableFrame minWidth={1180}>
      <thead>
        <tr className="border-b border-border bg-cream/70">
          <th className={`${TH} text-left w-10`}>#</th>
          <th className={TH_COMPANY}>Company</th>
          <th className={`${TH} text-right`}>LTP (₹)</th>
          <th className={`${TH} text-right`}>Change %</th>
          <th className={`${TH} text-right`}>Day High</th>
          <th className={`${TH} text-right`}>Day Low</th>
          <th className={`${TH} text-right`}>52W High</th>
          <th className={`${TH} text-right`}>52W Low</th>
          <th className={`${TH} text-right`}>Market Cap (₹ Cr)</th>
          <th className={`${TH} text-right`}>Volume</th>
          <th className={`${TH} text-right`}>{high ? "All-Time High" : "All-Time Low"}</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? <EmptyRow cols={11} /> : rows.map((r, i) => {
          return (
            <tr key={`${r.exchange}-${r.symbol}`} className={TR}>
              <td className={`${TD} text-muted-foreground`}>{i + 1}</td>
              <td className={TD_COMPANY}>
                <CompanyCell href={r.href} name={r.name} title={r.fullName} symbol={r.symbol} badges={[r.exchange]} />
              </td>
              <td className={`${TD} text-right font-black text-foreground`}>{formatPrice(r.ltp)}</td>
              <td className={`${TD} text-right`}><ChangeCell value={r.changePct} /></td>
              <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.dayHigh)}</td>
              <td className={`${TD} text-right text-foreground/80`}>{formatPrice(r.dayLow)}</td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.high52} date={r.high52Date} /></td>
              <td className={`${TD} text-right`}><PriceOnDate price={r.low52} date={r.low52Date} /></td>
              <td className={`${TD} text-right font-semibold text-foreground`}>{formatPrice(r.marketCapCr)}</td>
              <td className={`${TD} text-right font-semibold text-foreground`}>{formatVolume(r.volume)}</td>
              <td className={`${TD} text-right`}>
                {high
                  ? <PriceOnDate price={r.allTimeHigh} date={r.allTimeHighDate} />
                  : <PriceOnDate price={r.allTimeLow} date={r.allTimeLowDate} />}
              </td>
            </tr>
          )
        })}
      </tbody>
    </TableFrame>
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

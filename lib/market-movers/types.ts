// Market movers (Top Gainers / Losers / Most Active / 52-week high & low).
// The page only reads MarketMover; toMarketMover maps a backend GainerItem (lib/market-movers/api.ts) into it.

import type { GainerItem } from "./api"

/** One table row. */
export interface MarketMover {
  symbol: string
  name: string
  exchange: string
  group: string | null
  ltp: number | null
  change: number | null
  changePct: number | null
  open: number | null
  high: number | null
  low: number | null
  prevClose: number | null
  volume: number | null
  volumeChangePct: number | null
  prevVolume: number | null
  /** ₹ crore */
  valueCr: number | null
  /** ₹ crore */
  prevValueCr: number | null
  /** Traded value change vs the previous day, % (worked out; the API has no field for it) */
  valueChangePct: number | null
  high52: number | null
  low52: number | null
  updatedAt: string | null
  /** Stock detail page: /stocks/<symbol in lower case> */
  href: string
}

export const stockHref = (symbol: string) => `/stocks/${encodeURIComponent(symbol.toLowerCase())}`

export function toMarketMover(r: GainerItem): MarketMover {
  const symbol = r.symbol ?? (r.bseCode ? String(r.bseCode) : "")
  const ltp = r.ltp ?? r.close
  return {
    symbol,
    name: r.name || symbol,
    exchange: r.exchange ?? "NSE",
    group: r.group,
    ltp,
    change: ltp !== null && r.previousClose !== null ? ltp - r.previousClose : r.netChange,
    changePct: r.changePct,
    open: r.open,
    high: r.high,
    low: r.low,
    prevClose: r.previousClose,
    volume: r.volume,
    volumeChangePct: r.volumeChangePct,
    prevVolume: r.previousVolume,
    valueCr: r.valueTraded,
    prevValueCr: r.previousValueTraded,
    valueChangePct:
      r.valueTraded === null || !r.previousValueTraded
        ? null
        : ((r.valueTraded - r.previousValueTraded) / r.previousValueTraded) * 100,
    high52: r.high52,
    low52: r.low52,
    updatedAt: r.quoteUpdatedAt ?? r.updatedAt,
    href: stockHref(symbol),
  }
}

/** The movers lists, keyed by their /stock-market-live/<slug> URL. */
export const MOVER_LISTS = [
  { slug: "top-gainers-today",     label: "Top Gainers",       title: "Top Gainers Today" },
  { slug: "top-losers-today",      label: "Top Losers",        title: "Top Losers Today" },
  { slug: "most-active-by-value",  label: "Most Active (Value)",  title: "Most Active Stocks by Value" },
  { slug: "most-active-by-volume", label: "Most Active (Volume)", title: "Most Active Stocks by Volume" },
  { slug: "52-week-high-stocks",   label: "52W High",          title: "52-Week High Stocks" },
  { slug: "52-week-low-stocks",    label: "52W Low",           title: "52-Week Low Stocks" },
] as const

export type MoverSlug = (typeof MOVER_LISTS)[number]["slug"]
export const isMoverSlug = (s: string): s is MoverSlug => MOVER_LISTS.some((l) => l.slug === s)

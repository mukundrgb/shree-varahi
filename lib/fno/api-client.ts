// F&O page calls to the backend: /api/v1/fno

import { apiGet, seg } from "@/lib/api/client"

export type FnoCategory = "index-futures" | "stock-futures" | "index-options" | "stock-options"

/** One derivatives contract (GetQuoteDerivatives, Market Watch). */
export interface FnoContract {
  token: number | null
  instrument: string | null
  symbol: string
  /** YYYY-MM-DD */
  expiry: string | null
  expiryMonth: string | null
  strike: number | null
  optionType: "CE" | "PE" | null
  label: string
  ltp: number | null
  change: number | null
  changePct: number | null
  open: number | null
  high: number | null
  low: number | null
  close: number | null
  prevClose: number | null
  avgPrice: number | null
  /** Contracts traded */
  volume: number | null
  tradedQty: number | null
  openInterest: number | null
  oiChangePct: number | null
  turnover: number | null
  valueCr: number | null
  bestBid: { price: number | null; qty: number | null }
  bestAsk: { price: number | null; qty: number | null }
  rollCost: number | null
  rollCostPct: number | null
  updatedAt: string | null
}

/** One card on an F&O tab: the underlying with its near-month future or most active option. */
export interface FnoCard {
  symbol: string
  slug: string
  name: string
  coCode: number | null
  logoUrl: string | null
  contract: { label: string; expiry: string | null; strike: number | null; optionType: "CE" | "PE" | null } | null
  ltp: number | null
  change: number | null
  changePct: number | null
  updatedAt: string | null
}

export interface FnoCardList {
  category: FnoCategory
  label: string
  instrument: string
  exchange: string
  items: FnoCard[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FnoSpot {
  price: number | null
  changeAmt: number | null
  changePct: number | null
  open: number | null
  high52: number | null
  low52: number | null
  updatedAt: string | null
}

interface FnoUnderlyingBase {
  category: FnoCategory
  label: string
  instrument: string
  symbol: string
  slug: string
  name: string
  coCode: number | null
  logoUrl: string | null
  sector: string | null
  exchanges: string[]
  /** The stock's own quote; null for indices. */
  spot: FnoSpot | null
}

export interface FnoFuturesDetail extends FnoUnderlyingBase {
  nearMonth: FnoContract
  contracts: FnoContract[]
}

export interface FnoOptionsDetail extends FnoUnderlyingBase {
  /** Near-month future of the same underlying (reference price for index options). */
  future: FnoContract | null
  expiries: string[]
  selectedExpiry: string | null
  mostActive: FnoContract | null
  chain: { strike: number; call: FnoContract | null; put: FnoContract | null }[]
  contracts: FnoContract[]
}

export const fnoApi = {
  cards: (
    category: FnoCategory,
    { page = 1, limit = 20, exchange = "NSE" }: { page?: number; limit?: number; exchange?: string } = {},
    signal?: AbortSignal,
  ) => apiGet<FnoCardList>(`/fno/${category}`, { query: { page, limit, exchange }, signal }),
  futures: (underlying: "index" | "stock", symbol: string, signal?: AbortSignal) =>
    apiGet<FnoFuturesDetail>(`/fno/${underlying}-futures${seg(symbol)}`, { signal }),
  options: (underlying: "index" | "stock", symbol: string, expiry?: string, signal?: AbortSignal) =>
    apiGet<FnoOptionsDetail>(`/fno/${underlying}-options${seg(symbol)}`, { query: { expiry }, signal }),
}

/** Index slugs used in site links; anything else is treated as a stock. */
const INDEX_SLUGS = new Set([
  "nifty", "nifty-50", "banknifty", "bank-nifty", "nifty-bank", "finnifty", "fin-nifty",
  "nifty-financial-services", "niftynxt50", "nifty-next-50", "midcpnifty", "midcap-nifty",
  "nifty-midcap-select", "sensex", "bankex", "niftyfpi",
])

/**
 * Parses a futures/options page slug such as "nifty-50-futures",
 * "reliance-industries-ltd-futures-summary" or "banknifty-options".
 */
export function parseFnoSlug(slug: string, kind: "futures" | "options"): { underlying: "index" | "stock"; symbol: string } {
  const suffix = kind === "futures" ? /-futures?(-summary)?$/ : /-options?(-chain)?(-summary)?$/
  let base = slug.toLowerCase().replace(suffix, "")
  // Generic "stock-futures" / "stock-options" links open a popular stock.
  if (base === "stock" || base === "") base = "reliance"
  return { underlying: INDEX_SLUGS.has(base) ? "index" : "stock", symbol: base }
}

/** URL segment of each Markets tab: /futures-options/<segment>/<slug> */
export const FNO_CATEGORIES: FnoCategory[] = ["index-futures", "stock-futures", "index-options", "stock-options"]
export const isFnoCategory = (value: string): value is FnoCategory => (FNO_CATEGORIES as string[]).includes(value)
export const isOptionsCategory = (category: FnoCategory) => category.endsWith("-options")
export const fnoDetailHref = (category: FnoCategory, slug: string) => `/futures-options/${category}${seg(slug)}`

/** One row of the "All Indices" table on an F&O detail page. Strike and option type are options only. */
export interface FnoDetailRow {
  name: string
  /** YYYY-MM-DD */
  expiry: string | null
  prevLtp: number | null
  ltp: number | null
  /** LTP − Prev. LTP */
  faoDiff: number | null
  /** Percent change */
  faoChange: number | null
  strike?: number | null
  optionType?: "CE" | "PE" | null
  openInterest: number | null
  prevOpenInterest: number | null
  /** ISO date-time */
  updatedAt: string | null
}

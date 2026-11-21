// Market movers calls to the backend: /api/v1/stocks/gainers, /52-week-high, /52-week-low.
// Field names are as the backend sends them (shree-varahi-be/modules/stocks/stocks.mapper.js).

import { apiGet } from "@/lib/api/client"

export interface Paged<T> {
  items: T[]
  total: number
  count: number
  page: number
  limit: number
  totalPages: number
}

/** GET /stocks/gainers row (toGainerItem). */
export interface GainerItem {
  coCode: number | null
  symbol: string | null
  name: string | null
  exchange: string | null
  bseCode: string | null
  group: string | null
  /** Latest quote */
  ltp: number | null
  changePct: number | null
  quoteUpdatedAt: string | null
  updatedAt: string | null
  open: number | null
  high: number | null
  low: number | null
  close: number | null
  previousClose: number | null
  netChange: number | null
  volume: number | null
  volumeChangePct: number | null
  /** ₹ crore */
  valueTraded: number | null
  previousVolume: number | null
  /** ₹ crore */
  previousValueTraded: number | null
  high52: number | null
  low52: number | null
}

/** GET /stocks/52-week-high and /52-week-low row (toFiftyTwoWeekItem). */
export interface Week52Item {
  coCode: number | null
  symbol: string | null
  name: string | null
  isin: string | null
  bseCode: string | null
  /** Latest quote */
  ltp: number | null
  changePct: number | null
  exchange: string | null
  /** ₹ crore */
  marketCap: number | null
  eod: {
    date: string | null
    price: number | null
    high: number | null
    low: number | null
    changePct: number | null
    volume: number | null
    updatedAt: string | null
  }
  nse: {
    high52: number | null
    high52Date: string | null
    high52MarketCap: number | null
    low52: number | null
    low52Date: string | null
    low52MarketCap: number | null
    allTimeHigh: number | null
    allTimeHighDate: string | null
    allTimeHighMarketCap: number | null
    allTimeLow: number | null
    allTimeLowDate: string | null
    allTimeLowMarketCap: number | null
  }
}

type Paging = { page: number; limit: number }

export const moversApi = {
  gainers: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<GainerItem>>("/stocks/gainers", { query: { page, limit }, signal }),
  /** Same row shape as gainers. */
  losers: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<GainerItem>>("/stocks/losers", { query: { page, limit }, signal }),
  /** Most active Nifty stocks by traded value; same row shape as gainers. */
  activeByValue: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<GainerItem>>("/stocks/most-active/Nifty/value", { query: { page, limit }, signal }),
  /** Most active Nifty stocks by shares traded; same row shape as gainers. */
  activeByVolume: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<GainerItem>>("/stocks/most-active/Nifty/volume", { query: { page, limit }, signal }),
  week52High: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<Week52Item>>("/stocks/52-week-high", { query: { page, limit }, signal }),
  week52Low: ({ page, limit }: Paging, signal?: AbortSignal) =>
    apiGet<Paged<Week52Item>>("/stocks/52-week-low", { query: { page, limit }, signal }),
}

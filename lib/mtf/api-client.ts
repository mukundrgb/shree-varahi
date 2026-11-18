// MTF calls to the backend: /api/v1/mtf (the broker's MTF margin list)

import { apiGet } from "@/lib/api/client"

export interface MtfStockApi {
  symbol: string
  /** Company name when the backend can match the ISIN; show the symbol otherwise */
  name: string | null
  isin: string | null
  /** Margin used for the calculation, %: the listed margin, but never below 33.3% */
  marginPct: number
  /** Margin as printed in the broker's list, % */
  listedMarginPct: number
  /** 100 ÷ marginPct, 2 decimals (for display; calculate with mtfMultiplier) */
  multiplier: number
}

export interface MtfSummaryApi {
  /** "YYYY-MM-DD" the margin list is effective from */
  effectiveDate: string | null
  /** Lowest margin used in calculations (33.3) */
  minMarginPct: number
  totalStocks: number
  defaultStock: MtfStockApi | null
  popular: MtfStockApi[]
}

export type MtfSort = "symbol" | "margin" | "multiplier"

export interface MtfStockQuery {
  q?: string
  sort?: MtfSort
  order?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface MtfStockPageApi {
  items: MtfStockApi[]
  total: number
  page: number
  limit: number
  totalPages: number
  effectiveDate: string | null
  minMarginPct: number
  totalStocks: number
}

/** Exact MTF multiplier: 100 ÷ margin used (already floored at 33.3% by the backend). */
export const mtfMultiplier = (stock: { marginPct: number }) => 100 / stock.marginPct

/** "4.52x" — cut to 2 decimals, never rounded up (100 ÷ 22.08 = 4.5289… → 4.52x). */
export const formatMultiplier = (m: number) => `${(Math.floor(m * 100 + 1e-9) / 100).toFixed(2)}x`

export const mtfApi = {
  summary: (signal?: AbortSignal) => apiGet<MtfSummaryApi>("/mtf", { signal }),
  stocks: (query: MtfStockQuery, signal?: AbortSignal) =>
    apiGet<MtfStockPageApi>("/mtf/stocks", { query: { ...query }, signal }),
}

// Stock types returned by the backend (/api/v1/stocks) and used by hooks and pages.

export type CapCategory = "large" | "mid" | "small"
export type FinancialsPeriod = "quarterly" | "yearly"
export type FinancialsType = "standalone" | "consolidated"

export interface StockQuote {
  price: number | null
  changeAmt: number | null
  changePct: number | null
  open: number | null
  high: number | null
  low: number | null
  prevClose: number | null
  volume: number | null
  high52: number | null
  low52: number | null
  updatedAt: string | null
}

export interface StockSummary {
  slug: string
  coCode: number
  symbol: string
  name: string
  sector: string
  industry: string
  /** "NSE, BSE" */
  exchange: string
  exchanges: string[]
  isin: string | null
  capCategory: CapCategory | null
  capLabel: string | null
  logoUrl: string | null
  tradingViewSymbol: string | null
  quote: StockQuote | null
}

export interface StockQuoteResult {
  slug: string
  symbol: string
  quote: StockQuote | null
}

export type StockSort = "name-asc" | "name-desc" | "change-desc" | "change-asc"

export const STOCK_SORTS: readonly StockSort[] = ["name-asc", "name-desc", "change-desc", "change-asc"]

export interface StockListParams {
  page?: number
  search?: string
  /** A category from StockListResult.categories. */
  sector?: string
  cap?: string
  sort?: StockSort
}

export interface StockListResult {
  items: StockSummary[]
  total: number
  page: number
  limit: number
  totalPages: number
  /** Every category that has at least one listed company, for the filter chips. */
  categories: string[]
}

export interface StockSearchResult {
  slug: string
  symbol: string
  name: string
  sector: string
  exchange: string
}

export type FinancialsRowFormat = "crore" | "percent" | "rupees"

export interface FinancialsTable {
  periods: string[]
  rows: { label: string; format: FinancialsRowFormat; values: (number | null)[] }[]
  /** Net sales for each period, for the trend bars. */
  revenue: (number | null)[]
}

export interface CorporateAction {
  type: "Dividend" | "Bonus" | "Split"
  detail: string
  date: string | null
}

export interface StockAbout {
  incorporated: string | null
  name: string | null
  faceValue: number | null
  marketLot: number | null
  chairman: string | null
  auditor: string | null
  group: string | null
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
}

export interface StockNewsItem {
  id: string
  tag: string
  headline: string
  caption: string | null
  /** HTML article text */
  body: string | null
  /** ISO date-time (IST) */
  publishedAt: string | null
}

export interface StockNews {
  items: StockNewsItem[]
  /** False when no item names this company and general corporate news is shown instead. */
  matched: boolean
}

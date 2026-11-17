// ETF types returned by the backend (/api/v1/etfs) and used by the ETF pages.

export type EtfCategory = "Equity" | "Commodity" | "Debt" | "Global"

/** One ETF card on the /etf page, and one row in Similar ETFs. */
export interface EtfSummary {
  /** URL slug; ETFs missing from the ETF master use their ISIN in lower case. */
  slug: string
  isin: string | null
  /** Exchange code (ETFCode), e.g. NIFTYBEES. */
  symbol: string
  name: string
  category: EtfCategory
  price: number | null
  changeAmt: number | null
  changePct: number | null
  expenseRatio: number | null
  aumCr: number | null
}

/** One row of the ETF research table (/etf/compare). 3Y and 5Y returns are annualised. */
export interface EtfListRow extends EtfSummary {
  amc: string | null
  exchanges: string[]
  return1Y: number | null
  return3Y: number | null
  return5Y: number | null
  updatedAt: string | null
}

export type EtfSortKey = "name" | "price" | "change" | "aum" | "expense" | "return1Y" | "return3Y" | "return5Y"

export interface EtfListResult {
  items: EtfListRow[]
  total: number
  page: number
  limit: number
  totalPages: number
  sort: EtfSortKey
  order: "asc" | "desc"
  categories: { category: EtfCategory; count: number }[]
}

export interface EtfPerformance {
  open: number | null
  high: number | null
  low: number | null
  prevClose: number | null
  volume: number | null
  low52: number | null
  high52: number | null
  low52Date: string | null
  high52Date: string | null
}

export type Riskometer = "Low" | "Low to Moderate" | "Moderate" | "Moderately High" | "High" | "Very High"

export interface EtfFundamentals {
  expenseRatio: number | null
  expenseRatioDate: string | null
  aumCr: number | null
  aumDate: string | null
  /** Usually one of Riskometer; kept as string in case CMOTS adds a level. */
  riskometer: Riskometer | string | null
  pe: number | null
  pb: number | null
  stockCount: number | null
  inceptionDate: string | null
}

export type ReturnPeriod = "1Y" | "3Y" | "5Y"

export interface EtfCategoryReturn {
  period: ReturnPeriod
  fund: number | null
  categoryAvg: number | null
  /** This ETF's rank within its category for the period (1 = best). */
  rank: number | null
  /** Number of ETFs in the category for the period. */
  count: number | null
}

export interface EtfAbout {
  description: string
  /** YYYY-MM-DD */
  founded: string | null
  amc: string | null
  fundManagers: string[]
  etfCode: string | null
}

export interface EtfDetail extends EtfListRow {
  performance: EtfPerformance
  fundamentals: EtfFundamentals
  categoryReturns: EtfCategoryReturn[]
  sinceInceptionReturn: number | null
  about: EtfAbout
  /** Similar ETFs by fund size (AUM), including this one. */
  similar: EtfSummary[]
}

export type ChartRange = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y"

/** One point of the ETF price chart. `time` is an ISO date-time string. */
export interface EtfChartPoint {
  time: string
  price: number
}

export interface EtfChart {
  slug: string
  isin: string
  range: ChartRange
  points: EtfChartPoint[]
}

/** One equity holding of an ETF (/etf/holdings). */
export interface EtfHolding {
  name: string
  isin: string | null
  sector: string
  /** Share of the ETF's assets, in percent. */
  weight: number
  price: number | null
  changePct: number | null
}

export interface EtfHoldings {
  slug: string
  isin: string
  name: string
  category: EtfCategory
  /** YYYY-MM-DD */
  portfolioDate: string | null
  holdings: EtfHolding[]
}

// UI-facing ETF types. The ETF API should be mapped into these shapes.

export type EtfCategory = "Equity" | "Commodity" | "Debt" | "Global"

/** One ETF card on the /etf page, and one row in Similar ETFs. */
export interface EtfSummary {
  slug: string
  symbol: string
  name: string
  category: EtfCategory
  price: number | null
  changeAmt: number | null
  changePct: number | null
  expenseRatio: number | null
  aumCr: number | null
}

export interface EtfPerformance {
  open: number | null
  high: number | null
  low: number | null
  prevClose: number | null
  volume: number | null
  low52: number | null
  high52: number | null
}

export type Riskometer = "Low" | "Low to Moderate" | "Moderate" | "Moderately High" | "High" | "Very High"

export interface EtfFundamentals {
  expenseRatio: number | null
  aumCr: number | null
  riskometer: Riskometer | null
  pe: number | null
  pb: number | null
  stockCount: number | null
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
  founded: string | null
  amc: string | null
  fundManagers: string[]
}

export type ChartRange = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y"

/** One point of the ETF price chart. `time` is an ISO date-time string. */
export interface EtfChartPoint {
  time: string
  price: number
}

/** One row of the ETF comparison table (/etf/compare). Returns are annualised for 3Y and 5Y. */
export interface EtfListRow extends EtfSummary {
  return1Y: number | null
  return3Y: number | null
  return5Y: number | null
}

/** One equity holding of an ETF (/etf/holdings). */
export interface EtfHolding {
  name: string
  sector: string
  /** Share of the ETF's assets, in percent. */
  weight: number
  price: number | null
  changePct: number | null
}

export interface EtfDetail extends EtfSummary {
  /** Exchanges the ETF is listed on, such as ["NSE", "BSE"]. */
  exchanges: string[]
  updatedAt: string | null
  performance: EtfPerformance
  fundamentals: EtfFundamentals
  categoryReturns: EtfCategoryReturn[]
  about: EtfAbout
  /** Same-category ETFs by fund size, including this one. */
  similar: EtfSummary[]
}

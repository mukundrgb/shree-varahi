// Mutual Funds page calls to the backend: /api/v1/mutual-funds (data from Reedos)

import { apiGet, seg } from "@/lib/api/client"

export interface FundReturns {
  oneWeek: number | null
  oneMonth: number | null
  threeMonth: number | null
  sixMonth: number | null
  oneYear: number | null
  threeYear: number | null
  fiveYear: number | null
  tenYear: number | null
  sinceInception: number | null
}

export interface MutualFundApi {
  schemeCode: number
  name: string
  /** Detail page: /mutual-funds/fund/{slug} */
  slug: string
  amcId: number | null
  amcName: string | null
  amcLogoUrl: string | null
  /** As Reedos sends it, e.g. "Equity Schemes" */
  assetClass: string | null
  /** As Reedos sends it, e.g. "Sectoral/ Thematic" */
  category: string | null
  risk: string | null
  /** 0 = not rated */
  rating: number
  /** ₹ Cr */
  aumCr: number | null
  nav: number | null
  expenseRatio: number | null
  /** % */
  returns: FundReturns
}

export interface AmcPartnerApi {
  id: number
  name: string
  slug: string
  logoUrl: string | null
  fundCount: number
  aumCr: number
}

export interface MutualFundsPageApi {
  stats: { totalFunds: number; totalAmcs: number; totalCategories: number }
  /** The main categories, each with its sub-categories */
  assetClasses: { name: string; label: string; count: number; categories: { name: string; count: number }[] }[]
  risks: { name: string; count: number }[]
  categories: { name: string; assetClass: string | null; count: number }[]
  amcs: AmcPartnerApi[]
  topPerformers: MutualFundApi[]
  updatedAt: string
}

export type FundSort = "aum" | "nav" | "1w" | "1m" | "3m" | "6m" | "1y" | "3y" | "5y" | "10y" | "si" | "expense" | "rating" | "name"

export interface FundQuery {
  q?: string
  /** Whole main categories ("All" under one); a fund in any of these or `category` matches */
  assetClass?: string[]
  /** Single sub-categories */
  category?: string[]
  risk?: string
  amc?: number
  index?: boolean
  sort?: FundSort
  order?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface FundPageApi {
  items: MutualFundApi[]
  total: number
  page: number
  limit: number
  totalPages: number
  updatedAt: string
}

export interface FundListApi {
  slug: string
  crumb: string
  title: string
  description: string
  amc?: AmcPartnerApi
  funds: MutualFundApi[]
  updatedAt: string
}

export type ChartPeriod = "1M" | "6M" | "1Y"

export interface FundDetailApi {
  schemeCode: number
  slug: string
  name: string
  amcId: number | null
  amcName: string | null
  amcLogoUrl: string | null
  assetClass: string | null
  category: string | null
  risk: string | null
  /** 0 = not rated */
  rating: number
  nav: number | null
  /** "YYYY-MM-DD" */
  navDate: string | null
  /** NAV points gained / lost over one week */
  oneWeekChange: number | null
  /** % */
  oneWeekReturn: number | null
  returns: FundReturns
  chart: {
    periods: ChartPeriod[]
    /** One year of daily NAVs, oldest first */
    history: { date: string; nav: number }[]
  }
  overview: {
    investmentObjective: string | null
    fundManagers: string[]
    launchDate: string | null
    expenseRatio: number | null
    isin: string | null
    /** null = no lock-in */
    lockIn: string | null
    benchmark: string | null
    minSip: number | null
    minLumpsum: number | null
    sharpeRatio: number | null
    beta: number | null
    aumCr: number | null
  }
  /** null = no return calculator for this fund */
  calculator: FundCalculatorApi | null
}

/** "S" = SIP (monthly), "L" = lumpsum */
export type CalcType = "S" | "L"

export interface FundCalculatorApi {
  /** "unavailable" = Reedos failed when the page loaded, so Calculate is disabled */
  status: "ready" | "unavailable"
  /** ETFs: lumpsum only */
  types: CalcType[]
  /** null = no minimum */
  minSip: number | null
  minLumpsum: number | null
  maxAmount: number
}

/** Return from the fund's launch to today (Reedos GetFundOverViewCalcInfo). */
export interface FundReturnCalcApi {
  type: CalcType
  amount: number
  /** % */
  returnPct: number | null
  /** e.g. "12 years 8 months" */
  period: string
  investedAmount: number | null
  latestValue: number | null
  wealthGained: number | null
  /** 1-year returns, % */
  comparison: { scheme1Y: number | null; bankFd: number | null; gold1Y: number | null }
}

/** Link to a fund's detail page. */
export const fundHref = (fund: { slug: string }) => `/mutual-funds/fund/${fund.slug}`

export const mutualFundsApi = {
  page: (signal?: AbortSignal) => apiGet<MutualFundsPageApi>("/mutual-funds", { signal }),

  funds: ({ index, amc, ...query }: FundQuery, signal?: AbortSignal) =>
    apiGet<FundPageApi>("/mutual-funds/funds", {
      query: { ...query, amc, index: index ? "true" : undefined },
      signal,
    }),

  /** Detail page data; `slug` ends with the scheme code. */
  detail: (slug: string, signal?: AbortSignal) =>
    apiGet<FundDetailApi>(`/mutual-funds/fund${seg(slug)}`, { signal }),

  /** Return calculator: what `amount` (₹, monthly for SIP) invested since launch is worth today. */
  returns: (slug: string, type: CalcType, amount: number, signal?: AbortSignal) =>
    apiGet<FundReturnCalcApi>(`/mutual-funds/fund${seg(slug)}/returns`, { query: { type, amount }, signal }),

  /** e.g. ["equity-funds", "large-cap-funds"] or ["amc", "hdfc-mutual-fund"] */
  list: (path: string[], signal?: AbortSignal) =>
    apiGet<FundListApi>(`/mutual-funds/lists${path.map(seg).join("")}`, { signal }),
}

// ─── New Fund Offers: /api/v1/mutual-funds/nfos ─────────────────────────────

export interface NfoApi {
  schemeCode: number
  /** Scheme name without the offer dates */
  name: string
  amcName: string | null
  amcLogoUrl: string | null
  /** As Reedos sends it, e.g. "Equity Index Fund" */
  category: string | null
  faceValue: number | null
  /** "YYYY-MM-DD" */
  launchDate: string | null
  closingDate: string | null
  status: "Open" | "Upcoming"
  minInvestment: number | null
  /** null when SIP is not offered */
  minSip: number | null
  lumpsumAllowed: boolean
  sipAllowed: boolean
}

export interface NfoPageApi {
  stats: { total: number; open: number; upcoming: number }
  /** Reedos category names, most NFOs first */
  categories: { name: string; count: number }[]
  nfos: NfoApi[]
  /** "YYYY-MM-DD" (IST) the statuses were worked out for */
  asOf: string
}

export const nfoApi = {
  list: (signal?: AbortSignal) => apiGet<NfoPageApi>("/mutual-funds/nfos", { signal }),
}

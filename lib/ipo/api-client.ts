// IPO page calls to the backend: /api/v1/ipos

import { apiGet } from "@/lib/api/client"

export type IpoCategory = "Mainboard" | "SME"

interface IpoBase {
  id: number
  coCode: number
  isin: string | null
  company: string
  category: IpoCategory
  issueType: string | null
  /** YYYY-MM-DD */
  openDate: string | null
  closeDate: string | null
  faceValue: number | null
  priceMin: number | null
  priceMax: number | null
  /** As CMOTS sends it, e.g. "450.9 - 455.72" (₹ Cr) */
  issueSizeLabel: string | null
  /** Upper bound of the issue size, ₹ Cr */
  issueSizeCr: number | null
  lotSize: number | null
  minInvestment: number | null
  listingDate: string | null
  logoUrl: string | null
}

export interface OpenIpoApi extends IpoBase {
  maxRetailInvestment: number | null
  exchanges: string[]
  nseSymbol: string | null
  bseSymbol: string | null
  sharesOffered: number | null
}

export interface UpcomingIpoApi extends IpoBase {
  maxRetailInvestment: number | null
  daysLeft: number | null
}

export interface ClosedIpoApi extends IpoBase {
  issuePrice: number | null
  listingPrice: number | null
  listingGainPct: number | null
  exchanges: string[]
  nseSymbol: string | null
  bseSymbol: string | null
}

export interface IpoPageData {
  counts: { open: number; upcoming: number; closed: number }
  open: OpenIpoApi[]
  upcoming: UpcomingIpoApi[]
  closed: ClosedIpoApi[]
}

export const ipoApi = {
  page: (type: "all" | "mainboard" | "sme" = "all", signal?: AbortSignal) =>
    apiGet<IpoPageData>("/ipos", { query: { type }, signal }),
}

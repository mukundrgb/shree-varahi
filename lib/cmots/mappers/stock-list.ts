// Maps CMOTS company and quote data to stock table rows, and applies table filters.

import type { CompanyRecord } from "../services/company"
import type { CmotsQuote } from "../types/quote"
import type { StockQuote, StockSummary } from "@/lib/stocks/types"

function toNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function toStockQuote(quote: CmotsQuote): StockQuote {
  return {
    price: toNumber(quote.Price),
    changeAmt: toNumber(quote.PriceDiff),
    changePct: toNumber(quote.change),
    open: toNumber(quote.open_Price),
    high: toNumber(quote.High_Price),
    low: toNumber(quote.Low_Price),
    prevClose: toNumber(quote.Oldprice),
    volume: toNumber(quote.Volume),
    high52: toNumber(quote.HI_52_WK),
    low52: toNumber(quote.LO_52_WK),
    updatedAt: quote.Upd_Time,
  }
}

export function toStockSummary(
  company: CompanyRecord,
  quote: CmotsQuote | null,
  logoUrl: string | null,
): StockSummary {
  return {
    slug: company.slug,
    symbol: company.symbol,
    name: company.name,
    sector: company.sector,
    exchange: company.exchange,
    capCategory: company.capCategory,
    capLabel: company.capLabel,
    logoUrl,
    tradingViewSymbol: company.tradingViewSymbol,
    quote: quote ? toStockQuote(quote) : null,
  }
}

/** Website sector chips, matched against CMOTS sector and industry names. */
const SECTOR_PATTERNS: Record<string, RegExp> = {
  Banking: /\bbanks?\b|\bbanking\b/i,
  IT: /^it\b|\bit - |information technology/i,
  Auto: /\bauto/i,
  Pharma: /pharma|\bdrugs?\b/i,
  FMCG: /fmcg|tobacco|personal care|consumer food/i,
  Power: /\bpower\b/i,
  Energy: /\boil\b|\bgas\b|refiner|energy/i,
  NBFC: /\bnbfc\b|\bfinance\b/i,
  Telecom: /telecom/i,
}

const CAP_RANK: Record<string, number> = { large: 0, mid: 1, small: 2 }

export function byCapThenName(a: CompanyRecord, b: CompanyRecord): number {
  const rank = (CAP_RANK[a.capCategory ?? ""] ?? 3) - (CAP_RANK[b.capCategory ?? ""] ?? 3)
  return rank || a.name.localeCompare(b.name)
}

export function filterCompanies(
  companies: CompanyRecord[],
  { search, sector, cap }: { search?: string; sector?: string; cap?: string },
): CompanyRecord[] {
  const query = search?.trim().toLowerCase()
  const sectorPattern = sector ? SECTOR_PATTERNS[sector] : undefined

  return companies
    .filter((company) => {
      if (sectorPattern && !sectorPattern.test(`${company.sector} ${company.industry}`)) return false
      if (cap && company.capCategory !== cap) return false
      if (!query) return true
      return (
        company.symbol.toLowerCase().includes(query) ||
        company.name.toLowerCase().includes(query) ||
        company.sector.toLowerCase().includes(query)
      )
    })
    .sort(byCapThenName)
}

const MAX_SEARCH_RESULTS = 8

/** Lower is a better match. Null means the company doesn't match. */
function searchRank(company: CompanyRecord, query: string): number | null {
  const symbol = company.symbol.toLowerCase()
  const name = company.name.toLowerCase()

  if (symbol === query) return 0
  if (symbol.startsWith(query)) return 1
  if (name.startsWith(query)) return 2
  if (name.includes(` ${query}`)) return 3
  return symbol.includes(query) || name.includes(query) ? 4 : null
}

/** Matches on symbol and company name, with the closest matches first. */
export function searchCompanies(companies: CompanyRecord[], search: string): CompanyRecord[] {
  const query = search.trim().toLowerCase()
  if (!query) return []

  return companies
    .flatMap((company) => {
      const rank = searchRank(company, query)
      return rank === null ? [] : [{ company, rank }]
    })
    .sort((a, b) => a.rank - b.rank || byCapThenName(a.company, b.company))
    .slice(0, MAX_SEARCH_RESULTS)
    .map(({ company }) => company)
}

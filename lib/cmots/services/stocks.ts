// Combines the CMOTS services into the data each stock route returns.

import "server-only"
import { toStockAbout } from "../mappers/about"
import { toCorporateActions } from "../mappers/corporate-actions"
import { toFinancialsTable } from "../mappers/financials"
import { toStockNews } from "../mappers/news"
import { selectPeers } from "../mappers/peers"
import { listCategories } from "../mappers/category"
import { byChange, byName, filterCompanies, searchCompanies, toStockSummary } from "../mappers/stock-list"
import { findCompany, getCompanies, getCompanyProfile, type CompanyRecord } from "./company"
import { getCorporateActions } from "./corporate-actions"
import { getFinancialResults } from "./financials"
import { getLogoUrl } from "./logo"
import { getCorporateNews } from "./news"
import { getQuote } from "./quote"
import type {
  CorporateAction,
  FinancialsPeriod,
  FinancialsTable,
  FinancialsType,
  StockAbout,
  StockListParams,
  StockListResult,
  StockNews,
  StockSearchResult,
  StockSummary,
} from "@/lib/stocks/types"

const PAGE_SIZE = 10

async function toSummary(company: CompanyRecord): Promise<StockSummary> {
  const [quote, logoUrl] = await Promise.all([getQuote(company.coCode), getLogoUrl(company.coCode)])
  return toStockSummary(company, quote, logoUrl)
}

/** Quote requests sent to CMOTS at once when every match needs a quote. */
const QUOTE_CONCURRENCY = 10

async function mapLimited<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

export async function listStocks(params: StockListParams): Promise<StockListResult> {
  const companies = await getCompanies()
  const categories = listCategories(companies.map((company) => company.category))
  const matches = filterCompanies(companies, params)
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const page = Math.min(Math.max(1, params.page ?? 1), totalPages)
  const pageSlice = <T,>(rows: T[]) => rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  let items: StockSummary[]
  if (params.sort === "change-desc" || params.sort === "change-asc") {
    // CMOTS has no bulk quote API, so every match needs its own (cached) quote call.
    const summaries = await mapLimited(matches, QUOTE_CONCURRENCY, toSummary)
    items = pageSlice(summaries.sort(byChange(params.sort === "change-asc" ? "asc" : "desc")))
  } else {
    if (params.sort === "name-asc") matches.sort(byName)
    if (params.sort === "name-desc") matches.sort((a, b) => byName(b, a))
    items = await Promise.all(pageSlice(matches).map(toSummary))
  }

  return { items, total: matches.length, page, totalPages, categories }
}

export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  return searchCompanies(await getCompanies(), query).map(({ slug, symbol, name, sector, exchange }) => ({
    slug,
    symbol,
    name,
    sector,
    exchange,
  }))
}

export async function getStockOverview(slug: string): Promise<StockSummary> {
  return toSummary(await findCompany(slug))
}

export async function getStockPeers(slug: string): Promise<StockSummary[]> {
  const [company, companies] = await Promise.all([findCompany(slug), getCompanies()])
  return Promise.all(selectPeers(companies, company).map(toSummary))
}

export async function getStockFinancials(
  slug: string,
  period: FinancialsPeriod,
  type: FinancialsType,
): Promise<FinancialsTable> {
  const { coCode } = await findCompany(slug)
  return toFinancialsTable(await getFinancialResults(coCode, period, type), period)
}

export async function getStockCorporateActions(slug: string): Promise<CorporateAction[]> {
  const { coCode } = await findCompany(slug)
  const { dividends, bonuses, splits } = await getCorporateActions(coCode)
  return toCorporateActions(dividends, bonuses, splits)
}

export async function getStockAbout(slug: string): Promise<StockAbout> {
  const { coCode } = await findCompany(slug)
  return toStockAbout(await getCompanyProfile(coCode))
}

export async function getStockNews(slug: string): Promise<StockNews> {
  const company = await findCompany(slug)
  return toStockNews(await getCorporateNews(), company.name)
}

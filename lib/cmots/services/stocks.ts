// Combines the CMOTS services into the data each stock route returns.

import "server-only"
import { toStockAbout } from "../mappers/about"
import { toCorporateActions } from "../mappers/corporate-actions"
import { toFinancialsTable } from "../mappers/financials"
import { toStockNews } from "../mappers/news"
import { selectPeers } from "../mappers/peers"
import { filterCompanies, searchCompanies, toStockSummary } from "../mappers/stock-list"
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

export async function listStocks(params: StockListParams): Promise<StockListResult> {
  const matches = filterCompanies(await getCompanies(), params)
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const page = Math.min(Math.max(1, params.page ?? 1), totalPages)
  const visible = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return { items: await Promise.all(visible.map(toSummary)), total: matches.length, page, totalPages }
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

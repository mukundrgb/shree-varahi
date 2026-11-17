// Stocks page calls to the backend: /api/v1/stocks

import { apiGet, seg } from "@/lib/api/client"
import type {
  CorporateAction,
  FinancialsPeriod,
  FinancialsTable,
  FinancialsType,
  StockAbout,
  StockListParams,
  StockListResult,
  StockNews,
  StockQuoteResult,
  StockSearchResult,
  StockSummary,
} from "./types"

export const stocksApi = {
  list: ({ page, search, sector, cap, sort }: StockListParams, signal?: AbortSignal) =>
    apiGet<StockListResult>("/stocks", { query: { page, search, sector, cap, sort }, signal }),
  search: (query: string, signal?: AbortSignal) =>
    apiGet<StockSearchResult[]>("/stocks/search", { query: { q: query }, signal }),
  overview: (slug: string, signal?: AbortSignal) => apiGet<StockSummary>(`/stocks${seg(slug)}`, { signal }),
  quote: (slug: string, signal?: AbortSignal) => apiGet<StockQuoteResult>(`/stocks${seg(slug)}/quote`, { signal }),
  financials: (slug: string, period: FinancialsPeriod, type: FinancialsType, signal?: AbortSignal) =>
    apiGet<FinancialsTable>(`/stocks${seg(slug)}/financials`, { query: { period, type }, signal }),
  corporateActions: (slug: string, signal?: AbortSignal) =>
    apiGet<CorporateAction[]>(`/stocks${seg(slug)}/corporate-actions`, { signal }),
  peers: (slug: string, signal?: AbortSignal) => apiGet<StockSummary[]>(`/stocks${seg(slug)}/peers`, { signal }),
  about: (slug: string, signal?: AbortSignal) => apiGet<StockAbout>(`/stocks${seg(slug)}/about`, { signal }),
  news: (slug: string, signal?: AbortSignal) => apiGet<StockNews>(`/stocks${seg(slug)}/news`, { signal }),
}

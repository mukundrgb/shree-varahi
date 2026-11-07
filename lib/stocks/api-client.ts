// The single place the browser calls our /api/stocks routes.

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
} from "./types"

export class StockApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "StockApiError"
  }
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/stocks${path}`, { signal })
  const body = (await response.json().catch(() => null)) as
    | { success: true; data: T }
    | { success: false; message?: string }
    | null

  if (!response.ok || !body?.success) {
    throw new StockApiError(
      (body && !body.success && body.message) || "Unable to load market data",
      response.status,
    )
  }
  return body.data
}

const bySlug = (slug: string) => `/${encodeURIComponent(slug)}`

export const stocksApi = {
  list({ page, search, sector, cap }: StockListParams, signal?: AbortSignal) {
    const query = new URLSearchParams()
    if (page) query.set("page", String(page))
    if (search) query.set("search", search)
    if (sector) query.set("sector", sector)
    if (cap) query.set("cap", cap)
    return get<StockListResult>(`?${query}`, signal)
  },
  search: (query: string, signal?: AbortSignal) =>
    get<StockSearchResult[]>(`/search?q=${encodeURIComponent(query)}`, signal),
  overview: (slug: string, signal?: AbortSignal) => get<StockSummary>(bySlug(slug), signal),
  financials: (slug: string, period: FinancialsPeriod, type: FinancialsType, signal?: AbortSignal) =>
    get<FinancialsTable>(`${bySlug(slug)}/financials?period=${period}&type=${type}`, signal),
  corporateActions: (slug: string, signal?: AbortSignal) =>
    get<CorporateAction[]>(`${bySlug(slug)}/corporate-actions`, signal),
  peers: (slug: string, signal?: AbortSignal) => get<StockSummary[]>(`${bySlug(slug)}/peers`, signal),
  about: (slug: string, signal?: AbortSignal) => get<StockAbout>(`${bySlug(slug)}/about`, signal),
  news: (slug: string, signal?: AbortSignal) => get<StockNews>(`${bySlug(slug)}/news`, signal),
}

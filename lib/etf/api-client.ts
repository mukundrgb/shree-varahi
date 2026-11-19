// ETF page calls to the backend: /api/v1/etfs

import { apiGet, seg } from "@/lib/api/client"
import type { ChartRange, EtfCategory, EtfChart, EtfDetail, EtfHoldings, EtfListResult, EtfAssetAllocation, EtfSectorAllocation, EtfSortKey } from "./types"

export interface EtfListParams {
  category?: EtfCategory
  search?: string
  sort?: EtfSortKey
  order?: "asc" | "desc"
  page?: number
  limit?: number
}

/** Enough rows to load every ETF at once (the backend allows up to 500). */
export const ALL_ETFS = 500

export const etfApi = {
  list: ({ category, search, sort, order, page, limit }: EtfListParams = {}, signal?: AbortSignal) =>
    apiGet<EtfListResult>("/etfs", {
      query: { category: category?.toLowerCase(), search, sort, order, page, limit },
      signal,
    }),
  detail: (slug: string, signal?: AbortSignal) => apiGet<EtfDetail>(`/etfs${seg(slug)}`, { signal }),
  chart: (slug: string, range: ChartRange, signal?: AbortSignal) =>
    apiGet<EtfChart>(`/etfs${seg(slug)}/chart`, { query: { range }, signal }),
  /** Sector split of an equity ETF. Takes the ETF's ISIN. */
  sectorAllocation: (isin: string, signal?: AbortSignal) =>
    apiGet<EtfSectorAllocation>(`/etfs${seg(isin.toUpperCase())}/sector-allocation`, { signal }),
  /** Asset class split of any ETF. Takes the ETF's ISIN. */
  assetAllocation: (isin: string, signal?: AbortSignal) =>
    apiGet<EtfAssetAllocation>(`/etfs${seg(isin.toUpperCase())}/asset-allocation`, { signal }),
  /** Equity holdings with market value and share counts. Takes the ETF's ISIN, e.g. INF769K01FN2. */
  holdings: (isin: string, signal?: AbortSignal) => apiGet<EtfHoldings>(`/etfs${seg(isin.toUpperCase())}/combined-holdings`, { signal }),
}

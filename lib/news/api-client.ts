// Market news calls to the backend: /api/v1/news (CMOTS CapitalMarketLiveNews)

import { apiGet } from "@/lib/api/client"
import type { StockNewsItem } from "@/lib/stocks/types"

export interface MarketNews {
  items: StockNewsItem[]
}

export const newsApi = {
  /** Latest Market Beat stories, newest first (max 10). */
  marketBeat: (limit: number, signal?: AbortSignal) =>
    apiGet<MarketNews>("/news/market-beat", { query: { limit }, signal }),
}

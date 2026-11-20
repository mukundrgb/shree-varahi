// Stocks page "Market News" (CMOTS Market Beat via /api/v1/news/market-beat).

import { newsApi } from "@/lib/news/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

/** `limit` = most stories wanted; CMOTS gives at most 50 (the backend currently sends 30). */
export function useMarketBeat(limit = 50) {
  return useApiResource(`market-beat-${limit}`, (signal) => newsApi.marketBeat(limit, signal))
}

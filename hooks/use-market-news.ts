// Stocks page "Market News" (CMOTS Market Beat via /api/v1/news/market-beat).

import { newsApi } from "@/lib/news/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useMarketBeat(limit = 5) {
  return useApiResource(`market-beat-${limit}`, (signal) => newsApi.marketBeat(limit, signal))
}

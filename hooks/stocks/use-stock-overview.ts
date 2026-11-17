// Loads the stock details header and price data.

import { stocksApi } from "@/lib/stocks/api-client"
import { QUOTE_REFRESH_MS, useApiResource } from "@/hooks/use-api-resource"

export function useStockOverview(slug: string) {
  return useApiResource(slug, (signal) => stocksApi.overview(slug, signal), {
    refreshMs: QUOTE_REFRESH_MS,
  })
}

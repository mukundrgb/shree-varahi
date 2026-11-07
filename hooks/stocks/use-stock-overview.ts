// Loads the stock details header and price data.

import { stocksApi } from "@/lib/stocks/api-client"
import { QUOTE_REFRESH_MS, useStockResource } from "./use-stock-resource"

export function useStockOverview(slug: string) {
  return useStockResource(slug, (signal) => stocksApi.overview(slug, signal), {
    refreshMs: QUOTE_REFRESH_MS,
  })
}

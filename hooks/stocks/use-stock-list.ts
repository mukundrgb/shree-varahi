// Loads the All Stocks table.

import { stocksApi } from "@/lib/stocks/api-client"
import type { StockListParams } from "@/lib/stocks/types"
import { QUOTE_REFRESH_MS, useStockResource } from "./use-stock-resource"

export function useStockList(params: StockListParams) {
  return useStockResource(JSON.stringify(params), (signal) => stocksApi.list(params, signal), {
    refreshMs: QUOTE_REFRESH_MS,
  })
}

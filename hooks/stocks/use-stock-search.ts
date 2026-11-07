// Loads company matches for the global search. An empty query makes no request.

import { stocksApi } from "@/lib/stocks/api-client"
import { useStockResource } from "./use-stock-resource"

export function useStockSearch(query: string) {
  return useStockResource(query || null, (signal) => stocksApi.search(query, signal))
}

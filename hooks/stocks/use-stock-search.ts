// Loads company matches for the global search. An empty query makes no request.

import { stocksApi } from "@/lib/stocks/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useStockSearch(query: string) {
  return useApiResource(query || null, (signal) => stocksApi.search(query, signal))
}

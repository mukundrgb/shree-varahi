// Loads the Peers tab and Related Stocks list.

import { stocksApi } from "@/lib/stocks/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useStockPeers(slug: string) {
  return useApiResource(slug, (signal) => stocksApi.peers(slug, signal))
}

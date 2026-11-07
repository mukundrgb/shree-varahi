// Loads the Peers tab and Related Stocks list.

import { stocksApi } from "@/lib/stocks/api-client"
import { useStockResource } from "./use-stock-resource"

export function useStockPeers(slug: string) {
  return useStockResource(slug, (signal) => stocksApi.peers(slug, signal))
}

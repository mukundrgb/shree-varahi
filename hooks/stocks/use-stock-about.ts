// Loads the About tab. Waits until `enabled` is true.

import { stocksApi } from "@/lib/stocks/api-client"
import { useStockResource } from "./use-stock-resource"

export function useStockAbout(slug: string, enabled: boolean) {
  return useStockResource(enabled ? slug : null, (signal) => stocksApi.about(slug, signal))
}

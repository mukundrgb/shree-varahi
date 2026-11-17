// Loads the About tab. Waits until `enabled` is true.

import { stocksApi } from "@/lib/stocks/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useStockAbout(slug: string, enabled: boolean) {
  return useApiResource(enabled ? slug : null, (signal) => stocksApi.about(slug, signal))
}

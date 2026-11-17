// Loads the Corp. Actions tab. Waits until `enabled` is true.

import { stocksApi } from "@/lib/stocks/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useCorporateActions(slug: string, enabled: boolean) {
  return useApiResource(enabled ? slug : null, (signal) => stocksApi.corporateActions(slug, signal))
}

// MTF calculator and eligible-stocks data from the backend (/api/v1/mtf).

import { mtfApi, type MtfStockQuery } from "@/lib/mtf/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

/** Stock count, list date, popular and default stocks. */
export function useMtfSummary() {
  return useApiResource("mtf-summary", (signal) => mtfApi.summary(signal))
}

/** Search results / one table page. Pass null to wait (e.g. empty search box). */
export function useMtfStocks(query: MtfStockQuery | null) {
  const key = query ? `mtf-stocks-${JSON.stringify(query)}` : null
  return useApiResource(key, (signal) => mtfApi.stocks(query ?? {}, signal))
}

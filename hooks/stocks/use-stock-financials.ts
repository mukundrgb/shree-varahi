// Loads the Financials tab. Waits until `enabled` is true.

import { stocksApi } from "@/lib/stocks/api-client"
import type { FinancialsPeriod, FinancialsType } from "@/lib/stocks/types"
import { useApiResource } from "@/hooks/use-api-resource"

export function useStockFinancials(
  slug: string,
  period: FinancialsPeriod,
  type: FinancialsType,
  enabled: boolean,
) {
  return useApiResource(enabled ? `${slug}:${period}:${type}` : null, (signal) =>
    stocksApi.financials(slug, period, type, signal),
  )
}

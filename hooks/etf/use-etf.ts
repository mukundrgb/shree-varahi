// Data hooks for the ETF pages.

import { etfApi, ALL_ETFS, type EtfListParams } from "@/lib/etf/api-client"
import type { ChartRange } from "@/lib/etf/types"
import { QUOTE_REFRESH_MS, useApiResource } from "@/hooks/use-api-resource"

/** ETF list (cards and research table). Pass no params to load every ETF. */
export function useEtfList(params: EtfListParams = { limit: ALL_ETFS }) {
  return useApiResource(JSON.stringify(params), (signal) => etfApi.list(params, signal))
}

/** ETF detail page. Price data is refreshed in the background. */
export function useEtfDetail(slug: string) {
  return useApiResource(slug || null, (signal) => etfApi.detail(slug, signal), { refreshMs: QUOTE_REFRESH_MS })
}

/** ETF price chart for one range. */
export function useEtfChart(slug: string, range: ChartRange) {
  return useApiResource(slug ? `${slug}:${range}` : null, (signal) => etfApi.chart(slug, range, signal), {
    refreshMs: range === "1D" ? QUOTE_REFRESH_MS : undefined,
  })
}

/** Equity holdings of one ETF, by its ISIN. Pass null/empty to wait. */
export function useEtfHoldings(isin: string | null) {
  return useApiResource(isin ? `etf-holdings-${isin}` : null, (signal) => etfApi.holdings(isin ?? "", signal))
}

/** True when a holdings response belongs to this ISIN (ignores letter case). */
export const isHoldingsFor = (data: { isin: string } | null | undefined, isin: string | null) =>
  !!data && !!isin && data.isin?.toUpperCase() === isin.toUpperCase()

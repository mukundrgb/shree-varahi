// Data hooks for the F&O pages.

import { fnoApi, type FnoCategory } from "@/lib/fno/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

/** Derivatives prices refresh every 5 minutes at CMOTS; poll a little more often. */
const FNO_REFRESH_MS = 60_000

/** One page of underlyings for an F&O tab. */
export function useFnoCards(category: FnoCategory, { page = 1, limit = 8 }: { page?: number; limit?: number } = {}) {
  return useApiResource(`${category}:${page}:${limit}`, (signal) => fnoApi.cards(category, { page, limit }, signal), {
    refreshMs: FNO_REFRESH_MS,
  })
}

/* F&O detail pages are switched off for now (see app/futures/[slug] and app/options/[slug]).
export function useFuturesDetail(underlying: "index" | "stock", symbol: string) {
  return useApiResource(symbol ? `${underlying}:${symbol}` : null, (signal) => fnoApi.futures(underlying, symbol, signal), {
    refreshMs: FNO_REFRESH_MS,
  })
}

export function useOptionsDetail(underlying: "index" | "stock", symbol: string, expiry?: string) {
  return useApiResource(
    symbol ? `${underlying}:${symbol}:${expiry ?? ""}` : null,
    (signal) => fnoApi.options(underlying, symbol, expiry, signal),
    { refreshMs: FNO_REFRESH_MS },
  )
}
*/

// Loads the Top Gainers / Losers and 52-week high / low lists, one page at a time.

import { moversApi } from "@/lib/market-movers/api"
import { QUOTE_REFRESH_MS, useApiResource } from "@/hooks/use-api-resource"

export const MOVERS_PAGE_SIZE = 20

export type MoversKind = "gainers" | "losers" | "activeByValue" | "activeByVolume"

/** Top gainers / losers / most active; a null kind skips loading (e.g. on a slug that shows another list). */
export function useMovers(kind: MoversKind | null, page: number) {
  return useApiResource(
    kind === null ? null : `${kind}:${page}`,
    (signal) => moversApi[kind ?? "gainers"]({ page, limit: MOVERS_PAGE_SIZE }, signal),
    { refreshMs: QUOTE_REFRESH_MS },
  )
}

/** A null kind skips loading. */
export function useWeek52(kind: "high" | "low" | null, page: number) {
  return useApiResource(
    kind === null ? null : `52w-${kind}:${page}`,
    (signal) =>
      kind === "low"
        ? moversApi.week52Low({ page, limit: MOVERS_PAGE_SIZE }, signal)
        : moversApi.week52High({ page, limit: MOVERS_PAGE_SIZE }, signal),
    { refreshMs: QUOTE_REFRESH_MS },
  )
}

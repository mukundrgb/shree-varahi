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

/**
 * Contracts of one underlying for the "All Indices" table on /futures-options/:category/:slug.
 * Options return one expiry at a time; leave `expiry` empty for the nearest one.
 */
export function useFnoDetail(category: FnoCategory, slug: string, expiry?: string) {
  return useApiResource(
    slug ? `fno-detail:${category}:${slug}:${expiry ?? ""}` : null,
    (signal) => fnoApi.detail(category, slug, expiry, signal),
    { refreshMs: FNO_REFRESH_MS },
  )
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

/**
 * Header of an F&O detail page: the underlying's card from its tab list (name, price, change).
 * Looks through the tab's pages (100 at a time) until it finds the slug.
 */
export function useFnoCard(category: FnoCategory, slug: string) {
  return useApiResource(
    slug ? `fno-card:${category}:${slug}` : null,
    async (signal) => {
      for (let page = 1; ; page++) {
        const list = await fnoApi.cards(category, { page, limit: 100 }, signal)
        const card = list.items.find((c) => c.slug === slug)
        if (card) return { card, list }
        if (page >= list.totalPages) return { card: null, list }
      }
    },
    { refreshMs: FNO_REFRESH_MS },
  )
}

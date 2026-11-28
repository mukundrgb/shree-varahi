// Loads one stock list page (sector, market-cap or index list) from stored data:
// GET /stocks/collections/:group/:slug?page&limit

import { apiGet, seg } from "@/lib/api/client"
import { QUOTE_REFRESH_MS, useApiResource } from "@/hooks/use-api-resource"

export type CollectionGroup = "sector" | "cap" | "index"

export type CollectionStock = {
  slug: string
  symbol: string
  name: string
  sector: string
  logoUrl: string | null
  quote: { exchange: string | null; price: number; changePct: number | null; volume: number | null; high52: number | null; low52: number | null; updatedAt: string | null } | null
}

export type CollectionPage = {
  available: boolean
  /** Why it isn't available: needs-market-cap · index-members-missing · index-members-not-stored · unknown-sector */
  reason: string
  items: CollectionStock[]
  total: number
  page: number
  totalPages: number
  meta: { source: string; asOf: string | null; stale: boolean; status: "ok" | "stale" | "pending" } | null
}

/** A null source skips loading (the page then shows "Data coming soon"). */
export function useStockCollection(source: { group: CollectionGroup; slug: string } | null, page: number, limit = 50) {
  return useApiResource<CollectionPage>(
    source ? `collection:${source.group}:${source.slug}:${page}:${limit}` : null,
    (signal) => apiGet<CollectionPage>(`/stocks/collections${seg(source!.group)}${seg(source!.slug)}`, { query: { page, limit }, signal }),
    { refreshMs: QUOTE_REFRESH_MS },
  )
}

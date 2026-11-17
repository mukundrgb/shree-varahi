// Mutual Funds page data from the backend (/api/v1/mutual-funds).

import { mutualFundsApi, nfoApi, type FundQuery } from "@/lib/mutual-funds/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

/** Stats, categories, AMC partners and filter options. */
export function useMutualFundsPage() {
  return useApiResource("mf-page", (signal) => mutualFundsApi.page(signal))
}

/** One page of the Find Your Fund table. Refetches whenever the query changes. */
export function useFundSearch(query: FundQuery) {
  const key = JSON.stringify(query)
  return useApiResource(key, (signal) => mutualFundsApi.funds(query, signal))
}

/** A category / AMC / curated list page. */
export function useFundList(path: string[]) {
  const key = path.length ? path.join("/") : null
  return useApiResource(key, (signal) => mutualFundsApi.list(path, signal))
}

/** Open and upcoming New Fund Offers. */
export function useNfos() {
  return useApiResource("mf-nfos", (signal) => nfoApi.list(signal))
}

/** One fund's detail page. */
export function useFundDetail(slug: string | null) {
  return useApiResource(slug ? `mf-fund-${slug}` : null, (signal) => mutualFundsApi.detail(slug ?? "", signal))
}

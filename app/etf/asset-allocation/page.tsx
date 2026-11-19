"use client"

import { Suspense, useMemo } from "react"
import { EtfAllocationPage, type AllocationResult } from "@/components/etf-allocation-page"
import { isHoldingsFor, useEtfAssetAllocation } from "@/hooks/etf/use-etf"

// Asset allocation of any ETF (Equity, Commodity, Debt, Global): Name · Holding % · Total Shares.
// Data: GET /api/v1/etfs/<ISIN>/asset-allocation?search=<text> (it has no share counts, so Total Shares shows "—").

function useAssetAllocation(_slug: string, isin: string | null, search: string): AllocationResult {
  const { data, error, retry } = useEtfAssetAllocation(isin, search)
  // Ignore a response left over from the previously picked ETF; while a new search
  // loads, keep showing this ETF's last rows.
  const current = isHoldingsFor(data, isin) ? data : null
  const fresh = current?.search === search
  const rows = useMemo(
    () =>
      (current?.assets ?? [])
        .map((a) => ({ name: a.name, weight: a.holdingPercentage, totalShares: null }))
        .sort((a, b) => b.weight - a.weight),
    [current],
  )
  return {
    rows,
    loading: !!isin && !fresh && !error,
    error: !!error && !current,
    retry,
    asOf: current?.portfolioDate ?? null,
    emptyText: isin ? "No asset allocation data for this ETF." : "Asset allocation isn't available for this ETF.",
  }
}

export default function AssetAllocationPage() {
  // useSearchParams (inside the page layout) needs a Suspense boundary in the App Router.
  return (
    <Suspense>
      <EtfAllocationPage
        title="ETF Asset Allocation"
        breadcrumb="Asset Allocation"
        description="See how an ETF's assets are split across equities, commodities, debt instruments and other asset classes, for every ETF category."
        rowLabel="assets"
        searchPlaceholder="Search by asset..."
        useAllocation={useAssetAllocation}
      />
    </Suspense>
  )
}

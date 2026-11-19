"use client"

import { Suspense } from "react"
import { EtfAllocationPage, type AllocationResult } from "@/components/etf-allocation-page"

// Asset allocation of any ETF (Equity, Commodity, Debt, Global): Name · Holding % · Total Shares.
// The backend has no asset allocation data yet, so the table is ready but empty.
// To plug the data in: fetch it for `slug` here and return it as `rows` (see AllocationRow).

function useAssetAllocation(_slug: string): AllocationResult {
  return {
    rows: [],
    loading: false,
    error: false,
    retry: () => {},
    asOf: null,
    emptyText: "Asset allocation data for this ETF will be available soon.",
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

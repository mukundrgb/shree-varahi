"use client"

import { Suspense } from "react"
import { EtfAllocationPage, type AllocationResult } from "@/components/etf-allocation-page"

// Sector allocation of an equity ETF: Name · Holding % · Total Shares.
// The sector allocation API isn't connected yet, so the table is ready but empty.
// To plug the data in: fetch it for `slug` here and return it as `rows` (see AllocationRow).

function useSectorAllocation(_slug: string): AllocationResult {
  return {
    rows: [],
    loading: false,
    error: false,
    retry: () => {},
    asOf: null,
    emptyText: "Sector allocation data for this ETF will be available soon.",
  }
}

export default function SectorAllocationPage() {
  // useSearchParams (inside the page layout) needs a Suspense boundary in the App Router.
  return (
    <Suspense>
      <EtfAllocationPage
        title="ETF Sector Allocation"
        breadcrumb="Sector Allocation"
        description="See how an equity ETF's money is spread across sectors, and which industries make up the biggest share of the fund."
        category="Equity"
        rowLabel="sectors"
        searchPlaceholder="Search by sector..."
        useAllocation={useSectorAllocation}
      />
    </Suspense>
  )
}

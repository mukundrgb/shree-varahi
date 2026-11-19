"use client"

import { Suspense, useMemo } from "react"
import { EtfAllocationPage, type AllocationResult } from "@/components/etf-allocation-page"
import { isHoldingsFor, useEtfSectorAllocation } from "@/hooks/etf/use-etf"

// Sector allocation of an equity ETF: Name · Holding % · Total Shares.
// Data: GET /api/v1/etfs/<ISIN>/sector-allocation

function useSectorAllocation(_slug: string, isin: string | null): AllocationResult {
  const { data, error, retry } = useEtfSectorAllocation(isin)
  // Ignore a response left over from the previously picked ETF.
  const current = isHoldingsFor(data, isin) ? data : null
  const rows = useMemo(
    () =>
      (current?.sectors ?? [])
        .map((s) => ({ name: s.name, weight: s.holdingPercentage, totalShares: s.totalShares }))
        .sort((a, b) => b.weight - a.weight),
    [current],
  )
  return {
    rows,
    loading: !!isin && !current && !error,
    error: !!error && !current,
    retry,
    asOf: current?.portfolioDate ?? null,
    emptyText: isin ? "No sector allocation data for this ETF." : "Sector allocation isn't available for this ETF.",
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

"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { MarketMoversPage, MostActiveTable, MoversTable, Week52Table } from "@/components/market-movers-page"
import { isMoverSlug, type MarketMover } from "@/lib/market-movers/types"
import type { Week52Row } from "@/lib/market-movers/week52"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

// Market movers pages. No data source yet; once the APIs exist, pass their rows instead of the empty lists:
//   gainers / losers / most active → MarketMoverApi rows mapped with toMarketMover   (lib/market-movers/types.ts)
//   52-week high / low             → Week52Api rows mapped with toWeek52Row           (lib/market-movers/week52.ts)
// Any other /stock-market-live/<slug> keeps the generic stock list.
const NO_MOVERS: MarketMover[] = []
const NO_WEEK52: Week52Row[] = []

export default function StockMarketLiveDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""

  const generic = useMemo(
    () => (isMoverSlug(slug) ? null : synthesizeStockList(slug, { crumbCategory: "Stock Market Live", titleOverride: titleFromSlug(slug) })),
    [slug],
  )

  if (slug === "52-week-high-stocks" || slug === "52-week-low-stocks") {
    return (
      <MarketMoversPage slug={slug} count={NO_WEEK52.length}>
        <Week52Table rows={NO_WEEK52} kind={slug === "52-week-high-stocks" ? "high" : "low"} />
      </MarketMoversPage>
    )
  }
  if (slug === "most-active-by-value" || slug === "most-active-by-volume") {
    return (
      <MarketMoversPage slug={slug} count={NO_MOVERS.length}>
        <MostActiveTable rows={NO_MOVERS} by={slug === "most-active-by-value" ? "value" : "volume"} />
      </MarketMoversPage>
    )
  }
  if (isMoverSlug(slug)) {
    return (
      <MarketMoversPage slug={slug} count={NO_MOVERS.length}>
        <MoversTable rows={NO_MOVERS} />
      </MarketMoversPage>
    )
  }
  return <StockListPage data={generic!} />
}

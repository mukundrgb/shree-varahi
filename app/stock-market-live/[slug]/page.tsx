"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { MarketMoversPage, MostActiveTable, MoversPagination, MoversTable, Week52Table } from "@/components/market-movers-page"
import { isMoverSlug, toMarketMover } from "@/lib/market-movers/types"
import { toWeek52Row } from "@/lib/market-movers/week52"
import type { Paged } from "@/lib/market-movers/api"
import { MOVERS_PAGE_SIZE, useMovers, useWeek52, type MoversKind } from "@/hooks/use-market-movers"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"
import type { ApiError } from "@/lib/api/client"

// Market movers pages.
//   Gainers / Losers / Most Active → GET /stocks/gainers|losers|most-active/Nifty/value|volume  mapped with toMarketMover
//   52-week high / low             → GET /stocks/52-week-high|low  mapped with toWeek52Row
// Any other /stock-market-live/<slug> keeps the generic stock list.

/** Loading / error message shown in place of the rows, or null once the requested page is in. */
function tableStatus(
  result: { data: Paged<unknown> | null; error: ApiError | null; loading: boolean; retry: () => void },
  page: number,
): React.ReactNode {
  if (result.error && !result.data) {
    return (
      <>
        Unable to load stocks.{" "}
        <button onClick={result.retry} className="text-burgundy font-bold hover:underline">Retry</button>
      </>
    )
  }
  if (result.loading && (!result.data || result.data.page !== page)) return "Loading stocks…"
  return null
}

export default function StockMarketLiveDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""

  // The page number belongs to one slug, so moving to another list starts again at page 1.
  const [paging, setPaging] = useState({ slug, page: 1 })
  const page = paging.slug === slug ? paging.page : 1
  const goTo = (next: number) => {
    setPaging({ slug, page: next })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const week52Kind = slug === "52-week-high-stocks" ? "high" : slug === "52-week-low-stocks" ? "low" : null
  const moversKind: MoversKind | null =
    slug === "top-gainers-today" ? "gainers"
    : slug === "top-losers-today" ? "losers"
    : slug === "most-active-by-value" ? "activeByValue"
    : slug === "most-active-by-volume" ? "activeByVolume"
    : null
  const movers = useMovers(moversKind, page)
  const week52 = useWeek52(week52Kind, page)

  const moverRows = useMemo(() => movers.data?.items.map(toMarketMover) ?? [], [movers.data])
  const week52Rows = useMemo(() => week52.data?.items.map(toWeek52Row) ?? [], [week52.data])

  const generic = useMemo(
    () => (isMoverSlug(slug) ? null : synthesizeStockList(slug, { crumbCategory: "Stock Market Live", titleOverride: titleFromSlug(slug) })),
    [slug],
  )

  const offset = (page - 1) * MOVERS_PAGE_SIZE

  if (week52Kind) {
    return (
      <MarketMoversPage slug={slug as "52-week-high-stocks" | "52-week-low-stocks"} count={week52.data?.total ?? 0}>
        <Week52Table rows={week52Rows} kind={week52Kind} offset={offset} status={tableStatus(week52, page)} />
        <MoversPagination page={page} totalPages={week52.data?.totalPages ?? 1} onChange={goTo} />
      </MarketMoversPage>
    )
  }
  if (moversKind && isMoverSlug(slug)) {
    const status = tableStatus(movers, page)
    const active = moversKind === "activeByValue" ? "value" : moversKind === "activeByVolume" ? "volume" : null
    return (
      <MarketMoversPage slug={slug} count={movers.data?.total ?? 0}>
        {active
          ? <MostActiveTable rows={moverRows} by={active} offset={offset} status={status} />
          : <MoversTable rows={moverRows} offset={offset} status={status} />}
        <MoversPagination page={page} totalPages={movers.data?.totalPages ?? 1} onChange={goTo} />
      </MarketMoversPage>
    )
  }
  return <StockListPage data={generic!} />
}

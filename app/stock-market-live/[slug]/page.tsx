"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

const TITLES: Record<string, string> = {
  "top-gainers-today": "Top Gainers Today", "top-losers-today": "Top Losers Today",
  "52-week-high-stocks": "52-Week High Stocks", "52-week-low-stocks": "52-Week Low Stocks",
  "most-active-by-value": "Most Active Stocks by Value", "most-active-by-volume": "Most Active Stocks by Volume",
}

export default function StockMarketLiveDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeStockList(slug, {
    crumbCategory: "Stock Market Live",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
  }), [slug])
  return <StockListPage data={data} />
}

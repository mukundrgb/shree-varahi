"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

const TITLES: Record<string, string> = {
  "large-cap-stocks": "Large Cap Stocks", "mid-cap-stocks": "Mid Cap Stocks",
  "small-cap-stocks": "Small Cap Stocks", "micro-cap-stocks": "Micro Cap Stocks",
  "nano-cap-stocks": "Nano Cap Stocks", "top-100-market-cap-stocks": "Top 100 Market Cap Stocks",
}

export default function StocksMarketDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeStockList(slug, {
    crumbCategory: "Market Cap",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
  }), [slug])
  return <StockListPage data={data} />
}

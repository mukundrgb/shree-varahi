"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

const TITLES: Record<string, string> = {
  "bse-sensex": "BSE Sensex Stocks", "bse-ipo": "BSE IPO Stocks", "bse-psu": "BSE PSU Stocks",
  "bse-healthcare": "BSE Healthcare Stocks", "bse-bankex": "BSE Bankex Stocks", "bse-it": "BSE IT Stocks",
  "bse-large-cap": "BSE Large Cap Stocks", "bse-mid-cap": "BSE Mid Cap Stocks", "bse-small-cap": "BSE Small Cap Stocks",
  "bse-100": "BSE 100 Stocks", "bse-200": "BSE 200 Stocks", "bse-500": "BSE 500 Stocks",
}

export default function BseStocksListDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeStockList(slug, {
    crumbCategory: "BSE Stocks",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
  }), [slug])
  return <StockListPage data={data} />
}

"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

const TITLES: Record<string, string> = {
  "nifty-50": "Nifty 50 Stocks", "nifty-next-50": "Nifty Next 50 Stocks", "nifty-bank": "Nifty Bank Stocks",
  "nifty-fin-services": "Nifty Financial Services Stocks", "nifty-it": "Nifty IT Stocks",
  "nifty-auto": "Nifty Auto Stocks", "nifty-fmcg": "Nifty FMCG Stocks", "nifty-pharma": "Nifty Pharma Stocks",
  "nifty-metal": "Nifty Metal Stocks", "nifty-energy": "Nifty Energy Stocks", "nifty-realty": "Nifty Realty Stocks",
}

export default function NiftyStocksListDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeStockList(slug, {
    crumbCategory: "Nifty Stocks List",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
  }), [slug])
  return <StockListPage data={data} />
}

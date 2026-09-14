"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { StockListPage } from "@/components/stock-list-page"
import { synthesizeStockList, titleFromSlug } from "@/lib/synthesize-stock-list"

const TITLES: Record<string, string> = {
  "bank-stocks": "Bank Stocks", "it-software-stocks": "IT Stocks", "fmcg-stocks": "FMCG Stocks",
  "refinery-stocks": "Petroleum Stocks", "engineering-stocks": "Engineering Stocks",
  "chemical-stocks": "Chemical Stocks", "finance-stocks": "Finance Stocks",
  "automobile-stocks": "Auto Stocks", "pharmaceuticals-stocks": "Pharma Stocks",
  "power-generation-stocks": "Power Stocks", "cement-stocks": "Cement Stocks",
}

export default function StocksSectorDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeStockList(slug, {
    crumbCategory: "Sector",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
  }), [slug])
  return <StockListPage data={data} />
}

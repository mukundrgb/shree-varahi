"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { ETFListPage } from "@/components/etf-list-page"
import { synthesizeETFList, titleFromSlug } from "@/lib/synthesize-mf-etf"

const TITLES: Record<string, string> = {
  "nifty-50-etfs": "Nifty 50 ETF", "nifty-next-50-etfs": "Nifty Next 50 ETF", "bank-nifty-etfs": "Bank Nifty ETF",
  "nifty-it-etfs": "Nifty IT ETF", "sensex-etfs": "Sensex ETF", "gold-etfs": "Gold ETF", "silver-etfs": "Silver ETF",
  "commodity-etfs": "Commodity ETFs", "international-etfs": "International ETF", "banking-etfs": "Banking ETF",
  "defence-etfs": "Defence ETF", "index-etfs": "Index ETFs",
}

export default function ETFTradedFundsDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => synthesizeETFList(slug, {
    crumbCategory: "Traded Funds",
    titleOverride: TITLES[slug] ?? titleFromSlug(slug),
    priceRange: slug.includes("gold") || slug.includes("silver") ? [90, 145] : [30, 300],
  }), [slug])
  return <ETFListPage data={data} />
}

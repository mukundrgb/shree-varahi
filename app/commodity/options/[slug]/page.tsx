"use client"

// MCX commodity options page. Live MCX data isn't connected yet, so the page shows the contract and
// how to trade it, without numbers (it used to show a made-up option chain; PRD v3.0 ST-08).

import { useParams } from "next/navigation"
import { MarketDataSoon, nameFromSlug } from "@/components/market-data-soon"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

const KNOWN: Record<string, { name: string; sector: string }> = {
  "gold":           { name: "MCX Gold Options",           sector: "Bullion" },
  "silver":         { name: "MCX Silver Options",         sector: "Bullion" },
  "crude-oil":      { name: "MCX Crude Oil Options",      sector: "Energy" },
  "crude-oil-mini": { name: "MCX Crude Oil Mini Options", sector: "Energy" },
  "natural-gas":    { name: "MCX Natural Gas Options",    sector: "Energy" },
  "copper":         { name: "MCX Copper Options",         sector: "Base Metal" },
}

export default function CommodityOptionsDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const known = KNOWN[slug]
  const name = known?.name ?? `MCX ${nameFromSlug(slug, /-option(s)?(-chain)?(-summary)?$/)} Options`

  return (
    <MarketDataSoon
      crumbs={[{ label: "Commodity", href: "/commodity" }, { label: "Options" }, { label: name }]}
      title={name}
      badges={["MCX", ...(known ? [known.sector] : [])]}
      message={`The live option chain, open interest and contract details for ${name} will appear here shortly.`}
      browse={{ label: "About commodity trading", href: "/commodity" }}
      cta={{ title: "Trade commodities with Shree Varahi", text: "Futures and options on MCX, from one account.", label: "Open a free account →", href: OPEN_ACCOUNT_URL }}
    />
  )
}

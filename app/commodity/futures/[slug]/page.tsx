"use client"

// MCX commodity futures page. Live MCX data isn't connected yet, so the page shows the contract and
// how to trade it, without numbers (it used to show made-up prices and open interest; PRD v3.0 ST-08).

import { useParams } from "next/navigation"
import { MarketDataSoon, nameFromSlug } from "@/components/market-data-soon"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

const KNOWN: Record<string, { name: string; sector: string }> = {
  "mcx-gold":       { name: "MCX Gold Futures",           sector: "Bullion" },
  "gold":           { name: "MCX Gold Futures",           sector: "Bullion" },
  "mcx-silver":     { name: "MCX Silver Futures",         sector: "Bullion" },
  "silver":         { name: "MCX Silver Futures",         sector: "Bullion" },
  "gold-mini":      { name: "MCX Gold Mini Futures",      sector: "Bullion" },
  "silver-mini":    { name: "MCX Silver Mini Futures",    sector: "Bullion" },
  "gold-petal":     { name: "MCX Gold Petal Futures",     sector: "Bullion" },
  "crude-oil":      { name: "MCX Crude Oil Futures",      sector: "Energy" },
  "crude-oil-mini": { name: "MCX Crude Oil Mini Futures", sector: "Energy" },
  "natural-gas":    { name: "MCX Natural Gas Futures",    sector: "Energy" },
  "copper":         { name: "MCX Copper Futures",         sector: "Base Metal" },
  "aluminium":      { name: "MCX Aluminium Futures",      sector: "Base Metal" },
  "zinc":           { name: "MCX Zinc Futures",           sector: "Base Metal" },
  "lead":           { name: "MCX Lead Futures",           sector: "Base Metal" },
  "nickel":         { name: "MCX Nickel Futures",         sector: "Base Metal" },
}

export default function CommodityFuturesDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const known = KNOWN[slug]
  const name = known?.name ?? `MCX ${nameFromSlug(slug, /-futures(-summary)?$/)} Futures`

  return (
    <MarketDataSoon
      crumbs={[{ label: "Commodity", href: "/commodity" }, { label: "Futures" }, { label: name }]}
      title={name}
      badges={["MCX", ...(known ? [known.sector] : [])]}
      message={`Live prices, open interest and contract details for ${name} will appear here shortly.`}
      browse={{ label: "About commodity trading", href: "/commodity" }}
      cta={{ title: "Trade commodities with Shree Varahi", text: "Futures and options on MCX, from one account.", label: "Open a free account →", href: OPEN_ACCOUNT_URL }}
    />
  )
}

"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { FuturesDetailPage, type FuturesPageData, type BuildUp } from "@/components/futures-detail-page"

const KNOWN: Record<string, { symbol: string; name: string; sector: string; price: number }> = {
  "mcx-gold":       { symbol: "GOLD",     name: "MCX Gold Futures",       sector: "Bullion", price: 72450.00 },
  "gold":           { symbol: "GOLD",     name: "MCX Gold Futures",       sector: "Bullion", price: 72450.00 },
  "mcx-silver":     { symbol: "SILVER",   name: "MCX Silver Futures",     sector: "Bullion", price: 91200.00 },
  "silver":         { symbol: "SILVER",   name: "MCX Silver Futures",     sector: "Bullion", price: 91200.00 },
  "gold-mini":      { symbol: "GOLDM",    name: "MCX Gold Mini Futures",  sector: "Bullion", price: 72420.00 },
  "silver-mini":    { symbol: "SILVERM",  name: "MCX Silver Mini Futures",sector: "Bullion", price: 91180.00 },
  "gold-petal":     { symbol: "GOLDPETAL",name: "MCX Gold Petal Futures", sector: "Bullion", price: 7245.00 },
  "crude-oil":      { symbol: "CRUDEOIL", name: "MCX Crude Oil Futures",  sector: "Energy",  price: 6150.00 },
  "crude-oil-mini": { symbol: "CRUDEOILM",name: "MCX Crude Oil Mini Futures", sector: "Energy", price: 6148.00 },
  "natural-gas":    { symbol: "NATURALGAS", name: "MCX Natural Gas Futures", sector: "Energy", price: 268.40 },
  "copper":         { symbol: "COPPER",   name: "MCX Copper Futures",     sector: "Base Metal", price: 812.30 },
  "aluminium":      { symbol: "ALUMINIUM",name: "MCX Aluminium Futures",  sector: "Base Metal", price: 228.50 },
  "zinc":           { symbol: "ZINC",     name: "MCX Zinc Futures",       sector: "Base Metal", price: 258.90 },
  "lead":           { symbol: "LEAD",     name: "MCX Lead Futures",       sector: "Base Metal", price: 182.40 },
  "nickel":          { symbol: "NICKEL",  name: "MCX Nickel Futures",     sector: "Base Metal", price: 1420.60 },
}

const BUILDUPS: BuildUp[] = ["Long Buildup", "Short Buildup", "Short Covering", "Long Unwinding"]

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function synthesize(slug: string) {
  const h = hashSlug(slug)
  const base = slug.replace(/-futures(-summary)?$/, "")
  const name = base.split("-").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return {
    symbol: base.toUpperCase().replace(/-/g, "").slice(0, 12),
    name: `MCX ${name} Futures`,
    sector: "Commodity",
    price: 100 + (h % 90000),
  }
}

function rnd(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

function buildData(slug: string): FuturesPageData {
  const info = KNOWN[slug] ?? synthesize(slug)
  const h = hashSlug(slug)
  const price = info.price
  const chg = Math.round(rnd(h, -price * 0.012, price * 0.012) * 100) / 100
  const chgPct = Math.round((chg / price) * 10000) / 100
  const open = Math.round((price - chg * 0.6) * 100) / 100
  const high52 = Math.round(price * 1.22 * 100) / 100
  const low52 = Math.round(price * 0.8 * 100) / 100

  const months = ["Aug", "Oct", "Dec"]
  const days = [22, 84, 145]
  const oiVals = months.map((_, i) => Math.round(400000 + rnd(h + i, 0, 5600000)))
  const totalOi = oiVals.reduce((a, b) => a + b, 0)
  const oiBreakup = months.map((m, i) => ({ month: m, oi: oiVals[i].toLocaleString("en-IN"), oiPct: Math.round((oiVals[i] / totalOi) * 10000) / 100 }))

  const priceAcrossExpiry = months.map((_, i) => {
    const p = Math.round(price * (1 + 0.001 * (i + 1) * rnd(h + i + 50, 0.6, 1.4)) * 100) / 100
    const c = Math.round(rnd(h + i + 90, -price * 0.008, price * 0.008) * 100) / 100
    return { price: p, chg: c, chgPct: Math.round((c / p) * 10000) / 100 }
  })

  const contracts = months.map((m, i) => {
    const p = priceAcrossExpiry[i]
    const bid = Math.round((p.price - rnd(h + i + 10, 1, 6)) * 100) / 100
    const ask = Math.round((p.price + rnd(h + i + 20, 1, 6)) * 100) / 100
    return {
      label: `${info.symbol} ${m.toUpperCase()} FUT`,
      daysToExpiry: days[i],
      ltp: p.price, chg: p.chg, chgPct: p.chgPct,
      volume: Math.round(60000 + rnd(h + i + 30, 0, 5000000)).toLocaleString("en-IN"),
      oi: oiVals[i].toLocaleString("en-IN"),
      oiChangePct: Math.round(rnd(h + i + 40, -8, 8) * 100) / 100,
      buildUp: BUILDUPS[Math.floor(rnd(h + i + 60, 0, 4))],
      bid, ask,
      bidQty: String(Math.round(rnd(h + i + 70, 10, 999))),
      askQty: String(Math.round(rnd(h + i + 80, 10, 999))),
    }
  })

  const premiumDiscount = months.map((_, i) => Math.round(rnd(h + i + 100, 5, 60) * 100) / 100)

  return {
    symbol: info.symbol, name: info.name, sector: info.sector,
    ltp: price, chg, chgPct, open, high52, low52,
    exchanges: ["MCX"],
    asOf: "13 Jul 2026 at 12:34 PM",
    oiBreakup, priceAcrossExpiry, premiumDiscount, contracts,
  }
}

export default function CommodityFuturesDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => buildData(slug), [slug])
  return <FuturesDetailPage data={data} />
}

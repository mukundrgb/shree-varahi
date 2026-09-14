"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { FuturesDetailPage, type FuturesPageData, type BuildUp } from "@/components/futures-detail-page"

// Known majors keep curated, realistic values. Any other slug (individual
// stock/commodity futures linked from menus, sitemap, F&O tables) still
// resolves to a real page via deterministic synthesis below — no 404s.
const KNOWN: Record<string, { symbol: string; name: string; sector: string; price: number; exchanges: string[] }> = {
  "nifty-futures":           { symbol: "NIFTY",      name: "Nifty 50 Futures",                sector: "Index", price: 24013.10, exchanges: ["NSE"] },
  "nifty-50-futures":        { symbol: "NIFTY",      name: "Nifty 50 Futures",                sector: "Index", price: 24013.10, exchanges: ["NSE"] },
  "bank-nifty-futures":      { symbol: "BANKNIFTY",  name: "Bank Nifty Futures",              sector: "Index", price: 51820.65, exchanges: ["NSE"] },
  "nifty-bank-futures":      { symbol: "BANKNIFTY",  name: "Bank Nifty Futures",              sector: "Index", price: 51820.65, exchanges: ["NSE"] },
  "finnifty-futures":        { symbol: "FINNIFTY",   name: "Nifty Financial Services Futures", sector: "Index", price: 24890.15, exchanges: ["NSE"] },
  "nifty-next-50-futures":   { symbol: "NIFTYNXT50", name: "Nifty Next 50 Futures",           sector: "Index", price: 68420.75, exchanges: ["NSE"] },
  "nifty-midcap-select-futures": { symbol: "MIDCPSEL", name: "Nifty Midcap Select Futures",   sector: "Index", price: 12480.30, exchanges: ["NSE"] },
  "sensex-futures":          { symbol: "SENSEX",     name: "Sensex Futures",                  sector: "Index", price: 79214.30, exchanges: ["BSE"] },
  "bankex-futures":          { symbol: "BANKEX",     name: "Bankex Futures",                  sector: "Index", price: 58940.20, exchanges: ["BSE"] },
  "stock-futures":           { symbol: "RELIANCE",   name: "Reliance Industries Futures",     sector: "Petroleum Products", price: 1298.80, exchanges: ["NSE", "BSE"] },
}

const BUILDUPS: BuildUp[] = ["Long Buildup", "Short Buildup", "Short Covering", "Long Unwinding"]

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function synthesize(slug: string): { symbol: string; name: string; sector: string; price: number; exchanges: string[] } {
  const h = hashSlug(slug)
  const base = slug.replace(/-futures(-summary)?$/, "")
  const name = base.split("-").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  return {
    symbol: base.toUpperCase().replace(/-/g, "").slice(0, 12),
    name: `${name} Futures`,
    sector: ["Banking", "IT", "Energy", "FMCG", "Auto", "Pharma", "Metals"][h % 7],
    price: 80 + (h % 6000) + ((h >> 8) % 100) / 100,
    exchanges: ["NSE"],
  }
}

function buildData(slug: string): FuturesPageData {
  const info = KNOWN[slug] ?? synthesize(slug)
  const h = hashSlug(slug)
  const rnd = (seed: number, min: number, max: number) => {
    const x = Math.sin(seed) * 10000
    const frac = x - Math.floor(x)
    return min + frac * (max - min)
  }
  const price = info.price
  const chg = Math.round(rnd(h, -price * 0.015, price * 0.015) * 100) / 100
  const chgPct = Math.round((chg / price) * 10000) / 100
  const open = Math.round((price - chg * 0.6) * 100) / 100
  const high52 = Math.round(price * 1.2 * 100) / 100
  const low52 = Math.round(price * 0.82 * 100) / 100

  const months = ["Aug", "Sep", "Oct"]
  const days = [22, 57, 92]
  const oiVals = months.map((_, i) => Math.round(800000 + rnd(h + i, 0, 9000000)))
  const totalOi = oiVals.reduce((a, b) => a + b, 0)
  const oiBreakup = months.map((m, i) => ({ month: m, oi: oiVals[i].toLocaleString("en-IN"), oiPct: Math.round((oiVals[i] / totalOi) * 10000) / 100 }))

  const priceAcrossExpiry = months.map((_, i) => {
    const p = Math.round(price * (1 + 0.001 * (i + 1) * rnd(h + i + 50, 0.6, 1.4)) * 100) / 100
    const c = Math.round(rnd(h + i + 90, -price * 0.008, price * 0.008) * 100) / 100
    return { price: p, chg: c, chgPct: Math.round((c / p) * 10000) / 100 }
  })

  const contracts = months.map((m, i) => {
    const p = priceAcrossExpiry[i]
    const bid = Math.round((p.price - rnd(h + i + 10, 0.5, 3)) * 100) / 100
    const ask = Math.round((p.price + rnd(h + i + 20, 0.5, 3)) * 100) / 100
    return {
      label: `${info.symbol} ${m.toUpperCase()} FUT`,
      daysToExpiry: days[i],
      ltp: p.price, chg: p.chg, chgPct: p.chgPct,
      volume: Math.round(100000 + rnd(h + i + 30, 0, 8000000)).toLocaleString("en-IN"),
      oi: oiVals[i].toLocaleString("en-IN"),
      oiChangePct: Math.round(rnd(h + i + 40, -8, 8) * 100) / 100,
      buildUp: BUILDUPS[Math.floor(rnd(h + i + 60, 0, 4))],
      bid, ask,
      bidQty: String(Math.round(rnd(h + i + 70, 10, 999))),
      askQty: String(Math.round(rnd(h + i + 80, 10, 999))),
    }
  })

  const premiumDiscount = months.map((_, i) => Math.round(rnd(h + i + 100, 2, 30) * 100) / 100)

  return {
    symbol: info.symbol,
    name: info.name,
    sector: info.sector,
    ltp: price, chg, chgPct, open, high52, low52,
    exchanges: info.exchanges,
    asOf: "13 Jul 2026 at 12:34 PM",
    oiBreakup, priceAcrossExpiry, premiumDiscount, contracts,
  }
}

export default function FuturesDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => buildData(slug), [slug])
  return <FuturesDetailPage data={data} />
}

"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { OptionsDetailPage, type OptionsPageData } from "@/components/options-detail-page"

const KNOWN: Record<string, { symbol: string; name: string; sector: string; price: number; strikeStep: number }> = {
  "gold":        { symbol: "GOLD",       name: "MCX Gold Options",       sector: "Bullion", price: 72450.00, strikeStep: 500 },
  "silver":      { symbol: "SILVER",     name: "MCX Silver Options",     sector: "Bullion", price: 91200.00, strikeStep: 1000 },
  "crude-oil":   { symbol: "CRUDEOIL",   name: "MCX Crude Oil Options",  sector: "Energy",  price: 6150.00, strikeStep: 50 },
  "crude-oil-mini": { symbol: "CRUDEOILM", name: "MCX Crude Oil Mini Options", sector: "Energy", price: 6148.00, strikeStep: 50 },
  "natural-gas": { symbol: "NATURALGAS", name: "MCX Natural Gas Options",sector: "Energy",  price: 268.40, strikeStep: 10 },
  "copper":      { symbol: "COPPER",     name: "MCX Copper Options",     sector: "Base Metal", price: 812.30, strikeStep: 10 },
}

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function synthesize(slug: string) {
  const h = hashSlug(slug)
  const base = slug.replace(/-option(s)?(-chain)?(-summary)?$/, "")
  const name = base.split("-").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const price = 100 + (h % 90000)
  return {
    symbol: base.toUpperCase().replace(/-/g, "").slice(0, 12),
    name: `MCX ${name} Options`,
    sector: "Commodity",
    price,
    strikeStep: price > 10000 ? 500 : price > 1000 ? 50 : 10,
  }
}

function rnd(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

function buildData(slug: string): OptionsPageData {
  const info = KNOWN[slug] ?? synthesize(slug)
  const h = hashSlug(slug)
  const price = info.price
  const step = info.strikeStep
  const chg = Math.round(rnd(h, -price * 0.012, price * 0.012) * 100) / 100
  const chgPct = Math.round((chg / price) * 10000) / 100
  const open = Math.round((price - chg * 0.6) * 100) / 100
  const high52 = Math.round(price * 1.22 * 100) / 100
  const low52 = Math.round(price * 0.8 * 100) / 100
  const atm = Math.round(price / step) * step

  const strikes = []
  for (let i = -4; i <= 4; i++) {
    const strike = atm + i * step
    const isATM = i === 0
    const moneyness = Math.abs(i)
    const ceLtp = Math.max(Math.round((Math.max(price - strike, 0) + rnd(h + i + 1, 5, 60) / (moneyness + 1)) * 100) / 100, 0.5)
    const peLtp = Math.max(Math.round((Math.max(strike - price, 0) + rnd(h + i + 2, 5, 60) / (moneyness + 1)) * 100) / 100, 0.5)
    const ceOI = Math.round(20000 + rnd(h + i + 3, 0, 900000 / (moneyness + 1)))
    const peOI = Math.round(20000 + rnd(h + i + 4, 0, 900000 / (moneyness + 1)))
    strikes.push({
      strike, isATM,
      ceOI: ceOI.toLocaleString("en-IN"), ceOIChg: Math.round(rnd(h + i + 5, -15, 20) * 10) / 10,
      ceVol: Math.round(rnd(h + i + 6, 1000, 500000)).toLocaleString("en-IN"), ceIV: Math.round(rnd(h + i + 7, 14, 32) * 10) / 10,
      ceLTP: ceLtp, ceChg: Math.round(rnd(h + i + 8, -1, 1) * 100) / 100,
      peLTP: peLtp, peChg: Math.round(rnd(h + i + 9, -1, 1) * 100) / 100,
      peIV: Math.round(rnd(h + i + 10, 14, 32) * 10) / 10, peVol: Math.round(rnd(h + i + 11, 1000, 500000)).toLocaleString("en-IN"),
      peOIChg: Math.round(rnd(h + i + 12, -15, 20) * 10) / 10, peOI: peOI.toLocaleString("en-IN"),
    })
  }

  const totalCallOI = strikes.reduce((a, s) => a + parseInt(s.ceOI.replace(/,/g, "")), 0)
  const totalPutOI = strikes.reduce((a, s) => a + parseInt(s.peOI.replace(/,/g, "")), 0)
  const pcr = Math.round((totalPutOI / totalCallOI) * 100) / 100

  const topContracts = [...strikes]
    .sort((a, b) => Math.max(parseInt(b.ceOI.replace(/,/g, "")), parseInt(b.peOI.replace(/,/g, ""))) - Math.max(parseInt(a.ceOI.replace(/,/g, "")), parseInt(a.peOI.replace(/,/g, ""))))
    .slice(0, 6)
    .map((s, idx) => {
      const isCE = parseInt(s.ceOI.replace(/,/g, "")) >= parseInt(s.peOI.replace(/,/g, ""))
      return {
        label: `${info.symbol} ${s.strike} ${isCE ? "CE" : "PE"}`,
        type: (isCE ? "CE" : "PE") as "CE" | "PE",
        strike: s.strike,
        oi: isCE ? s.ceOI : s.peOI,
        oiChgPct: isCE ? s.ceOIChg : s.peOIChg,
        volume: isCE ? s.ceVol : s.peVol,
        ltp: isCE ? s.ceLTP : s.peLTP,
        chgPct: Math.round(rnd(h + idx + 200, -12, 15) * 100) / 100,
      }
    })

  return {
    symbol: info.symbol, name: info.name, sector: info.sector,
    ltp: price, chg, chgPct, open, high52, low52,
    exchanges: ["MCX"],
    asOf: "13 Jul 2026 at 12:34 PM",
    totalCallOI: totalCallOI.toLocaleString("en-IN"),
    totalPutOI: totalPutOI.toLocaleString("en-IN"),
    pcr, maxPain: atm,
    strikes, topContracts,
  }
}

export default function CommodityOptionsDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => buildData(slug), [slug])
  return <OptionsDetailPage data={data} />
}

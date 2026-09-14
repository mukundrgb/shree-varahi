"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { OptionsDetailPage, type OptionsPageData } from "@/components/options-detail-page"

const KNOWN: Record<string, { symbol: string; name: string; sector: string; price: number; exchanges: string[]; strikeStep: number }> = {
  "nifty-options":                { symbol: "NIFTY",      name: "Nifty 50 Options",                 sector: "Index", price: 24013.10, exchanges: ["NSE"], strikeStep: 50 },
  "nifty-50-options":             { symbol: "NIFTY",      name: "Nifty 50 Options",                 sector: "Index", price: 24013.10, exchanges: ["NSE"], strikeStep: 50 },
  "bank-nifty-options":           { symbol: "BANKNIFTY",  name: "Bank Nifty Options",               sector: "Index", price: 51820.65, exchanges: ["NSE"], strikeStep: 100 },
  "nifty-bank-options":           { symbol: "BANKNIFTY",  name: "Bank Nifty Options",               sector: "Index", price: 51820.65, exchanges: ["NSE"], strikeStep: 100 },
  "finnifty-options":             { symbol: "FINNIFTY",   name: "Nifty Financial Services Options", sector: "Index", price: 24890.15, exchanges: ["NSE"], strikeStep: 50 },
  "nifty-next-50-options":        { symbol: "NIFTYNXT50", name: "Nifty Next 50 Options",            sector: "Index", price: 68420.75, exchanges: ["NSE"], strikeStep: 100 },
  "nifty-midcap-select-options":  { symbol: "MIDCPSEL",   name: "Nifty Midcap Select Options",      sector: "Index", price: 12480.30, exchanges: ["NSE"], strikeStep: 50 },
  "sensex-options":               { symbol: "SENSEX",     name: "Sensex Options",                   sector: "Index", price: 79214.30, exchanges: ["BSE"], strikeStep: 100 },
  "bankex-options":               { symbol: "BANKEX",     name: "Bankex Options",                   sector: "Index", price: 58940.20, exchanges: ["BSE"], strikeStep: 100 },
  "stock-options":                { symbol: "RELIANCE",   name: "Reliance Industries Options",      sector: "Petroleum Products", price: 1298.80, exchanges: ["NSE", "BSE"], strikeStep: 20 },
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
  const price = 80 + (h % 6000) + ((h >> 8) % 100) / 100
  return {
    symbol: base.toUpperCase().replace(/-/g, "").slice(0, 12),
    name: `${name} Options`,
    sector: ["Banking", "IT", "Energy", "FMCG", "Auto", "Pharma", "Metals"][h % 7],
    price,
    exchanges: ["NSE"],
    strikeStep: price > 5000 ? 100 : price > 1000 ? 20 : price > 200 ? 10 : 5,
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
  const high52 = Math.round(price * 1.2 * 100) / 100
  const low52 = Math.round(price * 0.82 * 100) / 100
  const atm = Math.round(price / step) * step

  const strikes = []
  for (let i = -4; i <= 4; i++) {
    const strike = atm + i * step
    const isATM = i === 0
    const moneyness = Math.abs(i)
    const ceLtp = Math.max(Math.round((Math.max(price - strike, 0) + rnd(h + i + 1, 5, 60) / (moneyness + 1)) * 100) / 100, 0.5)
    const peLtp = Math.max(Math.round((Math.max(strike - price, 0) + rnd(h + i + 2, 5, 60) / (moneyness + 1)) * 100) / 100, 0.5)
    const ceOI = Math.round(50000 + rnd(h + i + 3, 0, 2200000 / (moneyness + 1)))
    const peOI = Math.round(50000 + rnd(h + i + 4, 0, 2200000 / (moneyness + 1)))
    strikes.push({
      strike, isATM,
      ceOI: ceOI.toLocaleString("en-IN"), ceOIChg: Math.round(rnd(h + i + 5, -15, 20) * 10) / 10,
      ceVol: Math.round(rnd(h + i + 6, 1000, 999999)).toLocaleString("en-IN"), ceIV: Math.round(rnd(h + i + 7, 11, 28) * 10) / 10,
      ceLTP: ceLtp, ceChg: Math.round(rnd(h + i + 8, -1, 1) * 100) / 100,
      peLTP: peLtp, peChg: Math.round(rnd(h + i + 9, -1, 1) * 100) / 100,
      peIV: Math.round(rnd(h + i + 10, 11, 28) * 10) / 10, peVol: Math.round(rnd(h + i + 11, 1000, 999999)).toLocaleString("en-IN"),
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
    exchanges: info.exchanges,
    asOf: "13 Jul 2026 at 12:34 PM",
    totalCallOI: totalCallOI.toLocaleString("en-IN"),
    totalPutOI: totalPutOI.toLocaleString("en-IN"),
    pcr, maxPain: atm,
    strikes, topContracts,
  }
}

export default function OptionsDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const data = useMemo(() => buildData(slug), [slug])
  return <OptionsDetailPage data={data} />
}

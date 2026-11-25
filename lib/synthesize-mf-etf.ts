import type { ETFRow, ETFListPageData } from "@/components/etf-list-page"

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}
function rnd(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

export function titleFromSlug(slug: string) {
  return slug.replace(/-/g, " ").split(" ").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

const ETF_POOLS: Record<string, string[]> = {
  "nifty-50": ["Nippon India ETF Nifty BeES|NIFTYBEES", "ICICI Pru Nifty 50 ETF|ICICINIFTY", "SBI Nifty 50 ETF|SBINIFTY", "HDFC Nifty 50 ETF|HDFCNIFTY", "UTI Nifty 50 ETF|UTINIFTY"],
  "nifty-next-50": ["ICICI Pru Nifty Next 50 ETF|ICICINXT50", "Nippon India ETF Junior BeES|JUNIORBEES", "Kotak Nifty Next 50 ETF|KOTAKNXT50"],
  "bank-nifty": ["Nippon India ETF Bank BeES|BANKBEES", "ICICI Pru Bank ETF|ICICIBANKN", "Kotak Bank ETF|KOTAKBKETF"],
  "nifty-it": ["Nippon India ETF Nifty IT|ITBEES", "ICICI Pru IT ETF|ICICIITETF"],
  sensex: ["HDFC Sensex ETF|HDFCSENSEX", "ICICI Pru Sensex ETF|ICICISENSEX", "UTI Sensex ETF|UTISENSEX"],
  gold: ["Nippon Gold ETF|GOLDBEES", "ICICI Pru Gold ETF|IPGETF", "SBI Gold ETF|SBIGETF", "HDFC Gold ETF|HDFGOLD"],
  silver: ["Nippon Silver ETF|SILVERBEES", "ICICI Pru Silver ETF|SILVERIETF", "SBI Silver ETF|SILVERETF"],
  commodity: ["Nippon Gold ETF|GOLDBEES", "Nippon Silver ETF|SILVERBEES"],
  international: ["Motilal Oswal Nasdaq 100 ETF|MON100", "Motilal Oswal S&P 500 ETF|MOSP500"],
  banking: ["ICICI Pru Bank ETF|ICICIBANKN", "SBI Nifty Private Bank ETF|PVTBANIETF"],
  defence: ["Motilal Oswal Nifty India Defence ETF|DEFENCEETF"],
  index: ["Nippon India ETF Nifty BeES|NIFTYBEES", "HDFC Nifty 50 ETF|HDFCNIFTY", "ICICI Pru Nifty 50 ETF|ICICINIFTY"],
  default: ["Nippon India ETF Nifty BeES|NIFTYBEES", "Nippon Gold ETF|GOLDBEES", "ICICI Pru Bank ETF|ICICIBANKN"],
}

const ETF_AMC_FUNDS: Record<string, string[]> = {
  nippon: ["Nippon India ETF Nifty BeES|NIFTYBEES", "Nippon Gold ETF|GOLDBEES", "Nippon India ETF Bank BeES|BANKBEES"],
  sbi: ["SBI Nifty 50 ETF|SBINIFTY", "SBI Gold ETF|SBIGETF"],
  tata: ["Tata Nifty 50 ETF|TATANIFTY"],
  zerodha: ["Zerodha Gold ETF|GOLDCASE"],
  icici: ["ICICI Pru Nifty 50 ETF|ICICINIFTY", "ICICI Pru Gold ETF|IPGETF", "ICICI Pru Bank ETF|ICICIBANKN"],
}

function pickEtfPool(slug: string): string[] {
  for (const key of Object.keys(ETF_POOLS)) {
    if (key !== "default" && slug.includes(key)) return ETF_POOLS[key]
  }
  return ETF_POOLS.default
}

export function synthesizeETFList(slug: string, opts: { crumbCategory: string; titleOverride?: string; description?: string; priceRange?: [number, number] } = { crumbCategory: "By Type" }): ETFListPageData {
  const h = hashSlug(slug)
  const pool = pickEtfPool(slug)
  const [pMin, pMax] = opts.priceRange ?? [30, 300]
  const etfs: ETFRow[] = pool.map((entry, i) => {
    const [name, symbol] = entry.split("|")
    const seed = h + i * 83
    const ltp = Math.round(rnd(seed, pMin, pMax) * 100) / 100
    const mtf = [0, 0, 73.5][Math.floor(rnd(seed + 1, 0, 3))]
    return {
      name, symbol, ltp,
      chg: Math.round(rnd(seed + 2, -2.2, 2.2) * 100) / 100,
      aum: `${Math.round(rnd(seed + 3, 500, 55000)).toLocaleString("en-IN")}.00`,
      volume: `${Math.round(rnd(seed + 4, 1, 99))},${Math.round(rnd(seed + 5, 10, 99))},${Math.round(rnd(seed + 6, 100, 999))}`,
      high52: Math.round(ltp * rnd(seed + 7, 1.1, 1.4) * 100) / 100,
      low52: Math.round(ltp * rnd(seed + 8, 0.62, 0.88) * 100) / 100,
      ret1m: Math.round(rnd(seed + 9, -5, 8) * 100) / 100,
      ret3m: Math.round(rnd(seed + 10, -8, 15) * 100) / 100,
      ret1y: Math.round(rnd(seed + 11, -10, 50) * 100) / 100,
      ret3y: Math.round(rnd(seed + 12, 20, 140) * 100) / 100,
      ret5y: Math.round(rnd(seed + 13, 40, 200) * 100) / 100,
      expRatio: Math.round(rnd(seed + 14, 0.05, 0.95) * 100) / 100,
      mtf, pledge: mtf ? Math.round(rnd(seed + 15, 0, 89)) : 0,
    }
  })
  etfs.sort((a, b) => parseFloat(b.aum.replace(/,/g, "")) - parseFloat(a.aum.replace(/,/g, "")))
  const title = opts.titleOverride ?? titleFromSlug(slug)
  return {
    slug, crumbCategory: opts.crumbCategory, title,
    lastUpdated: "13 Jul 2026 at 13:01",
    description: opts.description ?? `A curated list of ETF under "${title}", covering LTP, AUM, volume, historical returns, and expense ratio to help you compare and invest.`,
    etfs,
  }
}

export function synthesizeAmcEtfList(amcSlug: string, amcName: string): ETFListPageData {
  const h = hashSlug(amcSlug)
  const names = ETF_AMC_FUNDS[amcSlug] ?? [`${amcName} Nifty 50 ETF|${amcSlug.toUpperCase()}NIFTY`]
  const etfs: ETFRow[] = names.map((entry, i) => {
    const [name, symbol] = entry.split("|")
    const seed = h + i * 83
    const ltp = Math.round(rnd(seed, 30, 300) * 100) / 100
    return {
      name, symbol, ltp, chg: Math.round(rnd(seed + 1, -2.2, 2.2) * 100) / 100,
      aum: `${Math.round(rnd(seed + 2, 500, 40000)).toLocaleString("en-IN")}.00`,
      volume: `${Math.round(rnd(seed + 3, 1, 99))},${Math.round(rnd(seed + 4, 10, 99))},${Math.round(rnd(seed + 5, 100, 999))}`,
      high52: Math.round(ltp * 1.25 * 100) / 100, low52: Math.round(ltp * 0.78 * 100) / 100,
      ret1m: Math.round(rnd(seed + 6, -5, 8) * 100) / 100, ret3m: Math.round(rnd(seed + 7, -8, 15) * 100) / 100,
      ret1y: Math.round(rnd(seed + 8, -10, 50) * 100) / 100, ret3y: Math.round(rnd(seed + 9, 20, 140) * 100) / 100,
      ret5y: Math.round(rnd(seed + 10, 40, 200) * 100) / 100, expRatio: Math.round(rnd(seed + 11, 0.05, 0.95) * 100) / 100,
      mtf: 0, pledge: 0,
    }
  })
  return {
    slug: amcSlug, crumbCategory: "ETF AMC", title: `${amcName} ETF`,
    lastUpdated: "13 Jul 2026 at 13:01",
    description: `Explore the complete list of ETF managed by ${amcName}, along with LTP, AUM, and performance metrics.`,
    etfs,
  }
}

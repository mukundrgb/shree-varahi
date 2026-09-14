import type { FundRow, MutualFundListPageData } from "@/components/mutual-fund-list-page"
import type { ETFRow, ETFListPageData } from "@/components/etf-list-page"

const MF_POOLS: Record<string, string[]> = {
  large: ["ICICI Pru Bluechip Fund", "Axis Bluechip Fund", "SBI Bluechip Fund", "Mirae Asset Large Cap Fund", "Nippon India Large Cap Fund", "HDFC Top 100 Fund"],
  mid: ["Motilal Oswal Midcap Fund", "HDFC Mid-Cap Opportunities Fund", "Kotak Emerging Equity Fund", "Edelweiss Mid Cap Fund", "PGIM India Midcap Opportunities Fund", "Axis Midcap Fund"],
  small: ["Quant Small Cap Fund", "SBI Small Cap Fund", "Nippon India Small Cap Fund", "Bandhan Small Cap Fund", "Franklin India Smaller Companies Fund", "HDFC Small Cap Fund"],
  flexi: ["Parag Parikh Flexi Cap Fund", "HDFC Flexi Cap Fund", "UTI Flexi Cap Fund", "Franklin India Flexi Cap Fund", "Kotak Flexicap Fund"],
  focused: ["SBI Focused Fund", "Axis Focused Fund", "Franklin India Focused Fund", "ICICI Pru Focused Equity Fund"],
  sectoral: ["ICICI Pru Technology Fund", "SBI Banking & Financial Services Fund", "Nippon India Pharma Fund", "Tata Infrastructure Fund", "DSP Healthcare Fund"],
  elss: ["SBI ELSS Tax Saver Fund", "Mirae Asset ELSS Tax Saver Fund", "Axis Long Term Equity Fund", "Quant ELSS Tax Saver Fund", "Canara Robeco ELSS Tax Saver"],
  contra: ["SBI Contra Fund", "Invesco India Contra Fund", "Kotak India EQ Contra Fund"],
  value: ["Nippon India Value Fund", "HDFC Capital Builder Value Fund", "UTI Value Opportunities Fund"],
  multicap: ["Nippon India Multi Cap Fund", "Kotak Multicap Fund", "Quant Active Fund"],
  international: ["Motilal Oswal Nasdaq 100 FoF", "ICICI Pru US Bluechip Equity Fund", "PGIM India Global Equity Opportunities Fund"],
  dividend: ["ICICI Pru Dividend Yield Equity Fund", "UTI Dividend Yield Fund", "Templeton India Equity Income Fund"],
  liquid: ["ICICI Pru Liquid Fund", "HDFC Liquid Fund", "SBI Liquid Fund", "Axis Liquid Fund"],
  credit: ["ICICI Pru Credit Risk Fund", "HDFC Credit Risk Debt Fund", "Axis Credit Risk Fund"],
  banking: ["Kotak Banking & PSU Debt Fund", "IDFC Banking & PSU Debt Fund", "Axis Banking & PSU Debt Fund"],
  gilt: ["SBI Magnum Gilt Fund", "ICICI Pru Gilt Fund", "Nippon India Gilt Securities Fund"],
  corporate: ["ICICI Pru Corporate Bond Fund", "HDFC Corporate Bond Fund", "Aditya Birla SL Corporate Bond Fund"],
  dynamic: ["ICICI Pru All Seasons Bond Fund", "SBI Dynamic Bond Fund", "Kotak Dynamic Bond Fund"],
  money: ["Aditya Birla SL Money Manager Fund", "HDFC Money Market Fund", "ICICI Pru Money Market Fund"],
  overnight: ["UTI Overnight Fund", "ICICI Pru Overnight Fund", "SBI Overnight Fund"],
  floater: ["HDFC Floating Rate Debt Fund", "Aditya Birla SL Floating Rate Fund"],
  ultrashort: ["ICICI Pru Ultra Short Term Fund", "Kotak Savings Fund", "Axis Ultra Short Duration Fund"],
  medium: ["ICICI Pru Medium Term Bond Fund", "HDFC Medium Term Debt Fund"],
  short: ["Nippon India Short Term Fund", "SBI Short Term Debt Fund", "Axis Short Term Fund"],
  low: ["HDFC Low Duration Fund", "ICICI Pru Savings Fund"],
  long: ["ICICI Pru Long Term Bond Fund", "Nippon India Nivesh Lakshya Fund"],
  conservative: ["ICICI Pru Regular Savings Fund", "Kotak Debt Hybrid Fund"],
  aggressive: ["ICICI Pru Equity & Debt Fund", "Canara Robeco Equity Hybrid Fund"],
  balanced: ["HDFC Balanced Advantage Fund", "ICICI Pru Balanced Advantage Fund"],
  arbitrage: ["Nippon India Arbitrage Fund", "Kotak Equity Arbitrage Fund", "ICICI Pru Equity Arbitrage Fund"],
  savings: ["Axis Equity Saver Fund", "Kotak Equity Savings Fund"],
  multiasset: ["ICICI Pru Multi Asset Fund", "Kotak Multi Asset Allocation Fund"],
  index: ["UTI Nifty 50 Index Fund", "HDFC Index Fund Sensex Plan", "ICICI Pru Nifty 50 Index Fund", "Tata Nifty 50 Index Fund", "SBI Nifty Index Fund"],
  sip: ["Parag Parikh Flexi Cap Fund", "SBI Small Cap Fund", "Quant Small Cap Fund", "SBI Focused Fund", "SBI ELSS Tax Saver Fund"],
  gold: ["Nippon India Gold Savings Fund", "SBI Gold Fund", "HDFC Gold Fund", "Kotak Gold Fund"],
  defence: ["Motilal Oswal Nifty India Defence Index Fund", "HDFC Defence Fund"],
  default: ["Parag Parikh Flexi Cap Fund", "SBI Small Cap Fund", "HDFC Mid-Cap Opportunities Fund", "ICICI Pru Bluechip Fund", "Axis Long Term Equity Fund", "Nippon India Large Cap Fund"],
}

const AMC_FUNDS: Record<string, string[]> = {
  sbi: ["SBI Bluechip Fund", "SBI Small Cap Fund", "SBI Contra Fund", "SBI Focused Fund", "SBI Magnum Gilt Fund"],
  hdfc: ["HDFC Top 100 Fund", "HDFC Mid-Cap Opportunities Fund", "HDFC Balanced Advantage Fund", "HDFC Flexi Cap Fund"],
  "icici-prudential": ["ICICI Pru Bluechip Fund", "ICICI Pru Technology Fund", "ICICI Pru Balanced Advantage Fund"],
  nippon: ["Nippon India Large Cap Fund", "Nippon India Small Cap Fund", "Nippon India Growth Fund"],
  kotak: ["Kotak Emerging Equity Fund", "Kotak Flexicap Fund", "Kotak Banking & PSU Debt Fund"],
  axis: ["Axis Bluechip Fund", "Axis Long Term Equity Fund", "Axis Midcap Fund"],
  mirae: ["Mirae Asset Large Cap Fund", "Mirae Asset ELSS Tax Saver Fund", "Mirae Asset Hybrid Equity Fund"],
  uti: ["UTI Nifty 50 Index Fund", "UTI Flexi Cap Fund", "UTI Value Opportunities Fund"],
  tata: ["Tata Nifty 50 Index Fund", "Tata Infrastructure Fund", "Tata Consumer Products Fund"],
  bandhan: ["Bandhan Small Cap Fund", "Bandhan Flexi Cap Fund"],
  "aditya-birla-sun-life": ["Aditya Birla SL Digital India Fund", "Aditya Birla SL Corporate Bond Fund"],
  hsbc: ["HSBC Large Cap Fund", "HSBC Flexi Cap Fund"],
  "canara-robeco": ["Canara Robeco Bluechip Equity Fund", "Canara Robeco ELSS Tax Saver"],
  dsp: ["DSP Healthcare Fund", "DSP ELSS Tax Saver Fund"],
  edelweiss: ["Edelweiss Mid Cap Fund", "Edelweiss Aggressive Hybrid Fund"],
}

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

function pickMfPool(slug: string): string[] {
  for (const key of Object.keys(MF_POOLS)) {
    if (key !== "default" && slug.includes(key)) return MF_POOLS[key]
  }
  return MF_POOLS.default
}

export function synthesizeMutualFundList(slug: string, opts: { crumbCategory: string; titleOverride?: string; description?: string; category?: string; subCategory?: string } = { crumbCategory: "By Category" }): MutualFundListPageData {
  const h = hashSlug(slug)
  const pool = pickMfPool(slug)
  const funds: FundRow[] = pool.map((name, i) => {
    const seed = h + i * 83
    const nav = Math.round(rnd(seed, 30, 480) * 100) / 100
    return {
      name: `${name} Direct - Growth`,
      category: opts.category ?? "Equity",
      subCategory: opts.subCategory ?? titleFromSlug(slug),
      nav,
      aum: `${Math.round(rnd(seed + 1, 500, 141000)).toLocaleString("en-IN")}.00`,
      ret1m: Math.round(rnd(seed + 2, -3, 7) * 100) / 100,
      ret3m: Math.round(rnd(seed + 3, -6, 20) * 100) / 100,
      ret1y: Math.round(rnd(seed + 4, -15, 45) * 100) / 100,
      ret3y: Math.round(rnd(seed + 5, 5, 30) * 100) / 100,
      ret5y: Math.round(rnd(seed + 6, 8, 26) * 100) / 100,
      rating: Math.round(rnd(seed + 7, 2, 5)),
      expRatio: Math.round(rnd(seed + 8, 0.35, 1.1) * 100) / 100,
      risk: ["Very High", "High", "Moderate"][Math.floor(rnd(seed + 9, 0, 3))],
      minSip: [500, 1000][Math.floor(rnd(seed + 10, 0, 2))],
      minLumpsum: [500, 1000, 5000][Math.floor(rnd(seed + 11, 0, 3))],
    }
  })
  funds.sort((a, b) => parseFloat(b.aum.replace(/,/g, "")) - parseFloat(a.aum.replace(/,/g, "")))
  const title = opts.titleOverride ?? titleFromSlug(slug)
  return {
    slug, crumbCategory: opts.crumbCategory, title,
    lastUpdated: "13 Jul 2026 at 13:01",
    description: opts.description ?? `A curated list of mutual fund schemes under "${title}" — covering NAV, AUM, historical returns, expense ratio, and risk profile to help you compare and invest.`,
    funds,
  }
}

export function synthesizeAmcFundList(amcSlug: string, amcName: string): MutualFundListPageData {
  const h = hashSlug(amcSlug)
  const names = AMC_FUNDS[amcSlug] ?? [`${amcName} Bluechip Fund`, `${amcName} Flexi Cap Fund`, `${amcName} Small Cap Fund`, `${amcName} Liquid Fund`]
  const funds: FundRow[] = names.map((name, i) => {
    const seed = h + i * 83
    const nav = Math.round(rnd(seed, 30, 480) * 100) / 100
    return {
      name: `${name} Direct - Growth`, category: "Equity", subCategory: "Various",
      nav, aum: `${Math.round(rnd(seed + 1, 500, 90000)).toLocaleString("en-IN")}.00`,
      ret1m: Math.round(rnd(seed + 2, -3, 7) * 100) / 100, ret3m: Math.round(rnd(seed + 3, -6, 20) * 100) / 100,
      ret1y: Math.round(rnd(seed + 4, -15, 45) * 100) / 100, ret3y: Math.round(rnd(seed + 5, 5, 30) * 100) / 100,
      ret5y: Math.round(rnd(seed + 6, 8, 26) * 100) / 100, rating: Math.round(rnd(seed + 7, 2, 5)),
      expRatio: Math.round(rnd(seed + 8, 0.35, 1.1) * 100) / 100,
      risk: ["Very High", "High", "Moderate"][Math.floor(rnd(seed + 9, 0, 3))],
      minSip: [500, 1000][Math.floor(rnd(seed + 10, 0, 2))], minLumpsum: [500, 1000, 5000][Math.floor(rnd(seed + 11, 0, 3))],
    }
  })
  return {
    slug: amcSlug, crumbCategory: "AMC", title: `${amcName} Mutual Fund`,
    lastUpdated: "13 Jul 2026 at 13:01",
    description: `Explore the complete list of mutual fund schemes managed by ${amcName} Mutual Fund, along with NAV, AUM, and performance metrics.`,
    funds,
  }
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
    description: opts.description ?? `A curated list of ETFs under "${title}" — covering LTP, AUM, volume, historical returns, and expense ratio to help you compare and invest.`,
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
    slug: amcSlug, crumbCategory: "ETF AMC", title: `${amcName} ETFs`,
    lastUpdated: "13 Jul 2026 at 13:01",
    description: `Explore the complete list of ETFs managed by ${amcName}, along with LTP, AUM, and performance metrics.`,
    etfs,
  }
}

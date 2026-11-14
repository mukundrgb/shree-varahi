// Dummy ETF data for the ETF cards and detail page until the ETF API is integrated.
// Replace getEtfCards / getEtfDetail with API calls; the page only depends on the types.
// Symbols and every number here are placeholders, not real market data.

import type { ChartRange, EtfCategory, EtfCategoryReturn, EtfChartPoint, EtfDetail, EtfHolding, EtfListRow, EtfSummary, Riskometer } from "./types"

interface EtfSeed {
  name: string
  symbol: string
  category: EtfCategory
  price: number
  changePct: number
  amc: string
  benchmark: string
  founded: string
}

const SEEDS: EtfSeed[] = [
  // Equity
  { name: "Nifty 50 ETF",       symbol: "NIFTYBEES",  category: "Equity", price: 243.50, changePct: 0.62, amc: "Nippon India Mutual Fund", benchmark: "Nifty 50 TRI",         founded: "2001" },
  { name: "Nifty Bank ETF",     symbol: "BANKBEES",   category: "Equity", price: 512.80, changePct: 0.34, amc: "Nippon India Mutual Fund", benchmark: "Nifty Bank TRI",       founded: "2004" },
  { name: "Nifty Next 50 ETF",  symbol: "JUNIORBEES", category: "Equity", price: 68.90,  changePct: 0.48, amc: "Nippon India Mutual Fund", benchmark: "Nifty Next 50 TRI",    founded: "2003" },
  { name: "Sensex ETF",         symbol: "SENSEXETF",  category: "Equity", price: 812.40, changePct: 0.55, amc: "SBI Mutual Fund",          benchmark: "BSE Sensex TRI",       founded: "2013" },
  { name: "Nifty IT ETF",       symbol: "ITBEES",     category: "Equity", price: 38.40,  changePct: 0.72, amc: "Nippon India Mutual Fund", benchmark: "Nifty IT TRI",         founded: "2020" },
  { name: "Nifty PSU Bank ETF", symbol: "PSUBNKBEES", category: "Equity", price: 86.20,  changePct: 0.58, amc: "Nippon India Mutual Fund", benchmark: "Nifty PSU Bank TRI",   founded: "2007" },
  { name: "Nifty Pharma ETF",   symbol: "PHARMABEES", category: "Equity", price: 24.98,  changePct: 0.41, amc: "Nippon India Mutual Fund", benchmark: "Nifty Pharma TRI",     founded: "2021" },
  { name: "Nifty Auto ETF",     symbol: "AUTOBEES",   category: "Equity", price: 26.97,  changePct: 0.36, amc: "Nippon India Mutual Fund", benchmark: "Nifty Auto TRI",       founded: "2022" },
  // Commodity
  { name: "Nippon Gold BeES",           symbol: "GOLDBEES",   category: "Commodity", price: 68.20, changePct: 0.21, amc: "Nippon India Mutual Fund",       benchmark: "Domestic Price of Gold",   founded: "2007" },
  { name: "SBI Gold ETF",               symbol: "SETFGOLD",   category: "Commodity", price: 71.10, changePct: 0.18, amc: "SBI Mutual Fund",                benchmark: "Domestic Price of Gold",   founded: "2009" },
  { name: "HDFC Gold ETF",              symbol: "HDFCGOLD",   category: "Commodity", price: 70.45, changePct: 0.24, amc: "HDFC Mutual Fund",               benchmark: "Domestic Price of Gold",   founded: "2010" },
  { name: "ICICI Pru Gold ETF",         symbol: "GOLDIETF",   category: "Commodity", price: 69.85, changePct: 0.20, amc: "ICICI Prudential Mutual Fund",   benchmark: "Domestic Price of Gold",   founded: "2010" },
  { name: "ICICI Pru Silver ETF",       symbol: "SILVERIETF", category: "Commodity", price: 98.40, changePct: 0.45, amc: "ICICI Prudential Mutual Fund",   benchmark: "Domestic Price of Silver", founded: "2022" },
  { name: "Aditya Birla SL Silver ETF", symbol: "SILVER1",    category: "Commodity", price: 97.10, changePct: 0.42, amc: "Aditya Birla Sun Life Mutual Fund", benchmark: "Domestic Price of Silver", founded: "2022" },
  { name: "Nippon Silver ETF",          symbol: "SILVERBEES", category: "Commodity", price: 99.20, changePct: 0.50, amc: "Nippon India Mutual Fund",       benchmark: "Domestic Price of Silver", founded: "2022" },
  { name: "Kotak Silver ETF",           symbol: "SILVERETF",  category: "Commodity", price: 96.80, changePct: 0.38, amc: "Kotak Mahindra Mutual Fund",     benchmark: "Domestic Price of Silver", founded: "2022" },
  // Debt
  { name: "Bharat Bond ETF Apr 2030",  symbol: "EBBETF0430", category: "Debt", price: 1142.50, changePct: 0.05, amc: "Edelweiss Mutual Fund",    benchmark: "Nifty Bharat Bond Index - April 2030", founded: "2019" },
  { name: "Bharat Bond ETF Apr 2033",  symbol: "EBBETF0433", category: "Debt", price: 1098.20, changePct: 0.06, amc: "Edelweiss Mutual Fund",    benchmark: "Nifty Bharat Bond Index - April 2033", founded: "2022" },
  { name: "Edelweiss Bharat Bond FOF", symbol: "EBBFOF",     category: "Debt", price: 24.80,   changePct: 0.04, amc: "Edelweiss Mutual Fund",    benchmark: "Nifty Bharat Bond Index - April 2030", founded: "2019" },
  { name: "Nippon Liquid BeES",        symbol: "LIQUIDBEES", category: "Debt", price: 1002.10, changePct: 0.02, amc: "Nippon India Mutual Fund", benchmark: "Nifty 1D Rate Index",                  founded: "2003" },
  // Global
  { name: "Motilal Oswal Nasdaq 100 ETF", symbol: "MON100",     category: "Global", price: 142.60, changePct: 0.88, amc: "Motilal Oswal Mutual Fund",    benchmark: "Nasdaq-100 TRI",      founded: "2011" },
  { name: "ICICI Pru Nasdaq 100 ETF",     symbol: "ICICINQ100", category: "Global", price: 98.40,  changePct: 0.85, amc: "ICICI Prudential Mutual Fund", benchmark: "Nasdaq-100 TRI",      founded: "2021" },
  { name: "Mirae Asset NYSE FANG+ ETF",   symbol: "MAFANG",     category: "Global", price: 84.20,  changePct: 1.05, amc: "Mirae Asset Mutual Fund",      benchmark: "NYSE FANG+ TRI",      founded: "2021" },
  { name: "Motilal Oswal S&P 500 ETF",    symbol: "MASPTOP50",  category: "Global", price: 38.60,  changePct: 0.62, amc: "Motilal Oswal Mutual Fund",    benchmark: "S&P 500 TRI",         founded: "2020" },
]

const OBJECTIVE: Record<EtfCategory, (benchmark: string) => string> = {
  Equity: (b) => `The investment objective of the scheme is to provide returns that, before expenses, closely correspond to the total returns of the securities as represented by the ${b}, subject to tracking error. However, there is no assurance or guarantee that the investment objective of the scheme will be achieved.`,
  Commodity: (b) => `The investment objective of the fund is to generate returns that are in line with the performance of physical ${b.toLowerCase().includes("silver") ? "silver" : "gold"} in domestic prices, subject to tracking error. However, there is no assurance or guarantee that the investment objective of the scheme will be achieved.`,
  Debt: (b) => `The investment objective of the scheme is to track the ${b} by investing in bonds of AAA-rated public sector companies or other permitted instruments, subject to tracking error. However, there is no assurance or guarantee that the investment objective of the scheme will be achieved.`,
  Global: (b) => `The investment objective of the scheme is to seek investment returns that correspond to the performance of the ${b}, subject to tracking error and currency movements. However, there is no assurance or guarantee that the investment objective of the scheme will be achieved.`,
}

const FUND_MANAGERS = [["Himanshu Mange", "Jitendra Tolani"], ["Viral Chhadva"], ["Tapan Patel", "Nitin Sharma"], ["Ekta Gala", "Ankit Agarwal"]]

/** Category average returns for 1Y, 3Y and 5Y (annualised for 3Y and 5Y). */
const CATEGORY_AVG: Record<EtfCategory, [number, number, number]> = {
  Equity: [12.8, 14.6, 15.9],
  Commodity: [14.9, 17.2, 13.1],
  Debt: [7.4, 6.3, 6.8],
  Global: [18.2, 15.4, 17.7],
}

const RISKOMETER: Record<EtfCategory, Riskometer> = {
  Equity: "Very High",
  Commodity: "High",
  Debt: "Moderate",
  Global: "Very High",
}

export function toEtfSlug(name: string): string {
  return name.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

/** Deterministic pseudo-random number in [0, 1) so the dummy values don't change between renders. */
function seeded(key: string, salt: number): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619)
  return ((h >>> 0) % 10_000) / 10_000
}

const round2 = (n: number) => Math.round(n * 100) / 100

function toSummary(seed: EtfSeed): EtfSummary {
  const r = (salt: number) => seeded(seed.symbol, salt)
  const prevClose = seed.price / (1 + seed.changePct / 100)
  return {
    slug: toEtfSlug(seed.name),
    symbol: seed.symbol,
    name: seed.name,
    category: seed.category,
    price: seed.price,
    changeAmt: round2(seed.price - prevClose),
    changePct: seed.changePct,
    expenseRatio: round2(0.04 + r(3) * 0.75),
    aumCr: Math.round(300 + r(4) * 40_000),
  }
}

const SUMMARIES = SEEDS.map(toSummary)

export function getEtfCards(category: EtfCategory): EtfSummary[] {
  return SUMMARIES.filter((etf) => etf.category === category)
}

function categoryReturnsFor(seed: EtfSeed): EtfCategoryReturn[] {
  const r = (salt: number) => seeded(seed.symbol, salt)
  const categorySize = SEEDS.filter((other) => other.category === seed.category).length * 6

  return (["1Y", "3Y", "5Y"] as const).map((period, i) => {
    const years = Number(period[0])
    // An ETF younger than the period has no return for it yet.
    if (2026 - Number(seed.founded) < years) {
      return { period, fund: null, categoryAvg: CATEGORY_AVG[seed.category][i], rank: null, count: null }
    }
    const count = Math.max(3, categorySize - i * 4)
    return {
      period,
      fund: round2(CATEGORY_AVG[seed.category][i] + (r(12 + i) - 0.5) * 6),
      categoryAvg: CATEGORY_AVG[seed.category][i],
      rank: 1 + Math.floor(r(20 + i) * count),
      count,
    }
  })
}

/** Every ETF with its 1Y, 3Y and 5Y returns, for the comparison table. */
export function getEtfList(): EtfListRow[] {
  return SUMMARIES.map((etf, i) => {
    const [y1, y3, y5] = categoryReturnsFor(SEEDS[i])
    return { ...etf, return1Y: y1.fund, return3Y: y3.fund, return5Y: y5.fund }
  })
}

export function getEtfDetail(slug: string): EtfDetail | null {
  const index = SUMMARIES.findIndex((etf) => etf.slug === slug)
  if (index === -1) return null

  const seed = SEEDS[index]
  const etf = SUMMARIES[index]
  const price = etf.price ?? 0
  const r = (salt: number) => seeded(seed.symbol, salt)
  const prevClose = round2(price - (etf.changeAmt ?? 0))
  const isEquity = seed.category === "Equity" || seed.category === "Global"
  const categoryReturns = categoryReturnsFor(seed)

  return {
    ...etf,
    exchanges: ["NSE", "BSE"],
    updatedAt: null,
    performance: {
      open: round2(prevClose * (1 + (r(17) - 0.5) * 0.006)),
      high: round2(Math.max(price, prevClose) * (1 + r(11) * 0.008)),
      low: round2(Math.min(price, prevClose) * (1 - r(10) * 0.008)),
      prevClose,
      volume: Math.round(2e5 + r(18) * 5e7),
      low52: round2(price * (0.72 + r(15) * 0.12)),
      high52: round2(price * (1.04 + r(16) * 0.2)),
    },
    fundamentals: {
      expenseRatio: etf.expenseRatio,
      aumCr: etf.aumCr,
      riskometer: RISKOMETER[seed.category],
      pe: isEquity ? round2(18 + r(25) * 14) : null,
      pb: isEquity ? round2(2 + r(26) * 4) : null,
      stockCount: seed.category === "Equity" ? 10 + Math.floor(r(27) * 41) : seed.category === "Global" ? 25 + Math.floor(r(27) * 80) : null,
    },
    categoryReturns,
    about: {
      description: OBJECTIVE[seed.category](seed.benchmark),
      founded: seed.founded,
      amc: seed.amc,
      fundManagers: FUND_MANAGERS[Math.floor(r(22) * FUND_MANAGERS.length)],
    },
    similar: similarEtfs(etf),
  }
}

const MAX_SIMILAR = 5

/** Same-category ETFs by fund size, always including this ETF. */
function similarEtfs(etf: EtfSummary): EtfSummary[] {
  const byAum = SUMMARIES
    .filter((other) => other.category === etf.category)
    .sort((a, b) => (b.aumCr ?? 0) - (a.aumCr ?? 0))
  const top = byAum.slice(0, MAX_SIMILAR)
  return top.some((other) => other.slug === etf.slug) ? top : [etf, ...top.slice(0, MAX_SIMILAR - 1)]
}

// ─── Holdings ───────────────────────────────────────────────────────────────

type HoldingSeed = [name: string, sector: string]

const NIFTY_50: HoldingSeed[] = [
  ["HDFC Bank", "Financial Services"], ["ICICI Bank", "Financial Services"], ["Reliance Industries", "Oil & Gas"],
  ["Infosys", "Information Technology"], ["Bharti Airtel", "Telecommunication"], ["Larsen & Toubro", "Construction"],
  ["ITC", "FMCG"], ["Tata Consultancy Services", "Information Technology"], ["Axis Bank", "Financial Services"],
  ["State Bank of India", "Financial Services"], ["Kotak Mahindra Bank", "Financial Services"], ["Mahindra & Mahindra", "Automobile"],
  ["Hindustan Unilever", "FMCG"], ["Bajaj Finance", "Financial Services"], ["Sun Pharmaceutical", "Healthcare"],
]

const HOLDINGS_BY_SYMBOL: Record<string, HoldingSeed[]> = {
  NIFTYBEES: NIFTY_50,
  SENSEXETF: NIFTY_50.slice(0, 12),
  BANKBEES: [
    ["HDFC Bank", "Financial Services"], ["ICICI Bank", "Financial Services"], ["State Bank of India", "Financial Services"],
    ["Kotak Mahindra Bank", "Financial Services"], ["Axis Bank", "Financial Services"], ["IndusInd Bank", "Financial Services"],
    ["Bank of Baroda", "Financial Services"], ["Federal Bank", "Financial Services"], ["Punjab National Bank", "Financial Services"],
    ["IDFC First Bank", "Financial Services"], ["AU Small Finance Bank", "Financial Services"], ["Canara Bank", "Financial Services"],
  ],
  JUNIORBEES: [
    ["Hindustan Aeronautics", "Capital Goods"], ["Vedanta", "Metals & Mining"], ["Divi's Laboratories", "Healthcare"],
    ["TVS Motor Company", "Automobile"], ["InterGlobe Aviation", "Services"], ["Info Edge (India)", "Consumer Services"],
    ["Cholamandalam Investment", "Financial Services"], ["Tata Power", "Power"], ["Bharat Electronics", "Capital Goods"],
    ["DLF", "Realty"], ["Godrej Consumer Products", "FMCG"], ["Pidilite Industries", "Chemicals"],
  ],
  ITBEES: [
    ["Infosys", "Information Technology"], ["Tata Consultancy Services", "Information Technology"], ["HCL Technologies", "Information Technology"],
    ["Tech Mahindra", "Information Technology"], ["Wipro", "Information Technology"], ["LTIMindtree", "Information Technology"],
    ["Persistent Systems", "Information Technology"], ["Coforge", "Information Technology"], ["Mphasis", "Information Technology"],
    ["L&T Technology Services", "Information Technology"],
  ],
  PSUBNKBEES: [
    ["State Bank of India", "Financial Services"], ["Bank of Baroda", "Financial Services"], ["Punjab National Bank", "Financial Services"],
    ["Canara Bank", "Financial Services"], ["Union Bank of India", "Financial Services"], ["Indian Bank", "Financial Services"],
    ["Bank of India", "Financial Services"], ["Bank of Maharashtra", "Financial Services"], ["Indian Overseas Bank", "Financial Services"],
    ["UCO Bank", "Financial Services"], ["Central Bank of India", "Financial Services"], ["Punjab & Sind Bank", "Financial Services"],
  ],
  PHARMABEES: [
    ["Sun Pharmaceutical", "Healthcare"], ["Cipla", "Healthcare"], ["Dr. Reddy's Laboratories", "Healthcare"],
    ["Divi's Laboratories", "Healthcare"], ["Lupin", "Healthcare"], ["Aurobindo Pharma", "Healthcare"],
    ["Torrent Pharmaceuticals", "Healthcare"], ["Zydus Lifesciences", "Healthcare"], ["Alkem Laboratories", "Healthcare"],
    ["Mankind Pharma", "Healthcare"],
  ],
  AUTOBEES: [
    ["Mahindra & Mahindra", "Automobile"], ["Maruti Suzuki", "Automobile"], ["Tata Motors", "Automobile"],
    ["Bajaj Auto", "Automobile"], ["Eicher Motors", "Automobile"], ["TVS Motor Company", "Automobile"],
    ["Hero MotoCorp", "Automobile"], ["Bosch", "Auto Components"], ["Samvardhana Motherson", "Auto Components"],
    ["Ashok Leyland", "Automobile"],
  ],
}

/** Weights that fall off from the top holding and add up to `total`. */
function weights(count: number, total: number, key: string): number[] {
  const raw = Array.from({ length: count }, (_, i) => (1 / (i + 1.6)) * (0.85 + seeded(key, 40 + i) * 0.3))
  const sum = raw.reduce((a, b) => a + b, 0)
  return raw.map((w) => round2((w / sum) * total))
}

/** Equity holdings of an ETF, largest first. Only equity ETFs have holdings data. */
export function getEtfHoldings(slug: string): EtfHolding[] {
  const index = SUMMARIES.findIndex((etf) => etf.slug === slug)
  if (index === -1 || SEEDS[index].category !== "Equity") return []
  const seed = SEEDS[index]

  const list = HOLDINGS_BY_SYMBOL[seed.symbol] ?? NIFTY_50
  // A long index is shown as its top holdings, so their weights add up to less than 100%.
  const shown = weights(list.length, list.length > 12 ? 82 : 98.5, seed.symbol)

  return list.map(([name, sector], i) => {
    const key = `${seed.symbol}-${name}`
    return {
      name,
      sector,
      weight: shown[i],
      price: round2(80 + seeded(key, 2) * 4000),
      changePct: round2((seeded(key, 4) - 0.45) * 5),
    }
  })
}

// ─── Price chart ────────────────────────────────────────────────────────────

/** Fixed "now" for the dummy chart, so server and browser render the same points. */
const CHART_NOW = Date.UTC(2026, 10, 13, 10, 0) // 13 Nov 2026, 3:30 PM IST
const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE

const CHART_SHAPE: Record<ChartRange, { points: number; stepMs: number; vol: number }> = {
  "1D": { points: 76,  stepMs: 5 * MINUTE,  vol: 0.0012 },
  "1W": { points: 70,  stepMs: 2.4 * 60 * MINUTE, vol: 0.003 },
  "1M": { points: 22,  stepMs: 1.4 * DAY, vol: 0.008 },
  "3M": { points: 63,  stepMs: 1.45 * DAY, vol: 0.008 },
  "6M": { points: 126, stepMs: 1.45 * DAY, vol: 0.008 },
  "1Y": { points: 250, stepMs: 1.46 * DAY, vol: 0.008 },
  "3Y": { points: 156, stepMs: 7 * DAY,  vol: 0.018 },
  "5Y": { points: 260, stepMs: 7 * DAY,  vol: 0.018 },
}

/** Price history for the chart, oldest first, ending at the current price. */
export function getEtfChart(slug: string, range: ChartRange): EtfChartPoint[] {
  const index = SUMMARIES.findIndex((etf) => etf.slug === slug)
  if (index === -1) return []
  const seed = SEEDS[index]
  const etf = SUMMARIES[index]
  const price = etf.price ?? 0
  const { points, stepMs, vol } = CHART_SHAPE[range]
  const key = `${seed.symbol}-${range}`

  // Where the period starts: previous close for 1D, otherwise back out the period return.
  const [y1, y3, y5] = categoryReturnsFor(seed).map((r) => r.fund)
  const periodReturn: Record<ChartRange, number> = {
    "1D": etf.changePct ?? 0,
    "1W": (seeded(key, 1) - 0.4) * 3,
    "1M": (seeded(key, 2) - 0.4) * 6,
    "3M": (seeded(key, 3) - 0.4) * 10,
    "6M": (seeded(key, 4) - 0.4) * 14,
    "1Y": y1 ?? 10,
    "3Y": ((1 + (y3 ?? 12) / 100) ** 3 - 1) * 100,
    "5Y": ((1 + (y5 ?? 12) / 100) ** 5 - 1) * 100,
  }
  const start = price / (1 + periodReturn[range] / 100)

  // Random walk, then tilt it so it runs from `start` to the current price.
  const walk = [0]
  for (let i = 1; i < points; i++) walk.push(walk[i - 1] + (seeded(key, 100 + i) - 0.5) * 2 * vol)
  const drift = walk[points - 1]

  return walk.map((w, i) => {
    const t = i / (points - 1)
    const factor = Math.exp(w - drift * t)
    return {
      time: new Date(CHART_NOW - (points - 1 - i) * stepMs).toISOString(),
      price: round2((start + (price - start) * t) * factor),
    }
  })
}

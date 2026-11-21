// 52-Week High / Low stocks. The page only reads Week52Row; toWeek52Row maps a backend Week52Item
// (lib/market-movers/api.ts) into it. LTP / change come from the latest quote, falling back to the EOD figures;
// 52-week and all-time figures are the NSE ones.

import type { Week52Item } from "./api"
import { stockHref } from "./types"

/** One table row. */
export interface Week52Row {
  symbol: string
  name: string
  fullName: string | null
  exchange: string
  ltp: number | null
  changePct: number | null
  dayHigh: number | null
  dayLow: number | null
  high52: number | null
  high52Date: string | null
  low52: number | null
  low52Date: string | null
  /** ₹ crore */
  marketCapCr: number | null
  volume: number | null
  allTimeHigh: number | null
  allTimeHighDate: string | null
  allTimeLow: number | null
  allTimeLowDate: string | null
  href: string
}

export function toWeek52Row(r: Week52Item): Week52Row {
  const symbol = r.symbol ?? (r.bseCode ? String(r.bseCode) : "")
  return {
    symbol,
    name: r.name || symbol,
    fullName: r.name,
    exchange: r.exchange ?? "NSE",
    ltp: r.ltp ?? r.eod.price,
    changePct: r.changePct ?? r.eod.changePct,
    dayHigh: r.eod.high,
    dayLow: r.eod.low,
    high52: r.nse.high52,
    high52Date: r.nse.high52Date,
    low52: r.nse.low52,
    low52Date: r.nse.low52Date,
    marketCapCr: r.marketCap,
    volume: r.eod.volume,
    allTimeHigh: r.nse.allTimeHigh,
    allTimeHighDate: r.nse.allTimeHighDate,
    allTimeLow: r.nse.allTimeLow,
    allTimeLowDate: r.nse.allTimeLowDate,
    href: stockHref(symbol),
  }
}

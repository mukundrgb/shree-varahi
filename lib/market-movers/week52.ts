// 52-Week High / Low stocks. Week52Api is the row shape the CMOTS 52-week API returns, field names as sent.
// It carries BSE ("b…") and NSE ("n…") figures side by side: bt*/nt* = today, b52*/n52* = 52 weeks,
// ball*/nall* = all time. The plain price/high/low/pchange/volume fields belong to one of the two
// exchanges; toWeek52Row works out which and takes the 52-week and all-time figures from the same one.

export interface Week52Api {
  lname: string | null
  co_name: string
  sc_code: string | null
  symbol: string
  isin: string | null
  co_code: number | null
  // Today, BSE
  btdate: string | null
  btprice: number | null
  bthigh: number | null
  btlow: number | null
  /** ₹ crore */
  btmcap: number | null
  // Today, NSE
  ntdate: string | null
  ntprice: number | null
  ntlow: number | null
  ntmcap: number | null
  // 52 weeks, BSE
  b52high: number | null
  b52hmcap: number | null
  b52hdate: string | null
  b52low: number | null
  b52lmcap: number | null
  b52ldate: string | null
  // 52 weeks, NSE
  n52high: number | null
  n52hmcap: number | null
  n52hdate: string | null
  n52low: number | null
  n52lmcap: number | null
  n52ldate: string | null
  // All time, BSE
  ballhigh: number | null
  ballhdate: string | null
  ballhmcap: number | null
  balllow: number | null
  balllmcap: number | null
  ballldate: string | null
  // All time, NSE
  nallhigh: number | null
  nallhmcap: number | null
  nallhdate: string | null
  nalllow: number | null
  nalllmcap: number | null
  nallldate: string | null
  upd_time: string | null
  /** Last price (one exchange's) */
  price: number | null
  high: number | null
  low: number | null
  /** Price change, % */
  pchange: number | null
  volume: number | null
}

/** One table row. */
export interface Week52Row {
  symbol: string
  name: string
  fullName: string | null
  exchange: "NSE" | "BSE"
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

export function toWeek52Row(r: Week52Api): Week52Row {
  // The plain price matches one exchange's today price; prefer NSE when it can't be told apart.
  const nse = r.price === null || r.price === r.ntprice || r.price !== r.btprice
  const pick = <T,>(n: T | null, b: T | null) => (nse ? n ?? b : b ?? n)

  return {
    symbol: r.symbol,
    name: r.co_name || r.lname || r.symbol,
    fullName: r.lname,
    exchange: nse ? "NSE" : "BSE",
    ltp: r.price,
    changePct: r.pchange,
    dayHigh: r.high,
    dayLow: r.low,
    high52: pick(r.n52high, r.b52high),
    high52Date: pick(r.n52hdate, r.b52hdate),
    low52: pick(r.n52low, r.b52low),
    low52Date: pick(r.n52ldate, r.b52ldate),
    marketCapCr: pick(r.ntmcap, r.btmcap),
    volume: r.volume,
    allTimeHigh: pick(r.nallhigh, r.ballhigh),
    allTimeHighDate: pick(r.nallhdate, r.ballhdate),
    allTimeLow: pick(r.nalllow, r.balllow),
    allTimeLowDate: pick(r.nallldate, r.ballldate),
    href: `/stocks/${encodeURIComponent(r.symbol.toLowerCase())}`,
  }
}

// Market movers (Top Gainers / Losers / Most Active / 52-week high & low).
// MarketMoverApi is the row shape the CMOTS movers API returns, field names as sent.
// The page only reads MarketMover, so plugging the API in means: fetch rows, map with toMarketMover.

export interface MarketMoverApi {
  stk_exchng: string
  sc_code: string
  co_code: number
  symbol: string
  co_name: string
  sc_group: string | null
  /** e.g. "2026-11-20T14:09:59" (IST, no offset) */
  upd_time: string | null
  open_price: number | null
  high_price: number | null
  low_price: number | null
  /** Last traded price */
  close_price: number | null
  bbuy_qty: number | null
  bbuy_price: number | null
  bsell_qty: number | null
  bsell_price: number | null
  prevclose: number | null
  vol_traded: number | null
  /** Volume change vs the previous day, % */
  pervol: number | null
  /** Price change, % */
  perchg: number | null
  /** Price change, ₹ */
  netchg: number | null
  /** Traded value, ₹ crore */
  val_traded: number | null
  "52weekhigh": number | null
  "52weeklow": number | null
  prev_vol_traded: number | null
  prev_value_traded: number | null
  offerprice: number | null
  offerqty: number | null
  /** Full legal name */
  lname: string | null
}

/** One table row. */
export interface MarketMover {
  symbol: string
  name: string
  exchange: string
  group: string | null
  ltp: number | null
  change: number | null
  changePct: number | null
  open: number | null
  high: number | null
  low: number | null
  prevClose: number | null
  volume: number | null
  volumeChangePct: number | null
  prevVolume: number | null
  /** ₹ crore */
  valueCr: number | null
  /** ₹ crore */
  prevValueCr: number | null
  /** Traded value change vs the previous day, % (worked out; the API has no field for it) */
  valueChangePct: number | null
  high52: number | null
  low52: number | null
  updatedAt: string | null
  /** Stock detail page: /stocks/<symbol in lower case> */
  href: string
}

export const toMarketMover = (r: MarketMoverApi): MarketMover => ({
  symbol: r.symbol,
  name: r.co_name || r.lname || r.symbol,
  exchange: r.stk_exchng.toUpperCase(),
  group: r.sc_group,
  ltp: r.close_price,
  change: r.netchg,
  changePct: r.perchg,
  open: r.open_price,
  high: r.high_price,
  low: r.low_price,
  prevClose: r.prevclose,
  volume: r.vol_traded,
  volumeChangePct: r.pervol,
  prevVolume: r.prev_vol_traded,
  valueCr: r.val_traded,
  prevValueCr: r.prev_value_traded,
  valueChangePct:
    r.val_traded === null || !r.prev_value_traded ? null : ((r.val_traded - r.prev_value_traded) / r.prev_value_traded) * 100,
  high52: r["52weekhigh"],
  low52: r["52weeklow"],
  updatedAt: r.upd_time,
  href: `/stocks/${encodeURIComponent(r.symbol.toLowerCase())}`,
})

/** The movers lists, keyed by their /stock-market-live/<slug> URL. */
export const MOVER_LISTS = [
  { slug: "top-gainers-today",     label: "Top Gainers",       title: "Top Gainers Today" },
  { slug: "top-losers-today",      label: "Top Losers",        title: "Top Losers Today" },
  { slug: "most-active-by-value",  label: "Most Active (Value)",  title: "Most Active Stocks by Value" },
  { slug: "most-active-by-volume", label: "Most Active (Volume)", title: "Most Active Stocks by Volume" },
  { slug: "52-week-high-stocks",   label: "52W High",          title: "52-Week High Stocks" },
  { slug: "52-week-low-stocks",    label: "52W Low",           title: "52-Week Low Stocks" },
] as const

export type MoverSlug = (typeof MOVER_LISTS)[number]["slug"]
export const isMoverSlug = (s: string): s is MoverSlug => MOVER_LISTS.some((l) => l.slug === s)

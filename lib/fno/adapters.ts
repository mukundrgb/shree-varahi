// Turns backend F&O data into the props of FuturesDetailPage and OptionsDetailPage.
// Values CMOTS does not provide (implied volatility, index spot and 52-week range) are null
// and shown as "—"; build-up, PCR and max pain are derived from the contract data.

import type { BuildUp, FuturesPageData } from "@/components/futures-detail-page"
import type { OptionsPageData, StrikeRow, TopContract } from "@/components/options-detail-page"
import { formatQuoteTime } from "@/lib/stocks/format"
import type { FnoContract, FnoFuturesDetail, FnoOptionsDetail } from "./api-client"

const DAY = 86_400_000
const TOP_CONTRACTS = 6

const count = (v: number | null) => (v === null ? "—" : Math.round(v).toLocaleString("en-IN"))
const round2 = (v: number) => Math.round(v * 100) / 100

/** Calendar days left to expiry (expiry day ends 3:30 PM IST). */
function daysToExpiry(expiry: string | null): number {
  if (!expiry) return 0
  const end = new Date(`${expiry}T15:30:00+05:30`).getTime()
  return Math.max(0, Math.ceil((end - Date.now()) / DAY))
}

/** Standard reading of price change against open-interest change. */
function buildUp(priceChange: number | null, oiChangePct: number | null): BuildUp {
  const priceUp = (priceChange ?? 0) >= 0
  const oiUp = (oiChangePct ?? 0) >= 0
  if (priceUp) return oiUp ? "Long Buildup" : "Short Covering"
  return oiUp ? "Short Buildup" : "Long Unwinding"
}

function monthLabel(c: FnoContract): string {
  if (c.expiryMonth) return c.expiryMonth.slice(0, 3)
  return c.expiry ? new Date(`${c.expiry}T00:00:00+05:30`).toLocaleString("en-IN", { month: "short", timeZone: "Asia/Kolkata" }) : "—"
}

export function toFuturesPageData(d: FnoFuturesDetail): FuturesPageData {
  const near = d.nearMonth
  const totalOi = d.contracts.reduce((sum, c) => sum + (c.openInterest ?? 0), 0)

  return {
    symbol: d.symbol,
    name: `${d.name} Futures`,
    sector: d.sector ?? "Futures",
    ltp: near.ltp ?? 0,
    chg: near.change ?? 0,
    chgPct: near.changePct ?? 0,
    open: near.open,
    high52: d.spot?.high52 ?? null,
    low52: d.spot?.low52 ?? null,
    exchanges: d.exchanges,
    asOf: formatQuoteTime(near.updatedAt),
    oiBreakup: d.contracts.map((c) => ({
      month: monthLabel(c),
      oi: count(c.openInterest),
      oiPct: totalOi ? round2(((c.openInterest ?? 0) / totalOi) * 100) : 0,
    })),
    priceAcrossExpiry: d.contracts.map((c) => ({ price: c.ltp ?? 0, chg: c.change ?? 0, chgPct: c.changePct ?? 0 })),
    // Premium (+) or discount (−) of each contract to the stock price; indices have no spot price.
    premiumDiscount: d.spot?.price != null ? d.contracts.map((c) => round2((c.ltp ?? 0) - (d.spot!.price as number))) : [],
    contracts: d.contracts.map((c) => ({
      label: c.label,
      daysToExpiry: daysToExpiry(c.expiry),
      ltp: c.ltp ?? 0,
      chg: c.change ?? 0,
      chgPct: c.changePct ?? 0,
      volume: count(c.volume),
      oi: count(c.openInterest),
      oiChangePct: round2(c.oiChangePct ?? 0),
      buildUp: buildUp(c.change, c.oiChangePct),
      bid: c.bestBid.price ?? 0,
      ask: c.bestAsk.price ?? 0,
      bidQty: count(c.bestBid.qty),
      askQty: count(c.bestAsk.qty),
    })),
  }
}

/** Strike where option writers lose least at expiry, from the open interest in the chain. */
function maxPain(chain: FnoOptionsDetail["chain"]): number {
  let best = chain[0]?.strike ?? 0
  let bestLoss = Infinity
  for (const { strike: k } of chain) {
    let loss = 0
    for (const row of chain) {
      loss += (row.call?.openInterest ?? 0) * Math.max(0, k - row.strike)
      loss += (row.put?.openInterest ?? 0) * Math.max(0, row.strike - k)
    }
    if (loss < bestLoss) {
      bestLoss = loss
      best = k
    }
  }
  return best
}

export function toOptionsPageData(d: FnoOptionsDetail): OptionsPageData {
  // Header price: the stock itself, or the near-month future for an index.
  const ref = d.spot
    ? { ltp: d.spot.price, chg: d.spot.changeAmt, chgPct: d.spot.changePct, open: d.spot.open, at: d.spot.updatedAt }
    : { ltp: d.future?.ltp ?? null, chg: d.future?.change ?? null, chgPct: d.future?.changePct ?? null, open: d.future?.open ?? null, at: d.future?.updatedAt ?? null }

  const refPrice = ref.ltp ?? d.chain[Math.floor(d.chain.length / 2)]?.strike ?? 0
  const atm = d.chain.reduce<number | null>(
    (best, row) => (best === null || Math.abs(row.strike - refPrice) < Math.abs(best - refPrice) ? row.strike : best),
    null,
  )

  const strikes: StrikeRow[] = d.chain.map(({ strike, call, put }) => ({
    strike,
    isATM: strike === atm,
    ceOI: count(call?.openInterest ?? null),
    ceOIChg: round2(call?.oiChangePct ?? 0),
    ceVol: count(call?.volume ?? null),
    ceIV: null,
    ceLTP: call?.ltp ?? null,
    ceChg: call?.changePct ?? 0,
    peLTP: put?.ltp ?? null,
    peChg: put?.changePct ?? 0,
    peIV: null,
    peVol: count(put?.volume ?? null),
    peOIChg: round2(put?.oiChangePct ?? 0),
    peOI: count(put?.openInterest ?? null),
  }))

  const totalCall = d.chain.reduce((sum, r) => sum + (r.call?.openInterest ?? 0), 0)
  const totalPut = d.chain.reduce((sum, r) => sum + (r.put?.openInterest ?? 0), 0)

  const topContracts: TopContract[] = [...d.contracts]
    .filter((c) => c.optionType && c.strike !== null)
    .sort((a, b) => (b.openInterest ?? 0) - (a.openInterest ?? 0))
    .slice(0, TOP_CONTRACTS)
    .map((c) => ({
      label: c.label,
      type: c.optionType as "CE" | "PE",
      strike: c.strike as number,
      oi: count(c.openInterest),
      oiChgPct: round2(c.oiChangePct ?? 0),
      volume: count(c.volume),
      ltp: c.ltp ?? 0,
      chgPct: round2(c.changePct ?? 0),
    }))

  return {
    symbol: d.symbol,
    name: `${d.name} Options`,
    sector: d.sector ?? "Options",
    ltp: ref.ltp ?? 0,
    chg: ref.chg ?? 0,
    chgPct: ref.chgPct ?? 0,
    open: ref.open,
    high52: d.spot?.high52 ?? null,
    low52: d.spot?.low52 ?? null,
    exchanges: d.exchanges,
    asOf: `${formatQuoteTime(ref.at)}${d.selectedExpiry ? ` · expiry ${formatQuoteTime(d.selectedExpiry)}` : ""}`,
    totalCallOI: count(totalCall),
    totalPutOI: count(totalPut),
    pcr: totalCall ? round2(totalPut / totalCall) : 0,
    maxPain: maxPain(d.chain),
    strikes,
    topContracts,
  }
}

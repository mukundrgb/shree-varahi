// TradingView symbols for the ETF detail page chart (same widget as the stock page).
//
// TradingView's free embed widgets don't serve NSE data, so the BSE listing is used whenever there is one
// (the stock page does the same). Each ETF below was looked up on TradingView's symbol search and matched
// by ISIN on 23 Nov 2026; all 30 ETFs the site lists were found.
//   - 29 are on BSE under the same code as on NSE.
//   - IVZINNIFTY (Invesco India Nifty 50 ETF) is on NSE only, so the widget can't draw it; that ETF keeps
//     our own price chart (see app/etf/[slug]/page.tsx).
// ETFs added later fall back to the same rule: BSE:<code> when listed on BSE.

const VERIFIED: Record<string, string> = {
  BSLGOLDETF: "BSE:BSLGOLDETF",
  BSLNIFTY: "BSE:BSLNIFTY",
  GOLDAXIS: "BSE:GOLDAXIS",
  HDFCGOLD: "BSE:HDFCGOLD",
  SENSEXIETF: "BSE:SENSEXIETF",
  GOLDIETF: "BSE:GOLDIETF",
  NIFTYIETF: "BSE:NIFTYIETF",
  IVZINGOLD: "BSE:IVZINGOLD",
  GOLD1: "BSE:GOLD1",
  NIFTY1: "BSE:NIFTY1",
  PSUBANK: "BSE:PSUBANK",
  SENSEX1: "BSE:SENSEX1",
  LICMFGOLD: "BSE:LICMFGOLD",
  MOM50: "BSE:MOM50",
  MOM100: "BSE:MOM100",
  MON100: "BSE:MON100",
  GOLDBEES: "BSE:GOLDBEES",
  HNGSNGBEES: "BSE:HNGSNGBEES",
  LIQUIDBEES: "BSE:LIQUIDBEES",
  NIFTYBEES: "BSE:NIFTYBEES",
  SHARIABEES: "BSE:SHARIABEES",
  BANKBEES: "BSE:BANKBEES",
  INFRABEES: "BSE:INFRABEES",
  JUNIORBEES: "BSE:JUNIORBEES",
  PSUBNKBEES: "BSE:PSUBNKBEES",
  QGOLDHALF: "BSE:QGOLDHALF",
  QNIFTY: "BSE:QNIFTY",
  SBIGOLD: "BSE:SBIGOLD",
  GOLDBETA: "BSE:GOLDBETA",
}

/** TradingView symbol whose chart the embed widget can draw, or null (NSE-only ETF). */
export function etfTradingViewSymbol(etf: { symbol: string; exchanges: string[] }): string | null {
  const code = etf.symbol?.trim().toUpperCase()
  if (!code) return null
  if (VERIFIED[code]) return VERIFIED[code]
  return etf.exchanges.includes("BSE") ? `BSE:${code.replace(/[&-]/g, "_")}` : null
}

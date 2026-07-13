"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "bse-small-cap",
  breadcrumbLabel: "Bse Small Cap",
  displayName: "BSE SMALL CAP",
  badge: "BSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 54280.9,
  change: 607.95,
  changePct: 1.12,
  advancing: 18,
  declining: 16,
  neutral: 0,
  totalConstituents: 10,
  w52High: 62794.67,
  w52Low: 40688.88,
  keyStats: [
        { label: "High", value: "54,548.04" }, { label: "Low", value: "53,698.58" },
    { label: "Open", value: "53,951.79" }, { label: "Prev Close", value: "53,672.95" },
    { label: "52W High", value: "62,794.67" }, { label: "52W Low", value: "40,688.88" },
    { label: "P/E Ratio", value: "28.16" }, { label: "P/B Ratio", value: "2.62" },
    { label: "Div Yield", value: "2.12%" }, { label: "Market Cap", value: "₹2.97L Cr" },
  ],
  ohlc: { open: "53,951.79", high: "54,548.04", low: "53,698.58", close: "54,280.90" },
  chartData: {
    "1D": [53691.91,53690.23,53644.13,53664.67,53660.51,53614.17,53610.87,53647.46,53679.24,53659.41,53685.87,53693.57,53741.04,53733.19,53706.35,53753.65,53714.33,53708.59,53755.6,53708.77,53702.66,53724.24,53719.1,53720.68,53689.42,53733.8,53697.57,53687.68,53642.68,53670.01,53663.29,53680.5,53721.34,53699.67,53659.94,53648.65,53655.75,53681.55,53700.67,53747.87,53784.49,53787.07,53794.44,53807.07,53760.02,53766.12,53735.44,53760.69,53788.17,53796.06,53836.53,53818.14,53823.68,53829.26,53815.48,53842.71,53819.23,53839.47,53864.71,54280.9],
    "1W": [55928.97,56163.47,56002.83,56140.11,55881.8,55609.67,55428.95,54280.9],
    "1M": [56256.58,55526.83,55230.75,54978.19,55252.6,55974.13,55933.97,55923.29,56687.56,57097.93,57017.41,54280.9],
    "3M": [48895.65,49422.63,49395.11,50094.83,50616.94,51181.95,51482.31,50771.23,51712.93,51689.56,50943.38,54280.9],
    "1Y": [52947.87,54331.91,52607.77,51412.39,52188.18,52702.76,53331.05,52594.76,51856.16,53455.68,53905.32,54280.9],
    "5Y": [55642.13,55037.71,56505.17,55512.59,58008.33,56086.12,55426.61,58179.71,57151.05,54280.9],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 1.1, "1W": -2.95, "1M": -3.51,
    "3M": 11.01, "1Y": 2.52, "5Y": -2.45,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -2.95 }, { p: "1M", v: -3.51 }, { p: "3M", v: 11.01 }, { p: "6M", v: 17.62 }, { p: "1Y", v: 2.52 }, { p: "3Y", v: 7.81 }, { p: "5Y", v: -2.45 }],
  constituents: [
    { name: "Redington", ticker: "REDINGTON", sector: "IT Services", weight: 1.8, chg: 0.15 },
    { name: "KPIT Technologies", ticker: "KPITTECH", sector: "IT", weight: 1.6, chg: -1.02 },
    { name: "Sonata Software", ticker: "SONATSOFTW", sector: "IT", weight: 1.4, chg: -2.04 },
    { name: "Blue Star", ticker: "BLUESTARCO", sector: "Consumer Durables", weight: 1.3, chg: 1.2 },
    { name: "Elgi Equipments", ticker: "ELGIEQUIP", sector: "Engineering", weight: 1.2, chg: 1.17 },
    { name: "Aavas Financiers", ticker: "AAVAS", sector: "NBFC", weight: 1.1, chg: -0.5 },
    { name: "Route Mobile", ticker: "ROUTE", sector: "Telecom Tech", weight: 1.0, chg: 1.77 },
    { name: "Century Textiles", ticker: "CENTURYTEX", sector: "Textiles", weight: 0.9, chg: 1.86 },
    { name: "Metropolis Healthcare", ticker: "METROPOLIS", sector: "Healthcare", weight: 0.9, chg: -0.71 },
    { name: "Poly Medicure", ticker: "POLYMED", sector: "Healthcare", weight: 0.8, chg: -1.73 },
  ],
  sectors: [
    { name: "Industrials", weight: 22.4, color: "#FF0000" },
    { name: "Financial Services", weight: 18.6, color: "#D9B27C" },
    { name: "IT", weight: 15.2, color: "#4F7CAC" },
    { name: "Healthcare", weight: 12.1, color: "#22C55E" },
    { name: "Consumer Discretionary", weight: 11.3, color: "#A855F7" },
    { name: "Chemicals", weight: 9.4, color: "#F59E0B" },
    { name: "Others", weight: 11.0, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "54,552.3", signal: "Buy" }, { label: "10-SMA", value: "54,932.27", signal: "Sell" }, { label: "20-SMA", value: "55,366.52", signal: "Sell" }, { label: "50-SMA", value: "54,009.5", signal: "Buy" }, { label: "200-SMA", value: "49,395.62", signal: "Buy" }, { label: "RSI (14)", value: "37.6", signal: "Neutral" }, { label: "MACD", value: "59.7", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Sensex", chg: 0.24, href: "/markets/indices/sensex" },
    { name: "BSE Mid Cap", chg: -1.06, href: "/markets/indices/bse-mid-cap" },
    { name: "Nifty Small Cap 50", chg: -1.1, href: "/markets/indices/nifty-small-cap-50" },
  ],
  facts: [{ label: "Base Year", value: "2005" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Apr 2005" }, { label: "Stocks", value: "~900" }],
  aboutTitle: "About Bse Small Cap",
  aboutParagraphs: [
    "The <strong>BSE SMALL CAP</strong> index represents companies ranked below the top 250 by market capitalisation on the BSE, offering exposure to India's small-cap growth universe.",
    "Small cap stocks carry higher volatility and liquidity risk relative to large caps, but historically offer higher long-term growth potential across economic cycles.",
  ],
  ctaHeadline: "Trade Bse Small Cap with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function BseSmallCapPage() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "cac-40",
  breadcrumbLabel: "Cac 40",
  displayName: "CAC 40",
  badge: "EURONEXT",
  category: "GLOBAL INDEX",
  currency: "€",
  locale: "fr-FR",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 7620.5,
  change: 25.91,
  changePct: 0.34,
  advancing: 16,
  declining: 18,
  neutral: 0,
  totalConstituents: 10,
  w52High: 8684.83,
  w52Low: 6412.02,
  keyStats: [
        { label: "High", value: "7,651.92" }, { label: "Low", value: "7,592.00" },
    { label: "Open", value: "7,605.54" }, { label: "Prev Close", value: "7,594.59" },
    { label: "52W High", value: "8,684.83" }, { label: "52W Low", value: "6,412.02" },
  ],
  ohlc: { open: "7,605.54", high: "7,651.92", low: "7,592.00", close: "7,620.50" },
  chartData: {
    "1D": [7655.86,7661.44,7657.25,7657.08,7652.23,7652.37,7646.71,7647.86,7646.4,7640.23,7646.61,7647.45,7646.29,7640.61,7636.39,7635.52,7638.89,7635.03,7640.63,7642.25,7637.98,7631.66,7634.18,7628.32,7623.82,7621.42,7614.57,7611.72,7607.42,7610.09,7606.16,7607.0,7611.77,7608.09,7604.48,7598.27,7604.13,7604.73,7602.58,7607.92,7609.46,7604.35,7605.45,7608.7,7606.11,7602.67,7604.61,7598.92,7604.08,7602.28,7605.89,7608.74,7609.68,7614.6,7618.45,7620.44,7618.38,7621.05,7617.38,7620.5],
    "1W": [7708.66,7684.8,7726.1,7696.32,7736.27,7769.52,7745.54,7620.5],
    "1M": [6872.49,6854.57,6935.49,6977.75,6976.89,7025.76,7061.87,7062.84,7090.7,7119.08,7187.67,7620.5],
    "3M": [7536.44,7647.17,7663.31,7553.45,7558.14,7675.23,7762.95,7796.97,7747.4,7847.07,7772.68,7620.5],
    "1Y": [7422.34,7564.87,7331.61,7174.87,7009.89,7252.45,7079.48,6965.33,6730.32,6582.21,6723.76,7620.5],
    "5Y": [7820.53,8081.75,8418.05,8700.41,9122.32,8688.73,8857.48,8498.69,8590.81,7620.5],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -0.46, "1W": -1.14, "1M": 10.88,
    "3M": 1.12, "1Y": 2.67, "5Y": -2.56,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -1.14 }, { p: "1M", v: 10.88 }, { p: "3M", v: 1.12 }, { p: "6M", v: 1.79 }, { p: "1Y", v: 2.67 }, { p: "3Y", v: 8.28 }, { p: "5Y", v: -2.56 }],
  constituents: [
    { name: "LVMH", ticker: "MC", sector: "Luxury", weight: 10.8, chg: 0.16 },
    { name: "L'Oreal", ticker: "OR", sector: "Consumer", weight: 6.4, chg: 0.14 },
    { name: "TotalEnergies", ticker: "TTE", sector: "Energy", weight: 6.1, chg: -0.21 },
    { name: "Sanofi", ticker: "SAN", sector: "Healthcare", weight: 5.6, chg: -1.89 },
    { name: "Schneider Electric", ticker: "SU", sector: "Industrials", weight: 5.2, chg: 1.67 },
    { name: "Air Liquide", ticker: "AI", sector: "Chemicals", weight: 4.4, chg: 2.17 },
    { name: "BNP Paribas", ticker: "BNP", sector: "Financials", weight: 4.0, chg: -1.94 },
    { name: "Hermes International", ticker: "RMS", sector: "Luxury", weight: 3.8, chg: -1.39 },
    { name: "AXA", ticker: "CS", sector: "Insurance", weight: 3.2, chg: 0.75 },
    { name: "Airbus", ticker: "AIR", sector: "Industrials", weight: 3.0, chg: 1.26 },
  ],
  sectors: [
    { name: "Luxury & Consumer", weight: 22.6, color: "#A855F7" },
    { name: "Industrials", weight: 16.4, color: "#D9B27C" },
    { name: "Financials", weight: 14.8, color: "#FF0000" },
    { name: "Energy", weight: 11.2, color: "#F59E0B" },
    { name: "Healthcare", weight: 10.6, color: "#22C55E" },
    { name: "Others", weight: 24.4, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "7,658.6", signal: "Buy" }, { label: "10-SMA", value: "7,711.95", signal: "Sell" }, { label: "20-SMA", value: "7,772.91", signal: "Sell" }, { label: "50-SMA", value: "7,582.4", signal: "Buy" }, { label: "200-SMA", value: "6,934.66", signal: "Buy" }, { label: "RSI (14)", value: "55.7", signal: "Neutral" }, { label: "MACD", value: "29.5", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "DAX 40", chg: -0.72, href: "/markets/indices/dax" },
    { name: "FTSE 100", chg: 1.07, href: "/markets/indices/ftse-100" },
    { name: "Dow Jones", chg: 0.45, href: "/markets/indices/dow-jones" },
  ],
  facts: [{ label: "Base Year", value: "1987" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Dec 1987" }, { label: "Stocks", value: "40" }],
  aboutTitle: "About Cac 40",
  aboutParagraphs: [
    "The <strong>CAC 40</strong> is the benchmark index of the Paris stock exchange (Euronext Paris), comprising the 40 largest and most actively traded French companies.",
    "Dominated by global luxury, energy, and industrial giants, the CAC 40 is a key barometer of both the French economy and the broader European consumer and industrial sectors.",
  ],
  ctaHeadline: "Invest in Cac 40 via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function Cac40Page() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "ftse-100",
  breadcrumbLabel: "Ftse 100",
  displayName: "FTSE 100",
  badge: "LSE",
  category: "GLOBAL INDEX",
  currency: "£",
  locale: "en-GB",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 8280.4,
  change: 82.8,
  changePct: 1.0,
  advancing: 23,
  declining: 18,
  neutral: 0,
  totalConstituents: 10,
  w52High: 9158.55,
  w52Low: 6558.9,
  keyStats: [
        { label: "High", value: "8,298.11" }, { label: "Low", value: "8,226.57" },
    { label: "Open", value: "8,245.49" }, { label: "Prev Close", value: "8,197.60" },
    { label: "52W High", value: "9,158.55" }, { label: "52W Low", value: "6,558.90" },
  ],
  ohlc: { open: "8,245.49", high: "8,298.11", low: "8,226.57", close: "8,280.40" },
  chartData: {
    "1D": [7788.58,7782.37,7779.72,7782.12,7781.33,7779.76,7774.92,7768.11,7774.96,7774.16,7780.79,7774.96,7780.42,7783.05,7780.27,7778.5,7778.05,7777.93,7775.32,7778.96,7781.99,7781.36,7787.95,7789.84,7790.65,7785.21,7780.04,7778.53,7773.52,7777.15,7775.29,7780.45,7777.67,7780.97,7775.25,7780.45,7786.74,7790.37,7786.35,7787.25,7780.68,7786.24,7788.75,7782.03,7786.69,7782.67,7780.1,7785.02,7781.42,7788.12,7784.67,7783.77,7788.52,7787.43,7793.76,7798.76,7796.73,7803.58,7799.22,8280.4],
    "1W": [7652.04,7681.95,7646.15,7671.93,7648.3,7671.17,7634.37,8280.4],
    "1M": [7786.24,7689.43,7786.3,7757.89,7825.78,7841.8,7758.76,7728.3,7662.92,7754.61,7724.5,8280.4],
    "3M": [7488.91,7461.41,7358.39,7316.46,7190.1,7142.72,7049.89,7094.51,6953.04,7000.83,7126.45,8280.4],
    "1Y": [7483.5,7352.55,7318.03,7528.64,7454.05,7319.57,7401.73,7484.49,7535.28,7720.78,7756.31,8280.4],
    "5Y": [8532.47,8676.08,8763.88,8478.25,8307.91,8437.36,8822.59,8972.66,8908.0,8280.4],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 6.31, "1W": 8.21, "1M": 6.35,
    "3M": 10.57, "1Y": 10.65, "5Y": -2.95,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 8.21 }, { p: "1M", v: 6.35 }, { p: "3M", v: 10.57 }, { p: "6M", v: 16.91 }, { p: "1Y", v: 10.65 }, { p: "3Y", v: 33.02 }, { p: "5Y", v: -2.95 }],
  constituents: [
    { name: "AstraZeneca", ticker: "AZN", sector: "Healthcare", weight: 8.4, chg: 0.17 },
    { name: "Shell", ticker: "SHEL", sector: "Energy", weight: 7.9, chg: -1.33 },
    { name: "HSBC Holdings", ticker: "HSBA", sector: "Financials", weight: 6.8, chg: 1.36 },
    { name: "Unilever", ticker: "ULVR", sector: "Consumer", weight: 5.2, chg: -0.02 },
    { name: "BP", ticker: "BP", sector: "Energy", weight: 4.4, chg: 0.81 },
    { name: "Rio Tinto", ticker: "RIO", sector: "Mining", weight: 3.8, chg: 0.38 },
    { name: "Diageo", ticker: "DGE", sector: "Consumer", weight: 3.4, chg: 1.57 },
    { name: "GSK", ticker: "GSK", sector: "Healthcare", weight: 3.1, chg: -0.62 },
    { name: "British American Tobacco", ticker: "BATS", sector: "Consumer", weight: 2.9, chg: 2.09 },
    { name: "Lloyds Banking Group", ticker: "LLOY", sector: "Financials", weight: 2.6, chg: 1.44 },
  ],
  sectors: [
    { name: "Financials", weight: 18.6, color: "#FF0000" },
    { name: "Energy", weight: 14.2, color: "#D9B27C" },
    { name: "Healthcare", weight: 13.8, color: "#22C55E" },
    { name: "Consumer Staples", weight: 12.4, color: "#A855F7" },
    { name: "Materials", weight: 11.6, color: "#94A3B8" },
    { name: "Others", weight: 29.4, color: "#F59E0B" },
  ],
  technicals: [{ label: "5-SMA", value: "8,321.8", signal: "Buy" }, { label: "10-SMA", value: "8,379.76", signal: "Sell" }, { label: "20-SMA", value: "8,446.01", signal: "Sell" }, { label: "50-SMA", value: "8,239.0", signal: "Buy" }, { label: "200-SMA", value: "7,535.16", signal: "Buy" }, { label: "RSI (14)", value: "36.5", signal: "Neutral" }, { label: "MACD", value: "-74.8", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "DAX 40", chg: -1.19, href: "/markets/indices/dax" },
    { name: "CAC 40", chg: 0.29, href: "/markets/indices/cac-40" },
    { name: "Dow Jones", chg: 0.01, href: "/markets/indices/dow-jones" },
  ],
  facts: [{ label: "Base Year", value: "1984" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jan 1984" }, { label: "Stocks", value: "100" }],
  aboutTitle: "About Ftse 100",
  aboutParagraphs: [
    "The <strong>FTSE 100</strong> comprises the 100 largest companies by market capitalisation listed on the London Stock Exchange, representing the UK's blue-chip market.",
    "With a large share of constituent revenue earned overseas, the FTSE 100 is often viewed as a proxy for global economic sentiment as much as the UK domestic economy.",
  ],
  ctaHeadline: "Invest in Ftse 100 via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function Ftse100Page() {
  return <IndexDetailPage data={DATA} />
}

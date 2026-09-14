"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "taiex",
  breadcrumbLabel: "Taiex",
  displayName: "TAIEX",
  badge: "TWSE",
  category: "GLOBAL INDEX",
  currency: "NT$",
  locale: "zh-TW",
  asOf: "13 Jul 2026 · 15:30 IST",
  price: 22840.3,
  change: 175.87,
  changePct: 0.77,
  advancing: 17,
  declining: 21,
  neutral: 0,
  totalConstituents: 10,
  w52High: 27659.59,
  w52Low: 18244.62,
  keyStats: [
        { label: "High", value: "22,936.44" }, { label: "Low", value: "22,620.32" },
    { label: "Open", value: "22,753.84" }, { label: "Prev Close", value: "22,664.43" },
    { label: "52W High", value: "27,659.59" }, { label: "52W Low", value: "18,244.62" },
  ],
  ohlc: { open: "22,753.84", high: "22,936.44", low: "22,620.32", close: "22,840.30" },
  chartData: {
    "1D": [22646.69,22633.02,22650.13,22665.83,22658.86,22671.57,22677.71,22677.37,22661.46,22649.14,22648.71,22658.18,22664.94,22653.63,22671.24,22659.17,22670.07,22670.5,22684.92,22700.64,22707.05,22714.28,22696.88,22701.59,22687.62,22701.95,22706.1,22715.55,22715.12,22727.61,22729.82,22746.69,22747.52,22741.68,22741.26,22749.7,22745.35,22750.09,22739.79,22727.41,22729.09,22725.57,22708.98,22715.49,22714.06,22731.39,22711.84,22702.97,22683.94,22692.22,22680.16,22698.42,22685.3,22700.59,22683.07,22696.67,22679.95,22671.18,22659.74,22840.3],
    "1W": [23108.91,23224.51,23356.88,23381.3,23387.54,23452.81,23473.27,22840.3],
    "1M": [23824.3,23664.56,23832.31,24077.95,24247.03,24402.98,24226.71,24367.62,24642.08,24478.43,24744.81,22840.3],
    "3M": [23905.56,24292.94,24312.62,24535.74,24602.14,24708.83,24989.87,24495.66,24762.84,25230.96,25659.98,22840.3],
    "1Y": [22632.53,22269.26,22087.53,22454.56,23101.72,22456.83,22396.99,22234.97,22602.69,22215.86,21560.29,22840.3],
    "5Y": [21795.29,21613.96,22655.04,22608.74,22332.81,21497.24,21121.88,22091.27,22108.56,22840.3],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 0.85, "1W": -1.16, "1M": -4.13,
    "3M": -4.46, "1Y": 0.92, "5Y": 4.79,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -1.16 }, { p: "1M", v: -4.13 }, { p: "3M", v: -4.46 }, { p: "6M", v: -7.14 }, { p: "1Y", v: 0.92 }, { p: "3Y", v: 2.85 }, { p: "5Y", v: 4.79 }],
  constituents: [
    { name: "TSMC", ticker: "2330", sector: "Technology", weight: 32.4, chg: 0.75 },
    { name: "Hon Hai Precision", ticker: "2317", sector: "Technology", weight: 6.8, chg: -1.64 },
    { name: "MediaTek", ticker: "2454", sector: "Technology", weight: 4.2, chg: -0.29 },
    { name: "Fubon Financial", ticker: "2881", sector: "Financials", weight: 2.9, chg: -0.03 },
    { name: "CTBC Financial", ticker: "2891", sector: "Financials", weight: 2.4, chg: 1.55 },
    { name: "Delta Electronics", ticker: "2308", sector: "Technology", weight: 2.2, chg: -1.15 },
    { name: "Quanta Computer", ticker: "2382", sector: "Technology", weight: 2.0, chg: 2.01 },
    { name: "Cathay Financial", ticker: "2882", sector: "Financials", weight: 1.9, chg: -1.83 },
    { name: "United Microelectronics", ticker: "2303", sector: "Technology", weight: 1.7, chg: 0.5 },
    { name: "Chunghwa Telecom", ticker: "2412", sector: "Telecom", weight: 1.5, chg: 1.86 },
  ],
  sectors: [
    { name: "Technology", weight: 56.4, color: "#4F7CAC" },
    { name: "Financials", weight: 14.2, color: "#FF0000" },
    { name: "Industrials", weight: 8.6, color: "#D9B27C" },
    { name: "Telecom", weight: 4.8, color: "#14B8A6" },
    { name: "Others", weight: 16.0, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "22,954.5", signal: "Buy" }, { label: "10-SMA", value: "23,114.38", signal: "Sell" }, { label: "20-SMA", value: "23,297.11", signal: "Sell" }, { label: "50-SMA", value: "22,726.1", signal: "Buy" }, { label: "200-SMA", value: "20,784.67", signal: "Buy" }, { label: "RSI (14)", value: "61.7", signal: "Neutral" }, { label: "MACD", value: "54.6", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Hang Seng", chg: 0.93, href: "/markets/indices/hang-seng" },
    { name: "Nikkei 225", chg: 1.33, href: "/markets/indices/nikkei-225" },
    { name: "NASDAQ", chg: -1.21, href: "/markets/indices/nasdaq" },
  ],
  facts: [{ label: "Base Year", value: "1966" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "1967" }, { label: "Stocks", value: "~980" }],
  aboutTitle: "About Taiex",
  aboutParagraphs: [
    "The <strong>TAIEX</strong> is the benchmark index of the Taiwan Stock Exchange, heavily weighted toward TSMC and the global semiconductor supply chain.",
    "As Taiwan is the world's leading chip manufacturing hub, TAIEX is a key barometer of global technology demand and AI-driven semiconductor cycles.",
  ],
  ctaHeadline: "Invest in Taiex via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function TaiexPage() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "sse-composite",
  breadcrumbLabel: "Shanghai Composite",
  displayName: "SHANGHAI COMPOSITE",
  badge: "SSE",
  category: "GLOBAL INDEX",
  currency: "¥",
  locale: "zh-CN",
  asOf: "13 Jul 2026 · 15:30 IST",
  price: 3420.6,
  change: 11.29,
  changePct: 0.33,
  advancing: 24,
  declining: 20,
  neutral: 0,
  totalConstituents: 10,
  w52High: 4067.54,
  w52Low: 2709.37,
  keyStats: [
        { label: "High", value: "3,438.46" }, { label: "Low", value: "3,401.90" },
    { label: "Open", value: "3,417.72" }, { label: "Prev Close", value: "3,409.31" },
    { label: "52W High", value: "4,067.54" }, { label: "52W Low", value: "2,709.37" },
  ],
  ohlc: { open: "3,417.72", high: "3,438.46", low: "3,401.90", close: "3,420.60" },
  chartData: {
    "1D": [3223.43,3224.11,3226.84,3227.81,3228.47,3228.19,3227.67,3226.65,3228.96,3230.53,3227.77,3228.2,3230.45,3229.59,3229.55,3228.52,3228.9,3226.27,3228.58,3228.87,3226.05,3226.82,3226.6,3226.69,3227.9,3229.65,3229.69,3230.61,3232.72,3231.81,3229.26,3230.93,3233.77,3233.14,3234.8,3234.37,3235.41,3233.14,3232.19,3233.27,3233.34,3231.24,3232.61,3233.83,3234.15,3231.52,3232.2,3230.14,3227.43,3230.03,3228.84,3231.0,3231.05,3228.73,3228.17,3225.91,3226.22,3229.0,3228.73,3420.6],
    "1W": [3491.17,3511.19,3516.88,3534.18,3554.53,3543.43,3526.11,3420.6],
    "1M": [3473.82,3510.34,3508.1,3538.25,3554.88,3598.55,3600.88,3612.0,3645.01,3630.23,3592.4,3420.6],
    "3M": [3568.66,3620.71,3598.76,3608.99,3665.05,3610.96,3676.2,3647.8,3598.49,3578.75,3617.88,3420.6],
    "1Y": [3358.27,3381.91,3449.44,3398.86,3375.43,3473.48,3444.11,3548.01,3532.41,3649.94,3595.89,3420.6],
    "5Y": [3113.22,3001.41,2895.86,2944.93,2899.09,2990.65,3055.69,2944.83,2815.64,3420.6],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 6.12, "1W": -2.02, "1M": -1.53,
    "3M": -4.15, "1Y": 1.86, "5Y": 9.87,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -2.02 }, { p: "1M", v: -1.53 }, { p: "3M", v: -4.15 }, { p: "6M", v: -6.64 }, { p: "1Y", v: 1.86 }, { p: "3Y", v: 5.77 }, { p: "5Y", v: 9.87 }],
  constituents: [
    { name: "Kweichow Moutai", ticker: "600519", sector: "Consumer", weight: 6.8, chg: -1.73 },
    { name: "ICBC", ticker: "601398", sector: "Financials", weight: 5.4, chg: -0.02 },
    { name: "China Construction Bank", ticker: "601939", sector: "Financials", weight: 4.9, chg: -1.1 },
    { name: "Ping An Insurance", ticker: "601318", sector: "Insurance", weight: 4.2, chg: -1.02 },
    { name: "PetroChina", ticker: "601857", sector: "Energy", weight: 3.8, chg: -1.06 },
    { name: "Bank of China", ticker: "601988", sector: "Financials", weight: 3.4, chg: -2.01 },
    { name: "China Merchants Bank", ticker: "600036", sector: "Financials", weight: 3.1, chg: -0.42 },
    { name: "Agricultural Bank of China", ticker: "601288", sector: "Financials", weight: 2.9, chg: -1.03 },
    { name: "CATL", ticker: "300750", sector: "Technology", weight: 2.6, chg: -0.43 },
    { name: "China Life Insurance", ticker: "601628", sector: "Insurance", weight: 2.2, chg: -1.74 },
  ],
  sectors: [
    { name: "Financials", weight: 32.4, color: "#FF0000" },
    { name: "Consumer Staples", weight: 14.6, color: "#A855F7" },
    { name: "Energy", weight: 11.8, color: "#F59E0B" },
    { name: "Industrials", weight: 10.2, color: "#D9B27C" },
    { name: "Technology", weight: 9.4, color: "#4F7CAC" },
    { name: "Others", weight: 21.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "3,437.7", signal: "Buy" }, { label: "10-SMA", value: "3,461.65", signal: "Sell" }, { label: "20-SMA", value: "3,489.01", signal: "Sell" }, { label: "50-SMA", value: "3,403.5", signal: "Buy" }, { label: "200-SMA", value: "3,112.75", signal: "Buy" }, { label: "RSI (14)", value: "37.5", signal: "Neutral" }, { label: "MACD", value: "-111.5", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Hang Seng", chg: -0.22, href: "/markets/indices/hang-seng" },
    { name: "Nikkei 225", chg: -0.9, href: "/markets/indices/nikkei-225" },
    { name: "NASDAQ", chg: 0.15, href: "/markets/indices/nasdaq" },
  ],
  facts: [{ label: "Base Year", value: "1990" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "Jul 1991" }, { label: "Stocks", value: "~2,200" }],
  aboutTitle: "About Shanghai Composite",
  aboutParagraphs: [
    "The <strong>Shanghai Composite Index</strong> tracks all stocks listed on the Shanghai Stock Exchange, serving as the primary benchmark for mainland Chinese equities.",
    "Dominated by state-owned banks, insurers, and energy majors, the index is closely watched as a gauge of China's economic policy and industrial output.",
  ],
  ctaHeadline: "Invest in Shanghai Composite via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function SseCompositePage() {
  return <IndexDetailPage data={DATA} />
}

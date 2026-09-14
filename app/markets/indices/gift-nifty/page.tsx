"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "gift-nifty",
  breadcrumbLabel: "Gift Nifty",
  displayName: "GIFT NIFTY",
  badge: "NSE IX",
  category: "GLOBAL INDEX",
  currency: "$",
  locale: "en-US",
  asOf: "13 Jul 2026 · 15:30 IST",
  price: 24080.5,
  change: -187.83,
  changePct: -0.78,
  advancing: 24,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 27415.1,
  w52Low: 20868.58,
  keyStats: [
        { label: "High", value: "24,278.85" }, { label: "Low", value: "23,968.28" },
    { label: "Open", value: "24,151.22" }, { label: "Prev Close", value: "24,268.33" },
    { label: "52W High", value: "27,415.10" }, { label: "52W Low", value: "20,868.58" },
  ],
  ohlc: { open: "24,151.22", high: "24,278.85", low: "23,968.28", close: "24,080.50" },
  chartData: {
    "1D": [25056.96,25068.97,25066.35,25080.81,25078.06,25057.58,25054.91,25056.77,25044.33,25034.2,25034.35,25056.74,25060.6,25050.41,25069.16,25083.9,25065.39,25044.58,25057.92,25042.61,25028.1,25038.27,25047.8,25032.15,25024.42,25015.67,25006.48,24999.53,25007.91,25016.67,25015.14,25015.43,25028.88,25036.81,25034.71,25016.06,25035.75,25016.74,24996.53,24986.39,24978.88,24971.87,24977.81,24979.21,24978.49,24978.63,24964.76,24968.82,24974.06,24991.04,24969.5,24968.85,24950.06,24958.37,24966.46,24963.87,24978.63,24979.12,24982.69,24080.5],
    "1W": [25099.59,25238.95,25379.13,25522.0,25674.5,25596.46,25744.37,24080.5],
    "1M": [22047.77,22204.5,22078.86,22254.95,22242.87,22182.44,22158.17,22254.23,22493.57,22662.31,22403.82,24080.5],
    "3M": [25106.81,25491.4,25306.48,25781.83,26051.48,25700.47,25789.08,26005.06,25605.47,25633.62,25260.46,24080.5],
    "1Y": [24052.31,23463.85,24219.47,23463.38,23212.94,23858.57,23805.68,24371.63,23823.25,24579.82,24389.3,24080.5],
    "5Y": [21931.95,22422.29,22760.49,22274.39,21286.83,20806.42,20827.15,20908.65,21173.67,24080.5],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -3.9, "1W": -4.06, "1M": 9.22,
    "3M": -4.09, "1Y": 0.12, "5Y": 9.8,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -4.06 }, { p: "1M", v: 9.22 }, { p: "3M", v: -4.09 }, { p: "6M", v: -6.54 }, { p: "1Y", v: 0.12 }, { p: "3Y", v: 0.37 }, { p: "5Y", v: 9.8 }],
  constituents: [
    { name: "Reliance Industries", ticker: "RELIANCE", sector: "Energy", weight: 10.3, chg: 0.75 },
    { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", weight: 8.9, chg: 1.1 },
    { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", weight: 7.2, chg: 1.75 },
    { name: "Infosys", ticker: "INFY", sector: "IT", weight: 5.8, chg: -1.87 },
    { name: "TCS", ticker: "TCS", sector: "IT", weight: 5.2, chg: 0.68 },
    { name: "Bharti Airtel", ticker: "BHARTIARTL", sector: "Telecom", weight: 4.0, chg: 1.98 },
    { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", weight: 3.4, chg: 2.19 },
    { name: "L&T", ticker: "LT", sector: "Infra", weight: 3.3, chg: 2.09 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", weight: 3.2, chg: -1.53 },
    { name: "Hindustan Unilever", ticker: "HINDUNILVR", sector: "FMCG", weight: 3.0, chg: -0.64 },
  ],
  sectors: [
    { name: "Banking & Finance", weight: 28.4, color: "#FF0000" },
    { name: "IT", weight: 15.2, color: "#4F7CAC" },
    { name: "Oil & Energy", weight: 12.8, color: "#D9B27C" },
    { name: "FMCG", weight: 9.3, color: "#22C55E" },
    { name: "Auto", weight: 6.1, color: "#A855F7" },
    { name: "Others", weight: 28.2, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "24,200.9", signal: "Buy" }, { label: "10-SMA", value: "24,369.47", signal: "Sell" }, { label: "20-SMA", value: "24,562.11", signal: "Sell" }, { label: "50-SMA", value: "23,960.1", signal: "Buy" }, { label: "200-SMA", value: "21,913.26", signal: "Buy" }, { label: "RSI (14)", value: "42.5", signal: "Neutral" }, { label: "MACD", value: "5.0", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "Nifty 50", chg: 1.29, href: "/markets/indices/nifty-50" },
    { name: "Sensex", chg: 1.1, href: "/markets/indices/sensex" },
    { name: "NASDAQ", chg: 0.32, href: "/markets/indices/nasdaq" },
  ],
  facts: [{ label: "Base Year", value: "1995" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jul 2023" }, { label: "Stocks", value: "50" }],
  aboutTitle: "About Gift Nifty",
  aboutParagraphs: [
    "<strong>GIFT NIFTY</strong> is the extended-hours version of NIFTY 50 futures traded on NSE IX at GIFT City, allowing global investors to trade Indian markets nearly 21 hours a day.",
    "Migrated from SGX Nifty in July 2023, GIFT Nifty gives international participants extended access to India-linked derivatives before and after Indian market hours.",
  ],
  ctaHeadline: "Invest in Gift Nifty via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function GiftNiftyPage() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "bse-bankex",
  breadcrumbLabel: "Bse Bankex",
  displayName: "BSE BANKEX",
  badge: "BSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 58940.2,
  change: 23.58,
  changePct: 0.04,
  advancing: 16,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 67070.47,
  w52Low: 48643.71,
  keyStats: [
        { label: "High", value: "59,068.32" }, { label: "Low", value: "58,810.81" },
    { label: "Open", value: "58,932.38" }, { label: "Prev Close", value: "58,916.62" },
    { label: "52W High", value: "67,070.47" }, { label: "52W Low", value: "48,643.71" },
    { label: "P/E Ratio", value: "17.77" }, { label: "P/B Ratio", value: "2.02" },
    { label: "Div Yield", value: "1.25%" }, { label: "Market Cap", value: "₹9.18L Cr" },
  ],
  ohlc: { open: "58,932.38", high: "59,068.32", low: "58,810.81", close: "58,940.20" },
  chartData: {
    "1D": [56342.99,56312.73,56311.15,56306.94,56296.54,56297.77,56333.46,56341.02,56340.4,56335.07,56332.19,56293.04,56335.6,56367.68,56336.42,56371.34,56362.65,56398.57,56434.03,56391.43,56364.25,56373.76,56325.19,56366.28,56341.59,56333.84,56342.96,56345.3,56301.93,56251.92,56201.91,56240.62,56271.45,56304.48,56287.02,56292.2,56341.37,56336.34,56322.08,56323.4,56287.25,56267.86,56286.65,56259.64,56253.33,56232.8,56220.11,56237.08,56251.66,56287.48,56306.98,56289.46,56282.26,56332.21,56327.58,56352.06,56326.73,56300.8,56323.83,58940.2],
    "1W": [61430.09,61087.72,60876.25,61099.16,61125.63,61176.96,61402.73,58940.2],
    "1M": [55310.04,54632.24,54003.71,53890.14,53511.36,53773.01,54417.38,55173.43,55726.15,55220.31,55926.36,58940.2],
    "3M": [59728.44,59012.95,58350.14,59068.73,59569.27,60563.57,59760.44,60305.78,59267.97,58672.38,57819.83,58940.2],
    "1Y": [60324.63,58345.2,59642.0,57792.91,59452.49,58556.51,57137.77,57356.79,58830.44,59153.39,57856.6,58940.2],
    "5Y": [57771.7,55503.6,52999.2,55004.23,56785.12,58499.62,58164.12,57919.52,55848.29,58940.2],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 4.61, "1W": -4.05, "1M": 6.56,
    "3M": -1.32, "1Y": -2.29, "5Y": 2.02,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -4.05 }, { p: "1M", v: 6.56 }, { p: "3M", v: -1.32 }, { p: "6M", v: -2.11 }, { p: "1Y", v: -2.29 }, { p: "3Y", v: -7.1 }, { p: "5Y", v: 2.02 }],
  constituents: [
    { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", weight: 23.1, chg: -1.09 },
    { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", weight: 20.6, chg: -0.01 },
    { name: "State Bank of India", ticker: "SBIN", sector: "Banking", weight: 12.4, chg: 0.55 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", weight: 10.2, chg: 1.41 },
    { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", weight: 9.8, chg: 1.37 },
    { name: "IndusInd Bank", ticker: "INDUSINDBK", sector: "Banking", weight: 4.6, chg: 1.39 },
    { name: "Bank of Baroda", ticker: "BANKBARODA", sector: "Banking", weight: 3.4, chg: 0.03 },
    { name: "Punjab National Bank", ticker: "PNB", sector: "Banking", weight: 2.9, chg: -1.32 },
    { name: "Federal Bank", ticker: "FEDERALBNK", sector: "Banking", weight: 2.4, chg: -2.07 },
    { name: "IDFC First Bank", ticker: "IDFCFIRSTB", sector: "Banking", weight: 2.1, chg: 0.39 },
  ],
  sectors: [
    { name: "Private Banks", weight: 70.5, color: "#FF0000" },
    { name: "PSU Banks", weight: 21.8, color: "#D9B27C" },
    { name: "Small Finance Banks", weight: 7.7, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "59,234.9", signal: "Buy" }, { label: "10-SMA", value: "59,647.48", signal: "Sell" }, { label: "20-SMA", value: "60,119.0", signal: "Sell" }, { label: "50-SMA", value: "58,645.5", signal: "Buy" }, { label: "200-SMA", value: "53,635.58", signal: "Buy" }, { label: "RSI (14)", value: "38.9", signal: "Neutral" }, { label: "MACD", value: "-51.6", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "Sensex", chg: 0.75, href: "/markets/indices/sensex" },
    { name: "Nifty Bank", chg: 0.45, href: "/markets/indices/nifty-bank" },
    { name: "Finnifty", chg: -0.9, href: "/markets/indices/finnifty" },
  ],
  facts: [{ label: "Base Year", value: "2002" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jun 2003" }, { label: "Stocks", value: "10" }],
  aboutTitle: "About Bse Bankex",
  aboutParagraphs: [
    "The <strong>BSE BANKEX</strong> tracks the performance of the leading banking sector stocks listed on the Bombay Stock Exchange, spanning both private and public sector banks.",
    "BANKEX serves as a key benchmark for banking sector funds and is used extensively for derivatives trading and sector-specific investment strategies.",
  ],
  ctaHeadline: "Trade Bse Bankex with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function BseBankexPage() {
  return <IndexDetailPage data={DATA} />
}

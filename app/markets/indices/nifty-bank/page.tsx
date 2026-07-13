"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-bank",
  breadcrumbLabel: "Nifty Bank",
  displayName: "NIFTY BANK",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 51820.65,
  change: -704.76,
  changePct: -1.36,
  advancing: 23,
  declining: 14,
  neutral: 0,
  totalConstituents: 10,
  w52High: 62981.22,
  w52Low: 46004.24,
  keyStats: [
        { label: "High", value: "52,362.64" }, { label: "Low", value: "51,681.45" },
    { label: "Open", value: "52,188.15" }, { label: "Prev Close", value: "52,525.41" },
    { label: "52W High", value: "62,981.22" }, { label: "52W Low", value: "46,004.24" },
    { label: "P/E Ratio", value: "23.47" }, { label: "P/B Ratio", value: "4.05" },
    { label: "Div Yield", value: "1.6%" }, { label: "Market Cap", value: "₹7.38L Cr" },
  ],
  ohlc: { open: "52,188.15", high: "52,362.64", low: "51,681.45", close: "51,820.65" },
  chartData: {
    "1D": [50278.31,50306.09,50346.18,50350.95,50395.01,50436.58,50393.23,50425.64,50451.03,50425.6,50468.54,50495.54,50450.74,50450.43,50483.89,50507.46,50475.5,50458.94,50420.02,50390.31,50401.71,50444.96,50461.96,50424.16,50435.08,50428.55,50448.24,50493.6,50471.99,50504.81,50534.43,50492.93,50507.86,50481.1,50490.82,50469.39,50441.93,50465.71,50462.45,50505.38,50482.85,50440.64,50476.54,50490.24,50466.53,50433.19,50419.56,50404.41,50410.41,50431.48,50398.51,50372.01,50402.4,50415.9,50421.4,50439.01,50422.79,50438.08,50398.92,51820.65],
    "1W": [48656.51,48529.09,48565.83,48655.75,48508.88,48703.85,48477.19,51820.65],
    "1M": [50824.78,50336.62,50087.06,49685.18,49231.95,49622.51,49154.09,48472.69,48021.8,48543.57,48945.6,51820.65],
    "3M": [52057.46,52808.37,51973.89,52796.88,52582.62,53528.89,54569.81,55190.62,56281.56,56336.93,56723.11,51820.65],
    "1Y": [46818.55,46040.43,46267.5,45090.74,44035.35,43560.73,42408.19,42759.96,43974.2,44062.4,44709.31,51820.65],
    "5Y": [49925.38,47515.7,48345.38,46707.25,45606.37,44288.3,43928.92,44385.47,44328.22,51820.65],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 3.07, "1W": 6.5, "1M": 1.96,
    "3M": -0.45, "1Y": 10.68, "5Y": 3.8,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 6.5 }, { p: "1M", v: 1.96 }, { p: "3M", v: -0.45 }, { p: "6M", v: -0.72 }, { p: "1Y", v: 10.68 }, { p: "3Y", v: 33.11 }, { p: "5Y", v: 3.8 }],
  constituents: [
    { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", weight: 22.4, chg: 2.12 },
    { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", weight: 19.8, chg: -0.26 },
    { name: "State Bank of India", ticker: "SBIN", sector: "Banking", weight: 11.2, chg: -0.05 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", weight: 9.6, chg: -0.75 },
    { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", weight: 9.1, chg: 1.15 },
    { name: "IndusInd Bank", ticker: "INDUSINDBK", sector: "Banking", weight: 4.4, chg: 0.05 },
    { name: "Bank of Baroda", ticker: "BANKBARODA", sector: "Banking", weight: 3.2, chg: 0.93 },
    { name: "Punjab National Bank", ticker: "PNB", sector: "Banking", weight: 2.8, chg: -0.29 },
    { name: "IDFC First Bank", ticker: "IDFCFIRSTB", sector: "Banking", weight: 2.4, chg: 1.23 },
    { name: "AU Small Finance Bank", ticker: "AUBANK", sector: "Banking", weight: 1.9, chg: -0.78 },
  ],
  sectors: [
    { name: "Private Banks", weight: 68.4, color: "#FF0000" },
    { name: "PSU Banks", weight: 22.6, color: "#D9B27C" },
    { name: "Small Finance Banks", weight: 9.0, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "52,079.75", signal: "Buy" }, { label: "10-SMA", value: "52,442.5", signal: "Sell" }, { label: "20-SMA", value: "52,857.06", signal: "Sell" }, { label: "50-SMA", value: "51,561.55", signal: "Buy" }, { label: "200-SMA", value: "47,156.79", signal: "Buy" }, { label: "RSI (14)", value: "51.5", signal: "Neutral" }, { label: "MACD", value: "-20.3", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "Nifty 50", chg: 0.42, href: "/markets/indices/nifty-50" },
    { name: "Finnifty", chg: 1.24, href: "/markets/indices/finnifty" },
    { name: "BSE Bankex", chg: -0.92, href: "/markets/indices/bse-bankex" },
  ],
  facts: [{ label: "Base Year", value: "2000" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Sep 2003" }, { label: "Stocks", value: "12" }],
  aboutTitle: "About Nifty Bank",
  aboutParagraphs: [
    "The <strong>NIFTY BANK</strong> index tracks the performance of the most liquid and large capitalised Indian banking stocks listed on the NSE. It comprises 12 stocks from the banking sector.",
    "NIFTY BANK serves as the benchmark for the Indian banking sector and is widely used for index funds, ETFs, and derivatives trading on both private and public sector banks.",
  ],
  ctaHeadline: "Trade Nifty Bank with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyBankPage() {
  return <IndexDetailPage data={DATA} />
}

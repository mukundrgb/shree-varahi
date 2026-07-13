"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "dax",
  breadcrumbLabel: "Dax 40",
  displayName: "DAX 40",
  badge: "XETRA",
  category: "GLOBAL INDEX",
  currency: "€",
  locale: "de-DE",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 19640.15,
  change: -231.75,
  changePct: -1.18,
  advancing: 22,
  declining: 20,
  neutral: 0,
  totalConstituents: 10,
  w52High: 22917.9,
  w52Low: 17197.3,
  keyStats: [
        { label: "High", value: "19,833.41" }, { label: "Low", value: "19,574.58" },
    { label: "Open", value: "19,736.76" }, { label: "Prev Close", value: "19,871.90" },
    { label: "52W High", value: "22,917.90" }, { label: "52W Low", value: "17,197.30" },
  ],
  ohlc: { open: "19,736.76", high: "19,833.41", low: "19,574.58", close: "19,640.15" },
  chartData: {
    "1D": [18477.78,18464.96,18463.57,18468.38,18466.49,18458.93,18471.93,18458.0,18443.11,18429.62,18436.67,18425.51,18411.91,18420.88,18432.74,18446.72,18453.54,18462.27,18459.07,18475.36,18469.13,18476.75,18476.49,18488.45,18488.51,18474.49,18471.81,18475.75,18484.65,18482.06,18484.04,18482.05,18485.47,18497.46,18491.3,18493.68,18486.3,18498.82,18492.39,18487.19,18476.41,18477.46,18484.17,18471.84,18471.56,18467.01,18482.46,18489.53,18496.37,18492.97,18488.92,18488.83,18487.73,18481.71,18469.86,18453.61,18459.13,18474.1,18489.08,19640.15],
    "1W": [18637.83,18533.56,18593.09,18605.9,18685.49,18721.31,18646.6,19640.15],
    "1M": [19832.9,19595.71,19347.25,19093.88,19037.86,18832.36,18578.97,18579.7,18393.5,18205.32,18360.82,19640.15],
    "3M": [19535.33,19568.17,19232.51,18851.32,19029.38,18782.72,19038.61,18863.33,19093.12,18848.19,19120.16,19640.15],
    "1Y": [19361.85,19723.38,20079.99,20264.97,19937.91,19714.95,19202.34,19288.86,19865.03,19895.16,20000.48,19640.15],
    "5Y": [18270.77,17984.81,17441.43,17463.6,16767.37,16279.11,16170.53,16767.53,16642.26,19640.15],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 6.29, "1W": 5.38, "1M": -0.97,
    "3M": 0.54, "1Y": 1.44, "5Y": 7.49,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 5.38 }, { p: "1M", v: -0.97 }, { p: "3M", v: 0.54 }, { p: "6M", v: 0.86 }, { p: "1Y", v: 1.44 }, { p: "3Y", v: 4.46 }, { p: "5Y", v: 7.49 }],
  constituents: [
    { name: "SAP", ticker: "SAP", sector: "Technology", weight: 13.2, chg: -0.73 },
    { name: "Siemens", ticker: "SIE", sector: "Industrials", weight: 9.8, chg: 0.67 },
    { name: "Allianz", ticker: "ALV", sector: "Insurance", weight: 7.4, chg: -2.19 },
    { name: "Deutsche Telekom", ticker: "DTE", sector: "Telecom", weight: 6.6, chg: 1.93 },
    { name: "Airbus", ticker: "AIR", sector: "Industrials", weight: 5.8, chg: -1.69 },
    { name: "Mercedes-Benz Group", ticker: "MBG", sector: "Auto", weight: 4.2, chg: 0.42 },
    { name: "BASF", ticker: "BAS", sector: "Chemicals", weight: 3.6, chg: 1.41 },
    { name: "BMW", ticker: "BMW", sector: "Auto", weight: 3.4, chg: -0.38 },
    { name: "Munich Re", ticker: "MUV2", sector: "Insurance", weight: 3.1, chg: -2.03 },
    { name: "Deutsche Bank", ticker: "DBK", sector: "Financials", weight: 2.8, chg: -1.17 },
  ],
  sectors: [
    { name: "Technology", weight: 16.4, color: "#4F7CAC" },
    { name: "Industrials", weight: 18.6, color: "#D9B27C" },
    { name: "Financials & Insurance", weight: 17.2, color: "#FF0000" },
    { name: "Auto", weight: 12.8, color: "#A855F7" },
    { name: "Chemicals", weight: 8.4, color: "#22C55E" },
    { name: "Others", weight: 26.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "19,738.35", signal: "Buy" }, { label: "10-SMA", value: "19,875.83", signal: "Sell" }, { label: "20-SMA", value: "20,032.95", signal: "Sell" }, { label: "50-SMA", value: "19,541.95", signal: "Buy" }, { label: "200-SMA", value: "17,872.54", signal: "Buy" }, { label: "RSI (14)", value: "51.1", signal: "Neutral" }, { label: "MACD", value: "41.1", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "CAC 40", chg: 1.49, href: "/markets/indices/cac-40" },
    { name: "FTSE 100", chg: 0.81, href: "/markets/indices/ftse-100" },
    { name: "Dow Jones", chg: 0.22, href: "/markets/indices/dow-jones" },
  ],
  facts: [{ label: "Base Year", value: "1987" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jul 1988" }, { label: "Stocks", value: "40" }],
  aboutTitle: "About Dax 40",
  aboutParagraphs: [
    "The <strong>DAX 40</strong> tracks the 40 largest and most liquid companies listed on the Frankfurt Stock Exchange, representing Germany's blue-chip benchmark.",
    "As Europe's largest economy, Germany's DAX is closely watched for signals on Eurozone industrial output, export demand, and European Central Bank monetary policy.",
  ],
  ctaHeadline: "Invest in Dax 40 via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function DaxPage() {
  return <IndexDetailPage data={DATA} />
}

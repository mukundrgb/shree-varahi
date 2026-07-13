"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-mid-cap-50",
  breadcrumbLabel: "Nifty Midcap 50",
  displayName: "NIFTY MIDCAP 50",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 16240.85,
  change: 0.0,
  changePct: 0.0,
  advancing: 20,
  declining: 19,
  neutral: 0,
  totalConstituents: 10,
  w52High: 19673.42,
  w52Low: 12712.65,
  keyStats: [
        { label: "High", value: "16,295.73" }, { label: "Low", value: "16,165.98" },
    { label: "Open", value: "16,240.85" }, { label: "Prev Close", value: "16,240.85" },
    { label: "52W High", value: "19,673.42" }, { label: "52W Low", value: "12,712.65" },
    { label: "P/E Ratio", value: "30.52" }, { label: "P/B Ratio", value: "3.14" },
    { label: "Div Yield", value: "1.04%" }, { label: "Market Cap", value: "₹9.23L Cr" },
  ],
  ohlc: { open: "16,240.85", high: "16,295.73", low: "16,165.98", close: "16,240.85" },
  chartData: {
    "1D": [15290.81,15277.73,15283.03,15272.31,15258.9,15247.29,15243.56,15239.09,15234.57,15246.23,15252.78,15253.97,15241.22,15238.2,15250.9,15251.21,15237.74,15239.3,15252.38,15248.82,15257.22,15244.08,15243.2,15240.96,15246.07,15237.37,15228.9,15228.3,15231.34,15231.48,15227.28,15237.62,15227.29,15235.81,15223.22,15235.06,15231.48,15221.13,15209.55,15197.34,15189.36,15198.89,15200.32,15189.02,15198.34,15194.93,15200.29,15191.87,15183.92,15186.53,15183.65,15170.52,15180.22,15191.98,15205.51,15209.01,15219.66,15217.85,15217.52,16240.85],
    "1W": [14644.12,14568.56,14498.96,14585.9,14518.92,14582.81,14632.12,16240.85],
    "1M": [15084.72,15125.77,15331.5,15385.43,15239.51,15251.9,15160.86,15206.92,15009.29,15038.76,15063.76,16240.85],
    "3M": [15480.26,15640.22,15697.4,15779.63,16071.21,15784.25,15986.3,15881.52,15659.89,15796.46,15518.35,16240.85],
    "1Y": [15342.76,15682.97,15548.55,15624.54,15542.28,15551.8,15668.88,15441.56,15819.58,15407.89,15097.75,16240.85],
    "5Y": [15496.0,16264.17,16104.52,16078.74,16766.58,17588.14,18001.76,18354.04,17668.2,16240.85],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 6.21, "1W": 10.9, "1M": 7.66,
    "3M": 4.91, "1Y": 5.85, "5Y": 4.81,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 10.9 }, { p: "1M", v: 7.66 }, { p: "3M", v: 4.91 }, { p: "6M", v: 7.86 }, { p: "1Y", v: 5.85 }, { p: "3Y", v: 18.13 }, { p: "5Y", v: 4.81 }],
  constituents: [
    { name: "Punjab National Bank", ticker: "PNB", sector: "Banking", weight: 4.4, chg: -1.87 },
    { name: "Power Finance Corporation", ticker: "PFC", sector: "NBFC", weight: 4.1, chg: 1.03 },
    { name: "Polycab India", ticker: "POLYCAB", sector: "Cables", weight: 3.8, chg: 1.51 },
    { name: "Trent", ticker: "TRENT", sector: "Retail", weight: 5.2, chg: -1.04 },
    { name: "Shriram Finance", ticker: "SHRIRAMFIN", sector: "NBFC", weight: 3.6, chg: -1.82 },
    { name: "TVS Motor", ticker: "TVSMOTOR", sector: "Auto", weight: 4.0, chg: -1.51 },
    { name: "Rural Electrification Corp", ticker: "RECLTD", sector: "NBFC", weight: 3.4, chg: -0.1 },
    { name: "IDFC First Bank", ticker: "IDFCFIRSTB", sector: "Banking", weight: 2.9, chg: -0.92 },
    { name: "Zydus Lifesciences", ticker: "ZYDUSLIFE", sector: "Pharma", weight: 3.1, chg: 0.22 },
    { name: "Indian Hotels Company", ticker: "INDHOTEL", sector: "Hospitality", weight: 2.8, chg: 1.76 },
  ],
  sectors: [
    { name: "Financial Services", weight: 22.6, color: "#FF0000" },
    { name: "Consumer Discretionary", weight: 16.4, color: "#A855F7" },
    { name: "Auto", weight: 11.8, color: "#D9B27C" },
    { name: "Pharma", weight: 9.6, color: "#22C55E" },
    { name: "Industrials", weight: 8.9, color: "#F59E0B" },
    { name: "Others", weight: 30.7, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "16,322.05", signal: "Buy" }, { label: "10-SMA", value: "16,435.74", signal: "Sell" }, { label: "20-SMA", value: "16,565.67", signal: "Sell" }, { label: "50-SMA", value: "16,159.65", signal: "Buy" }, { label: "200-SMA", value: "14,779.17", signal: "Buy" }, { label: "RSI (14)", value: "50.5", signal: "Neutral" }, { label: "MACD", value: "24.8", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "Nifty 50", chg: -1.44, href: "/markets/indices/nifty-50" },
    { name: "Nifty Next 50", chg: 1.22, href: "/markets/indices/nifty-next-50" },
    { name: "BSE Mid Cap", chg: -0.94, href: "/markets/indices/bse-mid-cap" },
  ],
  facts: [{ label: "Base Year", value: "2003" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Mar 2009" }, { label: "Stocks", value: "50" }],
  aboutTitle: "About Nifty Midcap 50",
  aboutParagraphs: [
    "<strong>NIFTY MIDCAP 50</strong> tracks the performance of 50 mid-cap companies listed on the NSE, selected based on average daily turnover and free-float market capitalisation.",
    "The index is widely used as a benchmark for mid-cap mutual funds and offers exposure to companies in a growth phase between small-cap and large-cap status.",
  ],
  ctaHeadline: "Trade Nifty Midcap 50 with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyMidCap50Page() {
  return <IndexDetailPage data={DATA} />
}

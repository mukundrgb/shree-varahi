"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "sensex",
  breadcrumbLabel: "Sensex",
  displayName: "SENSEX",
  badge: "BSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 79214.3,
  change: 942.65,
  changePct: 1.19,
  advancing: 26,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 91350.72,
  w52Low: 69968.97,
  keyStats: [
        { label: "High", value: "79,503.26" }, { label: "Low", value: "78,701.97" },
    { label: "Open", value: "78,969.64" }, { label: "Prev Close", value: "78,271.65" },
    { label: "52W High", value: "91,350.72" }, { label: "52W Low", value: "69,968.97" },
    { label: "P/E Ratio", value: "26.32" }, { label: "P/B Ratio", value: "2.64" },
    { label: "Div Yield", value: "1.72%" }, { label: "Market Cap", value: "₹5.79L Cr" },
  ],
  ohlc: { open: "78,969.64", high: "79,503.26", low: "78,701.97", close: "79,214.30" },
  chartData: {
    "1D": [82756.61,82764.13,82693.14,82621.86,82614.94,82567.92,82631.35,82686.55,82672.86,82610.28,82598.24,82622.16,82658.68,82611.84,82588.34,82541.53,82530.15,82512.02,82573.8,82543.32,82580.24,82521.14,82480.71,82540.03,82597.15,82637.12,82663.43,82692.49,82666.14,82698.15,82695.9,82755.7,82715.98,82710.69,82705.73,82694.41,82759.39,82726.97,82674.29,82613.56,82634.54,82615.57,82619.11,82660.46,82732.2,82665.17,82666.21,82592.21,82522.35,82475.03,82487.4,82512.67,82478.72,82463.19,82524.41,82456.28,82438.57,82377.08,82421.73,79214.3],
    "1W": [73087.8,73109.22,72953.36,72576.91,72966.65,73303.36,73590.79,79214.3],
    "1M": [71788.46,72420.2,73201.77,73870.21,73053.51,73901.93,74300.64,74465.08,75171.04,74308.77,74234.37,79214.3],
    "3M": [79199.84,78066.71,76599.34,76434.49,76402.22,76769.23,76638.8,75341.56,73900.41,73894.43,74095.01,79214.3],
    "1Y": [77054.34,76931.82,77604.74,77753.15,75963.95,75166.32,75810.47,76132.38,77468.3,77249.46,76833.15,79214.3],
    "5Y": [77194.06,73824.32,77034.54,76807.18,76386.86,79615.55,77140.92,74775.16,72953.63,79214.3],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -4.28, "1W": 8.38, "1M": 10.34,
    "3M": 0.02, "1Y": 2.8, "5Y": 2.62,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 8.38 }, { p: "1M", v: 10.34 }, { p: "3M", v: 0.02 }, { p: "6M", v: 0.03 }, { p: "1Y", v: 2.8 }, { p: "3Y", v: 8.68 }, { p: "5Y", v: 2.62 }],
  constituents: [
    { name: "Reliance Industries", ticker: "RELIANCE", sector: "Energy", weight: 11.8, chg: -0.09 },
    { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", weight: 10.2, chg: -1.2 },
    { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", weight: 8.4, chg: 2.04 },
    { name: "Infosys", ticker: "INFY", sector: "IT", weight: 6.1, chg: -0.1 },
    { name: "TCS", ticker: "TCS", sector: "IT", weight: 5.4, chg: -0.76 },
    { name: "ITC", ticker: "ITC", sector: "FMCG", weight: 4.0, chg: 1.83 },
    { name: "L&T", ticker: "LT", sector: "Infra", weight: 3.6, chg: -1.79 },
    { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", weight: 3.2, chg: 0.98 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", weight: 3.0, chg: 0.86 },
    { name: "Bharti Airtel", ticker: "BHARTIARTL", sector: "Telecom", weight: 4.2, chg: -0.8 },
  ],
  sectors: [
    { name: "Banking & Finance", weight: 29.1, color: "#FF0000" },
    { name: "IT", weight: 14.6, color: "#4F7CAC" },
    { name: "Energy", weight: 13.2, color: "#D9B27C" },
    { name: "FMCG", weight: 8.9, color: "#22C55E" },
    { name: "Auto", weight: 5.8, color: "#A855F7" },
    { name: "Infra", weight: 5.1, color: "#F59E0B" },
    { name: "Telecom", weight: 4.2, color: "#14B8A6" },
    { name: "Pharma", weight: 4.0, color: "#EC4899" },
    { name: "Others", weight: 15.1, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "79,610.37", signal: "Buy" }, { label: "10-SMA", value: "80,164.87", signal: "Sell" }, { label: "20-SMA", value: "80,798.59", signal: "Sell" }, { label: "50-SMA", value: "78,818.23", signal: "Buy" }, { label: "200-SMA", value: "72,085.01", signal: "Buy" }, { label: "RSI (14)", value: "58.9", signal: "Neutral" }, { label: "MACD", value: "93.5", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Nifty 50", chg: -0.06, href: "/markets/indices/nifty-50" },
    { name: "Nifty Bank", chg: -0.1, href: "/markets/indices/nifty-bank" },
    { name: "BSE Bankex", chg: -0.03, href: "/markets/indices/bse-bankex" },
  ],
  facts: [{ label: "Base Year", value: "1978-79" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "Jan 1986" }, { label: "Stocks", value: "30" }],
  aboutTitle: "About Sensex",
  aboutParagraphs: [
    "The <strong>S&P BSE SENSEX</strong> (Sensitive Index) is the benchmark index of the Bombay Stock Exchange (BSE), comprising 30 of the largest and most actively traded stocks representing key sectors of the Indian economy.",
    "First published in 1986 with a base year of 1978-79, SENSEX is one of the oldest stock indices in Asia and is widely tracked as a barometer of the Indian stock market and economy.",
  ],
  ctaHeadline: "Trade Sensex with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function SensexPage() {
  return <IndexDetailPage data={DATA} />
}

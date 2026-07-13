"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "sp-500",
  breadcrumbLabel: "S&P 500",
  displayName: "S&P 500",
  badge: "NYSE",
  category: "GLOBAL INDEX",
  currency: "$",
  locale: "en-US",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 5890.2,
  change: 2.36,
  changePct: 0.04,
  advancing: 24,
  declining: 17,
  neutral: 0,
  totalConstituents: 10,
  w52High: 6503.92,
  w52Low: 4564.92,
  keyStats: [
        { label: "High", value: "5,922.92" }, { label: "Low", value: "5,881.73" },
    { label: "Open", value: "5,889.32" }, { label: "Prev Close", value: "5,887.84" },
    { label: "52W High", value: "6,503.92" }, { label: "52W Low", value: "4,564.92" },
  ],
  ohlc: { open: "5,889.32", high: "5,922.92", low: "5,881.73", close: "5,890.20" },
  chartData: {
    "1D": [5458.99,5454.47,5455.58,5459.46,5461.89,5459.74,5458.43,5458.24,5461.32,5461.34,5459.84,5456.65,5454.29,5453.03,5457.57,5455.37,5458.0,5456.98,5461.01,5461.17,5461.87,5464.78,5464.15,5461.13,5458.38,5457.69,5461.03,5456.67,5459.69,5460.04,5456.51,5457.98,5456.26,5453.19,5452.57,5456.39,5457.74,5455.45,5460.08,5455.61,5454.1,5451.79,5453.08,5448.73,5449.99,5452.67,5448.42,5448.16,5450.27,5449.16,5448.06,5448.71,5453.58,5455.6,5453.17,5455.04,5458.53,5462.51,5460.79,5890.2],
    "1W": [5631.61,5622.73,5591.11,5582.79,5612.54,5589.36,5594.71,5890.2],
    "1M": [5930.98,5951.9,6032.87,6069.78,6090.11,6096.1,6143.22,6194.17,6197.05,6115.15,6181.39,5890.2],
    "3M": [5467.88,5510.21,5423.22,5367.99,5441.45,5545.24,5518.62,5541.1,5559.14,5660.12,5682.42,5890.2],
    "1Y": [5553.55,5721.22,5908.03,6058.77,6243.53,6397.97,6593.38,6771.33,6798.83,6961.27,6873.73,5890.2],
    "5Y": [5758.51,5887.5,6077.73,6283.1,6130.96,6078.15,5950.32,6149.07,6348.27,5890.2],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 7.9, "1W": 4.59, "1M": -0.69,
    "3M": 7.72, "1Y": 6.06, "5Y": 2.29,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 4.59 }, { p: "1M", v: -0.69 }, { p: "3M", v: 7.72 }, { p: "6M", v: 12.35 }, { p: "1Y", v: 6.06 }, { p: "3Y", v: 18.79 }, { p: "5Y", v: 2.29 }],
  constituents: [
    { name: "Apple", ticker: "AAPL", sector: "Technology", weight: 7.2, chg: 0.15 },
    { name: "Microsoft", ticker: "MSFT", sector: "Technology", weight: 6.8, chg: 0.61 },
    { name: "NVIDIA", ticker: "NVDA", sector: "Technology", weight: 6.4, chg: 0.39 },
    { name: "Amazon", ticker: "AMZN", sector: "Consumer", weight: 3.9, chg: -1.28 },
    { name: "Alphabet", ticker: "GOOGL", sector: "Communication", weight: 3.6, chg: -1.62 },
    { name: "Meta Platforms", ticker: "META", sector: "Communication", weight: 2.6, chg: -1.95 },
    { name: "Berkshire Hathaway", ticker: "BRK.B", sector: "Financials", weight: 1.8, chg: -0.99 },
    { name: "Eli Lilly", ticker: "LLY", sector: "Healthcare", weight: 1.6, chg: 1.8 },
    { name: "Broadcom", ticker: "AVGO", sector: "Technology", weight: 1.5, chg: 0.06 },
    { name: "JPMorgan Chase", ticker: "JPM", sector: "Financials", weight: 1.4, chg: 1.78 },
  ],
  sectors: [
    { name: "Technology", weight: 31.4, color: "#4F7CAC" },
    { name: "Financials", weight: 13.2, color: "#FF0000" },
    { name: "Healthcare", weight: 11.8, color: "#22C55E" },
    { name: "Consumer Discretionary", weight: 10.6, color: "#A855F7" },
    { name: "Communication Services", weight: 9.4, color: "#D9B27C" },
    { name: "Others", weight: 23.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "5,919.65", signal: "Buy" }, { label: "10-SMA", value: "5,960.88", signal: "Sell" }, { label: "20-SMA", value: "6,008.0", signal: "Sell" }, { label: "50-SMA", value: "5,860.75", signal: "Buy" }, { label: "200-SMA", value: "5,360.08", signal: "Buy" }, { label: "RSI (14)", value: "48.4", signal: "Neutral" }, { label: "MACD", value: "108.7", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "Dow Jones", chg: 0.33, href: "/markets/indices/dow-jones" },
    { name: "NASDAQ", chg: 0.17, href: "/markets/indices/nasdaq" },
    { name: "FTSE 100", chg: -0.7, href: "/markets/indices/ftse-100" },
  ],
  facts: [{ label: "Base Year", value: "1957" }, { label: "Base Value", value: "10" }, { label: "Launched", value: "Mar 1957" }, { label: "Stocks", value: "503" }],
  aboutTitle: "About S&P 500",
  aboutParagraphs: [
    "The <strong>S&amp;P 500</strong> is a market-capitalisation weighted index tracking 500 of the largest publicly traded US companies, widely regarded as the best gauge of large-cap US equities.",
    "Maintained by S&amp;P Dow Jones Indices, the S&amp;P 500 covers roughly 80% of available US market capitalisation and underlies trillions of dollars in index funds and ETFs globally.",
  ],
  ctaHeadline: "Invest in S&P 500 via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function Sp500Page() {
  return <IndexDetailPage data={DATA} />
}

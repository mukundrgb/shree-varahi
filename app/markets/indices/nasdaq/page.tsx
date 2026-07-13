"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nasdaq",
  breadcrumbLabel: "Nasdaq Composite",
  displayName: "NASDAQ COMPOSITE",
  badge: "NASDAQ",
  category: "GLOBAL INDEX",
  currency: "$",
  locale: "en-US",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 19420.8,
  change: 0.0,
  changePct: 0.0,
  advancing: 25,
  declining: 15,
  neutral: 0,
  totalConstituents: 10,
  w52High: 23518.35,
  w52Low: 14503.28,
  keyStats: [
        { label: "High", value: "19,503.52" }, { label: "Low", value: "19,397.14" },
    { label: "Open", value: "19,420.80" }, { label: "Prev Close", value: "19,420.80" },
    { label: "52W High", value: "23,518.35" }, { label: "52W Low", value: "14,503.28" },
  ],
  ohlc: { open: "19,420.80", high: "19,503.52", low: "19,397.14", close: "19,420.80" },
  chartData: {
    "1D": [20305.12,20294.92,20287.81,20304.84,20322.64,20340.1,20323.99,20335.07,20335.86,20331.07,20345.97,20351.51,20342.55,20357.15,20345.3,20346.75,20347.36,20341.59,20346.28,20344.16,20345.01,20354.23,20347.09,20338.63,20341.87,20324.49,20335.1,20344.57,20350.41,20339.75,20331.41,20338.75,20334.51,20347.02,20362.21,20373.36,20360.4,20356.9,20342.29,20356.69,20366.76,20356.94,20358.33,20345.92,20341.23,20358.71,20343.31,20360.3,20370.37,20387.06,20401.14,20383.59,20378.23,20364.69,20369.6,20353.66,20335.96,20318.28,20314.22,19420.8],
    "1W": [20169.12,20190.25,20249.05,20215.0,20221.13,20170.48,20270.4,19420.8],
    "1M": [19251.83,19345.98,19426.49,19391.43,19160.66,19196.44,19016.35,19002.38,18850.38,18639.83,18674.75,19420.8],
    "3M": [19284.86,19095.27,19463.0,19202.47,19035.88,19382.3,19419.63,19496.33,19458.09,19605.06,19687.92,19420.8],
    "1Y": [18749.64,19292.9,19424.39,18997.57,19174.55,19786.41,19555.98,20066.46,20453.31,20311.02,20243.96,19420.8],
    "5Y": [18670.04,19336.7,19383.38,20347.01,19830.86,19244.48,18602.69,18898.85,18953.26,19420.8],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -4.36, "1W": -3.71, "1M": 0.88,
    "3M": 0.7, "1Y": 3.58, "5Y": 4.02,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -3.71 }, { p: "1M", v: 0.88 }, { p: "3M", v: 0.7 }, { p: "6M", v: 1.12 }, { p: "1Y", v: 3.58 }, { p: "3Y", v: 11.1 }, { p: "5Y", v: 4.02 }],
  constituents: [
    { name: "Apple", ticker: "AAPL", sector: "Technology", weight: 11.4, chg: 0.35 },
    { name: "Microsoft", ticker: "MSFT", sector: "Technology", weight: 9.8, chg: 1.18 },
    { name: "NVIDIA", ticker: "NVDA", sector: "Technology", weight: 9.2, chg: 1.97 },
    { name: "Amazon", ticker: "AMZN", sector: "Consumer", weight: 6.1, chg: 1.64 },
    { name: "Broadcom", ticker: "AVGO", sector: "Technology", weight: 4.4, chg: 0.24 },
    { name: "Meta Platforms", ticker: "META", sector: "Communication", weight: 4.2, chg: -1.69 },
    { name: "Alphabet", ticker: "GOOGL", sector: "Communication", weight: 4.0, chg: 1.64 },
    { name: "Tesla", ticker: "TSLA", sector: "Auto", weight: 3.6, chg: -0.21 },
    { name: "Costco", ticker: "COST", sector: "Retail", weight: 2.4, chg: -1.43 },
    { name: "Netflix", ticker: "NFLX", sector: "Communication", weight: 2.1, chg: -1.39 },
  ],
  sectors: [
    { name: "Technology", weight: 48.6, color: "#4F7CAC" },
    { name: "Communication Services", weight: 15.8, color: "#FF0000" },
    { name: "Consumer Discretionary", weight: 13.4, color: "#A855F7" },
    { name: "Healthcare", weight: 7.6, color: "#22C55E" },
    { name: "Industrials", weight: 5.2, color: "#D9B27C" },
    { name: "Others", weight: 9.4, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "19,517.9", signal: "Buy" }, { label: "10-SMA", value: "19,653.85", signal: "Sell" }, { label: "20-SMA", value: "19,809.22", signal: "Sell" }, { label: "50-SMA", value: "19,323.7", signal: "Buy" }, { label: "200-SMA", value: "17,672.93", signal: "Buy" }, { label: "RSI (14)", value: "44.4", signal: "Neutral" }, { label: "MACD", value: "-76.5", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "S&P 500", chg: -0.99, href: "/markets/indices/sp-500" },
    { name: "Dow Jones", chg: -0.75, href: "/markets/indices/dow-jones" },
    { name: "Hang Seng", chg: 1.56, href: "/markets/indices/hang-seng" },
  ],
  facts: [{ label: "Base Year", value: "1971" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "Feb 1971" }, { label: "Stocks", value: "~3,300" }],
  aboutTitle: "About Nasdaq Composite",
  aboutParagraphs: [
    "The <strong>NASDAQ Composite</strong> tracks nearly all stocks listed on the Nasdaq stock exchange, heavily weighted toward technology and growth companies.",
    "Given its concentration in technology, biotech, and internet companies, the Nasdaq Composite is closely watched as a leading indicator of growth stock sentiment and innovation-sector performance.",
  ],
  ctaHeadline: "Invest in Nasdaq Composite via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function NasdaqPage() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nikkei-225",
  breadcrumbLabel: "Nikkei 225",
  displayName: "NIKKEI 225",
  badge: "TSE",
  category: "GLOBAL INDEX",
  currency: "¥",
  locale: "ja-JP",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 39280.6,
  change: 322.1,
  changePct: 0.82,
  advancing: 18,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 45261.02,
  w52Low: 30009.77,
  keyStats: [
        { label: "High", value: "39,446.02" }, { label: "Low", value: "38,991.59" },
    { label: "Open", value: "39,181.09" }, { label: "Prev Close", value: "38,958.50" },
    { label: "52W High", value: "45,261.02" }, { label: "52W Low", value: "30,009.77" },
  ],
  ohlc: { open: "39,181.09", high: "39,446.02", low: "38,991.59", close: "39,280.60" },
  chartData: {
    "1D": [38457.23,38455.93,38485.03,38457.18,38482.0,38453.88,38433.97,38411.7,38398.84,38415.39,38429.35,38413.06,38429.14,38413.82,38382.32,38352.5,38373.28,38361.58,38328.82,38328.21,38298.36,38308.25,38287.36,38253.55,38225.76,38237.94,38245.88,38262.97,38271.81,38278.0,38287.05,38293.26,38306.93,38285.42,38252.66,38254.77,38278.3,38264.35,38237.45,38233.89,38211.03,38191.07,38161.75,38136.12,38141.98,38110.56,38097.18,38111.6,38109.72,38121.02,38134.7,38125.82,38109.83,38136.41,38153.1,38152.18,38119.82,38150.64,38149.99,39280.6],
    "1W": [35816.2,35873.18,35812.09,35616.06,35718.37,35787.88,35931.98,39280.6],
    "1M": [40270.16,40680.28,40201.48,40358.53,40590.02,40977.18,40636.89,40979.67,41366.53,41585.79,41462.68,39280.6],
    "3M": [39108.2,39127.28,38413.95,38142.83,37831.22,37577.08,38010.91,38244.54,37946.6,38349.15,37776.71,39280.6],
    "1Y": [36310.79,35984.03,34821.89,35319.32,35371.18,35980.25,35442.02,35817.51,35785.4,35753.03,35466.46,39280.6],
    "5Y": [37206.97,35641.83,34672.57,36271.66,36310.91,36721.35,34995.39,36130.89,37715.9,39280.6],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 2.14, "1W": 9.67, "1M": -2.46,
    "3M": 0.44, "1Y": 8.18, "5Y": 5.57,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 9.67 }, { p: "1M", v: -2.46 }, { p: "3M", v: 0.44 }, { p: "6M", v: 0.7 }, { p: "1Y", v: 8.18 }, { p: "3Y", v: 25.36 }, { p: "5Y", v: 5.57 }],
  constituents: [
    { name: "Fast Retailing", ticker: "9983", sector: "Retail", weight: 10.8, chg: -2.08 },
    { name: "Tokyo Electron", ticker: "8035", sector: "Technology", weight: 7.4, chg: -1.35 },
    { name: "SoftBank Group", ticker: "9984", sector: "Telecom", weight: 6.2, chg: 2.0 },
    { name: "Advantest", ticker: "6857", sector: "Technology", weight: 5.6, chg: -0.33 },
    { name: "KDDI", ticker: "9433", sector: "Telecom", weight: 3.8, chg: 0.37 },
    { name: "Fanuc", ticker: "6954", sector: "Industrials", weight: 3.4, chg: 1.13 },
    { name: "Sony Group", ticker: "6758", sector: "Technology", weight: 3.2, chg: -1.59 },
    { name: "Toyota Motor", ticker: "7203", sector: "Auto", weight: 2.9, chg: -0.61 },
    { name: "Terumo", ticker: "4543", sector: "Healthcare", weight: 2.4, chg: 0.16 },
    { name: "Mitsubishi UFJ", ticker: "8306", sector: "Financials", weight: 2.1, chg: -2.15 },
  ],
  sectors: [
    { name: "Technology", weight: 26.4, color: "#4F7CAC" },
    { name: "Consumer Discretionary", weight: 18.6, color: "#A855F7" },
    { name: "Industrials", weight: 14.8, color: "#D9B27C" },
    { name: "Telecom", weight: 10.2, color: "#FF0000" },
    { name: "Financials", weight: 9.4, color: "#22C55E" },
    { name: "Others", weight: 20.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "39,477.0", signal: "Buy" }, { label: "10-SMA", value: "39,751.97", signal: "Sell" }, { label: "20-SMA", value: "40,066.21", signal: "Sell" }, { label: "50-SMA", value: "39,084.2", signal: "Buy" }, { label: "200-SMA", value: "35,745.35", signal: "Buy" }, { label: "RSI (14)", value: "43.8", signal: "Neutral" }, { label: "MACD", value: "79.8", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Hang Seng", chg: 1.25, href: "/markets/indices/hang-seng" },
    { name: "S&P 500", chg: -1.14, href: "/markets/indices/sp-500" },
    { name: "DAX 40", chg: 0.72, href: "/markets/indices/dax" },
  ],
  facts: [{ label: "Base Year", value: "1949" }, { label: "Base Value", value: "176.21" }, { label: "Launched", value: "May 1949" }, { label: "Stocks", value: "225" }],
  aboutTitle: "About Nikkei 225",
  aboutParagraphs: [
    "The <strong>Nikkei 225</strong> is a price-weighted index of 225 large, publicly-owned companies listed on the Tokyo Stock Exchange, serving as Japan's primary equity benchmark.",
    "As Asia's oldest stock index, the Nikkei is closely watched for signals on Japanese corporate earnings, the yen's exchange rate, and Bank of Japan monetary policy.",
  ],
  ctaHeadline: "Invest in Nikkei 225 via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function Nikkei225Page() {
  return <IndexDetailPage data={DATA} />
}

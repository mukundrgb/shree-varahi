"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "kospi",
  breadcrumbLabel: "Kospi",
  displayName: "KOSPI",
  badge: "KRX",
  category: "GLOBAL INDEX",
  currency: "₩",
  locale: "ko-KR",
  asOf: "13 Jul 2026 · 15:30 IST",
  price: 2680.4,
  change: 6.43,
  changePct: 0.24,
  advancing: 17,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 3118.46,
  w52Low: 2160.65,
  keyStats: [
        { label: "High", value: "2,683.45" }, { label: "Low", value: "2,673.51" },
    { label: "Open", value: "2,679.02" }, { label: "Prev Close", value: "2,673.97" },
    { label: "52W High", value: "3,118.46" }, { label: "52W Low", value: "2,160.65" },
  ],
  ohlc: { open: "2,679.02", high: "2,683.45", low: "2,673.51", close: "2,680.40" },
  chartData: {
    "1D": [2622.12,2622.94,2621.58,2623.64,2623.38,2623.47,2623.78,2622.34,2624.49,2622.29,2621.7,2622.24,2623.9,2622.41,2622.76,2621.71,2622.24,2622.3,2620.68,2618.54,2619.28,2616.99,2617.19,2616.15,2616.23,2617.38,2616.36,2618.13,2619.14,2618.63,2617.01,2617.26,2616.85,2615.43,2615.87,2615.03,2612.94,2611.59,2612.54,2613.09,2612.27,2612.28,2610.55,2612.26,2613.83,2612.69,2611.85,2610.94,2610.61,2609.99,2608.41,2609.34,2607.91,2608.22,2607.29,2606.1,2603.78,2603.43,2602.16,2680.4],
    "1W": [2631.94,2626.45,2633.79,2630.72,2643.35,2627.98,2632.07,2680.4],
    "1M": [2492.72,2489.16,2468.45,2480.17,2508.4,2493.25,2474.36,2508.11,2513.93,2503.5,2498.09,2680.4],
    "3M": [2812.63,2833.64,2783.67,2788.85,2797.99,2815.75,2852.04,2890.05,2845.71,2827.4,2850.28,2680.4],
    "1Y": [2571.11,2497.78,2505.04,2497.14,2529.71,2485.75,2419.31,2430.27,2445.21,2482.71,2452.16,2680.4],
    "5Y": [2542.22,2594.5,2551.51,2521.74,2560.67,2558.45,2558.97,2530.43,2467.9,2680.4],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 2.22, "1W": 1.84, "1M": 7.53,
    "3M": -4.7, "1Y": 4.25, "5Y": 5.44,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 1.84 }, { p: "1M", v: 7.53 }, { p: "3M", v: -4.7 }, { p: "6M", v: -7.52 }, { p: "1Y", v: 4.25 }, { p: "3Y", v: 13.18 }, { p: "5Y", v: 5.44 }],
  constituents: [
    { name: "Samsung Electronics", ticker: "005930", sector: "Technology", weight: 19.8, chg: -0.73 },
    { name: "SK Hynix", ticker: "000660", sector: "Technology", weight: 8.4, chg: -0.97 },
    { name: "LG Energy Solution", ticker: "373220", sector: "Industrials", weight: 4.2, chg: 0.2 },
    { name: "Samsung Biologics", ticker: "207940", sector: "Healthcare", weight: 3.6, chg: 1.88 },
    { name: "Hyundai Motor", ticker: "005380", sector: "Auto", weight: 3.1, chg: 1.79 },
    { name: "Celltrion", ticker: "068270", sector: "Healthcare", weight: 2.4, chg: 1.3 },
    { name: "Kia Corp", ticker: "000270", sector: "Auto", weight: 2.2, chg: 1.43 },
    { name: "KB Financial", ticker: "105560", sector: "Financials", weight: 2.0, chg: -0.72 },
    { name: "NAVER", ticker: "035420", sector: "Technology", weight: 1.9, chg: 0.65 },
    { name: "Samsung SDI", ticker: "006400", sector: "Industrials", weight: 1.7, chg: 1.09 },
  ],
  sectors: [
    { name: "Technology", weight: 34.6, color: "#4F7CAC" },
    { name: "Auto", weight: 12.8, color: "#A855F7" },
    { name: "Financials", weight: 11.4, color: "#FF0000" },
    { name: "Healthcare", weight: 9.6, color: "#22C55E" },
    { name: "Industrials", weight: 8.8, color: "#D9B27C" },
    { name: "Others", weight: 22.8, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "2,693.8", signal: "Buy" }, { label: "10-SMA", value: "2,712.56", signal: "Sell" }, { label: "20-SMA", value: "2,734.01", signal: "Sell" }, { label: "50-SMA", value: "2,667.0", signal: "Buy" }, { label: "200-SMA", value: "2,439.16", signal: "Buy" }, { label: "RSI (14)", value: "50.2", signal: "Neutral" }, { label: "MACD", value: "25.1", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "Nikkei 225", chg: 0.48, href: "/markets/indices/nikkei-225" },
    { name: "Shanghai Composite", chg: -0.18, href: "/markets/indices/sse-composite" },
    { name: "Hang Seng", chg: -0.8, href: "/markets/indices/hang-seng" },
  ],
  facts: [{ label: "Base Year", value: "1980" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "Jan 1983" }, { label: "Stocks", value: "~800" }],
  aboutTitle: "About Kospi",
  aboutParagraphs: [
    "The <strong>KOSPI</strong> (Korea Composite Stock Price Index) tracks all common stocks listed on the Korea Exchange, dominated by Samsung Electronics and the memory chip sector.",
    "KOSPI is a key indicator of South Korean export competitiveness, particularly in semiconductors, batteries, and consumer electronics.",
  ],
  ctaHeadline: "Invest in Kospi via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function KospiPage() {
  return <IndexDetailPage data={DATA} />
}

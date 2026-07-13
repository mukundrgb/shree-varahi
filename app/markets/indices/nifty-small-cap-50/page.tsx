"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-small-cap-50",
  breadcrumbLabel: "Nifty Smallcap 50",
  displayName: "NIFTY SMALLCAP 50",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 15840.3,
  change: -77.62,
  changePct: -0.49,
  advancing: 22,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 18452.69,
  w52Low: 13864.7,
  keyStats: [
        { label: "High", value: "15,903.52" }, { label: "Low", value: "15,770.84" },
    { label: "Open", value: "15,884.50" }, { label: "Prev Close", value: "15,917.92" },
    { label: "52W High", value: "18,452.69" }, { label: "52W Low", value: "13,864.70" },
    { label: "P/E Ratio", value: "31.63" }, { label: "P/B Ratio", value: "2.4" },
    { label: "Div Yield", value: "1.69%" }, { label: "Market Cap", value: "₹5.8L Cr" },
  ],
  ohlc: { open: "15,884.50", high: "15,903.52", low: "15,770.84", close: "15,840.30" },
  chartData: {
    "1D": [15056.79,15062.65,15061.49,15057.89,15055.16,15042.83,15040.46,15052.56,15039.79,15052.73,15044.3,15046.58,15057.55,15051.21,15052.24,15056.88,15061.13,15066.48,15078.05,15090.87,15089.1,15092.95,15091.65,15095.67,15101.9,15107.98,15097.66,15109.61,15100.72,15087.38,15090.53,15093.28,15095.37,15103.4,15104.24,15101.98,15104.88,15094.36,15082.2,15084.57,15087.57,15082.02,15071.32,15072.86,15074.14,15081.44,15074.39,15086.83,15090.71,15083.78,15072.59,15062.1,15065.56,15055.59,15061.6,15068.04,15067.91,15054.82,15062.24,15840.3],
    "1W": [16083.95,16147.24,16085.64,16075.45,16040.45,16041.53,16084.65,15840.3],
    "1M": [14294.48,14438.85,14502.14,14684.86,14654.16,14507.85,14560.4,14447.8,14275.24,14286.38,14415.35,15840.3],
    "3M": [16362.64,16628.8,16300.7,16130.57,16018.26,15776.36,15925.97,15632.17,15900.54,15637.32,15742.59,15840.3],
    "1Y": [15754.07,15939.94,16467.76,16004.56,15664.08,15340.44,15030.02,15212.97,15246.79,14811.59,15253.67,15840.3],
    "5Y": [14845.57,14297.76,13674.43,13322.07,13262.8,12989.52,13182.19,13310.59,12980.72,15840.3],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 5.2, "1W": -1.51, "1M": 10.81,
    "3M": -3.19, "1Y": 0.55, "5Y": 6.7,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -1.51 }, { p: "1M", v: 10.81 }, { p: "3M", v: -3.19 }, { p: "6M", v: -5.1 }, { p: "1Y", v: 0.55 }, { p: "3Y", v: 1.71 }, { p: "5Y", v: 6.7 }],
  constituents: [
    { name: "Indian Overseas Bank", ticker: "IOB", sector: "Banking", weight: 4.2, chg: -2.01 },
    { name: "IDBI Bank", ticker: "IDBI", sector: "Banking", weight: 3.8, chg: 0.73 },
    { name: "UCO Bank", ticker: "UCOBANK", sector: "Banking", weight: 3.4, chg: 0.36 },
    { name: "Mazagon Dock Shipbuilders", ticker: "MAZDOCK", sector: "Defence", weight: 4.6, chg: -2.15 },
    { name: "Rail Vikas Nigam", ticker: "RVNL", sector: "Infra", weight: 4.1, chg: 1.62 },
    { name: "Suzlon Energy", ticker: "SUZLON", sector: "Power", weight: 3.9, chg: 2.1 },
    { name: "Bank of Maharashtra", ticker: "MAHABANK", sector: "Banking", weight: 3.2, chg: -1.84 },
    { name: "IDFC", ticker: "IDFC", sector: "Financial Services", weight: 2.8, chg: 1.76 },
    { name: "NALCO", ticker: "NATIONALUM", sector: "Metals", weight: 3.0, chg: -1.12 },
    { name: "BSE", ticker: "BSE", sector: "Exchange", weight: 3.6, chg: -0.2 },
  ],
  sectors: [
    { name: "PSU Banks", weight: 18.4, color: "#FF0000" },
    { name: "Infra & Defence", weight: 16.8, color: "#D9B27C" },
    { name: "Power", weight: 12.6, color: "#22C55E" },
    { name: "Metals", weight: 10.4, color: "#94A3B8" },
    { name: "Financial Services", weight: 9.8, color: "#F59E0B" },
    { name: "Others", weight: 31.9, color: "#A855F7" },
  ],
  technicals: [{ label: "5-SMA", value: "15,919.5", signal: "Buy" }, { label: "10-SMA", value: "16,030.38", signal: "Sell" }, { label: "20-SMA", value: "16,157.11", signal: "Sell" }, { label: "50-SMA", value: "15,761.1", signal: "Buy" }, { label: "200-SMA", value: "14,414.67", signal: "Buy" }, { label: "RSI (14)", value: "57.4", signal: "Neutral" }, { label: "MACD", value: "28.1", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "Nifty 50", chg: -1.32, href: "/markets/indices/nifty-50" },
    { name: "BSE Small Cap", chg: -0.66, href: "/markets/indices/bse-small-cap" },
    { name: "Nifty Mid Cap 50", chg: -1.57, href: "/markets/indices/nifty-mid-cap-50" },
  ],
  facts: [{ label: "Base Year", value: "2003" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jan 2003" }, { label: "Stocks", value: "50" }],
  aboutTitle: "About Nifty Smallcap 50",
  aboutParagraphs: [
    "<strong>NIFTY SMALLCAP 50</strong> tracks the performance of 50 tradeable small-cap companies listed on the NSE, selected for liquidity and free-float market capitalisation.",
    "The index is popular among traders and momentum investors given the higher volatility and growth potential typically associated with small-cap stocks.",
  ],
  ctaHeadline: "Trade Nifty Smallcap 50 with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftySmallCap50Page() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "hang-seng",
  breadcrumbLabel: "Hang Seng Index",
  displayName: "HANG SENG INDEX",
  badge: "HKEX",
  category: "GLOBAL INDEX",
  currency: "HK$",
  locale: "en-US",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 19840.25,
  change: 259.91,
  changePct: 1.31,
  advancing: 20,
  declining: 14,
  neutral: 0,
  totalConstituents: 10,
  w52High: 22506.81,
  w52Low: 15581.75,
  keyStats: [
        { label: "High", value: "19,934.44" }, { label: "Low", value: "19,650.47" },
    { label: "Open", value: "19,757.78" }, { label: "Prev Close", value: "19,580.34" },
    { label: "52W High", value: "22,506.81" }, { label: "52W Low", value: "15,581.75" },
  ],
  ohlc: { open: "19,757.78", high: "19,934.44", low: "19,650.47", close: "19,840.25" },
  chartData: {
    "1D": [20083.09,20086.29,20102.87,20089.65,20079.04,20077.55,20069.98,20086.27,20074.04,20082.73,20075.39,20057.46,20072.52,20056.12,20064.96,20060.97,20068.12,20058.34,20052.75,20055.95,20044.18,20030.05,20034.58,20038.09,20023.67,20012.57,20016.76,20033.9,20023.5,20024.33,20038.13,20022.28,20010.72,20010.47,19999.78,20007.16,20018.85,20006.81,20007.79,20020.21,20019.11,20017.72,20016.29,20033.75,20048.18,20047.66,20055.05,20055.12,20067.47,20066.12,20051.93,20047.98,20045.99,20037.43,20038.35,20033.4,20044.39,20049.22,20038.14,19840.25],
    "1W": [18779.67,18719.99,18830.85,18828.85,18830.15,18795.02,18830.57,19840.25],
    "1M": [18253.84,18428.16,18542.91,18629.44,18427.18,18386.4,18304.21,18310.6,18556.73,18669.01,18881.86,19840.25],
    "3M": [17974.34,18099.07,17746.98,17400.55,17441.18,17535.1,17845.9,17753.38,17655.57,17421.93,17458.13,19840.25],
    "1Y": [20212.51,20612.88,20100.84,20151.71,19666.05,20185.53,20658.93,20991.29,20304.65,20950.26,21636.37,19840.25],
    "5Y": [18337.92,18991.4,19296.49,19453.56,18706.92,19141.11,18412.53,18890.61,18767.21,19840.25],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -1.21, "1W": 5.65, "1M": 8.69,
    "3M": 10.38, "1Y": -1.84, "5Y": 8.19,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 5.65 }, { p: "1M", v: 8.69 }, { p: "3M", v: 10.38 }, { p: "6M", v: 16.61 }, { p: "1Y", v: -1.84 }, { p: "3Y", v: -5.7 }, { p: "5Y", v: 8.19 }],
  constituents: [
    { name: "Tencent Holdings", ticker: "0700", sector: "Technology", weight: 10.4, chg: -1.0 },
    { name: "AIA Group", ticker: "1299", sector: "Insurance", weight: 8.2, chg: 1.13 },
    { name: "HSBC Holdings", ticker: "0005", sector: "Financials", weight: 7.6, chg: -0.12 },
    { name: "Alibaba Group", ticker: "9988", sector: "Technology", weight: 7.1, chg: 0.47 },
    { name: "Meituan", ticker: "3690", sector: "Technology", weight: 5.4, chg: 0.38 },
    { name: "China Construction Bank", ticker: "0939", sector: "Financials", weight: 4.8, chg: -0.96 },
    { name: "Ping An Insurance", ticker: "2318", sector: "Insurance", weight: 4.2, chg: -0.54 },
    { name: "JD.com", ticker: "9618", sector: "Technology", weight: 3.6, chg: -1.91 },
    { name: "Xiaomi", ticker: "1810", sector: "Technology", weight: 3.4, chg: 1.65 },
    { name: "ICBC", ticker: "1398", sector: "Financials", weight: 3.0, chg: -1.84 },
  ],
  sectors: [
    { name: "Technology", weight: 29.8, color: "#4F7CAC" },
    { name: "Financials", weight: 24.6, color: "#FF0000" },
    { name: "Insurance", weight: 12.8, color: "#D9B27C" },
    { name: "Consumer Discretionary", weight: 9.4, color: "#A855F7" },
    { name: "Real Estate", weight: 7.2, color: "#22C55E" },
    { name: "Others", weight: 16.2, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "19,939.45", signal: "Buy" }, { label: "10-SMA", value: "20,078.33", signal: "Sell" }, { label: "20-SMA", value: "20,237.06", signal: "Sell" }, { label: "50-SMA", value: "19,741.05", signal: "Buy" }, { label: "200-SMA", value: "18,054.63", signal: "Buy" }, { label: "RSI (14)", value: "67.9", signal: "Neutral" }, { label: "MACD", value: "85.9", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Nikkei 225", chg: -0.65, href: "/markets/indices/nikkei-225" },
    { name: "NASDAQ", chg: -0.22, href: "/markets/indices/nasdaq" },
    { name: "S&P 500", chg: 0.45, href: "/markets/indices/sp-500" },
  ],
  facts: [{ label: "Base Year", value: "1964" }, { label: "Base Value", value: "100" }, { label: "Launched", value: "Nov 1969" }, { label: "Stocks", value: "82" }],
  aboutTitle: "About Hang Seng Index",
  aboutParagraphs: [
    "The <strong>Hang Seng Index</strong> tracks the largest companies listed on the Hong Kong Stock Exchange, serving as the principal benchmark for Hong Kong and mainland Chinese equities.",
    "Heavily weighted toward technology and financial giants, the Hang Seng is a key gauge of investor sentiment toward the Chinese economy and Hong Kong's role as a global financial hub.",
  ],
  ctaHeadline: "Invest in Hang Seng Index via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function HangSengPage() {
  return <IndexDetailPage data={DATA} />
}

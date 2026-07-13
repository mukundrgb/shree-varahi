"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "finnifty",
  breadcrumbLabel: "Nifty Financial Services",
  displayName: "NIFTY FINANCIAL SERVICES",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 24890.15,
  change: 209.08,
  changePct: 0.84,
  advancing: 23,
  declining: 18,
  neutral: 0,
  totalConstituents: 10,
  w52High: 29701.51,
  w52Low: 21548.13,
  keyStats: [
        { label: "High", value: "24,938.59" }, { label: "Low", value: "24,689.89" },
    { label: "Open", value: "24,776.31" }, { label: "Prev Close", value: "24,681.07" },
    { label: "52W High", value: "29,701.51" }, { label: "52W Low", value: "21,548.13" },
    { label: "P/E Ratio", value: "21.65" }, { label: "P/B Ratio", value: "3.84" },
    { label: "Div Yield", value: "1.05%" }, { label: "Market Cap", value: "₹4.85L Cr" },
  ],
  ohlc: { open: "24,776.31", high: "24,938.59", low: "24,689.89", close: "24,890.15" },
  chartData: {
    "1D": [23051.47,23067.97,23083.54,23080.1,23070.34,23071.48,23059.16,23042.77,23040.09,23054.31,23039.96,23025.98,23037.63,23043.52,23058.46,23068.95,23083.12,23102.53,23083.83,23080.5,23096.72,23079.33,23073.26,23058.75,23066.21,23049.3,23036.15,23022.47,23031.89,23049.72,23031.44,23036.5,23047.55,23052.85,23041.39,23042.06,23043.35,23056.21,23051.14,23040.16,23036.69,23047.53,23029.0,23022.52,23025.43,23018.93,23024.36,23036.08,23044.92,23057.25,23070.43,23055.55,23051.84,23035.72,23039.2,23024.68,23012.39,22999.97,22985.84,24890.15],
    "1W": [25395.64,25265.0,25365.56,25471.01,25582.77,25662.82,25559.49,24890.15],
    "1M": [25299.4,25516.64,25790.37,25662.44,25666.64,25460.04,25447.43,25384.73,25277.94,25214.46,25370.62,24890.15],
    "3M": [25733.04,26000.35,25487.04,25717.0,25293.07,24988.32,25478.99,25541.51,25248.58,24945.35,25345.81,24890.15],
    "1Y": [24097.68,23957.94,23699.11,24203.16,24894.2,24903.34,24630.23,24102.3,23597.07,23884.2,23324.13,24890.15],
    "5Y": [25488.95,25678.74,26387.91,25895.47,25433.11,24619.77,24009.73,23605.89,23196.04,24890.15],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 7.98, "1W": -1.99, "1M": -1.62,
    "3M": -3.28, "1Y": 3.29, "5Y": -2.35,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -1.99 }, { p: "1M", v: -1.62 }, { p: "3M", v: -3.28 }, { p: "6M", v: -5.25 }, { p: "1Y", v: 3.29 }, { p: "3Y", v: 10.2 }, { p: "5Y", v: -2.35 }],
  constituents: [
    { name: "HDFC Bank", ticker: "HDFCBANK", sector: "Banking", weight: 20.6, chg: -1.72 },
    { name: "ICICI Bank", ticker: "ICICIBANK", sector: "Banking", weight: 18.4, chg: -0.22 },
    { name: "State Bank of India", ticker: "SBIN", sector: "Banking", weight: 9.8, chg: -1.88 },
    { name: "Bajaj Finance", ticker: "BAJFINANCE", sector: "NBFC", weight: 8.2, chg: -0.31 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", sector: "Banking", weight: 7.9, chg: -0.67 },
    { name: "Bajaj Finserv", ticker: "BAJAJFINSV", sector: "NBFC", weight: 6.1, chg: -1.02 },
    { name: "HDFC Life Insurance", ticker: "HDFCLIFE", sector: "Insurance", weight: 4.4, chg: -0.98 },
    { name: "SBI Life Insurance", ticker: "SBILIFE", sector: "Insurance", weight: 4.0, chg: -1.19 },
    { name: "Axis Bank", ticker: "AXISBANK", sector: "Banking", weight: 7.6, chg: 1.89 },
    { name: "Cholamandalam Investment", ticker: "CHOLAFIN", sector: "NBFC", weight: 3.2, chg: -1.22 },
  ],
  sectors: [
    { name: "Banking", weight: 64.3, color: "#FF0000" },
    { name: "NBFC", weight: 21.7, color: "#D9B27C" },
    { name: "Insurance", weight: 10.4, color: "#22C55E" },
    { name: "Others", weight: 3.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "25,014.6", signal: "Buy" }, { label: "10-SMA", value: "25,188.83", signal: "Sell" }, { label: "20-SMA", value: "25,387.95", signal: "Sell" }, { label: "50-SMA", value: "24,765.7", signal: "Buy" }, { label: "200-SMA", value: "22,650.04", signal: "Buy" }, { label: "RSI (14)", value: "55.3", signal: "Neutral" }, { label: "MACD", value: "63.6", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "Nifty 50", chg: -0.07, href: "/markets/indices/nifty-50" },
    { name: "Nifty Bank", chg: -0.86, href: "/markets/indices/nifty-bank" },
    { name: "Sensex", chg: 0.4, href: "/markets/indices/sensex" },
  ],
  facts: [{ label: "Base Year", value: "2000" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jan 2021" }, { label: "Stocks", value: "20" }],
  aboutTitle: "About Nifty Financial Services",
  aboutParagraphs: [
    "<strong>NIFTY FINANCIAL SERVICES (FINNIFTY)</strong> tracks the performance of banks, NBFCs, insurance, housing finance and other financial services companies listed on the NSE.",
    "Launched in January 2021, FINNIFTY has become one of the most actively traded weekly options indices on the NSE, alongside NIFTY 50 and NIFTY BANK.",
  ],
  ctaHeadline: "Trade Nifty Financial Services with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function FinniftyPage() {
  return <IndexDetailPage data={DATA} />
}

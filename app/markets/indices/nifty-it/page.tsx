"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-it",
  breadcrumbLabel: "Nifty It",
  displayName: "NIFTY IT",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 42180.6,
  change: -80.14,
  changePct: -0.19,
  advancing: 17,
  declining: 18,
  neutral: 0,
  totalConstituents: 10,
  w52High: 50267.85,
  w52Low: 33774.78,
  keyStats: [
        { label: "High", value: "42,398.40" }, { label: "Low", value: "42,039.77" },
    { label: "Open", value: "42,197.91" }, { label: "Prev Close", value: "42,260.74" },
    { label: "52W High", value: "50,267.85" }, { label: "52W Low", value: "33,774.78" },
    { label: "P/E Ratio", value: "27.35" }, { label: "P/B Ratio", value: "4.97" },
    { label: "Div Yield", value: "1.17%" }, { label: "Market Cap", value: "₹5.08L Cr" },
  ],
  ohlc: { open: "42,197.91", high: "42,398.40", low: "42,039.77", close: "42,180.60" },
  chartData: {
    "1D": [40284.79,40318.74,40351.58,40350.65,40330.73,40357.02,40347.43,40370.71,40391.4,40374.87,40351.96,40352.62,40342.54,40355.57,40338.6,40330.15,40360.28,40385.89,40355.62,40389.82,40370.82,40380.56,40411.66,40444.98,40424.28,40397.16,40389.95,40355.25,40368.45,40368.78,40370.72,40335.63,40323.45,40289.19,40297.04,40297.18,40311.76,40285.25,40290.13,40320.27,40326.83,40357.38,40353.17,40361.76,40377.17,40379.4,40407.17,40426.48,40390.78,40369.92,40403.2,40417.52,40415.1,40386.84,40369.96,40367.1,40365.68,40355.17,40364.16,42180.6],
    "1W": [38006.05,37933.83,38007.95,38106.09,37975.69,38120.74,37906.94,42180.6],
    "1M": [43391.07,43614.12,44126.51,44365.57,44317.77,44902.38,45084.14,44675.91,44889.9,44508.35,44314.18,42180.6],
    "3M": [42849.28,42429.63,42845.38,42950.52,43016.33,43472.68,43002.87,42250.55,42989.94,42837.55,43038.45,42180.6],
    "1Y": [39685.29,39640.26,38952.67,39918.22,39568.02,39029.21,38927.0,37784.86,37825.44,38351.86,37920.5,42180.6],
    "5Y": [42254.1,44040.22,44447.8,46654.01,46427.79,45684.2,46169.39,46509.84,45777.9,42180.6],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 4.71, "1W": 10.98, "1M": -2.79,
    "3M": -1.56, "1Y": 6.29, "5Y": -0.17,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 10.98 }, { p: "1M", v: -2.79 }, { p: "3M", v: -1.56 }, { p: "6M", v: -2.5 }, { p: "1Y", v: 6.29 }, { p: "3Y", v: 19.5 }, { p: "5Y", v: -0.17 }],
  constituents: [
    { name: "TCS", ticker: "TCS", sector: "IT", weight: 21.4, chg: 1.23 },
    { name: "Infosys", ticker: "INFY", sector: "IT", weight: 19.8, chg: 0.55 },
    { name: "HCL Technologies", ticker: "HCLTECH", sector: "IT", weight: 11.2, chg: -1.33 },
    { name: "Wipro", ticker: "WIPRO", sector: "IT", weight: 8.6, chg: 1.62 },
    { name: "Tech Mahindra", ticker: "TECHM", sector: "IT", weight: 7.4, chg: -0.61 },
    { name: "LTIMindtree", ticker: "LTIM", sector: "IT", weight: 6.8, chg: -1.05 },
    { name: "Persistent Systems", ticker: "PERSISTENT", sector: "IT", weight: 5.1, chg: -1.83 },
    { name: "Coforge", ticker: "COFORGE", sector: "IT", weight: 4.2, chg: 0.33 },
    { name: "Mphasis", ticker: "MPHASIS", sector: "IT", weight: 4.0, chg: 1.26 },
    { name: "L&T Technology Services", ticker: "LTTS", sector: "IT", weight: 3.6, chg: -0.18 },
  ],
  sectors: [
    { name: "IT Services", weight: 78.4, color: "#4F7CAC" },
    { name: "Software Products", weight: 12.6, color: "#FF0000" },
    { name: "BPO/ITES", weight: 9.0, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "42,391.5", signal: "Buy" }, { label: "10-SMA", value: "42,686.77", signal: "Sell" }, { label: "20-SMA", value: "43,024.21", signal: "Sell" }, { label: "50-SMA", value: "41,969.7", signal: "Buy" }, { label: "200-SMA", value: "38,384.35", signal: "Buy" }, { label: "RSI (14)", value: "34.7", signal: "Neutral" }, { label: "MACD", value: "-7.9", signal: "Sell" }],
  overallSignal: "Neutral",
  related: [
    { name: "Nifty 50", chg: 0.6, href: "/markets/indices/nifty-50" },
    { name: "Finnifty", chg: 0.02, href: "/markets/indices/finnifty" },
    { name: "Nifty Mid Cap 50", chg: 1.21, href: "/markets/indices/nifty-mid-cap-50" },
  ],
  facts: [{ label: "Base Year", value: "1996" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jul 2003" }, { label: "Stocks", value: "10" }],
  aboutTitle: "About Nifty It",
  aboutParagraphs: [
    "<strong>NIFTY IT</strong> tracks the performance of the largest and most liquid Indian IT services and software companies listed on the NSE.",
    "As a bellwether for India's IT export industry, NIFTY IT is closely watched for signals on global technology spending, currency movements, and offshore outsourcing demand.",
  ],
  ctaHeadline: "Trade Nifty It with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyItPage() {
  return <IndexDetailPage data={DATA} />
}

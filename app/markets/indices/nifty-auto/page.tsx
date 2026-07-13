"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-auto",
  breadcrumbLabel: "Nifty Auto",
  displayName: "NIFTY AUTO",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 25640.9,
  change: 56.41,
  changePct: 0.22,
  advancing: 18,
  declining: 23,
  neutral: 0,
  totalConstituents: 10,
  w52High: 29235.15,
  w52Low: 19061.49,
  keyStats: [
        { label: "High", value: "25,736.04" }, { label: "Low", value: "25,546.00" },
    { label: "Open", value: "25,616.57" }, { label: "Prev Close", value: "25,584.49" },
    { label: "52W High", value: "29,235.15" }, { label: "52W Low", value: "19,061.49" },
    { label: "P/E Ratio", value: "17.77" }, { label: "P/B Ratio", value: "4.06" },
    { label: "Div Yield", value: "1.52%" }, { label: "Market Cap", value: "₹4.56L Cr" },
  ],
  ohlc: { open: "25,616.57", high: "25,736.04", low: "25,546.00", close: "25,640.90" },
  chartData: {
    "1D": [23097.32,23097.99,23102.08,23111.36,23110.22,23108.5,23104.58,23095.15,23086.39,23092.46,23086.62,23067.03,23080.62,23093.23,23099.67,23120.31,23105.25,23101.81,23095.02,23104.39,23086.48,23086.48,23067.01,23073.3,23090.93,23083.92,23065.44,23075.28,23057.86,23075.4,23061.57,23042.99,23027.49,23044.67,23033.21,23032.79,23041.3,23021.49,23039.63,23030.18,23031.4,23034.25,23013.65,22999.12,22996.12,23011.91,23025.78,23037.83,23036.6,23048.97,23058.18,23049.12,23048.29,23044.28,23062.72,23061.9,23063.61,23047.76,23048.4,25640.9],
    "1W": [23846.42,23948.85,24059.41,24050.97,24130.33,24120.83,24163.2,25640.9],
    "1M": [23407.52,23165.49,23325.31,23640.33,23449.75,23773.75,23543.74,23412.8,23201.85,23183.52,22982.54,25640.9],
    "3M": [24894.24,25213.9,25471.2,25673.54,25873.23,26270.81,25808.06,26062.34,25650.78,25371.23,25202.28,25640.9],
    "1Y": [23467.69,24044.92,23409.03,23501.33,22766.46,23112.83,22615.86,22793.99,22524.68,21852.02,22241.79,25640.9],
    "5Y": [26681.73,26367.91,27323.26,27686.49,26401.64,27643.71,26542.88,26213.5,26267.45,25640.9],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 11.01, "1W": 7.53, "1M": 9.54,
    "3M": 3.0, "1Y": 9.26, "5Y": -3.9,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 7.53 }, { p: "1M", v: 9.54 }, { p: "3M", v: 3.0 }, { p: "6M", v: 4.8 }, { p: "1Y", v: 9.26 }, { p: "3Y", v: 28.71 }, { p: "5Y", v: -3.9 }],
  constituents: [
    { name: "Maruti Suzuki", ticker: "MARUTI", sector: "Auto", weight: 17.8, chg: -0.84 },
    { name: "Tata Motors", ticker: "TATAMOTORS", sector: "Auto", weight: 13.4, chg: 1.73 },
    { name: "Mahindra & Mahindra", ticker: "M&M", sector: "Auto", weight: 12.6, chg: 0.08 },
    { name: "Bajaj Auto", ticker: "BAJAJ-AUTO", sector: "Auto", weight: 10.2, chg: 0.94 },
    { name: "Eicher Motors", ticker: "EICHERMOT", sector: "Auto", weight: 8.4, chg: -0.34 },
    { name: "Hero MotoCorp", ticker: "HEROMOTOCO", sector: "Auto", weight: 6.8, chg: 1.51 },
    { name: "TVS Motor", ticker: "TVSMOTOR", sector: "Auto", weight: 6.2, chg: 0.6 },
    { name: "Ashok Leyland", ticker: "ASHOKLEY", sector: "Auto", weight: 4.4, chg: -1.77 },
    { name: "Bharat Forge", ticker: "BHARATFORG", sector: "Auto Ancillary", weight: 4.0, chg: 1.79 },
    { name: "MRF", ticker: "MRF", sector: "Tyres", weight: 3.6, chg: -0.18 },
  ],
  sectors: [
    { name: "Passenger Vehicles", weight: 34.2, color: "#FF0000" },
    { name: "Commercial Vehicles", weight: 18.6, color: "#D9B27C" },
    { name: "Two Wheelers", weight: 21.4, color: "#22C55E" },
    { name: "Auto Ancillary", weight: 14.8, color: "#A855F7" },
    { name: "Tyres", weight: 11.0, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "25,769.1", signal: "Buy" }, { label: "10-SMA", value: "25,948.59", signal: "Sell" }, { label: "20-SMA", value: "26,153.72", signal: "Sell" }, { label: "50-SMA", value: "25,512.7", signal: "Buy" }, { label: "200-SMA", value: "23,333.22", signal: "Buy" }, { label: "RSI (14)", value: "33.6", signal: "Neutral" }, { label: "MACD", value: "-85.6", signal: "Buy" }],
  overallSignal: "Neutral",
  related: [
    { name: "Nifty 50", chg: -0.73, href: "/markets/indices/nifty-50" },
    { name: "Nifty Mid Cap 50", chg: -0.24, href: "/markets/indices/nifty-mid-cap-50" },
    { name: "Nifty IT", chg: 0.15, href: "/markets/indices/nifty-it" },
  ],
  facts: [{ label: "Base Year", value: "2004" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Jan 2012" }, { label: "Stocks", value: "15" }],
  aboutTitle: "About Nifty Auto",
  aboutParagraphs: [
    "<strong>NIFTY AUTO</strong> tracks the performance of the largest automobile manufacturers and auto ancillary companies listed on the NSE.",
    "The index reflects the health of India's automobile sector, spanning passenger vehicles, commercial vehicles, two-wheelers, and component makers, and is closely tied to consumer spending trends.",
  ],
  ctaHeadline: "Trade Nifty Auto with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyAutoPage() {
  return <IndexDetailPage data={DATA} />
}

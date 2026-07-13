"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-next-50",
  breadcrumbLabel: "Nifty Next 50",
  displayName: "NIFTY NEXT 50",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 68420.75,
  change: -506.31,
  changePct: -0.74,
  advancing: 23,
  declining: 19,
  neutral: 0,
  totalConstituents: 10,
  w52High: 82583.23,
  w52Low: 53956.67,
  keyStats: [
        { label: "High", value: "69,072.10" }, { label: "Low", value: "68,091.38" },
    { label: "Open", value: "68,721.83" }, { label: "Prev Close", value: "68,927.06" },
    { label: "52W High", value: "82,583.23" }, { label: "52W Low", value: "53,956.67" },
    { label: "P/E Ratio", value: "27.93" }, { label: "P/B Ratio", value: "4.55" },
    { label: "Div Yield", value: "1.69%" }, { label: "Market Cap", value: "₹6.31L Cr" },
  ],
  ohlc: { open: "68,721.83", high: "69,072.10", low: "68,091.38", close: "68,420.75" },
  chartData: {
    "1D": [68732.33,68699.2,68684.13,68727.36,68724.54,68682.16,68639.66,68657.67,68628.36,68601.55,68606.38,68650.06,68698.25,68688.89,68635.17,68673.83,68623.86,68626.75,68599.08,68564.15,68575.2,68610.89,68551.31,68592.59,68544.32,68563.13,68510.98,68451.67,68510.88,68477.25,68525.73,68506.51,68498.12,68468.66,68478.07,68516.2,68521.13,68520.17,68481.62,68474.97,68442.07,68431.62,68383.2,68392.57,68396.36,68382.02,68431.93,68477.97,68534.7,68498.25,68440.3,68489.79,68510.81,68542.01,68512.51,68484.63,68524.15,68580.16,68521.01,68420.75],
    "1W": [71658.02,71534.19,71926.5,72206.78,72262.82,72420.1,72570.55,68420.75],
    "1M": [65815.09,66300.27,65508.69,64748.64,64824.66,64464.04,64606.91,65392.61,65927.07,65997.6,65967.62,68420.75],
    "3M": [68181.7,69453.04,68182.72,67476.82,66646.53,67920.15,69211.49,70471.41,71362.88,71777.42,72748.69,68420.75],
    "1Y": [65208.59,66608.27,64994.7,65666.38,64126.12,66049.29,66869.78,67052.33,64717.91,65600.18,65093.92,68420.75],
    "5Y": [68847.78,70371.44,72901.73,70804.72,68565.24,69239.64,69892.47,66662.63,65825.44,68420.75],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -0.45, "1W": -4.52, "1M": 3.96,
    "3M": 0.35, "1Y": 4.93, "5Y": -0.62,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -4.52 }, { p: "1M", v: 3.96 }, { p: "3M", v: 0.35 }, { p: "6M", v: 0.56 }, { p: "1Y", v: 4.93 }, { p: "3Y", v: 15.28 }, { p: "5Y", v: -0.62 }],
  constituents: [
    { name: "LIC of India", ticker: "LICI", sector: "Insurance", weight: 6.8, chg: -0.14 },
    { name: "Dmart", ticker: "DMART", sector: "Retail", weight: 5.4, chg: -0.72 },
    { name: "Adani Green Energy", ticker: "ADANIGREEN", sector: "Power", weight: 4.9, chg: 1.08 },
    { name: "Siemens", ticker: "SIEMENS", sector: "Capital Goods", weight: 4.2, chg: 0.69 },
    { name: "Indian Oil Corporation", ticker: "IOC", sector: "Energy", weight: 3.8, chg: -1.05 },
    { name: "DLF", ticker: "DLF", sector: "Realty", weight: 3.6, chg: -1.27 },
    { name: "Hindustan Aeronautics", ticker: "HAL", sector: "Defence", weight: 3.4, chg: 0.87 },
    { name: "Pidilite Industries", ticker: "PIDILITIND", sector: "Chemicals", weight: 3.1, chg: 1.07 },
    { name: "Varun Beverages", ticker: "VBL", sector: "FMCG", weight: 3.0, chg: -1.94 },
    { name: "Godrej Consumer Products", ticker: "GODREJCP", sector: "FMCG", weight: 2.8, chg: -0.43 },
  ],
  sectors: [
    { name: "Financial Services", weight: 18.2, color: "#FF0000" },
    { name: "FMCG", weight: 15.4, color: "#22C55E" },
    { name: "Power & Energy", weight: 13.6, color: "#D9B27C" },
    { name: "Industrials", weight: 12.1, color: "#F59E0B" },
    { name: "Realty", weight: 9.8, color: "#A855F7" },
    { name: "Defence", weight: 8.4, color: "#6366F1" },
    { name: "Others", weight: 22.5, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "68,762.85", signal: "Buy" }, { label: "10-SMA", value: "69,241.8", signal: "Sell" }, { label: "20-SMA", value: "69,789.17", signal: "Sell" }, { label: "50-SMA", value: "68,078.65", signal: "Buy" }, { label: "200-SMA", value: "62,262.88", signal: "Buy" }, { label: "RSI (14)", value: "42.3", signal: "Neutral" }, { label: "MACD", value: "87.5", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "Nifty 50", chg: 0.86, href: "/markets/indices/nifty-50" },
    { name: "Nifty Mid Cap 50", chg: 0.04, href: "/markets/indices/nifty-mid-cap-50" },
    { name: "Sensex", chg: 0.24, href: "/markets/indices/sensex" },
  ],
  facts: [{ label: "Base Year", value: "1996" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Dec 1996" }, { label: "Stocks", value: "50" }],
  aboutTitle: "About Nifty Next 50",
  aboutParagraphs: [
    "<strong>NIFTY NEXT 50</strong> represents 50 companies from the NIFTY 100 that are not part of the NIFTY 50, effectively capturing India's emerging large-cap universe.",
    "Companies in this index are often considered candidates for future inclusion in the NIFTY 50, making it a popular index for investors seeking early exposure to India's next generation of large caps.",
  ],
  ctaHeadline: "Trade Nifty Next 50 with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyNext50Page() {
  return <IndexDetailPage data={DATA} />
}

"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "nifty-midcap-select",
  breadcrumbLabel: "Nifty Midcap Select",
  displayName: "NIFTY MIDCAP SELECT",
  badge: "NSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "13 Jul 2026 · 15:30 IST",
  price: 12480.3,
  change: -24.96,
  changePct: -0.2,
  advancing: 20,
  declining: 24,
  neutral: 0,
  totalConstituents: 10,
  w52High: 13506.03,
  w52Low: 9280.2,
  keyStats: [
        { label: "High", value: "12,533.89" }, { label: "Low", value: "12,441.40" },
    { label: "Open", value: "12,491.83" }, { label: "Prev Close", value: "12,505.26" },
    { label: "52W High", value: "13,506.03" }, { label: "52W Low", value: "9,280.20" },
    { label: "P/E Ratio", value: "28.15" }, { label: "P/B Ratio", value: "2.32" },
    { label: "Div Yield", value: "1.63%" }, { label: "Market Cap", value: "₹3.02L Cr" },
  ],
  ohlc: { open: "12,491.83", high: "12,533.89", low: "12,441.40", close: "12,480.30" },
  chartData: {
    "1D": [11999.5,12009.94,12003.39,11999.86,11996.45,11996.09,12004.21,12006.43,12012.85,12013.77,12016.43,12006.65,12006.66,11999.52,12009.24,12008.3,12012.59,12006.32,12010.9,12015.95,12020.42,12022.82,12021.17,12023.58,12022.53,12031.15,12037.45,12044.81,12050.68,12059.43,12051.35,12041.93,12041.15,12035.96,12035.91,12031.75,12034.04,12029.68,12025.65,12015.79,12012.92,12011.64,12015.11,12006.75,12003.47,11996.58,12001.05,12006.35,12016.84,12012.22,12008.58,12015.48,12009.28,12018.93,12018.3,12017.32,12007.24,12014.83,12005.75,12480.3],
    "1W": [11538.51,11604.0,11604.62,11658.0,11642.18,11663.75,11606.72,12480.3],
    "1M": [12719.87,12544.77,12679.96,12594.95,12716.23,12578.39,12693.44,12841.68,12670.99,12702.18,12826.18,12480.3],
    "3M": [11412.56,11398.64,11495.31,11615.73,11625.88,11402.01,11593.18,11431.6,11466.96,11419.09,11278.37,12480.3],
    "1Y": [11370.73,11714.73,11416.27,11616.18,11271.18,11058.01,11003.68,11372.95,11490.46,11852.68,11693.06,12480.3],
    "5Y": [11705.48,11769.27,11935.24,11816.32,11530.04,10959.17,11195.16,11356.58,10855.76,12480.3],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 4.01, "1W": 8.16, "1M": -1.88,
    "3M": 9.36, "1Y": 9.76, "5Y": 6.62,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: 8.16 }, { p: "1M", v: -1.88 }, { p: "3M", v: 9.36 }, { p: "6M", v: 14.98 }, { p: "1Y", v: 9.76 }, { p: "3Y", v: 30.26 }, { p: "5Y", v: 6.62 }],
  constituents: [
    { name: "Persistent Systems", ticker: "PERSISTENT", sector: "IT", weight: 5.2, chg: 0.32 },
    { name: "Voltas", ticker: "VOLTAS", sector: "Consumer Durables", weight: 4.6, chg: -1.72 },
    { name: "Federal Bank", ticker: "FEDERALBNK", sector: "Banking", weight: 4.4, chg: -0.2 },
    { name: "Indian Hotels Company", ticker: "INDHOTEL", sector: "Hospitality", weight: 4.1, chg: 0.54 },
    { name: "Coforge", ticker: "COFORGE", sector: "IT", weight: 3.9, chg: -1.96 },
    { name: "Page Industries", ticker: "PAGEIND", sector: "Textiles", weight: 3.8, chg: -0.2 },
    { name: "PI Industries", ticker: "PIIND", sector: "Chemicals", weight: 3.6, chg: 0.41 },
    { name: "Trent", ticker: "TRENT", sector: "Retail", weight: 3.4, chg: 1.67 },
    { name: "Balkrishna Industries", ticker: "BALKRISIND", sector: "Auto Ancillary", weight: 3.2, chg: -1.63 },
    { name: "Polycab India", ticker: "POLYCAB", sector: "Cables", weight: 3.0, chg: 1.12 },
  ],
  sectors: [
    { name: "IT", weight: 18.4, color: "#4F7CAC" },
    { name: "Financial Services", weight: 16.2, color: "#FF0000" },
    { name: "Consumer Discretionary", weight: 14.8, color: "#A855F7" },
    { name: "Industrials", weight: 12.6, color: "#D9B27C" },
    { name: "Chemicals", weight: 9.4, color: "#F59E0B" },
    { name: "Others", weight: 28.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "12,542.7", signal: "Buy" }, { label: "10-SMA", value: "12,630.06", signal: "Sell" }, { label: "20-SMA", value: "12,729.91", signal: "Sell" }, { label: "50-SMA", value: "12,417.9", signal: "Buy" }, { label: "200-SMA", value: "11,357.07", signal: "Buy" }, { label: "RSI (14)", value: "65.3", signal: "Neutral" }, { label: "MACD", value: "95.6", signal: "Sell" }],
  overallSignal: "Neutral",
  related: [
    { name: "Nifty 50", chg: 1.11, href: "/markets/indices/nifty-50" },
    { name: "Nifty Mid Cap 50", chg: 1.43, href: "/markets/indices/nifty-mid-cap-50" },
    { name: "Nifty Next 50", chg: -1.02, href: "/markets/indices/nifty-next-50" },
  ],
  facts: [{ label: "Base Year", value: "2003" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Feb 2024" }, { label: "Stocks", value: "25" }],
  aboutTitle: "About Nifty Midcap Select",
  aboutParagraphs: [
    "<strong>NIFTY MIDCAP SELECT</strong> tracks the performance of 25 liquid, tradeable mid-cap companies listed on the NSE, designed specifically for derivatives trading.",
    "Launched in February 2024 as a futures &amp; options index, it offers focused mid-cap exposure with better liquidity characteristics than the broader midcap universe.",
  ],
  ctaHeadline: "Trade Nifty Midcap Select with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function NiftyMidcapSelectPage() {
  return <IndexDetailPage data={DATA} />
}

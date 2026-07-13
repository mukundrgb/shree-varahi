"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "dow-jones",
  breadcrumbLabel: "Dow Jones Industrial Average",
  displayName: "DOW JONES INDUSTRIAL AVERAGE",
  badge: "NYSE",
  category: "GLOBAL INDEX",
  currency: "$",
  locale: "en-US",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 42890.45,
  change: 561.86,
  changePct: 1.31,
  advancing: 26,
  declining: 22,
  neutral: 0,
  totalConstituents: 10,
  w52High: 51132.47,
  w52Low: 36663.88,
  keyStats: [
        { label: "High", value: "43,045.76" }, { label: "Low", value: "42,463.75" },
    { label: "Open", value: "42,562.75" }, { label: "Prev Close", value: "42,328.59" },
    { label: "52W High", value: "51,132.47" }, { label: "52W Low", value: "36,663.88" },
  ],
  ohlc: { open: "42,562.75", high: "43,045.76", low: "42,463.75", close: "42,890.45" },
  chartData: {
    "1D": [41353.58,41385.42,41364.69,41328.74,41319.27,41339.24,41352.48,41361.82,41367.09,41338.91,41322.51,41298.82,41290.01,41323.22,41299.34,41286.65,41288.42,41297.97,41310.52,41324.46,41361.14,41397.25,41365.01,41352.9,41326.92,41314.53,41331.67,41350.14,41322.83,41301.71,41292.1,41287.98,41254.64,41271.29,41261.17,41265.71,41255.68,41231.29,41259.49,41255.77,41283.0,41313.7,41307.3,41326.8,41339.15,41324.45,41306.37,41279.23,41267.77,41302.01,41312.12,41308.67,41289.13,41255.09,41230.56,41266.42,41233.76,41213.2,41191.11,42890.45],
    "1W": [44701.23,44946.45,45023.61,44882.11,45010.53,45046.55,44942.54,42890.45],
    "1M": [40646.21,40300.34,40450.86,40744.91,40873.99,40758.34,40469.0,40835.19,40556.62,40792.42,40622.75,42890.45],
    "3M": [41750.5,42040.72,41927.95,41149.9,41855.14,41922.47,42008.35,41974.9,41529.15,41605.53,42124.06,42890.45],
    "1Y": [43166.74,44613.64,44933.63,43372.09,42290.04,42935.94,42007.42,41850.77,42980.48,42202.65,40879.84,42890.45],
    "5Y": [39728.75,38333.09,37071.8,36969.62,37388.18,38210.08,38917.54,38190.92,38082.14,42890.45],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": 3.72, "1W": -4.05, "1M": 5.52,
    "3M": 2.73, "1Y": -0.64, "5Y": 7.96,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -4.05 }, { p: "1M", v: 5.52 }, { p: "3M", v: 2.73 }, { p: "6M", v: 4.37 }, { p: "1Y", v: -0.64 }, { p: "3Y", v: -1.98 }, { p: "5Y", v: 7.96 }],
  constituents: [
    { name: "Apple", ticker: "AAPL", sector: "Technology", weight: 9.8, chg: 2.19 },
    { name: "Microsoft", ticker: "MSFT", sector: "Technology", weight: 8.6, chg: -0.61 },
    { name: "UnitedHealth", ticker: "UNH", sector: "Healthcare", weight: 7.2, chg: -2.18 },
    { name: "Goldman Sachs", ticker: "GS", sector: "Financials", weight: 6.9, chg: 1.97 },
    { name: "Home Depot", ticker: "HD", sector: "Retail", weight: 6.1, chg: -0.64 },
    { name: "Visa", ticker: "V", sector: "Financials", weight: 5.8, chg: 0.87 },
    { name: "Caterpillar", ticker: "CAT", sector: "Industrials", weight: 5.2, chg: -1.61 },
    { name: "McDonald's", ticker: "MCD", sector: "Consumer", weight: 4.6, chg: 1.19 },
    { name: "Amgen", ticker: "AMGN", sector: "Healthcare", weight: 4.1, chg: -2.12 },
    { name: "Boeing", ticker: "BA", sector: "Industrials", weight: 3.8, chg: -0.06 },
  ],
  sectors: [
    { name: "Technology", weight: 22.4, color: "#4F7CAC" },
    { name: "Financials", weight: 18.6, color: "#FF0000" },
    { name: "Healthcare", weight: 16.2, color: "#22C55E" },
    { name: "Industrials", weight: 14.8, color: "#D9B27C" },
    { name: "Consumer", weight: 13.4, color: "#A855F7" },
    { name: "Others", weight: 14.6, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "43,104.9", signal: "Buy" }, { label: "10-SMA", value: "43,405.14", signal: "Sell" }, { label: "20-SMA", value: "43,748.26", signal: "Sell" }, { label: "50-SMA", value: "42,676.0", signal: "Buy" }, { label: "200-SMA", value: "39,030.31", signal: "Buy" }, { label: "RSI (14)", value: "38.8", signal: "Neutral" }, { label: "MACD", value: "-99.6", signal: "Buy" }],
  overallSignal: "Bullish",
  related: [
    { name: "S&P 500", chg: -0.46, href: "/markets/indices/sp-500" },
    { name: "NASDAQ", chg: -0.21, href: "/markets/indices/nasdaq" },
    { name: "FTSE 100", chg: 0.46, href: "/markets/indices/ftse-100" },
  ],
  facts: [{ label: "Base Year", value: "1896" }, { label: "Base Value", value: "40.94" }, { label: "Launched", value: "May 1896" }, { label: "Stocks", value: "30" }],
  aboutTitle: "About Dow Jones Industrial Average",
  aboutParagraphs: [
    "The <strong>Dow Jones Industrial Average (DJIA)</strong> is a price-weighted index of 30 large, publicly-owned US blue-chip companies listed on the NYSE and NASDAQ.",
    "One of the oldest and most-watched stock indices in the world, the Dow is a key barometer of the US industrial and corporate economy, though its price-weighted methodology differs from the more common market-cap weighting.",
  ],
  ctaHeadline: "Invest in Dow Jones Industrial Average via Global Investing",
  ctaBody: "Access global markets directly from India with Shree Varahi's Global Investing platform.",
}

export default function DowJonesPage() {
  return <IndexDetailPage data={DATA} />
}

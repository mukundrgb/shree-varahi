"use client"

import { IndexDetailPage, type IndexPageData, type TF } from "@/components/index-detail-page"

const DATA: IndexPageData = {
  slug: "bse-mid-cap",
  breadcrumbLabel: "Bse Mid Cap",
  displayName: "BSE MID CAP",
  badge: "BSE",
  category: "INDEX",
  currency: "₹",
  locale: "en-IN",
  asOf: "10 Jul 2026 · 15:30 IST",
  price: 45120.4,
  change: -564.0,
  changePct: -1.25,
  advancing: 21,
  declining: 14,
  neutral: 0,
  totalConstituents: 10,
  w52High: 52934.21,
  w52Low: 33589.66,
  keyStats: [
        { label: "High", value: "45,473.37" }, { label: "Low", value: "45,056.73" },
    { label: "Open", value: "45,263.94" }, { label: "Prev Close", value: "45,684.40" },
    { label: "52W High", value: "52,934.21" }, { label: "52W Low", value: "33,589.66" },
    { label: "P/E Ratio", value: "25.59" }, { label: "P/B Ratio", value: "4.39" },
    { label: "Div Yield", value: "1.94%" }, { label: "Market Cap", value: "₹7.05L Cr" },
  ],
  ohlc: { open: "45,263.94", high: "45,473.37", low: "45,056.73", close: "45,120.40" },
  chartData: {
    "1D": [46717.56,46735.72,46698.11,46717.99,46710.17,46746.13,46740.82,46743.19,46771.03,46762.51,46747.92,46757.36,46768.37,46806.33,46787.26,46821.5,46822.5,46854.05,46815.17,46804.89,46765.68,46768.09,46778.18,46811.33,46807.84,46784.25,46751.67,46759.99,46734.15,46701.64,46738.07,46711.73,46683.35,46673.31,46664.67,46701.05,46719.31,46724.42,46697.55,46724.49,46725.51,46691.91,46732.1,46729.26,46739.23,46748.46,46753.59,46793.46,46823.66,46813.86,46810.09,46809.04,46813.98,46801.59,46833.24,46800.59,46791.68,46815.97,46782.82,45120.4],
    "1W": [46625.43,46626.54,46839.31,47013.21,46784.73,46859.91,46867.23,45120.4],
    "1M": [45950.51,45765.47,45443.14,45342.45,45032.62,45038.65,45222.91,45283.95,45505.01,44974.51,45029.33,45120.4],
    "3M": [46878.26,46795.05,46857.23,45931.53,46675.02,46466.86,46679.58,46486.8,45604.08,46376.61,45639.68,45120.4],
    "1Y": [45022.69,45253.16,46126.85,44784.67,45014.86,46200.64,44600.36,44258.43,43639.94,43266.95,43112.13,45120.4],
    "5Y": [41528.08,39915.41,40700.72,38807.95,39716.06,39762.46,39505.08,41289.19,42983.38,45120.4],
  } as Record<TF, number[]>,
  chartReturns: {
    "1D": -3.42, "1W": -3.23, "1M": -1.81,
    "3M": -3.75, "1Y": 0.22, "5Y": 8.65,
  } as Record<TF, number>,
  returns: [{ p: "1W", v: -3.23 }, { p: "1M", v: -1.81 }, { p: "3M", v: -3.75 }, { p: "6M", v: -6.0 }, { p: "1Y", v: 0.22 }, { p: "3Y", v: 0.68 }, { p: "5Y", v: 8.65 }],
  constituents: [
    { name: "Page Industries", ticker: "PAGEIND", sector: "Textiles", weight: 2.4, chg: 1.02 },
    { name: "PI Industries", ticker: "PIIND", sector: "Chemicals", weight: 2.1, chg: -1.22 },
    { name: "Voltas", ticker: "VOLTAS", sector: "Consumer Durables", weight: 1.9, chg: -1.34 },
    { name: "Persistent Systems", ticker: "PERSISTENT", sector: "IT", weight: 2.6, chg: -1.39 },
    { name: "Federal Bank", ticker: "FEDERALBNK", sector: "Banking", weight: 1.8, chg: 1.98 },
    { name: "Indian Hotels", ticker: "INDHOTEL", sector: "Hospitality", weight: 1.7, chg: 0.09 },
    { name: "Balkrishna Industries", ticker: "BALKRISIND", sector: "Auto Ancillary", weight: 1.6, chg: 1.75 },
    { name: "Mphasis", ticker: "MPHASIS", sector: "IT", weight: 1.8, chg: 0.35 },
    { name: "Astral", ticker: "ASTRAL", sector: "Building Materials", weight: 1.5, chg: 0.92 },
    { name: "Coforge", ticker: "COFORGE", sector: "IT", weight: 1.9, chg: 1.52 },
  ],
  sectors: [
    { name: "IT", weight: 19.4, color: "#4F7CAC" },
    { name: "Financial Services", weight: 17.2, color: "#FF0000" },
    { name: "Consumer Discretionary", weight: 15.6, color: "#A855F7" },
    { name: "Industrials", weight: 13.8, color: "#D9B27C" },
    { name: "Chemicals", weight: 10.2, color: "#F59E0B" },
    { name: "Healthcare", weight: 8.4, color: "#22C55E" },
    { name: "Others", weight: 15.4, color: "#94A3B8" },
  ],
  technicals: [{ label: "5-SMA", value: "45,346.0", signal: "Buy" }, { label: "10-SMA", value: "45,661.84", signal: "Sell" }, { label: "20-SMA", value: "46,022.81", signal: "Sell" }, { label: "50-SMA", value: "44,894.8", signal: "Buy" }, { label: "200-SMA", value: "41,059.56", signal: "Buy" }, { label: "RSI (14)", value: "58.1", signal: "Neutral" }, { label: "MACD", value: "-102.3", signal: "Sell" }],
  overallSignal: "Bearish",
  related: [
    { name: "Sensex", chg: -0.74, href: "/markets/indices/sensex" },
    { name: "BSE Small Cap", chg: -1.05, href: "/markets/indices/bse-small-cap" },
    { name: "Nifty Mid Cap 50", chg: 0.77, href: "/markets/indices/nifty-mid-cap-50" },
  ],
  facts: [{ label: "Base Year", value: "2003" }, { label: "Base Value", value: "1,000" }, { label: "Launched", value: "Apr 2003" }, { label: "Stocks", value: "~150" }],
  aboutTitle: "About Bse Mid Cap",
  aboutParagraphs: [
    "The <strong>BSE MID CAP</strong> index tracks companies ranked 101st to 250th by market capitalisation on the BSE, capturing India's mid-sized growth companies.",
    "Mid-cap stocks typically offer a balance between the stability of large caps and the growth potential of small caps, making the index a popular benchmark for diversified equity funds.",
  ],
  ctaHeadline: "Trade Bse Mid Cap with Zero Brokerage",
  ctaBody: "Index funds, ETFs & derivatives — all in one place. Start investing from ₹500.",
}

export default function BseMidCapPage() {
  return <IndexDetailPage data={DATA} />
}

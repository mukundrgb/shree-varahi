"use client"

import { useState, useMemo } from "react"
import { useParams, notFound } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Star, Bell, Share2, ChevronRight, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Info, ExternalLink, Building2,
  Calendar, Zap, BarChart3, ShieldCheck, Newspaper, ChevronDown,
  BookOpen, Award,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ─── All stocks data ────────────────────────────────────────────────────────

const ALL_STOCKS = [
  { symbol: "RELIANCE",   name: "Reliance Industries Ltd.",      sector: "Energy",        exchange: "NSE", marketCapCr: 1985000, marketCapLabel: "₹19,85,000 Cr", capCategory: "large" as const, price: 2945.50,  change:  1.25, changeAmt:  36.40, color: "#1E40AF", spark: [2820,2856,2830,2890,2920,2910,2945] },
  { symbol: "TCS",        name: "Tata Consultancy Services",     sector: "IT",            exchange: "NSE", marketCapCr: 1415000, marketCapLabel: "₹14,15,000 Cr", capCategory: "large" as const, price: 3892.40,  change: -0.85, changeAmt: -33.45, color: "#0369A1", spark: [3950,3930,3920,3910,3900,3895,3892] },
  { symbol: "HDFCBANK",   name: "HDFC Bank Ltd.",                sector: "Banking",       exchange: "NSE", marketCapCr: 1230000, marketCapLabel: "₹12,30,000 Cr", capCategory: "large" as const, price: 1782.25,  change: -0.42, changeAmt:  -7.60, color: "#15803D", spark: [1800,1795,1792,1788,1790,1785,1782] },
  { symbol: "INFY",       name: "Infosys Ltd.",                  sector: "IT",            exchange: "NSE", marketCapCr:  625000, marketCapLabel:  "₹6,25,000 Cr", capCategory: "large" as const, price: 1485.00,  change:  1.85, changeAmt:  26.95, color: "#6D28D9", spark: [1435,1450,1460,1458,1475,1480,1485] },
  { symbol: "ICICIBANK",  name: "ICICI Bank Ltd.",               sector: "Banking",       exchange: "NSE", marketCapCr:  895000, marketCapLabel:  "₹8,95,000 Cr", capCategory: "large" as const, price: 1245.80,  change:  0.72, changeAmt:   8.90, color: "#B45309", spark: [1220,1228,1235,1230,1238,1242,1245] },
  { symbol: "SBIN",       name: "State Bank of India",           sector: "Banking",       exchange: "NSE", marketCapCr:  728000, marketCapLabel:  "₹7,28,000 Cr", capCategory: "large" as const, price:  815.10,  change: -1.12, changeAmt:  -9.25, color: "#1D4ED8", spark: [832,829,825,822,820,817,815] },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.",            sector: "Telecom",       exchange: "NSE", marketCapCr:  892000, marketCapLabel:  "₹8,92,000 Cr", capCategory: "large" as const, price: 1485.60,  change:  2.14, changeAmt:  31.20, color: "#DC2626", spark: [1425,1440,1455,1462,1470,1480,1485] },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.",       sector: "FMCG",          exchange: "NSE", marketCapCr:  563000, marketCapLabel:  "₹5,63,000 Cr", capCategory: "large" as const, price: 2391.45,  change: -0.24, changeAmt:  -5.75, color: "#0891B2", spark: [2410,2405,2400,2398,2395,2392,2391] },
  { symbol: "ITC",        name: "ITC Ltd.",                      sector: "FMCG",          exchange: "NSE", marketCapCr:  572000, marketCapLabel:  "₹5,72,000 Cr", capCategory: "large" as const, price:  459.20,  change:  0.48, changeAmt:   2.20, color: "#16A34A", spark: [452,454,456,455,457,458,459] },
  { symbol: "LT",         name: "Larsen & Toubro Ltd.",          sector: "Capital Goods", exchange: "NSE", marketCapCr:  515000, marketCapLabel:  "₹5,15,000 Cr", capCategory: "large" as const, price: 3684.90,  change:  1.08, changeAmt:  39.40, color: "#7C3AED", spark: [3610,3628,3645,3655,3668,3675,3684] },
  { symbol: "MARUTI",     name: "Maruti Suzuki India Ltd.",      sector: "Auto",          exchange: "NSE", marketCapCr:  378000, marketCapLabel:  "₹3,78,000 Cr", capCategory: "large" as const, price: 12456.00, change:  1.32, changeAmt: 162.50, color: "#0D9488", spark: [12200,12250,12300,12350,12390,12420,12456] },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd.",              sector: "Auto",          exchange: "NSE", marketCapCr:  347000, marketCapLabel:  "₹3,47,000 Cr", capCategory: "large" as const, price:  952.10,  change:  3.42, changeAmt:  31.50, color: "#B91C1C", spark: [885,900,915,925,940,948,952] },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.",            sector: "NBFC",          exchange: "NSE", marketCapCr:  415000, marketCapLabel:  "₹4,15,000 Cr", capCategory: "large" as const, price: 6842.00,  change: -1.20, changeAmt: -83.20, color: "#1E40AF", spark: [6960,6940,6920,6910,6900,6880,6842] },
  { symbol: "HCLTECH",    name: "HCL Technologies Ltd.",         sector: "IT",            exchange: "NSE", marketCapCr:  278000, marketCapLabel:  "₹2,78,000 Cr", capCategory: "large" as const, price: 1024.35,  change:  0.55, changeAmt:   5.60, color: "#0369A1", spark: [1010,1012,1014,1018,1020,1022,1024] },
  { symbol: "WIPRO",      name: "Wipro Ltd.",                    sector: "IT",            exchange: "NSE", marketCapCr:  245000, marketCapLabel:  "₹2,45,000 Cr", capCategory: "large" as const, price:  420.90,  change: -0.62, changeAmt:  -2.65, color: "#0891B2", spark: [428,426,425,424,422,421,420] },
  { symbol: "NTPC",       name: "NTPC Ltd.",                     sector: "Power",         exchange: "NSE", marketCapCr:  335000, marketCapLabel:  "₹3,35,000 Cr", capCategory: "large" as const, price:  356.80,  change:  0.95, changeAmt:   3.35, color: "#6D28D9", spark: [348,350,352,354,354,356,356] },
  { symbol: "POWERGRID",  name: "Power Grid Corporation",        sector: "Power",         exchange: "NSE", marketCapCr:  282000, marketCapLabel:  "₹2,82,000 Cr", capCategory: "large" as const, price:  303.45,  change:  0.32, changeAmt:   0.95, color: "#B45309", spark: [300,301,302,302,303,303,303] },
  { symbol: "AXISBANK",   name: "Axis Bank Ltd.",                sector: "Banking",       exchange: "NSE", marketCapCr:  358000, marketCapLabel:  "₹3,58,000 Cr", capCategory: "large" as const, price: 1160.80,  change: -0.78, changeAmt:  -9.15, color: "#6D28D9", spark: [1178,1174,1170,1168,1165,1162,1160] },
  { symbol: "KOTAKBANK",  name: "Kotak Mahindra Bank Ltd.",      sector: "Banking",       exchange: "NSE", marketCapCr:  354000, marketCapLabel:  "₹3,54,000 Cr", capCategory: "large" as const, price: 1782.60,  change: -0.55, changeAmt:  -9.85, color: "#DC2626", spark: [1800,1796,1792,1789,1788,1784,1782] },
  { symbol: "MM",         name: "Mahindra & Mahindra Ltd.",      sector: "Auto",          exchange: "NSE", marketCapCr:  312000, marketCapLabel:  "₹3,12,000 Cr", capCategory: "large" as const, price: 2510.40,  change:  1.62, changeAmt:  40.05, color: "#16A34A", spark: [2458,2468,2478,2488,2498,2506,2510] },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd.",        sector: "Infrastructure",exchange: "NSE", marketCapCr:  278000, marketCapLabel:  "₹2,78,000 Cr", capCategory: "large" as const, price: 1285.00,  change: -0.35, changeAmt:  -4.55, color: "#0D9488", spark: [1298,1295,1292,1290,1288,1286,1285] },
  { symbol: "SUNPHARMA",  name: "Sun Pharmaceutical Ind.",       sector: "Pharma",        exchange: "NSE", marketCapCr:  292000, marketCapLabel:  "₹2,92,000 Cr", capCategory: "large" as const, price: 1220.40,  change:  0.82, changeAmt:   9.90, color: "#7C3AED", spark: [1200,1205,1210,1212,1215,1218,1220] },
  { symbol: "NESTLEIND",  name: "Nestle India Ltd.",             sector: "FMCG",          exchange: "NSE", marketCapCr:  218000, marketCapLabel:  "₹2,18,000 Cr", capCategory: "large" as const, price: 2248.00,  change: -0.15, changeAmt:  -3.45, color: "#B45309", spark: [2260,2258,2256,2254,2252,2250,2248] },
  { symbol: "TITAN",      name: "Titan Company Ltd.",            sector: "Consumer",      exchange: "NSE", marketCapCr:  256000, marketCapLabel:  "₹2,56,000 Cr", capCategory: "large" as const, price: 2876.00,  change:  1.24, changeAmt:  35.20, color: "#D97706", spark: [2820,2835,2848,2855,2862,2870,2876] },
  { symbol: "ZOMATO",     name: "Zomato Ltd.",                   sector: "Consumer Tech", exchange: "NSE", marketCapCr:  185000, marketCapLabel:  "₹1,85,000 Cr", capCategory: "mid"   as const, price:  212.40,  change:  2.85, changeAmt:   5.85, color: "#DC2626", spark: [198,202,205,207,209,211,212] },
  { symbol: "COALINDIA",  name: "Coal India Ltd.",               sector: "Mining",        exchange: "NSE", marketCapCr:  235000, marketCapLabel:  "₹2,35,000 Cr", capCategory: "large" as const, price:  384.80,  change:  0.44, changeAmt:   1.70, color: "#1D4ED8", spark: [380,381,382,382,383,384,384] },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.",             sector: "Consumer",      exchange: "NSE", marketCapCr:  195000, marketCapLabel:  "₹1,95,000 Cr", capCategory: "large" as const, price: 2040.60,  change: -0.92, changeAmt: -18.90, color: "#0891B2", spark: [2065,2060,2056,2052,2048,2044,2040] },
  { symbol: "BRITANNIA",  name: "Britannia Industries Ltd.",     sector: "FMCG",          exchange: "NSE", marketCapCr:  135000, marketCapLabel:  "₹1,35,000 Cr", capCategory: "mid"   as const, price: 5628.00,  change: -0.48, changeAmt: -27.30, color: "#15803D", spark: [5680,5672,5664,5656,5648,5640,5628] },
  { symbol: "ADANIENT",   name: "Adani Enterprises Ltd.",        sector: "Conglomerate",  exchange: "NSE", marketCapCr:  287000, marketCapLabel:  "₹2,87,000 Cr", capCategory: "large" as const, price: 2542.00,  change: -1.85, changeAmt: -47.90, color: "#7C3AED", spark: [2620,2610,2600,2590,2572,2554,2542] },
  { symbol: "TATAPOWER",  name: "Tata Power Company Ltd.",       sector: "Power",         exchange: "NSE", marketCapCr:  119000, marketCapLabel:  "₹1,19,000 Cr", capCategory: "mid"   as const, price:  374.00,  change:  1.95, changeAmt:   7.15, color: "#B91C1C", spark: [358,362,366,368,370,372,374] },
]

// ─── Slug helper ────────────────────────────────────────────────────────────

function toSlug(symbol: string) {
  return symbol.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

// ─── Extended fundamentals per stock ────────────────────────────────────────

const EXTRAS: Record<string, {
  pe: number; pb: number; eps: number; roce: number; roe: number
  debtEq: number; divYield: number; bookVal: number; faceVal: number
  wHigh52: number; wLow52: number; open: number; prevClose: number
  volume: string; avgVol: string
  promoters: number; fii: number; dii: number; retail: number
  about: string
  industryPE: number
}> = {
  RELIANCE: {
    pe: 26.5, pb: 2.15, eps: 111.20, roce: 10.39, roe: 8.94, debtEq: 0.44,
    divYield: 0.46, bookVal: 1369.30, faceVal: 10,
    wHigh52: 3217.90, wLow52: 2219.60, open: 2932.00, prevClose: 2909.10,
    volume: "1.24 Cr", avgVol: "98.4 L",
    promoters: 50.30, fii: 21.45, dii: 15.82, retail: 12.43,
    industryPE: 18.40,
    about: "Reliance Industries Limited is a Fortune 500 company and India's largest private sector corporation by market capitalization. Founded by Dhirubhai Ambani in 1966, it has diversified operations spanning energy, petrochemicals, retail (Reliance Retail), digital services (Jio Platforms), and media (Network18). Jio alone has over 440 million subscribers, making it the largest telecom operator in India. Reliance Retail is India's largest retailer. The company is managed by Mukesh D. Ambani, Chairman & Managing Director.",
  },
  TCS: {
    pe: 28.4, pb: 13.2, eps: 137.05, roce: 51.20, roe: 48.70, debtEq: 0.03,
    divYield: 1.82, bookVal: 294.70, faceVal: 1,
    wHigh52: 4585.90, wLow52: 3311.60, open: 3918.50, prevClose: 3925.85,
    volume: "42.8 L", avgVol: "38.2 L",
    promoters: 72.19, fii: 12.44, dii: 8.25, retail: 7.12,
    industryPE: 27.80,
    about: "Tata Consultancy Services (TCS) is a global IT services, consulting, and business solutions organization. It is the flagship company of the Tata Group and is listed on both the BSE and NSE. TCS serves clients in banking, financial services, insurance, retail, manufacturing, and telecom industries across 150+ countries. It is consistently ranked among the most valuable IT brands globally.",
  },
  HDFCBANK: {
    pe: 18.2, pb: 2.45, eps: 97.95, roce: 8.20, roe: 14.60, debtEq: 7.80,
    divYield: 1.15, bookVal: 727.30, faceVal: 1,
    wHigh52: 1890.50, wLow52: 1430.20, open: 1789.00, prevClose: 1789.85,
    volume: "1.02 Cr", avgVol: "89.6 L",
    promoters: 0, fii: 47.22, dii: 22.15, retail: 30.63,
    industryPE: 14.20,
    about: "HDFC Bank Limited is India's largest private sector bank by assets and market capitalisation. Formed in 1994, it offers a wide range of banking services including wholesale banking, retail banking, treasury, and credit cards. Following its merger with HDFC Ltd. in 2023, HDFC Bank became one of the top 10 largest banks globally by market cap.",
  },
}

// ─── Derive full detail for any stock ───────────────────────────────────────

function deriveExtras(s: typeof ALL_STOCKS[0]) {
  const base = s.price
  const mc = s.marketCapCr
  const pe = 12 + ((mc / 100000) % 22)
  return {
    pe, pb: 1.2 + (pe / 20), eps: base / pe,
    roce: 8 + (mc / 200000) % 20, roe: 6 + (mc / 300000) % 18,
    debtEq: 0.1 + (mc / 2000000),
    divYield: 0.2 + (mc / 2000000),
    bookVal: base / (1.2 + (pe / 20)), faceVal: base > 1000 ? 10 : 2,
    wHigh52: base * 1.28, wLow52: base * 0.78,
    open: base * 0.995, prevClose: base - s.changeAmt,
    volume: `${(mc / 50000).toFixed(1)} L`, avgVol: `${(mc / 60000).toFixed(1)} L`,
    promoters: 45 + (mc / 200000) % 25, fii: 15 + (mc / 400000) % 20,
    dii: 10 + (mc / 600000) % 18, retail: 8 + (mc / 800000) % 12,
    industryPE: pe * 0.85,
    about: `${s.name} is one of India's leading companies in the ${s.sector} sector, listed on the ${s.exchange}. It is classified as a ${s.capCategory}-cap stock with a market capitalization of ${s.marketCapLabel}. The company has consistently delivered strong financial performance, maintaining a leadership position in its core business while expanding into adjacent opportunities to drive long-term shareholder value.`,
  }
}

function getStock(slug: string) {
  const base = ALL_STOCKS.find(s => toSlug(s.symbol) === slug)
  if (!base) return null
  const extras = EXTRAS[base.symbol] ?? deriveExtras(base)
  return { ...base, ...extras }
}

// ─── Chart data generator (deterministic) ───────────────────────────────────

const TFS = ["1D","1W","1M","3M","1Y","5Y"] as const
type TF = typeof TFS[number]

function genChart(price: number, changeAmt: number, tf: TF): number[] {
  const pts: Record<TF, number> = { "1D": 60, "1W": 35, "1M": 30, "3M": 60, "1Y": 60, "5Y": 60 }
  const n = pts[tf]
  const start = price - changeAmt * (tf === "1D" ? 1 : tf === "1W" ? 5 : tf === "1M" ? 10 : tf === "3M" ? 18 : tf === "1Y" ? 30 : 50)
  const seed = Math.floor(price * 100) % 997
  const result: number[] = []
  let cur = start
  for (let i = 0; i < n - 1; i++) {
    const wave = price * 0.004 * Math.sin((i + seed) / 5)
    const trend = (price - start) / n
    cur = cur + trend + wave * (i % 3 === 0 ? 1 : -0.4)
    result.push(Math.max(cur, price * 0.6))
  }
  result.push(price)
  return result
}

const TF_RETURNS: Record<TF, number> = {
  "1D": -0.42, "1W": 1.85, "1M": -3.20, "3M": 4.12, "1Y": 8.74, "5Y": 102.40,
}

// ─── SVG Chart ──────────────────────────────────────────────────────────────

function StockChart({ data, positive }: { data: number[]; positive: boolean }) {
  const W = 900, H = 200, PAD = 6
  const min = Math.min(...data) - (Math.max(...data) - Math.min(...data)) * 0.08
  const max = Math.max(...data)
  const range = max - min || 1

  const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = (v: number) => PAD + (1 - (v - min) / range) * (H - PAD * 2)

  const pts = data.map((v, i) => `${x(i)},${y(v)}`).join(" ")
  const areaPath = `M${x(0)},${H} ${data.map((v, i) => `L${x(i)},${y(v)}`).join(" ")} L${x(data.length - 1)},${H} Z`
  const color = positive ? "#16a34a" : "#FF0000"
  const fillId = positive ? "areaGreenStock" : "areaRedStock"

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="85%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1={PAD} y1={PAD + p * (H - PAD * 2)} x2={W - PAD} y2={PAD + p * (H - PAD * 2)}
          stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="4 4" />
      ))}
      <path d={areaPath} fill={`url(#${fillId})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="4" fill={color}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// ─── Donut chart (shareholding) ──────────────────────────────────────────────

function DonutChart({ segments }: { segments: { label: string; pct: number; color: string }[] }) {
  const r = 54, cx = 75, cy = 75
  const circ = 2 * Math.PI * r
  let cum = 0
  return (
    <svg viewBox="0 0 150 150" className="w-36 h-36 shrink-0">
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ
        const offset = circ * (0.25 - cum / 100)
        cum += seg.pct
        return (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth="22"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={offset}
          />
        )
      })}
      <circle cx={cx} cy={cy} r="42" fill="white" />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#1a1a1a">
        {segments[0].pct.toFixed(1)}%
      </text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="8" fill="#9ca3af" fontWeight="600">
        PROMOTERS
      </text>
    </svg>
  )
}

// ─── Sparkline ───────────────────────────────────────────────────────────────

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data), max = Math.max(...data), r = max - min || 1
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 60},${20 - ((v - min) / r) * 16}`).join(" ")
  return (
    <svg viewBox="0 0 60 20" className="w-14 h-4">
      <polyline points={pts} fill="none" stroke={up ? "#16a34a" : "#FF0000"} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

// ─── StockAvatar ─────────────────────────────────────────────────────────────

function Ava({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 text-white font-extrabold text-[10px]"
      style={{ backgroundColor: color + "22", color }}>
      {symbol.slice(0, 2)}
    </div>
  )
}

// ─── Tab definitions ─────────────────────────────────────────────────────────

const TABS = ["Fundamental", "Financials", "Shareholding", "Corp. Actions", "Peers", "About"] as const
type Tab = typeof TABS[number]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StockDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""

  const stock = useMemo(() => getStock(slug), [slug])

  const [tf, setTf] = useState<TF>("1D")
  const [tab, setTab] = useState<Tab>("Fundamental")
  const [starred, setStarred] = useState(false)
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy")
  const [qty, setQty] = useState("1")

  if (!stock) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-2xl font-black text-foreground">Stock not found</p>
          <Link href="/stocks" className="text-burgundy font-semibold hover:underline">← Back to all stocks</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const isUp = stock.change >= 0
  const chartData = useMemo(() => genChart(stock.price, stock.changeAmt, tf), [stock.price, stock.changeAmt, tf])
  const tfReturn = TF_RETURNS[tf]
  const tfPos = tfReturn >= 0

  // Derived values
  const high = Math.max(...chartData)
  const low  = Math.min(...chartData)

  const fundMetrics = [
    { label: "P/E Ratio",      value: stock.pe.toFixed(1),         sub: `Industry: ${stock.industryPE.toFixed(1)}` },
    { label: "P/B Ratio",      value: stock.pb.toFixed(2),         sub: "Price to Book" },
    { label: "EPS (TTM)",      value: `₹${stock.eps.toFixed(1)}`,  sub: "Earnings/Share" },
    { label: "ROCE (TTM)",     value: `${stock.roce.toFixed(1)}%`, sub: "Return on Cap. Emp." },
    { label: "ROE",            value: `${stock.roe.toFixed(1)}%`,  sub: "Return on Equity" },
    { label: "Debt to Equity", value: stock.debtEq.toFixed(2),     sub: stock.debtEq < 1 ? "Low leverage" : "High leverage" },
    { label: "Div. Yield",     value: `${stock.divYield.toFixed(2)}%`, sub: "Annual dividend" },
    { label: "Book Value",     value: `₹${stock.bookVal.toFixed(0)}`, sub: "Per share" },
    { label: "Market Cap",     value: stock.marketCapLabel,        sub: stock.capCategory + " cap" },
    { label: "Face Value",     value: `₹${stock.faceVal}`,         sub: "Per share" },
  ]

  // Quarterly financials (derived from market cap)
  const qtrs = ["Mar 2025", "Jun 2025", "Sep 2025", "Dec 2025"]
  const baseRev = stock.marketCapCr / 55
  const financials = qtrs.map((q, i) => ({
    quarter: q,
    revenue:  +(baseRev * (0.88 + i * 0.06)).toFixed(0),
    expenses: +(baseRev * (0.68 + i * 0.045)).toFixed(0),
    opProfit: +(baseRev * (0.20 + i * 0.015)).toFixed(0),
    netProfit:+(baseRev * (0.12 + i * 0.010)).toFixed(0),
    eps:      +(stock.eps * (0.88 + i * 0.06)).toFixed(1),
    opm:      (22 + i * 1.2).toFixed(1),
  }))

  const shareholding = [
    { label: "Promoters",  pct: stock.promoters, color: "#8B0D19" },
    { label: "FII/FPI",   pct: stock.fii,       color: "#D9B27C" },
    { label: "DII",       pct: stock.dii,       color: "#16a34a" },
    { label: "Retail",    pct: stock.retail,    color: "#6366f1" },
    { label: "Others",    pct: Math.max(0, 100 - stock.promoters - stock.fii - stock.dii - stock.retail).toFixed(1) as unknown as number, color: "#94a3b8" },
  ]

  const corpActions = [
    { type: "Dividend", detail: `₹${(stock.price * stock.divYield / 100).toFixed(1)} per share`, date: "Mar 2025", icon: "💰" },
    { type: "Bonus",    detail: "1:1 Bonus Issue",   date: "Sep 2023",  icon: "🎁" },
    { type: "Split",    detail: `${stock.faceVal === 1 ? "5:1" : "2:1"} Stock Split`, date: "Jul 2022", icon: "✂️" },
    { type: "Dividend", detail: `₹${(stock.price * stock.divYield / 120).toFixed(1)} per share`, date: "Mar 2024", icon: "💰" },
  ]

  const peers = ALL_STOCKS
    .filter(s => s.sector === stock.sector && s.symbol !== stock.symbol)
    .slice(0, 5)

  const topMFs = [
    { fund: "SBI Bluechip Fund",      holding: "4.32%", aum: "₹48,200 Cr" },
    { fund: "HDFC Flexi Cap Fund",    holding: "3.87%", aum: "₹52,800 Cr" },
    { fund: "Mirae Asset Large Cap",  holding: "3.45%", aum: "₹38,100 Cr" },
    { fund: "Axis Bluechip Fund",     holding: "3.20%", aum: "₹31,400 Cr" },
    { fund: "Nippon India Large Cap", holding: "2.94%", aum: "₹24,900 Cr" },
  ]

  const news = [
    { tag: stock.sector, headline: `${stock.name.split(" ")[0]} posts record quarterly revenue on strong demand`, date: "Jun 21, 2026" },
    { tag: "Markets",    headline: `Institutional investors increase stake in ${stock.symbol} amid bullish outlook`, date: "Jun 20, 2026" },
    { tag: "Analysis",  headline: `Analysts raise target price for ${stock.symbol}; 3 brokerages upgrade to Buy`, date: "Jun 18, 2026" },
  ]

  const relatedStocks = ALL_STOCKS
    .filter(s => s.symbol !== stock.symbol)
    .filter(s => s.sector === stock.sector || s.capCategory === stock.capCategory)
    .slice(0, 5)

  const fmtPrice = (p: number) => p.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fmtCr   = (v: number) => v >= 10000 ? `₹${(v / 100).toFixed(0)} Cr` : `₹${v.toFixed(0)} Cr`

  // 52W range position
  const weekRange52Pct = ((stock.price - stock.wLow52) / (stock.wHigh52 - stock.wLow52)) * 100

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/stocks" className="hover:text-foreground transition-colors">All Stocks</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{stock.symbol}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left: identity + price */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 font-extrabold text-sm text-white"
                  style={{ backgroundColor: stock.color }}>
                  {stock.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-black text-foreground leading-tight truncate">{stock.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-burgundy/10 text-burgundy rounded-[4px]">{stock.exchange}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-secondary text-muted-foreground rounded-[4px]">{stock.sector}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-gold/15 text-gold-deep rounded-[4px] capitalize">{stock.capCategory} Cap</span>
                    <span className="flex items-center gap-1 text-[10px] text-profit font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse inline-block" />
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-3">
                <span className="text-4xl sm:text-5xl font-black text-foreground tabular-nums tracking-tight">
                  ₹{fmtPrice(stock.price)}
                </span>
                <div className={`flex items-center gap-1 mb-1.5 px-2.5 py-1 rounded-[5px] font-black text-sm ${isUp ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
                  {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{isUp ? "+" : ""}{fmtPrice(Math.abs(stock.changeAmt))}</span>
                  <span>({isUp ? "+" : ""}{stock.change.toFixed(2)}%)</span>
                </div>
              </div>

              {/* Day stats row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground mb-4">
                <span>Open: <span className="font-bold text-foreground tabular-nums">₹{fmtPrice(stock.open)}</span></span>
                <span>Prev Close: <span className="font-bold text-foreground tabular-nums">₹{fmtPrice(stock.prevClose)}</span></span>
                <span>Volume: <span className="font-bold text-foreground">{stock.volume}</span></span>
                <span>Avg Vol: <span className="font-bold text-foreground">{stock.avgVol}</span></span>
              </div>

              {/* 52W range bar */}
              <div className="max-w-xs">
                <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mb-1">
                  <span>52W Low: ₹{fmtPrice(stock.wLow52)}</span>
                  <span>52W High: ₹{fmtPrice(stock.wHigh52)}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-loss via-gold to-profit rounded-full" style={{ width: "100%" }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-sm"
                    style={{ left: `calc(${weekRange52Pct}% - 6px)` }} />
                </div>
              </div>
            </div>

            {/* Right: action buttons (desktop hero) */}
            <div className="flex items-center gap-2 lg:mt-2">
              <button
                onClick={() => setStarred(s => !s)}
                className={`w-9 h-9 rounded-[7px] border flex items-center justify-center transition-all ${starred ? "bg-gold/10 border-gold/30 text-gold-deep" : "bg-white border-border text-muted-foreground hover:border-gold/30 hover:text-gold-deep"}`}
              >
                <Star className={`w-4 h-4 ${starred ? "fill-gold-deep" : ""}`} />
              </button>
              <button className="w-9 h-9 rounded-[7px] border border-border bg-white flex items-center justify-center text-muted-foreground hover:border-burgundy/30 hover:text-burgundy transition-all">
                <Bell className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-[7px] border border-border bg-white flex items-center justify-center text-muted-foreground hover:border-burgundy/30 hover:text-burgundy transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <Link href="/signup/register"
                className="px-5 py-2 rounded-[7px] bg-profit text-white font-bold text-sm hover:opacity-90 transition-opacity">
                Buy
              </Link>
              <Link href="/signup/register"
                className="px-5 py-2 rounded-[7px] bg-loss text-white font-bold text-sm hover:opacity-90 transition-opacity">
                Sell
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="py-6 lg:py-8 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5">

              {/* Chart card */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {/* Timeframe tabs */}
                <div className="flex items-center justify-between px-4 pt-4 pb-0 gap-3">
                  <div className="flex gap-0.5">
                    {TFS.map(t => (
                      <button key={t} onClick={() => setTf(t)}
                        className={`px-3 py-1.5 text-[11px] font-bold rounded-[5px] transition-all duration-150 ${
                          tf === t ? "bg-burgundy text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                  <div className={`text-sm font-black tabular-nums ${tfPos ? "text-profit" : "text-loss"}`}>
                    {tfPos ? "+" : ""}{tfReturn.toFixed(2)}%
                  </div>
                </div>

                {/* SVG area chart */}
                <div className="px-2 py-2">
                  <AnimatePresence mode="wait">
                    <motion.div key={tf}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <StockChart data={chartData} positive={tfPos} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* OHLC footer */}
                <div className="grid grid-cols-4 border-t border-border/60 divide-x divide-border/60">
                  {[
                    { label: "Open",  value: `₹${fmtPrice(stock.open)}` },
                    { label: "High",  value: `₹${fmtPrice(high)}` },
                    { label: "Low",   value: `₹${fmtPrice(low)}` },
                    { label: "Close", value: `₹${fmtPrice(stock.prevClose)}` },
                  ].map(s => (
                    <div key={s.label} className="px-3 py-2.5 text-center">
                      <div className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-0.5">{s.label}</div>
                      <div className="text-xs font-extrabold text-foreground tabular-nums">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── TAB NAVIGATION ── */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {/* Tab bar */}
                <div className="overflow-x-auto border-b border-border/60" style={{ scrollbarWidth: "none" }}>
                  <div className="flex">
                    {TABS.map(t => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`relative px-5 py-3.5 text-[12px] font-bold whitespace-nowrap transition-colors duration-150 ${
                          tab === t ? "text-burgundy" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                        {tab === t && (
                          <motion.div layoutId="tabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div key={tab}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="p-5"
                  >

                    {/* ── FUNDAMENTAL ── */}
                    {tab === "Fundamental" && (
                      <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {fundMetrics.map(m => (
                            <div key={m.label} className="bg-cream/60 border border-border/60 rounded-[8px] px-3 py-3">
                              <div className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">{m.label}</div>
                              <div className="text-base font-black text-foreground tabular-nums leading-tight">{m.value}</div>
                              <div className="text-[9px] text-muted-foreground/70 mt-0.5">{m.sub}</div>
                            </div>
                          ))}
                        </div>

                        {/* Performance bar */}
                        <div className="mt-5">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Performance vs Index</p>
                          <div className="space-y-2.5">
                            {[
                              { label: stock.symbol, pct: Math.abs(stock.change) * 8 + 40 },
                              { label: "NIFTY 50",   pct: 38 },
                              { label: "Sector Avg", pct: 44 },
                            ].map(row => (
                              <div key={row.label} className="flex items-center gap-3">
                                <span className="text-[11px] font-semibold text-muted-foreground w-24 shrink-0">{row.label}</span>
                                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <motion.div className="h-full bg-burgundy rounded-full"
                                    initial={{ width: 0 }} animate={{ width: `${row.pct}%` }}
                                    transition={{ duration: 0.6, ease: "easeOut" }} />
                                </div>
                                <span className="text-[11px] font-bold text-foreground tabular-nums w-8 text-right">{row.pct.toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── FINANCIALS ── */}
                    {tab === "Financials" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-black text-foreground">Quarterly Results</p>
                          <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Standalone · ₹ Crore</span>
                        </div>
                        <div className="overflow-x-auto -mx-5" style={{ scrollbarWidth: "none" }}>
                          <table className="w-full min-w-[520px] text-sm">
                            <thead>
                              <tr className="border-b border-border/60">
                                <th className="pl-5 pr-3 py-2.5 text-left text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">Metric</th>
                                {qtrs.map(q => (
                                  <th key={q} className="px-3 py-2.5 text-right text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">{q}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                              {[
                                { label: "Net Revenue",   key: "revenue"   as const, fmt: (v: number | string) => fmtCr(+v) },
                                { label: "Expenses",      key: "expenses"  as const, fmt: (v: number | string) => fmtCr(+v) },
                                { label: "Op. Profit",    key: "opProfit"  as const, fmt: (v: number | string) => fmtCr(+v) },
                                { label: "OPM %",         key: "opm"       as const, fmt: (v: number | string) => `${v}%` },
                                { label: "Net Profit",    key: "netProfit" as const, fmt: (v: number | string) => fmtCr(+v) },
                                { label: "EPS (₹)",       key: "eps"       as const, fmt: (v: number | string) => `₹${v}` },
                              ].map(row => (
                                <tr key={row.label} className="hover:bg-cream/40 transition-colors">
                                  <td className="pl-5 pr-3 py-2.5 text-[11px] font-semibold text-muted-foreground">{row.label}</td>
                                  {financials.map(f => (
                                    <td key={f.quarter} className="px-3 py-2.5 text-right text-[11px] font-bold text-foreground tabular-nums">
                                      {row.fmt(f[row.key])}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Revenue trend bars */}
                        <div className="mt-5 pt-4 border-t border-border/60">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Revenue Trend</p>
                          <div className="flex items-end gap-2 h-16">
                            {financials.map((f, i) => {
                              const maxRev = Math.max(...financials.map(x => x.revenue))
                              const h = (f.revenue / maxRev) * 100
                              return (
                                <div key={f.quarter} className="flex-1 flex flex-col items-center gap-1">
                                  <motion.div className="w-full rounded-t-[3px] bg-burgundy/80"
                                    initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    style={{ minHeight: "4px" }} />
                                  <span className="text-[8px] text-muted-foreground font-semibold">{f.quarter.slice(0, 6)}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── SHAREHOLDING ── */}
                    {tab === "Shareholding" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-black text-foreground">Shareholding Pattern</p>
                          <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">As of Dec 2025</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                          <DonutChart segments={shareholding} />
                          <div className="flex-1 space-y-3 w-full">
                            {shareholding.map(s => (
                              <div key={s.label}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                    <span className="text-[12px] font-semibold text-foreground">{s.label}</span>
                                  </div>
                                  <span className="text-[12px] font-black text-foreground tabular-nums">{+s.pct > 0 ? (+s.pct).toFixed(1) : "0.0"}%</span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <motion.div className="h-full rounded-full"
                                    style={{ backgroundColor: s.color }}
                                    initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                                    transition={{ duration: 0.6 }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* QoQ change */}
                        <div className="mt-5 pt-4 border-t border-border/60">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Quarter-on-Quarter Change</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {shareholding.slice(0, 4).map(s => (
                              <div key={s.label} className="bg-cream/60 rounded-[7px] px-3 py-2.5 border border-border/60">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                                  <span className="text-[10px] font-semibold text-muted-foreground">{s.label}</span>
                                </div>
                                <div className="text-sm font-black text-foreground">{+s.pct > 0 ? (+s.pct).toFixed(1) : "0.0"}%</div>
                                <div className={`text-[10px] font-bold ${Math.random() > 0.5 ? "text-profit" : "text-loss"}`}>
                                  {Math.random() > 0.5 ? "▲" : "▼"} {(Math.random() * 1.5).toFixed(2)}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── CORPORATE ACTIONS ── */}
                    {tab === "Corp. Actions" && (
                      <div>
                        <p className="text-sm font-black text-foreground mb-4">Corporate Actions History</p>
                        <div className="space-y-3">
                          {corpActions.map((a, i) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="flex items-start gap-3 p-3.5 bg-cream/50 border border-border/60 rounded-[8px]"
                            >
                              <span className="text-xl shrink-0">{a.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-black text-foreground">{a.type}</span>
                                  <span className="text-[10px] text-muted-foreground font-semibold shrink-0 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {a.date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">{a.detail}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Historical Returns table */}
                        <div className="mt-5 pt-4 border-t border-border/60">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Historical Returns</p>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {(["1W","1M","3M","6M","1Y","3Y"] as const).map((p, i) => {
                              const ret = [-1.23, -3.17, 4.31, 6.80, 8.70, 45.20][i]
                              return (
                                <div key={p} className={`rounded-[7px] px-3 py-2.5 text-center border ${ret >= 0 ? "bg-profit/8 border-profit/20" : "bg-loss/8 border-loss/20"}`}>
                                  <div className="text-[10px] font-extrabold text-muted-foreground mb-0.5">{p}</div>
                                  <div className={`text-sm font-black tabular-nums ${ret >= 0 ? "text-profit" : "text-loss"}`}>
                                    {ret >= 0 ? "+" : ""}{ret.toFixed(1)}%
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── PEERS ── */}
                    {tab === "Peers" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-black text-foreground">Peer Comparison · {stock.sector}</p>
                          <span className="text-[10px] text-muted-foreground font-semibold">vs {stock.symbol}</span>
                        </div>
                        <div className="overflow-x-auto -mx-5" style={{ scrollbarWidth: "none" }}>
                          <table className="w-full min-w-[580px]">
                            <thead>
                              <tr className="border-b border-border/60">
                                {["Company","LTP","Chg %","Mkt Cap","P/E","52W Hi/Lo"].map(h => (
                                  <th key={h} className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground ${h === "Company" ? "text-left pl-5" : "text-right"}`}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                              {/* Current stock highlighted */}
                              <tr className="bg-burgundy/4 border-l-2 border-l-burgundy">
                                <td className="pl-5 pr-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <Ava symbol={stock.symbol} color={stock.color} />
                                    <div>
                                      <div className="text-xs font-extrabold text-foreground">{stock.symbol}</div>
                                      <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right text-xs font-extrabold text-foreground tabular-nums">₹{fmtPrice(stock.price)}</td>
                                <td className={`px-4 py-3 text-right text-xs font-black tabular-nums ${isUp ? "text-profit" : "text-loss"}`}>{isUp ? "+" : ""}{stock.change.toFixed(2)}%</td>
                                <td className="px-4 py-3 text-right text-[11px] text-muted-foreground">{stock.marketCapLabel}</td>
                                <td className="px-4 py-3 text-right text-xs font-bold text-foreground tabular-nums">{stock.pe.toFixed(1)}</td>
                                <td className="px-4 py-3 text-right text-[10px] text-muted-foreground tabular-nums">
                                  ₹{fmtPrice(stock.wLow52)} / ₹{fmtPrice(stock.wHigh52)}
                                </td>
                              </tr>
                              {peers.map(p => {
                                const pUp = p.change >= 0
                                const pPE = (15 + (p.marketCapCr / 100000) % 22).toFixed(1)
                                return (
                                  <tr key={p.symbol} className="hover:bg-cream/40 transition-colors cursor-pointer"
                                    onClick={() => window.location.href = `/stocks/${toSlug(p.symbol)}`}>
                                    <td className="pl-5 pr-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <Ava symbol={p.symbol} color={p.color} />
                                        <div>
                                          <div className="text-xs font-extrabold text-foreground">{p.symbol}</div>
                                          <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">{p.name}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-right text-xs font-extrabold text-foreground tabular-nums">₹{fmtPrice(p.price)}</td>
                                    <td className={`px-4 py-3 text-right text-xs font-black tabular-nums ${pUp ? "text-profit" : "text-loss"}`}>{pUp ? "+" : ""}{p.change.toFixed(2)}%</td>
                                    <td className="px-4 py-3 text-right text-[11px] text-muted-foreground">{p.marketCapLabel}</td>
                                    <td className="px-4 py-3 text-right text-xs font-bold text-foreground tabular-nums">{pPE}</td>
                                    <td className="px-4 py-3 text-right text-[10px] text-muted-foreground tabular-nums">
                                      ₹{fmtPrice(p.price * 0.78)} / ₹{fmtPrice(p.price * 1.28)}
                                    </td>
                                  </tr>
                                )
                              })}
                              {peers.length === 0 && (
                                <tr><td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">No peers found in this sector</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* ── ABOUT ── */}
                    {tab === "About" && (
                      <div>
                        <p className="text-sm font-black text-foreground mb-3">About {stock.name}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{stock.about}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { icon: Building2, label: "Founded",   val: "1966" },
                            { icon: BarChart3, label: "Listed",    val: "1995"  },
                            { icon: Award,     label: "Index",     val: "NIFTY 50" },
                            { icon: ShieldCheck,label:"SEBI Cat.", val: "Large Cap" },
                          ].map(f => (
                            <div key={f.label} className="bg-cream/60 border border-border/60 rounded-[8px] px-3 py-3 flex items-start gap-2">
                              <f.icon className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                              <div>
                                <div className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">{f.label}</div>
                                <div className="text-xs font-bold text-foreground mt-0.5">{f.val}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-border/60">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Management</p>
                          {["Chairman & Managing Director", "Chief Financial Officer", "Company Secretary"].map((role, i) => (
                            <div key={role} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                              <div>
                                <div className="text-xs font-bold text-foreground">{["Mukesh D. Ambani", "V. Srikanth", "Savithri Parekh"][i]}</div>
                                <div className="text-[10px] text-muted-foreground">{role}</div>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── F&O Section ── */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: `${stock.symbol} Futures`, icon: "📈", desc: "Trade futures contracts on this stock", color: "bg-burgundy/5 border-burgundy/20" },
                  { title: `${stock.symbol} Options`, icon: "🔗", desc: "View the complete option chain", color: "bg-gold/5 border-gold/30" },
                ].map(c => (
                  <Link key={c.title} href="/futures-options"
                    className={`flex items-center gap-3 p-4 rounded-[10px] border ${c.color} hover:shadow-sm transition-all group`}>
                    <span className="text-2xl">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-foreground group-hover:text-burgundy transition-colors">{c.title}</div>
                      <div className="text-[11px] text-muted-foreground">{c.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-burgundy transition-colors shrink-0" />
                  </Link>
                ))}
              </div>

              {/* ── TOP MF HOLDINGS ── */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="px-5 py-4 border-b border-border/60">
                  <p className="text-sm font-black text-foreground">Top Mutual Funds Holding {stock.symbol}</p>
                </div>
                <div className="divide-y divide-border/40">
                  {topMFs.map((f, i) => (
                    <motion.div key={f.fund} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-5 py-3 hover:bg-cream/40 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-[6px] bg-burgundy/8 flex items-center justify-center shrink-0">
                          <BookOpen className="w-3.5 h-3.5 text-burgundy" />
                        </div>
                        <span className="text-xs font-semibold text-foreground truncate">{f.fund}</span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                          <div className="text-[10px] text-muted-foreground">AUM</div>
                          <div className="text-xs font-bold text-foreground">{f.aum}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground">Holding</div>
                          <div className="text-xs font-black text-burgundy tabular-nums">{f.holding}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-border/60">
                  <button className="text-[11px] font-bold text-burgundy hover:underline flex items-center gap-1">
                    View all mutual funds holding {stock.symbol} <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* ── LATEST NEWS ── */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
                  <p className="text-sm font-black text-foreground">Latest News · {stock.symbol}</p>
                  <Newspaper className="w-4 h-4 text-muted-foreground/40" />
                </div>
                <div className="divide-y divide-border/40">
                  {news.map((n, i) => (
                    <div key={i} className="px-5 py-4 hover:bg-cream/40 transition-colors cursor-pointer group">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-burgundy/10 text-burgundy rounded-[3px] uppercase tracking-wide">{n.tag}</span>
                          <p className="text-xs font-bold text-foreground mt-1.5 leading-relaxed group-hover:text-burgundy transition-colors line-clamp-2">{n.headline}</p>
                          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" /> {n.date}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-burgundy transition-colors shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-4 lg:sticky lg:top-24">

              {/* Trade widget */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {/* Buy / Sell toggle */}
                <div className="flex border-b border-border/60">
                  {(["buy", "sell"] as const).map(m => (
                    <button key={m} onClick={() => setTradeMode(m)}
                      className={`flex-1 py-3.5 text-sm font-black capitalize tracking-wide transition-all duration-150 ${
                        tradeMode === m
                          ? m === "buy" ? "bg-profit text-white" : "bg-loss text-white"
                          : "text-muted-foreground hover:bg-cream/60"
                      }`}
                    >{m}</button>
                  ))}
                </div>
                <div className="p-4 space-y-3">
                  {/* Price display */}
                  <div className="bg-cream/60 rounded-[7px] px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">Market Price</span>
                    <span className="text-sm font-black text-foreground tabular-nums">₹{fmtPrice(stock.price)}</span>
                  </div>
                  {/* Qty */}
                  <div>
                    <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block mb-1.5">Quantity</label>
                    <div className="flex items-center border border-border rounded-[7px] overflow-hidden bg-cream/30">
                      <button onClick={() => setQty(q => String(Math.max(1, +q - 1)))}
                        className="px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-white/80 transition-colors font-bold text-lg leading-none">−</button>
                      <input value={qty} onChange={e => setQty(e.target.value.replace(/\D/g, "") || "1")}
                        className="flex-1 text-center text-sm font-black text-foreground bg-transparent outline-none tabular-nums py-2.5" />
                      <button onClick={() => setQty(q => String(+q + 1))}
                        className="px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-white/80 transition-colors font-bold text-lg leading-none">+</button>
                    </div>
                  </div>
                  {/* Total */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-semibold">Est. Total</span>
                    <span className="font-black text-foreground tabular-nums">₹{(stock.price * +qty).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <Link href="/signup/register"
                    className={`w-full py-3 rounded-[7px] font-black text-sm text-white text-center block transition-opacity hover:opacity-90 ${tradeMode === "buy" ? "bg-profit" : "bg-loss"}`}>
                    {tradeMode === "buy" ? "Buy" : "Sell"} {stock.symbol} →
                  </Link>
                  <p className="text-[9px] text-muted-foreground text-center">Login required. SEBI registered broker.</p>
                </div>
              </div>

              {/* Open Demat Account CTA */}
              <div className="rounded-[10px] overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, #8B0D19 0%, #6B0A13 60%, #4A0709 100%)" }}>
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #D9B27C 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-8"
                  style={{ background: "radial-gradient(circle, #D9B27C 0%, transparent 70%)", filter: "blur(15px)" }} />

                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-[7px] bg-white/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="text-[9px] font-extrabold text-gold/80 uppercase tracking-wider">Start Investing</div>
                      <div className="text-sm font-black text-white leading-tight">Open Demat Account</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/70 leading-relaxed mb-4">
                    Start trading {stock.symbol} and 5,000+ stocks with ₹0 account opening & ₹0 AMC.
                  </p>

                  <div className="space-y-2 mb-4">
                    {["₹0 Account Opening Fee", "₹17 Flat Brokerage", "3-in-1 Account (Demat + Trading + Bank)", "Instant Account Opening"].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                          <span className="text-[8px] text-white font-black">✓</span>
                        </div>
                        <span className="text-[11px] text-white/80 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/signup/register"
                    className="w-full py-3 rounded-[7px] bg-gold text-[#4A0709] font-black text-sm text-center block hover:bg-gold/90 transition-colors">
                    Open Free Account →
                  </Link>
                  <p className="text-[9px] text-white/40 text-center mt-2">SEBI Reg. No. INZ000229134 · CDSL DP-2100</p>
                </div>
              </div>

              {/* Key quick stats */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="px-4 py-3 border-b border-border/60">
                  <p className="text-xs font-black text-foreground">Key Statistics</p>
                </div>
                <div className="divide-y divide-border/40">
                  {[
                    { label: "Market Cap",   value: stock.marketCapLabel },
                    { label: "P/E Ratio",    value: stock.pe.toFixed(1)         },
                    { label: "52W High",     value: `₹${fmtPrice(stock.wHigh52)}` },
                    { label: "52W Low",      value: `₹${fmtPrice(stock.wLow52)}`  },
                    { label: "Avg Volume",   value: stock.avgVol                },
                    { label: "Div. Yield",   value: `${stock.divYield.toFixed(2)}%` },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[11px] text-muted-foreground font-semibold">{s.label}</span>
                      <span className="text-[11px] font-black text-foreground tabular-nums">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related stocks */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="px-4 py-3 border-b border-border/60">
                  <p className="text-xs font-black text-foreground">Related Stocks</p>
                </div>
                <div className="divide-y divide-border/40">
                  {relatedStocks.map(s => {
                    const up = s.change >= 0
                    return (
                      <Link key={s.symbol} href={`/stocks/${toSlug(s.symbol)}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-cream/40 transition-colors group">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Ava symbol={s.symbol} color={s.color} />
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-foreground truncate">{s.symbol}</div>
                            <div className="text-[9px] text-muted-foreground truncate">{s.sector}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-black text-foreground tabular-nums">₹{s.price.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                          <div className={`text-[10px] font-black tabular-nums flex items-center justify-end gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                            <Spark data={s.spark} up={up} />
                            {up ? "+" : ""}{s.change.toFixed(2)}%
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Star, Bell, Share2, ChevronRight,
  ArrowUpRight, ArrowDownRight, Building2,
  Calendar, Zap, BarChart3, Newspaper,
  Award, Users, MapPin, Phone, Mail, Globe,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StockAvatar } from "@/components/stock-avatar"
import { TradingViewPriceChart } from "@/components/tradingview-chart"
import { useCorporateActions } from "@/hooks/stocks/use-corporate-actions"
import { useStockAbout } from "@/hooks/stocks/use-stock-about"
import { useStockFinancials } from "@/hooks/stocks/use-stock-financials"
import { useStockNews } from "@/hooks/stocks/use-stock-news"
import { useStockOverview } from "@/hooks/stocks/use-stock-overview"
import { useStockPeers } from "@/hooks/stocks/use-stock-peers"
import {
  NO_VALUE, formatDate, formatPercent, formatPrice, formatQuoteTime, formatRupees, formatVolume,
} from "@/lib/stocks/format"
import type { CorporateAction, FinancialsRowFormat, StockSummary } from "@/lib/stocks/types"

/* ─── Dummy data (replaced by the CMOTS API; kept for reference) ──────────────

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

interface CompanyInfo {
  incorporated: string; lastName: string; marketLot: number
  chairman: string; auditor: string; group: string
  address: string; phone: string; email: string; website: string
}

const EXTRAS: Record<string, {
  pe: number; pb: number; eps: number; roce: number; roe: number
  debtEq: number; divYield: number; bookVal: number; faceVal: number
  wHigh52: number; wLow52: number; open: number; prevClose: number
  volume: string; avgVol: string
  promoters: number; fii: number; dii: number; retail: number
  company: CompanyInfo
  industryPE: number
}> = {
  RELIANCE: {
    pe: 26.5, pb: 2.15, eps: 111.20, roce: 10.39, roe: 8.94, debtEq: 0.44,
    divYield: 0.46, bookVal: 1369.30, faceVal: 10,
    wHigh52: 3217.90, wLow52: 2219.60, open: 2932.00, prevClose: 2909.10,
    volume: "1.24 Cr", avgVol: "98.4 L",
    promoters: 50.30, fii: 21.45, dii: 15.82, retail: 12.43,
    industryPE: 18.40,
    company: {
      incorporated: "1973", lastName: "Reliance Textile Industries Ltd.", marketLot: 1,
      chairman: "Mukesh D. Ambani", auditor: "Deloitte Haskins & Sells LLP", group: "Reliance",
      address: "3rd Floor, Maker Chambers IV, 222 Nariman Point, Mumbai, Maharashtra 400021",
      phone: "91-022-35555000", email: "investor.relations@ril.com", website: "ril.com",
    },
  },
  TCS: {
    pe: 28.4, pb: 13.2, eps: 137.05, roce: 51.20, roe: 48.70, debtEq: 0.03,
    divYield: 1.82, bookVal: 294.70, faceVal: 1,
    wHigh52: 4585.90, wLow52: 3311.60, open: 3918.50, prevClose: 3925.85,
    volume: "42.8 L", avgVol: "38.2 L",
    promoters: 72.19, fii: 12.44, dii: 8.25, retail: 7.12,
    industryPE: 27.80,
    company: {
      incorporated: "1995", lastName: "Tata Consultancy Services Ltd.", marketLot: 1,
      chairman: "N. Chandrasekaran", auditor: "B S R & Co. LLP", group: "Tata",
      address: "9th Floor, Nirmal Building, Nariman Point, Mumbai, Maharashtra 400021",
      phone: "91-022-67789595", email: "investor.relations@tcs.com", website: "tcs.com",
    },
  },
  HDFCBANK: {
    pe: 18.2, pb: 2.45, eps: 97.95, roce: 8.20, roe: 14.60, debtEq: 7.80,
    divYield: 1.15, bookVal: 727.30, faceVal: 1,
    wHigh52: 1890.50, wLow52: 1430.20, open: 1789.00, prevClose: 1789.85,
    volume: "1.02 Cr", avgVol: "89.6 L",
    promoters: 0, fii: 47.22, dii: 22.15, retail: 30.63,
    industryPE: 14.20,
    company: {
      incorporated: "1994", lastName: "HDFC Bank Ltd.", marketLot: 1,
      chairman: "Atanu Chakraborty", auditor: "Price Waterhouse LLP", group: "HDFC",
      address: "HDFC Bank House, Senapati Bapat Marg, Lower Parel (West), Mumbai, Maharashtra 400013",
      phone: "91-022-39760000", email: "shareholder.grievances@hdfcbank.com", website: "hdfcbank.com",
    },
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
    company: {
      incorporated: String(1960 + (Math.floor(mc) % 50)), lastName: s.name, marketLot: 1,
      chairman: "—", auditor: "—", group: s.name.split(" ")[0],
      address: "—", phone: "—", email: "—",
      website: `${s.symbol.toLowerCase()}.com`,
    } as CompanyInfo,
  }
}

// Deterministic hash → any slug not in ALL_STOCKS still resolves to a real,
// stable (not random-per-render) page instead of a 404, so every stock link
// across the site (menus, sitemap, F&O, groups) has somewhere real to land.
function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

const SECTORS = ["Banking", "IT", "FMCG", "Auto", "Pharma", "Energy", "Power", "Metals", "Realty", "Telecom", "Chemicals", "Cement", "Infrastructure"]
const COLORS = ["#1E40AF", "#0369A1", "#15803D", "#6D28D9", "#B45309", "#1D4ED8", "#DC2626", "#0891B2", "#16A34A", "#7C3AED", "#0D9488", "#B91C1C"]

function synthesizeStock(slug: string) {
  const h = hashSlug(slug)
  const name = slug.split("-").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const price = 80 + (h % 6000) + ((h >> 8) % 100) / 100
  const changePct = ((h % 600) - 300) / 100
  const changeAmt = price * changePct / 100
  const marketCapCr = 2000 + (h % 850000)
  const capCategory: "large" | "mid" | "small" = marketCapCr > 400000 ? "large" : marketCapCr > 50000 ? "mid" : "small"
  return {
    symbol: slug.toUpperCase().replace(/-/g, "").slice(0, 12),
    name: name || slug.toUpperCase(),
    sector: SECTORS[h % SECTORS.length],
    exchange: "NSE" as const,
    marketCapCr,
    marketCapLabel: `₹${marketCapCr.toLocaleString("en-IN")} Cr`,
    capCategory,
    price: Math.round(price * 100) / 100,
    change: Math.round(changePct * 100) / 100,
    changeAmt: Math.round(changeAmt * 100) / 100,
    color: COLORS[h % COLORS.length],
    spark: Array.from({ length: 7 }, (_, i) => Math.round((price - changeAmt * (1 - i / 6)) * 100) / 100),
  } as typeof ALL_STOCKS[number]
}

function getStock(slug: string) {
  const base = ALL_STOCKS.find(s => toSlug(s.symbol) === slug) ?? synthesizeStock(slug)
  const extras = EXTRAS[base.symbol] ?? deriveExtras(base)
  return { ...base, ...extras }
}

// ─── Chart data generator (deterministic) ───────────────────────────────────

function genChart(price: number, changeAmt: number): number[] {
  const n = 60
  const start = price - changeAmt
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

  // Quarterly & yearly financials (derived from market cap)
  const qtrs = ["Mar 2025", "Jun 2025", "Sep 2025", "Dec 2025"]
  const years = ["FY2022", "FY2023", "FY2024", "FY2025"]
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

  const financialsYearly = years.map((y, i) => ({
    quarter: y,
    revenue:  +(baseRev * 4 * (0.70 + i * 0.09)).toFixed(0),
    expenses: +(baseRev * 4 * (0.54 + i * 0.07)).toFixed(0),
    opProfit: +(baseRev * 4 * (0.16 + i * 0.02)).toFixed(0),
    netProfit:+(baseRev * 4 * (0.095 + i * 0.013)).toFixed(0),
    eps:      +(stock.eps * 4 * (0.70 + i * 0.09)).toFixed(1),
    opm:      (19 + i * 1.5).toFixed(1),
  }))

  // Consolidated figures roll in subsidiaries — scaled up from standalone.
  const toConsolidated = (data: typeof financials) => data.map(f => {
    const revenue = +(f.revenue * 1.14).toFixed(0)
    const expenses = +(f.expenses * 1.17).toFixed(0)
    const opProfit = +(f.opProfit * 1.10).toFixed(0)
    const netProfit = +(f.netProfit * 1.07).toFixed(0)
    return {
      quarter: f.quarter,
      revenue, expenses, opProfit, netProfit,
      eps: +(f.eps * 1.05).toFixed(1),
      opm: ((opProfit / revenue) * 100).toFixed(1),
    }
  })
  const financialsConsolidated = toConsolidated(financials)
  const financialsYearlyConsolidated = toConsolidated(financialsYearly)

  const periodFinancials = financialsPeriod === "Quarterly" ? financials : financialsYearly
  const periodFinancialsConsolidated = financialsPeriod === "Quarterly" ? financialsConsolidated : financialsYearlyConsolidated
  const activeFinancials = financialsType === "Standalone" ? periodFinancials : periodFinancialsConsolidated

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

  const news = [
    { tag: stock.sector, headline: `${stock.name.split(" ")[0]} posts record quarterly revenue on strong demand`, date: "Jun 21, 2026" },
    { tag: "Markets",    headline: `Institutional investors increase stake in ${stock.symbol} amid bullish outlook`, date: "Jun 20, 2026" },
    { tag: "Analysis",  headline: `Analysts raise target price for ${stock.symbol}; 3 brokerages upgrade to Buy`, date: "Jun 18, 2026" },
  ]

─────────────────────────────────────────────────────────────────────────────── */

// ─── Tab definitions ─────────────────────────────────────────────────────────

// "Fundamental" and "Shareholding" are hidden for now.
const TABS = [/* "Fundamental", */ "Financials", /* "Shareholding", */ "Corp. Actions", "Peers", "About"] as const
type Tab = typeof TABS[number]

const ACTION_ICONS: Record<CorporateAction["type"], string> = { Dividend: "💰", Bonus: "🎁", Split: "✂️" }

function formatFinancial(value: number | null, format: FinancialsRowFormat) {
  if (value === null) return NO_VALUE
  if (format === "percent") return `${value.toFixed(1)}%`
  if (format === "rupees") return formatRupees(value)
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr`
}

// ─── Shared states ───────────────────────────────────────────────────────────

function Notice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="py-10 px-4 text-center">
      <p className="text-sm font-black text-foreground">{title}</p>
      {children && <div className="text-xs text-muted-foreground mt-1.5">{children}</div>}
    </div>
  )
}

function ErrorNotice({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Notice title="Unable to load this data">
      <p>{message}</p>
      <button onClick={onRetry} className="mt-3 text-xs font-bold text-burgundy hover:underline">Try again</button>
    </Notice>
  )
}

function LoadingRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-10 rounded-[6px] bg-secondary/60" />
      ))}
    </div>
  )
}

function StockPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 pt-24">{children}</div>
      <Footer />
    </main>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StockDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""

  // Remounts on navigation between stocks so nothing from the last stock is shown.
  return <StockLoader key={slug} slug={slug} />
}

function StockLoader({ slug }: { slug: string }) {
  const { data: stock, error, retry } = useStockOverview(slug)

  if (stock) return <StockDetail slug={slug} stock={stock} />

  if (error?.status === 404) {
    return (
      <StockPageShell>
        <p className="text-2xl font-black text-foreground">Stock not found</p>
        <Link href="/stocks" className="text-burgundy font-semibold hover:underline">← Back to all stocks</Link>
      </StockPageShell>
    )
  }

  if (error) {
    return (
      <StockPageShell>
        <ErrorNotice message={error.message} onRetry={retry} />
      </StockPageShell>
    )
  }

  return (
    <StockPageShell>
      <div className="w-full max-w-3xl"><LoadingRows rows={6} /></div>
    </StockPageShell>
  )
}

function StockDetail({ slug, stock }: { slug: string; stock: StockSummary }) {
  const [tab, setTab] = useState<Tab>("Financials")
  const [financialsPeriod, setFinancialsPeriod] = useState<"Quarterly" | "Yearly">("Quarterly")
  const [financialsType, setFinancialsType] = useState<"Standalone" | "Consolidated">("Standalone")
  const [starred, setStarred] = useState(false)
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy")
  const [qty, setQty] = useState("1")

  const financials = useStockFinancials(
    slug,
    financialsPeriod === "Quarterly" ? "quarterly" : "yearly",
    financialsType === "Standalone" ? "standalone" : "consolidated",
    tab === "Financials",
  )
  const corporateActions = useCorporateActions(slug, tab === "Corp. Actions")
  const about = useStockAbout(slug, tab === "About")
  const peers = useStockPeers(slug)
  const news = useStockNews(slug)

  const quote = stock.quote
  const change = quote?.changePct ?? null
  const isUp = (change ?? 0) >= 0
  const peerList = peers.data ?? []

  // 52W range position
  const hasRange = quote?.price != null && quote.high52 != null && quote.low52 != null && quote.high52 > quote.low52
  const weekRange52Pct = hasRange
    ? Math.min(100, Math.max(0, ((quote.price! - quote.low52!) / (quote.high52! - quote.low52!)) * 100))
    : null

  const estTotal = quote?.price != null ? quote.price * +qty : null
  const maxRevenue = Math.max(0, ...(financials.data?.revenue ?? []).map(v => v ?? 0))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-5 overflow-hidden">
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
                <StockAvatar symbol={stock.symbol} name={stock.name} logoUrl={stock.logoUrl} className="w-11 h-11 rounded-[10px] text-sm" />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-black text-foreground leading-tight truncate">{stock.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-burgundy/10 text-burgundy rounded-[4px]">{stock.exchange}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-secondary text-muted-foreground rounded-[4px]">{stock.sector}</span>
                    {stock.capLabel && (
                      <span className="text-[10px] font-black px-2 py-0.5 bg-gold/15 text-gold-deep rounded-[4px]">{stock.capLabel}</span>
                    )}
                    {quote?.updatedAt && (
                      <span className="text-[10px] text-muted-foreground font-bold">As of {formatQuoteTime(quote.updatedAt)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tabular-nums tracking-tight">
                  {formatRupees(quote?.price)}
                </span>
                {change !== null && (
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-[5px] font-black text-sm ${isUp ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
                    {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{isUp ? "+" : "-"}{formatPrice(Math.abs(quote?.changeAmt ?? 0))}</span>
                    <span>({formatPercent(change)})</span>
                  </div>
                )}
              </div>

              {/* Day stats row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground mb-4">
                <span>Open: <span className="font-bold text-foreground tabular-nums">{formatRupees(quote?.open)}</span></span>
                <span>Prev Close: <span className="font-bold text-foreground tabular-nums">{formatRupees(quote?.prevClose)}</span></span>
                <span>Volume: <span className="font-bold text-foreground">{formatVolume(quote?.volume)}</span></span>
              </div>

              {/* 52W range bar */}
              <div className="max-w-xs">
                <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mb-1">
                  <span>52W Low: {formatRupees(quote?.low52)}</span>
                  <span>52W High: {formatRupees(quote?.high52)}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-loss via-gold to-profit rounded-full" style={{ width: "100%" }} />
                  {weekRange52Pct !== null && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-sm"
                      style={{ left: `calc(${weekRange52Pct}% - 6px)` }} />
                  )}
                </div>
              </div>
            </div>

            {/* Right: action buttons (desktop hero) */}
            <div className="flex flex-wrap items-center gap-2 mt-3 lg:mt-2">
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
      <section className="py-6 lg:py-8 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start pb-20 lg:pb-0">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5">

              {/* Chart card */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {stock.tradingViewSymbol ? (
                  <TradingViewPriceChart symbol={stock.tradingViewSymbol} name={stock.name} />
                ) : (
                  <Notice title="Chart not available for this stock" />
                )}

                {/* OHLC footer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border/60 divide-x divide-border/60 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border/60 sm:[&>*:nth-child(n+3)]:border-t-0">
                  {[
                    { label: "Open",       value: formatRupees(quote?.open) },
                    { label: "High",       value: formatRupees(quote?.high) },
                    { label: "Low",        value: formatRupees(quote?.low) },
                    { label: "Prev Close", value: formatRupees(quote?.prevClose) },
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
                    {/* Hidden for now.
                    {tab === "Fundamental" && <Notice title="Fundamental data is not available yet" />} */}

                    {/* ── FINANCIALS ── */}
                    {tab === "Financials" && (
                      <div>
                        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                          <div className="flex bg-secondary/60 p-0.5 rounded-[6px]">
                            {(["Quarterly", "Yearly"] as const).map(p => (
                              <button
                                key={p}
                                onClick={() => setFinancialsPeriod(p)}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-[4px] transition-all duration-150 ${
                                  financialsPeriod === p ? "bg-burgundy text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex bg-secondary/60 p-0.5 rounded-[6px]">
                              {(["Standalone", "Consolidated"] as const).map(t => (
                                <button
                                  key={t}
                                  onClick={() => setFinancialsType(t)}
                                  className={`px-2.5 py-1 text-[10px] font-bold rounded-[4px] transition-all duration-150 ${
                                    financialsType === t ? "bg-burgundy text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] font-semibold text-muted-foreground">₹ Crore</span>
                          </div>
                        </div>

                        {financials.error ? (
                          <ErrorNotice message={financials.error.message} onRetry={financials.retry} />
                        ) : financials.loading || !financials.data ? (
                          <LoadingRows rows={6} />
                        ) : financials.data.periods.length === 0 ? (
                          <Notice title="No financial results available" />
                        ) : (
                          <>
                            <div className="overflow-x-auto -mx-5" style={{ scrollbarWidth: "none" }}>
                              <table className="w-full min-w-[520px] text-sm">
                                <thead>
                                  <tr className="border-b border-border/60">
                                    <th className="pl-5 pr-3 py-2.5 text-left text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">Metric</th>
                                    {financials.data.periods.map(period => (
                                      <th key={period} className="px-3 py-2.5 text-right text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">{period}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                  {financials.data.rows.map(row => (
                                    <tr key={row.label} className="hover:bg-cream/40 transition-colors">
                                      <td className="pl-5 pr-3 py-2.5 text-[11px] font-semibold text-muted-foreground">{row.label}</td>
                                      {row.values.map((value, i) => (
                                        <td key={i} className="px-3 py-2.5 text-right text-[11px] font-bold text-foreground tabular-nums">
                                          {formatFinancial(value, row.format)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Revenue trend bars */}
                            {maxRevenue > 0 && (
                              <div className="mt-5 pt-4 border-t border-border/60">
                                <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Revenue Trend</p>
                                <div className="flex items-end gap-2 h-16">
                                  {financials.data.periods.map((period, i) => {
                                    const h = (Math.max(0, financials.data?.revenue[i] ?? 0) / maxRevenue) * 100
                                    return (
                                      <div key={period} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                                        <motion.div className="w-full rounded-t-[3px] bg-burgundy/80"
                                          initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                          transition={{ duration: 0.5, delay: i * 0.08 }}
                                          style={{ minHeight: "4px" }} />
                                        <span className="text-[8px] text-muted-foreground font-semibold whitespace-nowrap">{period}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* ── SHAREHOLDING ── */}
                    {/* Hidden for now.
                    {tab === "Shareholding" && <Notice title="Shareholding data is not available yet" />} */}

                    {/* ── CORPORATE ACTIONS ── */}
                    {tab === "Corp. Actions" && (
                      <div>
                        <p className="text-sm font-black text-foreground mb-4">Corporate Actions History</p>
                        {corporateActions.error ? (
                          <ErrorNotice message={corporateActions.error.message} onRetry={corporateActions.retry} />
                        ) : corporateActions.loading || !corporateActions.data ? (
                          <LoadingRows />
                        ) : corporateActions.data.length === 0 ? (
                          <Notice title="No corporate actions found" />
                        ) : (
                          <div className="space-y-3">
                            {corporateActions.data.map((a, i) => (
                              <motion.div key={i}
                                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="flex items-start gap-3 p-3.5 bg-cream/50 border border-border/60 rounded-[8px]"
                              >
                                <span className="text-xl shrink-0">{ACTION_ICONS[a.type]}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-black text-foreground">{a.type}</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold shrink-0 flex items-center gap-1">
                                      <Calendar className="w-3 h-3" /> {formatDate(a.date)}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.detail}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── PEERS ── */}
                    {tab === "Peers" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-black text-foreground">Peer Comparison · {stock.sector}</p>
                          <span className="text-[10px] text-muted-foreground font-semibold">vs {stock.symbol}</span>
                        </div>
                        {peers.error ? (
                          <ErrorNotice message={peers.error.message} onRetry={peers.retry} />
                        ) : peers.loading ? (
                          <LoadingRows />
                        ) : (
                          <div className="overflow-x-auto -mx-5" style={{ scrollbarWidth: "none" }}>
                            <table className="w-full min-w-[580px]">
                              <thead>
                                <tr className="border-b border-border/60">
                                  {["Company","LTP","Chg %","Mkt Cap","52W Hi/Lo"].map(h => (
                                    <th key={h} className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground ${h === "Company" ? "text-left pl-5" : "text-right"}`}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/40">
                                {[stock, ...peerList].map(p => {
                                  const current = p.slug === stock.slug
                                  const pChange = p.quote?.changePct ?? null
                                  return (
                                    <tr key={p.slug}
                                      className={current ? "bg-burgundy/4 border-l-2 border-l-burgundy" : "hover:bg-cream/40 transition-colors cursor-pointer"}
                                      onClick={current ? undefined : () => window.location.href = `/stocks/${p.slug}`}>
                                      <td className="pl-5 pr-4 py-3">
                                        <div className="flex items-center gap-2">
                                          <StockAvatar symbol={p.symbol} name={p.name} logoUrl={p.logoUrl} className="w-8 h-8 text-[10px]" />
                                          <div>
                                            <div className="text-xs font-extrabold text-foreground">{p.symbol}</div>
                                            <div className="text-[10px] text-muted-foreground truncate max-w-[120px]">{p.name}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-right text-xs font-extrabold text-foreground tabular-nums">{formatRupees(p.quote?.price)}</td>
                                      <td className={`px-4 py-3 text-right text-xs font-black tabular-nums ${(pChange ?? 0) >= 0 ? "text-profit" : "text-loss"}`}>{formatPercent(pChange)}</td>
                                      <td className="px-4 py-3 text-right text-[11px] text-muted-foreground">{p.capLabel ?? NO_VALUE}</td>
                                      <td className="px-4 py-3 text-right text-[10px] text-muted-foreground tabular-nums">
                                        {formatRupees(p.quote?.high52)} / {formatRupees(p.quote?.low52)}
                                      </td>
                                    </tr>
                                  )
                                })}
                                {peerList.length === 0 && (
                                  <tr><td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">No peers found in this sector</td></tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── ABOUT ── */}
                    {tab === "About" && (
                      about.error ? (
                        <ErrorNotice message={about.error.message} onRetry={about.retry} />
                      ) : about.loading || !about.data ? (
                        <LoadingRows />
                      ) : (
                        <div>
                          <p className="text-sm font-black text-foreground mb-3">About {stock.name}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { icon: Calendar,  label: "Incorporated", val: about.data.incorporated ?? NO_VALUE },
                              { icon: Building2, label: "Company Name", val: about.data.name ?? stock.name },
                              { icon: Award,     label: "Face Value",   val: formatRupees(about.data.faceValue) },
                              { icon: BarChart3, label: "Market Lot",   val: about.data.marketLot === null ? NO_VALUE : String(about.data.marketLot) },
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
                            <p className="flex items-center gap-2 text-sm font-black text-foreground mb-2">
                              <Users className="w-4 h-4 text-burgundy" /> Management &amp; Company Information
                            </p>
                            {[
                              { label: "Chairman", val: about.data.chairman ?? NO_VALUE },
                              { label: "Auditor",  val: about.data.auditor ?? NO_VALUE },
                              { label: "Group",    val: about.data.group ?? NO_VALUE },
                            ].map(r => (
                              <div key={r.label} className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-3 py-2.5 border-b border-border/40 last:border-0">
                                <div className="text-xs text-muted-foreground">{r.label}</div>
                                <div className="text-xs font-bold text-foreground">{r.val}</div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 pt-4 border-t border-border/60">
                            <p className="flex items-center gap-2 text-sm font-black text-foreground mb-2">
                              <MapPin className="w-4 h-4 text-burgundy" /> Registered Office
                            </p>
                            {[
                              { icon: MapPin, label: "Address", val: about.data.address ?? NO_VALUE },
                              { icon: Phone,  label: "Phone",   val: about.data.phone ?? NO_VALUE },
                              { icon: Mail,   label: "Email",   val: about.data.email ?? NO_VALUE },
                              { icon: Globe,  label: "Website", val: about.data.website ?? NO_VALUE },
                            ].map(r => (
                              <div key={r.label} className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-3 py-2.5 border-b border-border/40 last:border-0">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground self-start">
                                  <r.icon className="w-3.5 h-3.5 shrink-0" /> {r.label}
                                </div>
                                {r.label === "Website" && r.val !== NO_VALUE ? (
                                  <a href={`https://${r.val}`} target="_blank" rel="noopener noreferrer"
                                    className="text-xs font-bold text-burgundy hover:underline break-all">{r.val}</a>
                                ) : (
                                  <div className="text-xs font-bold text-foreground leading-relaxed break-words">{r.val}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
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

              {/* ── LATEST NEWS ── */}
              <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
                  <p className="text-sm font-black text-foreground">
                    {news.data && !news.data.matched ? "Latest Corporate News" : `Latest News · ${stock.symbol}`}
                  </p>
                  <Newspaper className="w-4 h-4 text-muted-foreground/40" />
                </div>
                {news.error ? (
                  <ErrorNotice message={news.error.message} onRetry={news.retry} />
                ) : news.loading || !news.data ? (
                  <div className="p-5"><LoadingRows rows={3} /></div>
                ) : news.data.items.length === 0 ? (
                  <Notice title="No recent news" />
                ) : (
                  <div className="divide-y divide-border/40">
                    {news.data.items.map(n => (
                      <div key={n.id} className="px-5 py-4">
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-burgundy/10 text-burgundy rounded-[3px] uppercase tracking-wide">{n.tag}</span>
                        <p className="text-xs font-bold text-foreground mt-1.5 leading-relaxed line-clamp-2">{n.headline}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" /> {formatDate(n.publishedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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
                    <span className="text-sm font-black text-foreground tabular-nums">{formatRupees(quote?.price)}</span>
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
                    <span className="font-black text-foreground tabular-nums">{formatRupees(estTotal)}</span>
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
                    { label: "Market Cap",   value: stock.capLabel ?? NO_VALUE },
                    { label: "52W High",     value: formatRupees(quote?.high52) },
                    { label: "52W Low",      value: formatRupees(quote?.low52)  },
                    { label: "Volume",       value: formatVolume(quote?.volume) },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[11px] text-muted-foreground font-semibold">{s.label}</span>
                      <span className="text-[11px] font-black text-foreground tabular-nums">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related stocks */}
              {peerList.length > 0 && (
                <div className="border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <div className="px-4 py-3 border-b border-border/60">
                    <p className="text-xs font-black text-foreground">Related Stocks</p>
                  </div>
                  <div className="divide-y divide-border/40">
                    {peerList.map(s => {
                      const sChange = s.quote?.changePct ?? null
                      return (
                        <Link key={s.slug} href={`/stocks/${s.slug}`}
                          className="flex items-center justify-between px-4 py-3 hover:bg-cream/40 transition-colors group">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <StockAvatar symbol={s.symbol} name={s.name} logoUrl={s.logoUrl} className="w-8 h-8 text-[10px]" />
                            <div className="min-w-0">
                              <div className="text-xs font-extrabold text-foreground truncate">{s.symbol}</div>
                              <div className="text-[9px] text-muted-foreground truncate">{s.sector}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-foreground tabular-nums">{formatRupees(s.quote?.price)}</div>
                            <div className={`text-[10px] font-black tabular-nums ${(sChange ?? 0) >= 0 ? "text-profit" : "text-loss"}`}>
                              {formatPercent(sChange)}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky buy/sell bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border/60 px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link href="/signup/register" className="flex-1 py-2.5 rounded-[7px] bg-profit text-white font-black text-sm text-center">
          Buy {stock.symbol}
        </Link>
        <Link href="/signup/register" className="flex-1 py-2.5 rounded-[7px] bg-loss text-white font-black text-sm text-center">
          Sell
        </Link>
      </div>

      <Footer />
    </main>
  )
}

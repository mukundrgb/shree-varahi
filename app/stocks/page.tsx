"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, TrendingUp, TrendingDown, Star,
  ChevronLeft, ChevronRight, Newspaper, Clock,
  ArrowUpRight, X,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────

type CapCategory = "large" | "mid" | "small"
type ExchangeType = "NSE" | "BSE"

interface Stock {
  symbol: string
  name: string
  sector: string
  exchange: ExchangeType
  marketCapCr: number
  marketCapLabel: string
  capCategory: CapCategory
  price: number
  change: number
  changeAmt: number
  color: string
  spark: number[]
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const ALL_STOCKS: Stock[] = [
  { symbol: "RELIANCE",   name: "Reliance Industries Ltd.",      sector: "Energy",        exchange: "NSE", marketCapCr: 1985000, marketCapLabel: "₹19,85,000 Cr", capCategory: "large", price: 2945.50,  change:  1.25, changeAmt:  36.40, color: "#1E40AF", spark: [2820,2856,2830,2890,2920,2910,2945] },
  { symbol: "TCS",        name: "Tata Consultancy Services",     sector: "IT",            exchange: "NSE", marketCapCr: 1415000, marketCapLabel: "₹14,15,000 Cr", capCategory: "large", price: 3892.40,  change: -0.85, changeAmt: -33.45, color: "#0369A1", spark: [3950,3930,3920,3910,3900,3895,3892] },
  { symbol: "HDFCBANK",   name: "HDFC Bank Ltd.",                sector: "Banking",       exchange: "NSE", marketCapCr: 1230000, marketCapLabel: "₹12,30,000 Cr", capCategory: "large", price: 1782.25,  change: -0.42, changeAmt:  -7.60, color: "#15803D", spark: [1800,1795,1792,1788,1790,1785,1782] },
  { symbol: "INFY",       name: "Infosys Ltd.",                  sector: "IT",            exchange: "NSE", marketCapCr:  625000, marketCapLabel:  "₹6,25,000 Cr", capCategory: "large", price: 1485.00,  change:  1.85, changeAmt:  26.95, color: "#6D28D9", spark: [1435,1450,1460,1458,1475,1480,1485] },
  { symbol: "ICICIBANK",  name: "ICICI Bank Ltd.",               sector: "Banking",       exchange: "NSE", marketCapCr:  895000, marketCapLabel:  "₹8,95,000 Cr", capCategory: "large", price: 1245.80,  change:  0.72, changeAmt:   8.90, color: "#B45309", spark: [1220,1228,1235,1230,1238,1242,1245] },
  { symbol: "SBIN",       name: "State Bank of India",           sector: "Banking",       exchange: "NSE", marketCapCr:  728000, marketCapLabel:  "₹7,28,000 Cr", capCategory: "large", price:  815.10,  change: -1.12, changeAmt:  -9.25, color: "#1D4ED8", spark: [832,829,825,822,820,817,815] },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.",            sector: "Telecom",       exchange: "NSE", marketCapCr:  892000, marketCapLabel:  "₹8,92,000 Cr", capCategory: "large", price: 1485.60,  change:  2.14, changeAmt:  31.20, color: "#DC2626", spark: [1425,1440,1455,1462,1470,1480,1485] },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.",       sector: "FMCG",          exchange: "NSE", marketCapCr:  563000, marketCapLabel:  "₹5,63,000 Cr", capCategory: "large", price: 2391.45,  change: -0.24, changeAmt:  -5.75, color: "#0891B2", spark: [2410,2405,2400,2398,2395,2392,2391] },
  { symbol: "ITC",        name: "ITC Ltd.",                      sector: "FMCG",          exchange: "NSE", marketCapCr:  572000, marketCapLabel:  "₹5,72,000 Cr", capCategory: "large", price:  459.20,  change:  0.48, changeAmt:   2.20, color: "#16A34A", spark: [452,454,456,455,457,458,459] },
  { symbol: "LT",         name: "Larsen & Toubro Ltd.",          sector: "Capital Goods", exchange: "NSE", marketCapCr:  515000, marketCapLabel:  "₹5,15,000 Cr", capCategory: "large", price: 3684.90,  change:  1.08, changeAmt:  39.40, color: "#7C3AED", spark: [3610,3628,3645,3655,3668,3675,3684] },
  { symbol: "MARUTI",     name: "Maruti Suzuki India Ltd.",      sector: "Auto",          exchange: "NSE", marketCapCr:  378000, marketCapLabel:  "₹3,78,000 Cr", capCategory: "large", price: 12456.00, change:  1.32, changeAmt: 162.50, color: "#0D9488", spark: [12200,12250,12300,12350,12390,12420,12456] },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd.",              sector: "Auto",          exchange: "NSE", marketCapCr:  347000, marketCapLabel:  "₹3,47,000 Cr", capCategory: "large", price:  952.10,  change:  3.42, changeAmt:  31.50, color: "#B91C1C", spark: [885,900,915,925,940,948,952] },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.",            sector: "NBFC",          exchange: "NSE", marketCapCr:  415000, marketCapLabel:  "₹4,15,000 Cr", capCategory: "large", price: 6842.00,  change: -1.20, changeAmt: -83.20, color: "#1E40AF", spark: [6960,6940,6920,6910,6900,6880,6842] },
  { symbol: "HCLTECH",    name: "HCL Technologies Ltd.",         sector: "IT",            exchange: "NSE", marketCapCr:  278000, marketCapLabel:  "₹2,78,000 Cr", capCategory: "large", price: 1024.35,  change:  0.55, changeAmt:   5.60, color: "#0369A1", spark: [1010,1012,1014,1018,1020,1022,1024] },
  { symbol: "WIPRO",      name: "Wipro Ltd.",                    sector: "IT",            exchange: "NSE", marketCapCr:  245000, marketCapLabel:  "₹2,45,000 Cr", capCategory: "large", price:  420.90,  change: -0.62, changeAmt:  -2.65, color: "#0891B2", spark: [428,426,425,424,422,421,420] },
  { symbol: "NTPC",       name: "NTPC Ltd.",                     sector: "Power",         exchange: "NSE", marketCapCr:  335000, marketCapLabel:  "₹3,35,000 Cr", capCategory: "large", price:  356.80,  change:  0.95, changeAmt:   3.35, color: "#6D28D9", spark: [348,350,352,354,354,356,356] },
  { symbol: "POWERGRID",  name: "Power Grid Corporation",        sector: "Power",         exchange: "NSE", marketCapCr:  282000, marketCapLabel:  "₹2,82,000 Cr", capCategory: "large", price:  303.45,  change:  0.32, changeAmt:   0.95, color: "#B45309", spark: [300,301,302,302,303,303,303] },
  { symbol: "AXISBANK",   name: "Axis Bank Ltd.",                sector: "Banking",       exchange: "NSE", marketCapCr:  358000, marketCapLabel:  "₹3,58,000 Cr", capCategory: "large", price: 1160.80,  change: -0.78, changeAmt:  -9.15, color: "#6D28D9", spark: [1178,1174,1170,1168,1165,1162,1160] },
  { symbol: "KOTAKBANK",  name: "Kotak Mahindra Bank Ltd.",      sector: "Banking",       exchange: "NSE", marketCapCr:  354000, marketCapLabel:  "₹3,54,000 Cr", capCategory: "large", price: 1782.60,  change: -0.55, changeAmt:  -9.85, color: "#DC2626", spark: [1800,1796,1792,1789,1788,1784,1782] },
  { symbol: "M&M",        name: "Mahindra & Mahindra Ltd.",      sector: "Auto",          exchange: "NSE", marketCapCr:  312000, marketCapLabel:  "₹3,12,000 Cr", capCategory: "large", price: 2510.40,  change:  1.62, changeAmt:  40.05, color: "#16A34A", spark: [2458,2468,2478,2488,2498,2506,2510] },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd.",        sector: "Infrastructure",exchange: "NSE", marketCapCr:  278000, marketCapLabel:  "₹2,78,000 Cr", capCategory: "large", price: 1285.00,  change: -0.35, changeAmt:  -4.55, color: "#0D9488", spark: [1298,1295,1292,1290,1288,1286,1285] },
  { symbol: "SUNPHARMA",  name: "Sun Pharmaceutical Ind.",       sector: "Pharma",        exchange: "NSE", marketCapCr:  292000, marketCapLabel:  "₹2,92,000 Cr", capCategory: "large", price: 1220.40,  change:  0.82, changeAmt:   9.90, color: "#7C3AED", spark: [1200,1205,1210,1212,1215,1218,1220] },
  { symbol: "NESTLEIND",  name: "Nestle India Ltd.",             sector: "FMCG",          exchange: "NSE", marketCapCr:  218000, marketCapLabel:  "₹2,18,000 Cr", capCategory: "large", price: 2248.00,  change: -0.15, changeAmt:  -3.45, color: "#B45309", spark: [2260,2258,2256,2254,2252,2250,2248] },
  { symbol: "TITAN",      name: "Titan Company Ltd.",            sector: "Consumer",      exchange: "NSE", marketCapCr:  256000, marketCapLabel:  "₹2,56,000 Cr", capCategory: "large", price: 2876.00,  change:  1.24, changeAmt:  35.20, color: "#D97706", spark: [2820,2835,2848,2855,2862,2870,2876] },
  { symbol: "ZOMATO",     name: "Zomato Ltd.",                   sector: "Consumer Tech", exchange: "NSE", marketCapCr:  185000, marketCapLabel:  "₹1,85,000 Cr", capCategory: "mid",   price:  212.40,  change:  2.85, changeAmt:   5.85, color: "#DC2626", spark: [198,202,205,207,209,211,212] },
  { symbol: "COALINDIA",  name: "Coal India Ltd.",               sector: "Mining",        exchange: "NSE", marketCapCr:  235000, marketCapLabel:  "₹2,35,000 Cr", capCategory: "large", price:  384.80,  change:  0.44, changeAmt:   1.70, color: "#1D4ED8", spark: [380,381,382,382,383,384,384] },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.",             sector: "Consumer",      exchange: "NSE", marketCapCr:  195000, marketCapLabel:  "₹1,95,000 Cr", capCategory: "large", price: 2040.60,  change: -0.92, changeAmt: -18.90, color: "#0891B2", spark: [2065,2060,2056,2052,2048,2044,2040] },
  { symbol: "BRITANNIA",  name: "Britannia Industries Ltd.",     sector: "FMCG",          exchange: "NSE", marketCapCr:  135000, marketCapLabel:  "₹1,35,000 Cr", capCategory: "mid",   price: 5628.00,  change: -0.48, changeAmt: -27.30, color: "#15803D", spark: [5680,5672,5664,5656,5648,5640,5628] },
  { symbol: "ADANIENT",   name: "Adani Enterprises Ltd.",        sector: "Conglomerate",  exchange: "NSE", marketCapCr:  287000, marketCapLabel:  "₹2,87,000 Cr", capCategory: "large", price: 2542.00,  change: -1.85, changeAmt: -47.90, color: "#7C3AED", spark: [2620,2610,2600,2590,2572,2554,2542] },
  { symbol: "TATAPOWER",  name: "Tata Power Company Ltd.",       sector: "Power",         exchange: "NSE", marketCapCr:  119000, marketCapLabel:  "₹1,19,000 Cr", capCategory: "mid",   price:  374.00,  change:  1.95, changeAmt:   7.15, color: "#B91C1C", spark: [358,362,366,368,370,372,374] },
]

const SECTOR_FILTERS = ["All", "Banking", "IT", "Auto", "Pharma", "FMCG", "Power", "Energy", "NBFC", "Telecom"]

const CAP_OPTIONS = [
  { label: "All",       value: "all"   },
  { label: "Large Cap", value: "large" },
  { label: "Mid Cap",   value: "mid"   },
  { label: "Small Cap", value: "small" },
]

const QUICK_LINKS = [
  { label: "52W High · NSE",  id: "52h",  fn: (s: Stock) => s.change > 2    },
  { label: "52W Low · NSE",   id: "52l",  fn: (s: Stock) => s.change < -1   },
  { label: "NSE Top Gainers", id: "gain", fn: (s: Stock) => s.change > 0    },
  { label: "NSE Top Losers",  id: "lose", fn: (s: Stock) => s.change < 0    },
  { label: "Large Cap",       id: "lc",   fn: (s: Stock) => s.capCategory === "large" },
  { label: "Mid Cap",         id: "mc",   fn: (s: Stock) => s.capCategory === "mid"   },
  { label: "Banking",         id: "bank", fn: (s: Stock) => s.sector === "Banking"    },
  { label: "IT Sector",       id: "it",   fn: (s: Stock) => s.sector === "IT"         },
]

const NEWS = [
  {
    category: "Market Update",
    headline: "Sensex surges 850 points on global cues; Nifty reclaims 24,000 mark",
    excerpt: "Indian equity markets opened strongly, with broad-based gains across IT, banking and auto sectors amid positive global sentiment.",
    date: "Jun 21, 2026",
    readTime: "3 min read",
    color: "#15803D",
  },
  {
    category: "Stock Alert",
    headline: "Reliance Industries hits 52-week high as Jio retail earnings beat estimates",
    excerpt: "Shares of Reliance Industries rose 3.2% to touch ₹3,025, its highest level in 52 weeks on strong Q4 earnings beat.",
    date: "Jun 21, 2026",
    readTime: "4 min read",
    color: "#1E40AF",
  },
  {
    category: "Sector Watch",
    headline: "IT stocks rebound: TCS, Infosys, Wipro lead recovery on strong US deal wins",
    excerpt: "The Nifty IT index climbed 2.1% as top technology firms reported healthy deal pipeline for Q1 FY27, beating street estimates.",
    date: "Jun 20, 2026",
    readTime: "5 min read",
    color: "#6D28D9",
  },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const W = 80, H = 28, PAD = 2
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = PAD + (i / (data.length - 1)) * (W - PAD * 2)
      const y = H - PAD - ((v - min) / range) * (H - PAD * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="shrink-0">
      <polyline
        points={pts}
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
      />
    </svg>
  )
}

function StockAvatar({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[11px] font-black shrink-0"
      style={{ background: color + "18", color, border: `1px solid ${color}28` }}
    >
      {symbol.slice(0, 2)}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

const PER_PAGE = 10

export default function StocksPage() {
  const [search, setSearch]       = useState("")
  const [sector, setSector]       = useState("All")
  const [cap, setCap]             = useState("all")
  const [quickLink, setQuickLink] = useState<string | null>(null)
  const [page, setPage]           = useState(1)
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    let list = ALL_STOCKS

    if (quickLink) {
      const ql = QUICK_LINKS.find((q) => q.id === quickLink)
      if (ql) list = list.filter(ql.fn)
    } else {
      if (sector !== "All") list = list.filter((s) => s.sector === sector)
      if (cap !== "all")    list = list.filter((s) => s.capCategory === cap)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
      )
    }

    return [...list].sort((a, b) => b.marketCapCr - a.marketCapCr)
  }, [search, sector, cap, quickLink])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const toggleWatchlist = (symbol: string) =>
    setWatchlist((prev) => {
      const n = new Set(prev)
      n.has(symbol) ? n.delete(symbol) : n.add(symbol)
      return n
    })

  const pickSector = (s: string) => { setSector(s); setQuickLink(null); setPage(1) }
  const pickCap    = (c: string) => { setCap(c);    setQuickLink(null); setPage(1) }
  const pickQL     = (id: string) => {
    setQuickLink((prev) => (prev === id ? null : id))
    setSector("All"); setCap("all"); setPage(1)
  }
  const clearAll = () => { setSector("All"); setCap("all"); setQuickLink(null); setSearch(""); setPage(1) }

  const hasFilter = !!(quickLink || sector !== "All" || cap !== "all" || search)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <section className="bg-cream border-b border-border/40 pt-28 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">All Stocks</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">
                Equity Markets
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                All Stocks
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Browse, filter, and discover stocks listed on NSE &amp; BSE
              </p>
            </div>

            {/* Live index chips */}
            <div className="flex gap-3 shrink-0">
              {[
                { name: "NIFTY 50", price: "23,459", change: "+1.22%", up: true },
                { name: "SENSEX",   price: "77,348", change: "+0.98%", up: true },
                { name: "NIFTY IT", price: "38,821", change: "+2.05%", up: true },
              ].map((idx) => (
                <div
                  key={idx.name}
                  className="bg-white border border-border/60 rounded-[6px] px-3 py-2 text-center min-w-[82px]"
                >
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">{idx.name}</div>
                  <div className="text-[13px] font-black text-foreground">{idx.price}</div>
                  <div className={`text-[10px] font-bold ${idx.up ? "text-profit" : "text-loss"}`}>{idx.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <div className="bg-white border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: "none" }}
          >
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest whitespace-nowrap mr-1 shrink-0">
              Quick Links
            </span>
            {QUICK_LINKS.map((ql) => (
              <button
                key={ql.id}
                onClick={() => pickQL(ql.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all duration-200 shrink-0 ${
                  quickLink === ql.id
                    ? "bg-burgundy text-white border-burgundy shadow-sm"
                    : "bg-cream text-muted-foreground border-border hover:border-burgundy/30 hover:text-foreground"
                }`}
              >
                {ql.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTERS + TABLE ── */}
      <section className="bg-background py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2.5 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9 pr-3 py-2 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 w-44"
              />
            </div>

            {/* Sector chips */}
            <div className="flex gap-1.5 flex-wrap">
              {SECTOR_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => pickSector(s)}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold whitespace-nowrap border transition-all duration-200 ${
                    sector === s && !quickLink
                      ? "bg-burgundy text-white border-burgundy"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Cap chips */}
            <div className="flex gap-1.5">
              {CAP_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => pickCap(c.value)}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold whitespace-nowrap border transition-all duration-200 ${
                    cap === c.value && !quickLink
                      ? "bg-gold/15 text-gold-deep border-gold/35"
                      : "bg-white text-muted-foreground border-border hover:border-gold/25 hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results row */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">{filtered.length}</span> stocks
              {quickLink && (
                <span className="ml-1.5 text-burgundy font-semibold">
                  · {QUICK_LINKS.find((q) => q.id === quickLink)?.label}
                </span>
              )}
              {sector !== "All" && !quickLink && (
                <span className="ml-1.5 font-semibold text-foreground">· {sector}</span>
              )}
            </p>
            {hasFilter && (
              <button
                onClick={clearAll}
                className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Header — desktop only */}
            <div
              className="hidden sm:grid px-4 py-2.5 border-b border-border bg-cream/70"
              style={{ gridTemplateColumns: "36px 1fr 84px 140px 110px 96px 32px" }}
            >
              <div />
              <div className="pl-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Company</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-center">Chart</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">LTP (₹)</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right hidden lg:block">Market Cap</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Change</div>
              <div />
            </div>

            {/* Rows */}
            <AnimatePresence mode="popLayout">
              {pageData.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center text-muted-foreground text-sm"
                >
                  No stocks match your filters.
                </motion.div>
              ) : (
                pageData.map((stock, idx) => {
                  const up  = stock.change >= 0
                  const inWL = watchlist.has(stock.symbol)
                  return (
                    <motion.div
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14, delay: idx * 0.018 }}
                      className="group border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors duration-150 cursor-pointer"
                    >
                      {/* Mobile layout */}
                      <div className="sm:hidden flex items-center justify-between px-4 py-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <StockAvatar symbol={stock.symbol} color={stock.color} />
                          <div className="min-w-0">
                            <div className="font-extrabold text-sm text-foreground truncate">{stock.symbol}</div>
                            <div className="text-[11px] text-muted-foreground truncate">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-extrabold text-foreground tabular-nums">
                            ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <div className={`text-xs font-black flex items-center justify-end gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {up ? "+" : ""}{stock.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div
                        className="hidden sm:grid px-4 py-3"
                        style={{ gridTemplateColumns: "36px 1fr 84px 140px 110px 96px 32px" }}
                      >
                        <StockAvatar symbol={stock.symbol} color={stock.color} />

                        <div className="pl-3 min-w-0 flex flex-col justify-center">
                          <div className="font-extrabold text-sm text-foreground leading-tight truncate">{stock.symbol}</div>
                          <div className="text-[11px] text-muted-foreground truncate mt-0.5">{stock.name}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] bg-secondary/60 text-muted-foreground">
                              {stock.exchange}
                            </span>
                            <span className="text-[9px] text-muted-foreground/55">{stock.sector}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <Sparkline data={stock.spark} up={up} />
                        </div>

                        <div className="flex items-center justify-end">
                          <span className="text-sm font-extrabold text-foreground tabular-nums">
                            ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="hidden lg:flex items-center justify-end">
                          <span className="text-[11px] font-semibold text-muted-foreground">{stock.marketCapLabel}</span>
                        </div>

                        <div className="flex items-center justify-end">
                          <span className={`text-xs font-black flex items-center gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {up ? "+" : ""}{stock.change.toFixed(2)}%
                          </span>
                        </div>

                        <div className="flex items-center justify-center">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWatchlist(stock.symbol) }}
                            title={inWL ? "Remove from watchlist" : "Add to watchlist"}
                            className={`w-6 h-6 rounded-[4px] flex items-center justify-center transition-all duration-150 ${
                              inWL
                                ? "text-gold-deep"
                                : "text-transparent group-hover:text-muted-foreground/35 hover:!text-gold-deep"
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${inWL ? "fill-gold-deep text-gold-deep" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-[5px] border text-xs font-bold transition-all ${
                        pg === page
                          ? "bg-burgundy text-white border-burgundy"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      {pg}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MARKET NEWS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-1">
                Market Updates
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Latest Market News
              </h2>
            </div>
            <Link
              href="#"
              className="text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEWS.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-[8px] border border-border overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
              >
                <div
                  className="h-[108px] relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${article.color}12, ${article.color}05)` }}
                >
                  <Newspaper className="w-14 h-14 opacity-[0.08]" style={{ color: article.color }} />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-[3px]"
                      style={{
                        background: article.color + "18",
                        color: article.color,
                        border: `1px solid ${article.color}28`,
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-extrabold text-sm text-foreground leading-snug mb-2 group-hover:text-burgundy transition-colors line-clamp-2">
                    {article.headline}
                  </h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground/65">
                    <Clock className="w-3 h-3" />
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-burgundy text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.13) 0%, transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Start investing in stocks today.
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
            Open a free Demat account with Shree Varahi and get access to MTF, pledge margin, research tools, and more — backed by 31 years of trust.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gold-champagne text-burgundy font-black px-8 h-11 text-sm rounded-[5px] shadow-xl"
          >
            Open Free Account →
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, TrendingUp, TrendingDown, Star,
  ChevronLeft, ChevronRight, Newspaper, Clock,
  ArrowUpRight, X, Plus, FileSearch, LineChart, Zap,
  ShieldCheck, PieChart, Eye, RotateCcw, Bell, CheckCircle2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function toSlug(symbol: string) {
  return symbol.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

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
  { symbol: "MM",         name: "Mahindra & Mahindra Ltd.",      sector: "Auto",          exchange: "NSE", marketCapCr:  312000, marketCapLabel:  "₹3,12,000 Cr", capCategory: "large", price: 2510.40,  change:  1.62, changeAmt:  40.05, color: "#16A34A", spark: [2458,2468,2478,2488,2498,2506,2510] },
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

// ─── What You Can Do ────────────────────────────────────────────────────────

const TOOLS = [
  { icon: FileSearch,  color: "#8B0D19", title: "Stock Research",          desc: "Dive into financials, valuation metrics, earnings history, and company fundamentals before making any investment decision." },
  { icon: LineChart,   color: "#8B0D19", title: "Technical Analysis",      desc: "Analyse price action with advanced charts, 100+ indicators, and drawing tools across multiple timeframes." },
  { icon: Zap,         color: "#8B0D19", title: "Margin Trading (MTF)",    desc: "Get up to 4× buying power on 1,700+ stocks. Invest more without liquidating your existing holdings." },
  { icon: ShieldCheck, color: "#8B0D19", title: "Pledge Stocks Benefits",  desc: "Use your existing holdings as collateral to unlock additional margin and put your idle portfolio to work." },
  { icon: PieChart,    color: "#8B0D19", title: "Portfolio Tracking",      desc: "Monitor your holdings, returns, XIRR performance, dividend payouts, and corporate actions — all in one view." },
  { icon: Eye,         color: "#8B0D19", title: "Watchlists",              desc: "Track your favourite stocks in real time. Get price alerts and stay on top of every opportunity as it moves." },
  { icon: RotateCcw,   color: "#8B0D19", title: "SIP In Stocks",           desc: "Invest a fixed amount in selected stocks every month. Build wealth consistently without timing the market." },
  { icon: Bell,        color: "#8B0D19", title: "Market Alerts",           desc: "Set custom alerts on price levels, volume spikes, and news events. Never miss a move that matters." },
]

// ─── Trade With More Flexibility ────────────────────────────────────────────

const FLEX_CARDS = [
  {
    icon: Zap,
    title: "Margin Trading Facility (MTF)",
    desc: "Leverage Shree Varahi's Margin Trading Facility to invest in eligible stocks with lower upfront capital, enhance your buying power, and capitalize on market opportunities while efficiently managing your available funds.",
    points: ["Lower Upfront Investment", "Enhanced Buying Power", "Trade Eligible Stocks", "Efficient Capital Utilization"],
  },
  {
    icon: ShieldCheck,
    title: "Pledge Margin Benefit",
    desc: "Unlock additional trading power with Shree Varahi by pledging eligible stocks, accessing extra margins, and maximizing portfolio efficiency without selling your long-term investments.",
    points: ["Unlock Additional Margins", "Trade Without Selling", "Retain Long-Term Holdings", "Increase Trading Capacity"],
  },
]

// ─── Explore Multiple Stock Opportunities ───────────────────────────────────

type OppTab = "Bluechip" | "Dividend" | "HighEPS" | "Penny" | "Intraday"

const OPP_TABS: { id: OppTab; label: string }[] = [
  { id: "Bluechip", label: "Bluechip Stocks" },
  { id: "Dividend", label: "Dividend Stocks" },
  { id: "HighEPS",  label: "High EPS Low PE" },
  { id: "Penny",    label: "Penny Stocks" },
  { id: "Intraday", label: "Intraday Stocks" },
]

const OPP_SYMBOLS: Record<OppTab, string[]> = {
  Bluechip: ["RELIANCE", "TCS", "HDFCBANK", "ICICIBANK", "INFY", "LT", "SBIN", "MARUTI"],
  Dividend: ["ITC", "HINDUNILVR", "COALINDIA", "POWERGRID", "NTPC", "NESTLEIND", "BRITANNIA", "ASIANPAINT"],
  HighEPS:  ["SBIN", "COALINDIA", "ADANIPORTS", "TATAPOWER", "NTPC", "POWERGRID", "ITC", "LT"],
  Penny:    ["POWERGRID", "ZOMATO", "TATAPOWER", "COALINDIA", "NTPC", "WIPRO", "ITC", "SBIN"],
  Intraday: ["ZOMATO", "TATAMOTORS", "ADANIENT", "BHARTIARTL", "MARUTI", "BAJFINANCE", "SUNPHARMA", "TITAN"],
}

const STOCK_BY_SYMBOL: Record<string, Stock> = Object.fromEntries(ALL_STOCKS.map((s) => [s.symbol, s]))

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is MTF?", a: "Margin Trading Facility (MTF) allows investors to buy eligible stocks by paying only a portion of the total transaction value upfront. The remaining amount is funded by the broker, enabling investors to take larger positions while utilizing their capital more efficiently." },
  { q: "Which stocks support MTF?", a: "MTF is available only on approved stocks that meet regulatory and risk management criteria. The list of eligible stocks may be updated periodically based on exchange and broker guidelines." },
  { q: "Can I pledge stocks?", a: "Yes. You can pledge approved stocks held in your Demat account and use them as collateral to access additional trading margin. This allows you to retain ownership of your investments while utilizing their value for margin benefits." },
  { q: "What are the brokerage charges?", a: "Shree Varahi follows a transparent brokerage structure. Equity Delivery trades may be available at zero brokerage, while Intraday and MTF orders are charged at ₹20 or 0.03% per executed order, whichever is lower. Other statutory charges may apply as per regulations." },
  { q: "Do I get stock research tools?", a: "Yes. Investors gain access to comprehensive research tools, including company financials, valuation metrics, technical charts, market trends, sector comparisons, stock screeners, and investment insights to support informed decision-making." },
  { q: "How can I start investing?", a: "Getting started is simple. Open a Demat and Trading Account with Shree Varahi, complete the required KYC process, add funds to your account, research investment opportunities, and begin investing in stocks through the platform." },
  { q: "Can I track my portfolio on the platform?", a: "Yes. The platform provides portfolio tracking tools that allow you to monitor holdings, profit and loss, dividends, and overall investment performance in real time." },
  { q: "Is there any account opening charge?", a: "No. Account opening is available at ₹0, making it easy for new investors to start their investment journey." },
  { q: "Can beginners invest through Shree Varahi?", a: "Absolutely. The platform offers research tools, market insights, portfolio tracking, and expert support to help both new and experienced investors invest with confidence." },
  { q: "Why should I choose Shree Varahi for stock investing?", a: "Shree Varahi combines research-driven investing, Margin Trading Facility (MTF), pledge margin benefits, transparent pricing, and integrated portfolio management tools to provide a complete stock investing experience." },
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
  const router = useRouter()
  const [search, setSearch]       = useState("")
  const [sector, setSector]       = useState("All")
  const [cap, setCap]             = useState("all")
  const [quickLink, setQuickLink] = useState<string | null>(null)
  const [page, setPage]           = useState(1)
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())
  const [oppTab, setOppTab]       = useState<OppTab>("Bluechip")
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const [mobile, setMobile]       = useState("")

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

  const topGainers = useMemo(
    () => [...ALL_STOCKS].sort((a, b) => b.change - a.change).slice(0, 3),
    []
  )

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

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Stocks</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Equity Investing
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Stocks Investing With<br />
                <span className="text-burgundy">MTF &amp; Pledge Benefits</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Trade and invest in 5,000+ NSE &amp; BSE listed stocks with Margin Trading Facility, pledge benefits, and powerful research tools — all on one platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Start Trading
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Open Account
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <div>
                  <div className="text-lg font-black text-foreground">31+</div>
                  <div className="text-[10px] text-muted-foreground font-semibold">Years of Trust</div>
                </div>
                <div>
                  <div className="text-lg font-black text-foreground flex items-center gap-1">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                  <div className="text-[10px] text-muted-foreground font-semibold">App Rating</div>
                </div>
              </div>
            </div>

            {/* Hero visual — top gainers card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Top Gainers Today</span>
                  <span className="text-[9px] font-bold text-muted-foreground">LTP</span>
                </div>
                {topGainers.map((s) => (
                  <div key={s.symbol} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{s.symbol}</span>
                    <div className="text-right shrink-0">
                      <div className="text-[12px] font-black text-foreground">₹{s.price.toLocaleString("en-IN")}</div>
                      <div className="text-[10px] font-bold text-profit">+{s.change.toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
                <div className="pt-1 border-t border-border/40">
                  <Button size="sm" className="w-full bg-burgundy hover:bg-burgundy-deep text-white text-[11px] font-bold rounded-[5px] h-8">
                    Invest Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN DO ──
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What You Can Do</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Everything you need to trade and invest in stocks.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-4"
                    style={{ background: t.color + "14", border: `1px solid ${t.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: t.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-2">{t.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{t.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* ── SECTION 3 — STOCK DISCOVERY (left as-is) ── */}

      {/* ── PAGE HEADER ── */}
      <section className="bg-background border-b border-border/40 pt-8 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                      onClick={() => router.push(`/stocks/${toSlug(stock.symbol)}`)}
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

      {/* ── TRADE WITH MORE FLEXIBILITY ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Trade With More Flexibility</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Invest Beyond Available Cash</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Enhance your investment potential with Shree Varahi&apos;s margin solutions, designed to maximize opportunities while optimizing your available capital and portfolio holdings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FLEX_CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-[12px] p-7 sm:p-8"
                >
                  <div
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center mb-5"
                    style={{ background: "#8B0D1914", border: "1px solid #8B0D1922" }}
                  >
                    <Icon className="w-6 h-6 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-lg sm:text-xl mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {c.points.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B0D19] shrink-0" />
                        <span className="text-[12px] font-semibold text-foreground">{p}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── EXPLORE MULTIPLE STOCK OPPORTUNITIES ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Explore Multiple Stock Opportunities</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">Discover Investment Opportunities Across Market Caps &amp; Strategies</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Discover investment opportunities across market caps, sectors, and strategies with Shree Varahi&apos;s comprehensive stock selection platform.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {OPP_TABS.map((t) => {
              const active = oppTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setOppTab(t.id)}
                  className={`px-4 py-2.5 rounded-[6px] text-[12px] font-bold border transition-all duration-200 ${
                    active
                      ? "bg-burgundy text-white border-burgundy shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          {/* Stock grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={oppTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {OPP_SYMBOLS[oppTab].map((sym) => {
                const stock = STOCK_BY_SYMBOL[sym]
                if (!stock) return null
                const up = stock.change >= 0
                return (
                  <div
                    key={sym}
                    onClick={() => router.push(`/stocks/${toSlug(stock.symbol)}`)}
                    className="bg-white border border-border rounded-[8px] p-4 hover:border-gold/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <StockAvatar symbol={stock.symbol} color={stock.color} />
                    </div>
                    <div className="font-extrabold text-[12px] text-foreground leading-tight mb-2 line-clamp-2 min-h-[28px]">
                      {stock.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-foreground">₹{stock.price.toLocaleString("en-IN")}</span>
                      <span className={`text-[11px] font-bold flex items-center gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {up ? "+" : ""}{stock.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          <div className="text-center">
            <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-11 font-bold rounded-[5px]">
              Start Trading →
            </Button>
          </div>
        </div>
      </section>



      {/* ── PRICING ── */}
      <section className="py-14 lg:py-20 bg-background border-t border-border/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-4">Simple Pricing</p>
          <div className="text-6xl sm:text-7xl font-black text-gold-deep tracking-tight mb-4">₹17</div>
          <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-xl mx-auto">
            No percentage fees, no hidden slabs. Just one honest price on every intraday trade — and zero brokerage when you invest for the long term.
          </p>
          <div className="mt-7">
            <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-11 font-bold rounded-[5px]">
              Open Free Account →
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about investing in stocks at Shree Varahi? Review answers to our most popular inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div
                  key={index}
                  className="bg-white border border-border/80 rounded-[12px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-foreground text-sm tracking-wide">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                      {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA — floating banner card, detached from footer ── */}
      <section className="py-12 lg:py-16 bg-background px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl rounded-[20px] overflow-hidden bg-burgundy text-white shadow-[0_20px_60px_rgba(139,13,25,0.25)]"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.18) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12 lg:p-14">
            {/* Left — copy + form */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Start your investment<br className="hidden sm:inline" /> journey with Shree Varahi.
              </h2>
              <p className="text-sm text-white/75 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Trade and invest in Stocks, F&amp;O, Mutual Funds, ETFs, US Stocks, Commodities, IPOs and more, all from one trusted platform backed by 31 years of experience.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button type="submit" className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0">
                  Open Free Demat Account
                </Button>
              </form>

              {/* QR + store badges */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <div className="hidden sm:flex w-16 h-16 rounded-[8px] bg-white p-1.5 shrink-0">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px), repeating-linear-gradient(-45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-white/60">Scan to download</p>
                  <div className="flex gap-2.5">
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">App Store</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — phone mockup w/ portfolio dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My Portfolio</span>
                  <PieChart className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Portfolio Value</p>
                  <p className="text-base font-black text-foreground">₹4,12,650</p>
                  <p className="text-[10px] font-bold text-profit">+₹26,940 (7.2%)</p>
                </div>
                {topGainers.map((s) => (
                  <div key={s.symbol} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{s.symbol}</span>
                    <span className="text-[9px] font-bold text-profit shrink-0">+{s.change.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>


            {/* ── MARKET NEWS ── */}
      <section className="py-12 lg:py-16 border-t border-border/40">
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

      <Footer />
    </main>
  )
}

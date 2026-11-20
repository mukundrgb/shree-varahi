"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, TrendingUp, TrendingDown, Star,
  ChevronLeft, ChevronRight, Newspaper, Clock,
  ArrowUpRight, X, Plus, FileSearch, LineChart, Zap,
  ShieldCheck, PieChart, Eye, RotateCcw, Bell, CheckCircle2, Check, ArrowUpDown, ArrowUp, ArrowDown,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { StockAvatar } from "@/components/stock-avatar"
import { TradingViewCredit, TradingViewMiniChart } from "@/components/tradingview-chart"
import { TableRowsSkeleton } from "@/components/skeletons"
import { NewsCarousel } from "@/components/news-cards"
import { useMarketBeat } from "@/hooks/use-market-news"
import { useStockList } from "@/hooks/stocks/use-stock-list"
import { NO_VALUE, formatPercent, formatPrice } from "@/lib/stocks/format"
import type { StockSort } from "@/lib/stocks/types"
import Link from "next/link"

/* ─── Dummy data (replaced by the CMOTS API; kept for reference) ──────────────

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

─────────────────────────────────────────────────────────────────────────────── */

// Category chips come from the API (StockListResult.categories), so a chip only
// appears when at least one listed company is in that category.

const CAP_OPTIONS = [
  { label: "Large Cap", short: "Large", value: "large" },
  { label: "Mid Cap",   short: "Mid",   value: "mid"   },
  { label: "Small Cap", short: "Small", value: "small" },
]

const SORT_OPTIONS: { label: string; value: StockSort }[] = [
  { label: "LTP: High → Low",    value: "price-desc"  },
  { label: "LTP: Low → High",    value: "price-asc"   },
  { label: "Change: High → Low", value: "change-desc" },
  { label: "Change: Low → High", value: "change-asc"  },
  { label: "Name: A → Z",        value: "name-asc"    },
  { label: "Name: Z → A",        value: "name-desc"   },
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
  { icon: Zap,         color: "#8B0D19", title: "Margin Trading (MTF)",    desc: "Get up to 3× buying power on 1,700+ stocks. Invest more without liquidating your existing holdings." },
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is MTF?", a: "Margin Trading Facility (MTF) allows investors to buy eligible stocks by paying only a portion of the total transaction value upfront. The remaining amount is funded by the broker, enabling investors to take larger positions while utilizing their capital more efficiently." },
  { q: "Which stocks support MTF?", a: "MTF is available only on approved stocks that meet regulatory and risk management criteria. The list of eligible stocks may be updated periodically based on exchange and broker guidelines." },
  { q: "Can I pledge stocks?", a: "Yes. You can pledge approved stocks held in your Demat account and use them as collateral to access additional trading margin. This allows you to retain ownership of your investments while utilizing their value for margin benefits." },
  { q: "What are the brokerage charges?", a: "Shree Varahi follows a transparent brokerage structure. Equity Delivery trades are charged a flat ₹17 per executed order, while Intraday orders are ₹17 and MTF orders are charged at 17%. Other statutory charges may apply as per regulations." },
  { q: "Do I get stock research tools?", a: "Yes. Investors gain access to comprehensive research tools, including company financials, valuation metrics, technical charts, market trends, sector comparisons, stock screeners, and investment insights to support informed decision-making." },
  { q: "How can I start investing?", a: "Getting started is simple. Open a Demat and Trading Account with Shree Varahi, complete the required KYC process, add funds to your account, research investment opportunities, and begin investing in stocks through the platform." },
  { q: "Can I track my portfolio on the platform?", a: "Yes. The platform provides portfolio tracking tools that allow you to monitor holdings, profit and loss, dividends, and overall investment performance in real time." },
  { q: "Is there any account opening charge?", a: "No. Account opening is available at ₹0, making it easy for new investors to start their investment journey." },
  { q: "Can beginners invest through Shree Varahi?", a: "Absolutely. The platform offers research tools, market insights, portfolio tracking, and expert support to help both new and experienced investors invest with confidence." },
  { q: "Why should I choose Shree Varahi for stock investing?", a: "Shree Varahi combines research-driven investing, Margin Trading Facility (MTF), pledge margin benefits, transparent pricing, and integrated portfolio management tools to provide a complete stock investing experience." },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

/* The 7-point dummy price series is gone; the CMOTS 1D chart URL is still needed.

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

*/

// ─── Page ───────────────────────────────────────────────────────────────────

const PER_PAGE = 10
/** Default table order: highest LTP first. */
const DEFAULT_STOCK_SORT: StockSort = "price-desc"

/**
 * Footer A–Z links open /stocks?letter=A (or ?letter=0-9 for "Others"). Reads the letter,
 * also when a link is clicked while this page is open. useSearchParams needs Suspense.
 */
function LetterFromUrl({ onLetter }: { onLetter: (letter: string | null) => void }) {
  const params = useSearchParams()
  const raw = params.get("letter")
  const letter = raw && /^([a-z]|0-9)$/i.test(raw) ? raw.toUpperCase() : null
  const ref = useRef(onLetter)
  ref.current = onLetter
  useEffect(() => { ref.current(letter) }, [letter])
  return null
}

export default function StocksPage() {
  const router = useRouter()
  const [search, setSearch]       = useState("")
  /** Picked sectors (categories); empty = all sectors. */
  const [sectors, setSectors]     = useState<string[]>([])
  const [cap, setCap]             = useState("all")
  const [sort, setSort]          = useState<StockSort>(DEFAULT_STOCK_SORT)
  /** First-letter filter from the footer A–Z links; "0-9" = starts with a number. */
  const [letter, setLetter]       = useState<string | null>(null)
  const pickLetterFromUrl = (l: string | null) => {
    setLetter(l)
    setPage(1)
    if (l) document.getElementById("all-stocks")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const [page, setPage]           = useState(1)
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const [mobile, setMobile]       = useState("")
  const marketNews = useMarketBeat()

  // Wait for a pause in typing so each keystroke doesn't call the API.
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300)
    return () => clearTimeout(timer)
  }, [search])

  const activeCap = cap !== "all" ? cap : undefined

  // An older backend rejects the price sort (400 "Invalid sort"); then the table loads
  // without it instead of failing, so the page works whichever side is deployed first.
  const [priceSortUnsupported, setPriceSortUnsupported] = useState(false)
  const sentSort = priceSortUnsupported && sort.startsWith("price") ? undefined : sort
  const { data: stockList, error: stockListError, loading: stockListLoading, retry: retryStockList } = useStockList({
    page,
    search: debouncedSearch || undefined,
    // Sent as ?sector=A&sector=B; sorted so the same picks reuse the same request.
    sector: sectors.length ? [...sectors].sort() : undefined,
    cap: activeCap,
    letter: letter ?? undefined,
    sort: sentSort,
  })
  useEffect(() => {
    if (stockListError?.status === 400 && sort.startsWith("price") && /sort/i.test(stockListError.message)) setPriceSortUnsupported(true)
  }, [stockListError, sort])

  const pageData   = stockList?.items ?? []
  const totalPages = stockList?.totalPages ?? 1

  // Keep the last category list so the chips don't vanish while a new page loads.
  const [categories, setCategories] = useState<string[]>([])
  useEffect(() => {
    if (stockList?.categories) setCategories(stockList.categories)
  }, [stockList?.categories])

  const toggleWatchlist = (symbol: string) =>
    setWatchlist((prev) => {
      const n = new Set(prev)
      n.has(symbol) ? n.delete(symbol) : n.add(symbol)
      return n
    })

  /** Ticks or unticks one sector. */
  const toggleSector = (s: string) => {
    setSectors((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
    setPage(1)
  }
  const clearSectors = () => { setSectors([]); setPage(1) }
  const pickCap    = (c: string) => { setCap(c); setPage(1) }
  const pickSort   = (s: StockSort) => { setSort(s); setPage(1) }
  // LTP header: first click = highest first (arrow up), next click = lowest first (arrow down).
  const togglePriceSort  = () => pickSort(sort === "price-desc" ? "price-asc" : "price-desc")
  const clearLetter = () => { setLetter(null); setPage(1); router.replace("/stocks", { scroll: false }) }
  /** Hero shortcuts: set the cap filter and jump to the table. */
  const browseCap = (c: string) => {
    pickCap(c)
    document.getElementById("all-stocks")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const clearAll = () => {
    setSectors([]); setCap("all"); setSearch(""); setSort(DEFAULT_STOCK_SORT); setPage(1)
    if (letter) clearLetter()
  }

  const hasFilter = !!(sectors.length || cap !== "all" || search || sort !== DEFAULT_STOCK_SORT || letter)
  const capLabel = CAP_OPTIONS.find((c) => c.value === cap)?.label

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={null}><LetterFromUrl onLetter={pickLetterFromUrl} /></Suspense>

      {/* ── HERO (compact: pitch on the left, market snapshot + shortcuts on the right) ── */}
      <section className="relative bg-cream border-b border-border/40 pt-24 pb-8 lg:pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[520px] h-[360px] bg-gold/10 rounded-full blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Stocks</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-12 items-center">
            <div className="space-y-4">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Equity Investing</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
                Stocks Investing With <span className="text-burgundy lg:block">MTF &amp; Pledge Benefits</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Trade and invest in 5,000+ NSE &amp; BSE listed stocks with Margin Trading Facility, pledge benefits, and powerful research tools — all on one platform.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button asChild className="bg-burgundy hover:bg-burgundy-deep text-white px-6 h-10 font-bold rounded-[5px]">
                  <Link href="/login">Start Trading</Link>
                </Button>
                <Button asChild variant="outline" className="border-border bg-white px-6 h-10 font-bold rounded-[5px] hover:bg-secondary">
                  <Link href="/login">Open Account</Link>
                </Button>
                <div className="flex items-center gap-4 sm:ml-3 sm:pl-5 sm:border-l border-border">
                  <div>
                    <div className="text-base font-black text-foreground leading-none">31+</div>
                    <div className="text-[10px] text-muted-foreground font-semibold mt-1">Years of Trust</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-foreground flex items-center gap-1 leading-none">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                    <div className="text-[10px] text-muted-foreground font-semibold mt-1">App Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market snapshot */}
            <div className="rounded-[10px] bg-white border border-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-2.5">Browse by market cap</p>
                <div className="grid grid-cols-3 gap-2">
                  {CAP_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => browseCap(c.value)}
                      className="group text-left rounded-[6px] border border-border bg-cream/50 px-3 py-3 hover:border-burgundy/30 hover:bg-white transition-all"
                    >
                      <div className="text-xs font-extrabold text-foreground flex items-center justify-between">
                        {c.label}
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-burgundy transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
                <Link
                  href="/mtf"
                  className="mt-3 flex items-center gap-3 rounded-[6px] bg-burgundy/[0.06] border border-burgundy/15 px-3 py-2.5 hover:bg-burgundy/10 transition-colors"
                >
                  <Zap className="w-4 h-4 text-burgundy shrink-0" />
                  <span className="text-[11px] text-foreground leading-snug">
                    <span className="font-extrabold">Up to 3× buying power</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-burgundy ml-auto shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL STOCKS: filter sidebar + table (the footer A–Z links scroll here) ── */}
      <section id="all-stocks" className="bg-background py-6 lg:py-8 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5 lg:gap-6 items-start">

          {/* Filters */}
          <aside className="lg:sticky lg:top-20 rounded-[8px] border border-border bg-white p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                aria-label="Search stocks"
                placeholder="Search stocks..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-8 py-2 text-sm rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
              />
              {search && (
                <button onClick={() => { setSearch(""); setPage(1) }} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Market Cap</p>
              <div className="grid grid-cols-4 gap-0.5 p-0.5 rounded-[6px] bg-secondary">
                {[{ short: "All", value: "all" }, ...CAP_OPTIONS].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => pickCap(c.value)}
                    aria-pressed={cap === c.value}
                    className={`py-1.5 rounded-[5px] text-[11px] font-bold transition-all ${
                      cap === c.value ? "bg-white text-burgundy shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.short}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Sector{sectors.length > 0 && <span className="text-burgundy"> · {sectors.length} selected</span>}
                </p>
                {sectors.length > 0 && (
                  <button onClick={clearSectors} className="text-[10px] font-bold text-burgundy hover:text-burgundy-deep">Clear</button>
                )}
              </div>
              {/* Tick several sectors: stocks in any of them are shown. 2 columns on phones, a list on desktop. */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-2 gap-y-0.5 max-h-[220px] lg:max-h-[340px] overflow-y-auto -mx-1 pr-1" role="group" aria-label="Sectors">
                <button
                  onClick={clearSectors}
                  aria-pressed={sectors.length === 0}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[5px] text-[12px] font-semibold transition-colors flex items-center gap-2 ${
                    sectors.length === 0 ? "bg-burgundy/[0.07] text-burgundy font-bold" : "text-muted-foreground hover:bg-cream hover:text-foreground"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 shrink-0 rounded-[3px] border flex items-center justify-center ${sectors.length === 0 ? "bg-burgundy border-burgundy" : "border-border bg-white"}`}>
                    {sectors.length === 0 && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </span>
                  <span className="truncate">All sectors</span>
                </button>
                {categories.map((s) => {
                  const on = sectors.includes(s)
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSector(s)}
                      role="checkbox"
                      aria-checked={on}
                      className={`w-full text-left px-2.5 py-1.5 rounded-[5px] text-[12px] font-semibold transition-colors flex items-center gap-2 ${
                        on ? "bg-burgundy/[0.07] text-burgundy font-bold" : "text-muted-foreground hover:bg-cream hover:text-foreground"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 shrink-0 rounded-[3px] border flex items-center justify-center ${on ? "bg-burgundy border-burgundy" : "border-border bg-white"}`}>
                        {on && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </span>
                      <span className="truncate">{s}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {hasFilter && (
              <button onClick={clearAll} className="w-full text-[11px] font-bold text-burgundy hover:text-burgundy-deep flex items-center justify-center gap-1 pt-3 border-t border-border/60 transition-colors">
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </aside>

          {/* Results */}
          <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">All Stocks</h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                <span className="font-bold text-foreground">{stockList?.total?.toLocaleString("en-IN") ?? NO_VALUE}</span> stocks listed on NSE &amp; BSE
              </p>
            </div>
            <label className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Sort</span>
              <select
                value={sort}
                onChange={(e) => pickSort(e.target.value as StockSort)}
                className="px-3 py-1.5 text-xs font-bold rounded-[5px] border border-border bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          </div>

          {/* Active filters */}
          {(sectors.length > 0 || capLabel || letter || debouncedSearch) && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {[
                debouncedSearch ? { key: "search", label: `“${debouncedSearch}”`, clear: () => { setSearch(""); setPage(1) } } : null,
                ...sectors.map((s) => ({ key: `sector:${s}`, label: s, clear: () => toggleSector(s) })),
                capLabel ? { key: "cap", label: capLabel, clear: () => pickCap("all") } : null,
                letter ? { key: "letter", label: letter === "0-9" ? "Starting with a number" : `Starting with ${letter}`, clear: clearLetter } : null,
              ].filter((f) => f !== null).map((f) => (
                <button key={f.key} onClick={f.clear} aria-label={`Remove filter ${f.label}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-burgundy/[0.06] border border-burgundy/20 text-[11px] font-bold text-burgundy hover:bg-burgundy/10">
                  {f.label} <X className="w-3 h-3" />
                </button>
              ))}
              <button onClick={clearAll} className="text-[11px] font-bold text-muted-foreground hover:text-foreground ml-1">Clear all</button>
            </div>
          )}

          {/* Table */}
          <div className="rounded-[8px] border border-border overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Header — desktop only */}
            <div
              className="hidden sm:grid px-4 py-2.5 border-b border-border bg-cream/70"
              style={{ gridTemplateColumns: "36px 1fr 120px 140px 110px 96px 32px" }}
            >
              <div />
              <div className="pl-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Company</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-center">Chart (1M)</div>
              <button type="button" onClick={togglePriceSort}
                aria-sort={sort === "price-desc" ? "descending" : sort === "price-asc" ? "ascending" : "none"}
                title={sort === "price-desc" ? "Highest to lowest" : sort === "price-asc" ? "Lowest to highest" : "Sort by LTP"}
                className={`flex items-center justify-end gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors ${sort === "price-desc" || sort === "price-asc" ? "text-burgundy" : "text-muted-foreground hover:text-foreground"}`}>
                LTP (₹)
                {sort === "price-desc" ? <ArrowUp className="w-3 h-3" /> : sort === "price-asc" ? <ArrowDown className="w-3 h-3" /> : <ArrowUpDown className="w-3 h-3 opacity-50" />}
              </button>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right hidden lg:block">Market Cap</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Change</div>
              <div />
            </div>

            {/* Rows */}
            <AnimatePresence mode="popLayout">
              {stockListError && !stockList ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center text-sm">
                  <p className="font-black text-foreground">Unable to load stocks</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{stockListError.message}</p>
                  <button onClick={retryStockList} className="mt-3 text-xs font-bold text-burgundy hover:underline">Try again</button>
                </motion.div>
              ) : stockListLoading && !stockList ? (
                <motion.div key="loading">
                  <TableRowsSkeleton rows={PER_PAGE} columns="minmax(0,1fr) 128px 110px 96px" avatar label="Loading stocks" />
                </motion.div>
              ) : pageData.length === 0 ? (
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
                  const change = stock.quote?.changePct ?? null
                  const up  = (change ?? 0) >= 0
                  const inWL = watchlist.has(stock.symbol)
                  const price = stock.quote?.price
                  const priceLabel = price == null ? NO_VALUE : `₹${formatPrice(price)}`
                  const changeIcon = change === null ? null : up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                  return (
                    <motion.div
                      key={stock.slug}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14, delay: idx * 0.018 }}
                      className="group border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors duration-150 cursor-pointer"
                      onClick={() => router.push(`/stocks/${stock.slug}`)}
                    >
                      {/* Mobile layout */}
                      <div className="sm:hidden flex items-center justify-between px-4 py-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <StockAvatar symbol={stock.symbol} name={stock.name} logoUrl={stock.logoUrl} className="w-9 h-9 text-[11px]" />
                          <div className="min-w-0">
                            <div className="font-extrabold text-sm text-foreground truncate">{stock.symbol}</div>
                            <div className="text-[11px] text-muted-foreground truncate">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-extrabold text-foreground tabular-nums">{priceLabel}</div>
                          <div className={`text-xs font-black flex items-center justify-end gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                            {changeIcon}
                            {formatPercent(change)}
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div
                        className="hidden sm:grid px-4 py-3"
                        style={{ gridTemplateColumns: "36px 1fr 120px 140px 110px 96px 32px" }}
                      >
                        <StockAvatar symbol={stock.symbol} name={stock.name} logoUrl={stock.logoUrl} className="w-9 h-9 text-[11px]" />

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
                          {stock.tradingViewSymbol ? (
                            <TradingViewMiniChart symbol={stock.tradingViewSymbol} width={128} height={56} />
                          ) : (
                            <span className="text-[11px] text-muted-foreground">{NO_VALUE}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-end">
                          <span className="text-sm font-extrabold text-foreground tabular-nums">{priceLabel}</span>
                        </div>

                        <div className="hidden lg:flex items-center justify-end">
                          <span className="text-[11px] font-semibold text-muted-foreground">{stock.capLabel ?? NO_VALUE}</span>
                        </div>

                        <div className="flex items-center justify-end">
                          <span className={`text-xs font-black flex items-center gap-0.5 ${up ? "text-profit" : "text-loss"}`}>
                            {changeIcon}
                            {formatPercent(change)}
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

          <TradingViewCredit className="hidden sm:block mt-2 text-right" />

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
          </div>
        </div>
      </section>

      {/* ── TRADE WITH MORE FLEXIBILITY ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Trade With More Flexibility</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Invest Beyond Available Cash</h2>
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


      {/* ── PRICING ── */}
      <section className="py-14 lg:py-20 bg-background border-t border-border/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-4">Simple Pricing</p>
          <div className="text-6xl sm:text-7xl font-black text-gold-deep tracking-tight mb-4">₹17</div>
          <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-xl mx-auto">
            No percentage fees, no hidden slabs. Just one honest price on every trade — delivery, intraday and F&amp;O.
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
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
                {/* Hidden with the top gainers card above.
                {topGainers.map((s) => (
                  <div key={s.symbol} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{s.symbol}</span>
                    <span className="text-[9px] font-bold text-profit shrink-0">+{s.change.toFixed(2)}%</span>
                  </div>
                ))}
                */}
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                Latest Market News
              </h2>
            </div>
          </div>

          {/* Live CMOTS Market Beat stories: every story the API sends, scrolling sideways. */}
          {marketNews.error && !marketNews.data ? (
            <div className="rounded-[8px] border border-border bg-white py-12 text-center text-sm">
              <p className="font-black text-foreground">Unable to load market news</p>
              <button onClick={marketNews.retry} className="mt-2 text-xs font-bold text-burgundy hover:underline">Try again</button>
            </div>
          ) : marketNews.data && marketNews.data.items.length === 0 ? (
            <div className="rounded-[8px] border border-border bg-white py-12 text-center text-sm text-muted-foreground">No market news right now.</div>
          ) : (
            <NewsCarousel items={marketNews.data?.items ?? []} loading={!marketNews.data} showTag={false}
              label="Latest market news" cardWidth="w-[285px] sm:w-[330px]" />
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

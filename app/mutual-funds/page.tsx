"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, TrendingUp, ChevronLeft, ChevronRight,
  ArrowUpRight, Calculator, Shield, Star, Check,
  Zap, BarChart2, Clock, Users, Award,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────

type FundType     = "Equity" | "Hybrid" | "Debt" | "Index"
type RiskLevel    = "Low" | "Moderate" | "High" | "Very High"
type FundCategory =
  | "Large Cap" | "Mid Cap" | "Small Cap" | "Multi Cap"
  | "ELSS" | "Sectoral" | "Index" | "Balanced Advantage"
  | "Short Duration" | "Liquid"

interface Fund {
  id: string
  name: string
  amc: string
  amcColor: string
  type: FundType
  category: FundCategory
  aumLabel: string
  aumCr: number
  returns1Y: number
  returns3Y: number
  returns5Y: number
  minSIP: number
  risk: RiskLevel
  rating: number
}

// ─── Mock Fund Data ─────────────────────────────────────────────────────────

const ALL_FUNDS: Fund[] = [
  // Large Cap
  { id: "sbi-bc",    name: "SBI Bluechip Fund",                   amc: "SBI MF",         amcColor: "#1D4ED8", type: "Equity", category: "Large Cap",          aumLabel: "₹44,820 Cr",  aumCr: 44820,  returns1Y: 22.4, returns3Y: 14.8, returns5Y: 18.2, minSIP: 500,  risk: "Moderate",  rating: 5 },
  { id: "hdfc-top",  name: "HDFC Top 100 Fund",                   amc: "HDFC MF",        amcColor: "#DC2626", type: "Equity", category: "Large Cap",          aumLabel: "₹32,150 Cr",  aumCr: 32150,  returns1Y: 24.1, returns3Y: 15.6, returns5Y: 16.8, minSIP: 500,  risk: "Moderate",  rating: 4 },
  { id: "ici-blue",  name: "ICICI Pru Bluechip Fund",             amc: "ICICI Pru",      amcColor: "#D97706", type: "Equity", category: "Large Cap",          aumLabel: "₹52,600 Cr",  aumCr: 52600,  returns1Y: 21.8, returns3Y: 16.2, returns5Y: 19.1, minSIP: 100,  risk: "Moderate",  rating: 5 },
  // Mid Cap
  { id: "kot-emg",   name: "Kotak Emerging Equity Fund",          amc: "Kotak MF",       amcColor: "#16A34A", type: "Equity", category: "Mid Cap",            aumLabel: "₹39,240 Cr",  aumCr: 39240,  returns1Y: 38.2, returns3Y: 21.5, returns5Y: 25.8, minSIP: 1000, risk: "High",      rating: 5 },
  { id: "nip-mid",   name: "Nippon India Mid Cap Fund",            amc: "Nippon India",   amcColor: "#0891B2", type: "Equity", category: "Mid Cap",            aumLabel: "₹28,680 Cr",  aumCr: 28680,  returns1Y: 41.5, returns3Y: 23.8, returns5Y: 28.4, minSIP: 100,  risk: "High",      rating: 4 },
  { id: "axis-mid",  name: "Axis Midcap Fund",                    amc: "Axis MF",        amcColor: "#7C3AED", type: "Equity", category: "Mid Cap",            aumLabel: "₹22,450 Cr",  aumCr: 22450,  returns1Y: 29.6, returns3Y: 17.4, returns5Y: 22.1, minSIP: 500,  risk: "High",      rating: 4 },
  // Small Cap
  { id: "sbi-sc",    name: "SBI Small Cap Fund",                   amc: "SBI MF",         amcColor: "#1D4ED8", type: "Equity", category: "Small Cap",          aumLabel: "₹24,110 Cr",  aumCr: 24110,  returns1Y: 45.2, returns3Y: 26.4, returns5Y: 31.2, minSIP: 500,  risk: "Very High", rating: 5 },
  { id: "nip-sc",    name: "Nippon Small Cap Fund",                amc: "Nippon India",   amcColor: "#0891B2", type: "Equity", category: "Small Cap",          aumLabel: "₹42,350 Cr",  aumCr: 42350,  returns1Y: 48.8, returns3Y: 29.1, returns5Y: 33.6, minSIP: 100,  risk: "Very High", rating: 5 },
  // Multi Cap
  { id: "nip-mc",    name: "Nippon India Multi Cap Fund",          amc: "Nippon India",   amcColor: "#0891B2", type: "Equity", category: "Multi Cap",          aumLabel: "₹18,920 Cr",  aumCr: 18920,  returns1Y: 35.4, returns3Y: 20.6, returns5Y: 24.3, minSIP: 100,  risk: "High",      rating: 4 },
  { id: "hdfc-mc",   name: "HDFC Multi Cap Fund",                  amc: "HDFC MF",        amcColor: "#DC2626", type: "Equity", category: "Multi Cap",          aumLabel: "₹12,680 Cr",  aumCr: 12680,  returns1Y: 32.8, returns3Y: 18.9, returns5Y: 22.6, minSIP: 500,  risk: "High",      rating: 4 },
  // ELSS
  { id: "mir-elss",  name: "Mirae Asset Tax Saver Fund",           amc: "Mirae Asset",    amcColor: "#B91C1C", type: "Equity", category: "ELSS",               aumLabel: "₹20,840 Cr",  aumCr: 20840,  returns1Y: 26.4, returns3Y: 16.8, returns5Y: 20.5, minSIP: 500,  risk: "High",      rating: 5 },
  { id: "axis-elss", name: "Axis Long Term Equity Fund",           amc: "Axis MF",        amcColor: "#7C3AED", type: "Equity", category: "ELSS",               aumLabel: "₹32,150 Cr",  aumCr: 32150,  returns1Y: 18.2, returns3Y: 12.4, returns5Y: 16.8, minSIP: 500,  risk: "High",      rating: 4 },
  { id: "dsp-elss",  name: "DSP Tax Saver Fund",                   amc: "DSP MF",         amcColor: "#0369A1", type: "Equity", category: "ELSS",               aumLabel: "₹14,620 Cr",  aumCr: 14620,  returns1Y: 24.6, returns3Y: 15.2, returns5Y: 18.9, minSIP: 500,  risk: "High",      rating: 4 },
  // Index Funds
  { id: "uti-n50",   name: "UTI Nifty 50 Index Fund",              amc: "UTI MF",         amcColor: "#15803D", type: "Index",  category: "Index",              aumLabel: "₹16,480 Cr",  aumCr: 16480,  returns1Y: 20.1, returns3Y: 13.6, returns5Y: 16.2, minSIP: 500,  risk: "Moderate",  rating: 5 },
  { id: "hdfc-n50",  name: "HDFC Nifty 50 Index Fund",             amc: "HDFC MF",        amcColor: "#DC2626", type: "Index",  category: "Index",              aumLabel: "₹12,940 Cr",  aumCr: 12940,  returns1Y: 19.8, returns3Y: 13.4, returns5Y: 15.9, minSIP: 100,  risk: "Moderate",  rating: 5 },
  { id: "nip-n50",   name: "Nippon Nifty 50 BeES ETF FoF",         amc: "Nippon India",   amcColor: "#0891B2", type: "Index",  category: "Index",              aumLabel: "₹8,240 Cr",   aumCr: 8240,   returns1Y: 20.0, returns3Y: 13.5, returns5Y: 16.0, minSIP: 100,  risk: "Moderate",  rating: 4 },
  // Sectoral
  { id: "ici-infra", name: "ICICI Pru Infrastructure Fund",        amc: "ICICI Pru",      amcColor: "#D97706", type: "Equity", category: "Sectoral",           aumLabel: "₹5,840 Cr",   aumCr: 5840,   returns1Y: 62.4, returns3Y: 34.2, returns5Y: 28.6, minSIP: 1000, risk: "Very High", rating: 4 },
  { id: "abl-psu",   name: "Aditya Birla PSU Equity Fund",         amc: "Aditya Birla",   amcColor: "#B45309", type: "Equity", category: "Sectoral",           aumLabel: "₹4,680 Cr",   aumCr: 4680,   returns1Y: 58.8, returns3Y: 31.6, returns5Y: 26.4, minSIP: 1000, risk: "Very High", rating: 4 },
  // Balanced Advantage / Hybrid
  { id: "hdfc-ba",   name: "HDFC Balanced Advantage Fund",         amc: "HDFC MF",        amcColor: "#DC2626", type: "Hybrid", category: "Balanced Advantage", aumLabel: "₹82,640 Cr",  aumCr: 82640,  returns1Y: 18.4, returns3Y: 13.2, returns5Y: 15.6, minSIP: 100,  risk: "Moderate",  rating: 5 },
  { id: "ici-ba",    name: "ICICI Pru Balanced Advantage",         amc: "ICICI Pru",      amcColor: "#D97706", type: "Hybrid", category: "Balanced Advantage", aumLabel: "₹56,820 Cr",  aumCr: 56820,  returns1Y: 16.8, returns3Y: 12.4, returns5Y: 14.2, minSIP: 100,  risk: "Moderate",  rating: 5 },
  // Debt
  { id: "sbi-sd",    name: "SBI Short Term Debt Fund",             amc: "SBI MF",         amcColor: "#1D4ED8", type: "Debt",   category: "Short Duration",     aumLabel: "₹28,640 Cr",  aumCr: 28640,  returns1Y:  7.4, returns3Y:  6.8, returns5Y:  7.1, minSIP: 500,  risk: "Low",       rating: 4 },
  { id: "hdfc-liq",  name: "HDFC Liquid Fund",                     amc: "HDFC MF",        amcColor: "#DC2626", type: "Debt",   category: "Liquid",             aumLabel: "₹42,180 Cr",  aumCr: 42180,  returns1Y:  7.1, returns3Y:  5.9, returns5Y:  6.4, minSIP: 500,  risk: "Low",       rating: 5 },
]

const EXPLORER_TABS = [
  { id: "all",       label: "All Funds"    },
  { id: "sip100",    label: "SIP ₹100"     },
  { id: "sip500",    label: "SIP ₹500"     },
  { id: "highret",   label: "High Returns" },
  { id: "index",     label: "Index Funds"  },
]

const TYPE_FILTERS: Array<{ label: string; value: FundType | "All" }> = [
  { label: "All",    value: "All"    },
  { label: "Equity", value: "Equity" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Debt",   value: "Debt"   },
  { label: "Index",  value: "Index"  },
]

const RISK_FILTERS: Array<{ label: string; value: RiskLevel | "All" }> = [
  { label: "All",       value: "All"       },
  { label: "Low",       value: "Low"       },
  { label: "Moderate",  value: "Moderate"  },
  { label: "High",      value: "High"      },
  { label: "Very High", value: "Very High" },
]

const CATEGORIES_GRID = [
  { label: "Large Cap",          count: 48, color: "#8B0D19", icon: BarChart2 },
  { label: "Mid Cap",            count: 32, color: "#8B0D19", icon: TrendingUp },
  { label: "Small Cap",          count: 28, color: "#8B0D19", icon: Zap },
  { label: "ELSS (Tax Saver)",   count: 38, color: "#8B0D19", icon: Shield },
  { label: "Index Funds",        count: 56, color: "#8B0D19", icon: BarChart2 },
  { label: "Balanced Advantage", count: 20, color: "#8B0D19", icon: Award },
  { label: "Multi Cap",          count: 24, color: "#8B0D19", icon: TrendingUp },
  { label: "Sectoral / Thematic",count: 82, color: "#8B0D19", icon: Star },
  { label: "Debt / Liquid",      count: 44, color: "#8B0D19", icon: Shield },
  { label: "Hybrid",             count: 36, color: "#8B0D19", icon: Users },
]

const AMC_PARTNERS = [
  { name: "SBI Mutual Fund",          color: "#1D4ED8" },
  { name: "HDFC Mutual Fund",         color: "#DC2626" },
  { name: "ICICI Prudential",         color: "#D97706" },
  { name: "Kotak MF",                 color: "#16A34A" },
  { name: "Axis Mutual Fund",         color: "#7C3AED" },
  { name: "Nippon India",             color: "#0891B2" },
  { name: "Mirae Asset",              color: "#B91C1C" },
  { name: "UTI Mutual Fund",          color: "#15803D" },
  { name: "Aditya Birla SL",          color: "#B45309" },
  { name: "DSP Mutual Fund",          color: "#0369A1" },
  { name: "Franklin Templeton",       color: "#D97706" },
  { name: "Motilal Oswal MF",         color: "#6D28D9" },
]

const PER_PAGE = 8

// ─── Sub-components ─────────────────────────────────────────────────────────

function AmcPlaceholder({ amc, color }: { amc: string; color: string }) {
  const initials = amc
    .replace("Mutual Fund", "MF").replace("Prudential", "Pru")
    .split(" ").slice(0, 2).map((w) => w[0]).join("")
  return (
    <div
      className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[11px] font-black shrink-0"
      style={{ background: color + "18", color, border: `1px solid ${color}28` }}
    >
      {initials}
    </div>
  )
}

function TypeBadge({ type }: { type: FundType }) {
  const map: Record<FundType, string> = {
    Equity: "bg-burgundy/8 text-burgundy border-burgundy/20",
    Hybrid: "bg-amber-500/10 text-amber-600 border-amber-200",
    Debt:   "bg-blue-500/10 text-blue-600 border-blue-200",
    Index:  "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  }
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] border ${map[type]}`}>
      {type}
    </span>
  )
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const map: Record<RiskLevel, string> = {
    "Low":       "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Moderate":  "bg-amber-50 text-amber-600 border-amber-200",
    "High":      "bg-orange-50 text-orange-600 border-orange-200",
    "Very High": "bg-red-50 text-red-600 border-red-200",
  }
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] border ${map[level]}`}>
      {level}
    </span>
  )
}

function ReturnCell({ val }: { val: number }) {
  const up = val >= 0
  return (
    <span className={`text-sm font-extrabold tabular-nums ${up ? "text-profit" : "text-loss"}`}>
      {up ? "+" : ""}{val.toFixed(1)}%
    </span>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-2.5 h-2.5"
          style={{ color: i <= rating ? "#D9B27C" : "#E5E7EB", fill: i <= rating ? "#D9B27C" : "transparent" }}
        />
      ))}
    </div>
  )
}

// ─── SIP Calculator ─────────────────────────────────────────────────────────

function SIPCalculator() {
  const [sip, setSip]   = useState(5000)
  const [yrs, setYrs]   = useState(10)
  const [rIdx, setRIdx] = useState(1)

  const RATES = [8, 10, 12, 15]
  const rate  = RATES[rIdx]
  const n     = yrs * 12
  const r     = rate / 12 / 100
  const corpus   = Math.round(sip * (((1 + r) ** n - 1) / r) * (1 + r))
  const invested = sip * n
  const gains    = corpus - invested
  const invPct   = Math.round((invested / corpus) * 100)

  const fmt = (v: number) =>
    v >= 10000000
      ? `₹${(v / 10000000).toFixed(2)} Cr`
      : v >= 100000
      ? `₹${(v / 100000).toFixed(2)} L`
      : `₹${v.toLocaleString("en-IN")}`

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Controls */}
      <div className="space-y-6">
        {/* SIP Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">Monthly SIP</label>
            <span className="text-sm font-black text-burgundy">₹{sip.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range" min={500} max={50000} step={500} value={sip}
            onChange={(e) => setSip(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-burgundy"
            style={{ background: `linear-gradient(to right, #FF0000 ${((sip - 500) / 49500) * 100}%, #E5E7EB ${((sip - 500) / 49500) * 100}%)` }}
          />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground/60 font-semibold">
            <span>₹500</span><span>₹50,000</span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">Duration</label>
            <span className="text-sm font-black text-burgundy">{yrs} Years</span>
          </div>
          <input
            type="range" min={1} max={30} step={1} value={yrs}
            onChange={(e) => setYrs(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-burgundy"
            style={{ background: `linear-gradient(to right, #FF0000 ${((yrs - 1) / 29) * 100}%, #E5E7EB ${((yrs - 1) / 29) * 100}%)` }}
          />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground/60 font-semibold">
            <span>1 yr</span><span>30 yrs</span>
          </div>
        </div>

        {/* Expected Returns */}
        <div>
          <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2 block">Expected Returns (p.a.)</label>
          <div className="flex gap-2">
            {RATES.map((rt, i) => (
              <button
                key={rt}
                onClick={() => setRIdx(i)}
                className={`flex-1 py-2 rounded-[5px] text-xs font-bold border transition-all duration-200 ${
                  i === rIdx
                    ? "bg-burgundy text-white border-burgundy shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-burgundy/30 hover:text-burgundy"
                }`}
              >
                {rt}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-cream rounded-[10px] p-6 border border-border/50 space-y-5">
        <div className="text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mb-1">Estimated Corpus</p>
          <motion.p
            key={corpus}
            initial={{ scale: 0.92, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-black text-foreground"
          >
            {fmt(corpus)}
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1">in {yrs} years at {rate}% p.a.</p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex rounded-[5px] overflow-hidden h-3">
            <motion.div
              animate={{ width: `${invPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gold/80 h-full"
            />
            <motion.div
              animate={{ width: `${100 - invPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-burgundy h-full"
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-gold/80" />
              <span className="text-[10px] font-semibold text-muted-foreground">Invested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-burgundy" />
              <span className="text-[10px] font-semibold text-muted-foreground">Estimated Gains</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-border rounded-[6px] p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Total Invested</p>
            <p className="text-sm font-black text-gold-deep">{fmt(invested)}</p>
          </div>
          <div className="bg-white border border-border rounded-[6px] p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Est. Gains</p>
            <p className="text-sm font-black text-profit">+{fmt(gains)}</p>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full bg-burgundy hover:bg-burgundy-deep text-white font-bold rounded-[5px] text-xs"
        >
          Start SIP Now →
        </Button>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function MutualFundsPage() {
  const [activeTab, setActiveTab]   = useState("all")
  const [typeFilter, setTypeFilter] = useState<FundType | "All">("All")
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All")
  const [search, setSearch]         = useState("")
  const [page, setPage]             = useState(1)

  const filtered = useMemo(() => {
    let list = ALL_FUNDS

    // Tab-based filter
    if (activeTab === "sip100")   list = list.filter((f) => f.minSIP <= 100)
    if (activeTab === "sip500")   list = list.filter((f) => f.minSIP <= 500)
    if (activeTab === "highret")  list = [...list].sort((a, b) => b.returns3Y - a.returns3Y)
    if (activeTab === "index")    list = list.filter((f) => f.type === "Index")

    // Type filter
    if (typeFilter !== "All") list = list.filter((f) => f.type === typeFilter)

    // Risk filter
    if (riskFilter !== "All") list = list.filter((f) => f.risk === riskFilter)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.amc.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      )
    }

    // Default sort by AUM (if not highret tab)
    if (activeTab !== "highret") {
      list = [...list].sort((a, b) => b.aumCr - a.aumCr)
    }

    return list
  }, [activeTab, typeFilter, riskFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const switchTab = (id: string) => { setActiveTab(id); setPage(1) }
  const pickType  = (v: FundType | "All") => { setTypeFilter(v); setPage(1) }
  const pickRisk  = (v: RiskLevel | "All") => { setRiskFilter(v); setPage(1) }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-14 overflow-hidden">
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
            <span className="text-foreground font-semibold">Mutual Funds</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Wealth Creation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Invest in<br />
                <span className="text-burgundy">Mutual Funds</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                2,500+ funds across equity, debt, and hybrid. Start SIP from ₹100 with zero commission and research-backed recommendations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Start SIP Now
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Explore Funds
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { v: "₹0",    l: "Commission"       },
                  { v: "2,500+",l: "Funds Available"   },
                  { v: "₹100",  l: "Minimum SIP"       },
                  { v: "30+",   l: "AMC Partners"      },
                ].map((stat) => (
                  <div key={stat.l}>
                    <div className="text-lg font-black text-foreground">{stat.v}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold">{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — fund performance card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Top Performer</span>
                  <span className="text-[9px] font-bold text-muted-foreground">3Y Returns</span>
                </div>

                {/* Fund item */}
                {[
                  { name: "SBI Small Cap",   ret: "+29.1%", color: "#1D4ED8" },
                  { name: "Nippon Mid Cap",  ret: "+23.8%", color: "#0891B2" },
                  { name: "Mirae Tax Saver", ret: "+16.8%", color: "#B91C1C" },
                ].map((f) => (
                  <div key={f.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-[5px] text-[9px] font-black flex items-center justify-center"
                        style={{ background: f.color + "18", color: f.color, border: `1px solid ${f.color}25` }}
                      >
                        {f.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <span className="text-[11px] font-semibold text-foreground">{f.name}</span>
                    </div>
                    <span className="text-[12px] font-black text-profit">{f.ret}</span>
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

      {/* ── FUND EXPLORER ── */}
      <section className="bg-background py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Explore</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Find Your Fund</h2>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto mb-5" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-0 border border-border rounded-[6px] overflow-hidden bg-cream/50 w-fit">
              {EXPLORER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`px-4 py-2.5 text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-burgundy text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search funds, AMCs..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9 pr-3 py-2 text-sm rounded-[5px] border border-border bg-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 w-48"
              />
            </div>

            {/* Type filter */}
            <div className="flex gap-1.5">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => pickType(f.value)}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold border transition-all duration-200 ${
                    typeFilter === f.value
                      ? "bg-burgundy text-white border-burgundy"
                      : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Risk filter */}
            <div className="flex gap-1.5">
              {RISK_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => pickRisk(f.value)}
                  className={`px-3 py-1.5 rounded-[5px] text-[11px] font-bold border transition-all duration-200 ${
                    riskFilter === f.value
                      ? "bg-gold/15 text-gold-deep border-gold/35"
                      : "bg-white text-muted-foreground border-border hover:border-gold/25 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-muted-foreground mb-3">
            Showing <span className="font-bold text-foreground">{filtered.length}</span> funds
          </p>

          {/* Fund Table */}
          <div className="rounded-[8px] border border-border bg-white overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div
              className="hidden md:grid px-4 py-2.5 border-b border-border bg-cream/60"
              style={{ gridTemplateColumns: "40px 1fr 70px 90px 72px 72px 72px 80px 100px" }}
            >
              <div />
              <div className="pl-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Fund</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Risk</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">AUM</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">1Y</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">3Y</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">5Y</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground text-right">Min SIP</div>
              <div />
            </div>

            {/* Rows */}
            <AnimatePresence mode="popLayout">
              {pageData.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-14 text-center text-muted-foreground text-sm">
                  No funds match your filters.
                </motion.div>
              ) : (
                pageData.map((fund, idx) => (
                  <motion.div
                    key={fund.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.13, delay: idx * 0.016 }}
                    className="border-b border-border/40 last:border-0 hover:bg-cream/25 transition-colors duration-150 cursor-pointer group"
                  >
                    {/* Mobile */}
                    <div className="md:hidden flex items-center justify-between px-4 py-3.5 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <AmcPlaceholder amc={fund.amc} color={fund.amcColor} />
                        <div className="min-w-0">
                          <div className="font-extrabold text-sm text-foreground leading-tight truncate">{fund.name}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <TypeBadge type={fund.type} />
                            <span className="text-[9px] text-muted-foreground/60">{fund.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 space-y-0.5">
                        <div className="text-[10px] font-semibold text-muted-foreground">3Y</div>
                        <ReturnCell val={fund.returns3Y} />
                      </div>
                    </div>

                    {/* Desktop */}
                    <div
                      className="hidden md:grid px-4 py-3"
                      style={{ gridTemplateColumns: "40px 1fr 70px 90px 72px 72px 72px 80px 100px" }}
                    >
                      <AmcPlaceholder amc={fund.amc} color={fund.amcColor} />

                      <div className="pl-3 min-w-0 flex flex-col justify-center gap-0.5">
                        <div className="font-extrabold text-sm text-foreground leading-tight truncate">{fund.name}</div>
                        <div className="flex items-center gap-1.5">
                          <TypeBadge type={fund.type} />
                          <span className="text-[9px] text-muted-foreground/55">{fund.category}</span>
                        </div>
                        <StarRating rating={fund.rating} />
                      </div>

                      <div className="flex items-center">
                        <RiskBadge level={fund.risk} />
                      </div>

                      <div className="flex items-center justify-end">
                        <span className="text-xs font-semibold text-muted-foreground">{fund.aumLabel}</span>
                      </div>

                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns1Y} /></div>
                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns3Y} /></div>
                      <div className="flex items-center justify-end"><ReturnCell val={fund.returns5Y} /></div>

                      <div className="flex items-center justify-end">
                        <span className="text-xs font-semibold text-muted-foreground">
                          ₹{fund.minSIP.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center justify-end">
                        <Button
                          size="sm"
                          className="h-8 px-4 text-[11px] font-bold bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        >
                          Invest
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Page {page} of {totalPages}</p>
              <div className="flex gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
                  return (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-[5px] border text-xs font-bold transition-all ${
                        pg === page ? "bg-burgundy text-white border-burgundy" : "border-border text-muted-foreground hover:text-foreground"
                      }`}>
                      {pg}
                    </button>
                  )
                })}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded-[5px] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FUND CATEGORIES ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Browse by Category</p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">All Fund Categories</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES_GRID.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="bg-white border border-border rounded-[8px] p-4 hover:border-burgundy/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-250 cursor-pointer group"
                >
                  <div
                    className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-3"
                    style={{ background: cat.color + "14", border: `1px solid ${cat.color}22` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: cat.color }} strokeWidth={1.8} />
                  </div>
                  <div className="font-extrabold text-sm text-foreground leading-tight mb-1 group-hover:text-burgundy transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-semibold">{cat.count} funds</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Why Shree Varahi</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">The smarter way to invest in mutual funds.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Award,
                color: "#8B0D19",
                title: "0% Commission",
                desc: "Invest directly in regular & direct mutual funds with zero hidden charges or commission.",
                points: ["No entry load", "No exit penalties", "Transparent pricing"],
              },
              {
                icon: BarChart2,
                color: "#8B0D19",
                title: "Research Backed",
                desc: "Fund recommendations powered by SEBI-registered research analysts and quant models.",
                points: ["Expert analysis", "Quant screener", "Risk scoring"],
              },
              {
                icon: Zap,
                color: "#8B0D19",
                title: "Seamless Investing",
                desc: "Start, pause, or switch SIPs in seconds via app or web. Real-time portfolio tracking.",
                points: ["One-click SIP", "Instant switch", "Live NAV tracking"],
              },
              {
                icon: Users,
                color: "#8B0D19",
                title: "Trusted by Millions",
                desc: "31+ years of experience. Backed by 5 lakh+ active investors and 30+ AMC partnerships.",
                points: ["31 years legacy", "30+ AMC partners", "Secure & regulated"],
              },
            ].map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-[8px] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/20 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-[7px] flex items-center justify-center mb-4"
                    style={{ background: b.color + "14", border: `1px solid ${b.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: b.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-base mb-2">{b.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{b.desc}</p>
                  <ul className="space-y-1.5">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-profit shrink-0" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold text-foreground/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SIP CALCULATOR ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-white border border-border overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
            <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">SIP Calculator</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                    See how your money<br />
                    <span className="text-burgundy">grows over time.</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Calculator className="w-4 h-4 text-gold-deep" />
                  <span>Returns are estimated and not guaranteed.</span>
                </div>
              </div>
              <SIPCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── AMC PARTNERS ── */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Fund Houses</p>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">AMC Partners</h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {AMC_PARTNERS.map((amc) => {
              const initials = amc.name
                .replace("Mutual Fund", "MF").replace("Prudential", "Pru")
                .split(" ").slice(0, 2).map((w) => w[0]).join("")
              return (
                <motion.div
                  key={amc.name}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.15 }}
                  className="bg-white border border-border/60 rounded-[8px] p-3 flex flex-col items-center gap-2 hover:border-gold/25 hover:shadow-sm transition-all cursor-pointer"
                >
                  {/* AMC logo placeholder */}
                  <div
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center text-sm font-black"
                    style={{ background: amc.color + "14", color: amc.color, border: `1px solid ${amc.color}22` }}
                  >
                    {initials}
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground text-center leading-tight">{amc.name}</span>
                </motion.div>
              )
            })}

            {/* +18 more */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.15 }}
              className="bg-cream border border-border/50 rounded-[8px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold/30"
            >
              <div className="w-12 h-12 rounded-[8px] bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="text-gold-deep font-black text-base">+18</span>
              </div>
              <span className="text-[9px] font-bold text-muted-foreground text-center">More AMCs</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-1">Getting Started</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Start investing in 4 easy steps.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Open Account",      desc: "Complete KYC digitally in under 5 minutes with Aadhaar & PAN.",          icon: Users    },
              { step: "02", title: "Browse Funds",      desc: "Search from 2,500+ funds filtered by category, risk, and returns.",      icon: Search   },
              { step: "03", title: "Choose SIP/Lumpsum",desc: "Pick monthly SIP or one-time lumpsum. Start from just ₹100.",           icon: Calculator},
              { step: "04", title: "Track Portfolio",   desc: "Monitor NAV, returns, and portfolio health in real time on app or web.", icon: BarChart2 },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  {/* connector line */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-0 h-px bg-border/60 z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-burgundy/8 border-2 border-burgundy/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[9px] font-extrabold text-burgundy/60 tracking-widest">{step.step}</span>
                    <h3 className="font-extrabold text-sm text-foreground">{step.title}</h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
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
            Start your SIP today. Watch it grow.
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
            Open a free account and invest in 2,500+ mutual funds with zero commission, expert research, and real-time tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-white hover:bg-gold-champagne text-burgundy font-black px-8 h-11 text-sm rounded-[5px] shadow-xl">
              Start SIP Now →
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-11 text-sm rounded-[5px]">
              Explore Funds
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

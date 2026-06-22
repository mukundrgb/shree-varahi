"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Info,
  BarChart2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// ─── Mock data ─────────────────────────────────────────────────────────────

const PRICE      = 24013.10
const CHANGE     = -154.90
const CHANGE_PCT = -0.64
const isPos      = CHANGE >= 0

const KEY_STATS = [
  { label: "High",       value: "24,047.20" },
  { label: "Low",        value: "23,901.90" },
  { label: "Open",       value: "23,991.20" },
  { label: "Prev Close", value: "24,168.00" },
  { label: "52W High",   value: "26,277.35" },
  { label: "52W Low",    value: "21,964.60" },
  { label: "P/E Ratio",  value: "22.43" },
  { label: "P/B Ratio",  value: "3.64" },
  { label: "Div Yield",  value: "1.28%" },
  { label: "Market Cap", value: "₹3.51L Cr" },
]

const CHART_DATA: Record<string, number[]> = {
  "1D": [
    23991,23998,24002,24018,24035,24028,24042,24047,24039,24031,
    24022,24015,24008,23998,23985,23972,23965,23958,23945,23938,
    23950,23963,23971,23980,23992,24001,24010,24023,24031,24040,
    24041,24035,24028,24018,24008,23998,23990,23982,23975,23965,
    23958,23951,23945,23935,23922,23915,23902,23901,23908,23918,
    23928,23940,23952,23965,23975,23985,23992,24000,24005,24013,
  ],
  "1W": [24310,24280,24180,24090,24250,24160,24080,24013],
  "1M": [24800,24750,24650,24520,24380,24490,24320,24210,24100,24230,24150,24013],
  "3M": [25100,24900,24700,24500,24300,24100,23850,23700,23900,24100,24050,24013],
  "1Y": [22100,22500,23000,23800,24500,25100,26000,26277,25800,24800,24200,24013],
  "5Y": [12000,14000,11500,17500,19000,21000,23000,21500,22000,24013],
}

const CHART_RETURNS: Record<string, number> = {
  "1D": -0.64, "1W": -1.23, "1M": -3.17, "3M": -4.31, "1Y": 8.70, "5Y": 100.11,
}

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const
type TF = typeof TIMEFRAMES[number]

const CONSTITUENTS = [
  { name: "Reliance Industries", ticker: "RELIANCE",   sector: "Energy",  weight: 10.32, chg: -0.42 },
  { name: "HDFC Bank",           ticker: "HDFCBANK",   sector: "Banking", weight:  8.91, chg: -0.87 },
  { name: "ICICI Bank",          ticker: "ICICIBANK",  sector: "Banking", weight:  7.24, chg: -0.31 },
  { name: "Infosys",             ticker: "INFY",       sector: "IT",      weight:  5.83, chg:  0.54 },
  { name: "TCS",                 ticker: "TCS",        sector: "IT",      weight:  5.21, chg:  0.22 },
  { name: "Bharti Airtel",       ticker: "BHARTIARTL", sector: "Telecom", weight:  3.96, chg:  1.12 },
  { name: "Axis Bank",           ticker: "AXISBANK",   sector: "Banking", weight:  3.44, chg: -1.02 },
  { name: "L&T",                 ticker: "LT",         sector: "Infra",   weight:  3.31, chg:  0.38 },
  { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK",  sector: "Banking", weight:  3.18, chg: -0.55 },
  { name: "Hindustan Unilever",  ticker: "HINDUNILVR", sector: "FMCG",    weight:  3.02, chg:  0.18 },
]

const SECTORS = [
  { name: "Banking & Finance", weight: 28.4, color: "#FF0000" },
  { name: "IT",                weight: 15.2, color: "#4F7CAC" },
  { name: "Oil & Energy",      weight: 12.8, color: "#D9B27C" },
  { name: "FMCG",              weight:  9.3, color: "#22C55E" },
  { name: "Auto",              weight:  6.1, color: "#A855F7" },
  { name: "Pharma",            weight:  5.4, color: "#F59E0B" },
  { name: "Telecom",           weight:  4.8, color: "#14B8A6" },
  { name: "Infra",             weight:  3.9, color: "#EC4899" },
  { name: "Metals",            weight:  3.4, color: "#6366F1" },
  { name: "Others",            weight: 10.7, color: "#94A3B8" },
]

const RETURNS = [
  { p: "1W", v: -0.64 }, { p: "1M", v: -3.17 }, { p: "3M", v: -4.31 },
  { p: "6M", v: -6.80 }, { p: "1Y", v:  8.52 }, { p: "3Y", v: 41.30 },
  { p: "5Y", v: 98.60 },
]

const TECHNICALS = [
  { label: "5-SMA",    value: "24,120", signal: "Buy"     },
  { label: "10-SMA",   value: "24,210", signal: "Sell"    },
  { label: "20-SMA",   value: "24,380", signal: "Sell"    },
  { label: "50-SMA",   value: "24,060", signal: "Sell"    },
  { label: "200-SMA",  value: "22,840", signal: "Buy"     },
  { label: "RSI (14)", value: "43.2",   signal: "Neutral" },
  { label: "MACD",     value: "-87.4",  signal: "Sell"    },
]

const RELATED = [
  { name: "Nifty Bank",     chg: -0.91 },
  { name: "Finnifty",       chg:  0.32 },
  { name: "Sensex",         chg: -0.58 },
  { name: "Nifty Next 50",  chg:  0.17 },
  { name: "Nifty Mid 50",   chg:  0.44 },
]

const FACTS = [
  { label: "Base Year",  value: "1995"     },
  { label: "Base Value", value: "1,000"    },
  { label: "Launched",   value: "Apr 1996" },
  { label: "Stocks",     value: "50"       },
]

// ─── Chart SVG ─────────────────────────────────────────────────────────────

function IndexChart({ data, positive }: { data: number[]; positive: boolean }) {
  const W = 900, H = 220, PAD = 8
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((v - min) / range) * (H - PAD * 2),
  }))

  const linePts = pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ")
  const fillPath = [
    `M${pts[0].x.toFixed(2)},${H}`,
    ...pts.map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`),
    `L${pts[pts.length - 1].x.toFixed(2)},${H}`,
    "Z",
  ].join(" ")

  const color = positive ? "#16a34a" : "#FF0000"

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(t => (
        <line
          key={t}
          x1={PAD} y1={PAD + t * (H - PAD * 2)}
          x2={W - PAD} y2={PAD + t * (H - PAD * 2)}
          stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5 5"
        />
      ))}
      <path d={fillPath} fill="url(#cg)" />
      <polyline
        points={linePts}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="4.5" fill={color} />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="9"   fill={color} fillOpacity="0.2" />
    </svg>
  )
}

// ─── Stock avatar ───────────────────────────────────────────────────────────

function TickerBadge({ ticker, index }: { ticker: string; index: number }) {
  const hue = (index * 53) % 360
  return (
    <div
      className="w-7 h-7 rounded-[4px] flex items-center justify-center text-[9px] font-black text-white shrink-0"
      style={{ background: `hsl(${hue}, 52%, 42%)` }}
    >
      {ticker.slice(0, 2)}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Nifty50Page() {
  const [tf, setTf] = useState<TF>("1D")

  const chartReturn   = CHART_RETURNS[tf]
  const chartPositive = chartReturn >= 0

  const w52High = 26277.35
  const w52Low  = 21964.60
  const pct52   = ((PRICE - w52Low) / (w52High - w52Low)) * 100

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/"         className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Markets</span>
            <ChevronRight className="w-3 h-3" />
            <span>Indices</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Nifty 50</span>
          </nav>
        </div>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            {/* Left: name + price */}
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-burgundy/10 text-burgundy px-2 py-0.5 rounded-[4px]">NSE</span>
                <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">INDEX</span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[4px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Live
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">NIFTY 50</h1>

              <div className="flex items-baseline flex-wrap gap-3 mt-2">
                <span className="text-4xl lg:text-5xl font-black text-foreground tracking-tight tabular-nums">
                  {PRICE.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
                <div className={`flex items-center gap-1 font-bold ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                  {isPos
                    ? <ArrowUpRight   className="w-5 h-5" />
                    : <ArrowDownRight className="w-5 h-5" />
                  }
                  <span className="text-lg">{isPos ? "+" : ""}{CHANGE.toFixed(2)}</span>
                  <span className="text-base">({isPos ? "+" : ""}{CHANGE_PCT.toFixed(2)}%)</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-1.5">
                19 Jun 2026 · 15:30 IST · National Stock Exchange · Prices in INR
              </p>
            </div>

            {/* Right: breadth + 52W bar + CTA */}
            <div className="flex flex-col items-start lg:items-end gap-4">

              {/* Breadth pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-[5px]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">24 Advancing</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-[5px]">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">26 Declining</span>
                </div>
              </div>

              {/* 52-week range */}
              <div className="w-full lg:w-[300px]">
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mb-1.5">
                  <span>52W Low ₹21,964</span>
                  <span>52W High ₹26,277</span>
                </div>
                <div className="relative h-2 bg-secondary rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-burgundy/60 to-burgundy"
                    style={{ width: `${pct52}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-burgundy border-2 border-white shadow-md"
                    style={{ left: `calc(${pct52}% - 7px)` }}
                  />
                </div>
                <div className="text-center text-[10px] text-muted-foreground mt-1 font-medium">
                  Current position in 52-week range
                </div>
              </div>

              <Button
                className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-9 px-6 text-sm font-bold"
                asChild
              >
                <Link href="/signup/register">Invest in Nifty 50 →</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Key Stats Bar ────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div
            className="flex overflow-x-auto border border-border rounded-[8px] bg-background divide-x divide-border"
            style={{ scrollbarWidth: "none" }}
          >
            {KEY_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-5 py-3 min-w-[100px] shrink-0">
                <span className="text-[10px] text-muted-foreground font-semibold whitespace-nowrap">{s.label}</span>
                <span className="text-sm font-bold text-foreground mt-0.5 whitespace-nowrap tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main grid: content + sidebar ─────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ── LEFT ── */}
            <div className="space-y-5">

              {/* Price chart */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-foreground">Price Chart</h2>
                    <span className={`text-xs font-bold tabular-nums ${chartPositive ? "text-emerald-600" : "text-red-500"}`}>
                      {chartPositive ? "+" : ""}{chartReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-secondary rounded-[5px] p-0.5">
                    {TIMEFRAMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTf(t)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-[4px] transition-all ${
                          tf === t
                            ? "bg-burgundy text-white"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-2 py-3 h-[250px]">
                  <IndexChart data={CHART_DATA[tf]} positive={chartPositive} />
                </div>
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-border bg-secondary/20">
                  <span className="text-[10px] text-muted-foreground">
                    Open: <strong className="text-foreground">23,991.20</strong>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    High: <strong className="text-foreground">24,047.20</strong>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Low: <strong className="text-foreground">23,901.90</strong>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Close: <strong className="text-foreground">24,013.10</strong>
                  </span>
                </div>
              </div>

              {/* Historical returns */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Historical Returns</h2>
                </div>
                <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  <div className="grid divide-x divide-border" style={{ gridTemplateColumns: "repeat(7, minmax(90px, 1fr))" }}>
                    {RETURNS.map((r) => (
                      <div key={r.p} className="flex flex-col items-center py-5 px-2 gap-2">
                        <span className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">{r.p}</span>
                        <span
                          className={`text-sm font-black rounded-[4px] px-2 py-0.5 tabular-nums ${
                            r.v >= 0
                              ? "text-emerald-700 bg-emerald-50"
                              : "text-red-600 bg-red-50"
                          }`}
                        >
                          {r.v >= 0 ? "+" : ""}{r.v.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top 10 Holdings */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
                  <h2 className="text-sm font-bold text-foreground">Top Holdings</h2>
                  <span className="text-[11px] text-muted-foreground font-medium">Top 10 of 50 stocks · NSE</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-5 py-2.5 w-8">#</th>
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-4 py-2.5">Company</th>
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-4 py-2.5">Sector</th>
                        <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-2.5">Weight</th>
                        <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-2.5">Today</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CONSTITUENTS.map((c, i) => (
                        <tr
                          key={c.ticker}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                          onClick={() => window.location.href = `/stocks/${c.ticker.toLowerCase()}`}
                        >
                          <td className="px-5 py-3 text-xs text-muted-foreground">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <TickerBadge ticker={c.ticker} index={i} />
                              <div>
                                <div className="text-xs font-bold text-foreground leading-tight hover:text-burgundy transition-colors">{c.name}</div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">{c.ticker}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">
                              {c.sector}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-burgundy"
                                  style={{ width: `${(c.weight / 10.32) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-foreground tabular-nums w-10 text-right">
                                {c.weight.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <span
                              className={`text-xs font-bold tabular-nums ${
                                c.chg >= 0 ? "text-emerald-600" : "text-red-500"
                              }`}
                            >
                              {c.chg >= 0 ? "▲" : "▼"} {Math.abs(c.chg).toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sector Weightage */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Sector Weightage</h2>
                </div>

                {/* Stacked bar */}
                <div className="px-5 pt-4 pb-3">
                  <div className="flex rounded-[4px] overflow-hidden h-5 gap-px">
                    {SECTORS.map((s) => (
                      <div
                        key={s.name}
                        style={{ width: `${s.weight}%`, backgroundColor: s.color }}
                        title={`${s.name}: ${s.weight}%`}
                        className="transition-all"
                      />
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5 grid grid-cols-2 gap-x-8 gap-y-3">
                  {SECTORS.map((s) => (
                    <div key={s.name} className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-muted-foreground flex-1 truncate">{s.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-14 h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(s.weight / 28.4) * 100}%`, backgroundColor: s.color }}
                          />
                        </div>
                        <span className="text-xs font-bold text-foreground tabular-nums w-9 text-right">
                          {s.weight}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="border border-border rounded-[8px] bg-background p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-burgundy" />
                  About Nifty 50
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The <strong className="text-foreground">NIFTY 50</strong> is the flagship large-cap index of the National Stock Exchange of India (NSE). It tracks the performance of 50 of the largest, most liquid, and financially sound companies listed across multiple sectors of the Indian economy.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  Launched in April 1996, the index serves as the primary benchmark for Indian equity markets and is widely used for index funds, ETFs, and derivatives trading. It uses a free-float market capitalisation methodology and is reviewed quarterly.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {FACTS.map((f) => (
                    <div key={f.label} className="bg-secondary/40 rounded-[6px] px-3 py-2.5">
                      <div className="text-[10px] font-semibold text-muted-foreground">{f.label}</div>
                      <div className="text-sm font-black text-foreground mt-0.5">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-5">

              {/* Market Breadth */}
              <div className="border border-border rounded-[8px] bg-background p-5">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-burgundy" />
                  Market Breadth
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: i < 24 ? "#16a34a" : "#ef4444",
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-emerald-700 tabular-nums">24</div>
                    <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">Advancing</div>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-red-600 tabular-nums">26</div>
                    <div className="text-[10px] font-semibold text-red-500 mt-0.5">Declining</div>
                  </div>
                  <div className="bg-secondary rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-foreground tabular-nums">0</div>
                    <div className="text-[10px] font-semibold text-muted-foreground mt-0.5">Neutral</div>
                  </div>
                </div>
              </div>

              {/* Technical Signals */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-burgundy" />
                  <h3 className="text-sm font-bold text-foreground">Technical Signals</h3>
                </div>
                <div className="divide-y divide-border/50">
                  {TECHNICALS.map((t) => (
                    <div key={t.label} className="flex items-center justify-between px-5 py-2.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-foreground">{t.label}</span>
                        <span className="text-[11px] text-muted-foreground tabular-nums">{t.value}</span>
                      </div>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-[3px] border ${
                          t.signal === "Buy"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : t.signal === "Sell"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : "bg-secondary text-muted-foreground border-border"
                        }`}
                      >
                        {t.signal}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary pills */}
                <div className="px-5 py-3 border-t border-border bg-secondary/20 flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground">Overall:</span>
                  <span className="text-[11px] font-black bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-[3px]">
                    Bearish
                  </span>
                </div>
              </div>

              {/* Related Indices */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground">Related Indices</h3>
                </div>
                <div className="divide-y divide-border/50">
                  {RELATED.map((r) => (
                    <Link
                      key={r.name}
                      href="#"
                      className="flex items-center justify-between px-5 py-3 hover:bg-secondary/40 transition-colors group"
                    >
                      <span className="text-xs font-semibold text-foreground group-hover:text-burgundy transition-colors">
                        {r.name}
                      </span>
                      <div className={`flex items-center gap-1 text-xs font-bold ${r.chg >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {r.chg >= 0
                          ? <ArrowUpRight className="w-3 h-3" />
                          : <ArrowDownRight className="w-3 h-3" />
                        }
                        {r.chg >= 0 ? "+" : ""}{r.chg.toFixed(2)}%
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-[8px] p-5 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}
              >
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                    Start Today
                  </div>
                  <h4 className="text-base font-black text-white mb-1.5 leading-snug">
                    Trade Nifty F&amp;O with Zero Brokerage
                  </h4>
                  <p className="text-xs text-white/75 mb-4 leading-relaxed">
                    Index funds, ETFs &amp; derivatives — all in one place. Start investing from ₹500.
                  </p>
                  <Button
                    className="bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-8 px-4 text-xs font-black w-full"
                    asChild
                  >
                    <Link href="/signup/register">Open Free Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

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

export const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const
export type TF = typeof TIMEFRAMES[number]

export type Constituent = { name: string; ticker: string; sector: string; weight: number; chg: number }
export type SectorSlice = { name: string; weight: number; color: string }
export type ReturnPoint = { p: string; v: number }
export type Technical = { label: string; value: string; signal: "Buy" | "Sell" | "Neutral" }
export type RelatedIndex = { name: string; chg: number; href: string }
export type Fact = { label: string; value: string }
export type KeyStat = { label: string; value: string }

export type IndexPageData = {
  slug: string
  breadcrumbLabel: string
  displayName: string
  badge: string           // "NSE" | "BSE" | "NYSE" | "NASDAQ" | "LSE" | "TSE" | "HKEX" | "XETRA" | "EURONEXT"
  category: string        // "INDEX" | "GLOBAL INDEX"
  currency: string        // "₹" | "$" | "£" | "¥" | "HK$" | "€"
  locale: string          // "en-IN" | "en-US" | "en-GB" | "ja-JP" | "de-DE"
  asOf: string
  price: number
  change: number
  changePct: number
  advancing: number
  declining: number
  neutral: number
  totalConstituents: number
  w52High: number
  w52Low: number
  keyStats: KeyStat[]
  ohlc: { open: string; high: string; low: string; close: string }
  chartData: Record<TF, number[]>
  chartReturns: Record<TF, number>
  returns: ReturnPoint[]
  constituents: Constituent[]
  sectors: SectorSlice[]
  technicals: Technical[]
  overallSignal: "Bullish" | "Bearish" | "Neutral"
  related: RelatedIndex[]
  facts: Fact[]
  aboutTitle: string
  aboutParagraphs: string[]
  ctaHeadline: string
  ctaBody: string
}

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

export function IndexDetailPage({ data }: { data: IndexPageData }) {
  const [tf, setTf] = useState<TF>("1D")
  const d = data

  const isPos          = d.change >= 0
  const chartReturn     = d.chartReturns[tf]
  const chartPositive   = chartReturn >= 0
  const pct52           = ((d.price - d.w52Low) / (d.w52High - d.w52Low)) * 100
  const maxWeight        = Math.max(...d.constituents.map(c => c.weight))
  const maxSectorWeight  = Math.max(...d.sectors.map(s => s.weight))
  const fmt = (v: number) => v.toLocaleString(d.locale, { minimumFractionDigits: 2 })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/"         className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Markets</span>
            <ChevronRight className="w-3 h-3" />
            <span>Indices</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{d.breadcrumbLabel}</span>
          </nav>
        </div>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

            {/* Left: name + price */}
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2.5">
                <span className="text-[11px] font-bold bg-burgundy/10 text-burgundy px-2 py-0.5 rounded-[4px]">{d.badge}</span>
                <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">{d.category}</span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[4px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Live
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">{d.displayName}</h1>

              <div className="flex items-baseline flex-wrap gap-2 mt-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight tabular-nums">
                  {d.currency}{fmt(d.price)}
                </span>
                <div className={`flex items-center gap-1 font-bold text-base ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                  {isPos
                    ? <ArrowUpRight   className="w-4 h-4" />
                    : <ArrowDownRight className="w-4 h-4" />
                  }
                  <span>{isPos ? "+" : ""}{d.change.toFixed(2)}</span>
                  <span className="text-sm">({isPos ? "+" : ""}{d.changePct.toFixed(2)}%)</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-1.5">
                {d.asOf} · {d.badge} · Prices in {d.currency === "₹" ? "INR" : d.currency === "$" ? "USD" : d.currency === "£" ? "GBP" : d.currency === "¥" ? "JPY" : d.currency === "HK$" ? "HKD" : "EUR"}
              </p>
            </div>

            {/* Right: breadth + 52W bar + CTA */}
            <div className="flex flex-col items-start lg:items-end gap-3">

              {/* Breadth pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-[5px]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{d.advancing} Advancing</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-[5px]">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{d.declining} Declining</span>
                </div>
              </div>

              {/* 52-week range */}
              <div className="w-full lg:w-[300px]">
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mb-1.5">
                  <span>52W Low {d.currency}{d.w52Low.toLocaleString(d.locale)}</span>
                  <span>52W High {d.currency}{d.w52High.toLocaleString(d.locale)}</span>
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
                <Link href="/signup/register">Invest in {d.displayName} →</Link>
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
            {d.keyStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4 py-3 min-w-[90px] shrink-0">
                <span className="text-[10px] text-muted-foreground font-semibold whitespace-nowrap">{s.label}</span>
                <span className="text-sm font-bold text-foreground mt-0.5 whitespace-nowrap tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile breadth strip (hidden on lg) ─────────────────────── */}
        <div className="lg:hidden max-w-[1400px] mx-auto px-4 sm:px-6 mt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50 border border-emerald-100 rounded-[6px] p-2.5 text-center">
              <div className="text-lg font-black text-emerald-700 tabular-nums">{d.advancing}</div>
              <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">Advancing</div>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-[6px] p-2.5 text-center">
              <div className="text-lg font-black text-red-600 tabular-nums">{d.declining}</div>
              <div className="text-[10px] font-semibold text-red-500 mt-0.5">Declining</div>
            </div>
            <div className="bg-secondary rounded-[6px] p-2.5 text-center">
              <div className="text-lg font-black text-foreground tabular-nums">{d.neutral}</div>
              <div className="text-[10px] font-semibold text-muted-foreground mt-0.5">Neutral</div>
            </div>
          </div>
        </div>

        {/* ── Main grid: content + sidebar ─────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-5 items-start">

            {/* ── LEFT ── */}
            <div className="space-y-4 lg:order-1 w-full min-w-0">

              {/* Price chart */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-foreground">Price Chart</h2>
                    <span className={`text-xs font-bold tabular-nums ${chartPositive ? "text-emerald-600" : "text-red-500"}`}>
                      {chartPositive ? "+" : ""}{chartReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="flex items-center gap-0.5 bg-secondary rounded-[5px] p-0.5 w-fit">
                      {TIMEFRAMES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTf(t)}
                          className={`px-2.5 sm:px-3 py-1 text-[11px] font-bold rounded-[4px] transition-all whitespace-nowrap ${
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
                </div>

                <div className="px-2 py-3 h-[220px] sm:h-[250px]">
                  <IndexChart data={d.chartData[tf]} positive={chartPositive} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border-t border-border bg-secondary/20">
                  {[
                    { label: "Open",  val: d.ohlc.open },
                    { label: "High",  val: d.ohlc.high },
                    { label: "Low",   val: d.ohlc.low },
                    { label: "Close", val: d.ohlc.close },
                  ].map((item, i) => (
                    <div key={item.label} className={`px-3 sm:px-5 py-2 ${i === 1 ? "border-t sm:border-t-0 border-border" : ""} ${i === 3 ? "border-t sm:border-t-0 border-border" : ""}`}>
                      <span className="text-[10px] text-muted-foreground block">{item.label}</span>
                      <strong className="text-[11px] text-foreground tabular-nums">{item.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical returns */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Historical Returns</h2>
                </div>
                <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  <div className="grid divide-x divide-border" style={{ gridTemplateColumns: "repeat(7, minmax(72px, 1fr))", minWidth: "504px" }}>
                    {d.returns.map((r) => (
                      <div key={r.p} className="flex flex-col items-center py-4 px-2 gap-1.5">
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
                <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between">
                  <h2 className="text-sm font-bold text-foreground">Top Holdings</h2>
                  <span className="text-[11px] text-muted-foreground font-medium">Top {d.constituents.length} of {d.totalConstituents} · {d.badge}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px]">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-3 sm:px-5 py-2.5 w-8">#</th>
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-3 sm:px-4 py-2.5">Company</th>
                        <th className="text-left text-[11px] font-bold text-muted-foreground px-3 sm:px-4 py-2.5 hidden sm:table-cell">Sector</th>
                        <th className="text-right text-[11px] font-bold text-muted-foreground px-3 sm:px-5 py-2.5">Weight</th>
                        <th className="text-right text-[11px] font-bold text-muted-foreground px-3 sm:px-5 py-2.5">Today</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.constituents.map((c, i) => (
                        <tr
                          key={c.ticker}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                          onClick={() => window.location.href = `/stocks`}
                        >
                          <td className="px-3 sm:px-5 py-2.5 text-xs text-muted-foreground">{i + 1}</td>
                          <td className="px-3 sm:px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <TickerBadge ticker={c.ticker} index={i} />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-foreground leading-tight truncate max-w-[120px] sm:max-w-none">{c.name}</div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">{c.ticker}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-2.5 hidden sm:table-cell">
                            <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">
                              {c.sector}
                            </span>
                          </td>
                          <td className="px-3 sm:px-5 py-2.5">
                            <div className="flex items-center justify-end gap-1.5">
                              <div className="w-10 sm:w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className="h-full rounded-full bg-burgundy"
                                  style={{ width: `${(c.weight / maxWeight) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-foreground tabular-nums w-10 text-right">
                                {c.weight.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-5 py-2.5 text-right">
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
                <div className="px-4 sm:px-5 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Sector Weightage</h2>
                </div>

                <div className="px-4 sm:px-5 pt-4 pb-3">
                  <div className="flex rounded-[4px] overflow-hidden h-5 gap-px">
                    {d.sectors.map((s) => (
                      <div
                        key={s.name}
                        style={{ width: `${s.weight}%`, backgroundColor: s.color }}
                        title={`${s.name}: ${s.weight}%`}
                        className="transition-all"
                      />
                    ))}
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {d.sectors.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-muted-foreground flex-1 truncate">{s.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-12 sm:w-14 h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(s.weight / maxSectorWeight) * 100}%`, backgroundColor: s.color }}
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
              <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8B0D19]" />
                  {d.aboutTitle}
                </h2>
                {d.aboutParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-sm text-muted-foreground leading-relaxed [&_strong]:text-foreground ${i > 0 ? "mt-3" : ""}`}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {d.facts.map((f) => (
                    <div key={f.label} className="bg-secondary/40 rounded-[6px] px-3 py-2.5">
                      <div className="text-[10px] font-semibold text-muted-foreground">{f.label}</div>
                      <div className="text-sm font-black text-foreground mt-0.5">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-4 lg:order-2 w-full min-w-0">

              {/* Market Breadth */}
              <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#8B0D19]" />
                  Market Breadth
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Array.from({ length: d.advancing + d.declining }, (_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: i < d.advancing ? "#16a34a" : "#ef4444",
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-emerald-700 tabular-nums">{d.advancing}</div>
                    <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">Advancing</div>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-red-600 tabular-nums">{d.declining}</div>
                    <div className="text-[10px] font-semibold text-red-500 mt-0.5">Declining</div>
                  </div>
                  <div className="bg-secondary rounded-[6px] p-2.5 text-center">
                    <div className="text-xl font-black text-foreground tabular-nums">{d.neutral}</div>
                    <div className="text-[10px] font-semibold text-muted-foreground mt-0.5">Neutral</div>
                  </div>
                </div>
              </div>

              {/* Technical Signals */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#8B0D19]" />
                  <h3 className="text-sm font-bold text-foreground">Technical Signals</h3>
                </div>
                <div className="divide-y divide-border/50">
                  {d.technicals.map((t) => (
                    <div key={t.label} className="flex items-center justify-between px-4 sm:px-5 py-2.5">
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
                <div className="px-4 sm:px-5 py-3 border-t border-border bg-secondary/20 flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground">Overall:</span>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-[3px] border ${
                    d.overallSignal === "Bullish"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : d.overallSignal === "Bearish"
                      ? "bg-red-50 text-red-600 border-red-100"
                      : "bg-secondary text-muted-foreground border-border"
                  }`}>
                    {d.overallSignal}
                  </span>
                </div>
              </div>

              {/* Related Indices */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground">Related Indices</h3>
                </div>
                <div className="divide-y divide-border/50">
                  {d.related.map((r) => (
                    <Link
                      key={r.name}
                      href={r.href}
                      className="flex items-center justify-between px-4 sm:px-5 py-3 hover:bg-secondary/40 transition-colors group"
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
                    {d.ctaHeadline}
                  </h4>
                  <p className="text-xs text-white/75 mb-4 leading-relaxed">
                    {d.ctaBody}
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

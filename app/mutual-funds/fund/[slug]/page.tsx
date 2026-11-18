"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronRight, ArrowUpRight, ArrowDownRight, Star, Zap, Target, UserCheck,
  Calendar, Fingerprint, Lock, BarChart3, Percent, Wallet, Coins, Activity, Gauge,
} from "lucide-react"
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useFundDetail } from "@/hooks/use-mutual-funds"
import { FundReturnCalculator } from "@/components/fund-return-calculator"
import { DetailPageSkeleton } from "@/components/skeletons"
import type { ChartPeriod, FundDetailApi, FundReturns } from "@/lib/mutual-funds/api-client"

// ─── Formatting ──────────────────────────────────────────────────────────────

const NO_VALUE = "—"

const rupees = (v: number | null | undefined, digits = 2) =>
  v === null || v === undefined
    ? NO_VALUE
    : `₹${v.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

const wholeRupees = (v: number | null | undefined) =>
  v === null || v === undefined ? NO_VALUE : `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`

const signedPct = (v: number | null | undefined) =>
  v === null || v === undefined ? NO_VALUE : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`

const toDate = (iso: string) => new Date(`${iso}T00:00:00`)

/** "22-Aug-2008" (document format for the launch date) */
const ddMmmYyyy = (iso: string | null) => {
  if (!iso) return NO_VALUE
  const d = toDate(iso)
  const month = d.toLocaleDateString("en-IN", { month: "short" })
  return `${String(d.getDate()).padStart(2, "0")}-${month}-${d.getFullYear()}`
}

const longDate = (iso: string | null) =>
  iso ? toDate(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : NO_VALUE

const twoDp = (v: number | null) => (v === null ? NO_VALUE : v.toFixed(2))

const classLabel = (v: string | null) => v?.replace(/\s*Schemes$/i, "") ?? null

function riskClass(risk: string | null) {
  if (risk === "Very High") return "bg-red-50 text-red-600 border-red-100"
  if (risk === "High" || risk === "Moderately High") return "bg-orange-50 text-orange-600 border-orange-100"
  if (risk === "Moderate") return "bg-gold/15 text-gold-deep border-gold/25"
  return "bg-emerald-50 text-emerald-700 border-emerald-100"
}

const RETURN_COLS: { key: keyof FundReturns; label: string }[] = [
  { key: "oneWeek",        label: "1 Week" },
  { key: "oneMonth",       label: "1 Month" },
  { key: "threeMonth",     label: "3 Months" },
  { key: "sixMonth",       label: "6 Months" },
  { key: "oneYear",        label: "1 Year" },
  { key: "threeYear",      label: "3 Years" },
  { key: "fiveYear",       label: "5 Years" },
  { key: "tenYear",        label: "10 Years" },
  { key: "sinceInception", label: "Since Inception" },
]

/** Days covered by each chart range, counted back from the latest NAV. */
const PERIOD_DAYS: Record<ChartPeriod, number> = { "1M": 31, "6M": 183, "1Y": 366 }

// ─── Shared bits ─────────────────────────────────────────────────────────────

const card = "border border-border rounded-[10px] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]"

function Notice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="py-10 px-4 text-center">
      <p className="text-sm font-black text-foreground">{title}</p>
      {children && <div className="text-xs text-muted-foreground mt-1.5">{children}</div>}
    </div>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 pt-24">{children}</div>
      <Footer />
    </main>
  )
}

function AmcLogo({ name, logoUrl }: { name: string; logoUrl: string | null }) {
  const [failed, setFailed] = useState(false)
  if (logoUrl && !failed) {
    return (
      <div className="w-12 h-12 rounded-[10px] bg-white border border-border/60 flex items-center justify-center overflow-hidden shrink-0">
        <img src={logoUrl} alt="" onError={() => setFailed(true)} className="w-full h-full object-contain p-1" />
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-[10px] bg-burgundy/10 text-burgundy border border-burgundy/15 flex items-center justify-center text-sm font-black shrink-0">
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MutualFundDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  // Remount per fund so nothing from the previous fund is shown.
  return <FundLoader key={slug} slug={slug} />
}

function FundLoader({ slug }: { slug: string }) {
  const { data, error, retry } = useFundDetail(slug || null)

  if (data) return <FundDetail fund={data} />

  if (error?.status === 404) {
    return (
      <PageShell>
        <p className="text-2xl font-black text-foreground">Fund not found</p>
        <Link href="/mutual-funds" className="text-burgundy font-semibold hover:underline">← Back to mutual funds</Link>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <Notice title="Unable to load this fund">
          <p>{error.message}</p>
          <button onClick={retry} className="mt-3 text-xs font-bold text-burgundy hover:underline">Try again</button>
        </Notice>
      </PageShell>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <DetailPageSkeleton label="Loading fund" />
    </main>
  )
}

function FundDetail({ fund }: { fund: FundDetailApi }) {
  const o = fund.overview
  const weekUp = (fund.oneWeekReturn ?? fund.oneWeekChange ?? 0) >= 0

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO: identity · risk & asset class · NAV ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-6 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4 min-w-0">
            <Link href="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/mutual-funds" className="hover:text-foreground transition-colors shrink-0">Mutual Funds</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-foreground font-semibold truncate">{fund.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Left: AMC logo, name, category, rating */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <AmcLogo name={fund.amcName ?? fund.name} logoUrl={fund.amcLogoUrl} />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight">{fund.name}</h1>
                  {fund.amcName && <p className="text-xs text-muted-foreground font-semibold mt-1">{fund.amcName}</p>}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    {fund.category && (
                      <span className="text-[10px] font-black px-2 py-0.5 bg-burgundy/10 text-burgundy rounded-[4px]">{fund.category}</span>
                    )}
                    {fund.assetClass && (
                      <span className="text-[10px] font-black px-2 py-0.5 bg-secondary text-muted-foreground rounded-[4px]">{classLabel(fund.assetClass)}</span>
                    )}
                    {fund.risk && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-[4px] border ${riskClass(fund.risk)}`}>{fund.risk} Risk</span>
                    )}
                    {fund.rating > 0 && (
                      <span className="flex items-center gap-0.5" title={`${fund.rating} star rating`}>
                        {Array.from({ length: 5 }, (_, s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s < fund.rating ? "fill-gold-deep text-gold-deep" : "text-border"}`} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: NAV, NAV date, 1-week change */}
            <div className="lg:text-right shrink-0">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">Latest NAV</div>
              <div className="flex flex-wrap items-baseline lg:justify-end gap-x-3 gap-y-1">
                <span className="text-3xl sm:text-4xl font-black text-foreground tabular-nums tracking-tight">{rupees(fund.nav, 4)}</span>
                {(fund.oneWeekChange !== null || fund.oneWeekReturn !== null) && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] font-black text-sm ${weekUp ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
                    {weekUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {fund.oneWeekChange !== null && <span>{fund.oneWeekChange >= 0 ? "+" : ""}{fund.oneWeekChange.toFixed(2)}</span>}
                    {fund.oneWeekReturn !== null && <span>({signedPct(fund.oneWeekReturn)})</span>}
                    <span className="text-[10px] font-extrabold opacity-70 ml-0.5">1W</span>
                  </span>
                )}
              </div>
              <div className="text-[11px] text-muted-foreground font-semibold mt-1.5">NAV as of {longDate(fund.navDate)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="py-6 lg:py-8 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5 min-w-0">
              <NavChart fund={fund} />

              {/* Hidden when Reedos has no calculator data for this fund */}
              {fund.calculator && <FundReturnCalculator slug={fund.slug} settings={fund.calculator} card={card} />}

              {/* Returns */}
              <div className={card}>
                <div className="px-5 py-4 border-b border-border/60">
                  <p className="text-sm font-black text-foreground">Historical Returns</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Returns over 1 year are annualised</p>
                </div>
                <ReturnsChart returns={fund.returns} />
                <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
                  <table className="w-full border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-secondary/40 border-b border-border/60">
                        {RETURN_COLS.map((c) => (
                          <th key={c.key} className="px-3 py-3 text-center text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{c.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {RETURN_COLS.map((c) => {
                          const v = fund.returns[c.key]
                          return (
                            <td key={c.key} className={`px-3 py-4 text-center text-sm font-black tabular-nums ${v === null ? "text-muted-foreground" : v >= 0 ? "text-profit" : "text-loss"}`}>
                              {signedPct(v)}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fund overview */}
              <div className={card}>
                <div className="px-5 py-4 border-b border-border/60">
                  <p className="text-sm font-black text-foreground">Fund Overview</p>
                </div>
                <div className="p-5">
                  {o.investmentObjective && (
                    <div className="bg-cream/60 border border-border/60 rounded-[8px] p-4 mb-5">
                      <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
                        <Target className="w-3.5 h-3.5 text-burgundy" /> Investment Objective
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">{o.investmentObjective}</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-x-8">
                    <InfoList rows={[
                      { icon: UserCheck,   label: "Fund Manager(s)",         value: o.fundManagers.length ? o.fundManagers.join(", ") : NO_VALUE },
                      { icon: Calendar,    label: "Inception / Launch Date", value: ddMmmYyyy(o.launchDate) },
                      { icon: Fingerprint, label: "ISIN Code",               value: o.isin ?? NO_VALUE, mono: true },
                      { icon: Lock,        label: "Lock-In Period",          value: o.lockIn ?? "No lock-in" },
                      { icon: BarChart3,   label: "Benchmark Index",         value: o.benchmark ?? "Not available" },
                      { icon: Percent,     label: "Expense Ratio",           value: o.expenseRatio === null ? NO_VALUE : `${o.expenseRatio.toFixed(2)}%` },
                    ]} />
                    <InfoList rows={[
                      { icon: Wallet,   label: "Minimum SIP",      value: wholeRupees(o.minSip) },
                      { icon: Coins,    label: "Minimum Lumpsum",  value: wholeRupees(o.minLumpsum) },
                      { icon: Activity, label: "Sharpe Ratio",     value: twoDp(o.sharpeRatio) },
                      { icon: Gauge,    label: "Volatility Beta",  value: twoDp(o.beta) },
                    ]} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className={card}>
                <div className="px-4 py-3 border-b border-border/60">
                  <p className="text-xs font-black text-foreground">Key Statistics</p>
                </div>
                <div className="divide-y divide-border/40">
                  {[
                    { label: "AUM",             value: o.aumCr === null ? NO_VALUE : `${rupees(o.aumCr)} Cr` },
                    { label: "NAV",             value: rupees(fund.nav, 4) },
                    { label: "Expense Ratio",   value: o.expenseRatio === null ? NO_VALUE : `${o.expenseRatio.toFixed(2)}%` },
                    { label: "Minimum SIP",     value: wholeRupees(o.minSip) },
                    { label: "Minimum Lumpsum", value: wholeRupees(o.minLumpsum) },
                    { label: "Launch Date",     value: ddMmmYyyy(o.launchDate) },
                    { label: "Risk",            value: fund.risk ?? NO_VALUE },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="text-[11px] text-muted-foreground font-semibold">{s.label}</span>
                      <span className="text-[11px] font-black text-foreground tabular-nums text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open account CTA (same as the stock page) */}
              <div className="rounded-[10px] overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, #8B0D19 0%, #6B0A13 60%, #4A0709 100%)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #D9B27C 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-[7px] bg-white/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="text-[9px] font-extrabold text-gold/80 uppercase tracking-wider">Start Investing</div>
                      <div className="text-sm font-black text-white leading-tight">Open Your Account</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed mb-4">
                    Invest in mutual funds through a simple, secure and paperless process with Shree Varahi.
                  </p>
                  <Link href="/signup/register"
                    className="w-full py-3 rounded-[7px] bg-gold text-[#4A0709] font-black text-sm text-center block hover:bg-gold/90 transition-colors">
                    Open Free Account →
                  </Link>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground leading-relaxed px-1">
                Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Past performance is not an indicator of future returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ─── Fund overview rows ──────────────────────────────────────────────────────

type InfoRow = { icon: React.ElementType; label: string; value: string; mono?: boolean }

function InfoList({ rows }: { rows: InfoRow[] }) {
  return (
    <div className="divide-y divide-border/40">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[150px_1fr] sm:grid-cols-[180px_1fr] gap-3 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground self-start">
            <r.icon className="w-3.5 h-3.5 shrink-0 text-burgundy/70" /> {r.label}
          </div>
          <div className={`text-xs font-bold text-foreground leading-relaxed break-words ${r.mono ? "font-mono tracking-wide" : ""}`}>{r.value}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Historical returns chart (same numbers as the table below it) ───────────

const UP = "#059669"   // --profit
const DOWN = "#DC2626" // --loss

function ReturnsChart({ returns }: { returns: FundReturns }) {
  const data = RETURN_COLS
    .map((c) => ({ label: c.label.replace("Since Inception", "Since Launch"), value: returns[c.key] }))
    .filter((d): d is { label: string; value: number } => d.value !== null)
  if (data.length < 2) return null

  return (
    <div className="h-[220px] sm:h-[240px] px-2 pt-4 pb-1" role="img"
      aria-label={`Returns by period: ${data.map((d) => `${d.label} ${signedPct(d.value)}`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#6b7280" }} tickLine={false} axisLine={false} interval={0} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={44}
            tickFormatter={(v: number) => `${v}%`} />
          <ReferenceLine y={0} stroke="#9ca3af" />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            content={({ active, payload }) => {
              const p = active && (payload?.[0]?.payload as { label: string; value: number } | undefined)
              if (!p) return null
              return (
                <div className="bg-white border border-border rounded-[6px] shadow-md px-3 py-2">
                  <div className="text-[10px] text-muted-foreground font-semibold">{p.label}</div>
                  <div className={`text-xs font-black tabular-nums ${p.value >= 0 ? "text-profit" : "text-loss"}`}>{signedPct(p.value)}</div>
                </div>
              )
            }}
          />
          <Bar dataKey="value" maxBarSize={36} radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((d) => <Cell key={d.label} fill={d.value >= 0 ? UP : DOWN} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── NAV chart (1M / 6M / 1Y from GetFundOverview's one year of daily NAVs) ──

function NavChart({ fund }: { fund: FundDetailApi }) {
  const periods = fund.chart.periods.length ? fund.chart.periods : (["1Y"] as ChartPeriod[])
  const [period, setPeriod] = useState<ChartPeriod>(periods.includes("1Y") ? "1Y" : periods[periods.length - 1])
  const history = fund.chart.history

  const points = useMemo(() => {
    if (history.length === 0) return []
    const last = toDate(history[history.length - 1].date).getTime()
    const from = last - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000
    return history.filter((p) => toDate(p.date).getTime() >= from)
  }, [history, period])

  const first = points[0]?.nav ?? null
  const latest = points[points.length - 1]?.nav ?? null
  const change = first !== null && latest !== null && first !== 0 ? ((latest - first) / first) * 100 : null
  const up = (change ?? 0) >= 0
  const color = up ? "#16a34a" : "#dc2626"
  const navs = points.map((p) => p.nav)
  const high = navs.length ? Math.max(...navs) : null
  const low = navs.length ? Math.min(...navs) : null

  const tickDate = (iso: string) =>
    toDate(iso).toLocaleDateString("en-IN", period === "1M" ? { day: "2-digit", month: "short" } : { month: "short", year: "2-digit" })

  return (
    <div className={card}>
      <div className="px-5 py-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-foreground">NAV Performance</p>
          {change !== null && (
            <p className={`text-[11px] font-bold mt-0.5 ${up ? "text-profit" : "text-loss"}`}>
              {signedPct(change)} <span className="text-muted-foreground font-semibold">in {period}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 bg-secondary/60 rounded-[7px] p-1">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`relative px-3.5 py-1.5 rounded-[5px] text-[11px] font-black transition-colors ${period === p ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {period === p && <motion.span layoutId="navPeriod" className="absolute inset-0 rounded-[5px] bg-burgundy" />}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {points.length < 2 ? (
        <Notice title="NAV history is not available for this fund" />
      ) : (
        <div className="h-[260px] sm:h-[300px] px-2 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="navFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.18} />
                  <stop offset="90%" stopColor={color} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 4" />
              <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} minTickGap={40} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={56}
                tickFormatter={(v: number) => v.toLocaleString("en-IN", { maximumFractionDigits: 2 })} />
              <Tooltip
                cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  const p = active && payload?.[0]?.payload as { date: string; nav: number } | undefined
                  if (!p) return null
                  return (
                    <div className="bg-white border border-border rounded-[6px] shadow-md px-3 py-2">
                      <div className="text-[10px] text-muted-foreground font-semibold">{longDate(p.date)}</div>
                      <div className="text-xs font-black text-foreground tabular-nums">NAV {rupees(p.nav, 4)}</div>
                    </div>
                  )
                }}
              />
              <Area type="monotone" dataKey="nav" stroke={color} strokeWidth={1.8} fill="url(#navFill)" dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border/60 divide-x divide-border/60 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border/60 sm:[&>*:nth-child(n+3)]:border-t-0">
        {[
          { label: `NAV ${period} Ago`, value: rupees(first, 4) },
          { label: "Period High",       value: rupees(high, 4) },
          { label: "Period Low",        value: rupees(low, 4) },
          { label: "Latest NAV",        value: rupees(latest, 4) },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5 text-center">
            <div className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-0.5">{s.label}</div>
            <div className="text-xs font-extrabold text-foreground tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

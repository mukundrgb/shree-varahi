"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, ArrowUpRight, ArrowDownRight, Info, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StockAvatar } from "@/components/stock-avatar"
import { EtfPriceChart } from "@/components/etf-price-chart"
import { EtfHoldingsTable } from "@/components/etf-holdings-table"
import { DetailPageSkeleton } from "@/components/skeletons"
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEtfChart, useEtfDetail, useEtfHoldings } from "@/hooks/etf/use-etf"
import type { ChartRange, EtfDetail, EtfSummary, Riskometer } from "@/lib/etf/types"
import { NO_VALUE, formatDate, formatPercent, formatPrice, formatRupees, formatQuoteTime } from "@/lib/stocks/format"

// ─── Formatting ─────────────────────────────────────────────────────────────

function formatCount(value: number | null | undefined): string {
  return value === null || value === undefined ? NO_VALUE : value.toLocaleString("en-IN")
}

function formatPlainPct(value: number | null | undefined): string {
  return value === null || value === undefined ? NO_VALUE : `${value.toFixed(2)}%`
}

function formatAum(value: number | null | undefined): string {
  return value === null || value === undefined ? NO_VALUE : `₹${value.toLocaleString("en-IN")} Cr`
}

function formatRatio(value: number | null | undefined): string {
  return value === null || value === undefined ? NO_VALUE : value.toFixed(2)
}

const changeColor = (value: number | null | undefined) =>
  value === null || value === undefined ? "text-muted-foreground" : value >= 0 ? "text-profit" : "text-loss"

const RISK_STYLE: Record<Riskometer | string, string> = {
  "Low": "bg-profit/10 text-profit",
  "Low to Moderate": "bg-profit/10 text-profit",
  "Moderate": "bg-gold/15 text-gold-deep",
  "Moderately High": "bg-gold/15 text-gold-deep",
  "High": "bg-loss/10 text-loss",
  "Very High": "bg-loss/10 text-loss",
}

// ─── Definitions shown in the info tooltips ─────────────────────────────────

const HELP = {
  range52: "52 week low and high are the lowest and highest prices at which the ETF has traded in the last 52 weeks.",
  open: "Open price is the price at which the ETF started trading today when the exchange opened.",
  high: "High price is the highest price at which the ETF has traded today.",
  low: "Low price is the lowest price at which the ETF has traded today.",
  prevClose: "Previous price is the price at which the ETF closed in the previous trading session.",
  volume: "Volume is the total number of units of the ETF traded, both bought and sold, on the exchange today.",
  expenseRatio: "The annual fee charged by the fund house to manage the ETF, as a percentage of its average AUM. Lower is better.",
  aum: "Assets Under Management (AUM) is the total market value of the investments the ETF holds.",
  riskometer: "SEBI's riskometer shows the level of risk of the ETF's underlying investments, from Low to Very High.",
  pe: "Price-to-earnings ratio of the ETF's underlying holdings.",
  pb: "Price-to-book ratio of the ETF's underlying holdings.",
  stockCount: "The number of stocks the ETF holds.",
}

// ─── Building blocks ────────────────────────────────────────────────────────

function InfoTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex group/tip">
      <button type="button" aria-label={text} className="text-muted-foreground/50 hover:text-muted-foreground focus:text-muted-foreground outline-none">
        <Info className="w-3 h-3" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-[6px] bg-foreground text-white text-[11px] font-medium leading-snug px-3 py-2 shadow-lg opacity-0 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 transition-opacity z-20"
      >
        {text}
      </span>
    </span>
  )
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="border border-border rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-black text-foreground">{title}</h2>
        {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </section>
  )
}

function Stat({ label, value, help }: { label: string; value: ReactNode; help?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground font-semibold">
        {label}
        {help && <InfoTip text={help} />}
      </span>
      <span className="text-[13px] font-black text-foreground tabular-nums text-right">{value}</span>
    </div>
  )
}

/** Two columns of label/value rows, split evenly. */
function StatGrid({ rows }: { rows: { label: string; value: ReactNode; help?: string }[] }) {
  const half = Math.ceil(rows.length / 2)
  return (
    <div className="grid sm:grid-cols-2 gap-x-10">
      {[rows.slice(0, half), rows.slice(half)].map((col, i) => (
        <div key={i} className="divide-y divide-border/40 border-b border-border/40 sm:border-b-0 last:border-b-0">
          {col.map((row) => <Stat key={row.label} {...row} />)}
        </div>
      ))}
    </div>
  )
}

/** Low–high bar with a marker at the current price. */
function RangeBar({ low, high, current }: { low: number | null; high: number | null; current: number | null }) {
  const pct = low !== null && high !== null && current !== null && high > low
    ? Math.min(100, Math.max(0, ((current - low) / (high - low)) * 100))
    : null

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold">52 week low<InfoTip text={HELP.range52} /></div>
          <div className="text-[13px] font-black text-foreground tabular-nums">{formatPrice(low)}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-muted-foreground font-semibold">52 week high</div>
          <div className="text-[13px] font-black text-foreground tabular-nums">{formatPrice(high)}</div>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-gradient-to-r from-loss via-gold to-profit relative">
        {pct !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-sm"
            style={{ left: `calc(${pct}% - 6px)` }}
          />
        )}
      </div>
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

// ─── Holdings card (equity ETFs only) ───────────────────────────────────────

/** Rows shown on the detail page; the rest are on the Equity ETF Holdings page. */
const HOLDINGS_PREVIEW = 10

function HoldingsCard({ slug }: { slug: string }) {
  const result = useEtfHoldings(slug)
  const data = result.data?.slug === slug ? result.data : null
  const holdings = data?.holdings ?? []

  return (
    <Card
      title="Holdings"
      subtitle={data?.portfolioDate ? `Stocks this ETF holds, largest first · as of ${formatDate(data.portfolioDate)}` : "Stocks this ETF holds, largest first"}
    >
      <div className="-mx-5 border-t border-border/60">
        <EtfHoldingsTable
          holdings={holdings.slice(0, HOLDINGS_PREVIEW)}
          loading={!data && !result.error}
          status={result.error
            ? <>Unable to load holdings. <button onClick={result.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
            : undefined}
        />
      </div>
      {holdings.length > HOLDINGS_PREVIEW && (
        <div className="pt-4 -mb-1 border-t border-border/60 -mx-5 px-5">
          <Link href={`/etf/holdings?etf=${slug}`} className="text-[12px] font-bold text-burgundy hover:text-burgundy-deep inline-flex items-center gap-1 transition-colors">
            View all {holdings.length} holdings <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </Card>
  )
}

// ─── Category returns chart: this ETF vs its category average, per period ─────
// Colours checked with the dataviz palette validator (distinct for colour-blind readers);
// the table under the chart keeps every number.

const FUND_COLOR = "#A51C2A"
const AVG_COLOR  = "#B8924A"

function CategoryReturnsChart({ rows }: { rows: EtfDetail["categoryReturns"] }) {
  const data = rows
    .filter((r) => r.fund !== null || r.categoryAvg !== null)
    .map((r) => ({ period: r.period, fund: r.fund, avg: r.categoryAvg }))
  if (data.length === 0) return null

  return (
    <div className="mb-4">
      <div className="flex items-center gap-4 mb-2 text-[11px] font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: FUND_COLOR }} aria-hidden /> This ETF</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: AVG_COLOR }} aria-hidden /> Category average</span>
      </div>
      <div className="h-[220px]" role="img"
        aria-label={`Returns by period: ${data.map((d) => `${d.period} this ETF ${formatPercent(d.fund)}, category ${formatPercent(d.avg)}`).join("; ")}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={3}>
            <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 4" />
            <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#6b7280", fontWeight: 600 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={44} tickFormatter={(v: number) => `${v}%`} />
            <ReferenceLine y={0} stroke="#9ca3af" />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={({ active, payload }) => {
                const d = active && (payload?.[0]?.payload as (typeof data)[number] | undefined)
                if (!d) return null
                return (
                  <div className="bg-white border border-border rounded-[6px] shadow-md px-3 py-2 space-y-0.5">
                    <div className="text-[10px] text-muted-foreground font-semibold">{d.period}</div>
                    <div className="text-xs font-bold text-foreground tabular-nums">This ETF: <span className={changeColor(d.fund)}>{formatPercent(d.fund)}</span></div>
                    <div className="text-xs font-bold text-foreground tabular-nums">Category: <span className={changeColor(d.avg)}>{formatPercent(d.avg)}</span></div>
                  </div>
                )
              }}
            />
            <Bar dataKey="fund" name="This ETF" fill={FUND_COLOR} barSize={26} radius={[4, 4, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="avg" name="Category average" fill={AVG_COLOR} barSize={26} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function EtfDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const { data: etf, error, retry } = useEtfDetail(slug)

  if (error?.status === 404) {
    return (
      <PageShell>
        <p className="text-2xl font-black text-foreground">ETF not found</p>
        <Link href="/etf" className="text-burgundy font-semibold hover:underline">← Back to ETFs</Link>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <p className="text-lg font-black text-foreground">Unable to load this ETF</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button onClick={retry} className="text-burgundy font-semibold hover:underline">Try again</button>
      </PageShell>
    )
  }

  if (!etf) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <DetailPageSkeleton label="Loading ETF" />
      </main>
    )
  }

  return <EtfDetailView etf={etf} />
}

function EtfDetailView({ etf }: { etf: EtfDetail }) {
  const [chartRange, setChartRange] = useState<ChartRange>("1D")
  const chart = useEtfChart(etf.slug, chartRange)
  const chartPoints = chart.data?.range === chartRange ? chart.data.points : []
  const p = etf.performance
  const f = etf.fundamentals
  const isUp = (etf.changePct ?? 0) >= 0

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO: name, price and change ── */}
      <section className="bg-cream border-b border-border/40 pt-24 pb-6 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/etf" className="hover:text-foreground transition-colors">ETFs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold truncate">{etf.name}</span>
          </nav>

          <div className="flex items-start gap-3 mb-3">
            <StockAvatar symbol={etf.symbol} name={etf.name} logoUrl={null} className="w-11 h-11 rounded-[10px] text-sm" />
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-foreground leading-tight">{etf.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {etf.exchanges.map((exchange) => (
                  <span
                    key={exchange}
                    className={`text-[10px] font-black px-2 py-0.5 rounded-[4px] ${exchange === "BSE" ? "bg-blue-600/10 text-blue-700" : "bg-burgundy/10 text-burgundy"}`}
                  >
                    {exchange}
                  </span>
                ))}
                <span className="text-[10px] font-black px-2 py-0.5 bg-gold/15 text-gold-deep rounded-[4px]">{etf.category}</span>
                {etf.updatedAt && (
                  <span className="text-[10px] text-muted-foreground font-bold">As of {formatQuoteTime(etf.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tabular-nums tracking-tight">
              {formatRupees(etf.price)}
            </span>
            {etf.changePct !== null && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-[5px] font-black text-sm ${isUp ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
                {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{isUp ? "+" : "-"}{formatPrice(Math.abs(etf.changeAmt ?? 0))}</span>
                <span>({formatPercent(etf.changePct)})</span>
                <span className="text-[10px] font-bold opacity-70 ml-0.5">1D</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="py-6 lg:py-8 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5 min-w-0">

              {/* Price chart */}
              <section className="border border-border rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5">
                <EtfPriceChart points={chartPoints} range={chartRange} onRangeChange={setChartRange} />
              </section>

              {/* Performance */}
              <Card title="Performance">
                <div className="sm:max-w-md pt-1 pb-4">
                  <RangeBar low={p.low52} high={p.high52} current={etf.price} />
                </div>
                <div className="border-t border-border/60 pt-1">
                  <StatGrid rows={[
                    {
                      label: "Price difference",
                      help: "How much the price has moved today compared with the previous close (CMOTS Pricediff).",
                      value: etf.changeAmt === null ? NO_VALUE : (
                        <span className={`font-black tabular-nums ${changeColor(etf.changeAmt)}`}>
                          {etf.changeAmt >= 0 ? "+" : "-"}₹{formatPrice(Math.abs(etf.changeAmt))}
                          {etf.changePct !== null && <span className="ml-1 text-[11px] font-bold">({formatPercent(etf.changePct)})</span>}
                        </span>
                      ),
                    },
                    { label: "Open price",     value: formatPrice(p.open),      help: HELP.open },
                    { label: "High price",     value: formatPrice(p.high),      help: HELP.high },
                    { label: "Low price",      value: formatPrice(p.low),       help: HELP.low },
                    { label: "Previous price", value: formatPrice(p.prevClose), help: HELP.prevClose },
                    { label: "Volume",         value: formatCount(p.volume),    help: HELP.volume },
                  ]} />
                </div>
              </Card>

              {/* Fundamentals */}
              <Card title="Fundamentals" subtitle="Financial information reported quarterly or annually">
                <StatGrid rows={[
                  { label: "Expense ratio", value: formatPlainPct(f.expenseRatio), help: HELP.expenseRatio },
                  { label: "AUM",           value: formatAum(f.aumCr),             help: HELP.aum },
                  {
                    label: "Riskometer",
                    help: HELP.riskometer,
                    value: f.riskometer
                      ? <span className={`text-[11px] font-black px-2 py-0.5 rounded-[4px] ${RISK_STYLE[f.riskometer] ?? "bg-gold/15 text-gold-deep"}`}>{f.riskometer}</span>
                      : NO_VALUE,
                  },
                  { label: "P/E ratio",   value: formatRatio(f.pe),       help: HELP.pe },
                  { label: "P/B ratio",   value: formatRatio(f.pb),       help: HELP.pb },
                  { label: "Stock count", value: formatCount(f.stockCount), help: HELP.stockCount },
                ]} />
              </Card>

              {/* Holdings — equity ETFs only (holdings data exists for equity alone) */}
              {etf.category === "Equity" && <HoldingsCard slug={etf.slug} />}

              {/* Category returns */}
              <Card title="Category returns" subtitle="3Y and 5Y returns are annualised. Rank is this ETF's position within its category.">
                <CategoryReturnsChart rows={etf.categoryReturns} />
                <div className="overflow-x-auto -mx-5 px-5">
                  <table className="w-full min-w-[360px] text-[13px]">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left py-2.5" />
                        {etf.categoryReturns.map((r) => (
                          <th key={r.period} className="text-right py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{r.period}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      <tr>
                        <td className="py-3 font-bold text-foreground">Returns</td>
                        {etf.categoryReturns.map((r) => (
                          <td key={r.period} className={`py-3 text-right font-black tabular-nums ${changeColor(r.fund)}`}>{formatPercent(r.fund)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-muted-foreground">Category average</td>
                        {etf.categoryReturns.map((r) => (
                          <td key={r.period} className={`py-3 text-right font-bold tabular-nums ${changeColor(r.categoryAvg)}`}>{formatPercent(r.categoryAvg)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-muted-foreground">Rank</td>
                        {etf.categoryReturns.map((r) => (
                          <td key={r.period} className="py-3 text-right font-bold text-foreground tabular-nums">{formatCount(r.rank)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-muted-foreground">Count</td>
                        {etf.categoryReturns.map((r) => (
                          <td key={r.period} className="py-3 text-right font-bold text-foreground tabular-nums">{formatCount(r.count)}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* About */}
              <Card title="About">
                <p className="text-[13px] text-muted-foreground leading-relaxed">{etf.about.description || NO_VALUE}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-border/60">
                  {[
                    { label: "Founded",      value: etf.about.founded ? formatDate(etf.about.founded) : NO_VALUE },
                    { label: "AMC",          value: etf.about.amc ?? NO_VALUE },
                    { label: "Fund manager", value: etf.about.fundManagers.join(", ") || NO_VALUE },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-[13px] font-bold text-foreground leading-snug">{item.value}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Similar ETFs */}
              <Card title="Similar ETFs" subtitle="Selection based on fund size (AUM)">
                <SimilarEtfs etfs={etf.similar} currentSlug={etf.slug} />
              </Card>
            </div>

            {/* ── SIDEBAR: Open Demat Account ── */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-[10px] overflow-hidden relative" style={{ background: "linear-gradient(135deg, #8B0D19 0%, #6B0A13 60%, #4A0709 100%)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D9B27C 0%, transparent 70%)", filter: "blur(20px)" }} />
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
                    Start trading {etf.symbol} and 5,000+ stocks with ₹0 account opening &amp; ₹0 AMC.
                  </p>
                  <div className="space-y-2 mb-4">
                    {["₹0 Account Opening Fee", "₹17 Flat Brokerage", "3-in-1 Account (Demat + Trading + Bank)", "Instant Account Opening"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                          <span className="text-[8px] text-white font-black">✓</span>
                        </div>
                        <span className="text-[11px] text-white/80 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/login" className="w-full py-3 rounded-[7px] bg-gold text-[#4A0709] font-black text-sm text-center block hover:bg-gold/90 transition-colors">
                    Open Free Account →
                  </Link>
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

function SimilarEtfs({ etfs, currentSlug }: { etfs: EtfSummary[]; currentSlug: string }) {
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full min-w-[620px] text-[12px]">
        <thead>
          <tr className="border-y border-border/60 bg-cream/60">
            <th className="text-left px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">ETF name</th>
            {["Current price", "Change", "Expense ratio", "AUM"].map((h) => (
              <th key={h} className="text-right px-3 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground whitespace-nowrap last:pr-5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {etfs.map((s) => {
            const current = s.slug === currentSlug
            return (
              <tr key={s.slug} className={current ? "bg-burgundy/[0.03]" : "hover:bg-cream/40 transition-colors"}>
                <td className="px-5 py-3">
                  <Link href={`/etf/${s.slug}`} className="flex items-center gap-2.5 group" aria-current={current ? "page" : undefined}>
                    <StockAvatar symbol={s.symbol} name={s.name} logoUrl={null} className="w-8 h-8 text-[10px]" />
                    <span className="min-w-0">
                      <span className="block font-extrabold text-foreground group-hover:text-burgundy transition-colors truncate max-w-[240px]">{s.name}</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        {s.symbol}
                        {current && <span className="font-black text-burgundy bg-burgundy/10 px-1.5 py-px rounded-[3px]">This ETF</span>}
                      </span>
                    </span>
                  </Link>
                </td>
                <td className="px-3 py-3 text-right font-black text-foreground tabular-nums whitespace-nowrap">{formatRupees(s.price)}</td>
                <td className={`px-3 py-3 text-right font-bold tabular-nums whitespace-nowrap ${changeColor(s.changePct)}`}>
                  {s.changeAmt !== null && `${s.changeAmt >= 0 ? "+" : "-"}${formatPrice(Math.abs(s.changeAmt))} `}({formatPercent(s.changePct)})
                </td>
                <td className="px-3 py-3 text-right font-bold text-foreground tabular-nums">{formatPlainPct(s.expenseRatio)}</td>
                <td className="px-3 py-3 pr-5 text-right font-bold text-foreground tabular-nums whitespace-nowrap">{formatAum(s.aumCr)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

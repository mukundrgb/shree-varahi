"use client"

// Return calculator on the fund detail page (below the NAV chart).
// SIP / Lumpsum buttons + amount box; Calculate calls the backend (Reedos GetFundOverViewCalcInfo).
// Reedos always calculates from the fund's launch, so the period comes back with the result.
// Rules (user decisions 2026-11-17): default SIP (lumpsum only for ETFs), default amount = the
// fund's minimum (₹500 when it has none), minimum = fund's minimum, maximum ₹1 crore.
// Changing the type or amount clears the result. If the calculator API fails, Calculate stays disabled.

import { useRef, useState } from "react"
import { Calculator, Loader2 } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ApiError } from "@/lib/api/client"
import {
  mutualFundsApi, type CalcType, type FundCalculatorApi, type FundReturnCalcApi,
} from "@/lib/mutual-funds/api-client"

const FALLBACK_AMOUNT = 500
const TYPE_LABEL: Record<CalcType, string> = { S: "SIP", L: "Lumpsum" }

/** Full Indian format with paise: ₹5,38,414.86 */
const money = (v: number | null) =>
  v === null ? "—" : `₹${v.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const whole = (v: number) => `₹${v.toLocaleString("en-IN")}`
const pct = (v: number | null) => (v === null ? "—" : `${v.toFixed(2)}%`)
const tone = (v: number | null) => (v === null ? "text-foreground" : v >= 0 ? "text-profit" : "text-loss")

// ─── Charts (the numbers stay visible next to each chart) ────────────────────
// Colours checked with the dataviz palette validator: distinct for colour-blind readers too.
const INVESTED = "#B8924A" // deep gold
const GAINED   = "#A51C2A" // brand red
const FUND     = "#A51C2A"
const BENCH    = "#9CA3AF" // neutral grey for Bank FD / Gold

/** Donut: how much of the latest value is your money and how much is the gain. */
function ValueSplit({ invested, gained }: { invested: number | null; gained: number | null }) {
  if (invested === null || gained === null || invested <= 0) return null
  // A loss can't be drawn as a slice; the stat tiles above already show it.
  if (gained <= 0) return null
  const total = invested + gained
  const data = [
    { name: "Invested", value: invested, color: INVESTED },
    { name: "Wealth Gained", value: gained, color: GAINED },
  ]
  return (
    <div className="rounded-[8px] border border-border/60 px-4 py-3">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Invested vs Gain</div>
      <div className="flex items-center gap-4">
        <div className="relative w-[120px] h-[120px] shrink-0" role="img"
          aria-label={`Invested ${money(invested)} (${((invested / total) * 100).toFixed(1)}%), wealth gained ${money(gained)} (${((gained / total) * 100).toFixed(1)}%)`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={38} outerRadius={56} startAngle={90} endAngle={-270}
                paddingAngle={2} stroke="#fff" strokeWidth={2} isAnimationActive={false}>
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              {/* No hover box: it covered the "Gain %" in the centre, and the legend beside the donut shows the amounts. */}
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Gain</span>
            <span className="text-sm font-black text-foreground tabular-nums">{((gained / total) * 100).toFixed(0)}%</span>
          </div>
        </div>
        <ul className="space-y-2 min-w-0">
          {data.map((d) => (
            <li key={d.name} className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ background: d.color }} aria-hidden />
                {d.name} · {((d.value / total) * 100).toFixed(1)}%
              </div>
              <div className="text-sm font-black text-foreground tabular-nums break-words">{money(d.value)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Horizontal bars: this fund's 1-year return against Bank FD and Gold, each labelled. */
function OneYearComparison({ comparison }: { comparison: FundReturnCalcApi["comparison"] }) {
  const data = [
    { name: "This Fund", value: comparison.scheme1Y, color: FUND },
    { name: "Bank FD",   value: comparison.bankFd,   color: BENCH },
    { name: "Gold",      value: comparison.gold1Y,   color: BENCH },
  ].filter((d): d is { name: string; value: number; color: string } => d.value !== null)
  if (data.length === 0) return null
  // Bars grow left (loss) or right (gain) from a shared zero line. Name and value sit in their
  // own columns, so a negative return can never push its label onto the name.
  const min = Math.min(0, ...data.map((d) => d.value))
  const max = Math.max(0, ...data.map((d) => d.value))
  const span = max - min || 1
  const zero = (-min / span) * 100

  return (
    <div className="rounded-[8px] border border-border/60 px-4 py-3">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">1-Year Comparison</div>
      <ul className="space-y-3" aria-label={`1-year returns: ${data.map((d) => `${d.name} ${pct(d.value)}`).join(", ")}`}>
        {data.map((d) => {
          const width = (Math.abs(d.value) / span) * 100
          const left = d.value >= 0 ? zero : zero - width
          return (
            <li key={d.name} className="grid grid-cols-[72px_minmax(0,1fr)_60px] items-center gap-2" title={`${d.name}: ${pct(d.value)} over 1 year`}>
              <span className="text-[11px] font-semibold text-foreground/80 truncate">{d.name}</span>
              <span className="relative h-4 rounded-[3px] bg-secondary/40">
                {min < 0 && <span className="absolute inset-y-[-3px] w-px bg-border" style={{ left: `${zero}%` }} aria-hidden />}
                <span className={`absolute inset-y-0 ${d.value >= 0 ? "rounded-r-[4px]" : "rounded-l-[4px]"}`}
                  style={{ left: `${left}%`, width: `${Math.max(width, 1.5)}%`, background: d.color }} aria-hidden />
              </span>
              <span className={`text-right text-[12px] font-black tabular-nums ${tone(d.value)}`}>{pct(d.value)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function FundReturnCalculator({ slug, settings, card }: { slug: string; settings: FundCalculatorApi; card: string }) {
  const minFor = (t: CalcType) => (t === "S" ? settings.minSip : settings.minLumpsum)
  const defaultAmount = (t: CalcType) => String(minFor(t) ?? FALLBACK_AMOUNT)

  const firstType: CalcType = settings.types.includes("S") ? "S" : "L"
  const [type, setType]       = useState<CalcType>(firstType)
  const [amount, setAmount]   = useState(() => defaultAmount(firstType))
  const [result, setResult]   = useState<FundReturnCalcApi | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed]   = useState(settings.status === "unavailable")
  /** Ignores an answer that arrives after the inputs changed. */
  const requestId = useRef(0)

  const min = minFor(type)
  const value = amount === "" ? null : Number(amount)
  const error =
    value === null || value <= 0 ? "Enter an amount" :
    min !== null && value < min  ? `Minimum ${TYPE_LABEL[type]} amount is ${whole(min)}` :
    value > settings.maxAmount   ? `Maximum amount is ${whole(settings.maxAmount)}` :
    null

  const reset = () => { requestId.current++; setResult(null); setLoading(false) }

  const pickType = (t: CalcType) => {
    if (t === type) return
    reset(); setType(t); setAmount(defaultAmount(t))
  }

  const onAmount = (text: string) => {
    reset()
    setAmount(text.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 9))
  }

  const calculate = async () => {
    if (error || failed || value === null) return
    const id = ++requestId.current
    setLoading(true)
    try {
      const r = await mutualFundsApi.returns(slug, type, value)
      if (id === requestId.current) setResult(r)
    } catch (e) {
      // A 400 is an input problem (already checked above); anything else means the API is not working.
      if (id === requestId.current && !(e instanceof ApiError && e.status === 400)) setFailed(true)
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }

  return (
    <div className={card}>
      <div className="px-5 py-4 border-b border-border/60 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-burgundy" />
        <p className="text-sm font-black text-foreground">Return Calculator</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="shrink-0">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">Investment Type</div>
            <div className="flex items-center gap-1 bg-secondary/60 rounded-[7px] p-1 w-fit" role="radiogroup" aria-label="Investment type">
              {settings.types.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={type === t} onClick={() => pickType(t)}
                  className={`px-4 py-1.5 rounded-[5px] text-[12px] font-black transition-colors ${
                    type === t ? "bg-burgundy text-white" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <label htmlFor="calc-amount" className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">
              {type === "S" ? "Monthly SIP Amount" : "Lumpsum Amount"}
            </label>
            <div className="flex gap-2">
              <div className={`flex-1 min-w-0 flex items-center h-10 rounded-[6px] border bg-white px-3 focus-within:ring-2 focus-within:ring-gold/30 ${
                error ? "border-loss/50" : "border-border focus-within:border-gold/40"
              }`}>
                <span className="text-sm font-bold text-muted-foreground mr-1">₹</span>
                <input id="calc-amount" type="text" inputMode="numeric" autoComplete="off" value={amount}
                  onChange={(e) => onAmount(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") calculate() }}
                  aria-invalid={!!error} aria-describedby="calc-amount-hint"
                  className="w-full min-w-0 bg-transparent text-sm font-bold text-foreground tabular-nums focus:outline-none" />
              </div>
              <button type="button" onClick={calculate} disabled={!!error || failed || loading}
                className="h-10 px-5 rounded-[6px] bg-burgundy text-white text-[12px] font-black flex items-center gap-1.5 hover:bg-burgundy-deep disabled:bg-secondary disabled:text-muted-foreground/60 disabled:cursor-not-allowed transition-colors shrink-0">
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Calculate
              </button>
            </div>
            <p id="calc-amount-hint" className={`text-[11px] font-semibold mt-1.5 ${failed || error ? "text-loss" : "text-muted-foreground"}`}>
              {failed
                ? "The calculator is unavailable right now."
                : error ?? (min !== null ? `Min ${whole(min)} · Max ${whole(settings.maxAmount)}` : `Max ${whole(settings.maxAmount)}`)}
            </p>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <p className="text-[12px] text-muted-foreground font-semibold">
              {type === "S" ? `${whole(result.amount)} every month` : `${whole(result.amount)} one-time`} since launch
              {" · "}Investment period: <span className="font-black text-foreground">{result.period}</span>
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Invested Amount", value: money(result.investedAmount), cls: "text-foreground" },
                { label: "Latest Value",    value: money(result.latestValue),    cls: "text-foreground" },
                { label: "Wealth Gained",   value: money(result.wealthGained),   cls: tone(result.wealthGained) },
                { label: "Return",          value: pct(result.returnPct),        cls: tone(result.returnPct) },
              ].map((s) => (
                <div key={s.label} className="rounded-[8px] border border-border/60 bg-cream/40 px-3 py-3 min-w-0">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">{s.label}</div>
                  <div className={`text-sm sm:text-base font-black tabular-nums break-words ${s.cls}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <ValueSplit invested={result.investedAmount} gained={result.wealthGained} />
              <OneYearComparison comparison={result.comparison} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

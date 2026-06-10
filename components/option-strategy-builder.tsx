"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, animate, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, TrendingUp, TrendingDown, Minus, Zap } from "lucide-react"

const UNDERLYINGS = ["Nifty 50", "Bank Nifty", "Fin Nifty", "Midcap Nifty", "Sensex"]
const EXPIRIES = ["29 May 2025", "05 Jun 2025", "26 Jun 2025", "25 Sep 2025"]

const STRATEGIES = [
  { name: "Long Call",         bias: "up",    legs: [{ action: "Buy",  type: "CE", strikeDelta: 0,   premium: 120, qty: 50 }] },
  { name: "Long Put",          bias: "down",  legs: [{ action: "Buy",  type: "PE", strikeDelta: 0,   premium: 115, qty: 50 }] },
  { name: "Bull Call Spread",  bias: "up",    legs: [{ action: "Buy",  type: "CE", strikeDelta: 0,   premium: 180, qty: 50 }, { action: "Sell", type: "CE", strikeDelta: 100, premium: 60, qty: 50 }] },
  { name: "Bear Put Spread",   bias: "down",  legs: [{ action: "Buy",  type: "PE", strikeDelta: 0,   premium: 175, qty: 50 }, { action: "Sell", type: "PE", strikeDelta: -100, premium: 55, qty: 50 }] },
  { name: "Long Straddle",     bias: "both",  legs: [{ action: "Buy",  type: "CE", strikeDelta: 0,   premium: 160, qty: 50 }, { action: "Buy",  type: "PE", strikeDelta: 0,   premium: 155, qty: 50 }] },
  { name: "Iron Condor",       bias: "both",  legs: [{ action: "Sell", type: "CE", strikeDelta: 100, premium: 55,  qty: 50 }, { action: "Buy",  type: "CE", strikeDelta: 200, premium: 20, qty: 50 }, { action: "Sell", type: "PE", strikeDelta: -100, premium: 50, qty: 50 }, { action: "Buy", type: "PE", strikeDelta: -200, premium: 18, qty: 50 }] },
  { name: "Short Strangle",    bias: "both",  legs: [{ action: "Sell", type: "CE", strikeDelta: 150, premium: 45,  qty: 50 }, { action: "Sell", type: "PE", strikeDelta: -150, premium: 42, qty: 50 }] },
  { name: "Covered Call",      bias: "up",    legs: [{ action: "Sell", type: "CE", strikeDelta: 100, premium: 90,  qty: 50 }] },
]

type Leg = { action: "Buy" | "Sell"; type: "CE" | "PE"; strikeDelta: number; premium: number; qty: number }
type Strategy = typeof STRATEGIES[0]

const SPOT = 24500

function computePayoff(legs: Leg[], baseStrike: number, price: number): number {
  return legs.reduce((sum, leg) => {
    const strike = baseStrike + leg.strikeDelta
    const intrinsic = leg.type === "CE"
      ? Math.max(0, price - strike)
      : Math.max(0, strike - price)
    const legPnl = (intrinsic - leg.premium) * leg.qty
    return sum + (leg.action === "Buy" ? legPnl : -legPnl)
  }, 0)
}

function buildPath(legs: Leg[], baseStrike: number, priceRange: [number, number], width: number, height: number): string {
  const steps = 120
  const [minP, maxP] = priceRange
  const payoffs: number[] = []

  for (let i = 0; i <= steps; i++) {
    const price = minP + (i / steps) * (maxP - minP)
    payoffs.push(computePayoff(legs, baseStrike, price))
  }

  const maxPnl = Math.max(...payoffs)
  const minPnl = Math.min(...payoffs)
  const pnlRange = maxPnl - minPnl || 1

  const padY = 32
  const usableH = height - padY * 2

  return payoffs
    .map((pnl, i) => {
      const x = (i / steps) * width
      const y = padY + usableH * (1 - (pnl - minPnl) / pnlRange)
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
}

function getBreakevens(legs: Leg[], baseStrike: number, priceRange: [number, number]): number[] {
  const steps = 800
  const [minP, maxP] = priceRange
  const bes: number[] = []
  let prev = computePayoff(legs, baseStrike, minP)

  for (let i = 1; i <= steps; i++) {
    const price = minP + (i / steps) * (maxP - minP)
    const curr = computePayoff(legs, baseStrike, price)
    if (prev * curr <= 0 && Math.abs(curr - prev) < 20000) {
      const be = minP + ((i - 1 + Math.abs(prev) / (Math.abs(prev) + Math.abs(curr))) / steps) * (maxP - minP)
      bes.push(Math.round(be))
    }
    prev = curr
  }
  return bes
}

function priceToX(price: number, range: [number, number], width: number) {
  return ((price - range[0]) / (range[1] - range[0])) * width
}

function pnlToY(pnl: number, minPnl: number, maxPnl: number, height: number) {
  const pad = 32
  const usableH = height - pad * 2
  return pad + usableH * (1 - (pnl - minPnl) / (maxPnl - minPnl || 1))
}

// Animated SVG path using motion value
function AnimatedPath({ d, stroke, strokeWidth = 2, className = "" }: { d: string; stroke: string; strokeWidth?: number; className?: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const progress = useMotionValue(0)

  useEffect(() => {
    const ctrl = animate(progress, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    return () => ctrl.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d])

  useEffect(() => {
    if (!pathRef.current) return
    const len = pathRef.current.getTotalLength()
    const unsubscribe = progress.on("change", (v) => {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = String(len * (1 - v))
      }
    })
    pathRef.current.style.strokeDasharray = String(len)
    pathRef.current.style.strokeDashoffset = String(len)
    return unsubscribe
  }, [d, progress])

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
  )
}

// Scrolling option chain background decoration
function OptionChainBg() {
  const rows = useMemo(() => {
    const strikes = [24200, 24300, 24400, 24500, 24600, 24700, 24800]
    return strikes.flatMap((s) => [
      { strike: s, side: "CE", oi: Math.floor(Math.random() * 9000 + 1000), iv: (18 + Math.random() * 8).toFixed(1), ltp: (Math.random() * 200 + 20).toFixed(1) },
      { strike: s, side: "PE", oi: Math.floor(Math.random() * 9000 + 1000), iv: (16 + Math.random() * 8).toFixed(1), ltp: (Math.random() * 200 + 20).toFixed(1) },
    ])
  }, [])

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity: 0.045 }}
    >
      <motion.div
        animate={{ y: [0, -80] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        className="font-mono text-[11px] leading-6 text-foreground px-8 pt-4 space-y-0"
      >
        {[...rows, ...rows].map((row, i) => (
          <div key={i} className="flex gap-6">
            <span className={row.side === "CE" ? "text-burgundy" : "text-profit"}>{row.side}</span>
            <span>{row.strike}</span>
            <span>OI: {row.oi.toLocaleString("en-IN")}</span>
            <span>IV: {row.iv}%</span>
            <span>LTP: {row.ltp}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function BiasIcon({ bias }: { bias: string }) {
  if (bias === "up") return <TrendingUp className="h-3.5 w-3.5 text-profit" />
  if (bias === "down") return <TrendingDown className="h-3.5 w-3.5 text-loss" />
  return <Minus className="h-3.5 w-3.5 text-gold" />
}

function SelectBox({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-secondary border border-border rounded-[5px] px-3 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 cursor-pointer"
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}

export function OptionStrategyBuilder() {
  const [underlying, setUnderlying] = useState("Nifty 50")
  const [expiry, setExpiry] = useState(EXPIRIES[0])
  const [strategyIdx, setStrategyIdx] = useState(0)

  const strategy: Strategy = STRATEGIES[strategyIdx]
  const legs: Leg[] = strategy.legs as Leg[]
  const baseStrike = SPOT

  const priceRange: [number, number] = [SPOT - 1000, SPOT + 1000]
  const W = 500
  const H = 320

  const payoffs = useMemo(() => {
    const steps = 120
    const [minP, maxP] = priceRange
    return Array.from({ length: steps + 1 }, (_, i) => {
      const price = minP + (i / steps) * (maxP - minP)
      return computePayoff(legs, baseStrike, price)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategyIdx])

  const maxPnl = Math.max(...payoffs)
  const minPnl = Math.min(...payoffs)

  const pathD = useMemo(() => buildPath(legs, baseStrike, priceRange, W, H), [strategyIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const breakevens = useMemo(() => getBreakevens(legs, baseStrike, priceRange), [strategyIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const zeroY = pnlToY(0, minPnl, maxPnl, H)
  const spotX = priceToX(SPOT, priceRange, W)
  const spotY = pnlToY(computePayoff(legs, baseStrike, SPOT), minPnl, maxPnl, H)

  const netPremium = legs.reduce((sum, leg) => {
    const cost = leg.premium * leg.qty
    return sum + (leg.action === "Buy" ? -cost : cost)
  }, 0)

  const maxProfit = maxPnl === Infinity ? Infinity : maxPnl
  const maxLoss = minPnl === -Infinity ? -Infinity : minPnl

  return (
    <section className="relative bg-background py-16 lg:py-24 overflow-hidden">
      {/* Option chain scrolling BG */}
      <OptionChainBg />

      {/* Side tints */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-burgundy/[0.025] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-profit/[0.02] pointer-events-none" />

      {/* Section divider */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
            Strategy Lab
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-4 leading-[1.1]">
            Build your strategy.{" "}
            <span className="text-burgundy">See the payoff first.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Model any options strategy — visualise profit & loss before placing a single order.
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT — Controls */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur border border-border rounded-[5px] p-6 shadow-sm flex flex-col gap-5"
          >
            {/* Dropdowns */}
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectBox label="Underlying" value={underlying} options={UNDERLYINGS} onChange={setUnderlying} />
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expiry</label>
                <div className="relative">
                  <select
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full appearance-none bg-secondary border border-border rounded-[5px] px-3 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 cursor-pointer"
                  >
                    {EXPIRIES.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-profit"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Strategy</label>
              <div className="grid grid-cols-2 gap-2">
                {STRATEGIES.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => setStrategyIdx(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-[5px] text-sm font-medium border transition-all cursor-pointer ${
                      strategyIdx === i
                        ? "bg-burgundy text-white border-burgundy shadow-sm"
                        : "bg-secondary border-border text-foreground hover:border-gold/50"
                    }`}
                  >
                    <BiasIcon bias={s.bias} />
                    <span className="truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Leg summary table */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Legs</label>
              <div className="rounded-[5px] border border-border overflow-hidden">
                <div className="grid grid-cols-5 text-[10px] font-semibold text-muted-foreground bg-secondary px-3 py-2 border-b border-border">
                  <span>Action</span><span>Type</span><span>Strike</span><span>Prem.</span><span>Qty</span>
                </div>
                {legs.map((leg, i) => (
                  <div key={i} className="grid grid-cols-5 text-xs px-3 py-2 border-b border-border last:border-0 items-center">
                    <span className={`font-semibold ${leg.action === "Buy" ? "text-profit" : "text-burgundy"}`}>{leg.action}</span>
                    <span className="font-mono">{leg.type}</span>
                    <span className="font-mono">{(baseStrike + leg.strikeDelta).toLocaleString("en-IN")}</span>
                    <span className="font-mono">₹{leg.premium}</span>
                    <span className="font-mono">{leg.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* P&L summary row */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-secondary rounded-[5px] p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Net {netPremium >= 0 ? "Credit" : "Debit"}</p>
                <p className="font-mono font-bold text-sm text-foreground">₹{Math.abs(netPremium).toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-profit/10 rounded-[5px] p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Max Profit</p>
                <p className="font-mono font-bold text-sm text-profit">
                  {maxProfit === Infinity ? "Unlimited" : `₹${maxProfit.toLocaleString("en-IN")}`}
                </p>
              </div>
              <div className="bg-burgundy/10 rounded-[5px] p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Max Loss</p>
                <p className="font-mono font-bold text-sm text-burgundy">
                  {maxLoss === -Infinity ? "Unlimited" : `₹${Math.abs(maxLoss).toLocaleString("en-IN")}`}
                </p>
              </div>
            </div>

            {/* Breakevens */}
            {breakevens.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Breakeven{breakevens.length > 1 ? "s" : ""}:</span>
                {breakevens.map((be) => (
                  <span key={be} className="font-mono text-xs font-semibold bg-gold/10 text-gold-deep px-2 py-1 rounded-[5px]">
                    ₹{be.toLocaleString("en-IN")}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <Button
              size="lg"
              className="w-full bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] mt-auto text-base font-semibold"
            >
              Execute this strategy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* RIGHT — Payoff chart */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur border-2 border-gold/40 rounded-[5px] p-5 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground">{strategy.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{underlying} · {expiry}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-gold" />
                <span>Live NSE data</span>
              </div>
            </div>

            {/* SVG chart */}
            <div className="relative flex-1 min-h-[260px]">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="w-full h-full rounded-[5px]"
                style={{ background: "var(--cream, #FAF8F5)" }}
              >
                <defs>
                  {/* Profit zone clip */}
                  <clipPath id="profitClip">
                    <rect x="0" y="0" width={W} height={zeroY} />
                  </clipPath>
                  {/* Loss zone clip */}
                  <clipPath id="lossClip">
                    <rect x="0" y={zeroY} width={W} height={H - zeroY} />
                  </clipPath>
                </defs>

                {/* Zone fills */}
                <rect x="0" y="0" width={W} height={zeroY} fill="rgba(26,122,69,0.10)" />
                <rect x="0" y={zeroY} width={W} height={H - zeroY} fill="rgba(139,13,25,0.10)" />

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
                ))}
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1={W * f} y1="0" x2={W * f} y2={H} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
                ))}

                {/* Zero line */}
                <line x1="0" y1={zeroY} x2={W} y2={zeroY} stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeDasharray="4,3" />

                {/* Breakeven markers */}
                {breakevens.map((be) => {
                  const bx = priceToX(be, priceRange, W)
                  return (
                    <g key={be}>
                      <line x1={bx} y1="0" x2={bx} y2={H} stroke="#B8924A" strokeWidth="1" strokeDasharray="3,3" />
                      <rect x={bx - 28} y="4" width="56" height="16" rx="3" fill="#B8924A" opacity="0.85" />
                      <text x={bx} y="15.5" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="600">
                        BE ₹{be.toLocaleString("en-IN")}
                      </text>
                    </g>
                  )
                })}

                {/* Payoff line — profit zone (green) */}
                <g clipPath="url(#profitClip)">
                  <AnimatedPath d={pathD} stroke="#059669" strokeWidth={2.5} />
                </g>
                {/* Payoff line — loss zone (burgundy) */}
                <g clipPath="url(#lossClip)">
                  <AnimatedPath d={pathD} stroke="#8B0D19" strokeWidth={2.5} />
                </g>

                {/* Spot price marker */}
                <g>
                  <line x1={spotX} y1="0" x2={spotX} y2={H} stroke="#8B0D19" strokeWidth="1" opacity="0.4" />
                  <circle cx={spotX} cy={spotY} r="5" fill="white" stroke="#8B0D19" strokeWidth="2" />
                  <rect x={spotX - 26} y={H - 20} width="52" height="16" rx="3" fill="#8B0D19" opacity="0.85" />
                  <text x={spotX} y={H - 10} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="600">
                    ₹{SPOT.toLocaleString("en-IN")}
                  </text>
                </g>

                {/* Max profit label */}
                {maxPnl !== Infinity && (
                  <text
                    x={W - 6}
                    y={pnlToY(maxPnl, minPnl, maxPnl, H) + 12}
                    textAnchor="end"
                    fill="#059669"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="700"
                    opacity="0.85"
                  >
                    +₹{maxPnl.toLocaleString("en-IN")}
                  </text>
                )}

                {/* Max loss label */}
                {minPnl !== -Infinity && (
                  <text
                    x={W - 6}
                    y={pnlToY(minPnl, minPnl, maxPnl, H) - 4}
                    textAnchor="end"
                    fill="#8B0D19"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="700"
                    opacity="0.85"
                  >
                    -₹{Math.abs(minPnl).toLocaleString("en-IN")}
                  </text>
                )}

                {/* Strategy label top-right */}
                <text x={W - 6} y="14" textAnchor="end" fill="rgba(0,0,0,0.35)" fontSize="10" fontFamily="monospace">
                  Expiry P&amp;L
                </text>
              </svg>

              {/* Price axis labels */}
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1 px-0.5">
                <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                <span>₹{SPOT.toLocaleString("en-IN")}</span>
                <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-profit inline-block rounded" /> Profit zone</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-burgundy inline-block rounded" /> Loss zone</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-burgundy bg-white inline-block" /> Spot</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          For educational purposes. Past performance is not indicative of future results. Options trading involves risk.
        </motion.p>
      </div>
    </section>
  )
}

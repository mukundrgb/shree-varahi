"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export type BuildUp = "Long Buildup" | "Short Buildup" | "Short Covering" | "Long Unwinding"

export type FutContract = {
  label: string
  daysToExpiry: number
  ltp: number
  chg: number
  chgPct: number
  volume: string
  oi: string
  oiChangePct: number
  buildUp: BuildUp
  bid: number
  ask: number
  bidQty: string
  askQty: string
}

export type ExpiryOI = { month: string; oi: string; oiPct: number }
export type ExpiryPrice = { price: number; chg: number; chgPct: number }

export type FuturesPageData = {
  symbol: string
  name: string
  sector: string
  ltp: number
  chg: number
  chgPct: number
  open: number
  high52: number
  low52: number
  exchanges: string[]
  asOf: string
  oiBreakup: ExpiryOI[]
  priceAcrossExpiry: ExpiryPrice[]
  premiumDiscount: number[]
  contracts: FutContract[]
}

const TABS = ["Overview", "Live Markets", "15-Mins Built Up"] as const

export function FuturesDetailPage({ data }: { data: FuturesPageData }) {
  const [tab, setTab] = useState<typeof TABS[number]>("Overview")
  const d = data
  const isPos = d.chg >= 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/futures-options" className="hover:text-foreground transition-colors">Futures</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{d.symbol}</span>
          </nav>
        </div>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2.5">
                {d.exchanges.map(ex => (
                  <span key={ex} className="text-[11px] font-bold bg-burgundy/10 text-burgundy px-2 py-0.5 rounded-[4px]">{ex}</span>
                ))}
                <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">{d.sector}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">{d.name}</h1>
              <p className="text-sm text-muted-foreground font-semibold mt-0.5">{d.symbol}</p>

              <div className="flex items-baseline flex-wrap gap-2 mt-2">
                <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
                  {d.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
                <div className={`flex items-center gap-1 font-bold text-base ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                  {isPos ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{isPos ? "+" : ""}{d.chg.toFixed(2)}</span>
                  <span className="text-sm">({isPos ? "+" : ""}{d.chgPct.toFixed(2)}%)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">as on {d.asOf}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-semibold">Open</div>
                <div className="text-sm font-bold text-foreground tabular-nums mt-0.5">{d.open.toLocaleString("en-IN")}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-semibold">52W High</div>
                <div className="text-sm font-bold text-foreground tabular-nums mt-0.5">{d.high52.toLocaleString("en-IN")}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-semibold">52W Low</div>
                <div className="text-sm font-bold text-foreground tabular-nums mt-0.5">{d.low52.toLocaleString("en-IN")}</div>
              </div>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-9 px-6 text-sm font-bold" asChild>
                <Link href="/signup/register">Trade Now →</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="flex items-center gap-1 bg-secondary rounded-[6px] p-1 w-fit">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all whitespace-nowrap ${
                  tab === t ? "bg-burgundy text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20 space-y-5">

          {tab === "Overview" && (
            <>
              {/* OI Breakup + Price Across Expiry + Premium/Discount */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4">Open Interest (OI) Breakup</h2>
                  <div className="space-y-3">
                    {d.oiBreakup.map(o => (
                      <div key={o.month}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-foreground">{o.month}</span>
                          <span className="text-muted-foreground tabular-nums">{o.oi} · {o.oiPct}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-burgundy rounded-full" style={{ width: `${o.oiPct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4">Price Across Expiry</h2>
                  <div className="space-y-3">
                    {d.priceAcrossExpiry.map((p, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{d.oiBreakup[i]?.month}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground tabular-nums">{p.price.toLocaleString("en-IN")}</span>
                          <span className={`text-xs font-semibold tabular-nums ${p.chg >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {p.chg >= 0 ? "+" : ""}{p.chg.toFixed(2)} ({p.chg >= 0 ? "+" : ""}{p.chgPct.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4">Premium / Discount</h2>
                  <div className="space-y-3">
                    {d.premiumDiscount.map((v, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{d.oiBreakup[i]?.month}</span>
                        <span className={`text-sm font-bold tabular-nums ${v >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {v >= 0 ? "+" : ""}{v.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Contracts */}
              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Monthly Contracts</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3">Contract</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Days to Expiry</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">LTP</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Change</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Change %</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Volume</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Open Interest</th>
                        <th className="text-right text-xs font-bold text-muted-foreground px-4 py-3">OI Change %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.contracts.map(c => (
                        <tr key={c.label} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm font-bold text-foreground">{c.label}</td>
                          <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.daysToExpiry}</td>
                          <td className="text-right px-3 py-3 text-sm font-bold text-foreground tabular-nums">{c.ltp.toLocaleString("en-IN")}</td>
                          <td className={`text-right px-3 py-3 text-sm font-semibold tabular-nums ${c.chg >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {c.chg >= 0 ? "+" : ""}{c.chg.toFixed(2)}
                          </td>
                          <td className={`text-right px-3 py-3 text-sm font-semibold tabular-nums ${c.chgPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {c.chgPct >= 0 ? "+" : ""}{c.chgPct.toFixed(2)}%
                          </td>
                          <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.volume}</td>
                          <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.oi}</td>
                          <td className="text-right px-4 py-3 text-sm text-muted-foreground tabular-nums">{c.oiChangePct.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "Live Markets" && (
            <div className="border border-border rounded-[8px] bg-background overflow-hidden">
              <div className="px-4 sm:px-5 py-3 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">Live Market Depth — Best Bid / Ask</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3">Contract</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">LTP</th>
                      <th className="text-right text-xs font-bold text-emerald-600 px-3 py-3">Bid</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Bid Qty</th>
                      <th className="text-right text-xs font-bold text-red-500 px-3 py-3">Ask</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-4 py-3">Ask Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.contracts.map(c => (
                      <tr key={c.label} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-foreground">{c.label}</td>
                        <td className="text-right px-3 py-3 text-sm font-bold text-foreground tabular-nums">{c.ltp.toLocaleString("en-IN")}</td>
                        <td className="text-right px-3 py-3 text-sm font-bold text-emerald-600 tabular-nums">{c.bid.toLocaleString("en-IN")}</td>
                        <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.bidQty}</td>
                        <td className="text-right px-3 py-3 text-sm font-bold text-red-500 tabular-nums">{c.ask.toLocaleString("en-IN")}</td>
                        <td className="text-right px-4 py-3 text-sm text-muted-foreground tabular-nums">{c.askQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "15-Mins Built Up" && (
            <div className="border border-border rounded-[8px] bg-background overflow-hidden">
              <div className="px-4 sm:px-5 py-3 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">15-Minute Open Interest Built-up</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3">Contract</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">LTP</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Change %</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">OI Change %</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-4 py-3">Built-up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.contracts.map(c => (
                      <tr key={c.label} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-foreground">{c.label}</td>
                        <td className="text-right px-3 py-3 text-sm font-bold text-foreground tabular-nums">{c.ltp.toLocaleString("en-IN")}</td>
                        <td className={`text-right px-3 py-3 text-sm font-semibold tabular-nums ${c.chgPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {c.chgPct >= 0 ? "+" : ""}{c.chgPct.toFixed(2)}%
                        </td>
                        <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.oiChangePct.toFixed(2)}%</td>
                        <td className="text-right px-4 py-3">
                          <span className={`text-[10px] font-black px-2 py-1 rounded-[4px] border ${
                            c.buildUp === "Long Buildup"    ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            c.buildUp === "Short Covering"  ? "bg-emerald-50/60 text-emerald-600 border-emerald-100" :
                            c.buildUp === "Short Buildup"   ? "bg-red-50 text-red-600 border-red-100" :
                                                               "bg-red-50/60 text-red-500 border-red-100"
                          }`}>
                            {c.buildUp}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="rounded-[8px] p-6 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}
          >
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
            <div className="relative z-10">
              <h4 className="text-base font-black text-white mb-1">Use 12+ Pre-built Strategies or Build Your Own</h4>
              <p className="text-xs text-white/75">Trade {d.symbol} F&amp;O contracts with Shree Varahi's Strategy Builder.</p>
            </div>
            <Button className="relative z-10 bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 px-6 text-sm font-black shrink-0" asChild>
              <Link href="/futures-options">Create Strategy</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

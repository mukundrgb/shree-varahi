"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export type StrikeRow = {
  strike: number
  isATM: boolean
  ceOI: string
  ceOIChg: number
  ceVol: string
  ceIV: number
  ceLTP: number
  ceChg: number
  peLTP: number
  peChg: number
  peIV: number
  peVol: string
  peOIChg: number
  peOI: string
}

export type TopContract = {
  label: string
  type: "CE" | "PE"
  strike: number
  oi: string
  oiChgPct: number
  volume: string
  ltp: number
  chgPct: number
}

export type OptionsPageData = {
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
  totalCallOI: string
  totalPutOI: string
  pcr: number
  maxPain: number
  strikes: StrikeRow[]
  topContracts: TopContract[]
}

const TABS = ["Option Chain", "Open Interest", "Top Contracts"] as const

export function OptionsDetailPage({ data }: { data: OptionsPageData }) {
  const [tab, setTab] = useState<typeof TABS[number]>("Option Chain")
  const d = data
  const isPos = d.chg >= 0
  const maxOI = Math.max(...d.strikes.map(s => Math.max(parseFloat(s.ceOI.replace(/,/g, "")), parseFloat(s.peOI.replace(/,/g, "")))))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/futures-options" className="hover:text-foreground transition-colors">Options</Link>
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
                <div className="text-[10px] text-muted-foreground font-semibold">PCR</div>
                <div className="text-sm font-bold text-foreground tabular-nums mt-0.5">{d.pcr.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-semibold">Max Pain</div>
                <div className="text-sm font-bold text-foreground tabular-nums mt-0.5">{d.maxPain.toLocaleString("en-IN")}</div>
              </div>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-9 px-6 text-sm font-bold" asChild>
                <Link href="/signup/register">Trade Now →</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="flex items-center gap-1 bg-secondary rounded-[6px] p-1 w-fit overflow-x-auto" style={{ scrollbarWidth: "none" }}>
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

          {tab === "Option Chain" && (
            <div className="border border-border rounded-[8px] bg-background overflow-hidden">
              <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">Option Chain</h2>
                <span className="text-[11px] text-muted-foreground font-medium">Strike marked <span className="font-bold text-burgundy">ATM</span> in bold</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th colSpan={5} className="text-center text-xs font-bold text-emerald-600 px-3 py-2.5 border-r border-border">CALLS</th>
                      <th className="text-center text-xs font-bold text-muted-foreground px-3 py-2.5">STRIKE</th>
                      <th colSpan={5} className="text-center text-xs font-bold text-red-500 px-3 py-2.5 border-l border-border">PUTS</th>
                    </tr>
                    <tr className="border-b border-border bg-secondary/20">
                      <th className="text-right text-[11px] font-bold text-muted-foreground px-3 py-2">OI</th>
                      <th className="text-right text-[11px] font-bold text-muted-foreground px-3 py-2">OI Chg%</th>
                      <th className="text-right text-[11px] font-bold text-muted-foreground px-3 py-2">Vol</th>
                      <th className="text-right text-[11px] font-bold text-muted-foreground px-3 py-2">IV</th>
                      <th className="text-right text-[11px] font-bold text-muted-foreground px-3 py-2 border-r border-border">LTP</th>
                      <th className="text-center text-[11px] font-bold text-muted-foreground px-3 py-2">Price</th>
                      <th className="text-left text-[11px] font-bold text-muted-foreground px-3 py-2 border-l border-border">LTP</th>
                      <th className="text-left text-[11px] font-bold text-muted-foreground px-3 py-2">IV</th>
                      <th className="text-left text-[11px] font-bold text-muted-foreground px-3 py-2">Vol</th>
                      <th className="text-left text-[11px] font-bold text-muted-foreground px-3 py-2">OI Chg%</th>
                      <th className="text-left text-[11px] font-bold text-muted-foreground px-3 py-2">OI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.strikes.map(s => (
                      <tr key={s.strike} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${s.isATM ? "bg-gold/10" : ""}`}>
                        <td className="text-right px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.ceOI}</td>
                        <td className={`text-right px-3 py-2.5 text-xs font-semibold tabular-nums ${s.ceOIChg >= 0 ? "text-emerald-600" : "text-red-500"}`}>{s.ceOIChg >= 0 ? "+" : ""}{s.ceOIChg.toFixed(1)}%</td>
                        <td className="text-right px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.ceVol}</td>
                        <td className="text-right px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.ceIV.toFixed(1)}</td>
                        <td className={`text-right px-3 py-2.5 text-xs font-bold tabular-nums border-r border-border ${s.ceChg >= 0 ? "text-emerald-600" : "text-red-500"}`}>{s.ceLTP.toFixed(2)}</td>
                        <td className={`text-center px-3 py-2.5 text-sm tabular-nums ${s.isATM ? "font-black text-burgundy" : "font-bold text-foreground"}`}>{s.strike.toLocaleString("en-IN")}</td>
                        <td className={`text-left px-3 py-2.5 text-xs font-bold tabular-nums border-l border-border ${s.peChg >= 0 ? "text-emerald-600" : "text-red-500"}`}>{s.peLTP.toFixed(2)}</td>
                        <td className="text-left px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.peIV.toFixed(1)}</td>
                        <td className="text-left px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.peVol}</td>
                        <td className={`text-left px-3 py-2.5 text-xs font-semibold tabular-nums ${s.peOIChg >= 0 ? "text-emerald-600" : "text-red-500"}`}>{s.peOIChg >= 0 ? "+" : ""}{s.peOIChg.toFixed(1)}%</td>
                        <td className="text-left px-3 py-2.5 text-xs text-muted-foreground tabular-nums">{s.peOI}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "Open Interest" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5 text-center">
                  <div className="text-[11px] font-semibold text-muted-foreground mb-1.5">Total Call OI</div>
                  <div className="text-xl font-black text-emerald-600 tabular-nums">{d.totalCallOI}</div>
                </div>
                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5 text-center">
                  <div className="text-[11px] font-semibold text-muted-foreground mb-1.5">Total Put OI</div>
                  <div className="text-xl font-black text-red-500 tabular-nums">{d.totalPutOI}</div>
                </div>
                <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5 text-center">
                  <div className="text-[11px] font-semibold text-muted-foreground mb-1.5">Put-Call Ratio (PCR)</div>
                  <div className="text-xl font-black text-foreground tabular-nums">{d.pcr.toFixed(2)}</div>
                </div>
              </div>

              <div className="border border-border rounded-[8px] bg-background overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">Open Interest by Strike</h2>
                </div>
                <div className="px-4 sm:px-5 py-4 space-y-2.5">
                  {d.strikes.map(s => {
                    const ceVal = parseFloat(s.ceOI.replace(/,/g, ""))
                    const peVal = parseFloat(s.peOI.replace(/,/g, ""))
                    return (
                      <div key={s.strike} className="flex items-center gap-3">
                        <div className="w-16 text-right text-xs text-muted-foreground tabular-nums shrink-0">{s.ceOI}</div>
                        <div className="flex-1 flex items-center justify-end">
                          <div className="h-3 bg-emerald-500/70 rounded-l-[3px]" style={{ width: `${(ceVal / maxOI) * 100}%` }} />
                        </div>
                        <div className={`w-16 text-center text-xs font-bold tabular-nums shrink-0 ${s.isATM ? "text-burgundy" : "text-foreground"}`}>{s.strike}</div>
                        <div className="flex-1 flex items-center">
                          <div className="h-3 bg-red-500/70 rounded-r-[3px]" style={{ width: `${(peVal / maxOI) * 100}%` }} />
                        </div>
                        <div className="w-16 text-left text-xs text-muted-foreground tabular-nums shrink-0">{s.peOI}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {tab === "Top Contracts" && (
            <div className="border border-border rounded-[8px] bg-background overflow-hidden">
              <div className="px-4 sm:px-5 py-3 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">Top Contracts by Open Interest</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3">Contract</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">LTP</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Change %</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Volume</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-3 py-3">Open Interest</th>
                      <th className="text-right text-xs font-bold text-muted-foreground px-4 py-3">OI Change %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.topContracts.map((c, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-sm font-bold text-foreground">{c.label}</span>
                          <span className={`ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-[3px] ${c.type === "CE" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>{c.type}</span>
                        </td>
                        <td className="text-right px-3 py-3 text-sm font-bold text-foreground tabular-nums">{c.ltp.toFixed(2)}</td>
                        <td className={`text-right px-3 py-3 text-sm font-semibold tabular-nums ${c.chgPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {c.chgPct >= 0 ? "+" : ""}{c.chgPct.toFixed(2)}%
                        </td>
                        <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.volume}</td>
                        <td className="text-right px-3 py-3 text-sm text-muted-foreground tabular-nums">{c.oi}</td>
                        <td className={`text-right px-4 py-3 text-sm font-semibold tabular-nums ${c.oiChgPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {c.oiChgPct >= 0 ? "+" : ""}{c.oiChgPct.toFixed(2)}%
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

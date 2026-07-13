"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export type StockRow = {
  name: string
  symbol: string
  ltp: number
  chg: number
  volume: string
  mcap: string
  pe: number
  industryPe: number
  high52: number
  low52: number
  ret1m: number
  ret3m: number
  ret1y: number
  ret3y: number
  ret5y: number
  pb: number
  divYield: number
  roe: number
  roce: number
  eps: number
  dma50: number
  dma200: number
  rsi: number
  mtf: number
  pledge: number
}

export type StockListPageData = {
  slug: string
  crumbCategory: string   // "Market Cap" | "Sector"
  title: string
  lastUpdated: string
  description: string
  stocks: StockRow[]
}

function fmt(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function TickerAvatar({ symbol, index }: { symbol: string; index: number }) {
  const hue = (index * 47) % 360
  return (
    <div
      className="w-9 h-9 rounded-[5px] flex items-center justify-center text-[11px] font-black text-white shrink-0"
      style={{ background: `hsl(${hue}, 55%, 40%)` }}
    >
      {symbol.slice(0, 2)}
    </div>
  )
}

const RET_COLS: { key: keyof StockRow; label: string }[] = [
  { key: "ret1m", label: "1M Returns" },
  { key: "ret3m", label: "3M Returns" },
  { key: "ret1y", label: "1 Yr Returns" },
  { key: "ret3y", label: "3 Yr Returns" },
  { key: "ret5y", label: "5 Yr Returns" },
]

export function StockListPage({ data }: { data: StockListPageData }) {
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)
  const d = data

  useEffect(() => {
    const check = () => {
      const el = descRef.current
      if (el && !expanded) setIsClamped(el.scrollHeight > el.clientHeight + 1)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [d.description, expanded])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/"       className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/stocks" className="hover:text-foreground transition-colors">Stocks</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{d.crumbCategory}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{d.title}</span>
          </nav>
        </div>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">{d.title}</h1>
            <span className="text-[11px] text-muted-foreground font-medium">Last Updated on {d.lastUpdated}</span>
          </div>

          <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
            <p
              ref={descRef}
              className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-2"}`}
            >
              {d.description}
            </p>
            {isClamped && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="mt-2 flex items-center gap-1 text-xs font-bold text-burgundy hover:text-burgundy-deep transition-colors"
              >
                {expanded ? "Read Less" : "Read More"}
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────────── */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-20">
          <div className="border border-border rounded-[8px] bg-background overflow-hidden">
            <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
              <table className="w-full border-collapse" style={{ minWidth: "2250px" }}>
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="sticky left-0 z-10 bg-secondary/95 backdrop-blur-sm text-left text-xs font-bold text-muted-foreground px-4 py-3.5 min-w-[260px]">Name</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">LTP</th>
                    <th className="text-center text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]"></th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Change %</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Volume</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Market Cap (Cr.)</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">PE Ratio</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Industry PE</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">52W High</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">52W Low</th>
                    {RET_COLS.map(c => (
                      <th key={c.key} className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">{c.label}</th>
                    ))}
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">PB Ratio</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Dividend Yield</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">ROE</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">ROCE</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">EPS</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">50 DMA</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">200 DMA</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[80px]">RSI</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[80px]">MTF</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-4 py-3.5 min-w-[120px]">Margin Pledge</th>
                  </tr>
                </thead>
                <tbody>
                  {d.stocks.map((s, i) => (
                    <tr key={s.symbol} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                      <td className="sticky left-0 z-10 bg-background group-hover:bg-secondary/30 transition-colors px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <TickerAvatar symbol={s.symbol} index={i} />
                          <div className="min-w-0">
                            <Link href="/stocks" className="text-sm font-bold text-foreground hover:text-burgundy transition-colors leading-tight block truncate max-w-[190px]">
                              {s.name}
                            </Link>
                            <div className="text-xs text-muted-foreground mt-0.5">{s.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm font-bold text-foreground tabular-nums">{fmt(s.ltp)}</td>
                      <td className="text-center px-3.5 py-3">
                        <Link href="/signup/register">
                          <Button size="sm" className="h-8 px-3.5 text-xs font-bold bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px]">
                            Invest
                          </Button>
                        </Link>
                      </td>
                      <td className={`text-right px-3.5 py-3 text-sm font-bold tabular-nums ${s.chg >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {s.chg >= 0 ? "+" : ""}{s.chg.toFixed(2)}%
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.volume}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-foreground tabular-nums">₹ {s.mcap}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.pe.toFixed(2)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.industryPe.toFixed(2)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(s.high52)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(s.low52)}</td>
                      {RET_COLS.map(c => {
                        const v = s[c.key] as number
                        return (
                          <td key={c.key} className={`text-right px-3.5 py-3 text-sm font-semibold tabular-nums ${v >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {v >= 0 ? "+" : ""}{v.toFixed(2)}%
                          </td>
                        )
                      })}
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.pb.toFixed(2)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.divYield > 0 ? `${s.divYield.toFixed(2)}%` : "-"}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.roe.toFixed(2)}%</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.roce.toFixed(2)}%</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.eps.toFixed(2)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(s.dma50)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(s.dma200)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.rsi.toFixed(2)}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{s.mtf.toFixed(0)}%</td>
                      <td className="text-right px-4 py-3 text-sm text-muted-foreground tabular-nums">{s.pledge.toFixed(0)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground mt-3">
            Showing {d.stocks.length} stocks · Data shown is for illustration purposes · Scroll table horizontally for more metrics
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

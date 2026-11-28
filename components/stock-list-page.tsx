"use client"

// Stock list pages (index, sector, market-cap and group lists). Rows come from the backend's stored
// CMOTS data (GET /stocks/collections/:group/:slug, PRD M6b). Only real figures are shown: price,
// change, volume, 52-week high/low and the time of the price. Columns CMOTS doesn't provide (P/E,
// returns, ROE, RSI…) are left out rather than invented. A list that can't be built yet says so.

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { StockAvatar } from "@/components/stock-avatar"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"
import { useStockCollection, type CollectionGroup } from "@/hooks/use-stock-collection"
import { MarketDataNotice } from "@/components/market-data-notice"

export type StockListPageData = {
  slug: string
  crumbCategory: string
  title: string
  lastUpdated: string
  description: string
  /** Where the rows come from. Without it the page shows "Data coming soon". */
  source?: { group: CollectionGroup; slug: string }
}

const PAGE_SIZE = 50

const fmt = (n: number | null | undefined) => (n === null || n === undefined ? "—" : n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
function compact(n: number | null | undefined) {
  if (n === null || n === undefined) return "—"
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`
  return n.toLocaleString("en-IN")
}
const asOf = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).replace(", 12:00 am", "") : ""

/** Why a list has no rows, in words for visitors. */
const UNAVAILABLE: Record<string, string> = {
  "needs-market-cap": "This list is built from company market values, which aren't available from our data provider yet.",
  "index-members-missing": "The companies in this index are being added. Meanwhile, you can browse all stocks.",
  "index-members-not-stored": "The companies in this index are being added. Meanwhile, you can browse all stocks.",
}

export function StockListPage({ data }: { data: StockListPageData }) {
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)
  const d = data
  const [page, setPage] = useState({ slug: d.slug, n: 1 })
  const current = page.slug === d.slug ? page.n : 1
  const list = useStockCollection(d.source ?? null, current, PAGE_SIZE)

  useEffect(() => {
    const check = () => {
      const el = descRef.current
      if (el && !expanded) setIsClamped(el.scrollHeight > el.clientHeight + 1)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [d.description, expanded])

  const rows = list.data?.available ? list.data.items : []
  const latest = rows.map((r) => r.quote?.updatedAt).filter(Boolean).sort().at(-1)
  const lastUpdated = d.lastUpdated || (latest ? asOf(latest) : "")
  const unavailable = !d.source || (list.data && !list.data.available) || (list.data && list.data.total === 0)
  const message = (list.data && !list.data.available && UNAVAILABLE[list.data.reason]) || "Live prices and figures for this list will appear here shortly. Meanwhile, you can browse all stocks."
  const goTo = (n: number) => { setPage({ slug: d.slug, n }); window.scrollTo({ top: 0, behavior: "smooth" }) }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
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
            {lastUpdated && <span className="text-[11px] text-muted-foreground font-medium">Prices as of {lastUpdated}</span>}
          </div>
          <div className="border border-border rounded-[8px] bg-background p-4 sm:p-5">
            <p ref={descRef} className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>{d.description}</p>
            {isClamped && (
              <button onClick={() => setExpanded((e) => !e)} className="mt-2 flex items-center gap-1 text-xs font-bold text-burgundy hover:text-burgundy-deep transition-colors">
                {expanded ? "Read Less" : "Read More"}
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── Loading / not available ─────────────────────────────────── */}
        {d.source && !list.data && (
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-20">
            <div className="border border-border rounded-[8px] px-6 py-14 text-center text-sm text-muted-foreground">
              {list.error ? <>Unable to load stocks. <button onClick={list.retry} className="text-burgundy font-bold hover:underline">Retry</button></> : "Loading stocks…"}
            </div>
          </div>
        )}
        {unavailable && (!d.source || list.data) && (
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-20">
            <div className="border border-border rounded-[8px] bg-cream/60 px-6 py-14 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-burgundy/10 text-burgundy grid place-items-center mb-4"><Clock className="w-6 h-6" /></div>
              <h2 className="text-lg font-extrabold text-foreground">Data coming soon</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto">{message}</p>
              <Link href="/stocks" className="inline-flex items-center gap-1.5 mt-5 h-10 px-5 rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-bold transition-colors">
                Browse all stocks <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* ── Table ───────────────────────────────────────────────────── */}
        {rows.length > 0 && list.data && (
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-20">
            <div className="border border-border rounded-[8px] bg-background overflow-hidden">
              <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
                <table className="w-full border-collapse" style={{ minWidth: "980px" }}>
                  <thead>
                    <tr className="border-b border-border bg-secondary/40 text-xs font-bold text-muted-foreground">
                      <th className="sticky left-0 z-10 bg-secondary/95 backdrop-blur-sm text-left px-4 py-3.5 min-w-[260px]">Name</th>
                      <th className="text-right px-3.5 py-3.5 min-w-[110px]">LTP (₹)</th>
                      <th className="px-3.5 py-3.5 min-w-[90px]" />
                      <th className="text-right px-3.5 py-3.5 min-w-[100px]">Change %</th>
                      <th className="text-right px-3.5 py-3.5 min-w-[110px]">Volume</th>
                      <th className="text-right px-3.5 py-3.5 min-w-[110px]">52W High</th>
                      <th className="text-right px-3.5 py-3.5 min-w-[110px]">52W Low</th>
                      <th className="text-left px-3.5 py-3.5 min-w-[140px]">Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => {
                      const q = s.quote
                      return (
                        <tr key={s.slug} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                          <td className="sticky left-0 z-10 bg-background group-hover:bg-secondary/30 transition-colors px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <StockAvatar symbol={s.symbol} name={s.name} logoUrl={s.logoUrl} className="w-9 h-9" />
                              <div className="min-w-0">
                                <Link href={`/stocks/${s.slug}`} className="text-sm font-bold text-foreground hover:text-burgundy transition-colors leading-tight block truncate max-w-[190px]">{s.name}</Link>
                                <div className="text-xs text-muted-foreground mt-0.5">{s.symbol}{q?.exchange ? ` · ${q.exchange}` : ""}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right px-3.5 py-3 text-sm font-bold text-foreground tabular-nums">{q ? fmt(q.price) : <span className="text-xs font-medium text-muted-foreground">Price updating…</span>}</td>
                          <td className="text-center px-3.5 py-3">
                            <Link href={OPEN_ACCOUNT_URL}><Button size="sm" className="h-8 px-3.5 text-xs font-bold bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px]">Invest</Button></Link>
                          </td>
                          <td className={`text-right px-3.5 py-3 text-sm font-bold tabular-nums ${(q?.changePct ?? 0) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {q?.changePct === null || q?.changePct === undefined ? "—" : `${q.changePct >= 0 ? "+" : ""}${q.changePct.toFixed(2)}%`}
                          </td>
                          <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{compact(q?.volume)}</td>
                          <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(q?.high52)}</td>
                          <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{fmt(q?.low52)}</td>
                          <td className="px-3.5 py-3 text-sm text-muted-foreground">{s.sector}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
              <div>
                <p className="text-[11px] text-muted-foreground">{list.data.total.toLocaleString("en-IN")} stocks</p>
                <MarketDataNotice />
              </div>
              {list.data.totalPages > 1 && (
                <div className="flex items-center gap-2 text-xs">
                  <button disabled={current <= 1} onClick={() => goTo(current - 1)} className="h-8 px-3 rounded-[6px] border border-border font-bold disabled:opacity-40">Previous</button>
                  <span>Page {current} of {list.data.totalPages}</span>
                  <button disabled={current >= list.data.totalPages} onClick={() => goTo(current + 1)} className="h-8 px-3 rounded-[6px] border border-border font-bold disabled:opacity-40">Next</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, Star } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export type FundRow = {
  name: string
  category: string
  subCategory: string
  nav: number
  aum: string
  ret1m: number
  ret3m: number
  ret1y: number
  ret3y: number
  ret5y: number
  rating: number
  expRatio: number
  risk: string
  minSip: number
  minLumpsum: number
}

export type MutualFundListPageData = {
  slug: string
  crumbCategory: string
  title: string
  lastUpdated: string
  description: string
  funds: FundRow[]
}

const RET_COLS: { key: keyof FundRow; label: string }[] = [
  { key: "ret1m", label: "1M Returns" },
  { key: "ret3m", label: "3M Returns" },
  { key: "ret1y", label: "1 Yr Returns" },
  { key: "ret3y", label: "3 Yr Returns" },
  { key: "ret5y", label: "5 Yr Returns" },
]

function FundAvatar({ name, index }: { name: string; index: number }) {
  const hue = (index * 47) % 360
  return (
    <div
      className="w-9 h-9 rounded-[5px] flex items-center justify-center text-[11px] font-black text-white shrink-0"
      style={{ background: `hsl(${hue}, 55%, 40%)` }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export function MutualFundListPage({ data }: { data: MutualFundListPageData }) {
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
            <Link href="/"             className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mutual-funds" className="hover:text-foreground transition-colors">Mutual Funds</Link>
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
            <p ref={descRef} className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
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
              <table className="w-full border-collapse" style={{ minWidth: "1900px" }}>
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="sticky left-0 z-10 bg-secondary/95 backdrop-blur-sm text-left text-xs font-bold text-muted-foreground px-4 py-3.5 min-w-[280px]">Name</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[100px]">NAV</th>
                    <th className="text-center text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]"></th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">AUM (Cr.)</th>
                    {RET_COLS.map(c => (
                      <th key={c.key} className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[110px]">{c.label}</th>
                    ))}
                    <th className="text-center text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[90px]">Rating</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[100px]">Exp Ratio</th>
                    <th className="text-center text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[100px]">Risk</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[120px]">Min Monthly SIP</th>
                    <th className="text-right text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[110px]">Min Lumpsum</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-3.5 py-3.5 min-w-[100px]">Category</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3.5 min-w-[140px]">Sub Category</th>
                  </tr>
                </thead>
                <tbody>
                  {d.funds.map((f, i) => (
                    <tr key={f.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                      <td className="sticky left-0 z-10 bg-background group-hover:bg-secondary/30 transition-colors px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <FundAvatar name={f.name} index={i} />
                          <Link href="/mutual-funds" className="text-sm font-bold text-foreground hover:text-burgundy transition-colors leading-tight block truncate max-w-[220px]">
                            {f.name}
                          </Link>
                        </div>
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm font-bold text-foreground tabular-nums">₹{f.nav.toFixed(2)}</td>
                      <td className="text-center px-3.5 py-3">
                        <Link href="/signup/register">
                          <Button size="sm" className="h-8 px-3.5 text-xs font-bold bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px]">
                            Invest
                          </Button>
                        </Link>
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">₹{f.aum}</td>
                      {RET_COLS.map(c => {
                        const v = f[c.key] as number
                        return (
                          <td key={c.key} className={`text-right px-3.5 py-3 text-sm font-semibold tabular-nums ${v >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {v >= 0 ? "+" : ""}{v.toFixed(2)}%
                          </td>
                        )
                      })}
                      <td className="px-3.5 py-3">
                        <div className="flex items-center justify-center gap-0.5">
                          {Array.from({ length: 5 }, (_, s) => (
                            <Star key={s} className={`w-3 h-3 ${s < f.rating ? "fill-gold-deep text-gold-deep" : "text-border"}`} />
                          ))}
                        </div>
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">{f.expRatio.toFixed(2)}%</td>
                      <td className="text-center px-3.5 py-3">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-[4px] border ${
                          f.risk === "Very High" ? "bg-red-50 text-red-600 border-red-100" :
                          f.risk === "High"      ? "bg-orange-50 text-orange-600 border-orange-100" :
                          f.risk === "Moderate"  ? "bg-gold/15 text-gold-deep border-gold/25" :
                                                    "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          {f.risk}
                        </span>
                      </td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">₹{f.minSip.toLocaleString("en-IN")}</td>
                      <td className="text-right px-3.5 py-3 text-sm text-muted-foreground tabular-nums">₹{f.minLumpsum.toLocaleString("en-IN")}</td>
                      <td className="px-3.5 py-3 text-sm text-muted-foreground">{f.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{f.subCategory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground mt-3">
            Showing {d.funds.length} funds · Data shown is for illustration purposes · Scroll table horizontally for more metrics
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

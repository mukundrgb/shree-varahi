"use client"

// Equity holdings table, shared by the ETF detail page (Holdings card) and the Equity ETF
// Holdings page. Columns: Name · Market Value · Holding % · Total Shares · Sector · Price · Change.
// Market Value and Total Shares show "—" until the backend sends them.

import type { ReactNode } from "react"
import { TableRowsSkeleton } from "@/components/skeletons"
import type { EtfHolding } from "@/lib/etf/types"
import { NO_VALUE, formatPercent, formatRupees } from "@/lib/stocks/format"

const COLUMNS = ["Name", "Market Value", "Holding %", "Total Shares", "Sector", "Price", "Change"] as const
const GRID = "minmax(150px,2fr) 110px 112px 100px minmax(110px,1.1fr) 92px 72px"

const changeColor = (value: number | null) =>
  value === null ? "text-muted-foreground" : value >= 0 ? "text-profit" : "text-loss"

const formatMarketValue = (value: number | null | undefined) =>
  value === null || value === undefined ? NO_VALUE : `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`

const formatShares = (value: number | null | undefined) =>
  value === null || value === undefined ? NO_VALUE : value.toLocaleString("en-IN")

export function EtfHoldingsTable({
  holdings,
  loading = false,
  status,
  className = "",
}: {
  holdings: EtfHolding[]
  /** Shows skeleton rows while there are no holdings yet */
  loading?: boolean
  /** Message shown when there are no rows (error with retry, "no matches", …) */
  status?: ReactNode
  className?: string
}) {
  const maxWeight = Math.max(...holdings.map((h) => h.weight), 1)

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-[780px]">
        <div className="grid px-4 py-2.5 border-b border-border bg-cream/70" style={{ gridTemplateColumns: GRID }}>
          {COLUMNS.map((h, i) => (
            <div key={h} className={`text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground ${i === 0 || h === "Sector" ? "text-left" : "text-right"} ${h === "Sector" ? "pl-4" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {holdings.length === 0 && loading ? (
          <TableRowsSkeleton rows={10} columns={GRID} label="Loading holdings" />
        ) : holdings.length === 0 ? (
          <div className="py-14 text-center text-muted-foreground text-sm">{status ?? "No equity holdings data for this ETF."}</div>
        ) : (
          holdings.map((h) => (
            <div key={h.isin ?? h.name} className="grid px-4 py-3 border-b border-border/40 last:border-0 hover:bg-cream/30 transition-colors items-center" style={{ gridTemplateColumns: GRID }}>
              <div className="min-w-0 pr-3 text-sm font-extrabold text-foreground truncate" title={h.name}>{h.name}</div>
              <span className="text-right text-[13px] font-bold text-foreground tabular-nums">{formatMarketValue(h.marketValueCr)}</span>
              <span className="flex items-center justify-end gap-2">
                <span className="w-10 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <span className="block h-full bg-gold rounded-full" style={{ width: `${(h.weight / maxWeight) * 100}%` }} />
                </span>
                <span className="text-[13px] font-black text-foreground tabular-nums w-14 text-right">{h.weight.toFixed(2)}%</span>
              </span>
              <span className="text-right text-[13px] font-bold text-foreground tabular-nums">{formatShares(h.totalShares)}</span>
              <span className="pl-4 text-[12px] text-muted-foreground truncate" title={h.sector}>{h.sector || NO_VALUE}</span>
              <span className="text-right text-sm font-extrabold text-foreground tabular-nums">{h.price === null ? NO_VALUE : formatRupees(h.price)}</span>
              <span className={`text-right text-xs font-black tabular-nums ${changeColor(h.changePct)}`}>{formatPercent(h.changePct)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

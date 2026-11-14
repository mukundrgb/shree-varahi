"use client"

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import type { ChartRange, EtfChartPoint } from "@/lib/etf/types"
import { formatPrice } from "@/lib/stocks/format"

export const CHART_RANGES: ChartRange[] = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y"]

const W = 1000
const H = 300
const PAD_Y = 16

const UP = "#16a34a"
const DOWN = "#e8552f"

function formatPointTime(iso: string, range: ChartRange): string {
  const date = new Date(iso)
  if (range === "1D") return date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" })
  if (range === "1W") {
    return date.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" })
  }
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })
}

interface EtfPriceChartProps {
  points: EtfChartPoint[]
  range: ChartRange
  onRangeChange: (range: ChartRange) => void
}

/** Line chart with a hover readout of price and time, and range buttons below. */
export function EtfPriceChart({ points, range, onRangeChange }: EtfPriceChartProps) {
  const plotRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  const { path, coords, up } = useMemo(() => {
    if (points.length < 2) return { path: "", coords: [] as { x: number; y: number }[], up: true }
    const prices = points.map((p) => p.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const span = max - min || 1
    const coords = points.map((p, i) => ({
      x: (i / (points.length - 1)) * W,
      y: PAD_Y + (1 - (p.price - min) / span) * (H - PAD_Y * 2),
    }))
    return {
      path: coords.map((c, i) => `${i ? "L" : "M"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" "),
      coords,
      up: points[points.length - 1].price >= points[0].price,
    }
  }, [points])

  const color = up ? UP : DOWN
  const active = hover !== null ? points[hover] : null
  const activeCoord = hover !== null ? coords[hover] : null

  const pick = (e: PointerEvent<HTMLDivElement>) => {
    const rect = plotRef.current?.getBoundingClientRect()
    if (!rect || points.length < 2) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setHover(Math.round(ratio * (points.length - 1)))
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    setHover((h) => {
      const current = h ?? points.length - 1
      return Math.min(points.length - 1, Math.max(0, current + (e.key === "ArrowRight" ? 1 : -1)))
    })
  }

  // Keep the readout inside the chart near the edges.
  const leftPct = activeCoord ? (activeCoord.x / W) * 100 : 0
  const readoutAlign = leftPct < 12 ? "translate-x-0" : leftPct > 88 ? "-translate-x-full" : "-translate-x-1/2"

  return (
    <div>
      {/* Readout of the hovered point; empty (but keeps its height) when not hovering */}
      <div className="relative h-6 mb-1">
        {active && activeCoord && (
          <div className={`absolute top-0 whitespace-nowrap text-[12px] text-muted-foreground ${readoutAlign}`} style={{ left: `${leftPct}%` }}>
            <span className="font-black text-foreground tabular-nums">₹{formatPrice(active.price)}</span>
            <span className="mx-1.5 text-border">|</span>
            {formatPointTime(active.time, range)}
          </div>
        )}
      </div>

      {points.length < 2 ? (
        <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">Chart data not available</div>
      ) : (
        <div
          ref={plotRef}
          role="img"
          aria-label={`Price chart for ${range}. Use the left and right arrow keys to read values.`}
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setHover(null)}
          onKeyDown={onKey}
          onBlur={() => setHover(null)}
          className="relative h-[220px] sm:h-[260px] touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded-[4px]"
        >
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
            <line x1="0" x2={W} y1="1" y2="1" stroke="currentColor" className="text-border" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            <line x1="0" x2={W} y1={H - 1} y2={H - 1} stroke="currentColor" className="text-border" vectorEffect="non-scaling-stroke" />
            {activeCoord && (
              <line x1={activeCoord.x} x2={activeCoord.x} y1="0" y2={H} stroke="currentColor" className="text-border" vectorEffect="non-scaling-stroke" />
            )}
            <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* Marker in HTML so it stays round when the SVG stretches */}
          {activeCoord && (
            <span
              className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 border-white shadow pointer-events-none"
              style={{ left: `${(activeCoord.x / W) * 100}%`, top: `${(activeCoord.y / H) * 100}%`, background: color }}
            />
          )}
        </div>
      )}

      {/* Range buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-5" role="group" aria-label="Chart range">
        {CHART_RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => { onRangeChange(r); setHover(null) }}
            aria-pressed={r === range}
            className={`min-w-[52px] px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-all duration-150 ${
              r === range
                ? "bg-secondary text-foreground border-foreground/60"
                : "bg-white text-muted-foreground border-border hover:border-foreground/25 hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}

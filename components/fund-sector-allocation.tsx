"use client"

// Fund detail page: Sector Allocation card.
//   Donut: the 7 biggest sectors, then "Other sectors" (the rest added up), then "Cash & Others" (whatever the
//   sector list doesn't cover, so the ring always reads as the whole portfolio).
//   Beside it: the same slices as a name / bar / figure list, so values are compared on bars, not angles.
//   "View all sectors" opens every sector sorted by weight. Hovering a slice or a row highlights both.
// Colors: 7 fixed categorical slots (checked with the dataviz palette validator; the one close pair is
// separated by the 2px gaps and the labelled list), then two neutrals for the folded slices.

import { useMemo, useState } from "react"
import { ChevronDown, PieChart as PieIcon } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { sectorLabel, type SectorDetail } from "@/lib/mutual-funds/sector-allocation"

const TOP_N = 7
const SLOT_COLORS = ["#c42b3a", "#eda100", "#2a78d6", "#008300", "#e87ba4", "#1baf7a", "#6250d6"]
const OTHER_SECTORS_COLOR = "#a8a29e"
const UNCLASSIFIED_COLOR = "#e7e5e4"

interface Slice { key: string; name: string; value: number; color: string; note?: string }

const pct = (v: number) => `${v < 0.01 ? "<0.01" : v.toFixed(2)}%`

export function FundSectorAllocation({ sectors, card }: { sectors: SectorDetail[]; card: string }) {
  const [active, setActive] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const { sorted, slices, total } = useMemo(() => {
    const sorted = sectors
      .filter((s) => Number.isFinite(s.Percentage) && s.Percentage > 0)
      .map((s) => ({ id: s.SectorId, name: sectorLabel(s.SectorName), value: s.Percentage }))
      .sort((a, b) => b.value - a.value)
    const total = sorted.reduce((sum, s) => sum + s.value, 0)
    const top = sorted.slice(0, TOP_N)
    const rest = sorted.slice(TOP_N)
    const restSum = rest.reduce((sum, s) => sum + s.value, 0)
    const unclassified = Math.max(0, 100 - total)

    const slices: Slice[] = top.map((s, i) => ({ key: `s${s.id}`, name: s.name, value: s.value, color: SLOT_COLORS[i] }))
    if (rest.length) slices.push({ key: "other", name: `Other sectors (${rest.length})`, value: restSum, color: OTHER_SECTORS_COLOR })
    if (unclassified >= 0.05) {
      slices.push({
        key: "unclassified", name: "Cash & Others", value: unclassified, color: UNCLASSIFIED_COLOR,
        note: "Part of the portfolio not assigned to a sector, such as cash, debt or other holdings.",
      })
    }
    return { sorted, slices, total }
  }, [sectors])

  if (!sorted.length) return null

  const focus = slices.find((s) => s.key === active) ?? slices[0]
  const maxSlice = Math.max(...slices.map((s) => s.value))
  const maxSector = sorted[0].value

  return (
    <div className={card}>
      <div className="px-5 py-4 border-b border-border/60 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-foreground">Sector Allocation</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Share of the portfolio invested in each sector · {sorted.length} sectors
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gold-deep bg-gold/10 border border-gold/25 rounded-full px-2.5 py-1 shrink-0">
          <PieIcon className="w-3 h-3" /> Top sector: {sorted[0].name}
        </span>
      </div>

      <div className="p-5 grid md:grid-cols-[230px_minmax(0,1fr)] gap-6 md:gap-8 items-center">
        {/* Donut with the focused slice in the middle */}
        <div className="relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] mx-auto" onMouseLeave={() => setActive(null)}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                innerRadius="64%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                stroke="#ffffff"
                strokeWidth={2}
                isAnimationActive={false}
                onMouseEnter={(_, i) => setActive(slices[i]?.key ?? null)}
              >
                {slices.map((s) => (
                  <Cell
                    key={s.key}
                    fill={s.color}
                    opacity={active && active !== s.key ? 0.35 : 1}
                    style={{ transition: "opacity 150ms", cursor: "pointer", outline: "none" }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active: on, payload }) => {
                  const s = on && (payload?.[0]?.payload as Slice | undefined)
                  if (!s) return null
                  return (
                    <div className="bg-white border border-border rounded-[6px] shadow-md px-3 py-2 max-w-[220px]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
                        <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: s.color }} />{s.name}
                      </div>
                      <div className="text-xs font-black text-foreground tabular-nums mt-0.5">{pct(s.value)}</div>
                      {s.note && <div className="text-[10px] text-muted-foreground leading-snug mt-1">{s.note}</div>}
                    </div>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-12">
            <span className="text-[22px] sm:text-2xl font-black text-foreground tabular-nums leading-none">{pct(focus.value)}</span>
            <span className="text-[11px] font-semibold text-muted-foreground leading-tight mt-1.5 line-clamp-2">{focus.name}</span>
          </div>
        </div>

        {/* The same slices as a list: swatch, name, bar, figure */}
        <ul className="space-y-1" aria-label="Sector allocation">
          {slices.map((s) => {
            const dim = active && active !== s.key
            return (
              <li
                key={s.key}
                onMouseEnter={() => setActive(s.key)}
                onMouseLeave={() => setActive(null)}
                title={s.note}
                className={`grid grid-cols-[minmax(0,1fr)_64px] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_64px] items-center gap-x-3 gap-y-1 rounded-[6px] px-2 py-1.5 transition-colors ${
                  active === s.key ? "bg-cream/70" : ""
                } ${dim ? "opacity-60" : ""}`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-[3px] shrink-0 ring-1 ring-black/5" style={{ background: s.color }} />
                  <span className="text-[12.5px] font-semibold text-foreground truncate">{s.name}</span>
                </span>
                <span className="order-3 sm:order-none col-span-2 sm:col-span-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <span className="block h-full rounded-full" style={{ width: `${(s.value / maxSlice) * 100}%`, background: s.color }} />
                </span>
                <span className="text-[12.5px] font-black text-foreground tabular-nums text-right">{pct(s.value)}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Every sector, sorted by weight */}
      <div className="border-t border-border/60">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="w-full flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-black text-burgundy hover:bg-cream/50 transition-colors"
        >
          {showAll ? "Hide sector list" : `View all ${sorted.length} sectors`}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
        {showAll && (
          <div className="px-5 pb-5">
            <ol className="grid sm:grid-cols-2 gap-x-8">
              {sorted.map((s, i) => (
                <li key={s.id} className="grid grid-cols-[22px_minmax(0,1fr)_60px] items-center gap-2 py-2 border-b border-border/40">
                  <span className="text-[10px] font-bold text-muted-foreground tabular-nums">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-foreground truncate" title={s.name}>{s.name}</span>
                    <span className="block h-1 rounded-full bg-secondary overflow-hidden mt-1">
                      <span className="block h-full rounded-full bg-burgundy/70" style={{ width: `${Math.max(1, (s.value / maxSector) * 100)}%` }} />
                    </span>
                  </span>
                  <span className="text-xs font-black text-foreground tabular-nums text-right">{pct(s.value)}</span>
                </li>
              ))}
            </ol>
            {100 - total >= 0.05 && (
              <p className="text-[10px] text-muted-foreground mt-3">
                Sectors add up to {pct(total)} of the portfolio. The rest is shown as Cash &amp; Others.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

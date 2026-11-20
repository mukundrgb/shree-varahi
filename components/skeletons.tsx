// Loading placeholders shaped like the content they stand in for, so the page doesn't jump
// when data arrives. One pulse style everywhere; screen readers get a single "Loading" label.

import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

/** One grey block. */
export function Bone({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div aria-hidden className={cn("rounded-[5px] bg-skeleton", className)} style={style} />
}

/** Wraps placeholders: pulses, hides them from screen readers, announces "Loading". */
export function SkeletonGroup({ label = "Loading", className, children }: { label?: string; className?: string; children: ReactNode }) {
  return (
    <div role="status" aria-label={label} aria-busy="true" className={cn("skeleton-pulse", className)}>
      {children}
      <span className="sr-only">{label}…</span>
    </div>
  )
}

/**
 * Table rows matching a CSS-grid table. `columns` is the table's own grid template, so
 * placeholder cells line up with the real header. The first cell gets a two-line name
 * (plus an avatar when `avatar` is set); numeric cells are right-aligned bars.
 */
export function TableRowsSkeleton({
  rows = 8,
  columns,
  avatar = false,
  className,
  label = "Loading rows",
  /** Cells after the name; defaults to the number of columns minus one. */
  cells,
}: {
  rows?: number
  columns: string
  avatar?: boolean
  className?: string
  label?: string
  cells?: number
}) {
  const count = cells ?? Math.max(0, columns.trim().split(/\s+(?![^(]*\))/).length - 1)
  return (
    <SkeletonGroup label={label}>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className={cn("grid items-center gap-x-2 px-4 py-3.5 border-b border-border/40 last:border-0", className)}
          style={{ gridTemplateColumns: columns }}>
          <div className="flex items-center gap-3 min-w-0">
            {avatar && <Bone className="w-9 h-9 shrink-0 rounded-[8px]" />}
            <div className="flex-1 min-w-0 space-y-1.5">
              <Bone className="h-3.5" style={{ width: `${55 + ((r * 17) % 35)}%` }} />
              <Bone className="h-2.5 w-1/3" />
            </div>
          </div>
          {Array.from({ length: count }, (_, c) => (
            <div key={c} className="flex justify-end">
              <Bone className="h-3" style={{ width: `${48 + ((r + c) * 13) % 40}%` }} />
            </div>
          ))}
        </div>
      ))}
    </SkeletonGroup>
  )
}

/** Simple stacked list rows (mobile tables, menus). */
export function ListSkeleton({ rows = 6, className, label = "Loading" }: { rows?: number; className?: string; label?: string }) {
  return (
    <SkeletonGroup label={label} className={cn("space-y-2", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <Bone className="w-7 h-7 rounded-full shrink-0" />
          <Bone className="h-3" style={{ width: `${50 + ((i * 19) % 40)}%` }} />
        </div>
      ))}
    </SkeletonGroup>
  )
}

/** A row of pill-shaped filter chips. */
export function ChipsSkeleton({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <SkeletonGroup label="Loading filters" className={cn("flex flex-wrap gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => <Bone key={i} className="h-8 rounded-full" style={{ width: 72 + ((i * 23) % 50) }} />)}
    </SkeletonGroup>
  )
}

/** Grid of cards (categories, AMCs). */
export function CardGridSkeleton({ count = 10, className, cardClassName = "h-28" }: { count?: number; className?: string; cardClassName?: string }) {
  return (
    <SkeletonGroup label="Loading" className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={cn("rounded-[8px] border border-border bg-white p-4 space-y-3", cardClassName)}>
          <Bone className="w-9 h-9 rounded-[6px]" />
          <Bone className="h-3.5 w-3/4" />
          <Bone className="h-2.5 w-1/3" />
        </div>
      ))}
    </SkeletonGroup>
  )
}

/** A chart area: axis ticks and a filled band. */
export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonGroup label="Loading chart" className={cn("relative h-[260px] px-4 py-4", className)}>
      <div className="absolute inset-x-4 top-4 bottom-8 flex flex-col justify-between">
        {Array.from({ length: 5 }, (_, i) => <div key={i} className="h-px bg-skeleton" />)}
      </div>
      <Bone className="absolute left-4 right-4 bottom-8 h-1/2 rounded-[8px] bg-skeleton/60" />
      <div className="absolute inset-x-4 bottom-2 flex justify-between">
        {Array.from({ length: 6 }, (_, i) => <Bone key={i} className="h-2 w-8" />)}
      </div>
    </SkeletonGroup>
  )
}

/** Whole detail page (stock / ETF / fund / F&O): breadcrumb, title block, chart card, side cards. */
export function DetailPageSkeleton({ label = "Loading details" }: { label?: string }) {
  return (
    <SkeletonGroup label={label} className="w-full">
      <div className="bg-cream border-b border-border/40 pt-24 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Bone className="h-2.5 w-48 mb-5" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-start gap-3">
              <Bone className="w-12 h-12 rounded-[10px] shrink-0" />
              <div className="space-y-2.5">
                <Bone className="h-7 w-64 sm:w-96 max-w-[70vw]" />
                <Bone className="h-3 w-32" />
                <div className="flex gap-2"><Bone className="h-5 w-20" /><Bone className="h-5 w-16" /><Bone className="h-5 w-24" /></div>
              </div>
            </div>
            <div className="space-y-2 lg:items-end flex flex-col">
              <Bone className="h-2.5 w-20" />
              <Bone className="h-9 w-44" />
              <Bone className="h-2.5 w-28" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8 grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">
        <div className="space-y-5 min-w-0">
          <div className="rounded-[10px] border border-border bg-white">
            <div className="px-5 py-4 border-b border-border/60 flex justify-between"><Bone className="h-4 w-36" /><Bone className="h-7 w-32" /></div>
            <ChartSkeleton />
          </div>
          <div className="rounded-[10px] border border-border bg-white p-5 space-y-3">
            <Bone className="h-4 w-40" />
            {Array.from({ length: 4 }, (_, i) => <Bone key={i} className="h-3" style={{ width: `${90 - i * 12}%` }} />)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[10px] border border-border bg-white p-4 space-y-3">
            <Bone className="h-3.5 w-28" />
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex justify-between"><Bone className="h-2.5 w-24" /><Bone className="h-2.5 w-16" /></div>
            ))}
          </div>
          <Bone className="h-44 rounded-[10px]" />
        </div>
      </div>
    </SkeletonGroup>
  )
}

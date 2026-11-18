"use client"

// Category filter for the Find Your Fund table (no dropdown):
//   row 1 — "All" + the main categories (Reedos asset classes), one at a time
//   row 2 — once a main category is picked: "All <main>" + its sub-categories in a
//           horizontal scroll row; several sub-categories can be picked together.
// Every category the API lists is shown; ones with no funds yet are greyed out.

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChipsSkeleton } from "@/components/skeletons"

export interface MainCategory {
  /** As Reedos sends it, e.g. "Equity Schemes" */
  name: string
  /** e.g. "Equity" */
  label: string
  count: number
  categories: { name: string; count: number }[]
}

/** null main = all funds; empty subs = the whole main category. */
export interface CategoryPick {
  main: string | null
  subs: string[]
}

export const NO_CATEGORY: CategoryPick = { main: null, subs: [] }

/** The query the backend expects: whole main categories or single sub-categories. */
export const categoryQuery = (pick: CategoryPick) => ({
  assetClass: pick.main && pick.subs.length === 0 ? [pick.main] : [],
  category: pick.subs,
})

const chip = (active: boolean, disabled = false) =>
  `shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition-all duration-200 ${
    active
      ? "bg-burgundy text-white border-burgundy"
      : disabled
        ? "bg-white text-muted-foreground/40 border-border/60 cursor-not-allowed"
        : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
  }`

const countCls = (active: boolean) => `text-[10px] font-semibold tabular-nums ${active ? "text-white/75" : "text-muted-foreground/70"}`

export function FundCategoryFilter({
  mains,
  value,
  onChange,
}: {
  mains: MainCategory[]
  value: CategoryPick
  onChange: (next: CategoryPick) => void
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const main = mains.find((m) => m.name === value.main) ?? null

  const pickMain = (name: string | null) => onChange({ main: name, subs: [] })
  const toggleSub = (sub: string) => {
    if (!main) return
    const subs = value.subs.includes(sub) ? value.subs.filter((s) => s !== sub) : [...value.subs, sub]
    // Every sub-category picked = the whole main category.
    const all = main.categories.filter((c) => c.count > 0).every((c) => subs.includes(c.name))
    onChange({ main: main.name, subs: all ? [] : subs })
  }
  const scrollBy = (dx: number) => scroller.current?.scrollBy({ left: dx, behavior: "smooth" })

  if (mains.length === 0) return <ChipsSkeleton count={6} />

  return (
    <div className="space-y-2.5 min-w-0">
      {/* Main categories */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }} role="radiogroup" aria-label="Main category">
        <button type="button" role="radio" aria-checked={!value.main} onClick={() => pickMain(null)} className={chip(!value.main)}>
          All Categories
        </button>
        {mains.map((m) => {
          const active = value.main === m.name
          return (
            <button key={m.name} type="button" role="radio" aria-checked={active} onClick={() => pickMain(m.name)} className={chip(active)}>
              {m.label} <span className={countCls(active)}>{m.count.toLocaleString("en-IN")}</span>
            </button>
          )
        })}
      </div>

      {/* Sub-categories of the picked main category — horizontal scroll */}
      {main && (
        <div className="flex items-center gap-1.5 min-w-0">
          <button type="button" onClick={() => scrollBy(-240)} aria-label="Scroll sub-categories left"
            className="hidden sm:flex shrink-0 w-7 h-7 rounded-full border border-border bg-white items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div ref={scroller} className="flex-1 min-w-0 flex gap-1.5 overflow-x-auto scroll-smooth py-0.5" style={{ scrollbarWidth: "thin" }}
            role="group" aria-label={`${main.label} sub-categories`}>
            <button type="button" aria-pressed={value.subs.length === 0} onClick={() => pickMain(main.name)}
              className={chip(value.subs.length === 0)}>
              All {main.label} <span className={countCls(value.subs.length === 0)}>{main.count.toLocaleString("en-IN")}</span>
            </button>
            {main.categories.map((c) => {
              const active = value.subs.includes(c.name)
              const empty = c.count === 0
              return (
                <button key={c.name} type="button" aria-pressed={active} disabled={empty && !active}
                  title={empty ? "No funds in this category yet" : undefined}
                  onClick={() => toggleSub(c.name)} className={chip(active, empty)}>
                  {c.name} <span className={countCls(active)}>{c.count.toLocaleString("en-IN")}</span>
                </button>
              )
            })}
          </div>
          <button type="button" onClick={() => scrollBy(240)} aria-label="Scroll sub-categories right"
            className="hidden sm:flex shrink-0 w-7 h-7 rounded-full border border-border bg-white items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

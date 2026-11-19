"use client"

// Category filter for the Find Your Fund table (no dropdown):
//   row 1 — "All" + the main categories (Reedos asset classes); several can be picked together
//   row 2 — once any main category is picked: for each one, "All <main>" + its sub-categories,
//           in one horizontal row that scrolls by itself and stops while the cursor is over it
//           (or while it has keyboard focus / is being touched). Several sub-categories can be picked.
// Every category the API lists is shown; ones with no funds yet are greyed out.

import { Fragment, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { ChipsSkeleton } from "@/components/skeletons"

export interface MainCategory {
  /** As Reedos sends it, e.g. "Equity Schemes" */
  name: string
  /** e.g. "Equity" */
  label: string
  count: number
  categories: { name: string; count: number }[]
}

/**
 * Picked main categories (keys, in the order picked) → their picked sub-categories.
 * An empty list = the whole main category. No keys = all funds.
 */
export type CategoryPick = Record<string, string[]>

export const NO_CATEGORY: CategoryPick = {}

export const hasCategory = (pick: CategoryPick) => Object.keys(pick).length > 0

/** The query the backend expects: whole main categories or single sub-categories. */
export const categoryQuery = (pick: CategoryPick) => ({
  assetClass: Object.keys(pick).filter((main) => pick[main].length === 0),
  category: Object.values(pick).flat(),
})

/** Auto-scroll speed of the sub-category row, px per second. */
const AUTO_SCROLL_SPEED = 30
/** After a touch, wait this long before scrolling again, ms. */
const TOUCH_RESUME_MS = 2500
/** After a main category is picked, show its sub-categories from the start for this long, ms. */
const JUMP_HOLD_MS = 1500

const chip = (active: boolean, disabled = false) =>
  `shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition-all duration-200 ${
    active
      ? "bg-burgundy text-white border-burgundy"
      : disabled
        ? "bg-white text-muted-foreground/40 border-border/60 cursor-not-allowed"
        : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
  }`

const countCls = (active: boolean) => `text-[10px] font-semibold tabular-nums ${active ? "text-white/75" : "text-muted-foreground/70"}`

/**
 * Scrolls `ref` back and forth on its own while it overflows. Returns handlers that pause it
 * while the cursor is over the row, it has focus, or it is being touched.
 */
function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, active: boolean) {
  const hovered = useRef(false)
  const focused = useRef(false)
  const touched = useRef(false)
  const touchTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pos = useRef(0)
  const dir = useRef(1)
  /** No auto-scroll before this time (performance.now()), e.g. right after a jump. */
  const holdUntil = useRef(0)

  useEffect(() => {
    if (!active) return
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    let last = 0
    pos.current = ref.current?.scrollLeft ?? 0
    const tick = (now: number) => {
      const el = ref.current
      const dt = last ? Math.min(now - last, 100) / 1000 : 0
      last = now
      if (el) {
        const max = el.scrollWidth - el.clientWidth
        // Follow any manual scroll (arrows, wheel, swipe) so we carry on from there.
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft
        if (max > 0 && now >= holdUntil.current && !hovered.current && !focused.current && !touched.current) {
          pos.current += dir.current * AUTO_SCROLL_SPEED * dt
          if (pos.current >= max) { pos.current = max; dir.current = -1 }
          else if (pos.current <= 0) { pos.current = 0; dir.current = 1 }
          el.scrollLeft = pos.current
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [ref, active])

  useEffect(() => () => clearTimeout(touchTimer.current), [])

  /** Show the row from `left`, hold there briefly, then carry on scrolling forwards. */
  const jumpTo = (left: number) => {
    const el = ref.current
    if (!el) return
    const target = Math.max(0, Math.min(left, el.scrollWidth - el.clientWidth))
    el.scrollLeft = target
    pos.current = target
    dir.current = 1
    holdUntil.current = performance.now() + JUMP_HOLD_MS
  }

  return { jumpTo, handlers: {
    onMouseEnter: () => { hovered.current = true },
    onMouseLeave: () => { hovered.current = false },
    // Only keyboard focus pauses it: a clicked chip keeps focus, which would otherwise stop the row for good.
    onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
      focused.current = (e.target as HTMLElement).matches?.(":focus-visible") ?? false
    },
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) focused.current = false
    },
    onTouchStart: () => { clearTimeout(touchTimer.current); touched.current = true },
    onTouchEnd: () => {
      clearTimeout(touchTimer.current)
      touchTimer.current = setTimeout(() => { touched.current = false }, TOUCH_RESUME_MS)
    },
  } }
}

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
  // Picked main categories, in the order they were picked.
  const picked = Object.keys(value)
    .map((name) => mains.find((m) => m.name === name))
    .filter((m): m is MainCategory => !!m)
  const { jumpTo, handlers: pause } = useAutoScroll(scroller, picked.length > 0)

  // A newly picked main category: bring its sub-categories ("All <main>" first) to the start of the row.
  const pickedKey = picked.map((m) => m.name).join("\u0000")
  const prevPicked = useRef<string[]>([])
  useEffect(() => {
    const names = pickedKey ? pickedKey.split("\u0000") : []
    const added = names.find((n) => !prevPicked.current.includes(n))
    prevPicked.current = names
    const row = scroller.current
    if (!added || !row) return
    const start = [...row.querySelectorAll<HTMLElement>("[data-main]")].find((el) => el.dataset.main === added)
    if (start) jumpTo(row.scrollLeft + start.getBoundingClientRect().left - row.getBoundingClientRect().left)
  }, [pickedKey]) // jumpTo only reads refs

  const toggleMain = (name: string) => {
    if (name in value) {
      const { [name]: _removed, ...rest } = value
      onChange(rest)
    } else {
      onChange({ ...value, [name]: [] })
    }
  }
  const wholeMain = (name: string) => onChange({ ...value, [name]: [] })
  const toggleSub = (main: MainCategory, sub: string) => {
    const current = value[main.name] ?? []
    const subs = current.includes(sub) ? current.filter((s) => s !== sub) : [...current, sub]
    // Every sub-category picked = the whole main category.
    const all = main.categories.filter((c) => c.count > 0).every((c) => subs.includes(c.name))
    onChange({ ...value, [main.name]: all ? [] : subs })
  }
  const scrollBy = (dx: number) => scroller.current?.scrollBy({ left: dx, behavior: "smooth" })

  if (mains.length === 0) return <ChipsSkeleton count={6} />

  return (
    <div className="space-y-2.5 min-w-0">
      {/* Main categories — several can be picked */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }} role="group" aria-label="Main categories">
        <button type="button" aria-pressed={picked.length === 0} onClick={() => onChange(NO_CATEGORY)} className={chip(picked.length === 0)}>
          All Categories
        </button>
        {mains.map((m) => {
          const active = m.name in value
          return (
            <button key={m.name} type="button" aria-pressed={active} onClick={() => toggleMain(m.name)} className={chip(active)}>
              {m.label} <span className={countCls(active)}>{m.count.toLocaleString("en-IN")}</span>
            </button>
          )
        })}
      </div>

      {/* Sub-categories of the picked main categories — auto-scrolling row, pauses on hover */}
      {picked.length > 0 && (
        <div className="flex items-center gap-1.5 min-w-0" {...pause}>
          <button type="button" onClick={() => scrollBy(-240)} aria-label="Scroll sub-categories left"
            className="hidden sm:flex shrink-0 w-7 h-7 rounded-full border border-border bg-white items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div ref={scroller} className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto py-0.5" style={{ scrollbarWidth: "thin" }}
            role="group" aria-label="Sub-categories">
            {picked.map((main, i) => {
              const subs = value[main.name] ?? []
              const whole = subs.length === 0
              return (
                <Fragment key={main.name}>
                  {i > 0 && <span className="shrink-0 w-px h-5 bg-border mx-1" aria-hidden />}
                  <button type="button" data-main={main.name} aria-pressed={whole} onClick={() => wholeMain(main.name)} className={chip(whole)}>
                    All {main.label} <span className={countCls(whole)}>{main.count.toLocaleString("en-IN")}</span>
                  </button>
                  {main.categories.map((c) => {
                    const active = subs.includes(c.name)
                    const empty = c.count === 0
                    return (
                      <button key={c.name} type="button" aria-pressed={active} disabled={empty && !active}
                        title={empty ? "No funds in this category yet" : undefined}
                        onClick={() => toggleSub(main, c.name)} className={chip(active, empty)}>
                        {c.name} <span className={countCls(active)}>{c.count.toLocaleString("en-IN")}</span>
                      </button>
                    )
                  })}
                </Fragment>
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

/**
 * The picked categories as removable chips (shown next to "Clear filters"): a whole main
 * category shows as one chip ("Equity"); otherwise each picked sub-category gets its own.
 */
export function SelectedCategoryChips({
  mains,
  value,
  onChange,
}: {
  mains: MainCategory[]
  value: CategoryPick
  onChange: (next: CategoryPick) => void
}) {
  const without = (main: string) => {
    const { [main]: _removed, ...rest } = value
    return rest
  }
  const chips = Object.entries(value).flatMap(([main, subs]) => {
    const label = mains.find((m) => m.name === main)?.label ?? main
    if (subs.length === 0) return [{ key: main, text: label, remove: () => onChange(without(main)) }]
    return subs.map((sub) => ({
      key: `${main}/${sub}`,
      text: sub,
      // Removing the last picked sub-category drops the main category too.
      remove: () => {
        const rest = subs.filter((s) => s !== sub)
        onChange(rest.length ? { ...value, [main]: rest } : without(main))
      },
    }))
  })
  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Selected categories">
      {chips.map((c) => (
        <span key={c.key} className="inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-full text-[11px] font-bold bg-burgundy/5 text-burgundy border border-burgundy/30">
          {c.text}
          <button type="button" onClick={c.remove} aria-label={`Remove ${c.text}`}
            className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-burgundy/10">
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}
    </div>
  )
}

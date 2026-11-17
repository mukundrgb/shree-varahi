"use client"

// "Categories" dropdown for the Find Your Fund table.
// Level 1 lists the main categories (Reedos asset classes); each opens its sub-categories,
// headed by an "All" option that selects every fund in that main category.
// Choices are a draft until Apply; closing the panel without Apply discards them.

import { useState } from "react"
import { Check, ChevronDown, ChevronLeft, ChevronRight, Minus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface MainCategory {
  /** As Reedos sends it, e.g. "Equity Schemes" */
  name: string
  /** e.g. "Equity" */
  label: string
  count: number
  categories: { name: string; count: number }[]
}

/**
 * `assetClasses` = main categories picked as a whole ("All").
 * `categories`   = single sub-categories, only for main categories not picked as a whole.
 */
export interface CategorySelection {
  assetClasses: string[]
  categories: string[]
}

export const EMPTY_CATEGORY_SELECTION: CategorySelection = { assetClasses: [], categories: [] }

export const selectionSize = (s: CategorySelection) => s.assetClasses.length + s.categories.length

type CheckState = boolean | "some"

function CheckBox({ state }: { state: CheckState }) {
  const on = state !== false
  return (
    <span
      aria-hidden
      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
        on ? "bg-burgundy border-burgundy text-white" : "bg-white border-border"
      }`}
    >
      {state === true && <Check className="w-3 h-3" strokeWidth={3} />}
      {state === "some" && <Minus className="w-3 h-3" strokeWidth={3} />}
    </span>
  )
}

/** One main category's state within a selection. */
function stateOf(main: MainCategory, s: CategorySelection): CheckState {
  if (s.assetClasses.includes(main.name)) return true
  return main.categories.some((c) => s.categories.includes(c.name)) ? "some" : false
}

const subNames = (main: MainCategory) => main.categories.map((c) => c.name)

/** Picking or dropping a whole main category. */
function toggleMain(main: MainCategory, s: CategorySelection): CategorySelection {
  const subs = subNames(main)
  const categories = s.categories.filter((c) => !subs.includes(c))
  return s.assetClasses.includes(main.name)
    ? { assetClasses: s.assetClasses.filter((a) => a !== main.name), categories }
    : { assetClasses: [...s.assetClasses, main.name], categories }
}

/** Picking or dropping one sub-category. Every sub picked = the whole main category. */
function toggleSub(main: MainCategory, sub: string, s: CategorySelection): CategorySelection {
  const subs = subNames(main)
  const whole = s.assetClasses.includes(main.name)
  const picked = whole ? subs : subs.filter((c) => s.categories.includes(c))
  const next = picked.includes(sub) ? picked.filter((c) => c !== sub) : [...picked, sub]

  const assetClasses = s.assetClasses.filter((a) => a !== main.name)
  const others = s.categories.filter((c) => !subs.includes(c))
  return next.length === subs.length
    ? { assetClasses: [...assetClasses, main.name], categories: others }
    : { assetClasses, categories: [...others, ...next] }
}

export function FundCategoryFilter({
  mains,
  value,
  onApply,
}: {
  mains: MainCategory[]
  value: CategorySelection
  onApply: (next: CategorySelection) => void
}) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)
  /** The main category whose sub-categories are showing; null = the main list. */
  const [openMain, setOpenMain] = useState<string | null>(null)

  const onOpenChange = (next: boolean) => {
    if (next) { setDraft(value); setOpenMain(null) }
    setOpen(next)
  }

  const apply = () => { onApply(draft); setOpen(false) }
  const main = mains.find((m) => m.name === openMain) ?? null
  const active = selectionSize(value)
  const changed = JSON.stringify(draft) !== JSON.stringify(value)

  const row = "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-cream/60 transition-colors"

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`h-[38px] px-3.5 rounded-full text-[12px] font-bold border flex items-center gap-1.5 transition-all duration-200 ${
            open || active
              ? "border-burgundy/40 text-burgundy bg-burgundy/5"
              : "bg-white text-foreground border-border hover:border-burgundy/25"
          }`}
        >
          Categories
          {active > 0 && (
            <span className="min-w-4 h-4 px-1 rounded-full bg-burgundy text-white text-[9px] font-black flex items-center justify-center">
              {active}
            </span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={8} className="w-[min(320px,calc(100vw-32px))] p-0 rounded-[12px] bg-white overflow-hidden">
        {/* Header (sub-category view only) */}
        {main && (
          <button type="button" onClick={() => setOpenMain(null)}
            className="w-full flex items-center gap-2 px-4 py-3 border-b border-border/60 text-[13px] font-extrabold text-foreground hover:bg-cream/60">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            {main.label}
          </button>
        )}

        <div className="max-h-[320px] overflow-y-auto py-1.5" role="group" aria-label={main ? `${main.label} categories` : "Categories"}>
          {!main && mains.length === 0 && (
            <p className="px-4 py-6 text-center text-xs text-muted-foreground">Loading categories…</p>
          )}

          {!main && mains.map((m) => {
            const state = stateOf(m, draft)
            return (
            <div key={m.name} className="flex items-center hover:bg-cream/60 transition-colors">
              <button type="button" role="checkbox" aria-checked={state === "some" ? "mixed" : state}
                aria-label={`All ${m.label} funds`}
                onClick={() => setDraft((d) => toggleMain(m, d))} className="pl-4 pr-1 py-3">
                <CheckBox state={state} />
              </button>
              <button type="button" onClick={() => setOpenMain(m.name)}
                className="flex-1 min-w-0 flex items-center gap-2 pl-2 pr-4 py-3 text-left">
                <span className="flex-1 text-[13px] font-semibold text-foreground">{m.label}</span>
                <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">{m.count.toLocaleString("en-IN")}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
              </button>
            </div>
            )
          })}

          {main && (
            <>
              <button type="button" role="checkbox" aria-checked={draft.assetClasses.includes(main.name)}
                onClick={() => setDraft((d) => toggleMain(main, d))} className={`${row} border-b border-border/40`}>
                <CheckBox state={draft.assetClasses.includes(main.name)} />
                <span className="flex-1 text-[13px] font-bold text-foreground">All {main.label} Funds</span>
                <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">{main.count.toLocaleString("en-IN")}</span>
              </button>
              {main.categories.map((c) => {
                const on = draft.assetClasses.includes(main.name) || draft.categories.includes(c.name)
                return (
                  <button key={c.name} type="button" role="checkbox" aria-checked={on}
                    onClick={() => setDraft((d) => toggleSub(main, c.name, d))} className={row}>
                    <CheckBox state={on} />
                    <span className="flex-1 min-w-0 text-[13px] font-medium text-foreground">{c.name}</span>
                    <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">{c.count.toLocaleString("en-IN")}</span>
                  </button>
                )
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-2 p-3 border-t border-border/60">
          <button type="button" onClick={() => setDraft(EMPTY_CATEGORY_SELECTION)} disabled={selectionSize(draft) === 0}
            className="h-9 rounded-[6px] text-[12px] font-bold text-burgundy hover:bg-burgundy/5 disabled:text-muted-foreground/50 disabled:hover:bg-transparent transition-colors">
            Clear All
          </button>
          <button type="button" onClick={apply} disabled={!changed}
            className="h-9 rounded-[6px] text-[12px] font-bold bg-burgundy text-white hover:bg-burgundy-deep disabled:bg-secondary disabled:text-muted-foreground/60 transition-colors">
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** Chips naming what is picked, e.g. "All Equity", "Liquid Fund". */
export function selectionChips(mains: MainCategory[], s: CategorySelection) {
  const label = (name: string) => mains.find((m) => m.name === name)?.label ?? name.replace(/\s*Schemes$/i, "")
  return [
    ...s.assetClasses.map((name) => ({
      key: `class:${name}`,
      label: `All ${label(name)}`,
      remove: (x: CategorySelection) => ({ ...x, assetClasses: x.assetClasses.filter((a) => a !== name) }),
    })),
    ...s.categories.map((name) => ({
      key: `cat:${name}`,
      label: name,
      remove: (x: CategorySelection) => ({ ...x, categories: x.categories.filter((c) => c !== name) }),
    })),
  ]
}

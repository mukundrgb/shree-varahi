"use client"

// Smarter replacements for the browser's default form controls, in the site theme.
//
//   SmartSelect  — dropdown: popover with check marks on desktop, bottom sheet on phones.
//                  Type-to-filter appears automatically for longer lists; ↑ ↓ Enter Esc work.
//                  Works inside forms (name / required) through a hidden input.
//   SmartSearch  — search box: clear button, Esc clears, "/" focuses it (desktop hint), optional spinner.
//   FilterSheet  — phones only: a "Filters" button with an active-count badge that opens the
//                  filter panel as a bottom sheet with "Clear all" and "Show results".

import { useEffect, useId, useRef, useState } from "react"
import { Check, ChevronDown, Loader2, Search, SlidersHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"

// ── SmartSelect ─────────────────────────────────────────────────────────────

export interface SmartOption {
  value: string
  label: string
  /** Small grey text on the right (e.g. a count) */
  hint?: string
  /** Options with the same group are listed under that heading */
  group?: string
}

interface SmartSelectProps {
  /** Controlled value; leave out and use defaultValue for an uncontrolled field (e.g. in a plain form) */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: SmartOption[]
  /** Shown when no option matches `value` */
  placeholder?: string
  /** Short label before the value inside the button, e.g. "Sort" */
  prefix?: string
  /** Highlights the button (burgundy) — use when a filter is applied */
  active?: boolean
  /** Type-to-filter box; defaults to on for more than 7 options */
  searchable?: boolean
  size?: "sm" | "md"
  /** Accessible name when there is no visible label */
  ariaLabel?: string
  id?: string
  /** For use inside a <form> */
  name?: string
  required?: boolean
  className?: string
  /** Sheet / list heading on phones */
  title?: string
}

export function SmartSelect({
  value: controlled, defaultValue = "", onChange, options, placeholder = "Select…", prefix, active = false, searchable, size = "md",
  ariaLabel, id, name, required, className = "", title,
}: SmartSelectProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState(defaultValue)
  const value = controlled ?? inner
  const isMobile = useIsMobile()
  const selected = options.find((o) => o.value === value)
  const showSearch = searchable ?? options.length > 7

  const groups = options.reduce<{ name: string; items: SmartOption[] }[]>((acc, o) => {
    const g = o.group ?? ""
    const last = acc[acc.length - 1]
    if (last && last.name === g) last.items.push(o)
    else acc.push({ name: g, items: [o] })
    return acc
  }, [])

  const pick = (v: string) => { if (controlled === undefined) setInner(v); onChange?.(v); setOpen(false) }

  const sizing = size === "sm" ? "h-[34px] px-2.5 text-[11px]" : "h-10 px-3 text-sm"
  const trigger = (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={`${sizing} w-full inline-flex items-center justify-between gap-2 rounded-[5px] border font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
        active ? "bg-burgundy/5 text-burgundy border-burgundy/35" : "bg-white text-foreground border-border hover:border-burgundy/30"
      } ${className}`}
    >
      <span className="truncate text-left">
        {prefix && <span className="text-muted-foreground font-semibold mr-1">{prefix}:</span>}
        {selected ? selected.label : <span className="text-muted-foreground font-semibold">{placeholder}</span>}
      </span>
      <ChevronDown className={`w-3.5 h-3.5 shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  )

  const list = (
    <Command
      // Filter on label text, not on the value.
      filter={(itemValue, search) => (itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
    >
      {showSearch && <CommandInput placeholder="Type to filter…" className="text-[13px]" />}
      <CommandList className={isMobile ? "max-h-[60vh]" : "max-h-[300px]"}>
        <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">No matches.</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g.name || "_"} heading={g.name || undefined}>
            {g.items.map((o) => {
              const on = o.value === value
              return (
                <CommandItem
                  key={o.value}
                  value={`${o.label} ${o.value}`}
                  onSelect={() => pick(o.value)}
                  className={`${isMobile ? "py-3 text-sm" : "text-[13px]"} ${on ? "font-bold text-burgundy" : ""}`}
                >
                  <Check className={`w-3.5 h-3.5 shrink-0 ${on ? "opacity-100 text-burgundy" : "opacity-0"}`} />
                  <span className="flex-1 truncate">{o.label}</span>
                  {o.hint && <span className="text-[10px] text-muted-foreground tabular-nums">{o.hint}</span>}
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )

  // Hidden input so forms submit and validate the value. (sr-only, not display:none, so `required` still works.)
  const formInput = name ? (
    <input tabIndex={-1} aria-hidden className="sr-only" name={name} required={required} value={value} onChange={() => {}} />
  ) : null

  if (isMobile) {
    return (
      <div className="relative">
        {trigger}
        {formInput}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="pb-4">
            <DrawerTitle className="px-4 pt-2 pb-2 text-sm font-black text-foreground">{title ?? ariaLabel ?? prefix ?? placeholder}</DrawerTitle>
            <div className="px-2">{list}</div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        {formInput}
      </div>
      <PopoverContent align="start" sideOffset={6} className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0 rounded-[10px] overflow-hidden">
        {list}
      </PopoverContent>
    </Popover>
  )
}

// ── SmartSearch ─────────────────────────────────────────────────────────────

interface SmartSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
  /** Shows a spinner in place of the search icon */
  loading?: boolean
  /** Lets "/" focus this box (use for the page's main search only) */
  shortcut?: boolean
  size?: "sm" | "md"
  className?: string
  inputClassName?: string
}

export function SmartSearch({
  value, onChange, placeholder = "Search…", ariaLabel, loading = false, shortcut = false, size = "md", className = "", inputClassName = "",
}: SmartSearchProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const hintId = useId()

  useEffect(() => {
    if (!shortcut) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); ref.current?.focus() }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [shortcut])

  const h = size === "sm" ? "h-[34px] text-sm" : "h-10 text-sm"
  return (
    <div className={`relative ${className}`}>
      {loading
        ? <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-burgundy animate-spin pointer-events-none" />
        : <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none transition-colors ${focused ? "text-burgundy" : "text-muted-foreground"}`} />}
      <input
        ref={ref}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => { if (e.key === "Escape" && value) { e.preventDefault(); onChange("") } }}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        aria-describedby={shortcut ? hintId : undefined}
        className={`w-full ${h} pl-9 pr-12 rounded-[5px] border border-border bg-cream/50 placeholder:text-muted-foreground/55 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 ${inputClassName}`}
      />
      {value ? (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { onChange(""); ref.current?.focus() }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcut && !focused ? (
        <kbd id={hintId} className="hidden md:flex absolute right-2.5 top-1/2 -translate-y-1/2 h-5 min-w-5 px-1 items-center justify-center rounded-[4px] border border-border bg-white text-[10px] font-bold text-muted-foreground" title='Press "/" to search'>
          /
        </kbd>
      ) : null}
    </div>
  )
}

// ── FilterSheet (phones) ────────────────────────────────────────────────────

interface FilterSheetProps {
  /** Number of filters applied (shown as a badge) */
  activeCount: number
  /** Result count for the "Show N results" button; omit to show "Show results" */
  resultCount?: number | null
  onClearAll: () => void
  children: React.ReactNode
  /** Button label */
  label?: string
  className?: string
}

/** Renders only the trigger button + sheet; place it where the filters should open from on phones. */
export function FilterSheet({ activeCount, resultCount, onClearAll, children, label = "Filters", className = "" }: FilterSheetProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`h-10 px-3.5 inline-flex items-center gap-2 rounded-[5px] border text-sm font-bold transition-colors shrink-0 ${
          activeCount ? "bg-burgundy/5 text-burgundy border-burgundy/35" : "bg-white text-foreground border-border"
        } ${className}`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        {label}
        {activeCount > 0 && (
          <span className="min-w-5 h-5 px-1 rounded-full bg-burgundy text-white text-[10px] font-black flex items-center justify-center tabular-nums">{activeCount}</span>
        )}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[88vh]">
          <div className="flex items-center justify-between px-4 pt-1 pb-3 border-b border-border/60">
            <DrawerTitle className="text-base font-black text-foreground">{label}</DrawerTitle>
            {activeCount > 0 && (
              <button type="button" onClick={onClearAll} className="text-xs font-bold text-burgundy">Clear all</button>
            )}
          </div>
          <div className="overflow-y-auto px-4 py-4 space-y-5">{children}</div>
          <div className="px-4 py-3 border-t border-border/60 bg-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full h-11 rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-black transition-colors"
            >
              {resultCount == null ? "Show results" : `Show ${resultCount.toLocaleString("en-IN")} results`}
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

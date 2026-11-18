"use client"

// "Fund House" filter for the Find Your Fund table: a searchable list of every AMC the API
// lists (with fund counts). Picking one shows only that house's funds; "All Fund Houses" clears it.

import { useState } from "react"
import { Check, ChevronDown, Landmark, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { AmcPartnerApi } from "@/lib/mutual-funds/api-client"

export function FundHouseFilter({
  amcs,
  value,
  onChange,
}: {
  amcs: AmcPartnerApi[]
  /** Selected AMC id; null = all fund houses */
  value: number | null
  onChange: (id: number | null) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = amcs.find((a) => a.id === value) ?? null
  // Fund houses with funds first (biggest first, as the API sends them), then the empty ones A→Z.
  const withFunds = amcs.filter((a) => a.fundCount > 0)
  const empty = amcs.filter((a) => a.fundCount === 0).sort((a, b) => a.name.localeCompare(b.name))

  const pick = (id: number | null) => { onChange(id); setOpen(false) }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative inline-flex">
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={selected ? `Fund house: ${selected.name}` : "Filter by fund house"}
            className={`h-[34px] pl-3 ${selected ? "pr-8" : "pr-2.5"} rounded-[5px] text-[11px] font-bold border inline-flex items-center gap-1.5 max-w-[260px] transition-all duration-200 ${
              selected
                ? "bg-burgundy/5 text-burgundy border-burgundy/35"
                : "bg-white text-muted-foreground border-border hover:border-burgundy/25 hover:text-foreground"
            }`}
          >
            <Landmark className="w-3.5 h-3.5 shrink-0" aria-hidden />
            <span className="truncate">{selected ? selected.name : "All Fund Houses"}</span>
            {!selected && <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />}
          </button>
        </PopoverTrigger>
        {selected && (
          <button type="button" onClick={() => onChange(null)} aria-label="Clear fund house"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-burgundy hover:bg-burgundy/10">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <PopoverContent align="start" sideOffset={6} className="w-[min(320px,calc(100vw-32px))] p-0 rounded-[10px] overflow-hidden">
        <Command>
          <CommandInput placeholder="Search fund houses…" className="text-[13px]" />
          <CommandList className="max-h-[320px]">
            <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">No fund house matches.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="All Fund Houses" onSelect={() => pick(null)} className="text-[13px] font-semibold">
                <Check className={`w-3.5 h-3.5 ${value === null ? "opacity-100 text-burgundy" : "opacity-0"}`} />
                All Fund Houses
              </CommandItem>
              {withFunds.map((a) => (
                <CommandItem key={a.id} value={`${a.name} ${a.id}`} onSelect={() => pick(a.id)} className="text-[13px]">
                  <Check className={`w-3.5 h-3.5 shrink-0 ${value === a.id ? "opacity-100 text-burgundy" : "opacity-0"}`} />
                  <span className="flex-1 truncate">{a.name}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{a.fundCount.toLocaleString("en-IN")}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {empty.length > 0 && (
              <CommandGroup heading="No funds yet">
                {empty.map((a) => (
                  <CommandItem key={a.id} value={`${a.name} ${a.id}`} disabled className="text-[13px] opacity-50">
                    <span className="w-3.5" />
                    <span className="flex-1 truncate">{a.name}</span>
                    <span className="text-[10px] tabular-nums">0</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

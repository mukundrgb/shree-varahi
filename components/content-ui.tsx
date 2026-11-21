"use client"

// Small pieces shared by the Blog and News pages.

import { BarChart3, BookOpen, Landmark, Newspaper, PieChart, Rocket, Wallet, type LucideIcon } from "lucide-react"

/** Category tones for covers (all from the site palette: burgundy, gold, deep red). */
const COVER_STYLE: Record<string, { from: string; to: string; icon: LucideIcon }> = {
  News:              { from: "#8B0D19", to: "#c20000", icon: Newspaper },
  Stocks:            { from: "#1A1A1A", to: "#8B0D19", icon: BarChart3 },
  IPO:               { from: "#c20000", to: "#FF4D4D", icon: Rocket },
  "Mutual Funds":    { from: "#8B6B1F", to: "#C9A227", icon: PieChart },
  "Personal Finance": { from: "#5A0A12", to: "#8B0D19", icon: Wallet },
  Economy:           { from: "#5A0A12", to: "#8B0D19", icon: Landmark },
}

/** Image stand-in: a gradient with the category icon. Swap for real images when posts have them. */
export function PostCover({ category, className = "", large = false }: { category: string; className?: string; large?: boolean }) {
  const s = COVER_STYLE[category] ?? { from: "#8B0D19", to: "#c20000", icon: BookOpen }
  const Icon = s.icon
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)` }}
      aria-hidden
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10" />
      <Icon className={`${large ? "w-16 h-16" : "w-10 h-10"} text-white/85 relative`} strokeWidth={1.6} />
    </div>
  )
}

/** Horizontal chip filter (All + categories). */
export function CategoryChips({ categories, value, onChange }: { categories: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" style={{ scrollbarWidth: "none" }} role="tablist">
      {["All", ...categories].map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={value === c}
          onClick={() => onChange(c)}
          className={`shrink-0 text-xs font-bold px-3.5 py-2 rounded-full border whitespace-nowrap transition-colors ${
            value === c ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground hover:border-burgundy/40 hover:text-burgundy"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

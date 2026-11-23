"use client"

// Small pieces shared by the Blog and News pages.

import Link from "next/link"
import {
  Activity, ArrowRight, BarChart3, BellRing, BookOpen, Boxes, Building2, CalendarDays, CandlestickChart, ClipboardList,
  Droplet, Flame, Gem, Globe, GraduationCap, IndianRupee, Landmark, Layers, ListChecks, Newspaper, PieChart, Rocket, Scale,
  Sun, Sunrise, Sunset, type LucideIcon,
} from "lucide-react"

/** Category tones and icons for covers and category cards (site palette: burgundy, gold, deep red). Blog and News names. */
const COVER_STYLE: Record<string, { from: string; to: string; icon: LucideIcon }> = {
  // Blog
  Basics:                        { from: "#5A0A12", to: "#8B0D19", icon: BookOpen },
  Commodities:                   { from: "#8B6B1F", to: "#C9A227", icon: Gem },
  Currency:                      { from: "#1A1A1A", to: "#5A0A12", icon: IndianRupee },
  "Daily Stock Market Outlook":  { from: "#8B0D19", to: "#c20000", icon: CalendarDays },
  Derivatives:                   { from: "#1A1A1A", to: "#8B0D19", icon: Layers },
  Equities:                      { from: "#1A1A1A", to: "#8B0D19", icon: BarChart3 },
  ETF:                           { from: "#8B6B1F", to: "#C9A227", icon: Boxes },
  "High Book Value":             { from: "#5A0A12", to: "#8B0D19", icon: Scale },
  "Investment Learnings":        { from: "#8B6B1F", to: "#C9A227", icon: GraduationCap },
  IPO:                           { from: "#c20000", to: "#FF4D4D", icon: Rocket },
  "Market News":                 { from: "#8B0D19", to: "#c20000", icon: Newspaper },
  "Mutual Funds":                { from: "#8B6B1F", to: "#C9A227", icon: PieChart },
  "Stock Market Today":          { from: "#c20000", to: "#FF4D4D", icon: Activity },
  Trading:                       { from: "#1A1A1A", to: "#8B0D19", icon: CandlestickChart },
  // News: the CMOTS Live News sections
  "Hot Pursuit":                 { from: "#c20000", to: "#FF4D4D", icon: Flame },
  "Foreign Markets":             { from: "#1A1A1A", to: "#5A0A12", icon: Globe },
  "Forex News":                  { from: "#1A1A1A", to: "#5A0A12", icon: IndianRupee },
  Bullion:                       { from: "#8B6B1F", to: "#C9A227", icon: Gem },
  "Corporate News":              { from: "#5A0A12", to: "#8B0D19", icon: Building2 },
  "Market Beat":                 { from: "#8B0D19", to: "#c20000", icon: Activity },
  "Economy News":                { from: "#5A0A12", to: "#8B0D19", icon: Landmark },
  "Corporate Results":           { from: "#1A1A1A", to: "#8B0D19", icon: ClipboardList },
  "Stock Alert":                 { from: "#c20000", to: "#FF4D4D", icon: BellRing },
  "Pre Session":                 { from: "#8B6B1F", to: "#C9A227", icon: Sunrise },
  "Mid Session":                 { from: "#8B0D19", to: "#c20000", icon: Sun },
  "End Session":                 { from: "#5A0A12", to: "#8B0D19", icon: Sunset },
  "Quick Review":                { from: "#1A1A1A", to: "#8B0D19", icon: ListChecks },
  "Derivatives News":            { from: "#1A1A1A", to: "#8B0D19", icon: Layers },
  "IPO News":                    { from: "#c20000", to: "#FF4D4D", icon: Rocket },
  "Commodity News":              { from: "#8B6B1F", to: "#C9A227", icon: Droplet },
  "Mutual Fund News":            { from: "#8B6B1F", to: "#C9A227", icon: PieChart },
}

/** Icon for a category (falls back to a book). */
export const categoryIcon = (category: string): LucideIcon => COVER_STYLE[category]?.icon ?? BookOpen

/** Sidebar list of categories with post counts, for article pages. `hrefFor` builds each link. */
export function CategorySidebar({
  categories, current, hrefFor, counts,
}: { categories: readonly string[]; current?: string; hrefFor: (c: string) => string; counts?: Record<string, number> }) {
  return (
    <div className="bg-white border border-border rounded-[12px] overflow-hidden">
      <p className="px-4 py-3 border-b border-border/60 text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Categories</p>
      <ul className="py-1">
        {categories.map((c) => {
          const isCurrent = c === current
          return (
            <li key={c}>
              <Link
                href={hrefFor(c)}
                aria-current={isCurrent ? "true" : undefined}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-semibold border-l-2 transition-colors ${
                  isCurrent ? "border-burgundy bg-burgundy/[0.06] text-burgundy" : "border-transparent text-foreground hover:bg-cream/60 hover:text-burgundy"
                }`}
              >
                <span className="min-w-0">
                  {c}
                  {counts && <span className="text-muted-foreground font-medium"> ({counts[c] ?? 0})</span>}
                </span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Phones/tablets: the same categories as a swipeable chip row. */
export function CategoryLinkRow({ categories, current, hrefFor }: { categories: readonly string[]; current?: string; hrefFor: (c: string) => string }) {
  return (
    <div className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1 mb-6" style={{ scrollbarWidth: "none" }} aria-label="Categories">
      {categories.map((c) => (
        <Link
          key={c}
          href={hrefFor(c)}
          className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${
            c === current ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground"
          }`}
        >
          {c}
        </Link>
      ))}
    </div>
  )
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

/** Horizontal chip filter ("All" + categories); `counts` adds "(n)" after each name. */
export function CategoryChips({
  categories, value, onChange, counts,
}: { categories: readonly string[]; value: string; onChange: (v: string) => void; counts?: Record<string, number> }) {
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
          {counts && c !== "All" && <span className={value === c ? "text-white/75" : "text-muted-foreground"}> ({counts[c] ?? 0})</span>}
        </button>
      ))}
    </div>
  )
}

// "Open Free Demat Account!" card for the stock, mutual fund and ETF detail sidebars.
// Layout: red header (title + ₹17 brokerage line) → ₹0 lifetime AMC coupon → CTA → trust points.
// The "Invest Now" button opens the trading login (LOGIN_URL) in a new tab; no details are asked for here.

import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { LOGIN_URL } from "@/lib/external-links"

const TRUST = [
  { icon: Zap, label: "Opens in minutes" },
  { icon: BadgeCheck, label: "₹0 opening fee" },
  { icon: ShieldCheck, label: "SEBI registered" },
]

export function OpenAccountCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-border rounded-[14px] overflow-hidden shadow-[0_6px_28px_rgba(0,0,0,0.06)] ${className}`}>
      {/* Header */}
      <div
        className="relative px-5 pt-5 pb-12 text-white overflow-hidden"
        style={{ background: "linear-gradient(145deg, #E10600 0%, #B80012 55%, #7A0B16 100%)" }}
      >
        <div className="absolute -top-14 -right-10 w-40 h-40 rounded-full bg-white/[0.08]" aria-hidden />
        <div className="absolute top-10 -right-4 w-20 h-20 rounded-full border border-white/15" aria-hidden />
        <span className="relative inline-flex items-center gap-1 text-[9.5px] font-extrabold uppercase tracking-[0.16em] bg-white/15 ring-1 ring-white/20 rounded-full px-2 py-1">
          <Sparkles className="w-3 h-3 text-gold-champagne" /> Free Demat + Trading
        </span>
        <p className="relative text-[21px] font-black leading-tight tracking-tight mt-3">Open Free Demat Account!</p>
        <p className="relative text-[12.5px] text-white/85 leading-snug mt-1.5">
          Trade at a flat <span className="font-black text-white">₹17</span> per order brokerage*
        </p>
      </div>

      {/* ₹0 lifetime AMC coupon, overlapping the header */}
      <div className="relative px-4 -mt-8">
        <div className="relative flex items-stretch rounded-[12px] bg-white ring-1 ring-burgundy/15 shadow-[0_10px_30px_rgba(139,13,25,0.14)]">
          <div className="flex items-center justify-center px-4 py-3.5 bg-burgundy/[0.06] rounded-l-[12px]">
            <span className="text-[38px] leading-none font-black text-burgundy tracking-tighter tabular-nums">₹0</span>
          </div>
          {/* perforation with side notches */}
          <div className="relative w-px border-l border-dashed border-burgundy/25 my-2" aria-hidden>
            <span className="absolute -top-[14px] -left-[7px] w-3.5 h-3.5 rounded-full bg-white ring-1 ring-burgundy/15" />
            <span className="absolute -bottom-[14px] -left-[7px] w-3.5 h-3.5 rounded-full bg-white ring-1 ring-burgundy/15" />
          </div>
          <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-center">
            <span className="text-[15px] font-black text-foreground leading-tight">Lifetime AMC</span>
            <span className="text-[11px] text-muted-foreground leading-snug mt-0.5">No yearly maintenance charges, ever</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pt-4 pb-4 space-y-2.5">
        <p className="text-[12px] text-muted-foreground text-center">
          Join our <span className="font-black text-foreground">1L+</span> happy customers
        </p>
        <a
          href={LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full h-12 rounded-[10px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-black inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,0,0,0.22)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2"
        >
          Invest Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Trust points */}
      <ul className="grid grid-cols-3 border-t border-border/60 divide-x divide-border/60">
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-center gap-1 px-1 py-3 text-center">
            <Icon className="w-3.5 h-3.5 text-gold-deep" />
            <span className="text-[10px] font-semibold text-muted-foreground leading-tight">{label}</span>
          </li>
        ))}
      </ul>
      <p className="px-4 pb-3 -mt-1 text-[9.5px] text-muted-foreground/80 text-center">*Per executed order on delivery, intraday and F&amp;O.</p>
    </div>
  )
}

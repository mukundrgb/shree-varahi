"use client"

// "Open Free Demat Account!" card: heading, social proof line, offer banner, mobile number field and CTA.
// Used in the stock detail sidebar and in the site entry popup (components/entry-popup.tsx).
// UI only: the mobile number is checked for 10 digits, then the visitor is sent to the eKYC portal.

import { useId, useState } from "react"
import { ArrowRight, BadgeCheck, ShieldCheck, Zap } from "lucide-react"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

export function OpenAccountCard({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const id = useId()
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10 digit mobile number")
      return
    }
    setError("")
    window.open(OPEN_ACCOUNT_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={`bg-white border border-border rounded-[12px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${className}`}>
      {/* Heading + social proof */}
      <div className={`text-center ${compact ? "px-5 pt-5 pb-4" : "px-5 pt-6 pb-4"}`}>
        <p className="text-lg sm:text-xl font-black text-foreground leading-tight">Open Free Demat Account!</p>
        <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug text-balance">
          Join our <span className="font-bold text-foreground">1L+</span> happy customers and{" "}
          <span className="font-bold text-foreground">₹0</span> lifetime AMC
        </p>
      </div>

      {/* Offer banner */}
      <div
        className="relative overflow-hidden px-5 py-5 flex items-center justify-center gap-3"
        style={{ background: "linear-gradient(135deg, #FFF1F1 0%, #FDE7E7 55%, #FBEFE3 100%)" }}
      >
        <div className="absolute -right-6 -top-8 w-24 h-24 rounded-full bg-burgundy/[0.06]" aria-hidden />
        <div className="absolute -left-8 -bottom-10 w-24 h-24 rounded-full bg-gold/20" aria-hidden />
        <span className="relative text-[56px] leading-none font-black text-burgundy tracking-tighter tabular-nums">₹17</span>
        <span className="relative text-left">
          <span className="block text-2xl font-black italic text-burgundy leading-none">Flat</span>
          <span className="block text-[13px] font-extrabold italic text-burgundy/85 leading-tight mt-1">per order brokerage*</span>
        </span>
      </div>

      {/* Mobile number + CTA */}
      <form onSubmit={submit} className="p-5 space-y-3" noValidate>
        <label htmlFor={`${id}-mobile`} className="sr-only">Mobile number</label>
        <div className={`flex items-center h-12 rounded-[8px] border bg-white transition-colors focus-within:ring-2 focus-within:ring-burgundy/15 ${error ? "border-loss" : "border-border focus-within:border-burgundy/50"}`}>
          <span className="pl-4 pr-3 h-full flex items-center text-sm font-bold text-foreground/70 border-r border-border">+91</span>
          <input
            id={`${id}-mobile`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            value={mobile}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); setError("") }}
            placeholder="Enter Mobile Number"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className="flex-1 min-w-0 h-full px-3 bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 placeholder:font-medium focus:outline-none"
          />
        </div>
        {error && <p id={`${id}-err`} className="text-[11px] font-semibold text-loss -mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full h-12 rounded-[8px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-black inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2"
        >
          Get Free Demat Account <ArrowRight className="w-4 h-4" />
        </button>

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1 text-[10.5px] font-semibold text-muted-foreground">
          <li className="flex items-center gap-1"><Zap className="w-3 h-3 text-gold-deep" /> Opens in minutes</li>
          <li className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-gold-deep" /> ₹0 opening fee</li>
          <li className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-gold-deep" /> SEBI registered</li>
        </ul>
      </form>
    </div>
  )
}

"use client"

// A detail page whose live market data isn't connected yet. Shows the instrument's name, where it sits
// on the site and what the visitor can do, but no prices: the website must never show invented
// market data (PRD v3.0 ST-08).

import Link from "next/link"
import { ChevronRight, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export function MarketDataSoon({
  crumbs,
  title,
  badges = [],
  message,
  browse,
  cta,
}: {
  /** Breadcrumb after "Home": the last one is the current page. */
  crumbs: { label: string; href?: string }[]
  title: string
  badges?: string[]
  message: string
  /** Where to send people meanwhile, e.g. { label: "Browse all stocks", href: "/stocks" } */
  browse?: { label: string; href: string }
  /** The red call-to-action card at the bottom. */
  cta?: { title: string; text: string; label: string; href: string }
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                {c.href && i < crumbs.length - 1
                  ? <Link href={c.href} className="hover:text-foreground transition-colors">{c.label}</Link>
                  : <span className={i === crumbs.length - 1 ? "text-foreground font-semibold" : ""}>{c.label}</span>}
              </span>
            ))}
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {badges.map((b, i) => (
                <span key={b} className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] ${i === 0 ? "bg-burgundy/10 text-burgundy" : "bg-secondary text-muted-foreground"}`}>{b}</span>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-6">{title}</h1>

          <div className="border border-border rounded-[8px] bg-cream/60 px-6 py-12 text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-burgundy/10 text-burgundy grid place-items-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-foreground">Live data coming soon</h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto">{message}</p>
            {browse && (
              <Link href={browse.href} className="inline-flex items-center gap-1.5 mt-5 h-10 px-5 rounded-[6px] border border-border bg-white hover:border-burgundy/40 text-sm font-bold transition-colors">
                {browse.label} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {cta && (
            <div className="rounded-[8px] p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <h4 className="text-base font-black text-white mb-1.5">{cta.title}</h4>
              <p className="text-xs text-white/75 mb-4">{cta.text}</p>
              <Button className="bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-9 px-6 text-sm font-black" asChild>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

/** "nvda-nvidia-corp-share-price" → "Nvidia Corp" (used when a page has no known name). */
export const nameFromSlug = (slug: string, drop: RegExp) =>
  slug.replace(drop, "").split("-").filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

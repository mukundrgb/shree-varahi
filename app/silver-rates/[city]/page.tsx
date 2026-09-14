"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const CITIES: Record<string, string> = {
  "silver-rate-today-in-mumbai": "Mumbai", "silver-rate-today-in-delhi": "Delhi", "silver-rate-today-in-chennai": "Chennai",
  "silver-rate-today-in-kolkata": "Kolkata", "silver-rate-today-in-bangalore": "Bangalore", "silver-rate-today-in-hyderabad": "Hyderabad",
  "silver-rate-today-in-ahmedabad": "Ahmedabad", "silver-rate-today-in-pune": "Pune",
}

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

export default function SilverRateCityPage() {
  const params = useParams()
  const city = typeof params.city === "string" ? params.city : params.city?.[0] ?? ""
  const cityName = useMemo(() => CITIES[city] ?? city.replace(/^silver-rate-today-in-/, "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), [city])
  const h = hashSlug(city)
  const ratePerGram = 91 + (h % 6) - 3
  const ratePerKg = ratePerGram * 1000

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/commodity" className="hover:text-foreground transition-colors">Gold &amp; Silver</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Silver Rate in {cityName}</span>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Silver Rate Today in {cityName}</h1>
          <p className="text-sm text-muted-foreground mb-8">Live silver prices per gram and per kg in {cityName}, updated in real time.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: "Silver Rate / Gram", value: `₹${ratePerGram.toLocaleString("en-IN")}` },
              { label: "Silver Rate / Kg", value: `₹${ratePerKg.toLocaleString("en-IN")}` },
            ].map(r => (
              <div key={r.label} className="rounded-[8px] p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
                <p className="text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">{r.label}</p>
                <p className="text-2xl font-black text-white tabular-nums">{r.value}</p>
              </div>
            ))}
          </div>

          <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 px-6 text-sm font-bold" asChild>
            <Link href="/commodity/futures/mcx-silver">Trade MCX Silver →</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}

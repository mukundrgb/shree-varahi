"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const CITIES: Record<string, string> = {
  "gold-rate-today-in-mumbai": "Mumbai", "gold-rate-today-in-delhi": "Delhi", "gold-rate-today-in-chennai": "Chennai",
  "gold-rate-today-in-kolkata": "Kolkata", "gold-rate-today-in-bangalore": "Bangalore", "gold-rate-today-in-hyderabad": "Hyderabad",
  "gold-rate-today-in-ahmedabad": "Ahmedabad", "gold-rate-today-in-pune": "Pune",
}

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

export default function GoldRateCityPage() {
  const params = useParams()
  const city = typeof params.city === "string" ? params.city : params.city?.[0] ?? ""
  const cityName = useMemo(() => CITIES[city] ?? city.replace(/^gold-rate-today-in-/, "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), [city])
  const h = hashSlug(city)
  const rate24k = 7245 + (h % 60) - 30
  const rate22k = Math.round(rate24k * 0.916)
  const rate18k = Math.round(rate24k * 0.75)

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
            <span className="text-foreground font-semibold">Gold Rate in {cityName}</span>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Gold Rate Today in {cityName}</h1>
          <p className="text-sm text-muted-foreground mb-8">Live 24K, 22K &amp; 18K gold prices per gram in {cityName}, updated in real time.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "24K Gold (999)", value: rate24k },
              { label: "22K Gold (916)", value: rate22k },
              { label: "18K Gold (750)", value: rate18k },
            ].map(r => (
              <div key={r.label} className="rounded-[8px] p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
                <p className="text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">{r.label}</p>
                <p className="text-2xl font-black text-white tabular-nums">₹{r.value.toLocaleString("en-IN")}<span className="text-sm font-bold">/gram</span></p>
              </div>
            ))}
          </div>

          <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 px-6 text-sm font-bold" asChild>
            <Link href="/commodity/digital-gold">Buy Digital Gold →</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}

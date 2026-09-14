"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const KNOWN: Record<string, { name: string; sector: string; price: number }> = {
  "aapl-apple-inc-share-price": { name: "Apple Inc.", sector: "Technology", price: 228.50 },
  "msft-microsoft-corp-share-price": { name: "Microsoft Corp.", sector: "Technology", price: 442.30 },
  "nvda-nvidia-corp-share-price": { name: "NVIDIA Corp.", sector: "Technology", price: 138.20 },
  "googl-alphabet-inc-share-price": { name: "Alphabet Inc.", sector: "Communication Services", price: 178.90 },
  "amzn-amazon-com-inc-share-price": { name: "Amazon.com Inc.", sector: "Consumer Discretionary", price: 205.40 },
  "meta-meta-platforms-inc-share-price": { name: "Meta Platforms Inc.", sector: "Communication Services", price: 592.10 },
  "tsla-tesla-inc-share-price": { name: "Tesla Inc.", sector: "Automobile", price: 248.60 },
  "nflx-netflix-inc-share-price": { name: "Netflix Inc.", sector: "Communication Services", price: 890.30 },
  "dis-the-walt-disney-co-share-price": { name: "The Walt Disney Co.", sector: "Communication Services", price: 112.40 },
  "lly-eli-lilly-and-co-share-price": { name: "Eli Lilly and Co.", sector: "Healthcare", price: 812.70 },
  "unh-unitedhealth-group-inc-share-price": { name: "UnitedHealth Group Inc.", sector: "Healthcare", price: 512.80 },
  "v-visa-inc-share-price": { name: "Visa Inc.", sector: "Financials", price: 312.50 },
  "ma-mastercard-inc-share-price": { name: "Mastercard Inc.", sector: "Financials", price: 528.40 },
  "jpm-jpmorgan-chase-co-share-price": { name: "JPMorgan Chase & Co.", sector: "Financials", price: 232.60 },
  "wmt-walmart-inc-share-price": { name: "Walmart Inc.", sector: "Consumer Staples", price: 92.40 },
  "cost-costco-wholesale-corp-share-price": { name: "Costco Wholesale Corp.", sector: "Consumer Staples", price: 912.30 },
  "ko-coca-cola-co-share-price": { name: "Coca-Cola Co.", sector: "Consumer Staples", price: 68.90 },
  "pep-pepsico-inc-share-price": { name: "PepsiCo Inc.", sector: "Consumer Staples", price: 152.80 },
  "pltr-palantir-technologies-inc-share-price": { name: "Palantir Technologies Inc.", sector: "Technology", price: 82.40 },
  "avgo-broadcom-inc-share-price": { name: "Broadcom Inc.", sector: "Technology", price: 178.60 },
}

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}
function rnd(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

function getStock(slug: string) {
  const h = hashSlug(slug)
  const known = KNOWN[slug]
  const name = known?.name ?? slug.replace(/-share-price$/, "").replace(/^[a-z]+-/, "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const sector = known?.sector ?? ["Technology", "Healthcare", "Financials", "Consumer Discretionary", "Energy"][h % 5]
  const price = known?.price ?? Math.round((20 + (h % 800)) * 100) / 100
  const chg = Math.round(rnd(h, -price * 0.025, price * 0.025) * 100) / 100
  const chgPct = Math.round((chg / price) * 10000) / 100
  return {
    name, sector, price, chg, chgPct,
    open: Math.round((price - chg * 0.6) * 100) / 100,
    high52: Math.round(price * 1.35 * 100) / 100,
    low52: Math.round(price * 0.68 * 100) / 100,
    mcap: `$${(price * (500 + (h % 15000))).toLocaleString("en-US", { maximumFractionDigits: 0 })}M`,
    pe: Math.round(rnd(h + 1, 15, 55) * 100) / 100,
  }
}

export default function UsStockDynamicPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? ""
  const s = useMemo(() => getStock(slug), [slug])
  const isPos = s.chg >= 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>US Stocks</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{s.name}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold bg-burgundy/10 text-burgundy px-2 py-0.5 rounded-[4px]">NASDAQ / NYSE</span>
            <span className="text-[11px] font-semibold bg-secondary text-muted-foreground px-2 py-0.5 rounded-[4px]">{s.sector}</span>
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">{s.name}</h1>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-black text-foreground tabular-nums">${s.price.toFixed(2)}</span>
            <div className={`flex items-center gap-1 font-bold text-base ${isPos ? "text-emerald-600" : "text-red-500"}`}>
              {isPos ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {isPos ? "+" : ""}{s.chg.toFixed(2)} ({isPos ? "+" : ""}{s.chgPct.toFixed(2)}%)
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-8">Prices in USD · Delayed quote</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Open", value: `$${s.open.toFixed(2)}` },
              { label: "52W High", value: `$${s.high52.toFixed(2)}` },
              { label: "52W Low", value: `$${s.low52.toFixed(2)}` },
              { label: "Market Cap", value: s.mcap },
              { label: "P/E Ratio", value: s.pe.toFixed(2) },
            ].map(stat => (
              <div key={stat.label} className="border border-border rounded-[8px] p-3 text-center">
                <div className="text-[10px] font-semibold text-muted-foreground">{stat.label}</div>
                <div className="text-sm font-black text-foreground mt-0.5 tabular-nums">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[8px] p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
            <h4 className="text-base font-black text-white mb-1.5">Invest in {s.name} from India</h4>
            <p className="text-xs text-white/75 mb-4">Trade 5,000+ US stocks directly from India via Shree Varahi's Global Investing platform.</p>
            <Button className="bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-9 px-6 text-sm font-black" asChild>
              <Link href="/#global-investing">Start Global Investing →</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

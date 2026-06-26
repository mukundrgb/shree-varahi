import { ArrowRight, Layers, Users, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const BASKET_HOLDINGS = [
  { name: "HDFC Bank",  weight: 18 },
  { name: "Reliance",   weight: 15 },
  { name: "TCS",        weight: 12 },
  { name: "ICICI Bank", weight: 11 },
  { name: "L&T",        weight: 9 },
]

export function AdvisoryBasketsSection() {
  return (
    <section className="bg-gradient-to-b from-background via-cream to-background py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-2 block">
            Advisory Baskets
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Invest in <span className="text-burgundy">expert-curated</span> stock baskets.
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Get diversified exposure to research-backed stock portfolios built by SEBI-registered analysts — invest in a complete strategy with a single click.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white border border-border rounded-[16px] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            {/* Left Side: Content */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-burgundy/20 bg-burgundy/5 text-xs font-bold text-burgundy">
                  <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
                  Diversify In One Click
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                  Expert-Curated Portfolios
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Every basket is built and maintained by SEBI-registered research analysts, combining in-depth fundamental research with active market tracking and smart auto-rebalancing — so your portfolio stays aligned with its strategy.
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Users className="h-3.5 w-3.5 text-burgundy" /> SEBI-Registered Advisors
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5 text-burgundy" /> Smart Auto-Rebalancing
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-burgundy" /> Direct Demat Holdings
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/advisory-baskets">
                  <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground font-bold rounded-[5px] px-6 py-2.5 flex items-center gap-2">
                    Explore Advisory Baskets
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-[5px] px-6 py-2.5">
                  Talk to a portfolio advisor
                </Button>
              </div>
            </div>

            {/* Right Side: Static basket visual */}
            <div className="min-h-[280px]">
              <div className="bg-secondary/25 border border-border/80 rounded-[12px] p-6 space-y-4 h-full flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    India Consumption Basket
                  </span>
                  <span className="text-xs font-bold text-profit bg-profit/10 px-2 py-0.5 rounded">
                    +24.8% (1Y)
                  </span>
                </div>
                <div className="space-y-2.5">
                  {BASKET_HOLDINGS.map((h) => (
                    <div key={h.name} className="bg-white border border-border rounded-[8px] p-3 flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{h.name}</span>
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${h.weight * 4}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground w-8 text-right">{h.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground text-center pt-1">
                  12 stocks · Medium Risk · Rebalanced quarterly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

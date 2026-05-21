"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, TrendingUp, PieChart } from "lucide-react"

const traderFeatures = [
  "Up to 5x intraday leverage",
  "Live Greeks on option chain",
  "Strategy builder with payoff",
  "Real-time option chain",
  "Advanced order types (GTT, OCO)",
  "₹17 flat per executed order",
]

const investorFeatures = [
  "₹0 delivery brokerage forever",
  "SIP from just ₹100/month",
  "Free IPO applications",
  "ETF + US stocks access",
  "XIRR portfolio tracker",
  "Zero account opening fee",
]

export function TraderInvestorSection() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
            Choose Your Path
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            One platform. <span className="text-burgundy">Two journeys.</span>
          </h2>
        </motion.div>

        {/* Dual Panels */}
        <div className="relative grid lg:grid-cols-2 gap-0 lg:gap-0">
          {/* Vertical Divider with Lotus */}
          <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center z-10">
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gold to-gold" />
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gold flex items-center justify-center my-4">
              <svg viewBox="0 0 40 40" className="h-6 w-6 text-gold">
                <path
                  fill="currentColor"
                  d="M20 2C11.16 2 4 9.16 4 18c0 4.42 1.79 8.42 4.69 11.31L20 38l11.31-8.69C34.21 26.42 36 22.42 36 18c0-8.84-7.16-16-16-16z"
                />
              </svg>
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-gold via-gold to-transparent" />
          </div>

          {/* Trader Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 lg:p-12 rounded-l-[5px] lg:rounded-r-none rounded-[5px] bg-white border border-border lg:border-r-0"
          >
            <span className="inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-[5px] bg-burgundy/10 text-burgundy mb-6">
              For Active Traders
            </span>

            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              Built for speed.
            </h3>
            <h3 className="text-2xl lg:text-3xl font-bold text-burgundy mb-6">
              Built for F&O.
            </h3>

            <ul className="space-y-3 mb-8">
              {traderFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Mini visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary border border-border rounded-[5px] p-4 mb-6 float"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-4 w-4 text-profit" />
                <span className="text-xs text-muted-foreground">NIFTY 24850 CE</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
                <div className="text-center">
                  <div className="text-muted-foreground">Delta</div>
                  <div className="text-profit font-semibold">0.52</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Theta</div>
                  <div className="text-loss font-semibold">-12.5</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Gamma</div>
                  <div className="text-foreground font-semibold">0.0024</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">IV</div>
                  <div className="text-foreground font-semibold">16.2%</div>
                </div>
              </div>
            </motion.div>

            <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
              Start Trading Now
            </Button>
          </motion.div>

          {/* Investor Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 lg:p-12 rounded-r-[5px] lg:rounded-l-none rounded-[5px] bg-white border border-border lg:border-l-0"
          >
            <span className="inline-block text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-[5px] bg-gold/20 text-gold-deep mb-6">
              For Long-term Investors
            </span>

            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              Grow wealth.
            </h3>
            <h3 className="text-2xl lg:text-3xl font-bold text-gold-deep mb-6">
              No brokerage.
            </h3>

            <ul className="space-y-3 mb-8">
              {investorFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Mini visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary border border-border rounded-[5px] p-4 mb-6 float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <PieChart className="h-4 w-4 text-gold" />
                <span className="text-xs text-muted-foreground">Portfolio Overview</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--beige)" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="var(--burgundy)"
                      strokeWidth="4"
                      strokeDasharray="44 44"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="4"
                      strokeDasharray="22 66"
                      strokeDashoffset="-44"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="var(--profit)"
                      strokeWidth="4"
                      strokeDasharray="22 66"
                      strokeDashoffset="-66"
                    />
                  </svg>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-burgundy" />
                    <span>Stocks 50%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>MF 25%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-profit" />
                    <span>ETF 25%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary rounded-[5px]"
            >
              Start Investing Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

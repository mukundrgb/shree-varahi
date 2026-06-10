"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const traderFeatures = [
  "5× Intraday Leverage — Trade with up to 5× your capital on NSE & BSE stocks.",
  "Live Option Chain & Greeks — Delta, Theta, Gamma, Vega updating in real time.",
  "MTF — 4× Buying Power — Turn ₹10,000 into ₹40,000 across 1,700+ stocks.",
  "Sub-80ms Order Execution — Trades go through before the market blinks.",
  "Advanced Order Types — GTT, OCO, AMO, CO, BO — full control every time.",
  "50+ Stock Screeners — Breakout scans, OI filters, volume surge alerts live.",
  "Option Strategy Builder — Build, analyse, and execute multi-leg strategies.",
  "Free Algo & API Access — Automate your strategy with zero extra cost.",
  "Futures Chain with Live Margin — See required margin before you place the order.",
  "TradingView Charts — Professional multi-timeframe charting built right in.",
]

const investorFeatures = [
  "₹17 Delivery Brokerage — Buy and hold stocks forever with zero charges.",
  "SIP from ₹100/month — Automate investing in stocks or mutual funds.",
  "Zero-Commission Mutual Funds — Direct plans only. Every rupee of return is yours.",
  "Free IPO & NFO Applications — Apply via UPI in two taps. No hidden fees.",
  "US & Global Stocks — Invest in Apple, Tesla, Google directly from India.",
  "Digital Gold & Silver — Buy 24K gold at live MCX prices. Vault stored.",
  "XIRR Portfolio Tracker — See your real annualised return across all holdings.",
  "Dividend Tracker — Never miss a payout. All earnings tracked automatically.",
  "ETF Investing — Gold, index, and sectoral ETFs at the lowest cost.",
  "Long-term Capital Gains Tracker — Stay on top of your tax liability year-round.",
]

export function TraderInvestorSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream via-cream to-background">

      {/* Soft background blobs — light, not dark */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,13,25,0.07) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(184,146,74,0.09) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Top divider */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            Choose Your Path
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            One platform. <span className="text-burgundy">Built for both.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Whether you&apos;re chasing intraday momentum or building decade-long wealth — every tool you need lives here.
          </p>
        </motion.div>

        {/* Dual Cards */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── Trader Card (burgundy glass) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="relative rounded-[12px] overflow-hidden flex flex-col"
            style={{
              background: "rgba(255, 248, 248, 0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(139, 13, 25, 0.2)",
              boxShadow: "0 4px 32px rgba(139,13,25,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* Burgundy shimmer top line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: "linear-gradient(90deg, transparent, #8B0D19, rgba(139,13,25,0.4), transparent)",
              }}
            />

            <div className="p-8 lg:p-10 flex flex-col flex-1">
              {/* Badge */}
              <span
                className="inline-block self-start text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-[4px] mb-6"
                style={{
                  background: "rgba(139,13,25,0.08)",
                  border: "1px solid rgba(139,13,25,0.2)",
                  color: "#8B0D19",
                }}
              >
                For Active Traders
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold mb-1 text-foreground">
                Built for speed.
              </h3>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-burgundy">
                Built for F&amp;O.
              </h3>

              <ul className="space-y-3 mb-10 flex-1">
                {traderFeatures.map((feature) => {
                  const parts = feature.split(" — ")
                  const heading = parts.length > 1 ? parts.slice(0, -1).join(" — ") : feature
                  const desc = parts.length > 1 ? parts[parts.length - 1] : ""
                  return (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: "rgba(139,13,25,0.08)",
                          border: "1px solid rgba(139,13,25,0.25)",
                        }}
                      >
                        <Check className="h-2.5 w-2.5 text-burgundy" />
                      </div>
                      <span className="text-sm text-foreground/75 leading-relaxed">
                        <strong className="font-bold text-burgundy">{heading}</strong>
                        {desc && <span className="text-foreground/70"> — {desc}</span>}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <Button
                className="self-start rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white"
              >
                Start Trading Now
              </Button>
            </div>
          </motion.div>

          {/* ── Investor Card (gold glass) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="relative rounded-[12px] overflow-hidden flex flex-col"
            style={{
              background: "rgba(255, 253, 245, 0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(184, 146, 74, 0.25)",
              boxShadow: "0 4px 32px rgba(184,146,74,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* Gold shimmer top line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: "linear-gradient(90deg, transparent, #B8924A, rgba(217,178,124,0.5), transparent)",
              }}
            />

            <div className="p-8 lg:p-10 flex flex-col flex-1">
              {/* Badge */}
              <span
                className="inline-block self-start text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-[4px] mb-6"
                style={{
                  background: "rgba(184,146,74,0.10)",
                  border: "1px solid rgba(184,146,74,0.3)",
                  color: "#8C6A2F",
                }}
              >
                For Long-term Investors
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold mb-1 text-foreground">
                Grow wealth.
              </h3>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gold-deep">
                No brokerage.
              </h3>

              <ul className="space-y-3 mb-10 flex-1">
                {investorFeatures.map((feature) => {
                  const parts = feature.split(" — ")
                  const heading = parts.length > 1 ? parts.slice(0, -1).join(" — ") : feature
                  const desc = parts.length > 1 ? parts[parts.length - 1] : ""
                  return (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: "rgba(184,146,74,0.10)",
                          border: "1px solid rgba(184,146,74,0.35)",
                        }}
                      >
                        <Check className="h-2.5 w-2.5 text-gold-deep" />
                      </div>
                      <span className="text-sm text-foreground/75 leading-relaxed">
                        <strong className="font-bold text-gold-deep">{heading}</strong>
                        {desc && <span className="text-foreground/70"> — {desc}</span>}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <Button
                variant="outline"
                className="self-start rounded-[6px]"
                style={{
                  border: "1px solid rgba(184,146,74,0.45)",
                  color: "#8C6A2F",
                  background: "rgba(184,146,74,0.07)",
                }}
              >
                Start Investing Now
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, ChevronUp, BarChart2, LineChart } from "lucide-react"

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

const PREVIEW_COUNT = 4

/* ── Trader image placeholder ── */
function TraderImagePlaceholder() {
  return (
    <div
      className="relative w-full rounded-[8px] overflow-hidden mb-8 flex items-center justify-center"
      style={{
        height: "180px",
        background: "linear-gradient(135deg, rgba(139,13,25,0.06) 0%, rgba(139,13,25,0.03) 100%)",
        border: "1px dashed rgba(139,13,25,0.22)",
      }}
    >
      {/* Decorative mini chart SVG */}
      <svg
        viewBox="0 0 240 80"
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#8B0D19" strokeWidth="0.5" />
        ))}
        <polyline
          points="0,65 30,55 60,60 90,40 120,45 150,25 180,30 210,15 240,20"
          fill="none"
          stroke="#8B0D19"
          strokeWidth="1.5"
        />
        <polyline
          points="0,65 30,55 60,60 90,40 120,45 150,25 180,30 210,15 240,20 240,80 0,80"
          fill="rgba(139,13,25,0.08)"
        />
        {[
          [90, 40, 55], [150, 25, 38], [210, 15, 28],
        ].map(([x, y, bodyTop]) => (
          <g key={x}>
            <line x1={x} y1={y - 6} x2={x} y2={y + 8} stroke="#8B0D19" strokeWidth="0.8" />
            <rect x={x - 4} y={bodyTop} width="8" height="8" fill="rgba(139,13,25,0.4)" stroke="#8B0D19" strokeWidth="0.6" />
          </g>
        ))}
      </svg>

      {/* Center icon + label */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="w-12 h-12 rounded-[8px] flex items-center justify-center"
          style={{ background: "rgba(139,13,25,0.08)", border: "1px solid rgba(139,13,25,0.2)" }}
        >
          <BarChart2 className="w-6 h-6 text-burgundy" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] font-semibold" style={{ color: "rgba(139,13,25,0.5)" }}>
          Trading Dashboard Preview
        </span>
      </div>
    </div>
  )
}

/* ── Investor image placeholder ── */
function InvestorImagePlaceholder() {
  return (
    <div
      className="relative w-full rounded-[8px] overflow-hidden mb-8 flex items-center justify-center"
      style={{
        height: "180px",
        background: "linear-gradient(135deg, rgba(184,146,74,0.07) 0%, rgba(217,178,124,0.03) 100%)",
        border: "1px dashed rgba(184,146,74,0.3)",
      }}
    >
      {/* Decorative growth chart */}
      <svg
        viewBox="0 0 240 80"
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#B8924A" strokeWidth="0.5" />
        ))}
        <polyline
          points="0,70 40,65 80,55 120,48 160,35 200,22 240,12"
          fill="none"
          stroke="#B8924A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,70 40,65 80,55 120,48 160,35 200,22 240,12 240,80 0,80"
          fill="rgba(184,146,74,0.1)"
        />
        {[40, 120, 200].map((x, i) => (
          <circle key={x} cx={x} cy={[65, 48, 22][i]} r="3" fill="rgba(184,146,74,0.5)" stroke="#B8924A" strokeWidth="0.8" />
        ))}
      </svg>

      {/* Center icon + label */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="w-12 h-12 rounded-[8px] flex items-center justify-center"
          style={{ background: "rgba(184,146,74,0.1)", border: "1px solid rgba(184,146,74,0.3)" }}
        >
          <LineChart className="w-6 h-6 text-gold-deep" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] font-semibold" style={{ color: "rgba(184,146,74,0.6)" }}>
          Portfolio Growth Preview
        </span>
      </div>
    </div>
  )
}

/* ── Feature list with read more/less ── */
function FeatureList({
  features,
  accent,
  accentBg,
  accentBorder,
  checkColor,
  headingColor,
}: {
  features: string[]
  accent: string
  accentBg: string
  accentBorder: string
  checkColor: string
  headingColor: string
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? features : features.slice(0, PREVIEW_COUNT)
  const hidden = features.length - PREVIEW_COUNT

  return (
    <div className="mb-8 flex-1">
      <ul className="space-y-3">
        {visible.map((feature) => {
          const parts = feature.split(" — ")
          const heading = parts.length > 1 ? parts.slice(0, -1).join(" — ") : feature
          const desc = parts.length > 1 ? parts[parts.length - 1] : ""
          return (
            <li key={feature} className="flex items-start gap-3">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <Check className="h-2.5 w-2.5" style={{ color: checkColor }} />
              </div>
              <span className="text-sm text-foreground/75 leading-relaxed">
                <strong className="font-bold" style={{ color: headingColor }}>{heading}</strong>
                {desc && <span className="text-foreground/70"> — {desc}</span>}
              </span>
            </li>
          )
        })}
      </ul>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="extra"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          />
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 flex items-center gap-1.5 text-[13px] font-bold transition-colors cursor-pointer"
        style={{ color: accent }}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Read less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Read more <span className="font-normal opacity-60">({hidden} more features)</span>
          </>
        )}
      </button>
    </div>
  )
}

export function TraderInvestorSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream via-cream to-background">

      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,13,25,0.07) 0%, transparent 70%)", filter: "blur(48px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(184,146,74,0.09) 0%, transparent 70%)", filter: "blur(48px)" }}
      />

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

          {/* ── Trader Card ── */}
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
            <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #8B0D19, rgba(139,13,25,0.4), transparent)" }} />

            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <span
                className="inline-block self-start text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-[4px] mb-6"
                style={{ background: "rgba(139,13,25,0.08)", border: "1px solid rgba(139,13,25,0.2)", color: "#8B0D19" }}
              >
                For Active Traders
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold mb-1 text-foreground">Built for speed. <span className="text-2xl lg:text-3xl font-bold mb-6 text-burgundy">Built for F&amp;O.</span></h3>
              

              <TraderImagePlaceholder />

              <FeatureList
                features={traderFeatures}
                accent="#8B0D19"
                accentBg="rgba(139,13,25,0.08)"
                accentBorder="rgba(139,13,25,0.25)"
                checkColor="#8B0D19"
                headingColor="#8B0D19"
              />

              <Button className="self-start rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white">
                Start Trading Now
              </Button>
            </div>
          </motion.div>

          {/* ── Investor Card ── */}
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
            <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #B8924A, rgba(217,178,124,0.5), transparent)" }} />

            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <span
                className="inline-block self-start text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-[4px] mb-6"
                style={{ background: "rgba(184,146,74,0.10)", border: "1px solid rgba(184,146,74,0.3)", color: "#8C6A2F" }}
              >
                For Long-term Investors
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold mb-1 text-foreground">Grow wealth.</h3>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-gold-deep">No brokerage.</h3>

              <InvestorImagePlaceholder />

              <FeatureList
                features={investorFeatures}
                accent="#8C6A2F"
                accentBg="rgba(184,146,74,0.10)"
                accentBorder="rgba(184,146,74,0.35)"
                checkColor="#B8924A"
                headingColor="#8C6A2F"
              />

              <Button
                variant="outline"
                className="self-start rounded-[6px]"
                style={{ border: "1px solid rgba(184,146,74,0.45)", color: "#8C6A2F", background: "rgba(184,146,74,0.07)" }}
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

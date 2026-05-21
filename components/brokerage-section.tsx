"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Calculator } from "lucide-react"

const comparisonData = [
  { segment: "Equity Delivery", shreeVarahi: "₹0", others: "₹20" },
  { segment: "Equity Intraday", shreeVarahi: "₹17", others: "₹20" },
  { segment: "F&O (per lot)", shreeVarahi: "₹17", others: "₹20" },
  { segment: "Commodities", shreeVarahi: "₹17", others: "₹20" },
  { segment: "Currency", shreeVarahi: "₹17", others: "₹20" },
]

const freeThings = [
  "Account Opening",
  "AMC (Annual Maintenance)",
  "IPO Applications",
  "SIP Investments",
  "API Access",
  "Mutual Fund Investments",
  "Research Reports",
]

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

export function BrokerageSection() {
  const [tradesPerMonth, setTradesPerMonth] = useState(50)
  const savings = tradesPerMonth * 3 // ₹3 savings per trade vs others

  return (
    <section className="relative bg-cream py-16 lg:py-24 overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20rem] font-bold text-burgundy/[0.03] select-none">
          ₹17
        </span>
      </div>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
            Simple, Transparent Pricing
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-6xl lg:text-8xl font-bold text-gold-deep">
              ₹<AnimatedCounter target={17} duration={1.5} />
            </span>
          </div>
          <p className="text-xl lg:text-2xl text-foreground font-medium">
            Flat per executed order. <span className="text-gold-deep">₹0</span> for all equity delivery trades. Forever.
          </p>
        </motion.div>

        {/* Three Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-[5px] p-6 shadow-sm"
          >
            <h3 className="font-bold mb-4">Brokerage Comparison</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-xs font-semibold text-muted-foreground pb-2 border-b border-border">
                <span>Segment</span>
                <span className="text-center">Shree Varahi</span>
                <span className="text-center">Others</span>
              </div>
              {comparisonData.map((row) => (
                <div key={row.segment} className="grid grid-cols-3 text-sm items-center">
                  <span className="text-muted-foreground">{row.segment}</span>
                  <span className="text-center font-mono font-bold text-burgundy">
                    {row.shreeVarahi}
                  </span>
                  <span className="text-center font-mono text-muted-foreground line-through">
                    {row.others}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Savings Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-border rounded-[5px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-4 w-4 text-gold" />
              <h3 className="font-bold">Savings Calculator</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Trades per month</label>
                <input
                  type="number"
                  value={tradesPerMonth}
                  onChange={(e) => setTradesPerMonth(Number(e.target.value) || 0)}
                  className="w-full mt-2 px-4 py-3 rounded-[5px] bg-secondary border border-border font-mono text-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div className="bg-burgundy/5 rounded-[5px] p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">You save annually</p>
                <motion.p
                  key={savings}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-burgundy"
                >
                  ₹{(savings * 12).toLocaleString("en-IN")}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">vs other brokers</p>
              </div>
            </div>
          </motion.div>

          {/* What's Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-border rounded-[5px] p-6 shadow-sm"
          >
            <h3 className="font-bold mb-4">{"What's Free"}</h3>
            <ul className="space-y-3">
              {freeThings.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[5px] bg-profit/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-profit" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground px-8 rounded-[5px]"
          >
            Open Free Account — ₹0 to start
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

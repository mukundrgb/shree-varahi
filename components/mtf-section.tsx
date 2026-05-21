"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"

const mtfStocks = [
  { symbol: "RELIANCE", price: "₹2,945", multiplier: "4x" },
  { symbol: "TCS", price: "₹4,125", multiplier: "4x" },
  { symbol: "HDFC BANK", price: "₹1,687", multiplier: "4x" },
  { symbol: "INFY", price: "₹1,845", multiplier: "4x" },
  { symbol: "ICICI BANK", price: "₹1,234", multiplier: "4x" },
  { symbol: "BAJAJ FIN", price: "₹7,234", multiplier: "2x" },
]

const steps = [
  { step: 1, title: "Select eligible stock", desc: "Choose from 1,700+ MTF stocks" },
  { step: 2, title: "Enable MTF at order", desc: "One toggle while placing order" },
  { step: 3, title: "Platform funds the rest", desc: "We cover up to 75% of value" },
]

export function MTFSection() {
  const [capital, setCapital] = useState([50000])
  const buyingPower = capital[0] * 4

  const formatCurrency = (num: number) => {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)}L`
    }
    return `₹${num.toLocaleString("en-IN")}`
  }

  return (
    <section className="bg-background py-16 lg:py-24">
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
            Margin Trading Facility
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Turn ₹10,000 into{" "}
            <span className="text-burgundy">₹40,000</span> buying power.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-[5px] p-6 lg:p-8 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-6">MTF Calculator</h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Your Capital</span>
                  <span className="font-mono font-bold">{formatCurrency(capital[0])}</span>
                </div>
                <Slider
                  value={capital}
                  onValueChange={setCapital}
                  min={5000}
                  max={500000}
                  step={5000}
                  className="[&_[role=slider]]:bg-burgundy [&_[role=slider]]:border-burgundy"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>₹5,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              <div className="bg-secondary rounded-[5px] p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Buying Power</p>
                <motion.p
                  key={buyingPower}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl lg:text-5xl font-bold text-burgundy"
                >
                  {formatCurrency(buyingPower)}
                </motion.p>
                <p className="text-xs text-gold-deep font-medium mt-2">4x leverage on eligible stocks</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg mb-6">How MTF Works</h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-8 bottom-8 w-px border-l-2 border-dashed border-gold/40" />
              <motion.div
                animate={{ y: [0, 120, 240] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-[18px] top-8 w-1.5 h-1.5 bg-burgundy rounded-full"
              />

              <div className="space-y-6">
                {steps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center flex-shrink-0 text-sm font-bold text-burgundy">
                      {item.step}
                    </div>
                    <div className="bg-white border border-border rounded-[5px] p-4 flex-1">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* MTF Eligible Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-bold text-lg mb-4 text-center">Popular MTF Stocks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {mtfStocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-border rounded-[5px] p-3 text-center cursor-pointer hover:shadow-md hover:border-gold/50 transition-all"
              >
                <p className="font-mono text-xs text-muted-foreground">{stock.symbol}</p>
                <p className="font-semibold text-sm">{stock.price}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-[5px] bg-burgundy/10 text-burgundy">
                  {stock.multiplier}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-4">
            <a href="#" className="text-sm text-burgundy hover:underline inline-flex items-center gap-1 font-medium">
              View all 1,700+ MTF eligible stocks
              <ArrowRight className="h-3 w-3" />
            </a>
          </p>
        </motion.div>

        {/* Disclaimer & CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground mb-6 max-w-2xl mx-auto">
            MTF involves borrowing funds from the broker. Interest is charged on the funded amount. 
            Please read the MTF disclosure document carefully before opting for MTF.
          </p>
          <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
            Start Trading with MTF
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

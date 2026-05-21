"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

const tickerData = [
  { symbol: "NIFTY 50", price: "24,832.15", change: "+1.24%", up: true },
  { symbol: "SENSEX", price: "81,456.78", change: "+0.98%", up: true },
  { symbol: "HDFC BANK", price: "1,687.45", change: "+2.15%", up: true },
  { symbol: "RELIANCE", price: "2,945.60", change: "-0.45%", up: false },
  { symbol: "TCS", price: "4,125.30", change: "+1.87%", up: true },
  { symbol: "GOLD", price: "₹73,450", change: "+0.32%", up: true },
  { symbol: "INFY", price: "1,845.20", change: "+1.05%", up: true },
  { symbol: "ICICI BANK", price: "1,234.55", change: "-0.28%", up: false },
]

export function TickerStrip() {
  const duplicatedData = [...tickerData, ...tickerData]

  return (
    <div className="bg-secondary border-b border-border py-2 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap ticker-animate"
        style={{ width: "fit-content" }}
      >
        {duplicatedData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-4">
            <span className="font-mono text-xs font-medium text-foreground">
              {item.symbol}
            </span>
            <span className="font-mono text-xs text-foreground">
              {item.price}
            </span>
            <span
              className={`flex items-center gap-0.5 font-mono text-xs font-semibold ${
                item.up ? "text-profit" : "text-loss"
              }`}
            >
              {item.up ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

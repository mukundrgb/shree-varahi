"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, Globe, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

type USStock = {
  symbol: string
  name: string
  price: number
  change: number
}

const initialStocks: USStock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 183.92, change: 0.85 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.50, change: 1.24 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 920.15, change: 3.42 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 175.40, change: -1.15 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.10, change: 0.45 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 172.60, change: 1.05 },
]

export function GlobalInvestingSection() {
  const [activeTab, setActiveTab] = useState<"tickers" | "calculator">("tickers")
  const [stocks, setStocks] = useState<USStock[]>(initialStocks)
  const [inrAmount, setInrAmount] = useState<number>(50000)
  const [priceFlash, setPriceFlash] = useState<Record<string, "up" | "down" | null>>({})
  const [usdInrRate, setUsdInrRate] = useState<number>(83.45)
  const [rateChange, setRateChange] = useState<number>(0.12)

  // Live pricing ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random stock to change
      const randomIndex = Math.floor(Math.random() * stocks.length)
      const stock = stocks[randomIndex]
      const deltaPercent = (Math.random() * 0.4 - 0.2) / 100 // -0.2% to +0.2%
      const newPrice = Number((stock.price * (1 + deltaPercent)).toFixed(2))
      const priceDirection = newPrice > stock.price ? "up" : "down"

      setStocks((prevStocks) =>
        prevStocks.map((s, idx) =>
          idx === randomIndex
            ? { ...s, price: newPrice, change: Number((s.change + deltaPercent * 100).toFixed(2)) }
            : s
        )
      )

      // Set flash effect
      setPriceFlash((prev) => ({ ...prev, [stock.symbol]: priceDirection }))
      setTimeout(() => {
        setPriceFlash((prev) => ({ ...prev, [stock.symbol]: null }))
      }, 800)

      // Micro-tick on USD/INR rate too
      if (Math.random() > 0.7) {
        const rateDelta = Number((Math.random() * 0.04 - 0.02).toFixed(2))
        setUsdInrRate((prev) => Number((prev + rateDelta).toFixed(2)))
        setRateChange((prev) => Number((prev + rateDelta * 0.05).toFixed(2)))
      }
    }, 2800)

    return () => clearInterval(interval)
  }, [stocks])

  const usdValue = Number((inrAmount / usdInrRate).toFixed(2))

  return (
    <section id="global-investing" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream via-background to-cream border-t border-border/40">
      {/* Glow decorations */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(217,178,124,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(139,13,25,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-gold-deep" />
              <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
                Global Exposure
              </p>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
              Invest in US Stocks. <br />
              <span className="text-burgundy">Hedge with Dollar Assets.</span>
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
              Diversify your wealth by owning international equities. Open a zero-maintenance global account, complete a fully digital KYC, and remit funds securely under the RBI&apos;s Liberalised Remittance Scheme (LRS) to invest in global monopolies.
            </p>
            
            {/* Features List */}
            <ul className="space-y-4">
              {[
                {
                  title: "Fractional Ownership",
                  desc: "Buy fractions of high-value shares like Apple, Microsoft, or Nvidia starting at just $1."
                },
                {
                  title: "Currency Depreciation Hedge",
                  desc: "Protect your capital's purchasing power against INR depreciation by holding dollar-denominated assets."
                },
                {
                  title: "Curated Thematic Portfolios",
                  desc: "Gain exposure to global megatrends like Artificial Intelligence (AI), Cloud Computing, and Clean Energy."
                }
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-burgundy/10 border border-burgundy/25">
                    <Check className="h-3 w-3 text-burgundy" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-sm sm:text-base mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="pt-2">
              <Button
                size="lg"
                className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px] shadow-lg shadow-burgundy/10 group"
              >
                <span>Explore Global Investing</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Dashboard Terminal */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[12px] bg-background border border-border overflow-hidden shadow-2xl relative"
              style={{
                boxShadow: "0 10px 40px rgba(184,146,74,0.06), 0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              {/* Terminal Header Tabs */}
              <div className="bg-secondary/40 border-b border-border p-3 flex justify-between items-center gap-2">
                <div className="flex bg-beige/25 p-0.5 rounded-[6px] border border-border/80">
                  <button
                    onClick={() => setActiveTab("tickers")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-[4px] transition-all duration-200 ${
                      activeTab === "tickers"
                        ? "bg-white text-burgundy shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Live US Tickers
                  </button>
                  <button
                    onClick={() => setActiveTab("calculator")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-[4px] transition-all duration-200 ${
                      activeTab === "calculator"
                        ? "bg-white text-burgundy shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Remittance Simulator
                  </button>
                </div>
                
                {/* Visual Status Indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                  <span className="text-[10px] font-bold text-profit uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Terminal Body Content */}
              <div className="p-5 min-h-[350px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === "tickers" ? (
                    <motion.div
                      key="tickers"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      {/* Spot currency status strip */}
                      <div className="flex justify-between items-center bg-cream/65 border border-gold/15 rounded-[6px] p-2.5 text-xs">
                        <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5 text-gold-deep" />
                          USD/INR Spot
                        </span>
                        <span className="font-extrabold text-foreground flex items-center gap-1">
                          ₹{usdInrRate.toFixed(2)}
                          <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                            rateChange >= 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                          }`}>
                            {rateChange >= 0 ? "+" : ""}{rateChange.toFixed(2)}%
                          </span>
                        </span>
                      </div>

                      {/* Stock list table */}
                      <div className="space-y-2.5 flex-1 py-2">
                        {stocks.map((stock) => {
                          const flash = priceFlash[stock.symbol]
                          const isProfit = stock.change >= 0
                          
                          return (
                            <div
                              key={stock.symbol}
                              className="flex items-center justify-between border-b border-border/40 pb-2 transition-colors duration-200"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-[4px] bg-secondary/80 flex items-center justify-center font-black text-xs text-muted-foreground">
                                  {stock.symbol.slice(0, 2)}
                                </div>
                                <div>
                                  <div className="font-extrabold text-foreground text-sm leading-tight">{stock.symbol}</div>
                                  <div className="text-[10px] text-muted-foreground">{stock.name}</div>
                                </div>
                              </div>

                              <div className="text-right">
                                <div
                                  className={`text-sm font-extrabold leading-tight px-1.5 py-0.5 rounded transition-all duration-300 ${
                                    flash === "up"
                                      ? "bg-profit/20 text-profit font-black scale-102"
                                      : flash === "down"
                                      ? "bg-loss/20 text-loss font-black scale-102"
                                      : "text-foreground"
                                  }`}
                                >
                                  ${stock.price.toFixed(2)}
                                </div>
                                <div className={`text-[10px] font-bold ${isProfit ? "text-profit" : "text-loss"}`}>
                                  {isProfit ? "+" : ""}{stock.change.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calculator"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5 flex-1 flex flex-col justify-between"
                    >
                      {/* Currency values card */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-cream/40 border border-border p-3 rounded-[6px]">
                          <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">INR Remittance</span>
                          <span className="text-lg font-black text-foreground">₹{inrAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="bg-burgundy/[0.03] border border-burgundy/15 p-3 rounded-[6px]">
                          <span className="block text-[10px] uppercase font-bold text-burgundy mb-1">Estimated USD</span>
                          <span className="text-lg font-black text-burgundy flex items-center">
                            <DollarSign className="h-4 w-4 shrink-0 -ml-1" />
                            {usdValue.toLocaleString("en-US")}
                          </span>
                        </div>
                      </div>

                      {/* Slider Input */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-muted-foreground">Select INR Amount</span>
                          <span className="text-gold-deep">Rate: ₹{usdInrRate.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="5000"
                          max="200000"
                          step="5000"
                          value={inrAmount}
                          onChange={(e) => setInrAmount(Number(e.target.value))}
                          className="w-full h-1.5 bg-secondary rounded-[6px] appearance-none cursor-pointer accent-burgundy"
                        />
                        <div className="flex justify-between text-[10px] font-semibold text-muted-foreground/60">
                          <span>₹5,000</span>
                          <span>₹1,00,000</span>
                          <span>₹2,00,000</span>
                        </div>
                      </div>

                      {/* Fractional ownership calculator list */}
                      <div className="space-y-3 pt-1">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                          Estimated Fractional Shares You Can Buy:
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {stocks.slice(0, 4).map((stock) => {
                            const shares = usdValue / stock.price
                            const sharesFormatted = shares >= 10 ? shares.toFixed(1) : shares.toFixed(3)
                            
                            // Visual percentage to fill radial or progress bar
                            const percent = Math.min(100, Math.floor((shares % 1) * 100))
                            
                            return (
                              <div key={stock.symbol} className="bg-secondary/25 border border-border/40 p-2.5 rounded-[6px] flex flex-col justify-between gap-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-extrabold text-xs text-foreground">{stock.symbol}</span>
                                  <span className="text-[10px] text-muted-foreground">${stock.price.toFixed(0)}</span>
                                </div>
                                <div className="text-sm font-black text-burgundy">
                                  {sharesFormatted} <span className="text-[9px] font-bold text-muted-foreground">shares</span>
                                </div>
                                {/* Mini horizontal bar representing fractional gauge */}
                                <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden mt-1">
                                  <div
                                    className="h-full bg-burgundy rounded-full transition-all duration-300"
                                    style={{ width: `${shares >= 1 ? 100 : percent}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Secure Badge footer */}
                <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-[10px] text-muted-foreground/80 font-bold">
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-profit" /> RBI LRS Compliant
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-profit" /> SIPC Insured to $500k
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

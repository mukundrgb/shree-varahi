"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"

const mtfStocks = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: "₹2,945",
    multiplier: "4x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTGFkpxCrNG0cRha8m9eOpuCnCRF_VpZIegPT-uCQBA&s=10"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: "₹4,125",
    multiplier: "4x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jyL-_GIcHEv--3hXY93fKoutCPT9tbBav0zaB1K7gg&s=10"
  },
  {
    symbol: "HDFC BANK",
    name: "HDFC Bank Ltd",
    price: "₹1,687",
    multiplier: "4x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vULsjoU9yt1cruUVnJvyLbNy7fvTCUwct-j-WeJ2yQ&s"
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    price: "₹1,845",
    multiplier: "4x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOWNptMRwg6QS02x3tJc584QwG_JhR81T5jzOopcK6A&s=10"
  },
  {
    symbol: "ICICI BANK",
    name: "ICICI Bank Ltd",
    price: "₹1,234",
    multiplier: "4x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5m2uMHmF09cJ-O6Vv0t6h2JvCuo-JzEHaAysXW7zxzw&s=10"
  },
  {
    symbol: "BAJAJ FIN",
    name: "Bajaj Finance Ltd",
    price: "₹7,234",
    multiplier: "2x",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqosrP39UAARYjxe_TbibZYSQf9xK6phJU4uFvH-zLgA&s=10"
  },
]
export function MTFSection() {
  const [capital, setCapital] = useState(50000)
  const [multiplier, setMultiplier] = useState(4)
  
  const buyingPower = capital * multiplier
  const fundingRequired = capital * (multiplier - 1)

  const circumference = 219.9
  const maxCapital = 500000
  const capitalRatio = Math.min(capital, maxCapital) / maxCapital
  
  const capArc = (circumference * capitalRatio) / multiplier
  const fundArc = (circumference * capitalRatio * (multiplier - 1)) / multiplier
  const gap = capital > 0 ? 1.5 : 0
  const capDash = `${Math.max(0, capArc - gap)} ${circumference}`
  const fundDash = `${Math.max(0, fundArc - gap)} ${circumference}`
  const fundOffset = -capArc

  const handleCapitalChange = (valStr: string) => {
    const numericVal = parseInt(valStr.replace(/[^0-9]/g, ""), 10)
    if (!isNaN(numericVal)) {
      setCapital(Math.min(numericVal, 1000000))
    } else if (valStr === "" || valStr === "₹") {
      setCapital(0)
    }
  }

  return (
    <section className="bg-background py-16 lg:py-24">
      {/* Section divider */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" /> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            Margin Trading Facility
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Turn ₹ X into <span className="text-burgundy">₹ 4X</span> buying power.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Shree Varahi&apos;s MTF lets you trade with up to 4× your capital across 1,700+ eligible stocks. More buying power. Same account. Zero extra paperwork.
          </p>
        </motion.div>

        {/* Calculator Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-border rounded-[8px] overflow-hidden shadow-sm max-w-5xl mx-auto"
        >
          {/* Header of Calculator */}
          <div className="bg-cream/40 px-6 py-4 border-b border-border/60">
            <h3 className="font-bold text-xl text-foreground">MTF Calculator</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Estimate the total buying power and funding provided by Shree Varahi based on your capital and leverage.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Left side: Inputs */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Input 1: Your Capital */}
                <div className="relative border border-border/80 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/30 transition-all rounded-[6px] flex items-center h-[90px] bg-white">
                  <div className="w-14 h-full flex items-center justify-center border-r border-border/50 text-foreground/60 text-lg font-medium bg-secondary/10">
                    ₹
                  </div>
                  <div className="flex-1 flex flex-col justify-center px-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest text-center font-bold mb-1">
                      Your Capital
                    </span>
                    <input
                      type="text"
                      value={capital === 0 ? "" : capital.toLocaleString("en-IN")}
                      onChange={(e) => handleCapitalChange(e.target.value)}
                      className="text-2xl font-bold text-foreground text-center focus:outline-none w-full bg-transparent p-0"
                    />
                  </div>
                </div>

                {/* Display 2: Total Buying Power */}
                <div className="relative border border-border/80 bg-secondary/5 rounded-[6px] flex items-center h-[90px]">
                  <div className="w-14 h-full flex items-center justify-center border-r border-border/50 text-foreground/50 text-lg font-medium bg-secondary/10">
                    ₹
                  </div>
                  <div className="flex-1 flex flex-col justify-center px-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest text-center font-bold mb-1">
                      Total Buying Power ({multiplier}x)
                    </span>
                    <div className="text-2xl font-bold text-burgundy text-center">
                      {buyingPower.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multiplier Selector */}
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                  Select Leverage Multiplier
                </span>
                <div className="grid grid-cols-3 gap-2 bg-secondary/40 p-1 rounded-[6px]">
                  {[2, 3, 4].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMultiplier(m)}
                      className={`py-1.5 text-xs sm:text-sm font-bold rounded-[4px] transition-all cursor-pointer ${
                        multiplier === m
                          ? "bg-burgundy text-white shadow-xs"
                          : "text-foreground/75 hover:bg-secondary/60"
                      }`}
                    >
                      {m}x Leverage
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for capital */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-muted-foreground font-medium">Adjust Capital</span>
                  <span className="text-foreground font-mono bg-cream px-2 py-0.5 rounded border border-border/60">
                    ₹{capital.toLocaleString("en-IN")}
                  </span>
                </div>
                <Slider
                  value={[capital]}
                  onValueChange={(val) => setCapital(val[0])}
                  min={5000}
                  max={500000}
                  step={5000}
                  className="[&_[role=slider]]:bg-burgundy [&_[role=slider]]:border-burgundy [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>₹5,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>
            </div>

            {/* Right side: Leverage Donut Visual & Legend */}
            <div className="p-6 sm:p-8 flex flex-col justify-center bg-secondary/[0.02]">
              <div className="text-center lg:text-left mb-6">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold block">
                  MTF Leverage
                </span>
                <span className="text-4xl font-extrabold text-foreground mt-1 block">
                  {multiplier}.0x Buying Power
                </span>
              </div>

              {/* Donut and Legend container */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 sm:gap-12">
                {/* SVG Donut */}
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg width="144" height="144" viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#E5E5E5"
                      strokeWidth="16"
                    />
                    {/* Funding (Burgundy) arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="var(--color-burgundy)"
                      strokeWidth="16"
                      strokeDasharray={fundDash}
                      strokeDashoffset={fundOffset}
                      className="transition-all duration-300 ease-out"
                    />
                    {/* Capital (Gold) arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="var(--color-gold)"
                      strokeWidth="16"
                      strokeDasharray={capDash}
                      strokeDashoffset="0"
                      className="transition-all duration-300 ease-out"
                    />
                  </svg>
                </div>

                {/* Legend list */}
                <div className="space-y-4 w-full sm:w-auto">
                  {/* Legend 1: Capital */}
                  <div className="border-l-[4px] border-gold pl-3">
                    <span className="text-xs text-muted-foreground block font-medium">
                      Your Capital ({(100 / multiplier).toFixed(0)}%)
                    </span>
                    <span className="text-lg font-bold text-foreground block mt-0.5">
                      ₹{capital.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Legend 2: Funding */}
                  <div className="border-l-[4px] border-burgundy pl-3">
                    <span className="text-xs text-muted-foreground block font-medium">
                      Shree Varahi Funding ({Math.round(100 * (multiplier - 1) / multiplier)}%)
                    </span>
                    <span className="text-lg font-bold text-burgundy block mt-0.5">
                      ₹{fundingRequired.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-cream/60 border-t border-border flex flex-col md:flex-row items-center justify-between p-6 gap-6">
            {/* Left promo */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="bg-white border border-border/80 rounded-[8px] p-3 flex flex-col items-center justify-center w-20 h-20 shadow-xs flex-shrink-0">
                <span className="text-3xl font-extrabold text-burgundy">₹0</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase text-center mt-0.5 leading-none">
                  Interest*
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-foreground leading-tight">
                  Zero Interest on MTF Funding
                </h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Get interest-free funding on eligible MTF stocks for the first 30 days of your trade.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto max-w-md">
              <div className="relative flex items-center border border-border rounded-[5px] bg-white h-11 px-3 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/30 transition-all flex-1">
                <span className="text-sm font-semibold text-muted-foreground mr-2 border-r border-border/80 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter Your Mobile No."
                  className="bg-transparent text-sm font-medium w-full focus:outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground font-semibold rounded-[5px] h-11 px-6 whitespace-nowrap shadow-sm hover:shadow-md transition-all">
                Start Trading
              </Button>
            </div>
          </div>
        </motion.div>

        {/* MTF Eligible Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-8 text-center text-foreground">Popular MTF Stocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mtfStocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-border rounded-[8px] p-4 flex items-center gap-3 cursor-pointer hover:shadow-md hover:border-gold/50 transition-all"
              >
                <div className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0">
                  <img
                    src={stock.logo}
                    alt={`${stock.symbol} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{stock.symbol}</p>
                  <p className="text-[10px] text-muted-foreground truncate leading-none mt-0.5">{stock.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-foreground">{stock.price}</p>
                  <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] bg-burgundy/10 text-burgundy">
                    {stock.multiplier}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-6">
            <a href="#" className="text-sm text-burgundy hover:underline inline-flex items-center gap-1 font-semibold">
              View all 1,700+ MTF eligible stocks
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

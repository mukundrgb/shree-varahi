"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  TrendingUp, 
  Search, 
  BarChart2, 
  Zap, 
  Scale, 
  Briefcase, 
  PlusCircle, 
  Repeat, 
  Bell,
  Check,
  Plus,
  X,
  MessageCircle,
  TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// FAQ Data — 2-column grouped categories matching homepage pattern
const faqData = {
  "Margin & Trading": [
    {
      q: "What is MTF?",
      a: "Margin Trading Facility (MTF) allows investors to buy eligible stocks by paying only a portion of the total transaction value upfront. The remaining amount is funded by the broker, enabling investors to take larger positions while utilizing their capital more efficiently."
    },
    {
      q: "Which stocks support MTF?",
      a: "MTF is available only on approved stocks that meet regulatory and risk management criteria. The list of eligible stocks may be updated periodically based on exchange and broker guidelines."
    },
    {
      q: "Can I pledge stocks?",
      a: "Yes. You can pledge approved stocks held in your Demat account and use them as collateral to access additional trading margin. This allows you to retain ownership of your investments while utilizing their value for margin benefits."
    },
    {
      q: "What are the brokerage charges?",
      a: "Shree Varahi follows a transparent brokerage structure. Equity Delivery trades may be available at zero brokerage, while Intraday and MTF orders are charged at ₹20 or 0.03% per executed order, whichever is lower. Other statutory charges may apply as per regulations."
    },
    {
      q: "Do I get stock research tools?",
      a: "Yes. Investors gain access to comprehensive research tools, including company financials, valuation metrics, technical charts, market trends, sector comparisons, stock screeners, and investment insights to support informed decision-making."
    },
  ],
  "Account & Getting Started": [
    {
      q: "How can I start investing?",
      a: "Getting started is simple. Open a Demat and Trading Account with Shree Varahi, complete the required KYC process, add funds to your account, research investment opportunities, and begin investing in stocks through the platform."
    },
    {
      q: "Can I track my portfolio on the platform?",
      a: "Yes. The platform provides portfolio tracking tools that allow you to monitor holdings, profit and loss, dividends, and overall investment performance in real time."
    },
    {
      q: "Is there any account opening charge?",
      a: "No. Account opening is available at ₹0, making it easy for new investors to start their investment journey."
    },
    {
      q: "Can beginners invest through Shree Varahi?",
      a: "Absolutely. The platform offers research tools, market insights, portfolio tracking, and expert support to help both new and experienced investors invest with confidence."
    },
    {
      q: "Why should I choose Shree Varahi for stock investing?",
      a: "Shree Varahi combines research-driven investing, Margin Trading Facility (MTF), pledge margin benefits, transparent pricing, and integrated portfolio management tools to provide a complete stock investing experience."
    },
  ],
}

// Mock Screener Stock Type
type ScreenerStock = {
  symbol: string
  name: string
  price: number
  change: number
}

const mockGainers: ScreenerStock[] = [
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd.", price: 952.10, change: 3.42 },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2945.50, change: 2.15 },
  { symbol: "INFY", name: "Infosys Ltd.", price: 1485.00, change: 1.85 },
  { symbol: "M&M", name: "Mahindra & Mahindra Ltd.", price: 2510.40, change: 1.62 },
]

const mockLosers: ScreenerStock[] = [
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1520.15, change: -1.95 },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd.", price: 3892.40, change: -1.24 },
  { symbol: "SBIN", name: "State Bank of India", price: 815.10, change: -1.12 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", price: 1122.30, change: -0.95 },
]

export default function StocksPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [faqSearch, setFaqSearch] = useState("")
  const [screenerTab, setScreenerTab] = useState<"gainers" | "losers">("gainers")
  const [screenerStocks, setScreenerStocks] = useState<ScreenerStock[]>(mockGainers)
  const [priceFlash, setPriceFlash] = useState<Record<string, "up" | "down" | null>>({})
  
  // MTF Calculator state
  const [mtfVal, setMtfVal] = useState<number>(100000)
  
  // Pledge Calculator state
  const [pledgeVal, setPledgeVal] = useState<number>(100000)
  const [haircut, setHaircut] = useState<number>(15) // Default Category A: 15%

  const toggleFaq = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
    )
  }

  const filterFAQs = (faqs: { q: string; a: string }[]) => {
    if (!faqSearch) return faqs
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    )
  }

  // Ticking Stocks simulation inside Screener
  useEffect(() => {
    const list = screenerTab === "gainers" ? mockGainers : mockLosers
    setScreenerStocks(list)
  }, [screenerTab])

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * screenerStocks.length)
      const stock = screenerStocks[idx]
      if (!stock) return
      
      const deltaPercent = (Math.random() * 0.3 - 0.15) / 100
      const newPrice = Number((stock.price * (1 + deltaPercent)).toFixed(2))
      const flash = newPrice > stock.price ? "up" : "down"

      setScreenerStocks((prev) =>
        prev.map((s, i) =>
          i === idx
            ? { ...s, price: newPrice, change: Number((s.change + deltaPercent * 100).toFixed(2)) }
            : s
        )
      )

      setPriceFlash((prev) => ({ ...prev, [stock.symbol]: flash }))
      setTimeout(() => {
        setPriceFlash((prev) => ({ ...prev, [stock.symbol]: null }))
      }, 700)
    }, 3200)

    return () => clearInterval(interval)
  }, [screenerStocks])

  const requiredMtfCash = Math.round(mtfVal * 0.25)
  const shreeVarahiMtfFunding = Math.round(mtfVal * 0.75)
  
  const unlockedPledgeCollateral = Math.round(pledgeVal * (1 - haircut / 100))
  const haircutPledgeValue = Math.round(pledgeVal * (haircut / 100))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative bg-cream overflow-hidden pt-32 pb-20 flex flex-col items-center justify-center text-center">
        {/* Background Grids & Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Fade grid out smoothly at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-burgundy/[0.02] blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl px-4 sm:px-6 lg:px-8 z-10 space-y-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold-deep font-extrabold block">
            Equity Markets
          </p>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-foreground text-balance">
            Stocks Investing With <br />
            <span className="text-burgundy">MTF & Pledge Benefits</span>
          </h1>

          {/* Highlights */}
          <div className="flex flex-row items-center justify-center gap-4 py-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-gold/15 border border-gold/20 text-xs font-bold text-gold-deep">
              31+ · Years of Trust
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-profit/10 border border-profit/20 text-xs font-bold text-profit">
              4.5★ · App Rating
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-3.5 pt-2">
            <Button
              size="lg"
              className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px] shadow-lg shadow-burgundy/10"
            >
              Start Trading
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-8 h-12 text-sm font-bold rounded-[5px]"
            >
              Open Account
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT YOU CAN DO ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream to-background">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground tracking-tight text-balance">
              Everything you need to trade and invest in stocks.
            </h2>
          </div>

          {/* Bento Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Stock Research",
                desc: "Dive into financials, valuation metrics, earnings history, and company fundamentals before making any investment decision.",
                icon: Search
              },
              {
                title: "Technical Analysis",
                desc: "Analyse price action with advanced charts, 100+ indicators, and drawing tools across multiple timeframes.",
                icon: BarChart2
              },
              {
                title: "Margin Trading (MTF)",
                desc: "Get up to 4× buying power on 1,700+ stocks. Invest more without liquidating your existing holdings.",
                icon: Zap
              },
              {
                title: "Pledge Stocks Benefits",
                desc: "Use your existing holdings as collateral to unlock additional margin and put your idle portfolio to work.",
                icon: Scale
              },
              {
                title: "Portfolio Tracking",
                desc: "Monitor your holdings, returns, XIRR performance, dividend payouts, and corporate actions — all in one view.",
                icon: Briefcase
              },
              {
                title: "Watchlists",
                desc: "Track your favourite stocks in real time. Get price alerts and stay on top of every opportunity as it moves.",
                icon: PlusCircle
              },
              {
                title: "SIP in Stocks",
                desc: "Invest a fixed amount in selected stocks every month. Build wealth consistently without timing the market.",
                icon: Repeat
              },
              {
                title: "Market Alerts",
                desc: "Set custom alerts on price levels, volume spikes, and news events. Never miss a move that matters.",
                icon: Bell
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="bg-cream/25 border border-border/40 hover:border-gold-deep/20 p-5 rounded-[8px] flex flex-col justify-between min-h-[200px] hover:shadow-[0_4px_20px_rgba(184,146,74,0.04)] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-[6px] flex items-center justify-center bg-burgundy/[0.04] border border-burgundy/10 mb-4 text-burgundy group-hover:bg-burgundy/[0.08] transition-colors duration-300">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-extrabold text-foreground text-base mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: STOCK DISCOVERY ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-background to-cream">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
              Stock Discovery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground tracking-tight text-balance">
              Find Stocks Faster With Powerful Research & Screening Tools
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Discover stocks, sectors, market movers, and investment opportunities faster.
            </p>
          </div>

          {/* Interactive Screener Widget */}
          <div className="max-w-4xl mx-auto rounded-[12px] bg-background border border-border overflow-hidden shadow-xl">
            <div className="bg-secondary/40 border-b border-border p-4 flex justify-between items-center gap-3">
              <div className="flex bg-beige/25 p-0.5 rounded-[6px] border border-border/80">
                <button
                  onClick={() => setScreenerTab("gainers")}
                  className={`px-4 py-2 text-xs font-bold rounded-[4px] transition-all duration-200 ${
                    screenerTab === "gainers"
                      ? "bg-white text-burgundy shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Top Gainers
                </button>
                <button
                  onClick={() => setScreenerTab("losers")}
                  className={`px-4 py-2 text-xs font-bold rounded-[4px] transition-all duration-200 ${
                    screenerTab === "losers"
                      ? "bg-white text-burgundy shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Top Losers
                </button>
              </div>
              
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-profit rounded-full animate-pulse mr-1" />
                Live NSE/BSE Ticks
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border pb-3 text-xs uppercase font-bold text-muted-foreground">
                      <th className="py-2.5">Symbol</th>
                      <th className="py-2.5">Company</th>
                      <th className="py-2.5 text-right">Price (₹)</th>
                      <th className="py-2.5 text-right">Change (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenerStocks.map((stock) => {
                      const flash = priceFlash[stock.symbol]
                      const isProfit = stock.change >= 0
                      
                      return (
                        <tr
                          key={stock.symbol}
                          className="border-b border-border/40 hover:bg-secondary/15 transition-colors duration-150"
                        >
                          <td className="py-3.5 font-extrabold text-sm text-foreground">{stock.symbol}</td>
                          <td className="py-3.5 text-xs text-muted-foreground font-medium">{stock.name}</td>
                          <td className="py-3.5 text-right">
                            <span className={`text-sm font-extrabold px-1.5 py-0.5 rounded transition-all duration-200 ${
                              flash === "up"
                                ? "bg-profit/20 text-profit"
                                : flash === "down"
                                ? "bg-loss/20 text-loss"
                                : "text-foreground"
                            }`}>
                              {stock.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <span className={`text-xs font-black flex items-center justify-end gap-1 ${
                              isProfit ? "text-profit" : "text-loss"
                            }`}>
                              {isProfit ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {isProfit ? "+" : ""}{stock.change.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Discovery Screening Tags */}
              <div className="mt-6 pt-5 border-t border-border/40 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mr-2">Quick Filters:</span>
                {["52-Week High Breakout", "Undervalued Growth", "High Dividend Yielders", "Volume Surge Alert"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-cream border border-gold/15 text-[10px] sm:text-xs font-bold text-gold-deep hover:bg-gold/5 transition-colors duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TRADE WITH MORE FLEXIBILITY ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream to-background">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
              Margin Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground tracking-tight text-balance">
              Invest Beyond Available Cash
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Enhance your investment potential with Shree Varahi’s margin solutions, designed to maximize opportunities while optimizing your available capital and portfolio holdings.
            </p>
          </div>

          {/* Cards & Calculators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: MTF */}
            <div className="bg-cream/15 border border-border/50 rounded-[12px] p-6 flex flex-col justify-between shadow-sm relative group hover:border-gold/20 transition-all duration-300">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-burgundy/10 text-[10px] font-bold text-burgundy uppercase tracking-wider">
                  Margin Trading Facility
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Margin Trading Facility (MTF)
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Leverage Shree Varahi’s Margin Trading Facility to invest in eligible stocks with lower upfront capital, enhance your buying power, and capitalize on market opportunities while efficiently managing your available funds.
                </p>

                {/* Sub-points Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    "Lower Upfront Investment",
                    "Enhanced Buying Power",
                    "Trade Eligible Stocks",
                    "Efficient Capital Utilization"
                  ].map((pt) => (
                    <div key={pt} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-burgundy shrink-0" strokeWidth={2.5} />
                      <span className="text-xs font-semibold text-foreground">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive MTF Calculator */}
              <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Desired Stock Investment</span>
                  <span className="text-burgundy">4× Buying Power</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xl sm:text-2xl font-black text-foreground">₹{mtfVal.toLocaleString("en-IN")}</span>
                </div>

                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={mtfVal}
                  onChange={(e) => setMtfVal(Number(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-[6px] appearance-none cursor-pointer accent-burgundy"
                />

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white border border-border p-3 rounded-[6px] text-center">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Your Upfront Cash</span>
                    <span className="text-sm sm:text-base font-black text-burgundy">₹{requiredMtfCash.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="bg-burgundy/[0.03] border border-burgundy/15 p-3 rounded-[6px] text-center">
                    <span className="block text-[10px] uppercase font-bold text-burgundy mb-0.5">Shree Varahi Funding</span>
                    <span className="text-sm sm:text-base font-black text-burgundy">₹{shreeVarahiMtfFunding.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Pledge */}
            <div className="bg-cream/15 border border-border/50 rounded-[12px] p-6 flex flex-col justify-between shadow-sm relative group hover:border-gold/20 transition-all duration-300">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-gold/10 text-[10px] font-bold text-gold-deep uppercase tracking-wider">
                  Collateral Margin
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Pledge Margin Benefit
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Unlock additional trading power with Shree Varahi by pledging eligible stocks, accessing extra margins, and maximizing portfolio efficiency without selling your long-term investments.
                </p>

                {/* Sub-points Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    "Unlock Additional Margins",
                    "Trade Without Selling",
                    "Retain Long-Term Holdings",
                    "Increase Trading Capacity"
                  ].map((pt) => (
                    <div key={pt} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-gold-deep shrink-0" strokeWidth={2.5} />
                      <span className="text-xs font-semibold text-foreground">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Pledge Calculator */}
              <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground">Select Stock Quality Category</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => { setHaircut(15); }}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${haircut === 15 ? "bg-gold text-white" : "bg-secondary/40 text-muted-foreground"}`}
                    >
                      A (15%)
                    </button>
                    <button
                      onClick={() => { setHaircut(25); }}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${haircut === 25 ? "bg-gold text-white" : "bg-secondary/40 text-muted-foreground"}`}
                    >
                      B (25%)
                    </button>
                    <button
                      onClick={() => { setHaircut(45); }}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${haircut === 45 ? "bg-gold text-white" : "bg-secondary/40 text-muted-foreground"}`}
                    >
                      C (45%)
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-bold pt-1">
                  <span className="text-muted-foreground">Portfolio Value to Pledge</span>
                  <span className="text-gold-deep">Haircut: {haircut}%</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xl sm:text-2xl font-black text-foreground">₹{pledgeVal.toLocaleString("en-IN")}</span>
                </div>

                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={pledgeVal}
                  onChange={(e) => setPledgeVal(Number(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-[6px] appearance-none cursor-pointer accent-gold"
                />

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white border border-border p-3 rounded-[6px] text-center">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Unlocked Collateral Margin</span>
                    <span className="text-sm sm:text-base font-black text-gold-deep">₹{unlockedPledgeCollateral.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="bg-gold/[0.03] border border-gold/15 p-3 rounded-[6px] text-center">
                    <span className="block text-[10px] uppercase font-bold text-gold-deep mb-0.5">Haircut Deduction</span>
                    <span className="text-sm sm:text-base font-black text-gold-deep">₹{haircutPledgeValue.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: EXPLORE OPPORTUNITIES ── */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-background to-cream">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
              Market Segments
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground tracking-tight text-balance">
              Explore Multiple Stock Opportunities
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Discover investment opportunities across market caps, sectors, and strategies with Shree Varahi’s comprehensive stock selection platform
            </p>
          </div>

          {/* Index quote tickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
            {[
              { name: "NIFTY 50", price: "23,459.61", change: "+1.22%", up: true },
              { name: "NIFTY MIDCAP 100", price: "52,145.20", change: "+0.85%", up: true },
              { name: "NIFTY SMALLCAP 100", price: "16,840.10", change: "+1.48%", up: true },
            ].map((idx) => (
              <div
                key={idx.name}
                className="bg-white border border-border/50 rounded-[8px] p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-gold/30 transition-all duration-300"
              >
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">{idx.name}</div>
                <div className="text-lg font-black text-foreground mb-1">₹{idx.price}</div>
                <div className={`text-xs font-black inline-flex items-center gap-1.5 px-2 py-0.5 rounded ${
                  idx.up ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                }`}>
                  {idx.up ? "▲" : "▼"} {idx.change}
                </div>
              </div>
            ))}
          </div>

          {/* Quick links to sectors — styled as hero service chips */}
          <style>{`
            @property --chip-angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
            }
            @keyframes chip-border-spin {
              to { --chip-angle: 360deg; }
            }
            .chip-border {
              background:
                linear-gradient(rgba(255, 0, 0, 0.9), rgba(255, 0, 0, 0.9)) padding-box,
                conic-gradient(
                  from var(--chip-angle),
                  transparent      0%,
                  rgba(217,178,124,0.85) 18%,
                  rgba(255,245,220,1)    28%,
                  rgba(217,178,124,0.85) 38%,
                  transparent      55%
                ) border-box;
              border: 1.5px solid transparent;
              animation: chip-border-spin 3.5s linear infinite;
            }
            .chip-border:hover {
              background:
                linear-gradient(rgba(204, 0, 0, 0.95), rgba(204, 0, 0, 0.95)) padding-box,
                conic-gradient(
                  from var(--chip-angle),
                  transparent      0%,
                  rgba(217,178,124,1)    18%,
                  rgba(255,245,220,1)    28%,
                  rgba(217,178,124,1)    38%,
                  transparent      55%
                ) border-box;
              animation-duration: 2s;
            }
          `}</style>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-4">
            {["Large Cap Stocks", "Mid Cap Growth", "Small Cap Value", "IT Sector", "Banking Sector", "Automobile", "Metal & Mining", "Pharma & Healthcare"].map((sector) => (
              <span
                key={sector}
                className="chip-border px-5 py-2 rounded-full text-xs font-semibold text-white/90 tracking-tight cursor-pointer"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section className="relative bg-gradient-to-b from-background via-cream to-cream py-16 lg:py-24 overflow-hidden border-t border-border/40">
        {/* Giant ₹17 watermark — matches homepage BrokerageSection */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[20rem] font-black text-burgundy/[0.03] leading-none">
            ₹17
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
              Simple Pricing
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-7xl lg:text-9xl font-black text-gold-deep leading-none">
                ₹17
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-foreground text-balance">
              Flat / Executed Order. <span className="text-burgundy">Every Segment.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              No percentage fees, no hidden slabs. Just one honest price on every intraday trade — and zero brokerage when you invest for the long term.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px]"
              >
                Open Free Account
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ACCORDION — 2-Column matching homepage pattern ── */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
              Your questions. <span className="text-burgundy">Clear answers.</span>
            </h2>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </motion.div>

          {/* Two Column FAQ */}
          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(faqData).map(([category, faqs]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <h3 className="font-bold text-lg mb-4 text-burgundy">{category}</h3>
                {filterFAQs(faqs).map((faq) => (
                  <div
                    key={faq.q}
                    className="bg-white border border-border rounded-[5px] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.q)}
                      className="w-full flex items-start justify-between p-4 text-left"
                    >
                      <span className="font-medium text-foreground pr-4">{faq.q}</span>
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${
                          openItems.includes(faq.q)
                            ? "bg-burgundy text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {openItems.includes(faq.q) ? (
                          <X className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openItems.includes(faq.q) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Chat CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-deep transition-colors font-medium"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>Still have questions? Chat with us</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-burgundy text-white border-t border-white/10">
        {/* Soft atmospheric gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.12) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
            Start your investment journey with Shree Varahi.
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
            Trade and invest in Stocks, F&O, Mutual Funds, ETFs, US Stocks, Commodities, IPOs and more, all from one trusted platform backed by 31 years of experience.
          </p>
          <div className="pt-4 flex justify-center">
            <Button
              size="lg"
              className="bg-white hover:bg-gold-champagne text-burgundy font-black px-10 h-12 text-sm rounded-[5px] shadow-xl"
            >
              Open Free Demat Account →
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

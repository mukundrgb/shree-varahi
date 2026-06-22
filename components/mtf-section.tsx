"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

/* ─── Types & Data ─── */

type Stock = {
  symbol: string
  name: string
  price: number
  mtfRatio: number   // 2 | 3 | 4
  sector: string
  color: string      // avatar bg
}

const ALL_STOCKS: Stock[] = [
  // 4x stocks
  { symbol: "RELIANCE",     name: "Reliance Industries Ltd",      price: 2945,  mtfRatio: 4, sector: "Energy",   color: "#F97316" },
  { symbol: "TCS",          name: "Tata Consultancy Services",    price: 4125,  mtfRatio: 4, sector: "IT",       color: "#6366F1" },
  { symbol: "HDFC BANK",    name: "HDFC Bank Ltd",                price: 1687,  mtfRatio: 4, sector: "Banking",  color: "#2563EB" },
  { symbol: "INFOSYS",      name: "Infosys Ltd",                  price: 1845,  mtfRatio: 4, sector: "IT",       color: "#6366F1" },
  { symbol: "ICICI BANK",   name: "ICICI Bank Ltd",               price: 1234,  mtfRatio: 4, sector: "Banking",  color: "#2563EB" },
  { symbol: "SBI",          name: "State Bank of India",          price: 825,   mtfRatio: 4, sector: "Banking",  color: "#2563EB" },
  { symbol: "ITC",          name: "ITC Ltd",                      price: 462,   mtfRatio: 4, sector: "FMCG",    color: "#7C3AED" },
  { symbol: "L&T",          name: "Larsen & Toubro Ltd",          price: 3890,  mtfRatio: 4, sector: "Infra",   color: "#0891B2" },
  { symbol: "AXIS BANK",    name: "Axis Bank Ltd",                price: 1178,  mtfRatio: 4, sector: "Banking",  color: "#2563EB" },
  { symbol: "HCL TECH",     name: "HCL Technologies Ltd",         price: 1678,  mtfRatio: 4, sector: "IT",       color: "#6366F1" },
  { symbol: "NTPC",         name: "NTPC Ltd",                     price: 356,   mtfRatio: 4, sector: "Power",   color: "#D97706" },
  { symbol: "POWER GRID",   name: "Power Grid Corporation",       price: 312,   mtfRatio: 4, sector: "Power",   color: "#D97706" },
  { symbol: "M&M",          name: "Mahindra & Mahindra Ltd",      price: 2345,  mtfRatio: 4, sector: "Auto",    color: "#0D9488" },
  { symbol: "MARUTI",       name: "Maruti Suzuki India Ltd",      price: 12456, mtfRatio: 4, sector: "Auto",    color: "#0D9488" },
  { symbol: "BHARTI AIRTEL",name: "Bharti Airtel Ltd",            price: 1876,  mtfRatio: 4, sector: "Telecom", color: "#0891B2" },
  // 3x stocks
  { symbol: "WIPRO",        name: "Wipro Ltd",                    price: 565,   mtfRatio: 3, sector: "IT",       color: "#6366F1" },
  { symbol: "BAJAJ FIN",    name: "Bajaj Finance Ltd",            price: 7234,  mtfRatio: 3, sector: "NBFC",    color: "#DB2777" },
  { symbol: "TATA MOTORS",  name: "Tata Motors Ltd",              price: 1012,  mtfRatio: 3, sector: "Auto",    color: "#0D9488" },
  { symbol: "KOTAK BANK",   name: "Kotak Mahindra Bank",          price: 1958,  mtfRatio: 3, sector: "Banking",  color: "#2563EB" },
  { symbol: "ASIAN PAINTS", name: "Asian Paints Ltd",             price: 2456,  mtfRatio: 3, sector: "Consumer", color: "#7C3AED" },
  { symbol: "TITAN",        name: "Titan Company Ltd",            price: 3678,  mtfRatio: 3, sector: "Consumer", color: "#7C3AED" },
  { symbol: "SUN PHARMA",   name: "Sun Pharmaceutical Ltd",       price: 1534,  mtfRatio: 3, sector: "Pharma",  color: "#059669" },
  { symbol: "NESTLE",       name: "Nestlé India Ltd",             price: 2345,  mtfRatio: 3, sector: "FMCG",    color: "#7C3AED" },
  { symbol: "COAL INDIA",   name: "Coal India Ltd",               price: 456,   mtfRatio: 3, sector: "Mining",  color: "#78716C" },
  { symbol: "BRITANNIA",    name: "Britannia Industries Ltd",     price: 5432,  mtfRatio: 3, sector: "FMCG",    color: "#7C3AED" },
  // 2x stocks
  { symbol: "ADANI PORTS",  name: "Adani Ports & SEZ Ltd",        price: 1256,  mtfRatio: 2, sector: "Infra",   color: "#0891B2" },
  { symbol: "ADANI ENT",    name: "Adani Enterprises Ltd",        price: 2890,  mtfRatio: 2, sector: "Congl.",  color: "#0891B2" },
  { symbol: "ZOMATO",       name: "Zomato Ltd",                   price: 245,   mtfRatio: 2, sector: "Tech",    color: "#EF4444" },
]

const POPULAR: string[] = [
  "RELIANCE", "TCS", "HDFC BANK", "INFOSYS",
  "ICICI BANK", "SBI", "WIPRO", "BAJAJ FIN", "TATA MOTORS", "L&T",
]

/* ─── Helpers ─── */

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN")

function StockAvatar({ stock, size = 32 }: { stock: Stock; size?: number }) {
  const initials = stock.symbol.replace(/[^A-Z]/g, "").slice(0, 2)
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0 font-black text-white select-none"
      style={{ width: size, height: size, background: stock.color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

function RatioBadge({ ratio }: { ratio: number }) {
  const styles =
    ratio === 4 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    ratio === 3 ? "bg-blue-50 text-blue-700 border-blue-200" :
                  "bg-amber-50 text-amber-700 border-amber-200"
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] border ${styles} whitespace-nowrap`}>
      {ratio}x MTF
    </span>
  )
}

/* ─── Main Component ─── */

export function MTFSection() {
  const [capital, setCapital] = useState(100000)
  const [selected, setSelected] = useState<Stock>(ALL_STOCKS[0])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const results = query.trim().length > 0
    ? ALL_STOCKS.filter(s =>
        s.symbol.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : []

  const popularStocks = ALL_STOCKS.filter(s => POPULAR.includes(s.symbol))

  const multiplier = selected.mtfRatio
  const buyingPower = capital * multiplier
  const funding = capital * (multiplier - 1)

  /* Donut math */
  const C = 219.9
  const ratio = Math.min(capital, 500000) / 500000
  const capArc = (C * ratio) / multiplier
  const fundArc = (C * ratio * (multiplier - 1)) / multiplier
  const g = capital > 0 ? 1.5 : 0
  const capDash  = `${Math.max(0, capArc  - g)} ${C}`
  const fundDash = `${Math.max(0, fundArc - g)} ${C}`

  /* Click-outside to close dropdown */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const handleSelect = (stock: Stock) => {
    setSelected(stock)
    setQuery("")
    setOpen(false)
  }

  const handleCapitalChange = (raw: string) => {
    const n = parseInt(raw.replace(/[^0-9]/g, ""), 10)
    if (!isNaN(n)) setCapital(Math.min(n, 1000000))
    else if (raw === "" || raw === "₹") setCapital(0)
  }

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
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
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Search any stock.{" "}
            <span className="text-burgundy">See your MTF power.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Different stocks qualify for different MTF limits. Pick a stock below and instantly see how much buying power Shree Varahi unlocks for you.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white border border-border rounded-[8px] shadow-sm">

            {/* Card header */}
            <div className="bg-cream/40 px-4 sm:px-6 py-3 sm:py-4 border-b border-border/60 rounded-t-[8px]">
              <h3 className="font-bold text-xl text-foreground">MTF Calculator</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select a stock to see the exact margin trading facility available — different stocks have different MTF limits.
              </p>
            </div>

            {/* Two-column layout — scrolls horizontally on mobile */}
            <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="grid grid-cols-2 divide-x divide-border" style={{ minWidth: "640px" }}>

              {/* ── LEFT: Capital + Stock Selector ── */}
              <div className="p-6 space-y-6">

                {/* Capital input */}
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                    Your Capital
                  </span>
                  <div className="relative border border-border/80 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/20 transition-all rounded-[6px] flex items-center h-[72px] bg-white">
                    <div className="w-12 h-full flex items-center justify-center border-r border-border/50 text-foreground/50 text-lg font-bold bg-secondary/10 rounded-l-[6px]">
                      ₹
                    </div>
                    <input
                      type="text"
                      value={capital === 0 ? "" : capital.toLocaleString("en-IN")}
                      onChange={(e) => handleCapitalChange(e.target.value)}
                      className="flex-1 text-2xl font-bold text-foreground text-center focus:outline-none bg-transparent px-3"
                      placeholder="0"
                    />
                  </div>

                  {/* Slider */}
                  <div className="mt-4">
                    <div className="px-2.5">
                      <Slider
                        value={[capital]}
                        onValueChange={(v) => setCapital(v[0])}
                        min={5000}
                        max={500000}
                        step={5000}
                        className="[&_[role=slider]]:bg-burgundy [&_[role=slider]]:border-burgundy [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground font-medium mt-2">
                        <span>₹5,000</span>
                        <span>₹5,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stock Selector */}
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                    Select Stock to Check MTF
                  </span>

                  {/* Search box + dropdown */}
                  <div className="relative mb-3" ref={searchRef}>
                    <div className={`flex items-center gap-2 border rounded-[6px] px-3 h-10 bg-white transition-all ${open || query ? "border-burgundy ring-1 ring-burgundy/20" : "border-border/80"}`}>
                      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
                        onFocus={() => setOpen(true)}
                        placeholder="Search stock e.g. Infosys, HDFC..."
                        className="flex-1 text-[13px] focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground/50"
                      />
                      {query && (
                        <button onClick={() => { setQuery(""); setOpen(false) }} className="text-muted-foreground hover:text-foreground">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Search dropdown */}
                    <AnimatePresence>
                      {open && results.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 top-[calc(100%+4px)] left-0 right-0 bg-white border border-border rounded-[6px] shadow-lg overflow-hidden"
                        >
                          {results.map((stock) => (
                            <button
                              key={stock.symbol}
                              onMouseDown={() => handleSelect(stock)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/40 transition-colors text-left ${selected.symbol === stock.symbol ? "bg-burgundy/5" : ""}`}
                            >
                              <StockAvatar stock={stock} size={28} />
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-foreground leading-none">{stock.symbol}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{stock.name}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[12px] font-semibold text-foreground">{fmt(stock.price)}</span>
                                <RatioBadge ratio={stock.mtfRatio} />
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Popular chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {popularStocks.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleSelect(stock)}
                        className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-[4px] border transition-all ${
                          selected.symbol === stock.symbol
                            ? "bg-burgundy text-white border-burgundy shadow-sm"
                            : "bg-secondary/30 text-foreground/70 border-border hover:border-burgundy/40 hover:bg-secondary/60"
                        }`}
                      >
                        <span
                          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: selected.symbol === stock.symbol ? "rgba(255,255,255,0.7)" : stock.color }}
                        />
                        {stock.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Selected Stock + Result ── */}
              <div className="p-6 flex flex-col gap-5">

                {/* Selected stock card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.symbol}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[6px] border border-border bg-secondary/10 p-3 flex items-center gap-3"
                  >
                    <StockAvatar stock={selected} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-black text-[14px] text-foreground leading-none">{selected.symbol}</p>
                        <RatioBadge ratio={selected.mtfRatio} />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{selected.name}</p>
                      <p className="text-[11px] font-semibold text-foreground mt-0.5">{fmt(selected.price)} / share</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <p className="text-[9px] text-emerald-600 font-bold mt-0.5 uppercase tracking-wide">MTF Eligible</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Donut + Legend — always side-by-side */}
                <div className="flex items-center gap-5">
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="35" fill="transparent" stroke="#E5E5E5" strokeWidth="16" />
                      <circle
                        cx="50" cy="50" r="35" fill="transparent"
                        stroke="var(--color-burgundy)" strokeWidth="16"
                        strokeDasharray={fundDash}
                        strokeDashoffset={-capArc}
                        className="transition-all duration-500 ease-out"
                      />
                      <circle
                        cx="50" cy="50" r="35" fill="transparent"
                        stroke="var(--color-gold)" strokeWidth="16"
                        strokeDasharray={capDash}
                        strokeDashoffset="0"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-foreground leading-none">{multiplier}x</span>
                      <span className="text-[9px] text-muted-foreground font-semibold mt-0.5">buying power</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    <div className="border-l-[3px] border-gold pl-3">
                      <span className="text-[10px] text-muted-foreground block font-medium leading-snug">
                        Your Capital
                        <span className="text-muted-foreground/60 ml-1">({Math.round(100 / multiplier)}%)</span>
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={capital}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          className="text-lg font-black text-foreground block mt-0.5"
                        >
                          {fmt(capital)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="border-l-[3px] border-burgundy pl-3">
                      <span className="text-[10px] text-muted-foreground block font-medium leading-snug">
                        Varahi Funding
                        <span className="text-muted-foreground/60 ml-1">({Math.round(100 * (multiplier - 1) / multiplier)}%)</span>
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${capital}-${multiplier}`}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          className="text-lg font-black text-burgundy block mt-0.5"
                        >
                          {fmt(funding)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Total buying power highlight */}
                <div className="rounded-[6px] p-4 flex items-center justify-between gap-2" style={{ background: "linear-gradient(135deg, rgba(255,0,0,0.06) 0%, rgba(217,178,124,0.08) 100%)", border: "1px solid rgba(255,0,0,0.12)" }}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Total Buying Power</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${capital}-${multiplier}-bp`}
                        initial={{ opacity: 0.4, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="text-2xl sm:text-3xl font-black text-burgundy mt-0.5"
                      >
                        {fmt(buyingPower)}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      on {fmt(capital)} in <span className="font-semibold text-foreground">{selected.symbol}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-3xl sm:text-4xl font-black" style={{ color: "#FF0000", opacity: 0.15 }}>{multiplier}x</div>
                  </div>
                </div>
              </div>
            </div>
            </div>{/* end overflow-x-auto */}

            {/* Bottom CTA */}
            <div className="bg-cream/50 border-t border-border rounded-b-[8px] flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="bg-white border border-border rounded-[8px] p-2.5 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shadow-xs flex-shrink-0">
                  <span className="text-lg sm:text-xl font-extrabold text-burgundy">₹0</span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase text-center mt-0.5 leading-none">Interest*</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-foreground leading-tight">Zero Interest for First 30 Days</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get interest-free MTF funding on eligible stocks for the first 30 days. 1,700+ stocks available.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex items-center border border-border rounded-[5px] bg-white h-11 px-3 focus-within:border-burgundy focus-within:ring-1 focus-within:ring-burgundy/20 transition-all flex-1">
                  <span className="text-sm font-semibold text-muted-foreground mr-2 border-r border-border/80 pr-2 flex-shrink-0">+91</span>
                  <input type="tel" placeholder="Enter Mobile No." className="bg-transparent text-sm font-medium w-full focus:outline-none placeholder:text-muted-foreground/60" />
                </div>
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white font-semibold rounded-[5px] h-11 px-6 whitespace-nowrap">
                  Start Trading
                </Button>
              </div>
            </div>

          </div>

          {/* View all link */}
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

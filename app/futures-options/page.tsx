"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  ChevronRight, 
  Plus,
  X,
  Percent,
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  LineChart, 
  Layers, 
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Check,
  Search,
  Activity,
  Smartphone,
  Sparkles,
  Star
} from "lucide-react"

// ── CUSTOM BG GLOW GRAPHICS ──
function ElegantBgGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.05]">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #B8924A 1px, transparent 1px), linear-gradient(to bottom, #B8924A 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
    </div>
  )
}

export default function FuturesOptionsPage() {
  // ── 1. TICKER LOGIC (FOR DYNAMIC FEEDS) ──
  const [niftyPrice, setNiftyPrice] = useState(23456.75)
  const [niftyChange, setNiftyChange] = useState(1.25)
  const [bankNiftyPrice, setBankNiftyPrice] = useState(50120.40)
  const [reliancePrice, setReliancePrice] = useState(2945.30)
  const [goldPrice, setGoldPrice] = useState(72400)
  const [crudePrice, setCrudePrice] = useState(6450)

  useEffect(() => {
    const timer = setInterval(() => {
      const niftyTick = (Math.random() - 0.5) * 3
      setNiftyPrice(prev => Number((prev + niftyTick).toFixed(2)))
      setNiftyChange(prev => Number((prev + niftyTick * 0.005).toFixed(2)))

      const bankNiftyTick = (Math.random() - 0.5) * 12
      setBankNiftyPrice(prev => Number((prev + bankNiftyTick).toFixed(2)))

      const relianceTick = (Math.random() - 0.5) * 0.8
      setReliancePrice(prev => Number((prev + relianceTick).toFixed(2)))

      const goldTick = (Math.random() - 0.5) * 15
      setGoldPrice(prev => Math.round(prev + goldTick))

      const crudeTick = (Math.random() - 0.5) * 4
      setCrudePrice(prev => Math.round(prev + crudeTick))
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  // ── 2. HERO SIMULATED ORDER STATE ──
  const [heroOrderState, setHeroOrderState] = useState<"idle" | "submitting" | "success">("idle")
  const [heroOrderType, setHeroOrderType] = useState<"BUY" | "SELL">("BUY")
  const [heroActiveTab, setHeroActiveTab] = useState<"NIFTY" | "BANKNIFTY" | "MCX">("NIFTY")
  const [heroStrike, setHeroStrike] = useState("23500 CE")
  const [heroQty, setHeroQty] = useState(50)

  const triggerHeroOrder = () => {
    if (heroOrderState !== "idle") return
    setHeroOrderState("submitting")
    setTimeout(() => {
      setHeroOrderState("success")
      setTimeout(() => setHeroOrderState("idle"), 3000)
    }, 1200)
  }

  // ── 3. BENTO INTERACTIVE PAYOFF STRATEGY ──
  const [bentoPayoffStrategy, setBentoPayoffStrategy] = useState<"call" | "spread">("call")

  // ── 4. BENTO LEVERAGE ──
  const [bentoLeverage, setBentoLeverage] = useState(3)

  // ── 5. OPTIONS vs FUTURES WORKSPACE ──
  const [workspaceTab, setWorkspaceTab] = useState<"options" | "futures">("options")
  const [hoveredGreekStrike, setHoveredGreekStrike] = useState<number | null>(23400)
  
  const strikePivot = hoveredGreekStrike || 23400

  // Futures Calculator State
  const [futuresLots, setFuturesLots] = useState(3)
  const [futuresPriceInput, setFuturesPriceInput] = useState(23400)
  const [selectedAsset, setSelectedAsset] = useState<"NIFTY" | "GOLD" | "RELIANCE">("NIFTY")

  const getLotDetails = () => {
    switch (selectedAsset) {
      case "GOLD": return { size: 100 }
      case "RELIANCE": return { size: 250 }
      default: return { size: 50 }
    }
  }

  const lotDetails = getLotDetails()
  const futuresContractVal = futuresLots * lotDetails.size * futuresPriceInput
  const initialMargin = Math.round(futuresContractVal * 0.12)
  const exposureMargin = Math.round(futuresContractVal * 0.02)
  const totalMargin = initialMargin + exposureMargin

  // Risk Needle Angle Math (-90 to +90 degrees)
  const maxRiskCapital = 2500000
  const riskFraction = Math.min(totalMargin / maxRiskCapital, 1)
  const needleRotation = -90 + (riskFraction * 180)

  // ── 6. TIMELINE STEP STATE ──
  const [activeStep, setActiveStep] = useState(0)

  // ── 7. PRICING & SAVINGS CALCULATOR STATE ──
  const [tradesPerMonth, setTradesPerMonth] = useState(60)
  const traditionalCost = tradesPerMonth * 12 * 20
  const varahiCost = tradesPerMonth * 12 * 17
  const annualSavings = traditionalCost - varahiCost

  // ── 8. FAQ STATE ──
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

  // ── 10. MARKETS TAB STATE ──
  type MarketsTabKey = "Index F&O" | "Stock F&O" | "Commodity F&O"
  const [marketsTab, setMarketsTab] = useState<MarketsTabKey>("Index F&O")

  const marketsData: Record<MarketsTabKey, { icon: string; name: string; price: number; change: number; changePct: number }[]> = {
    "Index F&O": [
      { icon: "📈", name: "NIFTY 50",       price: niftyPrice,     change: niftyChange,     changePct: niftyChange / niftyPrice * 100 },
      { icon: "🏦", name: "BANK NIFTY",     price: bankNiftyPrice, change: -120.40,          changePct: -0.24 },
      { icon: "💹", name: "FINNIFTY",       price: 23812.50,       change: 45.30,            changePct: 0.19 },
      { icon: "📊", name: "MIDCAP NIFTY",   price: 52340.25,       change: -215.80,          changePct: -0.41 },
      { icon: "🌐", name: "SENSEX",         price: 76820.40,       change: 183.60,           changePct: 0.24 },
      { icon: "🔷", name: "NIFTY NEXT 50",  price: 67421.00,       change: -98.50,           changePct: -0.15 },
      { icon: "📉", name: "NIFTY IT",       price: 35218.75,       change: 312.40,           changePct: 0.89 },
      { icon: "💰", name: "NIFTY PSU BANK", price: 5812.30,        change: -41.20,           changePct: -0.70 },
    ],
    "Stock F&O": [
      { icon: "🛢️", name: "RELIANCE",      price: reliancePrice,  change: 12.30,            changePct: 0.42 },
      { icon: "💻", name: "TCS",           price: 3840.40,        change: -28.60,           changePct: -0.74 },
      { icon: "🔵", name: "INFY",          price: 1485.00,        change: 18.50,            changePct: 1.26 },
      { icon: "🏧", name: "HDFC BANK",     price: 1620.80,        change: -9.40,            changePct: -0.58 },
      { icon: "🚗", name: "TATA MOTORS",   price: 952.10,         change: 32.60,            changePct: 3.55 },
      { icon: "⚡", name: "ADANI GREEN",   price: 1842.35,        change: -54.80,           changePct: -2.89 },
      { icon: "🏗️", name: "L&T",          price: 3315.50,        change: 47.20,            changePct: 1.44 },
      { icon: "💊", name: "SUN PHARMA",    price: 1741.20,        change: -23.10,           changePct: -1.31 },
    ],
    "Commodity F&O": [
      { icon: "🥇", name: "GOLD",         price: goldPrice,      change: -1520,            changePct: -2.06 },
      { icon: "🥈", name: "SILVER",       price: 87420,          change: -1840,            changePct: -2.06 },
      { icon: "🛢️", name: "CRUDE OIL",   price: crudePrice,     change: -48,              changePct: -0.74 },
      { icon: "🔥", name: "NATURAL GAS",  price: 296.80,         change: -4.80,            changePct: -1.59 },
      { icon: "🟤", name: "COPPER",       price: 812.35,         change: -4.15,            changePct: -0.51 },
      { icon: "⚙️", name: "NICKEL",      price: 1736.40,        change: -21.20,           changePct: -1.21 },
      { icon: "🔩", name: "ZINC",         price: 362.95,         change: -2.55,            changePct: -0.70 },
      { icon: "🌾", name: "COTTON",       price: 58200,          change: 420,              changePct: 0.73 },
    ],
  }

  // ── 9. SMS CTA STATE ──
  const [smsNum, setSmsNum] = useState("")
  const [smsStatus, setSmsStatus] = useState<"idle" | "sending" | "sent">("idle")

  const triggerSms = (e: React.FormEvent) => {
    e.preventDefault()
    if (!smsNum || smsStatus !== "idle") return
    setSmsStatus("sending")
    setTimeout(() => {
      setSmsStatus("sent")
      setTimeout(() => {
        setSmsStatus("idle")
        setSmsNum("")
      }, 4000)
    }, 1000)
  }

  const basePrice = heroActiveTab === "BANKNIFTY" ? bankNiftyPrice : heroActiveTab === "MCX" ? goldPrice : niftyPrice

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── SECTION 1: HERO (THE INDUSTRIAL DERIVATIVES PORTAL) ── */}
      <section className="relative bg-cream pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-border/50 overflow-hidden">
        {/* Full Screen Matrix Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #B8924A 1px, transparent 1px), linear-gradient(to bottom, #B8924A 1px, transparent 1px)', 
              backgroundSize: '50px 50px' 
            }} 
          />
          {/* Axis Labels representing financial tick marks */}
          <div className="absolute left-4 top-10 font-mono text-[9px] text-gold-deep uppercase">INDEX TICK MATRIX</div>
          <div className="absolute left-4 top-32 font-mono text-[9px] text-gold-deep font-bold">23,400</div>
          <div className="absolute left-4 top-64 font-mono text-[9px] text-gold-deep font-bold">23,450</div>
          <div className="absolute left-4 top-96 font-mono text-[9px] text-gold-deep font-bold">23,500</div>
          <div className="absolute right-4 top-20 font-mono text-[9px] text-gold-deep">IV: 12.8%</div>
        </div>

        {/* Glowing atmospheric halos */}
        <div className="absolute top-[10%] left-[30%] -translate-x-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-burgundy/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Column: Deep Typographic Editorial */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Bold Headline Pairing */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground tracking-tight leading-[1.02]">
                Trade Futures &amp; Options <br />
                <span className="text-burgundy">With Advanced F&amp;O Tools</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Trade Futures &amp; Options confidently with Shree Varahi’s advanced platform, featuring strategy tools, real-time monitoring, market analysis, and effective risk management capabilities.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-burgundy hover:bg-burgundy-deep text-white px-8 h-14 text-base font-bold rounded-[5px] shadow-lg shadow-burgundy/20 transition-transform hover:scale-[1.01]"
                >
                  Start Trading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-border text-foreground hover:bg-white px-8 h-14 text-base font-bold rounded-[5px] bg-transparent"
                >
                  Open Account
                </Button>
              </div>

              {/* Highlights Placement (Below CTA) */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">31+ · Years of Trust</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-350" />
                <span className="flex items-center gap-1.5">4.5★ · App Rating</span>
              </div>
            </div>

            {/* Hero Right Column: Bloomberg/TradingView Styled Terminal Mockup */}
            <div className="lg:col-span-5 flex justify-center w-full relative">
              
              {/* Back decoration halo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none opacity-[0.08] z-0 bg-radial-gradient" 
                style={{
                  background: "radial-gradient(circle, rgba(139,13,25,0.4) 0%, transparent 70%)",
                  filter: "blur(40px)"
                }}
              />

              <div className="w-full max-w-[460px] bg-slate-900 border border-slate-800 rounded-[20px] shadow-2xl overflow-hidden text-slate-200 relative flex flex-col font-mono text-xs select-none z-10">
                {/* Glowing border flare */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                
                {/* Terminal Header */}
                <div className="flex justify-between items-center bg-slate-950 px-4 py-2.5 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                    <span className="font-sans font-bold text-[9px] uppercase text-slate-400 tracking-wider">VARAHI-PRO ENGINE v1.2</span>
                  </div>
                  <span className="text-[8px] text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">
                    GATEWAY: L-42ms
                  </span>
                </div>

                {/* Ticker Selector Bar */}
                <div className="grid grid-cols-3 bg-slate-900 border-b border-slate-850 text-center font-sans">
                  <button 
                    onClick={() => {
                      setHeroActiveTab("NIFTY")
                      setHeroStrike("23500 CE")
                    }}
                    className={`py-2.5 font-bold border-r border-slate-850 transition-all ${heroActiveTab === "NIFTY" ? "text-gold bg-slate-850/40 shadow-inner" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    NIFTY OPT
                  </button>
                  <button 
                    onClick={() => {
                      setHeroActiveTab("BANKNIFTY")
                      setHeroStrike("50100 CE")
                    }}
                    className={`py-2.5 font-bold border-r border-slate-850 transition-all ${heroActiveTab === "BANKNIFTY" ? "text-gold bg-slate-850/40 shadow-inner" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    BANKNIFTY
                  </button>
                  <button 
                    onClick={() => {
                      setHeroActiveTab("MCX")
                      setHeroStrike("GOLD 72000 CE")
                    }}
                    className={`py-2.5 font-bold transition-all ${heroActiveTab === "MCX" ? "text-gold bg-slate-850/40 shadow-inner" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    MCX COMM
                  </button>
                </div>

                {/* Two-Column Panel Layout inside Terminal */}
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-850 bg-slate-950/40">
                  
                  {/* Left Side: Candlestick Chart Preview (col-span-7) */}
                  <div className="col-span-7 p-3 border-r border-slate-850 space-y-2">
                    <div className="flex justify-between items-center text-[8px] text-slate-500 font-sans uppercase">
                      <span>Live Quote Chart</span>
                      <span>1-Min Ticks</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-white tracking-tight">
                        ₹{basePrice.toLocaleString("en-IN", { minimumFractionDigits: heroActiveTab === "MCX" ? 0 : 2 })}
                      </span>
                      {heroActiveTab === "NIFTY" && (
                        <span className={`text-[9px] font-bold ${niftyChange >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                          {niftyChange >= 0 ? "+" : ""}{niftyChange}%
                        </span>
                      )}
                    </div>

                    {/* Chart Canvas Area */}
                    <div className="h-28 w-full bg-slate-950/60 rounded-[5px] border border-slate-850/70 relative flex items-end overflow-hidden">
                      <svg className="w-full h-full p-1 stroke-[1.2]" viewBox="0 0 160 80">
                        <line x1="0" y1="40" x2="160" y2="40" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        <line x1="0" y1="60" x2="160" y2="60" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2" />
                        
                        {[
                          { x: 15, o: 55, c: 50, h: 48, l: 58, bull: true },
                          { x: 35, o: 50, c: 53, h: 47, l: 56, bull: false },
                          { x: 55, o: 53, c: 45, h: 42, l: 55, bull: true },
                          { x: 75, o: 45, c: 48, h: 40, l: 50, bull: false },
                          { x: 95, o: 48, c: 38, h: 35, l: 50, bull: true },
                          { x: 115, o: 38, c: 32, h: 30, l: 40, bull: true },
                          { x: 135, o: 32, c: 28, h: 25, l: 35, bull: true },
                          { x: 155, o: 28, c: 30, h: 26, l: 33, bull: false }
                        ].map((candle, cIdx) => {
                          const clr = candle.bull ? "#D9B27C" : "#8B0D19"
                          return (
                            <g key={cIdx}>
                              <line x1={candle.x} y1={candle.h} x2={candle.x} y2={candle.l} stroke={clr} />
                              <rect 
                                x={candle.x - 3} 
                                y={Math.min(candle.o, candle.c)} 
                                width="6" 
                                height={Math.max(2, Math.abs(candle.c - candle.o))} 
                                fill={clr} 
                                stroke={clr}
                                fillOpacity="0.4"
                              />
                            </g>
                          )
                        })}
                        <line x1="0" y1="30" x2="160" y2="30" stroke="#D9B27C" strokeWidth="0.6" strokeDasharray="2" />
                      </svg>
                      <span className="absolute top-1 right-1 font-mono text-[7px] text-slate-500">Vol: 1.2M</span>
                    </div>
                  </div>

                  {/* Right Side: Order Book Bid/Ask Ladder (col-span-5) */}
                  <div className="col-span-5 p-3 space-y-1.5 font-sans">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Match Order Book</span>
                    
                    <div className="space-y-1 font-mono text-[9px]">
                      {[
                        { price: basePrice + 1.50, qty: 820, size: 45 },
                        { price: basePrice + 0.80, qty: 1100, size: 60 }
                      ].map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-center relative py-0.5 px-1 overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 z-0 transition-all" style={{ width: `${row.size}%` }} />
                          <span className="text-rose-400 font-bold z-10">{row.price.toFixed(heroActiveTab === "MCX" ? 0 : 2)}</span>
                          <span className="text-slate-400 font-bold z-10">{row.qty}</span>
                        </div>
                      ))}

                      <div className="flex justify-between text-[7px] text-slate-500 border-y border-slate-850 py-0.5 font-bold uppercase tracking-wider">
                        <span>SPREAD:</span>
                        <span>0.30</span>
                      </div>

                      {[
                        { price: basePrice - 0.50, qty: 950, size: 50 },
                        { price: basePrice - 1.20, qty: 1540, size: 80 }
                      ].map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-center relative py-0.5 px-1 overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 z-0 transition-all" style={{ width: `${row.size}%` }} />
                          <span className="text-emerald-400 font-bold z-10">{row.price.toFixed(heroActiveTab === "MCX" ? 0 : 2)}</span>
                          <span className="text-slate-400 font-bold z-10">{row.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Simulated Order Form Widget */}
                <div className="p-4 bg-slate-900 border-t border-slate-850 space-y-3 font-sans">
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TRANSACTION PANEL</span>
                    <div className="flex bg-slate-950 p-0.5 rounded-[5px] border border-slate-850">
                      <button 
                        onClick={() => setHeroOrderType("BUY")}
                        className={`px-3 py-1 text-[9px] font-black rounded-[4px] transition-colors ${heroOrderType === "BUY" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        BUY
                      </button>
                      <button 
                        onClick={() => setHeroOrderType("SELL")}
                        className={`px-3 py-1 text-[9px] font-black rounded-[4px] transition-colors ${heroOrderType === "SELL" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        SELL
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-bold block uppercase tracking-wide">Strike Select</label>
                      <select 
                        value={heroStrike}
                        onChange={(e) => setHeroStrike(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-[5px] px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-gold font-mono"
                      >
                        {heroActiveTab === "NIFTY" && (
                          <>
                            <option value="23400 CE">23400 CE (ATM)</option>
                            <option value="23500 CE">23500 CE (OTM)</option>
                            <option value="23300 PE">23300 PE (ITM)</option>
                          </>
                        )}
                        {heroActiveTab === "BANKNIFTY" && (
                          <>
                            <option value="50000 CE">50000 CE (ITM)</option>
                            <option value="50100 CE">50100 CE (ATM)</option>
                            <option value="50200 PE">50200 PE (OTM)</option>
                          </>
                        )}
                        {heroActiveTab === "MCX" && (
                          <>
                            <option value="GOLD 72000 CE">GOLD 72000 CE</option>
                            <option value="GOLD 72500 PE">GOLD 72500 PE</option>
                            <option value="CRUDE 6500 CE">CRUDE 6500 CE</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-bold block uppercase tracking-wide">Lots Quantity</label>
                      <div className="flex items-center bg-slate-950 border border-slate-850 rounded-[5px] overflow-hidden">
                        <button 
                          type="button"
                          onClick={() => setHeroQty(prev => Math.max(50, prev - 50))}
                          className="px-2.5 py-1.5 text-slate-400 hover:text-white border-r border-slate-850 font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-mono text-xs text-white font-bold">{heroQty}</span>
                        <button 
                          type="button"
                          onClick={() => setHeroQty(prev => Math.min(500, prev + 50))}
                          className="px-2.5 py-1.5 text-slate-400 hover:text-white border-l border-slate-850 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={triggerHeroOrder}
                    disabled={heroOrderState !== "idle"}
                    className={`w-full py-2.5 text-xs font-black rounded-[5px] transition-all tracking-widest ${
                      heroOrderState === "submitting" 
                        ? "bg-slate-800 text-slate-400 cursor-not-allowed" 
                        : heroOrderState === "success" 
                        ? "bg-emerald-500 text-white"
                        : "bg-gold hover:bg-gold-deep text-slate-950 hover:scale-[1.01]"
                    }`}
                  >
                    {heroOrderState === "submitting" && "TRANSMITTING VECTORS..."}
                    {heroOrderState === "success" && "✓ MATCH ORDER FILLED"}
                    {heroOrderState === "idle" && `EXECUTE ${heroOrderType} ${heroQty} CONTRACTS`}
                  </button>
                </div>

                {/* Match Engine Console Logs */}
                <div className="bg-slate-950 border-t border-slate-850 p-3.5 space-y-1 font-mono text-[9px] text-slate-500 h-24 overflow-y-auto">
                  <div className="text-slate-450 font-bold uppercase tracking-wider mb-1 font-sans text-[8px]">Console Monitor</div>
                  <div>[12:44:00] MATCH ENGINE INITIALIZED.</div>
                  <div>[12:44:01] EXCHANGE DIRECT ACCESS LINK STABLE (L: 42ms).</div>
                  {heroOrderState === "submitting" && (
                    <div className="text-gold animate-pulse">[12:44:12] OUTGOING VECTOR: SENDING {heroQty} STRIKE {heroStrike}...</div>
                  )}
                  {heroOrderState === "success" && (
                    <>
                      <div className="text-emerald-400 font-bold">[12:44:13] EXCHANGE MATCH: FILLED {heroQty} QTY AT LATEST LTP.</div>
                      <div className="text-slate-400">[12:44:13] TRANSACTION COMPLETED. ID: #SV-{Math.floor(1000 + Math.random()*9000)}</div>
                    </>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: BENTO GRID FEATURE SHOWCASE ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Trading Suite
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Built for the F&amp;O trader who <span className="text-burgundy">analyse, strategise, and execute.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Trade with confidence using simple F&amp;O tools designed for market analysis, strategy creation, quick execution, and easy position tracking
            </p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            
            {/* Card 1: Options Trading (Large Bento) */}
            <div className="col-span-12 lg:col-span-8 bg-cream border border-border/80 rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row justify-between gap-8 hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-burgundy/10 flex items-center justify-center mb-5 border border-burgundy/10">
                    <Layers className="h-5 w-5 text-[#8B0D19]" />
                  </div>
                  <h3 className="font-extrabold text-xl text-foreground tracking-tight mb-2">Options Trading</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Buy and sell Call and Put options on supported stocks and indices, and trade quickly and confidently as the market moves up or down.
                  </p>
                </div>
                {/* Toggles */}
                <div className="flex bg-white/80 p-1 border border-border/80 rounded-[6px] w-fit font-sans">
                  <button 
                    onClick={() => setBentoPayoffStrategy("call")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all ${bentoPayoffStrategy === "call" ? "bg-burgundy text-white" : "text-muted-foreground"}`}
                  >
                    Long Call
                  </button>
                  <button 
                    onClick={() => setBentoPayoffStrategy("spread")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all ${bentoPayoffStrategy === "spread" ? "bg-burgundy text-white" : "text-muted-foreground"}`}
                  >
                    Bull Spread
                  </button>
                </div>
              </div>

              {/* Graphic payload preview */}
              <div className="flex-1 bg-white border border-border/85 rounded-xl p-4 flex flex-col justify-between font-mono text-[10px] text-slate-500 min-h-[190px]">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider">Strategy Payoff Visual</span>
                  <span className="font-bold text-profit">Max Profit: Unlimited</span>
                </div>
                <div className="h-28 w-full relative flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    <line x1="0" y1="40" x2="200" y2="40" stroke="#CCCCCC" strokeDasharray="3 3" strokeWidth="1" />
                    
                    {bentoPayoffStrategy === "call" ? (
                      <>
                        <path d="M 0 60 L 100 60 L 100 40 L 0 40 Z" fill="#DC2626" opacity="0.08" />
                        <path d="M 100 40 L 200 10 L 200 40 Z" fill="#059669" opacity="0.08" />
                        <path d="M 0 60 L 100 60 L 180 15" fill="none" stroke="#8B0D19" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        <path d="M 0 60 L 80 60 L 80 40 L 0 40 Z" fill="#DC2626" opacity="0.08" />
                        <path d="M 120 20 L 200 20 L 200 40 L 120 40 Z" fill="#059669" opacity="0.08" />
                        <path d="M 0 60 L 80 60 L 120 20 L 200 20" fill="none" stroke="#B8924A" strokeWidth="2" />
                      </>
                    )}
                    <circle cx={bentoPayoffStrategy === "call" ? 100 : 80} cy="60" r="3" fill="#8B0D19" />
                    <text x={bentoPayoffStrategy === "call" ? 85 : 60} y="72" fontSize="7" fill="#888">Breakeven Strike</text>
                  </svg>
                </div>
                <div className="text-[9px] text-center text-slate-400">
                  * Live payoffs react dynamically to adjustments in target strikes.
                </div>
              </div>
            </div>

            {/* Card 2: Futures Trading (Large Bento) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-border/80 rounded-[20px] p-6 lg:p-8 flex flex-col justify-between hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-[8px] bg-burgundy/10 flex items-center justify-center mb-5 border border-burgundy/10">
                  <LineChart className="h-5 w-5 text-[#8B0D19]" />
                </div>
                <h3 className="font-extrabold text-xl text-foreground tracking-tight mb-2">Futures Trading</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access futures trading across indices, stocks, and commodities with real-time execution and tools designed to support your trading decisions every day.
                </p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-border/50">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase">Leverage Multiplier:</span>
                  <span className="text-burgundy font-black text-sm">{bentoLeverage}X Power</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={bentoLeverage}
                  onChange={(e) => setBentoLeverage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-burgundy"
                />
                <div className="flex justify-between text-[11px] bg-cream p-2.5 rounded-[5px] border border-border/60">
                  <span className="text-slate-500 font-semibold">Min Margin Required:</span>
                  <span className="font-mono font-bold text-slate-800">₹{(36000 / bentoLeverage).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Cards 3-8: Bento standard blocks */}
            {[
              {
                icon: Layers,
                title: "Real-Time Option Chain Analysis",
                desc: "Analyze open interest, volume, option prices, and strike-level activity to better understand market movement and spot potential trading opportunities.",
                accent: "#8B0D19",
              },
              {
                icon: Zap,
                title: "Integrated Strategy Building Tools",
                desc: "Create and evaluate options strategies with detailed risk-reward analysis, helping you compare potential outcomes before making trading decisions.",
                accent: "#8B0D19",
              },
              {
                icon: CheckCircle2,
                title: "Basket Orders Execution",
                desc: "Open and manage multiple positions simultaneously to execute trading strategies faster and control all orders efficiently from a single platform.",
                accent: "#8B0D19",
              },
              {
                icon: ShieldCheck,
                title: "Pledge Margin Benefits",
                desc: "Pledge your approved holdings to unlock extra trading margin and increase the buying power of your existing portfolio.",
                accent: "#8B0D19",
              },
              {
                icon: Play,
                title: "TradingView Charts Integration",
                desc: "Trade smoothly from advanced charts with integrated analysis tools designed to support faster and more informed decisions.",
                accent: "#8B0D19",
              },
              {
                icon: RotateCcw,
                title: "Fast Position Management",
                desc: "Stay in control of your trades by monitoring, modifying, reversing, or exiting positions whenever market conditions change.",
                accent: "#8B0D19",
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx}
                  className="col-span-12 md:col-span-3 lg:col-span-4 bg-white border border-border/70 rounded-[16px] p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                >
                  <div className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-4" style={{ background: `${item.accent}08` }}>
                    <Icon className="h-4 w-4" style={{ color: item.accent }} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </section>

      {/* ── SECTION 3: WHAT YOU CAN TRADE (MARKETS) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Centered Header */}
          <div className="text-center mb-10 space-y-3">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Markets
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight text-balance">
              The Complete{" "}
              <span className="text-burgundy">F&amp;O Trading Experience</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Trade across indices, stocks, and commodities — all from a single account.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-background border border-border rounded-[8px] p-1 gap-1">
              {(["Index F&O", "Stock F&O", "Commodity F&O"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMarketsTab(tab)}
                  className={`px-5 py-2 rounded-[6px] text-sm font-bold transition-all duration-200 cursor-pointer ${
                    marketsTab === tab
                      ? "bg-burgundy text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Instrument Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {marketsData[marketsTab].map((item, idx) => {
              const isPos = item.change >= 0
              return (
                <motion.div
                  key={`${marketsTab}-${idx}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="bg-white border border-border/70 rounded-[12px] p-4 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(184,146,74,0.06)] transition-all duration-300 group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="text-2xl mb-3">{item.icon}</div>
                  {/* Name */}
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.name}</p>
                  {/* Price */}
                  <p className="text-base font-black text-foreground font-mono">
                    {item.price.toLocaleString("en-IN", { minimumFractionDigits: item.price > 10000 ? 0 : 2 })}
                  </p>
                  {/* Change */}
                  <p className={`text-[11px] font-bold mt-0.5 font-mono ${isPos ? "text-profit" : "text-loss"}`}>
                    {isPos ? "+" : ""}{item.change.toFixed(2)} ({isPos ? "+" : ""}{item.changePct.toFixed(2)}%) {isPos ? "▲" : "▼"}
                  </p>
                </motion.div>
              )
            })}
          </div>



        </div>
      </section>


      {/* ── SECTIONS 4 & 5: DYNAMIC OPTIONS vs FUTURES ADVANCED WORKSPACES ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Advanced Toolsets
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Master the Derivatives Market.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto">
              Simulate option strategies and calculate margin exposure live. Toggle workspaces below to explore how our pro dashboard models trading structures.
            </p>
          </div>

          {/* Interactive Workspaces Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#FAF8F5] border border-border p-1 rounded-full flex items-center gap-1 shadow-inner relative">
              <button
                onClick={() => setWorkspaceTab("options")}
                className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all relative z-10 ${
                  workspaceTab === "options" ? "bg-burgundy text-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Options Workspace
              </button>
              <button
                onClick={() => setWorkspaceTab("futures")}
                className={`px-8 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all relative z-10 ${
                  workspaceTab === "futures" ? "bg-burgundy text-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Futures Workspace
              </button>
            </div>
          </div>

          {/* Tab Panel Render */}
          <AnimatePresence mode="wait">
            {workspaceTab === "options" ? (
              <motion.div
                key="options-workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Options left features */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-burgundy tracking-widest uppercase block mb-1">Options</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                      Every tool a serious options trader needs.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: "Live Option Chain", d: "Full strike-by-strike view with OI, volume, LTP, IV, and bid-ask in real time." },
                      { t: "Greeks Dashboard", d: "Delta, Theta, Gamma, Vega live on every strike. Know your risk before you enter." },
                      { t: "Max Pain & PCR", d: "Spot where the market is likely to gravitate before expiry." },
                      { t: "IV Percentile", d: "Understand if options are cheap or expensive relative to historical volatility." },
                      { t: "Option Strategy Builder", d: "Build Bull Call Spread, Iron Condor, Straddle, and more. See payoff before placing." },
                      { t: "Flash Trade", d: "Buy or sell options in one tap. No screens to navigate when speed matters." },
                      { t: "OI Change Tracker", d: "Watch open interest build and unwind in real time across strikes." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-cream/70 border border-border/60 p-4 rounded-[10px] space-y-1">
                        <h4 className="font-extrabold text-foreground text-xs tracking-tight">{item.t}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Options Right: visual */}
                <div className="lg:col-span-7 relative">
                  <Image
                    src="/fando.jpeg"
                    alt="F&O trading on the Shree Varahi app"
                    width={1424}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="futures-workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Futures Left features */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-gold-deep tracking-widest uppercase block mb-1">Futures</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                      Futures trading built for speed and clarity.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: "Futures Charts", d: "See all expiries side by side with live price, OI, and basis." },
                      { t: "Live Margin Display", d: "Know your required margin before placing the order. No surprises." },
                      { t: "Rollover Tracker", d: "Monitor rollover activity and cost of carry across expiries." },
                      { t: "Spread Orders", d: "Execute calendar spreads efficiently from a single order window." },
                      { t: "Position Management", d: "Modify, reverse, or exit any position directly from your dashboard." },
                      { t: "Intraday Leverage", d: "Get up to 5× leverage on futures positions. Settle same day." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-cream/70 border border-border/60 p-4 rounded-[10px] space-y-1">
                        <h4 className="font-extrabold text-foreground text-xs tracking-tight">{item.t}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Futures Right: visual */}
                <div className="lg:col-span-7 relative">
                  <Image
                    src="/fando.jpeg"
                    alt="Futures trading on the Shree Varahi app"
                    width={1424}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ── SECTION 6: HOW TO BEGIN TIMELINE (TIMELINE STEP GUIDE) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
              Getting Started
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              New to F&amp;O? Here&apos;s how to begin.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto">
              Follow four simple steps to execute your first derivatives position on the Shree Varahi App. Hover over steps below to preview screens.
            </p>
          </div>

          {/* Interactive Split Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Timeline Steps Left (Hover triggers) */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  title: "Open & Activate",
                  desc: "Complete Aadhaar e-KYC in under 10 minutes and activate F&O trading from your account settings in one tap."
                },
                {
                  title: "Pick Your Instrument",
                  desc: "Choose index, stock, or commodity F&O. Select your expiry and strike price."
                },
                {
                  title: "Analyse Before You Trade",
                  desc: "Use the live option chain, Greeks dashboard, and strategy builder to plan your entry and risk."
                },
                {
                  title: "Execute & Manage",
                  desc: "Place your order in under 80ms. Monitor live P&L, modify, or exit positions from one screen."
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-[16px] border transition-all duration-300 cursor-pointer ${
                    activeStep === idx 
                      ? "bg-white border-gold-deep shadow-md translate-x-2" 
                      : "bg-[#FAF8F5] border-border/60 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                      activeStep === idx ? "bg-burgundy text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-foreground text-sm tracking-wide">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Phone screen preview Right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[260px] h-[500px] border-[8px] border-slate-900 bg-slate-950 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col font-sans select-none">
                
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                  <div className="w-12 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Status Bar */}
                <div className="bg-slate-900 px-5 pt-6 pb-2 text-[8px] text-slate-400 font-mono flex justify-between items-center shrink-0">
                  <span>12:40 PM</span>
                  <span>5G IIII</span>
                </div>

                {/* Display Area */}
                <div className="flex-1 p-4 bg-slate-950 text-white flex flex-col justify-between overflow-hidden relative">
                  
                  {activeStep === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-6"
                    >
                      <div className="space-y-4 text-center">
                        <Smartphone className="h-10 w-10 text-gold mx-auto animate-bounce" />
                        <h5 className="font-bold text-sm">Open &amp; Activate</h5>
                        <p className="text-[9px] text-slate-400 leading-relaxed px-2">Complete Aadhaar e-KYC in under 10 minutes and activate F&amp;O trading from your settings.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-8 bg-slate-900 border border-slate-800 rounded-[5px] flex items-center justify-center text-[10px] text-slate-350">
                          XXXX - XXXX - 4821
                        </div>
                        <div className="w-full h-8 bg-burgundy rounded-[5px] flex items-center justify-center text-[10px] font-black uppercase text-white shadow">
                          Submit Aadhaar KYC
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-4"
                    >
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
                          <input 
                            type="text" 
                            value="Nifty 50" 
                            disabled 
                            className="w-full bg-slate-900 border border-slate-800 rounded-[5px] py-1.5 pl-8 text-[10px] text-white font-bold"
                          />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide block">Contract Options Expiries</span>
                        <div className="grid grid-cols-3 gap-1.5 font-mono text-[8px] text-center">
                          <span className="py-1 bg-burgundy rounded font-bold">18 JUN</span>
                          <span className="py-1 bg-slate-900 rounded">25 JUN</span>
                          <span className="py-1 bg-slate-900 rounded">02 JUL</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 space-y-2 text-[9px]">
                        <div className="flex justify-between font-bold">
                          <span>NIFTY 23500 CE</span>
                          <span className="text-emerald-400 font-mono">₹145.20</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Delta: 0.50</span>
                          <span>IV: 12.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-4"
                    >
                      <div className="space-y-3 text-center">
                        <Activity className="h-8 w-8 text-gold mx-auto animate-pulse" />
                        <h5 className="font-bold text-xs text-slate-100">Analyse Before You Trade</h5>
                      </div>
                      <div className="h-24 w-full bg-slate-900 rounded border border-slate-800 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          <line x1="0" y1="20" x2="100" y2="20" stroke="#475569" strokeDasharray="2" />
                          <path d="M 0 30 L 50 30 L 85 10" fill="none" stroke="#D9B27C" strokeWidth="1.5" />
                          <circle cx="50" cy="30" r="2" fill="#D9B27C" />
                        </svg>
                      </div>
                      <div className="text-[9px] text-slate-400 text-center font-medium leading-relaxed px-2">
                        Use option chains and strategy builders to plan targets and risks.
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-full flex flex-col justify-between py-6"
                    >
                      <div className="space-y-4 text-center">
                        <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                          <Check className="h-5 w-5" />
                        </div>
                        <h5 className="font-bold text-sm">Execute &amp; Manage</h5>
                        <p className="text-[9px] text-slate-400 px-2 leading-relaxed">Place order in under 80ms and monitor live P&amp;L modification limits.</p>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1 text-[8px] font-mono text-slate-400">
                        <div className="flex justify-between"><span className="font-sans">LTP:</span><span className="text-white font-bold">₹145.20</span></div>
                        <div className="flex justify-between"><span className="font-sans">Order ID:</span><span className="text-white">#SV-87109275</span></div>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Bottom line */}
                <div className="h-6 shrink-0 flex items-center justify-center bg-slate-900 border-t border-slate-850">
                  <div className="w-20 h-1 bg-slate-700 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 7: FLAT ₹17 PRICING & SAVINGS CALCULATOR (AWARD WINNING THEMED BANNER) ── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-white via-cream to-[#FAF8F5] border border-gold/30 rounded-[32px] shadow-[0_20px_50px_rgba(139,13,25,0.02)] p-8 sm:p-14 text-center overflow-hidden"
          >
            {/* Ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-gold/15 pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-gold/15 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Simple Pricing
              </p>

              {/* Giant pricing counter */}
              <div className="flex items-start justify-center text-burgundy select-none">
                <span className="text-4xl sm:text-5xl font-black mt-3.5 leading-none">₹</span>
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none">17</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                flat. Every F&amp;O order.
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                At Shree Varahi, every futures and options order is charged a flat ₹17 — no percentage, no slabs, no hidden fees.
              </p>

              {/* Savings Calculator Interactive Area */}
              <div className="bg-white border border-border/80 rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto space-y-6 text-left my-8 shadow-sm">
                <h3 className="font-extrabold text-sm tracking-wide text-foreground border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Interactive Savings Calculator</span>
                  <span className="text-xs text-muted-foreground font-mono font-normal">Calculate benefits instantly</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-bold uppercase">Estimated Trades Per Month:</span>
                    <span className="text-burgundy font-black text-sm">{tradesPerMonth} Trades</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={tradesPerMonth}
                    onChange={(e) => setTradesPerMonth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-center">
                  <div className="p-4 bg-cream rounded-xl border border-border/60 text-center space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard Broker (₹20/Order)</span>
                    <span className="font-mono text-sm text-slate-800 font-bold">₹{traditionalCost.toLocaleString("en-IN")} / yr</span>
                  </div>
                  <div className="p-4 bg-cream rounded-xl border border-border/60 text-center space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Shree Varahi (₹17/Order)</span>
                    <span className="font-mono text-sm text-burgundy font-bold">₹{varahiCost.toLocaleString("en-IN")} / yr</span>
                  </div>
                  <div className="p-5 bg-gold/15 rounded-xl border border-gold/30 text-center space-y-1">
                    <span className="text-[10px] text-gold-deep font-extrabold uppercase tracking-wider block">Total Annual Savings</span>
                    <span className="font-mono text-xl text-gold-deep font-black gold-shimmer block">₹{annualSavings.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Additional free list table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wide border-t border-slate-100">
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> Account Opening: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> AMC AMC: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> API Access: ₹0</div>
                  <div className="flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5 text-profit" /> Mutual Funds: ₹0</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-burgundy hover:bg-burgundy-deep text-white px-10 h-14 text-base font-bold rounded-[5px] shadow-lg shadow-burgundy/25 transition-transform hover:scale-[1.01]"
              >
                Open Free Account
              </Button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 10: FAQ (PREMIUM TWO-COLUMN ACCORDION GRID) ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about derivatives trading at Shree Varahi? Review answers to our most popular inquiries.
            </p>
          </div>

          {/* 2-Column Accordion layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {[
              {
                q: "Can I trade both Futures and Options?",
                a: "Yes. Shree Varahi provides access to both Futures and Options trading through a single trading account, allowing traders to participate in various derivatives segments and implement diverse trading strategies."
              },
              {
                q: "Do I get an Option Chain?",
                a: "Yes. The platform offers an advanced Option Chain that provides real-time data on Open Interest (OI), volume, premiums, implied volatility, option Greeks, and strike-wise market activity to support informed trading decisions."
              },
              {
                q: "Is Strategy Builder available?",
                a: "Yes. Traders can use the Strategy Builder to create, evaluate, and compare multiple options strategies. The tool helps analyze potential profit, loss, breakeven points, and risk-reward scenarios before executing trades."
              },
              {
                q: "Can I use pledged stocks as margin?",
                a: "Yes. Approved stocks held in your Demat account can be pledged and used as collateral for eligible margin benefits, helping you utilize capital more efficiently while retaining ownership of your investments."
              },
              {
                q: "What are the F&O brokerage charges?",
                a: "Futures and Options trades are charged at a flat ₹17 per executed order. Statutory charges, taxes, and exchange-related fees may apply separately as per regulations."
              },
              {
                q: "Which contracts are supported?",
                a: "Shree Varahi supports eligible Index Options, Stock Options, Index Futures, Stock Futures, and selected Commodity Futures & Options contracts, subject to exchange availability and regulatory guidelines."
              },
              {
                q: "Can I execute multi-leg options strategies?",
                a: "Yes. Multi-leg strategies can be created and executed efficiently using Basket Orders and Strategy Builder tools available on the platform."
              },
              {
                q: "Do I get access to TradingView charts?",
                a: "Yes. Advanced TradingView-powered charts are available with technical indicators, drawing tools, multiple timeframes, and direct trading capabilities."
              },
              {
                q: "Can I monitor my open positions in real time?",
                a: "Yes. The platform provides real-time position monitoring, profit and loss tracking, contract management, and quick position modification features."
              },
              {
                q: "Is the platform suitable for active traders?",
                a: "Absolutely. Shree Varahi is designed for active traders with advanced F&O tools including Option Chain analysis, Greeks tracking, Strategy Builder, Basket Orders, live charts, and efficient order execution capabilities."
              }
            ].map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div 
                  key={index} 
                  className="bg-white border border-border/80 rounded-[12px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-foreground text-sm tracking-wide">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                      {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── CTA — floating banner card, detached from footer ── */}
      <section className="py-12 lg:py-16 bg-background px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl rounded-[20px] overflow-hidden bg-burgundy text-white shadow-[0_20px_60px_rgba(139,13,25,0.25)]"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.18) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12 lg:p-14">
            {/* Left — copy + form */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Trade Futures &amp; Options<br className="hidden sm:inline" /> With Better Control
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm font-bold text-white/85">
                4.5 <Star className="w-4 h-4 fill-gold-champagne text-gold-champagne" /> App Rating
              </div>

              <form
                onSubmit={triggerSms}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="tel"
                  required
                  value={smsNum}
                  onChange={(e) => setSmsNum(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button
                  type="submit"
                  disabled={smsStatus !== "idle"}
                  className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0"
                >
                  {smsStatus === "sending" && "Sending..."}
                  {smsStatus === "sent" && "✓ Sent"}
                  {smsStatus === "idle" && "Get Started"}
                </Button>
              </form>

              {/* QR + store badges */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <div className="hidden sm:flex w-16 h-16 rounded-[8px] bg-white p-1.5 shrink-0">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px), repeating-linear-gradient(-45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-white/60">Scan to download</p>
                  <div className="flex gap-2.5">
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">App Store</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — phone mockup w/ F&O dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My Positions</span>
                  <Activity className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Net P&amp;L</p>
                  <p className="text-base font-black text-foreground">+₹12,480</p>
                  <p className="text-[10px] font-bold text-profit">+8.4% Today</p>
                </div>
                {[
                  { name: "NIFTY 25000 CE", change: 4.2 },
                  { name: "BANKNIFTY FUT", change: 1.6 },
                  { name: "RELIANCE 2900 PE", change: -2.1 },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{p.name}</span>
                    <span className={`text-[9px] font-bold shrink-0 ${p.change >= 0 ? "text-profit" : "text-loss"}`}>
                      {p.change >= 0 ? "+" : ""}{p.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

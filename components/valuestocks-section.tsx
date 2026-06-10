"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, RefreshCw, MousePointerClick, Check } from "lucide-react"

const steps = [
  {
    step: 1,
    tag: "CREATE",
    tabLabel: "Pick a portfolio",
    title: "Pick a Portfolio",
    desc: "Choose from expert-curated themed buckets across sectors and risk profiles. Whether you are bullish on Green Energy, Infrastructure, or consumption compounders, we have a basket for you.",
    icon: MousePointerClick,
  },
  {
    step: 2,
    tag: "TRACK",
    tabLabel: "Invest in one click",
    title: "Invest in One Click",
    desc: "Get proportional exposure to every stock in the basket instantly. No need to buy shares individually — our platform places all underlying orders simultaneously in under 80ms.",
    icon: TrendingUp,
  },
  {
    step: 3,
    tag: "MANAGE",
    tabLabel: "We manage the rest",
    title: "We Manage the Rest",
    desc: "Active monitoring and auto-rebalancing by our in-house research team. We send rebalancing updates as the market environment changes, keeping your portfolio perfectly aligned with its theme.",
    icon: RefreshCw,
  },
]

function Step1Visual() {
  const portfolios = [
    { id: 0, name: "India Consumption", stocks: 12, return: "+24.8% (1Y)", risk: "Medium" },
    { id: 1, name: "Banking & Finance", stocks: 8, return: "+19.2% (1Y)", risk: "Low" },
    { id: 2, name: "Green Energy & EV", stocks: 10, return: "+31.5% (1Y)", risk: "High" },
  ]
  const [selected, setSelected] = useState(0)

  return (
    <div className="bg-secondary/25 border border-border/80 rounded-[12px] p-6 space-y-4 h-full flex flex-col justify-center">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">
        Select a Portfolio Bucket
      </span>
      <div className="space-y-3">
        {portfolios.map((p) => {
          const isSel = selected === p.id
          return (
            <div
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`border rounded-[8px] p-3 flex items-center justify-between cursor-pointer transition-all bg-white ${
                isSel
                  ? "border-gold shadow-xs ring-1 ring-gold/40"
                  : "border-border hover:border-gold/30 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isSel ? "border-gold bg-gold text-white" : "border-border bg-white"
                }`}>
                  {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-foreground block">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground">{p.stocks} stocks · {p.risk} Risk</span>
                </div>
              </div>
              <span className="text-xs font-bold text-profit bg-profit/10 px-2 py-0.5 rounded">
                {p.return}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Step2Visual() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [progressText, setProgressText] = useState("Initializing...")

  const handleInvest = () => {
    setStatus("loading")
    setProgressText("Accessing market API...")
    
    setTimeout(() => {
      setProgressText("Placing 12 underlying orders...")
    }, 800)

    setTimeout(() => {
      setProgressText("Allocating direct equities...")
    }, 1600)

    setTimeout(() => {
      setStatus("success")
    }, 2400)
  }

  return (
    <div className="bg-secondary/25 border border-border/80 rounded-[12px] p-6 h-full flex flex-col justify-center items-center text-center">
      {status === "idle" && (
        <div className="space-y-4 w-full">
          <div className="bg-white border border-border rounded-[8px] p-4 shadow-xs">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block">Selected Portfolio</span>
            <span className="font-extrabold text-lg text-burgundy mt-1 block">India Consumption Portfolio</span>
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between text-xs font-medium text-muted-foreground px-4">
              <span>Investment Amount:</span>
              <span className="font-bold text-foreground">₹25,000</span>
            </div>
          </div>
          <Button
            onClick={handleInvest}
            className="w-full bg-burgundy hover:bg-burgundy-deep text-primary-foreground font-bold py-2.5 rounded-[6px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Confirm & Invest in 1 Click
          </Button>
        </div>
      )}

      {status === "loading" && (
        <div className="space-y-4">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold text-sm text-foreground">{progressText}</p>
          <p className="text-xs text-muted-foreground">Order execution averages &lt; 80ms</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4 w-full">
          <div className="w-12 h-12 rounded-full bg-profit/10 border border-profit text-profit flex items-center justify-center mx-auto">
            <Check className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-base text-foreground">Investment Successful!</h4>
            <p className="text-xs text-muted-foreground mt-1 px-4">
              ₹25,000 split across 12 stocks. Fractional shares allocated.
            </p>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs font-bold text-burgundy hover:underline"
          >
            Run simulator again
          </button>
        </div>
      )}
    </div>
  )
}

function Step3Visual() {
  const [isRebalanced, setIsRebalanced] = useState(false)

  return (
    <div className="bg-secondary/25 border border-border/80 rounded-[12px] p-6 h-full flex flex-col justify-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          Active Portfolio Management
        </span>
        <button
          onClick={() => setIsRebalanced(!isRebalanced)}
          className={`text-xs font-bold px-3 py-1 rounded-[5px] border transition-all ${
            isRebalanced 
              ? "bg-profit/10 text-profit border-profit/20" 
              : "bg-burgundy/10 text-burgundy border-burgundy/20 hover:bg-burgundy/20"
          }`}
        >
          {isRebalanced ? "Rebalanced Mode" : "Trigger Rebalance"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        {/* SVG Rebalance representation */}
        <div className="bg-white border border-border rounded-[8px] p-4 flex flex-col items-center justify-center shadow-xs">
          <span className="text-[10px] text-muted-foreground uppercase font-bold text-center block mb-3">
            Asset Allocation
          </span>
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Pie Chart */}
            <svg width="80" height="80" viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="transparent"
                stroke="#E5E5E5"
                strokeWidth="20"
              />
              {/* Cash segment (10%) */}
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="transparent"
                stroke="var(--color-gold)"
                strokeWidth="20"
                strokeDasharray="18.8 188.5"
                strokeDashoffset="0"
              />
              {/* Dynamic Equity segment */}
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="transparent"
                stroke="var(--color-burgundy)"
                strokeWidth="20"
                strokeDasharray={isRebalanced ? "113.1 188.5" : "169.6 188.5"}
                strokeDashoffset="-18.8"
                className="transition-all duration-500 ease-out"
              />
              {/* Debt segment (only when rebalanced) */}
              {isRebalanced && (
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeDasharray="56.5 188.5"
                  strokeDashoffset="-131.9"
                  className="transition-all duration-500 ease-out"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 pl-2">
          {/* Equity */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-burgundy flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground block leading-none">Equities</span>
              <span className="text-sm font-bold text-foreground block mt-0.5">
                {isRebalanced ? "60%" : "90%"}
              </span>
            </div>
          </div>

          {/* Cash */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-gold flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground block leading-none">Cash</span>
              <span className="text-sm font-bold text-foreground block mt-0.5">10%</span>
            </div>
          </div>

          {/* Debt */}
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded flex-shrink-0 transition-all ${isRebalanced ? "bg-blue-500" : "bg-gray-200"}`} />
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground block leading-none">Debt / Bonds</span>
              <span className="text-sm font-bold text-foreground block mt-0.5">
                {isRebalanced ? "30%" : "0%"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-4 text-center leading-relaxed">
        {isRebalanced 
          ? "Secured gains by shifting 30% from overvalued equities to defensive bonds." 
          : "Volatile market detected. Click 'Trigger Rebalance' to simulate smart risk management."}
      </p>
    </div>
  )
}

export function ValuestocksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="bg-gradient-to-b from-background via-cream to-background py-16 lg:py-24">


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-2 block">
            Portfolio Management
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Our <span className="text-burgundy">unique approach</span> to wealth management.
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            We combine thematic stock basket investments with expert direct equity research, active risk monitoring, and seamless auto-rebalancing.
          </p>
        </div>

        {/* Steps Tab Bar */}
        <div className="relative flex justify-between items-center max-w-3xl mx-auto mb-10 px-4">
          <div className="absolute left-4 right-4 h-px bg-border top-1/2 -translate-y-1/2 z-0" />
          {steps.map((item, index) => {
            const Icon = item.icon
            const isActive = activeStep === index
            return (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 sm:px-6 rounded-full border text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-burgundy text-white border-burgundy shadow-xs scale-105"
                    : "bg-white text-foreground/75 border-border hover:bg-secondary/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.tabLabel}</span>
                <span className="sm:hidden">Step {item.step}</span>
              </button>
            )
          })}
        </div>

        {/* Big Step Details Card */}
        <div className="bg-white border border-border rounded-[16px] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            {/* Left Side: Step Content */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Tag/Number Badge */}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-burgundy/20 bg-burgundy/5 text-xs font-bold text-burgundy">
                  <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
                  {steps[activeStep].step.toString().padStart(2, '0')} {steps[activeStep].tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground font-bold rounded-[5px] px-6 py-2.5 flex items-center gap-2">
                  Explore Valuestocks
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-[5px] px-6 py-2.5">
                  Talk to a portfolio advisor
                </Button>
              </div>
            </div>

            {/* Right Side: Visual representation */}
            <div className="min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full"
                >
                  {activeStep === 0 && <Step1Visual />}
                  {activeStep === 1 && <Step2Visual />}
                  {activeStep === 2 && <Step3Visual />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Zap, Globe, BarChart3, LineChart, Shield, TrendingUp } from "lucide-react"
 
const features = [
  {
    id: "speed",
    icon: Zap,
    title: "Lightning Fast Execution",
    subtitle: "Orders execute in under 80ms",
    description:
      "Our proprietary infrastructure delivers institutional-grade speed. Every millisecond counts in the market.",
    visual: "order-flow",
    color: "#8B0D19",
  },
  {
    id: "global",
    icon: Globe,
    title: "Global Investing",
    subtitle: "Trade US Stocks Directly",
    description:
      "Buy Apple, Tesla, Google, and 5000+ US stocks directly from your Shree Varahi account. No additional paperwork.",
    visual: "globe",
    color: "#D9B27C",
  },
  {
    id: "options",
    icon: BarChart3,
    title: "Live Option Chain",
    subtitle: "Real-time Greeks Analysis",
    description:
      "Delta, Theta, Gamma, Vega — all updating in real-time. Build strategies with confidence using live IV data.",
    visual: "option-chain",
    color: "#059669",
  },
  {
    id: "research",
    icon: LineChart,
    title: "Research Desk",
    subtitle: "In-House Expert Analysis",
    description:
      "Daily calls with entry points, targets, and stop-losses from Lakshmishree's research team. Live webinars with market experts.",
    visual: "research",
    color: "#6366F1",
  },
  {
    id: "trust",
    icon: Shield,
    title: "Safety & Trust",
    subtitle: "SEBI Registered Since 1993",
    description:
      "CDSL depository participant. NSE, BSE, MCX member. Segregated client funds with complete transparency.",
    visual: "trust",
    color: "#8B0D19",
  },
  {
    id: "mtf",
    icon: TrendingUp,
    title: "Margin Trading Facility",
    subtitle: "4× Buying Power",
    description:
      "Turn ₹10,000 into ₹40,000 buying power. 1,700+ eligible stocks. Competitive interest rates.",
    visual: "mtf",
    color: "#D9B27C",
  },
]

function OrderFlowVisual() {
  return (
    <div className="relative h-full flex flex-col justify-center items-center gap-4">
      {["Order Placed", "NSE/BSE", "Confirmed ✓"].map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-white border border-border px-4 py-2 rounded-[5px] text-sm font-mono shadow-sm"
        >
          {step}
        </motion.div>
      ))}
      <motion.div
        className="absolute left-1/2 top-8 bottom-8 w-px bg-gold/30"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        animate={{ y: [0, 80, 160] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        className="absolute left-1/2 -translate-x-1/2 top-8 w-2 h-2 bg-burgundy rounded-full"
      />
    </div>
  )
}

function GlobeVisual() {
  return (
    <div className="relative h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="relative w-40 h-40"
      >
        <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
        <div className="absolute inset-4 rounded-full border border-gold/20" />
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gold/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
        />
        <div className="absolute top-[55%] left-[65%] w-3 h-3 bg-burgundy rounded-full pulse-dot" />
        <div className="absolute top-[35%] left-[20%] w-3 h-3 bg-gold rounded-full pulse-dot" />
        <svg className="absolute inset-0" viewBox="0 0 160 160">
          <motion.path
            d="M 32 56 Q 80 20 104 88"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-0 top-1/4 bg-white border border-border p-2 rounded-[5px] text-xs shadow-sm"
      >
        <span className="text-muted-foreground">AAPL</span>
        <span className="text-profit font-mono ml-2">$198.52</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute right-0 bottom-1/4 bg-white border border-border p-2 rounded-[5px] text-xs shadow-sm"
      >
        <span className="text-muted-foreground">TSLA</span>
        <span className="text-profit font-mono ml-2">$245.30</span>
      </motion.div>
    </div>
  )
}

function OptionChainVisual() {
  const rows = [
    { oi: "12.5L", ltp: "245", iv: "18.2", strike: "24800", iv2: "17.8", ltp2: "198", oi2: "8.2L" },
    { oi: "8.3L", ltp: "178", iv: "16.5", strike: "24850", iv2: "16.2", ltp2: "225", oi2: "10.1L" },
    { oi: "15.2L", ltp: "125", iv: "15.8", strike: "24900", iv2: "15.5", ltp2: "285", oi2: "12.4L" },
  ]

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full bg-white border border-border rounded-[5px] overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 text-[10px] font-mono bg-secondary p-2">
          <span className="text-center text-muted-foreground">OI</span>
          <span className="text-center text-profit">LTP</span>
          <span className="text-center text-muted-foreground">IV</span>
          <span className="text-center font-semibold text-foreground">Strike</span>
          <span className="text-center text-muted-foreground">IV</span>
          <span className="text-center text-loss">LTP</span>
          <span className="text-center text-muted-foreground">OI</span>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="grid grid-cols-7 text-[10px] font-mono p-2 border-t border-border"
          >
            <span className="text-center">{row.oi}</span>
            <span className="text-center text-profit">{row.ltp}</span>
            <span className="text-center">{row.iv}</span>
            <span className="text-center font-semibold bg-gold/20 rounded-[3px]">{row.strike}</span>
            <span className="text-center">{row.iv2}</span>
            <span className="text-center text-loss">{row.ltp2}</span>
            <span className="text-center">{row.oi2}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ResearchVisual() {
  const calls = [
    { type: "BUY", stock: "RELIANCE", target: "₹3,050", sl: "₹2,850" },
    { type: "SELL", stock: "TATASTEEL", target: "₹142", sl: "₹158" },
    { type: "BUY", stock: "INFY", target: "₹1,920", sl: "₹1,780" },
  ]

  return (
    <div className="h-full flex items-center justify-center">
      <div className="space-y-2">
        {calls.map((call, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white border border-border p-3 rounded-[5px] flex items-center gap-3 shadow-sm"
            style={{ transform: `translateX(${i * 10}px)` }}
          >
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-[3px] ${
                call.type === "BUY" ? "bg-profit/20 text-profit" : "bg-loss/20 text-loss"
              }`}
            >
              {call.type}
            </span>
            <span className="font-medium text-sm">{call.stock}</span>
            <div className="text-[10px] font-mono text-muted-foreground">
              T: {call.target} | SL: {call.sl}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TrustVisual() {
  const badges = [
    { label: "SEBI", sub: "Registered" },
    { label: "CDSL", sub: "Depository" },
    { label: "NSE BSE MCX", sub: "Member" },
  ]

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white border border-gold p-3 rounded-[5px] text-center shadow-sm mb-2"
            style={{
              transform: `translateX(${(i - 1) * 20}px)`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
            }}
          >
            <div className="text-burgundy text-lg font-bold">{badge.label}</div>
            <div className="text-[10px] text-muted-foreground">{badge.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MTFVisual() {
  const amounts = ["₹10,000", "₹20,000", "₹30,000", "₹40,000"]

  return (
    <div className="h-full flex items-center justify-center">
      <div className="space-y-2">
        {amounts.map((amount, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`bg-white border p-3 rounded-[5px] font-mono text-sm shadow-sm ${
              i === 3 ? "border-gold border-2" : "border-border"
            }`}
            style={{ width: `${100 + i * 30}px` }}
          >
            <span className={i === 3 ? "text-burgundy font-bold" : ""}>{amount}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FeatureVisual({ type }: { type: string }) {
  switch (type) {
    case "order-flow": return <OrderFlowVisual />
    case "globe": return <GlobeVisual />
    case "option-chain": return <OptionChainVisual />
    case "research": return <ResearchVisual />
    case "trust": return <TrustVisual />
    case "mtf": return <MTFVisual />
    default: return null
  }
}

function StackingCard({
  feature,
  index,
}: {
  feature: typeof features[0]
  index: number
}) {
  const Icon = feature.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        top: `${88 + index * 8}px`,
        zIndex: index + 1,
      }}
      className="sticky"
    >
      <div
        className={`rounded-[5px] overflow-hidden border transition-all duration-300 ${
          isEven ? "bg-white border-border/70" : "bg-cream border-gold/20"
        }`}
        style={{
          boxShadow: "0 1px 4px rgba(0,0,0,0.03), 0 6px 24px rgba(0,0,0,0.05)",
        }}
      >
        {/* Thin colour accent at top */}
        <div
          className="h-[3px] w-full"
          style={{ backgroundColor: feature.color, opacity: 0.45 }}
        />

        <div className="grid lg:grid-cols-2 gap-8 items-center p-6 lg:p-10">
          <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-[5px] flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color: feature.color }} />
              </div>
              <span className="text-xs tracking-wider uppercase text-gold-deep font-semibold">
                {feature.subtitle}
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>

          <div className={`h-48 lg:h-64 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            <FeatureVisual type={feature.visual} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section className="relative bg-secondary/30 z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
              Why Traders Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Built for <span className="text-burgundy">serious traders</span>
            </h2>
          </motion.div>

          <div className="relative space-y-4">
            {features.map((feature, index) => (
              <StackingCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

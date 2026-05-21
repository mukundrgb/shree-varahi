"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, PieChart, Landmark, RotateCcw, Target, Layers, Box } from "lucide-react"

/* ── Custom globe SVG — richer than the Lucide default ── */
function GlobeMarketIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      {/* Outer globe circle */}
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.4" />
      {/* Equator */}
      <ellipse cx="12" cy="12" rx="9.5" ry="3.2" stroke={color} strokeWidth="1.1" />
      {/* Upper parallel ~30° N */}
      <ellipse cx="12" cy="8.2" rx="7.8" ry="2.2" stroke={color} strokeWidth="0.7" opacity="0.55" />
      {/* Lower parallel ~30° S */}
      <ellipse cx="12" cy="15.8" rx="7.8" ry="2.2" stroke={color} strokeWidth="0.7" opacity="0.55" />
      {/* Prime meridian (vertical ellipse, very narrow) */}
      <ellipse cx="12" cy="12" rx="2.2" ry="9.5" stroke={color} strokeWidth="0.9" />
      {/* 60° meridian */}
      <ellipse cx="12" cy="12" rx="6" ry="9.5" stroke={color} strokeWidth="0.6" opacity="0.45" />
      {/* Poles — top & bottom caps */}
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke={color} strokeWidth="0.9" opacity="0.3" />
      {/* Small pin dot — focal point representing the globe */}
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}

type Ticker = { symbol: string; flag: string; name: string }

type Product = {
  icon?: React.ElementType
  customIcon?: React.FC<{ color: string }>
  title: string
  description: string
  detail: string
  badge: string
  badgeColor: string
  accentColor: string
  bgHover: string
  tickers?: Ticker[]
}

const products: Product[] = [
  {
    icon: TrendingUp,
    title: "Stocks",
    description: "Buy and hold with zero brokerage on every delivery trade.",
    detail: "NSE & BSE listed equities, real-time quotes, margin trading facility.",
    badge: "₹0 Delivery",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: PieChart,
    title: "Futures & Options",
    description: "Trade derivatives with advanced tools and Greeks display.",
    detail: "Option chain, strategy builder, real-time IV, one-click rollover.",
    badge: "₹17 Flat",
    badgeColor: "bg-burgundy/10 text-burgundy",
    accentColor: "#8B0D19",
    bgHover: "rgba(139,13,25,0.04)",
  },
  {
    icon: Landmark,
    title: "Mutual Funds",
    description: "Direct plans with zero commission. Keep every rupee of return.",
    detail: "5,000+ funds, SIP, STP, SWP, goal-based investing in one click.",
    badge: "Direct Plans",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
  },
  {
    icon: RotateCcw,
    title: "SIP Auto-Invest",
    description: "Systematic investing from ₹100/month. Set it and forget it.",
    detail: "Auto-debit, pause/resume anytime, step-up SIP, smart triggers.",
    badge: "From ₹100",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: Target,
    title: "IPO",
    description: "Apply for upcoming IPOs in two taps. Completely free.",
    detail: "UPI mandate, GMP tracker, allotment status, ASBA support.",
    badge: "₹0 Application",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: Layers,
    title: "ETF",
    description: "Exchange traded funds for instant diversification at low cost.",
    detail: "Gold ETFs, index ETFs, sectoral ETFs — live on-exchange prices.",
    badge: "Low Cost",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
  },
  {
    icon: Box,
    title: "Commodities MCX",
    description: "Trade gold, silver, and crude oil on MCX.",
    detail: "All MCX contracts, commodity options, live LME rates, hedging tools.",
    badge: "₹17 Flat",
    badgeColor: "bg-burgundy/10 text-burgundy",
    accentColor: "#8B0D19",
    bgHover: "rgba(139,13,25,0.04)",
  },
  {
    customIcon: GlobeMarketIcon,
    title: "US Stocks",
    description: "Trade US, Korean & Japanese stocks directly from India.",
    detail: "Fractional shares · live prices · ₹ → $ in one tap · 3,000+ stocks",
    badge: "Global Access",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
    tickers: [
      { symbol: "AMZN",  flag: "🇺🇸", name: "Amazon" },
      { symbol: "005930", flag: "🇰🇷", name: "Samsung" },
      { symbol: "7203",   flag: "🇯🇵", name: "Toyota" },
    ],
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = product.icon
  const CustomIcon = product.customIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? product.bgHover : "white",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 40px -8px rgba(0,0,0,0.12), 0 0 0 1.5px ${product.accentColor}33`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      className="group relative border border-border rounded-[5px] p-5 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Accent bar — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[5px] transition-transform duration-300 origin-left"
        style={{
          background: `linear-gradient(90deg, ${product.accentColor}, ${product.accentColor}66)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-11 h-11 rounded-[5px] flex items-center justify-center"
          style={{
            background: hovered ? `${product.accentColor}20` : `${product.accentColor}12`,
            transition: "background 0.3s",
          }}
        >
          {CustomIcon ? (
            <CustomIcon color={product.accentColor} />
          ) : Icon ? (
            <Icon className="h-5 w-5" style={{ color: product.accentColor }} />
          ) : null}
        </motion.div>

        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-[5px] ${product.badgeColor} transition-all duration-200`}
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", display: "inline-block" }}
        >
          {product.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-foreground mb-1.5">{product.title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Ticker chips — always visible for US Stocks */}
      {product.tickers && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.tickers.map((t) => (
            <span
              key={t.symbol}
              className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded-[4px]"
              style={{
                background: `${product.accentColor}12`,
                color: product.accentColor,
                border: `1px solid ${product.accentColor}28`,
              }}
            >
              <span>{t.flag}</span>
              <span>{t.symbol}</span>
            </span>
          ))}
        </div>
      )}

      {/* Detail row — slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs leading-relaxed" style={{ color: product.accentColor }}>
              {product.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn more — slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1 mt-3 text-xs font-semibold"
            style={{ color: product.accentColor }}
          >
            Learn more
            <ArrowRight className="h-3 w-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ProductsSection() {
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
            Complete Investment Suite
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Every market. <span className="text-gold-deep">One account.</span>
          </h2>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-secondary rounded-[5px]"
          >
            Open your free demat account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

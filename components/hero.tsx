"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Phone, 
  TrendingUp, 
  PieChart, 
  Landmark, 
  RotateCcw, 
  Target, 
  Layers, 
  Box 
} from "lucide-react"
import { AppPromoSection } from "@/components/app-promo-section"


/* ── Custom globe SVG — richer than the Lucide default ── */
function GlobeMarketIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
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
  customIcon?: React.FC<{ color: string; size?: number }>
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
    badge: "₹17 Delivery",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: PieChart,
    title: "Futures & Options",
    description: "Trade derivatives with advanced tools and live Greeks.",
    detail: "Option chain, strategy builder, real-time IV, one-click rollover.",
    badge: "₹17 Flat",
    badgeColor: "bg-burgundy/10 text-burgundy",
    accentColor: "#8B0D19",
    bgHover: "rgba(139,13,25,0.04)",
  },
  {
    icon: Landmark,
    title: "Mutual Funds",
    description: "Zero commission. Keep every rupee of your return.",
    detail: "5,000+ funds, SIP, STP, SWP, goal-based investing in one click.",
    badge: "Direct Plans",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
  },
  {
    icon: RotateCcw,
    title: "SIP Auto-Invest",
    description: "Systematic investing from ₹100/month. Fully automated.",
    detail: "Auto-debit, pause/resume anytime, step-up SIP, smart triggers.",
    badge: "From ₹100",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: Target,
    title: "IPO",
    description: "Apply for upcoming IPOs in two taps via UPI. Free.",
    detail: "UPI mandate, GMP tracker, allotment status, ASBA support.",
    badge: "₹0 Application",
    badgeColor: "bg-profit/15 text-profit",
    accentColor: "#059669",
    bgHover: "rgba(5,150,105,0.04)",
  },
  {
    icon: Layers,
    title: "ETF",
    description: "Instant diversification at the lowest cost.",
    detail: "Gold ETFs, index ETFs, sectoral ETFs — live on-exchange prices.",
    badge: "Low Cost",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
  },
  {
    icon: Box,
    title: "Commodities MCX",
    description: "Trade gold, silver, and crude oil on MCX. Live prices.",
    detail: "All MCX contracts, commodity options, live LME rates, hedging tools.",
    badge: "₹17 Flat",
    badgeColor: "bg-burgundy/10 text-burgundy",
    accentColor: "#8B0D19",
    bgHover: "rgba(139,13,25,0.04)",
  },
  {
    customIcon: GlobeMarketIcon,
    title: "US Stocks",
    description: "Trade US stocks directly from India.",
    detail: "Invest in Apple, Tesla, Google, and 5,000+ US equities with ease.",
    badge: "Global Access",
    badgeColor: "bg-gold/20 text-gold-deep",
    accentColor: "#B8924A",
    bgHover: "rgba(217,178,124,0.06)",
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = product.icon
  const CustomIcon = product.customIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? product.bgHover : "white",
        borderColor: hovered ? product.accentColor : "var(--border)",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered
          ? `0 6px 16px rgba(0,0,0,0.04)`
          : "0 1px 3px rgba(0,0,0,0.01)",
      }}
      className="group relative border rounded-[5px] p-6 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
    >
      {/* Accent top line indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[5px] transition-transform duration-300 origin-left"
        style={{
          background: `linear-gradient(90deg, ${product.accentColor}, ${product.accentColor}66)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-[5px] flex items-center justify-center"
            style={{
              background: hovered ? `${product.accentColor}20` : `${product.accentColor}12`,
              transition: "background 0.2s",
            }}
          >
            {CustomIcon ? (
              <CustomIcon color={product.accentColor} />
            ) : Icon ? (
              <Icon className="h-6 w-6" style={{ color: product.accentColor }} />
            ) : null}
          </div>

          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-[5px] ${product.badgeColor}`}
          >
            {product.badge}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-foreground text-lg sm:text-xl mb-1.5">{product.title}</h4>

        {/* Description */}
        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4">{product.description}</p>
      </div>

      {/* Detail or mini-action link on hover */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Explore</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <>
      {/* ── SECTION 1: Hero heading + buttons ── */}
      <section className="relative bg-cream overflow-hidden min-h-screen flex flex-col">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "65px 65px",
              maskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
            }}
          />

          {/* Soft atmospheric glow blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-gold/5 rounded-full blur-[140px]" />
          <div
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,13,25,0.04) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(184,146,74,0.06) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Candlestick + line chart SVG — covers top half area */}
          <svg
            viewBox="0 0 1400 400"
            preserveAspectRatio="xMidYMid slice"
            className="absolute top-0 left-0 w-full h-[600px] sm:h-[750px] md:h-[900px] opacity-[0.09]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="heroChartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D9B27C" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#D9B27C" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[80, 160, 240, 320].map((y) => (
              <line key={y} x1="0" y1={y} x2="1400" y2={y} stroke="#D9B27C" strokeWidth="0.5" opacity="0.6" />
            ))}
            {[175, 350, 525, 700, 875, 1050, 1225].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#D9B27C" strokeWidth="0.3" opacity="0.3" />
            ))}

            {/* Candlesticks — bullish=gold, bearish=burgundy */}
            {([
              [30,  338, 328, 346, 322, 1],
              [80,  330, 323, 337, 318, 1],
              [130, 325, 320, 332, 314, 1],
              [180, 320, 334, 316, 340, 0],
              [230, 336, 313, 340, 308, 1],
              [280, 315, 294, 320, 288, 1],
              [330, 296, 308, 292, 313, 0],
              [380, 310, 280, 315, 275, 1],
              [430, 282, 263, 288, 258, 1],
              [475, 265, 278, 261, 284, 0],
              [520, 280, 256, 284, 251, 1],
              [568, 258, 240, 263, 235, 1],
              [615, 242, 252, 238, 257, 0],
              [660, 254, 226, 259, 221, 1],
              [705, 228, 212, 233, 207, 1],
              [748, 214, 222, 210, 228, 0],
              [795, 224, 200, 229, 195, 1],
              [845, 202, 185, 207, 180, 1],
              [892, 187, 196, 183, 201, 0],
              [940, 198, 175, 203, 170, 1],
              [988, 177, 160, 182, 155, 1],
              [1033,162, 170, 158, 175, 0],
              [1078,172, 148, 177, 143, 1],
              [1125,150, 134, 155, 129, 1],
              [1170,136, 145, 132, 150, 0],
              [1218,147, 122, 152, 117, 1],
              [1265,124, 112, 129, 107, 1],
              [1312,114, 122, 110, 127, 0],
              [1358,124, 100, 129, 95,  1],
              [1395,102,  92, 107,  88, 1],
            ] as [number,number,number,number,number,number][]).map(([x, open, close, high, low, bull], i) => {
              const color = bull ? "#D9B27C" : "#8B0D19"
              const fillOpacity = bull ? 0.35 : 0.4
              const bodyTop = Math.min(open, close)
              const bodyH = Math.max(2, Math.abs(close - open))
              return (
                <g key={i}>
                  <line x1={x} y1={high} x2={x} y2={low} stroke={color} strokeWidth="1" />
                  <rect
                    x={x - 10}
                    y={bodyTop}
                    width="20"
                    height={bodyH}
                    fill={bull ? `rgba(217,178,124,${fillOpacity})` : `rgba(139,13,25,${fillOpacity})`}
                    stroke={color}
                    strokeWidth="1"
                  />
                </g>
              )
            })}

            {/* Area fill under main trend */}
            <path
              d="M0,340 L60,328 L120,318 L160,335 L210,312 L260,295 L310,305 L360,282 L410,265 L450,278 L500,255 L555,238 L600,248 L650,225 L700,210 L745,222 L800,200 L855,183 L900,194 L950,175 L1000,158 L1045,168 L1100,148 L1150,132 L1195,142 L1250,122 L1300,110 L1350,118 L1400,98 L1400,400 L0,400 Z"
              fill="url(#heroChartGradient)"
            />

            {/* Main trending line on top */}
            <polyline
              points="0,340 60,328 120,318 160,335 210,312 260,295 310,305 360,282 410,265 450,278 500,255 555,238 600,248 650,225 700,210 745,222 800,200 855,183 900,194 950,175 1000,158 1045,168 1100,148 1150,132 1195,142 1250,122 1300,110 1350,118 1400,98"
              fill="none"
              stroke="#D9B27C"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Hero text + buttons */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 flex flex-col flex-1 w-full">
          <div className="flex flex-col flex-1 justify-center items-center text-center pt-8 sm:pt-24 md:pt-28 pb-2 sm:pb-8">

            {/* Eyebrow badge — hidden on mobile to save space */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block text-xs tracking-[0.2em] uppercase text-gold-deep font-bold mb-6"
            >
              Trusted by 60,000+ Investors
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-2xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.08] tracking-tight text-foreground text-balance mb-2 sm:mb-6"
            >
              Stop switching apps.
              <br />
              <span className="text-burgundy">Start owning every market.</span>
            </motion.h1>

            {/* Paragraph — hidden on mobile, chips bar below communicates the "what" */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden sm:block text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10"
            >
              Stocks, F&O, Mutual Funds, IPOs, US Equities — one account, one flat fee.
              Zero delivery brokerage. Flat ₹17 for intraday & F&O.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center gap-3 mt-3 sm:mt-0"
            >
              <Button
                size="lg"
                className="bg-burgundy hover:bg-burgundy-deep text-white px-5 sm:px-10 h-10 sm:h-14 text-sm sm:text-base font-bold rounded-[5px] shadow-md shadow-burgundy/10"
              >
                Open Free Account
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary px-5 sm:px-10 h-10 sm:h-14 text-sm sm:text-base font-bold rounded-[5px]"
                onClick={() => window.location.href = 'tel:02240808080'}
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Call Now
              </Button>
            </motion.div>

            {/* Built for row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-6 mt-3 sm:mt-10"
            >
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-semibold mb-0.5">built for</span>
                <span className="block text-sm font-extrabold text-foreground tracking-tight">Active Traders</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-semibold mb-0.5">built for</span>
                <span className="block text-sm font-extrabold text-foreground tracking-tight">Long Term Investors</span>
              </div>
            </motion.div>

          </div>

          {/* ── Service chips — full-width primary bar, always in viewport ── */}
        </div>
        {/* CSS for animated conic-gradient border */}
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
              linear-gradient(rgba(120, 10, 22, 0.9), rgba(120, 10, 22, 0.9)) padding-box,
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
              linear-gradient(rgba(140, 14, 26, 0.95), rgba(140, 14, 26, 0.95)) padding-box,
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

        <div className="relative z-10 w-full bg-burgundy py-3 sm:py-5">

          {/* Desktop view: Stationary single line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex flex-row items-center justify-center gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {products.map((product, index) => {
              const Icon = product.icon
              const CustomIcon = product.customIcon
              return (
                <motion.div
                  key={product.title}
                  whileHover={{ y: -2, scale: 1.04 }}
                  transition={{ duration: 0.18 }}
                  className="chip-border flex items-center gap-2.5 px-5 py-2 rounded-full cursor-pointer"
                  style={{ animationDelay: `${index * 0.28}s` }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15">
                    {CustomIcon ? (
                      <CustomIcon color="#ffffff" size={15} />
                    ) : Icon ? (
                      <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-white/90 tracking-tight whitespace-nowrap pr-1">
                    {product.title}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Mobile/Tablet view: Seamless infinite scrolling marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex lg:hidden w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent_0%,white_12%,white_88%,transparent_100%)]"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 22, repeat: Infinity }}
              className="flex gap-3 shrink-0 pr-3 px-4"
            >
              {[...products, ...products].map((product, index) => {
                const Icon = product.icon
                const CustomIcon = product.customIcon
                return (
                  <div
                    key={`${product.title}-${index}`}
                    className="chip-border flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0"
                    style={{ animationDelay: `${(index % products.length) * 0.28}s` }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/15">
                      {CustomIcon ? (
                        <CustomIcon color="#ffffff" size={11} />
                      ) : Icon ? (
                        <Icon className="h-3 w-3 text-white" strokeWidth={2.2} />
                      ) : null}
                    </div>
                    <span className="text-xs font-semibold text-white/90 tracking-tight whitespace-nowrap">
                      {product.title}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* App Promo */}
      <AppPromoSection />

      {/* ── Product selection grid ── */}
      <section className="relative bg-cream pt-[100px] pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4">
              Complete Investment Suite
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
              Every market. <span className="text-burgundy">One account.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard key={product.title} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

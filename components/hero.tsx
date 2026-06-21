"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
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
  Box,
  Zap,
  BarChart2,
  Users,
  Shield,
  CheckCircle2,
} from "lucide-react"
import { AppPromoSection } from "@/components/app-promo-section"
import Link from "next/link"

/* ── Custom globe SVG ── */
function GlobeMarketIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.2" stroke={color} strokeWidth="1.1" />
      <ellipse cx="12" cy="8.2" rx="7.8" ry="2.2" stroke={color} strokeWidth="0.7" opacity="0.55" />
      <ellipse cx="12" cy="15.8" rx="7.8" ry="2.2" stroke={color} strokeWidth="0.7" opacity="0.55" />
      <ellipse cx="12" cy="12" rx="2.2" ry="9.5" stroke={color} strokeWidth="0.9" />
      <ellipse cx="12" cy="12" rx="6" ry="9.5" stroke={color} strokeWidth="0.6" opacity="0.45" />
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke={color} strokeWidth="0.9" opacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}

/* ── Promo slides ── */
const promoSlides = [
  {
    badge: "ZERO BROKERAGE",
    badgeColor: "#059669",
    headline: "₹0",
    headlineSub: "on Delivery",
    body: "Buy and hold stocks with absolutely zero brokerage — forever. No hidden charges.",
    bg: ["#071410", "#0d2418"],
    accent: "#4ade80",
    Icon: TrendingUp,
    stat: "₹0 forever",
    statLabel: "Delivery brokerage",
  },
  {
    badge: "FLAT FEE",
    badgeColor: "#FF0000",
    headline: "₹17",
    headlineSub: "Intraday & F&O",
    body: "Trade any size lot — just ₹17 per executed order. No percentage, no surprises.",
    bg: ["#150404", "#260808"],
    accent: "#ff6b6b",
    Icon: BarChart2,
    stat: "₹17 flat",
    statLabel: "Per order, any size",
  },
  {
    badge: "MUTUAL FUNDS",
    badgeColor: "#B8924A",
    headline: "5,000+",
    headlineSub: "Direct Funds",
    body: "Zero commission. Direct plans only. Keep every rupee of your return.",
    bg: ["#140f02", "#241a04"],
    accent: "#D9B27C",
    Icon: Landmark,
    stat: "0% commission",
    statLabel: "On all mutual funds",
  },
  {
    badge: "QUICK START",
    badgeColor: "#6366f1",
    headline: "15 min",
    headlineSub: "Account Opening",
    body: "Paperless, Aadhaar-based KYC. Be investment-ready in under 15 minutes.",
    bg: ["#07070f", "#0f0f1e"],
    accent: "#818cf8",
    Icon: Zap,
    stat: "3.25 Cr+",
    statLabel: "Investors trust us",
  },
]

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
  href?: string
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
    href: "/stocks",
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
    href: "/futures-options",
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
    href: "/#global-investing",
  },
]

/* ── Product card ── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = product.icon
  const CustomIcon = product.customIcon

  const cardContent = (
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
        boxShadow: hovered ? `0 6px 16px rgba(0,0,0,0.04)` : "0 1px 3px rgba(0,0,0,0.01)",
      }}
      className="group relative border rounded-[5px] p-6 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[5px] transition-transform duration-300 origin-left"
        style={{
          background: `linear-gradient(90deg, ${product.accentColor}, ${product.accentColor}66)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />
      <div>
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-[5px] flex items-center justify-center"
            style={{
              background: hovered ? `${product.accentColor}20` : `${product.accentColor}12`,
              transition: "background 0.2s",
            }}
          >
            {CustomIcon ? <CustomIcon color={product.accentColor} /> : Icon ? <Icon className="h-6 w-6" style={{ color: product.accentColor }} /> : null}
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-[5px] ${product.badgeColor}`}>{product.badge}</span>
        </div>
        <h4 className="font-extrabold text-foreground text-lg sm:text-xl mb-1.5">{product.title}</h4>
        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4">{product.description}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-bold text-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Explore</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </motion.div>
  )

  if (product.href) {
    return <Link href={product.href} className="block h-full">{cardContent}</Link>
  }
  return cardContent
}

/* ── Floating hanging icon ── */
interface FloatingIconDef {
  Icon: React.ElementType
  color: string
  bg: string
  border: string
  top: string
  left?: string
  right?: string
  depth: number
  dur: number
  delay: number
  rot: number
  stringH: number
}

function FloatingIcon({ Icon, color, bg, border, top, left, right, depth, dur, delay, rot, stringH }: FloatingIconDef) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sX = useSpring(mouseX, { stiffness: 55, damping: 22 })
  const sY = useSpring(mouseY, { stiffness: 55, damping: 22 })
  const pX = useTransform(sX, (v) => v * depth)
  const pY = useTransform(sY, (v) => v * depth * 0.55)

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 28)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 28)
    }
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="absolute"
      style={{ top, ...(right ? { right } : { left }), x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, -9, 0], rotate: [rot, rot + 2.5, rot] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* String */}
        <div
          style={{
            width: 1,
            height: stringH,
            background: `linear-gradient(to bottom, transparent, ${color}55)`,
            marginBottom: 3,
          }}
        />
        {/* Icon card */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: bg,
            border: `1px solid ${border}`,
            boxShadow: `0 5px 16px ${color}1a, 0 1px 3px rgba(0,0,0,0.06)`,
          }}
        >
          <Icon style={{ width: 20, height: 20, color, strokeWidth: 1.6 }} />
        </div>
        {/* Hanging shadow dot */}
        <div
          style={{
            width: 22,
            height: 5,
            borderRadius: "50%",
            marginTop: 6,
            background: `radial-gradient(ellipse at center, ${color}22 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const FLOATING_ICONS_LEFT: FloatingIconDef[] = [
  { Icon: TrendingUp, color: "#059669", bg: "rgba(5,150,105,0.09)",    border: "rgba(5,150,105,0.22)",    top: "13%", left: "2%",   depth: 0.7, dur: 3.6, delay: 0.2, rot: -4, stringH: 42 },
  { Icon: PieChart,   color: "#CC0000", bg: "rgba(204,0,0,0.08)",      border: "rgba(204,0,0,0.2)",       top: "31%", left: "5.5%", depth: 1.1, dur: 3.0, delay: 0.8, rot:  5, stringH: 30 },
  { Icon: BarChart2,  color: "#B8924A", bg: "rgba(184,146,74,0.11)",   border: "rgba(184,146,74,0.28)",   top: "51%", left: "1.5%", depth: 0.9, dur: 4.2, delay: 1.4, rot: -3, stringH: 46 },
  { Icon: Shield,     color: "#6366f1", bg: "rgba(99,102,241,0.09)",   border: "rgba(99,102,241,0.22)",   top: "69%", left: "4.5%", depth: 1.2, dur: 3.3, delay: 1.0, rot:  5, stringH: 30 },
  { Icon: Target,     color: "#f59e0b", bg: "rgba(245,158,11,0.09)",   border: "rgba(245,158,11,0.22)",   top: "84%", left: "2.5%", depth: 0.8, dur: 3.8, delay: 2.0, rot: -4, stringH: 36 },
]

const FLOATING_ICONS_RIGHT: FloatingIconDef[] = [
  { Icon: Landmark,   color: "#2563EB", bg: "rgba(37,99,235,0.09)",    border: "rgba(37,99,235,0.22)",    top: "11%", right: "2.5%", depth: 0.8, dur: 3.9, delay: 0.5, rot:  4, stringH: 40 },
  { Icon: Zap,        color: "#7C3AED", bg: "rgba(124,58,237,0.09)",   border: "rgba(124,58,237,0.22)",   top: "30%", right: "5%",   depth: 1.0, dur: 3.2, delay: 1.1, rot: -5, stringH: 32 },
  { Icon: Layers,     color: "#0D9488", bg: "rgba(13,148,136,0.09)",   border: "rgba(13,148,136,0.22)",   top: "50%", right: "1.5%", depth: 1.3, dur: 4.0, delay: 0.4, rot:  3, stringH: 44 },
  { Icon: RotateCcw,  color: "#D97706", bg: "rgba(217,119,6,0.09)",    border: "rgba(217,119,6,0.22)",    top: "68%", right: "4%",   depth: 0.9, dur: 3.5, delay: 1.6, rot: -4, stringH: 34 },
  { Icon: Users,      color: "#DB2777", bg: "rgba(219,39,119,0.08)",   border: "rgba(219,39,119,0.22)",   top: "83%", right: "2%",   depth: 1.1, dur: 3.7, delay: 0.9, rot:  5, stringH: 38 },
]

function FloatingIcons() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none z-[5]">
      {FLOATING_ICONS_LEFT.map((def, i) => (
        <FloatingIcon key={`l${i}`} {...def} />
      ))}
      {FLOATING_ICONS_RIGHT.map((def, i) => (
        <FloatingIcon key={`r${i}`} {...def} />
      ))}
    </div>
  )
}

/* ── Promotional Slider ── */
function PromoSlider() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setActive((s) => (s + 1) % promoSlides.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const go = (i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
  }

  const slide = promoSlides[active]

  return (
    <div className="flex flex-col gap-4">
      {/* Card */}
      <div
        className="relative rounded-[12px] overflow-hidden"
        style={{ height: "420px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, ${slide.bg[0]} 0%, ${slide.bg[1]} 100%)`,
            }}
          >
            {/* Decorative radial glow */}
            <div
              className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${slide.accent}18 0%, transparent 70%)`,
                filter: "blur(30px)",
              }}
            />

            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${slide.accent} 1px, transparent 1px), linear-gradient(90deg, ${slide.accent} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Decorative large number background */}
            <div
              className="absolute right-4 bottom-16 text-[130px] font-black leading-none pointer-events-none select-none"
              style={{ color: slide.accent, opacity: 0.06 }}
            >
              {slide.headline}
            </div>

            {/* Top: badge + icon */}
            <div className="relative z-10 flex items-start justify-between">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[4px]"
                style={{ background: `${slide.badgeColor}22`, color: slide.accent, border: `1px solid ${slide.accent}30` }}
              >
                {slide.badge}
              </span>
              <div
                className="w-11 h-11 rounded-[8px] flex items-center justify-center"
                style={{ background: `${slide.accent}18`, border: `1px solid ${slide.accent}25` }}
              >
                <slide.Icon className="w-5 h-5" style={{ color: slide.accent }} strokeWidth={1.8} />
              </div>
            </div>

            {/* Center: headline */}
            <div className="relative z-10">
              <div
                className="text-[64px] font-black leading-none tracking-tight mb-1"
                style={{ color: slide.accent }}
              >
                {slide.headline}
              </div>
              <div className="text-[18px] font-extrabold text-white/80 mb-4 leading-tight">
                {slide.headlineSub}
              </div>
              <p className="text-[13px] text-white/45 leading-relaxed max-w-[260px] font-medium">
                {slide.body}
              </p>
            </div>

            {/* Bottom: stat pill */}
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[6px]"
                style={{ background: `${slide.accent}12`, border: `1px solid ${slide.accent}20` }}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: slide.accent }} />
                <div>
                  <span className="text-[15px] font-black" style={{ color: slide.accent }}>{slide.stat}</span>
                  <span className="text-[11px] text-white/40 ml-2 font-medium">{slide.statLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot pagination */}
      <div className="flex items-center justify-center gap-2">
        {promoSlides.map((_, i) => (
          <button key={i} onClick={() => go(i)} className="p-1 group">
            <motion.div
              className="h-1.5 rounded-full"
              animate={{
                width: i === active ? 24 : 6,
                backgroundColor: i === active ? "#FF0000" : "rgba(26,26,26,0.18)",
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative bg-cream overflow-hidden">

        {/* Floating hanging icons — desktop & tablet only */}
        <FloatingIcons />

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "65px 65px",
              maskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 95%)",
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
          <div
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,13,25,0.04) 0%, transparent 70%)", filter: "blur(50px)" }}
          />
          <div
            className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(184,146,74,0.05) 0%, transparent 70%)", filter: "blur(50px)" }}
          />
        </div>

        {/* ── 2-Column Hero Layout ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[60fr_40fr] gap-8 xl:gap-16 items-center min-h-[calc(100vh-68px)] py-16 sm:py-20 lg:py-0">

            {/* ── Left: Text Content (60%) ── */}
            <div className="flex flex-col justify-center lg:py-28">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] tracking-[0.22em] uppercase text-gold-deep font-black mb-5 flex items-center gap-2"
              >
                <span className="w-5 h-px bg-gold-deep inline-block" />
                Trusted by 3.25 Crore+ Investors
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black leading-[1.05] tracking-tight text-foreground mb-5"
              >
                Stop switching apps.
                <br />
                <span className="text-burgundy">Own every market.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[520px] mb-8"
              >
                Stocks, F&amp;O, Mutual Funds, IPOs, US Equities — one account, one flat fee.
                Zero delivery brokerage. Flat ₹17 for intraday &amp; F&amp;O.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link href="/signup/register">
                  <Button
                    size="lg"
                    className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-13 text-sm font-bold rounded-[5px] shadow-md shadow-burgundy/10"
                  >
                    Open Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary px-8 h-13 text-sm font-bold rounded-[5px]"
                  onClick={() => window.location.href = "tel:02240808080"}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </motion.div>

              {/* Trust pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="flex flex-wrap items-center gap-6"
              >
                {[
                  { Icon: Shield, text: "SEBI Registered" },
                  { Icon: Users, text: "Active Traders" },
                  { Icon: CheckCircle2, text: "ISO/IEC 27001:2022" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                    <Icon className="w-4 h-4 text-gold-deep" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Promo Slider (40%) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block lg:py-28"
            >
              <PromoSlider />
            </motion.div>

          </div>
        </div>

        <div className="relative z-10 w-full bg-burgundy py-5">
          {/* Desktop: stationary row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:flex flex-row items-center justify-center gap-2.5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {products.map((product) => {
              const Icon = product.icon
              const CustomIcon = product.customIcon
              const chip = (
                <motion.div
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
                  style={{
                    background: "rgba(217,178,124,0.18)",
                    border: "1px solid rgba(217,178,124,0.42)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(217,178,124,0.22)" }}
                  >
                    {CustomIcon ? <CustomIcon color="#FFE8C0" size={13} /> : Icon ? <Icon className="h-3 w-3" style={{ color: "#FFE8C0" }} strokeWidth={2.2} /> : null}
                  </div>
                  <span className="text-[13px] font-semibold whitespace-nowrap" style={{ color: "#FFE8C0" }}>{product.title}</span>
                </motion.div>
              )
              if (product.href) return <Link key={product.title} href={product.href} className="flex items-center">{chip}</Link>
              return <div key={product.title} className="flex items-center">{chip}</div>
            })}
          </motion.div>

          {/* Mobile: infinite marquee */}
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
                const chipStyle = {
                  background: "rgba(217,178,124,0.18)",
                  border: "1px solid rgba(217,178,124,0.42)",
                }
                const chipContent = (
                  <>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(217,178,124,0.22)" }}>
                      {CustomIcon ? <CustomIcon color="#FFE8C0" size={13} /> : Icon ? <Icon className="h-3 w-3" style={{ color: "#FFE8C0" }} strokeWidth={2.2} /> : null}
                    </div>
                    <span className="text-[13px] font-semibold whitespace-nowrap" style={{ color: "#FFE8C0" }}>{product.title}</span>
                  </>
                )
                if (product.href) {
                  return (
                    <Link key={`${product.title}-${index}`} href={product.href} className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0 cursor-pointer" style={chipStyle}>
                      {chipContent}
                    </Link>
                  )
                }
                return (
                  <div key={`${product.title}-${index}`} className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0" style={chipStyle}>
                    {chipContent}
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* App Promo */}
      <AppPromoSection />

      {/* ── Product Grid ── */}
      <section className="relative bg-cream pt-[100px] pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4">Complete Investment Suite</p>
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

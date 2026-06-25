"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  TrendingUp, Calculator, Layers, BarChart2,
  Target, Percent, ChevronRight, ArrowUpRight,
} from "lucide-react"

/* ─── Calculator data ─── */

const calcs = [
  { name: "SIP Calculator",        icon: TrendingUp,  href: "#", hint: "Monthly SIP returns & corpus" },
  { name: "Brokerage Calculator",  icon: Calculator,  href: "#", hint: "Know your exact cost per trade" },
  { name: "Margin Calculator",     icon: Layers,      href: "#", hint: "Available intraday margin" },
  { name: "Lumpsum Calculator",    icon: BarChart2,   href: "#", hint: "One-time investment returns" },
  { name: "Goal-based SIP",        icon: Target,      href: "#", hint: "How much SIP to reach a goal" },
  { name: "CAGR Calculator",       icon: Percent,     href: "#", hint: "Compound annual growth rate" },
]

/* ─── Custom calculator illustration ─── */

const KEYS = [
  ["%", "÷", "×", "−"],
  ["7", "8", "9", "+"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["0", "0", "·", "="],
]

function CalcKey({ label, type }: { label: string; type: "num" | "op" | "eq" | "zero" }) {
  const base = "flex items-center justify-center rounded-[5px] text-[11px] font-bold select-none transition-all duration-150 cursor-default"
  const styles = {
    num:  `${base} bg-white border border-border text-foreground/80 hover:border-gold/40 hover:bg-gold/5`,
    op:   `${base} bg-burgundy/10 border border-burgundy/20 text-burgundy hover:bg-burgundy/15`,
    eq:   `${base} bg-gold text-white border border-gold/80 shadow-sm`,
    zero: `${base} bg-white border border-border text-foreground/80 col-span-2`,
  }
  return (
    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
      className={styles[type]} style={{ height: 28 }}>
      {label}
    </motion.div>
  )
}

function CalcIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Floating decoratives */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg z-10"
        style={{ boxShadow: "0 4px 16px rgba(217,178,124,0.5)" }}
      >
        <span className="text-white font-black text-[18px]">₹</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -bottom-2 -left-6 w-8 h-8 rounded-full bg-burgundy/10 border border-burgundy/20 flex items-center justify-center z-10"
      >
        <span className="text-burgundy font-black text-[13px]">%</span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        className="absolute top-8 -left-3 text-gold font-black text-lg select-none z-10"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute bottom-12 -right-2 text-burgundy/40 font-black text-sm select-none z-10"
      >
        ✦
      </motion.div>

      {/* Calculator body */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[180px] rounded-[16px] p-3 shadow-xl"
        style={{
          background: "linear-gradient(145deg, #FAF8F5 0%, #F5F0EB 100%)",
          border: "1.5px solid rgba(217,178,124,0.35)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(217,178,124,0.15)",
        }}
      >
        {/* Top groove */}
        <div className="w-10 h-1 rounded-full bg-border/60 mx-auto mb-3" />

        {/* Screen */}
        <div
          className="rounded-[8px] px-3 py-2.5 mb-3"
          style={{
            background: "linear-gradient(135deg, #1A0A0A 0%, #2D0808 100%)",
            border: "1px solid rgba(255,0,0,0.25)",
          }}
        >
          <p className="text-[9px] text-white/30 font-semibold tracking-wider uppercase mb-0.5">Brokerage</p>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-right font-mono font-black text-[18px]"
            style={{ color: "#D9B27C" }}
          >
            ₹ 17.00
          </motion.p>
        </div>

        {/* Key grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {/* Row 1: operators */}
          {["%","÷","×","−"].map(k => <CalcKey key={k} label={k} type="op" />)}
          {/* Row 2-3: numbers + + */}
          {["7","8","9"].map(k => <CalcKey key={k} label={k} type="num" />)}
          <CalcKey label="+" type="op" />
          {["4","5","6"].map(k => <CalcKey key={k} label={k} type="num" />)}
          <CalcKey label="+" type="op" />
          {/* Row 4: 1 2 3 = */}
          {["1","2","3"].map(k => <CalcKey key={k} label={k} type="num" />)}
          <CalcKey label="=" type="eq" />
          {/* Row 5: 0 0 · */}
          <div className="col-span-2 flex items-center justify-center rounded-[5px] bg-white border border-border text-foreground/80 text-[11px] font-bold" style={{ height: 28 }}>0</div>
          <CalcKey label="·" type="num" />
          <div /> {/* placeholder for = already placed */}
        </div>

        {/* Brand chip */}
        <div className="mt-3 flex items-center justify-center gap-1.5 py-1 rounded-[4px]" style={{ background: "rgba(255,0,0,0.06)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
          <span className="text-[9px] font-bold text-burgundy tracking-wider uppercase">Shree Varahi</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Section ─── */

export function CalculatorSection() {
  return (
    <section className="py-14 lg:py-20 overflow-hidden" style={{ background: "#F7F4F0" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[12px] bg-white border border-border overflow-hidden"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}
        >
          {/* Gold top accent line */}
          <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="grid lg:grid-cols-[1fr_auto] gap-0">

            {/* ── LEFT: Content ── */}
            <div className="p-8 sm:p-10 lg:p-12">

              {/* Tag */}
              <span className="inline-block text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-4">
                Financial Tools
              </span>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-2">
                Calculate & know before{" "}
                <span className="text-burgundy">you invest.</span>
              </h2>
              <p className="text-[14px] text-muted-foreground mb-8 max-w-lg">
                From SIP corpus to exact brokerage charges — get every number right before placing an order.
              </p>

              {/* Calculator pills */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {calcs.map((calc, i) => {
                  const Icon = calc.icon
                  return (
                    <motion.div
                      key={calc.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                    >
                      <Link
                        href={calc.href}
                        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-[6px] border border-border bg-white hover:border-burgundy/40 hover:bg-burgundy/[0.03] hover:shadow-sm transition-all duration-200"
                      >
                        <div className="w-6 h-6 rounded-[4px] bg-burgundy/8 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/12 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-[#8B0D19]" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                          {calc.name}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-burgundy group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Explore link */}
              <Link
                href="http://l5b7booc1v6okc4700748zn9.187.127.157.145.sslip.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.15em] uppercase text-burgundy hover:text-burgundy-deep transition-colors group"
              >
                Explore all calculators
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* ── RIGHT: Illustration ── */}
            <div
              className="hidden lg:flex items-center justify-center px-12 py-10 relative"
              style={{
                background: "linear-gradient(135deg, rgba(250,248,245,0.8) 0%, rgba(245,240,235,0.6) 100%)",
                borderLeft: "1px solid rgba(229,229,229,0.8)",
                minWidth: 280,
              }}
            >
              {/* Soft glow behind illustration */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(217,178,124,0.07) 0%, transparent 70%)" }}
              />
              <CalcIllustration />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

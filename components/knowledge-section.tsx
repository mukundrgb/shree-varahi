"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowLeft, ArrowRight, Newspaper, BookOpen, TrendingUp, TrendingDown } from "lucide-react"

/* ─── Tab data ─── */

const tabs = [
  {
    id: "news",
    title: "Market News",
    icon: Newspaper,
    desc: "Live market developments, earnings updates, policy changes, and sector-specific news curated every day by our team.",
  },
  {
    id: "blog",
    title: "Blog & Research",
    icon: BookOpen,
    desc: "In-depth articles, trade ideas, and market analysis from Lakshmishree's in-house research team and expert contributors.",
  },
]

/* ─── Right-side illustrations ─── */

function BrowserShell({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="w-full h-full bg-white rounded-[16px] border border-border shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Browser bar */}
      <div className="h-10 px-4 bg-slate-50 border-b border-border flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-2 ml-1">
          <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground/40" />
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        </div>
        <div className="flex-1 bg-white border border-border rounded-[4px] h-6 flex items-center px-2.5">
          <span className="text-[10px] text-muted-foreground/60 font-medium truncate">{url}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

/* News illustration */
function NewsIllustration() {
  const headlines = [
    {
      tag: "Economy",
      tagColor: "bg-blue-50 text-blue-600",
      title: "RBI holds repo rate at 6.5% — inflation remains primary focus",
      time: "2 min ago",
      up: true,
    },
    {
      tag: "Results",
      tagColor: "bg-emerald-50 text-emerald-600",
      title: "TCS Q3 beats estimates: 8.2% YoY revenue growth reported",
      time: "18 min ago",
      up: true,
    },
    {
      tag: "Regulation",
      tagColor: "bg-amber-50 text-amber-700",
      title: "SEBI revises F&O margin norms for retail participants",
      time: "1 hr ago",
      up: false,
    },
  ]

  return (
    <BrowserShell url="varahi.in/market-news">
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Ticker bar */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-[6px] bg-[#0B0707] shrink-0">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-wider">Live</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-white/70">NIFTY</span>
            <span className="text-[10px] font-black text-emerald-400">24,837</span>
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-white/70">SENSEX</span>
            <span className="text-[10px] font-black text-emerald-400">81,224</span>
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-white/70">BANK NIFTY</span>
            <span className="text-[10px] font-black text-red-400">52,340</span>
            <TrendingDown className="w-3 h-3 text-red-400" />
          </div>
        </div>

        {/* News items */}
        <div className="flex flex-col gap-2.5 flex-1">
          {headlines.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-[8px] bg-slate-50/70 border border-border/50 hover:border-border transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-[3px] ${item.tagColor}`}>{item.tag}</span>
                  <span className="text-[9px] text-muted-foreground/60">{item.time}</span>
                </div>
                <p className="text-[11px] font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.up ? "bg-emerald-400" : "bg-red-400"}`} />
            </div>
          ))}
        </div>

        {/* Bottom skeleton */}
        <div className="flex gap-2 pt-1 border-t border-border/40 shrink-0">
          <div className="h-1.5 rounded-full bg-slate-100 flex-1" />
          <div className="h-1.5 rounded-full bg-slate-100 w-1/3" />
        </div>
      </div>
    </BrowserShell>
  )
}

/* Blog illustration */
function BlogIllustration() {
  return (
    <BrowserShell url="varahi.in/blog">
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Featured article header */}
        <div className="rounded-[8px] overflow-hidden shrink-0" style={{ background: "linear-gradient(135deg, #1A0808 0%, #3D0808 50%, #1A0808 100%)" }}>
          <div className="px-4 py-5 relative">
            {/* Decorative chart lines in bg */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 80" preserveAspectRatio="none">
              <polyline points="0,60 30,50 60,55 90,30 120,38 150,20 180,25 200,18" fill="none" stroke="#D9B27C" strokeWidth="1.5" />
            </svg>
            <div className="relative z-10">
              <span className="text-[8px] font-bold text-gold tracking-wider uppercase">Technical Analysis</span>
              <h4 className="text-[12px] font-black text-white mt-1 leading-snug">
                Understanding MACD: A Complete Guide for Indian Traders
              </h4>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-gold/40 flex items-center justify-center">
                    <span className="text-[7px] font-black text-white">R</span>
                  </div>
                  <span className="text-[9px] text-white/50 font-medium">Research Team</span>
                </div>
                <span className="text-white/20 text-[9px]">·</span>
                <span className="text-[9px] text-white/40">8 min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article list */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            { tag: "Investing", color: "bg-violet-50 text-violet-600", title: "Top 5 Large-Cap Stocks for Long-Term SIP in 2026", date: "Jun 18" },
            { tag: "F&O", color: "bg-red-50 text-red-600", title: "How to Build a Risk-Free Iron Condor in Bank Nifty Weekly", date: "Jun 17" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-[8px] border border-border/50 bg-slate-50/60">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-[3px] ${item.color}`}>{item.tag}</span>
                  <span className="text-[9px] text-muted-foreground/60">{item.date}</span>
                </div>
                <p className="text-[11px] font-semibold text-foreground leading-snug">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton */}
        <div className="space-y-1.5 pt-1 border-t border-border/40 shrink-0">
          <div className="h-1.5 rounded-full bg-slate-100 w-3/4" />
          <div className="h-1.5 rounded-full bg-slate-100 w-1/2" />
        </div>
      </div>
    </BrowserShell>
  )
}

/* ─── Section ─── */

export function KnowledgeSection() {
  const [active, setActive] = useState("news")

  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden border-t border-slate-100">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#B8924A 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Heading + Cards ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 leading-[1.15] tracking-tight uppercase">
                Learn with <br />
                <span className="text-burgundy">Shree Varahi.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Markets made simple — explore expert knowledge, daily news, and in-depth research all in one place.
              </p>
            </div>

            {/* Two clickable cards */}
            <div className="space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = active === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    whileHover={{ y: isActive ? 0 : -2 }}
                    className={`group w-full text-left rounded-[12px] p-5 flex items-center justify-between gap-6 transition-all duration-250 ${
                      isActive
                        ? "bg-burgundy/[0.04] border border-burgundy/25 shadow-sm"
                        : "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? "bg-burgundy text-white" : "bg-slate-50 text-slate-400 group-hover:bg-burgundy/8 group-hover:text-burgundy"
                      }`}>
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                          isActive ? "text-burgundy" : "text-slate-800 group-hover:text-burgundy"
                        }`}>
                          {tab.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">{tab.desc}</p>
                      </div>
                    </div>

                    <ChevronRight className={`h-5 w-5 shrink-0 transition-all duration-200 ${
                      isActive ? "text-burgundy translate-x-0.5" : "text-slate-300 group-hover:text-burgundy group-hover:translate-x-0.5"
                    }`} />
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT: Swappable illustration ── */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full max-w-[520px] select-none" style={{ aspectRatio: "4/3" }}>

              {/* Floating decoratives */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 -top-6 text-gold z-20"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-6 bottom-20 text-blue-300 z-20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>

              {/* Floating icon badges */}
              <div className="absolute -left-8 sm:-left-10 top-1/4 z-20 flex flex-col gap-3">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-11 h-11 rounded-full bg-white border border-border/60 shadow-md flex items-center justify-center">
                  <span className="text-xl font-serif font-black text-burgundy">"</span>
                </motion.div>
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-11 h-11 rounded-full bg-white border border-border/60 shadow-md flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </motion.div>
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-11 h-11 rounded-full bg-white border border-gold/20 shadow-md flex items-center justify-center">
                  <span className="text-[13px] font-black text-gold-deep">₹</span>
                </motion.div>
              </div>

              {/* Main illustration panel */}
              <div className="absolute w-[88%] left-[10%] top-[6%] h-[88%] z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    {active === "news" ? <NewsIllustration /> : <BlogIllustration />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating gold coins */}
              <div className="absolute right-0 sm:right-2 bottom-0 translate-y-[20%] flex items-center z-30">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_20px_rgba(184,146,74,0.35)] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl">
                  ₹
                </motion.div>
                <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_16px_rgba(184,146,74,0.3)] flex items-center justify-center text-white font-extrabold text-lg sm:text-xl -ml-4">
                  ₹
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

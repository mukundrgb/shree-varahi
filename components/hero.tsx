"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const tabletTilt = useTransform(scrollYProgress, [0, 0.5], [-32, 0])
  const screenOpacity = useTransform(scrollYProgress, [0.25, 0.6], [0.25, 1])

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "220vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen flex flex-col items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />

          {/* Candlestick + line chart — decorative background */}
          <svg
            viewBox="0 0 1400 400"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-[0.09]"
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

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32">
          {/* Text */}
          <div className="text-center mb-10 lg:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cream border border-gold/20 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-profit rounded-full animate-pulse" />
              <span className="text-xs tracking-wide uppercase text-foreground/70 font-medium">
                Trusted by 60,000+ Investors
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground text-balance mb-6"
            >
              31 Years of Trust.
              <br />
              <span className="text-burgundy">One Powerful Platform.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Trade stocks, F&O, mutual funds, IPOs, and US equities — all from one
              account. Zero delivery brokerage. Flat Rs.17 for intraday & F&O.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-base rounded-[5px] shadow-lg shadow-burgundy/20"
              >
                Open Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary px-8 h-12 text-base rounded-[5px]"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col items-center gap-2 mt-8"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-gold rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Tablet mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-[800px] mx-auto pb-20 lg:pb-28"
            style={{ perspective: "1600px", perspectiveOrigin: "50% 60%" }}
          >
            {/* Rotating tablet wrapper */}
            <motion.div
              style={{
                rotateX: tabletTilt,
                transformOrigin: "center bottom",
              }}
              className="relative"
            >
              {/* Side buttons — outside the overflow:hidden body */}
              {/* Power button — right short edge */}
              <div className="absolute right-[-3px] top-[22%] w-[3px] h-10 bg-zinc-500/70 rounded-r-[2px]" />
              {/* Volume up — left short edge */}
              <div className="absolute left-[-3px] top-[20%] w-[3px] h-7 bg-zinc-500/70 rounded-l-[2px]" />
              {/* Volume down — left short edge */}
              <div className="absolute left-[-3px] top-[33%] w-[3px] h-7 bg-zinc-500/70 rounded-l-[2px]" />

              {/* Tablet body */}
              <div
                className="relative rounded-[28px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(155deg, #e8e8ed 0%, #d4d4d9 50%, #c2c2c7 100%)",
                  padding: "10px 12px 12px",
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12)",
                }}
              >
                {/* Top bezel — camera */}
                <div className="flex justify-center items-center h-5 mb-1">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-[6px] h-[6px] rounded-full bg-zinc-600/80"
                      style={{
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
                      }}
                    />
                    <div className="w-10 h-[4px] rounded-full bg-zinc-700/40" />
                  </div>
                </div>

                {/* Screen — inner black bezel + display */}
                <div
                  className="rounded-[18px] overflow-hidden"
                  style={{ background: "#111111", padding: "3px" }}
                >
                  <div
                    className="relative rounded-[16px] overflow-hidden"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src="/xero-billing-dashboard.png"
                      alt="Trading dashboard"
                      fill
                      className="object-cover object-left-top"
                      priority
                    />
                  </div>
                </div>

                {/* Bottom bezel — home bar */}
                <div className="flex justify-center items-center h-5 mt-1">
                  <div className="w-24 h-[3px] bg-zinc-400/35 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Drop shadow under tablet */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
              style={{
                bottom: "-16px",
                width: "65%",
                height: "20px",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

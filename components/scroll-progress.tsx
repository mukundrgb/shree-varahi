"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(pct)
      setVisible(scrolled > 240)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  // SVG ring math
  const size = 56
  const stroke = 3
  const radius = (size - stroke) / 2       // 26.5
  const circ = 2 * Math.PI * radius        // ≈ 166.5
  const offset = circ - (progress / 100) * circ

  return (
    <>
      {/* ── Top scroll progress bar ── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[200] h-[3px] pointer-events-none"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #8B0D19 0%, #D9B27C 60%, #fff8e8 100%)",
          boxShadow: "0 0 8px rgba(217,178,124,0.55), 0 0 2px rgba(139,13,25,0.4)",
        }}
      />

      {/* ── Scroll-to-top FAB ── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-7 right-7 z-[199] group"
          >
            {/* SVG ring */}
            <svg
              width={size}
              height={size}
              className="-rotate-90 drop-shadow-[0_4px_12px_rgba(139,13,25,0.35)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#8B0D19" />
                  <stop offset="100%" stopColor="#D9B27C" />
                </linearGradient>
              </defs>

              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(139,13,25,0.18)"
                strokeWidth={stroke}
              />

              {/* Progress arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth={stroke}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.12s linear" }}
              />
            </svg>

            {/* Inner button face */}
            <div
              className="
                absolute inset-[5px] rounded-full
                flex items-center justify-center
                bg-burgundy
                shadow-[0_2px_8px_rgba(139,13,25,0.4)]
                group-hover:brightness-110
                transition-all duration-200
              "
            >
              <ArrowUp className="h-[18px] w-[18px] text-white" strokeWidth={2.5} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

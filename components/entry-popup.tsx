"use client"

// Risk Disclosures on Derivatives popup (SEBI requirement).
// - Home page: shown every time the visitor lands on "/" (direct load or in-site navigation).
// - Any other page: shown once per browser session, only when that page is the first one opened
//   (the visitor came in by URL instead of through the home page).
// Account pages (/login, /signup) never show it.

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useSiteConfig } from "@/components/site-config"

const SESSION_KEY = "sv-entry-popup-shown"
const isExcluded = (path: string | null) => !path || /^\/(login|signup)/.test(path)

const readFlag = () => { try { return sessionStorage.getItem(SESSION_KEY) === "1" } catch { return false } }
const writeFlag = () => { try { sessionStorage.setItem(SESSION_KEY, "1") } catch { /* storage blocked */ } }

const POINTS = [
  "9 out of 10 individual traders in equity Futures and Options Segment, incurred net losses.",
  "On an average, loss makers registered net trading loss close to ₹ 50,000.",
  "Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.",
  "Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost.",
]

const SOURCE =
  "SEBI study dated January 25, 2023 on \"Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment\", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22."

export function EntryPopup() {
  const pathname = usePathname()
  // Text and on/off from the admin panel (Masters → Disclosures), this file's text as the fallback.
  const risk = useSiteConfig()["masters.legal"]?.riskPopup
  const enabled = risk?.enabled !== false
  const title = risk?.title || "Risk Disclosures on Derivatives"
  const points = risk?.points?.filter(Boolean).length ? risk.points.filter(Boolean) : POINTS
  const source = risk?.source || SOURCE
  const button = risk?.button || "I Understand"
  // Home: open from the very first render, so it is already in the server HTML (no wait for JavaScript).
  const [open, setOpen] = useState(() => pathname === "/")
  const firstPage = useRef(true)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const isFirst = firstPage.current
    firstPage.current = false
    if (isExcluded(pathname)) { setOpen(false); return }

    // Home always shows it; another page only when it is the first page opened this session.
    const show = pathname === "/" || (isFirst && !readFlag())
    setOpen(show)
    if (show) writeFlag()
  }, [pathname])

  // Esc closes; lock page scroll while open
  useEffect(() => {
    if (!open || !enabled) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    closeBtn.current?.focus()
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey) }
  }, [open, enabled])

  return (
    <AnimatePresence initial={false}>
      {open && enabled && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button type="button" aria-label="Close" tabIndex={-1} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/55 backdrop-blur-[2px] cursor-default" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="risk-disclosure-title"
            className="relative w-full max-w-[680px] max-h-[calc(100dvh-32px)] flex flex-col bg-white rounded-[12px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close risk disclosure"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto px-5 sm:px-10 pt-10 sm:pt-12 pb-6 sm:pb-8">
              <h2 id="risk-disclosure-title" className="text-center text-[15px] sm:text-base font-black tracking-wide uppercase text-foreground">
                {title}
              </h2>
              <hr className="my-5 sm:my-6 border-border" />

              <ul className="list-disc pl-5 space-y-2 text-[13.5px] sm:text-[14.5px] text-foreground/90 leading-[1.75]">
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>

              <p className="mt-6 text-base sm:text-lg font-semibold text-foreground">Source :</p>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.8] text-burgundy-deep">{source}</p>

              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-11 px-8 rounded-[6px] bg-burgundy hover:bg-burgundy-deep text-white text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2"
                >
                  {button}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

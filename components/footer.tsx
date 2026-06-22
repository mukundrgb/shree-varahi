"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

/* ─── Data ─── */

const socials = [
  { name: "X / Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "Instagram", path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
]

const footerLinks: Record<string, { name: string; href: string }[]> = {
  Trade: [
    { name: "Trading App", href: "#" },
    { name: "Web Terminal", href: "#" },
    { name: "Options Trader", href: "/futures-options" },
    { name: "Algo & API", href: "#" },
    { name: "Stocks Intraday", href: "/stocks" },
    { name: "Futures", href: "/futures-options" },
    { name: "Commodities MCX", href: "#" },
    { name: "MTF", href: "#" },
  ],
  Invest: [
    { name: "Stocks Delivery", href: "/stocks" },
    { name: "Mutual Funds", href: "#" },
    { name: "SIP Auto-Invest", href: "#" },
    { name: "IPO", href: "#" },
    { name: "ETF", href: "#" },
    { name: "US Stocks", href: "/#global-investing" },
    { name: "Digital Gold", href: "#" },
    { name: "NFO", href: "#" },
  ],
  "Tools & Research": [
    { name: "Stock Screener", href: "#" },
    { name: "Option Chain", href: "/futures-options" },
    { name: "Strategy Builder", href: "/futures-options" },
    { name: "Market News", href: "#" },
    { name: "Research Reports", href: "#" },
    { name: "SIP Calculator", href: "#" },
    { name: "Brokerage Calc", href: "#" },
    { name: "Webinars", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press & Media", href: "#" },
    { name: "Branch Locator", href: "#" },
    { name: "Partner Program", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Help & Support", href: "#" },
    { name: "Investor Relations", href: "#" },
  ],
}

type TabLink = { name: string; href: string }
type MarketTab = { id: string; label: string; links: TabLink[] }

const PREVIEW = 16

const marketTabs: MarketTab[] = [
  {
    id: "stocks",
    label: "Share Market",
    links: [
      { name: "Top Gainers Today", href: "#" }, { name: "Top Losers Today", href: "#" },
      { name: "52-Week High Stocks", href: "#" }, { name: "52-Week Low Stocks", href: "#" },
      { name: "Most Active Stocks", href: "#" }, { name: "Stocks Feed", href: "#" },
      { name: "Reliance Industries", href: "#" }, { name: "TCS", href: "/stocks" },
      { name: "HDFC Bank", href: "#" }, { name: "Infosys", href: "#" },
      { name: "ITC", href: "#" }, { name: "State Bank of India", href: "#" },
      { name: "Wipro", href: "/stocks" }, { name: "Bajaj Finance", href: "#" },
      { name: "Tata Motors", href: "#" }, { name: "Asian Paints", href: "#" },
      { name: "Adani Enterprises", href: "#" }, { name: "Maruti Suzuki", href: "#" },
      { name: "Sun Pharma", href: "#" }, { name: "HCL Technologies", href: "#" },
      { name: "NTPC", href: "#" }, { name: "Power Grid", href: "#" },
      { name: "Bharti Airtel", href: "#" }, { name: "Titan Company", href: "#" },
    ],
  },
  {
    id: "fo",
    label: "F&O",
    links: [
      { name: "Nifty 50 Options", href: "/futures-options" }, { name: "Bank Nifty Options", href: "/futures-options" },
      { name: "Nifty IT Options", href: "/futures-options" }, { name: "Fin Nifty Options", href: "/futures-options" },
      { name: "Option Chain", href: "/futures-options" }, { name: "Strategy Builder", href: "/futures-options" },
      { name: "IV Analysis", href: "/futures-options" }, { name: "Put-Call Ratio", href: "/futures-options" },
      { name: "Stock Futures", href: "/futures-options" }, { name: "Weekly Expiry", href: "/futures-options" },
      { name: "F&O OI Data", href: "/futures-options" }, { name: "Rollover Data", href: "/futures-options" },
      { name: "FII DII in F&O", href: "/futures-options" }, { name: "Futures Margin", href: "/futures-options" },
      { name: "Lot Size Calculator", href: "/futures-options" }, { name: "MTM Calculator", href: "/futures-options" },
      { name: "Greeks Dashboard", href: "/futures-options" }, { name: "Straddle Builder", href: "/futures-options" },
      { name: "Iron Condor Setup", href: "/futures-options" }, { name: "Calendar Spread", href: "/futures-options" },
      { name: "Covered Call", href: "/futures-options" }, { name: "Naked Put", href: "/futures-options" },
      { name: "Bull Call Spread", href: "/futures-options" }, { name: "Bear Put Spread", href: "/futures-options" },
    ],
  },
  {
    id: "mf",
    label: "Mutual Funds",
    links: [
      { name: "Best Large Cap Funds", href: "#" }, { name: "Best Mid Cap Funds", href: "#" },
      { name: "Best Small Cap Funds", href: "#" }, { name: "Best ELSS Funds", href: "#" },
      { name: "Direct Plans Only", href: "#" }, { name: "Zero Commission MF", href: "#" },
      { name: "SIP from ₹100", href: "#" }, { name: "Flexi Cap Funds", href: "#" },
      { name: "Debt Funds", href: "#" }, { name: "Hybrid Funds", href: "#" },
      { name: "Index Funds", href: "#" }, { name: "Sectoral Funds", href: "#" },
      { name: "NFO Today", href: "#" }, { name: "Fund Performance", href: "#" },
      { name: "SIP Calculator", href: "#" }, { name: "Goal-based SIP", href: "#" },
      { name: "Lumpsum Calculator", href: "#" }, { name: "XIRR Calculator", href: "#" },
      { name: "STP & SWP", href: "#" }, { name: "International Funds", href: "#" },
      { name: "Overnight Funds", href: "#" }, { name: "Liquid Funds", href: "#" },
      { name: "Credit Risk Funds", href: "#" }, { name: "Gilt Funds", href: "#" },
    ],
  },
  {
    id: "ipo",
    label: "IPO",
    links: [
      { name: "Active IPOs", href: "#" }, { name: "Upcoming IPOs", href: "#" },
      { name: "Recently Listed IPOs", href: "#" }, { name: "IPO GMP Today", href: "#" },
      { name: "IPO Allotment Status", href: "#" }, { name: "IPO Subscription Data", href: "#" },
      { name: "SME IPO", href: "#" }, { name: "Mainboard IPO", href: "#" },
      { name: "IPO Review", href: "#" }, { name: "IPO Calendar 2025", href: "#" },
      { name: "DRHP Documents", href: "#" }, { name: "Anchor Investors", href: "#" },
      { name: "IPO Lot Size", href: "#" }, { name: "Grey Market Premium", href: "#" },
      { name: "Apply via UPI", href: "#" }, { name: "IPO Returns Tracker", href: "#" },
      { name: "Listing Day Returns", href: "#" }, { name: "IPO Refund Status", href: "#" },
      { name: "Buyback Offers", href: "#" }, { name: "Rights Issue", href: "#" },
      { name: "FPO Updates", href: "#" }, { name: "OFS Opportunities", href: "#" },
      { name: "IPO FAQs", href: "#" }, { name: "How to Apply for IPO", href: "#" },
    ],
  },
  {
    id: "commodities",
    label: "Commodities",
    links: [
      { name: "Gold MCX Live Rate", href: "#" }, { name: "Silver MCX Rate", href: "#" },
      { name: "Crude Oil MCX", href: "#" }, { name: "Natural Gas MCX", href: "#" },
      { name: "Copper MCX", href: "#" }, { name: "Zinc MCX", href: "#" },
      { name: "Lead MCX", href: "#" }, { name: "Aluminium MCX", href: "#" },
      { name: "MCX Live Rates", href: "#" }, { name: "LME Rates Today", href: "#" },
      { name: "Commodity Calendar", href: "#" }, { name: "Delivery Data", href: "#" },
      { name: "MCX Options", href: "#" }, { name: "Commodity Futures", href: "#" },
      { name: "Agri Commodities", href: "#" }, { name: "Bullion Prices", href: "#" },
      { name: "Commodity Margin", href: "#" }, { name: "Gold vs Silver", href: "#" },
      { name: "Crude Oil Analysis", href: "#" }, { name: "Metal Watch", href: "#" },
      { name: "Digital Gold", href: "#" }, { name: "Gold ETF vs Physical", href: "#" },
      { name: "MCX Circuit Limits", href: "#" }, { name: "Commodity News", href: "#" },
    ],
  },
  {
    id: "etf",
    label: "ETFs",
    links: [
      { name: "Nifty 50 ETF", href: "#" }, { name: "Bank Nifty ETF", href: "#" },
      { name: "Gold ETF", href: "#" }, { name: "Silver ETF", href: "#" },
      { name: "IT Sector ETF", href: "#" }, { name: "Pharma Sector ETF", href: "#" },
      { name: "International ETF", href: "#" }, { name: "Debt ETF", href: "#" },
      { name: "Lowest Expense ETF", href: "#" }, { name: "ETF Returns 2025", href: "#" },
      { name: "ETF vs Index Fund", href: "#" }, { name: "Liquid ETF", href: "#" },
      { name: "Best ETF 2025", href: "#" }, { name: "ETF Calculator", href: "#" },
      { name: "How to Invest in ETF", href: "#" }, { name: "All ETF List", href: "#" },
      { name: "Nifty Next 50 ETF", href: "#" }, { name: "Midcap 150 ETF", href: "#" },
      { name: "PSU Bank ETF", href: "#" }, { name: "Consumption ETF", href: "#" },
      { name: "CPSE ETF", href: "#" }, { name: "Bharat Bond ETF", href: "#" },
      { name: "ETF vs Mutual Fund", href: "#" }, { name: "ETF Taxation", href: "#" },
    ],
  },
  {
    id: "tools",
    label: "Calculators",
    links: [
      { name: "SIP Calculator", href: "#" }, { name: "Lumpsum Calculator", href: "#" },
      { name: "Brokerage Calculator", href: "#" }, { name: "XIRR Calculator", href: "#" },
      { name: "FD vs SIP", href: "#" }, { name: "Inflation Calculator", href: "#" },
      { name: "Goal Planner", href: "#" }, { name: "Retirement Calculator", href: "#" },
      { name: "Stock Screener", href: "#" }, { name: "Option Chain", href: "/futures-options" },
      { name: "Strategy Builder", href: "/futures-options" }, { name: "Algo Trading", href: "#" },
      { name: "Research Reports", href: "#" }, { name: "Webinars", href: "#" },
      { name: "Market News", href: "#" }, { name: "IPO GMP Tracker", href: "#" },
      { name: "Portfolio Tracker", href: "#" }, { name: "P&L Statement", href: "#" },
      { name: "Tax P&L Report", href: "#" }, { name: "CAGR Calculator", href: "#" },
      { name: "HRA Calculator", href: "#" }, { name: "EMI Calculator", href: "#" },
      { name: "Stock Compare", href: "#" }, { name: "Sector Heatmap", href: "#" },
    ],
  },
  {
    id: "misc",
    label: "Miscellaneous",
    links: [
      { name: "FII DII Activity", href: "#" }, { name: "Bulk Deals", href: "#" },
      { name: "Block Deals", href: "#" }, { name: "Insider Trading", href: "#" },
      { name: "Earnings Calendar", href: "#" }, { name: "Dividend Calendar", href: "#" },
      { name: "Board Meetings", href: "#" }, { name: "Rights Issue", href: "#" },
      { name: "Bonus History", href: "#" }, { name: "Stock Splits", href: "#" },
      { name: "AGM Calendar", href: "#" }, { name: "Results Calendar", href: "#" },
      { name: "Market Holidays", href: "#" }, { name: "Trading Hours", href: "#" },
      { name: "Margin Calculator", href: "#" }, { name: "Open Interest", href: "#" },
      { name: "Put Call Ratio", href: "#" }, { name: "VIX Live", href: "#" },
      { name: "Global Markets", href: "#" }, { name: "Crypto Heatmap", href: "#" },
      { name: "Currency Rates", href: "#" }, { name: "Bond Yields", href: "#" },
      { name: "Economic Calendar", href: "#" }, { name: "Macro Dashboard", href: "#" },
    ],
  },
]

const othersLinks = [
  { name: "NSE", href: "#" }, { name: "BSE", href: "#" }, { name: "MCX", href: "#" },
  { name: "Terms and Conditions", href: "#" }, { name: "Policies and Procedures", href: "#" },
  { name: "Regulatory & Other Info", href: "#" }, { name: "Privacy Policy", href: "#" },
  { name: "Disclosure", href: "#" }, { name: "Download Forms", href: "#" },
  { name: "Information Security Practices", href: "#" },
  { name: "Investor Charter and Grievance", href: "#" }, { name: "Bug Bounty", href: "#" },
]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

/* ─── Market Tabs (dark variant) ─── */
function MarketTabsSection() {
  const [active, setActive] = useState("stocks")
  const [expanded, setExpanded] = useState(false)

  const tab = marketTabs.find((t) => t.id === active)!
  const visible = expanded ? tab.links : tab.links.slice(0, PREVIEW)
  const hasMore = tab.links.length > PREVIEW

  return (
    <div>
      {/* Tab bar — pill chips */}
      <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-1.5 min-w-max max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {marketTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActive(t.id); setExpanded(false) }}
              className={`relative flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-150 ${
                active === t.id
                  ? "text-[#D9B27C] bg-white/10"
                  : "text-white/55 hover:text-white/85 hover:bg-white/[0.06]"
              }`}
              style={active === t.id ? { boxShadow: "inset 0 0 0 1px rgba(217,178,124,0.4)" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-2">
              {visible.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[13px] text-white/85 hover:text-white transition-colors duration-150 truncate"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-white/85 hover:text-white transition-colors"
            style={{ textDecoration: "underline", textDecorationStyle: "dashed", textUnderlineOffset: "3px", textDecorationColor: "rgba(255,255,255,0.3)" }}
          >
            {expanded ? "Show Less ∧" : `Show More ∨`}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── About Accordion ─── */
function AboutAccordion() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between py-4 text-[13px] font-bold text-white/80 hover:text-white transition-colors"
        >
          <span>About Shree Varahi</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 space-y-3 text-[13px] text-white/85 leading-relaxed max-w-4xl">
                <p>
                  <strong className="text-white/90 font-semibold">Shree Varahi</strong> is the digital trading and investment platform of{" "}
                  <strong className="text-white/90 font-semibold">Lakshmishree Investment & Securities Ltd.</strong> — a SEBI-registered stockbroker with over 31 years of market presence since 1993. We offer flat-fee brokerage at ₹17 per executed order for intraday and F&O trades, and zero brokerage on equity delivery.
                </p>
                <p>
                  Our platform provides access to NSE, BSE, MCX, and international markets through a single unified account. We offer stocks, futures & options, mutual funds, IPOs, ETFs, digital gold, and US equities — all under one roof with no hidden charges.
                </p>
                <p>
                  SEBI Registration No: <span className="text-white/80">INZ000215633</span> &nbsp;|&nbsp;
                  NSE Member ID: <span className="text-white/80">14136</span> &nbsp;|&nbsp;
                  BSE Member ID: <span className="text-white/80">6736</span> &nbsp;|&nbsp;
                  MCX Member ID: <span className="text-white/80">46685</span> &nbsp;|&nbsp;
                  CDSL DP ID: <span className="text-white/80">IN-DP-596-2021</span> &nbsp;|&nbsp;
                  CIN: <span className="text-white/80">U67120MH1993PLC074454</span>
                </p>
                <p>
                  Registered Office: 1st Floor, Vaswani Chambers, 264-265, Dr. Annie Besant Road, Worli, Mumbai – 400 025, Maharashtra, India.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Footer ─── */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-burgundy text-white">

      {/* Atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.07) 0%, transparent 65%)" }} />

      {/* Gold top line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative">

        {/* ── Brand + Nav ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <Image src="/favicon.jpg" alt="Shree Varahi" width={40} height={40} className="rounded-[5px] object-contain" />
                <div>
                  <span className="text-[17px] font-bold text-white block leading-tight">Shree Varahi</span>
                  <span className="text-[10px] text-gold-champagne font-semibold tracking-wider">by Lakshmishree</span>
                </div>
              </Link>

              <p className="text-[13px] text-white/85 mb-5 max-w-[240px] leading-relaxed">
                SEBI-registered broker since 1993. Flat ₹17 brokerage. One platform for every market.
              </p>

              {/* Social icons */}
              <div className="flex gap-2 mb-5">
                {socials.map((s) => (
                  <a key={s.name} href="#" aria-label={s.name}
                    className="w-8 h-8 rounded-[5px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>

              {/* App store buttons */}
              <div className="flex flex-col gap-2">
                <a href="#" onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-[8px] px-3.5 py-2 transition-all w-fit">
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                  </svg>
                  <div className="leading-none">
                    <span className="text-[9px] text-white/70 block font-medium uppercase tracking-wider">Download on the</span>
                    <span className="text-[12px] font-bold text-white block mt-0.5">App Store</span>
                  </div>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-[8px] px-3.5 py-2 transition-all w-fit">
                  <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                  </svg>
                  <div className="leading-none">
                    <span className="text-[9px] text-white/70 block font-medium uppercase tracking-wider">Get it on</span>
                    <span className="text-[12px] font-bold text-white block mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-white/90 text-[12px] tracking-widest mb-4 uppercase">{category}</h4>
                <ul className="space-y-[9px]">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[13px] text-white/85 hover:text-white transition-colors duration-150">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Market Tabs ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <MarketTabsSection />
        </div>

        {/* ── Others + Stocks A-Z ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Others row */}
            <div className="py-4 flex flex-wrap items-start gap-x-0 gap-y-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[12px] font-bold text-white/90 mr-3 flex-shrink-0 pt-px">Others:</span>
              <div className="flex flex-wrap items-center gap-x-0 gap-y-1.5">
                {othersLinks.map((l, i) => (
                  <span key={l.name} className="flex items-center">
                    <Link href={l.href} className="text-[12px] text-white/80 hover:text-white transition-colors px-2 py-0.5">{l.name}</Link>
                    {i < othersLinks.length - 1 && <span className="text-white/40 text-xs select-none">|</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Stocks A-Z row */}
            <div className="py-4 flex flex-wrap items-center gap-x-0 gap-y-1.5">
              <span className="text-[12px] font-bold text-white/90 mr-3 flex-shrink-0">Stocks:</span>
              {alphabet.map((letter, i) => (
                <span key={letter} className="flex items-center">
                  <Link href="#" className="text-[12px] font-semibold text-white/80 hover:text-white px-1.5 py-0.5 rounded transition-colors">
                    {letter}
                  </Link>
                  {i < alphabet.length - 1 && <span className="text-white/40 text-[10px] select-none">|</span>}
                </span>
              ))}
              <span className="text-white/40 text-[10px] select-none">|</span>
              <Link href="#" className="text-[12px] font-semibold text-white/80 hover:text-white px-1.5 py-0.5 rounded transition-colors">Others</Link>
            </div>
          </div>
        </div>

        {/* ── About Accordion ── */}
        <AboutAccordion />

        {/* ── Disclaimer ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          <div className="p-4 rounded-[5px] text-[12px] text-white/80 leading-relaxed" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="mb-2">
              <strong className="text-white/95">Disclaimer:</strong> Investments in securities market are subject to market risks. Read all related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </p>
            <p>
              Lakshmishree Investment & Securities Ltd. | SEBI Reg: INZ000215633 | NSE: 14136 | BSE: 6736 | MCX: 46685 | CDSL DP: IN-DP-596-2021 | CIN: U67120MH1993PLC074454
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[13px] text-white/70">© 2026 Shree Varahi — Lakshmishree Investment & Securities Ltd.</p>
            <p className="text-[12px] text-white/65 flex items-center gap-1.5">
              Built with
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white/55" style={{ animation: "footer-heartbeat 1.2s ease-in-out infinite" }} aria-hidden="true">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
              for traders, savers & dreamers — Made in India
            </p>
          </div>
        </div>

        <style>{`
          @keyframes footer-heartbeat {
            0%, 100% { transform: scale(1); }
            14%       { transform: scale(1.3); }
            28%       { transform: scale(1); }
            42%       { transform: scale(1.18); }
            56%       { transform: scale(1); }
          }
        `}</style>

        {/* ── Marquee ── */}
        <div className="overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <motion.div
            animate={{ x: ["0%", "-25%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap py-3"
            style={{ willChange: "transform" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="inline-flex items-baseline shrink-0">
                <span
                  className="font-bold tracking-tight select-none shrink-0"
                  style={{
                    fontSize: "clamp(56px, 11vw, 152px)",
                    lineHeight: 0.88,
                    paddingRight: "5vw",
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.22)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    letterSpacing: "0.04em",
                  }}
                >
                  SHREE VARAHI
                </span>
                <span className="shrink-0 select-none font-bold" style={{ fontSize: "clamp(24px,4vw,56px)", color: "#D9B27C", opacity: 0.45, paddingRight: "5vw" }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Gold bottom line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      </div>
    </footer>
  )
}

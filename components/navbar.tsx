"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PieChart,
  TrendingUp,
  Landmark,
  RotateCcw,
  Target,
  Layers,
  Box,
  BarChart2,
  Zap,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchPopup } from "./search-popup"
import Link from "next/link"
import Image from "next/image"


type MenuItem = {
  title: string
  desc: string
  icon: React.ReactNode
  href: string
}

// ── Menu data ─────────────────────────────────────────────────────────────

const TRADE_INVEST: MenuItem[] = [
  { title: "Stocks",    desc: "NSE & BSE equities, ₹0 delivery",   icon: <TrendingUp className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/stocks" },
  { title: "F&O",       desc: "Futures & options, ₹17 flat",        icon: <PieChart   className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/futures-options" },
  { title: "ETF",       desc: "Exchange traded funds",               icon: <Layers     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/etf" },
  { title: "IPO",       desc: "Apply for upcoming IPOs free",        icon: <Target     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/ipo" },
  { title: "Commodity", desc: "MCX gold, silver & crude oil",        icon: <Box        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/commodity" },
  { title: "MTF",       desc: "4× margin buying power on stocks",   icon: <Zap        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mtf" },
]

const MF_SIP: MenuItem[] = [
  { title: "Mutual Funds",   desc: "5,000+ direct funds, 0% commission", icon: <Landmark  className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "SIP Calculator", desc: "Plan your monthly SIP goal",          icon: <RotateCcw className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "NFO",            desc: "New fund offers — invest early",      icon: "🆕",                                                              href: "/nfo" },
]

const PRODUCTS: MenuItem[] = [
  { title: "Shree Varahi Web",         desc: "Trade from any browser",         icon: "💻",                                                                href: "#" },
  { title: "Shree Varahi Mobile App",  desc: "iOS & Android trading app",      icon: "📱",                                                                href: "#" },
  { title: "Shree Varahi Desktop App", desc: "Professional desktop platform",  icon: <BarChart2 className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />,   href: "#" },
]

const LEARN_NEWS: MenuItem[] = [
  { title: "Knowledge Panel", desc: "Courses, guides & tutorials",  icon: <BookOpen className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "#" },
  { title: "Blog",            desc: "Market insights & analysis",   icon: "📝",                                                             href: "#" },
  { title: "News",            desc: "Live market news & updates",   icon: "📰",                                                             href: "#" },
]

// ── Markets mega-menu ─────────────────────────────────────────────────────

type MktExchange = "NSE" | "BSE" | "MCX" | "GLOBAL"
type MarketItem  = { name: string; href: string; exchange?: MktExchange }

const MARKETS_TABS = ["Indices", "Stocks", "F&O", "Mutual Funds", "ETFs", "Gold & Silver", "Tools"] as const

const MARKETS_SUBS: Record<string, string[]> = {
  "Indices":       ["Major Indices", "Global Indices"],
  "Stocks":        ["By Market Cap", "By Sector", "Top Movers"],
  "F&O":           ["Futures", "Options", "F&O Analysis"],
  "Mutual Funds":  ["By Category", "Top Funds"],
  "ETFs":          ["By Type"],
  "Gold & Silver": ["Commodities", "Digital Assets"],
  "Tools":         ["Calculators", "Screeners"],
}

const MARKETS_DATA: Record<string, Record<string, MarketItem[]>> = {
  "Indices": {
    "Major Indices": [
      { name: "Nifty 50",           href: "/markets/indices/nifty-50", exchange: "NSE" },
      { name: "Sensex",             href: "#", exchange: "BSE" },
      { name: "Nifty Bank",         href: "#", exchange: "NSE" },
      { name: "BSE Small Cap",      href: "#", exchange: "BSE" },
      { name: "Finnifty",           href: "#", exchange: "NSE" },
      { name: "BSE Mid Cap",        href: "#", exchange: "BSE" },
      { name: "Nifty Next 50",      href: "#", exchange: "NSE" },
      { name: "BSE Bankex",         href: "#", exchange: "BSE" },
      { name: "Nifty Small Cap 50", href: "#", exchange: "NSE" },
      { name: "Nifty IT",           href: "#", exchange: "NSE" },
      { name: "Nifty Mid Cap 50",   href: "#", exchange: "NSE" },
      { name: "Nifty Auto",         href: "#", exchange: "NSE" },
    ],
    "Global Indices": [
      { name: "Dow Jones",   href: "#", exchange: "GLOBAL" },
      { name: "S&P 500",     href: "#", exchange: "GLOBAL" },
      { name: "NASDAQ",      href: "#", exchange: "GLOBAL" },
      { name: "FTSE 100",    href: "#", exchange: "GLOBAL" },
      { name: "Nikkei 225",  href: "#", exchange: "GLOBAL" },
      { name: "Hang Seng",   href: "#", exchange: "GLOBAL" },
      { name: "DAX",         href: "#", exchange: "GLOBAL" },
      { name: "CAC 40",      href: "#", exchange: "GLOBAL" },
    ],
  },
  "Stocks": {
    "By Market Cap": [
      { name: "Large Cap Stocks", href: "/stocks" },
      { name: "Mid Cap Stocks",   href: "/stocks" },
      { name: "Small Cap Stocks", href: "/stocks" },
      { name: "Micro Cap Stocks", href: "/stocks" },
    ],
    "By Sector": [
      { name: "Banking & Finance",      href: "/stocks" },
      { name: "Information Technology", href: "/stocks" },
      { name: "Automobile",             href: "/stocks" },
      { name: "Pharma & Healthcare",    href: "/stocks" },
      { name: "Energy & Power",         href: "/stocks" },
      { name: "FMCG",                   href: "/stocks" },
      { name: "Real Estate",            href: "/stocks" },
      { name: "Metals & Mining",        href: "/stocks" },
    ],
    "Top Movers": [
      { name: "Top Gainers",         href: "/stocks", exchange: "NSE" },
      { name: "Top Losers",          href: "/stocks", exchange: "NSE" },
      { name: "52-Week High",        href: "/stocks" },
      { name: "52-Week Low",         href: "/stocks" },
      { name: "Most Active (Vol.)",  href: "/stocks" },
      { name: "Most Active (Value)", href: "/stocks" },
    ],
  },
  "F&O": {
    "Futures": [
      { name: "Nifty Futures",      href: "/futures-options", exchange: "NSE" },
      { name: "Bank Nifty Futures", href: "/futures-options", exchange: "NSE" },
      { name: "Stock Futures",      href: "/futures-options", exchange: "NSE" },
      { name: "Sensex Futures",     href: "/futures-options", exchange: "BSE" },
      { name: "Bankex Futures",     href: "/futures-options", exchange: "BSE" },
    ],
    "Options": [
      { name: "Nifty Options",       href: "/futures-options", exchange: "NSE" },
      { name: "Bank Nifty Options",  href: "/futures-options", exchange: "NSE" },
      { name: "Finnifty Options",    href: "/futures-options", exchange: "NSE" },
      { name: "Stock Options",       href: "/futures-options", exchange: "NSE" },
      { name: "Sensex Options",      href: "/futures-options", exchange: "BSE" },
    ],
    "F&O Analysis": [
      { name: "Option Chain", href: "/futures-options" },
      { name: "Open Interest", href: "/futures-options" },
      { name: "PCR Ratio",    href: "/futures-options" },
      { name: "F&O Screener", href: "/futures-options" },
    ],
  },
  "Mutual Funds": {
    "By Category": [
      { name: "Equity Funds",        href: "/mutual-funds" },
      { name: "Debt Funds",          href: "/mutual-funds" },
      { name: "Hybrid Funds",        href: "/mutual-funds" },
      { name: "Index Funds",         href: "/mutual-funds" },
      { name: "ELSS (Tax Saver)",    href: "/mutual-funds" },
      { name: "Sectoral / Thematic", href: "/mutual-funds" },
    ],
    "Top Funds": [
      { name: "Top SIP Funds",     href: "/mutual-funds" },
      { name: "High Return Funds", href: "/mutual-funds" },
      { name: "Large Cap Funds",   href: "/mutual-funds" },
      { name: "Mid Cap Funds",     href: "/mutual-funds" },
      { name: "Small Cap Funds",   href: "/mutual-funds" },
    ],
  },
  "ETFs": {
    "By Type": [
      { name: "Nifty 50 ETF",     href: "#", exchange: "NSE" },
      { name: "Bank Nifty ETF",   href: "#", exchange: "NSE" },
      { name: "Gold ETF",         href: "#" },
      { name: "Silver ETF",       href: "#" },
      { name: "Debt ETF",         href: "#" },
      { name: "Sector ETFs",      href: "#" },
      { name: "International ETF",href: "#" },
      { name: "Liquid ETF",       href: "#" },
    ],
  },
  "Gold & Silver": {
    "Commodities": [
      { name: "MCX Gold",    href: "/commodity", exchange: "MCX" },
      { name: "MCX Silver",  href: "/commodity", exchange: "MCX" },
      { name: "Gold Mini",   href: "/commodity", exchange: "MCX" },
      { name: "Silver Mini", href: "/commodity", exchange: "MCX" },
      { name: "Gold Petal",  href: "/commodity", exchange: "MCX" },
    ],
    "Digital Assets": [
      { name: "Digital Gold",        href: "#" },
      { name: "Sovereign Gold Bond", href: "#" },
      { name: "Gold ETF",            href: "#" },
      { name: "Gold Mutual Fund",    href: "/mutual-funds" },
    ],
  },
  "Tools": {
    "Calculators": [
      { name: "SIP Calculator",       href: "/mutual-funds" },
      { name: "Brokerage Calculator", href: "#" },
      { name: "MTF Calculator",       href: "/mtf" },
      { name: "CAGR Calculator",      href: "#" },
      { name: "Lumpsum Calculator",   href: "#" },
      { name: "Goal-based SIP",       href: "#" },
    ],
    "Screeners": [
      { name: "Stock Screener", href: "/stocks" },
      { name: "MF Screener",   href: "/mutual-funds" },
      { name: "Option Chain",  href: "/futures-options" },
      { name: "F&O Screener",  href: "/futures-options" },
      { name: "IPO Screener",  href: "/ipo" },
    ],
  },
}

function ExchangeBadge({ exchange }: { exchange: MktExchange }) {
  const styles: Record<MktExchange, string> = {
    NSE:    "bg-burgundy/10 text-burgundy",
    BSE:    "bg-blue-500/10 text-blue-600",
    MCX:    "bg-amber-500/10 text-amber-600",
    GLOBAL: "bg-slate-400/10 text-slate-500",
  }
  return (
    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-[3px] shrink-0 leading-none ${styles[exchange]}`}>
      {exchange}
    </span>
  )
}

// ── Standard nav sections (Support removed; Markets handled separately) ───

type NavSection = {
  id: string
  menu: MenuItem[]
  grid: boolean
  width: string
  rightAlign: boolean
  mobileGrid: boolean
}

const NAV_SECTIONS: NavSection[] = [
  { id: "Trade & Invest",     menu: TRADE_INVEST, grid: true,  width: "440px", rightAlign: false, mobileGrid: true  },
  { id: "Mutual Funds & SIP", menu: MF_SIP,       grid: false, width: "320px", rightAlign: false, mobileGrid: false },
  { id: "Products",           menu: PRODUCTS,     grid: false, width: "300px", rightAlign: false, mobileGrid: false },
  { id: "Learn & News",       menu: LEARN_NEWS,   grid: false, width: "280px", rightAlign: true,  mobileGrid: false },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [marketsTab, setMarketsTab] = useState("Indices")
  const [marketsSub, setMarketsSub] = useState("Major Indices")
  const [mobileMktTab, setMobileMktTab] = useState("Indices")

  const switchMarketsTab = (tab: string) => {
    setMarketsTab(tab)
    setMarketsSub(MARKETS_SUBS[tab][0])
  }

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

  useEffect(() => {
    if (activeDropdown !== "Markets") {
      setMarketsTab("Indices")
      setMarketsSub("Major Indices")
    }
  }, [activeDropdown])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background/80 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.jpg"
                alt="Shree Varahi"
                width={40}
                height={40}
                className="rounded-[5px] object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">
                  Shree Varahi
                </span>
                <span className="text-[10px] text-gold-deep font-medium">by Lakshmishree</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Trade & Invest · Mutual Funds & SIP */}
              {NAV_SECTIONS.slice(0, 2).map((section) => (
                <div key={section.id} className="relative"
                  onMouseEnter={() => setActiveDropdown(section.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                    {section.id}
                    <ChevronDown className="h-3 w-3 shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.id && (
                      <motion.div key="dropdown" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        style={{ width: section.width }}
                        className={`absolute top-full mt-2 rounded-[5px] bg-background border border-border p-3 shadow-xl ${section.rightAlign ? "right-0" : "left-0"}`}
                      >
                        <div className={section.grid ? "grid grid-cols-2 gap-2" : "flex flex-col gap-0.5"}>
                          {section.menu.map((menuItem) => (
                            <Link key={menuItem.title} href={menuItem.href} className="flex items-start gap-3 rounded-[5px] p-2.5 hover:bg-secondary transition-colors">
                              <span className="text-xl flex items-center justify-center h-6 w-6 shrink-0">{menuItem.icon}</span>
                              <div>
                                <div className="font-semibold text-foreground text-sm leading-tight">{menuItem.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{menuItem.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Markets — mega dropdown */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown("Markets")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                  Markets
                  <ChevronDown className="h-3 w-3 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "Markets" && (
                    <motion.div key="markets-mega" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-[700px] rounded-[8px] bg-background border border-border shadow-2xl overflow-hidden"
                    >
                      {/* Tab bar */}
                      <div className="flex border-b border-border overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                        {MARKETS_TABS.map((t) => (
                          <button key={t} onMouseEnter={() => switchMarketsTab(t)}
                            className={`px-4 py-2.5 text-[11px] font-bold whitespace-nowrap transition-all ${marketsTab === t ? "bg-burgundy text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}
                          >{t}</button>
                        ))}
                      </div>
                      {/* Body: sidebar + content */}
                      <div className="flex" style={{ height: 260 }}>
                        <div className="w-[160px] border-r border-border shrink-0 py-2" style={{ background: "var(--cream, #FAF8F5)" }}>
                          {MARKETS_SUBS[marketsTab].map((sub) => (
                            <button key={sub} onMouseEnter={() => setMarketsSub(sub)}
                              className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center justify-between transition-all ${marketsSub === sub ? "text-burgundy" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                            >
                              <span>{sub}</span>
                              {marketsSub === sub && <ChevronRight className="w-3 h-3 shrink-0 text-burgundy" />}
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                            {(MARKETS_DATA[marketsTab]?.[marketsSub] ?? []).map((mkt) => (
                              <Link key={mkt.name} href={mkt.href} className="flex items-center gap-2 py-1.5 px-2 rounded-[4px] hover:bg-secondary/60 group transition-colors">
                                {mkt.exchange && <ExchangeBadge exchange={mkt.exchange} />}
                                <span className="text-[13px] font-medium text-foreground/80 group-hover:text-burgundy transition-colors truncate">{mkt.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-border px-5 py-2.5 flex items-center justify-between bg-secondary/30">
                        <span className="text-[11px] text-muted-foreground font-medium">Live market data powered by NSE &amp; BSE feeds</span>
                        <Link href="/stocks" className="text-[11px] font-bold text-burgundy hover:underline flex items-center gap-1">
                          View all markets <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products · Learn & News */}
              {NAV_SECTIONS.slice(2).map((section) => (
                <div key={section.id} className="relative"
                  onMouseEnter={() => setActiveDropdown(section.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                    {section.id}
                    <ChevronDown className="h-3 w-3 shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.id && (
                      <motion.div key="dropdown" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        style={{ width: section.width }}
                        className={`absolute top-full mt-2 rounded-[5px] bg-background border border-border p-3 shadow-xl ${section.rightAlign ? "right-0" : "left-0"}`}
                      >
                        <div className={section.grid ? "grid grid-cols-2 gap-2" : "flex flex-col gap-0.5"}>
                          {section.menu.map((menuItem) => (
                            <Link key={menuItem.title} href={menuItem.href} className="flex items-start gap-3 rounded-[5px] p-2.5 hover:bg-secondary transition-colors">
                              <span className="text-xl flex items-center justify-center h-6 w-6 shrink-0">{menuItem.icon}</span>
                              <div>
                                <div className="font-semibold text-foreground text-sm leading-tight">{menuItem.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{menuItem.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-between w-[280px] xl:w-[340px] h-10 px-4 rounded-[6px] bg-cream border border-border hover:border-gold/40 hover:bg-beige/35 hover:shadow-[0_2px_8px_rgba(217,178,124,0.06)] transition-all text-xs text-slate-500 font-medium"
              >
                <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">Search Stocks,Mutuals Funds, ETFs...</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[9px] font-sans font-normal shrink-0">⌘K</kbd>
              </button>
              <Button variant="ghost" className="text-foreground hover:text-burgundy rounded-[5px]" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]" asChild>
                <Link href="/signup/register">Open Free Account</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-[5px] hover:bg-secondary"
              >
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <button
                className="p-2 rounded-[5px] hover:bg-secondary"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Popup */}
      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-[400px] bg-background z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Image
                    src="/favicon.jpg"
                    alt="Shree Varahi"
                    width={34}
                    height={34}
                    className="rounded-[5px] object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground leading-tight">Shree Varahi</span>
                    <span className="text-[9px] text-gold-deep font-medium">by Lakshmishree</span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-[6px] hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* ── Search ── */}
              <div className="px-4 py-3 border-b border-border shrink-0">
                <button
                  onClick={() => { setSearchOpen(true); setMobileMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 h-10 px-4 rounded-[6px] bg-secondary border border-border text-xs text-muted-foreground font-medium text-left hover:border-burgundy/30 transition-colors"
                >
                  <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span>Search stocks, funds, IPOs…</span>
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain">

                {/* Quick access grid */}
                <div className="px-4 pt-4 pb-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Quick Access
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Stocks",       href: "/stocks",                    icon: <TrendingUp className="w-4 h-4" /> },
                      { label: "Mutual Funds", href: "/mutual-funds",              icon: <Landmark className="w-4 h-4" /> },
                      { label: "IPO",          href: "/ipo",                       icon: <Target className="w-4 h-4" /> },
                      { label: "F&O",          href: "/futures-options",           icon: <PieChart className="w-4 h-4" /> },
                      { label: "Nifty 50",     href: "/markets/indices/nifty-50",  icon: <BarChart2 className="w-4 h-4" /> },
                      { label: "ETF",          href: "/etf",                       icon: <Layers className="w-4 h-4" /> },
                      { label: "Commodity",    href: "/commodity",                 icon: <Box className="w-4 h-4" /> },
                    ].map((q) => (
                      <Link
                        key={q.label}
                        href={q.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-[7px] border border-border hover:border-burgundy/40 hover:bg-burgundy/[0.04] transition-all group"
                      >
                        <span className="text-[#8B0D19]">{q.icon}</span>
                        <span className="text-[10px] font-semibold text-foreground text-center leading-tight">{q.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border mx-4" />

                {/* ── Nav section accordions: Trade & Invest · Mutual Funds & SIP ── */}
                {NAV_SECTIONS.slice(0, 2).map((section) => (
                  <div key={section.id} className="border-b border-border">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            expandedSection === section.id ? "bg-burgundy" : "bg-border"
                          }`}
                        />
                        <span className={`text-sm font-semibold transition-colors ${expandedSection === section.id ? "text-burgundy" : "text-foreground"}`}>
                          {section.id}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedSection === section.id && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          {section.mobileGrid ? (
                            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                              {section.menu.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 p-2.5 rounded-[6px] border border-border/60 hover:border-burgundy/30 hover:bg-burgundy/[0.03] transition-all"
                                >
                                  <span className="text-base shrink-0 flex items-center justify-center w-5 h-5">{item.icon}</span>
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold text-foreground truncate leading-tight">{item.title}</div>
                                    <div className="text-[9px] text-muted-foreground truncate mt-0.5">{item.desc}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="pb-2">
                              {section.menu.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/40 transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-base flex items-center justify-center w-5 h-5 shrink-0">{item.icon}</span>
                                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-burgundy transition-colors" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* ── Markets accordion ── */}
                <div className="border-b border-border">
                  <button onClick={() => toggleSection("Markets")}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${expandedSection === "Markets" ? "bg-burgundy" : "bg-border"}`} />
                      <span className={`text-sm font-semibold transition-colors ${expandedSection === "Markets" ? "text-burgundy" : "text-foreground"}`}>
                        Markets
                      </span>
                    </div>
                    <motion.div animate={{ rotate: expandedSection === "Markets" ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedSection === "Markets" && (
                      <motion.div key="markets-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"
                      >
                        {/* Tab pills */}
                        <div className="px-4 pt-1 pb-3">
                          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                            {MARKETS_TABS.map((t) => (
                              <button key={t} onClick={() => setMobileMktTab(t)}
                                className={`px-3 py-1.5 text-[11px] font-bold rounded-full whitespace-nowrap shrink-0 transition-all ${mobileMktTab === t ? "bg-burgundy text-white shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                              >{t}</button>
                            ))}
                          </div>
                        </div>
                        {/* Items grouped by sub-category */}
                        <div className="px-4 pb-4 space-y-3">
                          {Object.entries(MARKETS_DATA[mobileMktTab] ?? {}).map(([subName, items]) => (
                            <div key={subName}>
                              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 px-1 mb-1.5">{subName}</p>
                              <div className="grid grid-cols-2 gap-1">
                                {items.map((item) => (
                                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-[5px] hover:bg-secondary transition-colors group"
                                  >
                                    {item.exchange && (
                                      <span className={`text-[7px] font-black px-1 py-0.5 rounded-[2px] shrink-0 leading-none ${
                                        item.exchange === "NSE"    ? "bg-burgundy/10 text-burgundy" :
                                        item.exchange === "BSE"    ? "bg-blue-500/10 text-blue-600" :
                                        item.exchange === "MCX"    ? "bg-amber-500/10 text-amber-600" :
                                                                     "bg-slate-400/10 text-slate-500"
                                      }`}>{item.exchange}</span>
                                    )}
                                    <span className="text-[12px] font-medium text-foreground/80 group-hover:text-burgundy transition-colors truncate">{item.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Products · Learn & News ── */}
                {NAV_SECTIONS.slice(2).map((section) => (
                  <div key={section.id} className="border-b border-border">
                    <button onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${expandedSection === section.id ? "bg-burgundy" : "bg-border"}`} />
                        <span className={`text-sm font-semibold transition-colors ${expandedSection === section.id ? "text-burgundy" : "text-foreground"}`}>
                          {section.id}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: expandedSection === section.id ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedSection === section.id && (
                        <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"
                        >
                          <div className="pb-2">
                            {section.menu.map((item) => (
                              <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 hover:bg-secondary/40 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-base flex items-center justify-center w-5 h-5 shrink-0">{item.icon}</span>
                                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-burgundy transition-colors" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Bottom spacer so content clears the fixed footer */}
                <div className="h-4" />
              </div>

              {/* ── Fixed footer CTA ── */}
              <div className="shrink-0 border-t border-border bg-background px-4 py-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    className="border-border text-foreground rounded-[5px] h-10 font-semibold"
                    asChild
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 font-bold"
                    asChild
                  >
                    <Link href="/signup/register" onClick={() => setMobileMenuOpen(false)}>
                      Open Account
                    </Link>
                  </Button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">
                  ₹0 account opening · ₹0 AMC · SEBI registered
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { CALCULATOR_LINKS, LOGIN_URL, OPEN_ACCOUNT_URL } from "@/lib/external-links"
import { useLink, useSiteConfig } from "@/components/site-config"
import { useLiveMarkets, type LiveTab } from "@/components/markets-live"
import { ListSkeleton } from "@/components/skeletons"
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
  Globe,
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
  { title: "Stocks",    desc: "Buy & sell NSE and BSE shares",   icon: <TrendingUp className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/stocks" },
  { title: "F&O",       desc: "Index & stock futures and options", icon: <PieChart   className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/futures-options" },
  { title: "ETF",       desc: "Index, gold & sector ETFs", icon: <Layers     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/etf" },
  { title: "IPO",       desc: "Apply with UPI, no application fee", icon: <Target     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/ipo" },
  // Commodity is hidden for now.
  // { title: "Commodity", desc: "MCX gold, silver & crude oil",        icon: <Box        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/commodity" },
  { title: "MTF",       desc: "Up to 3× buying power on stocks", icon: <Zap        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mtf" },
  { title: "Global Investing", desc: "Invest in US stocks from India", icon: <Globe  className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/global-investing" },
]

const MF_SIP: MenuItem[] = [
  { title: "Mutual Funds",   desc: "Start a SIP or invest lumpsum", icon: <Landmark  className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  // SIP Calculator is hidden for now.
  // { title: "SIP Calculator", desc: "Plan your monthly SIP goal",          icon: <RotateCcw className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "NFO",            desc: "Invest in new funds at launch", icon: "🆕",                                                              href: "/nfo" },
]

const PRODUCTS: MenuItem[] = [
  { title: "Shree Varahi Web",         desc: "Trade from any browser",         icon: "💻",                                                                href: "/shree-varahi-web" },
  { title: "Shree Varahi Mobile App",  desc: "iOS & Android trading app",      icon: "📱",                                                                href: "/shree-varahi-mobile-app" },
  { title: "Shree Varahi Desktop App", desc: "Trading terminal for your PC",  icon: <BarChart2 className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />,   href: "/shree-varahi-desktop-app" },
]

const LEARN_NEWS: MenuItem[] = [
  { title: "Knowledge Center", desc: "Simple guides on investing",  icon: <BookOpen className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/knowledge-center" },
  { title: "Blog",            desc: "Market insights & analysis",   icon: "📝",                                                             href: "/blog" },
  { title: "News",            desc: "Live market news & updates",   icon: "📰",                                                             href: "/news" },
]

// ── Markets mega-menu ─────────────────────────────────────────────────────

type MktExchange = "NSE" | "BSE" | "MCX" | "GLOBAL"
type MarketItem  = { name: string; href: string; exchange?: MktExchange; meta?: string }

// The "Indices" tab is hidden for now (desktop dropdown and mobile menu); add it back to the list to show it.
const MARKETS_TABS = [/* "Indices", */ "Stocks", "F&O", "Mutual Funds", "ETF", "Tools"] as const
/** Tab the Markets menu opens on. */
const DEFAULT_MARKETS_TAB = MARKETS_TABS[0]

// Hand-written sub-tabs. Stocks, F&O, Mutual Funds and ETF are filled only from the live APIs
// (components/markets-live.ts); the one hand-written list they keep is Stocks › Market Movers,
// whose pages show API data. When an API is down the tab says so instead of showing old lists.
const MARKETS_SUBS: Record<string, string[]> = {
  "Indices":       ["Major Indices", "Global Indices"],
  "Stocks":        ["Market Movers"],
  "Tools":         ["Calculators", "Screeners"],
}

const MARKETS_DATA: Record<string, Record<string, MarketItem[]>> = {
  "Indices": {
    "Major Indices": [
      { name: "Nifty 50",           href: "/markets/indices/nifty-50",           exchange: "NSE" },
      { name: "Sensex",             href: "/markets/indices/sensex",             exchange: "BSE" },
      { name: "Nifty Bank",         href: "/markets/indices/nifty-bank",         exchange: "NSE" },
      { name: "BSE Small Cap",      href: "/markets/indices/bse-small-cap",      exchange: "BSE" },
      { name: "Finnifty",           href: "/markets/indices/finnifty",           exchange: "NSE" },
      { name: "BSE Mid Cap",        href: "/markets/indices/bse-mid-cap",        exchange: "BSE" },
      { name: "Nifty Next 50",      href: "/markets/indices/nifty-next-50",      exchange: "NSE" },
      { name: "BSE Bankex",         href: "/markets/indices/bse-bankex",         exchange: "BSE" },
      { name: "Nifty Small Cap 50", href: "/markets/indices/nifty-small-cap-50", exchange: "NSE" },
      { name: "Nifty Mid Cap 50",   href: "/markets/indices/nifty-mid-cap-50",   exchange: "NSE" },
    ],
    "Global Indices": [
      { name: "US Tech 100", href: "/markets/indices/nasdaq",         exchange: "GLOBAL" },
      { name: "Dow Jones",   href: "/markets/indices/dow-jones",      exchange: "GLOBAL" },
      { name: "S&P",         href: "/markets/indices/sp-500",         exchange: "GLOBAL" },
      { name: "FTSE",        href: "/markets/indices/ftse-100",       exchange: "GLOBAL" },
      { name: "Dax",         href: "/markets/indices/dax",            exchange: "GLOBAL" },
      { name: "CAC",         href: "/markets/indices/cac-40",         exchange: "GLOBAL" },
      { name: "Nikkei 225",  href: "/markets/indices/nikkei-225",     exchange: "GLOBAL" },
      { name: "Hang Seng",   href: "/markets/indices/hang-seng",      exchange: "GLOBAL" },
      { name: "SSE Composite", href: "/markets/indices/sse-composite", exchange: "GLOBAL" },
      { name: "TAIEX",       href: "/markets/indices/taiex",          exchange: "GLOBAL" },
      { name: "KOSPI",       href: "/markets/indices/kospi",          exchange: "GLOBAL" },
      { name: "Gift Nifty",  href: "/markets/indices/gift-nifty",     exchange: "GLOBAL" },
    ],
  },
  "Stocks": {
    "Market Movers": [
      { name: "Top Gainers",           href: "/stock-market-live/top-gainers-today",       exchange: "NSE" },
      { name: "Top Losers",            href: "/stock-market-live/top-losers-today",        exchange: "NSE" },
      { name: "52W High",              href: "/stock-market-live/52-week-high-stocks" },
      { name: "52W Low",               href: "/stock-market-live/52-week-low-stocks" },
      { name: "Most Active by Value",  href: "/stock-market-live/most-active-by-value" },
      { name: "Most Active by Volume", href: "/stock-market-live/most-active-by-volume" },
    ],
  },
  "Tools": {
    "Calculators": [
      // { name: "SIP Calculator",       href: "/mutual-funds" },
      { name: "Brokerage Calculator", href: CALCULATOR_LINKS.brokerage },
      { name: "Margin Calculator",    href: CALCULATOR_LINKS.margin },
      { name: "CAGR Calculator",      href: CALCULATOR_LINKS.cagr },
      { name: "Lumpsum Calculator",   href: CALCULATOR_LINKS.lumpsum },
      { name: "Goal-based SIP",       href: CALCULATOR_LINKS.goalSip },
    ],
    // Each screener opens its page at the table section.
    "Screeners": [
      { name: "Stock Screener",       href: "/stocks#all-stocks" },
      { name: "F&O Screener",         href: "/futures-options#fno-markets" },
      { name: "IPO Screener",         href: "/ipo#ipo-list" },
      { name: "Mutual Fund Screener", href: "/mutual-funds#find-your-fund" },
      { name: "ETF Screener",         href: "/etf#etf-table" },
    ],
  },
}

/** Stocks keeps these hand-written sub-tabs in front of the live sector list. They show even when the API is down. */
const STOCKS_EXTRA_SUBS = ["Market Movers"]

/** Tabs whose content comes only from the live APIs. */
const LIVE_ONLY_TABS = ["Stocks", "F&O", "Mutual Funds", "ETF"]

/** "View all …" link in the menu footer, per tab. */
const TAB_HOME: Record<string, string> = {
  "Indices": "/stocks", "Stocks": "/stocks", "F&O": "/futures-options", "Mutual Funds": "/mutual-funds",
  "ETF": "/etf/compare", "Tools": "/stocks",
}

type MenuState = { subs: string[]; items: (sub: string) => MarketItem[] | null; live: boolean; loading: boolean; unavailable: boolean }

/**
 * Sub-tabs and items for one Markets tab.
 * - Indices and Tools: their hand-written lists.
 * - Stocks, F&O, Mutual Funds, ETF: only what the APIs send. Stocks also always has Market Movers.
 *   `unavailable` is true when the API failed or sent nothing, so the menu can say so.
 * `items` returns null while a list is still loading. `live` = not opened yet (no data asked for).
 */
function menuFor(tab: string, live: Partial<Record<string, LiveTab>>): MenuState {
  const handWritten = (s: string) => MARKETS_DATA[tab]?.[s] ?? []
  if (!LIVE_ONLY_TABS.includes(tab)) {
    return { subs: MARKETS_SUBS[tab] ?? [], items: handWritten, live: false, loading: false, unavailable: false }
  }
  const extras = tab === "Stocks" ? STOCKS_EXTRA_SUBS : []
  const lt = live[tab]
  const loading = !!lt && lt.loading && !lt.failed
  const unavailable = !lt || lt.failed || (!lt.loading && lt.subs.length === 0)
  const liveSubs = lt && !lt.failed && !lt.loading ? lt.subs : []
  return {
    subs: [...extras, ...liveSubs],
    items: (s) => (extras.includes(s) ? handWritten(s) : lt && !lt.failed ? lt.items(s) : []),
    live: liveSubs.length > 0,
    loading,
    unavailable: unavailable && !loading,
  }
}

/**
 * Shown in a Markets tab that has nothing to list: its API is down or sent nothing.
 * `compact` = the list is never loaded here (mobile F&O), so only the link is shown.
 */
function MarketsUnavailable({ tab, onNavigate, compact = false }: { tab: string; onNavigate: () => void; compact?: boolean }) {
  return (
    <div className="px-2 py-1">
      {!compact && <p className="text-[12px] text-muted-foreground mb-2">Live {tab} data isn&apos;t available right now. Please check back shortly.</p>}
      <Link href={TAB_HOME[tab] ?? "/stocks"} onClick={onNavigate} className="inline-flex items-center gap-1 text-[12px] font-bold text-burgundy hover:underline">
        Go to the {tab} page <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  )
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
  // Products menu hidden for now; uncomment to bring it back (PRODUCTS is still defined above).
  // { id: "Products",           menu: PRODUCTS,     grid: false, width: "300px", rightAlign: false, mobileGrid: false },
  { id: "Learn & News",       menu: LEARN_NEWS,   grid: false, width: "280px", rightAlign: true,  mobileGrid: false },
]

const POPULAR_SEARCHES = [
  "Reliance", "HDFC Bank", "Tata Consultancy Services", "ICICI Bank", "Infosys", "Nifty 50 ETF",
]

export function Navbar() {
  // Logo and account links from the admin panel (Masters), with the site's own values as fallback.
  const siteConfig = useSiteConfig()
  const logoSrc = siteConfig["masters.logos"]?.primary || "/favicon.jpg"
  const loginUrl = useLink("account.login", LOGIN_URL)
  const openAccountUrl = useLink("account.open", OPEN_ACCOUNT_URL)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [marketsTab, setMarketsTab] = useState<string>(DEFAULT_MARKETS_TAB)
  const [marketsSub, setMarketsSub] = useState("")
  const [mobileMktTab, setMobileMktTab] = useState<string>(DEFAULT_MARKETS_TAB)
  const [isMac, setIsMac] = useState<boolean | null>(null)
  const [searchIdx, setSearchIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIdx((i) => (i + 1) % POPULAR_SEARCHES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent))
  }, [])

  const switchMarketsTab = (tab: string) => {
    if (tab === marketsTab) return
    setMarketsTab(tab)
    // Empty = "the first sub-tab of whatever list is showing" (live categories or the fallback).
    setMarketsSub("")
  }

  // ── Markets open / close: hover grace period + click-to-pin ──
  const marketsRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const [marketsPinned, setMarketsPinned] = useState(false)
  const openMarkets = () => { window.clearTimeout(closeTimer.current); setActiveDropdown("Markets") }
  const closeMarkets = () => { window.clearTimeout(closeTimer.current); setMarketsPinned(false); setActiveDropdown(null) }
  const scheduleCloseMarkets = () => {
    if (marketsPinned) return
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setActiveDropdown((d) => (d === "Markets" ? null : d)), 250)
  }
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])
  useEffect(() => {
    if (!marketsPinned) return
    const onDown = (e: MouseEvent) => { if (marketsRef.current && !marketsRef.current.contains(e.target as Node)) closeMarkets() }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMarkets() }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey) }
  }, [marketsPinned])

  // ── Markets data: live categories from the APIs, hand-written links as the fallback ──
  const live = useLiveMarkets(activeDropdown === "Markets", marketsTab, marketsSub)
  const desk = menuFor(marketsTab, live)
  const deskSubs = desk.subs
  const deskSub = deskSubs.includes(marketsSub) ? marketsSub : deskSubs[0] ?? ""
  const deskItems = deskSub ? desk.items(deskSub) : null
  const deskLive = desk.live
  // Keep the stored sub-tab in step with the live list, so its items get loaded.
  useEffect(() => { if (deskSub && deskSub !== marketsSub) setMarketsSub(deskSub) }, [deskSub, marketsSub])

  const mobileLive = useLiveMarkets(mobileMenuOpen && expandedSection === "Markets", mobileMktTab, null)
  // Mobile lists every sub-tab at once, so only tabs whose data comes in one call use live data.
  const mobileMenu = mobileMktTab === "Mutual Funds" || mobileMktTab === "ETF"
    ? menuFor(mobileMktTab, mobileLive)
    : menuFor(mobileMktTab, {})
  const mobileGroups: [string, MarketItem[] | null][] = mobileMenu.subs.map((s) => [s, mobileMenu.items(s)])

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

  useEffect(() => {
    if (activeDropdown !== "Markets") {
      setMarketsTab(DEFAULT_MARKETS_TAB)
      setMarketsSub("")
      setMarketsPinned(false)
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
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src={logoSrc}
                alt="Shree Varahi"
                width={40}
                height={40}
                className="rounded-[5px] object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight whitespace-nowrap">
                  Shree Varahi
                </span>
                <span className="text-[10px] text-gold-deep font-medium whitespace-nowrap">by Lakshmishree</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-0.5 min-w-0">

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

              {/* Markets — mega dropdown.
                  Hover opens it; leaving closes it after a short grace period, and the gap under the
                  button counts as part of the menu. Clicking a tab or sub-tab pins it open until a
                  click outside, Esc, or picking a link. */}
              <div className="relative" ref={marketsRef}
                onMouseEnter={openMarkets}
                onMouseLeave={scheduleCloseMarkets}
              >
                <button
                  onClick={() => (activeDropdown === "Markets" && marketsPinned ? closeMarkets() : (openMarkets(), setMarketsPinned(true)))}
                  aria-expanded={activeDropdown === "Markets"}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium hover:text-burgundy transition-colors whitespace-nowrap ${activeDropdown === "Markets" ? "text-burgundy" : "text-foreground"}`}
                >
                  Markets
                  <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${activeDropdown === "Markets" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "Markets" && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                    <motion.div key="markets-mega" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                      onMouseDown={() => setMarketsPinned(true)}
                      className="w-[780px] max-w-[calc(100vw-2rem)] rounded-[8px] bg-background border border-border shadow-2xl overflow-hidden"
                    >
                      {/* Tab bar */}
                      <div className="flex border-b border-border overflow-x-auto" style={{ scrollbarWidth: "none" }} role="tablist" aria-label="Markets">
                        {MARKETS_TABS.map((t) => (
                          <button key={t} role="tab" aria-selected={marketsTab === t}
                            onMouseEnter={() => switchMarketsTab(t)} onClick={() => switchMarketsTab(t)}
                            className={`px-4 py-2.5 text-[11px] font-bold whitespace-nowrap transition-all ${marketsTab === t ? "bg-burgundy text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}
                          >{t}</button>
                        ))}
                      </div>
                      {/* Body: sidebar (scrolls when a tab has many sub-tabs) + content */}
                      <div className="flex h-[340px]">
                        <div className="w-[190px] border-r border-border shrink-0 py-2 overflow-y-auto overscroll-contain" style={{ background: "var(--cream, #FAF8F5)", scrollbarWidth: "thin" }}>
                          {deskSubs.map((sub) => (
                            <button key={sub} onMouseEnter={() => setMarketsSub(sub)} onClick={() => setMarketsSub(sub)}
                              className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center justify-between gap-2 transition-all ${deskSub === sub ? "text-burgundy bg-white/60" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                            >
                              <span className="leading-snug">{sub}</span>
                              {deskSub === sub && <ChevronRight className="w-3 h-3 shrink-0 text-burgundy" />}
                            </button>
                          ))}
                          {desk.loading && <ListSkeleton rows={deskSubs.length ? 4 : 7} className="px-4 py-2" label="Loading categories" />}
                          {desk.unavailable && deskSubs.length > 0 && (
                            <p className="px-4 py-2 text-[11px] leading-snug text-muted-foreground">More {marketsTab.toLowerCase()} lists show here when live data is available.</p>
                          )}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: "thin" }}>
                          {!deskSub && desk.unavailable ? (
                            <MarketsUnavailable tab={marketsTab} onNavigate={closeMarkets} />
                          ) : deskItems === null ? (
                            <ListSkeleton rows={8} label="Loading" className="grid grid-cols-2 gap-x-3 gap-y-3 space-y-0" />
                          ) : deskItems.length === 0 ? (
                            <p className="text-[12px] text-muted-foreground px-2 py-1">Nothing to show here right now.</p>
                          ) : (
                            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                              {deskItems.map((mkt) => (
                                <Link key={mkt.href + mkt.name} href={mkt.href} onClick={closeMarkets} title={mkt.name}
                                  className="flex items-center gap-2 py-1.5 px-2 rounded-[4px] hover:bg-secondary/60 group transition-colors min-w-0">
                                  {mkt.exchange && <ExchangeBadge exchange={mkt.exchange} />}
                                  <span className="flex-1 text-[13px] font-medium text-foreground/80 group-hover:text-burgundy transition-colors truncate">{mkt.name}</span>
                                  {mkt.meta && <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">{mkt.meta}</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-border px-5 py-2.5 flex items-center justify-between bg-secondary/30">
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {deskLive ? "Live categories from NSE, BSE & fund data" : "Live market data powered by NSE & BSE feeds"}
                        </span>
                        <Link href={marketsTab === "Tools" ? CALCULATOR_LINKS.all : TAB_HOME[marketsTab] ?? "/stocks"} onClick={closeMarkets} className="text-[11px] font-bold text-burgundy hover:underline flex items-center gap-1">
                          View all {marketsTab === "Tools" ? "calculators" : marketsTab === "Indices" ? "markets" : marketsTab} <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                    </div>
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
            <div className="hidden xl:flex items-center gap-2 2xl:gap-3 shrink-0">
              <button 
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex items-center justify-center 2xl:justify-between w-10 2xl:w-[300px] h-10 px-0 2xl:px-4 rounded-[6px] bg-cream border border-border hover:border-gold/40 hover:bg-beige/35 hover:shadow-[0_2px_8px_rgba(217,178,124,0.06)] transition-all text-xs text-slate-500 font-medium"
              >
                {/* Icon only until there is room for the full search box */}
                <Search className="h-4 w-4 2xl:hidden" />
                <div className="hidden 2xl:flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap shrink-0">Search</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={searchIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {POPULAR_SEARCHES[searchIdx]}...
                    </motion.span>
                  </AnimatePresence>
                </div>
                {isMac !== null && (
                  <kbd className="hidden 2xl:inline px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[9px] font-sans font-normal shrink-0">
                    {isMac ? "⌘K" : "Ctrl K"}
                  </kbd>
                )}
              </button>
              <Button variant="ghost" className="text-foreground hover:text-burgundy rounded-[5px] whitespace-nowrap px-3" asChild>
                <Link href={loginUrl}>Login</Link>
              </Button>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px] whitespace-nowrap" asChild>
                <Link href={openAccountUrl}>Open Free Account</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
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
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60] xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-[400px] bg-background z-[70] xl:hidden flex flex-col shadow-2xl"
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Image
                    src={logoSrc}
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
                      // { label: "Commodity",    href: "/commodity",                 icon: <Box className="w-4 h-4" /> },
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
                          {mobileGroups.length === 0 && (mobileMenu.loading
                            ? <ListSkeleton rows={6} label="Loading" />
                            : <MarketsUnavailable tab={mobileMktTab} onNavigate={() => setMobileMenuOpen(false)} compact={mobileMktTab === "F&O"} />)}
                          {mobileGroups.map(([subName, items]) => (
                            <div key={subName}>
                              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 px-1 mb-1.5">{subName}</p>
                              {items === null && <ListSkeleton rows={4} label="Loading" />}
                              <div className="grid grid-cols-2 gap-1">
                                {(items ?? []).map((item) => (
                                  <Link key={item.href + item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
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
                    <Link href={loginUrl} onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 font-bold"
                    asChild
                  >
                    <Link href={openAccountUrl} onClick={() => setMobileMenuOpen(false)}>
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

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  PieChart, 
  TrendingUp, 
  Landmark, 
  RotateCcw, 
  Target, 
  Layers, 
  Box 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchPopup } from "./search-popup"
import Link from "next/link"
import Image from "next/image"

function GlobeMarketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.2" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="12" cy="8.2" rx="7.8" ry="2.2" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <ellipse cx="12" cy="15.8" rx="7.8" ry="2.2" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <ellipse cx="12" cy="12" rx="2.2" ry="9.5" stroke="currentColor" strokeWidth="0.9" />
      <ellipse cx="12" cy="12" rx="6" ry="9.5" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="currentColor" strokeWidth="0.9" opacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

type MenuItem = {
  title: string
  desc: string
  icon: React.ReactNode
  href: string
}

const tradeMenu: MenuItem[] = [
  { title: "Trading App", desc: "Mobile-first trading experience", icon: "📱", href: "#" },
  { title: "Web Terminal", desc: "Professional desktop platform", icon: "💻", href: "#" },
  { title: "Options Trader", desc: "Advanced F&O strategies", icon: <PieChart className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/futures-options" },
  { title: "Algo & API", desc: "Automate your trading", icon: "⚡", href: "#" },
  { title: "Global Investing", desc: "Trade US stocks directly", icon: <GlobeMarketIcon className="h-5 w-5 text-burgundy" />, href: "/#global-investing" },
  { title: "Stocks Intraday", desc: "Same-day trading", icon: <TrendingUp className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/stocks" },
  { title: "Futures", desc: "Derivatives trading", icon: <PieChart className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/futures-options" },
  { title: "MTF", desc: "4× buying power", icon: "💪", href: "#" },
  { title: "Commodities", desc: "MCX trading", icon: <Box className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "#" },
  { title: "Stock Screener", desc: "Find opportunities", icon: "🔍", href: "#" },
]

const investMenu: MenuItem[] = [
  { title: "Stocks Delivery", desc: "₹0 brokerage forever", icon: <TrendingUp className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/stocks" },
  { title: "Mutual Funds", desc: "Direct plans, zero commission", icon: <Landmark className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "IPO", desc: "Apply for free", icon: <Target className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "/ipo" },
  { title: "ETF", desc: "Exchange traded funds", icon: <Layers className="h-5 w-5 text-burgundy" strokeWidth={2.2} />, href: "#" },
  { title: "NFO", desc: "New fund offers", icon: "🆕", href: "#" },
  { title: "Digital Gold", desc: "24K gold from ₹1", icon: "✨", href: "#" },
  { title: "Global Investing", desc: "US stocks & ETFs", icon: <GlobeMarketIcon className="h-5 w-5 text-burgundy" />, href: "/#global-investing" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

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
            <div className="hidden lg:flex items-center gap-6">
              {["Trade", "Invest", "Markets", "Research", "Knowledge"].map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-foreground hover:text-burgundy transition-colors">
                    {item}
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item && (item === "Trade" || item === "Invest") && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[480px] rounded-[5px] bg-background border border-border p-4 shadow-xl"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {(item === "Trade" ? tradeMenu : investMenu).map((menuItem) => (
                            <Link
                              key={menuItem.title}
                              href={menuItem.href}
                              className="flex items-start gap-3 rounded-[5px] p-3 hover:bg-secondary transition-colors"
                            >
                              <span className="text-xl flex items-center justify-center h-6 w-6">{menuItem.icon}</span>
                              <div>
                                <div className="font-medium text-foreground text-sm">
                                  {menuItem.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {menuItem.desc}
                                </div>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-lg font-bold">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-[5px] hover:bg-secondary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {["Trade", "Invest", "Markets", "Research", "Knowledge"].map((item) => (
                    <div key={item} className="py-3 border-b border-border">
                      <button className="flex items-center justify-between w-full text-left font-medium">
                        {item}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border space-y-3">
                  <Button variant="outline" className="w-full border-border text-foreground rounded-[5px]" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]" asChild>
                    <Link href="/signup/register">Open Free Account</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

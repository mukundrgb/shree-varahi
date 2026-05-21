"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchPopup } from "./search-popup"
import Link from "next/link"

const tradeMenu = [
  { title: "Trading App", desc: "Mobile-first trading experience", icon: "📱" },
  { title: "Web Terminal", desc: "Professional desktop platform", icon: "💻" },
  { title: "Options Trader", desc: "Advanced F&O strategies", icon: "📊" },
  { title: "Algo & API", desc: "Automate your trading", icon: "⚡" },
  { title: "Global Investing", desc: "Trade US stocks directly", icon: "🌍" },
  { title: "Stocks Intraday", desc: "Same-day trading", icon: "📈" },
  { title: "Futures", desc: "Derivatives trading", icon: "📉" },
  { title: "MTF", desc: "4× buying power", icon: "💪" },
  { title: "Commodities", desc: "MCX trading", icon: "🥇" },
  { title: "Stock Screener", desc: "Find opportunities", icon: "🔍" },
]

const investMenu = [
  { title: "Stocks Delivery", desc: "₹0 brokerage forever", icon: "💎" },
  { title: "Mutual Funds", desc: "Direct plans, zero commission", icon: "📁" },
  { title: "SIP", desc: "Start from ₹100", icon: "🔄" },
  { title: "IPO", desc: "Apply for free", icon: "🎯" },
  { title: "ETF", desc: "Exchange traded funds", icon: "📊" },
  { title: "NFO", desc: "New fund offers", icon: "🆕" },
  { title: "Digital Gold", desc: "24K gold from ₹1", icon: "✨" },
  { title: "Global Investing", desc: "US stocks & ETFs", icon: "🌎" },
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-burgundy/10">
                <svg viewBox="0 0 40 40" className="h-6 w-6 text-burgundy">
                  <path
                    fill="currentColor"
                    d="M20 2C11.16 2 4 9.16 4 18c0 4.42 1.79 8.42 4.69 11.31L20 38l11.31-8.69C34.21 26.42 36 22.42 36 18c0-8.84-7.16-16-16-16zm0 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 24c-4.42 0-8-3.58-8-8 0-2.65 2.15-4.8 4.8-4.8h6.4c2.65 0 4.8 2.15 4.8 4.8 0 4.42-3.58 8-8 8z"
                  />
                </svg>
              </div>
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
                              href="#"
                              className="flex items-start gap-3 rounded-[5px] p-3 hover:bg-secondary transition-colors"
                            >
                              <span className="text-xl">{menuItem.icon}</span>
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-[5px] bg-secondary hover:bg-beige transition-colors text-sm text-muted-foreground"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
                <kbd className="ml-2 px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[10px]">⌘K</kbd>
              </button>
              <Button variant="ghost" className="text-foreground hover:text-burgundy rounded-[5px]">
                Login
              </Button>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
                Open Free Account
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
                  <Button variant="outline" className="w-full border-border text-foreground rounded-[5px]">
                    Login
                  </Button>
                  <Button className="w-full bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
                    Open Free Account
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

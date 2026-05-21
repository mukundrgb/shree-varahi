"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react"

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

const popularSearches = [
  { term: "Open Demat Account", type: "action" },
  { term: "MTF Stocks List", type: "product" },
  { term: "Brokerage Calculator", type: "tool" },
  { term: "IPO Apply", type: "action" },
  { term: "US Stocks", type: "product" },
  { term: "Options Trading", type: "product" },
]

const recentSearches = [
  "Intraday trading charges",
  "Mutual fund SIP",
  "Account opening documents",
]

const quickLinks = [
  { title: "Trading App", desc: "Download our mobile app", href: "#" },
  { title: "Research Reports", desc: "Expert market analysis", href: "#" },
  { title: "Customer Support", desc: "Get help 24/7", href: "#" },
  { title: "Branch Locator", desc: "Find nearest branch", href: "#" },
]

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
          >
            <div className="bg-background rounded-[5px] shadow-2xl overflow-hidden border border-border">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, tools, or help..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-[5px] hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Search Content */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {query.length === 0 ? (
                  <div className="space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          Recent Searches
                        </h3>
                        <div className="space-y-1">
                          {recentSearches.map((search, i) => (
                            <button
                              key={i}
                              className="w-full text-left px-3 py-2 rounded-[5px] hover:bg-secondary transition-colors text-sm text-foreground flex items-center gap-3"
                            >
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" />
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((item, i) => (
                          <button
                            key={i}
                            className="px-3 py-1.5 rounded-[5px] bg-secondary hover:bg-beige transition-colors text-sm text-foreground flex items-center gap-2"
                          >
                            {item.term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Quick Links
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {quickLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.href}
                            className="p-3 rounded-[5px] border border-border hover:border-gold hover:bg-cream transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm text-foreground">{link.title}</p>
                                <p className="text-xs text-muted-foreground">{link.desc}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-burgundy transition-colors" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Search Results */}
                    <p className="text-sm text-muted-foreground">
                      Searching for &quot;{query}&quot;...
                    </p>
                    <div className="space-y-2">
                      {popularSearches
                        .filter((item) =>
                          item.term.toLowerCase().includes(query.toLowerCase())
                        )
                        .map((item, i) => (
                          <button
                            key={i}
                            className="w-full text-left px-3 py-3 rounded-[5px] hover:bg-secondary transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <Search className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{item.term}</span>
                            </div>
                            <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-secondary/50 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[10px]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[10px]">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[10px]">↵</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[10px]">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

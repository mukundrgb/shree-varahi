"use client"

// Global search (navbar). Searches, as you type:
//   Pages   — the site's own pages (lib/site-search.ts)
//   Stocks  — backend /stocks/search
//   Funds   — backend /mutual-funds/funds?q=
//   Learn   — Knowledge Center topics & articles
// ↑ / ↓ move through every result, Enter opens it. Opened results are kept as "Recent searches" in this browser.

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp, Clock, ArrowRight, FileText, PieChart, LayoutGrid, BookOpen } from "lucide-react"
import { StockAvatar } from "@/components/stock-avatar"
import { useStockSearch } from "@/hooks/stocks/use-stock-search"
import { useApiResource } from "@/hooks/use-api-resource"
import { mutualFundsApi, fundHref } from "@/lib/mutual-funds/api-client"
import { searchSite } from "@/lib/site-search"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

/** Clicking one fills the search box. */
const POPULAR = ["Reliance", "HDFC Bank", "Open Demat Account", "IPO", "MTF", "Top Gainers", "Nifty 50", "Mutual Funds"]

const QUICK_LINKS = [
  { title: "Open Free Account", desc: "Start investing in minutes", href: OPEN_ACCOUNT_URL },
  { title: "IPO",               desc: "Apply for upcoming IPOs",    href: "/ipo" },
  { title: "Mutual Funds",      desc: "Invest by SIP or lumpsum",   href: "/mutual-funds" },
  { title: "Knowledge Center",  desc: "Guides & articles",          href: "/knowledge-center" },
]

const RECENT_KEY = "sv-recent-searches"
const RECENT_MAX = 5

interface Recent { title: string; href: string }

function readRecent(): Recent[] {
  try {
    const value = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")
    return Array.isArray(value) ? value.filter((r) => r && typeof r.title === "string" && typeof r.href === "string").slice(0, RECENT_MAX) : []
  } catch {
    return []
  }
}

function saveRecent(item: Recent) {
  try {
    const next = [item, ...readRecent().filter((r) => r.href !== item.href)].slice(0, RECENT_MAX)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    // Storage blocked (private mode etc.): recents just aren't remembered.
  }
}

type Group = "Pages" | "Stocks" | "Mutual Funds" | "Learn"
interface Result { key: string; group: Group; title: string; desc: string; href: string; avatar?: { symbol: string; name: string } }

const GROUP_ORDER: Group[] = ["Pages", "Stocks", "Mutual Funds", "Learn"]
const GROUP_ICON = { Pages: LayoutGrid, "Mutual Funds": PieChart, Learn: BookOpen } as const

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [recent, setRecent] = useState<Recent[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Wait for a pause in typing so each keystroke doesn't call the APIs.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 250)
    return () => clearTimeout(timer)
  }, [query])

  const stockSearch = useStockSearch(debouncedQuery)
  const fundSearch = useApiResource(
    debouncedQuery.length >= 2 ? `global-fund-search:${debouncedQuery}` : null,
    (signal) => mutualFundsApi.funds({ q: debouncedQuery, limit: 5 }, signal),
  )

  const hasQuery = query.trim().length > 0
  const typing = debouncedQuery !== query.trim()
  const loading = typing || stockSearch.loading || fundSearch.loading

  const results = useMemo<Result[]>(() => {
    if (!hasQuery) return []
    const site = searchSite(query)
    const stocks: Result[] = debouncedQuery && stockSearch.data
      ? stockSearch.data.slice(0, 6).map((s) => ({
          key: `s:${s.slug}`, group: "Stocks", title: s.name, desc: `${s.symbol}${s.sector ? ` · ${s.sector}` : ""}`,
          href: `/stocks/${s.slug}`, avatar: { symbol: s.symbol, name: s.name },
        }))
      : []
    const funds: Result[] = debouncedQuery.length >= 2 && fundSearch.data
      ? fundSearch.data.items.slice(0, 5).map((f) => ({
          key: `f:${f.slug}`, group: "Mutual Funds", title: f.name,
          desc: [f.amcName, f.category].filter(Boolean).join(" · "), href: fundHref(f),
        }))
      : []
    const all: Result[] = [
      ...site.map((h) => ({ key: `p:${h.href}`, group: h.group, title: h.title, desc: h.desc, href: h.href })),
      ...stocks,
      ...funds,
    ]
    return GROUP_ORDER.flatMap((g) => all.filter((r) => r.group === g))
  }, [hasQuery, query, debouncedQuery, stockSearch.data, fundSearch.data])

  useEffect(() => setActiveIndex(0), [results.length, query])

  // Keep the highlighted result in view while using the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const close = () => { setQuery(""); onClose() }

  const go = (title: string, href: string) => {
    saveRecent({ title, href })
    close()
    router.push(href)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const r = results[activeIndex] ?? results[0]
      go(r.title, r.href)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    setRecent(readRecent())
    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[100]"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            role="dialog"
            aria-label="Search"
          >
            <div className="bg-background rounded-[5px] shadow-2xl overflow-hidden border border-border">
              {/* Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search stocks, mutual funds, pages or articles…"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none"
                  aria-label="Search"
                />
                {hasQuery && (
                  <button onClick={() => { setQuery(""); inputRef.current?.focus() }} className="text-xs font-bold text-muted-foreground hover:text-foreground px-1">
                    Clear
                  </button>
                )}
                <button onClick={close} aria-label="Close search" className="p-1.5 rounded-[5px] hover:bg-secondary transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div ref={listRef} className="p-4 max-h-[60vh] overflow-y-auto">
                {!hasQuery ? (
                  <div className="space-y-6">
                    {recent.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Clock className="h-3 w-3" /> Recent Searches
                        </h3>
                        <div className="space-y-1">
                          {recent.map((r) => (
                            <button
                              key={r.href}
                              onClick={() => go(r.title, r.href)}
                              className="w-full text-left px-3 py-2 rounded-[5px] hover:bg-secondary transition-colors text-sm text-foreground flex items-center gap-3"
                            >
                              <Clock className="h-4 w-4 text-muted-foreground" /> {r.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" /> Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR.map((term) => (
                          <button
                            key={term}
                            onClick={() => { setQuery(term); inputRef.current?.focus() }}
                            className="px-3 py-1.5 rounded-[5px] bg-secondary hover:bg-beige transition-colors text-sm text-foreground"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Links</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {QUICK_LINKS.map((link) => (
                          <button
                            key={link.href}
                            onClick={() => go(link.title, link.href)}
                            className="text-left p-3 rounded-[5px] border border-border hover:border-gold hover:bg-cream transition-all group"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-medium text-sm text-foreground">{link.title}</p>
                                <p className="text-xs text-muted-foreground">{link.desc}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-burgundy transition-colors shrink-0" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {GROUP_ORDER.map((group) => {
                      const items = results.map((r, i) => ({ r, i })).filter(({ r }) => r.group === group)
                      if (items.length === 0) return null
                      return (
                        <div key={group}>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group}</h3>
                          <div className="space-y-1">
                            {items.map(({ r, i }) => {
                              const Icon = r.group === "Stocks" ? null : r.group === "Learn" ? FileText : GROUP_ICON[r.group]
                              return (
                                <button
                                  key={r.key}
                                  data-index={i}
                                  onClick={() => go(r.title, r.href)}
                                  onMouseEnter={() => setActiveIndex(i)}
                                  className={`w-full text-left px-3 py-2.5 rounded-[5px] transition-colors flex items-center gap-3 ${i === activeIndex ? "bg-secondary" : ""}`}
                                >
                                  {r.avatar
                                    ? <StockAvatar symbol={r.avatar.symbol} name={r.avatar.name} logoUrl={null} className="w-8 h-8 text-[10px]" />
                                    : Icon && (
                                      <span className="w-8 h-8 rounded-[6px] bg-burgundy/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-burgundy" />
                                      </span>
                                    )}
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-semibold text-foreground truncate">{r.title}</span>
                                    {r.desc && <span className="block text-xs text-muted-foreground truncate">{r.desc}</span>}
                                  </span>
                                  <ArrowRight className={`h-4 w-4 shrink-0 ${i === activeIndex ? "text-burgundy" : "text-transparent"}`} />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}

                    {loading && <p className="text-sm text-muted-foreground">Searching for &quot;{query.trim()}&quot;…</p>}
                    {!loading && results.length === 0 && (
                      <p className="text-sm text-muted-foreground py-4 text-center">No results for &quot;{query.trim()}&quot;.</p>
                    )}
                    {!loading && stockSearch.error && fundSearch.error && (
                      <p className="text-xs text-muted-foreground">Stock and fund search are unavailable right now.</p>
                    )}
                  </div>
                )}
              </div>

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

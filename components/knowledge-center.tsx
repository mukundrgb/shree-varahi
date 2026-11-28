"use client"

// Shared UI for the Knowledge Center pages: topic icon, page header with breadcrumb, pagination, CTA, category tags.
// Same theme as the rest of the site (cream / burgundy / gold, existing button styles).

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight, Bitcoin, BookOpen, Briefcase, Calculator, ChevronLeft, ChevronRight, Code2, FileSearch, FileText, Fingerprint,
  Gem, GitBranch, Handshake, IdCard, Landmark, Layers, MonitorSmartphone, Percent, PieChart, PiggyBank, Receipt, Rocket,
  Search, Timer, TrendingUp, UserCog, Wallet, X, type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiGet } from "@/lib/api/client"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

/** A Knowledge Center topic as the pages pass it in (from the backend's published topics). */
export type KcTopicLink = { slug: string; title: string; icon: string; desc?: string }

const ICONS: Record<string, LucideIcon> = {
  Briefcase, PieChart, BookOpen, Wallet, MonitorSmartphone, Timer, TrendingUp, Rocket, GitBranch, Layers, Gem, Handshake,
  Receipt, PiggyBank, IdCard, Fingerprint, FileSearch, Bitcoin, Calculator, UserCog, Landmark, Code2, Percent,
}

export function TopicIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? BookOpen
  return <Icon className={`${className} text-burgundy`} />
}

/** Cream header band with breadcrumb, used on all three levels. */
export function KcHeader({ crumbs, children }: { crumbs: { label: string; href?: string }[]; children: React.ReactNode }) {
  return (
    <section className="relative bg-cream border-b border-border/40 pt-24 pb-8 lg:pb-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4 flex-wrap">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
              {c.href
                ? <Link href={c.href} className="hover:text-foreground transition-colors">{c.label}</Link>
                : <span className="text-foreground font-semibold truncate">{c.label}</span>}
            </span>
          ))}
        </nav>
        {children}
      </div>
    </section>
  )
}

/** Numbered pagination (shows up to 5 page numbers around the current page). */
export function KcPagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null
  const first = Math.max(1, Math.min(totalPages - 4, page - 2))
  const arrow = "w-9 h-9 rounded-[5px] border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-burgundy/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-10">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page" className={arrow}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => first + i).map((pg) => (
        <button
          key={pg}
          onClick={() => onChange(pg)}
          aria-current={pg === page ? "page" : undefined}
          className={`min-w-9 h-9 px-2 rounded-[5px] border text-sm font-bold transition-all ${
            pg === page ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-burgundy/40"
          }`}
        >
          {pg}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page" className={arrow}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}

/** Our open-account call to action. */
export function KcCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
      <div className="rounded-[14px] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Put Your Knowledge to Work</h2>
          <p className="text-sm text-white/85 max-w-lg">Open your free Shree Varahi account in minutes, zero account opening charges and zero AMC.</p>
        </div>
        <Link href={OPEN_ACCOUNT_URL} className="relative z-10 shrink-0">
          <Button className="bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-12 px-8 text-sm font-black">
            Open Free Account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

// ── Search (all topics + articles) ──────────────────────────────────────────

type Hit = { kind: "topic" | "article"; title: string; subtitle: string; href: string }
type ArticleHit = { slug: string; title: string; category: { name: string; slug: string } | null }

/** Search box with a results dropdown; ↑ / ↓ / Enter work, Esc closes. Topics match here; articles come from the backend. */
export function KcSearch({ className = "", topics }: { className?: string; topics: KcTopicLink[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [articles, setArticles] = useState<Hit[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const topicHits = useMemo<Hit[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return topics.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 3).map((t) => ({ kind: "topic", title: t.title, subtitle: "Topic", href: `/knowledge-center/${t.slug}` }))
  }, [query, topics])
  const hits = [...topicHits, ...articles].slice(0, 8)

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) { setArticles([]); return }
    const ctrl = new AbortController()
    const t = setTimeout(() => {
      apiGet<{ items: ArticleHit[] }>("/content/knowledge-center/articles", { query: { q, limit: 6 }, signal: ctrl.signal })
        .then((r) => setArticles(r.items.filter((a) => a.category).map((a) => ({ kind: "article", title: a.title, subtitle: a.category!.name, href: `/knowledge-center/${a.category!.slug}/${a.slug}` }))))
        .catch(() => {})
    }, 250)
    return () => { clearTimeout(t); ctrl.abort() }
  }, [query])

  useEffect(() => setActive(0), [query])
  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const go = (href: string) => { setOpen(false); setQuery(""); router.push(href) }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setOpen(false); return }
    if (hits.length === 0) return
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => (i + 1) % hits.length) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + hits.length) % hits.length) }
    else if (e.key === "Enter") { e.preventDefault(); go((hits[active] ?? hits[0]).href) }
  }

  const showList = open && query.trim().length > 0

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search articles & topics…"
        aria-label="Search the Knowledge Center"
        className="w-full h-11 pl-10 pr-9 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
      />
      {query && (
        <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {showList && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-border rounded-[8px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden">
          {hits.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted-foreground text-center">No articles match “{query.trim()}”.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {hits.map((h, i) => (
                <li key={h.href}>
                  <button
                    onClick={() => go(h.href)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${i === active ? "bg-cream" : ""}`}
                  >
                    {h.kind === "topic"
                      ? <BookOpen className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                      : <FileText className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />}
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-foreground leading-snug">{h.title}</span>
                      <span className="block text-[11px] text-muted-foreground">{h.subtitle}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

// ── Categories: sidebar list (desktop) and auto-scrolling strip (mobile) ────

/** Vertical list of every topic, current one highlighted. */
export function KcCategoryList({ current, topics }: { current?: string; topics: KcTopicLink[] }) {
  return (
    <div className="bg-white border border-border rounded-[12px] overflow-hidden">
      <p className="px-4 py-3 border-b border-border/60 text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">All Categories</p>
      <ul className="py-1">
        {topics.map((t) => {
          const isCurrent = t.slug === current
          return (
            <li key={t.slug}>
              <Link
                href={`/knowledge-center/${t.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold transition-colors border-l-2 ${
                  isCurrent ? "border-burgundy bg-burgundy/[0.06] text-burgundy" : "border-transparent text-foreground hover:bg-cream/60 hover:text-burgundy"
                }`}
              >
                <TopicIcon name={t.icon} className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const STRIP_SPEED_PX = 0.5
const STRIP_RESUME_MS = 3000

/** Horizontal strip of topics that scrolls by itself; pauses while touched or scrolled by hand. Mobile / tablet only. */
export function KcCategoryStrip({ current, topics }: { current?: string; topics: KcTopicLink[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const pausedUntil = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Respect reduced-motion: no auto-scroll, just bring the current topic into view.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" })
    if (reduce) return

    let frame = 0
    let pos = el.scrollLeft
    const tick = () => {
      if (Date.now() >= pausedUntil.current && el.scrollWidth > el.clientWidth) {
        pos += STRIP_SPEED_PX
        // Content is rendered twice; jump back by one copy's width for a seamless loop.
        const half = el.scrollWidth / 2
        if (pos >= half) pos -= half
        el.scrollLeft = pos
      } else {
        pos = el.scrollLeft
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const pause = () => { pausedUntil.current = Date.now() + STRIP_RESUME_MS }

  const chip = (t: KcTopicLink, copy: number) => {
    const isCurrent = t.slug === current
    return (
      <Link
        key={`${copy}-${t.slug}`}
        href={`/knowledge-center/${t.slug}`}
        aria-current={isCurrent && copy === 0 ? "page" : undefined}
        tabIndex={copy === 0 ? undefined : -1}
        aria-hidden={copy === 1 ? true : undefined}
        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
          isCurrent ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground"
        }`}
      >
        {t.title}
      </Link>
    )
  }

  return (
    <div
      ref={ref}
      onPointerDown={pause}
      onTouchStart={pause}
      onWheel={pause}
      onFocus={pause}
      className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1"
      style={{ scrollbarWidth: "none" }}
      aria-label="Knowledge Center categories"
    >
      {topics.map((t) => chip(t, 0))}
      {topics.map((t) => chip(t, 1))}
    </div>
  )
}

/** All topics as tags (shown at the bottom of topic and article pages). */
export function KcAllCategories({ current, topics }: { current?: string; topics: KcTopicLink[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-3">All Categories</p>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/knowledge-center/${t.slug}`}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              t.slug === current ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground hover:border-burgundy/40 hover:text-burgundy"
            }`}
          >
            {t.title}
          </Link>
        ))}
      </div>
    </section>
  )
}

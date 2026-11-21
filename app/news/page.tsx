"use client"

// News: live CMOTS Market Beat stories (/api/v1/news/market-beat).
// Layout follows angelone.in/news: Top News, then all news filtered by category, then a Learn block.
// ?category=<name> preselects a category (used by the story page's category links).

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, BookOpen, Clock, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcCta, KcHeader, KcPagination } from "@/components/knowledge-center"
import { CategoryChips, PostCover } from "@/components/content-ui"
import { useMarketBeat } from "@/hooks/use-market-news"
import { ALL_NEWS_CATEGORIES, newsCategory, newsDateTime, newsSummary } from "@/lib/news/categorize"
import type { StockNewsItem } from "@/lib/stocks/types"

const PAGE_SIZE = 12
const TOP_COUNT = 5

type Story = StockNewsItem & { category: string }

const coverCategory = (c: string) => (c === "IPO" ? "IPO" : c === "Economy" ? "Economy" : c === "Results" ? "Stocks" : "News")

function StoryMeta({ s }: { s: Story }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
      <span className="text-gold-deep font-extrabold uppercase tracking-wider text-[10px]">{s.category}</span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {newsDateTime(s.publishedAt)}</span>
    </span>
  )
}

function NewsContent() {
  const params = useSearchParams()
  const news = useMarketBeat(50)
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const c = params.get("category")
    if (c && ALL_NEWS_CATEGORIES.includes(c)) setCategory(c)
  }, [params])

  const stories = useMemo<Story[]>(() => (news.data?.items ?? []).map((n) => ({ ...n, category: newsCategory(n) })), [news.data])
  // Only categories that have stories right now.
  const categories = useMemo(() => ALL_NEWS_CATEGORIES.filter((c) => stories.some((s) => s.category === c)), [stories])

  const top = stories.slice(0, TOP_COUNT)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return stories.filter((s) => (category === "All" || s.category === category) && (!q || s.headline.toLowerCase().includes(q)))
  }, [stories, category, query])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  const pick = (c: string) => { setCategory(c); setPage(1) }
  const goTo = (p: number) => { setPage(p); document.getElementById("all-news")?.scrollIntoView({ behavior: "smooth", block: "start" }) }

  const status = news.error && !news.data
    ? <>Unable to load news. <button onClick={news.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
    : !news.data ? "Loading news…" : null

  return (
    <>
      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}>
        <div className="space-y-3 max-w-2xl">
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-profit animate-pulse" /> Live Market News
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
            Share Market <span className="text-burgundy">News &amp; Updates</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The latest company announcements, results, IPOs, orders and corporate actions — updated through the trading day.
          </p>
        </div>
      </KcHeader>

      {/* ── TOP NEWS ── */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-6">Top <span className="text-burgundy">News</span></h2>
          {status ? (
            <p className="py-16 text-center text-sm text-muted-foreground">{status}</p>
          ) : top.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No news right now.</p>
          ) : (
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5">
              <Link
                href={`/news/${top[0].id}`}
                className="group bg-white border border-border/70 rounded-[14px] overflow-hidden hover:border-burgundy/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all flex flex-col"
              >
                <PostCover category={coverCategory(top[0].category)} large className="h-48 sm:h-60" />
                <div className="p-6 flex flex-col flex-1">
                  <StoryMeta s={top[0]} />
                  <h3 className="text-xl lg:text-2xl font-black text-foreground leading-snug mt-3 mb-3 group-hover:text-burgundy transition-colors">{top[0].headline}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{newsSummary(top[0], 220)}</p>
                </div>
              </Link>
              <div className="bg-white border border-border/70 rounded-[14px] divide-y divide-border/50">
                {top.slice(1).map((s) => (
                  <Link key={s.id} href={`/news/${s.id}`} className="group flex gap-4 p-4 hover:bg-cream/40 transition-colors">
                    <PostCover category={coverCategory(s.category)} className="w-20 h-20 rounded-[10px] shrink-0" />
                    <span className="min-w-0">
                      <StoryMeta s={s} />
                      <span className="block text-sm font-black text-foreground leading-snug mt-1.5 line-clamp-3 group-hover:text-burgundy transition-colors">{s.headline}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── ALL NEWS ── */}
      {!status && stories.length > 0 && (
        <section id="all-news" className="bg-cream border-y border-border/40 py-10 lg:py-14 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">All <span className="text-burgundy">News</span></h2>
              <label className="relative block md:w-80">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                  placeholder="Search news…"
                  aria-label="Search news"
                  className="w-full h-11 pl-10 pr-9 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </label>
            </div>
            <div className="mb-6"><CategoryChips categories={categories} value={category} onChange={pick} /></div>

            {visible.length === 0 ? (
              <p className="py-14 text-center text-sm text-muted-foreground">No posts found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((s) => (
                  <Link key={s.id} href={`/news/${s.id}`} className="group bg-white border border-border/70 rounded-[12px] p-5 flex flex-col hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all">
                    <StoryMeta s={s} />
                    <h3 className="text-[15px] font-black text-foreground leading-snug mt-2.5 mb-2 line-clamp-3 group-hover:text-burgundy transition-colors">{s.headline}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">{newsSummary(s, 130)}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-burgundy mt-3">Read more <ArrowRight className="w-3.5 h-3.5" /></span>
                  </Link>
                ))}
              </div>
            )}
            <KcPagination page={current} totalPages={totalPages} onChange={goTo} />
          </div>
        </section>
      )}

      {/* ── LEARN TO EARN ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border/70 rounded-[14px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="w-12 h-12 rounded-[10px] bg-burgundy/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-burgundy" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground mb-1">Learn to Earn</h2>
                <p className="text-sm text-muted-foreground">Guides on stocks, IPOs, F&amp;O and mutual funds from our Knowledge Center and Blog.</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 shrink-0">
              <Link href="/knowledge-center"><Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-11 px-6 text-sm font-bold">Knowledge Center</Button></Link>
              <Link href="/blog"><Button variant="outline" className="border-border bg-white rounded-[5px] h-11 px-6 text-sm font-bold hover:bg-secondary">Read the Blog</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <KcCta />
    </>
  )
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      {/* useSearchParams needs a Suspense boundary in the App Router */}
      <Suspense fallback={<div className="pt-36 pb-24 text-center text-sm text-muted-foreground">Loading…</div>}>
        <NewsContent />
      </Suspense>
      <Footer />
    </main>
  )
}

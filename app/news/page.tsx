// News: Top News, all news filtered by category with search and pages, then a Learn block.
// Server-rendered from stored CMOTS stories plus the team's published stories (PRD §13).
// Filters are in the address: /news?category=<name>&q=<text>&page=<n>.

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcHeader } from "@/components/knowledge-center"
import { PostCover } from "@/components/content-ui"
import { ChipsNav, PagerNav, SearchBox } from "@/components/content-controls"
import { cmsGetOr } from "@/lib/server/cms"

export const metadata: Metadata = {
  title: "Share Market News & Updates | Shree Varahi",
  description: "The latest company announcements, results, IPOs, orders and corporate actions, updated through the trading day.",
  alternates: { canonical: "/news" },
}

const PAGE_SIZE = 12
const TOP_COUNT = 5

type Story = { id: string; tag: string; headline: string; caption: string | null; text: string | null; publishedAt: string | null; pinned: boolean; category: string | null; editorial: boolean; label?: string }
type NewsList = { items: Story[]; pagination: { page: number; limit: number; total: number; totalPages: number }; meta: { asOf: string | null; stale: boolean } | null }
type SP = Promise<Record<string, string | string[] | undefined>>
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ""
const EMPTY: NewsList = { items: [], pagination: { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 }, meta: null }

const storyHref = (s: Story) => (s.editorial ? `/news/${s.id}` : `/news/cmots-${s.id}`)
const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) : "")
const summary = (s: Story, n: number) => {
  const t = (s.caption || s.text || "").replace(/\s+/g, " ").trim()
  return t.length > n ? `${t.slice(0, n).replace(/\s+\S*$/, "")}…` : t
}

function StoryMeta({ s }: { s: Story }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
      <span className="text-gold-deep font-extrabold uppercase tracking-wider text-[10px]">{s.editorial ? s.label || "Shree Varahi Desk" : s.tag}</span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {when(s.publishedAt)}</span>
    </span>
  )
}

export default async function NewsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  // News changes through the day: at most a minute old even when the backend can't ask for a refresh.
  const tags = { tags: ["news:list"], revalidate: 60 }
  const cats = await cmsGetOr<{ key: string; name: string; count: number }[]>("/news/categories", [], tags)
  const category = cats.find((c) => c.key === one(sp.category) || c.name === one(sp.category))?.key ?? ""
  const q = one(sp.q).trim()
  const page = Math.max(1, Number(one(sp.page)) || 1)
  const [top, list] = await Promise.all([
    cmsGetOr<NewsList>("/news", EMPTY, { ...tags, query: { limit: TOP_COUNT } }),
    cmsGetOr<NewsList>("/news", EMPTY, { ...tags, query: { category: category || undefined, q: q || undefined, page, limit: PAGE_SIZE } }),
  ])
  const topItems = top.items
  const chips = cats.filter((c) => c.count > 0).map((c) => ({ name: c.name, slug: c.key, count: c.count }))
  const asOf = top.meta?.asOf ? when(top.meta.asOf) : ""

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}>
        <div className="space-y-3 max-w-2xl">
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${top.meta?.stale ? "bg-amber-500" : "bg-profit animate-pulse"}`} /> Market News{asOf ? ` · Updated ${asOf}` : ""}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
            Share Market <span className="text-burgundy">News &amp; Updates</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The latest company announcements, results, IPOs, orders and corporate actions, updated through the trading day.
          </p>
        </div>
      </KcHeader>

      {/* ── TOP NEWS ── */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-6">Top <span className="text-burgundy">News</span></h2>
          {topItems.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">Market news will appear here soon.</p>
          ) : (
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5">
              <Link href={storyHref(topItems[0])} className="group bg-white border border-border/70 rounded-[14px] overflow-hidden hover:border-burgundy/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all flex flex-col">
                <PostCover category={topItems[0].tag} large className="h-48 sm:h-60" />
                <div className="p-6 flex flex-col flex-1">
                  <StoryMeta s={topItems[0]} />
                  <h3 className="text-xl lg:text-2xl font-black text-foreground leading-snug mt-3 mb-3 group-hover:text-burgundy transition-colors">{topItems[0].headline}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{summary(topItems[0], 220)}</p>
                </div>
              </Link>
              <div className="bg-white border border-border/70 rounded-[14px] divide-y divide-border/50">
                {topItems.slice(1).map((s) => (
                  <Link key={`${s.editorial}-${s.id}`} href={storyHref(s)} className="group flex gap-4 p-4 hover:bg-cream/40 transition-colors">
                    <PostCover category={s.tag} className="w-20 h-20 rounded-[10px] shrink-0" />
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
      {(topItems.length > 0 || q || category) && (
        <section id="all-news" className="bg-cream border-y border-border/40 py-10 lg:py-14 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">All <span className="text-burgundy">News</span></h2>
              <div className="md:w-80"><SearchBox placeholder="Search news…" label="Search news" /></div>
            </div>
            {chips.length > 0 && <div className="mb-6"><ChipsNav cats={chips} current={category} /></div>}

            {list.items.length === 0 ? (
              <p className="py-14 text-center text-sm text-muted-foreground">No stories found{q ? ` for “${q}”` : ""}.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.items.map((s) => (
                  <Link key={`${s.editorial}-${s.id}`} href={storyHref(s)} className="group bg-white border border-border/70 rounded-[12px] p-5 flex flex-col hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all">
                    <StoryMeta s={s} />
                    <h3 className="text-[15px] font-black text-foreground leading-snug mt-2.5 mb-2 line-clamp-3 group-hover:text-burgundy transition-colors">{s.headline}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">{summary(s, 130)}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-burgundy mt-3">Read more <ArrowRight className="w-3.5 h-3.5" /></span>
                  </Link>
                ))}
              </div>
            )}
            <PagerNav page={Math.min(page, list.pagination.totalPages)} totalPages={list.pagination.totalPages} />
            <p className="text-[11px] text-muted-foreground mt-6">News: CMOTS (Capital Market) and Shree Varahi Desk.</p>
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
      <Footer />
    </main>
  )
}

"use client"

// News story: headline, category, date/time, source, share row, full story text, related news and categories.
// UI preview: the story is looked up in the sample stories (lib/news/sample.ts); no API is called yet.

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcHeader } from "@/components/knowledge-center"

import { ALL_NEWS_CATEGORIES, newsCategory, newsDateTime, newsParagraphs } from "@/lib/news/categorize"
import { SAMPLE_NEWS } from "@/lib/news/sample"

export default function NewsStoryPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const items = SAMPLE_NEWS
  const story = items.find((n) => n.id === id)

  if (!story) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-36 pb-24 text-center">
          <p className="text-lg font-black text-foreground mb-2">Story not available</p>
          <p className="text-sm text-muted-foreground mb-3">It may be older than the latest news we show.</p>
          <Link href="/news" className="text-sm font-bold text-burgundy hover:underline">Back to News</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const category = newsCategory(story)
  const paragraphs = newsParagraphs(story)
  const others = items.filter((n) => n.id !== story.id)
  const related = [...others.filter((n) => newsCategory(n) === category), ...others.filter((n) => newsCategory(n) !== category)].slice(0, 5)

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: story.headline }]}>
        <div className="max-w-3xl space-y-3">
          <Link href={`/news?category=${encodeURIComponent(category)}`} className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">
            {category}
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-foreground tracking-tight leading-[1.15]">{story.headline}</h1>
          {story.caption && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{story.caption}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {newsDateTime(story.publishedAt)} IST</span>
            <span>Source: Capital Market Live News</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[220px_minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
          {/* Left: categories (desktop), sticky under the navbar */}
          <aside className="hidden lg:block lg:sticky lg:top-[76px]">
            {/* Categories */}
            <div className="bg-white border border-border rounded-[12px] overflow-hidden">
              <p className="px-4 py-3 border-b border-border/60 text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Categories</p>
              <ul className="py-1">
                {ALL_NEWS_CATEGORIES.map((c) => {
                  const isCurrent = c === category
                  return (
                    <li key={c}>
                      <Link
                        href={`/news?category=${encodeURIComponent(c)}`}
                        aria-current={isCurrent ? "true" : undefined}
                        className={`flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-semibold border-l-2 transition-colors ${
                          isCurrent ? "border-burgundy bg-burgundy/[0.06] text-burgundy" : "border-transparent text-foreground hover:bg-cream/60 hover:text-burgundy"
                        }`}
                      >
                        {c}
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <article className="min-w-0">
            {/* Phones / tablets: categories as a swipeable row */}
            <div className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1 mb-6" style={{ scrollbarWidth: "none" }} aria-label="News categories">
              {ALL_NEWS_CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={`/news?category=${encodeURIComponent(c)}`}
                  className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${
                    c === category ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              {paragraphs.length
                ? paragraphs.map((p, i) => <p key={i} className="text-[15px] text-foreground/85 leading-relaxed">{p}</p>)
                : <p className="text-sm text-muted-foreground">The full text of this story is not available.</p>}
            </div>

            <p className="mt-10 text-[11px] text-muted-foreground leading-relaxed bg-cream border border-border/60 rounded-[8px] p-4">
              <strong className="text-foreground/80">Disclaimer:</strong> This news is for information only and is not investment advice.
              Investments in securities markets are subject to market risks; read all related documents carefully before investing.
            </p>

            <Link href="/news" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </article>

          {/* Sticks under the navbar; scrolls on its own if taller than the screen */}
          <aside className="space-y-4 lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <div className="rounded-[12px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <p className="text-lg font-black mb-1 relative z-10">Open Free Demat Account</p>
              <p className="text-xs text-white/85 mb-4 relative z-10">Zero account opening charges · Zero AMC</p>
              <Link href="/signup/register" className="relative z-10 block">
                <Button className="w-full bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 text-sm font-black">Open Free Account</Button>
              </Link>
            </div>

            {related.length > 0 && (
              <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">Related News</p>
                <ul className="divide-y divide-border/40">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/news/${r.id}`} className="block px-5 py-3 hover:bg-cream/40 transition-colors group">
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-0.5">{newsCategory(r)}</span>
                        <span className="block text-sm font-bold text-foreground leading-snug group-hover:text-burgundy transition-colors line-clamp-3">{r.headline}</span>
                        <span className="block text-[10px] text-muted-foreground mt-1">{newsDateTime(r.publishedAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}

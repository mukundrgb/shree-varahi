"use client"

// Blog: search, category tabs, a featured latest post, then 12 posts per page with numbered pages.
// UI preview with sample data (lib/blog/data.ts).

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcHeader, KcPagination } from "@/components/knowledge-center"
import { CategoryChips, PostCover } from "@/components/content-ui"
import { BLOG_CATEGORIES, BLOG_CATEGORY_COUNTS, BLOG_PAGE_SIZE, POSTS, formatBlogDate, isBlogCategory, type BlogPost } from "@/lib/blog/data"

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
      <span>{formatBlogDate(post.date)}</span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readMin} min read</span>
    </span>
  )
}

export default function BlogPage() {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  // ?category=<name> preselects a category (the post page's sidebar links here).
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category")
    if (isBlogCategory(c)) setCategory(c)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter((p) => (category === "All" || p.category === category) && (!q || p.title.toLowerCase().includes(q)))
  }, [category, query])

  // The newest post is featured on the first page of the unfiltered view.
  const showFeatured = category === "All" && !query.trim() && page === 1
  const featured = showFeatured ? filtered[0] : null
  const pool = showFeatured ? filtered.slice(1) : filtered
  const totalPages = Math.max(1, Math.ceil(pool.length / BLOG_PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const visible = pool.slice((current - 1) * BLOG_PAGE_SIZE, current * BLOG_PAGE_SIZE)

  const pick = (c: string) => { setCategory(c); setPage(1) }
  const goTo = (p: number) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-12 items-center">
          <div className="space-y-3">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Insights &amp; Analysis</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
              Shree Varahi <span className="text-burgundy">Blog</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              The latest on stocks, IPOs, mutual funds and personal finance, explained simply, so you can invest with confidence.
            </p>
          </div>
          <label className="relative block">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search blog posts…"
              aria-label="Search blog posts"
              className="w-full h-12 pl-10 pr-9 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </label>
        </div>
      </KcHeader>

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <CategoryChips categories={BLOG_CATEGORIES} value={category} onChange={pick} counts={BLOG_CATEGORY_COUNTS} />
          </div>

          {/* Featured (latest) post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-[1.1fr_1fr] bg-white border border-border/70 rounded-[14px] overflow-hidden mb-8 hover:border-burgundy/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all"
            >
              <PostCover category={featured.category} large className="h-52 md:h-full min-h-[220px]" />
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <span className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-burgundy px-2 py-0.5 rounded-[3px]">Latest</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep">{featured.category}</span>
                </span>
                <h2 className="text-xl lg:text-2xl font-black text-foreground leading-snug mb-3 group-hover:text-burgundy transition-colors">{featured.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between gap-3">
                  <PostMeta post={featured} />
                  <span className="inline-flex items-center gap-1 text-xs font-black text-burgundy">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </Link>
          )}

          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No posts found{query.trim() ? ` for “${query.trim()}”` : ""}.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group h-full flex flex-col bg-white border border-border/70 rounded-[12px] overflow-hidden hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
                  >
                    <PostCover category={p.category} className="h-40" />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-2">{p.category}</span>
                      <h3 className="text-[15px] font-black text-foreground leading-snug mb-4 line-clamp-3 flex-1 group-hover:text-burgundy transition-colors">{p.title}</h3>
                      <PostMeta post={p} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <KcPagination page={current} totalPages={totalPages} onChange={goTo} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

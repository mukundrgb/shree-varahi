// Blog: search, category chips, a featured latest post, then the posts with numbered pages.
// Server-rendered from the backend (published posts only, categories with at least 3 posts).
// Filters are in the address: /blog?category=<slug>&q=<text>&page=<n>.

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcHeader } from "@/components/knowledge-center"
import { CardCover, ChipsNav, PagerNav, SearchBox } from "@/components/content-controls"
import { formatDate, getArticles, getCategories, getModuleSettings, type ArticleCard } from "@/lib/server/cms"

type SP = Promise<Record<string, string | string[] | undefined>>
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ""

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const [settings, sp] = await Promise.all([getModuleSettings("blog"), searchParams])
  const filtered = !!(one(sp.category) || one(sp.q) || Number(one(sp.page)) > 1)
  return {
    title: settings?.title ? `${settings.title} | Shree Varahi` : "Shree Varahi Blog",
    description: settings?.description || "The latest on stocks, IPOs, mutual funds and personal finance, explained simply.",
    alternates: { canonical: "/blog" },
    // Filtered and paged views point to /blog and aren't indexed separately.
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  }
}

function PostMeta({ post }: { post: ArticleCard }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
      <span>{formatDate(post.publishedAt)}</span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTimeMinutes} min read</span>
    </span>
  )
}

export default async function BlogPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const [settings, cats] = await Promise.all([getModuleSettings("blog"), getCategories("blog")])
  // Old links used the category name (?category=Mutual%20Funds); both forms work.
  const raw = one(sp.category)
  const category = cats.find((c) => c.slug === raw || c.name === raw)?.slug ?? ""
  const q = one(sp.q).trim()
  const page = Math.max(1, Number(one(sp.page)) || 1)
  const size = settings?.pageSize ?? 12
  const showFeatured = !category && !q && page === 1
  const list = await getArticles("blog", { category: category || undefined, q: q || undefined, page, limit: size })
  const featured = showFeatured ? list.items[0] : null
  const visible = showFeatured ? list.items.slice(1) : list.items
  const catLinks = cats.map((c) => ({ name: c.name, slug: c.slug, count: c.count }))

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
              {settings?.description || "The latest on stocks, IPOs, mutual funds and personal finance, explained simply, so you can invest with confidence."}
            </p>
          </div>
          <SearchBox placeholder="Search blog posts…" label="Search blog posts" />
        </div>
      </KcHeader>

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {catLinks.length > 0 && <div className="mb-8"><ChipsNav cats={catLinks} current={category} /></div>}

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-[1.1fr_1fr] bg-white border border-border/70 rounded-[14px] overflow-hidden mb-8 hover:border-burgundy/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all"
            >
              <CardCover cover={featured.coverImage} category={featured.category?.name ?? ""} large className="h-52 md:h-full min-h-[220px]" />
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <span className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-burgundy px-2 py-0.5 rounded-[3px]">Latest</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep">{featured.category?.name}</span>
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

          {visible.length === 0 && !featured ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              {q ? `No posts found for “${q}”.` : list.total === 0 && !category ? "New posts are on their way. Check back soon." : "No posts found."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group h-full flex flex-col bg-white border border-border/70 rounded-[12px] overflow-hidden hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
                >
                  <CardCover cover={p.coverImage} category={p.category?.name ?? ""} className="h-40" />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-2">{p.category?.name}</span>
                    <h3 className="text-[15px] font-black text-foreground leading-snug mb-4 line-clamp-3 flex-1 group-hover:text-burgundy transition-colors">{p.title}</h3>
                    <PostMeta post={p} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <PagerNav page={Math.min(page, list.totalPages)} totalPages={list.totalPages} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

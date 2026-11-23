"use client"

// Blog post: categories sidebar (left), category, title, meta, cover, body, related posts and open-account card (right).

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcHeader } from "@/components/knowledge-center"
import { CategoryLinkRow, CategorySidebar, PostCover } from "@/components/content-ui"
import { BLOG_CATEGORIES, BLOG_CATEGORY_COUNTS, formatBlogDate, getPost, getPostBody, getRelatedPosts } from "@/lib/blog/data"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

const blogCategoryHref = (c: string) => `/blog?category=${encodeURIComponent(c)}`

export default function BlogPostPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""
  const post = getPost(slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-36 pb-24 text-center">
          <p className="text-lg font-black text-foreground mb-2">Post not found</p>
          <Link href="/blog" className="text-sm font-bold text-burgundy hover:underline">Back to Blog</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const related = getRelatedPosts(post, 4)

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}>
        <div className="max-w-3xl space-y-3">
          <Link href={blogCategoryHref(post.category)} className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">
            {post.category}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.12]">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {formatBlogDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readMin} min read</span>
            <span>by Team Shree Varahi</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[230px_minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
          {/* Left: categories (desktop), sticky under the navbar */}
          <aside className="hidden lg:block lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <CategorySidebar categories={BLOG_CATEGORIES} current={post.category} hrefFor={blogCategoryHref} counts={BLOG_CATEGORY_COUNTS} />
          </aside>

          <article className="min-w-0">
            {/* Phones / tablets: categories as a swipeable row */}
            <CategoryLinkRow categories={BLOG_CATEGORIES} current={post.category} hrefFor={blogCategoryHref} />
            <PostCover category={post.category} large className="h-56 sm:h-72 rounded-[14px] mb-8" />

            <p className="text-base text-foreground/85 leading-relaxed font-semibold mb-8">{post.excerpt}</p>
            <div className="space-y-8">
              {getPostBody(post).map((s) => (
                <section key={s.heading}>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-3">{s.heading}</h2>
                  {s.paragraphs.map((p) => <p key={p} className="text-[15px] text-foreground/80 leading-relaxed mb-3">{p}</p>)}
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-border/60">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[76px]">
            <div className="rounded-[12px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <p className="text-lg font-black mb-1 relative z-10">Open Free Demat Account</p>
              <p className="text-xs text-white/85 mb-4 relative z-10">Zero account opening charges · Zero AMC</p>
              <Link href={OPEN_ACCOUNT_URL} className="relative z-10 block">
                <Button className="w-full bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 text-sm font-black">Open Free Account</Button>
              </Link>
            </div>

            <div className="bg-white border border-border rounded-[12px] overflow-hidden">
              <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">Related Posts</p>
              <ul className="divide-y divide-border/40">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="block px-5 py-3 hover:bg-cream/40 transition-colors group">
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-0.5">{r.category}</span>
                      <span className="block text-sm font-bold text-foreground leading-snug group-hover:text-burgundy transition-colors">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}

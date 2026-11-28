// Blog post: categories (left), category, title, meta, cover, body, related posts and open-account card (right).
// Server-rendered from the backend. An old address redirects (308); an unknown one is a real 404.

import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcHeader } from "@/components/knowledge-center"
import { ArticleBody } from "@/components/article-body"
import { CardCover, CategoryRowNav, CategorySidebarNav } from "@/components/content-controls"
import { JsonLd, articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo"
import { formatDate, getArticle, getCategories, type ArticleFull } from "@/lib/server/cms"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

type Params = Promise<{ slug: string }>

async function load(slug: string): Promise<ArticleFull> {
  const a = await getArticle("blog", slug)
  if (!a) notFound()
  if (a.redirectTo) permanentRedirect(a.redirectTo)
  return a
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const a = await getArticle("blog", slug)
  if (!a || a.redirectTo) return { title: "Post not found" }
  const image = a.seo.ogImage || a.coverImage?.url
  return {
    title: a.seo.title,
    description: a.seo.description,
    keywords: a.seo.keyword || undefined,
    alternates: { canonical: a.seo.canonical || `/blog/${a.slug}` },
    robots: a.seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title: a.seo.title, description: a.seo.description, url: `${SITE_URL}/blog/${a.slug}`, publishedTime: a.publishedAt ?? undefined, modifiedTime: a.updatedAt ?? undefined, images: image ? [image] : undefined },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const [post, cats] = await Promise.all([load(slug), getCategories("blog")])
  const catLinks = cats.map((c) => ({ name: c.name, slug: c.slug, count: c.count }))
  const catName = post.category?.name ?? ""

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <JsonLd data={[articleJsonLd(post, "BlogPosting", `/blog/${post.slug}`), breadcrumbJsonLd([["Home", "/"], ["Blog", "/blog"], [post.title, `/blog/${post.slug}`]])]} />
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}>
        <div className="max-w-3xl space-y-3">
          {post.category && (
            <Link href={`/blog?category=${post.category.slug}`} className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">
              {catName}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.12]">{post.title}</h1>
          {post.subtitle && <p className="text-lg text-foreground/70 font-semibold">{post.subtitle}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTimeMinutes} min read</span>
            <span>by {post.author?.name ?? "Team Shree Varahi"}</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[230px_minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
          <aside className="hidden lg:block lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {catLinks.length > 0 && <CategorySidebarNav cats={catLinks} current={post.category?.slug} base="/blog" />}
          </aside>

          <article className="min-w-0">
            {catLinks.length > 0 && <CategoryRowNav cats={catLinks} current={post.category?.slug} base="/blog" />}
            <CardCover cover={post.coverImage} category={catName} large className="h-56 sm:h-72 rounded-[14px] mb-8" />
            {post.excerpt && <p className="text-base text-foreground/85 leading-relaxed font-semibold mb-8">{post.excerpt}</p>}
            <ArticleBody doc={post.body?.doc} />

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((t) => <span key={t.slug} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cream border border-border text-foreground/70">#{t.name}</span>)}
              </div>
            )}
            {post.author && (post.author.designation || post.author.credentials) && (
              <div className="mt-8 rounded-[12px] border border-border bg-cream/50 p-5">
                <p className="text-sm font-black text-foreground">{post.author.name}</p>
                <p className="text-xs text-gold-deep font-bold">{post.author.designation}</p>
                {post.author.credentials && <p className="text-[11px] text-muted-foreground mt-1">{post.author.credentials}</p>}
              </div>
            )}

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

            {post.related.length > 0 && (
              <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">Related Posts</p>
                <ul className="divide-y divide-border/40">
                  {post.related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="block px-5 py-3 hover:bg-cream/40 transition-colors group">
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-0.5">{r.category?.name}</span>
                        <span className="block text-sm font-bold text-foreground leading-snug group-hover:text-burgundy transition-colors">{r.title}</span>
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

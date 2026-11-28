// Knowledge Center article: title, meta, the article (takeaways, sections, FAQs, as written in the
// panel), previous / next guide in the topic, more in the topic. Server-rendered. An old address or
// a wrong topic in the address redirects (308); an unknown article is a real 404.

import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcCategoryList, KcCategoryStrip, KcCta, KcHeader, KcSearch, TopicIcon } from "@/components/knowledge-center"
import { ArticleBody } from "@/components/article-body"
import { JsonLd, SITE_URL, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"
import { formatDate, getArticle, getArticles, getCategories } from "@/lib/server/cms"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

type Params = Promise<{ topic: string; article: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { article: slug } = await params
  const a = await getArticle("knowledge-center", slug)
  if (!a || a.redirectTo) return { title: "Article not found" }
  const image = a.seo.ogImage || a.coverImage?.url
  return {
    title: a.seo.title,
    description: a.seo.description,
    keywords: a.seo.keyword || undefined,
    alternates: { canonical: a.seo.canonical || a.path },
    robots: a.seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title: a.seo.title, description: a.seo.description, url: `${SITE_URL}${a.path}`, images: image ? [image] : undefined },
  }
}

export default async function KnowledgeArticlePage({ params }: { params: Params }) {
  const { topic: topicSlug, article: slug } = await params
  const [a, cats] = await Promise.all([getArticle("knowledge-center", slug), getCategories("knowledge-center")])
  if (!a) notFound()
  if (a.redirectTo) permanentRedirect(a.redirectTo)
  // The address must carry the article's own topic (KC-13).
  if (a.category && a.category.slug !== topicSlug) permanentRedirect(a.path)
  const topic = cats.find((c) => c.slug === a.category?.slug)
  if (!topic) notFound()
  const topics = cats.map((c) => ({ slug: c.slug, title: c.name, icon: c.icon || "BookOpen", desc: c.description }))
  const more = (await getArticles("knowledge-center", { category: topic.slug, limit: 6, sort: "order" })).items.filter((x) => x.slug !== a.slug).slice(0, 5)
  const backHref = `/knowledge-center/${topic.slug}`

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <JsonLd data={[
        articleJsonLd(a, "Article", a.path),
        breadcrumbJsonLd([["Home", "/"], ["Knowledge Center", "/knowledge-center"], [topic.name, backHref], [a.title, a.path]]),
        ...(a.faqs.length ? [faqJsonLd(a.faqs)] : []),
      ]} />
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Center", href: "/knowledge-center" }, { label: topic.name, href: backHref }, { label: a.title }]}>
        <div className="max-w-3xl space-y-3">
          <Link href={backHref} className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">
            <TopicIcon name={topic.icon} className="w-3.5 h-3.5" /> {topic.name}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.12]">{a.title}</h1>
          {a.excerpt && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{a.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {a.readingTimeMinutes} min read</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Updated on {formatDate(a.updatedAt ?? a.publishedAt)}</span>
            <span>by {a.author?.name ?? "Team Shree Varahi"}</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start">
          <article className="min-w-0">
            <div className="lg:hidden space-y-3 mb-6">
              <KcSearch topics={topics} />
              <KcCategoryStrip current={topic.slug} topics={topics} />
            </div>

            <ArticleBody doc={a.body?.doc} />

            <nav aria-label="Article navigation" className="grid sm:grid-cols-2 gap-3 mt-12 pt-8 border-t border-border/60">
              {a.previous ? (
                <Link href={`/knowledge-center/${topic.slug}/${a.previous.slug}`} className="group bg-white border border-border/70 rounded-[10px] p-4 hover:border-burgundy/40 transition-colors">
                  <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1"><ArrowLeft className="w-3 h-3" /> Previous</span>
                  <span className="block text-sm font-black text-foreground group-hover:text-burgundy transition-colors">{a.previous.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {a.next && (
                <Link href={`/knowledge-center/${topic.slug}/${a.next.slug}`} className="group bg-white border border-border/70 rounded-[10px] p-4 text-right hover:border-burgundy/40 transition-colors">
                  <span className="flex items-center justify-end gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">Next <ArrowRight className="w-3 h-3" /></span>
                  <span className="block text-sm font-black text-foreground group-hover:text-burgundy transition-colors">{a.next.title}</span>
                </Link>
              )}
            </nav>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[76px]">
            <KcSearch className="hidden lg:block" topics={topics} />
            <div className="space-y-4 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto rounded-[12px]" style={{ scrollbarWidth: "thin" }}>
              <div className="rounded-[12px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                <p className="text-lg font-black mb-1 relative z-10">Open Free Demat Account</p>
                <p className="text-xs text-white/85 mb-4 relative z-10">Zero account opening charges · Zero AMC</p>
                <Link href={OPEN_ACCOUNT_URL} className="relative z-10 block">
                  <Button className="w-full bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 text-sm font-black">Open Free Account</Button>
                </Link>
              </div>

              {more.length > 0 && (
                <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                  <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">More in {topic.name}</p>
                  <ul className="divide-y divide-border/40">
                    {more.map((x) => (
                      <li key={x.slug}>
                        <Link href={`/knowledge-center/${topic.slug}/${x.slug}`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold text-foreground hover:text-burgundy hover:bg-cream/40 transition-colors">
                          <span className="leading-snug">{x.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={backHref} className="block px-5 py-3 border-t border-border/60 text-xs font-black text-burgundy hover:bg-cream/40 transition-colors">
                    View all {topic.count} articles →
                  </Link>
                </div>
              )}

              <div className="hidden lg:block"><KcCategoryList current={topic.slug} topics={topics} /></div>
            </div>
          </aside>
        </div>
      </section>

      <KcCta />
      <Footer />
    </main>
  )
}

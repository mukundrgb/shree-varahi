// News story: headline, category, date/time, source, full story, related news and categories.
// /news/cmots-<sno> is a stored CMOTS story (shown as plain text); /news/<slug> is a story written by
// the team (rendered like an article). Server-rendered. A story past the retention period says so
// and isn't indexed; an unknown one is a real 404.

import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcHeader } from "@/components/knowledge-center"
import { ArticleBody } from "@/components/article-body"
import { JsonLd, SITE_URL, breadcrumbJsonLd } from "@/lib/seo"
import { CmsError, cmsGet, cmsGetOr, type ArticleFull } from "@/lib/server/cms"
import { OPEN_ACCOUNT_URL } from "@/lib/external-links"

type Related = { id: string; tag: string; headline: string; publishedAt: string | null }
type CmotsStory = { editorial: false; id: string; tag: string; headline: string; caption: string | null; text: string | null; publishedAt: string | null; category: string | null; source: string; related: Related[] }
type TeamStory = ArticleFull & { editorial: true }
type Result = { story: CmotsStory | TeamStory } | { gone: true } | null

const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) : "")

async function load(id: string): Promise<Result> {
  try {
    return { story: await cmsGet<CmotsStory | TeamStory>(`/news/${encodeURIComponent(id)}`, { tags: [`news:${id}`, "news:list"], revalidate: 3600 }) }
  } catch (e) {
    if (e instanceof CmsError && e.status === 410) return { gone: true }
    if (e instanceof CmsError && e.status === 404) return null
    throw e
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const r = await load(id).catch(() => null)
  if (!r || "gone" in r) return { title: "Story not available | Shree Varahi", robots: { index: false, follow: true } }
  const s = r.story
  if (s.editorial) return { title: s.seo.title, description: s.seo.description, alternates: { canonical: `/news/${s.slug}` }, robots: s.seo.noindex ? { index: false, follow: true } : undefined }
  return { title: `${s.headline} | Shree Varahi News`, description: (s.caption || s.text || "").slice(0, 160), alternates: { canonical: `/news/cmots-${s.id}` } }
}

export default async function NewsStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // A bare number (older links) becomes the CMOTS address.
  if (/^\d+$/.test(id)) permanentRedirect(`/news/cmots-${id}`)
  const [r, cats] = await Promise.all([load(id), cmsGetOr<{ key: string; name: string; count: number }[]>("/news/categories", [], { tags: ["news:list"], revalidate: 60 })])
  if (!r) notFound()
  if ("gone" in r) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-36 pb-24 text-center">
          <p className="text-lg font-black text-foreground mb-2">Story no longer available</p>
          <p className="text-sm text-muted-foreground mb-3">We keep market news for a limited time.</p>
          <Link href="/news" className="text-sm font-bold text-burgundy hover:underline">Back to News</Link>
        </div>
        <Footer />
      </main>
    )
  }
  const s = r.story
  if (s.editorial && s.redirectTo) permanentRedirect(s.redirectTo)
  const headline = s.editorial ? s.title : s.headline
  const category = s.editorial ? s.category?.name ?? "" : s.category ?? s.tag
  const categoryKey = s.editorial ? cats.find((c) => c.name === s.category?.name)?.key ?? "" : s.category ?? ""
  const paragraphs = s.editorial ? [] : (s.text ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const related: { href: string; tag: string; headline: string; publishedAt: string | null }[] = s.editorial
    ? s.related.map((x) => ({ href: `/news/${x.slug}`, tag: x.category?.name ?? "", headline: x.title, publishedAt: x.publishedAt }))
    : s.related.map((x) => ({ href: `/news/cmots-${x.id}`, tag: x.tag, headline: x.headline, publishedAt: x.publishedAt }))
  const path = s.editorial ? `/news/${s.slug}` : `/news/cmots-${s.id}`
  const shownCats = cats.filter((c) => c.count > 0)
  const catHref = (key: string) => `/news?category=${encodeURIComponent(key)}`

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "NewsArticle", headline: headline.slice(0, 110), datePublished: s.publishedAt ?? undefined, mainEntityOfPage: `${SITE_URL}${path}`, author: { "@type": "Organization", name: s.editorial ? "Shree Varahi Desk" : "Capital Market" }, publisher: { "@type": "Organization", name: "Shree Varahi" } },
        breadcrumbJsonLd([["Home", "/"], ["News", "/news"], [headline, path]]),
      ]} />
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: headline }]}>
        <div className="max-w-3xl space-y-3">
          {category && (categoryKey
            ? <Link href={catHref(categoryKey)} className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">{category}</Link>
            : <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep">{category}</span>)}
          <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-foreground tracking-tight leading-[1.15]">{headline}</h1>
          {(s.editorial ? s.excerpt : s.caption) && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{s.editorial ? s.excerpt : s.caption}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {when(s.publishedAt)} IST</span>
            <span>Source: {s.editorial ? s.source?.name || "Shree Varahi Desk" : "Capital Market Live News (CMOTS)"}</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[220px_minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
          <aside className="hidden lg:block lg:sticky lg:top-[76px]">
            {shownCats.length > 0 && (
              <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                <p className="px-4 py-3 border-b border-border/60 text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Categories</p>
                <ul className="py-1">
                  {shownCats.map((c) => (
                    <li key={c.key}>
                      <Link href={catHref(c.key)} aria-current={c.key === categoryKey ? "true" : undefined} className={`flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-semibold border-l-2 transition-colors ${c.key === categoryKey ? "border-burgundy bg-burgundy/[0.06] text-burgundy" : "border-transparent text-foreground hover:bg-cream/60 hover:text-burgundy"}`}>
                        {c.name}
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <article className="min-w-0">
            <div className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1 mb-6" style={{ scrollbarWidth: "none" }} aria-label="News categories">
              {shownCats.map((c) => (
                <Link key={c.key} href={catHref(c.key)} className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${c.key === categoryKey ? "bg-burgundy text-white border-burgundy" : "bg-white border-border text-foreground"}`}>{c.name}</Link>
              ))}
            </div>

            {s.editorial ? <ArticleBody doc={s.body?.doc} /> : (
              <div className="space-y-4">
                {paragraphs.length
                  ? paragraphs.map((p, i) => <p key={i} className="text-[15px] text-foreground/85 leading-relaxed whitespace-pre-line">{p}</p>)
                  : <p className="text-sm text-muted-foreground">The full text of this story is not available.</p>}
              </div>
            )}

            <p className="mt-10 text-[11px] text-muted-foreground leading-relaxed bg-cream border border-border/60 rounded-[8px] p-4">
              <strong className="text-foreground/80">Disclaimer:</strong> This news is for information only and is not investment advice.
              Investments in securities markets are subject to market risks; read all related documents carefully before investing.
            </p>

            <Link href="/news" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <div className="rounded-[12px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <p className="text-lg font-black mb-1 relative z-10">Open Free Demat Account</p>
              <p className="text-xs text-white/85 mb-4 relative z-10">Zero account opening charges · Zero AMC</p>
              <Link href={OPEN_ACCOUNT_URL} className="relative z-10 block">
                <Button className="w-full bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 text-sm font-black">Open Free Account</Button>
              </Link>
            </div>

            {related.length > 0 && (
              <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">Related News</p>
                <ul className="divide-y divide-border/40">
                  {related.map((x) => (
                    <li key={x.href}>
                      <Link href={x.href} className="block px-5 py-3 hover:bg-cream/40 transition-colors group">
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gold-deep mb-0.5">{x.tag}</span>
                        <span className="block text-sm font-bold text-foreground leading-snug group-hover:text-burgundy transition-colors line-clamp-3">{x.headline}</span>
                        <span className="block text-[10px] text-muted-foreground mt-1">{when(x.publishedAt)}</span>
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

// Knowledge Center topic: the topic's guides in the order set in the admin panel, with pages
// (?page=N). Each card opens /knowledge-center/<topic>/<article>. Server-rendered; a topic that
// isn't published (or has too few guides yet) is a real 404.

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcCategoryList, KcCategoryStrip, KcCta, KcHeader, KcSearch, TopicIcon } from "@/components/knowledge-center"
import { PagerNav } from "@/components/content-controls"
import { getArticles, getCategories, getModuleSettings } from "@/lib/server/cms"

type Props = { params: Promise<{ topic: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }

async function topicOf(slug: string) {
  const cats = await getCategories("knowledge-center")
  return { cats, topic: cats.find((c) => c.slug === slug) }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ topic: slug }, sp] = await Promise.all([params, searchParams])
  const { topic } = await topicOf(slug)
  if (!topic) return { title: "Topic not found" }
  return {
    title: `${topic.name} | Knowledge Center | Shree Varahi`,
    description: topic.description,
    alternates: { canonical: `/knowledge-center/${topic.slug}` },
    ...(Number(sp.page) > 1 ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function KnowledgeTopicPage({ params, searchParams }: Props) {
  const [{ topic: slug }, sp] = await Promise.all([params, searchParams])
  const [{ cats, topic }, settings] = await Promise.all([topicOf(slug), getModuleSettings("knowledge-center")])
  if (!topic) notFound()
  const size = settings?.pageSize ?? 12
  const page = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1)
  const list = await getArticles("knowledge-center", { category: topic.slug, page, limit: size, sort: "order" })
  const topics = cats.map((c) => ({ slug: c.slug, title: c.name, icon: c.icon || "BookOpen", desc: c.description }))

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Center", href: "/knowledge-center" }, { label: topic.name }]}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-[12px] bg-white border border-border flex items-center justify-center shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <TopicIcon name={topic.icon} className="w-7 h-7" />
          </div>
          <div className="space-y-2 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-[1.1]">
              {topic.name}{page > 1 && <span className="text-muted-foreground font-bold text-xl sm:text-2xl"> · Page {page}</span>}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{topic.description}</p>
            <p className="text-[11px] font-bold text-gold-deep">{list.total} articles</p>
          </div>
        </div>
      </KcHeader>

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          <aside className="hidden lg:block space-y-4 lg:sticky lg:top-[76px]">
            <KcSearch topics={topics} />
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto rounded-[12px]" style={{ scrollbarWidth: "thin" }}>
              <KcCategoryList current={topic.slug} topics={topics} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="lg:hidden space-y-3 mb-6">
              <KcSearch topics={topics} />
              <KcCategoryStrip current={topic.slug} topics={topics} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {list.items.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/knowledge-center/${topic.slug}/${a.slug}`}
                  className="group flex items-center gap-4 bg-white border border-border/70 rounded-[12px] px-5 py-4 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
                >
                  <span className="w-10 h-10 rounded-[10px] bg-burgundy/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-burgundy" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] font-extrabold text-muted-foreground mb-0.5">{String((page - 1) * size + i + 1).padStart(2, "0")}</span>
                    <span className="block text-sm font-black text-foreground leading-snug group-hover:text-burgundy transition-colors">{a.title}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-burgundy group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>

            <PagerNav page={Math.min(page, list.totalPages)} totalPages={list.totalPages} />
          </div>
        </div>
      </section>

      <KcCta />
      <Footer />
    </main>
  )
}

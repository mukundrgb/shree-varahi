"use client"

// Knowledge Center topic: the topic's articles, 12 per page (?page=N). Each card opens /knowledge-center/<topic>/<article>.

import { Suspense, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcCategoryList, KcCategoryStrip, KcCta, KcHeader, KcPagination, KcSearch, TopicIcon } from "@/components/knowledge-center"
import { KC_PAGE_SIZE, getArticleList, getTopic } from "@/lib/knowledge-center/data"

function TopicContent() {
  const params = useParams()
  const router = useRouter()
  const search = useSearchParams()
  const topicSlug = typeof params.topic === "string" ? params.topic : ""
  const topic = getTopic(topicSlug)
  const articles = useMemo(() => getArticleList(topicSlug), [topicSlug])

  const totalPages = Math.max(1, Math.ceil(articles.length / KC_PAGE_SIZE))
  const page = Math.min(totalPages, Math.max(1, Number(search.get("page")) || 1))
  const visible = articles.slice((page - 1) * KC_PAGE_SIZE, page * KC_PAGE_SIZE)

  const goTo = (next: number) => {
    router.push(next === 1 ? `/knowledge-center/${topicSlug}` : `/knowledge-center/${topicSlug}?page=${next}`, { scroll: false })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!topic) {
    return (
      <div className="pt-36 pb-24 text-center">
        <p className="text-lg font-black text-foreground mb-2">Topic not found</p>
        <Link href="/knowledge-center" className="text-sm font-bold text-burgundy hover:underline">Back to Knowledge Center</Link>
      </div>
    )
  }

  return (
    <>
      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Center", href: "/knowledge-center" }, { label: topic.title }]}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-[12px] bg-white border border-border flex items-center justify-center shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <TopicIcon name={topic.icon} className="w-7 h-7" />
          </div>
          <div className="space-y-2 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-[1.1]">
              {topic.title}{page > 1 && <span className="text-muted-foreground font-bold text-xl sm:text-2xl"> · Page {page}</span>}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{topic.desc}</p>
            <p className="text-[11px] font-bold text-gold-deep">{articles.length} articles</p>
          </div>
        </div>
      </KcHeader>

      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">

          {/* Sidebar (desktop): search + all categories, stays in view while scrolling */}
          <aside className="hidden lg:block space-y-4 lg:sticky lg:top-[76px]">
            <KcSearch />
            {/* Only the list scrolls, so the search dropdown is never clipped */}
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto rounded-[12px]" style={{ scrollbarWidth: "thin" }}>
              <KcCategoryList current={topic.slug} />
            </div>
          </aside>

          <div className="min-w-0">
          {/* Mobile / tablet: search + auto-scrolling categories at the top */}
          <div className="lg:hidden space-y-3 mb-6">
            <KcSearch />
            <KcCategoryStrip current={topic.slug} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((a, i) => (
              <Link
                key={a.slug}
                href={`/knowledge-center/${topic.slug}/${a.slug}`}
                className="group flex items-center gap-4 bg-white border border-border/70 rounded-[12px] px-5 py-4 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
              >
                <span className="w-10 h-10 rounded-[10px] bg-burgundy/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5 text-burgundy" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] font-extrabold text-muted-foreground mb-0.5">
                    {String((page - 1) * KC_PAGE_SIZE + i + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-sm font-black text-foreground leading-snug group-hover:text-burgundy transition-colors">{a.title}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-burgundy group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          <KcPagination page={page} totalPages={totalPages} onChange={goTo} />
          </div>
        </div>
      </section>

      <KcCta />
    </>
  )
}

export default function KnowledgeTopicPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      {/* useSearchParams needs a Suspense boundary in the App Router */}
      <Suspense fallback={<div className="pt-36 pb-24 text-center text-sm text-muted-foreground">Loading…</div>}>
        <TopicContent />
      </Suspense>
      <Footer />
    </main>
  )
}

"use client"

// Knowledge Center article: title, meta, key takeaways, sections, FAQs (question + answer),
// and previous / next article navigation within the topic.

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, Plus, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { KcCategoryList, KcCategoryStrip, KcCta, KcHeader, KcSearch, TopicIcon } from "@/components/knowledge-center"
import { KC_PAGE_SIZE, getArticle, getArticleList, getNeighbours, getTopic } from "@/lib/knowledge-center/data"

export default function KnowledgeArticlePage() {
  const params = useParams()
  const topicSlug = typeof params.topic === "string" ? params.topic : ""
  const articleSlug = typeof params.article === "string" ? params.article : ""
  const topic = getTopic(topicSlug)
  const article = getArticle(topicSlug, articleSlug)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  if (!topic || !article) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-36 pb-24 text-center">
          <p className="text-lg font-black text-foreground mb-2">Article not found</p>
          <Link href="/knowledge-center" className="text-sm font-bold text-burgundy hover:underline">Back to Knowledge Center</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const { prev, next, index, total } = getNeighbours(topicSlug, articleSlug)
  // The topic list page this article sits on, so "Back" returns to the right page.
  const listPage = Math.floor(index / KC_PAGE_SIZE) + 1
  const backHref = listPage > 1 ? `/knowledge-center/${topic.slug}?page=${listPage}` : `/knowledge-center/${topic.slug}`
  const related = getArticleList(topicSlug).filter((a) => a.slug !== articleSlug).slice(0, 5)

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <KcHeader crumbs={[
        { label: "Home", href: "/" },
        { label: "Knowledge Center", href: "/knowledge-center" },
        { label: topic.title, href: backHref },
        { label: article.title },
      ]}>
        <div className="max-w-3xl space-y-3">
          <Link href={backHref} className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-gold-deep hover:text-burgundy transition-colors">
            <TopicIcon name={topic.icon} className="w-3.5 h-3.5" /> {topic.title}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.12]">{article.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{article.summary}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readMin} min read</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Updated on {article.updated}</span>
            <span>by Team Shree Varahi</span>
            <span className="text-gold-deep font-bold">Article {index + 1} of {total}</span>
          </div>
        </div>
      </KcHeader>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start">

          {/* ── ARTICLE ── */}
          <article className="min-w-0">
            {/* Mobile / tablet: search + auto-scrolling categories at the top */}
            <div className="lg:hidden space-y-3 mb-6">
              <KcSearch />
              <KcCategoryStrip current={topic.slug} />
            </div>

            <div className="bg-cream border border-border/70 rounded-[12px] p-5 sm:p-6 mb-8">
              <p className="text-sm font-black text-foreground mb-3">Key Takeaways</p>
              <ul className="space-y-2">
                {article.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {article.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-3">{s.heading}</h2>
                  {s.paragraphs?.map((p) => <p key={p} className="text-[15px] text-foreground/80 leading-relaxed mb-3">{p}</p>)}
                  {s.bullets && (
                    <ul className="space-y-2 mt-1">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground/80 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-burgundy shrink-0 mt-2.5" /> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* FAQs */}
            <section className="mt-12">
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-4">FAQs</h2>
              <div className="space-y-3">
                {article.faqs.map((f, i) => {
                  const open = faqOpen === i
                  return (
                    <div key={f.q} className="bg-white border border-border/80 rounded-[10px] overflow-hidden">
                      <button
                        onClick={() => setFaqOpen(open ? null : i)}
                        aria-expanded={open}
                        className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-secondary/40 transition-colors"
                      >
                        <span className="font-extrabold text-foreground text-sm">{f.q}</span>
                        <span className={`shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${open ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                          {open ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                            <div className="px-5 pb-5 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border/40">{f.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Previous / next article */}
            <nav aria-label="Article navigation" className="grid sm:grid-cols-2 gap-3 mt-12 pt-8 border-t border-border/60">
              {prev ? (
                <Link href={`/knowledge-center/${topic.slug}/${prev.slug}`} className="group bg-white border border-border/70 rounded-[10px] p-4 hover:border-burgundy/40 transition-colors">
                  <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                    <ArrowLeft className="w-3 h-3" /> Previous
                  </span>
                  <span className="block text-sm font-black text-foreground group-hover:text-burgundy transition-colors">{prev.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {next && (
                <Link href={`/knowledge-center/${topic.slug}/${next.slug}`} className="group bg-white border border-border/70 rounded-[10px] p-4 text-right hover:border-burgundy/40 transition-colors">
                  <span className="flex items-center justify-end gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                    Next <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="block text-sm font-black text-foreground group-hover:text-burgundy transition-colors">{next.title}</span>
                </Link>
              )}
            </nav>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4 lg:sticky lg:top-[76px]">
            <KcSearch className="hidden lg:block" />
            {/* Only this part scrolls, so the search dropdown is never clipped */}
            <div className="space-y-4 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto rounded-[12px]" style={{ scrollbarWidth: "thin" }}>
            <div className="rounded-[12px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <p className="text-lg font-black mb-1 relative z-10">Open Free Demat Account</p>
              <p className="text-xs text-white/85 mb-4 relative z-10">Zero account opening charges · Zero AMC</p>
              <Link href="/signup/register" className="relative z-10 block">
                <Button className="w-full bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-10 text-sm font-black">
                  Open Free Account
                </Button>
              </Link>
            </div>

            {related.length > 0 && (
              <div className="bg-white border border-border rounded-[12px] overflow-hidden">
                <p className="px-5 py-3 border-b border-border/60 text-xs font-black text-foreground">More in {topic.title}</p>
                <ul className="divide-y divide-border/40">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/knowledge-center/${topic.slug}/${a.slug}`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold text-foreground hover:text-burgundy hover:bg-cream/40 transition-colors">
                        <span className="leading-snug">{a.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={backHref} className="block px-5 py-3 border-t border-border/60 text-xs font-black text-burgundy hover:bg-cream/40 transition-colors">
                  View all {total} articles →
                </Link>
              </div>
            )}

            <div className="hidden lg:block">
              <KcCategoryList current={topic.slug} />
            </div>
            </div>
          </aside>
        </div>
      </section>

      <KcCta />
      <Footer />
    </main>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowLeft, ArrowRight, Newspaper, BookOpen, GraduationCap, TrendingUp, TrendingDown } from "lucide-react"
import { TopicIcon } from "@/components/knowledge-center"

/* ─── Tab data ─── */

const tabs = [
  {
    id: "news",
    title: "Market News",
    icon: Newspaper,
    desc: "Live market developments, earnings updates, policy changes, and sector-specific news curated every day by our team.",
  },
  {
    id: "knowledge",
    title: "Knowledge Center",
    icon: GraduationCap,
    desc: "Simple guides on demat accounts, mutual funds, IPOs, F&O, taxes and more, to help you invest with confidence.",
  },
  {
    id: "blog",
    title: "Blog & Research",
    icon: BookOpen,
    desc: "In-depth articles, trade ideas, and market analysis from Lakshmishree's in-house research team and expert contributors.",
  },
]

/* ─── Right-side illustrations ─── */

function BrowserShell({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="w-full h-full bg-white rounded-[16px] border border-border shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Browser bar */}
      <div className="h-10 px-4 bg-slate-50 border-b border-border flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-2 ml-1">
          <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground/40" />
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        </div>
        <div className="flex-1 bg-white border border-border rounded-[4px] h-6 flex items-center px-2.5">
          <span className="text-[10px] text-muted-foreground/60 font-medium truncate">{url}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

/* Real content for the three panels comes from the home page (server): latest CMOTS / team news,
   live Knowledge Center topics and the latest blog posts. Nothing here is made up; an empty panel
   says the content is on its way. */

export type HomeNews = { id: string; headline: string; tag: string; publishedAt: string | null; editorial?: boolean }
export type HomeTopic = { slug: string; title: string; icon: string; desc: string }
export type HomePost = { slug: string; title: string; category: string; publishedAt: string | null; readingTimeMinutes: number; author: string }

const ago = (iso: string | null) => {
  if (!iso) return ""
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (min < 60) return `${Math.max(1, min)} min ago`
  if (min < 48 * 60) return `${Math.round(min / 60)} hr ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" })
}
const shortDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }) : "")
const TAG_COLORS = ["bg-blue-50 text-blue-600", "bg-emerald-50 text-emerald-600", "bg-amber-50 text-amber-700", "bg-violet-50 text-violet-600", "bg-red-50 text-red-600"]

function Empty({ text }: { text: string }) {
  return <div className="flex-1 grid place-items-center text-center text-[11px] text-muted-foreground px-6">{text}</div>
}

/* News: the latest stories */
function NewsIllustration({ items }: { items: HomeNews[] }) {
  return (
    <BrowserShell url="varahi.in/news">
      <div className="p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-[6px] bg-[#0B0707] shrink-0">
          <span className="text-[10px] font-black text-white/70 uppercase tracking-wider">Latest market news</span>
          <Link href="/news" className="text-[10px] font-bold text-gold hover:underline flex items-center gap-0.5">All news <ChevronRight className="w-3 h-3" /></Link>
        </div>
        {items.length === 0 ? <Empty text="Market news will appear here soon." /> : (
          <div className="flex flex-col gap-2.5 flex-1 min-h-0 overflow-hidden">
            {items.slice(0, 3).map((item, i) => (
              <Link key={item.id} href={item.editorial ? `/news/${item.id}` : `/news/cmots-${item.id}`} className="flex items-start gap-3 p-3 rounded-[8px] bg-slate-50/70 border border-border/50 hover:border-burgundy/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-[3px] ${TAG_COLORS[i % TAG_COLORS.length]}`}>{item.tag}</span>
                    <span className="text-[9px] text-muted-foreground/60">{ago(item.publishedAt)}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-foreground leading-snug line-clamp-2">{item.headline}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <p className="text-[9px] text-muted-foreground/70 shrink-0">Source: CMOTS and Shree Varahi Desk</p>
      </div>
    </BrowserShell>
  )
}

/* Knowledge Center topics; each opens its topic page */
const FEATURED_SLUGS = ["demat-account", "mutual-funds", "ipo", "futures-and-options-trading", "income-tax", "mtf"]

function KnowledgePanel({ topics }: { topics: HomeTopic[] }) {
  const featured = [...FEATURED_SLUGS.map((s) => topics.find((t) => t.slug === s)).filter((t): t is HomeTopic => !!t), ...topics.filter((t) => !FEATURED_SLUGS.includes(t.slug))].slice(0, 6)
  return (
    <BrowserShell url="varahi.in/knowledge-center">
      <div className="p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1.5 text-[11px] font-black text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy" /> Knowledge Center
          </span>
          <Link href="/knowledge-center" className="text-[10px] font-bold text-burgundy hover:underline flex items-center gap-0.5">
            View all topics <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        {featured.length === 0 ? <Empty text="New guides are on their way." /> : (
          <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 content-start overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {featured.map((t) => (
              <Link key={t.slug} href={`/knowledge-center/${t.slug}`} className="group flex items-start gap-2 px-2.5 py-2 rounded-[8px] bg-slate-50/70 border border-border/50 hover:border-burgundy/30 transition-colors">
                <span className="w-6 h-6 rounded-[6px] bg-burgundy/10 flex items-center justify-center shrink-0">
                  <TopicIcon name={t.icon} className="w-3.5 h-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold text-foreground leading-snug group-hover:text-burgundy transition-colors">{t.title}</span>
                  <span className="hidden sm:block text-[9px] text-muted-foreground/80 leading-snug line-clamp-2">{t.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BrowserShell>
  )
}

/* Blog: the latest posts */
function BlogIllustration({ posts }: { posts: HomePost[] }) {
  const [lead, ...rest] = posts
  return (
    <BrowserShell url="varahi.in/blog">
      <div className="p-4 flex flex-col gap-3 h-full">
        {!lead ? <Empty text="New posts are on their way." /> : (
          <>
            <Link href={`/blog/${lead.slug}`} className="rounded-[8px] overflow-hidden shrink-0 block" style={{ background: "linear-gradient(135deg, #1A0808 0%, #3D0808 50%, #1A0808 100%)" }}>
              <div className="px-4 py-5 relative">
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden>
                  <polyline points="0,60 30,50 60,55 90,30 120,38 150,20 180,25 200,18" fill="none" stroke="#D9B27C" strokeWidth="1.5" />
                </svg>
                <div className="relative z-10">
                  <span className="text-[8px] font-bold text-gold tracking-wider uppercase">{lead.category}</span>
                  <h4 className="text-[12px] font-black text-white mt-1 leading-snug line-clamp-2">{lead.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[9px] text-white/50 font-medium">{lead.author}</span>
                    <span className="text-white/20 text-[9px]">·</span>
                    <span className="text-[9px] text-white/40">{lead.readingTimeMinutes} min read</span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
              {rest.slice(0, 2).map((item, i) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="flex items-start gap-3 p-3 rounded-[8px] border border-border/50 bg-slate-50/60 hover:border-burgundy/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-[3px] ${TAG_COLORS[(i + 3) % TAG_COLORS.length]}`}>{item.category}</span>
                      <span className="text-[9px] text-muted-foreground/60">{shortDate(item.publishedAt)}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-foreground leading-snug line-clamp-2">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </BrowserShell>
  )
}


/* ─── Section ─── */

export function KnowledgeSection({ news = [], topics = [], posts = [] }: { news?: HomeNews[]; topics?: HomeTopic[]; posts?: HomePost[] }) {
  const [active, setActive] = useState("news")

  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden border-t border-slate-100"> 
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#B8924A 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Heading + Cards ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 leading-[1.15] tracking-tight">
                Learn with <br />
                <span className="text-burgundy">Shree Varahi.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Markets made simple, explore expert knowledge, daily news, and in-depth research all in one place.
              </p>
            </div>

            {/* Clickable cards */}
            <div className="space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = active === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    whileHover={{ y: isActive ? 0 : -2 }}
                    className={`group w-full text-left rounded-[12px] p-5 flex items-center justify-between gap-6 transition-all duration-250 ${
                      isActive
                        ? "bg-burgundy/[0.04] border border-burgundy/25 shadow-sm"
                        : "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? "bg-burgundy text-white" : "bg-slate-50 text-slate-400 group-hover:bg-burgundy/8 group-hover:text-burgundy"
                      }`}>
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                          isActive ? "text-burgundy" : "text-slate-800 group-hover:text-burgundy"
                        }`}>
                          {tab.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">{tab.desc}</p>
                      </div>
                    </div>

                    <ChevronRight className={`h-5 w-5 shrink-0 transition-all duration-200 ${
                      isActive ? "text-burgundy translate-x-0.5" : "text-slate-300 group-hover:text-burgundy group-hover:translate-x-0.5"
                    }`} />
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT: Swappable illustration ── */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full max-w-[520px] select-none" style={{ aspectRatio: "4/3" }}>

              {/* Floating decoratives */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 -top-6 text-gold z-20"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-6 bottom-20 text-blue-300 z-20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>

              {/* Floating icon badges */}
              <div className="absolute -left-8 sm:-left-10 top-1/4 z-20 flex flex-col gap-3">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-11 h-11 rounded-full bg-white border border-border/60 shadow-md flex items-center justify-center">
                  <span className="text-xl font-serif font-black text-burgundy">"</span>
                </motion.div>
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-11 h-11 rounded-full bg-white border border-border/60 shadow-md flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </motion.div>
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-11 h-11 rounded-full bg-white border border-gold/20 shadow-md flex items-center justify-center">
                  <span className="text-[13px] font-black text-gold-deep">₹</span>
                </motion.div>
              </div>

              {/* Main illustration panel */}
              <div className="absolute w-[88%] left-[10%] top-[6%] h-[88%] z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    {active === "news" ? <NewsIllustration items={news} /> : active === "knowledge" ? <KnowledgePanel topics={topics} /> : <BlogIllustration posts={posts} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating gold coins */}
              <div className="absolute right-0 sm:right-2 bottom-0 translate-y-[20%] flex items-center z-30">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_20px_rgba(184,146,74,0.35)] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl">
                  ₹
                </motion.div>
                <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_16px_rgba(184,146,74,0.3)] flex items-center justify-center text-white font-extrabold text-lg sm:text-xl -ml-4">
                  ₹
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

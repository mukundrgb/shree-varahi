"use client"

// Knowledge Center: all topics. Each card opens /knowledge-center/<topic>. UI preview with sample data (lib/knowledge-center/data.ts).

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcCta, KcHeader, TopicIcon } from "@/components/knowledge-center"
import { TOPICS } from "@/lib/knowledge-center/data"

const WHY = [
  "SEBI-registered broker with 30+ years of trust",
  "Research-backed guidance from our analyst team",
]

export default function KnowledgeCenterPage() {
  const [query, setQuery] = useState("")
  const topics = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? TOPICS.filter((t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) : TOPICS
  }, [query])

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Center" }]}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-12 items-center">
          <div className="space-y-3">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Learn · Invest · Grow</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
              Knowledge <span className="text-burgundy">Center</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Simple, practical guides on stocks, mutual funds, IPOs, derivatives, taxes and more — organised into topics so you can learn at your own pace.
            </p>
          </div>
          <label className="relative block">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="w-full h-12 pl-10 pr-4 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            />
          </label>
        </div>
      </KcHeader>

      {/* ── TOPICS ── */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {topics.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No topics match “{query}”.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {topics.map((t, i) => (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
                >
                  <Link
                    href={`/knowledge-center/${t.slug}`}
                    className="group h-full flex flex-col bg-white border border-border/70 rounded-[12px] p-6 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
                  >
                    <div className="w-11 h-11 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-4">
                      <TopicIcon name={t.icon} />
                    </div>
                    <h2 className="text-base font-black text-foreground mb-2 group-hover:text-burgundy transition-colors">{t.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">{t.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-burgundy uppercase tracking-wider">
                      Know More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY SHREE VARAHI ── */}
      <section className="bg-cream border-y border-border/40 py-10 lg:py-14 mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            The Shree Varahi <span className="text-burgundy">Advantage</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-2.5 bg-white border border-border/70 rounded-[10px] px-4 py-3.5">
                <CheckCircle2 className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-foreground leading-snug">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KcCta />
      <Footer />
    </main>
  )
}

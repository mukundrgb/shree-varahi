"use client"

// Knowledge Center home: the topic cards with a quick filter box (topics come from the server).

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import { KcHeader, TopicIcon, type KcTopicLink } from "@/components/knowledge-center"

export function KcHomeHeader({ intro, query, setQuery }: { intro: string; query: string; setQuery: (q: string) => void }) {
  return (
    <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Center" }]}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-12 items-center">
        <div className="space-y-3">
          <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">Learn · Invest · Grow</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-foreground tracking-tight leading-[1.1]">
            Knowledge <span className="text-burgundy">Center</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{intro}</p>
        </div>
        <label className="relative block">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics…"
            aria-label="Search topics"
            className="w-full h-12 pl-10 pr-4 rounded-[8px] border border-border bg-white text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          />
        </label>
      </div>
    </KcHeader>
  )
}

export function KcTopicGrid({ topics, intro, counts }: { topics: KcTopicLink[]; intro: string; counts: Record<string, number> }) {
  const [query, setQuery] = useState("")
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? topics.filter((t) => t.title.toLowerCase().includes(q) || (t.desc ?? "").toLowerCase().includes(q)) : topics
  }, [query, topics])

  return (
    <>
      <KcHomeHeader intro={intro} query={query} setQuery={setQuery} />
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {topics.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">New guides are on their way. Check back soon.</p>
          ) : shown.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No topics match “{query}”.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {shown.map((t, i) => (
                <motion.div key={t.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}>
                  <Link
                    href={`/knowledge-center/${t.slug}`}
                    className="group h-full flex flex-col bg-white border border-border/70 rounded-[12px] p-6 hover:border-burgundy/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
                  >
                    <div className="w-11 h-11 rounded-[10px] bg-burgundy/10 flex items-center justify-center mb-4">
                      <TopicIcon name={t.icon} />
                    </div>
                    <h2 className="text-base font-black text-foreground mb-2 group-hover:text-burgundy transition-colors">{t.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">{t.desc}</p>
                    <span className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-burgundy uppercase tracking-wider">
                        Know More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      {counts[t.slug] ? <span className="text-[11px] font-bold text-muted-foreground">{counts[t.slug]} articles</span> : null}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

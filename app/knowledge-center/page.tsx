// Knowledge Center: the published topics (each with at least the minimum number of guides, set in
// the admin panel). Each card opens /knowledge-center/<topic>. Server-rendered from the backend.

import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcCta } from "@/components/knowledge-center"
import { KcTopicGrid } from "@/components/kc-topic-grid"
import { getCategories, getModuleSettings } from "@/lib/server/cms"

const WHY = [
  "SEBI-registered broker with 30+ years of trust",
  "Research-backed guidance from our analyst team",
]
const INTRO = "Simple, practical guides on stocks, mutual funds, IPOs, derivatives, taxes and more, organised into topics so you can learn at your own pace."

export async function generateMetadata(): Promise<Metadata> {
  const s = await getModuleSettings("knowledge-center")
  return { title: `${s?.title || "Knowledge Center"} | Shree Varahi`, description: s?.description || INTRO, alternates: { canonical: "/knowledge-center" } }
}

export default async function KnowledgeCenterPage() {
  const [settings, cats] = await Promise.all([getModuleSettings("knowledge-center"), getCategories("knowledge-center")])
  const topics = cats.map((c) => ({ slug: c.slug, title: c.name, icon: c.icon || "BookOpen", desc: c.description }))
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <KcTopicGrid topics={topics} intro={settings?.description || INTRO} counts={Object.fromEntries(cats.map((c) => [c.slug, c.count]))} />

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

// Draft preview (PRD WEB-06): the admin panel opens /preview/<token> to see a draft in the real
// page design. The token is signed by the backend and lasts 15 minutes. Never cached, never indexed.

import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays, Clock, Eye } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KcHeader } from "@/components/knowledge-center"
import { ArticleBody } from "@/components/article-body"
import { CardCover } from "@/components/content-controls"
import { formatDate, getPreview } from "@/lib/server/cms"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Preview", robots: { index: false, follow: false } }

const SECTION = { blog: ["Blog", "/blog"], "knowledge-center": ["Knowledge Center", "/knowledge-center"], "news-editorial": ["News", "/news"] } as const

export default async function PreviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const a = await getPreview(token)
  if (!a) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-36 pb-24 text-center">
          <p className="text-lg font-black text-foreground mb-2">This preview link has expired</p>
          <p className="text-sm text-muted-foreground">Open a new preview from the admin panel.</p>
        </div>
        <Footer />
      </main>
    )
  }
  const [section, href] = SECTION[a.contentType] ?? SECTION.blog
  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <div className="fixed top-0 inset-x-0 z-[100] bg-ink text-white text-[12px] font-bold py-2 px-4 flex items-center justify-center gap-2">
        <Eye className="w-4 h-4 text-gold" /> Preview of a draft. Visitors don&apos;t see this until it&apos;s published.
      </div>
      <Navbar />
      <KcHeader crumbs={[{ label: "Home", href: "/" }, { label: section, href }, { label: a.title || "Untitled" }]}>
        <div className="max-w-3xl space-y-3">
          {a.category && <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-deep">{a.category.name}</span>}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-foreground tracking-tight leading-[1.12]">{a.title || "Untitled"}</h1>
          {a.excerpt && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{a.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {formatDate(a.publishedAt) || "Not published yet"}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {a.readingTimeMinutes} min read</span>
            <span>by {a.author?.name ?? "Team Shree Varahi"}</span>
          </div>
        </div>
      </KcHeader>
      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {a.contentType === "blog" && <CardCover cover={a.coverImage} category={a.category?.name ?? ""} large className="h-56 sm:h-72 rounded-[14px] mb-8" />}
          <ArticleBody doc={a.body?.doc} />
          <p className="mt-10 text-sm"><Link href={href} className="font-bold text-burgundy hover:underline">Back to {section}</Link></p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

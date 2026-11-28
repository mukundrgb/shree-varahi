import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { TraderInvestorSection } from "@/components/trader-investor-section"
import { GlobalInvestingSection } from "@/components/global-investing-section"
import { OptionStrategyBuilder } from "@/components/option-strategy-builder"
import { MTFSection } from "@/components/mtf-section"
import { ValuestocksSection } from "@/components/valuestocks-section"
import { BrokerageSection } from "@/components/brokerage-section"
import { AdvisoryBasketsSection } from "@/components/advisory-baskets-section"
import { CalculatorSection } from "@/components/calculator-section"
import { KnowledgeSection } from "@/components/knowledge-section"
import { BranchLocator } from "@/components/branch-locator"
import { PartnerSection } from "@/components/partner-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { MobileStickyBar } from "@/components/mobile-sticky-bar"
import { AppPromoSection } from "@/components/app-promo-section"
import { AdvisorChat } from "@/components/advisor-chat"
import { cmsGetOr, getArticles, getCategories } from "@/lib/server/cms"

/** The latest real stories, posts and live topics for the "Learn with Shree Varahi" section. */
async function learnContent() {
  const [news, topics, posts] = await Promise.all([
    cmsGetOr<{ items: { id: string; headline: string; tag: string; publishedAt: string | null; editorial?: boolean }[] }>("/news", { items: [] }, { tags: ["news:list", "home"], query: { limit: 3 }, revalidate: 60 }),
    getCategories("knowledge-center"),
    getArticles("blog", { limit: 3 }),
  ])
  return {
    news: news.items.map((n) => ({ id: n.id, headline: n.headline, tag: n.tag, publishedAt: n.publishedAt, editorial: n.editorial })),
    topics: topics.map((c) => ({ slug: c.slug, title: c.name, icon: c.icon || "BookOpen", desc: c.description })),
    posts: posts.items.map((p) => ({ slug: p.slug, title: p.title, category: p.category?.name ?? "", publishedAt: p.publishedAt, readingTimeMinutes: p.readingTimeMinutes, author: p.author?.name ?? "Team Shree Varahi" })),
  }
}

export default async function Home() {
  const learn = await learnContent()
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <FeaturesSection /> */}
      {/* <ProductsSection /> */}
      {/* <AppPromoSection /> */}
      <BrokerageSection />
      <AdvisoryBasketsSection />
      <TraderInvestorSection />
      {/* <OptionStrategyBuilder /> */}
      <MTFSection />
      <ValuestocksSection />
      <CalculatorSection />
      <KnowledgeSection news={learn.news} topics={learn.topics} posts={learn.posts} />
      <BranchLocator />
      {/* <PartnerSection /> */}
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyBar />
      <AdvisorChat />
    </main>
  )
}

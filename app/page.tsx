import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { ProductsSection } from "@/components/products-section"
import { TraderInvestorSection } from "@/components/trader-investor-section"
import { OptionStrategyBuilder } from "@/components/option-strategy-builder"
import { MTFSection } from "@/components/mtf-section"
import { BrokerageSection } from "@/components/brokerage-section"
import { TrustSection } from "@/components/trust-section"
import { KnowledgeSection } from "@/components/knowledge-section"
import { BranchLocator } from "@/components/branch-locator"
import { PartnerSection } from "@/components/partner-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { MobileStickyBar } from "@/components/mobile-sticky-bar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ProductsSection />
      <TraderInvestorSection />
      <OptionStrategyBuilder />
      <MTFSection />
      <BrokerageSection />
      <TrustSection />
      <KnowledgeSection />
      <BranchLocator />
      <PartnerSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyBar />
    </main>
  )
}

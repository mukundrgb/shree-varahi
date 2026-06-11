import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { ProductsSection } from "@/components/products-section"
import { TraderInvestorSection } from "@/components/trader-investor-section"
import { GlobalInvestingSection } from "@/components/global-investing-section"
import { OptionStrategyBuilder } from "@/components/option-strategy-builder"
import { MTFSection } from "@/components/mtf-section"
import { ValuestocksSection } from "@/components/valuestocks-section"
import { BrokerageSection } from "@/components/brokerage-section"
import { KnowledgeSection } from "@/components/knowledge-section"
import { BranchLocator } from "@/components/branch-locator"
import { PartnerSection } from "@/components/partner-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { MobileStickyBar } from "@/components/mobile-sticky-bar"
import { AppPromoSection } from "@/components/app-promo-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <FeaturesSection /> */}
      {/* <ProductsSection /> */}
      {/* <AppPromoSection /> */}
      <GlobalInvestingSection />
      <TraderInvestorSection />
      {/* <OptionStrategyBuilder /> */}
      <MTFSection />
      <ValuestocksSection />
      <BrokerageSection />
      <KnowledgeSection />
      <BranchLocator />
      {/* <PartnerSection /> */}
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyBar />
    </main>
  )
}

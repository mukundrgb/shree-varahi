"use client"

import { motion } from "framer-motion"
import { ArrowRight, Coins, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type CompanyMarquee = {
  symbol: string
  name: string
  desc: string
}

const row1Companies: CompanyMarquee[] = [
  { symbol: "AMZN", name: "Amazon", desc: "Ecommerce & Cloud" },
  { symbol: "TSLA", name: "Tesla", desc: "Electric Vehicles" },
  { symbol: "AAPL", name: "Apple", desc: "Consumer Tech" },
  { symbol: "MSFT", name: "Microsoft", desc: "Software" },
  { symbol: "NVDA", name: "Nvidia", desc: "Semiconductors" },
  { symbol: "GOOGL", name: "Alphabet", desc: "Search & AI" },
  { symbol: "META", name: "Meta", desc: "Social Media" },
  { symbol: "NFLX", name: "Netflix", desc: "Entertainment" },
]

const row2Companies: CompanyMarquee[] = [
  { symbol: "SPOT", name: "Spotify", desc: "Audio Streaming" },
  { symbol: "AMD", name: "AMD", desc: "Processors" },
  { symbol: "INTC", name: "Intel", desc: "Manufacturing" },
  { symbol: "SHOP", name: "Shopify", desc: "E-commerce" },
  { symbol: "UBER", name: "Uber", desc: "Ride-hailing" },
  { symbol: "ABNB", name: "Airbnb", desc: "Travel" },
  { symbol: "ZM", name: "Zoom", desc: "Communications" },
  { symbol: "ADBE", name: "Adobe", desc: "Creative Software" },
]

export function GlobalInvestingSection() {
  return (
    <section id="global-investing" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-cream via-background to-cream border-t border-border/40">
      
      {/* Glow decorations */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(217,178,124,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(139,13,25,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Centered details & values (Constrained content container) */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 space-y-12">
        
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold-deep" />
            <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-extrabold block">
              Global Exposure
            </p>
            <span className="w-8 h-px bg-gold-deep" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Invest in US Stocks. <br />
            <span className="text-burgundy">Hedge with Dollar Assets.</span>
          </h2>
          
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Diversify your wealth by owning international equities. Open a zero-maintenance global account, complete a fully digital KYC, and remit funds securely under the RBI&apos;s Liberalised Remittance Scheme (LRS) to invest in global monopolies.
          </p>
        </div>

        <div className="h-px bg-border/40 max-w-2xl mx-auto my-6" />

        {/* Why Invest Centered Section */}
        <div className="text-center space-y-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Why Invest Globally with Shree Varahi?
          </h3>
          
          {/* Features List */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              {
                title: "Fractional Ownership",
                desc: "Buy fractions of high-value shares like Apple, Microsoft, or Nvidia starting at just $1.",
                icon: Coins,
              },
              {
                title: "Currency Depreciation Hedge",
                desc: "Protect your capital's purchasing power against INR depreciation by holding dollar-denominated assets.",
                icon: ShieldCheck,
              },
              {
                title: "Curated Thematic Portfolios",
                desc: "Gain exposure to global megatrends like Artificial Intelligence (AI), Cloud Computing, and Clean Energy.",
                icon: Sparkles,
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white border border-border/50 rounded-[8px] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.015),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_8px_30px_rgba(184,146,74,0.05)] hover:border-gold-deep/30 transition-all duration-300 flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-10 h-10 rounded-[6px] flex items-center justify-center bg-burgundy/[0.04] border border-burgundy/10 mb-2 text-burgundy group-hover:bg-burgundy/[0.08] transition-colors duration-300">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground text-base mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ul>

          <div className="pt-2 flex justify-center">
            <Button
              size="lg"
              className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px] shadow-lg shadow-burgundy/10 group"
            >
              <span>Explore Global Investing</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

      </div>

      {/* Infinite scrolling marquee of US companies (Fills full screen width) */}
      <div className="relative w-full space-y-4 mt-16 py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,white_12%,white_88%,transparent_100%)] z-10">
        {/* Row 1 (Left scroll) */}
        <div className="flex w-full overflow-hidden relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex gap-4 shrink-0"
          >
            {[...row1Companies, ...row1Companies].map((comp, idx) => (
              <div
                key={`${comp.symbol}-${idx}`}
                className="w-[170px] sm:w-[210px] bg-white border border-border/50 rounded-[6px] px-5 py-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-gold-deep/30 transition-colors duration-200 shrink-0"
              >
                <h4 className="font-extrabold text-foreground text-sm sm:text-base mb-1 tracking-tight">{comp.name}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground/90 font-bold tracking-tight">{comp.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Right scroll) */}
        <div className="flex w-full overflow-hidden relative">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex gap-4 shrink-0"
          >
            {[...row2Companies, ...row2Companies].map((comp, idx) => (
              <div
                key={`${comp.symbol}-${idx}`}
                className="w-[170px] sm:w-[210px] bg-white border border-border/50 rounded-[6px] px-5 py-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-gold-deep/30 transition-colors duration-200 shrink-0"
              >
                <h4 className="font-extrabold text-foreground text-sm sm:text-base mb-1 tracking-tight">{comp.name}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground/90 font-bold tracking-tight">{comp.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

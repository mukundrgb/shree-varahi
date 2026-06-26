"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Plus, X, Star, Users, RefreshCw,
  TrendingUp, CheckCircle2, Layers, ArrowRight, BarChart3,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ─── Data ───────────────────────────────────────────────────────────────────

const SAMPLE_BASKET = [
  { name: "HDFC Bank",       weight: 18 },
  { name: "Reliance",        weight: 15 },
  { name: "TCS",             weight: 12 },
  { name: "ICICI Bank",      weight: 11 },
  { name: "L&T",             weight: 9 },
]

const LIVE_BASKETS = [
  {
    icon: BarChart3,
    title: "Blue Chip High Growth Low Valuation Strategy",
    desc: "A fundamentals-driven basket of established large-cap leaders, selected for strong growth at reasonable valuations — built for steady, long-term wealth creation.",
    points: ["Moderate Risk", "Min. ₹2.5 Lakhs", "3 Year Horizon", "2.5% Advisory Fee / Year"],
    href: "https://lakshmishree.valuestocks.in/",
  },
  {
    icon: TrendingUp,
    title: "Small Cap High Growth Low Valuation Strategy",
    desc: "A research-backed basket of high-growth small-cap stocks trading at attractive valuations, aimed at investors seeking higher long-term upside.",
    points: ["Moderate Risk", "Min. ₹2.5 Lakhs", "3 Year Horizon", "2.5% Advisory Fee / Year"],
    href: "https://lakshmishree.valuestocks.in/",
  },
]

const FLEX_CARDS = [
  {
    icon: Users,
    title: "Expert-Curated Portfolios",
    desc: "Every basket is built and maintained by SEBI-registered research analysts, combining in-depth fundamental research with active market tracking to identify quality stocks aligned with a clear investment theme.",
    points: ["SEBI-Registered Advisors", "Theme & Strategy Based", "Transparent Stock Selection", "Research-Backed Construction"],
  },
  {
    icon: RefreshCw,
    title: "Smart Auto-Rebalancing",
    desc: "Baskets are reviewed and rebalanced periodically to reflect changing market conditions, so your portfolio stays aligned with its original strategy without you having to track every stock yourself.",
    points: ["Scheduled Rebalancing Alerts", "One-Click Rebalance Execution", "Stay Aligned With Strategy", "No Manual Tracking Needed"],
  },
]

const FAQS = [
  { q: "What is an Advisory Basket?", a: "An Advisory Basket is a curated collection of stocks built around a specific theme, strategy, or investment goal, created and managed by SEBI-registered research analysts. Investing in a basket lets you gain exposure to multiple stocks in a single transaction." },
  { q: "Who manages these baskets?", a: "Advisory Baskets are designed and maintained by SEBI-registered research analysts and investment advisors who apply structured research, sector analysis, and risk management principles to each basket's construction." },
  { q: "What is the minimum investment amount?", a: "You can start investing in most Advisory Baskets with as little as ₹5,000, though the exact minimum may vary depending on the number and price of stocks within a specific basket." },
  { q: "How does rebalancing work?", a: "Baskets are periodically reviewed by the research team. When a rebalance is due, you'll receive a notification with the updated stock weights, and can execute the changes to your holdings in a single click." },
  { q: "Can I customise a basket after investing?", a: "Yes. Once you invest in a basket, the underlying stocks are held directly in your own Demat account, so you can modify, add to, or exit any individual holding at any time." },
  { q: "What are the charges for investing in baskets?", a: "Investing in an Advisory Basket attracts standard brokerage on the underlying stock purchases. Some premium, research-intensive baskets may carry a separate subscription fee, which is clearly disclosed before you invest." },
  { q: "Are Advisory Baskets safe?", a: "Baskets invest in regular, exchange-listed equities held in your own Demat account, so you retain full ownership and control. As with all equity investments, returns are subject to market risk." },
  { q: "Why invest through Shree Varahi?", a: "Shree Varahi combines SEBI-registered research, transparent basket construction, automated rebalancing alerts, and seamless one-click execution to make thematic stock investing simple and accessible." },
]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AdvisoryBasketsPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const [mobile, setMobile] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-cream border-b border-border/40 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Advisory Baskets</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Advisory Baskets
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Invest In Expert-Curated<br />
                <span className="text-burgundy">Stock Baskets</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Get diversified exposure to research-backed stock portfolios built by SEBI-registered analysts — invest in a complete strategy with a single click.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Start Investing
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Open Account
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <div>
                  <div className="text-lg font-black text-foreground">31+</div>
                  <div className="text-[10px] text-muted-foreground font-semibold">Years of Trust</div>
                </div>
                <div>
                  <div className="text-lg font-black text-foreground flex items-center gap-1">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                  <div className="text-[10px] text-muted-foreground font-semibold">App Rating</div>
                </div>
              </div>
            </div>

            {/* Hero visual — sample basket card */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Bluechip Leaders Basket</span>
                  <Layers className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                {SAMPLE_BASKET.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{s.name}</span>
                    <span className="text-[11px] font-bold text-muted-foreground shrink-0">{s.weight}%</span>
                  </div>
                ))}
                <div className="pt-1 border-t border-border/40">
                  <Button size="sm" className="w-full bg-burgundy hover:bg-burgundy-deep text-white text-[11px] font-bold rounded-[5px] h-8">
                    Invest in Basket
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO 50/50 CARDS ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Live Baskets */}
          <div className="text-center mt-16 mb-10 max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep mb-2">Live On ValueStocks</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground text-balance">Explore Our Live Baskets</h2>
            <p className="text-sm text-muted-foreground mt-3">
              A look at two active strategies on our ValueStocks advisory platform — click through to view full details and subscribe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {LIVE_BASKETS.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-[12px] p-7 sm:p-8 flex flex-col"
                >
                  <div
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center mb-5"
                    style={{ background: "#8B0D1914", border: "1px solid #8B0D1922" }}
                  >
                    <Icon className="w-6 h-6 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-lg sm:text-xl mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                    {c.points.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8B0D19] shrink-0" />
                        <span className="text-[12px] font-semibold text-foreground">{p}</span>
                      </div>
                    ))}
                  </div>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className="w-full bg-burgundy hover:bg-burgundy-deep text-white font-bold rounded-[5px] flex items-center justify-center gap-2">
                      View Basket &amp; Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold-deep uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about Advisory Baskets at Shree Varahi? Review answers to our most popular inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index
              return (
                <div
                  key={index}
                  className="bg-white border border-border/80 rounded-[12px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-foreground text-sm tracking-wide">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${isOpen ? "bg-burgundy text-white" : "bg-secondary text-muted-foreground"}`}>
                      {isOpen ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA — floating banner card, detached from footer ── */}
      <section className="py-12 lg:py-16 bg-background px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl rounded-[20px] overflow-hidden bg-burgundy text-white shadow-[0_20px_60px_rgba(139,13,25,0.25)]"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center top, rgba(217,178,124,0.18) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12 lg:p-14">
            {/* Left — copy + form */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Start Investing<br className="hidden sm:inline" /> In Advisory Baskets
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm font-bold text-white/85">
                4.5 <Star className="w-4 h-4 fill-gold-champagne text-gold-champagne" /> App Rating
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full sm:flex-1 h-12 px-4 rounded-[5px] bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button type="submit" className="w-full sm:w-auto bg-gold hover:bg-gold-champagne text-burgundy font-black h-12 px-7 text-sm rounded-[5px] shadow-xl shrink-0">
                  Get Started
                </Button>
              </form>

              {/* QR + store badges */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <div className="hidden sm:flex w-16 h-16 rounded-[8px] bg-white p-1.5 shrink-0">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px), repeating-linear-gradient(-45deg, #1A1A1A 0, #1A1A1A 2px, transparent 2px, transparent 4px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-white/60">Scan to download</p>
                  <div className="flex gap-2.5">
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">App Store</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 border border-white/20 hover:bg-white/20 rounded-[6px] px-3 py-1.5 flex items-center gap-2 transition-all">
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M5 3.5c-.2 0-.4.1-.5.3l9.8 9.8 3.2-3.2L5.4 3.8c-.1-.2-.3-.3-.4-.3zM3.8 4.7c-.2.2-.3.5-.3.8v13c0 .3.1.6.3.8l7.2-7.2L3.8 4.7zm15 4.4L15.6 11l3.2 3.2 3.1-1.8c.4-.2.6-.6.6-1s-.2-.8-.6-1l-3.1-1.8zM4.3 19.9c.1.2.3.3.5.3.2 0 .3-.1.4-.2l12.1-7-3.2-3.2-9.8 9.8z" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — phone mockup w/ basket dashboard */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">My Baskets</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Invested Value</p>
                  <p className="text-base font-black text-foreground">₹1,48,500</p>
                  <p className="text-[10px] font-bold text-profit">+₹9,820 (7.1%)</p>
                </div>
                {SAMPLE_BASKET.slice(0, 3).map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{s.name}</span>
                    <span className="text-[9px] font-bold text-muted-foreground shrink-0">{s.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

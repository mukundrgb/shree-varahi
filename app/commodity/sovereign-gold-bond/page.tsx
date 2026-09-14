"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Shield, TrendingUp, Landmark, Percent, Sparkles, Plus, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const BENEFITS = [
  { icon: Landmark, title: "Government Backed", desc: "Issued by the Reserve Bank of India on behalf of the Government of India — zero credit risk." },
  { icon: Percent, title: "2.5% Annual Interest", desc: "Earn fixed interest on your investment, paid semi-annually, on top of gold price appreciation." },
  { icon: Shield, title: "No Storage Risk", desc: "Held in demat form — no making charges, no purity concerns, no physical storage needed." },
  { icon: TrendingUp, title: "Tax-Free Capital Gains", desc: "Capital gains are exempt from tax if the bond is held until maturity (8 years)." },
]

const FEATURES = [
  { label: "Issuer", value: "Reserve Bank of India" },
  { label: "Tenure", value: "8 Years (exit from 5th year)" },
  { label: "Interest Rate", value: "2.50% p.a." },
  { label: "Min Investment", value: "1 gram of gold" },
  { label: "Max Investment", value: "4 kg (Individuals)" },
  { label: "Payment", value: "Semi-Annual Interest Payout" },
]

const FAQS = [
  { q: "What is a Sovereign Gold Bond (SGB)?", a: "SGBs are government securities denominated in grams of gold, issued by the RBI. They are a substitute for holding physical gold and offer both price appreciation and fixed interest income." },
  { q: "What is the lock-in period for SGBs?", a: "SGBs have a tenure of 8 years, with an option to exit starting from the 5th year on interest payment dates." },
  { q: "Is the interest earned on SGBs taxable?", a: "Yes, the 2.5% annual interest is taxable as per your income slab. However, capital gains at maturity are tax-exempt if held for the full 8-year term." },
  { q: "Can I sell SGBs before maturity?", a: "Yes, SGBs are listed on stock exchanges and can be sold in the secondary market, subject to liquidity, or redeemed early from the 5th year onward." },
]

export default function SovereignGoldBondPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 overflow-x-hidden">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/commodity" className="hover:text-foreground transition-colors">Gold &amp; Silver</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Sovereign Gold Bond</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-gold/15 text-gold-deep px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3 h-3" /> RBI-Issued Government Security
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.05] mb-4">
                Gold Returns, <span className="text-burgundy">Plus Interest.</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">
                Sovereign Gold Bonds combine gold price appreciation with a fixed 2.5% annual interest — backed by the Government of India, with zero storage hassle.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-11 px-7 text-sm font-bold" asChild>
                  <Link href="/signup/register">Invest in SGB →</Link>
                </Button>
                <Button variant="outline" className="rounded-[5px] h-11 px-7 text-sm font-bold" asChild>
                  <Link href="/commodity">View Live Gold Rates</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-[12px] p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative z-10 text-white space-y-4">
                {FEATURES.map(f => (
                  <div key={f.label} className="flex items-center justify-between border-b border-white/15 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs text-white/70 font-medium">{f.label}</span>
                    <span className="text-sm font-bold">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-black text-foreground text-center mb-10">Why Invest in SGB</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map(b => (
                <div key={b.title} className="bg-background border border-border rounded-[8px] p-5">
                  <div className="w-11 h-11 rounded-[8px] bg-burgundy/10 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
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
                Have questions about Sovereign Gold Bonds on Shree Varahi? Review answers to our most popular inquiries.
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-[12px] p-8 sm:p-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 relative z-10">Grow Your Gold Holdings, Government-Backed</h2>
            <p className="text-sm text-white/80 mb-6 relative z-10 max-w-lg mx-auto">Zero credit risk, fixed interest income, and tax-free maturity gains.</p>
            <Button className="relative z-10 bg-white text-burgundy hover:bg-white/90 rounded-[5px] h-11 px-8 text-sm font-black" asChild>
              <Link href="/signup/register">Open Free Account</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Shield, Coins, RefreshCw, Home, Sparkles, Plus, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const BENEFITS = [
  { icon: Coins, title: "Invest from ₹1", desc: "Start with any amount, no minimum purchase quantity required." },
  { icon: Shield, title: "99.9% Purity Guaranteed", desc: "Backed by 24K, 999 purity gold, stored in secure, insured vaults." },
  { icon: RefreshCw, title: "Buy & Sell Instantly", desc: "Trade digital gold anytime during market hours at live MCX-linked rates." },
  { icon: Home, title: "Convert to Physical Gold", desc: "Redeem your holdings as coins or bars, delivered securely to your doorstep." },
]

const STEPS = [
  { n: "01", title: "Open Your Account", desc: "Sign up on Shree Varahi in minutes with your PAN and Aadhaar." },
  { n: "02", title: "Choose Your Amount", desc: "Buy digital gold starting from as little as ₹1, anytime." },
  { n: "03", title: "Track Live Value", desc: "Your holdings are marked to live MCX gold prices, updated in real time." },
  { n: "04", title: "Sell or Redeem", desc: "Sell instantly for cash, or redeem as physical gold coins and bars." },
]

const FAQS = [
  { q: "Is digital gold safe to invest in?", a: "Yes. Digital gold purchased through Shree Varahi is backed by 99.9% pure physical gold stored in secure, insured vaults with independent custodians." },
  { q: "What is the minimum investment amount?", a: "You can start investing in digital gold from as little as ₹1, making it accessible to every investor." },
  { q: "Can I convert digital gold into physical gold?", a: "Yes, you can redeem your digital gold holdings as physical gold coins or bars, delivered securely to your registered address." },
  { q: "Are there any storage charges?", a: "Shree Varahi does not charge storage fees for holding digital gold within the platform's standard holding period." },
]

export default function DigitalGoldPage() {
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
            <span className="text-foreground font-semibold">Digital Gold</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-gold/15 text-gold-deep px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3 h-3" /> 24K · 999 Purity
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.05] mb-4">
                Own Gold, <span className="text-burgundy">Digitally.</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">
                Buy and sell 99.9% pure gold instantly at live market prices — starting from just ₹1. Secure, insured, and redeemable for physical gold anytime.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-11 px-7 text-sm font-bold" asChild>
                  <Link href="/signup/register">Start Investing →</Link>
                </Button>
                <Button variant="outline" className="rounded-[5px] h-11 px-7 text-sm font-bold" asChild>
                  <Link href="/commodity">View Live Gold Rates</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-[12px] p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF0000 0%, #c20000 100%)" }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative z-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-2">Live Gold Rate</p>
                <p className="text-4xl font-black tabular-nums mb-1">₹7,245<span className="text-lg font-bold">/gram</span></p>
                <p className="text-sm text-white/80 mb-6">99.9% Pure · 24K Gold</p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                  <div>
                    <p className="text-[11px] text-white/60 font-semibold">Min Investment</p>
                    <p className="text-lg font-black">₹1</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60 font-semibold">Storage Charges</p>
                    <p className="text-lg font-black">₹0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-black text-foreground text-center mb-10">Why Buy Digital Gold</h2>
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

        {/* How it works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-black text-foreground text-center mb-10">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map(s => (
                <div key={s.n} className="relative">
                  <div className="text-4xl font-black text-burgundy/15 mb-2">{s.n}</div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
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
                Have questions about Digital Gold on Shree Varahi? Review answers to our most popular inquiries.
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
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 relative z-10">Start Your Gold Journey Today</h2>
            <p className="text-sm text-white/80 mb-6 relative z-10 max-w-lg mx-auto">Buy 99.9% pure digital gold in seconds, backed by secure, insured storage.</p>
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

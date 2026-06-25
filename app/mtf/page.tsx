"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, X, Zap, TrendingUp, Wallet, Percent, ShieldCheck,
  Layers, Clock, CreditCard, ArrowRight, Star, Check, Plus, Equal,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MTFSection } from "@/components/mtf-section"
import Link from "next/link"

// ─── Data ───────────────────────────────────────────────────────────────────

const TOP_MTF_STOCKS = [
  { symbol: "RELIANCE",  price: "2,945", ratio: 4 },
  { symbol: "TCS",       price: "4,125", ratio: 4 },
  { symbol: "HDFC BANK", price: "1,687", ratio: 4 },
]

const KEY_BENEFITS = [
  "Buy Up To 4× More Shares", "Unlimited Holding Period", "0% Interest For First 30 Days",
  "1,700+ MTF Eligible Stocks", "Automatic Pledge & Unpledge", "Transparent Charges, No Hidden Fees",
  "Trade From Your Existing Account", "Same-Day Margin Activation",
]

const CHARGES = [
  { icon: Percent,    title: "Interest",          value: "0.041%",  unit: "per day", desc: "Charged only on the borrowed amount, from the buy date until one day before you sell or convert to delivery — including non-trading days." },
  { icon: CreditCard, title: "Brokerage",          value: "0.1%",    unit: "or ₹20, whichever is lower", desc: "Minimum brokerage of ₹2 per executed order applies on all MTF transactions, same as your regular delivery brokerage plan." },
  { icon: Layers,     title: "Pledge / Unpledge",  value: "₹20",     unit: "+ GST per ISIN, per request", desc: "Shares bought under MTF are auto-pledged as per SEBI norms, and auto-unpledged on sell or conversion to delivery." },
]

const FAQS = [
  { q: "How do I check if MTF is activated on my account?", a: "Open the Shree Varahi app, go to Account → tap your name, and scroll to the MTF section. If the status shows \"Active,\" your MTF segment is enabled. If not, you can activate it directly from the same screen." },
  { q: "How is MTF interest calculated?", a: "Interest is charged from the buy date until one day before your sell or conversion-to-delivery date, on the borrowed amount — including non-trading days. For example, if you buy on 1st January and sell on 11th January, interest is charged from 1st to 10th January on the funded amount." },
  { q: "How long can I hold a position bought using MTF?", a: "You can hold your MTF positions for as long as you want. There is no maximum holding period — interest simply continues to accrue on the funded amount each day you hold." },
  { q: "Which segments is MTF available in?", a: "MTF is available only in the equity delivery segment, on exchange-approved stocks that meet SEBI's MTF eligibility criteria." },
  { q: "What is Mark-to-Market (MTM) loss in MTF?", a: "If the market value of shares bought using MTF falls below your original buy price, the difference is an MTM loss. This is tracked daily against your funded position." },
  { q: "What happens if I get an MTM loss notification?", a: "When the value of your MTF stock falls below your buy price, you may need to add funds to maintain the minimum margin. If the shortfall isn't covered in time, your MTF position may be squared off automatically." },
  { q: "Can I buy shares using MTF without using extra cash?", a: "Yes. You can pledge your existing eligible holdings as collateral from the app, which adds to your margin and lets you use MTF without bringing in fresh funds." },
  { q: "What are pledge and unpledge charges?", a: "As per SEBI guidelines, every share bought under MTF is automatically pledged, and unpledged when sold or converted to delivery. A charge of ₹20 + GST applies per pledge/unpledge request, per ISIN." },
]

function CheckPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground bg-white border border-border/70 rounded-full px-3 py-1.5">
      <Check className="w-3 h-3 text-gold-deep shrink-0" strokeWidth={3} />
      {label}
    </span>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function MTFPage() {
  const [mobile, setMobile] = useState("")
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

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
            <span className="text-foreground font-semibold">MTF</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5 max-w-2xl">
              <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gold-deep">
                Margin Trading Facility
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Buy Up To<br />
                <span className="text-burgundy">4× More Shares</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Trade now, pay later. Use Shree Varahi&apos;s Margin Trading Facility to fund part of your purchase and unlock more buying power on 1,700+ eligible stocks — at just 0.041% interest per day.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-burgundy hover:bg-burgundy-deep text-white px-7 h-11 font-bold rounded-[5px]">
                  Trade Now
                </Button>
                <Button variant="outline" className="border-border px-7 h-11 font-bold rounded-[5px] hover:bg-secondary">
                  Open Account
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <div>
                  <div className="text-lg font-black text-foreground">0.041%</div>
                  <div className="text-[10px] text-muted-foreground font-semibold">Interest / Day</div>
                </div>
                <div>
                  <div className="text-lg font-black text-foreground">Unlimited</div>
                  <div className="text-[10px] text-muted-foreground font-semibold">Holding Period</div>
                </div>
                <div>
                  <div className="text-lg font-black text-foreground flex items-center gap-1">4.5<Star className="w-3.5 h-3.5 fill-gold text-gold" /></div>
                  <div className="text-[10px] text-muted-foreground font-semibold">App Rating</div>
                </div>
              </div>
            </div>

            {/* Hero visual — MTF eligible stocks card */}
            <div className="hidden lg:block">
              <div className="w-[280px] rounded-[12px] bg-white border border-border shadow-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-deep">Top MTF Stocks</span>
                  <span className="text-[9px] font-bold text-muted-foreground">RATIO</span>
                </div>
                {TOP_MTF_STOCKS.map((s) => (
                  <div key={s.symbol} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground truncate pr-2">{s.symbol}</span>
                    <div className="text-right shrink-0 flex items-center gap-2">
                      <span className="text-[12px] font-black text-foreground">₹{s.price}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 border border-emerald-200">{s.ratio}x</span>
                    </div>
                  </div>
                ))}
                <div className="pt-1 border-t border-border/40">
                  <a href="#calculator">
                    <Button size="sm" className="w-full bg-burgundy hover:bg-burgundy-deep text-white text-[11px] font-bold rounded-[5px] h-8">
                      View Calculator
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo strip — closes out the hero */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 mt-10">
          <div className="rounded-[10px] bg-burgundy text-white px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_8px_30px_rgba(139,13,25,0.18)]">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Zap className="w-5 h-5 text-gold-champagne shrink-0 hidden sm:block" />
              <p className="text-sm font-bold">
                Avail MTF @ 0% Interest Rate <span className="font-semibold text-white/80">— for the first 30 days, on borrowing up to ₹1,00,000.</span>
              </p>
            </div>
            <Button size="sm" className="bg-white hover:bg-gold-champagne text-burgundy font-black text-[12px] h-9 px-5 rounded-[5px] shrink-0">
              Open Account
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MTF ── */}
      <section className="py-12 lg:py-16 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">What Is MTF</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">How Does Margin Trading Facility Work?</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              MTF lets you purchase shares worth up to 4× your available cash — Shree Varahi funds the remaining amount, so your capital goes further.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
            <div className="w-full sm:w-auto flex-1 bg-white border border-border rounded-[10px] p-5 text-center">
              <Wallet className="w-6 h-6 text-gold-deep mx-auto mb-2" strokeWidth={1.8} />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">You Pay</p>
              <p className="text-xl font-black text-foreground">₹10,000</p>
            </div>
            <Plus className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="w-full sm:w-auto flex-1 bg-white border border-border rounded-[10px] p-5 text-center">
              <ShieldCheck className="w-6 h-6 text-[#8B0D19] mx-auto mb-2" strokeWidth={1.8} />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">Varahi Funds</p>
              <p className="text-xl font-black text-burgundy">₹30,000</p>
            </div>
            <Equal className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="w-full sm:w-auto flex-1 bg-burgundy text-white rounded-[10px] p-5 text-center">
              <TrendingUp className="w-6 h-6 text-gold-champagne mx-auto mb-2" strokeWidth={1.8} />
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wide mb-1">Buy Stocks Worth</p>
              <p className="text-xl font-black">₹40,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFIT SCENARIO ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">See The Benefit</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">How MTF Multiplies Your Returns</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              With ₹10,000 cash, buying a stock at ₹1,000/share — if the price rises 10% to ₹1,100 in 10 days, here&apos;s how the outcome compares.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white border border-border rounded-[10px] p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground mb-3">Without MTF</p>
              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between"><span className="text-muted-foreground">Capital Used</span><span className="font-bold text-foreground">₹10,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shares Bought</span><span className="font-bold text-foreground">10</span></div>
                <div className="flex justify-between border-t border-border/50 pt-2.5"><span className="text-muted-foreground">Value After 10%</span><span className="font-bold text-foreground">₹11,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground font-semibold">Profit</span><span className="font-black text-profit">+₹1,000</span></div>
              </div>
            </div>
            <div className="bg-burgundy text-white rounded-[10px] p-6 shadow-[0_8px_30px_rgba(139,13,25,0.2)]">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-gold-champagne mb-3">With 4× MTF</p>
              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between"><span className="text-white/70">Capital Used</span><span className="font-bold">₹10,000 + ₹30,000 funded</span></div>
                <div className="flex justify-between"><span className="text-white/70">Shares Bought</span><span className="font-bold">40</span></div>
                <div className="flex justify-between border-t border-white/20 pt-2.5"><span className="text-white/70">Value After 10%</span><span className="font-bold">₹44,000</span></div>
                <div className="flex justify-between"><span className="text-white/90 font-semibold">Profit (before interest)</span><span className="font-black text-gold-champagne">+₹4,000</span></div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground text-center max-w-2xl mx-auto mt-5">
            * Illustrative example for understanding only. Actual profit is reduced by applicable MTF interest, brokerage, and other charges. Losses are similarly magnified — trade with discretion.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <div id="calculator">
        <MTFSection />
      </div>

      {/* ── CHARGES ── */}
      <section className="py-12 lg:py-16 bg-cream border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-gold-deep mb-2">Transparent Pricing</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground text-balance">What Are The Charges For MTF?</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {CHARGES.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white border border-border rounded-[10px] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-[8px] bg-burgundy/10 border border-burgundy/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#8B0D19]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm mb-1">{c.title}</h3>
                  <p className="text-2xl font-black text-burgundy mb-0.5">{c.value}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold mb-3">{c.unit}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mt-10">
            {KEY_BENEFITS.map((b) => <CheckPill key={b} label={b} />)}
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
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have questions about Margin Trading Facility at Shree Varahi? Review answers to our most popular inquiries.
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
                Avail MTF<br className="hidden sm:inline" /> @ 0% Interest Rate
              </h2>
              <p className="text-sm font-semibold text-white/85">
                Trade Now. Pay Later. Unlock up to 4× buying power on 1,700+ eligible stocks through Shree Varahi.
              </p>
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
                  Open Account
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

            {/* Right — phone mockup w/ MTF power */}
            <div className="hidden lg:flex flex-shrink-0 w-[220px] rounded-[20px] border-[6px] border-foreground/90 bg-white shadow-2xl overflow-hidden">
              <div className="w-full p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-foreground">MTF Power</span>
                  <Zap className="w-3.5 h-3.5 text-[#8B0D19]" />
                </div>
                <div className="bg-cream rounded-[8px] p-3 space-y-1">
                  <p className="text-[8px] font-semibold text-muted-foreground uppercase">Buying Power</p>
                  <p className="text-base font-black text-foreground">₹4,00,000</p>
                  <p className="text-[10px] font-bold text-profit">On ₹1,00,000 Capital</p>
                </div>
                {TOP_MTF_STOCKS.map((s) => (
                  <div key={s.symbol} className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-foreground truncate pr-2">{s.symbol}</span>
                    <span className="text-[9px] font-bold text-profit shrink-0">{s.ratio}x MTF</span>
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

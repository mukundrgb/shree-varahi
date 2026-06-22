"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, X, MessageCircle } from "lucide-react"

const faqData = {
  "Trading & Pricing": [
    {
      q: "What is the brokerage for intraday and F&O trades?",
      a: "We charge a flat ₹17 per executed order for all intraday equity, F&O, and commodities trades. This is one of the lowest in the industry.",
    },
    {
      q: "Is equity delivery really free — no hidden charges?",
      a: "Yes. We charge ₹0 brokerage on all equity delivery trades, forever. No hidden charges, no conditions. Hold stocks for the long term without any brokerage costs.",
    },
    {
      q: "What are the MTF interest rates?",
      a: "MTF interest rates start from 0.049% per day (approximately 18% per annum). Rates may vary based on the stock and duration.",
    },
    {
      q: "Can I trade US stocks from India via Shree Varahi?",
      a: "Yes! With our Global Investing feature, you can invest in 5000+ US stocks like Apple, Tesla, Google directly from your Shree Varahi account. No additional paperwork needed.",
    },
    {
      q: "What are the IPO application charges?",
      a: "IPO applications are completely free on Shree Varahi. We don&apos;t charge anything for applying to IPOs through our platform.",
    },
    {
      q: "What advanced order types do you support?",
      a: "We support GTT (Good Till Triggered), OCO (One Cancels Other), AMO (After Market Orders), CO (Cover Orders), and BO (Bracket Orders) — giving you full control over every trade.",
    },
  ],
  "Account & Products": [
    {
      q: "How do I open a Shree Varahi demat account?",
      a: "You can open a demat account in under 10 minutes with our digital e-KYC process. You&apos;ll need your Aadhaar, PAN, and a selfie. It&apos;s completely free to open.",
    },
    {
      q: "How do I set up a SIP in stocks or mutual funds?",
      a: "Go to Invest &gt; SIP in the app or web platform. Choose your stocks or mutual funds, set the amount (minimum ₹100), and select the frequency. It&apos;s automated after that.",
    },
    {
      q: "Is Lakshmishree SEBI registered?",
      a: "Yes, Lakshmishree Investment & Securities Ltd is SEBI registered since 1993. We are members of NSE, BSE, MCX, and CDSL depository participant.",
    },
    {
      q: "What is the annual maintenance charge (AMC)?",
      a: "We charge ₹0 AMC for the first year. From the second year onwards, a nominal AMC may apply based on your account type.",
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via the in-app chat, call our helpline at 022-4080-8080, or email support@shreevarahi.com. We also have 50+ branches across India.",
    },
    {
      q: "Can I transfer my holdings from another broker?",
      a: "Yes, you can transfer your existing holdings to Shree Varahi using the CDSL Easiest or NSDL Speed-e facility. The process is completely online and free.",
    },
  ],
}

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
    )
  }

  const filterFAQs = (faqs: { q: string; a: string }[]) => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      {/* Section divider */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" /> */}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Your questions. <span className="text-burgundy">Clear answers.</span>
          </h2>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
        </motion.div>

        {/* Two Column FAQ */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(faqData).map(([category, faqs]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg mb-4 text-burgundy">{category}</h3>
              {filterFAQs(faqs).map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white border border-border rounded-[5px] overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.q)}
                    className="w-full flex items-start justify-between p-4 text-left"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.q}</span>
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors ${
                        openItems.includes(faq.q)
                          ? "bg-burgundy text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {openItems.includes(faq.q) ? (
                        <X className="h-3 w-3" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openItems.includes(faq.q) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Chat CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-deep transition-colors font-medium"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            <span>Still have questions? Chat with us</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

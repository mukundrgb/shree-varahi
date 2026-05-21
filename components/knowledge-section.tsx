"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Clock, ArrowRight, User } from "lucide-react"

const categories = ["All", "Beginner", "Options & F&O", "Investing", "Market Analysis", "Webinars"]

const articles = [
  {
    category: "Beginner",
    title: "Complete Guide to Opening a Demat Account",
    excerpt: "Everything you need to know about starting your investment journey with a demat account.",
    readTime: "5 min read",
    type: "article",
  },
  {
    category: "Options & F&O",
    title: "Understanding the Option Chain",
    excerpt: "Learn to read Greeks, OI, and IV to make informed F&O trading decisions.",
    readTime: "8 min read",
    type: "article",
  },
  {
    category: "Investing",
    title: "SIP in Stocks vs Mutual Funds",
    excerpt: "Which SIP strategy is right for your wealth creation goals?",
    readTime: "6 min read",
    type: "article",
  },
  {
    category: "Webinars",
    title: "Market Outlook with Prakash Gaba",
    excerpt: "Recorded session: Technical analysis and trading strategies for the current market.",
    readTime: "45 min",
    type: "video",
  },
]

export function KnowledgeSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section className="bg-cream py-16 lg:py-24">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
            Knowledge Center
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Learn. Understand. <span className="text-gold-deep">Invest with confidence.</span>
          </h2>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-[5px] text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-burgundy text-primary-foreground"
                  : "bg-white border border-border text-foreground hover:border-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Webinar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-gold rounded-[5px] p-6 lg:p-8 mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-loss opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-loss"></span>
                </span>
                <span className="text-xs font-semibold text-loss uppercase tracking-wider">
                  Live Webinar
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                Market Outlook & Trading Strategies
              </h3>
              <p className="text-muted-foreground mb-4">
                Join our weekly live session with market experts. Learn technical analysis, 
                swing trading setups, and F&O strategies for the week ahead.
              </p>
              <p className="text-sm text-gold-deep font-medium mb-6">
                Every Saturday, 10:00 AM IST
              </p>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
                Register Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Speaker Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-secondary border border-border rounded-[5px] p-5 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold">Prakash Gaba</h4>
                    <p className="text-xs text-muted-foreground">Market Expert & Technical Analyst</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  25+ years of market experience. Regular contributor to CNBC-TV18 and ET Now.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Knowledge Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-border rounded-[5px] overflow-hidden cursor-pointer hover:shadow-md hover:border-gold/50 transition-all"
            >
              {/* Image placeholder with gradient */}
              <div className="h-32 bg-gradient-to-br from-burgundy/20 to-gold/20 relative">
                {article.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Play className="h-5 w-5 text-burgundy ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="inline-block text-[10px] font-semibold px-2 py-1 rounded-[5px] bg-gold/20 text-gold-deep mb-2">
                  {article.category}
                </span>
                <h4 className="font-bold mb-2 line-clamp-2">{article.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-[5px]">
            Browse all lessons
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-[5px]">
            Watch recorded webinars
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

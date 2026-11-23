// Blog sample data (UI preview only, no backend yet).
// Layout follows groww.in/blog: category tag, title, date and read time on each card, 12 per page with numbered pages.
// Categories are the client's blog categories. Post bodies are our own placeholder text.
// Replace POSTS / getPost with real content or an API when it exists; the pages only read these helpers.

export const BLOG_PAGE_SIZE = 12

export const BLOG_CATEGORIES = [
  "Basics",
  "Commodities",
  "Currency",
  "Daily Stock Market Outlook",
  "Derivatives",
  "Equities",
  "ETF",
  "High Book Value",
  "Investment Learnings",
  "IPO",
  "Market News",
  "Mutual Funds",
  "Stock Market Today",
  "Trading",
] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export interface BlogPost {
  slug: string
  title: string
  category: BlogCategory
  /** ISO date */
  date: string
  readMin: number
  excerpt: string
}

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/₹/g, "rs-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const RAW: Omit<BlogPost, "slug" | "excerpt">[] = [
  { title: "Stock Market Today: Sensex and Nifty End Higher Led by Banking Stocks", category: "Stock Market Today", date: "2026-11-21", readMin: 3 },
  { title: "Daily Stock Market Outlook: Nifty Likely to Open Flat Amid Mixed Global Cues", category: "Daily Stock Market Outlook", date: "2026-11-21", readMin: 3 },
  { title: "NLC India Renewables Files DRHP With SEBI for ₹3,300 Crore Fresh Issue IPO", category: "IPO", date: "2026-11-20", readMin: 2 },
  { title: "Crystal Crop Protection IPO Day 3: Subscription Status, Timeline & Key Issue Details", category: "IPO", date: "2026-11-20", readMin: 2 },
  { title: "Mahanadi Coalfields IPO Day 2: Subscription Status, Timeline & Key Issue Details", category: "IPO", date: "2026-11-20", readMin: 2 },
  { title: "Stock Market Simulator: Meaning, Uses & Benefits", category: "Investment Learnings", date: "2026-11-19", readMin: 14 },
  { title: "Nifty 50 vs Nifty Next 50 vs Nifty 100", category: "Equities", date: "2026-11-19", readMin: 13 },
  { title: "Speculative Trading: Meaning, Types, Risks & Examples", category: "Trading", date: "2026-11-19", readMin: 21 },
  { title: "Mahanadi Coalfields IPO Day 1: Subscription Status, Timeline & Key Issue Details", category: "IPO", date: "2026-11-19", readMin: 2 },
  { title: "Crystal Crop Protection IPO Day 2: Subscription Status, Timeline & Key Issue Details", category: "IPO", date: "2026-11-19", readMin: 2 },
  { title: "Crystal Crop Protection IPO Day 1: Subscription Status, Timeline & Key Issue Details", category: "IPO", date: "2026-11-18", readMin: 2 },
  { title: "Sembcorp Green Infra, Advanced Sys-Tek Receive SEBI Approval for IPOs", category: "Market News", date: "2026-11-18", readMin: 3 },
  { title: "Meganet Technologies Global Files DRHP With SEBI for Proposed ₹740 Crore IPO", category: "Market News", date: "2026-11-18", readMin: 2 },
  { title: "Daily Stock Market Outlook: Key Levels to Watch for Nifty and Bank Nifty", category: "Daily Stock Market Outlook", date: "2026-11-17", readMin: 3 },
  { title: "Mahanadi Coalfields IPO to Open on November 19, 2026: Check Price Band, Issue Size and Key Details", category: "IPO", date: "2026-11-16", readMin: 2 },
  { title: "SIP vs Lumpsum: Which Is Better for You?", category: "Mutual Funds", date: "2026-11-15", readMin: 8 },
  { title: "How to Read a Mutual Fund Factsheet", category: "Mutual Funds", date: "2026-11-14", readMin: 9 },
  { title: "Building an Emergency Fund: How Much Is Enough?", category: "Basics", date: "2026-11-13", readMin: 6 },
  { title: "Understanding Market Capitalisation: Large, Mid & Small Cap", category: "Basics", date: "2026-11-12", readMin: 10 },
  { title: "What Is MTF and When Should You Use It?", category: "Trading", date: "2026-11-11", readMin: 7 },
  { title: "Direct vs Regular Mutual Fund Plans Explained", category: "Mutual Funds", date: "2026-11-10", readMin: 6 },
  { title: "Tax on Capital Gains From Shares: A Simple Guide", category: "Investment Learnings", date: "2026-11-09", readMin: 11 },
  { title: "How IPO Allotment Works: A Step-by-Step Guide", category: "IPO", date: "2026-11-08", readMin: 5 },
  { title: "Markets This Week: What Moved the Nifty", category: "Stock Market Today", date: "2026-11-07", readMin: 4 },
  { title: "Index Funds vs Active Funds: Pros and Cons", category: "Mutual Funds", date: "2026-11-06", readMin: 8 },
  { title: "5 Money Habits to Start in Your 20s", category: "Basics", date: "2026-11-05", readMin: 5 },
  { title: "Reading Candlestick Charts for Beginners", category: "Trading", date: "2026-11-04", readMin: 12 },
  { title: "What Is Grey Market Premium (GMP) in an IPO?", category: "IPO", date: "2026-11-03", readMin: 4 },
  { title: "RBI Policy Decoded: What It Means for Your Loans and Deposits", category: "Market News", date: "2026-11-02", readMin: 5 },
  { title: "Gold vs Silver: Which Precious Metal Should You Track?", category: "Commodities", date: "2026-11-01", readMin: 7 },
  { title: "Crude Oil Prices: What Drives Them and How They Move Markets", category: "Commodities", date: "2026-10-30", readMin: 8 },
  { title: "How the Rupee and Dollar Exchange Rate Affects Your Investments", category: "Currency", date: "2026-10-29", readMin: 6 },
  { title: "Futures vs Options: Key Differences Explained", category: "Derivatives", date: "2026-10-28", readMin: 9 },
  { title: "Equity Shares vs Preference Shares", category: "Equities", date: "2026-10-27", readMin: 6 },
  { title: "What Is an ETF and How Does It Work?", category: "ETF", date: "2026-10-26", readMin: 7 },
  { title: "High Book Value Stocks: What the Price to Book Ratio Tells You", category: "High Book Value", date: "2026-10-25", readMin: 8 },
]

const EXCERPT: Record<BlogCategory, string> = {
  Basics: "The fundamentals explained simply, so you can start investing with confidence.",
  Commodities: "Prices, trends and what moves gold, silver, crude oil and other commodities.",
  Currency: "How currency moves work and what they mean for your money and investments.",
  "Daily Stock Market Outlook": "Key levels, global cues and the stocks to watch before the market opens.",
  Derivatives: "Futures and options explained with examples, risks and practical tips.",
  Equities: "A clear explanation with examples to help you make better stock market decisions.",
  ETF: "How exchange traded funds work and how to pick the right one for your goals.",
  "High Book Value": "Stocks trading close to their book value and what the numbers tell you.",
  "Investment Learnings": "Lessons and concepts that help you invest smarter over the long term.",
  IPO: "Issue size, price band, important dates and subscription details at a glance.",
  "Market News": "The key details, what it means for investors, and what to watch next.",
  "Mutual Funds": "Everything you need to know to pick the right funds for your goals.",
  "Stock Market Today": "How the market closed today, the top movers and what drove the session.",
  Trading: "Strategies, tools and risk management for active traders.",
}

export const POSTS: BlogPost[] = RAW.map((p) => ({ ...p, slug: slugify(p.title), excerpt: EXCERPT[p.category] }))

/** Number of posts in each category. */
export const BLOG_CATEGORY_COUNTS: Record<string, number> = Object.fromEntries(
  BLOG_CATEGORIES.map((c) => [c, POSTS.filter((p) => p.category === c).length]),
)

export const isBlogCategory = (c: string | null): c is BlogCategory => !!c && (BLOG_CATEGORIES as readonly string[]).includes(c)

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug) ?? null

/** Other posts, same category first. */
export function getRelatedPosts(post: BlogPost, limit = 3) {
  const others = POSTS.filter((p) => p.slug !== post.slug)
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, limit)
}

export const formatBlogDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })

/** Placeholder body for a post (the real article text will replace this). */
export function getPostBody(post: BlogPost): { heading: string; paragraphs: string[] }[] {
  return [
    { heading: "Overview", paragraphs: [
      `${post.excerpt} This is sample text for "${post.title}". The full article will appear here once it is published.`,
    ] },
    { heading: "Key Details", paragraphs: [
      "The main facts, figures and dates related to this topic will be listed in this section.",
      "Tables, charts and examples can be added here to make the explanation easier to follow.",
    ] },
    { heading: "What It Means for Investors", paragraphs: [
      "This section will explain how the topic affects your investments and the points to keep in mind before acting.",
    ] },
    { heading: "Conclusion", paragraphs: [
      "A short summary of the article. Investments in securities markets are subject to market risks; read all related documents carefully before investing.",
    ] },
  ]
}

// Knowledge Center sample data (UI preview only — no backend yet).
// Topic list follows the structure of angelone.in/knowledge-center; descriptions and article bodies are our own sample text.
// When real content exists, replace TOPICS / ARTICLE_TITLES / buildArticle with API data — the pages only read these helpers.

export interface KcTopic {
  slug: string
  title: string
  desc: string
  /** lucide-react icon name, resolved in components/knowledge-center.tsx */
  icon: string
}

export interface KcArticleSection { heading: string; paragraphs?: string[]; bullets?: string[] }
export interface KcFaq { q: string; a: string }

export interface KcArticle {
  slug: string
  topicSlug: string
  title: string
  summary: string
  readMin: number
  updated: string
  takeaways: string[]
  sections: KcArticleSection[]
  faqs: KcFaq[]
}

export const KC_PAGE_SIZE = 12

export const TOPICS: KcTopic[] = [
  { slug: "demat-account",          title: "Demat Account",              icon: "Briefcase",          desc: "Learn how a demat account holds your shares, ETFs, bonds and mutual funds electronically, and how to open and use one." },
  { slug: "mutual-funds",           title: "Mutual Funds",               icon: "PieChart",       desc: "Understand fund types, NAV, SIPs, returns and costs so you can choose funds that fit your goals." },
  { slug: "shree-varahi-user-manual", title: "Shree Varahi User Manual", icon: "BookOpen",       desc: "Step-by-step guides to using the Shree Varahi web, mobile and desktop platforms." },
  { slug: "trading-account",        title: "Trading Account",            icon: "Wallet",         desc: "What a trading account is, how it links to your demat and bank accounts, and how orders flow through it." },
  { slug: "online-share-trading",   title: "Online Share Trading",       icon: "MonitorSmartphone", desc: "The basics of buying and selling shares online, order types, and how settlement works." },
  { slug: "intraday-trading",       title: "Intraday Trading",           icon: "Timer",          desc: "Strategies, risks, margins and timing for trades that are opened and closed on the same day." },
  { slug: "share-market",           title: "Share Market",               icon: "TrendingUp",     desc: "How stock exchanges, indices and market participants work together in the Indian share market." },
  { slug: "ipo",                    title: "IPO",                        icon: "Rocket",         desc: "How initial public offerings work, how to apply, allotment, listing and what to check before investing." },
  { slug: "derivatives",            title: "Derivatives",                icon: "GitBranch",      desc: "An introduction to forwards, futures, options and swaps, and how they are used for hedging and trading." },
  { slug: "futures-and-options-trading", title: "Futures and Options Trading", icon: "Layers",   desc: "Contract specifications, lot sizes, premiums, Greeks and margins for F&O trading." },
  { slug: "commodities-trading",    title: "Commodities Trading",        icon: "Gem",            desc: "Trading gold, silver, crude oil and agri commodities on MCX and NCDEX, and what moves their prices." },
  { slug: "authorised-person",      title: "Authorised Person",          icon: "Handshake",      desc: "How to partner with Shree Varahi as an Authorised Person, eligibility and the registration process." },
  { slug: "income-tax",             title: "Income Tax",                 icon: "Receipt",        desc: "Tax on capital gains, dividends and trading income, plus filing tips for investors and traders." },
  { slug: "savings-schemes",        title: "Savings Schemes",            icon: "PiggyBank",      desc: "Government and small savings schemes like PPF, NSC, SSY and SCSS, compared side by side." },
  { slug: "pan-card",               title: "PAN Card",                   icon: "IdCard",         desc: "Applying for, correcting and linking your PAN, and why it is needed for investing." },
  { slug: "aadhaar-card",           title: "Aadhaar Card",               icon: "Fingerprint",    desc: "Using Aadhaar for KYC, e-sign and linking with your PAN and demat account." },
  { slug: "research-articles",      title: "Research Articles",          icon: "FileSearch",     desc: "Market views, sector notes and stock ideas from our research desk." },
  { slug: "cryptocurrency",         title: "Cryptocurrency",             icon: "Bitcoin",        desc: "What cryptocurrencies are, how they are taxed in India, and the risks involved." },
  { slug: "personal-finance",       title: "Personal Finance",           icon: "Calculator",     desc: "Budgeting, emergency funds, insurance and goal planning for everyday money decisions." },
  { slug: "profile-modification",   title: "Profile Modification",       icon: "UserCog",        desc: "How to update your bank account, address, nominee, email and mobile number." },
  { slug: "loans",                  title: "Loans",                      icon: "Landmark",       desc: "Loan against securities, personal and home loans: how they work and what they cost." },
  { slug: "trading-api",            title: "Trading API",                icon: "Code2",          desc: "Automate your trading with APIs: authentication, order placement and market data." },
  { slug: "mtf",                    title: "MTF",                        icon: "Percent",        desc: "Margin Trading Facility explained: leverage, interest, eligible stocks and pledge process." },
]

// Article titles per topic. Demat Account has enough to show pagination (12 per page).
const ARTICLE_TITLES: Record<string, string[]> = {
  "demat-account": [
    "What Is Demat Account?",
    "Features & Benefits of Opening a Demat Account",
    "Dematerialisation: An Overview",
    "Documents Required for a Demat Account",
    "How to Use a Demat Account?",
    "How to Compare Brokerage Charges",
    "Demat Account Concepts & Processes",
    "Frequently Asked Questions: Stock Market",
    "Minor Demat Account",
    "What Is a Bonus Share?",
    "Dematerialisation vs Rematerialisation",
    "What Is a Collateral Amount in a Demat Account?",
    "Transfer Shares From One Demat Account to Another",
    "How to Link Your Aadhaar With Your Demat Account",
    "How to Convert Physical Shares to Demat",
    "Types of Demat Accounts in India",
    "Demat Account Charges & Fees",
    "What Is a DP ID?",
    "How to Close a Demat Account",
    "What Is a BO ID?",
    "Joint Demat Account Explained",
    "What Is a Delivery Instruction Slip (DIS)?",
    "How to Add a Nominee to Your Demat Account",
    "Is a Demat Account Safe?",
    "Demat vs Trading Account",
    "How to Check Your Demat Holdings",
  ],
  "mutual-funds": [
    "What Are Mutual Funds?", "Types of Mutual Funds", "What Is NAV?", "SIP vs Lumpsum", "What Is an Expense Ratio?",
    "Direct vs Regular Plans", "How to Choose a Mutual Fund", "ELSS Funds and Tax Saving", "What Is an Index Fund?",
    "Debt Funds Explained", "Hybrid Funds Explained", "How Mutual Fund Returns Are Taxed", "What Is an Exit Load?",
  ],
  "ipo": [
    "What Is an IPO?", "How to Apply for an IPO", "IPO Allotment Process", "What Is Grey Market Premium?",
    "What Is a Lot Size in IPO?", "IPO Listing Day Explained", "SME IPO vs Mainboard IPO", "What Is an Anchor Investor?",
  ],
}

const DEFAULT_TITLES = (topic: KcTopic) => [
  `What Is ${topic.title}?`,
  `${topic.title}: A Beginner's Guide`,
  `Key Terms in ${topic.title}`,
  `Common Mistakes to Avoid in ${topic.title}`,
  `${topic.title}: Frequently Asked Questions`,
  `How to Get Started With ${topic.title}`,
]

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug) ?? null

/** Article cards for a topic, in order. */
export function getArticleList(topicSlug: string): { slug: string; title: string }[] {
  const topic = getTopic(topicSlug)
  if (!topic) return []
  return (ARTICLE_TITLES[topicSlug] ?? DEFAULT_TITLES(topic)).map((title) => ({ slug: slugify(title), title }))
}

// ── Article bodies ──────────────────────────────────────────────────────────

/** A fully written sample for the first Demat Account article. */
const WHAT_IS_DEMAT: Omit<KcArticle, "slug" | "topicSlug" | "title"> = {
  summary: "A demat account holds your shares and other securities in electronic form, so you can buy, sell and store them without paper certificates.",
  readMin: 6,
  updated: "20 Nov 2026",
  takeaways: [
    "A demat account stores securities like shares, ETFs, bonds and mutual fund units electronically.",
    "It is opened with a Depository Participant (DP) such as Shree Varahi, and held with NSDL or CDSL.",
    "You need a demat account linked with a trading account to buy and sell shares on the exchange.",
    "Opening a demat account with Shree Varahi is free, with zero AMC.",
  ],
  sections: [
    { heading: "Demat Account Meaning", paragraphs: [
      "Demat is short for 'dematerialised'. A demat account is where your securities sit in digital form, much like a bank account holds your money.",
      "When you buy shares, they are credited to your demat account after settlement. When you sell, they are debited from it.",
    ] },
    { heading: "What Is Dematerialisation?", paragraphs: [
      "Dematerialisation is the process of converting physical share certificates into electronic holdings. You submit the certificates to your DP with a request form, and the shares are credited to your demat account once verified.",
    ] },
    { heading: "Features of a Demat Account", bullets: [
      "Easy access: view your holdings anytime on web or mobile.",
      "Quick transfers: shares move electronically within the settlement cycle.",
      "Corporate actions: dividends, bonuses and splits are credited automatically.",
      "Pledging: use your holdings as collateral for margin.",
      "Freezing: temporarily block debits from your account for safety.",
    ] },
    { heading: "Types of Demat Account", bullets: [
      "Regular demat account: for resident Indian investors.",
      "Repatriable demat account: for NRIs who want to move funds abroad, linked to an NRE account.",
      "Non-repatriable demat account: for NRIs, linked to an NRO account.",
      "Basic Services Demat Account (BSDA): low-cost account for small holdings.",
    ] },
    { heading: "Documents Required", bullets: [
      "PAN card", "Aadhaar card (for address proof and e-sign)", "A cancelled cheque or bank statement",
      "Passport-size photograph", "Signature", "Income proof (only for F&O and commodity segments)",
    ] },
    { heading: "Conclusion", paragraphs: [
      "A demat account is the first step to investing in the Indian markets. Open one with Shree Varahi in minutes and start investing in stocks, IPOs, ETFs and mutual funds from a single account.",
    ] },
  ],
  faqs: [
    { q: "How do I open a demat account?", a: "Click 'Open Free Account', enter your mobile number and email, complete your KYC with PAN and Aadhaar, and e-sign the application. Your account is usually active within a day." },
    { q: "How long does it take to open a demat account?", a: "With online KYC and e-sign, most accounts are opened within 24 hours." },
    { q: "Can I have two demat accounts?", a: "Yes. You can hold demat accounts with different DPs, but only one per DP under the same PAN." },
    { q: "Is a demat account mandatory for mutual funds?", a: "No. You can hold mutual fund units in statement form, but holding them in demat lets you see all investments in one place." },
    { q: "What happens if I don't use my demat account?", a: "It may be marked dormant after a long period of inactivity. You can reactivate it by submitting a request to your DP." },
    { q: "Is my demat account safe?", a: "Yes. Securities are held with SEBI-regulated depositories (NSDL/CDSL), and every debit needs your authorisation through OTP or TPIN." },
  ],
}

/** Sample body for any other article, built from its title and topic. */
function genericArticle(title: string, topic: KcTopic): Omit<KcArticle, "slug" | "topicSlug" | "title"> {
  return {
    summary: `A quick guide to "${title}": what it means, why it matters and what to keep in mind as an investor.`,
    readMin: 4,
    updated: "20 Nov 2026",
    takeaways: [
      `Understand the basics of ${title.replace(/\?$/, "").toLowerCase()}.`,
      `See how it fits into your ${topic.title.toLowerCase()} decisions.`,
      "Know the common questions investors ask.",
    ],
    sections: [
      { heading: "Overview", paragraphs: [
        `This is sample content for "${title}". The final article will explain the concept in simple terms, with examples relevant to Indian investors.`,
        `${topic.desc}`,
      ] },
      { heading: "Why It Matters", paragraphs: [
        "Knowing this helps you make informed decisions, avoid common mistakes and use your Shree Varahi account more effectively.",
      ] },
      { heading: "Key Points", bullets: [
        "Point one of the article will appear here.",
        "Point two of the article will appear here.",
        "Point three of the article will appear here.",
      ] },
    ],
    faqs: [
      { q: `What is ${title.replace(/\?$/, "")}?`, a: "This answer is sample text. The final answer will explain the concept clearly in a few sentences." },
      { q: "Where can I learn more?", a: "Browse the other articles in this topic or reach out to our support team for help." },
    ],
  }
}

export function getArticle(topicSlug: string, articleSlug: string): KcArticle | null {
  const topic = getTopic(topicSlug)
  if (!topic) return null
  const item = getArticleList(topicSlug).find((a) => a.slug === articleSlug)
  if (!item) return null
  const body = topicSlug === "demat-account" && articleSlug === "what-is-demat-account" ? WHAT_IS_DEMAT : genericArticle(item.title, topic)
  return { slug: item.slug, topicSlug, title: item.title, ...body }
}

/** Previous / next article in the same topic, for the article page's navigation. */
export function getNeighbours(topicSlug: string, articleSlug: string) {
  const list = getArticleList(topicSlug)
  const i = list.findIndex((a) => a.slug === articleSlug)
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    index: i,
    total: list.length,
  }
}

// ── Search ──────────────────────────────────────────────────────────────────

export interface KcSearchHit { kind: "topic" | "article"; title: string; subtitle: string; href: string }

/** Every word of `query` must appear in the text (case-insensitive). */
const matches = (text: string, words: string[]) => {
  const t = text.toLowerCase()
  return words.every((w) => t.includes(w))
}

/** Topics and articles whose title (or topic description) matches the query. Titles that start with the query come first. */
export function searchKnowledge(query: string, limit = 8): KcSearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/)
  const hits: (KcSearchHit & { rank: number })[] = []
  for (const t of TOPICS) {
    if (matches(`${t.title} ${t.desc}`, words)) {
      hits.push({ kind: "topic", title: t.title, subtitle: "Topic", href: `/knowledge-center/${t.slug}`, rank: t.title.toLowerCase().startsWith(q) ? 0 : 2 })
    }
    for (const a of getArticleList(t.slug)) {
      if (matches(a.title, words)) {
        hits.push({ kind: "article", title: a.title, subtitle: t.title, href: `/knowledge-center/${t.slug}/${a.slug}`, rank: a.title.toLowerCase().startsWith(q) ? 1 : 3 })
      }
    }
  }
  return hits.sort((a, b) => a.rank - b.rank).slice(0, limit).map(({ rank: _rank, ...hit }) => hit)
}

# Shree Varahi — Web Platform

Marketing and product website for **Shree Varahi by Lakshmishree Investment & Securities Ltd.**, a SEBI-registered stockbroker (est. 1993). The site showcases the trading platform, products, pricing, and knowledge resources.

---

## Tech Stack

| Layer           | Choice                                                |
| --------------- | ----------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                               |
| Language        | TypeScript 5.7                                        |
| Styling         | Tailwind CSS v4                                       |
| Animation       | Framer Motion                                         |
| Components      | Radix UI + shadcn/ui                                  |
| Fonts           | Manrope (headings), DM Sans (body), DM Mono (numbers) |
| Analytics       | Vercel Analytics                                      |
| Package Manager | pnpm                                                  |

### Brand Tokens (CSS variables)

- `burgundy` — primary CTA color (`#8B0D19`)
- `gold` / `gold-deep` — accent color (`#D9B27C`)
- `cream` — warm background sections
- `profit` (green) / `loss` (red) — market colors

---

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, metadata, analytics
  page.tsx            # Homepage (/)
  globals.css         # Tailwind base + custom vars

components/
  navbar.tsx          # Fixed top nav with mega-dropdowns + search
  hero.tsx            # Scroll-animated laptop reveal section
  features-section.tsx     # Stacking feature cards (6 features)
  products-section.tsx     # 8 product cards grid
  trader-investor-section.tsx
  mtf-section.tsx          # MTF calculator + how-it-works
  brokerage-section.tsx    # ₹17 pricing + savings calculator
  trust-section.tsx        # Stats + trust pillars + testimonials
  knowledge-section.tsx    # Articles & webinar cards
  branch-locator.tsx
  partner-section.tsx
  faq-section.tsx          # Searchable accordion FAQ
  final-cta.tsx
  footer.tsx
  mobile-sticky-bar.tsx
  search-popup.tsx         # ⌘K command palette
  ticker-strip.tsx
  ui/                      # shadcn/ui primitives

lib/utils.ts          # cn() utility
hooks/                # use-mobile, use-toast
```

---

## Current Homepage Sections (in order)

1. **Navbar** — Fixed, scroll-aware, mega-dropdown for Trade/Invest, ⌘K search, mobile slide-out menu
2. **Hero** — "31 Years of Trust. One Powerful Platform." — scroll-driven 3D laptop lid animation
3. **Features** — Stacking sticky cards: Speed (80ms execution), Global Investing, Live Option Chain, Research Desk, SEBI Trust, MTF
4. **Products** — 8-card grid: Stocks, F&O, Mutual Funds, SIP, IPO, ETF, Commodities MCX, US Stocks
5. **Trader/Investor** — Segment selector section (not yet read in detail)
6. **MTF** — Margin Trading calculator (slider up to ₹5L → 4× power), step-by-step how-it-works, popular stocks
7. **Brokerage** — ₹17 flat pricing, comparison table vs. competitors, interactive savings calculator, "What's Free" list
8. **Trust** — Animated counters (60,000+ investors, 31 yrs, 50+ cities), 4 trust pillars, exchange logos, testimonial marquee
9. **Knowledge** — Category filter pills, featured live webinar card, article/video grid
10. **Branch Locator** — Physical branches section
11. **Partner** — Partner program section
12. **FAQ** — Searchable accordion in two columns: "Trading & Pricing" and "Account & Products"
13. **Final CTA** — Bottom conversion section
14. **Footer** — 5-column with links, social icons, exchange logos, SEBI disclaimer
15. **Mobile Sticky Bar** — Bottom fixed bar for mobile CTAs

---

## Pages to Build (Inner Pages)

All pages share the `<Navbar />` and `<Footer />` from the homepage layout.

### Trade Pages (`/trade/...`)

| Route                     | Page                    | Key Sections                                                     |
| ------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `/trade/trading-app`      | Trading App             | App features, screenshots, download links (iOS/Android)          |
| `/trade/web-terminal`     | Web Terminal            | Platform walkthrough, charts demo, feature list                  |
| `/trade/options-trader`   | Options Trader          | Option chain UI, strategy builder, Greeks explainer              |
| `/trade/algo-api`         | Algo & API              | API docs preview, Python/JS SDK snippets, rate limits, use cases |
| `/trade/intraday`         | Stocks Intraday         | Intraday tools, margin info, circuit filters                     |
| `/trade/futures`          | Futures                 | Contract specs, margin calculator, rollover guide                |
| `/trade/mtf`              | Margin Trading Facility | Full dedicated MTF page (expand homepage section)                |
| `/trade/commodities`      | Commodities MCX         | MCX product list, gold/silver/crude, timing                      |
| `/trade/global-investing` | Global Investing        | US stocks access, remittance flow, FEMA LRS info                 |
| `/trade/stock-screener`   | Stock Screener          | Filter UI mockup, parameter list                                 |

### Invest Pages (`/invest/...`)

| Route                  | Page            | Key Sections                                            |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `/invest/stocks`       | Stocks Delivery | ₹0 brokerage hero, long-term investing pitch, CDSL info |
| `/invest/mutual-funds` | Mutual Funds    | Direct vs regular, top funds, SIP entry point           |
| `/invest/sip`          | SIP Auto-Invest | SIP calculator, step setup, fund categories             |
| `/invest/ipo`          | IPO             | Upcoming IPOs table, how to apply, GMP tracker          |
| `/invest/etf`          | ETF             | ETF types, index funds, low-cost pitch                  |
| `/invest/nfo`          | NFO             | New Fund Offers, AMC list, NFO calendar                 |
| `/invest/digital-gold` | Digital Gold    | 24K gold from ₹1, storage info, buy/sell flow           |
| `/invest/us-stocks`    | US Stocks       | Same as `/trade/global-investing` (can share)           |

### Markets & Tools (`/markets/...`)

| Route                       | Page             | Key Sections                                                       |
| --------------------------- | ---------------- | ------------------------------------------------------------------ |
| `/markets`                  | Markets Overview | Index tiles (Nifty, Sensex, BankNifty, Gold, Crude), market status |
| `/markets/screener`         | Stock Screener   | Filter UI: sector, market cap, PE, volume, technicals              |
| `/markets/option-chain`     | Option Chain     | Live chain table, OI chart, PCR, max pain                          |
| `/markets/strategy-builder` | Strategy Builder | Multi-leg builder, payoff graph, pre-built strategies              |
| `/markets/news`             | Market News      | News feed by category, source attribution                          |

### Research (`/research/...`)

| Route                | Page             | Key Sections                                    |
| -------------------- | ---------------- | ----------------------------------------------- |
| `/research`          | Research Hub     | Landing with featured report + upcoming webinar |
| `/research/reports`  | Research Reports | Daily/weekly reports grid, download CTAs        |
| `/research/webinars` | Webinars         | Upcoming + recorded sessions, speaker profiles  |

### Knowledge (`/knowledge/...`)

| Route               | Page             | Key Sections                                          |
| ------------------- | ---------------- | ----------------------------------------------------- |
| `/knowledge`        | Knowledge Center | Expand homepage section into full hub                 |
| `/knowledge/[slug]` | Article Detail   | MDX article, reading time, category, related articles |

### Company Pages

| Route       | Page            | Key Sections                                             |
| ----------- | --------------- | -------------------------------------------------------- |
| `/about`    | About Us        | Lakshmishree history (1993), founders, timeline, mission |
| `/careers`  | Careers         | Open roles, culture, benefits, apply form                |
| `/press`    | Press           | Media mentions, press kit download, brand assets         |
| `/branches` | Branch Locator  | Map + city-wise branch list, address/contact             |
| `/partner`  | Partner Program | Sub-broker info, revenue sharing, onboarding steps       |
| `/contact`  | Contact Us      | Form + helpline (022-4080-8080) + email + chat widget    |

### Auth & Account

| Route           | Page              | Notes                                     |
| --------------- | ----------------- | ----------------------------------------- |
| `/open-account` | Open Free Account | e-KYC flow landing — Aadhaar, PAN, selfie |
| `/login`        | Login             | Redirect to app or inline form            |

---

## Navbar Navigation Map

**Trade dropdown** (2-col grid, 10 items):  
Trading App · Web Terminal · Options Trader · Algo & API · Global Investing · Stocks Intraday · Futures · MTF · Commodities · Stock Screener

**Invest dropdown** (2-col grid, 8 items):  
Stocks Delivery · Mutual Funds · SIP · IPO · ETF · NFO · Digital Gold · Global Investing

**Markets**, **Research**, **Knowledge** — currently no dropdown; wire to their respective routes.

---

## Design System Notes

- **Border radius**: `rounded-[5px]` is the project standard — use this consistently across all inner pages, not `rounded-md` or `rounded-lg`.
- **Section dividers**: Gold gradient strip `h-px bg-gradient-to-r from-transparent via-gold to-transparent` between every major section.
- **Section headers**: Eyebrow in `text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold`, then `h2` with `text-balance` and a `text-burgundy` highlight span.
- **Animations**: Use Framer Motion `whileInView` with `once: true` for scroll reveals. Use `initial={{ opacity: 0, y: 20 }}`.
- **Cards**: White background `bg-white border border-border rounded-[5px]` with `hover:shadow-md hover:border-gold/50`.
- **Primary CTA button**: `bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]`.
- **Backgrounds**: Alternate between `bg-background` (white), `bg-secondary/30`, and `bg-cream` across sections.

---

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
```

---

## Key Brand Info (for copy)

- **Full legal name**: Lakshmishree Investment & Securities Ltd.
- **SEBI Reg**: INZ000215633
- **NSE Member ID**: 14136 | **BSE**: 6736 | **MCX**: 46685
- **CDSL DP ID**: IN-DP-596-2021
- **Founded**: 1993 (CIN: U67120MH1993PLC074454)
- **Helpline**: 022-4080-8080
- **Email**: support@shreevarahi.com
- **Key stats**: 60,000+ investors, 31 years, 50+ branches, 200+ professionals, 4.5★ app rating, 99.9% uptime
- **Pricing**: ₹0 delivery, ₹17 flat intraday/F&O/commodities/currency
- **MTF**: Up to 4× leverage, 1,700+ eligible stocks, from 0.049%/day interest

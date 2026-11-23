// News sample data (UI preview only, no API yet).
// Two stories per CMOTS Live News section, newest first. `tag` holds the section name, the way CMOTS sends
// `section_name`. Headlines are generic on purpose (no real companies), so nothing reads as real news.
// When the API is integrated, replace SAMPLE_NEWS with the fetched stories; the pages only read these helpers.

import type { StockNewsItem } from "@/lib/stocks/types"

type Seed = [section: string, headline: string, caption: string, minutesAgo: number]

const SEEDS: Seed[] = [
  ["Pre Session",       "Nifty likely to open flat amid mixed global cues",                          "Traders watch crude oil prices and foreign fund flows ahead of the opening bell.", 20],
  ["Hot Pursuit",       "Mid cap IT stock jumps after winning a multi year deal",                    "The counter rose sharply in early trade on heavy volumes.", 45],
  ["Market Beat",       "Benchmarks trade near the day's high, banks lead the gains",                "Broader markets also advanced, with the mid cap index outperforming.", 70],
  ["IPO News",          "SME issue subscribed 12 times on the final day of bidding",                 "Retail investors led the demand, followed by non institutional investors.", 95],
  ["Corporate News",    "Infrastructure firm bags order worth ₹850 crore",                           "The order is to be executed over the next 24 months.", 120],
  ["Mid Session",       "Market extends gains in mid session, Nifty above key level",                "Buying in financials and auto stocks supported the indices.", 150],
  ["Stock Alert",       "Pharma stock hits a fresh 52 week high",                                    "The stock has gained about 18% in the past month.", 175],
  ["Forex News",        "Rupee trades steady against the dollar in early deals",                    "Dealers said importer demand for dollars capped gains in the local unit.", 200],
  ["Bullion",           "Gold prices edge higher as the dollar softens",                             "Silver also traded firm on the commodity exchange.", 230],
  ["Derivatives News",  "Nifty open interest builds up at higher strikes ahead of expiry",           "Put writers were active at lower strikes, data showed.", 260],
  ["Corporate Results", "Consumer goods company reports 14% rise in quarterly net profit",           "Revenue from operations grew on the back of volume led demand.", 290],
  ["Foreign Markets",   "Asian markets trade mixed after a strong close on Wall Street",             "Investors await key economic data from major economies this week.", 320],
  ["Economy News",      "Retail inflation eases for the second straight month",                      "Lower food prices pulled down the headline number.", 360],
  ["Commodity News",    "Crude oil prices slip on higher inventory data",                            "Base metals traded mixed on the commodity exchange.", 400],
  ["Mutual Fund News",  "Equity mutual fund inflows stay strong, SIP book at a new high",            "Flexi cap and small cap categories saw the highest inflows.", 440],
  ["End Session",       "Sensex and Nifty end higher for the third straight session",                "Market breadth was positive, with advances outnumbering declines.", 480],
  ["Quick Review",      "Quick review: banks and autos lift the market, metals lag",                 "A look at the top sectoral movers and key levels for the next session.", 520],
  ["Pre Session",       "Indices may open higher tracking positive Asian cues",                      "Global cues and currency movement are likely to set the tone.", 1460],
  ["Hot Pursuit",       "Auto ancillary stock slides after weak volume guidance",                    "The management lowered its volume outlook for the current year.", 1500],
  ["Market Beat",       "Market slips into the red as profit booking emerges",                       "IT and metal stocks were the top drags on the indices.", 1540],
  ["IPO News",          "Mainboard IPO to open next week, price band fixed",                         "The issue comprises a fresh issue and an offer for sale.", 1580],
  ["Corporate News",    "Board approves a share buyback at a premium to market price",               "The record date for the buyback will be announced later.", 1620],
  ["Mid Session",       "Market trades lower in mid session, realty stocks under pressure",          "Volatility rose as traders trimmed positions ahead of the weekend.", 1660],
  ["Stock Alert",       "Small cap stock locked in upper circuit on order win",                      "Buy orders far exceeded sell orders on the exchange.", 1700],
  ["Forex News",        "Rupee weakens as crude oil prices firm up",                                 "Foreign fund outflows also weighed on the currency.", 1740],
  ["Bullion",           "Silver prices fall as industrial demand outlook weakens",                   "Gold traded in a narrow range during the session.", 1780],
  ["Derivatives News",  "Bank Nifty options see heavy put writing at lower strikes",                 "Traders rolled over positions to the next series.", 1820],
  ["Corporate Results", "Cement maker posts higher quarterly revenue on strong volumes",             "Operating margins improved on lower fuel costs.", 1860],
  ["Foreign Markets",   "European stocks open higher led by technology shares",                     "Bond yields eased after central bank commentary.", 1900],
  ["Economy News",      "Government infrastructure spending rises in the first half",                "Capital expenditure is tracking ahead of the annual target.", 1940],
  ["Commodity News",    "Copper prices rise on supply concerns",                                     "Aluminium and zinc also traded higher.", 1980],
  ["Mutual Fund News",  "New fund offer for an index fund opens for subscription",                   "The scheme will track a broad market index.", 2020],
  ["End Session",       "Market ends lower as IT and metal stocks drag",                             "The volatility index rose during the session.", 2060],
  ["Quick Review",      "Quick review: midcaps outperform as the broader market rallies",            "Sector performance and the stocks that moved the most today.", 2100],
]

// Fixed "now" so server and browser render the same times (sample data only).
const NOW = new Date("2026-11-23T15:30:00+05:30").getTime()

const isoIst = (ms: number) => {
  const d = new Date(ms + 5.5 * 3600 * 1000)
  return `${d.toISOString().slice(0, 19)}+05:30`
}

export const SAMPLE_NEWS: StockNewsItem[] = SEEDS.map(([section, headline, caption, minutesAgo], i) => {
  const text = [
    caption,
    "This is sample text for the story. The full news report will appear here once live news is connected.",
    "Investments in securities markets are subject to market risks; read all related documents carefully before investing.",
  ].join("\n\n")
  return {
    id: `sample-${i + 1}`,
    tag: section,
    headline,
    caption,
    body: null,
    text,
    publishedAt: isoIst(NOW - minutesAgo * 60 * 1000),
  }
})

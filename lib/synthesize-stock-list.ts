import type { StockRow, StockListPageData } from "@/components/stock-list-page"

// Curated real-company pools so synthesized lists still show recognizable
// names appropriate to the theme, instead of generic placeholders.
const POOLS: Record<string, string[]> = {
  bank: ["HDFC Bank|HDFCBANK", "ICICI Bank|ICICIBANK", "State Bank of India|SBIN", "Axis Bank|AXISBANK", "Kotak Mahindra Bank|KOTAKBANK", "Bank of Baroda|BANKBARODA", "IndusInd Bank|INDUSINDBK", "Punjab National Bank|PNB", "IDFC First Bank|IDFCFIRSTB", "AU Small Finance Bank|AUBANK", "Federal Bank|FEDERALBNK", "Bandhan Bank|BANDHANBNK"],
  it: ["TCS|TCS", "Infosys|INFY", "HCL Technologies|HCLTECH", "Wipro|WIPRO", "Tech Mahindra|TECHM", "LTIMindtree|LTIM", "Persistent Systems|PERSISTENT", "Coforge|COFORGE", "Mphasis|MPHASIS", "L&T Technology Services|LTTS"],
  fmcg: ["Hindustan Unilever|HINDUNILVR", "ITC|ITC", "Nestle India|NESTLEIND", "Britannia Industries|BRITANNIA", "Dabur India|DABUR", "Godrej Consumer Products|GODREJCP", "Marico|MARICO", "Tata Consumer Products|TATACONSUM", "Varun Beverages|VBL", "Colgate-Palmolive|COLPAL"],
  auto: ["Maruti Suzuki|MARUTI", "Tata Motors|TATAMOTORS", "Mahindra & Mahindra|M&M", "Bajaj Auto|BAJAJ-AUTO", "Eicher Motors|EICHERMOT", "Hero MotoCorp|HEROMOTOCO", "TVS Motor|TVSMOTOR", "Ashok Leyland|ASHOKLEY", "Bharat Forge|BHARATFORG", "MRF|MRF"],
  pharma: ["Sun Pharma|SUNPHARMA", "Dr Reddy's Labs|DRREDDY", "Cipla|CIPLA", "Divi's Laboratories|DIVISLAB", "Torrent Pharmaceuticals|TORNTPHARM", "Zydus Lifesciences|ZYDUSLIFE", "Aurobindo Pharma|AUROPHARMA", "Lupin|LUPIN", "Alkem Laboratories|ALKEM", "Biocon|BIOCON"],
  energy: ["Reliance Industries|RELIANCE", "NTPC|NTPC", "Power Grid Corporation|POWERGRID", "Indian Oil Corporation|IOC", "ONGC|ONGC", "Coal India|COALINDIA", "Tata Power|TATAPOWER", "Adani Power|ADANIPOWER", "JSW Energy|JSWENERGY", "Adani Green Energy|ADANIGREEN"],
  power: ["NTPC|NTPC", "Power Grid Corporation|POWERGRID", "Tata Power|TATAPOWER", "Adani Power|ADANIPOWER", "JSW Energy|JSWENERGY", "NHPC|NHPC", "Adani Energy Solutions|ADANIENSOL", "CESC|CESC"],
  metal: ["Tata Steel|TATASTEEL", "JSW Steel|JSWSTEEL", "Hindalco Industries|HINDALCO", "Vedanta|VEDL", "Jindal Steel & Power|JINDALSTEL", "NALCO|NATIONALUM", "SAIL|SAIL", "Hindustan Zinc|HINDZINC"],
  realty: ["DLF|DLF", "Godrej Properties|GODREJPROP", "Oberoi Realty|OBEROIRLTY", "Prestige Estates|PRESTIGE", "Phoenix Mills|PHOENIXLTD", "Macrotech Developers|LODHA", "Brigade Enterprises|BRIGADE", "Sobha|SOBHA"],
  finance: ["Bajaj Finance|BAJFINANCE", "Bajaj Finserv|BAJAJFINSV", "HDFC Life Insurance|HDFCLIFE", "SBI Life Insurance|SBILIFE", "Cholamandalam Investment|CHOLAFIN", "Shriram Finance|SHRIRAMFIN", "Power Finance Corp|PFC", "REC|RECLTD"],
  chemical: ["Pidilite Industries|PIDILITIND", "SRF|SRF", "Deepak Nitrite|DEEPAKNTR", "Aarti Industries|AARTIIND", "PI Industries|PIIND", "Navin Fluorine|NAVINFLUOR", "Tata Chemicals|TATACHEM"],
  engineering: ["Larsen & Toubro|LT", "Siemens|SIEMENS", "ABB India|ABB", "Cummins India|CUMMINSIND", "Thermax|THERMAX", "BHEL|BHEL", "Bharat Electronics|BEL"],
  cement: ["UltraTech Cement|ULTRACEMCO", "Ambuja Cements|AMBUJACEM", "ACC|ACC", "Shree Cement|SHREECEM", "JK Cement|JKCEMENT", "Dalmia Bharat|DALBHARAT"],
  petroleum: ["Reliance Industries|RELIANCE", "Indian Oil Corporation|IOC", "Bharat Petroleum|BPCL", "Hindustan Petroleum|HINDPETRO", "Oil India|OIL", "Chennai Petroleum|CHENNPETRO"],
  large: ["Reliance Industries|RELIANCE", "HDFC Bank|HDFCBANK", "TCS|TCS", "Bharti Airtel|BHARTIARTL", "ICICI Bank|ICICIBANK", "Infosys|INFY", "State Bank of India|SBIN", "Bajaj Finance|BAJFINANCE", "Hindustan Unilever|HINDUNILVR", "ITC|ITC"],
  mid: ["Page Industries|PAGEIND", "PI Industries|PIIND", "Voltas|VOLTAS", "Persistent Systems|PERSISTENT", "Federal Bank|FEDERALBNK", "Indian Hotels|INDHOTEL", "Trent|TRENT", "Coforge|COFORGE"],
  small: ["Redington|REDINGTON", "KPIT Technologies|KPITTECH", "Sonata Software|SONATSOFTW", "Blue Star|BLUESTARCO", "Elgi Equipments|ELGIEQUIP", "Route Mobile|ROUTE"],
  micro: ["Ganesha Ecosphere|GANECOS", "Vaibhav Global|VAIBHAVGBL", "Sarda Energy|SARDAEN", "Rossari Biotech|ROSSARI", "MTAR Technologies|MTARTECH", "Genus Power Infra|GENUSPOWER"],
  nano: ["Sirca Paints|SIRCA", "Shivalik Bimetal|SHIVALIK", "Rajratan Global Wire|RAJRATAN", "Uniparts India|UNIPARTS", "Bhansali Engineering|BEPL"],
  group: ["Tata Motors|TATAMOTORS", "Tata Steel|TATASTEEL", "Tata Power|TATAPOWER", "Tata Consumer Products|TATACONSUM", "Titan Company|TITAN", "TCS|TCS"],
  gainers: ["Adani Power|ADANIPOWER", "IRFC|IRFC", "Suzlon Energy|SUZLON", "Vodafone Idea|IDEA", "Zomato|ETERNAL", "Yes Bank|YESBANK"],
  default: ["Reliance Industries|RELIANCE", "TCS|TCS", "HDFC Bank|HDFCBANK", "ICICI Bank|ICICIBANK", "Infosys|INFY", "State Bank of India|SBIN", "ITC|ITC", "Bharti Airtel|BHARTIARTL", "Bajaj Finance|BAJFINANCE", "Hindustan Unilever|HINDUNILVR"],
}

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}
function rnd(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

function pickPool(slug: string): string[] {
  for (const key of Object.keys(POOLS)) {
    if (key !== "default" && slug.includes(key)) return POOLS[key]
  }
  return POOLS.default
}

export function titleFromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function synthesizeStockList(
  slug: string,
  opts: { crumbCategory: string; titleOverride?: string; description?: string; priceRange?: [number, number]; mcapRange?: [number, number] } = { crumbCategory: "Market Cap" }
): StockListPageData {
  const h = hashSlug(slug)
  const pool = pickPool(slug)
  const [pMin, pMax] = opts.priceRange ?? [60, 5000]
  const [mMin, mMax] = opts.mcapRange ?? [3000, 1500000]

  const stocks: StockRow[] = pool.map((entry, i) => {
    const [name, symbol] = entry.split("|")
    const seed = h + i * 97
    const ltp = Math.round(rnd(seed, pMin, pMax) * 100) / 100
    const chg = Math.round(rnd(seed + 1, -3.2, 3.2) * 100) / 100
    const pe = Math.round(rnd(seed + 2, 8, 45) * 100) / 100
    const high52 = Math.round(ltp * rnd(seed + 3, 1.08, 1.55) * 100) / 100
    const low52 = Math.round(ltp * rnd(seed + 4, 0.55, 0.9) * 100) / 100
    return {
      name, symbol, ltp, chg,
      volume: `${Math.round(rnd(seed + 5, 1, 99))},${Math.round(rnd(seed + 6, 10, 99))},${Math.round(rnd(seed + 7, 100, 999))}`,
      mcap: Math.round(rnd(seed + 8, mMin, mMax)).toLocaleString("en-IN"),
      pe, industryPe: Math.round(rnd(seed + 9, 10, 40) * 100) / 100,
      high52, low52,
      ret1m: Math.round(rnd(seed + 10, -8, 12) * 100) / 100,
      ret3m: Math.round(rnd(seed + 11, -15, 20) * 100) / 100,
      ret1y: Math.round(rnd(seed + 12, -35, 90) * 100) / 100,
      ret3y: Math.round(rnd(seed + 13, -20, 260) * 100) / 100,
      ret5y: Math.round(rnd(seed + 14, -10, 550) * 100) / 100,
      pb: Math.round(rnd(seed + 15, 0.7, 10) * 100) / 100,
      divYield: Math.round(rnd(seed + 16, 0, 3.5) * 100) / 100,
      roe: Math.round(rnd(seed + 17, 4, 42) * 100) / 100,
      roce: Math.round(rnd(seed + 18, 4, 40) * 100) / 100,
      eps: Math.round((ltp / pe) * 100) / 100,
      dma50: Math.round(ltp * rnd(seed + 19, 0.94, 1.06) * 100) / 100,
      dma200: Math.round(ltp * rnd(seed + 20, 0.85, 1.15) * 100) / 100,
      rsi: Math.round(rnd(seed + 21, 28, 72) * 100) / 100,
      mtf: Math.round(rnd(seed + 22, 55, 78)),
      pledge: Math.round(rnd(seed + 23, 75, 91) * 100) / 100,
    }
  })

  const title = opts.titleOverride ?? titleFromSlug(slug)
  return {
    slug,
    crumbCategory: opts.crumbCategory,
    title,
    lastUpdated: "13 Jul 2026 at 12:21",
    description: opts.description ?? `A curated list of stocks under "${title}" — covering price, market cap, valuation ratios, and return metrics to help you make informed investment decisions.`,
    stocks,
  }
}

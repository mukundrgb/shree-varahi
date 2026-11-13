// Groups CMOTS sector names into the category filters on the All Stocks table.

/**
 * Checked in order against the CMOTS sector name; the first match wins. A sector that
 * matches none of these becomes its own category, so new CMOTS sectors still get a filter.
 */
const CATEGORY_PATTERNS: [category: string, pattern: RegExp][] = [
  ["Banking", /\bbanks?\b|\bbanking\b/i],
  ["Finance", /\bnbfc\b|financ|insurance|stock ?broking/i],
  ["IT", /^it\b|\bit - |information technology|software|computer/i],
  ["Auto", /\bauto|tyres?\b/i],
  ["Pharma", /pharma|healthcare|hospital|\bdrugs?\b/i],
  ["FMCG", /fmcg|tobacco|personal care|consumer food/i],
  ["Power", /\bpower\b/i],
  ["Oil & Gas", /\boil\b|\bgas\b|refiner|petrochem|crude/i],
  ["Chemicals", /chemical|fertili[sz]er|paints?|dyes|pigment/i],
  ["Capital Goods", /capital goods|bearings|castings|forgings|engineering/i],
  ["Cement", /cement/i],
  ["Realty & Infra", /realty|infrastructure|construction/i],
  ["Metals", /steel|metal|mining|alumin/i],
  ["Textiles", /textile|leather/i],
  ["Consumer Durables", /consumer durables|electronics|dry cells/i],
  ["Telecom", /telecom/i],
  ["Media", /entertainment|media/i],
  ["Hotels", /hotel|restaurant/i],
  ["Agri & Plantation", /sugar|plantation|tea\b/i],
  ["Packaging & Paper", /packaging|paper|plastic|glass/i],
  ["Logistics", /shipping|logistics|transport/i],
  ["Trading & Retail", /trading|retail/i],
]

export const OTHER_CATEGORY = "Others"
const OTHER_SECTORS = /^(miscellaneous|diversified|—)?$/i

export function toCategory(sector: string | null | undefined, industry: string | null | undefined): string {
  const name = sector?.trim() ?? ""
  for (const [category, pattern] of CATEGORY_PATTERNS) {
    if (pattern.test(name)) return category
  }
  // Some sectors are only identifiable from the industry, such as banks in "Finance".
  const industryName = industry?.trim() ?? ""
  for (const [category, pattern] of CATEGORY_PATTERNS) {
    if (pattern.test(industryName)) return category
  }
  return OTHER_SECTORS.test(name) ? OTHER_CATEGORY : name
}

/** Categories that have at least one company, alphabetical with Others last. */
export function listCategories(categories: string[]): string[] {
  return [...new Set(categories)].sort((a, b) =>
    a === OTHER_CATEGORY ? 1 : b === OTHER_CATEGORY ? -1 : a.localeCompare(b),
  )
}

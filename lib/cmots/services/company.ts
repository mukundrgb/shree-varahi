// CompanyMaster and CompanyProfile calls; stock URL slug to company lookup.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import snapshot from "../data/company-master.snapshot.json"
import { CMOTS_ENDPOINTS } from "../endpoints"
import { CmotsError } from "../errors"
import type { CmotsCompany, CmotsCompanyProfile } from "../types/company"
import type { CapCategory } from "@/lib/stocks/types"

export interface CompanyRecord {
  coCode: number
  slug: string
  symbol: string
  name: string
  sector: string
  sectorCode: string | null
  industry: string
  exchange: string
  capCategory: CapCategory | null
  capLabel: string | null
}

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

/** Site links also use forms like reliance-industries-ltd-share-price. */
function toLookupKey(slug: string): string {
  return slug.replace(/-share-price$/, "").replace(/-(ltd|limited)$/, "")
}

function toCapCategory(capType: string | null): CapCategory | null {
  const match = /^(large|mid|small)/i.exec(capType?.trim() ?? "")
  return match ? (match[1].toLowerCase() as CapCategory) : null
}

function toCompanyRecord(company: CmotsCompany): CompanyRecord {
  const name = company.CompanyName.trim()
  const symbol =
    company.NSESymbol?.trim() || company.BSECode?.trim() || company.CompanyShortName?.trim() || name

  return {
    // CMOTS can send co_code as a float, such as 476.0.
    coCode: Math.trunc(company.co_code),
    slug: toSlug(symbol),
    symbol,
    name,
    sector: company.SectorName?.trim() || "—",
    sectorCode: company.SectorCode?.trim() || null,
    industry: company.industryname?.trim() || "",
    exchange: [company.NSEListed === "Yes" && "NSE", company.BSEListed === "Yes" && "BSE"]
      .filter(Boolean)
      .join(", "),
    capCategory: toCapCategory(company.mcaptype),
    capLabel: company.mcaptype?.trim() || null,
  }
}

interface CompanyIndex {
  live: CmotsCompany[]
  companies: CompanyRecord[]
  bySlug: Map<string, CompanyRecord>
}

let index: CompanyIndex | null = null

function buildIndex(live: CmotsCompany[]): CompanyIndex {
  const merged = new Map<number, CmotsCompany>()
  for (const company of [...(snapshot as CmotsCompany[]), ...live]) {
    merged.set(Math.trunc(company.co_code), company)
  }

  const companies = [...merged.values()]
    .filter((company) => company.NSEListed === "Yes" || company.BSEListed === "Yes")
    .map(toCompanyRecord)

  const bySlug = new Map<string, CompanyRecord>()
  const add = (key: string, company: CompanyRecord) => {
    const lookupKey = toLookupKey(toSlug(key))
    if (lookupKey && !bySlug.has(lookupKey)) bySlug.set(lookupKey, company)
  }

  // Symbols go first so they always win over a matching company name.
  for (const company of companies) add(company.symbol, company)
  for (const company of companies) {
    add(company.name, company)
    add(`${company.symbol} ${company.name}`, company)
  }
  return { live, companies, bySlug }
}

/**
 * CompanyMaster currently returns a random block of 30 companies per call and ignores
 * paging, so a live response can't be the full list or reliably contain a given stock.
 * It is merged with a stored snapshot to keep the list and stock URLs stable. Remove
 * the snapshot once CMOTS returns every company.
 */
async function getCompanyIndex(): Promise<CompanyIndex> {
  let live: CmotsCompany[]
  try {
    live = await cmotsGet<CmotsCompany>(CMOTS_ENDPOINTS.companyMaster(), CACHE_TTL.master)
  } catch (error) {
    if (error instanceof CmotsError && error.fatal) throw error
    live = index?.live ?? []
  }
  if (!index || index.live !== live) index = buildIndex(live)
  return index
}

export async function getCompanies(): Promise<CompanyRecord[]> {
  return (await getCompanyIndex()).companies
}

export async function findCompany(slug: string): Promise<CompanyRecord> {
  const { bySlug } = await getCompanyIndex()
  const company = bySlug.get(toLookupKey(toSlug(slug)))
  if (!company) throw new CmotsError("Stock not found", 404)
  return company
}

export async function getCompanyProfile(coCode: number): Promise<CmotsCompanyProfile | undefined> {
  const rows = await cmotsGet<CmotsCompanyProfile>(CMOTS_ENDPOINTS.companyProfile(coCode), CACHE_TTL.profile)
  return rows[0]
}

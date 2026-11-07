// Corporate news calls.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import { CMOTS_ENDPOINTS } from "../endpoints"
import type { CmotsNews } from "../types/news"

/** News can't be filtered by company, so a wider set is fetched to match against. */
const RECORD_COUNT = 100

export function getCorporateNews() {
  return cmotsGet<CmotsNews>(CMOTS_ENDPOINTS.corporateNews(RECORD_COUNT), CACHE_TTL.news)
}

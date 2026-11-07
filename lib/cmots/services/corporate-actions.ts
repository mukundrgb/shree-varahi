// Dividend, Bonus and Split calls.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import { CMOTS_ENDPOINTS } from "../endpoints"
import type { CmotsBonus, CmotsDividend, CmotsSplit } from "../types/corporate-actions"

const RECORD_COUNT = 10

export async function getCorporateActions(coCode: number) {
  const ttl = CACHE_TTL.corporateActions
  const [dividends, bonuses, splits] = await Promise.all([
    cmotsGet<CmotsDividend>(CMOTS_ENDPOINTS.dividends(coCode, RECORD_COUNT), ttl),
    cmotsGet<CmotsBonus>(CMOTS_ENDPOINTS.bonuses(coCode, RECORD_COUNT), ttl),
    cmotsGet<CmotsSplit>(CMOTS_ENDPOINTS.splits(coCode, RECORD_COUNT), ttl),
  ])
  return { dividends, bonuses, splits }
}

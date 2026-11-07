// Picks peer companies for the Peers tab and Related Stocks list.

import type { CompanyRecord } from "../services/company"
import { byCapThenName } from "./stock-list"

const MAX_PEERS = 5

export function selectPeers(companies: CompanyRecord[], current: CompanyRecord): CompanyRecord[] {
  if (!current.sectorCode) return []
  return companies
    .filter((company) => company.sectorCode === current.sectorCode && company.coCode !== current.coCode)
    .sort(byCapThenName)
    .slice(0, MAX_PEERS)
}

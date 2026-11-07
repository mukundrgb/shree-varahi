// Company logo calls. A missing logo never fails a page; the UI shows initials instead.
// CompanyMasterLogo is skipped because it lists only some of the companies with logos.

import "server-only"
import { cmotsGet } from "../client"
import { CACHE_TTL } from "../config"
import { CMOTS_ENDPOINTS } from "../endpoints"
import type { CmotsLogo } from "../types/logo"

export async function getLogoUrl(coCode: number): Promise<string | null> {
  try {
    const rows = await cmotsGet<CmotsLogo>(CMOTS_ENDPOINTS.logo(coCode), CACHE_TTL.logo)
    return rows[0]?.Filepath?.trim() || null
  } catch {
    return null
  }
}

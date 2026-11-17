// Loads the whole IPO page (open, upcoming and recently closed) from the backend.

import { ipoApi } from "@/lib/ipo/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useIpoPage(type: "all" | "mainboard" | "sme" = "all") {
  return useApiResource(type, (signal) => ipoApi.page(type, signal))
}

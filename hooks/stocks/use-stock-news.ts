// Loads the Latest News section.

import { stocksApi } from "@/lib/stocks/api-client"
import { useApiResource } from "@/hooks/use-api-resource"

export function useStockNews(slug: string) {
  return useApiResource(slug, (signal) => stocksApi.news(slug, signal))
}

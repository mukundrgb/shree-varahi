// Loads the Latest News section.

import { stocksApi } from "@/lib/stocks/api-client"
import { useStockResource } from "./use-stock-resource"

export function useStockNews(slug: string) {
  return useStockResource(slug, (signal) => stocksApi.news(slug, signal))
}

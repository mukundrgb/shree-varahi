// GET /api/stocks: All Stocks table.

import { toErrorResponse } from "@/lib/cmots/errors"
import { listStocks } from "@/lib/cmots/services/stocks"
import { STOCK_SORTS, type StockSort } from "@/lib/stocks/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get("sort")
  try {
    const data = await listStocks({
      page: Number(searchParams.get("page")) || 1,
      search: searchParams.get("search") ?? undefined,
      sector: searchParams.get("sector") ?? undefined,
      cap: searchParams.get("cap") ?? undefined,
      sort: STOCK_SORTS.includes(sort as StockSort) ? (sort as StockSort) : undefined,
    })
    return Response.json({ success: true, data })
  } catch (error) {
    return toErrorResponse(error)
  }
}

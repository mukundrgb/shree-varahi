// GET /api/stocks: All Stocks table.

import { toErrorResponse } from "@/lib/cmots/errors"
import { listStocks } from "@/lib/cmots/services/stocks"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  try {
    const data = await listStocks({
      page: Number(searchParams.get("page")) || 1,
      search: searchParams.get("search") ?? undefined,
      sector: searchParams.get("sector") ?? undefined,
      cap: searchParams.get("cap") ?? undefined,
    })
    return Response.json({ success: true, data })
  } catch (error) {
    return toErrorResponse(error)
  }
}

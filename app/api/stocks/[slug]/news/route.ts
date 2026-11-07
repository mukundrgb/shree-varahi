// GET /api/stocks/[slug]/news: Latest News section.

import { toErrorResponse } from "@/lib/cmots/errors"
import { getStockNews } from "@/lib/cmots/services/stocks"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    return Response.json({ success: true, data: await getStockNews(slug) })
  } catch (error) {
    return toErrorResponse(error)
  }
}

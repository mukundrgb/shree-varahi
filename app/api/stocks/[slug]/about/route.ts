// GET /api/stocks/[slug]/about: About tab.

import { toErrorResponse } from "@/lib/cmots/errors"
import { getStockAbout } from "@/lib/cmots/services/stocks"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    return Response.json({ success: true, data: await getStockAbout(slug) })
  } catch (error) {
    return toErrorResponse(error)
  }
}

// GET /api/stocks/[slug]/financials?period=quarterly|yearly&type=standalone|consolidated: Financials tab.

import { CmotsError, toErrorResponse } from "@/lib/cmots/errors"
import { getStockFinancials } from "@/lib/cmots/services/stocks"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period")
  const type = searchParams.get("type")

  try {
    if ((period !== "quarterly" && period !== "yearly") || (type !== "standalone" && type !== "consolidated")) {
      throw new CmotsError("Invalid period or type", 400)
    }
    const { slug } = await params
    return Response.json({ success: true, data: await getStockFinancials(slug, period, type) })
  } catch (error) {
    return toErrorResponse(error)
  }
}

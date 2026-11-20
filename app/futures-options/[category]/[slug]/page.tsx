"use client"

import { notFound, useParams } from "next/navigation"
import { FnoDetailPage } from "@/components/fno-detail-page"
import { isFnoCategory } from "@/lib/fno/api-client"

// /futures-options/index-futures/nifty, /futures-options/stock-options/reliance …
// One page per underlying in the Markets tabs on /futures-options.
export default function FnoDetailRoute() {
  const params = useParams<{ category: string; slug: string }>()
  const category = String(params.category ?? "")
  const slug = decodeURIComponent(String(params.slug ?? ""))
  if (!isFnoCategory(category) || !slug) notFound()
  return <FnoDetailPage key={`${category}/${slug}`} category={category} slug={slug} />
}

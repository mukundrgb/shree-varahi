"use client"

import { useParams } from "next/navigation"
import { MutualFundListPage, type MutualFundListPageData } from "@/components/mutual-fund-list-page"
import { useFundList } from "@/hooks/use-mutual-funds"

const titleFromSlug = (slug: string) =>
  slug.replace(/-/g, " ").split(" ").filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

/**
 * Category / AMC / curated list pages, e.g. /mutual-funds/equity-funds/large-cap-funds
 * or /mutual-funds/amc/hdfc-mutual-fund. Funds come from /api/v1/mutual-funds/lists/...
 */
export default function MutualFundsCatchAllPage() {
  const params = useParams()
  const parts = (Array.isArray(params.slug) ? params.slug : [params.slug]).filter(Boolean) as string[]
  const list = useFundList(parts)

  const data: MutualFundListPageData = list.data
    ? {
        slug: list.data.slug,
        crumbCategory: list.data.crumb,
        title: list.data.title,
        updatedAt: list.data.updatedAt,
        description: list.data.description,
        funds: list.data.funds,
      }
    : {
        slug: parts.join("/"),
        crumbCategory: parts[0] === "amc" ? "AMC" : "Mutual Funds",
        title: titleFromSlug(parts[parts.length - 1] ?? ""),
        updatedAt: null,
        description: "",
        funds: [],
      }

  const status = list.loading && !list.data
    ? "Loading funds…"
    : list.error && !list.data
      ? list.error.status === 404
        ? "This fund list is not available."
        : <>Unable to load funds. <button onClick={list.retry} className="text-burgundy font-bold hover:underline">Retry</button></>
      : null

  return <MutualFundListPage data={data} status={status} />
}

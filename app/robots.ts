import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { cmsGetOr } from "@/lib/server/cms"

// robots.txt (PRD WEB-05). Search engines are kept out of drafts (/preview) and API routes, and out
// of the whole site when "Let search engines list the website" is off in SEO defaults.

export const revalidate = 3600

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await cmsGetOr<{ sections?: Record<string, { allowIndexing?: boolean }> } | null>("/site-config", null, { tags: ["site-config"] })
  const allow = config?.sections?.["masters.seo"]?.allowIndexing !== false
  return {
    rules: allow ? [{ userAgent: "*", allow: "/", disallow: ["/preview/", "/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

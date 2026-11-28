// Server-side reads (used only by server components; INTERNAL_API_KEY is not a NEXT_PUBLIC_ variable,
// so it never reaches the browser) from the Shree Varahi backend for content pages (PRD §19).
// Every call is cached by Next.js with tags; the backend asks the website to refresh those tags
// when something is published (app/api/revalidate), and a 1-hour refresh is the safety net.
// If the backend is down, the last cached response keeps being served.

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9001/api/v1").replace(/\/+$/, "")
const INTERNAL_KEY = process.env.INTERNAL_API_KEY ?? ""
const REVALIDATE_SECONDS = 3600

export class CmsError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

/**
 * GET `${API_URL}${path}` → its `data`. `tags` let the backend refresh this page when the content
 * changes. A 404 throws CmsError(…, 404) so pages can call notFound().
 */
export async function cmsGet<T>(path: string, { tags = [], query, revalidate = REVALIDATE_SECONDS, noStore = false }: { tags?: string[]; query?: Record<string, string | number | undefined>; revalidate?: number; noStore?: boolean } = {}): Promise<T> {
  const qs = query ? new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => [k, String(v)])).toString() : ""
  const res = await fetch(`${API_URL}${path}${qs ? `?${qs}` : ""}`, {
    headers: { accept: "application/json", ...(INTERNAL_KEY ? { "x-internal-key": INTERNAL_KEY } : {}) },
    // A slow or unreachable backend must not hold the page: callers fall back (cmsGetOr) or 404.
    signal: AbortSignal.timeout(Number(process.env.CMS_TIMEOUT_MS) || 5000),
    ...(noStore ? { cache: "no-store" as const } : { next: { tags, revalidate } }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new CmsError(body?.message ?? `The server answered ${res.status}`, res.status)
  return body?.data as T
}

/** Like cmsGet, but returns `fallback` when the backend can't be reached or answers an error. */
export async function cmsGetOr<T>(path: string, fallback: T, opts: Parameters<typeof cmsGet>[1] = {}): Promise<T> {
  try {
    return await cmsGet<T>(path, opts)
  } catch {
    return fallback
  }
}

// ── Content shapes (backend modules/content/content.public.js) ─────────────────────────────────

export type ContentType = "blog" | "knowledge-center" | "news-editorial"

export type Category = { id: string; name: string; slug: string; description: string; icon: string; image?: string; sortOrder: number; count: number; qualifies: boolean }

export type ArticleCard = {
  id: string; slug: string; title: string; subtitle: string; excerpt: string
  coverImage: { url: string; alt: string } | null
  category: { name: string; slug: string } | null
  categories: { name: string; slug: string }[]
  tags: { name: string; slug: string }[]
  author: { name: string; slug: string; designation: string; avatar: string; credentials: string } | null
  readingTimeMinutes: number; featured: boolean; breaking?: boolean
  publishedAt: string | null; updatedAt: string | null
}

export type PmNode = { type: string; attrs?: Record<string, unknown>; content?: PmNode[]; marks?: { type: string; attrs?: Record<string, unknown> }[]; text?: string }

export type ArticleFull = ArticleCard & {
  body: { schemaVersion: number; doc: PmNode }
  headings: { level: number; text: string; id: string }[]
  takeaways: string[]
  faqs: { q: string; a: string }[]
  source: { name: string; url: string } | null
  display: { breaking: boolean; expiresAt: string | null; comments: boolean; toc: boolean; share: boolean; reactions: boolean; helpful: boolean } | null
  seo: { title: string; description: string; keyword: string; canonical: string; ogImage: string; noindex: boolean }
  path: string
  related: ArticleCard[]
  previous?: { slug: string; title: string } | null
  next?: { slug: string; title: string } | null
  redirectTo?: string
  preview?: boolean
}

export type ArticleList = { items: ArticleCard[]; total: number; page: number; limit: number; totalPages: number; category?: Category | null }

export type ModuleSettings = { title: string; description: string; pageSize?: number; minArticlesPerCategory?: number; relatedCount?: number; showTakeaways?: boolean; showFaqs?: boolean }

const listTag = (t: ContentType) => `content:${t}:list`

export const getCategories = (type: ContentType) => cmsGetOr<Category[]>(`/content/${type}/categories`, [], { tags: [listTag(type), "site-config"] })
export const getModuleSettings = (type: ContentType) => cmsGetOr<ModuleSettings | null>(`/content/${type}/settings`, null, { tags: ["site-config", listTag(type)] })

export function getArticles(type: ContentType, q: { category?: string; tag?: string; q?: string; page?: number; limit?: number; featured?: boolean; sort?: "latest" | "order" } = {}) {
  const tags = [listTag(type), ...(q.category ? [`content:${type}:cat:${q.category}`] : [])]
  return cmsGetOr<ArticleList>(`/content/${type}/articles`, { items: [], total: 0, page: 1, limit: 12, totalPages: 1 }, {
    tags,
    query: { category: q.category, tag: q.tag, q: q.q, page: q.page, limit: q.limit, featured: q.featured ? "true" : undefined, sort: q.sort },
  })
}

/** One article, or null when it doesn't exist (→ notFound()). An old slug answers { redirectTo }. */
export async function getArticle(type: ContentType, slug: string): Promise<ArticleFull | null> {
  try {
    return await cmsGet<ArticleFull>(`/content/${type}/articles/${encodeURIComponent(slug)}`, { tags: [`content:${type}:${slug}`, listTag(type)] })
  } catch (e) {
    if (e instanceof CmsError && e.status === 404) return null
    throw e
  }
}

/** A draft for /preview/[token]: never cached. */
export async function getPreview(token: string): Promise<(ArticleFull & { contentType: ContentType }) | null> {
  try {
    return await cmsGet<ArticleFull & { contentType: ContentType }>(`/content/preview/${encodeURIComponent(token)}`, { noStore: true })
  } catch {
    return null
  }
}

export const formatDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }) : ""

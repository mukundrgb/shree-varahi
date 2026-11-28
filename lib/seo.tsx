// Structured data (JSON-LD) for articles, FAQs and breadcrumbs (PRD WEB-04).

import type { ArticleFull } from "@/lib/server/cms"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shreevarahi.com").replace(/\/+$/, "")
const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`)

/** Writes JSON-LD safely: "<" is escaped so the text can't close the script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
}

export function articleJsonLd(a: ArticleFull, type: "BlogPosting" | "Article" | "NewsArticle", path: string) {
  const image = a.seo.ogImage || a.coverImage?.url
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: a.title.slice(0, 110),
    description: a.seo.description || a.excerpt,
    ...(image ? { image: [abs(image)] } : {}),
    datePublished: a.publishedAt ?? undefined,
    dateModified: a.updatedAt ?? a.publishedAt ?? undefined,
    author: { "@type": a.author ? "Person" : "Organization", name: a.author?.name ?? "Shree Varahi" },
    publisher: { "@type": "Organization", name: "Shree Varahi", logo: { "@type": "ImageObject", url: abs("/favicon.jpg") } },
    mainEntityOfPage: abs(path),
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
}

export function breadcrumbJsonLd(items: [string, string][]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })) }
}

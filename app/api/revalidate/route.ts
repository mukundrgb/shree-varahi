import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

// The backend calls this after a publish (PRD §17.4, WEB-02):
//   POST /api/revalidate   header x-revalidate-secret   body { tags: string[] }
// It refreshes the cached pages that use those tags. Anything else is refused.

const SECRET = process.env.REVALIDATE_SECRET ?? ""
const TAG = /^[a-z0-9:._-]{1,120}$/i

export async function POST(req: NextRequest) {
  if (!SECRET || req.headers.get("x-revalidate-secret") !== SECRET) {
    return NextResponse.json({ ok: false, message: "Not allowed" }, { status: 401 })
  }
  const body = (await req.json().catch(() => null)) as { tags?: unknown } | null
  const tags = Array.isArray(body?.tags) ? body.tags.filter((t): t is string => typeof t === "string" && TAG.test(t)).slice(0, 100) : []
  if (!tags.length) return NextResponse.json({ ok: false, message: "No tags" }, { status: 400 })
  // expire: 0 → the next visitor gets the new version (not one more stale view first).
  for (const tag of tags) revalidateTag(tag, { expire: 0 })
  return NextResponse.json({ ok: true, revalidated: tags })
}

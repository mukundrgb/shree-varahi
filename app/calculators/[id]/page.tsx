import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ALL_CALCULATORS } from "@/lib/calculators/constants"
import CalculatorView from "./calculator-view"

type Props = { params: Promise<{ id: string }> }

// Every calculator page is built ahead of time; unknown IDs are 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return ALL_CALCULATORS.map((c) => ({ id: c.id }))
}

function displayName(name: string) {
  return /calculator$/i.test(name) ? name : `${name} Calculator`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const meta = ALL_CALCULATORS.find((c) => c.id === id)
  if (!meta) return {}
  return {
    title: `${displayName(meta.name)} | Shree Varahi`,
    description: meta.description,
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { id } = await params
  if (!ALL_CALCULATORS.some((c) => c.id === id)) notFound()
  return <CalculatorView id={id} />
}

import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./calculators.css"

export const metadata: Metadata = {
  title: "Financial Calculators — SIP, EMI, FD, Tax & 35+ Free Tools | Shree Varahi",
  description:
    "Free financial calculators from Shree Varahi — SIP, Lumpsum, EMI, FD, PPF, EPF, Income Tax, HRA, Gratuity, GST, Brokerage, Margin and 35+ more tools for smart financial planning.",
  keywords: [
    "SIP calculator", "EMI calculator", "FD calculator", "income tax calculator",
    "PPF calculator", "brokerage calculator", "margin calculator", "financial planning India",
  ],
}

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* pt-16 clears the fixed site navbar */}
      <div className="sv-calc pt-16 flex flex-col">{children}</div>
      <Footer />
    </main>
  )
}

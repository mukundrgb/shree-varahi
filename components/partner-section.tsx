"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Building2, Users, BookOpen, Percent, Headphones, Smartphone } from "lucide-react"

const benefits = [
  { icon: Smartphone, text: "Shree Varahi Technology Platform — Full trading platform for your clients. No tech costs." },
  { icon: Building2, text: "31 Years of Brand Trust — Leverage three decades of SEBI-registered credibility." },
  { icon: BookOpen, text: "In-House Research Access — Daily calls and webinars for your clients. Included." },
  { icon: Percent, text: "Competitive Revenue Sharing — Transparent monthly payouts. Grow together." },
  { icon: Headphones, text: "Dedicated Branch Support — Training, onboarding, marketing materials." },
  { icon: Users, text: "₹0 Client Onboarding — Digital e-KYC. Clients open accounts in minutes." },
]

const professions = [
  "Select Profession",
  "Sub-broker / Authorized Person",
  "Mutual Fund Distributor",
  "Insurance Agent",
  "CA / Tax Consultant",
  "Financial Advisor",
  "Other",
]

export function PartnerSection() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    mobile: "",
    profession: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      {/* Section divider */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" /> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            Partner Program
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance">
            Grow with Lakshmishree.
            <br />
            <span className="text-burgundy">Build your own brokerage business.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join India&apos;s 31-year-old broker as a franchise partner. Get the technology, brand, research support — you focus on growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-[5px] p-6 lg:p-8"
          >
            <h3 className="font-bold text-lg mb-6">Franchise Benefits</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.li
                    key={benefit.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-[5px] bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-foreground pt-1">{benefit.text}</span>
                  </motion.li>
                )
              })}
            </ul>

            <div className="mt-8 p-4 rounded-[5px] bg-burgundy/5 border border-burgundy/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Already a sub-broker?</span>
                <br />
                Transfer your existing clients seamlessly and get enhanced revenue share.
              </p>
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gold rounded-[5px] p-6 lg:p-8 shadow-lg"
          >
            <h3 className="font-bold text-lg mb-6">Send Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">City / Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Mobile Number</label>
                <div className="flex">
                  <span className="px-4 py-3 bg-secondary rounded-l-[5px] border border-r-0 border-border text-muted-foreground">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-r-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Current Profession</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                >
                  {professions.map((profession) => (
                    <option key={profession} value={profession === "Select Profession" ? "" : profession}>
                      {profession}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-burgundy hover:bg-burgundy-deep text-primary-foreground mt-2 rounded-[5px]"
              >
                Send Enquiry
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Lakshmishree Investment & Securities Ltd - SEBI Reg. - Est. 1993
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

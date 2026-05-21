"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, BarChart3, MapPin, Headphones, Star } from "lucide-react"

const stats = [
  { value: 60000, suffix: "+", label: "Active Investors" },
  { value: 31, suffix: " Yrs", label: "Market Experience" },
  { value: 50, suffix: "+", label: "Cities" },
  { value: 4.5, suffix: "", label: "App Rating", isDecimal: true },
  { value: 200, suffix: "+", label: "Professionals" },
  { value: 99.9, suffix: "%", label: "Platform Uptime", isDecimal: true },
]

const trustPillars = [
  {
    icon: Shield,
    title: "SEBI Registered",
    sub: "Est. 1993",
    desc: "31 years of regulatory compliance and trust",
  },
  {
    icon: BarChart3,
    title: "Research Desk",
    sub: "In-House Team",
    desc: "Daily calls from expert analysts",
  },
  {
    icon: MapPin,
    title: "Pan India",
    sub: "50+ Branches",
    desc: "Physical presence across major cities",
  },
  {
    icon: Headphones,
    title: "Award-Winning",
    sub: "Support Team",
    desc: "Dedicated relationship managers",
  },
]

const logos = ["NSE", "BSE", "MCX", "CDSL", "SEBI", "NSDL"]

const testimonials = [
  { stars: 5, quote: "Best platform for F&O trading. Greeks display is amazing!", name: "Rajesh K.", city: "Mumbai" },
  { stars: 5, quote: "Using Lakshmishree for 15 years. Trust them completely.", name: "Priya S.", city: "Delhi" },
  { stars: 5, quote: "MTF feature helped me grab opportunities I would have missed.", name: "Amit P.", city: "Bangalore" },
  { stars: 4, quote: "Great research calls. Made good profits following them.", name: "Sneha M.", city: "Chennai" },
  { stars: 5, quote: "Customer service is excellent. Always responsive.", name: "Vikram R.", city: "Hyderabad" },
]

function AnimatedStat({ value, suffix, label, isDecimal }: { value: number; suffix: string; label: string; isDecimal?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number
    const duration = 2000

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(isDecimal ? parseFloat((easeOut * value).toFixed(1)) : Math.floor(easeOut * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, isDecimal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl lg:text-4xl font-bold text-burgundy">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </motion.div>
  )
}

export function TrustSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold-deep font-semibold mb-4">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Trusted by <span className="text-burgundy">60,000+</span> investors.
            <br />
            For <span className="text-gold-deep">31 years.</span>
          </h2>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 mb-16">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>

        {/* Trust Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-border rounded-[5px] p-5 hover:shadow-md hover:border-gold/50 transition-all"
              >
                <div className="w-10 h-10 rounded-[5px] bg-gold/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-bold">{pillar.title}</h3>
                <p className="text-xs text-gold-deep font-medium mb-2">{pillar.sub}</p>
                <p className="text-sm text-muted-foreground">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Exchange Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 mb-12"
        >
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-lg lg:text-xl font-bold text-muted-foreground/40 hover:text-gold-deep transition-colors cursor-default"
            >
              {logo}
            </div>
          ))}
        </motion.div>

        {/* Testimonials Strip */}
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-4 ticker-animate" style={{ width: "max-content" }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-[5px] p-4 min-w-[280px]"
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-2">{`"${testimonial.quote}"`}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.name}, {testimonial.city}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]">
            Join 60,000+ investors
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

export function BrokerageSection() {
  return (
    <section className="relative bg-gradient-to-b from-background via-cream to-cream py-16 lg:py-24 overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20rem] font-bold text-burgundy/[0.03] select-none">
          ₹17
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold-deep font-extrabold mb-4 block">
            Simple Pricing
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-7xl lg:text-9xl font-black text-gold-deep leading-none">
              ₹<AnimatedCounter target={17} duration={1.5} />
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-foreground text-balance">
            Flat / Executed Order. <span className="text-burgundy">Every Segment.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            At Shree Varahi, we keep it simple — ₹17 flat per executed order, across every segment. No slabs, no fine print. Just one fixed price.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-burgundy hover:bg-burgundy-deep text-white px-8 h-12 text-sm font-bold rounded-[5px]"
            >
              Open Free Account
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

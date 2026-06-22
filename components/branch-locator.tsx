"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, Phone, ExternalLink } from "lucide-react"

const branches = [
  { city: "Mumbai (HQ)", address: "405, Kailash Plaza, Loan Wala Compound", phone: "+91 22 4080 8080" },
  { city: "Delhi", address: "301, Mercantile House, Connaught Place", phone: "+91 11 4080 8080" },
  { city: "Bangalore", address: "502, Richmond Towers, Richmond Road", phone: "+91 80 4080 8080" },
  { city: "Chennai", address: "203, OMR Tech Park, Sholinganallur", phone: "+91 44 4080 8080" },
  { city: "Kolkata", address: "701, Camac Street Center", phone: "+91 33 4080 8080" },
  { city: "Hyderabad", address: "401, Banjara Hills, Road No. 12", phone: "+91 40 4080 8080" },
]

// Coordinates mapped to viewBox "0 0 400 450"
// x = (lon − 68) × 13.79,  y = (37 − lat) × 15
const cityCoordinates: Record<string, { x: number; y: number }> = {
  "Mumbai (HQ)": { x: 66, y: 278 },
  "Delhi":       { x: 126, y: 128 },
  "Bangalore":   { x: 138, y: 362 },
  "Chennai":     { x: 166, y: 360 },
  "Kolkata":     { x: 276, y: 218 },
  "Hyderabad":   { x: 148, y: 294 },
}

export function BranchLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const filteredBranches = branches.filter(
    (branch) =>
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
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
            Find Us Near You
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground text-balance mb-3">
            We are <span className="text-burgundy">where you are.</span>
          </h2>
          <p className="text-muted-foreground">
            50+ branches across India. A relationship manager, not just an app.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border border-border rounded-[5px] p-4 lg:h-[500px] overflow-hidden">
              {/* Map image + SVG dots overlay in one coordinate system */}
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src="/india-map.png"
                  alt="India map"
                  fill
                  className="object-contain object-center"
                />
                {/* Dots overlay — uses percentage positions mapped from city lat/lon */}
                <svg
                  viewBox="0 0 400 450"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {Object.entries(cityCoordinates).map(([city, coords], index) => (
                    <motion.g
                      key={city}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Pulse ring */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="14"
                        fill="var(--burgundy)"
                        opacity={hoveredCity === city ? 0.22 : 0.12}
                        style={{ transition: "opacity 0.3s" }}
                      />
                      {/* Dot */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={hoveredCity === city ? 8 : 6}
                        fill={city === "Mumbai (HQ)" ? "var(--gold)" : "var(--burgundy)"}
                        stroke="white"
                        strokeWidth="2"
                        style={{ transition: "r 0.2s" }}
                        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.3))"
                      />
                      {/* HQ inner gold dot */}
                      {city === "Mumbai (HQ)" && (
                        <circle cx={coords.x} cy={coords.y} r="3" fill="white" opacity="0.8" />
                      )}

                      {/* Tooltip */}
                      {hoveredCity === city && (
                        <motion.g
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <rect
                            x={coords.x - 44}
                            y={coords.y - 42}
                            width="88"
                            height="28"
                            rx="4"
                            fill="white"
                            stroke="var(--gold)"
                            strokeWidth="1"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
                          />
                          <text
                            x={coords.x}
                            y={coords.y - 24}
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="700"
                            fill="#1A1A1A"
                          >
                            {city.replace(" (HQ)", "")}
                          </text>
                          {city === "Mumbai (HQ)" && (
                            <text
                              x={coords.x}
                              y={coords.y - 13}
                              textAnchor="middle"
                              fontSize="8"
                              fill="var(--gold-deep)"
                              fontWeight="600"
                            >
                              HEADQUARTERS
                            </text>
                          )}
                        </motion.g>
                      )}
                    </motion.g>
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Search & List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search city or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-[5px] bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            {/* Branch List */}
            <div className="space-y-3 max-h-[380px] overflow-auto pr-2">
              {filteredBranches.map((branch, index) => (
                <motion.div
                  key={branch.city}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-border rounded-[5px] p-4 hover:shadow-md hover:border-gold/50 transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredCity(branch.city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-burgundy" />
                        {branch.city}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{branch.address}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Phone className="h-3 w-3" />
                        {branch.phone}
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-burgundy hover:text-burgundy-deep p-2 hover:bg-burgundy/10 rounded-[5px] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center">
              <a href="#" className="text-sm text-burgundy hover:underline font-medium">
                {"Can't find your city? Open a digital account"}
              </a>
            </p>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {[
            { value: "50+", label: "Cities" },
            { value: "200+", label: "Team Members" },
            { value: "31", label: "Years" },
            { value: "Pan India", label: "Service" },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white border border-border rounded-[5px] py-4">
              <div className="text-2xl font-bold text-burgundy">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

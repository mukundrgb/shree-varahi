"use client"

import { motion } from "framer-motion"
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"

const knowledgeOptions = [
  {
    title: "Knowledge Desk",
    desc: "Structured lessons for every level of investor, from opening your first demat account to mastering F&O strategies.",
  },
  {
    title: "Market News",
    desc: "Stay updated with live market developments, earnings updates, policy changes, and sector-specific news curated daily.",
  },
  {
    title: "Blog & Research",
    desc: "In-depth articles, trade ideas, and market analysis written by Lakshmishree's in-house research team and expert contributors.",
  },
]

export function KnowledgeSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden border-t border-slate-100">
      {/* Background grid details */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft grid background */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'radial-gradient(#B8924A 1.2px, transparent 1.2px)', 
            backgroundSize: '28px 28px' 
          }} 
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content + Interactive List */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-left">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 leading-[1.15] tracking-tight uppercase">
                Learn with <br />
                <span className="text-burgundy">Shree Varahi.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
                Markets made simple explore expert knowledge, daily news, and in-depth research all in one place.
              </p>
            </div>

            {/* List Cards */}
            <div className="space-y-4">
              {knowledgeOptions.map((opt, index) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="group w-full bg-white border border-slate-100 rounded-[12px] p-5 flex items-center justify-between gap-6 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-slate-200 transition-all duration-300"
                >
                  <div className="space-y-1 flex-1 text-left">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-burgundy transition-colors duration-250">
                      {opt.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                  
                  {/* Chevron Right */}
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-burgundy group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Vector-Style Mockup Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] select-none">
              
              {/* Back Pinkish/Reddish Glow Circle */}
              <div className="absolute -left-4 top-1/4 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-red-100/30 pointer-events-none blur-3xl z-0" />
              <div className="absolute -left-1 top-[18%] w-[130px] h-[130px] rounded-full bg-burgundy/[0.03] border border-burgundy/[0.05] z-0" />
              
              {/* Floating Star highlights */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-12 -top-6 text-gold z-20"
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-6 bottom-16 text-blue-400 z-20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </motion.div>

              {/* Floating Badge Stack / Cluster */}
              <div className="absolute -left-6 sm:-left-10 top-1/4 z-25 flex flex-col gap-3">
                {/* Quote Badge */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#FFEAEA] shadow-md flex items-center justify-center"
                >
                  <span className="text-xl sm:text-2xl font-serif font-black text-loss">“</span>
                </motion.div>
                {/* Chat Message Bubble Badge */}
                <motion.div 
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#E8F3FF] shadow-md flex items-center justify-center"
                >
                  <svg className="w-4.5 h-4.5 text-blue-500 fill-blue-500/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </motion.div>
                {/* Chain Link Badge */}
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gold/20 shadow-md flex items-center justify-center"
                >
                  <svg className="w-4.5 h-4.5 text-gold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </motion.div>
              </div>

              {/* Main Desktop Browser Window Mockup */}
              <div className="absolute w-[90%] left-[8%] sm:left-[10%] top-[8%] h-[84%] bg-white rounded-[16px] border border-border shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-10">
                {/* Browser Top Bar */}
                <div className="h-10 px-4 bg-slate-50 border-b border-border flex items-center justify-between shrink-0">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  {/* Back / Forward Controls */}
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground/45" />
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/45" />
                  </div>
                  <div className="w-20" /> {/* Spacer */}
                </div>

                {/* Browser Body Area */}
                <div className="flex-1 p-5 flex flex-col justify-between bg-white overflow-hidden space-y-4">
                  {/* Inner Mockup Cards Grid */}
                  <div className="grid grid-cols-2 gap-4 flex-1 items-stretch">
                    {/* Left Inner Card: Bar Chart */}
                    <div className="bg-[#FAF9F5] border border-border/80 rounded-[12px] p-3 flex flex-col justify-between">
                      <span className="text-[9px] font-extrabold text-gold-deep tracking-wider uppercase">PERFORMANCE</span>
                      {/* Vertical bars */}
                      <div className="flex items-end justify-between gap-1 h-16 pt-3 px-2">
                        <div className="w-2.5 bg-gold/30 rounded-t-sm h-[30%]" />
                        <div className="w-2.5 bg-burgundy/80 rounded-t-sm h-[65%]" />
                        <div className="w-2.5 bg-gold rounded-t-sm h-[50%]" />
                        <div className="w-2.5 bg-gold-deep rounded-t-sm h-[80%]" />
                        <div className="w-2.5 bg-burgundy/30 rounded-t-sm h-[45%]" />
                      </div>
                      {/* Slider Control Handle */}
                      <div className="w-full h-1 bg-border/60 rounded-full relative mt-2 flex items-center">
                        <div className="absolute left-2/3 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold border border-white shadow-sm" />
                      </div>
                    </div>

                    {/* Right Inner Card: Pie Chart */}
                    <div className="bg-[#FAF9F5] border border-border/80 rounded-[12px] p-3 flex flex-col justify-between items-center text-center">
                      <span className="text-[9px] font-extrabold text-burgundy tracking-wider uppercase block w-full text-left">ALLOCATION</span>
                      {/* SVG Pie Chart Mock */}
                      <div className="relative w-16 h-16 my-2 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="14" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                          <circle cx="16" cy="16" r="14" fill="none" stroke="#D9B27C" strokeWidth="4" strokeDasharray="35 100" />
                          <circle cx="16" cy="16" r="14" fill="none" stroke="#8B0D19" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-35" />
                          <circle cx="16" cy="16" r="14" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-60" />
                        </svg>
                      </div>
                      <div className="flex gap-2 text-[8px] font-semibold text-muted-foreground shrink-0">
                        <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" />Stocks</span>
                        <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-burgundy" />F&amp;O</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Skeleton Lines at bottom */}
                  <div className="space-y-2 pt-2 border-t border-border/40 shrink-0">
                    <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Overlapping Gold Coins (Bottom Right) */}
              <div className="absolute right-0 sm:right-2 bottom-0 translate-y-[20%] flex items-center z-30">
                {/* Coin 1 */}
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_20px_rgba(184,146,74,0.35)] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl select-none"
                >
                  ₹
                </motion.div>
                {/* Coin 2 */}
                <motion.div 
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold via-gold-deep to-gold border-[3px] border-white shadow-[0_8px_16px_rgba(184,146,74,0.3)] flex items-center justify-center text-white font-extrabold text-lg sm:text-xl select-none -ml-4"
                >
                  ₹
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

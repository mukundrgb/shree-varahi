'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CALCULATOR_CATEGORIES } from '@/lib/calculators/constants';
import { OPEN_ACCOUNT_URL } from '@/lib/external-links';
import { MdSearch, MdTrendingUp, MdArrowForward, MdCalculate, MdSpeed, MdMoneyOff, MdCheckCircle } from 'react-icons/md';

const ALL_CATEGORY_NAMES = ['All', ...CALCULATOR_CATEGORIES.map(c => c.name)];

// Category-specific accent colors mapped to Shree Varahi theme (Burgundy and Gold)
const CATEGORY_COLORS: Record<string, { accent: string; glow: string; bg: string }> = {
  'Investment': { accent: 'var(--accent)', glow: 'var(--accent-glow)', bg: 'rgba(255,0,0,0.04)' },
  'Savings': { accent: 'var(--gold-deep)', glow: 'rgba(217,178,124,0.15)', bg: 'rgba(217,178,124,0.06)' },
  'Loans': { accent: 'var(--accent)', glow: 'var(--accent-glow)', bg: 'rgba(255,0,0,0.04)' },
  'Tax & Salary': { accent: 'var(--gold-deep)', glow: 'rgba(217,178,124,0.15)', bg: 'rgba(217,178,124,0.06)' },
  'Other': { accent: 'var(--accent)', glow: 'var(--accent-glow)', bg: 'rgba(255,0,0,0.04)' },
};

function getCatColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? { accent: 'var(--accent)', glow: 'var(--accent-glow)', bg: 'rgba(255,0,0,0.04)' };
}

const STAT_ITEMS = [
  { value: '35+', label: 'Calculators', icon: MdSpeed },
  { value: '₹0', label: 'Cost Forever', icon: MdMoneyOff },
  { value: '100%', label: 'Accurate', icon: MdCheckCircle },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCategories = useMemo(() => {
    return CALCULATOR_CATEGORIES
      .filter(cat => activeCategory === 'All' || cat.name === activeCategory)
      .map(cat => ({
        ...cat,
        calculators: cat.calculators.filter(calc =>
          !calc.hidden &&
          (search === '' ||
            calc.name.toLowerCase().includes(search.toLowerCase()) ||
            calc.description.toLowerCase().includes(search.toLowerCase()))
        ),
      }))
      .filter(cat => cat.calculators.length > 0);
  }, [search, activeCategory]);

  useEffect(() => {
    // Support links like /calculators?q=emi
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setSearch(q);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden bg-[var(--bg-base)]">
        {/* Subtle dot/grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)', 
            backgroundSize: '65px 65px',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'
          }} />

        {/* Decorative soft glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.03) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,178,124,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Text Content */}
          <div className="flex-1 w-full max-w-2xl flex flex-col justify-center">
            
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--gold-deep)] font-black mb-5 animate-fade-up">
              Trusted by 1 Lakh+ Indians
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up stagger-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                color: 'var(--text-primary)',
              }}
            >
              Stop guessing numbers.<br />
              <span className="text-[#FF0000]">Master your finances.</span>
            </h1>

            <p className="animate-fade-up stagger-2 text-base sm:text-lg leading-relaxed max-w-[520px] mb-8" style={{ color: 'var(--text-secondary)' }}>
              SIP, EMI, PPF, Income Tax, and 30+ other calculators — one app, completely free. Zero hidden charges. Plan your financial future with precision.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-10 animate-fade-up stagger-2">
              <a href={OPEN_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#D40000] text-white px-8 h-[52px] text-sm font-bold rounded-[5px] shadow-md shadow-red-500/10 transition-all">
                Open Trading Account
                <MdArrowForward className="text-lg ml-1" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 animate-fade-up stagger-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500">
                <MdCheckCircle className="text-[var(--gold-deep)] text-base" /> 100% Free to Use
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500">
                <MdCheckCircle className="text-[var(--gold-deep)] text-base" /> No Signup Required
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500">
                <MdCheckCircle className="text-[var(--gold-deep)] text-base" /> Instant Results
              </div>
            </div>
          </div>

          {/* Right Content - The Brokerage Card Replica */}
          <div className="hidden lg:flex flex-1 justify-end animate-fade-up stagger-3">
            <div className="relative rounded-[12px] overflow-hidden aspect-[4/3] w-[460px]" style={{ background: 'linear-gradient(145deg, #071410 0%, #0d2418 100%)' }}>
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[4px]" style={{ background: '#05966922', color: '#4ade80', border: '1px solid #4ade8030' }}>
                    SMART PLANNING
                  </span>
                  <div className="w-11 h-11 rounded-[8px] flex items-center justify-center" style={{ background: '#4ade8018', border: '1px solid #4ade8025' }}>
                    <MdTrendingUp className="text-[#4ade80] text-xl" />
                  </div>
                </div>
                <div>
                  <div className="text-[64px] font-black leading-none tracking-tight mb-1 text-[#4ade80]">100%</div>
                  <div className="text-[18px] font-extrabold text-white/80 mb-4 leading-tight">Free & Accurate</div>
                  <p className="text-[13px] text-white/45 leading-relaxed max-w-[260px] font-medium">Calculate your investments, taxes, and loans with absolutely zero cost — forever. No hidden charges.</p>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[6px]" style={{ background: '#4ade8012', border: '1px solid #4ade8020' }}>
                    <MdCheckCircle className="text-[#4ade80] text-base" />
                    <span className="text-[12px] font-bold text-white/90">30+ Financial Tools</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 bottom-16 text-[130px] font-black leading-none pointer-events-none select-none text-[#4ade80] opacity-[0.06]">100%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAF8F5] pb-10 flex-1">
        {/* ── Category Filter Pills ── */}
      <div className="sticky top-[64px] z-20" style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row md:items-center gap-x-4">
          <div className="flex-1 min-w-0 flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {ALL_CATEGORY_NAMES.map(cat => {
              const isActive = activeCategory === cat;
              const color = cat !== 'All' ? getCatColor(cat) : null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer"
                  style={{
                    background: isActive
                      ? (cat === 'All' ? 'var(--grad-accent)' : color?.bg)
                      : 'transparent',
                    color: isActive
                      ? (cat === 'All' ? 'white' : color?.accent)
                      : 'var(--text-muted)',
                    border: `1.5px solid ${isActive ? (cat === 'All' ? 'transparent' : color?.accent + '50') : 'var(--border)'}`,
                    boxShadow: isActive && cat !== 'All' ? `0 0 10px ${color?.glow}` : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-2 w-full md:w-[280px] h-10 mt-3 md:mt-0 px-3 rounded-[6px] bg-white border border-gray-200 focus-within:border-[#D9B27C] transition-colors flex-shrink-0">
            <MdSearch className="text-lg text-gray-400 flex-shrink-0" />
            <input
              type="search"
              placeholder="Search calculators (SIP, EMI...)"
              aria-label="Search calculators"
              className="bg-transparent border-none outline-none w-full text-sm text-[var(--text-primary)] placeholder-gray-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* ── Calculator Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 animate-fade-scale">
            <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>No calculators found for "{search}"</p>
            <button onClick={() => setSearch('')} style={{ color: 'var(--accent)', fontSize: 14, marginTop: 8 }}>
              Clear search
            </button>
          </div>
        ) : (
          filteredCategories.map(category => {
            const color = getCatColor(category.name);
            return (
              <div key={category.name} className="animate-fade-up">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl text-lg"
                    style={{ background: color.bg, color: color.accent, border: `1.5px solid ${color.accent}25` }}>
                    <category.icon />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                      {category.name} Calculators
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>
                      {category.calculators.length} tools
                    </p>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {category.calculators.map((calc, idx) => (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.id}`}
                      className="group relative flex flex-col p-5 bg-white border border-gray-200 hover:border-[#FF0000] hover:shadow-md transition-all duration-300 rounded-[5px] overflow-hidden cursor-pointer h-full min-h-[190px] animate-fade-up"
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {/* Top accent line animating left to right on hover */}
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#FF0000] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />

                      {/* Header: Icon + Pill */}
                      <div className="flex justify-between items-start w-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-[5px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                          style={{ background: color.bg, color: color.accent, fontSize: 20 }}>
                          <calc.icon />
                        </div>
                        
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-[3px]"
                          style={{ background: color.bg, color: color.accent }}>
                          {calc.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-4 flex-1">
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 16,
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1.2,
                        }}>
                          {calc.name.replace(' Calculator', '')}
                        </h3>
                        <p className="mt-2" style={{
                          color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.45,
                          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const
                        }}>
                          {calc.description}
                        </p>
                      </div>

                      {/* Explore Link */}
                      <div className="mt-auto pt-4 flex items-center gap-1 text-[13px] font-bold text-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        Explore <MdArrowForward className="text-sm" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="max-w-7xl mx-auto px-6 text-gray-400 text-[11px]">
        All calculations are indicative only.
      </p>
      </div>
    </div>
  );
}

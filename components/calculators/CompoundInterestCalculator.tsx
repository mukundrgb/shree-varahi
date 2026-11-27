'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);
  const [n, setN] = useState<1 | 2 | 4 | 12>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { ci, total } = useMemo(() => {
    const fv = principal * Math.pow(1 + rate / (n * 100), n * years);
    return { ci: Math.max(0, fv - principal), total: fv };
  }, [principal, rate, years, n]);

  const opts = [
    { label: 'Yearly', v: 1 }, 
    { label: 'Half-Yearly', v: 2 },
    { label: 'Quarterly', v: 4 }, 
    { label: 'Monthly', v: 12 },
  ] as const;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        
        <SliderInput label="Principal amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
        <SliderInput label="Rate of interest (p.a)" value={rate} min={1} max={50} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={30} suffix=" Yr" onChange={setYears} />
        
        <div className="mb-8 mt-6 flex justify-between items-center relative" ref={dropdownRef}>
          <span className="text-sm font-medium text-foreground">Compounding frequency</span>
          <div className="relative">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer text-sm font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {opts.find(o => o.v === n)?.label}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
              </svg>
            </div>
            
            {isDropdownOpen && (
              <ul 
                className="absolute right-0 top-full mt-2 w-36 rounded-xl shadow-lg border overflow-hidden z-50 animate-fade-in"
                style={{ 
                  background: 'var(--bg-base)', 
                  borderColor: 'var(--glass-border)'
                }}
              >
                {opts.map(o => (
                  <li 
                    key={o.v}
                    onClick={() => {
                      setN(o.v as 1|2|4|12);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-3 text-sm cursor-pointer transition-colors"
                    style={{
                      color: n === o.v ? 'var(--accent)' : 'var(--text-secondary)',
                      background: n === o.v ? 'rgba(255,0,0,0.08)' : 'transparent',
                      fontWeight: n === o.v ? 600 : 500,
                    }}
                  >
                    {o.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ResultCard results={[
          { label: 'Principal amount', value: principal, prefix: '₹' },
          { label: 'Total interest', value: ci, prefix: '₹' },
          { label: 'Total amount', value: total, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Principal amount', value: principal, color: 'var(--blue)' },
            { label: 'Total interest', value: ci, color: 'var(--blue-light)' },
          ]}
          total={total}
        />
      </div>
    </div>
  );
}

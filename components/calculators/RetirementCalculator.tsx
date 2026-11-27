import { useState, useMemo, useRef, useEffect } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';

export default function RetirementCalculator() {
  const [age, setAge] = useState<number | string>(25);
  const [spend, setSpend] = useState<number | string>(25000);
  const [style, setStyle] = useState<'KING' | 'HAPPY' | 'MONK'>('KING');
  const [strategy, setStrategy] = useState<'SAFE' | 'AGGRESSIVE'>('SAFE');

  const [openDropdown, setOpenDropdown] = useState<'STYLE' | 'STRATEGY' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { corpus, monthlySave } = useMemo(() => {
    const a = typeof age === 'number' ? age : parseInt(age as string) || 0;
    const s = typeof spend === 'number' ? spend : parseInt(spend as string) || 0;

    if (a <= 0 || a >= 60 || s <= 0) return { corpus: 0, monthlySave: 0 };

    const yearsToRetire = 60 - a;
    
    // Assumptions to approximate Groww's values
    const inflation = 0.06;
    const returnPre = strategy === 'SAFE' ? 0.08 : 0.12;
    const returnPost = strategy === 'SAFE' ? 0.07 : 0.09;
    
    // Style adjustments
    let lifeExpectancy = 80;
    let expenseMultiplier = 1;
    if (style === 'KING') {
      lifeExpectancy = 85;
      expenseMultiplier = 1.2;
    } else if (style === 'HAPPY') {
      lifeExpectancy = 80;
      expenseMultiplier = 0.8;
    } else if (style === 'MONK') {
      lifeExpectancy = 75;
      expenseMultiplier = 0.5;
    }

    const yearsInRetirement = lifeExpectancy - 60;
    
    // Future value of monthly expenses at retirement
    const futureMonthlySpend = (s * expenseMultiplier) * Math.pow(1 + inflation, yearsToRetire);
    const annualFutureSpend = futureMonthlySpend * 12;

    // Real return post retirement
    const realReturnPost = (1 + returnPost) / (1 + inflation) - 1;

    // Corpus required (PV of annuity)
    let requiredCorpus = 0;
    if (realReturnPost > 0) {
      requiredCorpus = annualFutureSpend * ((1 - Math.pow(1 + realReturnPost, -yearsInRetirement)) / realReturnPost);
    } else {
      requiredCorpus = annualFutureSpend * yearsInRetirement;
    }

    // Monthly save required (PMT for future value)
    const monthlyRate = returnPre / 12;
    const totalMonths = yearsToRetire * 12;
    let requiredMonthly = 0;
    if (totalMonths <= 0) return { corpus: 0, monthlySave: 0 };
    if (monthlyRate > 0) {
      requiredMonthly = requiredCorpus * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      requiredMonthly = requiredCorpus / totalMonths;
    }

    return { corpus: Math.round(requiredCorpus), monthlySave: Math.round(requiredMonthly) };
  }, [age, spend, style, strategy]);

  const styleOptions = [
    { id: 'KING', label: 'LIKE A KING' },
    { id: 'HAPPY', label: 'I AM HAPPY THE WAY I AM' },
    { id: 'MONK', label: 'LIKE A MONK' }
  ];

  const strategyOptions = [
    { id: 'SAFE', label: 'SAFE (PF, FD, ETC)' },
    { id: 'AGGRESSIVE', label: 'AGGRESSIVE (MUTUAL FUNDS, EQUITY, ETC)' }
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <SliderInput label="How old are you ?" value={typeof age === 'number' ? age : parseInt(age as string) || 0} min={18} max={65} step={1} onChange={setAge} />
      <SliderInput label="How much do you spend per month?" value={typeof spend === 'number' ? spend : parseInt(spend as string) || 0} min={1000} max={1000000} step={1000} prefix="₹" onChange={setSpend} />

      <div ref={dropdownRef} className="space-y-6 mt-6">
        {/* Style Dropdown */}
        <div className="flex justify-between items-center relative z-20">
          <span className="text-sm font-medium text-foreground">What kind of retirement you want?</span>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'STYLE' ? null : 'STYLE')}
              className="flex items-center gap-2 cursor-pointer text-sm font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {styleOptions.find(o => o.id === style)?.label}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'STYLE' ? 'rotate-180' : ''}`}
              >
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
              </svg>
            </div>
            
            {openDropdown === 'STYLE' && (
              <ul 
                className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg border overflow-hidden animate-fade-in"
                style={{ background: 'var(--bg-base)', borderColor: 'var(--glass-border)' }}
              >
                {styleOptions.map(o => (
                  <li 
                    key={o.id}
                    onClick={() => {
                      setStyle(o.id as any);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-3 text-sm cursor-pointer transition-colors"
                    style={{
                      color: style === o.id ? 'var(--accent)' : 'var(--text-secondary)',
                      background: style === o.id ? 'rgba(255,0,0,0.08)' : 'transparent',
                      fontWeight: style === o.id ? 600 : 500,
                    }}
                  >
                    {o.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Strategy Dropdown */}
        <div className="flex justify-between items-center relative z-10">
          <span className="text-sm font-medium text-foreground">Where are you saving for your retirement?</span>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'STRATEGY' ? null : 'STRATEGY')}
              className="flex items-center gap-2 cursor-pointer text-sm font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {strategyOptions.find(o => o.id === strategy)?.label}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'STRATEGY' ? 'rotate-180' : ''}`}
              >
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
              </svg>
            </div>
            
            {openDropdown === 'STRATEGY' && (
              <ul 
                className="absolute right-0 top-full mt-2 w-72 rounded-xl shadow-lg border overflow-hidden animate-fade-in"
                style={{ background: 'var(--bg-base)', borderColor: 'var(--glass-border)' }}
              >
                {strategyOptions.map(o => (
                  <li 
                    key={o.id}
                    onClick={() => {
                      setStrategy(o.id as any);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-3 text-sm cursor-pointer transition-colors"
                    style={{
                      color: strategy === o.id ? 'var(--accent)' : 'var(--text-secondary)',
                      background: strategy === o.id ? 'rgba(255,0,0,0.08)' : 'transparent',
                      fontWeight: strategy === o.id ? 600 : 500,
                    }}
                  >
                    {o.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ResultCard results={[
          { label: 'Amount required for retirement', value: corpus, prefix: '₹' },
          { label: 'How much do you need to save per month to retire?', value: monthlySave, prefix: '₹', highlight: true }
        ]} />
      </div>
    </div>
  );
}

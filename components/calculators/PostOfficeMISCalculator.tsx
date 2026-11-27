'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function PostOfficeMISCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [rate, setRate] = useState(7.4);
  const TENURE = 5;

  const { monthly } = useMemo(() => {
    // Math: Principal * (Rate/100) / 12
    const m = Math.round((investment * rate) / 1200);
    return { monthly: m };
  }, [investment, rate]);

  return (
    <div className="w-full">
      <SliderInput label="Investment Amount" value={investment} min={1000} max={1500000} step={1000} prefix="₹" onChange={setInvestment} />
      <SliderInput label="Interest Rate" value={rate} min={1} max={12} step={0.1} suffix="%" onChange={setRate} />
      
      <div className="mb-6 opacity-70 pointer-events-none">
        <SliderInput label="Lock In Period" value={TENURE} min={0} max={10} suffix=" Yr" onChange={() => {}} />
      </div>

      {/* Groww just shows a big Monthly Income text at the bottom */}
      <div className="mt-8 flex flex-col items-center justify-center p-6 bg-[rgba(217,178,124,0.1)] rounded-2xl border border-[var(--gold-champagne)] border-opacity-30">
        <div className="text-[var(--text-secondary)] font-medium mb-2">Monthly Income</div>
        <div className="text-4xl font-bold text-[var(--gold)]">₹ {monthly.toLocaleString('en-IN')}</div>
      </div>
    </div>
  );
}

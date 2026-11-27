'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import { abbreviate } from '@/lib/calculators/formatters';

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { returns, total } = useMemo(() => {
    const fv = principal * Math.pow(1 + rate / 100, years);
    return { 
      returns: Math.round(Math.max(0, fv - principal)), 
      total: Math.round(Math.max(fv, principal)) 
    };
  }, [principal, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <CalculatorTabs 
          activeId="lumpsum" 
          tabs={[
            { id: 'sip', label: 'SIP', href: '/calculators/sip' },
            { id: 'lumpsum', label: 'Lumpsum', href: '/calculators/lumpsum' }
          ]} 
        />
        <SliderInput label="Total investment" value={principal} min={500} max={10000000} step={500} prefix="₹" onChange={setPrincipal} />
        <SliderInput label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={40} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Invested amount', value: principal },
          { label: 'Est. returns', value: returns },
          { label: 'Total value', value: total, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Invested amount', value: principal, color: 'var(--gold)' },
            { label: 'Est. returns', value: returns, color: 'var(--burgundy)' },
          ]}
          total={total}
          centerLabel="Total value"
          centerValue={abbreviate(total)}
        />
      </div>
    </div>
  );
}

'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import DonutChart from '@/components/calculators/ui/DonutChart';
import { abbreviate } from '@/lib/calculators/formatters';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  const { si, total } = useMemo(() => {
    const si = (principal * rate * years) / 100;
    return { si, total: principal + si };
  }, [principal, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Principal amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
        <SliderInput label="Rate of interest (p.a)" value={rate} min={1} max={50} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={30} step={1} suffix=" Yr" onChange={setYears} />
        
        <div className="mt-8">
          <ResultCard results={[
            { label: 'Principal amount', value: principal, prefix: '₹' },
            { label: 'Total interest', value: si, prefix: '₹' },
            { label: 'Total amount', value: total, prefix: '₹', highlight: true },
          ]} />
        </div>
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Principal amount', value: principal, color: 'var(--blue)' },
            { label: 'Total interest', value: si, color: 'var(--blue-light)' },
          ]}
          total={total}
        />
      </div>
    </div>
  );
}

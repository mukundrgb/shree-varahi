'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);
  const frequency = 4; // Groww uses quarterly compounding by default

  const { maturity, interest } = useMemo(() => {
    const fv = principal * Math.pow(1 + rate / (frequency * 100), frequency * years);
    return { maturity: fv, interest: Math.max(0, fv - principal) };
  }, [principal, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Total investment" value={principal} min={5000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
        <SliderInput label="Rate of interest (p.a)" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={25} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Invested amount', value: principal },
          { label: 'Est. returns', value: interest },
          { label: 'Total value', value: maturity, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Total investment', value: principal, color: 'var(--gold)' },
            { label: 'Total returns', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Total value"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

import DonutChart from '@/components/calculators/ui/DonutChart';

export default function SCSSCalculator() {
  const [investment, setInvestment] = useState(10000);
  const RATE = 8.2;
  const TENURE = 5;

  const { quarterly, total, maturity } = useMemo(() => {
    const capped = Math.min(investment, 3000000); // Max ₹30L
    const q = Math.round((capped * RATE) / 400);
    const totalInterest = q * 20; // 5 years = 20 quarters
    return { quarterly: q, total: totalInterest, maturity: capped + totalInterest };
  }, [investment]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Yearly investment" value={investment} min={500} max={3000000} step={500} prefix="₹" onChange={setInvestment} />
        
        {/* Disabled inputs to match Groww */}
        <div className="mb-6 opacity-70 pointer-events-none">
          <SliderInput label="Tenure" value={TENURE} min={0} max={10} suffix=" Yr" onChange={() => {}} />
        </div>
        <div className="mb-6 opacity-70 pointer-events-none">
          <SliderInput label="Rate of interest" value={RATE} min={0} max={10} suffix="%" onChange={() => {}} formatDisplay={(val) => val.toString()} />
        </div>

        <ResultCard results={[
          { label: 'Quarterly receivable interest', value: quarterly, prefix: '₹' },
          { label: 'Total interest', value: total, prefix: '₹' },
          { label: 'Maturity value', value: maturity, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Total investment', value: investment, color: 'var(--gold)' },
            { label: 'Total interest', value: total, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Maturity value"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

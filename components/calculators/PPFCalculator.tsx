'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function PPFCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [years, setYears] = useState(15);
  const RATE = 7.1;

  const { invested, interest, maturity } = useMemo(() => {
    const r = RATE / 100;
    let corpus = 0;
    for (let y = 1; y <= years; y++) {
      corpus = (corpus + yearly) * (1 + r);
    }
    const inv = yearly * years;
    return { invested: inv, interest: Math.max(0, corpus - inv), maturity: corpus };
  }, [yearly, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <div className="mb-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2" style={{ background: 'rgba(217,178,124,0.15)', color: 'var(--gold-deep)' }}>
          📌 Current PPF interest rate: <strong>7.1% p.a.</strong> (set by Govt.)
        </div>
        <SliderInput label="Yearly Investment" value={yearly} min={500} max={150000} step={500} prefix="₹" onChange={setYearly} />
        <SliderInput label="Time Period" value={years} min={15} max={50} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Total Invested', value: invested },
          { label: 'Interest Earned', value: interest },
          { label: 'Maturity Value', value: maturity, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Invested Amount', value: invested, color: 'var(--gold)' },
            { label: 'Interest Earned', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Maturity Value"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

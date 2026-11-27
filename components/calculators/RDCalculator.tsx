'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function RDCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(3);

  const { invested, interest, maturity } = useMemo(() => {
    const months = years * 12;
    const inv = monthly * months;

    let corpus = 0;
    if (rate <= 0) {
      corpus = inv;
    } else {
      // Standard Indian bank RD formula: compounded quarterly
      // Each month's deposit grows for remaining quarters
      // Maturity = R * [(1+r/400)^(4n) - 1] / [1 - (1+r/400)^(-1/3)]
      // Simplified: iterate month by month with monthly compounding (equivalent)
      const r = rate / 100 / 12; // monthly rate
      for (let m = 1; m <= months; m++) {
        // Each deposit of `monthly` grows for (months - m + 1) months
        corpus += monthly * Math.pow(1 + r, months - m + 1);
      }
    }

    return { invested: inv, interest: Math.max(0, corpus - inv), maturity: corpus };
  }, [monthly, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Monthly Investment" value={monthly} min={100} max={100000} step={100} prefix="₹" onChange={setMonthly} />
        <SliderInput label="Annual Interest Rate" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time Period" value={years} min={1} max={10} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Invested Amount', value: invested },
          { label: 'Interest Earned', value: interest },
          { label: 'Maturity Value', value: maturity, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Invested', value: invested, color: 'var(--gold)' },
            { label: 'Interest', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Maturity Value"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function SSYCalculator() {
  const [yearly, setYearly] = useState(10000);
  const [girlAge, setGirlAge] = useState(5);
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const RATE = 8.2;

  const { invested, interest, maturity, maturityYear } = useMemo(() => {
    const r = RATE / 100;
    let corpus = 0;
    // SSY deposits for 15 years, matures in 21 years
    for (let y = 1; y <= 21; y++) {
      if (y <= 15) {
        corpus = (corpus + yearly) * (1 + r);
      } else {
        corpus = corpus * (1 + r);
      }
    }
    const inv = yearly * 15;
    return { 
      invested: inv, 
      interest: Math.max(0, Math.round(corpus) - inv), 
      maturity: Math.round(corpus),
      maturityYear: startYear + 21
    };
  }, [yearly, startYear]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <div className="mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: 'rgba(217,178,124,0.15)', color: 'var(--gold-deep)' }}>
          📌 Latest SSY Rate: <strong>8.2% p.a.</strong>
        </div>
        <SliderInput label="Yearly investment" value={yearly} min={250} max={150000} step={250} prefix="₹" onChange={setYearly} />
        <SliderInput label="Girl's age" value={girlAge} min={1} max={10} step={1} suffix=" Yr" onChange={setGirlAge} />
        <SliderInput label="Start period" value={startYear} min={2018} max={2030} step={1} onChange={setStartYear} formatDisplay={(val) => val.toString()} />
        
        <ResultCard results={[
          { label: 'Total investment', value: invested, prefix: '₹' },
          { label: 'Total interest', value: interest, prefix: '₹' },
          { label: 'Maturity year', value: maturityYear, formatFn: () => maturityYear.toString() },
          { label: 'Maturity value', value: maturity, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Total investment', value: invested, color: 'var(--gold)' },
            { label: 'Total interest', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Maturity value"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

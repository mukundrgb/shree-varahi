'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function NPSCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(9);
  const [age, setAge] = useState(20);

  const RETIREMENT_AGE = 60;

  const { invested, interest, maturity, minAnnuity } = useMemo(() => {
    const years = RETIREMENT_AGE - age;
    if (years <= 0) return { invested: 0, interest: 0, maturity: 0, minAnnuity: 0 };
    
    const r = rate / 12 / 100;
    const n = years * 12;
    
    // SIP Future Value formula (Groww uses End-of-month compounding for NPS)
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const inv = monthly * n;
    const earned = fv - inv;
    const annuity = fv * 0.40; // 40% mandatory annuity

    return { 
      invested: inv, 
      interest: Math.round(earned), 
      maturity: Math.round(fv), 
      minAnnuity: Math.round(annuity) 
    };
  }, [monthly, rate, age]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Investment per month" value={monthly} min={500} max={150000} step={500} prefix="₹" onChange={setMonthly} />
        <SliderInput label="Expected return (p.a)" value={rate} min={8} max={15} step={0.1} suffix="%" onChange={setRate} />
        <SliderInput label="Your age" value={age} min={18} max={60} step={1} suffix=" Yr" onChange={setAge} />
        
        <ResultCard results={[
          { label: 'Total investment', value: invested, prefix: '₹' },
          { label: 'Interest earned', value: interest, prefix: '₹' },
          { label: 'Maturity amount', value: maturity, prefix: '₹', highlight: true },
          { label: 'Min. annuity investment', value: minAnnuity, prefix: '₹' },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Total investment', value: invested, color: 'var(--gold)' },
            { label: 'Interest earned', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Maturity amount"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}

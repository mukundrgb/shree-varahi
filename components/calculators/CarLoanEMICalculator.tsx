'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function CarLoanEMICalculator() {
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);

  const { emi, totalAmount, totalInterest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    let emiVal: number;
    if (r === 0) {
      emiVal = loan / n;
    } else {
      emiVal = loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    const total = emiVal * n;
    return { emi: Math.round(emiVal), totalAmount: Math.round(total), totalInterest: Math.max(0, Math.round(total) - loan) };
  }, [loan, rate, tenure]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Loan amount" value={loan} min={100000} max={100000000} step={1000} prefix="₹" onChange={setLoan} />
        <SliderInput label="Rate of interest (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toString()} />
        <SliderInput label="Loan tenure" value={tenure} min={1} max={30} suffix=" Yr" onChange={setTenure} />
        <ResultCard results={[
          { label: 'Monthly EMI', value: emi, prefix: '₹' },
          { label: 'Principal amount', value: loan, prefix: '₹' },
          { label: 'Total interest', value: totalInterest, prefix: '₹' },
          { label: 'Total amount', value: totalAmount, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Principal amount', value: loan, color: 'var(--gold)' },
            { label: 'Interest amount', value: totalInterest, color: 'var(--burgundy)' },
          ]}
          total={totalAmount}
          centerLabel="Monthly EMI"
          centerValue={abbreviate(emi)}
        />
      </div>
    </div>
  );
}

'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function SWPCalculator() {
  const [corpus, setCorpus] = useState(500000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const { totalWithdrawn, remaining } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    let balance = corpus;
    let totalW = 0;
    
    for (let i = 0; i < n; i++) {
      if (balance <= 0) break;
      
      // Withdraw at the beginning of the month
      const withdrawAmount = Math.min(balance, withdrawal);
      balance -= withdrawAmount;
      totalW += withdrawAmount;
      
      // Interest is earned on the remaining balance
      const interest = balance * r;
      balance += interest;
    }
    
    return { 
      totalWithdrawn: Math.round(totalW), 
      remaining: Math.round(Math.max(0, balance)) 
    };
  }, [corpus, withdrawal, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Total investment" value={corpus} min={10000} max={10000000} step={500} prefix="₹" onChange={setCorpus} />
        <SliderInput label="Withdrawal per month" value={withdrawal} min={500} max={100000} step={500} prefix="₹" onChange={setWithdrawal} />
        <SliderInput label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={30} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Total investment', value: corpus },
          { label: 'Total withdrawal', value: totalWithdrawn },
          { label: 'Final value', value: remaining, highlight: true },
        ]} />
      </div>
      <div className="flex-shrink-0 w-full lg:w-52 flex flex-col items-center justify-center gap-4 pt-0 lg:pt-4">
        <div className="w-full rounded-2xl p-5 text-center flex-shrink-0 mt-4 lg:mt-0" style={{ background: 'linear-gradient(135deg,var(--burgundy-deep),var(--burgundy))' }}>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Monthly Withdrawal</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--gold-champagne)' }}>{abbreviate(withdrawal)}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>for {years} years</p>
        </div>
      </div>
    </div>
  );
}

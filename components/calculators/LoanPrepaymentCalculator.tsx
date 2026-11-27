'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

function calcEMI(p: number, rAnnual: number, n: number) {
  const r = rAnnual / 12 / 100;
  if (r === 0) return p / n;
  return p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

export default function LoanPrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [prepayment, setPrepayment] = useState(200000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  const result = useMemo(() => {
    const n = tenure * 12;
    const emi = calcEMI(loanAmount, rate, n);
    const totalOriginal = emi * n;
    const interestOriginal = totalOriginal - loanAmount;

    // Outstanding balance just before prepayment month
    const r = rate / 12 / 100;
    let balance = loanAmount;
    for (let i = 0; i < prepaymentMonth - 1; i++) {
      const int = balance * r;
      const prin = emi - int;
      balance -= prin;
    }
    balance = Math.max(0, balance - prepayment);

    // New tenure from here
    let newMonths = 0;
    if (balance > 0) {
      if (r === 0) {
        newMonths = Math.ceil(balance / emi);
      } else {
        const denom = emi - balance * r;
        if (denom > 0) {
          newMonths = Math.log(emi / denom) / Math.log(1 + r);
          newMonths = Math.ceil(newMonths);
        }
      }
    }

    const totalNewPayments = emi * (prepaymentMonth - 1) + prepayment + emi * newMonths;
    const interestNew = Math.max(0, totalNewPayments - loanAmount);
    const saved = Math.max(0, interestOriginal - interestNew);
    const monthsSaved = Math.max(0, n - (prepaymentMonth - 1 + newMonths));

    return {
      emi: Math.round(emi),
      interestOriginal: Math.round(interestOriginal),
      interestNew: Math.round(interestNew),
      interestSaved: Math.round(saved),
      monthsSaved,
    };
  }, [loanAmount, rate, tenure, prepayment, prepaymentMonth]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div>
          <SliderInput label="Loan Amount" value={loanAmount} min={100000} max={10000000} step={50000} prefix="₹" onChange={setLoanAmount} formatDisplay={v => abbreviate(v)} />
          <SliderInput label="Interest Rate (p.a)" value={rate} min={5} max={20} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        </div>
        <div>
          <SliderInput label="Loan Tenure" value={tenure} min={1} max={30} suffix=" Yr" onChange={setTenure} />
          <SliderInput label="Prepayment Amount" value={prepayment} min={10000} max={2000000} step={10000} prefix="₹" onChange={setPrepayment} formatDisplay={v => abbreviate(v)} accentColor="var(--positive)" />
          <SliderInput label="Prepayment at Month" value={prepaymentMonth} min={1} max={tenure * 12} onChange={setPrepaymentMonth} />
        </div>
      </div>

      {/* Savings highlight */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {[
          { label: 'Your Monthly EMI', value: `₹${result.emi.toLocaleString('en-IN')}`, color: 'var(--accent)' },
          { label: 'Interest Saved', value: abbreviate(result.interestSaved), color: 'var(--positive)' },
          { label: 'Months Saved', value: `${result.monthsSaved} months`, color: '#D97706' },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-xl text-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{item.label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>

      <ResultCard results={[
        { label: 'Original Total Interest', value: result.interestOriginal, prefix: '₹' },
        { label: 'New Total Interest', value: result.interestNew, prefix: '₹' },
        { label: 'Interest Saved', value: result.interestSaved, prefix: '₹', highlight: true },
      ]} />
    </div>
  );
}

'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function EPFCalculator() {
  const [salary, setSalary] = useState(50000);
  const [age, setAge] = useState(30);
  const [contribution, setContribution] = useState(12);
  const [annualIncrease, setAnnualIncrease] = useState(5);
  const RATE = 8.25;

  const { empCorpus, empShareTotal } = useMemo(() => {
    let t = salary;
    const rate = RATE; // e in groww
    const startAge = age; // n in groww
    const contributionPercent = contribution; // o in groww
    const annualInc = annualIncrease; // r in groww
    const retireAge = 58; // a in groww
    
    let d = 0; // Total Corpus
    let totalInvested = 0; // We track this separately
    const f = rate / 12;

    for (let u = startAge; u < retireAge; u++) {
      let n = 0; // Yearly contributions
      let a = 0; // Intra-year interest on contributions
      
      t += Math.round((t * annualInc) / 100);

      for (let month = 0; month < 12; month++) {
        let M = Math.round((contributionPercent * t) / 100); // Employee share
        let i = 0; // Employer share
        
        if (t > 15000) {
          let e = Math.round((3.67 * t) / 100);
          i = Math.round((8.33 * t) / 100) - Math.round(1249.5) + e;
        } else {
          i = Math.round((3.67 * t) / 100);
        }
        
        a += Math.round((n * f) / 100);
        n += M + i;
      }
      
      d += n + a;
      let p = Math.round((d * rate) / 100);
      d += p;
      
      totalInvested += n;
    }

    return { 
      empCorpus: d, 
      empShareTotal: totalInvested 
    };
  }, [salary, age, contribution, annualIncrease]);

  const interest = Math.max(0, empCorpus - empShareTotal);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <div className="mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: 'rgba(217,178,124,0.15)', color: 'var(--gold-deep)' }}>
          📌 EPF interest rate: <strong>8.25% p.a.</strong>
        </div>
        <SliderInput label="Monthly salary (Basic + DA)" value={salary} min={1000} max={500000} step={1000} prefix="₹" onChange={setSalary} />
        <SliderInput label="Your age" value={age} min={15} max={58} suffix=" Yr" onChange={setAge} />
        <SliderInput label="Your contribution to EPF" value={contribution} min={12} max={20} suffix="%" onChange={setContribution} />
        <SliderInput label="Annual increase in salary" value={annualIncrease} min={0} max={15} suffix="%" onChange={setAnnualIncrease} />
        
        <ResultCard results={[
          { label: 'Total Investment', value: empShareTotal, prefix: '₹' },
          { label: 'Interest Earned', value: interest, prefix: '₹' },
          { label: 'Total EPF Corpus', value: empCorpus, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Contribution', value: empShareTotal, color: 'var(--gold)' },
            { label: 'Interest', value: interest, color: 'var(--burgundy)' },
          ]}
          total={empCorpus}
          centerLabel="EPF Corpus"
          centerValue={abbreviate(empCorpus)}
        />
      </div>
    </div>
  );
}

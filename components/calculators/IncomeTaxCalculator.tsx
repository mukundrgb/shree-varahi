'use client';
import { useState, useMemo } from 'react';
import DonutChart from '@/components/calculators/ui/DonutChart';

const NumberInput = ({ label, value, onChange }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border/50 last:border-0 gap-2">
    <label className="text-[13px] font-medium text-muted-foreground flex-1">{label}</label>
    <div className="relative w-full sm:w-48">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
      <input 
        type="number" 
        value={value || ''} 
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        placeholder="0"
        className="w-full bg-muted/30 border border-border rounded-lg pl-8 pr-3 py-2 text-right font-bold focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-[14px]"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
      />
    </div>
  </div>
);

const Accordion = ({ title, open, onToggle, children }: any) => (
  <div className="border border-border rounded-2xl mb-4 overflow-hidden bg-card shadow-sm transition-all">
    <div className="flex justify-between items-center p-5 cursor-pointer hover:bg-muted/30" onClick={onToggle}>
      <h3 className="font-bold text-[16px] text-foreground">{title}</h3>
      <span className="text-muted-foreground transform transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
        </svg>
      </span>
    </div>
    {open && <div className="p-5 pt-0 border-t border-border bg-card">{children}</div>}
  </div>
);

export default function IncomeTaxCalculator() {
  const [openSection, setOpenSection] = useState('Income');
  
  const [ay, setAy] = useState('2025 - 2026');
  const [age, setAge] = useState('Below 60');

  // Income
  const [grossSalary, setGrossSalary] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [interestIncome, setInterestIncome] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [homeLoanSelf, setHomeLoanSelf] = useState(0);
  const [homeLoanLetOut, setHomeLoanLetOut] = useState(0);

  // Deductions
  const [deduction80C, setDeduction80C] = useState(0);
  const [nps80CCD, setNps80CCD] = useState(0);
  const [medical80D, setMedical80D] = useState(0);
  const [donation80G, setDonation80G] = useState(0);
  const [eduLoan80E, setEduLoan80E] = useState(0);
  const [savings80TTA, setSavings80TTA] = useState(0);

  // HRA
  const [basicSalary, setBasicSalary] = useState(0);
  const [da, setDa] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [isMetro, setIsMetro] = useState(true);

  const {
    totalTaxOld, totalTaxNew, taxableOld, taxableNew, diff
  } = useMemo(() => {
    // 1. HRA Exemption
    let hraExemption = 0;
    if (rentPaid > 0 && basicSalary > 0 && hraReceived > 0) {
      const rentMinus10Percent = Math.max(0, rentPaid - 0.10 * (basicSalary + da));
      const percentageOfSalary = (isMetro ? 0.50 : 0.40) * (basicSalary + da);
      hraExemption = Math.min(hraReceived, rentMinus10Percent, percentageOfSalary);
    }

    // 2. House Property Income
    const netRentalIncome = rentalIncome - (rentalIncome * 0.30);
    const housePropertyIncomeOld = netRentalIncome - homeLoanLetOut - Math.min(200000, homeLoanSelf);
    const housePropertyIncomeNew = netRentalIncome;

    // 3. Gross Income
    const stdDedOld = 50000;
    const stdDedNew = 75000;

    let incomeSalaryOld = Math.max(0, grossSalary - hraExemption - stdDedOld);
    let incomeSalaryNew = Math.max(0, grossSalary - stdDedNew);

    const grossTotalIncomeOld = incomeSalaryOld + housePropertyIncomeOld + otherIncome + interestIncome;
    const grossTotalIncomeNew = incomeSalaryNew + housePropertyIncomeNew + otherIncome + interestIncome;

    // 4. Deductions
    const d80C = Math.min(150000, deduction80C);
    const d80CCD = Math.min(50000, nps80CCD);
    const max80D = age === 'Below 60' ? 25000 : 50000;
    const d80D = Math.min(max80D, medical80D);
    const d80G = donation80G;
    const d80E = eduLoan80E;
    const max80TTA = age === 'Below 60' ? 10000 : 50000;
    const d80TTA = Math.min(max80TTA, savings80TTA);

    const totalDeductionsOld = d80C + d80CCD + d80D + d80G + d80E + d80TTA;
    
    // 5. Taxable Income
    const taxIncomeOld = Math.max(0, grossTotalIncomeOld - totalDeductionsOld);
    const taxIncomeNew = Math.max(0, grossTotalIncomeNew);

    // 6. Tax Calculation Old Regime
    let taxOld = 0;
    let exemptionLimit = age === '80 or Above 80' ? 500000 : age === '60 or Above 60' ? 300000 : 250000;
    
    if (taxIncomeOld > exemptionLimit) {
      if (taxIncomeOld <= 500000) {
        taxOld = (taxIncomeOld - exemptionLimit) * 0.05;
      } else if (taxIncomeOld <= 1000000) {
        taxOld = (500000 - exemptionLimit) * 0.05 + (taxIncomeOld - 500000) * 0.20;
      } else {
        taxOld = (500000 - exemptionLimit) * 0.05 + 100000 + (taxIncomeOld - 1000000) * 0.30;
      }
    }

    if (taxIncomeOld <= 500000) taxOld = 0; // Rebate 87A

    // 7. Tax Calculation New Regime
    let taxNew = 0;
    if (taxIncomeNew > 300000) {
      if (taxIncomeNew <= 700000) taxNew = (taxIncomeNew - 300000) * 0.05;
      else if (taxIncomeNew <= 1000000) taxNew = 20000 + (taxIncomeNew - 700000) * 0.10;
      else if (taxIncomeNew <= 1200000) taxNew = 50000 + (taxIncomeNew - 1000000) * 0.15;
      else if (taxIncomeNew <= 1500000) taxNew = 80000 + (taxIncomeNew - 1200000) * 0.20;
      else taxNew = 140000 + (taxIncomeNew - 1500000) * 0.30;
    }

    // Marginal relief for New Regime
    if (taxIncomeNew <= 700000) {
      taxNew = 0;
    } else if (taxIncomeNew > 700000 && taxIncomeNew <= 727777) {
      const incomeAbove7L = taxIncomeNew - 700000;
      if (taxNew > incomeAbove7L) taxNew = incomeAbove7L;
    }

    const totalTaxOldFinal = Math.round(taxOld * 1.04);
    const totalTaxNewFinal = Math.round(taxNew * 1.04);

    return { 
      totalTaxOld: totalTaxOldFinal, 
      totalTaxNew: totalTaxNewFinal, 
      taxableOld: taxIncomeOld, 
      taxableNew: taxIncomeNew, 
      diff: totalTaxOldFinal - totalTaxNewFinal
    };
  }, [grossSalary, otherIncome, interestIncome, rentalIncome, homeLoanSelf, homeLoanLetOut, deduction80C, nps80CCD, medical80D, donation80G, eduLoan80E, savings80TTA, basicSalary, da, hraReceived, rentPaid, isMetro, age]);

  const recommended = diff > 0 ? 'New Regime' : diff < 0 ? 'Old Regime' : 'Any Regime';
  const savings = Math.abs(diff);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full max-w-3xl">
        
        {/* Top Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-[13px] font-medium text-muted-foreground mb-2 block">Assessment year</label>
            <select 
              value={ay} 
              onChange={e => setAy(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer shadow-sm"
            >
              <option>2026 - 2027</option>
              <option>2025 - 2026</option>
              <option>2024 - 2025</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-[13px] font-medium text-muted-foreground mb-2 block">Age category</label>
            <select 
              value={age} 
              onChange={e => setAge(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer shadow-sm"
            >
              <option>Below 60</option>
              <option>60 or Above 60</option>
              <option>80 or Above 80</option>
            </select>
          </div>
        </div>

        {/* Accordions */}
        <Accordion title="Income" open={openSection === 'Income'} onToggle={() => setOpenSection(openSection === 'Income' ? '' : 'Income')}>
          <NumberInput label="Gross salary income" value={grossSalary} onChange={setGrossSalary} />
          <NumberInput label="Annual income from other sources" value={otherIncome} onChange={setOtherIncome} />
          <NumberInput label="Annual income from interest" value={interestIncome} onChange={setInterestIncome} />
          <NumberInput label="Annual income from let-out house property (rental income)" value={rentalIncome} onChange={setRentalIncome} />
          <NumberInput label="Annual interest paid on home loan (self-occupied)" value={homeLoanSelf} onChange={setHomeLoanSelf} />
          <NumberInput label="Annual interest paid on home loan (let-out)" value={homeLoanLetOut} onChange={setHomeLoanLetOut} />
        </Accordion>

        <Accordion title="Deductions" open={openSection === 'Deductions'} onToggle={() => setOpenSection(openSection === 'Deductions' ? '' : 'Deductions')}>
          <NumberInput label="Basic deductions u/s 80C" value={deduction80C} onChange={setDeduction80C} />
          <NumberInput label="Contribution to NPS u/s 80CCD(1B)" value={nps80CCD} onChange={setNps80CCD} />
          <NumberInput label="Medical Insurance Premium u/s 80D" value={medical80D} onChange={setMedical80D} />
          <NumberInput label="Donation to charity u/s 80G" value={donation80G} onChange={setDonation80G} />
          <NumberInput label="Interest on Educational Loan u/s 80E" value={eduLoan80E} onChange={setEduLoan80E} />
          <NumberInput label="Interest on deposits in saving account u/s 80TTA/TTB" value={savings80TTA} onChange={setSavings80TTA} />
        </Accordion>

        <Accordion title="HRA Exemption" open={openSection === 'HRA Exemption'} onToggle={() => setOpenSection(openSection === 'HRA Exemption' ? '' : 'HRA Exemption')}>
          <NumberInput label="Basic salary received per annum" value={basicSalary} onChange={setBasicSalary} />
          <NumberInput label="Dearness allowance (DA) received per annum" value={da} onChange={setDa} />
          <NumberInput label="HRA received per annum" value={hraReceived} onChange={setHraReceived} />
          <NumberInput label="Total rent paid per annum" value={rentPaid} onChange={setRentPaid} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border/50 last:border-0 gap-2">
            <label className="text-[13px] font-medium text-muted-foreground flex-1">Do you live in a metro city?</label>
            <div className="flex gap-4 w-full sm:w-48 justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={isMetro} onChange={() => setIsMetro(true)} className="accent-[#FF0000] w-4 h-4" />
                <span className="text-sm font-semibold text-foreground">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!isMetro} onChange={() => setIsMetro(false)} className="accent-[#FF0000] w-4 h-4" />
                <span className="text-sm font-semibold text-foreground">No</span>
              </label>
            </div>
          </div>
        </Accordion>

      </div>

      {/* Results Section */}
      <div className="w-full lg:w-[350px] flex-shrink-0">
        <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-[18px] font-bold text-foreground mb-6 font-display">Tax Summary</h2>
          
          <div className="flex flex-col gap-6">
            {/* Save Pill */}
            {savings > 0 ? (
              <div className="bg-[rgba(255,0,0,0.08)] border border-[rgba(255,0,0,0.2)] text-[#FF0000] px-4 py-4 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold mb-1 uppercase tracking-wide opacity-80">Recommended: {recommended}</span>
                <span className="font-bold text-2xl font-display">Save ₹{savings.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <div className="bg-muted text-foreground px-4 py-4 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold mb-1 uppercase tracking-wide opacity-80">Taxes are equal</span>
                <span className="font-bold text-2xl font-display">₹{totalTaxNew.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40">
                <span className="text-[14px] font-semibold text-muted-foreground">Tax (Old Regime)</span>
                <span className="text-[16px] font-bold">₹{totalTaxOld.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--accent-bg)', border: '1px solid rgba(200,16,46,0.15)' }}>
                <span className="text-[14px] font-bold text-accent">Tax (New Regime)</span>
                <span className="text-[16px] font-bold text-accent">₹{totalTaxNew.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="h-[1px] bg-border my-2 w-full"></div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground">Taxable Income (Old)</span>
                <span className="text-[13px] font-bold text-foreground">₹{taxableOld.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground">Taxable Income (New)</span>
                <span className="text-[13px] font-bold text-foreground">₹{taxableNew.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
               <DonutChart
                segments={[
                  { label: 'Take Home', value: Math.max(0, grossSalary - (diff > 0 ? totalTaxNew : totalTaxOld)), color: 'var(--gold)' },
                  { label: 'Tax', value: diff > 0 ? totalTaxNew : totalTaxOld, color: 'var(--burgundy)' },
                ]}
                total={grossSalary}
                centerLabel="Tax Rate"
                centerValue={`${((diff > 0 ? totalTaxNew : totalTaxOld) / (grossSalary || 1) * 100).toFixed(1)}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

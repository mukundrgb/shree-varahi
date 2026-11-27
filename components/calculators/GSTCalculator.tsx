'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import { formatCurrency } from '@/lib/calculators/formatters';

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const { gstAmount, preGST, postGST, cgst, sgst, igst } = useMemo(() => {
    let pre = 0, gst = 0, post = 0;
    if (type === 'exclusive') {
      pre = amount;
      gst = amount * gstRate / 100;
      post = amount + gst;
    } else {
      post = amount;
      pre = amount / (1 + gstRate / 100);
      gst = amount - pre;
    }
    return {
      gstAmount: gst, preGST: pre, postGST: post,
      cgst: gst / 2, sgst: gst / 2, igst: gst,
    };
  }, [amount, gstRate, type]);

  const rates = [5, 12, 18, 28];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <CalculatorTabs 
          activeId={type} 
          onChange={(id) => setType(id as 'exclusive' | 'inclusive')}
          tabs={[
            { id: 'exclusive', label: 'GST Exclusive' },
            { id: 'inclusive', label: 'GST Inclusive' }
          ]} 
        />
        <SliderInput label={type === 'exclusive' ? 'Amount (excl. GST)' : 'Amount (incl. GST)'} value={amount} min={100} max={10000000} step={100} prefix="₹" onChange={setAmount} />
        <div className="mb-5">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>GST Rate</p>
          <div className="flex gap-2">
            {rates.map(r => (
              <button key={r} onClick={() => setGstRate(r)}
                className="px-3 py-2 rounded-xl text-sm font-bold transition-all flex-1"
                style={{
                  background: gstRate === r ? 'var(--burgundy)' : 'white',
                  color: gstRate === r ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${gstRate === r ? 'var(--burgundy)' : 'var(--border)'}`,
                }}>
                {r}%
              </button>
            ))}
          </div>
        </div>
        <ResultCard results={[
          { label: 'Pre-GST Amount', value: preGST, formatFn: v => formatCurrency(v, 2) },
          { label: `GST (${gstRate}%)`, value: gstAmount, formatFn: v => formatCurrency(v, 2) },
          { label: 'CGST (Intra-state)', value: cgst, formatFn: v => formatCurrency(v, 2) },
          { label: 'SGST (Intra-state)', value: sgst, formatFn: v => formatCurrency(v, 2) },
          { label: 'Post-GST Amount', value: postGST, highlight: true, formatFn: v => formatCurrency(v, 2) },
        ]} />
      </div>
    </div>
  );
}

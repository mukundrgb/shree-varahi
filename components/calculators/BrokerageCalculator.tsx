'use client';
import { useState, useMemo } from 'react';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import { formatCurrency } from '@/lib/calculators/formatters';

export default function BrokerageCalculator() {
  const [activeTab, setActiveTab] = useState('delivery');
  const [exchange, setExchange] = useState('NSE');
  const [foType, setFoType] = useState('options');

  const [qtyStr, setQtyStr] = useState('100');
  const [buyStr, setBuyStr] = useState('500');
  const [sellStr, setSellStr] = useState('750');

  const qty = parseFloat(qtyStr) || 0;
  const buyPrice = parseFloat(buyStr) || 0;
  const sellPrice = parseFloat(sellStr) || 0;

  const { turnover, grossPL, brokerage, stt, exchangeFee, sebi, gst, stampDuty, totalCharges, netPL } = useMemo(() => {
    const buyValue = buyPrice * qty;
    const sellValue = sellPrice * qty;
    const totalTurnover = buyValue + sellValue;
    const pl = sellValue - buyValue;

    const round2 = (num: number) => Math.round(num * 100) / 100;

    let brok = 0, sttCharge = 0, exch = 0, sebiFee = 0, gstFee = 0, stamp = 0;

    sebiFee = round2(totalTurnover * 0.000001); // 10 per crore

    if (activeTab === 'delivery') {
      brok = round2(Math.min(buyValue * 0.0005, 20) + Math.min(sellValue * 0.0005, 20));
      sttCharge = Math.round(totalTurnover * 0.001);
      exch = round2(exchange === 'NSE' ? totalTurnover * 0.0000325 : totalTurnover * 0.0000375);
      stamp = round2(buyValue * 0.00015);
    } else if (activeTab === 'intraday') {
      brok = round2(Math.min(buyValue * 0.0005, 20) + Math.min(sellValue * 0.0005, 20));
      sttCharge = Math.round(sellValue * 0.00025);
      exch = round2(exchange === 'NSE' ? totalTurnover * 0.0000325 : totalTurnover * 0.0000375);
      stamp = round2(buyValue * 0.00003);
    } else if (activeTab === 'fo') {
      if (foType === 'futures') {
        brok = 40; // 20 per order
        sttCharge = Math.round(sellValue * 0.0002); // 0.02% on sell (Oct 2024 update)
        exch = round2(exchange === 'NSE' ? totalTurnover * 0.000019 : 0);
        stamp = round2(buyValue * 0.00002);
      } else {
        // Options
        brok = 40; // 20 per order
        sttCharge = Math.round(sellValue * 0.001); // 0.1% on sell (Oct 2024 update)
        exch = round2(exchange === 'NSE' ? totalTurnover * 0.0005 : totalTurnover * 0.000375);
        stamp = round2(buyValue * 0.00003);
      }
    }

    gstFee = round2((brok + exch + sebiFee) * 0.18);
    const totCharges = round2(brok + sttCharge + exch + sebiFee + gstFee + stamp);
    const net = round2(pl - totCharges);

    return {
      turnover: totalTurnover,
      grossPL: pl,
      brokerage: brok,
      stt: sttCharge,
      exchangeFee: exch,
      sebi: sebiFee,
      gst: gstFee,
      stampDuty: stamp,
      totalCharges: totCharges,
      netPL: net
    };
  }, [buyPrice, sellPrice, qty, activeTab, exchange, foType]);

  const InputRow = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-1 mb-6">
      <label className="flex justify-between items-end border-b border-gray-300 pb-1 focus-within:border-burgundy transition-colors cursor-text">
        <span className="text-[14px] text-gray-500">{label}</span>
        <input
          type="number"
          className="text-right outline-none font-bold text-[16px] text-gray-800 bg-transparent flex-1 ml-4"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );

  const ResultRow = ({ label, value, isHighlight = false, isBold = false }: { label: string, value: number, isHighlight?: boolean, isBold?: boolean }) => (
    <div className={`flex justify-between items-center py-2 ${isHighlight ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
      <span className={`text-[14px] ${isBold ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{label}</span>
      <span className={`text-[15px] ${isHighlight ? 'text-xl font-bold ' + (value >= 0 ? 'text-green-600' : 'text-red-500') : (isBold ? 'font-bold text-gray-800' : 'text-gray-800')}`}>
        {isHighlight && value > 0 ? '+' : ''}{formatCurrency(value, 2)}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Left side: Inputs */}
      <div className="flex-1">
        <CalculatorTabs
          activeId={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'delivery', label: 'Equity - delivery' },
            { id: 'intraday', label: 'Equity - intraday' },
            { id: 'fo', label: 'F&O' }
          ]}
        />

        <div className="mt-8 flex justify-between items-center mb-6">
          <label className="text-[14px] text-gray-500 font-medium">Qty</label>
          <div className="flex items-center gap-4">
            {activeTab === 'fo' && (
              <div className="flex bg-gray-100 rounded-full p-0.5">
                <button
                  className={`px-3 py-1 text-[12px] rounded-full transition-colors ${foType === 'options' ? 'bg-white shadow-sm font-bold text-gray-800' : 'text-gray-500'}`}
                  onClick={() => setFoType('options')}
                >
                  Options
                </button>
                <button
                  className={`px-3 py-1 text-[12px] rounded-full transition-colors ${foType === 'futures' ? 'bg-white shadow-sm font-bold text-gray-800' : 'text-gray-500'}`}
                  onClick={() => setFoType('futures')}
                >
                  Futures
                </button>
              </div>
            )}
            <div className="flex bg-gray-100 rounded-full p-0.5">
              <button
                className={`px-3 py-1 text-[12px] rounded-full transition-colors ${exchange === 'NSE' ? 'bg-white shadow-sm font-bold text-gray-800' : 'text-gray-500'}`}
                onClick={() => setExchange('NSE')}
              >
                NSE
              </button>
              <button
                className={`px-3 py-1 text-[12px] rounded-full transition-colors ${exchange === 'BSE' ? 'bg-white shadow-sm font-bold text-gray-800' : 'text-gray-500'}`}
                onClick={() => setExchange('BSE')}
              >
                BSE
              </button>
            </div>
          </div>
        </div>
        
        <label className="border-b border-gray-300 pb-1 mb-6 flex justify-end focus-within:border-burgundy transition-colors cursor-text">
           <input
            type="number"
            className="text-right outline-none font-bold text-[16px] text-gray-800 bg-transparent w-full"
            value={qtyStr}
            onChange={(e) => setQtyStr(e.target.value)}
          />
        </label>

        <InputRow label="Buy price per share" value={buyStr} onChange={setBuyStr} />
        <InputRow label="Sell price per share" value={sellStr} onChange={setSellStr} />
      </div>

      {/* Right side: Outputs */}
      <div className="w-full md:w-[340px] bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col">
        <ResultRow label="Turnover" value={turnover} isBold />
        <ResultRow label="P&L" value={grossPL} isBold />
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <ResultRow label="Charges" value={totalCharges} isBold />
          
          <div className="pl-4 mt-2 space-y-1">
            <ResultRow label="Brokerage charges" value={brokerage} />
            <ResultRow label="Non-Brokerage charges" value={totalCharges - brokerage} />
            
            <div className="pl-4 mt-1 border-l-2 border-gray-200 space-y-1 text-gray-500">
              <ResultRow label="Securities Transaction Tax, STT" value={stt} />
              <ResultRow label="Exchange charges" value={exchangeFee} />
              <ResultRow label="SEBI Turnover Fees" value={sebi} />
              <ResultRow label="GST" value={gst} />
              <ResultRow label="Stamp Duty" value={stampDuty} />
            </div>
          </div>
        </div>

        <div className="mt-auto">
           <ResultRow label="Net P&L" value={netPL} isHighlight />
        </div>
      </div>
    </div>
  );
}

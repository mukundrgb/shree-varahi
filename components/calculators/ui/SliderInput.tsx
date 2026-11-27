'use client';
import { useState, useCallback, useId } from 'react';
import { clamp, formatNumber } from '@/lib/calculators/formatters';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
  formatDisplay?: (v: number) => string;
  accentColor?: string;
}

export default function SliderInput({
  label, value, min, max, step = 1,
  prefix = '', suffix = '',
  onChange, formatDisplay,
  accentColor = 'var(--accent)',
}: SliderInputProps) {
  const id = useId();
  const [inputVal, setInputVal] = useState('');
  const [editing, setEditing] = useState(false);

  let display = formatDisplay ? formatDisplay(value) : formatNumber(value);
  if (prefix && display.startsWith(prefix)) display = display.slice(prefix.length);

  let minDisplay = formatDisplay ? formatDisplay(min) : formatNumber(min);
  if (prefix && minDisplay.startsWith(prefix)) minDisplay = minDisplay.slice(prefix.length);

  let maxDisplay = formatDisplay ? formatDisplay(max) : formatNumber(max);
  if (prefix && maxDisplay.startsWith(prefix)) maxDisplay = maxDisplay.slice(prefix.length);

  const pct = Math.round(((value - min) / (max - min)) * 100);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');
    setInputVal(raw);
    const n = parseFloat(raw);
    if (!isNaN(n)) onChange(clamp(n, min, max));
  }, [onChange, min, max]);

  const handleBlur = useCallback(() => {
    setEditing(false);
    setInputVal('');
    const n = parseFloat(inputVal.replace(/,/g, ''));
    if (!isNaN(n)) onChange(clamp(n, min, max));
  }, [inputVal, onChange, min, max]);

  const startEditing = () => {
    setEditing(true);
    setInputVal(value === 0 ? '' : value.toString());
  };

  return (
    <div className="mb-8">
      {/* Label + Value Row */}
      <div className="flex items-center justify-between mb-4">
        <label
          htmlFor={id}
          className="text-[14px] font-bold cursor-default"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>

        {/* Editable value pill */}
        <div
          className="flex items-center gap-1 px-4 py-2 rounded-[5px] cursor-text transition-all"
          style={{
            background: editing ? 'rgba(255,0,0,0.06)' : 'rgba(255,0,0,0.03)',
            border: `1px solid ${editing ? 'var(--accent)' : 'rgba(255,0,0,0.15)'}`,
            boxShadow: editing ? '0 0 0 3px var(--accent-glow)' : 'none',
            minWidth: 100,
            justifyContent: 'flex-end',
          }}
          onClick={startEditing}
        >
          {prefix && (
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600 }}>{prefix}</span>
          )}
          {editing ? (
            <input
              autoFocus
              onFocus={e => e.target.select()}
              type="number"
              value={inputVal}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="outline-none bg-transparent text-right font-black text-[15px] w-20"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
            />
          ) : (
            <span style={{
              color: 'var(--accent)',
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              fontWeight: 900,
            }}>
              {display}
            </span>
          )}
          {suffix && (
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600 }}>{suffix}</span>
          )}
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} ${pct}%, var(--border) ${pct}%)`,
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2">
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}>
          {prefix}{minDisplay}{suffix}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}>
          {prefix}{maxDisplay}{suffix}
        </span>
      </div>
    </div>
  );
}

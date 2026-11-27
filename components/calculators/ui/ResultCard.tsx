'use client';
import { useEffect, useRef, useState } from 'react';
import { abbreviate } from '@/lib/calculators/formatters';

interface ResultItem {
  label: string;
  value: number;
  highlight?: boolean;
  prefix?: string;
  suffix?: string;
  formatFn?: (v: number) => string;
  color?: string;
}

interface ResultCardProps {
  results: ResultItem[];
}

function AnimatedValue({ value, formatFn, prefix = '', suffix = '' }: {
  value: number;
  formatFn?: (v: number) => string;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    if (start === end) return;

    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = end;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  const abbr = abbreviate(displayValue);
  const finalAbbr = (prefix && abbr.startsWith(prefix)) ? abbr.slice(prefix.length) : abbr;

  const formatted = formatFn
    ? formatFn(displayValue)
    : `${prefix}${finalAbbr}${suffix}`;

  return <span>{formatted}</span>;
}

export default function ResultCard({ results }: ResultCardProps) {
  return (
    <div className="flex flex-col gap-2.5 mt-6">
      {results.map((item, i) => {
        const isHighlight = item.highlight;

        return (
          <div
            key={i}
            className={`relative overflow-hidden flex items-center justify-between px-4 py-3.5 transition-all mb-3 last:mb-0 rounded-[5px]`}
            style={isHighlight ? {
              background: 'linear-gradient(135deg, rgba(255,0,0,0.08), rgba(255,0,0,0.03))',
              border: '1px solid rgba(255,0,0,0.2)',
              boxShadow: '0 2px 8px rgba(255,0,0,0.05)',
            } : {
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Highlight shimmer overlay */}
            {isHighlight && (
              <div className="absolute inset-0 pointer-events-none rounded-[5px]"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,0,0,0.1) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s ease infinite',
                }} />
            )}

            <span
              className="text-[14px] font-semibold relative z-10"
              style={{ color: isHighlight ? 'var(--accent)' : 'var(--text-secondary)' }}
            >
              {item.label}
            </span>

            <span
              className="font-black relative z-10 text-[18px]"
              style={{
                fontFamily: 'var(--font-display)',
                color: isHighlight ? 'var(--accent)' : 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              <AnimatedValue
                value={item.value}
                formatFn={item.formatFn}
                prefix={item.prefix}
                suffix={item.suffix}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

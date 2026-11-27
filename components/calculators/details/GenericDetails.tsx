import React from 'react';

export interface CalculatorDetailData {
  title: string;
  whatIs: string;
  howWorksDesc: string;
  inputs: { label: string; desc: string }[];
  formulaDesc: string;
  formulaBox: string;
  formulaVars: { label: string; desc: string }[];
  benefits: string[];
}

export default function GenericDetails({ data }: { data: CalculatorDetailData }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
          What is {data.title}?
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 14 }}>{data.whatIs}</p>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
          How does it work?
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 14, marginBottom: 12 }}>{data.howWorksDesc}</p>
        <ul className="space-y-2.5">
          {data.inputs.map((input, idx) => (
            <li key={idx} className="flex gap-3" style={{ fontSize: 14 }}>
              <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>▸</span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{input.label}:</strong> {input.desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {data.formulaBox && (
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            Formula
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 14, marginBottom: 12 }}>{data.formulaDesc}</p>
          <div
            className="font-mono text-center overflow-x-auto text-sm rounded-xl p-4"
            style={{
              background: 'rgba(200,16,46,0.05)',
              border: '1px solid rgba(200,16,46,0.2)',
              color: 'var(--accent)',
              letterSpacing: '0.02em',
            }}
          >
            {data.formulaBox}
          </div>
          {data.formulaVars && data.formulaVars.length > 0 && (
            <div className="mt-4 space-y-1.5" style={{ fontSize: 13 }}>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Where:</p>
              <ul className="space-y-1.5 ml-2">
                {data.formulaVars.map((v, idx) => (
                  <li key={idx} className="flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>
                    <span><strong style={{ color: 'var(--text-primary)' }}>{v.label}</strong> = {v.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {data.benefits && data.benefits.length > 0 && (
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            Key Benefits
          </h2>
          <ul className="space-y-2.5">
            {data.benefits.map((benefit, idx) => {
              const parts = benefit.split(':');
              if (parts.length > 1) {
                return (
                  <li key={idx} className="flex gap-3" style={{ fontSize: 14 }}>
                    <span style={{ color: 'var(--positive)', marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{parts[0]}:</strong>{parts.slice(1).join(':')}
                    </span>
                  </li>
                );
              }
              return (
                <li key={idx} className="flex gap-3" style={{ fontSize: 14 }}>
                  <span style={{ color: 'var(--positive)', marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>{benefit}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

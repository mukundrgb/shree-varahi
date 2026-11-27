import React from 'react';

const h2Style: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 14 };

function BulletItem({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3" style={{ fontSize: 14 }}>
      <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>▸</span>
      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {label && <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{label}: </strong>}
        {children}
      </span>
    </li>
  );
}

function CheckItem({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3" style={{ fontSize: 14 }}>
      <span style={{ color: 'var(--positive)', marginTop: 2, flexShrink: 0 }}>✓</span>
      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {label && <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{label}: </strong>}
        {children}
      </span>
    </li>
  );
}

function FormulaBox({ formula, vars }: { formula: string; vars: { k: string; v: string }[] }) {
  return (
    <>
      <div className="font-mono text-center overflow-x-auto text-sm rounded-xl p-4"
        style={{ background: 'rgba(200,16,46,0.05)', border: '1px solid rgba(200,16,46,0.2)', color: 'var(--accent)', letterSpacing: '0.02em' }}>
        {formula}
      </div>
      {vars.length > 0 && (
        <div className="mt-4 space-y-1.5" style={{ fontSize: 13 }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Where:</p>
          <ul className="space-y-1.5 ml-2">
            {vars.map((item, i) => (
              <li key={i} className="flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>
                <span><strong style={{ color: 'var(--text-primary)' }}>{item.k}</strong> = {item.v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export { h2Style, pStyle, BulletItem, CheckItem, FormulaBox };

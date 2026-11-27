import Link from 'next/link';

interface TabItem {
  id: string;
  label: string;
  href?: string;
}

interface CalculatorTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange?: (id: string) => void;
}

export default function CalculatorTabs({ tabs, activeId, onChange }: CalculatorTabsProps) {
  return (
    <div
      className="inline-flex overflow-x-auto w-auto max-w-full mb-8 rounded-[8px] p-1 scrollbar-hide"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--glass-border)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const sharedStyle = {
          background: isActive ? 'var(--grad-accent)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-muted)',
          boxShadow: isActive ? 'var(--shadow-accent)' : 'none',
          fontFamily: isActive ? 'var(--font-display)' : 'var(--font-sans)',
        };
        const className = `cursor-pointer flex-shrink-0 px-5 py-2 rounded-[5px] text-[13px] font-bold transition-all duration-200 ${isActive ? '' : 'hover:text-[var(--accent)] hover:bg-[rgba(255,0,0,0.04)]'}`;

        if (tab.href) {
          return (
            <Link key={tab.id} href={tab.href} className={className} style={sharedStyle}>
              {tab.label}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange?.(tab.id)}
            className={className}
            style={sharedStyle}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

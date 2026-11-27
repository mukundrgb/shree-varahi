'use client';
import { useEffect, useRef } from 'react';

interface DonutChartProps {
  segments: { label: string; value: number; color: string }[];
  total: number;
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

export default function DonutChart({
  segments, total, centerLabel = 'Total Value', centerValue, size = 200,
}: DonutChartProps) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 20;

  const svgRef = useRef<SVGSVGElement>(null);
  const prevTotal = useRef(0);

  // Draw-in animation on mount and when values change
  useEffect(() => {
    if (!svgRef.current) return;
    const circles = svgRef.current.querySelectorAll<SVGCircleElement>('circle[data-animated]');
    circles.forEach(circle => {
      const targetDash = parseFloat(circle.getAttribute('data-target-dash') ?? '0');
      const targetGap = parseFloat(circle.getAttribute('data-target-gap') ?? circumference.toString());
      const targetOffset = parseFloat(circle.getAttribute('data-target-offset') ?? '0');

      // Start from 0 length
      circle.style.strokeDasharray = `0 ${circumference}`;
      circle.style.strokeDashoffset = String(-targetOffset + circumference * 0.25);

      // Animate to target
      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dasharray 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        circle.style.strokeDasharray = `${targetDash} ${targetGap}`;
      });
    });
    prevTotal.current = total;
  }, [total, circumference]);

  let offset = 0;
  const validTotal = total > 0 ? total : 1;

  const arcs = segments.map(seg => {
    const pct = seg.value / validTotal;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const arc = { ...seg, dash, gap, offset };
    offset += dash;
    return arc;
  });

  const SEGMENT_COLORS = segments.map(s => s.color);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Gradient defs */}
          <defs>
            {SEGMENT_COLORS.map((color, i) => (
              <radialGradient key={i} id={`seg-grad-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.7" />
              </radialGradient>
            ))}
          </defs>

          {/* Background track */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              data-animated="true"
              data-target-dash={arc.dash}
              data-target-gap={arc.gap}
              data-target-offset={arc.offset}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeDashoffset={-arc.offset + circumference * 0.25}
              style={{
                filter: `drop-shadow(0 0 6px ${arc.color}66)`,
                transition: 'stroke-dasharray 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </svg>

        {/* Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {centerLabel}
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 2,
            letterSpacing: '-0.02em',
          }}>
            {centerValue}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2.5 w-full">
        {segments.map((seg, i) => {
          const pct = total > 0 ? ((seg.value / total) * 100) : 0;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color, boxShadow: `0 0 6px ${seg.color}88` }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }}>{seg.label}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: 12, fontWeight: 700 }}>
                  {pct.toFixed(1)}%
                </span>
              </div>
              {/* Mini bar */}
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: seg.color, boxShadow: `0 0 8px ${seg.color}66` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { MilkPurchaseRecord } from "@/lib/types";
import { useMemo } from "react";

interface CollectionChartProps {
  purchases: MilkPurchaseRecord[];
}

/* Generate 7-day mock trend ending today */
function generate7DayTrend(purchases: MilkPurchaseRecord[]) {
  const today = new Date();
  const days: { date: string; label: string; liters: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-IN", { weekday: "short" });
    const todayLiters = purchases
      .filter((p) => p.date === dateStr)
      .reduce((sum, p) => sum + p.liters, 0);

    // Add mock data for past days if no real data
    const liters = i === 0 ? todayLiters : todayLiters || Math.round(40 + Math.random() * 80);
    days.push({ date: dateStr, label, liters });
  }
  return days;
}

export default function CollectionChart({ purchases }: CollectionChartProps) {
  const data = useMemo(() => generate7DayTrend(purchases), [purchases]);

  const W = 520;
  const H = 140;
  const PADX = 36;
  const PADY = 16;
  const chartW = W - PADX * 2;
  const chartH = H - PADY * 2;

  const maxVal = Math.max(...data.map((d) => d.liters), 10);

  const toX = (i: number) => PADX + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => PADY + chartH - (v / maxVal) * chartH;

  const points = data.map((d, i) => `${toX(i)},${toY(d.liters)}`).join(" ");

  // Filled area path
  const areaPath = [
    `M ${toX(0)},${PADY + chartH}`,
    ...data.map((d, i) => `L ${toX(i)},${toY(d.liters)}`),
    `L ${toX(data.length - 1)},${PADY + chartH}`,
    "Z",
  ].join(" ");

  // Line path
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(d.liters)}`).join(" ");

  const gradientId = "collection-gradient";

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <div className="section-title" style={{ fontSize: 13 }}>
            7-Day Collection Trend
          </div>
          <div className="section-title-hi">Weekly Collection Trend</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 10,
                height: 2,
                borderRadius: 1,
                background: "var(--cyan)",
                display: "inline-block",
              }}
            />
            Liters
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ overflow: "visible", display: "block" }}
        aria-label="7-day collection trend chart"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(6,182,212,0.25)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.00)" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
          const y = PADY + chartH * (1 - frac);
          const val = Math.round(maxVal * frac);
          return (
            <g key={i}>
              <line
                x1={PADX}
                y1={y}
                x2={W - PADX}
                y2={y}
                stroke="var(--border-muted)"
                strokeWidth="0.5"
              />
              <text
                x={PADX - 4}
                y={y + 3}
                textAnchor="end"
                fill="var(--text-dim)"
                fontSize="9"
              >
                {val > 0 ? val : ""}
              </text>
            </g>
          );
        })}

        {/* Filled area */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Data points & labels */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={toX(i)}
              cy={toY(d.liters)}
              r="3"
              fill="var(--bg-surface)"
              stroke="var(--cyan)"
              strokeWidth="1.5"
            />
            {/* Value label for non-zero */}
            {d.liters > 0 && (
              <text
                x={toX(i)}
                y={toY(d.liters) - 8}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="9"
              >
                {d.liters.toFixed(0)}
              </text>
            )}
            {/* Day label */}
            <text
              x={toX(i)}
              y={H - 2}
              textAnchor="middle"
              fill="var(--text-dim)"
              fontSize="9"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

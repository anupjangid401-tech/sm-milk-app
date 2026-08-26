"use client";

import { MilkPurchaseRecord } from "@/lib/types";
import { useMemo } from "react";

interface ShiftBarChartProps {
  purchases: MilkPurchaseRecord[];
}

export default function ShiftBarChart({ purchases }: ShiftBarChartProps) {
  const morningLiters = useMemo(
    () => purchases.filter((p) => p.shift === "MORNING").reduce((s, p) => s + p.liters, 0),
    [purchases]
  );
  const eveningLiters = useMemo(
    () => purchases.filter((p) => p.shift === "EVENING").reduce((s, p) => s + p.liters, 0),
    [purchases]
  );
  const buffaloLiters = useMemo(
    () => purchases.filter((p) => p.milkType === "BUFFALO").reduce((s, p) => s + p.liters, 0),
    [purchases]
  );
  const cowLiters = useMemo(
    () => purchases.filter((p) => p.milkType === "COW").reduce((s, p) => s + p.liters, 0),
    [purchases]
  );

  const total = morningLiters + eveningLiters || 1;

  const bars = [
    { label: "Morning", labelHi: "प्रातः", value: morningLiters, color: "var(--amber)", pct: morningLiters / total },
    { label: "Evening", labelHi: "सायं",   value: eveningLiters, color: "var(--blue)",  pct: eveningLiters / total },
    { label: "Buffalo", labelHi: "भैंस",   value: buffaloLiters, color: "var(--amber)", pct: buffaloLiters / (buffaloLiters + cowLiters || 1) },
    { label: "Cow",     labelHi: "गाय",    value: cowLiters,     color: "var(--blue)",  pct: cowLiters / (buffaloLiters + cowLiters || 1) },
  ];

  return (
    <div className="chart-card" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div className="chart-header">
        <div>
          <div className="section-title" style={{ fontSize: 13 }}>
            Distribution
          </div>
          <div className="section-title-hi">शिफ्ट / दूध प्रकार</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "center" }}>
        {bars.map((bar, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: bar.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                  {bar.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>({bar.labelHi})</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {bar.value.toFixed(1)}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Ltrs</span>
                <span style={{ fontSize: 11, color: bar.color, fontWeight: 600 }}>
                  {Math.round(bar.pct * 100)}%
                </span>
              </div>
            </div>

            {/* Bar track */}
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "var(--bg-elevated)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${bar.pct * 100}%`,
                  borderRadius: 3,
                  background: bar.color,
                  transition: "width 0.5s ease",
                  minWidth: bar.value > 0 ? 4 : 0,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary footer */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid var(--border-muted)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "var(--text-dim)",
        }}
      >
        <span>कुल संग्रह</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {(morningLiters + eveningLiters).toFixed(1)} Ltrs
        </span>
      </div>
    </div>
  );
}

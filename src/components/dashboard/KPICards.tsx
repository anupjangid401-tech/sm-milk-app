"use client";

import { Droplets, IndianRupee, TrendingUp, Users, Activity, FlaskConical } from "lucide-react";
import { MilkPurchaseRecord } from "@/lib/types";

interface KPICardsProps {
  purchases: MilkPurchaseRecord[];
  memberCount: number;
}

export default function KPICards({ purchases, memberCount }: KPICardsProps) {
  const totalLiters = purchases.reduce((acc, r) => acc + r.liters, 0);
  const totalPayout = purchases.reduce((acc, r) => acc + r.totalAmount, 0);
  const avgRate = totalLiters > 0 ? totalPayout / totalLiters : 0;

  const avgFat =
    purchases.length > 0
      ? (purchases.reduce((acc, r) => acc + r.fat * r.liters, 0) / (totalLiters || 1)).toFixed(1)
      : "—";

  const avgSnf =
    purchases.length > 0
      ? (purchases.reduce((acc, r) => acc + r.snf * r.liters, 0) / (totalLiters || 1)).toFixed(1)
      : "—";

  const buffaloCount = purchases.filter((r) => r.milkType === "BUFFALO").length;
  const cowCount = purchases.filter((r) => r.milkType === "COW").length;

  return (
    <div className="kpi-grid">
      {/* 1 — Today's Collection */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <div className="kpi-card-labels">
            <div className="kpi-label-en">Today's Collection</div>
            <div className="kpi-label-hi">Today's Collection</div>
          </div>
          <div className="kpi-icon cyan">
            <Droplets size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-value">{totalLiters.toFixed(1)}</span>
          <span className="kpi-unit">Ltrs</span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-footer-label">Entries</span>
          <span className="kpi-footer-value cyan">{purchases.length} Records</span>
        </div>
      </div>

      {/* 2 — Total Payable */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <div className="kpi-card-labels">
            <div className="kpi-label-en">Total Payable</div>
            <div className="kpi-label-hi">Total Payable</div>
          </div>
          <div className="kpi-icon green">
            <IndianRupee size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-currency">₹</span>
          <span className="kpi-value">
            {totalPayout.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-footer-label">Avg Rate</span>
          <span className="kpi-footer-value green">₹{avgRate.toFixed(2)} / Ltr</span>
        </div>
      </div>

      {/* 3 — Quality FAT / SNF */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <div className="kpi-card-labels">
            <div className="kpi-label-en">Quality (FAT / SNF)</div>
            <div className="kpi-label-hi">Milk Quality</div>
          </div>
          <div className="kpi-icon amber">
            <FlaskConical size={16} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-end",
          }}
        >
          <div>
            <div className="kpi-label-en" style={{ marginBottom: 4 }}>
              FAT %
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value" style={{ fontSize: 22 }}>
                {avgFat}
              </span>
              <span className="kpi-unit">%</span>
            </div>
          </div>
          <div
            style={{
              width: 1,
              height: 32,
              background: "var(--border)",
              flexShrink: 0,
            }}
          />
          <div>
            <div className="kpi-label-en" style={{ marginBottom: 4 }}>
              SNF %
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value" style={{ fontSize: 22, color: "var(--blue)" }}>
                {avgSnf}
              </span>
              <span className="kpi-unit">%</span>
            </div>
          </div>
        </div>
        <div className="kpi-footer">
          <span className="kpi-footer-label">Standard</span>
          <span className="kpi-footer-value amber">Rajasthan Chart</span>
        </div>
      </div>

      {/* 4 — Registered Farmers */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <div className="kpi-card-labels">
            <div className="kpi-label-en">Registered Farmers</div>
            <div className="kpi-label-hi">Registered Farmers</div>
          </div>
          <div className="kpi-icon purple">
            <Users size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-value">{memberCount}</span>
          <span className="kpi-unit">Members</span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-footer-label">Active Today</span>
          <span className="kpi-footer-value purple">
            <span style={{ color: "var(--amber)" }}>🐃 {buffaloCount}</span>
            {"  "}
            <span style={{ color: "var(--blue)" }}>🐄 {cowCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

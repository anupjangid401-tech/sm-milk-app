"use client";

import { Sun, Moon, Settings, Bell, Search, PanelLeft } from "lucide-react";
import { ShiftType } from "@/lib/types";

interface TopBarProps {
  currentShift: ShiftType;
  onToggleShift: () => void;
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
  purchaseCount: number;
}

export default function TopBar({
  currentShift,
  onToggleShift,
  onOpenSettings,
  onToggleSidebar,
  purchaseCount,
}: TopBarProps) {
  const today = new Date().toLocaleDateString("hi-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeStr = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <button className="icon-btn" onClick={onToggleSidebar} title="Toggle sidebar">
          <PanelLeft size={15} />
        </button>

        <div className="topbar-divider" />

        <div style={{ minWidth: 0 }}>
          <div className="topbar-page-title">स्मार्ट डेयरी कलेक्शन सेंटर</div>
          <div className="topbar-breadcrumb">{today}</div>
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">
        {/* Records indicator */}
        {purchaseCount > 0 && (
          <div
            style={{
              fontSize: 12,
              color: "var(--text-dim)",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--green)", fontWeight: 600 }}>
              {purchaseCount}
            </span>{" "}
            entries today
          </div>
        )}

        <div className="topbar-divider" />

        {/* Shift toggle */}
        <button
          className={`shift-badge ${currentShift === "MORNING" ? "morning" : "evening"}`}
          onClick={onToggleShift}
          title={`Switch to ${currentShift === "MORNING" ? "Evening" : "Morning"} shift`}
        >
          {currentShift === "MORNING" ? (
            <Sun size={12} />
          ) : (
            <Moon size={12} />
          )}
          {currentShift === "MORNING" ? "Morning" : "Evening"}
        </button>

        {/* Bell */}
        <button className="icon-btn" title="Notifications">
          <Bell size={14} />
        </button>

        {/* Settings */}
        <button className="icon-btn" onClick={onOpenSettings} title="Settings">
          <Settings size={14} />
        </button>
      </div>
    </header>
  );
}

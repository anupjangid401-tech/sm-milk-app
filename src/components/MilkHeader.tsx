"use client";

import { ShiftType } from "@/lib/types";
import { Sun, Moon, Milk, ShieldCheck, Sparkles, Smartphone, Monitor } from "lucide-react";

interface MilkHeaderProps {
  shift: ShiftType;
  viewMode: 'desktop' | 'mobile';
  onToggleShift: () => void;
  onToggleViewMode: () => void;
  onOpenSettings: () => void;
}

export default function MilkHeader({
  shift,
  viewMode,
  onToggleShift,
  onToggleViewMode,
  onOpenSettings,
}: MilkHeaderProps) {
  return (
    <header className="glass-nav px-4 py-3 sticky top-0 z-40 border-b border-white/10 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-tilt" />
            <div className="relative w-11 h-11 rounded-2xl bg-slate-950 flex items-center justify-center border border-white/20">
              <Milk className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                SM MILK
              </h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> PRO ERP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Smart Dairy Collection Command Center</p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile vs Desktop View Toggle (Desktop mode testing) */}
          <button
            onClick={onToggleViewMode}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Switch View Mode (Full Screen vs Mobile Phone View)"
          >
            {viewMode === 'mobile' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Mobile App View</span>
              </>
            )}
          </button>

          {/* Shift Switcher */}
          <button
            onClick={onToggleShift}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all duration-300 shadow-lg ${
              shift === 'MORNING'
                ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/10 text-amber-300 border-amber-500/50 shadow-amber-500/20'
                : 'bg-gradient-to-r from-indigo-500/25 to-purple-500/10 text-indigo-300 border-indigo-500/50 shadow-indigo-500/20'
            }`}
          >
            {shift === 'MORNING' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>सुबह (AM Shift)</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>शाम (PM Shift)</span>
              </>
            )}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all hover:scale-105"
            title="Printer & Scale Settings"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
          </button>
        </div>
      </div>
    </header>
  );
}

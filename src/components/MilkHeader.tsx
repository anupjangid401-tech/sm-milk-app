"use client";

import { ShiftType } from "@/lib/types";
import { Sun, Moon, Milk, ShieldCheck } from "lucide-react";

interface MilkHeaderProps {
  shift: ShiftType;
  onToggleShift: () => void;
  onOpenHelp: () => void;
}

export default function MilkHeader({ shift, onToggleShift, onOpenHelp }: MilkHeaderProps) {
  return (
    <header className="glass-nav px-4 py-3 sticky top-0 z-40 border-b border-white/10">
      <div className="flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center backdrop-blur-md">
              <Milk className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                SM MILK
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Dairy Collection System</p>
          </div>
        </div>

        {/* Right Actions: Shift Toggle & Date */}
        <div className="flex items-center gap-2">
          {/* Shift Toggle Button */}
          <button
            onClick={onToggleShift}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              shift === 'MORNING'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/20'
            }`}
          >
            {shift === 'MORNING' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>सुबह (AM)</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>शाम (PM)</span>
              </>
            )}
          </button>

          {/* Help / Settings button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Help & Info"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

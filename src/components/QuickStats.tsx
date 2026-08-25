"use client";

import { Droplets, IndianRupee, Activity, Users } from "lucide-react";
import { MilkPurchaseRecord } from "@/lib/types";

interface QuickStatsProps {
  purchases: MilkPurchaseRecord[];
  memberCount: number;
}

export default function QuickStats({ purchases, memberCount }: QuickStatsProps) {
  const totalLiters = purchases.reduce((acc, curr) => acc + curr.liters, 0);
  const totalPayout = purchases.reduce((acc, curr) => acc + curr.totalAmount, 0);
  
  const avgFat = purchases.length > 0 
    ? (purchases.reduce((acc, curr) => acc + (curr.fat * curr.liters), 0) / (totalLiters || 1)).toFixed(1) 
    : "6.5";
    
  const avgSnf = purchases.length > 0 
    ? (purchases.reduce((acc, curr) => acc + (curr.snf * curr.liters), 0) / (totalLiters || 1)).toFixed(1) 
    : "8.8";

  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      {/* Total Liters */}
      <div className="glass-panel p-3.5 relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400">आज का कुल दूध</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-white">{totalLiters.toFixed(1)}</span>
          <span className="text-xs font-bold text-cyan-400">Ltrs</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{purchases.length} एंट्रियां दर्ज</span>
        </div>
      </div>

      {/* Total Payout */}
      <div className="glass-panel p-3.5 relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400">कुल भुगताय राशि</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs font-bold text-emerald-400">₹</span>
          <span className="text-xl font-black text-white">{totalPayout.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="mt-1 text-[10px] text-emerald-400 font-medium">
          औसत ₹{(totalPayout / (totalLiters || 1)).toFixed(1)}/Ltr
        </div>
      </div>

      {/* Avg FAT & SNF */}
      <div className="glass-panel p-3.5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400">औसत FAT & SNF</span>
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block">FAT</span>
            <span className="text-base font-bold text-amber-400">{avgFat}%</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-[10px] text-slate-400 block">SNF</span>
            <span className="text-base font-bold text-purple-400">{avgSnf}%</span>
          </div>
        </div>
      </div>

      {/* Active Farmers */}
      <div className="glass-panel p-3.5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400">कुल पंजीकृत किसान</span>
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-white">{memberCount}</span>
          <span className="text-xs font-bold text-purple-400">सदस्य</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-400">
          सक्रिय डेयरी किसान
        </div>
      </div>
    </div>
  );
}

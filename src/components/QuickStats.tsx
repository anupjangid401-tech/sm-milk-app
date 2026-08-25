"use client";

import { Droplets, IndianRupee, Activity, Users, TrendingUp, ShieldCheck } from "lucide-react";
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

  const avgRate = (totalPayout / (totalLiters || 1)).toFixed(2);

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {/* 1. Total Liters Collected */}
      <div className="glass-panel-luxury p-4 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">आज का संकलन</span>
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white tracking-tight">{totalLiters.toFixed(1)}</span>
          <span className="text-xs font-bold text-cyan-400">Ltrs</span>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">प्रविष्टियां</span>
          <span className="text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded-md border border-cyan-500/30">
            {purchases.length} Records
          </span>
        </div>
      </div>

      {/* 2. Total Payout */}
      <div className="glass-panel-luxury p-4 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल देय राशि</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-sm font-extrabold text-emerald-400">₹</span>
          <span className="text-2xl font-black text-white tracking-tight">
            {totalPayout.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">औसत दर</span>
          <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
            ₹{avgRate}/Ltr
          </span>
        </div>
      </div>

      {/* 3. FAT & SNF Quality */}
      <div className="glass-panel-luxury p-4 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-500/15 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all duration-500" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">गुणवत्ता (FAT/SNF)</span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">FAT %</span>
            <span className="text-lg font-black text-amber-400">{avgFat}%</span>
          </div>
          <div className="h-7 w-px bg-white/15" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">SNF %</span>
            <span className="text-lg font-black text-purple-400">{avgSnf}%</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">चार्ट प्रकार</span>
          <span className="text-amber-300 font-bold">राजस्थान मानक</span>
        </div>
      </div>

      {/* 4. Active Farmers */}
      <div className="glass-panel-luxury p-4 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-500/15 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">पंजीकृत किसान</span>
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white tracking-tight">{memberCount}</span>
          <span className="text-xs font-bold text-purple-400">सदस्य</span>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">स्थिति</span>
          <span className="text-purple-300 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> ऑनलाइन
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, ItemSaleRecord } from "@/lib/types";
import { X, BookOpen, Search, UserCheck } from "lucide-react";

interface PassbookModalProps {
  members: Member[];
  purchases: MilkPurchaseRecord[];
  itemSales: ItemSaleRecord[];
  onClose: () => void;
}

export default function PassbookModal({ members, purchases, itemSales, onClose }: PassbookModalProps) {
  const [selectedCode, setSelectedCode] = useState(members[0]?.code || "101");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMember = members.find((m) => m.code === selectedCode) || members[0];
  const memberPurchases = purchases.filter((p) => p.memberCode === selectedCode);
  const memberItemSales = itemSales.filter((i) => i.memberCode === selectedCode);

  const totalMilkEarnings = memberPurchases.reduce((acc, p) => acc + p.totalAmount, 0);
  const totalItemDeductions = memberItemSales.reduce((acc, i) => acc + i.totalAmount, 0);
  const netBalance = totalMilkEarnings - totalItemDeductions;

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.includes(searchQuery) ||
      m.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Bar */}
      <div className="h-12 bg-emerald-800 text-white px-4 flex items-center justify-between shadow-md border-b border-emerald-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-200" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Passbook (किसान लेजर पासबुक)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-emerald-900/80 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full Screen Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farmer name or code..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
          />
        </div>

        {/* Farmer Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredMembers.map((m) => (
            <button
              key={m.code}
              onClick={() => setSelectedCode(m.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCode === m.code
                  ? "bg-emerald-600 border-emerald-400 text-white shadow-md"
                  : "bg-slate-950 border-slate-800 text-slate-300"
              }`}
            >
              #{m.code} {m.name}
            </button>
          ))}
        </div>

        {/* Selected Member Ledger Card */}
        {currentMember ? (
          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-lg border border-emerald-500/40">
                  {currentMember.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    {currentMember.name}
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400">
                    Code: <strong className="text-cyan-300">#{currentMember.code}</strong> | {currentMember.village}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Net Balance</span>
                <span className="text-xl font-black text-emerald-400 font-mono">₹{netBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Milk Transactions List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Milk Deposit History (दूध जमा रिकॉर्ड)</h4>

              {memberPurchases.length === 0 ? (
                <div className="p-6 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  कोई दूध रिकॉर्ड नहीं मिला।
                </div>
              ) : (
                memberPurchases.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">
                        {p.date} ({p.shift === "MORNING" ? "Morning" : "Evening"})
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {p.liters} Ltr | FAT {p.fat}% | SNF {p.snf}% @ ₹{p.ratePerLiter}/L
                      </div>
                    </div>
                    <div className="text-right font-extrabold text-emerald-400 text-sm font-mono">
                      +₹{p.totalAmount}
                    </div>
                  </div>
                ))
              )}

              {/* Feed Deductions */}
              {memberItemSales.length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider px-1 pt-2">Feed Deductions (आहार कटौती)</h4>
                  {memberItemSales.map((item) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-amber-200">{item.itemName}</div>
                        <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">Qty: {item.quantity} | {item.date}</div>
                      </div>
                      <div className="text-right font-extrabold text-rose-400 text-sm font-mono">
                        -₹{item.totalAmount}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Passbook Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between text-xs font-bold">
              <span className="text-slate-300">Total Milk Bill: <strong className="text-emerald-400 font-mono text-sm">₹{totalMilkEarnings.toFixed(2)}</strong></span>
              <span className="text-slate-300">Feed Deductions: <strong className="text-rose-400 font-mono text-sm">₹{totalItemDeductions.toFixed(2)}</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500 text-xs">कृपया किसान चुनें!</div>
        )}
      </div>
    </div>
  );
}

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
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-5 max-w-lg">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">किसान पासबुक (Customer Passbook)</h2>
              <p className="text-xs text-slate-400">दूध भुगतान एवं खाता विवरण</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Selector / Search */}
        <div className="mb-4">
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाम या कोड से खोजें..."
              className="glass-input pl-9 text-xs"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filteredMembers.map((m) => (
              <button
                key={m.code}
                onClick={() => setSelectedCode(m.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  selectedCode === m.code
                    ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                #{m.code} {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Member Passbook Card */}
        {currentMember && (
          <div className="space-y-3">
            {/* Header info card */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  {currentMember.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {currentMember.name}
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    कोड: <strong className="text-cyan-300">{currentMember.code}</strong> | गांव: {currentMember.village}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">शुद्ध बकाया राशि</span>
                <span className="text-base font-black text-emerald-400">₹{netBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Transactions History */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">दूध जमा इतिहास (Milk Transactions)</h4>

              {memberPurchases.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">कोई दूध जमा रिकॉर्ड उपलब्ध नहीं है।</p>
              ) : (
                memberPurchases.map((p) => (
                  <div key={p.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">
                        {p.date} ({p.shift === 'MORNING' ? 'सुबह' : 'शाम'})
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {p.liters} Ltr | FAT {p.fat}% | SNF {p.snf}% @ ₹{p.ratePerLiter}/L
                      </div>
                    </div>
                    <div className="text-right font-bold text-emerald-400">
                      +₹{p.totalAmount}
                    </div>
                  </div>
                ))
              )}

              {/* Feed Sales Deductions */}
              {memberItemSales.length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider pt-2">दाना/फीड कटौतियां (Deductions)</h4>
                  {memberItemSales.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-amber-200">{item.itemName}</div>
                        <div className="text-[10px] text-amber-400/80">मात्रा: {item.quantity} | {item.date}</div>
                      </div>
                      <div className="text-right font-bold text-rose-400">
                        -₹{item.totalAmount}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex justify-between text-xs font-semibold">
              <span className="text-slate-300">कुल दूध बिल: <strong className="text-emerald-400">₹{totalMilkEarnings.toFixed(2)}</strong></span>
              <span className="text-slate-300">फीड कटौती: <strong className="text-rose-400">₹{totalItemDeductions.toFixed(2)}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, MilkType, ShiftType } from "@/lib/types";
import { X, CheckCircle, Printer, Calculator, Droplets, Sun, Moon } from "lucide-react";

interface MilkPurchaseModalProps {
  members: Member[];
  shift: ShiftType;
  onSave: (record: MilkPurchaseRecord) => void;
  onClose: () => void;
}

export default function MilkPurchaseModal({ members, shift, onSave, onClose }: MilkPurchaseModalProps) {
  const [selectedMemberCode, setSelectedMemberCode] = useState(members[0]?.code || "101");
  const [milkType, setMilkType] = useState<MilkType>(members[0]?.milkType || "BUFFALO");
  const [liters, setLiters] = useState<string>("12.5");
  const [fat, setFat] = useState<string>("6.5");
  const [snf, setSnf] = useState<string>("8.8");
  const [lastSavedSlip, setLastSavedSlip] = useState<MilkPurchaseRecord | null>(null);

  // Auto calculate rate per liter based on Fat & SNF
  const numFat = parseFloat(fat) || 0;
  const numSnf = parseFloat(snf) || 0;
  const numLiters = parseFloat(liters) || 0;

  const baseRate = milkType === "BUFFALO" ? 22 : 18;
  const calculatedRate = (baseRate + (numFat * 4.8) + (numSnf * 1.8));
  const totalAmount = numLiters * calculatedRate;

  const handleMemberChange = (code: string) => {
    setSelectedMemberCode(code);
    const m = members.find((x) => x.code === code);
    if (m) {
      setMilkType(m.milkType);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = members.find((x) => x.code === selectedMemberCode);
    if (!m || numLiters <= 0) return;

    const newRecord: MilkPurchaseRecord = {
      id: "pur-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      shift: shift,
      memberCode: m.code,
      memberName: m.name,
      milkType: milkType,
      liters: numLiters,
      fat: numFat,
      snf: numSnf,
      ratePerLiter: parseFloat(calculatedRate.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    onSave(newRecord);
    setLastSavedSlip(newRecord);
  };

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-6 sm:p-7">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">दूध खरीद प्रविष्टि <span className="text-xs font-semibold text-slate-400">(Milk Purchase)</span></h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-bold text-slate-400">शिफ्ट:</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                  shift === 'MORNING' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}>
                  {shift === 'MORNING' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-400" />}
                  {shift === 'MORNING' ? 'सुबह (AM Shift)' : 'शाम (PM Shift)'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {lastSavedSlip ? (
          /* Receipt Slip View */
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h3 className="text-base font-extrabold text-emerald-300">दूध प्रविष्टि सफलतापूर्व दर्ज की गई!</h3>
              <p className="text-xs text-slate-400 mt-1">SM MILK Official Receipt Slip</p>

              <div className="mt-4 p-4 rounded-xl bg-slate-950 text-left text-xs font-mono space-y-2 border border-slate-800">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">किसान कोड:</span>
                  <span className="text-cyan-300 font-bold">{lastSavedSlip.memberCode} - {lastSavedSlip.memberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">दूध प्रकार:</span>
                  <span className="text-amber-300 font-bold">{lastSavedSlip.milkType === 'BUFFALO' ? 'भैंस (Buffalo)' : 'गाय (Cow)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">मात्रा (Liters):</span>
                  <span className="text-white font-bold">{lastSavedSlip.liters} Ltr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FAT / SNF:</span>
                  <span className="text-purple-300 font-bold">{lastSavedSlip.fat}% / {lastSavedSlip.snf}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">दर (Rate/Ltr):</span>
                  <span className="text-emerald-300 font-bold">₹{lastSavedSlip.ratePerLiter}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                  <span className="text-white font-bold">कुल राशि:</span>
                  <span className="text-emerald-400 font-extrabold text-base">₹{lastSavedSlip.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLastSavedSlip(null)}
                className="glass-btn flex-1 text-sm py-3"
              >
                नई एंट्री करें (+ Add Next)
              </button>
              <button
                onClick={() => window.print()}
                className="glass-btn-secondary p-3 rounded-xl hover:bg-slate-700"
                title="Print Slip"
              >
                <Printer className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Member Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                1. किसान चुनें (Select Member)
              </label>
              <select
                value={selectedMemberCode}
                onChange={(e) => handleMemberChange(e.target.value)}
                className="glass-select"
              >
                {members.map((m) => (
                  <option key={m.code} value={m.code} className="bg-slate-900 text-white py-1">
                    {m.code} - {m.name} ({m.village})
                  </option>
                ))}
              </select>
            </div>

            {/* Milk Type & Liters */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  2. दूध प्रकार
                </label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="glass-select"
                >
                  <option value="BUFFALO" className="bg-slate-900 text-white">भैंस (Buffalo)</option>
                  <option value="COW" className="bg-slate-900 text-white">गाय (Cow)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  3. मात्रा (Liters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={liters}
                  onChange={(e) => setLiters(e.target.value)}
                  className="glass-input"
                  placeholder="e.g. 12.5"
                  required
                />
              </div>
            </div>

            {/* FAT % & SNF % */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                    4. FAT % (वसा)
                  </label>
                  <span className="text-[10px] text-amber-400/80 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">Quality</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="glass-input border-amber-500/40 focus:border-amber-400"
                  placeholder="e.g. 6.5"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider">
                    5. SNF % (एसएनएफ)
                  </label>
                  <span className="text-[10px] text-purple-400/80 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">Matrix</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={snf}
                  onChange={(e) => setSnf(e.target.value)}
                  className="glass-input border-purple-500/40 focus:border-purple-400"
                  placeholder="e.g. 8.8"
                  required
                />
              </div>
            </div>

            {/* Pro Calculation Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">दर (Rate/Ltr)</span>
                  <span className="text-sm font-extrabold text-cyan-300 font-mono">₹{calculatedRate.toFixed(2)} <span className="text-xs text-slate-400 font-sans">/ Ltr</span></span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">कुल राशि (Total)</span>
                <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="pt-2 flex gap-3">
              <button type="submit" className="glass-btn flex-1 py-3.5 text-base">
                दूध जमा करें (Save Entry)
              </button>
              <button type="button" onClick={onClose} className="glass-btn-secondary px-5">
                रद्द करें
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


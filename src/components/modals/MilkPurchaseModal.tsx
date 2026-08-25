"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, MilkType, ShiftType } from "@/lib/types";
import { X, CheckCircle, Printer, Calculator, Droplets } from "lucide-react";

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
  // Formula: Base Rate + (Fat * 5.2) + (SNF * 2.1)
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
      <div className="glass-modal-container p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">दूध खरीद प्रविष्टि (Milk Purchase)</h2>
              <p className="text-xs text-slate-400">शिफ्ट: {shift === 'MORNING' ? 'सुबह (AM)' : 'शाम (PM)'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {lastSavedSlip ? (
          /* Receipt Slip View */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h3 className="text-base font-bold text-emerald-300">दूध प्रविष्टि सफलतापूर्व दर्ज की गई!</h3>
              <p className="text-xs text-slate-400 mt-0.5">SM MILK Receipt Slip</p>

              <div className="mt-4 p-3 rounded-lg bg-slate-950 text-left text-xs font-mono space-y-1.5 border border-white/10">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-slate-400">किसान कोड:</span>
                  <span className="text-cyan-300 font-bold">{lastSavedSlip.memberCode} - {lastSavedSlip.memberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">दूध प्रकार:</span>
                  <span className="text-amber-300 font-bold">{lastSavedSlip.milkType === 'BUFFALO' ? 'भैंस' : 'गाय'}</span>
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
                <div className="flex justify-between pt-1 border-t border-white/10 text-sm">
                  <span className="text-white font-bold">कुल राशि:</span>
                  <span className="text-emerald-400 font-extrabold">₹{lastSavedSlip.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setLastSavedSlip(null)}
                className="glass-btn flex-1 text-sm"
              >
                नई एंट्री करें (+ Add Next)
              </button>
              <button
                onClick={() => window.print()}
                className="glass-btn-secondary p-3 rounded-xl hover:bg-white/15"
                title="Print Slip"
              >
                <Printer className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {/* Member Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">किसान चुनें (Select Member)</label>
              <select
                value={selectedMemberCode}
                onChange={(e) => handleMemberChange(e.target.value)}
                className="glass-select"
              >
                {members.map((m) => (
                  <option key={m.code} value={m.code} className="bg-slate-900 text-white">
                    {m.code} - {m.name} ({m.village})
                  </option>
                ))}
              </select>
            </div>

            {/* Milk Type & Liters */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">दूध का प्रकार</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">मात्रा (Liters)</label>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">FAT % (वसा)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="glass-input border-amber-500/30 focus:border-amber-400"
                  placeholder="e.g. 6.5"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1">SNF % (एसएनएफ)</label>
                <input
                  type="number"
                  step="0.1"
                  value={snf}
                  onChange={(e) => setSnf(e.target.value)}
                  className="glass-input border-purple-500/30 focus:border-purple-400"
                  placeholder="e.g. 8.8"
                  required
                />
              </div>
            </div>

            {/* Live Calculation Display Box */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-xs text-slate-400 block">अनुमानित दर (Rate/Ltr)</span>
                  <span className="text-sm font-bold text-cyan-300">₹{calculatedRate.toFixed(2)} / Ltr</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">कुल राशि (Total)</span>
                <span className="text-lg font-black text-emerald-400">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex gap-2">
              <button type="submit" className="glass-btn flex-1">
                दूध जमा करें (Save Entry)
              </button>
              <button type="button" onClick={onClose} className="glass-btn-secondary">
                रद्द करें
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

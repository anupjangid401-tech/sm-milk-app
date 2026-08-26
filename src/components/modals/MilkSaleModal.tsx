"use client";

import { useState } from "react";
import { MilkSaleRecord, MilkType, ShiftType } from "@/lib/types";
import { X, ShoppingCart, CheckCircle, Calculator } from "lucide-react";

interface MilkSaleModalProps {
  shift: ShiftType;
  onSave: (record: MilkSaleRecord) => void;
  onClose: () => void;
}

export default function MilkSaleModal({ shift, onSave, onClose }: MilkSaleModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [liters, setLiters] = useState("5.0");
  const [ratePerLiter, setRatePerLiter] = useState("65.0");
  const [isSaved, setIsSaved] = useState(false);

  const numLiters = parseFloat(liters) || 0;
  const numRate = parseFloat(ratePerLiter) || 0;
  const totalAmount = numLiters * numRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || numLiters <= 0) return;

    const record: MilkSaleRecord = {
      id: "sale-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      shift: shift,
      customerName: customerName,
      milkType: milkType,
      liters: numLiters,
      ratePerLiter: numRate,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    onSave(record);
    setIsSaved(true);
  };

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">दूध बिक्री <span className="text-xs font-semibold text-slate-400">(Milk Sale Entry)</span></h2>
              <p className="text-xs text-slate-400">खुदरा / डेयरी दूध बिक्री रिकॉर्ड</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-extrabold text-white">दूध बिक्री दर्ज कर ली गई!</h3>
            <p className="text-xs text-slate-400">ग्राहक: <strong className="text-cyan-300">{customerName}</strong> | कुल बिल: <strong className="text-emerald-400">₹{totalAmount}</strong></p>
            <button onClick={onClose} className="glass-btn w-full mt-4 py-3">
              ठीक है (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                1. ग्राहक का नाम (Customer Name)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Gupta Sweets / City Hotel"
                className="glass-input"
                required
              />
            </div>

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
                  <option value="BUFFALO" className="bg-slate-900 text-white">भैंस का दूध</option>
                  <option value="COW" className="bg-slate-900 text-white">गाय का दूध</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  3. मात्रा (Liters)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={liters}
                  onChange={(e) => setLiters(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                4. दर प्रति लीटर (Rate ₹/Ltr)
              </label>
              <input
                type="number"
                step="1"
                value={ratePerLiter}
                onChange={(e) => setRatePerLiter(e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">कुल बिल राशि</span>
                  <span className="text-xs text-slate-400">{liters} Ltr × ₹{ratePerLiter}</span>
                </div>
              </div>
              <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="glass-btn flex-1 py-3.5 text-base bg-gradient-to-r from-emerald-500 to-teal-600">
                बिक्री सेव करें (Save Sale)
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


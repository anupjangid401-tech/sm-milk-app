"use client";

import { useState } from "react";
import { MilkSaleRecord, MilkType, ShiftType } from "@/lib/types";
import { X, ShoppingCart, CheckCircle } from "lucide-react";

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
      <div className="glass-modal-container p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">दूध बिक्री (Milk Sale Entry)</h2>
              <p className="text-xs text-slate-400">खुदरा / डेयरी दूध बिक्री</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">दूध बिक्री दर्ज कर ली गई!</h3>
            <p className="text-xs text-slate-400">ग्राहक: {customerName} | ₹{totalAmount}</p>
            <button onClick={onClose} className="glass-btn w-full mt-4">
              ठीक है (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ग्राहक का नाम (Customer Name)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. City Hotel / Gupta Sweets"
                className="glass-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">दूध प्रकार</label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="glass-select"
                >
                  <option value="BUFFALO" className="bg-slate-900">भैंस का दूध</option>
                  <option value="COW" className="bg-slate-900">गाय का दूध</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मात्रा (Liters)</label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">दर प्रति लीटर (Bikri Rate ₹)</label>
              <input
                type="number"
                step="1"
                value={ratePerLiter}
                onChange={(e) => setRatePerLiter(e.target.value)}
                className="glass-input"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">कुल बिल राशि:</span>
              <span className="text-lg font-black text-emerald-400">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="glass-btn flex-1 bg-gradient-to-r from-emerald-500 to-teal-600">
                बिक्री सेव करें (Save Sale)
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

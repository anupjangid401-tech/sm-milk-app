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
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Bar */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Milk Sale (दूध बिक्री)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-950 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full Screen Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {isSaved ? (
          <div className="text-center py-10 space-y-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">Milk Sale Recorded Successfully!</h3>
            <p className="text-sm text-slate-400">
              Customer: <strong className="text-cyan-300">{customerName}</strong> | Total Bill: <strong className="text-emerald-400">₹{totalAmount.toFixed(2)}</strong>
            </p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 font-extrabold text-white text-base shadow-lg">
              OK (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                1. Customer Name (ग्राहक नाम)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Krishna Dairy / City Sweets"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  2. Milk Type (प्रकार)
                </label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm outline-none"
                >
                  <option value="BUFFALO">Buffalo Milk (भैंस)</option>
                  <option value="COW">Cow Milk (गाय)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  3. Quantity (लीटर)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={liters}
                  onChange={(e) => setLiters(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm font-bold font-mono outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                4. Rate per Liter (दर ₹/Ltr)
              </label>
              <input
                type="number"
                step="1"
                value={ratePerLiter}
                onChange={(e) => setRatePerLiter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm font-bold font-mono outline-none"
                required
              />
            </div>

            {/* Bill Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-900/60 text-cyan-300 border border-sky-700/50">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Bill Amount</span>
                  <span className="text-xs text-slate-400">{liters} Ltr × ₹{ratePerLiter}</span>
                </div>
              </div>
              <span className="text-2xl font-black text-emerald-400 font-mono">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:opacity-90 font-extrabold text-white text-base shadow-lg">
                Save Sale (बिक्री सेव करें)
              </button>
              <button type="button" onClick={onClose} className="px-5 py-3.5 rounded-2xl bg-slate-800 text-slate-300 font-bold">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

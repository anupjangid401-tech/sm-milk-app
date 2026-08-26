"use client";

import { useState } from "react";
import { Member, ItemSaleRecord } from "@/lib/types";
import { X, PackageCheck, CheckCircle, Calculator } from "lucide-react";

interface ItemSaleModalProps {
  members: Member[];
  onSave: (record: ItemSaleRecord) => void;
  onClose: () => void;
}

export default function ItemSaleModal({ members, onSave, onClose }: ItemSaleModalProps) {
  const [memberCode, setMemberCode] = useState(members[0]?.code || "101");
  const [itemName, setItemName] = useState("Amul Cattle Feed (50kg Bag)");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("1250");
  const [isSaved, setIsSaved] = useState(false);

  const numQty = parseFloat(quantity) || 1;
  const numPrice = parseFloat(unitPrice) || 0;
  const totalAmount = numQty * numPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = members.find((x) => x.code === memberCode);
    if (!m) return;

    const record: ItemSaleRecord = {
      id: "item-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      memberCode: m.code,
      memberName: m.name,
      itemName: itemName,
      quantity: numQty,
      unitPrice: numPrice,
      totalAmount: totalAmount,
    };

    onSave(record);
    setIsSaved(true);
  };

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Item / Feed Sale <span className="text-xs font-semibold text-slate-400">(Item Sale)</span></h2>
              <p className="text-xs text-slate-400">Feed, Khal & Mineral Mixture Sales</p>
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
            <CheckCircle className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-base font-extrabold text-white">Item sale recorded!</h3>
            <p className="text-xs text-slate-400">Item: <strong className="text-purple-300">{itemName}</strong> | Total Bill: <strong className="text-emerald-400">₹{totalAmount}</strong></p>
            <button onClick={onClose} className="glass-btn w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600">
              OK (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                1. Select Member
              </label>
              <select
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                className="glass-select"
              >
                {members.map((m) => (
                  <option key={m.code} value={m.code} className="bg-slate-900 text-white">
                    #{m.code} - {m.name} ({m.village})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                2. Select Feed Product
              </label>
              <select
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                  if (e.target.value.includes("Amul Feed")) setUnitPrice("1250");
                  else if (e.target.value.includes("Kapas Khal")) setUnitPrice("1400");
                  else if (e.target.value.includes("Mineral")) setUnitPrice("250");
                }}
                className="glass-select"
              >
                <option value="Amul Cattle Feed (50kg Bag)" className="bg-slate-900 text-white">Amul Cattle Feed 50Kg (₹1250)</option>
                <option value="Kapas Khal / Cotton Seed (50kg)" className="bg-slate-900 text-white">Cotton Seed Khal 50Kg (₹1400)</option>
                <option value="Mineral Mixture (1kg Pack)" className="bg-slate-900 text-white">Mineral Mixture 1Kg (₹250)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  3. Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="glass-input"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  4. Price per Pack (₹/Pack)
                </label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-purple-500/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Total Feed Bill Amount</span>
                  <span className="text-xs text-slate-400">{quantity} Pack × ₹{unitPrice}</span>
                </div>
              </div>
              <span className="text-xl font-black text-purple-300 font-mono tracking-tight">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="glass-btn flex-1 py-3.5 text-base bg-gradient-to-r from-purple-600 to-indigo-600">
                Save Bill
              </button>
              <button type="button" onClick={onClose} className="glass-btn-secondary px-5">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


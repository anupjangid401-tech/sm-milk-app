"use client";

import { useState } from "react";
import { Member, ItemSaleRecord } from "@/lib/types";
import { X, PackageCheck, CheckCircle } from "lucide-react";

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
      <div className="glass-modal-container p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">दाना / फीड बिक्री (Item Sale)</h2>
              <p className="text-xs text-slate-400">खल, पशु आहार एवं मिनरल मिक्सर बिक्री</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">सामान बिक्री दर्ज की गई!</h3>
            <p className="text-xs text-slate-400">{itemName} | ₹{totalAmount}</p>
            <button onClick={onClose} className="glass-btn w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-600">
              ठीक है (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">किसान का चुनाव करें</label>
              <select
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                className="glass-select"
              >
                {members.map((m) => (
                  <option key={m.code} value={m.code} className="bg-slate-900">
                    #{m.code} - {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">सामान (Select Product)</label>
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
                <option value="Amul Cattle Feed (50kg Bag)" className="bg-slate-900">अमूल पशु आहार 50Kg (₹1250)</option>
                <option value="Kapas Khal / Cotton Seed (50kg)" className="bg-slate-900">कपास खल 50Kg (₹1400)</option>
                <option value="Mineral Mixture (1kg Pack)" className="bg-slate-900">मिनरल मिक्सचर 1Kg (₹250)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मात्रा (Quantity)</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">इकाई मूल्य (₹/Bag)</label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">कुल फीड बिल राशि:</span>
              <span className="text-lg font-black text-purple-300">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="glass-btn flex-1 bg-gradient-to-r from-purple-500 to-indigo-600">
                सामान बिल सेव करें (Save Bill)
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

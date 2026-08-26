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
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Header */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Item & Feed Sale (दाना / पशु आहार बिक्री)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-950 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {isSaved ? (
          <div className="text-center py-10 space-y-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">Feed Sale Recorded Successfully!</h3>
            <p className="text-sm text-slate-400">
              Item: <strong className="text-cyan-300">{itemName}</strong> | Total Bill: <strong className="text-emerald-400">₹{totalAmount.toFixed(2)}</strong>
            </p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 font-extrabold text-white text-base shadow-lg">
              OK (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                1. Select Member (किसान का चुनाव)
              </label>
              <select
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm outline-none"
              >
                {members.map((m) => (
                  <option key={m.code} value={m.code}>
                    #{m.code} - {m.name} ({m.village})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                2. Select Product (दाना / खल उत्पाद)
              </label>
              <select
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                  if (e.target.value.includes("Amul Feed")) setUnitPrice("1250");
                  else if (e.target.value.includes("Kapas Khal")) setUnitPrice("1400");
                  else if (e.target.value.includes("Mineral")) setUnitPrice("250");
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm outline-none"
              >
                <option value="Amul Cattle Feed (50kg Bag)">Amul Cattle Feed 50Kg (₹1250)</option>
                <option value="Kapas Khal / Cotton Seed (50kg)">Cotton Seed Khal 50Kg (₹1400)</option>
                <option value="Mineral Mixture (1kg Pack)">Mineral Mixture 1Kg (₹250)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  3. Quantity (नग/बोरी)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm font-mono font-bold outline-none"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  4. Price per Pack (कीमत ₹)
                </label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-sm font-mono font-bold outline-none"
                  required
                />
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-900/60 text-cyan-300 border border-sky-700/50">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Feed Bill Amount</span>
                  <span className="text-xs text-slate-400">{quantity} Pack × ₹{unitPrice}</span>
                </div>
              </div>
              <span className="text-2xl font-black text-emerald-400 font-mono">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:opacity-90 font-extrabold text-white text-base shadow-lg">
                Save Bill (बिल सेव करें)
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

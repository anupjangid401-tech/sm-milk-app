"use client";

import { useState } from "react";
import { MilkSaleRecord, MilkType, ShiftType } from "@/lib/types";
import {
  X,
  Calendar,
  User,
  Search,
  Send,
  ExternalLink
} from "lucide-react";

interface MilkSaleModalProps {
  shift: ShiftType;
  onSave: (record: MilkSaleRecord) => void;
  onClose: () => void;
}

export default function MilkSaleModal({ shift: initialShift, onSave, onClose }: MilkSaleModalProps) {
  const [slipNo, setSlipNo] = useState<number>(1);
  const [entryDate, setEntryDate] = useState<string>("25-08-2026");
  const [shift, setShift] = useState<ShiftType>(initialShift);
  const [customerName, setCustomerName] = useState<string>("");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [liters, setLiters] = useState<string>("");
  const [rate, setRate] = useState<string>("65");
  const [activeField, setActiveField] = useState<"qty" | "rate" | "name">("qty");

  const handleKeypadPress = (val: string) => {
    let currentVal = activeField === "qty" ? liters : rate;
    if (val === "ERASE") currentVal = currentVal.slice(0, -1);
    else if (val === ".") { if (!currentVal.includes(".")) currentVal += "."; }
    else currentVal += val;

    if (activeField === "qty") setLiters(currentVal);
    else setRate(currentVal);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── HEADER ── */}
      <div className="h-14 bg-[#4682b4] text-white px-4 flex items-center shadow-md flex-shrink-0">
        <span className="font-bold text-lg">SM MILK/Milk Sale</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#f4f7f6]">
        {/* ROW 1: TOP BAR */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-center font-bold text-lg">{slipNo}</div>
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-between px-2 font-bold text-sm">
            {entryDate} <Calendar className="w-5 h-5 text-red-500" />
          </div>
          <button className="border border-gray-400 bg-white rounded-md p-1 font-bold text-sm">
            {shift === "MORNING" ? "Morning" : "Evening"}
          </button>
        </div>

        {/* ROW 2: Customer Name */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 relative flex items-center border-b-2 border-pink-500 pt-4 pb-1">
            <User className="w-6 h-6 text-blue-400 mr-2" />
            <div className="absolute top-0 left-8 text-[10px] text-pink-500 font-bold">Customer Name</div>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-transparent outline-none w-full font-bold text-lg"
              placeholder="Enter Name"
            />
          </div>
          <button className="w-20 border border-gray-400 rounded-xl bg-white font-bold text-sm">
            {milkType === "BUFFALO" ? "Buffalo" : "Cow"}
          </button>
        </div>

        {/* ROW 3: Stats Grid */}
        <div className="grid grid-cols-3 gap-1 mb-2 text-center">
          <div className="border border-gray-400 bg-white rounded-sm">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Rate</div>
            <div className="min-h-[24px] font-bold">₹{rate}</div>
          </div>
          <div className="border border-gray-400 bg-white rounded-sm">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Qty</div>
            <div className="min-h-[24px] font-bold">{liters} L</div>
          </div>
          <div className="border border-gray-400 bg-white rounded-sm">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Amount</div>
            <div className="min-h-[24px] font-bold text-emerald-600">₹{(parseFloat(liters) || 0) * (parseFloat(rate) || 0)}</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center border-b-2 border-gray-300 pb-1" onClick={() => setActiveField("qty")}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
            <span className="text-3xl font-bold text-gray-500 mr-2 italic">Qty.</span>
            <span className="text-3xl font-bold">{liters}</span>
          </div>
          <div className="flex items-center border-b-2 border-gray-300 pb-1" onClick={() => setActiveField("rate")}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
            <span className="text-3xl font-bold text-gray-500 mr-2 italic">Rate</span>
            <span className="text-3xl font-bold">{rate}</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="border border-[#4682b4] mb-4 overflow-hidden">
          <table className="w-full text-[10px] text-center">
            <thead className="bg-[#4682b4] text-white">
              <tr>
                <th className="p-1 border-r border-white">SR.N</th>
                <th className="p-1 border-r border-white">NAME</th>
                <th className="p-1 border-r border-white">WEIT.</th>
                <th className="p-1 border-r border-white">RATE</th>
                <th className="p-1">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr><td colSpan={5} className="p-2 text-gray-400">No Sale Records</td></tr>
            </tbody>
          </table>
        </div>

        {/* KEYPAD AREA */}
        <div className="flex justify-end gap-4">
          <div className="flex flex-col gap-4">
             <Send className="w-8 h-8 text-blue-700 -rotate-45" />
             <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"><X className="w-6 h-6 text-white" /></div>
             <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>

          <div className="w-64 bg-[#2c5e7c] p-1 rounded-xl shadow-inner">
            <div className="grid grid-cols-4 gap-1">
              {[7, 8, 9].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button onClick={() => handleKeypadPress("ERASE")} className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">ERASE</button>
              {[4, 5, 6].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button className="row-span-2 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">SAVE</button>
              {[1, 2, 3].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">PREV</button>
              <button onClick={() => handleKeypadPress("0")} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">0</button>
              <button onClick={() => handleKeypadPress(".")} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">.</button>
              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">NEXT</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="h-10 bg-[#4682b4] flex items-center border-t border-white">
        <div className="w-12 h-full bg-white flex items-center justify-center border-r border-gray-400">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 grid grid-cols-2 h-full text-[11px] font-bold text-center">
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-100 uppercase">Total Sales</div>
          <div className="flex items-center justify-center bg-blue-200">₹0</div>
        </div>
      </div>
    </div>
  );
}

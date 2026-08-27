"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, MilkType, ShiftType } from "@/lib/types";
import {
  X,
  Calendar,
  Sun,
  Moon,
  Send,
  User,
  Search,
  Trash2,
  ExternalLink
} from "lucide-react";

interface MilkPurchaseModalProps {
  members: Member[];
  shift: ShiftType;
  onSave: (record: MilkPurchaseRecord) => void;
  onClose: () => void;
}

export default function MilkPurchaseModal({
  members,
  shift: initialShift,
  onSave,
  onClose,
}: MilkPurchaseModalProps) {
  const [slipNo, setSlipNo] = useState<number>(1);
  const [entryDate, setEntryDate] = useState<string>("25-08-2026");
  const [shift, setShift] = useState<ShiftType>(initialShift);
  const [vendorNo, setVendorNo] = useState<string>("");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [liters, setLiters] = useState<string>("");
  const [fat, setFat] = useState<string>("");
  const [snf, setSnf] = useState<string>("");
  const [activeField, setActiveField] = useState<"qty" | "fat" | "snf" | "vendor">("vendor");

  const currentMember = members.find((m) => m.code === vendorNo);
  const vendorName = currentMember ? currentMember.name : "";

  const numFat = parseFloat(fat) || 0;
  const numSnf = parseFloat(snf) || 0;
  const numLiters = parseFloat(liters) || 0;
  const calculatedRate = (numFat > 0 || numSnf > 0) ? (22 + numFat * 4.8 + numSnf * 1.8) : 0;
  const totalAmount = numLiters * calculatedRate;

  const handleKeypadPress = (val: string) => {
    let currentVal = activeField === "qty" ? liters : activeField === "fat" ? fat : activeField === "snf" ? snf : vendorNo;
    if (val === "ERASE") currentVal = currentVal.slice(0, -1);
    else if (val === ".") { if (!currentVal.includes(".")) currentVal += "."; }
    else currentVal += val;

    if (activeField === "qty") setLiters(currentVal);
    else if (activeField === "fat") setFat(currentVal);
    else if (activeField === "snf") setSnf(currentVal);
    else setVendorNo(currentVal);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── HEADER ── */}
      <div className="h-14 bg-[#4682b4] text-white px-4 flex items-center shadow-md flex-shrink-0">
        <span className="font-bold text-lg">SM MILK/Milk Purchase</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#f4f7f6]">
        {/* ROW 1: TOP BAR */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-center">
            <span className="font-bold text-lg px-4">{slipNo}</span>
          </div>
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-between px-2">
            <span className="font-bold text-sm">{entryDate}</span>
            <Calendar className="w-5 h-5 text-red-500" />
          </div>
          <button className="border border-gray-400 bg-white rounded-md p-1 font-bold text-sm text-slate-700">
            {shift === "MORNING" ? "Morning" : "Evening"}
          </button>
        </div>

        {/* ROW 2: Vendor & Milk Type */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 relative flex items-center border-b-2 border-pink-500 pt-4 pb-1">
            <User className="w-6 h-6 text-blue-400 mr-2" />
            <div className="absolute top-0 left-8 text-[10px] text-pink-500 font-bold">Vendor No</div>
            <span className="text-xl font-bold min-h-[28px]">{vendorNo}</span>
          </div>
          <button className="w-20 border border-gray-400 rounded-xl bg-white font-bold text-sm">
            {milkType === "BUFFALO" ? "Buffalo" : "Cow"}
          </button>
          <div className="flex-[1.5] border border-gray-400 bg-white rounded-sm overflow-hidden">
            <div className="bg-green-600 text-white text-[10px] text-center font-bold py-0.5">Name(English)</div>
            <div className="p-1 min-h-[24px] text-sm font-bold">{vendorName}</div>
          </div>
        </div>

        {/* ROW 3: Stats Grid */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="border border-gray-400 bg-white rounded-sm overflow-hidden text-center">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Avg.Ltr</div>
            <div className="min-h-[24px]"></div>
          </div>
          <div className="border border-gray-400 bg-white rounded-sm overflow-hidden text-center">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Rate</div>
            <div className="min-h-[24px]"></div>
          </div>
          <div className="border border-gray-400 bg-white rounded-sm overflow-hidden text-center">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Per/Ltr</div>
            <div className="min-h-[24px]"></div>
          </div>
          <div className="border border-gray-400 bg-white rounded-sm overflow-hidden text-center">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Avg.Fat</div>
            <div className="min-h-[24px]"></div>
          </div>
          <div className="col-span-2 border border-gray-400 bg-white rounded-sm overflow-hidden text-center">
            <div className="bg-green-600 text-white text-[10px] font-bold py-0.5">Amount</div>
            <div className="min-h-[24px]"></div>
          </div>
        </div>

        {/* Main Inputs: Qty, Fat, SNF */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center border-b-2 border-gray-300 pb-1" onClick={() => setActiveField("qty")}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
            <span className="text-3xl font-bold text-gray-500 mr-2 italic">Qty.</span>
            <span className="text-3xl font-bold">{liters}</span>
          </div>
          <div className="flex items-center border-b-2 border-gray-300 pb-1" onClick={() => setActiveField("fat")}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
            <span className="text-3xl font-bold text-gray-500 mr-2 italic">Fat</span>
            <span className="text-3xl font-bold">{fat}</span>
          </div>
          <div className="flex items-center border-b-2 border-gray-300 pb-1" onClick={() => setActiveField("snf")}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
            <span className="text-3xl font-bold text-gray-500 mr-2 italic">S N F</span>
            <span className="text-3xl font-bold">{snf}</span>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="border border-[#4682b4] mb-4">
          <table className="w-full text-[10px] text-center">
            <thead className="bg-[#4682b4] text-white">
              <tr>
                <th className="p-1 border-r border-white">VENNO</th>
                <th className="p-1 border-r border-white">NAME</th>
                <th className="p-1 border-r border-white">T</th>
                <th className="p-1 border-r border-white">WEIT.</th>
                <th className="p-1 border-r border-white">FAT</th>
                <th className="p-1 border-r border-white">SNF</th>
                <th className="p-1 border-r border-white">AMOUNT</th>
                <th className="p-1 border-r border-white">RATE</th>
                <th className="p-1">T</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200">
                <td className="p-1 font-bold">0</td>
                <td className="p-1 font-bold">0</td>
                <td className="p-1">B</td>
                <td className="p-1">0.00</td>
                <td className="p-1">0.0</td>
                <td className="p-1">0.0</td>
                <td className="p-1">0.00</td>
                <td className="p-1">0.00</td>
                <td className="p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* KEYPAD AREA */}
        <div className="flex items-end justify-end gap-4">
          <div className="flex flex-col gap-4 mb-4">
             <Send className="w-8 h-8 text-blue-700 -rotate-45" />
             <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"><X className="w-6 h-6 text-white" /></div>
             <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>

          <div className="w-64 bg-[#2c5e7c] p-1 rounded-xl shadow-inner">
            <div className="grid grid-cols-4 gap-1">
              {[7, 8, 9].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">{n}</button>)}
              <button onClick={() => handleKeypadPress("ERASE")} className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900 shadow-sm">ERASE</button>

              {[4, 5, 6].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">{n}</button>)}
              <button className="row-span-2 h-25 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">SAVE</button>

              {[1, 2, 3].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">{n}</button>)}

              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900 shadow-sm">PREV</button>
              <button onClick={() => handleKeypadPress("0")} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">0</button>
              <button onClick={() => handleKeypadPress(".")} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900 shadow-sm">.</button>
              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900 shadow-sm">NEXT</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="h-10 bg-[#4682b4] flex items-center border-t border-white">
        <div className="w-12 h-full bg-[#f4f7f6] flex items-center justify-center border-r border-gray-400">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 grid grid-cols-5 h-full text-[11px] font-bold">
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-100">Total</div>
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-200">0</div>
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-200">0</div>
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-200">0</div>
          <div className="flex items-center justify-center bg-blue-300 text-green-700">0</div>
        </div>
      </div>
    </div>
  );
}

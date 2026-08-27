"use client";

import { useState } from "react";
import { X, Calendar, Search } from "lucide-react";

interface RateChartModalProps {
  onClose: () => void;
}

export default function RateChartModal({ onClose }: RateChartModalProps) {
  const [activeField, setActiveField] = useState<"cow" | "buff">("cow");
  const [cowRate, setCowRate] = useState("40");
  const [buffRate, setBuffRate] = useState("65");

  const handleKeypadPress = (val: string) => {
    let currentVal = activeField === "cow" ? cowRate : buffRate;
    if (val === "ERASE") currentVal = currentVal.slice(0, -1);
    else currentVal += val;
    if (activeField === "cow") setCowRate(currentVal);
    else setBuffRate(currentVal);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* HEADER */}
      <div className="h-14 bg-[#4682b4] text-white px-4 flex items-center shadow-md flex-shrink-0">
        <span className="font-bold text-lg">SM MILK/Rate Chart</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#f4f7f6]">
        <div className="grid grid-cols-2 gap-2 mb-4">
           <div className={`p-4 border-2 rounded-xl text-center font-bold ${activeField === 'cow' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onClick={() => setActiveField('cow')}>
              <div className="text-xs uppercase text-gray-500">Cow Base Rate</div>
              <div className="text-2xl">₹{cowRate}</div>
           </div>
           <div className={`p-4 border-2 rounded-xl text-center font-bold ${activeField === 'buff' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onClick={() => setActiveField('buff')}>
              <div className="text-xs uppercase text-gray-500">Buffalo Base Rate</div>
              <div className="text-2xl">₹{buffRate}</div>
           </div>
        </div>

        <div className="w-full bg-[#2c5e7c] p-2 rounded-xl shadow-inner max-w-sm mx-auto">
            <div className="grid grid-cols-4 gap-1">
              {[7, 8, 9].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-14 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button onClick={() => handleKeypadPress("ERASE")} className="h-14 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">ERASE</button>
              {[4, 5, 6].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-14 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button onClick={onClose} className="row-span-2 bg-emerald-600 text-white font-bold rounded-lg border border-slate-900">SAVE</button>
              {[1, 2, 3].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-14 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button className="h-14 bg-red-500 text-white text-[10px] font-bold rounded-lg border border-slate-900" onClick={onClose}>CLOSE</button>
              <button onClick={() => handleKeypadPress("0")} className="h-14 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">0</button>
              <button onClick={() => handleKeypadPress(".")} className="h-14 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">.</button>
              <button className="h-14 bg-gray-500 text-white text-[10px] font-bold rounded-lg border border-slate-900">NEXT</button>
            </div>
        </div>
      </div>

      <div className="h-10 bg-[#4682b4] flex items-center border-t border-white">
        <div className="w-12 h-full bg-white flex items-center justify-center border-r border-gray-400">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 flex items-center justify-center text-[11px] font-bold text-white uppercase tracking-widest">Rate List Editor</div>
      </div>
    </div>
  );
}

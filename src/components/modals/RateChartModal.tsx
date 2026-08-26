"use client";

import { useState } from "react";
import { X, Sliders, CheckCircle } from "lucide-react";

interface RateChartModalProps {
  onClose: () => void;
}

export default function RateChartModal({ onClose }: RateChartModalProps) {
  const [baseCowRate, setBaseCowRate] = useState("40.0");
  const [baseBuffaloRate, setBaseBuffaloRate] = useState("55.0");
  const [fatIncStep, setFatIncStep] = useState("0.50");
  const [snfIncStep, setSnfIncStep] = useState("0.30");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Header */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Rate Chart Setup (FAT/SNF रेट लिस्ट)</span>
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
            <h3 className="text-lg font-black text-white">Milk Rate Chart Updated!</h3>
            <p className="text-sm text-slate-400">
              New FAT/SNF rate matrix has been saved and applied to all new milk entries.
            </p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 font-extrabold text-white text-base shadow-lg">
              OK (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
            {/* Cow Rate Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider">Cow Milk (गाय का बेस रेट)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Base Rate (₹/Ltr)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={baseCowRate}
                    onChange={(e) => setBaseCowRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Standard FAT</label>
                  <input type="text" value="3.5 %" disabled className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-500 font-bold font-mono" />
                </div>
              </div>
            </div>

            {/* Buffalo Rate Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider">Buffalo Milk (भैंस का बेस रेट)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Base Rate (₹/Ltr)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={baseBuffaloRate}
                    onChange={(e) => setBaseBuffaloRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Standard FAT</label>
                  <input type="text" value="6.5 %" disabled className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-500 font-bold font-mono" />
                </div>
              </div>
            </div>

            {/* Increment Steps */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">+0.1 FAT Step (₹)</label>
                <input
                  type="number"
                  step="0.05"
                  value={fatIncStep}
                  onChange={(e) => setFatIncStep(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">+0.1 SNF Step (₹)</label>
                <input
                  type="number"
                  step="0.05"
                  value={snfIncStep}
                  onChange={(e) => setSnfIncStep(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold font-mono outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:opacity-90 font-extrabold text-white text-base shadow-lg">
                Save Rate Chart (रेट तालिका सेव करें)
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

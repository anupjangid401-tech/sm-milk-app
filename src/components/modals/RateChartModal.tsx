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
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">दूध दर तालिका (Rate Chart Setup)</h2>
              <p className="text-xs text-slate-400">FAT / SNF दर मैट्रिक्स तालिका</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">दूध दर तालिका अपडेट हो गई!</h3>
            <p className="text-xs text-slate-400">नई दरें सभी खरीद प्रविष्टियों पर तुरंत लागू हो गई हैं।</p>
            <button onClick={onClose} className="glass-btn w-full mt-4">
              ठीक है (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">गाय का दूध (Cow Base Rate)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">बेस रेट (Standard Rate ₹)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={baseCowRate}
                    onChange={(e) => setBaseCowRate(e.target.value)}
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">मानक FAT (Standard FAT)</label>
                  <input type="text" value="3.5 %" disabled className="glass-input opacity-60" />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">भैंस का दूध (Buffalo Base Rate)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">बेस रेट (Standard Rate ₹)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={baseBuffaloRate}
                    onChange={(e) => setBaseBuffaloRate(e.target.value)}
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">मानक FAT (Standard FAT)</label>
                  <input type="text" value="6.5 %" disabled className="glass-input opacity-60" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">+0.1 FAT बढ़ोतरी (₹)</label>
                <input
                  type="number"
                  step="0.05"
                  value={fatIncStep}
                  onChange={(e) => setFatIncStep(e.target.value)}
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">+0.1 SNF बढ़ोतरी (₹)</label>
                <input
                  type="number"
                  step="0.05"
                  value={snfIncStep}
                  onChange={(e) => setSnfIncStep(e.target.value)}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="glass-btn flex-1 bg-gradient-to-r from-cyan-500 to-blue-600">
                रेट चार्ट सेव करें (Save Rates)
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

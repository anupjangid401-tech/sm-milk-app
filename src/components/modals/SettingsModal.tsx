"use client";

import { useState } from "react";
import { X, Settings, Printer, Scale, Sliders, FileText, CheckCircle, Wifi, Bluetooth } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'Slip' | 'Fat' | 'Weight' | 'Printer'>('Slip');

  // Slip Settings state
  const [printLang, setPrintLang] = useState('English');
  const [rollType, setRollType] = useState('Big');
  const [skipLine, setSkipLine] = useState('4');
  const [amountRound, setAmountRound] = useState('10');
  const [smsSlip, setSmsSlip] = useState(true);
  const [logoOnSlip, setLogoOnSlip] = useState(true);
  const [autoCutter, setAutoCutter] = useState(false);

  // Fat Settings state
  const [fatChartType, setFatChartType] = useState('FAT SNF CHART RAJSTHAN');
  const [maxFatCow, setMaxFatCow] = useState('10');
  const [maxFatBuff, setMaxFatBuff] = useState('10');
  const [avgFatDays, setAvgFatDays] = useState('5');

  // Weight Settings state
  const [weightType, setWeightType] = useState('VDC(WIFI)');
  const [fatType, setFatType] = useState('Normal');
  const [cutterTime, setCutterTime] = useState('0.5');

  // Printer Settings state
  const [btPrinterMac, setBtPrinterMac] = useState('C8:47:8C:33:B5:41');
  const [printSlip, setPrintSlip] = useState(true);
  const [usbSlipPrinting, setUsbSlipPrinting] = useState(true);
  const [englishNumber, setEnglishNumber] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Bar */}
      <div className="h-12 bg-slate-900 text-white px-4 flex items-center justify-between shadow-md border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Settings (ऐप सेटिंग्स)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-1 bg-slate-900 p-2 border-b border-slate-800 text-xs overflow-x-auto no-scrollbar flex-shrink-0">
        {(['Slip', 'Fat', 'Weight', 'Printer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-center transition-all ${
              activeTab === tab
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 bg-slate-950 hover:text-white'
            }`}
          >
            {tab === 'Slip' && 'Slip (रसीद)'}
            {tab === 'Fat' && 'Fat (रेट/चार्ट)'}
            {tab === 'Weight' && 'Weight (कांटा)'}
            {tab === 'Printer' && 'Printer (प्रिंटर)'}
          </button>
        ))}
      </div>

      {/* Main Full Screen Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {isSaved ? (
          <div className="text-center py-10 space-y-4 bg-slate-950 p-6 rounded-3xl border border-cyan-500/40 shadow-xl">
            <CheckCircle className="w-14 h-14 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">Settings Saved Successfully!</h3>
            <p className="text-sm text-slate-400">All printer, scale, and slip parameters have been saved.</p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-cyan-600 font-extrabold text-white text-base shadow-lg shadow-cyan-600/40">
              OK (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
            {/* TAB 1: SLIP SETTINGS */}
            {activeTab === 'Slip' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Print Language</label>
                    <select
                      value={printLang}
                      onChange={(e) => setPrintLang(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Roll Size</label>
                    <select
                      value={rollType}
                      onChange={(e) => setRollType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                    >
                      <option value="Big">Big Roll (3 inch)</option>
                      <option value="Small">Small Roll (2 inch)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Skip Line</label>
                    <input
                      type="number"
                      value={skipLine}
                      onChange={(e) => setSkipLine(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Amount Round</label>
                    <input
                      type="number"
                      value={amountRound}
                      onChange={(e) => setAmountRound(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-white">SMS Slip (Mobile Text)</span>
                    <input
                      type="checkbox"
                      checked={smsSlip}
                      onChange={(e) => setSmsSlip(e.target.checked)}
                      className="w-5 h-5 accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-white">Logo On Slip (Dairy Logo)</span>
                    <input
                      type="checkbox"
                      checked={logoOnSlip}
                      onChange={(e) => setLogoOnSlip(e.target.checked)}
                      className="w-5 h-5 accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FAT SETTINGS */}
            {activeTab === 'Fat' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Rate Chart Type</label>
                  <select
                    value={fatChartType}
                    onChange={(e) => setFatChartType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                  >
                    <option value="FAT SNF CHART RAJSTHAN">FAT SNF CHART RAJSTHAN</option>
                    <option value="FAT SNF CHART GUJARAT">FAT SNF CHART GUJARAT</option>
                    <option value="AMUL DAIRY RATE CHART">AMUL DAIRY RATE CHART</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Max Cow Fat</label>
                    <input
                      type="number"
                      value={maxFatCow}
                      onChange={(e) => setMaxFatCow(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Max Buff Fat</label>
                    <input
                      type="number"
                      value={maxFatBuff}
                      onChange={(e) => setMaxFatBuff(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Avg Fat Days</label>
                    <input
                      type="number"
                      value={avgFatDays}
                      onChange={(e) => setAvgFatDays(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WEIGHT SETTINGS */}
            {activeTab === 'Weight' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-6 h-6 text-cyan-400 animate-pulse" />
                    <div>
                      <span className="font-extrabold text-sm text-cyan-300 block">WiFi Weight Scale Integration</span>
                      <span className="text-xs text-slate-400">VDC(WIFI) Scale Connected</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Weight Scale Type</label>
                    <select
                      value={weightType}
                      onChange={(e) => setWeightType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                    >
                      <option value="VDC(WIFI)">VDC(WIFI)</option>
                      <option value="BLUETOOTH(SCALE)">BLUETOOTH(SCALE)</option>
                      <option value="MANUAL">MANUAL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold uppercase tracking-wider">Fat Analyzer</label>
                    <select
                      value={fatType}
                      onChange={(e) => setFatType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                    >
                      <option value="Normal">Normal Auto</option>
                      <option value="EkoMilk">EkoMilk Analyzer</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRINTER SETTINGS */}
            {activeTab === 'Printer' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bluetooth className="w-6 h-6 text-emerald-400" />
                    <div>
                      <span className="font-extrabold text-sm text-white block">SET RECEIPT PRINTER</span>
                      <span className="text-xs font-mono text-emerald-300">{btPrinterMac}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Scanning for Bluetooth printers...")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md"
                  >
                    Scan BT
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-white">Print Slip (Receipt Print)</span>
                    <input
                      type="checkbox"
                      checked={printSlip}
                      onChange={(e) => setPrintSlip(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-white">Usb Slip Printing</span>
                    <input
                      type="checkbox"
                      checked={usbSlipPrinting}
                      onChange={(e) => setUsbSlipPrinting(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 font-extrabold text-white text-base shadow-lg shadow-cyan-600/30">
                Save Settings (सेटिंग्स सेव करें)
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

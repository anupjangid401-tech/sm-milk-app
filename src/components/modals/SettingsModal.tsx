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
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-5 max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">SM MILK -- Settings</h2>
              <p className="text-xs text-slate-400">प्रिंटर, कांटा, FAT एवं रसीद सेटिंग्स</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Navigation Tabs (Photo 1-4 match) */}
        <div className="flex gap-1 bg-slate-950/80 p-1 my-3 rounded-xl border border-white/10 text-xs overflow-x-auto no-scrollbar">
          {(['Slip', 'Fat', 'Weight', 'Printer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-center transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'Slip' && 'Slip (पर्ची)'}
              {tab === 'Fat' && 'Fat (गुणवत्ता)'}
              {tab === 'Weight' && 'Weight (कांटा)'}
              {tab === 'Printer' && 'Printer (प्रिंटर)'}
            </button>
          ))}
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">सेटिंग्स सफलतापूर्वक सेव हो गईं!</h3>
            <p className="text-xs text-slate-400">सारे प्रिंटर एवं तोल कांटा पैरामीटर अपडेट हो चुके हैं।</p>
            <button onClick={onClose} className="glass-btn w-full mt-4">
              ठीक है (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {/* TAB 1: SLIP SETTINGS (Matches Photo 1) */}
            {activeTab === 'Slip' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Print Language</label>
                    <select
                      value={printLang}
                      onChange={(e) => setPrintLang(e.target.value)}
                      className="glass-select"
                    >
                      <option value="English" className="bg-slate-900">English</option>
                      <option value="Hindi" className="bg-slate-900">Hindi (हिंदी)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Roll Type</label>
                    <select
                      value={rollType}
                      onChange={(e) => setRollType(e.target.value)}
                      className="glass-select"
                    >
                      <option value="Big" className="bg-slate-900">Big Roll (3 inch)</option>
                      <option value="Small" className="bg-slate-900">Small Roll (2 inch)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Skip Line</label>
                    <input
                      type="number"
                      value={skipLine}
                      onChange={(e) => setSkipLine(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Amount Round</label>
                    <input
                      type="number"
                      value={amountRound}
                      onChange={(e) => setAmountRound(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white">SMS Slip (मोबाइल मैसेज पर्ची)</span>
                    <input
                      type="checkbox"
                      checked={smsSlip}
                      onChange={(e) => setSmsSlip(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Logo On Slip (डेयरी लोगो)</span>
                    <input
                      type="checkbox"
                      checked={logoOnSlip}
                      onChange={(e) => setLogoOnSlip(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Auto Cutter (ऑटो पेपर कटर)</span>
                    <input
                      type="checkbox"
                      checked={autoCutter}
                      onChange={(e) => setAutoCutter(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FAT SETTINGS (Matches Photo 2) */}
            {activeTab === 'Fat' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Grade FAT Type (रेट चार्ट)</label>
                  <select
                    value={fatChartType}
                    onChange={(e) => setFatChartType(e.target.value)}
                    className="glass-select"
                  >
                    <option value="FAT SNF CHART RAJSTHAN" className="bg-slate-900">FAT SNF CHART RAJSTHAN</option>
                    <option value="FAT SNF CHART GUJARAT" className="bg-slate-900">FAT SNF CHART GUJARAT</option>
                    <option value="AMUL DAIRY RATE CHART" className="bg-slate-900">AMUL DAIRY RATE CHART</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">Max Cow Fat</label>
                    <input
                      type="number"
                      value={maxFatCow}
                      onChange={(e) => setMaxFatCow(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Max Buff Fat</label>
                    <input
                      type="number"
                      value={maxFatBuff}
                      onChange={(e) => setMaxFatBuff(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Avg Fat Days</label>
                    <input
                      type="number"
                      value={avgFatDays}
                      onChange={(e) => setAvgFatDays(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WEIGHT SETTINGS (Matches Photo 3) */}
            {activeTab === 'Weight' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <div>
                      <span className="font-bold text-cyan-300 block">Weight Scale Type</span>
                      <span className="text-[10px] text-slate-400">WiFi Weighing Machine</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    Connected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Weight Type</label>
                    <select
                      value={weightType}
                      onChange={(e) => setWeightType(e.target.value)}
                      className="glass-select"
                    >
                      <option value="VDC(WIFI)" className="bg-slate-900">VDC(WIFI)</option>
                      <option value="BLUETOOTH(SCALE)" className="bg-slate-900">BLUETOOTH(SCALE)</option>
                      <option value="MANUAL" className="bg-slate-900">MANUAL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Fat Type</label>
                    <select
                      value={fatType}
                      onChange={(e) => setFatType(e.target.value)}
                      className="glass-select"
                    >
                      <option value="Normal" className="bg-slate-900">Normal</option>
                      <option value="EkoMilk" className="bg-slate-900">EkoMilk Analyzer</option>
                      <option value="UltraFat" className="bg-slate-900">UltraFat Pro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Cutter Time Type</label>
                  <input
                    type="text"
                    value={cutterTime}
                    onChange={(e) => setCutterTime(e.target.value)}
                    className="glass-input"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PRINTER SETTINGS (Matches Photo 4) */}
            {activeTab === 'Printer' && (
              <div className="space-y-3 text-xs">
                {/* Printer Mac Card */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bluetooth className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white block">SET RECEIPT PRINTER</span>
                      <span className="text-[11px] font-mono text-emerald-300">{btPrinterMac}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Searching for Bluetooth printers...")}
                    className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-[10px]"
                  >
                    Scan BT
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Print Slip (पर्ची प्रिंट)</span>
                    <input
                      type="checkbox"
                      checked={printSlip}
                      onChange={(e) => setPrintSlip(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Usb Slip Printing (USB केबल प्रिंट)</span>
                    <input
                      type="checkbox"
                      checked={usbSlipPrinting}
                      onChange={(e) => setUsbSlipPrinting(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">English Number (अंक इंग्लिश में)</span>
                    <input
                      type="checkbox"
                      checked={englishNumber}
                      onChange={(e) => setEnglishNumber(e.target.checked)}
                      className="w-4 h-4 accent-pink-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Action */}
            <div className="pt-3 flex gap-2">
              <button type="submit" className="glass-btn flex-1">
                सेटिंग्स सेव करें (Save Settings)
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

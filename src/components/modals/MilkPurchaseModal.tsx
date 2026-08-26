"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, MilkType, ShiftType } from "@/lib/types";
import {
  X,
  Printer,
  Calendar,
  Sun,
  Moon,
  Trash2,
  Share2,
  Send,
  Search,
  CheckCircle,
  User
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
  // Slip & Date State
  const [slipNo, setSlipNo] = useState<number>(1);
  const [entryDate, setEntryDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [shift, setShift] = useState<ShiftType>(initialShift);

  // Vendor Entry State
  const [vendorNo, setVendorNo] = useState<string>("101");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [liters, setLiters] = useState<string>("");
  const [fat, setFat] = useState<string>("");
  const [snf, setSnf] = useState<string>("");
  const [activeField, setActiveField] = useState<"qty" | "fat" | "snf">("qty");

  // Local Session Entries List
  const [sessionEntries, setSessionEntries] = useState<MilkPurchaseRecord[]>([]);
  const [lastSavedRecord, setLastSavedRecord] = useState<MilkPurchaseRecord | null>(null);

  // Auto lookup farmer name
  const currentMember = members.find((m) => m.code === vendorNo);
  const vendorName = currentMember ? currentMember.name : vendorNo ? "Farmer Code #" + vendorNo : "Name (English)";

  // Auto Calculations
  const numFat = parseFloat(fat) || 0;
  const numSnf = parseFloat(snf) || 0;
  const numLiters = parseFloat(liters) || 0;

  const baseRate = milkType === "BUFFALO" ? 22 : 18;
  const calculatedRate = (numFat > 0 || numSnf > 0) ? parseFloat((baseRate + numFat * 4.8 + numSnf * 1.8).toFixed(2)) : 0;
  const totalAmount = parseFloat((numLiters * calculatedRate).toFixed(2));

  // Summary Totals
  const totalEntries = sessionEntries.length;
  const totalLitersSum = sessionEntries.reduce((sum, item) => sum + item.liters, 0);
  const totalAmountSum = sessionEntries.reduce((sum, item) => sum + item.totalAmount, 0);
  const avgFatSum = totalEntries > 0 ? (sessionEntries.reduce((sum, item) => sum + item.fat, 0) / totalEntries).toFixed(1) : "0.0";
  const avgSnfSum = totalEntries > 0 ? (sessionEntries.reduce((sum, item) => sum + item.snf, 0) / totalEntries).toFixed(1) : "0.0";

  // Handle Numpad Key Press
  const handleKeypadPress = (val: string) => {
    let currentVal = activeField === "qty" ? liters : activeField === "fat" ? fat : snf;

    if (val === "ERASE") {
      currentVal = currentVal.slice(0, -1);
    } else if (val === ".") {
      if (!currentVal.includes(".")) {
        currentVal = currentVal === "" ? "0." : currentVal + ".";
      }
    } else {
      currentVal = currentVal + val;
    }

    if (activeField === "qty") setLiters(currentVal);
    else if (activeField === "fat") setFat(currentVal);
    else setSnf(currentVal);
  };

  const handleNextField = () => {
    if (activeField === "qty") setActiveField("fat");
    else if (activeField === "fat") setActiveField("snf");
    else setActiveField("qty");
  };

  const handlePrevField = () => {
    if (activeField === "snf") setActiveField("fat");
    else if (activeField === "fat") setActiveField("qty");
    else setActiveField("snf");
  };

  // Save Record
  const handleSaveEntry = () => {
    if (numLiters <= 0) {
      alert("कृपया दूध की मात्रा (Qty/Liters) दर्ज करें!");
      return;
    }

    const newRecord: MilkPurchaseRecord = {
      id: "pur-" + Date.now(),
      date: entryDate,
      shift: shift,
      memberCode: vendorNo || "101",
      memberName: vendorName,
      milkType: milkType,
      liters: numLiters,
      fat: numFat,
      snf: numSnf,
      ratePerLiter: calculatedRate,
      totalAmount: totalAmount,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    onSave(newRecord);
    setSessionEntries([newRecord, ...sessionEntries]);
    setLastSavedRecord(newRecord);

    // Reset inputs for next farmer
    setSlipNo((prev) => prev + 1);
    setVendorNo((prev) => (parseInt(prev) + 1).toString());
    setLiters("");
    setFat("");
    setSnf("");
    setActiveField("qty");
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* ── TOP NAV HEADER (SM MILK / Milk Purchase) ── */}
      <div className="h-12 bg-sky-700 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight">SM MILK</span>
          <span className="opacity-60 text-sm">/</span>
          <span className="font-bold text-sm text-sky-100">Milk Purchase (दूध खरीद)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-800/80 hover:bg-red-600 text-white transition-colors"
          title="Close Full Screen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── FULL SCREEN MAIN BODY ── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-900">
        {/* ROW 1: Slip No, Date, Shift */}
        <div className="grid grid-cols-3 gap-2">
          {/* Slip / Batch No */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-2 flex items-center justify-center">
            <input
              type="number"
              value={slipNo}
              onChange={(e) => setSlipNo(parseInt(e.target.value) || 1)}
              className="w-full text-center font-bold text-lg text-emerald-400 bg-transparent outline-none"
            />
          </div>

          {/* Date Picker */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-2 flex items-center justify-between">
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full font-bold text-xs text-slate-200 bg-transparent outline-none"
            />
            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>

          {/* Shift Toggle */}
          <button
            onClick={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
            className={`rounded-xl px-3 py-2 font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
              shift === "MORNING"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
            }`}
          >
            {shift === "MORNING" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{shift === "MORNING" ? "Morning" : "Evening"}</span>
          </button>
        </div>

        {/* ROW 2: Vendor No, Milk Type Toggle, Name Display */}
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* Vendor Code */}
          <div className="col-span-4 bg-slate-950 border-2 border-pink-500/60 rounded-xl p-2 flex items-center gap-1.5">
            <User className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <input
              type="number"
              value={vendorNo}
              onChange={(e) => setVendorNo(e.target.value)}
              placeholder="Vendor No"
              className="w-full font-bold text-base text-white bg-transparent outline-none"
            />
          </div>

          {/* Milk Type Toggle */}
          <div className="col-span-3">
            <button
              onClick={() => setMilkType((t) => (t === "BUFFALO" ? "COW" : "BUFFALO"))}
              className={`w-full py-2.5 rounded-xl font-extrabold text-xs border text-center transition-all ${
                milkType === "BUFFALO"
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
              }`}
            >
              {milkType === "BUFFALO" ? "Buffalo (भैंस)" : "Cow (गाय)"}
            </button>
          </div>

          {/* Name Display */}
          <div className="col-span-5 bg-emerald-900/40 border border-emerald-500/50 rounded-xl px-3 py-2">
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Name (English)</div>
            <div className="text-sm font-extrabold text-white truncate">{vendorName}</div>
          </div>
        </div>

        {/* ROW 3: Calculated Stat Cards */}
        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Avg.Ltr</div>
            <div className="text-sm font-extrabold text-white">{numLiters > 0 ? numLiters.toFixed(1) : "0.0"}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Rate</div>
            <div className="text-sm font-extrabold text-cyan-300">₹{calculatedRate.toFixed(2)}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Per/Ltr</div>
            <div className="text-sm font-extrabold text-white">₹{calculatedRate.toFixed(1)}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Avg.Fat</div>
            <div className="text-sm font-extrabold text-amber-300">{numFat > 0 ? numFat.toFixed(1) : "0.0"}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl col-span-1">
            <div className="text-[9px] font-bold text-emerald-400 uppercase">Amount</div>
            <div className="text-sm font-extrabold text-emerald-400">₹{totalAmount.toFixed(2)}</div>
          </div>
        </div>

        {/* ROW 4: Entry Fields + Live Table + On-Screen Touch Numpad */}
        <div className="grid grid-cols-12 gap-3 items-start">
          {/* Left Column Inputs (Qty, Fat, SNF) */}
          <div className="col-span-4 space-y-2.5">
            {/* Qty Input */}
            <div
              onClick={() => setActiveField("qty")}
              className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                activeField === "qty"
                  ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Qty. (लीटर)</span>
              </div>
              <div className="text-xl font-black text-white font-mono min-h-[28px]">
                {liters || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            {/* Fat Input */}
            <div
              onClick={() => setActiveField("fat")}
              className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                activeField === "fat"
                  ? "bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Fat %</span>
              </div>
              <div className="text-xl font-black text-amber-300 font-mono min-h-[28px]">
                {fat || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            {/* SNF Input */}
            <div
              onClick={() => setActiveField("snf")}
              className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                activeField === "snf"
                  ? "bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>S N F %</span>
              </div>
              <div className="text-xl font-black text-purple-300 font-mono min-h-[28px]">
                {snf || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around pt-2">
              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-slate-800 text-sky-400 hover:bg-slate-700 border border-slate-700"
                title="Print Slip"
              >
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setLiters("");
                  setFat("");
                  setSnf("");
                }}
                className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40"
                title="Clear Inputs"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                onClick={() => alert("Slip share link created!")}
                className="p-2 rounded-xl bg-slate-800 text-purple-400 hover:bg-slate-700 border border-slate-700"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section: On-Screen Touch Numpad */}
          <div className="col-span-8 bg-sky-950/60 border border-sky-800/60 rounded-2xl p-2.5 shadow-xl">
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button onClick={() => handleKeypadPress("7")} className="numpad-btn">7</button>
              <button onClick={() => handleKeypadPress("8")} className="numpad-btn">8</button>
              <button onClick={() => handleKeypadPress("9")} className="numpad-btn">9</button>
              <button onClick={() => handleKeypadPress("ERASE")} className="numpad-btn bg-sky-800 text-xs font-bold">ERASE</button>

              {/* Row 2 */}
              <button onClick={() => handleKeypadPress("4")} className="numpad-btn">4</button>
              <button onClick={() => handleKeypadPress("5")} className="numpad-btn">5</button>
              <button onClick={() => handleKeypadPress("6")} className="numpad-btn">6</button>
              <button
                onClick={handleSaveEntry}
                className="row-span-2 numpad-btn bg-sky-600 hover:bg-sky-500 text-white font-black text-sm shadow-lg shadow-sky-600/40 border border-sky-400 flex items-center justify-center"
              >
                SAVE
              </button>

              {/* Row 3 */}
              <button onClick={() => handleKeypadPress("1")} className="numpad-btn">1</button>
              <button onClick={() => handleKeypadPress("2")} className="numpad-btn">2</button>
              <button onClick={() => handleKeypadPress("3")} className="numpad-btn">3</button>

              {/* Row 4 */}
              <button onClick={handlePrevField} className="numpad-btn text-xs font-bold bg-sky-900">PREV</button>
              <button onClick={() => handleKeypadPress("0")} className="numpad-btn">0</button>
              <button onClick={() => handleKeypadPress(".")} className="numpad-btn">.</button>
              <button onClick={handleNextField} className="numpad-btn text-xs font-bold bg-sky-900">NEXT</button>
            </div>
          </div>
        </div>

        {/* Live Entries Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mt-3">
          <div className="bg-sky-900/80 px-3 py-1.5 text-xs font-bold text-white flex items-center justify-between">
            <span>Saved Records (आज की खरीद एंट्रीज)</span>
            <span className="text-[10px] bg-sky-950 px-2 py-0.5 rounded text-sky-300">{sessionEntries.length} Items</span>
          </div>

          <div className="max-h-40 overflow-y-auto">
            <table className="w-full text-xs text-left text-slate-200">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2">VENNO</th>
                  <th className="p-2">NAME</th>
                  <th className="p-2">T</th>
                  <th className="p-2">WEIT.</th>
                  <th className="p-2">FAT</th>
                  <th className="p-2">SNF</th>
                  <th className="p-2">RATE</th>
                  <th className="p-2 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {sessionEntries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-3 text-center text-slate-500 font-sans text-xs">
                      कोई एंट्री दर्ज नहीं हुई है। Numpad से दर्ज करें!
                    </td>
                  </tr>
                ) : (
                  sessionEntries.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-900">
                      <td className="p-2 font-bold text-cyan-300">{rec.memberCode}</td>
                      <td className="p-2 truncate max-w-[100px] text-white font-sans">{rec.memberName}</td>
                      <td className="p-2 text-amber-300">{rec.milkType === "BUFFALO" ? "B" : "C"}</td>
                      <td className="p-2 text-white font-bold">{rec.liters}</td>
                      <td className="p-2 text-amber-300">{rec.fat}</td>
                      <td className="p-2 text-purple-300">{rec.snf}</td>
                      <td className="p-2 text-cyan-300">₹{rec.ratePerLiter}</td>
                      <td className="p-2 text-right text-emerald-400 font-bold">₹{rec.totalAmount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SUMMARY BAR ── */}
      <div className="h-10 bg-indigo-600 text-white px-3 flex items-center justify-between text-xs font-extrabold flex-shrink-0 shadow-lg border-t border-indigo-500">
        <div className="flex items-center gap-1">
          <Search className="w-4 h-4 text-indigo-200" />
          <span>Total:</span>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <span>Count: <span className="text-amber-300">{totalEntries}</span></span>
          <span>Ltr: <span className="text-white">{totalLitersSum.toFixed(1)}</span></span>
          <span>Fat: <span className="text-amber-300">{avgFatSum}%</span></span>
          <span>Snf: <span className="text-purple-300">{avgSnfSum}%</span></span>
          <span>Amt: <span className="text-emerald-300 font-black text-sm">₹{totalAmountSum.toFixed(2)}</span></span>
        </div>
      </div>
    </div>
  );
}

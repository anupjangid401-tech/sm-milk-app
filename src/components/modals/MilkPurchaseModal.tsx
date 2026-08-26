"use client";

import { useState } from "react";
import { Member, MilkPurchaseRecord, MilkType, ShiftType } from "@/lib/types";
import {
  X,
  Printer,
  Calendar,
  Sun,
  Moon,
  Send,
  Share2,
  Search,
  User,
  Droplets
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

  // Auto lookup farmer name
  const currentMember = members.find((m) => m.code === vendorNo);
  const vendorName = currentMember ? currentMember.name : vendorNo ? "Farmer #" + vendorNo : "Farmer Name";

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
      {/* ── UNIFIED PROFESSIONAL TOP BAR (Sky Navy Blue) ── */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Milk Purchase (दूध खरीद)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-950 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── FULL SCREEN BODY ── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-900">
        {/* ROW 1: Slip No, Date, Shift */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 flex items-center justify-center">
            <input
              type="number"
              value={slipNo}
              onChange={(e) => setSlipNo(parseInt(e.target.value) || 1)}
              className="w-full text-center font-bold text-base text-cyan-300 bg-transparent outline-none font-mono"
            />
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full font-bold text-xs text-slate-200 bg-transparent outline-none"
            />
            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>

          <button
            onClick={() => setShift((s) => (s === "MORNING" ? "EVENING" : "MORNING"))}
            className="rounded-xl px-3 py-2 font-bold text-xs flex items-center justify-center gap-1.5 bg-slate-950 border border-slate-800 text-cyan-300"
          >
            {shift === "MORNING" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
            <span>{shift === "MORNING" ? "Morning" : "Evening"}</span>
          </button>
        </div>

        {/* ROW 2: Vendor No, Milk Type Toggle, Name Display */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-2 flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <input
              type="number"
              value={vendorNo}
              onChange={(e) => setVendorNo(e.target.value)}
              placeholder="Code"
              className="w-full font-bold text-base text-white bg-transparent outline-none font-mono"
            />
          </div>

          <div className="col-span-3">
            <button
              onClick={() => setMilkType((t) => (t === "BUFFALO" ? "COW" : "BUFFALO"))}
              className="w-full py-2.5 rounded-xl font-extrabold text-xs bg-slate-950 border border-slate-800 text-cyan-300 text-center"
            >
              {milkType === "BUFFALO" ? "Buffalo (भैंस)" : "Cow (गाय)"}
            </button>
          </div>

          <div className="col-span-5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Farmer Name</div>
            <div className="text-xs font-extrabold text-white truncate">{vendorName}</div>
          </div>
        </div>

        {/* ROW 3: Calculated Stat Cards */}
        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-slate-400 uppercase">Avg.Ltr</div>
            <div className="text-sm font-extrabold text-white font-mono">{numLiters > 0 ? numLiters.toFixed(1) : "0.0"}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-slate-400 uppercase">Rate</div>
            <div className="text-sm font-extrabold text-cyan-300 font-mono">₹{calculatedRate.toFixed(2)}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-slate-400 uppercase">Per/Ltr</div>
            <div className="text-sm font-extrabold text-white font-mono">₹{calculatedRate.toFixed(1)}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-slate-400 uppercase">Avg.Fat</div>
            <div className="text-sm font-extrabold text-cyan-300 font-mono">{numFat > 0 ? numFat.toFixed(1) : "0.0"}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <div className="text-[9px] font-bold text-slate-400 uppercase">Amount</div>
            <div className="text-sm font-extrabold text-emerald-400 font-mono">₹{totalAmount.toFixed(2)}</div>
          </div>
        </div>

        {/* ROW 4: Entry Fields + On-Screen Touch Numpad */}
        <div className="grid grid-cols-12 gap-3 items-start">
          {/* Left Column Inputs (Qty, Fat, SNF) */}
          <div className="col-span-4 space-y-2">
            <div
              onClick={() => setActiveField("qty")}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                activeField === "qty"
                  ? "bg-slate-950 border-cyan-400"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">Qty. (लीटर)</div>
              <div className="text-lg font-black text-white font-mono min-h-[24px]">
                {liters || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            <div
              onClick={() => setActiveField("fat")}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                activeField === "fat"
                  ? "bg-slate-950 border-cyan-400"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">Fat %</div>
              <div className="text-lg font-black text-cyan-300 font-mono min-h-[24px]">
                {fat || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            <div
              onClick={() => setActiveField("snf")}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                activeField === "snf"
                  ? "bg-slate-950 border-cyan-400"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">S N F %</div>
              <div className="text-lg font-black text-cyan-300 font-mono min-h-[24px]">
                {snf || <span className="text-slate-600">0.0</span>}
              </div>
            </div>

            <div className="flex justify-around pt-1">
              <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                <Send className="w-4 h-4" />
              </button>
              <button onClick={() => { setLiters(""); setFat(""); setSnf(""); }} className="p-2 rounded-xl bg-slate-950 text-red-400 border border-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section: On-Screen Touch Numpad */}
          <div className="col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-2.5 shadow-xl">
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleKeypadPress("7")} className="numpad-btn">7</button>
              <button onClick={() => handleKeypadPress("8")} className="numpad-btn">8</button>
              <button onClick={() => handleKeypadPress("9")} className="numpad-btn">9</button>
              <button onClick={() => handleKeypadPress("ERASE")} className="numpad-btn bg-slate-800 text-xs font-bold text-red-400">ERASE</button>

              <button onClick={() => handleKeypadPress("4")} className="numpad-btn">4</button>
              <button onClick={() => handleKeypadPress("5")} className="numpad-btn">5</button>
              <button onClick={() => handleKeypadPress("6")} className="numpad-btn">6</button>
              <button
                onClick={handleSaveEntry}
                className="row-span-2 numpad-btn bg-gradient-to-b from-sky-600 to-blue-700 text-white font-black text-sm border border-sky-400"
              >
                SAVE
              </button>

              <button onClick={() => handleKeypadPress("1")} className="numpad-btn">1</button>
              <button onClick={() => handleKeypadPress("2")} className="numpad-btn">2</button>
              <button onClick={() => handleKeypadPress("3")} className="numpad-btn">3</button>

              <button onClick={handlePrevField} className="numpad-btn text-xs font-bold bg-slate-800">PREV</button>
              <button onClick={() => handleKeypadPress("0")} className="numpad-btn">0</button>
              <button onClick={() => handleKeypadPress(".")} className="numpad-btn">.</button>
              <button onClick={handleNextField} className="numpad-btn text-xs font-bold bg-slate-800">NEXT</button>
            </div>
          </div>
        </div>

        {/* Live Entries Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mt-3">
          <div className="bg-slate-900 px-3 py-1.5 text-xs font-bold text-white flex items-center justify-between border-b border-slate-800">
            <span>Saved Records (खरीद एंट्रीज)</span>
            <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-cyan-300 border border-slate-800">{sessionEntries.length} Items</span>
          </div>

          <div className="max-h-36 overflow-y-auto">
            <table className="w-full text-xs text-left text-slate-200">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-slate-800">VENNO</th>
                  <th className="p-2 border-r border-slate-800">NAME</th>
                  <th className="p-2 border-r border-slate-800">T</th>
                  <th className="p-2 border-r border-slate-800">WEIT.</th>
                  <th className="p-2 border-r border-slate-800">FAT</th>
                  <th className="p-2 border-r border-slate-800">SNF</th>
                  <th className="p-2 border-r border-slate-800">RATE</th>
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
                      <td className="p-2 border-r border-slate-800 font-bold text-cyan-300">{rec.memberCode}</td>
                      <td className="p-2 border-r border-slate-800 truncate max-w-[100px] text-white font-sans">{rec.memberName}</td>
                      <td className="p-2 border-r border-slate-800 text-cyan-300">{rec.milkType === "BUFFALO" ? "B" : "C"}</td>
                      <td className="p-2 border-r border-slate-800 text-white font-bold">{rec.liters}</td>
                      <td className="p-2 border-r border-slate-800 text-cyan-300">{rec.fat}</td>
                      <td className="p-2 border-r border-slate-800 text-cyan-300">{rec.snf}</td>
                      <td className="p-2 border-r border-slate-800 text-cyan-300">₹{rec.ratePerLiter}</td>
                      <td className="p-2 text-right text-emerald-400 font-bold">₹{rec.totalAmount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── UNIFIED BOTTOM BAR (Sky Navy) ── */}
      <div className="h-10 bg-sky-900 text-white px-3 flex items-center justify-between text-xs font-extrabold flex-shrink-0 border-t border-sky-800 font-mono">
        <div className="flex items-center gap-1">
          <Search className="w-4 h-4 text-cyan-300" />
          <span>Total:</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Count: <span className="text-cyan-300">{totalEntries}</span></span>
          <span>Ltr: <span className="text-white">{totalLitersSum.toFixed(1)}</span></span>
          <span>Fat: <span className="text-cyan-300">{avgFatSum}%</span></span>
          <span>Snf: <span className="text-cyan-300">{avgSnfSum}%</span></span>
          <span>Amt: <span className="text-emerald-400 font-black text-sm">₹{totalAmountSum.toFixed(2)}</span></span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MilkPurchaseRecord, MilkSaleRecord } from "@/lib/types";
import { X, FileText, Printer, Bluetooth, Calendar, Filter } from "lucide-react";

interface ReportsModalProps {
  reportType: 'purchase' | 'sale' | 'payment' | 'date-summary' | 'datewise';
  purchases: MilkPurchaseRecord[];
  sales: MilkSaleRecord[];
  onClose: () => void;
}

export default function ReportsModal({ reportType, purchases, sales, onClose }: ReportsModalProps) {
  const [filterShift, setFilterShift] = useState<'Morning' | 'Evening' | 'ALL'>('Morning');
  const [orderType, setOrderType] = useState('Sampal Order');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredPurchases = purchases.filter((p) => {
    const shiftMatch = filterShift === 'ALL' || (filterShift === 'Morning' && p.shift === 'MORNING') || (filterShift === 'Evening' && p.shift === 'EVENING');
    return shiftMatch;
  });

  const totalLiters = filteredPurchases.reduce((acc, p) => acc + p.liters, 0);
  const totalAmount = filteredPurchases.reduce((acc, p) => acc + p.totalAmount, 0);
  const avgFat = filteredPurchases.length > 0 ? (filteredPurchases.reduce((acc, p) => acc + (p.fat * p.liters), 0) / (totalLiters || 1)).toFixed(1) : "0.0";
  const avgSnf = filteredPurchases.length > 0 ? (filteredPurchases.reduce((acc, p) => acc + (p.snf * p.liters), 0) / (totalLiters || 1)).toFixed(1) : "0.0";

  const handlePrintAction = (type: 'DOT' | 'LSR' | 'BT') => {
    alert(`[${type} PRINT]: Printing Milk Purchase Report via ${type === 'BT' ? 'Bluetooth Thermal Printer (C8:47:8C:33:B5:41)' : type === 'DOT' ? 'Dot Matrix Printer' : 'Laser Printer'}...`);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Bar */}
      <div className="h-12 bg-sky-900 text-white px-4 flex items-center justify-between shadow-md border-b border-sky-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-300" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Purchase Report (दूध रिपोर्ट)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-sky-950 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full Screen Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900">
        {/* Top Controls Row */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 font-bold outline-none"
          />

          <select
            value={filterShift}
            onChange={(e) => setFilterShift(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none font-bold"
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="ALL">ALL Shifts</option>
          </select>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none font-bold"
          >
            <option value="Sampal Order">Sampal Order</option>
            <option value="Member Code Order">Code Order</option>
          </select>
        </div>

        {/* 4 Print Action Buttons (SHOW, DOT PRINT, LSR PRINT, BT PRINT) */}
        <div className="grid grid-cols-4 gap-2 text-xs font-bold">
          <button className="py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-black shadow-md text-center">
            SHOW
          </button>
          <button onClick={() => handlePrintAction('DOT')} className="py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold shadow-md text-center">
            DOT PRINT
          </button>
          <button onClick={() => handlePrintAction('LSR')} className="py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold shadow-md text-center">
            LSR PRINT
          </button>
          <button onClick={() => handlePrintAction('BT')} className="py-2.5 rounded-xl bg-sky-700 text-white font-bold shadow-md text-center flex items-center justify-center gap-1">
            <Bluetooth className="w-3.5 h-3.5" />
            <span>BT PRINT</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead className="bg-sky-950 text-cyan-300 font-bold border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-2.5 border-r border-slate-800">SR.N</th>
                <th className="p-2.5 border-r border-slate-800">MEM</th>
                <th className="p-2.5 border-r border-slate-800">NAME</th>
                <th className="p-2.5 border-r border-slate-800">T</th>
                <th className="p-2.5 border-r border-slate-800">WEIT.</th>
                <th className="p-2.5 border-r border-slate-800">FAT</th>
                <th className="p-2.5 border-r border-slate-800">SNF</th>
                <th className="p-2.5 border-r border-slate-800 text-right">AMOUNT</th>
                <th className="p-2.5">RATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-slate-500 font-sans text-xs">
                    कोई रिकॉर्ड उपलब्ध नहीं है। (No Purchase Records)
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-900">
                    <td className="p-2.5 border-r border-slate-800 font-bold">{idx + 1}.0</td>
                    <td className="p-2.5 border-r border-slate-800 font-bold text-cyan-300">{p.memberCode}</td>
                    <td className="p-2.5 border-r border-slate-800 font-sans text-white truncate max-w-[100px]">{p.memberName}</td>
                    <td className="p-2.5 border-r border-slate-800 font-bold text-cyan-300">{p.milkType === 'BUFFALO' ? 'B' : 'C'}</td>
                    <td className="p-2.5 border-r border-slate-800 font-bold text-white">{p.liters}</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300">{p.fat}</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300">{p.snf}</td>
                    <td className="p-2.5 border-r border-slate-800 text-right font-extrabold text-emerald-400">₹{p.totalAmount}</td>
                    <td className="p-2.5 text-cyan-300">₹{p.ratePerLiter}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="h-10 bg-sky-900 text-white px-4 flex items-center justify-between text-xs font-extrabold flex-shrink-0 border-t border-sky-800 font-mono">
        <span>Count: <span className="text-cyan-300">{filteredPurchases.length}</span></span>
        <span>Ltr: <span className="text-white">{totalLiters.toFixed(1)}</span></span>
        <span>Fat: <span className="text-cyan-300">{avgFat}%</span></span>
        <span>Amount: <span className="text-emerald-400 font-black text-sm">₹{totalAmount.toFixed(2)}</span></span>
      </div>
    </div>
  );
}

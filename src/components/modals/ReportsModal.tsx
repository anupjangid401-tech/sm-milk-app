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

  const filteredSales = sales.filter((s) => {
    const shiftMatch = filterShift === 'ALL' || (filterShift === 'Morning' && s.shift === 'MORNING') || (filterShift === 'Evening' && s.shift === 'EVENING');
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
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-4 max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">SM MILK / Milk Purchase Report</h2>
              <p className="text-[11px] text-slate-400">Milk Collection Report & Print Controls</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Controls Bar (Matching Photo 5) */}
        <div className="space-y-2 mb-3">
          {/* Row 1: Date, Shift, Filter */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="glass-input py-1 text-xs text-cyan-300 font-bold"
              />
            </div>
            <select
              value={filterShift}
              onChange={(e) => setFilterShift(e.target.value as any)}
              className="glass-select py-1 text-xs"
            >
              <option value="Morning" className="bg-slate-900">Morning</option>
              <option value="Evening" className="bg-slate-900">Evening</option>
              <option value="ALL" className="bg-slate-900">ALL</option>
            </select>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="glass-select py-1 text-xs"
            >
              <option value="Sampal Order" className="bg-slate-900">Sampal Order</option>
              <option value="Member Code Order" className="bg-slate-900">Code Order</option>
            </select>
          </div>

          {/* Row 2: Photo 5 Print Buttons (SHOW, DOT PRINT, LSR PRINT, BT PRINT) */}
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            <button
              onClick={() => {}}
              className="py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 text-center"
            >
              SHOW
            </button>
            <button
              onClick={() => handlePrintAction('DOT')}
              className="py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 text-center"
            >
              DOT PRINT
            </button>
            <button
              onClick={() => handlePrintAction('LSR')}
              className="py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 text-center"
            >
              LSR PRINT
            </button>
            <button
              onClick={() => handlePrintAction('BT')}
              className="py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 text-center flex items-center justify-center gap-1"
            >
              <Bluetooth className="w-3.5 h-3.5" />
              <span>BT PRINT</span>
            </button>
          </div>
        </div>

        {/* Data Table (Matching Photo 5 Columns: SR.N | MEM | NAME | T | WEIT. | FAT | SNF | AMOUNT | RATE) */}
        <div className="overflow-x-auto rounded-xl border border-white/10 max-h-60 mb-3">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-900 text-cyan-300 sticky top-0 font-bold border-b border-white/10 uppercase tracking-wider">
              <tr>
                <th className="p-2 border-r border-white/10">SR.N</th>
                <th className="p-2 border-r border-white/10">MEM</th>
                <th className="p-2 border-r border-white/10">NAME</th>
                <th className="p-2 border-r border-white/10">T</th>
                <th className="p-2 border-r border-white/10">WEIT.</th>
                <th className="p-2 border-r border-white/10">FAT</th>
                <th className="p-2 border-r border-white/10">SNF</th>
                <th className="p-2 border-r border-white/10">AMOUNT</th>
                <th className="p-2">RATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-slate-500">
                    No purchase data available (No Records).
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2 border-r border-white/10 font-semibold">{idx + 1}.0</td>
                    <td className="p-2 border-r border-white/10 font-bold text-cyan-300">{p.memberCode}</td>
                    <td className="p-2 border-r border-white/10">{p.memberName}</td>
                    <td className="p-2 border-r border-white/10 font-bold text-amber-300">
                      {p.milkType === 'BUFFALO' ? 'B' : 'C'}
                    </td>
                    <td className="p-2 border-r border-white/10 font-bold text-white">{p.liters}</td>
                    <td className="p-2 border-r border-white/10 text-amber-400">{p.fat}</td>
                    <td className="p-2 border-r border-white/10 text-purple-400">{p.snf}</td>
                    <td className="p-2 border-r border-white/10 font-extrabold text-emerald-400">₹{p.totalAmount}</td>
                    <td className="p-2 text-slate-300">₹{p.ratePerLiter}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Total Bar (Matching Photo 5 Total Bar) */}
        <div className="p-2.5 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-between text-xs font-bold text-white">
          <span>Total Records: <strong className="text-cyan-300">{filteredPurchases.length}</strong></span>
          <span>Total Weight: <strong className="text-amber-300">{totalLiters.toFixed(1)} Ltr</strong></span>
          <span>Avg FAT: <strong className="text-purple-300">{avgFat}%</strong></span>
          <span>Total Amount: <strong className="text-emerald-400">₹{totalAmount.toFixed(2)}</strong></span>
        </div>

        <div className="mt-3 text-center">
          <button onClick={onClose} className="glass-btn w-full text-xs">
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}

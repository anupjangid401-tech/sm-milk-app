"use client";

import { useState } from "react";
import { MilkPurchaseRecord, MilkSaleRecord } from "@/lib/types";
import { X, Calendar, Search, FileText, Printer } from "lucide-react";

interface ReportsModalProps {
  reportType: 'purchase' | 'sale' | 'payment' | 'date-summary' | 'datewise';
  purchases: MilkPurchaseRecord[];
  sales: MilkSaleRecord[];
  onClose: () => void;
}

export default function ReportsModal({ reportType, purchases, sales, onClose }: ReportsModalProps) {
  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── HEADER ── */}
      <div className="h-14 bg-[#4682b4] text-white px-4 flex items-center shadow-md flex-shrink-0">
        <span className="font-bold text-lg uppercase">SM MILK / {reportType} Report</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#f4f7f6]">
        {/* TOP CONTROLS */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-xs font-bold">
           <div className="border border-gray-400 bg-white p-2 rounded-md flex justify-between">25-08-2026 <Calendar className="w-4 h-4 text-red-500" /></div>
           <div className="border border-gray-400 bg-white p-2 rounded-md">Morning</div>
           <button className="bg-[#4682b4] text-white rounded-md p-2">SHOW</button>
        </div>

        {/* TABLE */}
        <div className="border border-[#4682b4] overflow-hidden">
          <table className="w-full text-[10px] text-center">
            <thead className="bg-[#4682b4] text-white">
              <tr>
                <th className="p-2 border-r border-white">SR.N</th>
                <th className="p-2 border-r border-white">CODE</th>
                <th className="p-2 border-r border-white">NAME</th>
                <th className="p-2 border-r border-white">LTR</th>
                <th className="p-2 border-r border-white">FAT</th>
                <th className="p-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="bg-white">
               {purchases.length === 0 ? (
                 <tr><td colSpan={6} className="p-10 text-gray-400">No Records Found</td></tr>
               ) : (
                 purchases.map((p, i) => (
                   <tr key={p.id} className="border-b">
                     <td className="p-2">{i+1}</td>
                     <td className="p-2 font-bold">{p.memberCode}</td>
                     <td className="p-2">{p.memberName}</td>
                     <td className="p-2">{p.liters}</td>
                     <td className="p-2">{p.fat}</td>
                     <td className="p-2 font-bold text-emerald-600">₹{p.totalAmount}</td>
                   </tr>
                 ))
               )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-6">
           <button className="flex flex-col items-center gap-1"><div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white"><Printer className="w-6 h-6" /></div><span className="text-[10px] font-bold">DOT PRINT</span></button>
           <button className="flex flex-col items-center gap-1"><div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white"><X className="w-6 h-6" onClick={onClose} /></div><span className="text-[10px] font-bold">CLOSE</span></button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="h-10 bg-[#4682b4] flex items-center border-t border-white">
        <div className="w-12 h-full bg-white flex items-center justify-center border-r border-gray-400">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 grid grid-cols-3 h-full text-[11px] font-bold text-center">
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-100">Count: {purchases.length}</div>
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-200">Ltr: 0</div>
          <div className="flex items-center justify-center bg-blue-300">Amt: ₹0</div>
        </div>
      </div>
    </div>
  );
}

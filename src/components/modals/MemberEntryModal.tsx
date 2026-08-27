"use client";

import { useState } from "react";
import { Member, MilkType } from "@/lib/types";
import {
  X,
  Calendar,
  User,
  Search,
  Send,
  ExternalLink,
  Plus
} from "lucide-react";

interface MemberEntryModalProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onClose: () => void;
}

export default function MemberEntryModal({ members, onAddMember, onClose }: MemberEntryModalProps) {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [phone, setPhone] = useState<string>("");
  const [activeField, setActiveField] = useState<"code" | "name" | "phone">("code");

  const handleKeypadPress = (val: string) => {
    let currentVal = activeField === "code" ? code : activeField === "phone" ? phone : name;
    if (val === "ERASE") currentVal = currentVal.slice(0, -1);
    else currentVal += val;

    if (activeField === "code") setCode(currentVal);
    else if (activeField === "phone") setPhone(currentVal);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-white text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── HEADER ── */}
      <div className="h-14 bg-[#4682b4] text-white px-4 flex items-center shadow-md flex-shrink-0">
        <span className="font-bold text-lg">SM MILK/Member Entry</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-[#f4f7f6]">
        {/* ROW 1: Status */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-center font-bold text-lg">New</div>
          <div className="border border-gray-400 bg-white rounded-md p-1 flex items-center justify-between px-2 font-bold text-sm">
            25-08-2026 <Calendar className="w-5 h-5 text-red-500" />
          </div>
          <button className="border border-gray-400 bg-white rounded-md p-1 font-bold text-sm">Member</button>
        </div>

        {/* ROW 2: Code & Milk Type */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 relative flex items-center border-b-2 border-pink-500 pt-4 pb-1" onClick={() => setActiveField("code")}>
            <User className="w-6 h-6 text-blue-400 mr-2" />
            <div className="absolute top-0 left-8 text-[10px] text-pink-500 font-bold">Member Code</div>
            <span className="text-xl font-bold min-h-[28px]">{code}</span>
          </div>
          <button className="w-20 border border-gray-400 rounded-xl bg-white font-bold text-sm">
            {milkType === "BUFFALO" ? "Buffalo" : "Cow"}
          </button>
        </div>

        {/* ROW 3: Name Entry */}
        <div className="border border-gray-400 bg-white rounded-sm overflow-hidden mb-2">
          <div className="bg-green-600 text-white text-[10px] text-center font-bold py-0.5">Full Name(English)</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 outline-none font-bold text-center"
            placeholder="ENTER FARMER NAME"
            onClick={() => setActiveField("name")}
          />
        </div>

        {/* ROW 4: Mobile Entry */}
        <div className="flex items-center border-b-2 border-gray-300 pb-1 mb-4" onClick={() => setActiveField("phone")}>
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2"><User className="w-5 h-5 text-white" /></div>
          <span className="text-3xl font-bold text-gray-500 mr-2 italic">Mob.</span>
          <span className="text-3xl font-bold">{phone}</span>
        </div>

        {/* DATA TABLE */}
        <div className="border border-[#4682b4] mb-4">
          <table className="w-full text-[10px] text-center">
            <thead className="bg-[#4682b4] text-white">
              <tr>
                <th className="p-1 border-r border-white">CODE</th>
                <th className="p-1 border-r border-white">NAME</th>
                <th className="p-1 border-r border-white">MILK</th>
                <th className="p-1">MOBILE</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {members.slice(0, 3).map(m => (
                <tr key={m.id} className="border-b">
                  <td className="p-1 font-bold">{m.code}</td>
                  <td className="p-1">{m.name}</td>
                  <td className="p-1">{m.milkType === 'BUFFALO' ? 'B' : 'C'}</td>
                  <td className="p-1">{m.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* KEYPAD AREA */}
        <div className="flex justify-end gap-4">
          <div className="flex flex-col gap-4">
             <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center"><Plus className="w-6 h-6 text-white" /></div>
             <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center" onClick={onClose}><X className="w-6 h-6 text-white" /></div>
             <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>

          <div className="w-64 bg-[#2c5e7c] p-1 rounded-xl shadow-inner">
            <div className="grid grid-cols-4 gap-1">
              {[7, 8, 9].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button onClick={() => handleKeypadPress("ERASE")} className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">ERASE</button>
              {[4, 5, 6].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button className="row-span-2 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">SAVE</button>
              {[1, 2, 3].map(n => <button key={n} onClick={() => handleKeypadPress(n.toString())} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">{n}</button>)}
              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">PREV</button>
              <button onClick={() => handleKeypadPress("0")} className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">0</button>
              <button className="h-12 bg-[#4682b4] text-white font-bold rounded-lg border border-slate-900">.</button>
              <button className="h-12 bg-[#4682b4] text-white text-[10px] font-bold rounded-lg border border-slate-900">NEXT</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="h-10 bg-[#4682b4] flex items-center border-t border-white">
        <div className="w-12 h-full bg-white flex items-center justify-center border-r border-gray-400">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 grid grid-cols-2 h-full text-[11px] font-bold text-center">
          <div className="flex items-center justify-center border-r border-gray-400 bg-blue-100 uppercase">Total Members</div>
          <div className="flex items-center justify-center bg-blue-200">{members.length}</div>
        </div>
      </div>
    </div>
  );
}

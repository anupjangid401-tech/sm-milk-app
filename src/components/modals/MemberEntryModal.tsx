"use client";

import { useState } from "react";
import { Member, MilkType } from "@/lib/types";
import { X, UserPlus, CheckCircle, Users } from "lucide-react";

interface MemberEntryModalProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onClose: () => void;
}

export default function MemberEntryModal({ members, onAddMember, onClose }: MemberEntryModalProps) {
  const nextCode = (Math.max(...members.map((m) => parseInt(m.code) || 100), 100) + 1).toString();

  const [code, setCode] = useState(nextCode);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("Surajpura");
  const [milkType, setMilkType] = useState<MilkType>("BUFFALO");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: Member = {
      id: "mem-" + Date.now(),
      code: code.trim(),
      name: name.trim(),
      phone: phone.trim() || "N/A",
      village: village.trim(),
      milkType: milkType,
      balance: 0,
    };

    onAddMember(newMember);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top Mobile Header */}
      <div className="h-12 bg-purple-800 text-white px-4 flex items-center justify-between shadow-md border-b border-purple-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-purple-200" />
          <span className="font-extrabold text-sm tracking-tight">SM MILK / Member Entry (सदस्य रजिस्टर)</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-purple-900/80 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {isSuccess ? (
          <div className="text-center py-10 space-y-4 bg-slate-950 p-6 rounded-3xl border border-purple-500/40 shadow-xl">
            <CheckCircle className="w-14 h-14 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">Farmer Registered Successfully!</h3>
            <p className="text-sm text-slate-400">
              Code: <strong className="text-cyan-300">#{code}</strong> | Name: <strong className="text-white">{name}</strong>
            </p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-purple-600 font-extrabold text-white text-base shadow-lg shadow-purple-600/40">
              OK (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  1. Member Code (किसान कोड)
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-cyan-300 font-bold font-mono outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  2. Default Milk (दूध प्रकार)
                </label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                >
                  <option value="BUFFALO">Buffalo (भैंस)</option>
                  <option value="COW">Cow (गाय)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                3. Farmer Full Name (किसान का नाम)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramprasad Jangid"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none focus:border-purple-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  4. Mobile Number (फोन)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98290XXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm font-mono outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  5. Village Name (गांव)
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 font-extrabold text-white text-base shadow-lg shadow-purple-600/30">
                Save Member (सदस्य जोड़ें)
              </button>
              <button type="button" onClick={onClose} className="px-5 py-3.5 rounded-2xl bg-slate-800 text-slate-300 font-bold">
                Cancel
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Total Registered Farmers: <strong className="text-white">{members.length}</strong></span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

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
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">सदस्य / किसान जोड़ें (Member Entry)</h2>
              <p className="text-xs text-slate-400">नया दूध उत्पादक रजिस्टर करें</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">नया किसान सफलतापूर्वक जोड़ा गया!</h3>
            <p className="text-xs text-slate-400">कोड: {code} | नाम: {name}</p>
            <button onClick={onClose} className="glass-btn w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-600">
              संपन्न (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">किसान कोड (Member Code)</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="glass-input text-cyan-300 font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मुख्य दूध (Default Milk)</label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="glass-select"
                >
                  <option value="BUFFALO" className="bg-slate-900">भैंस (Buffalo)</option>
                  <option value="COW" className="bg-slate-900">गाय (Cow)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">किसान का पूरा नाम (Full Name)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramprasad Meena"
                className="glass-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मोबाइल नंबर (Mobile No)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98290XXXXX"
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">गांव (Village Name)</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="glass-btn flex-1 bg-gradient-to-r from-purple-500 to-indigo-600">
                सदस्य सेव करें (Add Member)
              </button>
              <button type="button" onClick={onClose} className="glass-btn-secondary">
                रद्द करें
              </button>
            </div>

            {/* Current Member count tag */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>वर्तमान कुल सदस्य: <strong className="text-white">{members.length}</strong></span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

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
      <div className="glass-modal-container p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">सदस्य / किसान जोड़ें <span className="text-xs font-semibold text-slate-400">(Member Entry)</span></h2>
              <p className="text-xs text-slate-400">नया दूध उत्पादक किसान रजिस्टर करें</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-base font-extrabold text-white">नया किसान सफलतापूर्वक जोड़ा गया!</h3>
            <p className="text-xs text-slate-400">कोड: <strong className="text-cyan-300">#{code}</strong> | नाम: <strong className="text-white">{name}</strong></p>
            <button onClick={onClose} className="glass-btn w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600">
              संपन्न (Done)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  1. किसान कोड (Member Code)
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="glass-input text-cyan-300 font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  2. मुख्य दूध (Default Milk)
                </label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value as MilkType)}
                  className="glass-select"
                >
                  <option value="BUFFALO" className="bg-slate-900 text-white">भैंस (Buffalo)</option>
                  <option value="COW" className="bg-slate-900 text-white">गाय (Cow)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                3. किसान का पूरा नाम (Full Name)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramprasad Meena"
                className="glass-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  4. मोबाइल नंबर (Mobile No)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98290XXXXX"
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  5. गांव (Village Name)
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="submit" className="glass-btn flex-1 py-3.5 text-base bg-gradient-to-r from-purple-600 to-indigo-600">
                सदस्य सेव करें (Add Member)
              </button>
              <button type="button" onClick={onClose} className="glass-btn-secondary px-5">
                रद्द करें
              </button>
            </div>

            {/* Current Member count tag */}
            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>वर्तमान कुल सदस्य: <strong className="text-white">{members.length}</strong></span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


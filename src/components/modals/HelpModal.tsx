"use client";

import { X, HelpCircle, PhoneCall, ShieldCheck, Cpu } from "lucide-react";

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal-container p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">सहायता एवं हेल्पलाइन (Help & Guide)</h2>
              <p className="text-xs text-slate-400">SM MILK Dairy Support</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {/* Customer Helpline */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white">डेयरी कस्टमर केयर नंबर</h4>
                <p className="text-[11px] text-slate-400">+91 98290-XXXXX / 1800-SM-MILK</p>
              </div>
            </div>
            <a href="tel:9829000000" className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold">
              Call
            </a>
          </div>

          {/* Quick Guide */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              एप्लीकेशन का उपयोग कैसे करें?
            </h4>
            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
              <li><strong>दूध खरीद:</strong> किसान का कोड डालकर FAT% और SNF% दर्ज करें, ऑटो दर गणना हो जाएगी।</li>
              <li><strong>शिफ्ट बदलो:</strong> ऊपर दिए गए बटन से सुबह (AM) या शाम (PM) शिफ्ट चुनें।</li>
              <li><strong>ग्राहक पासबुक:</strong> किसान का नाम खोजकर उसका पूरा खाता विवरण देखें।</li>
            </ul>
          </div>

          {/* Version Info */}
          <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center text-slate-400 text-[11px]">
            <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p>SM MILK Dairy Android ERP v3.5 (Modern Glassmorphism)</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Built with Next.js, Framer Motion & PWA / APK Support</p>
          </div>

          <button onClick={onClose} className="glass-btn w-full mt-2">
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
